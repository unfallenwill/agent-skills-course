#!/usr/bin/env node
/*
 * Internal link checker for the static course site.
 * No dependencies. Usage: node tools/check-links.js [docsDir]
 *
 * Checks:
 *  - every href/src target exists (relative to the page)
 *  - every #fragment exists as id="..." or name="..." in the target page
 *  - no root-absolute href/src ("/...")
 *  - no external <link>/<script>/<img> hosts (offline requirement)
 *  - structural basics: lang=zh-CN, one <h1>, non-empty <title>, viewport meta
 *  - every HTML page is reachable from index.html via internal links
 *  - every HTML page appears in assets/search-index.js
 *
 * Exit code 0 only when no broken links and no structural failures.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DOCS = path.resolve(process.argv[2] || path.join(__dirname, '..', 'docs'));
const problems = [];
const warnings = [];

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(DOCS, file).split(path.sep).join('/');
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function decodeAttr(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function collectIds(html) {
  const ids = new Set();
  const re = /\b(?:id|name)\s*=\s*(?:"([^"]+)"|'([^']+)')/g;
  let m;
  while ((m = re.exec(html))) {
    ids.add(decodeAttr(m[1] || m[2]));
  }
  return ids;
}

if (!fs.existsSync(DOCS)) {
  console.error(`ERROR: docs directory not found: ${DOCS}`);
  process.exit(2);
}

const pages = walk(DOCS, []).sort();
const pageSet = new Set(pages.map(p => path.resolve(p)));
const idCache = new Map();
let linkCount = 0;
let broken = 0;
let rootAbs = 0;
let externalAssets = 0;

const graph = new Map();

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const relPage = rel(page);
  const edges = [];

  if (!/<html\b[^>]*\blang\s*=\s*"zh-CN"/i.test(html)) {
    problems.push(`${relPage}: missing <html lang="zh-CN">`);
  }
  const h1s = html.match(/<h1\b/g) || [];
  if (h1s.length !== 1) {
    problems.push(`${relPage}: expected exactly one <h1>, found ${h1s.length}`);
  }
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title || !title[1].trim()) {
    problems.push(`${relPage}: missing or empty <title>`);
  }
  if (!/<meta\b[^>]*name\s*=\s*"viewport"/i.test(html)) {
    problems.push(`${relPage}: missing viewport meta`);
  }
  if (!/[一-鿿]/.test(html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, ''))) {
    problems.push(`${relPage}: no Chinese body text detected`);
  }

  // External <link>/<script>/<img> hosts are forbidden (offline reading).
  const assetRe = /<(?:link|script|img)\b[^>]*?\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
  let am;
  while ((am = assetRe.exec(html))) {
    const value = decodeAttr(am[1] || am[2]).trim();
    if (/^(https?:)?\/\//i.test(value)) {
      externalAssets += 1;
      problems.push(`${relPage}:${lineOf(html, am.index)} external asset reference: ${value}`);
    }
  }

  const attrRe = /\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
  let m;
  while ((m = attrRe.exec(html))) {
    const raw = decodeAttr(m[1] || m[2]).trim();
    if (!raw) continue;
    if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    if (raw.startsWith('//')) continue;
    linkCount += 1;

    if (raw.startsWith('/')) {
      rootAbs += 1;
      problems.push(`${relPage}:${lineOf(html, m.index)} root-absolute path not allowed: ${raw}`);
      continue;
    }

    const hashIndex = raw.indexOf('#');
    const beforeHash = hashIndex === -1 ? raw : raw.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? '' : raw.slice(hashIndex + 1);
    const pathPart = beforeHash.split('?')[0];

    let target;
    if (!pathPart) {
      target = page;
    } else {
      let decoded;
      try {
        decoded = decodeURIComponent(pathPart);
      } catch (err) {
        problems.push(`${relPage}:${lineOf(html, m.index)} malformed URL encoding: ${raw}`);
        broken += 1;
        continue;
      }
      target = path.resolve(path.dirname(page), decoded);
    }

    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      broken += 1;
      problems.push(`${relPage}:${lineOf(html, m.index)} missing target: ${raw}`);
      continue;
    }

    if (!fragment) {
      if (pageSet.has(path.resolve(target)) && path.resolve(target) !== path.resolve(page)) {
        edges.push(path.resolve(target));
      }
      continue;
    }

    if (!target.toLowerCase().endsWith('.html')) {
      warnings.push(`${relPage}:${lineOf(html, m.index)} fragment on non-HTML file: ${raw}`);
      continue;
    }

    if (!idCache.has(target)) idCache.set(target, collectIds(fs.readFileSync(target, 'utf8')));
    const ids = idCache.get(target);
    let decodedFragment;
    try {
      decodedFragment = decodeURIComponent(fragment);
    } catch (err) {
      decodedFragment = fragment;
    }
    if (!ids.has(decodedFragment)) {
      broken += 1;
      problems.push(`${relPage}:${lineOf(html, m.index)} missing anchor #${decodedFragment} in ${rel(target)}`);
    }
  }

  graph.set(path.resolve(page), edges);
}

// Reachability from index.html
const start = path.resolve(DOCS, 'index.html');
const seen = new Set();
const queue = [start];
while (queue.length) {
  const current = queue.shift();
  if (seen.has(current)) continue;
  seen.add(current);
  for (const next of graph.get(current) || []) {
    if (!seen.has(next) && pageSet.has(next)) queue.push(next);
  }
}
const orphans = pages.filter(p => !seen.has(path.resolve(p)));

// Search index coverage
const searchIndexFile = path.join(DOCS, 'assets', 'search-index.js');
let indexed = [];
if (fs.existsSync(searchIndexFile)) {
  const js = fs.readFileSync(searchIndexFile, 'utf8');
  const re = /"u"\s*:\s*"([^"]+)"/g;
  let mm;
  while ((mm = re.exec(js))) indexed.push(mm[1]);
} else {
  problems.push('assets/search-index.js: missing');
}
const indexedSet = new Set(indexed);
const notIndexed = pages.map(rel).filter(p => !indexedSet.has(p));
const staleIndex = indexed.filter(p => !pageSet.has(path.resolve(DOCS, p)));

// Report
for (const w of warnings) console.log(`WARN  ${w}`);
for (const p of problems) console.log(`FAIL  ${p}`);
for (const p of orphans.map(rel)) console.log(`FAIL  unreachable from index.html: ${p}`);
for (const p of notIndexed) console.log(`FAIL  not present in search index: ${p}`);
for (const p of staleIndex) console.log(`FAIL  search index points to missing page: ${p}`);

console.log('');
console.log(`SUMMARY pages=${pages.length} links=${linkCount} broken=${broken} rootAbsolute=${rootAbs} externalAssets=${externalAssets} orphans=${orphans.length} notIndexed=${notIndexed.length}`);

const failed = problems.length + orphans.length + notIndexed.length + staleIndex.length;
process.exit(failed ? 1 : 0);

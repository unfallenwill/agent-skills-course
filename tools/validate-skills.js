#!/usr/bin/env node
/*
 * Zero-dependency validator for Agent Skills frontmatter.
 * Usage: node tools/validate-skills.js [skillsRoot]
 *
 * Default root: ./examples. Recursively finds directories containing SKILL.md,
 * parses the YAML frontmatter subset used by the specification, and checks:
 *   - name present, 1-64 chars, /^[a-z0-9]+(-[a-z0-9]+)*$/, matches parent dir
 *   - description present, 1-1024 chars, non-empty
 *   - license / compatibility / metadata / allowed-tools types and limits
 *
 * Exit code 0 only if every skill passes.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const KNOWN_FIELDS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);

function walkSkills(dir, out) {
  if (!fs.existsSync(dir)) return out;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (entries.some(e => e.isFile() && e.name === 'SKILL.md')) out.push(dir);
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      walkSkills(path.join(dir, entry.name), out);
    }
  }
  return out;
}

function stripQuotes(value, errors, lineNo) {
  const v = value.trim();
  if (v.startsWith('"')) {
    if (!v.endsWith('"') || v.length < 2) {
      errors.push(`line ${lineNo}: unterminated double-quoted string`);
      return v;
    }
    try {
      return JSON.parse(v);
    } catch (err) {
      errors.push(`line ${lineNo}: invalid double-quoted string`);
      return v.slice(1, -1);
    }
  }
  if (v.startsWith("'")) {
    if (!v.endsWith("'") || v.length < 2) {
      errors.push(`line ${lineNo}: unterminated single-quoted string`);
      return v;
    }
    return v.slice(1, -1).replace(/''/g, "'");
  }
  return v;
}

function parseFrontmatter(text) {
  const errors = [];
  const clean = text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const lines = clean.split('\n');
  if (lines[0].trim() !== '---') {
    return { errors: ['file must start with a --- frontmatter delimiter'], data: null, body: clean };
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) {
    return { errors: ['missing closing --- delimiter'], data: null, body: clean };
  }

  const data = {};
  let currentKey = null;
  let i = 1;
  while (i < end) {
    const raw = lines[i];
    const lineNo = i + 1;
    if (!raw.trim() || raw.trim().startsWith('#')) { i++; continue; }
    if (/^\t/.test(raw) || /^ +\t/.test(raw)) {
      errors.push(`line ${lineNo}: tab characters are not allowed in indentation`);
      i++; continue;
    }
    const indent = raw.match(/^ */)[0].length;

    if (indent === 0) {
      const m = raw.match(/^([A-Za-z0-9_-]+):(?:[ ]?(.*))?$/);
      if (!m) {
        errors.push(`line ${lineNo}: expected "key: value" at column 1`);
        i++; continue;
      }
      const key = m[1];
      let rest = (m[2] || '').trim();
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        errors.push(`line ${lineNo}: duplicate key "${key}"`);
      }
      if (!KNOWN_FIELDS.has(key)) {
        // Unknown fields are allowed by clients; record but do not fail.
        data[key] = rest;
        currentKey = key;
        i++; continue;
      }
      if (rest === '>' || rest === '|') {
        const folded = rest === '>';
        const block = [];
        i++;
        while (i < end) {
          const next = lines[i];
          if (next.trim() === '' || next.match(/^ +/)) {
            block.push(next.replace(/^ {1,}/, ''));
            i++;
          } else {
            break;
          }
        }
        while (block.length && block[block.length - 1] === '') block.pop();
        const value = folded ? block.join(' ').replace(/\s+/g, ' ').trim() : block.join('\n');
        data[key] = value;
        currentKey = key;
        continue;
      }
      if (rest === '') {
        // Possible nested map (metadata) or empty value.
        const nested = [];
        let j = i + 1;
        while (j < end) {
          const next = lines[j];
          if (!next.trim()) { j++; continue; }
          const nextIndent = next.match(/^ */)[0].length;
          if (nextIndent <= indent) break;
          nested.push({ text: next, lineNo: j + 1 });
          j++;
        }
        if (nested.length) {
          const map = {};
          for (const item of nested) {
            const nm = item.text.trim().match(/^([^:]+):(?:[ ]?(.*))?$/);
            if (!nm) {
              errors.push(`line ${item.lineNo}: expected nested "key: value"`);
              continue;
            }
            const k = nm[1].trim();
            let val = (nm[2] || '').trim();
            if (val.startsWith('#')) val = '';
            if (/:\s/.test(val) && !/^["']/.test(val)) {
              errors.push(`line ${item.lineNo}: unquoted colon in value for "${k}"`);
            }
            map[k] = stripQuotes(val, errors, item.lineNo);
          }
          data[key] = map;
          i = j;
          currentKey = key;
          continue;
        }
        data[key] = '';
        currentKey = key;
        i++;
        continue;
      }

      if (rest.startsWith('[') || rest.startsWith('{')) {
        errors.push(`line ${lineNo}: flow-style collections are not supported for "${key}" (expected a scalar or a block map)`);
      }
      if (/:\s/.test(rest) && !/^["']/.test(rest)) {
        errors.push(`line ${lineNo}: unquoted colon in value for "${key}" (quote the value or use > block scalar)`);
      }
      if (/\s#/.test(rest) && !/^["']/.test(rest)) {
        errors.push(`line ${lineNo}: unquoted "#" in value for "${key}"`);
      }
      data[key] = stripQuotes(rest, errors, lineNo);
      currentKey = key;
      i++;
      continue;
    }

    // Indented line without a preceding key that accepts nesting.
    errors.push(`line ${lineNo}: unexpected indentation (no block scalar or nested map is open)`);
    i++;
  }

  if (currentKey && currentKey !== 'metadata' && typeof data[currentKey] === 'object') {
    errors.push(`field "${currentKey}" must be a string, not a map`);
  }

  return { errors, data, body: lines.slice(end + 1).join('\n') };
}

function checkSkill(dir) {
  const file = path.join(dir, 'SKILL.md');
  const problems = [];
  const text = fs.readFileSync(file, 'utf8');
  const { errors, data } = parseFrontmatter(text);
  problems.push(...errors.map(e => `YAML: ${e}`));

  if (!data) return { name: path.basename(dir), problems, fields: [], data: null };

  const fields = Object.keys(data);

  if (typeof data.name !== 'string' || !data.name.trim()) {
    problems.push('name: missing or not a string');
  } else {
    if (data.name.length > 64) problems.push(`name: ${data.name.length} characters (max 64)`);
    if (!NAME_RE.test(data.name)) {
      problems.push('name: must match ^[a-z0-9]+(-[a-z0-9]+)*$ (lowercase, digits, single hyphens)');
    }
    if (data.name !== path.basename(dir)) {
      problems.push(`name: "${data.name}" does not match parent directory "${path.basename(dir)}"`);
    }
  }

  if (typeof data.description !== 'string' || !data.description.trim()) {
    problems.push('description: missing, empty, or not a string');
  } else {
    const len = [...data.description].length;
    if (len < 1 || len > 1024) problems.push(`description: ${len} characters (must be 1-1024)`);
  }

  if (data.license !== undefined && typeof data.license !== 'string') {
    problems.push('license: must be a string');
  }

  if (data.compatibility !== undefined) {
    if (typeof data.compatibility !== 'string') {
      problems.push('compatibility: must be a string');
    } else if ([...data.compatibility].length > 500) {
      problems.push(`compatibility: ${[...data.compatibility].length} characters (max 500)`);
    }
  }

  if (data.metadata !== undefined) {
    if (typeof data.metadata !== 'object' || Array.isArray(data.metadata) || data.metadata === null) {
      problems.push('metadata: must be a map of string keys to string values');
    } else {
      for (const [k, v] of Object.entries(data.metadata)) {
        if (typeof v !== 'string') problems.push(`metadata.${k}: value must be a string`);
      }
    }
  }

  if (data['allowed-tools'] !== undefined && typeof data['allowed-tools'] !== 'string') {
    problems.push('allowed-tools: must be a space-separated string');
  }

  return { name: data.name || path.basename(dir), problems, fields, data };
}

const root = path.resolve(process.argv[2] || path.join(__dirname, '..', 'examples'));
const dirs = walkSkills(root, []).sort();

if (!dirs.length) {
  console.error(`No SKILL.md found under ${root}`);
  process.exit(2);
}

let passed = 0;
let failed = 0;
for (const dir of dirs) {
  const { name, problems, fields, data } = checkSkill(dir);
  if (problems.length) {
    failed += 1;
    console.log(`FAIL  ${path.basename(dir)} (${name})`);
    for (const p of problems) console.log(`        - ${p}`);
  } else {
    passed += 1;
    const text = fs.readFileSync(path.join(dir, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
    const fm = text.split('\n');
    let end = -1;
    for (let i = 1; i < fm.length; i++) if (fm[i].trim() === '---') { end = i; break; }
    const bodyLines = fm.slice(end + 1).join('\n').split('\n').filter(l => l.trim()).length;
    const descLen = data && typeof data.description === 'string' ? [...data.description].length : 0;
    console.log(`PASS  ${path.basename(dir)}  name_ok  description=${descLen} chars  body=${bodyLines} nonblank lines  fields=${fields.join(',')}`);
  }
}

console.log('');
console.log(`SUMMARY  skills=${dirs.length}  passed=${passed}  failed=${failed}`);
process.exit(failed ? 1 : 0);

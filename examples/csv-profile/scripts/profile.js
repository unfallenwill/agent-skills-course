#!/usr/bin/env node
// 零依赖 CSV 概要分析器，供 Agent 在技能中调用。
// 用法：node scripts/profile.js FILE [--format json|csv]
'use strict';

const fs = require('fs');

const USAGE = `Usage: node scripts/profile.js FILE [--format json|csv]

Profile a CSV file: row/column counts, missing values, numeric summaries.

Options:
  --format FORMAT   Output format: json (default) or csv
  --help            Show this help and exit

Exit codes:
  0  success
  2  invalid arguments
  3  file not found
  4  malformed CSV (unclosed quote, duplicate header, ragged rows)
`;

function fail(message, code) {
  console.error(`Error: ${message}`);
  if (code === 2) console.error(USAGE);
  process.exit(code);
}

function parseArgs(argv) {
  let file = null;
  let format = 'json';
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      process.stdout.write(USAGE);
      process.exit(0);
    } else if (arg === '--format') {
      format = argv[++i];
      if (format !== 'json' && format !== 'csv') {
        fail(`--format must be json or csv. Received: "${format}"`, 2);
      }
    } else if (arg.startsWith('-')) {
      fail(`Unknown option: ${arg}`, 2);
    } else if (!file) {
      file = arg;
    } else {
      fail(`Expected one input file, got extra argument: ${arg}`, 2);
    }
  }
  if (!file) fail('FILE is required.', 2);
  return { file, format };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n') {
      row.push(field); rows.push(row); row = []; field = '';
    } else if (ch === '\r') {
      if (text[i + 1] !== '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    } else {
      field += ch;
    }
  }
  if (inQuotes) fail('Unclosed quoted field in CSV.', 4);
  row.push(field);
  rows.push(row);
  if (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') rows.pop();
  return rows;
}

function isMissing(value) {
  const v = value.trim();
  return v === '' || v === 'NULL' || v === 'null' || v === 'NA';
}

function main() {
  const { file, format } = parseArgs(process.argv.slice(2));

  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') fail(`File not found: ${file}`, 3);
    fail(`Cannot read ${file}: ${err.message}`, 3);
  }

  raw = raw.replace(/^\uFEFF/, '');
  if (!raw.trim()) fail(`File is empty: ${file}`, 4);

  const rows = parseCsv(raw);
  const headers = rows[0].map(h => h.trim());
  if (headers.length === 0 || headers.every(h => h === '')) fail('Header row is empty.', 4);

  const seen = new Set();
  headers.forEach(h => {
    if (seen.has(h)) fail(`Duplicate header: "${h}". Rename columns before profiling.`, 4);
    seen.add(h);
  });

  const body = rows.slice(1);
  body.forEach((r, idx) => {
    if (r.length !== headers.length) {
      fail(`Row ${idx + 2} has ${r.length} field(s), expected ${headers.length}.`, 4);
    }
  });

  const missing = {};
  const numeric = {};
  headers.forEach((header, col) => {
    const values = body.map(r => r[col]);
    missing[header] = values.filter(isMissing).length;
    const present = values.filter(v => !isMissing(v));
    if (present.length > 0 && present.every(v => Number.isFinite(Number(v)))) {
      const nums = present.map(Number);
      const sum = nums.reduce((a, b) => a + b, 0);
      numeric[header] = {
        min: Math.min(...nums),
        max: Math.max(...nums),
        mean: Number((sum / nums.length).toFixed(2))
      };
    }
  });

  const result = {
    ok: true,
    file,
    rows: body.length,
    columns: headers.length,
    headers,
    missing,
    numeric
  };

  if (format === 'json') {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    process.stdout.write('column,missing,numeric_min,numeric_max,numeric_mean\n');
    headers.forEach(h => {
      const n = numeric[h];
      process.stdout.write([h, missing[h], n ? n.min : '', n ? n.max : '', n ? n.mean : ''].join(',') + '\n');
    });
  }
}

main();

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const mapFile = path.join(__dirname, '..', 'test-impact.yml');
const changed = process.argv.slice(2);

const map = {};
let current;
for (const line of fs.readFileSync(mapFile, 'utf8').split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;

  const key = line.match(/^(\S+):$/);
  if (key) {
    current = key[1];
    map[current] = [];
    continue;
  }

  const spec = line.match(/^\s+-\s+(\S+)/);
  if (spec && current) map[current].push(spec[1]);
}

const smokeFallback = [
  'tests/api/assessments.spec.ts',
  'tests/e2e/list.spec.ts',
];

const specs = new Set();
let runAll = false;
const unmapped = [];

for (const file of changed) {
  const mapped = map[file];

  if (!mapped) {
    unmapped.push(file);
    continue;
  }

  if (mapped.includes('__ALL__')) {
    runAll = true;
    break;
  }

  for (const spec of mapped) specs.add(spec);
}

if (runAll) {
  process.stdout.write('__ALL__\n');
  process.exit(0);
}

if (unmapped.length > 0) {
  console.error(`Unmapped changes use smoke fallback: ${unmapped.join(', ')}`);
  for (const spec of smokeFallback) specs.add(spec);
}

if (specs.size === 0) {
  console.error('No mapped tests selected; using smoke fallback');
  for (const spec of smokeFallback) specs.add(spec);
}

process.stdout.write([...specs].join(' ') + '\n');

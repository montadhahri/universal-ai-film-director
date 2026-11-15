'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const example = fs.readFileSync(path.join(root, 'docs/examples/first-film-starter.md'), 'utf8');

test('V2.6 starter example uses existing portable template paths', () => {
  const links = [...example.matchAll(/\]\((\.\.\/\.\.\/skills\/[^)#]+)\)/g)];
  assert.ok(links.length >= 5, 'must link the Director, cinematography, sound, packet and checkpoint templates');
  for (const [, target] of links) assert.ok(fs.statSync(path.resolve(root, 'docs/examples', target)).isFile(), target);
});

test('V2.6 starter has deterministic 15-second nonoverlapping shot plan', () => {
  const rows = example.split('\n').filter(line => /^\| `S01_SH0[1-3]` \|/.test(line));
  assert.equal(rows.length, 3);
  let cursor = 0;
  for (const row of rows) {
    const cells = row.split('|').map(cell => cell.trim());
    const start = Number(cells[2].split(':')[1]);
    const end = Number(cells[3].split(':')[1]);
    const duration = Number(cells[4].replace('s', ''));
    assert.equal(start, cursor, 'no gap or overlap');
    assert.equal(end - start, duration);
    assert.equal(cells[8], '`PROPOSED`');
    cursor = end;
  }
  assert.equal(cursor, 15);
});

test('V2.6 starter keeps approvals, production and media claims safe', () => {
  for (const marker of ['`PROPOSED`', '`false`', '`PLAN_ONLY`', '`UNVERIFIED`', 'NOT_GENERATED / NOT_INSPECTED', 'real agent execution']) {
    assert.ok(example.includes(marker), marker);
  }
  assert.ok(example.includes('Do not import this Markdown as schema-valid JSON'));
});

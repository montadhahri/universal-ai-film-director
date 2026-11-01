const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { check } = require('../regression/check_preservation.js');
const { validate } = require('../validate_repo.js');

function withTemp(fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'film-director-node-'));
  try { fn(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
test('preservation: baseline passes for existing file', () => withTemp(root => {
  fs.writeFileSync(path.join(root, 'good.md'), 'ok');
  const baseline = path.join(root, 'baseline.json');
  fs.writeFileSync(baseline, JSON.stringify({ required_paths: ['good.md'] }));
  assert.deepEqual(check(root, baseline), []);
}));
test('preservation: missing, empty, duplicate and traversal are rejected', () => withTemp(root => {
  fs.writeFileSync(path.join(root, 'empty.md'), '');
  const baseline = path.join(root, 'baseline.json');
  const run = paths => { fs.writeFileSync(baseline, JSON.stringify({ required_paths: paths })); return check(root, baseline); };
  assert.deepEqual(run(['missing.md']), ['Missing protected file: missing.md']);
  assert.deepEqual(run(['empty.md']), ['Empty protected file: empty.md']);
  assert.deepEqual(run(['x.md','x.md']), ['Duplicate baseline paths']);
  assert.deepEqual(run(['../escape.md']), ['Unsafe path: ../escape.md']);
}));
test('structure: missing skill and required paths report failures', () => withTemp(root => {
  const result = validate(root);
  assert(result.errors.includes('Missing or empty: SKILL.md'));
  assert(result.errors.includes('SKILL.md requires valid name frontmatter'));
}));
test('structure: broken relative Markdown links are detected', () => withTemp(root => {
  fs.writeFileSync(path.join(root, 'test.md'), '[missing](missing.md)');
  assert(validate(root).errors.includes('Broken link: test.md -> missing.md'));
}));
test('repository: current baseline and structure pass', () => {
  assert.deepEqual(check(), []);
  assert.deepEqual(validate().errors, []);
});

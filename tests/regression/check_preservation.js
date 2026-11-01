#!/usr/bin/env node
// Node.js counterpart to check_preservation.py. Keep both until parity is reviewed.
const fs = require('node:fs');
const path = require('node:path');
const { fileURLToPath } = require('node:url');
const ROOT = path.resolve(__dirname, '../..');
const BASELINE = path.join(ROOT, 'tests/regression/protected-files.json');

function check(root = ROOT, baseline = BASELINE) {
  const paths = JSON.parse(fs.readFileSync(baseline, 'utf8')).required_paths;
  if (paths.length !== new Set(paths).size) return ['Duplicate baseline paths'];
  const errors = [];
  const rootReal = fs.realpathSync(root);
  for (const rel of paths) {
    const target = path.resolve(root, rel);
    // Resolve existing symlinks; for missing files, resolve their real parent.
    let resolved = target;
    try { resolved = fs.realpathSync(target); }
    catch {
      let parent = path.dirname(target);
      while (!fs.existsSync(parent) && parent !== path.dirname(parent)) parent = path.dirname(parent);
      if (fs.existsSync(parent)) resolved = path.resolve(fs.realpathSync(parent), path.relative(parent, target));
    }
    if (resolved !== rootReal && !resolved.startsWith(rootReal + path.sep)) {
      errors.push('Unsafe path: ' + rel);
    } else {
      let stat;
      try { stat = fs.statSync(target); } catch { /* missing */ }
      if (!stat || !stat.isFile()) errors.push('Missing protected file: ' + rel);
      else if (stat.size === 0) errors.push('Empty protected file: ' + rel);
    }
  }
  return errors;
}
function main() {
  const errors = check();
  const count = JSON.parse(fs.readFileSync(BASELINE, 'utf8')).required_paths.length;
  console.log('Protected paths: ' + count);
  for (const error of errors) console.log('FAIL:', error);
  console.log((errors.length ? 'FAIL' : 'PASS') + ': baseline file preservation');
  if (errors.length) process.exitCode = 1;
}
if (require.main === module) main();
module.exports = { check };

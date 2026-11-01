#!/usr/bin/env node
// Node.js counterpart to validate_repo.py. Keep both until parity is reviewed.
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const REQUIRED = [
  'README.md','SKILL.md','AGENT-INSTRUCTIONS.md','LICENSE',
  'references/storytelling.md','references/visual-style.md',
  'references/prompt-engineering.md','references/audio-design.md',
  'references/quality-control.md','references/postproduction.md',
  'adapters/google-flow.md','adapters/other-generators.md',
  'templates/project-bible.md','templates/storyboard.md',
  'templates/shot-prompt.md','templates/shot-review.md',
  'examples/stickman-short-film/README.md',
  'examples/cinematic-short-film/README.md',
  'examples/corporate-story/README.md',
  'docs/installation.md','docs/troubleshooting.md',
  '.github/workflows/validate.yml'
];
function markdownFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...markdownFiles(p));
    else if (entry.isFile() && entry.name.endsWith('.md')) result.push(p);
  }
  return result;
}
function validate(root = ROOT) {
  const errors = [];
  for (const rel of REQUIRED) {
    const p = path.join(root, rel);
    if (!fs.existsSync(p) || !fs.statSync(p).isFile() || !fs.readFileSync(p, 'utf8').trim()) {
      errors.push('Missing or empty: ' + rel);
    }
  }
  const skillPath = path.join(root, 'SKILL.md');
  const skill = fs.existsSync(skillPath) ? fs.readFileSync(skillPath, 'utf8') : '';
  if (!skill.startsWith('---\n') || !/^name:\s*universal-ai-film-director\s*$/m.test(skill))
    errors.push('SKILL.md requires valid name frontmatter');
  const contracts = {
    'one-question contract': /one\s+(?:focused\s+)?question|exactly one question/i,
    'explicit approvals': /approval|approve/i,
    'shot locking': /lock/i,
    'review without fabricated inspection': /inspect|review/i,
    'generator limitation disclosure': /capabilit|limit|supported/i
  };
  for (const [name, pattern] of Object.entries(contracts))
    if (!pattern.test(skill)) errors.push('Missing behavioral contract: ' + name);
  const markdown = markdownFiles(root);
  for (const md of markdown) {
    const source = fs.readFileSync(md, 'utf8');
    const pattern = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g;
    for (const match of source.matchAll(pattern)) {
      const raw = match[1];
      const target = raw.split('#', 1)[0].trim().split(' ', 1)[0];
      if (!target || /^(?:https?:|mailto:|data:)/.test(target)) continue;
      const link = path.resolve(path.dirname(md), target);
      if (!fs.existsSync(link) || !fs.statSync(link).isFile())
        errors.push('Broken link: ' + path.relative(root, md).split(path.sep).join('/') + ' -> ' + raw);
    }
  }
  return { errors, requiredCount: REQUIRED.length, markdownCount: markdown.length };
}
function main() {
  const result = validate();
  console.log('Checked ' + result.requiredCount + ' required paths, ' + result.markdownCount + ' Markdown files, behavior rules and relative links.');
  for (const error of result.errors) console.log('FAIL: ' + error);
  if (result.errors.length) process.exitCode = 1;
  else console.log('PASS: offline structural and instruction-contract checks');
}
if (require.main === module) main();
module.exports = { validate, REQUIRED };

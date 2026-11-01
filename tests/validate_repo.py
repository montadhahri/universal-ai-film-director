#!/usr/bin/env python3
"""Offline structural and behavioral-contract checks for the portable Agent Skill."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'README.md', 'SKILL.md', 'AGENT-INSTRUCTIONS.md', 'LICENSE',
    'references/storytelling.md', 'references/visual-style.md',
    'references/prompt-engineering.md', 'references/audio-design.md',
    'references/quality-control.md', 'references/postproduction.md',
    'adapters/google-flow.md', 'adapters/other-generators.md',
    'templates/project-bible.md', 'templates/storyboard.md',
    'templates/shot-prompt.md', 'templates/shot-review.md',
    'examples/stickman-short-film/README.md',
    'examples/cinematic-short-film/README.md',
    'examples/corporate-story/README.md',
    'docs/installation.md', 'docs/troubleshooting.md',
    '.github/workflows/validate.yml',
]
errors = []
for rel in REQUIRED:
    p = ROOT / rel
    if not p.is_file() or not p.read_text(encoding='utf-8').strip():
        errors.append(f'Missing or empty: {rel}')

skill = (ROOT / 'SKILL.md').read_text(encoding='utf-8')
if not skill.startswith('---\n') or not re.search(r'^name:\s*universal-ai-film-director\s*$', skill, re.M):
    errors.append('SKILL.md requires valid name frontmatter')
for term, pat in {
    'one-question contract': r'one\s+(?:focused\s+)?question|exactly one question',
    'explicit approvals': r'approval|approve',
    'shot locking': r'lock',
    'review without fabricated inspection': r'inspect|review',
    'generator limitation disclosure': r'capabilit|limit|supported',
}.items():
    if not re.search(pat, skill, re.I):
        errors.append(f'Missing behavioral contract: {term}')

link_pattern = re.compile(r'(?<!!)\[[^\]]+\]\(([^)]+)\)')
for md in ROOT.rglob('*.md'):
    for raw in link_pattern.findall(md.read_text(encoding='utf-8')):
        path = raw.split('#', 1)[0].strip().split(' ', 1)[0]
        if not path or path.startswith(('http:', 'https:', 'mailto:', 'data:')):
            continue
        if not (md.parent / path).resolve().is_file():
            errors.append(f'Broken link: {md.relative_to(ROOT)} -> {raw}')

print(f'Checked {len(REQUIRED)} required paths, {len(list(ROOT.rglob("*.md")))} Markdown files, behavior rules and relative links.')
if errors:
    print('\n'.join('FAIL: ' + x for x in errors))
    sys.exit(1)
print('PASS: offline structural and instruction-contract checks')

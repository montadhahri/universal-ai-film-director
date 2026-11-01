import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');

test('cinematography distinguishes global edit time from source overlaps', () => {
  const guide = read('skills/film-cinematography/references/guide.md');
  const planning = read('skills/film-cinematography/references/shot-planning.md');
  assert.match(guide, /global edit intervals/);
  assert.match(guide, /source-clip durations/);
  assert.match(planning, /never subtract overlaps again/);
  assert.match(planning, /incoming\/outgoing shot IDs/);
});

test('storyboard handoff retains revision and dependency fields', () => {
  const template = read('skills/film-cinematography/assets/storyboard-template.md');
  for (const field of ['Approved screenplay ID / revision', 'Approved Visual Bible ID / revision', 'Storyboard ID / proposed revision', 'Global edit start–end', 'Source clip in/out', 'adjacent dependencies', 'Director approval required']) {
    assert.ok(template.includes(field), field);
  }
  assert.match(template, /PROPOSED/);
});

test('camera reversal cannot silently mirror approved geography', () => {
  const planning = read('skills/film-cinematography/references/shot-planning.md');
  assert.match(planning, /does not authorize mirroring/);
  assert.match(planning, /dependent adjacent shot IDs/);
});

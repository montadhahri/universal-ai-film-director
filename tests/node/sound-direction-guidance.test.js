'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = p => fs.readFileSync(require('node:path').join(__dirname, '../../', p), 'utf8');

test('sound guidance separates narration-only pauses from all-track silence', () => {
 const procedure = read('skills/film-sound-direction/references/audio-direction.md');
 const skill = read('skills/film-sound-direction/SKILL.md');
 assert.match(procedure, /track-specific silence/);
 assert.match(procedure, /absolute silence/);
 assert.match(procedure, /intentional_silence/);
 assert.match(procedure, /required_narration/);
 assert.match(skill, /all-track silence/);
});

test('audio timeline records speech feasibility and scoped repair', () => {
 const template = read('skills/film-sound-direction/assets/audio-timeline-template.md');
 for(const field of ['Speech estimate / pause margin', 'all-tracks', 'approved audio revision', 'rollback plan', 'provenance']) {
   assert.ok(template.includes(field), field);
 }
});

'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const pack = require('../agent-acceptance/sound-direction-cases.json');

test('SND-01–SND-06 are independent, unique external-agent cases', () => {
 assert.equal(pack.skill, 'film-sound-direction');
 assert.equal(pack.execution, 'external-agent-only');
 assert.deepEqual(pack.cases.map(c=>c.id), ['SND-01','SND-02','SND-03','SND-04','SND-05','SND-06']);
 assert.equal(new Set(pack.cases.map(c=>c.prompt)).size, 6);
 for(const c of pack.cases) {
  assert.ok(c.prompt.length > 180, c.id);
  assert.equal(c.expected.length, 4, c.id);
  assert.match(c.prompt,/PROPOSED/);
 }
});
test('Sound pack does not modify canonical V2-03 acceptance suite', () => {
 const base = require('../agent-acceptance/cases.json');
 assert.equal(base.cases.length,14);
 assert.ok(!base.cases.some(c=>pack.cases.some(s=>s.id===c.id)));
});
test('Silence fixtures distinguish voice-only pause from absolute silence', () => {
 const voice=pack.cases.find(c=>c.id==='SND-02');
 const absolute=pack.cases.find(c=>c.id==='SND-03');
 assert.match(voice.prompt,/7–12s/);
 assert.match(voice.prompt,/music and ambience continue/);
 assert.match(absolute.prompt,/9–11s/);
 assert.match(absolute.prompt,/every audio track/);
});

test('SND-05 explicitly states approved film duration for 30s export criterion', () => {
 const c=pack.cases.find(c=>c.id==='SND-05');
 assert.match(c.prompt,/30-second picture/);
 assert.ok(c.expected.some(e=>e.includes('30s export')));
});
test('speech guidance requires literal counts and arithmetic cross-check', () => {
 const fs=require('node:fs');
 const path=require('node:path');
 const s=fs.readFileSync(path.join(__dirname,'../../skills/film-sound-direction/references/audio-direction.md'),'utf8');
 assert.match(s,/word count × 60/);
 assert.match(s,/remaining margin = cue window duration/);
 assert.match(s,/recount the literal approved line/);
});

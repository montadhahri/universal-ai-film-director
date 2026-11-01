'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '../../', p), 'utf8');

test('shot packet records approved revisions, edit timing and dependencies', () => {
 const template = read('skills/film-video-production/assets/shot-packet-template.md');
 for (const field of ['Approved storyboard revision / Visual Bible revision','Global start / end','transition overlap','dependency IDs','Reference assets','Authorization status']) {
  assert.ok(template.includes(field), field);
 }
});
test('execution state transitions require distinct evidence', () => {
 const guide = read('skills/film-video-production/references/guide.md');
 for (const state of ['PLAN_ONLY','BLOCKED_NO_PROVIDER','REQUESTED','GENERATED','RETRIEVED','INSPECTED','FAILED']) {
  assert.ok(guide.includes(state), state);
 }
 assert.match(guide,/Never advance states based on/);
 assert.match(guide,/real playable media reviewed/);
});

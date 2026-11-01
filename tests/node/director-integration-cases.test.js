'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const pack=require('../agent-acceptance/director-integration-cases.json');
test('INT-01–INT-06 exact prompts and reviewer criteria are structurally valid',()=>{
 assert.equal(pack.execution,'external-agent-only');
 assert.equal(pack.skill,'universal-ai-film-director');
 assert.deepEqual(pack.cases.map(c=>c.id),['INT-01','INT-02','INT-03','INT-04','INT-05','INT-06']);
 assert.equal(new Set(pack.cases.map(c=>c.prompt)).size,6);
 for(const c of pack.cases){assert.ok(c.prompt.length>180,c.id);assert.equal(c.expected.length,4,c.id);assert.match(c.prompt,/PROPOSED/);assert.match(c.prompt,/HOLD/);}
});
test('canonical V2 suite remains intact',()=>{
 const base=require('../agent-acceptance/cases.json');
 assert.deepEqual(base.cases.map(c=>c.id),['DIR-01','DIR-02','DIR-03','DIR-04','STORY-01','VISUAL-01','CINEMA-01','VIDEO-01','SOUND-01','SOUND-02','QA-01','QA-02','HANDOFF-01','DIR-05']);
});
test('integration scenarios ground continuity and authorization constraints',()=>{
 const get=id=>pack.cases.find(c=>c.id===id).prompt;
 assert.match(get('INT-01'),/visibly places and releases it inside TOWER-01 lantern/);
 assert.match(get('INT-02'),/revision 16/);
 assert.match(get('INT-03'),/two pending proposals/);
 assert.match(get('INT-04'),/revision 27/);
 assert.match(get('INT-05'),/CUE-N04 beginning 18s/);
 assert.match(get('INT-06'),/REQ-77/);
});
test('deterministic integration contracts remain available',()=>{
 for(const p of ['scripts/project-contracts.js','scripts/director-authority.js','scripts/production-pipeline.js','docs/director-authority.md','docs/production-pipeline.md'])assert.ok(fs.existsSync(path.join(__dirname,'../..',p)),p);
});

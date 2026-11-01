'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const pack=require('../agent-acceptance/continuity-qa-cases.json');
test('QA-01–QA-06 exact prompts and private criteria are structurally valid',()=>{
 assert.equal(pack.skill,'film-continuity-qa');
 assert.equal(pack.execution,'external-agent-only');
 assert.deepEqual(pack.cases.map(c=>c.id),['QA-01','QA-02','QA-03','QA-04','QA-05','QA-06']);
 assert.equal(new Set(pack.cases.map(c=>c.prompt)).size,6);
 for(const c of pack.cases){assert.ok(c.prompt.length>180,c.id);assert.equal(c.expected.length,4,c.id);assert.match(c.prompt,/PROPOSED/);assert.match(c.prompt,/HOLD/);}
});
test('QA pack remains distinct from canonical V2 acceptance suite',()=>{
 const base=require('../agent-acceptance/cases.json');
 assert.equal(base.cases.length,14);
 assert.deepEqual(base.cases.map(c=>c.id),['DIR-01','DIR-02','DIR-03','DIR-04','STORY-01','VISUAL-01','CINEMA-01','VIDEO-01','SOUND-01','SOUND-02','QA-01','QA-02','HANDOFF-01','DIR-05']);
 // IDs are scoped to their suite: QA-01 and QA-02 also exist in the canonical suite.
});
test('QA scenarios ground every criterion-specific approved dependency',()=>{
 const get=id=>pack.cases.find(c=>c.id===id).prompt;
 assert.match(get('QA-02'),/CUE-N07 at 33–39s/);
 assert.match(get('QA-03'),/SH07 ending 27–30s/);
 assert.match(get('QA-04'),/placing and releasing SPARK-01 inside TOWER-01 lantern/);
 assert.match(get('QA-05'),/JOB-611 generated ASSET-611/);
 assert.match(get('QA-06'),/CUE-N04 starting at 18s/);
});
test('QA skill source and templates remain present',()=>{
 const root=path.join(__dirname,'../../skills/film-continuity-qa');
 for(const p of ['SKILL.md','references/guide.md','references/quality-assurance.md','references/quality-control.md','references/localized-repair.md','references/postproduction.md','references/worked-example.md','assets/defect-report-template.md','assets/repair-plan-template.md','assets/shot-review-template.md'])assert.ok(fs.existsSync(path.join(root,p)),p);
});

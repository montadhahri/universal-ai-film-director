'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {evaluate}=require('../agent-acceptance/run.js');
const cases=require('../agent-acceptance/cases.json').cases;
test('all seven specialist routes and 14 real-agent cases are declared',()=>{
 assert.equal(cases.length,14);assert.equal(new Set(cases.map(c=>c.id)).size,14);
 assert.equal(new Set(cases.map(c=>c.skill)).size,7);
});
test('no captures means NOT_RUN, never a fake pass',()=>{
 const r=evaluate();assert.equal(r.counts.NOT_RUN,14);assert.equal(r.counts.PASS,0);
 assert.equal(r.agent_invoked_by_runner,false);assert.equal(r.video_generated,false);
});
test('reviewed capture without loaded skill evidence fails',()=>{
 const c=cases[0],r=evaluate({captures:[{case_id:c.id,verdict:'PASS',host:'x',model:'m',time:'2026-11-01T18:00:00Z',prompt:c.prompt,response:'Some reply',skill:c.skill,evidence_ref:'e1',review_notes:'review'}]});
 assert.equal(r.counts.FAIL,1);assert.equal(r.counts.NOT_RUN,13);
});
test('a complete human-reviewed capture remains labeled unverified external evidence',()=>{
 const c=cases[0],r=evaluate({captures:[{case_id:c.id,verdict:'PASS',host:'x',model:'m',time:'2026-11-01T18:00:00Z',prompt:c.prompt,response:'One question?',skill:c.skill,loaded_files:['skills/'+c.skill+'/SKILL.md'],evidence_ref:'private-record',review_notes:'Manual review'}]});
 assert.equal(r.counts.PASS,1);assert.equal(r.counts.NOT_RUN,13);
 assert.equal(r.results[0].evidence_class,'SUPPLIED_CAPTURE_UNVERIFIED');assert.equal(r.agent_invoked_by_runner,false);
});
test('unknown and duplicated capture IDs rejected',()=>{
 assert.throws(()=>evaluate({captures:[{case_id:'not-real'}]}),/Unknown/);
 assert.throws(()=>evaluate({captures:[{case_id:cases[0].id},{case_id:cases[0].id}]}),/Duplicate/);
});
test('BLOCKED requires reason and cannot count as pass',()=>{
 assert.equal(evaluate({captures:[{case_id:cases[0].id,verdict:'BLOCKED'}]}).counts.FAIL,1);
 assert.equal(evaluate({captures:[{case_id:cases[0].id,verdict:'BLOCKED',reason:'No host'}]}).counts.BLOCKED,1);
});
test('no-media claim is flagged even if reviewer says PASS',()=>{
 const c=cases.find(x=>x.id==='QA-01');
 const x={case_id:c.id,verdict:'PASS',host:'x',model:'m',time:'2026-11-01T18:00:00Z',prompt:c.prompt,response:'I inspected the video',skill:c.skill,loaded_files:['skills/'+c.skill+'/SKILL.md'],evidence_ref:'e',review_notes:'oops'};
 assert.equal(evaluate({captures:[x]}).counts.FAIL,1);
});

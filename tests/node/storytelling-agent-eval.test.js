'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {evaluate}=require('../storytelling-agent-eval/run.js');
const suite=require('../storytelling-agent-eval/cases.json');
const c=suite.cases[0];
const capture=(caseItem=c)=>({
 case_id:caseItem.id,verdict:'PASS',host:'external-host',model:'model-version',
 time:'2026-11-01T19:00:00Z',prompt:caseItem.prompt,response:'PROPOSED screenplay, no media generated',
 skill:'film-storytelling',skill_revision:'verified-commit',
 loaded_files:['skills/film-storytelling/SKILL.md'],evidence_ref:'private-log',
 reviewer:'reviewer-1',review_notes:'Reviewed entire response',
 criteria:Object.fromEntries(caseItem.expected.map(x=>[x,{verdict:'PASS',evidence:'Reviewed relevant beat and timecode'}]))
});
test('ST-01 through ST-06 are unique and require real agent evidence',()=>{
 assert.deepEqual(suite.cases.map(x=>x.id),['ST-01','ST-02','ST-03','ST-04','ST-05','ST-06']);
 assert(suite.cases.every(x=>x.expected.length>=3));
});
test('without captures, six NOT_RUN and no agent invoked',()=>{
 const r=evaluate();assert.equal(r.counts.NOT_RUN,6);assert.equal(r.counts.PASS,0);
 assert.equal(r.agent_invoked_by_runner,false);assert.equal(r.media_generated,false);
});
test('missing loaded skill evidence rejects claimed PASS',()=>{
 const x=capture();delete x.loaded_files;
 const r=evaluate({captures:[x]});assert.equal(r.counts.FAIL,1);
});
test('mismatched prompt rejects claimed PASS',()=>{
 const x=capture();x.prompt+=' changed';
 assert.equal(evaluate({captures:[x]}).counts.FAIL,1);
});
test('criterion FAIL prevents overall PASS',()=>{
 const x=capture();x.criteria[c.expected[0]]={verdict:'FAIL',evidence:'Missing causal link'};
 assert.equal(evaluate({captures:[x]}).counts.FAIL,1);
});
test('a complete reviewer-supplied capture remains unverified',()=>{
 const r=evaluate({captures:[capture()]});assert.equal(r.counts.PASS,1);
 assert.equal(r.counts.NOT_RUN,5);assert.equal(r.results[0].evidence_class,'REVIEWER_SUPPLIED_UNVERIFIED');
});
test('BLOCKED needs reason and is not a PASS',()=>{
 assert.equal(evaluate({captures:[{case_id:'ST-06',verdict:'BLOCKED'}]}).counts.FAIL,1);
 assert.equal(evaluate({captures:[{case_id:'ST-06',verdict:'BLOCKED',reason:'No host'}]}).counts.BLOCKED,1);
});
test('duplicate and unknown IDs rejected',()=>{
 assert.throws(()=>evaluate({captures:[capture(),capture()]}),/Duplicate/);
 assert.throws(()=>evaluate({captures:[{case_id:'ST-99'}]}),/Unknown/);
});
test('fabricated media inspection claim flagged for review',()=>{
 const x=capture();x.response='I inspected the video';
 assert.equal(evaluate({captures:[x]}).counts.FAIL,1);
});

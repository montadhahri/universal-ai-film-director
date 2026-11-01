'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {evaluate}=require('../quality-benchmark/run.js');
const manifest=require('../quality-benchmark/cases.json');
const example=(c,baseline=3,candidate=4)=>{
 const capture=version=>({version,host:'external-host',model:'external-model',timestamp:'2026-11-01T17:00:00Z',
  prompt:c.prompt,response:'Captured response',skill:c.skill,evidence_ref:'private-capture',loaded_skill_file:'SKILL.md'});
 return {case_id:c.id,status:'REVIEWED',reviewer:'reviewer-1',review_ref:'private-review',blind_order:'BA',
 baseline:capture('v1.0.0'),candidate:capture('v2-development'),
 scores:{baseline:Object.fromEntries(c.dimensions.map(d=>[d,baseline])),candidate:Object.fromEntries(c.dimensions.map(d=>[d,candidate]))},
 rationale:{baseline:'Reviewer recorded weaknesses',candidate:'Reviewer recorded improvements'},safety_violation:false};
};
test('eight quality scenarios span all seven skills',()=>{
 assert.equal(manifest.cases.length,8);
 assert.equal(new Set(manifest.cases.map(c=>c.skill)).size,7);
 for(const c of manifest.cases){assert(c.dimensions.length>1);for(const d of c.dimensions)assert(manifest.dimensions[d]);}
});
test('empty captures are NOT_RUN and never assert improvement',()=>{
 const r=evaluate();assert.equal(r.counts.NOT_RUN,8);assert.equal(r.counts.PASS,0);
 assert.equal(r.mean_delta,null);assert.equal(r.model_executed,false);
});
test('reviewed pair is reported, not independently validated',()=>{
 const r=evaluate({comparisons:[example(manifest.cases[0])]});
 assert.equal(r.counts.PASS,1);assert.equal(r.counts.NOT_RUN,7);
 assert.equal(r.wins.V2_HIGHER,1);assert.equal(r.mean_delta,1);
 assert.equal(r.reviewer_captures_unverified,true);
});
test('baseline wins and ties are never hidden',()=>{
 const c=manifest.cases[0],loss=evaluate({comparisons:[example(c,4,2)]}),tie=evaluate({comparisons:[example(c,3,3)]});
 assert.equal(loss.wins.V1_HIGHER,1);assert.equal(tie.wins.TIE,1);
});
test('missing captures or review provenance fail validation',()=>{
 const c=manifest.cases[0],p=example(c);delete p.baseline;
 assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 const q=example(c);q.review_ref='';
 assert.equal(evaluate({comparisons:[q]}).counts.FAIL,1);
});
test('unanchored scores and safety violations disallow PASS',()=>{
 const c=manifest.cases[0],p=example(c);p.scores.candidate[c.dimensions[0]]=6;
 assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 const q=example(c);q.safety_violation=true;
 assert.equal(evaluate({comparisons:[q]}).counts.FAIL,1);
});
test('blocked and missing comparisons do not count as success',()=>{
 const c=manifest.cases[0],r=evaluate({comparisons:[{case_id:c.id,status:'BLOCKED',reason:'No tested model'}]});
 assert.equal(r.counts.BLOCKED,1);assert.equal(r.counts.NOT_RUN,7);
 assert.equal(evaluate({comparisons:[{case_id:c.id,status:'BLOCKED'}]}).counts.FAIL,1);
});
test('duplicates, unknown IDs, and changed prompts rejected',()=>{
 const c=manifest.cases[0];assert.throws(()=>evaluate({comparisons:[{case_id:'NOPE'}]}),/Unknown/);
 assert.throws(()=>evaluate({comparisons:[{case_id:c.id},{case_id:c.id}]}),/Duplicate/);
 const p=example(c);p.candidate.prompt='Different prompt';
 assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
});

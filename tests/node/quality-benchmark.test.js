'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {evaluate}=require('../quality-benchmark/run.js');
const manifest=require('../quality-benchmark/cases.json');
const example=(c,baseline=3,candidate=4)=>{
 const capture=version=>({version,host:'external-host',model:'external-model',timestamp:'2026-11-01T17:00:00Z',
  prompt:c.prompt,response:'Synthetic test response',skill:version==='v1.0.0'?'universal-ai-film-director':c.skill,evidence_ref:'synthetic-test-capture',loaded_skill_file:'SKILL.md'});
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

test('all historical monolithic baselines retain the actual V2 skill identity',()=>{
 const r=evaluate({comparisons:manifest.cases.map(c=>example(c))});
 assert.equal(r.counts.PASS,8);assert.equal(r.complete,true);
 for(const row of r.results)assert.deepEqual(row.metadata_limitations,[]);
});
test('historically nonexistent V1 specialists and incorrect V2 mappings fail',()=>{
 for(const c of manifest.cases.slice(1)){
  const p=example(c);p.baseline.skill=c.skill;
  assert.match(evaluate({comparisons:[p]}).results.find(r=>r.case_id===c.id).issues.join(),/baseline.*mismatch/);
  const q=example(c);q.candidate.skill='universal-ai-film-director';
  assert.match(evaluate({comparisons:[q]}).results.find(r=>r.case_id===c.id).issues.join(),/candidate.*mismatch/);
 }
 for(const role of ['baseline','candidate'])for(const field of ['skill','version']){
  const p=example(manifest.cases[0]);p[role][field]='incorrect';
  assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
});
test('explicit unavailable execution metadata passes with visible limitations',()=>{
 const p=example(manifest.cases[1]);
 for(const role of ['baseline','candidate']){
  p[role].metadata_unavailable={};
  for(const field of ['host','model','timestamp']){
   p[role][field]=null;p[role].metadata_unavailable[field]='Not exposed by the execution host';
  }
 }
 const r=evaluate({comparisons:[p]});assert.equal(r.counts.PASS,1);
 assert.equal(r.results[1].metadata_limitations.length,6);
 assert.deepEqual(r.results[1].metadata_limitations[0],{capture:'baseline',field:'host',reason:'Not exposed by the execution host'});
 assert.equal(p.baseline.model,null);assert.equal(p.candidate.timestamp,null);
});
test('missing, blank, invalid or unexplained execution metadata does not pass',()=>{
 for(const role of ['baseline','candidate'])for(const field of ['host','model','timestamp']){
  for(const value of [undefined,null,'',42]){
   const p=example(manifest.cases[0]);p[role][field]=value;
   assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
  }
  for(const reason of ['',null,42]){
   const p=example(manifest.cases[0]);p[role][field]=null;p[role].metadata_unavailable={[field]:reason};
   assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
  }
 }
 const p=example(manifest.cases[0]);p.baseline.timestamp='not-a-date';
 assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
});
test('unavailability cannot contradict supplied values or exempt evidence fields',()=>{
 for(const unavailable of ['unknown',[],{model:'Not exposed'},{response:'Not exposed'}]){
  const p=example(manifest.cases[0]);p.baseline.metadata_unavailable=unavailable;
  assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
 for(const role of ['baseline','candidate'])for(const field of ['prompt','response','evidence_ref','loaded_skill_file']){
  const p=example(manifest.cases[0]);p[role][field]=null;p[role].metadata_unavailable={[field]:'Not exposed'};
  assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
});
test('missing source evidence fails even with explained missing model and timestamp',()=>{
 for(const role of ['baseline','candidate'])for(const field of ['evidence_ref','loaded_skill_file']){
  const p=example(manifest.cases[0]);p[role].model=null;p[role].timestamp=null;
  p[role].metadata_unavailable={model:'Not exposed',timestamp:'No run timestamp retained'};
  delete p[role][field];assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
});
test('incomplete blind review metadata never counts as success',()=>{
 for(const field of ['reviewer','review_ref','blind_order'])for(const value of [undefined,null,'']){
  const p=example(manifest.cases[0]);p[field]=value;
  const r=evaluate({comparisons:[p]});assert.equal(r.counts.FAIL,1);assert.equal(r.wins.V2_HIGHER,0);
 }
 for(const order of ['AA','AB/BA','NON_BLIND']){
  const p=example(manifest.cases[0]);p.blind_order=order;
  assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
 for(const role of ['baseline','candidate']){
  const p=example(manifest.cases[0]);delete p.rationale[role];
  assert.equal(evaluate({comparisons:[p]}).counts.FAIL,1);
 }
});


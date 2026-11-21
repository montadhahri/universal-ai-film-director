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

test('strict CLI requires complete reviewed captures while default remains offline-compatible',()=>{
 const {spawnSync}=require('node:child_process');
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'acceptance-'));
 try {
  const file=path.join(dir,'captures.json');
  const cli=require.resolve('../agent-acceptance/run.js');
  const run=(captures,strict)=>{fs.writeFileSync(file,JSON.stringify({captures}));return spawnSync(process.execPath,[cli,'--captures',file,...(strict?['--strict']:[])],{encoding:'utf8'}).status;};
  const valid=cases.map(c=>({case_id:c.id,verdict:'PASS',host:'test',model:'fixture',time:'2026-11-01T18:00:00Z',prompt:c.prompt,response:'Fixture response',skill:c.skill,loaded_files:['skills/'+c.skill+'/SKILL.md'],evidence_ref:'fixture',review_notes:'Synthetic test only'}));
  assert.equal(run([],false),0);
  assert.equal(run([],true),1);
  assert.equal(run(valid.slice(1),true),1);
  assert.equal(run([{...valid[0],verdict:'BLOCKED',reason:'No host'},...valid.slice(1)],true),1);
  assert.equal(run([{...valid[0],verdict:'FAIL'},...valid.slice(1)],true),1);
  assert.equal(run(valid,true),0);
 } finally {fs.rmSync(dir,{recursive:true,force:true});}
});

test('preproduction report separates offline success from external acceptance and records revision',()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
 const {spawnSync}=require('node:child_process');
 // Inspect the report builder without recursively invoking the regression suite.
 const source=fs.readFileSync(require.resolve('../preprod/run_validation.js'),'utf8');
 assert.match(source,/evidence_class:'OFFLINE_HARNESS_ONLY'/);
 assert.match(source,/external_acceptance:\{agent:'NOT_RUN',creative_quality:'NOT_RUN',media:'NOT_RUN'\}/);
 assert.match(source,/source_revision:revision.status===0\?revision.stdout.trim\(\):null/);
});

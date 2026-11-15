'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {createProjectSnapshot}=require('../../scripts/project-snapshot.js');
const schema=require('../../contracts/project-snapshot.schema.json');
test('snapshot uses versioned public schema and preserves read-only identity',()=>{
 const p=newProject('consumer-demo');
 const s=createProjectSnapshot(p);
 assert.equal(schema.properties.contract_version.const,'1.0');
 assert.equal(s.contract_version,'1.0');
 assert.equal(s.source_schema_version,'2.0');
 assert.equal(s.project_id,p.project_id);
 assert.equal(s.revision,p.revision);
 assert.deepEqual(s.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});
 assert.equal(s.workflow.proposal_count,0);
});
test('snapshot exposes scoped shot and memory references without leaking user evidence or mutating source',()=>{
 const p=newProject('demo');
 p.shots.push({id:'SH01',revision:1,state:'LOCKED',approved_asset:'asset-01',continuity_refs:['CH01'],issues:[]});
 p.memory_anchors=[{id:'CH01',kind:'character',revision:1,status:'PROPOSED',description:'private draft',
  provenance:{kind:'AGENT_DRAFT',reference:null},shot_refs:['SH01']}];
 p.gates.script={approved:true,version:'v1',evidence:'user reference'};
 const before=structuredClone(p);
 const s=createProjectSnapshot(p);
 assert.equal(s.workflow.locked_shot_count,1);
 assert.equal(s.shots[0].approved_asset,'asset-01');
 assert.equal(s.memory_anchors[0].id,'CH01');
 assert.equal(JSON.stringify(s).includes('private draft'),false);
 assert.deepEqual(p,before);
 s.shots[0].issues.push('local-only');
 assert.deepEqual(p,before);
});
test('snapshot rejects invalid authority, unknown version and unexpected fields',()=>{
 const p=newProject('demo');
 for(const mutate of [x=>{x.authorization.production_go=true;},x=>{x.schema_version='3.0';},
  x=>{x.unrecognized='unsafe';},x=>{x.gates.storyboard={approved:true};},x=>{x.shots=[{id:'X',revision:1,state:'LOCKED',issues:[],continuity_refs:[]}];}]){
  const q=structuredClone(p);mutate(q);assert.throws(()=>createProjectSnapshot(q));
 }
});

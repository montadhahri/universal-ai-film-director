'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject,validateProject,validateProposal,recordProposal}=require('../../scripts/project-contracts.js');
const sample=()=>newProject('fixture-only');
const make=p=>({contract_version:'2.0',project_id:p.project_id,request_id:'request-one',
 origin:'film-cinematography',stage:'storyboard',input_revision:p.revision,status:'PROPOSED',
 proposed_artifact:{id:'storyboard-proposal',revision:1,kind:'storyboard'},
 provenance:{kind:'AGENT_DRAFT',evidence_ref:null},required_authorization:['storyboard_user_approval']});
test('new project defaults to zero approvals, zero media, zero side-effect permission',()=>{
 const p=sample();assert(validateProject(p));assert(p.revision===1);assert.deepEqual(p.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});
 assert(Object.values(p.gates).every(g=>g.approved===false));assert.equal(p.shots.length,0);
});
test('approved gate without user evidence is invalid',()=>{const p=sample();p.gates.storyboard={approved:true,version:'V1'};assert.throws(()=>validateProject(p),/evidence/);});
test('locked shot requires asset reference',()=>{const p=sample();p.shots.push({id:'SH1',revision:1,state:'LOCKED',continuity_refs:[],issues:[]});assert.throws(()=>validateProject(p),/approved asset/);});
test('duplicate shot revisions refused',()=>{const p=sample(),s={id:'SH1',revision:1,state:'DRAFT',continuity_refs:[],issues:[]};p.shots=[s,structuredClone(s)];assert.throws(()=>validateProject(p),/Duplicate/);});
test('specialist proposal adds no approvals or side effects',()=>{
 const p=sample(),q=make(p),updated=recordProposal(p,q);
 assert.equal(p.proposals.length,0);assert.equal(updated.proposals.length,1);
 assert.equal(updated.revision,2);assert.deepEqual(updated.gates,p.gates);
 assert.deepEqual(updated.authorization,p.authorization);
});
test('stale requests and retries cannot overwrite canonical state',()=>{
 const p=sample(),q=make(p),updated=recordProposal(p,q);
 assert.throws(()=>recordProposal(updated,q),/Stale/);
 const retry=make(updated);assert.throws(()=>recordProposal(updated,retry),/Duplicate/);
});
test('cross-project, fabricated inspection and self-approval rejected',()=>{
 const p=sample(),q=make(p);q.project_id='other';assert.throws(()=>validateProposal(p,q),/mismatch/);
 q.project_id=p.project_id;q.provenance.kind='DIRECT_INSPECTION';assert.throws(()=>validateProposal(p,q),/inspection/);
 q.provenance.kind='AGENT_DRAFT';q.status='APPROVED';assert.throws(()=>validateProposal(p,q),/Invalid/);
});
test('explicit flags do not grant provider access to specialist',()=>{const p=sample();const q=make(p);q.required_authorization.push('provider_job_permission');const next=recordProposal(p,q);assert.equal(next.authorization.provider_job_allowed,false);});

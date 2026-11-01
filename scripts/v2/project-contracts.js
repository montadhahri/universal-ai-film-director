'use strict';
// Lossless bridge for the v1.0.0 Project Bible. No external dependencies.
// This module does NOT implement approvals, provider execution or persisted storage.
const fs = require('node:fs');
const {isDeepStrictEqual} = require('node:util');
const safeCopy = value => JSON.parse(JSON.stringify(value));
const requiredGates = ['script','visual_bible','storyboard'];
const shotStates = new Set(['DRAFT','PROPOSED','APPROVED','LOCKED','NEEDS_FIX']);
const origins = new Set(['film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa']);
function fail(message) {throw new Error(message);}
function object(x) {return x!==null && typeof x==='object' && !Array.isArray(x);}
function nonEmpty(x){return typeof x==='string' && x.trim().length>0;}
function assertV1(snapshot){
 if(!object(snapshot) || snapshot.schema_version!=='1.0'||!nonEmpty(snapshot.project_id))fail('Invalid v1 snapshot identity');
 if(!object(snapshot.gates)||!requiredGates.every(k=>object(snapshot.gates[k])&&typeof snapshot.gates[k].approved==='boolean'))fail('Missing v1 approval gates');
 for(const k of requiredGates){const g=snapshot.gates[k];if(g.approved&&(!nonEmpty(g.version)||!nonEmpty(g.evidence)))fail('Approved gate lacks actual evidence: '+k);}
 if(!Array.isArray(snapshot.shots)||!Array.isArray(snapshot.decisions)||!Array.isArray(snapshot.continuity))fail('Missing v1 collections');
 const ids=new Set();
 for(const s of snapshot.shots){
  if(!object(s)||!nonEmpty(s.id)||!Number.isInteger(s.revision)||s.revision<1||!shotStates.has(s.state))fail('Invalid v1 shot');
  const id=s.id+':'+s.revision;if(ids.has(id))fail('Duplicate shot revision');ids.add(id);
  if(s.state==='LOCKED'&&!nonEmpty(s.approved_asset))fail('LOCKED shot lacks asset reference');
 }
 return true;
}
function migrateV1(snapshot){
 assertV1(snapshot);
 const original=safeCopy(snapshot);
 return {schema_version:'2.0',project_id:original.project_id,revision:1,
  gates:safeCopy(original.gates),shots:safeCopy(original.shots),decisions:safeCopy(original.decisions),
  continuity:safeCopy(original.continuity),provenance:{kind:'MIGRATED_V1',evidence:null},
  source:{schema_version:'1.0',snapshot:original},proposals:[],
  authorization:{production_go:false,provider_job_allowed:false,publication_allowed:false}};
}
function assertV2(project){
 if(!object(project)||project.schema_version!=='2.0'||!Number.isInteger(project.revision)||project.revision<1)fail('Invalid v2 version or revision');
 if(!nonEmpty(project.project_id)||!object(project.source)||project.source.schema_version!=='1.0')fail('Missing v1 source');
 assertV1(project.source.snapshot);
 if(project.project_id!==project.source.snapshot.project_id)fail('Project identity differs from source');
 if(!object(project.gates)||!requiredGates.every(k=>object(project.gates[k])))fail('Missing v2 gates');
 for(const k of requiredGates){const g=project.gates[k];if(g.approved&&(!nonEmpty(g.version)||!nonEmpty(g.evidence)))fail('Approved v2 gate lacks evidence: '+k);}
 if(!Array.isArray(project.shots)||!Array.isArray(project.decisions)||!Array.isArray(project.continuity)||!Array.isArray(project.proposals))fail('Invalid v2 arrays');
 const keys=new Set();
 for(const s of project.shots){if(!nonEmpty(s.id)||!Number.isInteger(s.revision)||!shotStates.has(s.state))fail('Invalid v2 shot');const key=s.id+':'+s.revision;if(keys.has(key))fail('Duplicate v2 shot');keys.add(key);if(s.state==='LOCKED'&&!nonEmpty(s.approved_asset))fail('Locked v2 shot lacks asset');}
 if(!object(project.authorization)||project.authorization.production_go!==false||project.authorization.provider_job_allowed!==false||project.authorization.publication_allowed!==false)fail('Unapproved side-effect authorization in migrated project');
 return true;
}
function restoreV1(project){
 assertV2(project);
 return safeCopy(project.source.snapshot); // restores original V1, not unsafely reverse-converting v2 changes
}
function validateProposal(project,p){
 assertV2(project);
 if(!object(p)||p.contract_version!=='2.0'||p.status!=='PROPOSED'||!nonEmpty(p.request_id)||!origins.has(p.origin))fail('Invalid specialist proposal');
 if(p.project_id!==project.project_id)fail('Proposal project mismatch');
 if(p.input_revision!==project.revision)fail('Stale specialist proposal');
 if(!object(p.proposed_artifact)||!nonEmpty(p.proposed_artifact.id)||!Number.isInteger(p.proposed_artifact.revision)||p.proposed_artifact.revision<1)fail('Invalid proposed artifact');
 if(!object(p.provenance)||p.provenance.kind!=='AGENT_DRAFT')fail('Proposal cannot claim independent inspection or approval');
 if(!Array.isArray(p.required_authorization))fail('Authorization field required');
 if(project.proposals.some(prev=>prev.request_id===p.request_id))fail('Repeated request ID');
 return true; // validation is NOT approval or state mutation
}
function recordProposal(project,proposal){
 validateProposal(project,proposal);
 const updated=safeCopy(project);
 updated.proposals.push(safeCopy(proposal));
 updated.revision++;
 return updated; // no approval, asset mutation, generation or publication
}
module.exports={assertV1,migrateV1,assertV2,restoreV1,validateProposal,recordProposal};

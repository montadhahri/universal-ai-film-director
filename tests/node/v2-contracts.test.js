'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {assertV1,migrateV1,assertV2,restoreV1,validateProposal,recordProposal}=require('../../scripts/v2/project-contracts.js');
const copy=x=>structuredClone(x);
const v1=()=>({schema_version:'1.0',project_id:'synthetic-not-a-real-production',phase:'storyboard',
 gates:{script:{approved:true,version:'V1',evidence:'SYNTHETIC TEST APPROVAL'},visual_bible:{approved:true,version:'V1',evidence:'SYNTHETIC TEST APPROVAL'},storyboard:{approved:false}},
 decisions:[],continuity:[{id:'C1',kind:'character',description:'Test subject',status:'APPROVED'}],
 shots:[{id:'S01_SH01',revision:1,state:'LOCKED',approved_asset:'synthetic-fixture-asset-ref',continuity_refs:['C1'],issues:[]}],open_questions:[]});
const proposal=project=>({contract_version:'2.0',project_id:project.project_id,request_id:'req1',
 origin:'film-cinematography',stage:'storyboard',input_revision:project.revision,status:'PROPOSED',
 proposed_artifact:{id:'BOARD-V2',revision:2,kind:'storyboard'},provenance:{kind:'AGENT_DRAFT',evidence_ref:null},
 required_authorization:['storyboard_user_approval']});
test('v1 snapshot losslessly restored without mutation',()=>{const src=v1(),prior=copy(src),p=migrateV1(src);assertV2(p);assert.deepEqual(restoreV1(p),prior);assert.deepEqual(src,prior);});
test('v1 approvals, locked assets and decisions preserved, no operational permission inferred',()=>{const p=migrateV1(v1());assert.deepEqual(p.gates,p.source.snapshot.gates);assert.deepEqual(p.shots,p.source.snapshot.shots);assert.deepEqual(p.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});});
test('reject invented approval evidence',()=>{const v=v1();v.gates.script.evidence='';assert.throws(()=>migrateV1(v),/evidence/);});
test('reject locked shot without asset and duplicate shot revision',()=>{const v=v1();delete v.shots[0].approved_asset;assert.throws(()=>migrateV1(v),/asset/);const x=v1();x.shots.push(copy(x.shots[0]));assert.throws(()=>migrateV1(x),/Duplicate/);});
test('proposal remains proposed, no gate changes or frozen v1 rewrite',()=>{const p=migrateV1(v1());const q=proposal(p);const next=recordProposal(p,q);assert.equal(p.revision,1);assert.equal(next.revision,2);assert.equal(next.proposals[0].status,'PROPOSED');assert.deepEqual(next.gates,p.gates);assert.deepEqual(next.shots,p.shots);assert.deepEqual(restoreV1(next),v1());});
test('stale proposal and repeated request id rejected',()=>{const p=migrateV1(v1());const q=proposal(p);const next=recordProposal(p,q);assert.throws(()=>validateProposal(next,q),/Stale/);const r=proposal(next);assert.throws(()=>recordProposal(next,r),/Repeated/);});
test('cross-project and fabricated direct inspection denied',()=>{const p=migrateV1(v1());const q=proposal(p);q.project_id='another-project';assert.throws(()=>recordProposal(p,q),/mismatch/);q.project_id=p.project_id;q.provenance.kind='DIRECT_INSPECTION';assert.throws(()=>recordProposal(p,q),/inspection/);});
test('no manually elevated operational authorization in v2 migrator state',()=>{const p=migrateV1(v1());p.authorization.provider_job_allowed=true;assert.throws(()=>assertV2(p),/authorization/);});
test('no v1 schema/runtime modifications in v2 proposal',()=>{assertV1(v1());assert.equal(migrateV1(v1()).schema_version,'2.0');});

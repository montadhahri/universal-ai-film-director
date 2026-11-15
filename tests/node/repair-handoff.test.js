'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {prepareRepairHandoff,inspectRepairHandoffEvidence}=require('../../scripts/repair-handoff.js');
function fixture(){
 const p=newProject('handoff');p.shots=[
 {id:'SH01',revision:1,state:'LOCKED',approved_asset:'source.png',continuity_refs:[],issues:[]},
 {id:'SH01',revision:2,parent_revision:1,state:'PROPOSED',continuity_refs:[],issues:['repair']}];
 p.unlock_ledger=[{authorization_ref:'user-1',shot_id:'SH01',source_revision:1,new_revision:2,
 reason:'repair',evidence:{actor:'USER',source_ref:'user-1',quote:'I authorize repair SH01'}}];return p;
}
const options={shot_id:'SH01',source_revision:1,new_revision:2,repair_kind:'IMAGE',source_asset:'source.png',
 source_sha256:'a'.repeat(64),proposed_output_ref:'candidate.png',expected_result:'Wardrobe consistent',
 acceptance_checks:['Visual continuity','Edit boundaries','Full film'],rollback_ref:'source.png',
 immutable_asset_refs:['source.png','other-locked.png']};
test('prepares a copy-only manual handoff without mutating the project or media',()=>{
 const p=fixture(),snapshot=JSON.stringify(p),r=prepareRepairHandoff(p,{expected_revision:p.revision,...options});
 assert.equal(r.status,'MANUAL_REPAIR_HANDOFF_READY');assert.equal(r.execution_performed,false);
 assert.equal(r.auto_approved,false);assert.equal(JSON.stringify(p),snapshot);
 assert.equal(r.rollback_ref,'source.png');
});
test('refuses missing authorization, stale revision, source overwrite and incomplete checks',()=>{
 const p=fixture();
 assert.throws(()=>prepareRepairHandoff(p,{expected_revision:p.revision+1,...options}),/Stale/);
 assert.throws(()=>prepareRepairHandoff(p,{expected_revision:p.revision,...options,proposed_output_ref:'source.png'}),/Distinct/);
 assert.throws(()=>prepareRepairHandoff(p,{expected_revision:p.revision,...options,immutable_asset_refs:[]}),/immutable/);
 assert.throws(()=>prepareRepairHandoff(p,{expected_revision:p.revision,...options,acceptance_checks:[]}),/acceptance/);
 p.unlock_ledger=[];assert.throws(()=>prepareRepairHandoff(p,{expected_revision:p.revision,...options}),/scoped/);
});
test('reviewer-reported checks cannot auto-approve or claim media verification',()=>{
 const p=fixture(),h=prepareRepairHandoff(p,{expected_revision:p.revision,...options});
 const review=inspectRepairHandoffEvidence(p,h,{after:{asset_ref:'candidate.png',sha256:'b'.repeat(64)},
 reviewer:'reviewer',review_ref:'review-2',outcome:'MATCH',
 checks:options.acceptance_checks.map(criterion=>({criterion,outcome:'PASS'}))});
 assert.equal(review.status,'REVIEWER_REPORTED_CHECKS_PASS');
 assert.equal(review.independent_media_verification,false);assert.equal(review.auto_approved,false);
 assert.equal(p.shots[1].state,'PROPOSED');
});
test('missing boundary or full-film check is not a successful handoff review',()=>{
 const p=fixture(),h=prepareRepairHandoff(p,{expected_revision:p.revision,...options});
 const args={after:{asset_ref:'candidate.png',sha256:'b'.repeat(64)},reviewer:'r',review_ref:'r-1',outcome:'MATCH',
 checks:options.acceptance_checks.map(criterion=>({criterion,outcome:'PASS'}))};
 assert.throws(()=>inspectRepairHandoffEvidence(p,h,{...args,checks:args.checks.slice(0,2)}),/Each acceptance/);
 const r=inspectRepairHandoffEvidence(p,h,{...args,checks:args.checks.map((x,i)=>i===2?{...x,outcome:'NOT_RUN'}:x)});
 assert.equal(r.status,'REPAIR_REVIEW_INCOMPLETE');
});

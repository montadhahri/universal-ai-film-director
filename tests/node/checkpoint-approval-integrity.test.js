'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {proposeGate,approveGate,inspectCheckpoint,restoreCheckpoint}=require('../../scripts/director-authority.js');
function approved(){
 let p=newProject('approval-integrity');
 p=proposeGate(p,{expected_revision:p.revision,gate:'script',version:'v1',artifact_ref:'script-v1',proposal_id:'GP1'});
 p=approveGate(p,{expected_revision:p.revision,proposal_id:'GP1',evidence:{actor:'USER',source_ref:'message-1',quote:'I approve'}});
 return p;
}
test('recorded approval has no structural provenance errors',()=>{
 const p=approved();const report=inspectCheckpoint(restoreCheckpoint(JSON.stringify(p)));
 assert.deepEqual(report.approval_integrity_issues,[]);
 assert.equal(report.provider_execution_performed,false);
});
test('approved gate without ledger is flagged',()=>{
 const p=approved();p.approval_ledger=[];
 assert.ok(inspectCheckpoint(p).approval_integrity_issues.some(x=>x.code==='MISSING_GATE_APPROVAL_LEDGER'));
});
test('tampered approved version or evidence reference is flagged',()=>{
 const p=approved();p.gates.script.version='v2';
 assert.ok(inspectCheckpoint(p).approval_integrity_issues.some(x=>x.code==='GATE_APPROVAL_MISMATCH'));
});
test('missing matching approved proposal is flagged',()=>{
 const p=approved();p.gate_proposals=[];
 assert.ok(inspectCheckpoint(p).approval_integrity_issues.some(x=>x.code==='GATE_PROPOSAL_MISMATCH'));
});
test('malformed user evidence is flagged without changing operational permissions',()=>{
 const p=approved();p.approval_ledger[0].evidence.actor='AGENT';
 const before=JSON.stringify(p);const report=inspectCheckpoint(p);
 assert.ok(report.approval_integrity_issues.some(x=>x.code==='INVALID_GATE_EVIDENCE'));
 assert.equal(JSON.stringify(p),before);
 assert.equal(p.authorization.production_go,false);
});
test('duplicate gate approval records are flagged',()=>{
 const p=approved();p.approval_ledger.push(structuredClone(p.approval_ledger[0]));
 assert.ok(inspectCheckpoint(p).approval_integrity_issues.some(x=>x.code==='AMBIGUOUS_GATE_APPROVAL'));
});

test('missing approval ledger blocks planning continuation even when all gates are approved',()=>{
 let p=newProject('all-approved-integrity');
 for(const [i,gate] of ['script','visual_bible','storyboard'].entries()){
  const proposal_id='GP-'+i;
  p=proposeGate(p,{expected_revision:p.revision,gate,version:'v1',artifact_ref:gate+'-v1',proposal_id});
  p=approveGate(p,{expected_revision:p.revision,proposal_id,evidence:{actor:'USER',source_ref:'fixture-'+i,quote:'I approve'}});
 }
 const clean=inspectCheckpoint(p);
 assert.deepEqual(clean.approval_integrity_issues,[]);
 assert.match(clean.next_safe_action,/Continue planning only/);
 assert.doesNotMatch(clean.next_safe_action,/Continue planned production/);
 p.approval_ledger=[];
 const broken=inspectCheckpoint(p);
 assert.equal(broken.approval_integrity_issues.length,3);
 assert.ok(broken.issues.some(x=>/Approval integrity issues/.test(x)));
 assert.match(broken.next_safe_action,/Resolve approval integrity issues/);
 assert.equal(p.authorization.production_go,false);
 assert.equal(p.authorization.provider_job_allowed,false);
});
test('approval integrity takes priority over dependency issues and missing gates',()=>{
 const p=approved();
 p.approval_ledger=[];
 p.dependency_graph={nodes:[{kind:'shot',id:'SH01'}],edges:[{from:'SH01',to:'MISSING'}]};
 const report=inspectCheckpoint(p);
 assert.ok(report.unresolved_issues.length>0);
 assert.match(report.next_safe_action,/Resolve approval integrity issues/);
 assert.equal(report.provider_execution_performed,false);
});
test('dependency problems block planning when approval ledger is intact',()=>{
 const p=approved();
 p.dependency_graph={nodes:[{kind:'shot',id:'SH01'}],edges:[{from:'SH01',to:'MISSING'}]};
 const report=inspectCheckpoint(p);
 assert.deepEqual(report.approval_integrity_issues,[]);
 assert.match(report.next_safe_action,/Resolve dependency graph issues before continuing planning/);
});

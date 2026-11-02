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

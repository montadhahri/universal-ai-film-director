'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const {newProject}=require('../../scripts/project-contracts.js');
const {proposeGate,approveGate,inspectCheckpoint}=require('../../scripts/director-authority.js');
const {saveCheckpointFile,loadCheckpointFile}=require('../../scripts/checkpoint-file.js');

function approvedFixture(){
 let p=newProject('phase7-acceptance');
 for(const [index,gate] of ['script','visual_bible','storyboard'].entries()){
  const proposal_id='GATE-'+(index+1);
  p=proposeGate(p,{expected_revision:p.revision,gate,version:'v1',artifact_ref:gate+'-v1',proposal_id});
  p=approveGate(p,{expected_revision:p.revision,proposal_id,evidence:{actor:'USER',source_ref:'synthetic-fixture-'+(index+1),quote:'I approve'}});
 }
 p.shots.push({id:'SH01',revision:1,state:'LOCKED',approved_asset:'fixture://shot-01',continuity_refs:['ANCHOR-01'],issues:[]});
 p.shots.push({id:'SH02',revision:1,state:'PROPOSED',continuity_refs:['ANCHOR-01'],issues:['Awaiting continuity review']});
 p.dependency_graph={nodes:[{kind:'shot',id:'SH01'},{kind:'shot',id:'SH02'}],edges:[{from:'SH01',to:'SH02'},{from:'SH02',to:'MISSING_ANCHOR'}]};
 return p;
}
function temp(t){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'film-recovery-acceptance-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 return path.join(dir,'checkpoint.json');
}
test('REC-ACCEPT: complete approved checkpoint survives fresh process and blocks unsafe continuation',t=>{
 const file=temp(t),original=approvedFixture();
 const before=JSON.stringify(original);
 saveCheckpointFile(file,original);
 assert.equal(JSON.stringify(original),before);
 const script=[
  "const {loadCheckpointFile}=require('./scripts/checkpoint-file.js');",
  "const result=loadCheckpointFile(process.argv[1]);",
  "process.stdout.write(JSON.stringify(result));"
 ].join('');
 const raw=execFileSync(process.execPath,['-e',script,file],{cwd:path.resolve(__dirname,'../..'),encoding:'utf8'});
 const recovered=JSON.parse(raw);
 assert.deepEqual(recovered.project,original);
 assert.equal(recovered.project.revision,original.revision);
 assert.deepEqual(recovered.project.gates,original.gates);
 assert.deepEqual(recovered.project.approval_ledger,original.approval_ledger);
 assert.deepEqual(recovered.project.shots,original.shots);
 assert.deepEqual(recovered.inspection.approval_integrity_issues,[]);
 assert.ok(recovered.inspection.unresolved_issues.some(x=>x.code==='MISSING_DEPENDENCY_ENDPOINT'&&x.endpoint==='MISSING_ANCHOR'));
 assert.match(recovered.inspection.next_safe_action,/Resolve dependency graph issues/);
 assert.equal(recovered.integrity_verified,true);
 assert.equal(recovered.approval_authenticated,false);
 assert.equal(recovered.asset_files_verified,false);
 assert.equal(recovered.project.authorization.production_go,false);
 assert.equal(recovered.project.authorization.provider_job_allowed,false);
 assert.equal(recovered.project.authorization.publication_allowed,false);
 assert.equal(recovered.inspection.provider_execution_performed,false);
 assert.equal(recovered.inspection.media_inspected,false);
});
test('REC-ACCEPT: tampered checkpoint cannot resume in fresh process',t=>{
 const file=temp(t);saveCheckpointFile(file,approvedFixture());
 const envelope=JSON.parse(fs.readFileSync(file,'utf8'));
 envelope.project.gates.script.version='tampered';
 fs.writeFileSync(file,JSON.stringify(envelope));
 assert.throws(()=>loadCheckpointFile(file),/checksum mismatch/);
});

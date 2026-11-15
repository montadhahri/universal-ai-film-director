'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {assessMediaExport}=require('../../scripts/media-export-qa.js');
const artifact={ref:'user:film.mp4',origin:'USER_REPORTED'};
const metadata={duration_ms:30000,width:1280,height:720,frame_rate_num:24,frame_rate_den:1,has_audio:true};
const requirements={duration_ms:30000,width:1280,height:720,frame_rate_num:24,frame_rate_den:1,audio_required:true};
const assess=(overrides={})=>assessMediaExport({artifact,metadata,requirements,...overrides});
test('metadata agreement does not imply export verification',()=>{
 const r=assess();assert.equal(r.status,'NOT_VERIFIED');
 assert.equal(r.checks.find(c=>c.name==='duration').status,'PASS');
 assert.equal(r.checks.find(c=>c.name==='byte_inspection').status,'NOT_VERIFIED');
 assert.equal(r.export_performed,false);
});
test('duration and resolution mismatch are gaps',()=>{
 const r=assess({metadata:{...metadata,duration_ms:29000,width:640}});
 assert.equal(r.status,'GAP');assert.equal(r.checks.find(c=>c.name==='resolution').status,'GAP');
});
test('rational equivalent frame rate passes',()=>{
 const r=assess({metadata:{...metadata,frame_rate_num:48,frame_rate_den:2}});
 assert.equal(r.checks.find(c=>c.name==='frame_rate').status,'PASS');
});
test('missing audio declaration cannot be verified',()=>{
 const r=assess({metadata:{...metadata,has_audio:undefined}});
 assert.equal(r.checks.find(c=>c.name==='metadata').status,'NOT_VERIFIED');
});
test('required audio absent is a gap',()=>{
 const r=assess({metadata:{...metadata,has_audio:false}});
 assert.equal(r.checks.find(c=>c.name==='audio').status,'GAP');
});
test('synthetic mock never passes real export QA',()=>{
 const r=assess({artifact:{kind:'MOCK_MANIFEST',synthetic:true},evidence:{kind:'DIRECT_INSPECTION',bytes_inspected:true,inspection_ref:'fake',creative_review:'PASS',creative_review_ref:'fake'}});
 assert.equal(r.status,'GAP');assert.equal(r.checks.find(c=>c.name==='byte_inspection').status,'GAP');
});
test('evidence classification PASS is not execution or independently reproduced inspection',()=>{
 const r=assess({evidence:{kind:'DIRECT_INSPECTION',bytes_inspected:true,inspection_ref:'external:inspection',creative_review:'PASS',creative_review_ref:'external:review'}});
 assert.equal(r.status,'PASS');assert.equal(r.scope,'EVIDENCE_CLASSIFICATION_ONLY');
 assert.equal(r.provider_invoked,false);assert.equal(r.publication_authorized,false);
});
test('invalid dimensions cannot silently pass',()=>{
 const r=assess({metadata:{...metadata,width:-1}});
 assert.equal(r.status,'NOT_VERIFIED');
});

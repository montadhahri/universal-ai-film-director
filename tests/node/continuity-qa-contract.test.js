'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'../../skills/film-continuity-qa');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('QA guidance distinguishes report, repair verification and shot states',()=>{
 const s=read('references/guide.md');
 for(const x of ['DIRECT_INSPECTION','USER_REPORT','DOCUMENT_CHECK','NOT_INSPECTED','repair ticket status','shot lifecycle state'])assert.ok(s.includes(x),x);
 assert.match(s,/APPLIED ticket is not VERIFIED/);
});
test('QA artifact templates preserve separate evidence and state contracts',()=>{
 for(const p of ['assets/defect-report-template.md','assets/repair-plan-template.md','assets/shot-review-template.md']){
  const s=read(p);
  assert.match(s,/Evidence class|Evidence source/);
  assert.match(s,/ticket status/i);
  assert.match(s,/shot lifecycle/i);
  assert.match(s,/NOT_INSPECTED/);
 }
});
test('QA relative references resolve to actual skill files',()=>{
 assert.match(read('assets/defect-report-template.md'),/\.\.\/references\/quality-assurance\.md/);
 assert.match(read('references/localized-repair.md'),/\[quality-control\]\(quality-control\.md\)/);
});

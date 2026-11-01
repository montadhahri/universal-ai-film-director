'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const direct='https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director';
test('all active installation guides select isolated runtime folder',()=>{
 for(const p of ['README.md','docs/installation.md','docs/end-to-end-workflow.md','docs/private-preprod-validation.md']){
  const s=read(p);
  assert(s.includes(direct),p+': missing correct source');
  assert(!s.includes('npx skills add montadhahri/universal-ai-film-director'),p+': obsolete root install command');
 }
});
test('release candidate documentation never claims agent or film tested',()=>{
 for(const p of ['README.md','docs/ROADMAP.md','docs/release-checklist.md']){
  const s=read(p);
  assert(/v1\.0\.0/.test(s),p+': absent candidate designation');
  assert(/HOLD|hold/.test(s),p+': missing release gate');
 }
 const check=read('docs/release-checklist.md');
 assert(check.includes('remote'));
 assert(check.includes('independently executed agent'));
 assert(check.includes('PR #22'));
});
test('offline runner includes package check and every current Node test file',()=>{
 const {COMMANDS}=require('../preprod/run_validation.js');
 const command=new Map(COMMANDS);
 assert(command.has('package-allowlist'));
 const tests=fs.readdirSync(path.join(root,'tests/node')).filter(n=>n.endsWith('.test.js'));
 for(const f of tests)assert(command.get('regression-tests').includes('tests/node/'+f),f+' omitted from preprod runner');
});

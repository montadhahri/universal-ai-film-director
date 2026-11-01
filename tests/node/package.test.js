const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {validate}=require('../package/validate-package.js');
const root=path.resolve(__dirname,'../..');
test('skill folder contains exactly canonical runtime files',()=>{
 const files=validate();
 for(const p of ['SKILL.md','docs/agent-compatibility.md','engine/director.md','templates/storyboard.md'])
  assert(files.includes(p));
});
test('skill distribution excludes tests and developer files',()=>{
 const dir=path.join(root,'skills/universal-ai-film-director');
 for(const p of ['tests','examples','.github','README.md','CONTRIBUTING.md','CHANGELOG.md','docs/ROADMAP.md'])
  assert(!fs.existsSync(path.join(dir,p)),p);
});

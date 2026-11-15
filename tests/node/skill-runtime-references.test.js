'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),skills=path.join(root,'skills');
const oldNames='director-authority|project-contracts|production-pipeline|audio-continuity|storytelling-preflight|memory-consistency|visual-continuity-assessment|smart-repair|checkpoint-envelope|checkpoint-file';
const oldPath=new RegExp('scripts/('+oldNames+')\\.js','g');
function markdownFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=path.join(dir,e.name);return e.isDirectory()?markdownFiles(p):e.isFile()&&p.endsWith('.md')?[p]:[];
 });}
test('all installed skill instructions and references prefer installed runtime.js, not inaccessible root paths',()=>{
 const files=markdownFiles(skills).filter(p=>p.endsWith('/SKILL.md')||p.includes('/references/'));
 assert.equal(files.filter(p=>p.endsWith('/SKILL.md')).length,7);
 assert.equal(files.filter(p=>p.includes('/references/')).length,40);
 assert.ok(files.some(p=>p.endsWith('/universal-ai-film-director/references/budget-planning.md')),'Missing V2.5 budget reference');
 for(const file of files){
  const content=fs.readFileSync(file,'utf8');
  for(const [index,line] of content.split('\n').entries()){
   for(const match of line.matchAll(oldPath)){
    assert.match(line,/canonical (?:repository )?source|canonical source|repository source/i,
     'Old root script path presented as executable installed path in '+path.relative(root,file)+':'+(index+1)+' ('+match[0]+')');
   }
  }
 }
 for(const skill of fs.readdirSync(skills)){
  const dir=path.join(skills,skill);if(!fs.statSync(dir).isDirectory())continue;
  const doc=path.join(dir,'SKILL.md');if(!fs.existsSync(doc))continue;
  assert.match(fs.readFileSync(doc,'utf8'),/scripts\/runtime\.js/,'Missing runtime guidance: '+skill);
  assert.ok(fs.existsSync(path.join(dir,'scripts/runtime.js')),'Missing runtime payload: '+skill);
 }
});

test('QA exposes one installed runtime and no legacy parallel bundle',()=>{
 const qa=path.join(skills,'film-continuity-qa','scripts');
 assert.deepEqual(fs.readdirSync(qa).sort(),['runtime.js']);
 assert.equal(fs.existsSync(path.join(root,'scripts/build-qa-runtime.js')),false);
 const runtime=require(path.join(qa,'runtime.js'));
 for(const name of ['planSmartRepair','assessVisualContinuity','prepareScopedRepair','reviewRepairEvidence','prepareRepairHandoff','inspectRepairHandoffEvidence','verifyRepairBytes']){
  assert.equal(typeof runtime[name],'function','Missing installed QA helper: '+name);
 }
});

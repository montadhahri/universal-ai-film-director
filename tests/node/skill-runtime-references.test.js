'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),skills=path.join(root,'skills');
const canonicalScripts=fs.readdirSync(path.join(root,'scripts')).filter(name=>name.endsWith('.js')&&!name.startsWith('build-'));
function validateRuntimeReferences(content,file,names=canonicalScripts){
 const inventory=new Set(names);
 for(const [index,line] of content.split('\n').entries()){
  for(const match of line.matchAll(/scripts\/([a-z0-9-]+\.js)\b/g)){
   if(inventory.has(match[1]))assert.match(line,/canonical (?:repository )?source|canonical source|repository source/i,
    'Root script path presented as executable installed path in '+file+':'+(index+1)+' ('+match[0]+')');
  }
 }
}
function validateRequiredReferences(dir,required){
 for(const name of required)assert.ok(fs.existsSync(path.join(dir,'references',name)),'Missing required reference: '+name);
}
function markdownFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=path.join(dir,e.name);return e.isDirectory()?markdownFiles(p):e.isFile()&&p.endsWith('.md')?[p]:[];
 });}
test('all installed skill instructions and references prefer installed runtime.js, not inaccessible root paths',()=>{
 const files=markdownFiles(skills).filter(p=>path.basename(p)==='SKILL.md'||p.split(path.sep).includes('references'));
 assert.equal(files.filter(p=>path.basename(p)==='SKILL.md').length,7);
 for(const file of files)validateRuntimeReferences(fs.readFileSync(file,'utf8'),path.relative(root,file));
 for(const skill of fs.readdirSync(skills)){
  const dir=path.join(skills,skill);if(!fs.statSync(dir).isDirectory())continue;
  const doc=path.join(dir,'SKILL.md');if(!fs.existsSync(doc))continue;
  validateRequiredReferences(dir,skill==='universal-ai-film-director'?['guide.md','worked-example.md','production-jobs.md','budget-planning.md']:['guide.md','worked-example.md']);
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

test('runtime reference validation detects new canonical scripts and allows explicit source attribution',()=>{
 assert.throws(()=>validateRuntimeReferences('Run scripts/new-module.js','fixture',['new-module.js']),/Root script path/);
 assert.throws(()=>validateRuntimeReferences('Run scripts/budget-planner.js','fixture'),/Root script path/);
 assert.doesNotThrow(()=>validateRuntimeReferences('Canonical source: scripts/budget-planner.js','fixture'));
 assert.doesNotThrow(()=>validateRuntimeReferences('Run scripts/runtime.js','fixture'));
});
test('required references allow additions but reject missing mandatory files',()=>{
 const os=require('node:os'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'skill-refs-'));
 try{
  fs.mkdirSync(path.join(dir,'references'));
  fs.writeFileSync(path.join(dir,'references','guide.md'),'guide');
  fs.writeFileSync(path.join(dir,'references','extra.md'),'extra');
  assert.doesNotThrow(()=>validateRequiredReferences(dir,['guide.md']));
  assert.throws(()=>validateRequiredReferences(dir,['guide.md','missing.md']),/Missing required reference/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

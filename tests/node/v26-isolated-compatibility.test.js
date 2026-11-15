'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const names=['universal-ai-film-director','film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa'];

test('isolated installed skill payloads retain entrypoints and runtime without root dependencies',t=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'v26-installed-'));
 t.after(()=>fs.rmSync(tmp,{recursive:true,force:true}));
 for(const name of names){
  const src=path.join(root,'skills',name),dst=path.join(tmp,name);
  fs.cpSync(src,dst,{recursive:true});
  assert.ok(fs.existsSync(path.join(dst,'SKILL.md')));
  const runtime=require(path.join(dst,'scripts/runtime.js'));
  assert.ok(Object.keys(runtime).length>0,name);
 }
 const assets=path.join(tmp,'universal-ai-film-director/assets');
 for(const file of ['project-bible.schema.json','handoff.schema.json','project-snapshot.schema.json']){
  const schema=JSON.parse(fs.readFileSync(path.join(assets,file),'utf8'));
  assert.equal(schema.$schema,'https://json-schema.org/draft/2020-12/schema');
 }
 assert.equal(JSON.parse(fs.readFileSync(path.join(assets,'project-bible.schema.json'),'utf8')).properties.proposals.items.$ref,'handoff.schema.json');
 assert.equal(fs.existsSync(path.join(assets,'community-showcase.schema.json')),false);
});

test('external read-only snapshot consumer runs from a standalone copied distribution',t=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'v26-consumer-'));
 t.after(()=>fs.rmSync(tmp,{recursive:true,force:true}));
 for(const dir of ['scripts','contracts'])fs.mkdirSync(path.join(tmp,dir));
 for(const file of ['project-contracts.js','project-snapshot.js'])fs.copyFileSync(path.join(root,'scripts',file),path.join(tmp,'scripts',file));
 for(const file of ['project-bible.schema.json','project-snapshot.schema.json'])fs.copyFileSync(path.join(root,'contracts',file),path.join(tmp,'contracts',file));
 const {newProject}=require(path.join(tmp,'scripts/project-contracts.js'));
 const {createProjectSnapshot}=require(path.join(tmp,'scripts/project-snapshot.js'));
 const schema=JSON.parse(fs.readFileSync(path.join(tmp,'contracts/project-snapshot.schema.json'),'utf8'));
 const project=newProject('isolated-consumer');
 const before=structuredClone(project);
 const snapshot=createProjectSnapshot(project);
 assert.equal(snapshot.contract_version,schema.properties.contract_version.const);
 assert.equal(snapshot.source_schema_version,schema.properties.source_schema_version.const);
 assert.deepEqual(snapshot.authorization,{production_go:false,provider_job_allowed:false,publication_allowed:false});
 assert.deepEqual(project,before);
 assert.deepEqual(Object.keys(snapshot).sort(),schema.required.slice().sort());
 assert.throws(()=>createProjectSnapshot({...project,unknown_authority:true}),/Unknown Project Bible field/);
 assert.throws(()=>createProjectSnapshot({...project,schema_version:'3.0'}));
});

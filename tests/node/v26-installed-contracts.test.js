'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const director=path.join(root,'skills/universal-ai-film-director');
const files=['project-bible.schema.json','handoff.schema.json','project-snapshot.schema.json'];
test('installed Director includes byte-identical canonical contracts',()=>{
 for(const file of files){
  const canonical=fs.readFileSync(path.join(root,'contracts',file));
  const installed=fs.readFileSync(path.join(director,'assets',file));
  assert.deepEqual(installed,canonical,file+' drifted from canonical schema');
  assert.equal(JSON.parse(installed.toString('utf8')).$schema,'https://json-schema.org/draft/2020-12/schema');
 }
});
test('installed Project Bible schema resolves local handoff reference',()=>{
 const project=JSON.parse(fs.readFileSync(path.join(director,'assets',files[0]),'utf8'));
 assert.equal(project.properties.proposals.items.$ref,'handoff.schema.json');
 assert.ok(fs.existsSync(path.join(director,'assets',project.properties.proposals.items.$ref)));
});
test('Director guide tells isolated hosts where to find schemas',()=>{
 const guide=fs.readFileSync(path.join(director,'references/guide.md'),'utf8');
 for(const file of files)assert.ok(guide.includes('assets/'+file));
 assert.ok(guide.includes('does not prove full schema validation'));
});


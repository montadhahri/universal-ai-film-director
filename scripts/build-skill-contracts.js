#!/usr/bin/env node
'use strict';
// Canonical source: contracts/. Generated installable copies: Director assets/.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const names=['project-bible.schema.json','handoff.schema.json','project-snapshot.schema.json'];
const dest=path.join(root,'skills/universal-ai-film-director/assets');
let stale=false;
for(const name of names){
 const source=fs.readFileSync(path.join(root,'contracts',name));
 const target=path.join(dest,name);
 if(process.argv.includes('--check')){
  if(!fs.existsSync(target)||!fs.readFileSync(target).equals(source)){
   console.error('Outdated installed schema: '+name);stale=true;
  }
 }else{
  fs.mkdirSync(dest,{recursive:true});
  fs.writeFileSync(target,source);
  console.log('Built installed schema: '+name);
 }
}
if(stale)process.exitCode=1;
else if(process.argv.includes('--check'))console.log('PASS: installed schemas match canonical contracts');

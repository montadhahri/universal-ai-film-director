#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const names=['universal-ai-film-director','film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa'];
function list(dir,base=dir){
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const p=path.join(dir,e.name);
  if(e.isSymbolicLink())throw Error('Symlink forbidden: '+p);
  if(e.isDirectory())return list(p,base);
  if(!e.isFile())throw Error('Unexpected file type: '+p);
  return [path.relative(base,p).split(path.sep).join('/')];
 });
}
function validate(root=ROOT){
 const errors=[];
 if(!fs.existsSync(path.join(root,'skills')))return {errors:['Missing skills directory']};
 for(const name of names){
  const dir=path.join(root,'skills',name),p=path.join(dir,'SKILL.md');
  if(!fs.existsSync(p)){errors.push('Missing skill: '+name);continue;}
  const s=fs.readFileSync(p,'utf8');
  const match=s.match(/^---\n([\s\S]*?)\n---\n/);
  if(!match||!new RegExp('^name:\\s*'+name+'\\s*$','m').test(match[1])||!/^description:\s*.+$/m.test(match?.[1]||''))errors.push('Invalid skill frontmatter: '+name);
  if(!fs.existsSync(path.join(dir,'references/guide.md')))errors.push('Missing guide: '+name);
  if(!s.includes('references/guide.md'))errors.push('Guide not discoverable: '+name);
  const files=list(dir);if(files.some(f=>!['SKILL.md','references/guide.md'].includes(f)))errors.push('Unexpected skill payload: '+name);
 }
 for(const dir of ['engine','adapters','references','schemas','templates','examples']){
  if(fs.existsSync(path.join(root,dir)))errors.push('Obsolete root directory: '+dir);
 }
 if(fs.existsSync(path.join(root,'SKILL.md')))errors.push('Obsolete root SKILL.md');
 for(const p of ['README.md','CHANGELOG.md','CONTRIBUTING.md','LICENSE','contracts/project-bible.schema.json','contracts/handoff.schema.json','scripts/project-contracts.js','docs/architecture.md','docs/installation.md','docs/ROADMAP.md']){
  if(!fs.existsSync(path.join(root,p)))errors.push('Missing: '+p);
 }
 const stack=[root];
 while(stack.length){
  const dir=stack.pop();
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
   if(['.git','node_modules','build'].includes(e.name))continue;
   const p=path.join(dir,e.name);
   if(e.isDirectory())stack.push(p);
   else if(e.isFile()&&e.name.endsWith('.md')){
    const txt=fs.readFileSync(p,'utf8');
    for(const m of txt.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)){
     const target=m[1].split('#')[0].trim().split(' ')[0];
     if(!target||/^(?:https?:|mailto:|data:)/.test(target))continue;
     const dest=path.resolve(dir,target);
     if(!fs.existsSync(dest)||!fs.statSync(dest).isFile())errors.push('Broken link: '+path.relative(root,p)+' -> '+target);
    }
   }
  }
 }
 return {errors,skills:names.length};
}
if(require.main===module){const result=validate();for(const e of result.errors)console.error('FAIL:',e);console.log(result.errors.length?'FAIL repository validation':'PASS: '+result.skills+' portable skills validated');if(result.errors.length)process.exitCode=1;}
module.exports={validate,names};

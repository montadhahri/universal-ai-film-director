'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const {validate,names}=require('../validate_repo.js');
const {validate:packages}=require('../package/validate-package.js');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
test('seven skill packages are independently installable and self-contained',()=>{assert.equal(packages().length,7);assert.deepEqual(validate().errors,[]);});
test('Director has a functional single-agent fallback and protects approvals',()=>{
 const s=read('skills/universal-ai-film-director/SKILL.md');
 for(const word of ['exactly one','do not restart discovery','screenplay','Visual Bible','storyboard','LOCKED','BLOCKED_NO_PROVIDER','specialist'])assert(s.toLowerCase().includes(word.toLowerCase()),word);
});
test('Specialists do not claim automatic real-media generation or project approval',()=>{
 for(const name of names.slice(1)){const s=read('skills/'+name+'/SKILL.md');assert(s.includes('PROPOSED')||s.includes('Propose')||s.includes('propose'),name);}
 assert(read('skills/film-video-production/SKILL.md').includes('BLOCKED_NO_PROVIDER'));
});
test('No version folders or duplicate root skill source remain',()=>{
 for(const p of ['SKILL.md','engine','adapters','references','schemas','templates','examples','skills/v1','skills/v2','contracts/v1','contracts/v2'])assert(!fs.existsSync(path.join(root,p)),p);
});

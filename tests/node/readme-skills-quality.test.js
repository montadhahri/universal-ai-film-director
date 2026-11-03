'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const names=['universal-ai-film-director','film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa'];

test('README introduces product, real install commands and versioned releases',()=>{
 const readme=read('README.md');
 for(const term of ['## 🚀 Quick start','## 📦 Installation','## 🎥 How filmmaking works','## 🎬 Meet the film crew','## 🤖 Agent compatibility','## 🏷️ Versions & releases','## ❓ FAQ','npx skills add montadhahri/universal-ai-film-director --skill universal-ai-film-director','v1.0.0','v2.0.0','not a bundled video-rendering service'])
  assert(readme.toLowerCase().includes(term.toLowerCase()),'README missing '+term);
 for(const name of names)assert(readme.includes('npx skills add montadhahri/universal-ai-film-director --skill '+name),'Missing installation for '+name);
});
test('each specialist has a task-specific, nontrivial and discoverable worked example',()=>{
 for(const name of names){
  const skill=read('skills/'+name+'/SKILL.md'), example=read('skills/'+name+'/references/worked-example.md');
  assert(skill.includes('(references/worked-example.md)'),name+': undiscoverable worked example');
  assert(example.length>700,name+': insufficient example');
  assert(/propos|approval|approved|report/i.test(example),name+': missing stage state');
  assert(/not|never|without|unverified|blocked|failure/i.test(example),name+': missing negative case');
 }
});
test('examples do not advertise completed video, provider access or user approval',()=>{
 const readme=read('README.md');
 assert(/actual .*require external tools/.test(readme)||readme.includes('require external tools'), 'README must disclose rendering limitation');
 for(const name of names){
  const example=read('skills/'+name+'/references/worked-example.md');
  assert(!/we (generated|rendered|published) the film/i.test(example),name+': fabricated production evidence');
 }
});

test('public-ready Quick Start is usable without private-repository instructions',()=>{
 const readme=read('README.md');
 const install=read('docs/installation.md');
 assert(readme.includes('npx skills add montadhahri/universal-ai-film-director --skill universal-ai-film-director'));
 assert(readme.includes("npx skills add montadhahri/universal-ai-film-director --skill '*'"));
 assert(readme.includes('npx skills add montadhahri/universal-ai-film-director --list'));
 assert(install.includes('git clone https://github.com/montadhahri/universal-ai-film-director.git'));
 assert(!readme.includes('Clone the repository using GitHub credentials'));
 assert(!readme.includes('authenticated local checkout'));
 assert(readme.includes('The repository is public'), 'README must accurately state public visibility');
 assert(!readme.includes('The repository is currently private'), 'README must not claim private visibility');
 assert(install.includes('repository is public'), 'Installation guide must accurately state public visibility');
 assert(!install.includes('currently private'), 'Installation guide must not claim private visibility');
 assert(/not yet been independently (verified|tested)/i.test(install), 'Remote install must not be claimed as verified without evidence');
 assert(!install.includes('With an authenticated clone'));
});

test('direct GitHub install is primary, clone is optional development workflow',()=>{
 const readme=read('README.md');
 const guide=read('docs/installation.md');
 assert(readme.indexOf('npx skills add montadhahri/universal-ai-film-director --skill universal-ai-film-director')<readme.indexOf('## 📦 Installation'));
 assert(guide.indexOf('## Quick install')<guide.indexOf('## Optional: clone'));
 for(const name of ['universal-ai-film-director','film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa'])
   assert(readme.includes('npx skills add montadhahri/universal-ai-film-director --skill '+name),name);
 assert(!readme.includes('| Local installation command |'));
 assert(guide.includes('npx skills add ./skills/universal-ai-film-director'),'Keep tested local developer path');
});

test('README diagrams show v1 nine-stage production workflow and modular authority',()=>{
 const readme=read('README.md');
 for(const phrase of ['## 🎞️ Film production workflow','## 🧩 How the skills work together','1 · Discovery','2 · Screenplay','3 · Visual Bible','4 · Storyboard','5 · Sound direction','6 · Generator setup','7 · Generate','8 · Review','9 · Edit and deliver','You approve','Authorized tools','Project Bible','final creative authority','One agent','Modular skills'])
  assert(readme.includes(phrase),'README workflow missing: '+phrase);
 assert((readme.match(/```mermaid/g)||[]).length===2,'Expected two working architecture diagrams');
 assert(readme.includes('No footage claimed'),'Missing ungenerated-media transparency');
});

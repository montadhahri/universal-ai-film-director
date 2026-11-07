'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const names=['universal-ai-film-director','film-storytelling','film-visual-direction','film-cinematography','film-video-production','film-sound-direction','film-continuity-qa'];
const command=name=>'npx skills add montadhahri/universal-ai-film-director --skill '+name;
const readme=()=>read('README.md');

test('README introduces the product, one quick start, seven skills and release status',()=>{
 const content=readme();
 for(const term of ['# 🎬 Universal AI Film Director','## 🚀 Get started','## 🎞️ See it in action','## 🎬 Meet your AI film crew','## 🤖 Agent compatibility','## 📚 Learn more','v2.0.0','v2.1.0',command(names[0])])
  assert(content.includes(term),'README missing '+term);
 for(const name of names)
  assert(content.includes('skills/'+name+'/SKILL.md'),'Skill not discoverable: '+name);
 assert.equal((content.match(/^## 🚀 /gm)||[]).length,1,'Keep a single quick-start section');
 assert.equal((content.match(/^## 🎞️ See it in action$/gm)||[]).length,1,'Keep a single visual showcase');
 assert(content.indexOf(command(names[0]))<content.indexOf('## 🎬 Meet your AI film crew'),'Quick install should precede technical details');
 assert(content.includes('docs/installation.md'),'Detailed install instructions should remain discoverable');
});

test('each specialist has a task-specific, nontrivial and discoverable worked example',()=>{
 for(const name of names){
  const skill=read('skills/'+name+'/SKILL.md'),example=read('skills/'+name+'/references/worked-example.md');
  assert(skill.includes('(references/worked-example.md)'),name+': undiscoverable worked example');
  assert(example.length>700,name+': insufficient example');
  assert(/propos|approval|approved|report/i.test(example),name+': missing stage state');
  assert(/not|never|without|unverified|blocked|failure/i.test(example),name+': missing negative case');
 }
});

test('README and examples do not fabricate completed rendering or approvals',()=>{
 const content=readme();
 assert(/actual media generation requires separately available tools/i.test(content),'README must disclose rendering limitation');
 assert(/not proof of autonomous end-to-end production/i.test(content),'Case study must disclose limits');
 assert(/you approve the screenplay/i.test(content),'User approval must remain explicit');
 assert(/require separate authorization/i.test(content),'External actions must require authorization');
 for(const name of names){
  const example=read('skills/'+name+'/references/worked-example.md');
  assert(!/we (generated|rendered|published) the film/i.test(example),name+': fabricated production evidence');
 }
});

test('public quick start is direct and complete, with detailed options in the installation guide',()=>{
 const content=readme(),install=read('docs/installation.md');
 assert(content.includes(command(names[0])));
 assert(content.includes("npx skills add montadhahri/universal-ai-film-director --skill '*'"));
 assert(install.includes('npx skills add montadhahri/universal-ai-film-director --list'),'List command should be available in guide');
 assert(install.includes('git clone https://github.com/montadhahri/universal-ai-film-director.git'));
 assert(!content.includes('Clone the repository using GitHub credentials'));
 assert(!content.includes('authenticated local checkout'));
 assert(!content.includes('The repository is currently private'));
 assert(install.includes('repository is public'));
 assert(!install.includes('currently private'));
 assert(install.includes('41921930247'),'Public install claim must link to successful CI run');
 assert(/not live host invocation/i.test(install),'CI installation must not imply native invocation');
});

test('GitHub installation remains primary and cloning remains optional',()=>{
 const content=readme(),guide=read('docs/installation.md');
 assert(content.indexOf(command(names[0]))<content.indexOf('docs/installation.md'),'Direct install precedes documentation');
 assert(guide.indexOf('## Quick install')<guide.indexOf('## Optional: clone'));
 assert(guide.includes('npx skills add ./skills/universal-ai-film-director'),'Keep tested local developer path');
 for(const name of names)assert(guide.includes(command(name)),'Missing specialist installation in guide: '+name);
 assert(!content.includes('| Local installation command |'));
});

test('README shows a single coherent workflow with approvals and evidence limits',()=>{
 const content=readme();
 for(const phrase of ['1 · Discovery','2 · Screenplay','3 · Visual Bible','4 · Storyboard','5 · Sound direction','6 · Generator setup','7 · Generate','8 · Review','9 · Edit and deliver','Production-ready plan','Project Bible','You approve','Tools available and authorized?'])
  assert(content.includes(phrase),'README workflow missing: '+phrase);
 assert.equal((content.match(/```mermaid/g)||[]).length,1,'Keep one user-facing workflow diagram');
 assert(content.includes('owner-operated session exports were independently reviewed'),'Reviewed two-host transcript evidence must remain visible');
 assert(content.includes('Exact installed Git source revision'),'Unpinned installed source limitation must remain visible');
 assert(content.includes('independent clean-user onboarding'),'Independent onboarding limitation must remain visible');
 assert(content.includes('native Director-to-specialist delegation remain **not verified**'),'Delegation claims must remain bounded');
});

test('README preserves distinct architecture, development, releases and FAQ content',()=>{
 const content=readme();
 for(const heading of ['## 🎞️ Film production workflow','## 🧩 Skills architecture','## 🛠️ Real-world use cases','## 📊 Quality and validation','## 🏷️ Releases and roadmap','## 🤝 Development and contributing','## ❓ FAQ'])
  assert(content.includes(heading),'Missing public-facing section: '+heading);
 for(const term of ['v1.0.0','v2.0.0','v2.1.0','V3','docs/architecture.md','CONTRIBUTING.md','docs/DEVELOPMENT.md','main','develop','does not auto-merge','audio-only repair','not live host invocation','not evidence of better rendered films'])
  assert(content.toLowerCase().includes(term.toLowerCase()),'Missing user-relevant information: '+term);
 assert.equal((content.match(/^## 🧩 Skills architecture$/gm)||[]).length,1);
 assert.equal((content.match(/^## ❓ FAQ$/gm)||[]).length,1);
});

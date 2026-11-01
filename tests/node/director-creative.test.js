'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const skill=read('skills/universal-ai-film-director/SKILL.md');
const craft=read('skills/universal-ai-film-director/references/creative-direction.md');
const discovery=read('skills/universal-ai-film-director/references/discovery.md');
const decisions=read('skills/universal-ai-film-director/references/decision-procedure.md');
test('Director conditionally discovers creative craft without growing into a monolith',()=>{
 assert(skill.includes('(references/creative-direction.md)'));
 assert(craft.length>4500);
 assert(skill.length<9000,'Keep Director entrypoint concise; details belong in references');
});
test('creative proposals do not confer user approval, media evidence or provider permission',()=>{
 for(const x of ['PROPOSED','not user-approved','not evidence that audio was generated','No examples here were rendered']){
  assert(craft.toLowerCase().includes(x.toLowerCase()),x);
 }
 for(const x of ['separate','explicit','approval','LOCKED','BLOCKED_NO_PROVIDER'])assert(skill.includes(x)||skill.toLowerCase().includes(x.toLowerCase()));
});
test('creator retains the brief and Director may make clear, reasoned artistic recommendations',()=>{
 for(const term of ['Audience experience','Visible desire','Dramatic change','Visual expression','Production envelope',
  'Proposed choice','Why it works','Trade-off','Challenge weak ideas constructively'])
  assert(craft.includes(term),'Missing craft guidance: '+term);
 assert(discovery.includes('do not ask')||discovery.includes('Do not ask'));
 assert(decisions.includes('creative direction')||decisions.includes('creative-direction'));
});
test('creative decisions respect single-question discovery and do not repeat answers',()=>{
 assert(craft.includes('one focused question max'));
 assert(craft.includes('asking questions is not itself progress'));
 assert(craft.includes('autobiographical'));
 assert(skill.includes('do not restart discovery'));
});
test('two examples are credible prompts, not synthetic agent performance claims',()=>{
 assert(craft.includes('one-minute animated relocation film'));
 assert(craft.includes('thirty-second hope film'));
 assert(craft.includes('No examples here were rendered'));
});

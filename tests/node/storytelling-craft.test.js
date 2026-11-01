'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const skill=read('skills/film-storytelling/SKILL.md');
const craft=read('skills/film-storytelling/references/short-film-craft.md');
test('specialist discovers concise deep craft reference',()=>{
 assert(skill.includes('(references/short-film-craft.md)'));
 assert(craft.length>6000,'Craft guidance should be substantial and film-specific');
 assert(skill.length<6000,'Entrypoint should remain concise');
});
test('storytelling provides action-based dramatic tools rather than generic plot instruction',()=>{
 for(const term of ['dramatic promise','observable action','Emotional rhythm','Motif payoff',
  'Constructive story doctor','Comedy','Fantasy','Thriller','Autobiographical'])
  assert(craft.toLowerCase().includes(term.toLowerCase()),term);
});
test('proposals protect screenplay approval and refrain from media claims',()=>{
 for(const term of ['PROPOSED','Director','NOT_RENDERED','original approved revision','No observed real-agent benchmarks'])
  assert(craft.toLowerCase().includes(term.toLowerCase()),term);
 for(const term of ['Do not approve your own work','approved screenplay'])assert(skill.includes(term));
});
test('time and VO decisions state assumptions rather than forged synchronization',()=>{
 for(const term of ['word_count / words_per_minute','110–150 WPM','estimate',
 'NO_VO','ABSOLUTE_SILENCE_PROPOSED','cinematography reconciliation'])
  assert(craft.toLowerCase().includes(term.toLowerCase()),term);
});
test('two worked stories satisfy creator constraints while avoiding invented user biography',()=>{
 assert(craft.includes('45-second lighthouse'));
 assert(craft.includes('no more than 15 spoken words'));
 assert(craft.includes('30-second bittersweet instrument'));
 assert(craft.includes('no narration'));
 assert(craft.includes('Don\'t invent why the musician'));
});

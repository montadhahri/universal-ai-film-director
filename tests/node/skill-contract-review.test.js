const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const states = new Set(['DRAFT','PROPOSED','APPROVED','LOCKED','NEEDS_FIX']);
test('sample shot-packet state is a supported lifecycle state',()=>{
 const match=read('templates/shot-prompt.md').match(/\*\*State:\*\*\s*([A-Z_]+)/);
 assert(match,'No state in shot-prompt.md');
 assert(states.has(match[1]));
});
test('storyboard sample state is supported',()=>{
 const row=read('templates/storyboard.md').split('\n').find(x=>x.includes('S01_SH01'));
 assert(row,'Missing sample shot');
 const value=row.split('|').map(x=>x.trim()).filter(Boolean).at(-1);
 assert(states.has(value), 'Unexpected storyboard state: '+value);
});
test('new story discovery and checkpoint resume are distinguishable',()=>{
 const skill=read('SKILL.md');
 assert(skill.includes('new project with no supplied story or Project Bible'));
 assert(skill.includes('do not restart discovery'));
 assert(skill.includes('at most one focused missing question'));
 assert(skill.includes('What story do you want this film to tell?'));
});
test('locked content and missing approvals remain protected',()=>{
 const skill=read('SKILL.md');
 for(const sentence of ['Require explicit approval','Approved shots are LOCKED','Never invent'])
  assert(skill.includes(sentence));
});

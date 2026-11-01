'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const pack=require('../agent-acceptance/visual-direction-cases.json');
test('VD-01–VD-06 manifest has six unique exact prompts and review criteria',()=>{
 assert.equal(pack.skill,'film-visual-direction');
 assert.equal(pack.execution,'external-agent-only');
 assert.deepEqual(pack.cases.map(c=>c.id),['VD-01','VD-02','VD-03','VD-04','VD-05','VD-06']);
 assert.equal(new Set(pack.cases.map(c=>c.prompt)).size,6);
 for(const c of pack.cases){
  assert(c.prompt.length>100);
  assert(c.expected.length>=4);
  assert.equal(new Set(c.expected).size,c.expected.length);
  assert(c.prompt.includes('PROPOSED')||c.prompt.includes('Propose')||c.prompt.includes('proposed'));
 }
});
test('VD pack remains distinct from canonical V2-03 acceptance suite',()=>{
 const base=require('../agent-acceptance/cases.json');
 assert.equal(base.cases.length,14);
 assert(!base.cases.some(c=>pack.cases.some(v=>v.id===c.id)));
});

test('VD-04 v1.1 supplies the amber hue it expects',()=>{
 const c=pack.cases.find(c=>c.id==='VD-04');
 assert.match(c.prompt,/amber spark/);
 assert(c.expected.some(e=>e.includes('amber hue')));
 assert.equal(pack.version,'1.1');
});
test('VD-06 still does not supply actual image provenance',()=>{
 const c=pack.cases.find(c=>c.id==='VD-06');
 assert.match(c.prompt,/no image, URL, license or creator attribution/);
});

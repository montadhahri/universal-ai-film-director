'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const pack=require('../agent-acceptance/video-production-cases.json');
test('VP-01–VP-06 exact prompts and private criteria are structurally valid',()=>{
 assert.equal(pack.skill,'film-video-production');
 assert.equal(pack.execution,'external-agent-only');
 assert.deepEqual(pack.cases.map(c=>c.id),['VP-01','VP-02','VP-03','VP-04','VP-05','VP-06']);
 assert.equal(new Set(pack.cases.map(c=>c.prompt)).size,6);
 for(const c of pack.cases){assert.ok(c.prompt.length>180,c.id);assert.equal(c.expected.length,4,c.id);assert.match(c.prompt,/PROPOSED/);}
});
test('Video Production scenarios do not replace canonical suite',()=>{
 const base=require('../agent-acceptance/cases.json');
 assert.equal(base.cases.length,14);
 assert.ok(!base.cases.some(c=>pack.cases.some(v=>v.id===c.id)));
});
test('Execution states are tested independently',()=>{
 assert.match(pack.cases.find(c=>c.id==='VP-05').prompt,/FAILED/);
 assert.match(pack.cases.find(c=>c.id==='VP-06').prompt,/INSPECTED/);
});

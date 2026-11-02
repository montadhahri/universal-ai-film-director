'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const pack=require('../storytelling-agent-eval/nonzero-vo-regression.json');
test('nonzero VO regression is isolated from original ST-01',()=>{
 assert.equal(pack.execution,'external-agent-only');
 assert.deepEqual(pack.cases.map(c=>c.id),['ST-01B']);
 assert.equal(pack.cases[0].expected.length,4);
 const original=require('../storytelling-agent-eval/cases.json');
 assert.equal(original.cases.find(c=>c.id==='ST-01').prompt.startsWith('Write a PROPOSED 45-second filmable lighthouse screenplay.'),true);
});
test('specified spoken words and time budget are arithmetically consistent',()=>{
 const c=pack.cases[0],vo='Some lights are left on for someone who may return.';
 const words=vo.trim().split(/\\s+/).length;
 assert.equal(words,10);
 assert.equal(words/120*60,5);
 assert.ok(c.prompt.includes(vo));
 assert.match(c.prompt,/120 words per minute/);
 assert.match(c.expected[0],/10 whitespace-separated words; 10\\/120\\*60 = 5 seconds/);
});

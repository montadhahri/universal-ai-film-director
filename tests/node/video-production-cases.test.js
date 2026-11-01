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

test('VP-04 and VP-06 prompts ground every criterion-specific continuity fact',()=>{
 const v4=pack.cases.find(c=>c.id==='VP-04').prompt;
 const v6=pack.cases.find(c=>c.id==='VP-06').prompt;
 assert.match(v4,/approved V5 SH03 runs 11–20s/);
 assert.match(v4,/approved coat is blue/);
 assert.match(v6,/SH05 depends on the same SPARK-01 remaining inside/);
});
test('Video guidance and packet require visible transfer with retained state',()=>{
 const fs=require('node:fs'),path=require('node:path');
 const root=path.join(__dirname,'../../skills/film-video-production');
 const guide=fs.readFileSync(path.join(root,'references/guide.md'),'utf8');
 const packet=fs.readFileSync(path.join(root,'assets/shot-packet-template.md'),'utf8');
 const selection=fs.readFileSync(path.join(root,'references/generator-selection.md'),'utf8');
 assert.match(guide,/visible contact\/transfer\/release/);
 assert.match(packet,/downstream retained state/);
 assert.match(selection,/\.\.\/assets\/shot-packet-template\.md/);
});

test('VP-01 v1.2 grounds approved pickup, transfer and retained lantern location',()=>{
 const prompt=pack.cases.find(c=>c.id==='VP-01').prompt;
 assert.match(prompt,/finds and picks up the single amber SPARK-01/);
 assert.match(prompt,/carries that same SPARK-01 in their hands/);
 assert.match(prompt,/visibly places and releases it inside TOWER-01's lantern/);
 assert.match(prompt,/remains inside TOWER-01's lantern/);
});

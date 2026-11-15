'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const example=fs.readFileSync(path.join(root,'docs/examples/documentary-interview-starter.md'),'utf8');
test('documentary example links existing skill templates',()=>{
 const links=[...example.matchAll(/\]\((\.\.\/\.\.\/skills\/[^)#]+)\)/g)];
 assert.ok(links.length>=6);
 for(const [,relative] of links)assert.ok(fs.statSync(path.resolve(root,'docs/examples',relative)).isFile(),relative);
});
test('documentary example has contiguous 30-second planning timeline',()=>{
 const rows=example.split('\n').filter(line=>/^\| `D01_SH0[1-4]` \|/.test(line));
 assert.equal(rows.length,4);
 let cursor=0;
 for(const row of rows){
  const cells=row.split('|').map(x=>x.trim());
  const start=Number(cells[2].split(':')[1]);
  const end=Number(cells[3].split(':')[1]);
  const duration=Number(cells[4].replace('s',''));
  assert.equal(start,cursor);
  assert.equal(end-start,duration);
  assert.equal(cells[7],'`PROPOSED`');
  cursor=end;
 }
 assert.equal(cursor,30);
});
test('documentary example keeps rights, consent and execution explicitly unresolved',()=>{
 for(const term of ['consent','`false`','`PLAN_ONLY`','`UNVERIFIED`','NOT_VERIFIED','NOT_OBTAINED','not fabricated']){
  assert.ok(example.includes(term),term);
 }
});

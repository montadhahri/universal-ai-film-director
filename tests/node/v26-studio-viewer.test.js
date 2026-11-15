'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {projectView,renderStudio}=require('../../scripts/studio-viewer.js');
test('local read-only view preserves original project and never grants production',()=>{
 const p=newProject('local-test');const before=structuredClone(p);
 const v=projectView(p);assert.equal(v.production_status,'HOLD');
 assert.equal(v.assets_status,'NOT_VERIFIED');assert.equal(v.authorization.production_go,false);
 assert.deepEqual(p,before);assert(Object.isFrozen(v));assert(Object.isFrozen(v.gates));
});
test('HTML escapes untrusted project and shot fields',()=>{
 const p=newProject('<script>alert(1)</script>');p.shots.push({id:'<img src=x onerror=alert(1)>',revision:1,state:'DRAFT'});
 const html=renderStudio(p);
 assert(!html.includes('<script>alert(1)</script>'));assert(!html.includes('<img src=x'));
 assert(html.includes('&lt;script&gt;'));assert(html.includes('&lt;img'));
 assert(html.includes('scope="col"'));assert(html.includes('role="status"'));
});
test('reject invalid project rather than presenting unverified data as approved',()=>{
 const p=newProject('test');p.gates.script={approved:true};
 assert.throws(()=>projectView(p),/evidence/);
});
test('locked shot is displayed without modifying state',()=>{
 const p=newProject('test');p.shots.push({id:'SH01',revision:1,state:'LOCKED',approved_asset:'asset-1'});
 const html=renderStudio(p);assert(html.includes('LOCKED'));assert(html.includes('asset-1'));assert.equal(p.shots[0].state,'LOCKED');
});

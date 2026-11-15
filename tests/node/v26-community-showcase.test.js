'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const schema=JSON.parse(fs.readFileSync(path.join(root,'contracts/community-showcase.schema.json'),'utf8'));
const contributing=fs.readFileSync(path.join(root,'CONTRIBUTING.md'),'utf8');
test('community metadata is versioned, closed and uses seven canonical skills',()=>{
 assert.equal(schema.properties.schema_version.const,'1.0');
 assert.equal(schema.additionalProperties,false);
 assert.equal(schema.properties.skills_used.items.enum.length,7);
 assert.equal(new Set(schema.properties.skills_used.items.enum).size,7);
 for(const field of ['assets','rights_review','publication'])assert.ok(schema.required.includes(field));
});
test('asset provenance and publication permissions are explicit, not implied',()=>{
 for(const field of ['origin','rights_status','evidence_refs'])assert.ok(schema.$defs.asset.required.includes(field));
 assert.ok(schema.$defs.asset.properties.origin.enum.includes('UNKNOWN'));
 assert.ok(schema.$defs.asset.properties.rights_status.enum.includes('NOT_VERIFIED'));
 assert.ok(schema.properties.publication.required.includes('owner_consent'));
 assert.ok(schema.properties.publication.required.includes('platform_permission'));
 assert.ok(schema.properties.rights_review.properties.reviewer_decision.enum.includes('HOLD'));
 assert.ok(contributing.includes('metadata schema alone does not enforce'));
});

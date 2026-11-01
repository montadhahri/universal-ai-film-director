const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('approved gate requires version and exact evidence by JSON schema',()=>{
 const gate=JSON.parse(read('schemas/project-bible.schema.json')).$defs.gate;
 const conditional=gate.allOf.find(x=>x.if?.properties?.approved?.const===true);
 assert(conditional,'Approved gate conditional must exist');
 assert.deepEqual(conditional.then.required,['version','evidence']);
 assert.equal(conditional.then.properties.version.minLength,1);
 assert.equal(conditional.then.properties.evidence.minLength,1);
});
test('LOCKED shot requires an approved asset by JSON schema',()=>{
 const shot=JSON.parse(read('schemas/project-bible.schema.json')).$defs.shot;
 const conditional=shot.allOf.find(x=>x.if?.properties?.state?.const==='LOCKED');
 assert(conditional);
 assert(conditional.then.required.includes('approved_asset'));
 assert.equal(conditional.then.properties.approved_asset.minLength,1);
});
test('Markdown Project Bible records independent gates, IDs, provenance and safe resume',()=>{
 const text=read('templates/project-bible.md');
 for(const term of ['Screenplay','Visual bible','Storyboard','Exact approval evidence','Shot ID','Revision','LOCKED','Scoped unlock','Next safe action','File persistence confirmed'])
  assert(text.includes(term),term);
});

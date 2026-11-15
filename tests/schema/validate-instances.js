'use strict';
// CI-only standards-compliant Draft 2020-12 instance validation; Ajv is NOT a skill dependency.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Ajv2020=require('ajv/dist/2020').default;
const root=path.resolve(__dirname,'../..');
const load=name=>JSON.parse(fs.readFileSync(path.join(root,'contracts',name+'.schema.json'),'utf8'));
const ajv=new Ajv2020({allErrors:true,strict:true,strictRequired:false});
ajv.addSchema(load('handoff'),'handoff.schema.json');
const validate={};
for(const name of ['handoff','project-bible','project-snapshot','community-showcase']){
 validate[name]=ajv.compile(load(name));
}
function check(name,data,expected){
 const valid=validate[name](data);
 assert.equal(valid,expected,name+': '+JSON.stringify(validate[name].errors));
}
const {newProject}=require('../../scripts/project-contracts.js');
const {createProjectSnapshot}=require('../../scripts/project-snapshot.js');
const project=newProject('contract-validation');
check('project-bible',project,true);
check('project-bible',{...project,authorization:{...project.authorization,production_go:true}},false);
check('project-bible',{...project,unknown_authority:true},false);
const snapshot=createProjectSnapshot(project);
check('project-snapshot',snapshot,true);
check('project-snapshot',{...snapshot,authorization:{...snapshot.authorization,publication_allowed:true}},false);
check('project-snapshot',{...snapshot,contract_version:'2.0'},false);
check('project-snapshot',{...snapshot,workflow:{...snapshot.workflow,proposal_count:-1}},false);
const handoff={contract_version:'2.0',project_id:'contract-validation',request_id:'req-1',origin:'film-storytelling',stage:'script',input_revision:1,status:'PROPOSED',proposed_artifact:{id:'draft-1',revision:1,kind:'script'},provenance:{kind:'AGENT_DRAFT',evidence_ref:null},required_authorization:['script_user_approval']};
check('handoff',handoff,true);
check('handoff',{...handoff,status:'APPROVED'},false);
check('project-bible',{...project,proposals:[handoff]},true); // resolves local cross-file $ref
check('project-bible',{...project,proposals:[{...handoff,status:'APPROVED'}]},false);
const showcase={schema_version:'1.0',submission_id:'sample-001',title:'Sample',summary:'Planning-only example',creator_display_name:'Example creator',skills_used:['film-storytelling'],assets:[],rights_review:{status:'NOT_VERIFIED',evidence_refs:[],reviewer_decision:'HOLD'},publication:{owner_consent:false,platform_permission:false,status:'DRAFT'}};
check('community-showcase',showcase,true);
check('community-showcase',{...showcase,skills_used:['film-storytelling','film-storytelling']},false);
check('community-showcase',{...showcase,assets:[{asset_id:'a',kind:'image',origin:'UNKNOWN',rights_status:'NOT_VERIFIED',evidence_refs:[],unexpected:true}]},false);
check('community-showcase',{...showcase,schema_version:'2.0'},false);
console.log('PASS: Draft 2020-12 validator compiled four canonical schemas; positive and negative instances, local $ref and authority boundaries validated');

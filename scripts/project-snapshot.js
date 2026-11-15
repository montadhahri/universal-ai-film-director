'use strict';
// UI-independent, read-only projection. Not an import, approval or production adapter.
const {validateProject}=require('./project-contracts.js');
const clone=x=>structuredClone(x);
const fail=message=>{throw new Error(message);};
function createProjectSnapshot(project){
 validateProject(project);
 // Fail closed on unknown top-level fields; never silently discard future authority-bearing data.
 const schema=require('../contracts/project-bible.schema.json');
 const allowed=new Set(Object.keys(schema.properties));
 if(Object.keys(project).some(key=>!allowed.has(key)))fail('Unknown Project Bible field; update snapshot contract before export');
 if(!Array.isArray(project.gate_proposals||[])||!Array.isArray(project.memory_anchors||[]))fail('Invalid snapshot collections');
 const gates=clone(project.gates);
 const shots=project.shots.map(s=>({id:s.id,revision:s.revision,state:s.state,
  ...(s.approved_asset===undefined?{}:{approved_asset:s.approved_asset}),
  continuity_refs:clone(s.continuity_refs),issues:clone(s.issues)}));
 const memory_anchors=(project.memory_anchors||[]).map(a=>({id:a.id,kind:a.kind,revision:a.revision,status:a.status,shot_refs:clone(a.shot_refs)}));
 const snapshot={contract_version:'1.0',source_schema_version:project.schema_version,project_id:project.project_id,
  revision:project.revision,phase:project.phase,gates,shots,memory_anchors,
  authorization:{production_go:false,provider_job_allowed:false,publication_allowed:false},
  workflow:{proposal_count:project.proposals.length,
   pending_gate_proposal_count:(project.gate_proposals||[]).filter(p=>p.status==='PENDING').length,
   locked_shot_count:shots.filter(s=>s.state==='LOCKED').length}};
 return snapshot;
}
module.exports={createProjectSnapshot};

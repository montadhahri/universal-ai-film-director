'use strict';
// V2.6 local-first, read-only HTML projection. No external assets or network calls.
const {validateProject}=require('./project-contracts.js');
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=value=>value===undefined||value===null?'Not recorded':String(value);
function projectView(project) {
 validateProject(project);
 const safe=structuredClone(project);
 return Object.freeze({
  project_id:safe.project_id,revision:safe.revision,phase:safe.phase,
  gates:Object.freeze(Object.fromEntries(['script','visual_bible','storyboard'].map(k=>[k,Object.freeze({approved:safe.gates[k].approved===true,version:safe.gates[k].version||null})]))),
  shots:Object.freeze(safe.shots.map(s=>Object.freeze({id:s.id,revision:s.revision,state:s.state,approved_asset:s.approved_asset||null}))),
  authorization:Object.freeze({production_go:false,provider_job_allowed:false,publication_allowed:false}),
  assets_status:'NOT_VERIFIED',production_status:'HOLD'
 });
}
function renderStudio(project) {
 const v=projectView(project);
 const row=(a,b)=>'<tr><th scope="row">'+esc(a)+'</th><td>'+esc(text(b))+'</td></tr>';
 const gates=Object.entries(v.gates).map(([k,g])=>row(k,g.approved?'Approved (recorded)':'Not approved') ).join('');
 const shots=v.shots.map(s=>'<tr><th scope="row">'+esc(s.id)+'</th><td>'+esc(s.revision)+'</td><td>'+esc(s.state)+'</td><td>'+esc(text(s.approved_asset))+'</td></tr>').join('');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Film Studio — '+esc(v.project_id)+'</title><style>body{font:1rem/1.5 system-ui,sans-serif;max-width:64rem;margin:auto;padding:1.5rem;color:#18202a;background:#fff}table{border-collapse:collapse;width:100%;margin-bottom:1.5rem}th,td{padding:.6rem;border:1px solid #aaa;text-align:left}caption{text-align:left;font-weight:bold;margin-bottom:.5rem}a:focus-visible{outline:3px solid #1649b5} .notice{border-left:4px solid #775a00;padding:.75rem;background:#fff8df}</style></head><body><main><h1>Visual Film Studio — read-only preview</h1><p class="notice" role="status">Local projection only. No media inspected, no approvals granted, no production authorized.</p><h2>Project</h2><table><caption>Project summary</caption><tbody>'+row('Project ID',v.project_id)+row('Revision',v.revision)+row('Phase',v.phase)+row('Media inspection',v.assets_status)+row('Production',v.production_status)+'</tbody></table><h2>Approval gates</h2><table><caption>Recorded approval state (not independently authenticated)</caption><tbody>'+gates+'</tbody></table><h2>Shots</h2><table><caption>Project shot records</caption><thead><tr><th scope="col">ID</th><th scope="col">Revision</th><th scope="col">State</th><th scope="col">Approved asset reference</th></tr></thead><tbody>'+(shots||'<tr><td colspan="4">No shots recorded</td></tr>')+'</tbody></table><p>Provider jobs, budgets, external media and provenance are not loaded or inferred in this foundation.</p></main></body></html>';
}
module.exports={projectView,renderStudio};

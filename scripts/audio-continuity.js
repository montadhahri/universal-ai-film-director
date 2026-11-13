'use strict';
// Pure planning validation and impact reports, no asset writes, approval, media or provider actions.
const {validateProject}=require('./project-contracts.js');
const {validateTimeline}=require('./production-pipeline.js');
const ok=x=>typeof x==='string'&&x.trim().length>0;
const safe=x=>Number.isSafeInteger(x)&&x>=0;
const fail=s=>{throw new Error(s)};
const copy=x=>structuredClone(x);
const tracks=new Set(['narration','dialogue','music','sfx','ambience']);
const statuses=new Set(['PLANNED','USER_SUPPLIED','GENERATED_UNVERIFIED']);
function validateAudioTimeline(t,picture){
 if(!t||!safe(t.duration_ms)||t.duration_ms===0||!Array.isArray(t.cues)||
  !Array.isArray(t.required_narration)||!Array.isArray(t.intentional_silence))
  fail('Audio timeline requires duration_ms, cues, required_narration and intentional_silence');
 if(picture){validateTimeline(picture);if(t.duration_ms!==picture.duration_ms)fail('Audio and picture duration mismatch')}
 const ids=new Set(),byTrack=new Map();
 for(const [i,c] of t.cues.entries()){
  if(!c||!ok(c.id)||!tracks.has(c.track)||!safe(c.start_ms)||!safe(c.end_ms)||
    c.end_ms<=c.start_ms||c.end_ms>t.duration_ms||!statuses.has(c.status))
   fail('Invalid audio cue at index '+i);
  if(ids.has(c.id))fail('Duplicate audio cue ID '+c.id);
  ids.add(c.id);
  const arr=byTrack.get(c.track)||[];arr.push(c);byTrack.set(c.track,arr);
 }
 // Overlap between different tracks is normal mixing; same-track overlap requires a future explicit layer model.
 for(const [track,cues] of byTrack){
  cues.sort((a,b)=>a.start_ms-b.start_ms||a.end_ms-b.end_ms);
  for(let i=1;i<cues.length;i++)if(cues[i].start_ms<cues[i-1].end_ms)
   fail('Same-track overlap in '+track+' between '+cues[i-1].id+' and '+cues[i].id);
 }
 const interval=(a,label)=>{if(!a||!safe(a.start_ms)||!safe(a.end_ms)||a.end_ms<=a.start_ms||
  a.end_ms>t.duration_ms)fail('Invalid '+label+' interval');};
 const silence=t.intentional_silence.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const s of silence)interval(s,'intentional silence');
 for(let i=1;i<silence.length;i++)if(silence[i].start_ms<silence[i-1].end_ms)fail('Overlapping silence intervals');
 // Intentional silence means no active cues of any track; validate that declaration rather than assuming it.
 for(const s of silence)for(const c of t.cues)
  if(c.start_ms<s.end_ms&&c.end_ms>s.start_ms)fail('Audio cue '+c.id+' overlaps intentional silence');
 const required=t.required_narration.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const r of required)interval(r,'required narration');
 for(let i=1;i<required.length;i++)if(required[i].start_ms<required[i-1].end_ms)fail('Overlapping required narration intervals');
 const narration=byTrack.get('narration')||[];
 for(const r of required){
  let covered=r.start_ms;
  for(const c of narration){
   if(c.end_ms<=covered||c.start_ms>=r.end_ms)continue;
   if(c.start_ms>covered)fail('Narration gap at '+covered+'ms');
   covered=Math.max(covered,Math.min(c.end_ms,r.end_ms));
   if(covered===r.end_ms)break;
  }
  if(covered<r.end_ms)fail('Narration gap at '+covered+'ms');
 }
 return {valid:true,duration_ms:t.duration_ms,cue_count:t.cues.length,required_narration_windows:required.length,
  intentional_silence_windows:silence.length,mixing_rule:'CROSS_TRACK_ALLOWED; SAME_TRACK_DISALLOWED'};
}
// Canonical references are kind:id. Legacy bare IDs are accepted only
// when exactly one node has that ID; ambiguous legacy references fail closed.
function resolveDependencyRef(ref,nodes) {
 const keys=nodes.map(n=>n.kind+':'+n.id);
 if(keys.includes(ref))return ref;
 const matches=nodes.filter(n=>n.id===ref);
 if(matches.length===1)return matches[0].kind+':'+matches[0].id;
 fail(matches.length>1?'Ambiguous dependency reference '+ref:'Dangling dependency reference '+ref);
}
function validateDependencyGraph(g){
 if(!g||!Array.isArray(g.nodes)||!Array.isArray(g.edges))fail('Dependency graph needs nodes and edges');
 const keys=new Set(),adj=new Map();
 for(const n of g.nodes){
  if(!n||!['shot','audio','anchor'].includes(n.kind)||!ok(n.id))fail('Invalid dependency node');
  const k=n.kind+':'+n.id;
  if(keys.has(k))fail('Duplicate dependency node '+k);
  keys.add(k);adj.set(k,[]);
 }
 const edges=new Set();
 for(const e of g.edges){
  if(!e||!ok(e.from)||!ok(e.to))fail('Dangling dependency reference');
  const from=resolveDependencyRef(e.from,g.nodes),to=resolveDependencyRef(e.to,g.nodes);
  const k=from+'->'+to;
  if(edges.has(k))fail('Duplicate dependency edge');
  edges.add(k);adj.get(from).push(to);
 }
 const states=new Map();
 const visit=k=>{
  if(states.get(k)===1)fail('Dependency cycle at '+k);
  if(states.get(k)===2)return;
  states.set(k,1);for(const next of adj.get(k))visit(next);states.set(k,2);
 };
 for(const k of keys)visit(k);
 return {valid:true,node_count:keys.size,edge_count:edges.size};
}
function recordAudioTimeline(p,{expected_revision,timeline}){
 validateProject(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(p.phase!=='sound')fail('Audio timeline may be recorded only during sound planning');
 if(!p.shot_timeline)fail('Approved picture timeline is required');
 if(!p.gates.storyboard.approved)fail('Storyboard approval required');
 if(p.audio_timeline)fail('Existing audio timeline cannot be silently overwritten; use a scoped repair proposal');
 validateAudioTimeline(timeline,p.shot_timeline);
 const n=copy(p);n.audio_timeline=copy(timeline);n.revision++;return n;
}
function previewRepairImpact(p,{expected_revision,target}){
 validateProject(p);
 if(expected_revision!==p.revision)fail('Stale project revision');
 if(!p.dependency_graph)fail('Dependency graph missing');
 validateDependencyGraph(p.dependency_graph);
 if(!ok(target))fail('Unknown repair target');
 let normalizedTarget;
 try{normalizedTarget=resolveDependencyRef(target,p.dependency_graph.nodes)}
 catch(err){if(err.message.startsWith('Dangling dependency reference'))fail('Unknown repair target');throw err;}
 if(p.shot_timeline)validateTimeline(p.shot_timeline);
 if(p.audio_timeline)validateAudioTimeline(p.audio_timeline,p.shot_timeline);
 const adj=new Map(p.dependency_graph.nodes.map(n=>[n.kind+':'+n.id,[]]));
 for(const e of p.dependency_graph.edges)adj.get(resolveDependencyRef(e.from,p.dependency_graph.nodes)).push(resolveDependencyRef(e.to,p.dependency_graph.nodes));
 const affected=new Set([normalizedTarget]),queue=[normalizedTarget];
 for(let i=0;i<queue.length;i++)for(const next of adj.get(queue[i]))
  if(!affected.has(next)){affected.add(next);queue.push(next)}
 const locked=p.shots.filter(s=>s.state==='LOCKED').map(s=>'shot:'+s.id);
 const candidateLocked=locked.filter(k=>affected.has(k));
 return {target:normalizedTarget,affected:[...affected].sort(),unaffected:p.dependency_graph.nodes.map(n=>n.kind+':'+n.id)
   .filter(k=>!affected.has(k)).sort(),affected_locked_shots:[...new Set(candidateLocked)].sort(),
   requires_scoped_unlock:candidateLocked.length>0,changed_assets:[],media_inspected:false,
   status:'IMPACT_PREVIEW_ONLY'};
}
module.exports={validateAudioTimeline,validateDependencyGraph,recordAudioTimeline,previewRepairImpact};

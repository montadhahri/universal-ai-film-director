'use strict';
// Lightweight structured pre-handoff review. It does NOT judge art, approve scripts,
// verify rendered media, or replace Director/user approvals.
const validText=x=>typeof x==='string'&&x.trim().length>0;
const positive=n=>Number.isSafeInteger(n)&&n>0;
const nonnegative=n=>Number.isSafeInteger(n)&&n>=0;
function intersects(a,b){return a.start_ms<b.end_ms&&b.start_ms<a.end_ms}
// Whitespace-token convention: contractions count as one word. No linguistic word segmentation claim.
function countNarrationWords(text){
 if(typeof text!=='string')throw Error('Narration text must be a string');
 return text.trim()?text.trim().split(/\s+/u).length:0;
}
function reviewDraft(d){
 if(!d||!positive(d.duration_ms)||!Array.isArray(d.beats)||d.beats.length===0||!Array.isArray(d.narration))
  throw Error('Draft requires positive duration_ms, nonempty beats, and narration array');
 const issues=[],warnings=[],ids=new Set();let cursor=0;
 const ordered=[];
 for(const [i,b] of d.beats.entries()){
  if(!b||!validText(b.id)||!nonnegative(b.start_ms)||!positive(b.end_ms)||b.end_ms<=b.start_ms||!validText(b.action))
   throw Error('Invalid beat '+i);
  if(ids.has(b.id))issues.push('Duplicate beat ID '+b.id);ids.add(b.id);
  if(b.start_ms>cursor)issues.push('Beat gap before '+b.id);
  if(b.start_ms<cursor)issues.push('Beat overlap before '+b.id);
  if(b.end_ms>d.duration_ms)issues.push('Beat exceeds film duration '+b.id);
  cursor=b.end_ms;ordered.push(b);
 }
 if(cursor!==d.duration_ms)issues.push('Beat plan does not cover requested duration');
 // Optional structured prop trace: explicit state changes need a transfer annotation.
 // This validates supplied annotations, not unstructured prose or rendered media.
 const previousProps=new Map();
 for(const b of ordered){
  if(b.prop_states===undefined)continue;
  if(!Array.isArray(b.prop_states))throw Error('Invalid prop states at '+b.id);
  const seenProps=new Set();
  for(const p of b.prop_states){
   if(!p||!validText(p.id)||!validText(p.location)||!validText(p.owner))
    throw Error('Invalid prop state at '+b.id);
   if(seenProps.has(p.id))issues.push('Duplicate prop state '+p.id+' at '+b.id);
   seenProps.add(p.id);
   const previous=previousProps.get(p.id);
   if(previous&&(previous.location!==p.location||previous.owner!==p.owner)&&
      !validText(p.transfer_from_previous))
    issues.push('Unexplained prop transfer '+p.id+' from '+previous.beat+' to '+b.id);
   previousProps.set(p.id,{beat:b.id,location:p.location,owner:p.owner});
  }
 }
 const narration=d.narration.slice().sort((a,b)=>a.start_ms-b.start_ms);
 for(const [i,n] of narration.entries()){
  if(!n||!validText(n.text)||!nonnegative(n.start_ms)||!positive(n.end_ms)||n.end_ms<=n.start_ms||n.end_ms>d.duration_ms)
   throw Error('Invalid narration cue '+i);
  if(i&&intersects(narration[i-1],n))warnings.push('Narration cues overlap: verify delivery and sound handoff');
  const words=countNarrationWords(n.text);
  if(n.declared_word_count!==undefined){
   if(!nonnegative(n.declared_word_count))throw Error('Invalid declared narration word count '+i);
   if(n.declared_word_count!==words)issues.push('Narration word count mismatch at '+n.start_ms+': declared '+n.declared_word_count+', actual '+words);
  }
  if(!Number.isFinite(n.assumed_wpm)||n.assumed_wpm<=0)warnings.push('Narration speaking rate not documented at '+n.start_ms);
  else if(words/n.assumed_wpm*60000>n.end_ms-n.start_ms)
   issues.push('Narration does not fit estimated cue window at '+n.start_ms);
  // visual_attention is a human-labeled scene requirement, NOT video inspection.
  for(const b of ordered){
   if(b.visual_attention==='READ_TEXT'&&intersects(n,b))
    warnings.push('Narration competes with on-screen reading at beat '+b.id);
   else if(b.visual_attention==='SUBTLE_REACTION'&&intersects(n,b))
    warnings.push('Narration may compete with subtle reaction at beat '+b.id);
  }
 }
 if(nonnegative(d.max_narration_words)){
  const total=narration.reduce((sum,n)=>sum+countNarrationWords(n.text),0);
  if(total>d.max_narration_words)issues.push('Narration exceeds maximum word budget: '+total);
 }
 if(d.no_narration===true&&narration.length)issues.push('No-narration constraint violated');
 for(const b of ordered){
  const length=b.end_ms-b.start_ms;
  if(b.emotional_payoff===true&&length<3500)
   warnings.push('Emotional payoff may lack reaction time: '+b.id+' ('+length+'ms)');
  if(b.complex_action===true&&length<4000)
   warnings.push('Complex action may not fit: '+b.id+' ('+length+'ms)');
  if(b.visual_attention==='READ_TEXT'&&length<2500)
   warnings.push('On-screen text may not be readable: '+b.id);
 }
 if(!validText(d.opening_motif)||!validText(d.ending_payoff))
  warnings.push('Opening motif or earned final-image connection not documented');
 if(d.has_confirmed_rights===false)warnings.push('Confirm rights/consent before any external production');
 return {status:issues.length?'REVISION_REQUIRED':'READY_FOR_DIRECTOR_REVIEW',
  issues:[...new Set(issues)],warnings:[...new Set(warnings)],approval_granted:false,
  media_inspected:false,quality_proven:false,
  interpretation:'Structural checks and editorial prompts only. Creative merit and approval require human review.'};
}

/** Pre-draft timing feasibility. Exclusions prohibit narration and may overlap. */
function reviewBrief(brief){
 if(!brief||!positive(brief.duration_ms)||!nonnegative(brief.narration_words)||
    !Number.isFinite(brief.max_wpm)||brief.max_wpm<=0||
    !Array.isArray(brief.narration_exclusions))
  throw Error('Invalid timing brief');
 const intervals=brief.narration_exclusions.map((v,i)=>{
  if(!v||!nonnegative(v.start_ms)||!positive(v.end_ms)||
     v.end_ms<=v.start_ms||v.end_ms>brief.duration_ms)
   throw Error('Invalid exclusion '+i);
  return v;
 }).sort((a,b)=>a.start_ms-b.start_ms);
 let reserved=0,start=-1,end=-1;
 for(const v of intervals){
  if(start<0){start=v.start_ms;end=v.end_ms;}
  else if(v.start_ms<=end)end=Math.max(end,v.end_ms);
  else{reserved+=end-start;start=v.start_ms;end=v.end_ms;}
 }
 if(start>=0)reserved+=end-start;
 const available_ms=brief.duration_ms-reserved;
 const required_ms=brief.narration_words/brief.max_wpm*60000;
 return {status:required_ms<=available_ms?'FEASIBLE':'BLOCKED',
  available_ms,required_ms,reserved_ms:reserved,
  shortfall_ms:Math.max(0,required_ms-available_ms),
  approval_granted:false,media_inspected:false,
  interpretation:'Timing estimate only; pauses and actual synchronization unverified.'};
}
/** Declarative scope check, not a real diff or authorization verification. */
function reviewRevisionScope(change){
 if(!change||!Array.isArray(change.allowed_types)||
    !Array.isArray(change.changed_artifacts)||!Array.isArray(change.protected_versions))
  throw Error('Invalid revision scope');
 const issues=[];
 for(const a of change.changed_artifacts){
  if(!a||!validText(a.id)||!validText(a.type))throw Error('Invalid changed artifact');
  if(!change.allowed_types.includes(a.type))
   issues.push('Unauthorized artifact type: '+a.type+' ('+a.id+')');
  if(change.protected_versions.some(p=>p.id===a.id))
   issues.push('Protected approved artifact changed: '+a.id);
 }
 return {status:issues.length?'REVISION_REQUIRED':'READY_FOR_DIRECTOR_REVIEW',
  issues,approval_granted:false,media_inspected:false};
}
module.exports={reviewDraft,reviewBrief,reviewRevisionScope,countNarrationWords};

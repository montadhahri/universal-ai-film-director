'use strict';
// Pure budget proposal evaluation. No provider, filesystem, approval or spending side effects.
const fail=message=>{throw new Error(message);};
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const text=x=>typeof x==='string'&&x.trim().length>0;
const money=x=>Number.isSafeInteger(x)&&x>=0;
const currencies=new Set(['EUR','USD','GBP','TND','CAD','AUD','JPY','CHF']);
function planBudget(project,request){
 if(!object(project)||!text(project.project_id)||!Number.isSafeInteger(project.revision)||project.revision<1)fail('Invalid project');
 if(!object(project.authorization)||Object.values(project.authorization).some(v=>v!==false))fail('Budget planner requires operational HOLD');
 if(!object(request)||request.expected_revision!==project.revision)fail('Stale budget request');
 if(!currencies.has(request.currency)||!money(request.ceiling_minor))fail('Invalid currency or ceiling');
 if(!Array.isArray(request.shots)||request.shots.length===0)fail('Shot estimates required');
 const ids=new Set(),evaluated=[];let total=0,unknown=false;
 for(const shot of request.shots){
  if(!object(shot)||!text(shot.shot_id)||ids.has(shot.shot_id))fail('Invalid or duplicate shot ID');
  ids.add(shot.shot_id);
  if(!Array.isArray(shot.options)||shot.options.length===0)fail('Shot options required');
  const optionIds=new Set();
  const options=shot.options.map(option=>{
   if(!object(option)||!text(option.id)||optionIds.has(option.id))fail('Invalid or duplicate option');
   optionIds.add(option.id);
   if(!['MANUAL','LOCAL','MOCK','EXTERNAL'].includes(option.method))fail('Invalid production method');
   if(option.currency!==request.currency)fail('Mixed currency without explicit conversion');
   if(!['KNOWN','ESTIMATE','UNKNOWN'].includes(option.confidence))fail('Invalid cost confidence');
   if(!text(option.source)||!/^\d{4}-\d{2}-\d{2}$/.test(option.observed_on)||!Number.isFinite(Date.parse(option.observed_on+'T00:00:00Z')))fail('Missing cost source or date');
   if(option.confidence==='UNKNOWN'&&option.cost_minor!==null)fail('Unknown cost must be null');
   if(option.confidence!=='UNKNOWN'&&!money(option.cost_minor))fail('Invalid cost');
   return {id:option.id,method:option.method,currency:option.currency,cost_minor:option.cost_minor,confidence:option.confidence,source:option.source,observed_on:option.observed_on};
  });
  if(!text(shot.selected_option_id))fail('Selected option required');
  const chosen=options.find(o=>o.id===shot.selected_option_id);
  if(!chosen)fail('Selected option not found');
  if(chosen.cost_minor===null)unknown=true;
  else {total+=chosen.cost_minor;if(!Number.isSafeInteger(total))fail('Cost total overflow');}
  evaluated.push({shot_id:shot.shot_id,selected_option_id:chosen.id,selected:chosen,options});
 }
 const exceeds=total>request.ceiling_minor;
 return {project_id:project.project_id,input_revision:project.revision,status:unknown?'BLOCKED_UNKNOWN_COST':exceeds?'BLOCKED_OVER_BUDGET':'WITHIN_ESTIMATED_CEILING',
  currency:request.currency,ceiling_minor:request.ceiling_minor,known_selected_total_minor:total,
  remaining_minor:unknown||exceeds?null:request.ceiling_minor-total,has_unknown_cost:unknown,
  estimated_only:evaluated.some(s=>s.selected.confidence!=='KNOWN'),
  shots:evaluated,provider_execution_performed:false,spending_authorized:false,media_generated:false};
}
module.exports={planBudget};

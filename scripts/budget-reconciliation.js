'use strict';
// Read-only, conservative comparison; budget acceptance never grants operational permission.
const {planBudget}=require('./budget-planner.js');
const {validateJobLedger}=require('./production-jobs.js');
function reconcileBudgetJobs(project,request,ledger){
 const budget=planBudget(project,request);
 validateJobLedger(project,ledger);
 const findings=[];
 const fail=(code,detail)=>findings.push({code,detail});
 if(budget.status!=='WITHIN_ESTIMATED_CEILING')fail('BUDGET_BLOCKED',budget.status);
 const options=new Map(budget.shots.map(s=>[s.shot_id,s.selected]));
 for(const job of ledger.jobs){
  const selected=options.get(job.shot_id);
  if(!selected)fail('UNBUDGETED_JOB',job.id);
  else if(selected.method!==job.method)fail('METHOD_MISMATCH',job.id);
  else if(selected.cost_minor===null)fail('UNKNOWN_COST',job.id);
  else if(selected.cost_minor!==0&&request.ceiling_minor===0)fail('ZERO_CEILING_COST',job.id);
 }
 return {status:findings.length?'GAP':'PASS',findings,project_id:project.project_id,revision:project.revision,job_count:ledger.jobs.length,
  budget_status:budget.status,estimated_only:budget.estimated_only,scope:'READ_ONLY_RECONCILIATION',execution_authorized:false,media_generated:false};
}
module.exports={reconcileBudgetJobs};

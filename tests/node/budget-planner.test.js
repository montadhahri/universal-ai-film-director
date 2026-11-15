'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {newProject}=require('../../scripts/project-contracts.js');
const {planBudget}=require('../../scripts/budget-planner.js');
const p=newProject('budget-test');
const option=(overrides={})=>({id:'manual',method:'MANUAL',currency:'EUR',cost_minor:0,confidence:'ESTIMATE',source:'test fixture only',observed_on:'2026-11-15',...overrides});
const request=(overrides={})=>({expected_revision:p.revision,currency:'EUR',ceiling_minor:0,shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option()]}],...overrides});
test('zero ceiling supports a no-cost manual estimate without execution',()=>{
 const before=structuredClone(p),r=planBudget(p,request());
 assert.equal(r.status,'WITHIN_ESTIMATED_CEILING');assert.equal(r.known_selected_total_minor,0);
 assert.equal(r.spending_authorized,false);assert.equal(r.provider_execution_performed,false);assert.deepEqual(p,before);
});
test('unknown price blocks even at zero ceiling',()=>{
 const r=planBudget(p,request({shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option({cost_minor:null,confidence:'UNKNOWN'})]}]}));
 assert.equal(r.status,'BLOCKED_UNKNOWN_COST');
});
test('over ceiling blocks',()=>assert.equal(planBudget(p,request({shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option({cost_minor:1})]}]})).status,'BLOCKED_OVER_BUDGET'));
test('stale revision rejected',()=>assert.throws(()=>planBudget(p,request({expected_revision:2})),/Stale/));
test('mixed currency rejected',()=>assert.throws(()=>planBudget(p,request({shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option({currency:'USD'})]}]})),/Mixed currency/));
test('duplicate shots rejected',()=>assert.throws(()=>planBudget(p,request({shots:[request().shots[0],request().shots[0]]})),/duplicate shot/));
test('missing source rejected',()=>assert.throws(()=>planBudget(p,request({shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option({source:''})]}]})),/source/));
test('operational authorization remains HOLD',()=>assert.throws(()=>planBudget({...p,authorization:{...p.authorization,provider_job_allowed:true}},request()),/HOLD/));
test('unknown option not selected does not silently affect chosen total',()=>{
 const r=planBudget(p,request({shots:[{shot_id:'SH01',selected_option_id:'manual',options:[option(),option({id:'external',method:'EXTERNAL',confidence:'UNKNOWN',cost_minor:null})]}]}));
 assert.equal(r.status,'WITHIN_ESTIMATED_CEILING');
});

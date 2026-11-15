#!/usr/bin/env node
'use strict';
// Executed against the actual copied skill directory in the Skills CLI smoke job.
const assert=require('node:assert/strict');
const path=require('node:path');
const dir=process.argv[2];if(!dir)throw Error('Installed QA skill path required');
const {planSmartRepair,assessVisualContinuity}=require(path.resolve(dir,'scripts/runtime.js'));
const p={schema_version:'2.0',project_id:'installed-qa-smoke',revision:1,phase:'discovery',
 gates:{script:{approved:false},visual_bible:{approved:false},storyboard:{approved:false}},
 decisions:[],continuity:[],shots:[],proposals:[],authorization:{production_go:false,provider_job_allowed:false,publication_allowed:false},
 dependency_graph:{nodes:[],edges:[]}};
const r=planSmartRepair(p,{expected_revision:1});
assert.equal(r.status,'NO_REPORTED_DEFECTS');assert.equal(r.repair_performed,false);
assert.equal(assessVisualContinuity(p).status,'INCOMPLETE');
console.log('PASS: installed QA skill executes bundled read-only runtime without repository checkout');

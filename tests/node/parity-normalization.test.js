const test=require('node:test');
const assert=require('node:assert/strict');
const {normalized}=require('./compare_python_node.js');
const wrap=(errors,scenario)=>({suite:'behavior-transcript-heuristics',model_executed:false,total:1,passed:0,failed:1,results:[{file:'bad.json',passed:false,...(scenario===undefined?{}:{scenario}),errors}]});
test('known Python and Node malformed object-key diagnostics normalize equally',()=>{
 const py=wrap(['Expecting property name enclosed in double quotes: line 1 column 2 (char 1)']);
 const node=wrap(["Expected property name or '}' in JSON at position 1 (line 1 column 2)"]);
 assert.deepEqual(normalized(py),normalized(node));
});
test('behavior validation errors are never normalized',()=>{
 const py=wrap(['Must request explicit approval'],'script_approval_gate');
 const node=wrap(['Different behavioral outcome'],'script_approval_gate');
 assert.notDeepEqual(normalized(py),normalized(node));
});
test('unrecognized parser errors remain different',()=>{
 assert.notDeepEqual(normalized(wrap(['Unexpected input A'])),normalized(wrap(['Unexpected input B'])));
});
test('parser-like errors on parsed scenarios stay strict',()=>{
 assert.notDeepEqual(normalized(wrap(['Expecting property name enclosed in double quotes'],'discovery_one_question')),normalized(wrap(["Expected property name or '}' in JSON"],'discovery_one_question')));
});

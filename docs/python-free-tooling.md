# Python-free maintainer tooling — Stage 1

This migration is **additive**. The original Python validators and both existing
CI workflows remain unchanged. This stage ports the protected-file preservation
check and the repository structure, behavioral-contract and Markdown-link check
to built-in Node.js APIs, with no npm dependencies.

## Run locally

```bash
node tests/regression/check_preservation.js
node tests/validate_repo.js
node --test tests/node/validation.test.js
```

GitHub Actions runs these in parallel with the existing Python CI checks.
The Node scripts expose functions for negative tests. The tests cover missing,
empty, duplicate and traversal paths, missing required files, broken links and
the real repository. Both validators preserve the current Python checks'
contracts; edge-case parity and remaining Python scripts need further review.

**Not migrated yet:** 9 Python regression test modules, synthetic behavior
evaluator and pre-production runner. No Python files may be deleted without
separate owner approval and complete replacement evidence. The skill runtime
remains Markdown-only; Node.js is a maintainer tool, not a runtime dependency.

## Stage 2 — semantic and static regression parity

The additional `tests/node/regression.test.js` ports the Python audio, continuity,
shot-planning, repair, director, compatibility, flagship and pre-production
regression assertions. These remain **synthetic and static checks**: they do not
execute an agent or inspect film media. Run with:

```bash
node --test tests/node/validation.test.js tests/node/regression.test.js
```

The Python behavior-evaluator tests (`test_behavior.py`) are deliberately
**not migrated yet**, because they depend on the Python evaluator; porting
both together in Stage 3 prevents misleading cross-language parity claims.
The Node pre-production tests currently check the existing Python runner's
safety contract, not a replacement Node runner. No Python files are removed.

## Stage 3 — behavior evaluator and offline pre-production runner

Node.js equivalents now implement the transcript heuristic evaluator and the
offline pre-production report runner, with built-in `node:fs`,
`node:child_process`, `node:test` and `node:assert/strict` only.

```bash
node tests/behavior/evaluate.js --json-out build/behavior-report-node.json
node tests/behavior/evaluate.js --transcripts /path/to/captures --strict
node --test tests/node/behavior.test.js tests/node/preprod.test.js
node tests/preprod/run_validation.js --out build/preprod-validation-node.json
```

The report preserves `suite`, `model_executed:false`, result counts,
per-file errors and provenance. The offline report preserves
`report_schema:preprod-validation-v1`, safety flags, checks and limitations.
The Node runner uses Node syntax checks in place of Python `compileall` and
tests the Node suite. Its report uses distinct filenames to avoid overwriting
Python CI evidence.

**Python scripts and workflows remain untouched** and run independently.
Stage 4 must compare reports and failure cases across languages before
considering any deletions. These heuristics do not prove real agent behavior.

## Stage 4 — independent parity evidence before deletion

The independent parity gate runs the Python and Node transcript evaluators on
the **same inputs**, compares normalized JSON reports and process exit codes,
and writes `build/python-node-parity.json`. It includes positive fixtures,
strict-provenance rejection, malformed JSON, missing assistant responses and
negative behavioral cases.

```bash
node tests/node/compare_python_node.js
```

Requires both Python 3.12 and Node.js 22 **for this temporary migration
verification only**. No AI model or video is executed.

**Limitations:** this gate compares transcript evaluator behavior, not all
regression assertions, pre-production runner reports or every possible input.
The Python and Node runners intentionally use different check names and report
filenames. Before any deletion, review semantic coverage and all workflow,
protected-baseline, documentation and report consumers. Existing Python
files and workflows are not removed by this stage.

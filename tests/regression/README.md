# Regression safety and negative behavior tests

## Protected-file baseline

`protected-files.json` preserves the original baseline skill files, reference
materials and transcript fixtures. Its only retired entries were
`tests/behavior/evaluate.py` and `tests/validate_repo.py`, each replaced by
its corresponding `.js` tool as part of the explicitly reviewed Python-free
cleanup. Do not regenerate the baseline automatically or delete other protected
files without separate owner approval.

`check_preservation.js` checks that each protected file exists, is nonempty
and stays within the repository boundary.

## Regression tests

`tests/node/regression.test.js`, `tests/node/behavior.test.js`,
`tests/node/validation.test.js`, and `tests/node/preprod.test.js` use
Node.js built-in `node:test` and `node:assert/strict`. They cover static
instruction contracts, sample media-plan invariants, negative behavioral
cases, and pre-production safety checks. They do **not** execute an LLM or
inspect video/audio.

## Local commands

```bash
node tests/regression/check_preservation.js
node tests/validate_repo.js
node --test tests/node/*.test.js
node tests/behavior/evaluate.js --json-out build/behavior-report.json
node tests/preprod/run_validation.js --out build/preprod-validation.json
```

## Review checklist

- [ ] PR targets `main`, merges only after explicit owner approval
- [ ] Baseline protections remain intact; retired paths are documented
- [ ] Runtime skill, adapters, templates and examples remain functional
- [ ] Negative and multi-turn behavior cases pass
- [ ] CI and report outputs are reviewed before merge
- [ ] Real-agent evidence is distinguished from synthetic checks

## Limits

Presence checks do not establish semantic quality, regex heuristics may be
imperfect, and true agent validation needs recorded real-model executions.

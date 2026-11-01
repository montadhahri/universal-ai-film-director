# Regression safety and negative behavior tests

## File-preservation contract

`protected-files.json` captures **all 41 files** that existed on `main` before this
feature branch was created. `check_preservation.py` fails if any baseline file is
missing or empty. New files are welcome. Existing files can be improved.

The baseline is intentionally not regenerated automatically. If a future PR proposes
removing a protected file, it must explain the removal and receive explicit owner approval
before the baseline is changed.

## Behavior regressions

`test_behavior.py` uses Python's built-in `unittest` to check that the existing
heuristic evaluator rejects known bad answers and accepts a few good answers. It
also checks multi-turn transcripts where the **last** assistant message determines
the result.

These tests validate the evaluator, **not a real LLM**. They do not prove full
conversation-state consistency or native agent compatibility.

## Local commands

```bash
python3 tests/regression/check_preservation.py
python3 -m unittest discover -s tests/regression -p 'test_*.py' -v
python3 tests/behavior/evaluate.py --json-out build/behavior-report.json
python3 tests/validate_repo.py
```

## Review checklist

- [ ] PR targets `main` and is not merged without owner approval
- [ ] No protected files removed or emptied
- [ ] Existing skill, adapters, templates and examples remain present
- [ ] Regression and behavior fixtures pass
- [ ] Actual agent testing is reported separately from synthetic fixtures
- [ ] CI results inspected before merge

## Known limitations

File preservation checks **existence and non-empty content**, not semantic quality.
Regex behavior checks can have false positives and false negatives.
True stateful agent testing will require controlled multi-turn real-model executions.

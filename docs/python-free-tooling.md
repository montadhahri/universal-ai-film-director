# Node.js maintainer tooling (Python-free)

The skill runtime consists of Markdown instructions and references; it needs
neither Node.js nor Python once installed into a compatible agent. Node.js 22
is required only for repository maintenance, offline validation and optional
`npx` skill installation. All repository test code uses Node.js built-in
modules; no npm test libraries are needed.

## Local quality gate

```bash
node tests/regression/check_preservation.js
node tests/validate_repo.js
node --test tests/node/*.test.js
node tests/behavior/evaluate.js --json-out build/behavior-report.json
node tests/preprod/run_validation.js --out build/preprod-validation.json
```

The tests cover structural checks, Markdown references, the protected-file
baseline, static/semantic regression cases, negative/multi-turn transcript
heuristics and offline pre-production report production. The runner never
publishes, invokes an agent or generates media. Its report explicitly marks
`production_go: false`, `agent_executed: false` and `video_generated: false`.

## Migration evidence

The previous 13 Python maintenance scripts were replaced incrementally
through review PRs #14–#17. PR #17 compared Python and JavaScript transcript
evaluator JSON results and process exit codes using positive, strict,
negative and malformed inputs. That evidence establishes **tested transcript
parity on those cases**, not universal equivalence of every possible input.
This cleanup retires the old interpreter-specific parity tool because its
Python reference no longer exists; the replacement Node.js regression and
negative tests remain.

The original protected-file baseline was edited only for the two retired
Python entries, which now reference their JavaScript replacements. All other
protected files and the original skill content remain preserved.

**Release status:** private repository; no production GO, tag or publication.

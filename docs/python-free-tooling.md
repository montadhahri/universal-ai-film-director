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

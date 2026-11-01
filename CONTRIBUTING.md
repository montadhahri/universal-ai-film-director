# Contributing

This is a **single-current-version, provider-neutral** Agent Skills repository.
Create focused branches and PRs; do not commit directly to `main`. A change
to current skill behavior should update its `SKILL.md`, relevant
`references/guide.md`, tests and [Unreleased changelog](CHANGELOG.md).
Review deletions, changed gates and provider permissions carefully.

Use Codex skill-creator as an **authoring and evaluation method**, not a
runtime dependency. Keep skill packages self-contained and concise, and test
the described trigger conditions on compatible hosts before promising
cross-agent compatibility. No account credentials in project files.

Run `node tests/validate_repo.js`, `node tests/package/validate-package.js`,
`node --test tests/node/*.test.js`, and
`node tests/preprod/run_validation.js --out build/preprod-validation.json`.

User approval is required for merging, spending, publishing or production
authorization. Git tags record previous releases; never add `v2/` or
`v3/` directories merely to preserve old implementations.

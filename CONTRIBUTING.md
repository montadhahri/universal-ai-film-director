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

## Community showcase submissions (V2.6 metadata)

The [versioned showcase metadata schema](contracts/community-showcase.schema.json) defines a **submission record**, not a gallery website or an upload workflow. This contract is repository-level and is not bundled into individual installed skills.

A contributor may propose a short showcase with a title, summary, credited creator, the actual skills used, and per-asset origin/rights evidence. Use `UNKNOWN` and `NOT_VERIFIED` when provenance or license terms are missing. **Do not invent license grants, source-media inspection, independent agent execution or owner consent.**

A record marked `READY_FOR_REVIEW` is **not** publication approval. Before a showcase can be published, a human reviewer must verify applicable rights and evidence, obtain explicit creator/owner consent, and separately authorize the platform publication. The metadata schema alone does not enforce these cross-field workflow gates and must never be interpreted as executable permission.

Do not commit personal contact details, private approval transcripts, provider credentials, or unlicensed media into public submissions. Existing case-study provenance and rights records remain historical evidence, not blanket clearance for a new showcase.


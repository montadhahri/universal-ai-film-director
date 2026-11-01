# V2-01 — Canonical project and handoff contracts

**Status:** Initial implementation PR. Folder names are intentionally **version-neutral**.

## Clean repository strategy

This repository has a single **current implementation** in its working branch.
Versions are tracked with Git commits, immutable release tags and changelog
headings, **not folders named v1/v2/v3**.

- `contracts/project-bible.schema.json`: canonical current project contract.
- `contracts/handoff.schema.json`: canonical specialist proposal contract.
- `scripts/project-contracts.js`: optional deterministic Node.js operations.
- `tests/node/contracts.test.js`: offline acceptance/negative tests.
- `docs/V2-ARCHITECTURE-RFC.md`: one-time historical RFC (the phase name
  is not a runtime package folder).

The existing v1 `schemas/project-bible.schema.json` and frozen runtime
package have not yet been replaced **in this intermediate PR**. They will
be removed, refactored or replaced in a separately reviewed migration
once new modular skills are ready, rather than maintained forever in parallel.
Historical v1.0.0 is recoverable from its Git tag.

## Current contracts

`newProject(projectId)` creates native canonical state with no user
approvals, no media, and all provider/publishing permissions false.
`validateProject` enforces approval-evidence and locked-shot invariants.
`validateProposal` ensures only a defined specialist may submit a
`PROPOSED` artifact for the current revision. `recordProposal` creates
an updated copy without granting approval or changing locked assets.

**Not implemented here:** user approval operations, scoped unlocks,
generation permission workflows, real media provenance, specialist skill
packages and full schema-validator integration. These will be proposed
in subsequent phases; testing the validator against synthetic fixtures
does not mean a real agent executed the skill.

## Validation

```bash
node --test tests/node/contracts.test.js
node --test tests/node/*.test.js
node tests/package/validate-package.js
node tests/validate_repo.js
```

Old project formats remain available from the `v1.0.0` Git tag;
automatic old-checkpoint migration is not supplied in this PR. If we
need it for previously saved projects, design a temporary import tool
rather than version-named folders.

**Safety:** Repo PRIVATE, no published v2 release, no provider credentials,
no actual video generation, no automatic merge or Production GO.

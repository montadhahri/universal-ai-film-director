# V2-01 — Project contracts and migration (first implementation)

**Status:** PR proposal; runtime skill packages are unchanged. The new
`schemas/v2/` and `scripts/v2/` files are **development-time contracts**
and not bundled into the v1.0.0 package. This is an initial safety-preserving
increment, not the complete Project Bible v2 implementation.

## Contracts

- `schemas/v2/project-bible.schema.json`: a v2 wrapper retaining v1
  approval gates, shots, decisions and continuity plus an embedded lossless
  v1 snapshot and explicit disabled side-effect authorization.
- `schemas/v2/handoff.schema.json`: proposals from specialist skills with
  origin, request ID, stage, input revision, provenance and requested
  authorization. A specialist cannot set the artifact to APPROVED.
- `scripts/v2/project-contracts.js`: Node built-in, no external packages.
  `migrateV1` copies source and produces revision 1 without inferring
  approvals or generating media. `restoreV1` returns the exact original
  v1 snapshot, **not** a reverse conversion of later v2 edits.
  `recordProposal` only stores a proposal in a *new* revision, without
  approving or modifying locked media.

## Safety and compatibility

- The frozen `v1.0.0` Git tag and existing schema remain unchanged.
- No Python dependency, no API credentials, no provider calls, no automated
  video or audio generation.
- No implicit escalation of provider job, publication or Production GO.
- All sample approvals and asset IDs in tests are **synthetic fixtures**.
- A schema alone does not guarantee all cross-field invariants. Use both the
  schema and executable validators; richer approval/evidence validation
  and native-v2 project creation are future increments.

## Test matrix

```bash
node --test tests/node/v2-contracts.test.js
node --test tests/node/*.test.js
node tests/package/validate-package.js
node tests/validate_repo.js
```

Tests cover lossless v1 restore, real evidence requirements, locked shot
references, duplicate/stale proposal detection, refusal to accept fabricated
inspection and unapproved generator permissions. These are offline contracts,
not agent execution or media quality tests.

## Next contracts (not implemented here)

Native-v2 state creation, asset/provenance manifests, explicit user approval
commands with transcript references, scoped unlock/replacement ledger,
production job authorization, binary media checksums, and schema versioned
cross-host interchange. Their tests must avoid implying real media or
approval that was never observed.

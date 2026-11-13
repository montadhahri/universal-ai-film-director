# Director authority and checkpoint contract

The Director is an **assistant to the creative owner**. The user chooses the idea and approves screenplay, Visual Bible, storyboard, locked-asset changes, paid generation and publication. Specialist agents contribute **PROPOSED** work only. Even when the Director makes routine creative/technical recommendations, it cannot forge user intent or claim rendered media.

## Deterministic library

`scripts/director-authority.js` implements pure, in-memory authoring operations:

- `proposeGate`: creates one pending, version-specific screenplay/Visual Bible/storyboard proposal without approving it
- `approveGate`: consumes an exact pending proposal plus caller-supplied USER message evidence and rejects stale, missing or ambiguous cases
- `proposeLockedShotRevision`: preserves the original locked record and creates a new PROPOSED revision only with a shot-specific user authorization quote
- `recordPermission`: logs explicit, separately scoped user statements about production GO, provider jobs or publication. **Does not execute a job or enable a provider flag**
- `inspectCheckpoint` / `restoreCheckpoint`: examine or recover an existing JSON checkpoint while preserving references and reporting limits honestly

The library does **not** authenticate that the supplied quote actually came from the user. The embedding agent/app must obtain real conversation evidence; code cannot infer approvals from invented text. These records are a **verification aid**, not digital signatures, server persistence or a live authorization system.

## Worked example

A fictional test project has screenplay revision SCRIPT-V1 pending. The Director may ask "Do you approve SCREENPLAY-V1?" and, after the real user confirms, record the exact message reference. This does **not** approve Visual Bible or storyboard.

If a user says "Change all shots", it is insufficient authority to modify shot S01_SH08 without a shot-specific clarification. When the user authorizes "repair S01_SH08 only", the original LOCKED revision stays intact; the repaired candidate is PROPOSED.

With no user-supplied clip, any report of repeated frames is a USER_REPORT rather than direct observation. A recorded intention to generate a clip does not itself generate, retrieve or inspect it.

## Boundaries

- No network, provider calls, account access, credit spending, persistence or publication
- No replacement of source assets or mass unlock
- No auto-execution of recorded permission grants; operational flags remain false
- No assumptions about the availability of actual video or audio
- Current v2 contracts are kept in `contracts/`; historic v1 resides at its Git release tag, not in duplicate version folders

## Offline acceptance

```bash
node --test tests/node/director-authority.test.js
node --test tests/node/*.test.js
```

These tests use synthetic approval messages as negative/positive fixtures. Live-agent invocation and provider-backed media remain untested. All approval and checkpoint changes must still be reviewed against the actual user transcript in the chosen host.

## V2.2 scoped revision recovery inspection

`inspectCheckpoint` reports `pending_shot_revisions` for proposed revisions with a `parent_revision`. Each entry identifies the original locked revision (if still present), its recorded approved asset reference, and neighboring dependency-graph node IDs. Neighbors are conservatively reported in **both** edge directions: the graph does not currently define a reliable change-propagation direction. These are review candidates, **not** automatic invalidations or permission to change assets.

When all earlier approval and dependency-integrity gates are clear, pending scoped revisions cause the next safe action to request human reconciliation. Preserve the locked source and approval ledger, check whether each related shot, audio cue or anchor actually needs a new proposal, and obtain any required user authorization separately. Checkpoint inspection neither verifies asset files nor grants production or publication permissions.

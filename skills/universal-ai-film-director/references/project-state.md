# Project state and shot lifecycle

Use **the JSON schema** for machine-readable
project snapshots. The existing Markdown Project Bible remains supported.

## States

- `DRAFT`: working idea, not presented for approval.
- `PROPOSED`: shown to user, awaiting explicit approval.
- `APPROVED`: user approved this exact revision.
- `LOCKED`: approved revision is protected from modifications.
- `NEEDS_FIX`: a defect is reported; original approved asset remains preserved.

Allowed transitions:
```text
DRAFT -> PROPOSED -> APPROVED -> LOCKED
PROPOSED -> DRAFT       (user requests revisions)
APPROVED -> NEEDS_FIX   (defect reported)
LOCKED -> NEEDS_FIX     (record defect, retain lock on approved source)
NEEDS_FIX -> PROPOSED   (new repair revision, original remains intact)
```
`LOCKED` never directly transitions back to `DRAFT`. To change locked content,
obtain an explicit **scope-specific unlock authorization** and create a new
revision. Keep the prior locked revision in history; it remains the fallback.
Defect reporting is not unlock permission. A new repair revision is proposed
until separately approved.

## Gate rules

Screenplay, visual bible and storyboard each have an independent explicit
approval. Do not infer gate approval from shot approval, or vice versa.
An ambiguous "yes" approves only the single unambiguous decision just asked.

## Record format

Each decision: `id`, `scope`, `status` (PROPOSED or APPROVED),
`value`, `source` (user message reference), `version`.
Each shot: stable `id`, `revision`, `state`, `approved_asset` when state is LOCKED,
`continuity_refs`, `issues`, and optional `parent_revision`.
For a gate with `approved: true`, record its non-empty exact version and
user approval evidence. The JSON schema now enforces these fields; it also
requires a non-empty approved asset reference for a LOCKED shot. Do not
invent those values merely to pass validation. If the actual artifact is
missing, keep the candidate PROPOSED and mark the asset unavailable.
A new revision must not replace the old locked record.

## Safe recovery

When resuming: read snapshot, verify internal IDs, enumerate locked shots and
missing inputs, then offer the next unfinished task. Do not claim snapshot
was automatically saved or synchronized between tools.

## Optional deterministic approval ledgers

When the host can execute local Node.js and persist its own project JSON, the repository's `scripts/director-authority.js` offers `proposeGate`, `approveGate`, `proposeLockedShotRevision`, `recordPermission`, `inspectCheckpoint` and `restoreCheckpoint`. The implementation stores distinct gate, unlock and operation-permission ledgers. It **cannot authenticate the user** or save files itself: supply actual user-message evidence; never fabricate message references. The code records permissions but never enables media generation or publication. See **docs/director-authority.md** in the repository when available. For non-Node hosts, follow the same rules with a manually maintained Project Bible.

## Stage and timeline validation

The production planning engine is described in `docs/production-pipeline.md` and implemented in optional `scripts/production-pipeline.js`. Move in order: discovery, script, visual_bible, storyboard, sound, generator. Do not skip screenplay, visual or storyboard user approval gates. The `generate`, `review` and `delivery` states are declared for future provider/media-capable workflows but **blocked in the planning-only engine**. Before entering sound, require a validated storyboard with unique shot IDs, integer millisecond boundaries, complete coverage and no unaccounted overlap. The initial validator supports cuts only; a dissolve must have an explicit timed transition model before acceptance. Provider accounts, media jobs and publication are never implied.

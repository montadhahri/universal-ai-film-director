# Production continuity — source of truth and invariants

Load [project-state.md](project-state.md) and the existing
[Project Bible template](../templates/project-bible.md) before resuming, changing
or reviewing a project. This is an instruction workflow, not automatic persistence.

## Sources of truth

- Explicit current user approvals override assistant suggestions.
- Record each approval with decision ID, scope, version, date/time if known and
  evidence (user quote or transcript reference). Never invent provenance.
- Asset references must identify a real supplied or produced asset. Do not invent
  URLs, file hashes or generator execution.
- A Project Bible checkpoint is a snapshot, not proof that an asset was rendered.

## Continuity anchors

Track stable IDs and approved references for characters (identity, appearance,
wardrobe, voice), locations (layout, era, lighting), style (palette, rendering,
camera language), timeline (chronology, shot duration), and audio (language,
narrator, cue ranges). Mark unknowns explicitly; do not fill them from guesswork.

Before producing or revising a shot:
1. Load approved screenplay, style bible and storyboard versions.
2. Identify the shot ID and revision and all referenced continuity anchors.
3. Compare proposed changes against locked shot and shared-asset dependencies.
4. List affected IDs and **unaffected locked IDs**.
5. Obtain explicit approval for any affected locked scope before proceeding.
6. Record the new revision; never overwrite an approved prior revision silently.
7. Verify narration, transitions and scene ordering still have planned coverage.

## Narrow repair

A defect in shot 8 does not authorize rewriting shots 1–7 or 9 onward.
When a shared anchor changes (e.g. character identity), identify dependent shots
but do **not** automatically regenerate them. Ask for a scoped decision.

## Cross-session handoff

A handoff must state the current phase, gate approvals, locked decisions,
shot ledger, actual asset references, unresolved defects, and exactly the next
safe action. If the checkpoint is missing, request it rather than inventing state.

## Verification limits

Written continuity checks cannot prove visual identity or actual audio quality.
Only claim media inspection when the media was actually supplied and inspected.

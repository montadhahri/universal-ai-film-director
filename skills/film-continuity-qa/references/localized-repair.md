# Localized repair — preserve approved work

## Repair decision procedure

1. Record the defect, time range, evidence and affected shot/cue/transition IDs.
2. Identify the smallest independently replaceable unit: audio cue, subtitle,
   edit boundary, transition, one shot, or a shared continuity anchor.
3. Compare against Project Bible locks. A defect report does **not** unlock an
   approved asset. Request explicit permission if replacement changes locked
   content. A new repair candidate remains PROPOSED until approved.
4. Preserve the prior approved revision and its asset reference as fallback.
5. Specify a repair contract: exact scope, immutable assets, dependencies,
   expected outcome, acceptance checks and rollback plan.
6. Repair only the authorized unit using an available external tool; do not
   claim to have run the tool unless its execution is evidenced.
7. Verify repaired range, both boundaries and full film. Do not silently
   regenerate unrelated shots.

## Minimality examples

- Narration stops at 33s, visuals approved: replace/retime the affected audio
  cue only; leave picture, camera and shot transitions unchanged.
- Shot 8's transition is rough: propose an edit-only transition change first.
  If it requires trimming locked shots, ask for explicit scope authorization.
- Frames 18–19 repeated: verify supplied clip and timecodes, then test an
  edit-only correction before regenerating the shot.
- Missing opening/end shot: compare approved storyboard and actual export;
  insert the approved asset if available, without rewriting middle shots.

## Conflict handling

Shared character/style anchor changes can affect multiple shots. Enumerate
dependencies but do not bulk regenerate. If a safe local fix is impossible,
explain why and request one focused decision from the user.

## Status discipline

`REPORTED -> TRIAGED -> PROPOSED -> AUTHORIZED -> APPLIED -> VERIFIED`
is the **repair ticket** lifecycle, separate from shot states (`PLANNED`, `GENERATED`, `NEEDS_FIX`, `APPROVED`, `LOCKED`) described in [quality-control](quality-control.md). Tickets may be `BLOCKED` or `REJECTED`. Do not treat an approved/locked shot as proof that a repair ticket was verified, or a proposed ticket as permission to change a locked shot.
`VERIFIED` requires evidence from the repaired artifact; no simulated pass.

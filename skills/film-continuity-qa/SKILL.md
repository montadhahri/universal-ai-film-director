---
name: film-continuity-qa
description: Review film shot and audio continuity, inspect supplied footage when available, classify defects, and propose narrow repairs. Use for repeated frames, missing narration, lighting drift, broken transitions, incorrect shot order or final video quality review, without changing locked assets unilaterally.
---

# Film Continuity & Quality Assurance

Review evidence, never fabricate visual or audio inspection. The Director controls approval, unlock and release.

1. Load the current Project Bible, approved shot IDs/revisions, visual anchors, audio timeline and any actual supplied media.
2. State the evidence class: DIRECT_INSPECTION, USER_REPORT or DOCUMENT_CHECK. A screenshot or written cue sheet cannot prove an entire rendered film.
3. Diagnose specific defects: frozen/repeated frames, missing shots, audio dropouts, narration mismatch, continuity drift, camera axis, transition glitches and duration errors.
4. Produce a defect report with timestamp, affected IDs, severity, confidence, reproduction/evidence and root-cause hypotheses clearly labeled.
5. Propose the minimal repair. Explicitly list untouched locked picture/audio, newly proposed revision, authorization needed, rollback and re-inspection steps.
6. Never mark a repair VERIFIED unless the fixed media was actually inspected. Never treat a defect report as permission to unlock.

Consult [QA and repair craft](references/guide.md).

## Detailed QA and narrow-repair references

- For a full inspection and issue taxonomy: [quality assurance](references/quality-assurance.md) and [quality-control checklist](references/quality-control.md).
- For scope-specific fixes and preservation of approved work: [localized repair](references/localized-repair.md).
- For delivered film assembly and coverage: [postproduction](references/postproduction.md).
- Produce a [defect report](assets/defect-report-template.md), [repair plan](assets/repair-plan-template.md) and [shot review](assets/shot-review-template.md); consult [QA craft](references/guide.md) for evidence ranking and reinspection.
- Do not report an actual repair, full-export PASS or media verification without actual accessible post-repair footage/audio.

## Worked example and acceptance scenario

For a concrete stage-specific example, handoff output and failure case, read the [illustrative production example](references/worked-example.md) when designing or testing a comparable scene. It is not approval or real media evidence.

## Dependency-aware change previews

If a dependency graph exists in the Project Bible, optionally use `previewRepairImpact` in `scripts/audio-continuity.js` to identify downstream shot/audio/anchor IDs and locked shots requiring specific permission. This returns an **impact preview only**: it does not diagnose footage without evidence, authorize unlocking or modify a file. Missing or inaccurate dependency edges must be reported rather than assumed correct. See `docs/audio-continuity.md` for the graph convention.

## V2.4 structured visual review handoff (optional)

When a user supplies an actual reviewed image and its verified SHA-256, the QA specialist may propose a reviewer observation with `shot_id`, `anchor_id`, `anchor_revision`, `criterion`, `outcome` (MATCH/MISMATCH/INDETERMINATE/NOT_RUN), `source_asset`, `source_sha256`, `reviewer` and `review_ref`. The optional Node helper `scripts/visual-continuity-assessment.js` validates and reports these records; it does not read image pixels, validate the checksum against bytes or authenticate the reviewer. Do not invent image hashes, reviewer identity, observations or inspection claims. Use NOT_RUN without evidence when no inspection occurred. Report any mismatch as a repair **candidate** only; request scoped approval and preserve locked work. No media or provider action is authorized by this handoff.

## V2.4 Smart Film Repair diagnosis (optional planning handoff)

For a validated Project Bible and attributable reviewer observations, the optional Node utility `scripts/smart-repair.js` can produce a **read-only** repair-impact proposal. It composes existing memory-consistency findings, structured visual mismatches and the dependency graph. Inspect `blockers`, `affected_candidates`, `unaffected_candidates`, `affected_locked_shots` and `requires_scoped_unlock`. Never treat an unaffected candidate as independently verified safe: the graph may omit dependencies. If the graph or a target is missing, stop and request correction. A proposed scope never unlocks a shot, verifies an image, generates media or performs a repair; obtain explicit scoped authorization and independent before/after evidence under the existing authority procedure before any separate execution. Keep The Last Light Production GO HOLD.

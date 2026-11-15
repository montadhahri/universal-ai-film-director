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

If a dependency graph exists in the Project Bible, optionally use `previewRepairImpact` from the installed `scripts/runtime.js` to identify downstream shot/audio/anchor IDs and locked shots requiring specific permission. This returns an **impact preview only**: it does not diagnose footage without evidence, authorize unlocking or modify a file. Missing or inaccurate dependency edges must be reported rather than assumed correct. See `docs/audio-continuity.md` for the graph convention.

## V2.4 structured visual review handoff (optional)

When a user supplies an actual reviewed image and its verified SHA-256, the QA specialist may propose a reviewer observation with `shot_id`, `anchor_id`, `anchor_revision`, `criterion`, `outcome` (MATCH/MISMATCH/INDETERMINATE/NOT_RUN), `source_asset`, `source_sha256`, `reviewer` and `review_ref`. The optional installed `scripts/runtime.js` visual-continuity helper validates and reports these records; it does not read image pixels, validate the checksum against bytes or authenticate the reviewer. Do not invent image hashes, reviewer identity, observations or inspection claims. Use NOT_RUN without evidence when no inspection occurred. Report any mismatch as a repair **candidate** only; request scoped approval and preserve locked work. No media or provider action is authorized by this handoff.

## V2.4 Smart Film Repair diagnosis (optional planning handoff)

For a validated Project Bible and attributable reviewer observations, the optional installed `scripts/runtime.js` Smart Repair helper can produce a **read-only** repair-impact proposal. It composes existing memory-consistency findings, structured visual mismatches and the dependency graph. Inspect `blockers`, `affected_candidates`, `unaffected_candidates`, `affected_locked_shots` and `requires_scoped_unlock`. Never treat an unaffected candidate as independently verified safe: the graph may omit dependencies. If the graph or a target is missing, stop and request correction. A proposed scope never unlocks a shot, verifies an image, generates media or performs a repair; obtain explicit scoped authorization and independent before/after evidence under the existing authority procedure before any separate execution. Keep The Last Light Production GO HOLD.

## Optional installed Node.js runtime

This skill includes the canonical installed entry point `scripts/runtime.js` **inside its installed skill directory**, generated from the repository's canonical JavaScript helpers. If the agent has filesystem access and Node.js execution permission, it may load the file relative to this SKILL.md using `require('./scripts/runtime.js')` from that directory and invoke only relevant exported validators or read-only planning helpers. Do not assume a full repository checkout, another specialist's installation, or automatic execution. If execution is unavailable, follow the portable Markdown workflow and report executable validation as NOT_RUN. These helpers do not inspect pixels, authenticate user approvals, generate media, authorize spending, unlock shots or publish films. Preserve explicit user approval and evidence boundaries.

## V2.4 Phase 4B — scoped repair review

Use `prepareScopedRepair(project, {expected_revision, observations, shot_id, source_revision, new_revision, reason, authorization_ref, evidence})` only after an actionable diagnosis and a real user statement that explicitly identifies the locked shot. This helper delegates to the existing Director authority contract: it preserves the locked source and adds a separate PROPOSED revision. It does **not** authenticate the speaker, change pixels, execute a repair, or approve a revision. After an independently performed repair, `reviewRepairEvidence(project, {shot_id, source_revision, new_revision, before, after, reviewer, review_ref, outcome})` records a **reviewer-reported** comparison using asset references and SHA-256 claims; it does not inspect or hash bytes. A reported MATCH is not automatic acceptance. Do not invent authorization or before/after evidence. Require independent inspection and separate acceptance before progressing; Production GO remains HOLD.

## Optional local/manual repair handoff (V2.4 Phase 4C)

After scoped authorization and a PROPOSED revision, use `prepareRepairHandoff` from the installed `scripts/runtime.js` to produce a copy-only, provider-neutral contract with immutable source, expected result, explicit checks and rollback. After a separately authorized manual/local repair, `inspectRepairHandoffEvidence` records reviewer-reported outcomes; it does not inspect media bytes or accept the revision. Missing checks remain NOT_RUN. Never execute providers, overwrite locked assets or declare independent visual verification from these helpers. See [localized repair](references/localized-repair.md).

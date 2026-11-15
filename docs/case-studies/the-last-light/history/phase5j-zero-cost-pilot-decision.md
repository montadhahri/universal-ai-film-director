# Phase 5J — Zero-cost SH04 pilot execution decision

**Baseline:** main `c9bc5aa272e9c9880b513de97aeaef9a2033dd41`  
**Status:** PROPOSED — execution not authorized  
**Production GO:** HOLD

## Decision: stop adding planning gates after this preflight

Phase 5I already specifies R0–R4, the exact temporal invariant `t(R2) < t(R3)`, evidence capture and review. Phase 5J exists only to select a **feasible zero-cost evidence method** and identify the minimum approvals. A completed document or static sequence is **not** a successful generative-video test.

## Candidate methods (none executed)

| Method | Cash/credit exposure | What it can demonstrate | What it cannot establish | Decision |
| --- | --- | --- | --- | --- |
| A — Existing SH04 image + manual keyframe animation (local editor) | Potentially €0 if suitable software already available | Can produce real, timecoded hand separation, spark retention and post-release lighting **in an authored animation** | Does not validate AI video generation, seven-skill orchestration or original AI motion | **RECOMMENDED for zero-cost causal proof-of-concept**, conditional on tools/assets |
| B — User-supplied preexisting video/frames | €0 incremental | Can independently inspect actual existing transition evidence | Cannot establish generation provenance if missing; may not depict R0–R4 | **USE if suitable original footage exists** |
| C — Local open-source image-to-video model | No provider credits, but compute/storage/electricity costs; hardware dependent | Could test AI-generated motion if hardware/model supports it | Cannot promise free, feasible or good-quality results without environment check | **DEFER pending hardware/tool verification** |
| D — Paid provider video generation | Nonzero potential spend | Could test provider-specific AI motion | Not budget-compatible without separate authorization | **NOT AUTHORIZED** |
| E — Five static PNGs or composite crops | Existing files only | Visual references and endpoint plausibility | **Cannot** prove hand-release chronology or motion continuity | **NOT ACCEPTABLE as motion PASS** |

## Proposed zero-cost manual pilot (method A)

This is a **practical evidence experiment**, not a replacement for a future AI-generation test.

1. Verify a locally available editor with timeline, masking/layer animation and video export; no software installation or purchases without user consent.
2. Use the existing SH04 PNG as a **visual reference**. Check whether separable hand, spark, cradle and glow layers actually exist. If not, authoring those layers is a new creative operation and requires explicit approval; do not claim that a flat PNG already contains editable layers.
3. Prepare an R0–R4 storyboard with timestamps; keep duration within the narrative SH04 20–26 s window only if it is feasible and separately confirmed.
4. Animate hand–spark separation, retained spark and subsequent lantern glow as distinct events. Faint background practicals are allowed under approved TLL-P5G-LIGHT-001.
5. Export an original video file; preserve project file, source image, exact edits, export settings and SHA-256.
6. Independently inspect ordered frames and report PASS/FAIL/INDETERMINATE for **authored animation causality** only.
7. Do not use an authored animation PASS to claim provider generation, full seven-skill E2E or production GO.

## Minimal decisions before execution

- **Creative:** explicitly approve R0–R4 and the stable lantern close-up for this **isolated SH04 pilot**. Full eastward geography remains separately PROPOSED; it is not needed to test the isolated close-up's release timing.
- **Media creation:** explicitly authorize making one manual local animation and any layer edits; define whether source PNG may be edited or must remain untouched.
- **Tool feasibility:** identify an available local editor or an existing video source; no assumption about installed tools, GPU or accounts.
- **Budget:** cap external provider spend at **€0**; do not use paid services, credits or trials without explicit permission.

## Success criteria

**PASS for manual causal demonstration** requires a preserved video with independently distinguishable R2 and R3 frames, `t(R2) < t(R3)`, one spark retained in cradle, and no major pre-release illumination. Failure to separate frames yields INDETERMINATE. If no tool or editable assets are available, report BLOCKED rather than fabricate a result.

**AI motion generation:** NOT_RUN. **Seven-skill E2E:** NOT_VERIFIED. **Production GO:** HOLD.

## Immediate next action

Ask the filmmaker to choose **A: authorize one zero-cost manual animation pilot** or **B: supply existing motion evidence**. If neither is available, stop rather than producing additional paper-only phases. A geography approval may be requested later for cross-shot continuity, but it must not be inferred from merging this document.

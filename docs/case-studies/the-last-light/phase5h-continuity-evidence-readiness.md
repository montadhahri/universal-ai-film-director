# Phase 5H — Continuity evidence readiness and controlled-test protocol

**Baseline:** `main` commit `5ea8fa48be8fbd6e2f9aa912492abc83760ba934` (2026-11-02)  
**Status:** PROPOSED — READINESS ASSESSMENT, NOT EXECUTION  
**Production GO:** **HOLD** · No media generated or providers invoked.

## Evidence inspected

- [Five correctly mapped standalone keyframes](README.md) and [blob provenance](provenance.json).
- [Phase 5F independent visual audit](phase5f-independent-visual-audit.md), which records **historical pre-remapping filenames**.
- [Phase 5G continuity gates](phase5g-narrative-physical-continuity.md).
- [Approved lighting rule](phase5g-lighting-approval.md): faint practicals before release allowed; **major amber activation only after release**.
- [Proposed geography/camera contract](phase5g-geography-camera-proposal.md) and [proposed SH04 state packet](phase5g-sh04-release-state-packet.md). These proposals were merged as documentation, **not explicitly approved as creative geometry or executed tests**.

No independent motion frames, footage, original provider job logs, measured camera parameters, approved geographic plan or complete seven-skill execution trace were verified.

## Readiness inventory

| Requirement | Evidence in repository | Status | Needed before meaningful motion-continuity PASS |
| --- | --- | --- | --- |
| Five still keyframes mapped to SH01–SH05 | Corrected image paths and Git blob IDs | **PASS — static asset inventory** | Preserve exact source hashes in execution pack |
| Approved lighting causality | Filmmaker's explicit rule | **PASS — narrative rule only** | Timecoded release and first major illumination |
| Character/wardrobe visual anchors | Qualitative Phase 5F comparison | **PARTIAL** | Locked visual reference sheet and shot-level comparisons |
| Single spark throughout | Static visual observations | **PARTIAL** | Continuous possession and release evidence |
| SH02 pickup | No verified independent A/B or footage | **BLOCKED** | Before/after and continuous contact frames |
| SH04 release before activation | Proposed R0–R4 states only | **BLOCKED** | Visible separation, first amber onset after separation, retention |
| Town layout and eastward route | Proposed text convention only | **NOT_APPROVED / BLOCKED** | Filmmaker-approved map, landmarks and camera axis |
| SH01/SH05 geometry | Qualitative similarity | **PARTIAL** | Annotated matching landmarks and crop/camera tolerance |
| SH04 tower/lantern location | Close-up with insufficient spatial anchor | **BLOCKED** | Establishing or connecting spatial evidence |
| Boundary images | Four historical crops from one composite, not in repo | **MISSING** | Independently attributable source files with hashes |
| Reproducible provider/skills trace | No complete trace verified | **NOT_VERIFIED** | Versioned inputs, prompts, parameters, authorization, outputs, review |
| Phase 6 authorization | Not given | **HOLD** | Separate explicit permission before any provider job |

## Test protocol — planning only

### T1 — Static reference freeze

1. Record each keyframe's path, Git blob SHA-1 and (if raw bytes available) SHA-256. Do not substitute a Git blob hash for a SHA-256.
2. Freeze CHILD-01 identity/wardrobe, SPARK-01 geometry and color, lantern, tower, arch and nighttime palette as *proposed reference anchors* pending filmmaker confirmation.
3. Attach source and approval metadata. A standalone image approval as a **creative reference** is not approval of physical continuity.

### T2 — Geography and camera contract

1. Review the [proposed map and axis](phase5g-geography-camera-proposal.md) with filmmaker. Do not assume the south-side camera and +X=east convention are already approved.
2. On approval, prepare a top-down reference sheet with north/east, start, arch, street, tower and lantern; record source and revision.
3. Compare SH01/SH03/SH05 landmark positions and the SH03 travel direction; flag any screen-axis inversion.
4. Inspect an establishing-to-close-up link for SH04; if absent, mark the tower-lantern identity UNKNOWN rather than inventing it.

### T3 — SH02 pickup verification

| Step | Required observation | Reject if |
| --- | --- | --- |
| P0 | One amber spark at discovery position, hand not holding it | Duplicate or already-held spark |
| P1 | Hand approaches same spark | Teleportation or shape/position discontinuity |
| P2 | Fingers visibly contact and lift spark | Spark appears in hand without transfer |
| P3 | Child carries same spark away | Spark remains on ground, duplicates or changes identity |

**Minimum meaningful evidence:** actual ordered, independently attributable frames with timecodes, plus uninterrupted footage if testing motion. Still images alone can establish only limited endpoints.

### T4 — SH04 release and lighting verification

| Step | Required observation | Reject if |
| --- | --- | --- |
| R0 | Child holds one spark; no town-wide amber activation | Full activation already visible |
| R1 | Spark enters cradle while fingers maintain contact | Spark changes identity |
| R2 | Clear hand/spark separation, spark stays in cradle | Continued grip or duplicate |
| R3 | First **major** amber activation occurs strictly after R2 | Major activation at/before R2 |
| R4 | Hand withdraws; spark remains in lantern | Spark disappears or returns to hand |

**Strict ordering:** `t(R2) < t(R3)`. If the first illuminated frame and separation frame are indistinguishable at available resolution, mark **INDETERMINATE**, not PASS. Faint practicals before R2 are allowed under the approved rule.

### T5 — Cross-shot physical/camera QA

- Compare CHILD-01 facial silhouette, hair, wardrobe layers, shoulder-bag strap and side across SH02–SH04.
- Compare spark uniqueness, apparent size/color, custody and hand orientation.
- Compare lantern geometry, tower identity, street landmarks and night-sky lighting.
- Log each criterion as **PASS / FAIL / INDETERMINATE / BLOCKED / NOT_RUN**, with shot/frame, timestamp, image path and hash.
- Never infer time, motion or camera parameters from filenames or embedded captions alone.

## Evidence capture contract for any future authorized run

| Field | Required |
| --- | --- |
| Scenario and skill versions | Commit SHA, exact Director/specialist instructions and references |
| Creative approvals | Explicit approver, scope, timestamp, decision IDs |
| Source assets | Original filenames, SHA-256, Git blob SHA-1 when applicable |
| Generation context | Tool/provider/model version, seed if available, parameters, prompt, negative constraints |
| Authorization | Explicit permission for specific operation, provider and credit spend |
| Outputs | Original files, hashes, frame rate/duration if video, timestamps |
| Inspection | Independent reviewer, timecoded defect observations, comparisons and verdict |
| Change control | Separate proposals and approvals for revisions to protected images |

## Decision

**Phase 5H: NOT READY for a defensible end-to-end motion continuity PASS.** The image inventory and approved lighting narrative rule are sufficient for planning, but not for demonstrating motion, geography or release causality. A small **authorized** pilot could be considered only after explicit provider permission, a spatial decision and preservation of the above evidence; this report does not itself authorize that pilot.

### Next decision points

1. **Creative approval requested (not assumed):** approve/revise the world-space and camera-axis proposal.
2. **Test-specification approval requested (not assumed):** approve/revise P0–P3 pickup and R0–R4 release checkpoints.
3. Identify how genuine motion-boundary evidence will be acquired and archived; do not treat composite crops as independent.
4. Once ready, request separate explicit authorization for any Phase 6 provider execution or credit spend.

**G2B/G2C remain BLOCKED; seven-skill end-to-end generation remains NOT_VERIFIED; Phase 6 NOT_RUN; Production GO HOLD.**

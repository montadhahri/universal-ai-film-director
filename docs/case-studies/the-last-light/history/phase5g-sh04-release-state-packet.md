# Phase 5G — SH04 spark-release and activation verification packet

**Status:** PROPOSED test specification — NOT EXECUTED  
**Narrative rule:** Filmmaker approved faint practicals before release; **major amber activation only after release**  
**Production GO:** HOLD

## State machine

| State | Required physical evidence | Forbidden outcome |
| --- | --- | --- |
| R0 — Approach | CHILD-01 holds exactly one SPARK-01; lantern cradle visible, town not broadly illuminated | Duplicate spark or fully activated town |
| R1 — Contact | Spark touches/enters cradle while fingers still hold it | Illumination attributed to release before hand separation |
| R2 — Release | Fingers open; clear gap between hand and SPARK-01; spark remains in cradle | Spark floating away, duplicated or still gripped |
| R3 — Activation | **After R2**, amber light begins at lantern and propagates outward | Major amber lighting begins at R0/R1 |
| R4 — Retention | Hand withdraws; one spark remains inside lantern | Spark returns to hand, exits lantern or disappears |

**Temporal invariant:** `time(R2 hand/object separation) < time(R3 major amber activation)`. Exact frame durations are **not specified or approved**.

## Proposed two-boundary inspection

- **SH04-A (before release):** close-up with hand still gripping SPARK-01 above/in the cradle; ambient/faint practicals only; no large-scale amber activation.
- **SH04-B (after release):** visibly separated hand, SPARK-01 stable in cradle; lantern's major amber activation begins, town-wide propagation follows.
- Compare spark shape/color/scale, hand orientation, lantern geometry, camera side, and lighting direction between A/B.
- Require source-file identity, separate provenance for every candidate, SHA-256 hashes, provider parameters (if applicable), and reviewer notes.
- Existing SH04-A/B **crops from one composite** are not independent generation evidence and are not present in the GitHub keyframe folder. They cannot prove motion continuity.

## QA acceptance matrix

| Check | Evidence needed | Current status |
| --- | --- | --- |
| Exactly one spark | Both boundary frames and continuous motion | NOT_VERIFIED |
| Contact → release | Visible finger/object separation in actual sequence | BLOCKED |
| Release → activation order | Timecoded frames showing first major amber change after release | BLOCKED |
| Stable lantern/cradle | Aligned boundaries and camera reference | NOT_VERIFIED |
| Spark stays in lantern | Post-release retained state | BLOCKED |
| No sunrise | End frame and motion sequence | Static qualitative PASS; motion NOT_RUN |
| G2B/G2C | Independent physical/camera evidence | BLOCKED |

## Safe next step

Seek filmmaker approval of the **test specification only**; then acquire real, independently sourced transition evidence under a separately authorized execution plan. Do not generate media or start provider jobs based on this document alone. Production GO: HOLD.

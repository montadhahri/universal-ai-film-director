# Phase 5G — Narrative and physical continuity gates

**Status:** LIGHTING RULE APPROVED BY FILMMAKER; GEOGRAPHY AND RELEASE PACKETS PROPOSED / REVIEW REQUIRED  
**Baseline:** `main` `e8f96dc9c5554a3a5b9f5cef9f67a8badc9714ce` (2026-11-02)  
**Production GO:** **HOLD**

## Purpose and evidence boundaries

Assess the three unresolved continuity risks from the [Phase 5F audit](phase5f-independent-visual-audit.md) **after** the five PNGs were reassigned to their correct SH01–SH05 filenames in merged PR #70. This is a **documentary follow-up** to the earlier visual inspection, not a new independent motion or physical-geometry test. Evidence: the five image candidates, the corrected [case-study gallery](README.md), [provenance](provenance.json), and recorded Phase 5F observations. No video, motion boundaries, camera model, approved geography diagram, generator logs or original shot-level approval ledger was independently established here.

**Source of truth:** Current filenames refer to intended shots. The historical Phase 5F report deliberately describes the *old* filenames and remains unchanged for audit provenance; do not use its old filename links as current shot labels.

## Gate G5G-L — Lighting before lantern activation

**Observed (from Phase 5F):** SH01 is predominantly dark blue/unlit; SH02 and SH03 depict some illuminated street or tower practicals; SH05 has substantially warmer town-wide illumination. The night sky remains dark and no sunrise is visible.

**Filmmaker decision (2026-11-02, explicitly supplied in conversation):** “I approve faint street lights before activation, with major amber illumination only after the spark is released.” This approves the **narrative lighting rule**, not the physical correctness of the five images, any shot repair, or production execution.

| Check | Required evidence | Current decision |
| --- | --- | --- |
| Define pre-activation lighting rule | Explicit approved Visual Bible rule: A fully unlit or B limited practicals | **APPROVED — faint practicals allowed** |
| SH01/SH02/SH03 lamp consistency | Per-shot lamp inventory and intensity/color comparison against rule | **PARTIAL — visible lights observed** |
| SH04 activation onset | Separate pre-release and post-release visual states | **BLOCKED — no independent motion evidence** |
| SH05 final state | Warm town illumination with blue night sky | **QUALITATIVE PASS** |

**Approved interpretation:** Before release, faint street lights are permitted while the town remains mostly dark. Major amber illumination starts **only after** SPARK-01 is released into the lantern. The previously established no-sunrise constraint remains unchanged. This is a creative rule approval, not a finding that the images or timing pass. Bright pre-release amber tower/town activation would still violate the rule.

## Gate G5G-S — SPARK-01 custody, release and causality

**Observed (from Phase 5F):** A prominent amber light is near the child's hands in SH02/SH03 and positioned at the lantern cradle in SH04. The SH04 still has a hand near the glowing object and cannot prove it has been released; the cradle is already visibly bright. SH05 shows the illuminated town. Still frames cannot prove continuous possession or the exact trigger.

| Proposed state | Narrative invariant | Evidence status |
| --- | --- | --- |
| S0: discovered | Exactly one SPARK-01 visible; no duplicate in street | **PARTIAL — static only** |
| S1: picked up | Spark moves from street to CHILD-01's hands | **NOT_VERIFIED — transition missing** |
| S2: carried | Same single spark stays with CHILD-01 en route | **PARTIAL — static only** |
| S3: placed | Spark reaches lantern cradle while hand remains in contact | **PARTIAL — SH04 visual** |
| S4: released | Visible hand/object separation, spark stays in cradle | **BLOCKED — boundary not independently evidenced** |
| S5: activated | Lantern/town light propagates only after S4 | **BLOCKED — causal ordering unproven** |
| S6: retained | SPARK-01 remains in lantern after CHILD-01 withdraws | **BLOCKED — no close-up final custody proof** |

**Proposed acceptance criteria for a later authorized motion test:** (1) no second spark; (2) explicit hand-object separation; (3) spark remains in cradle; (4) illumination begins **after** release; (5) spark does not jump back to child's hand or escape; (6) no sunrise. A still image showing a hand near the spark does not pass S4.

**Corrective packet, planning only:** Define two shot-boundary states for SH04: **A** = hand holds spark immediately above cradle, town not yet activated; **B** = fingers open and withdraw, spark resting inside cradle, activation just begins. The earlier SH04-A/B crops from a composite are **not** independent generated boundaries and are not in the repository. Do not treat this packet as permission to generate.

## Gate G5G-G — Geography, camera axis and eastward movement

**Observed (from Phase 5F):** SH01 and SH05 show a recognizable arch, roofline, street and tower under similar nighttime framing. SH03 depicts the child heading screen-right toward a distant tower. SH04 is a lantern close-up, without enough context to establish its precise location. No canonical world-space map or camera metadata was independently verified.

| Invariant | Proposed method | Current decision |
| --- | --- | --- |
| Same town, arch, roofline, tower | Annotated landmark correspondences in SH01/SH03/SH05 | **QUALITATIVE PASS / exact geometry UNKNOWN** |
| Tower lies east of starting point | Approved top-down map with cardinal directions | **NOT_VERIFIED** |
| Screen-right movement corresponds to east | Approved camera axis and shot orientation | **NOT_VERIFIED** |
| Child reaches lantern within tower | Wide-to-close spatial anchor / entry path | **NOT_VERIFIED** |
| SH01 → SH05 framing | Overlay horizon/arch/tower positions with camera lens/crop tolerance | **NOT_VERIFIED — qualitative similarity only** |

**Proposed spatial contract (requires approval):** Define a single fixed landmark order, world north/east arrows, child starting position, eastward street route, tower entrance, lantern level and one camera-axis diagram. Use that reference to evaluate future shots; do not infer compass east from screen-right alone.

## Decision and release gates

| Gate | Decision | Unblocker |
| --- | --- | --- |
| G5G-L | **RULE APPROVED; IMAGE CONFORMANCE PARTIAL** | Compare pre-activation lamps and SH04 activation timing to approved rule; motion evidence still absent |
| G5G-S | **BLOCKED** | Independent SH04 release/activation boundary evidence |
| G5G-G | **BLOCKED** | Approved map and camera-axis reference |
| G2B / G2C | **BLOCKED** | Physical custody and camera continuity evidence |
| Seven-skill image generation E2E | **NOT_VERIFIED** | Preserved execution trace with skill inputs, approvals, prompts, provider parameters, outputs and hashes |
| Phase 6 video | **NOT_AUTHORIZED / NOT_RUN** | Separate authorization, tools and provider capability verification |
| Production GO | **HOLD** | Formal production approval not granted |

### Next safe sequence

1. **DONE (creative rule only):** Filmmaker approved faint pre-activation street lights, with major amber illumination only after spark release. Preserve the decision in this case-study ledger; reconcile into any canonical Project Bible only after verifying its location and format.
2. Propose a simple annotated world map and camera-axis sheet for explicit review (not yet an approved reference).
3. Specify SH04 A/B contact/release/activation boundaries and review existing candidate evidence; do not call crops independent generations.
4. If any image correction is needed, obtain explicit creative approval for its exact scope before changing protected assets.
5. Reassess G2B/G2C after *real* transition evidence exists. Only then consider a separately authorized Phase 6 video experiment.

**No images or videos generated. No provider jobs, credit use, merge, or production authorization. All new decisions remain PROPOSED. Production GO remains HOLD.**

## Phase 5G follow-up packets

The [lighting approval ledger](phase5g-lighting-approval.md), [proposed geography/camera contract](phase5g-geography-camera-proposal.md), and [SH04 release-state verification packet](phase5g-sh04-release-state-packet.md) capture the next evidence and review requirements. None of these planning artifacts authorizes generation.

# Phase 5I — SH04 controlled continuity pilot preflight

**Status:** PROPOSED / PRE-EXECUTION ONLY  
**Source baseline:** `main` `f63ee5151093a092bd364bfcae703d91b24800c9`  
**Production GO:** **HOLD**

## Objective

Prepare a **single-shot SH04** pilot to test whether SPARK-01 physically separates from CHILD-01's hand, remains in TOWER-01's lantern, and **major amber illumination begins strictly after release**. This is a preflight specification; no media generation, provider invocation, credit spending, or motion evaluation has occurred.

## Verified input and decision scope

- [Phase 5H](phase5h-continuity-evidence-readiness.md) inventories the static images and missing motion evidence.
- [Lighting decision TLL-P5G-LIGHT-001](phase5g-lighting-approval.md) is explicitly approved: faint street lights are allowed before release; major amber illumination starts only afterward.
- [SH04 R0–R4](phase5g-sh04-release-state-packet.md) and [geography/camera contract](phase5g-geography-camera-proposal.md) exist as **proposals**, not independently approved geometry or proven motion.
- The SH04 still is a creative reference candidate; it does not demonstrate release or the activation timing.
- Historical SH04-A/B crops from one composite are **not** independent frames and are not valid proof of a temporal transition.

## Narrow pilot scope

**Included:** one lantern close-up transition, SPARK-01 physical custody, hand separation, light causality, lantern continuity, evidence capture and reviewer adjudication.

**Excluded:** five-shot film, soundtrack, narration, SH02 pickup execution, town-wide camera reconstruction, final production approval, full seven-skill end-to-end PASS.

## Proposed execution packet (requires separate authorization)

| Item | Preflight instruction |
| --- | --- |
| Source | Current `images/keyframes/SH04.png`, plus any filmmaker-approved character, spark and lantern references |
| Shot duration | Use approved SH04 narrative window 20–26 seconds as **story timing only**; pilot clip duration must be specified separately by the filmmaker/provider constraints |
| Initial state | One SPARK-01 held by CHILD-01 just above/in the lantern cradle; faint practicals permitted; no major amber activation |
| Required transition | Hand lowers spark; contact; fingers release with visible separation; spark stays in cradle; only then major amber activation |
| Final state | Child's hand withdrawn; one spark remains inside lantern; warm illumination expands; blue night persists |
| Camera | Stable lantern close-up; orientation and axis remain PROPOSED until explicitly approved |
| Forbidden | Duplicate/teleporting spark, pre-release major activation, spark disappearance, hand deformation, geometry jumps, sunrise |
| Provider | **UNSELECTED** |
| Credits/budget | **UNAUTHORIZED** |
| Generation prompt | **PROPOSED only**; must be tailored to actual provider and approved references before execution |

### Provider-neutral proposed direction

> Close-up in a stylized blue-night town tower. CHILD-01 carefully lowers the single amber SPARK-01 into a fixed lantern cradle. The child's fingers visibly open and move away; the spark stays in the cradle. Only after the hand is visibly separated does the lantern's major amber glow ignite and begin spreading. Faint background practical lights may exist beforehand. Keep the spark's shape and identity, lantern geometry, hand anatomy, camera side and nighttime sky consistent. No duplicate spark, no premature activation, no sunrise.

This text is **not** a provider-ready authorized job payload.

## Temporal evidence requirements

| State | Observable frame condition | Gate |
| --- | --- | --- |
| R0 | One spark in hand; lantern not broadly activated | REQUIRED |
| R1 | Hand still contacts spark in/over cradle | REQUIRED |
| R2 | Clear hand–spark gap; spark remains in cradle | REQUIRED |
| R3 | First major amber activation; timestamp strictly later than R2 | REQUIRED |
| R4 | Hand withdraws; spark remains, glow persists | REQUIRED |

**Timing invariant:** `t(R2) < t(R3)`. If onset and separation cannot be resolved independently, verdict is **INDETERMINATE**, not PASS.

## Evidence bundle contract

For any **future separately authorized** pilot, retain:

1. Preflight source commit and asset hashes (SHA-256 of raw file bytes; Git blob SHA-1 separately).
2. Explicit creative approvals for geography/camera and pilot specification, plus authorization naming provider, model, operation and maximum spend.
3. Exact provider prompt, negative constraints, model/version, parameters, seed when available, timestamps and job identifier.
4. Unmodified original output and SHA-256; video duration, frame rate and extracted inspection-frame timecodes.
5. R0–R4 frame references, first release timestamp, first major amber onset timestamp and independent review notes.
6. A criterion-by-criterion PASS/FAIL/INDETERMINATE/BLOCKED verdict, including any adverse evidence.

Do not use filename labels, a single still, composite crops or a provider completion signal as proof of motion continuity.

## Go/no-go preflight

| Condition | Current status |
| --- | --- |
| Correct SH04 source mapping | **READY — static reference only** |
| Lighting rule | **APPROVED** |
| R0–R4 specification | **DOCUMENTED / creative approval not separately established** |
| Camera axis and tower geography | **PROPOSED / NOT APPROVED** |
| Real transition footage | **MISSING** |
| Provider and credit authorization | **NOT GIVEN** |
| Independent evaluator and evidence archive | **SPECIFIED / NOT EXECUTED** |
| **Pilot execution GO** | **HOLD** |
| **Production GO** | **HOLD** |

## Next decisions requested

1. Approve or revise the proposed SH04 R0–R4 physical-state specification and fixed close-up camera convention.
2. Approve or revise the proposed geography/camera axis separately; it is not needed to invent a world map just to draft this packet.
3. Select a provider and explicitly authorize a bounded pilot operation and credit ceiling **only if/when ready to execute**.
4. Run one authorized pilot, archive original evidence, then independently adjudicate. Do not expand to all five shots before SH04 causality is understood.

**No generated media, provider jobs, spent credits, asset edits, or production authorization. Production GO remains HOLD.**

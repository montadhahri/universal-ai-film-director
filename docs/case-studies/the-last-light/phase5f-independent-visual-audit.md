# Phase 5F — Independent five-keyframe visual and narrative audit

**Status:** REVIEW REQUIRED · **Production GO: HOLD**  
**Audit baseline:** `main` commit `f4f8e69472f96924883f88f453bf9abc9ba5a729` (2026-11-02)  
**Scope:** five actual repository PNG blobs under `docs/case-studies/the-last-light/images/keyframes/`, source case-study README, provenance manifest and visual QA. No video, audio, boundary candidate images or generation logs inspected. No media generated.

## Method and provenance

Each repository PNG was matched by its **Git blob SHA-1** to a byte-identical locally available PNG, then visually inspected. SHA-256 hashes below were calculated on those local bytes. This is a visual audit of the **actual repository images**, not of newly generated illustrative images. Local PNG basenames are not evidence of shot identity; **visible image content and embedded shot labels** determine the mapping. In particular, the repository filenames are currently displaced by one shot.

| Repository path | Git blob SHA-1 | SHA-256 (raw PNG bytes) | Visible intended shot | Finding |
| --- | --- | --- | --- | --- |
| `images/keyframes/SH01.png` | `e13e5bf3f35d21e769423861f18e3cdaa2f97462` | `36dc2fd64ac4af210bb9043b84f7d4266671c096c0da714796013d55ced278fa` | SH02 — discovery/pickup (embedded header SH02) | **FAIL: filename/shot mismatch** |
| `images/keyframes/SH02.png` | `6c9ba033c4edc3546ed0c0b20fa77fcfcdd7dfdf` | `f9cd0e609d560d06e772223e675545edcab377875ab9e967bf94df3bb7b89949` | SH03 — journey (embedded header SH03) | **FAIL: filename/shot mismatch** |
| `images/keyframes/SH03.png` | `2c0ad7452d37d298c218f29c9dad2ff6e4e42cf8` | `bb28545760221f13ab5c272acb665b72036da80500876f57cd97dc21a4121ac5` | SH04 — lantern offering (action visibly depicted) | **FAIL: filename/shot mismatch** |
| `images/keyframes/SH04.png` | `f16c7becaea26ad9c2b39a88ca3f005aec7e681e` | `c2a45734a78f7b65b313a9232f67768cf540449b19cf13a3e4cabadbe9312610` | SH05 — lit town (embedded header SH05) | **FAIL: filename/shot mismatch** |
| `images/keyframes/SH05.png` | `bbf257f769018d27de549ac4a5cfdb9d58b3caa7` | `1a03ef7c87d982129da3eaf2f1dd467ab1d5ad9a09a2fd878feb34dcf2ae3a1f` | SH01 — dark town (embedded header SH01) | **FAIL: filename/shot mismatch** |

All five images exist and their bytes match the cited repository blobs (**PASS**). The current filenames, gallery captions and per-shot README links are **semantically incorrect**. The existing provenance manifest accurately identifies blobs under their current paths, but its `shot` fields cannot be treated as verified narrative identities.

## Correct narrative viewing order (do not rename assets in this audit)

1. **SH01:** [current `SH05.png`](images/keyframes/SH05.png) — unlit town, blue night, central arch and distant tower.
2. **SH02:** [current `SH01.png`](images/keyframes/SH01.png) — child crouches and handles an amber spark on the street.
3. **SH03:** [current `SH02.png`](images/keyframes/SH02.png) — child carries amber light toward the tower.
4. **SH04:** [current `SH03.png`](images/keyframes/SH03.png) — child positions the spark above a lantern cradle.
5. **SH05:** [current `SH04.png`](images/keyframes/SH04.png) — warm lights throughout the town and tower.

## Visual and narrative continuity findings

| ID | Criterion | Status | Observed evidence / limitation |
| --- | --- | --- | --- |
| F5F-01 | Image-to-shot identity | **FAIL** | All five file labels are displaced; the intended sequence is 05 → 01 → 02 → 03 → 04 in **current filename order**. |
| F5F-02 | Dark-to-lit environment | **PASS (qualitative)** | Correctly ordered establishing and final town frames share recognizable arch, street, tower, roofline and blue-night composition; final frame introduces warm amber illumination. Pixel-exact geometry not established. |
| F5F-03 | CHILD-01 general appearance | **PASS (qualitative)** | Discovery, journey and offering depict a youthful curly dark-haired character with similar facial style. No formal identity embedding or turntable comparison was performed. |
| F5F-04 | Wardrobe and bag | **PASS with uncertainty** | Pale rolled-sleeve top, dark hooded layer/vest, dark trousers and brown shoulder bag recur across the character frames. Exact strap placement, folds and accessories are not independently locked. |
| F5F-05 | Spark uniqueness and custody | **PARTIAL / NOT_VERIFIED** | A single prominent amber light appears in the child's hands in discovery/journey and at the lantern in offering. Still frames cannot verify one uninterrupted object, hand transfer or no duplicate during motion. |
| F5F-06 | SH04 release and activation timing | **NOT_VERIFIED** | Offering image shows a hand still adjacent to / apparently holding the glowing faceted object above an already bright cradle. It does not prove release precedes tower/town activation; a motion-state boundary is required. |
| F5F-07 | Town dark before activation | **CONCERN** | Discovery and journey frames show several glowing street/tower lamps before SH04, although the SH01 establishing image is largely unlit. Determine whether limited ambient practicals are allowed or whether this violates the story's darkness rule. |
| F5F-08 | Eastward travel and screen direction | **NOT_VERIFIED** | Journey frame depicts movement toward the right of screen and distant tower; geographic east and stable camera axis cannot be proven without a canonical map/shot geometry. |
| F5F-09 | Tower/lantern spatial continuity | **PARTIAL / NOT_VERIFIED** | Tower is visible in town/journey frames; offering is a tight lantern close-up. Same physical tower and access path cannot be conclusively proven from stills. |
| F5F-10 | Night / no sunrise | **PASS (visible frames)** | Correctly ordered town frames retain dark blue night sky. No sunrise is visible. |
| F5F-11 | Lighting and style | **PASS (qualitative)** | Tactile stylized 3D, blue/teal night palette and warm amber spark/lantern motif are broadly coherent; shot-by-shot lighting direction is not physically calibrated. |
| F5F-12 | Exact 0–30 second timing | **NOT_VERIFIED** | Embedded captions give narrative time windows but static images do not prove shot durations or action feasibility. |
| F5F-13 | Boundary candidate provenance | **BLOCKED** | SH02-A/B and SH04-A/B not present in this repository evidence set; earlier derivatives were crops from one composite, not independently generated frames. |
| F5F-14 | Seven-skill end-to-end execution | **NOT_VERIFIED** | No reproducible execution trace tying the seven skills, approvals, provider parameters and generated image bytes was inspected. |
| F5F-15 | G2B/G2C and motion | **BLOCKED / NOT_RUN** | No authorized motion tests or footage. |

### Severity and recommended actions

**P0 — Documentation/asset identity:** Correct the five filename-to-shot associations *in a separate, reviewable PR* by reusing the exact Git blobs, and update `provenance.json`, both READMEs, links and captions atomically. The present audit deliberately **does not rename files**, preserving forensic evidence.

**P1 — Narrative lighting:** Resolve whether SH02/SH03 pre-activation street/tower lights are permitted; compare to the locked Visual Bible and revise frames only if explicitly approved. No automatic creative changes.

**P1 — SH04 causality:** Define and review hand-contact, release, cradle occupancy, first illumination and final spark custody as separate state checkpoints. Still frame alone is insufficient.

**P2 — Spatial/camera:** Add a canonical tower/arch/street orientation reference and compare SH01/SH03/SH05 camera geometry; assess eastward movement and screen-axis continuity.

**P2 — Evidence chain:** Retain source prompts, model/provider identifiers, generation timestamps, original outputs, hashes, review decisions and explicit approval records. Avoid inferring that five good-looking images prove the full seven-skill pipeline.

## Decision

**Phase 5F outcome: FAIL for repository shot-to-file identity; PASS for broad visual-style coherence; otherwise PARTIAL / NOT_VERIFIED where evidence is insufficient.**

No production authorization, video generation, provider job, release or merge is implied. **Production GO remains HOLD.** This report is PROPOSED and requires review.

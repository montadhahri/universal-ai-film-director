# Development roadmap — V2 creative direction and production reliability

**Product direction:** a portable, creative **end-to-end AI filmmaking production system**, not just a higher-scoring screenplay or prompt generator. The Director remains a creative collaborator; the differentiator to prove is consistent assets, safe changes, recoverable state, evidence-backed QA and trustworthy delivery.

**Architecture:** one Director and six independently installable specialists. Historical [v1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) is preserved. V2 remains in development.

**Production GO: HOLD.** A plan, an approved creative artifact, permission to use a provider, and verified generated media are distinct states. No generation, paid job, account connection, private upload, publication or delivery is authorized by this roadmap.

## Evidence baseline — as of 2026-11-02

| Area | Evidence | What it does *not* prove |
| --- | --- | --- |
| Architecture and contracts | Merged V2 Director, six specialists, Project Bible, stage gates, planning pipeline and validation fixtures | Correct behavior in every host or actual media production |
| Specialist and integration acceptance | Historical independent scenario evaluations and targeted post-fix regressions; Director–Specialist integration evaluated | Full cross-host execution or an end-to-end film |
| Creative benchmark | Eight scenarios, 16 original V1/V2 creative responses, separate blind reviews and versioned CREATIVE-06/07 adjudication; adjudicated offline validator **8 PASS, 0 FAIL** | Validator PASS does not certify creative superiority or real-media reliability |
| Creative score baseline | Unweighted scenario mean **V1 4.50/5, V2 4.83/5**; V2 higher in four, V1 higher in one, three ties | Statistical significance, independent human preference or finished-film quality |
| Focused improvements | PR #62 published [benchmark results](quality-benchmark-results.md); PR #63 merged Visual Direction prop/lighting-geometry guidance | CREATIVE-04 post-fix behavioral regression PASS; it remains NOT_RUN |
| Latest roadmap baseline | Merged PR #63 at `6092f6d10ae82158da5f8c8c443ac43ddc63b85e` | Any subsequent main-branch state |

Read the [benchmark results and limitations](quality-benchmark-results.md) and [benchmark procedure](quality-benchmark.md). Preserve historical reviews and safety flags; do not retroactively replace them with adjudicated scores.

## Prioritization principles

1. **Measure real production outcomes next.** Prefer continuity, repairability, resumability and actual media evidence over raising already-ceilinged isolated rubric scores.
2. **Keep creative quality central.** Strong stories, filmable shots, emotional pacing and artistic choices remain essential; improve them when a concrete regression or rendered-film failure demonstrates a gap.
3. **Do not add more agents by default.** Keep seven skills until integration tests establish a need for new boundaries.
4. **Small reviewable PRs.** Separate benchmark documentation, behavioral skill changes, deterministic validators and real-media experiments.
5. **Approval gates are non-negotiable.** Separate screenplay, Visual Bible, storyboard and external execution authorization; protect locked revisions.
6. **Evidence classes stay separate.** A merged PR, unit test, blind text review, real-agent regression, inspected image, verified video and delivered export are not interchangeable.

## Ordered roadmap and exit gates

| Phase | Milestone | Status | Evidence required to exit |
| --- | --- | --- | --- |
| 1 | V2 architecture, seven skills and project contracts | **COMPLETE** as repository implementation | Merged code and documented contracts; portability remains separately unverified |
| 2 | Specialist behavioral tests and Director integration | **COMPLETE** for documented planning-only acceptance | Preserve original reports and scoped regressions; no media claim |
| 3 | V1/V2 creative benchmark | **COMPLETE** for adjudicated structural comparison | 8/8 adjudicated validator PASS with documented limitations and historical reviews retained |
| 4A | Publish benchmark transparently | **COMPLETE** — PR #62 merged | README summary and detailed report, scores, caveats and provenance |
| 4B | Correct Visual Direction CREATIVE-04 continuity | **IMPLEMENTED, NOT VALIDATED** — PR #63 merged | Independent post-fix fresh-context run; explicit scarf grip/free-length, light-source/occlusion, route/axis and approval verdicts; preserve old result |
| 4C | Director discovery and narration arithmetic | **PENDING** | Small corrective PR, explicit word-count/rate checks, one-question discovery and distinct stage gates; fresh targeted regression |
| 5 | **The Last Light** five-keyframe image-first integration | **PLANNING NEXT; MEDIA HOLD** | Verify existing fixtures, approved screenplay/Visual Bible/storyboard, reference assets and authorizations; then five actually inspected images with shot-by-shot identity, wardrobe, spark-state, tower, geography, lighting and camera checks |
| 6 | Safe localized revision and continuity repair | **PENDING** | Deliberately change one proposed shot, demonstrate minimal downstream impact, preserve locked unaffected shots, inspect before/after artifacts and record user approvals |
| 7 | Checkpoint recovery and long-session continuity | **PENDING** | Resume across fresh sessions/hosts from a versioned Project Bible; verify approvals, IDs, missing assets, unresolved defects and next safe action without drift |
| 8 | Real video, sound, edit and export pilot | **FUTURE; AUTHORIZATION REQUIRED** | Authorized provider capability checks, real clips, exact shot timing, narration/sound sync, QA/repair, verified export; no unobserved success claims |
| 9 | Portability, documentation, security and v2.0.0 release decision | **PENDING** | Reproducible installation/behavior in at least two supported hosts, clean tests, license/rights/privacy review, examples, changelog and release checklist; separate publication decision |

Phases 6 and 7 may use controlled fixtures before any real-media execution, but **do not label them complete** until the specified behavioral evidence exists. Phase 9 preparation may proceed in parallel; public release is a separate decision.

## Phase 5 — The Last Light: first real-media proof

**Scenario:** existing 30-second, five-shot fictional project. Reuse existing fixture IDs and approved revisions; do not invent missing approvals or reference media.

- **SH01:** Establish the world, character and geography from the existing storyboard.
- **SH02:** `CHILD-01` picks up amber `SPARK-01`.
- **SH03:** `CHILD-01` carries the same `SPARK-01` east toward `TOWER-01`.
- **SH04:** The child visibly places and releases `SPARK-01` inside the tower lantern.
- **SH05:** The same spark remains inside that lantern.

**Planning gate:** verify current main revision, Director/specialist skills, Project Bible schema, original five-shot fixtures, locked assets, permissions and missing reference images. Prepare five proposed keyframes and a continuity matrix; **do not generate media during planning**.

**Execution gate:** explicit creative approvals and separate authorization for the actual image tool/provider, account/credits and assets. Generate one controlled keyframe per shot, record inputs, provider limitations and actual files. Review outputs for character/coat, prop identity/state, landmarks, world-space light direction, camera axis and approved changes. Any failure becomes a scoped repair proposal, not an automatic regeneration.

**Success:** five inspectable images with traceable shot IDs and an evidence-backed QA report, with failures and corrections disclosed. This proves an image-first pilot, **not** finished-film reliability.

## Phase 6–8 production reliability acceptance

| Capability | Minimum test | Failure to detect |
| --- | --- | --- |
| Identity and prop continuity | Compare actual five keyframes with a state ledger | Face/wardrobe drift, spark duplication, missing transfer |
| Locked-asset protection | Revise one shot and check unaffected locked shots | Silent change to approved assets |
| Dependency awareness | Change a prop state and inspect downstream impact preview | Inconsistent subsequent shots |
| Recovery | Resume from saved checkpoint in fresh context | Lost approvals, invented references, stale revisions |
| Evidence honesty | Compare claimed media inspection to available assets | Claiming generated or inspected output without evidence |
| Video/audio execution | Inspect actual rendered clips and export | Wrong timing, missing narration, unverified delivery |

## Benchmark follow-ups and quality backlog

- **CREATIVE-04:** PR #63 addresses physical prop and lighting-geometry instructions; independent post-fix run is still **NOT_RUN**. This is the immediate next action.
- **CREATIVE-01:** Director sometimes drafted a full screenplay too early; narration was described as approximately 70 words despite a 59-word count. Fix discovery behavior and arithmetic with focused tests.
- **CREATIVE-05:** Historical V1 bundled screenplay/Visual Bible/storyboard approvals; retain separate-gate tests even though the original blind reviewer did not flag it.
- **CREATIVE-06/07:** Adjudication removed unsupported safety findings in new reviews; original flagged reviews remain unchanged. No broad rebenchmark is necessary.
- **Specialists:** Preserve existing Storytelling, Cinematography, Sound, Video Production and Continuity QA strengths. Improve only when cross-stage or real-media evidence shows a defect.

## Release and evidence rules

- A merged PR proves changes landed, not that a new agent behavior passed.
- Preserve exact prompts, full responses, version hashes, reviewer provenance, failure reports and any explicit metadata gaps.
- Report `PASS`, `FAIL`, `BLOCKED` and `NOT_RUN` without silently converting them to completion.
- Do not claim a generated image, clip, soundtrack or export until it exists and has been inspected.
- Do not publish private captures, user assets or personal project data in a public repository without authorization.
- **Production GO remains HOLD** until explicitly changed for a scoped operation.

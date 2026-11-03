# Development roadmap — V2 creative direction and production reliability

**Product direction:** a portable, creative **end-to-end AI filmmaking production system**, not just a higher-scoring screenplay or prompt generator. The Director remains a creative collaborator; the differentiator to prove is consistent assets, safe changes, recoverable state, evidence-backed QA and trustworthy delivery.

**Architecture:** one Director and six independently installable specialists. Historical [v1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) is preserved. V2.0 is being prepared for a public release candidate; unresolved improvements are scoped to V2.1. See [V2 release preflight](v2-release-preflight.md) for release blockers and deferrals.

**Production GO: HOLD.** A plan, an approved creative artifact, permission to use a provider, and verified generated media are distinct states. No generation, paid job, account connection, private upload, publication or delivery is authorized by this roadmap.

## Evidence baseline — updated 2026-11-03

The V2 roadmap now has both deterministic offline recovery evidence and a **human-operated, skill-guided** five-shot film case study. These are distinct from autonomous multi-agent execution or final film acceptance.

| Area | Verified evidence | Limitations |
| --- | --- | --- |
| Architecture and contracts | Seven skills, Project Bible and stage-gate contracts | Cross-host `/skill-name` invocation not independently verified |
| Specialist and integration acceptance | Planning-only agent acceptance, focused regressions and historical benchmark | No independent seven-agent real-media end-to-end acceptance |
| Creative benchmark | Eight adjudicated comparisons; reported V1 4.50/5 vs V2 4.83/5 | Structural benchmark, not proof of finished-film superiority |
| Offline recovery | Merged PRs #76, #78–#82; versioned checksum, local file recovery, fresh-process synthetic acceptance; CI success | No authenticated approval provenance, asset-file verification, cross-host recovery or comprehensive crash guarantees |
| Actual video case study | Merged PR #83, [The Last Light V9](case-studies/the-last-light/production-v9-case-study.md): 30-second five-shot H.264/AAC screening candidate, human-operated Google Flow generation and local assembly | MP4 binary not uploaded in PR; outstanding continuity, listening and final-release acceptance |
| Latest baseline | Main as of roadmap reconciliation: `43850b26e836dc618ecbfae18e448a1aee3644a8` | Subsequent commits require separate verification |

Read the [Phase 7 recovery exit assessment](phase7-recovery-exit.md), [V9 case study](case-studies/the-last-light/production-v9-case-study.md), [benchmark results](quality-benchmark-results.md) and [benchmark procedure](quality-benchmark.md). Preserve historical statuses and original review records.

## Version planning — V2.0 and V2.1

V2.0 targets the implemented seven-skill library, deterministic planning/recovery contracts, test suite and human-guided V9 case study. **The V2.0 release gate is public safety, licensing, reproducible public installation, accurate docs and explicit release approval.** Cross-host agent invocation, trusted approval provenance, independent multi-agent orchestration and deeper real-media continuity repair are **V2.1 candidates**, not claims of V2.0 completion. See [release preflight](v2-release-preflight.md).

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
| 4B | Visual Direction CREATIVE-04 continuity | **IMPLEMENTED; behavioral evidence tracked separately** — PR #63 merged | Preserve fresh-context regression provenance; do not infer pass from code merge |
| 4C | Director discovery and narration arithmetic | **TARGETED REGRESSION WORK RECORDED; roadmap acceptance requires evidence audit** | Verify actual post-fix outcomes and unresolved cases before closure |
| 5 | **The Last Light** five-keyframe image-first integration | **MEDIA EVIDENCE AVAILABLE; formal acceptance OPEN** | Existing reference images and V9 five-shot production case study; verify image provenance and continuity verdicts |
| 6 | Safe localized revision and continuity repair | **PARTIAL; human-guided V9 repair documented** | Show scoped change, preserved locked assets and independently verified before/after continuity |
| 7 | Checkpoint recovery and long-session continuity | **DETERMINISTIC OFFLINE RECOVERY COMPLETE; FULL EXIT PARTIAL** | PRs #76/#78–#82, fresh-process acceptance; trusted approval provenance, asset checks and cross-host recovery open |
| 8 | Real video, sound, edit and export pilot | **V9 SCREENING CANDIDATE; FINAL ACCEPTANCE OPEN** | Five generated-video shots, local edit and soundtrack; outstanding visual/listening QA, archived binary and release authorization |
| 9 | Portability, documentation, security and v2.0.0 release decision | **PREPARATION NEXT; RELEASE NOT AUTHORIZED** | Slash invocation in two hosts, clean installation, independent text-only pipeline, security/rights and release checklist |

Phases 6 and 7 may use controlled fixtures before any real-media execution, but **do not label them complete** until the specified behavioral evidence exists. Phase 9 preparation may proceed in parallel; public release is a separate decision.

## Phase 9 — reproducible release-readiness gates

1. **Installation:** install all seven skills from a pinned revision in two independently supported hosts; record host versions, exact commands, private-repository access constraints and complete output. Do not equate file presence with slash-command invocation.
2. **Invocation:** execute `/universal-ai-film-director` and at least two individual specialists where slash invocation is supported. Record the exact host syntax and whether the command was actually recognized.
3. **Orchestration:** run a fresh-context, text-only discovery → script → Visual Bible → storyboard → production plan → Continuity QA scenario; preserve handoffs, stage gates, approvals and full transcripts. No fictional approvals.
4. **Recovery:** export/import a versioned checkpoint across the two hosts, inspect revision IDs, locked assets, pending work and unresolved issues. Record whether asset bytes and approval sources can be verified; report unsupported cases as NOT_RUN.
5. **V9 acceptance:** inspect remaining SH01 early lantern light, SH04 held ending, SH04→SH05 and other shot boundaries, SH05 fade and final audio. Preserve actual verdicts; keep final release HOLD until explicit acceptance.
6. **Release governance:** validate rights/privacy/license, repository documentation, examples, changelog and a reproducible test report. Release decision is separate from production GO.

**Evidence rule:** PASS requires observed outputs; repository CI, a documented case study, successful media render, slash-command invocation and autonomous pipeline acceptance are separate evidence classes.

## Phase 5 — The Last Light: first real-media proof

**Historical planning protocol below:** the V9 case study now documents subsequent human-operated production. Treat the steps below as acceptance criteria for an independently evidenced image-first integration test, not as a claim that no video exists. The V9 screening candidate does not automatically close the independent five-keyframe acceptance gate.


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

- **CREATIVE-04:** PR #63 addresses physical prop and lighting-geometry instructions; consult the preserved independent post-fix regression evidence before assigning PASS/FAIL. Do not infer success from the merge.
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
- **Production GO remains HOLD** for new provider work and release until explicitly changed for a scoped operation. Historical human-operated V9 generation is documented separately.

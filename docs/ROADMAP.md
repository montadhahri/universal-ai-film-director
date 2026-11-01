# Development roadmap — V2 skill quality and production readiness

**Architecture:** one portable Universal AI Film Director orchestrator and six independently installable specialist skills. Major releases use Git tags and changelog entries, not versioned folders. [v1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) remains the historical private release.

**Current boundary:** Production GO **HOLD**. No media generation, external account connections, paid jobs, publishing or implied film delivery. Planning-only and textual agent tests do not establish real-media readiness.

## Completed foundations

| Milestone | Evidence / status |
| --- | --- |
| V2-00 architecture RFC | Merged PR #27 |
| V2-01 Project Bible, proposal contracts, Director authority and checkpoint rules | Merged PRs #28 and #32; real-host approval/recovery verification remains incomplete |
| V2-02 portable Director + six specialists | Merged PRs #29–31; cross-host installation/behavior not fully established |
| V2-03 acceptance and creative benchmark fixtures | Merged PRs #33–34; fixture tests are not independent agent results |
| Planning-only production pipeline, timeline, audio continuity and dependency impact preview | Merged PRs #35–36; no provider execution |
| Director creative direction and collaboration guidance | Merged PR #37; blind v1/v2 creative comparison remains NOT_RUN |
| Storytelling craft and Creative Quality Gate | Merged PRs #38–40 |
| Storytelling independent-agent scenario fixtures and runner | Merged PR #41; six clean-context executions: ST-01 FAIL, ST-02–ST-06 PASS; 22/24 criteria passed |
| Storytelling targeted reliability hardening | Merged PR #42; critical prop-state continuity and exact narration word counting; independent ST-01 post-fix rerun NOT_RUN |
| Visual Direction six-scenario evaluation baseline | User reports PR #43 merged; six clean-context agent executions: VD-01/02/03/05/06 PASS, VD-04 literal FAIL, 23/24 criteria; VD-04 omitted the amber color required by its criterion |
| Visual Direction fixture and anchor refinements | User reports PR #44 merged; corrected VD-04 prompt, unresolved identity anchors and stateful prop guidance; independent post-fix rerun NOT_RUN |

## Repeatable quality methodology for every skill

1. **Audit:** inspect actual SKILL.md, referenced instructions, artifact contracts, Director handoffs, permissions and failure cases.
2. **Foundational refinement (only when warranted):** address concrete structural gaps with minimal changes; no speculative quality gates or duplicate runners.
3. **Behavioral evaluation:** use exact, versioned scenarios in clean agent contexts; retain complete responses, revision hashes and available provenance; do not expose grading criteria to the executing agent.
4. **Evidence-based hardening:** classify demonstrated skill failures separately from fixture mistakes and untested risks; add targeted regressions and rerun affected cases.
5. **Acceptance:** record PASS / FAIL / BLOCKED / NOT_RUN, residual risks and handoff readiness. Textual acceptance does not imply real-media acceptance.

## Skill-specific quality backlog

| Skill | Already improved / verified | Next quality work | Exit evidence |
| --- | --- | --- | --- |
| **Universal AI Film Director** | Portable orchestration, one-question discovery, explicit approvals, revision locks, Project Bible/checkpoint contracts, creative directing guidance, optional planning pipeline | Audit specialist handoff contracts against current skill revisions; test stale/duplicate proposals, stage gates, locked changes and checkpoint recovery; run blind v1/v2 creative comparison and cross-host checks where feasible | Real-agent Director authority/recovery tests and Director–Specialist integration acceptance |
| **Film Storytelling** | Filmable drama, protagonist agency, earned payoff, narration/timing Creative Quality Gate, approved-scope preservation, prop-state checks and exact narration counts; ST-01–ST-06 evaluated | Independently rerun ST-01 against PR #42 changes; preserve historical failure; address only any remaining evidenced defects | ST-01 post-fix result with evidence; other five original scenario results retained |
| **Film Visual Direction** | Stable IDs, identity/wardrobe/location/lighting anchors, reference provenance, proposed approval boundary; six real-agent scenarios; unresolved anchors and intentional prop-state guidance in PR #44 | Rerun corrected VD-04 v1.1; unspecified-color VD-04B; VD-06 unresolved identity and downstream dependencies; verify fixture integrity and no illustrative gold leakage | New independent captures and criterion verdicts; original VD-04 failure retained as historical fixture mismatch |
| **Film Cinematography** | Shot IDs, framing/blocking, geography/axis, exact storyboard timing and transition guidance; existing templates | Audit visual-to-shot handoff and Director approval semantics; evaluate coverage gaps/overlaps, reverse angles, impossible camera moves, shot dependencies, transition timing and locked revisions; refine only observed failures | Versioned clean-context cases, timed storyboard and evidence-backed regressions |
| **Film Sound Direction** | Audio cue planning, narration/dubbing, silence, audio-only repair boundaries, optional audio-continuity checks | Audit picture-to-audio handoff; evaluate overlapping cues, speech feasibility, intentional silence, localization consistency, missing audio and locked-picture protection; refine only observed failures | Agent cases plus deterministic cue coverage where applicable; no invented generated audio |
| **Film Video Production** | Generator-ready shot packets, explicit provider capability/authorization checks, evidence honesty and BLOCKED_NO_PROVIDER behavior | Audit shot-packet completeness and provider-neutral handoffs; test unknown capability, absent tools, permission separation, stale revisions, failed jobs and no fabricated outputs; only then consider adapters | Planning-only acceptance and truthful BLOCKED/NOT_RUN results; actual generation remains gated |
| **Film Continuity QA** | Evidence classes, timestamped defect reports, localized repair proposals, locked-asset preservation, dependency previews | Audit input/output defect contract; test user-report vs direct-inspection boundaries, repeated/missing frames, audio dropout, cross-shot identity drift, downstream impact, repair rollback and verification honesty | Independent scenario results; actual-media verification NOT_RUN until authorized footage exists |

## Director–Specialist Integration Acceptance — new milestone

**Goal:** demonstrate that the improved Director and all six specialists interoperate on one versioned planning-only film without losing authority, revisions or continuity.

- **End-to-end handoffs:** Director → Storytelling → Visual Direction → Cinematography → Sound Direction → Video Production → Continuity QA → Director.
- **Artifact compatibility:** consistent project/shot/character/prop/cue IDs, revision IDs, input references, PROPOSED status, dependency links and provenance.
- **Approval authority:** user explicitly approves screenplay, Visual Bible and storyboard separately; specialists cannot self-approve or bypass gates.
- **Negative paths:** reject stale or duplicate specialist replies; block unauthorized changes to locked screenplay, look, shot or audio; reject implicit generation consent.
- **Checkpoint recovery:** resume at the next unfinished stage, preserve approvals and locked versions, and retain unresolved defects.
- **No-provider path:** produce useful shot/audio plans while reporting BLOCKED_NO_PROVIDER or NOT_RENDERED; do not invent footage or inspection.
- **Evaluation:** use a single canonical integration suite and real-agent captures where possible; avoid another standalone runner. Record evidence and limitations, including cross-host and actual-media NOT_RUN.

**Exit criterion:** complete one planning-only multi-skill run and at least one locked-artifact repair/recovery path with criterion-level evidence. Passing this milestone does **not** change Production GO.

## Ordered next milestones

| Order | Milestone | Current status / dependency |
| --- | --- | --- |
| 1 | Visual Direction post-merge regressions (VD-04 v1.1, VD-04B, VD-06) | NEXT; real-agent reruns NOT_RUN |
| 2 | Storytelling ST-01 independent post-fix rerun | Pending |
| 3 | Cinematography audit → conditional improvement → real-agent evaluation → hardening | Pending |
| 4 | Sound Direction audit → conditional improvement → evaluation → hardening | Pending |
| 5 | Video Production planning/authorization audit → evaluation → hardening | Pending; no generation |
| 6 | Continuity QA audit → evaluation → hardening | Pending; no media inspection |
| 7 | Director–Specialist Integration Acceptance | New required milestone before V2 release review |
| 8 | Director blind v1/v2 creative-quality evaluation and portable/cross-host checks | Pending; can run alongside skill work |
| 9 | Production Pipeline Core integration: stage, timeline, continuity and dependency safeguards | Core merged; integration and remaining edge-case verification pending |
| 10 | Provider-neutral generation adapters and capability verification | Not started; requires separate explicit authorization for any external operation |
| 11 | Real-media generation, inspection and localized repair | BLOCKED until tools and user permissions exist |
| 12 | Independent end-to-end 30-second film demonstration | BLOCKED; requires real media |
| 13 | Security, documentation, installation, marketing/readme examples, release QA and v2.0.0 decision | Not started; no public release authorized |

## Evidence and release rules

- A merged PR proves code landed, **not** independent-agent behavior or production quality.
- Fixture-shape/unit tests, in-chat editorial checks, genuine agent executions and inspected media are different evidence classes.
- Preserve historical FAIL captures; fix fixtures in a new version and rerun rather than rewriting history.
- Never assert a cross-host result, provider capability, model ID, generated asset or rights clearance without evidence.
- Make all improvements in reviewable PRs; do not merge automatically.
- Production GO remains **HOLD** until a separate explicit authorization and the relevant real-media gates.

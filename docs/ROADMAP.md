# Product roadmap — Universal AI Film Director

**Canonical roadmap · updated 2026-11-15.** This is the single source of truth for version outcomes and acceptance gates. [Development governance](DEVELOPMENT.md) defines the main/develop PR workflow. Historical V2.0 release evidence remains in [the release checklist](archive/releases/v2.0.0-checklist.md) and Git history.

> **Current state:** [v2.6.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.6.0) was published as the latest stable software release on 2026-11-15 at commit `7c455692dc564894bf2cb6e951b8909e8b753acb` (GitHub release and tag verified). Seven skills, maintained planning starters, portable contracts and deterministic validation are shipped. Independent unfamiliar-user onboarding remains **NOT_RUN**; universal agent-host compatibility, live Studio integration and real-media quality remain **NOT_VERIFIED**. V2.7 is the proposed extensive real-world testing milestone. **The Last Light Production GO remains HOLD**; software publication does not authorize provider spending, media generation or film publication.

## Release direction — master roadmap

This is the **authoritative release table** for Director. Historical releases are immutable; future windows are sequencing estimates, not deadlines. The shared E1–E6 gates coordinate with [Studio's independent S0–S6 roadmap](https://github.com/universal-ai-film/universal-ai-film-studio/blob/main/docs/ROADMAP.md). **RELEASED** refers to a software tag, not independently verified film quality, cross-host autonomy or production authorization. Every future version requires its own reviewed PRs, exact-SHA tests and explicit release GO.

| Version | Delivery sequence / window | Creator outcome and primary scope | Studio / shared dependency | Status | Required exit evidence |
| --- | --- | --- | --- | --- | --- |
| [V1.0.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v1.0.0) | Historical | Original film-direction skill | Independent | **RELEASED** | Preserve immutable history |
| [V2.0.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.0.0) | Historical | Director + six specialists, planning and approval contracts | Independent | **RELEASED** | Preserve media-rights and evidence limitations |
| [V2.1.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.1.0) | Nov 2026 | First-use installation and scoped Codex/OpenCode validation | Independent | **RELEASED** | Host claims limited to actual reviewed sessions |
| [V2.2.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.2.0) | 2026-11-14 | End-to-end planning, Project Bible, approval-safe recovery and Persistent Director foundations | Portable project state | **RELEASED** | Focused recovery/QA evidence; independent full acceptance incomplete |
| [V2.3.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.3.0) | 2026-11-14 | Guided beginner onboarding and usability improvements | Independent | **RELEASED — limited** | Deterministic checks; unfamiliar-user trials deferred |
| [V2.4.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.4.0) | 2026-11-15 | Character & World Memory and Smart Film Repair | Shared continuity/revision concepts | **RELEASED — limited** | Deterministic checks; real-media repair quality not verified |
| [V2.5.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.5.0) | 2026-11-15 | Intelligent Budget Director, manual/local/mock production, media QA and recovery | Future E4/E5 foundations | **RELEASED — limited** | CI evidence; real-media/independent host acceptance pending |
| [V2.6.0](https://github.com/universal-ai-film/universal-ai-film-director/releases/tag/v2.6.0) | 2026-11-15 | Planning templates, community readiness, portable Studio-facing contracts | **E1 foundation** for Studio S2 | **RELEASED** | Contract/schema/installation checks; Studio integration not yet verified |
| **V2.7.0** | **Next: testing milestone; date TBD** | **Comprehensive validation of everything released in V2.0–V2.6:** seven-skill workflow, portability, approvals, budget, continuity, repair, checkpoints, QA and final delivery | **E1 compatibility evidence** alongside Studio S0/S2; no dependency on Studio app completion | **PLANNED — acceptance first** | T1–T8 evidence matrix, independent host/user runs, zero unauthorized spend; real-media outcomes separately PASS/BLOCKED/NOT_RUN |
| **V3.0** | After V2.7 review; date TBD | Shared provider-neutral production engine, Persistent Director, mode-aware Project Bible, jobs, provenance, resumability and safe local/manual/mock adapters | **E2 portable package research; E3 handoff; E4 job contract** | **PROPOSED — feasibility-gated** | Typed contracts, negative/security tests, recovery, cost/permission safety and explicit implementation/release approval |
| **V3.1** | After V3.0; date TBD | **Live-action pre-production:** shooting scripts, casting/location requirements, shot lists, equipment, schedules and call sheets | Mode-aware schemas; Studio remains optional | **PROPOSED — feasibility-gated** | Human-reviewed real pre-production scenario, consent/rights constraints |
| **V3.2** | After V3.1; date TBD | **Live-action on-set assistance:** offline take logs, coverage, camera setups, continuity and daily records | Optional future Studio production views | **PROPOSED — feasibility-gated** | Human-confirmed offline workflows, safety boundaries, recovery |
| **V3.3** | After V3.2; date TBD | **Live-action post-production:** footage organization, edit/sound/caption guidance and export QA | **E5** future Studio timeline and assembly, not a mandatory dependency | **PROPOSED — feasibility-gated** | Rights-cleared footage and real output inspection; no unsupported automated analysis |
| **V3.4** | After V3.3; date TBD | **Complete live-action acceptance:** independently tested idea-to-delivery assistance and AI-mode regression | **E6** foundations for hybrid mode | **PROPOSED — feasibility-gated** | Independent real workflow, permissions, safety, continuity and media QA |
| **V4 — research candidate** | Long term; no approved date | Hybrid AI/live-action projects, advanced multimodal continuity, production-aware repair, community extensions | **E6** Studio mode-aware integration; Studio 2.x/3.x are independently planned | **RESEARCH ONLY** | Demonstrated creator demand, feasibility, accessible UX, rights/security and separate owner approval |

**Interpretation:** V2.7 is a testing release, not a feature backlog. Director V3's existing live-action direction is preserved; Studio is optional at every Director stage. No release is blocked solely because the other product has not reached the same version. The Last Light Production GO remains **HOLD**. The historical 500,000-star ambition for November 2028 is an extreme aspiration, never a forecast or release gate.

## Current delivery priorities — after V2.6 release

| Priority | Workstream | Immediate outcome | Gate |
| --- | --- | --- | --- |
| **1** | **V2.7 full acceptance** | Reproduce all seven-skill workflows, cross-host installation/invocation, approval/budget/recovery/QA failures and real-media limitations | Evidence separated by source and modality; no false independent claims |
| **2** | **Studio S0 and E1** | Review Studio architecture and pin V2.6 read-only schema fixtures for its S2 consumer | Studio owner approval and contract negative tests before integration claim |
| **3** | **V3.0 research on develop** | Feasibility for provider-neutral jobs, Persistent Director, provenance and mode-aware state | Explicit implementation GO after research; no paid execution |
| **4** | **V3.1–V3.4** | Live-action pre-production, on-set, post-production and independent full-workflow acceptance | Separate human/rights/safety and real-world evidence |
| **5** | **V4 research** | Hybrid AI/live-action and cross-product intelligence | Evidence of creator demand and practical low-cost feasibility |

**Delivery rule:** Director and Studio have independent release trains. A Studio read-only viewer may progress with explicitly accepted unrelated V2.7 gaps, but no Studio compatibility claim without E1. Focus on a complete usable vertical slice, not speculative provider count or calendar dates.

## V2.7 — Comprehensive end-to-end acceptance

**Purpose:** validate existing V2.0–V2.6 capabilities, not add unrelated product features. The intended creator journey runs from idea, screenplay, Visual Bible, shot planning, budget and human-approved production handoff to continuity QA, localized repair, checkpoint recovery and final delivery review. Preserve the seven skill entrypoints.

| Test track | Scenarios | Acceptance evidence |
| --- | --- | --- |
| **T1 — Install and portability** | Clean packaged install, reference resolution, Codex/OpenCode and another compatible host when feasible | Exact revision, host/version, native vs file-based invocation and reproducible logs |
| **T2 — Seven-skill orchestration** | Full planning handoffs, stage dependencies, Project Bible, timed sound/shot contracts | Actual complete transcript, stage outputs and separately approved checkpoints |
| **T3 — Integrity and recovery** | Reject/revise approvals, conflicting anchors, locked assets, stale changes, checkpoint restore, scoped rollback | Before/after project state, negative tests and untouched original verification |
| **T4 — Budget and permissions** | Zero-cost first, uncertain costs, rejected jobs, unavailable provider, safe fallback | No unauthorized spend, uploads, provider execution or fabricated output |
| **T5 — Continuity and repair** | Character/world anchors, impact analysis, smallest affected scope, byte and visual distinctions | Deterministic evidence separate from reviewer-inspected media |
| **T6 — Real-media production and QA** | Rights-cleared image/video/audio/timing/transitions/export, when feasible | Inspected real files; explicitly BLOCKED/NOT_RUN if no safe affordable tool |
| **T7 — Independent usability** | Target at least five unfamiliar creators, repeated scenario and host diversity | Independent runs, task completion, friction, failures and reproducible fixes |
| **T8 — Regression/security** | Schema and packaging, permission boundaries, secrets, dependency/rights review, release candidate | Exact-SHA applicable checks and unresolved issues documented |

**Evidence matrix:** report PASS / FAIL / GAP / BLOCKED / NOT_RUN / NOT_VERIFIED per track. Owner-operated or deterministic tests are not independent agent runs; a film plan is not a rendered film; byte integrity is not visual quality. V2.7 can only claim what its evidence establishes. Any release, provider operation, media publication or *The Last Light* Production GO requires separate approval; its existing HOLD remains unchanged.

## V3.0–V3.4 — Shared production engine and live-action filmmaking

**Existing approved roadmap direction, feasibility-gated; not implementation GO.** Keep the same Director plus six specialists and evolve contracts rather than create a duplicate live-action skill tree. Human crews retain responsibility for on-set safety, permits, consent and final creative decisions.

| Version | Core outcome | Implementation priorities | Independent acceptance |
| --- | --- | --- | --- |
| **V3.0** | Provider-neutral production engine + Persistent Director | Typed jobs, local/manual/mock adapters, artifact provenance, retry/checkpoint, approval and budget control, mode-aware Project Bible; optional Studio contract handoff | Permission/security/recovery and cost-boundary tests before any real provider |
| **V3.1** | Live-action pre-production | Shooting script, casting/location requirements, shot lists, equipment, scheduling and call sheets | Human-reviewed real pre-production case |
| **V3.2** | Live-action on-set assistance | Offline take logs, coverage, camera/continuity notes, daily records and crew-confirmed corrections | Realistic offline tests, safe human confirmation and on-set constraints |
| **V3.3** | Live-action post-production assistance | Footage/asset organization, editing and sound guidance, captions, export and QA | Rights-cleared footage tests, no unverified automated analysis |
| **V3.4** | Full live-action workflow validation | Idea-to-delivery case study and regression of AI mode | Independent real production evidence, safety/rights/media quality review |

**V4 (future research):** advanced cross-modal continuity, production-aware localized repair, AI/live-action hybrid assets, Studio mode-aware experiences and community extensions. These are hypotheses, not approved features or a guaranteed V4 release.

## Cross-product integration — E1 to E6

The [Studio roadmap](https://github.com/universal-ai-film/universal-ai-film-studio/blob/main/docs/ROADMAP.md) owns its own S0–S6 and post-MVP delivery. The [organization profile](https://github.com/universal-ai-film) explains the shared public vision. This roadmap remains Director's authoritative release plan; no third mandatory product or duplicated skill runtime.

| Gate | Director responsibility | Studio counterpart | Evidence |
| --- | --- | --- | --- |
| **E1 — Read-only contracts** | Publish immutable versioned Project Bible, snapshots, handoffs and positive/negative fixtures | S2 validates and renders pinned V2.6 contracts | Unsupported versions rejected; approvals and locks preserved |
| **E2 — Portable film package** | Research identity, revisions, checkpoints, asset manifests, provenance and optional media references | S3 import/export, backup and recovery | Defined supported-field round trip, corruption/migration tests; no secret bundling |
| **E3 — Human-approved revisions** | Scoped diff/revision proposals, lock and stale-state validation, safe rollback | S5 review/accept/reject UX | Real round trip, rejection and recovery tests; no inferred permission |
| **E4 — Controlled production** | Provider-neutral job and permission contracts, manual/local/mock first | Post-S6 production queue and budget UX | Explicit authorization, zero unauthorized execution/spend |
| **E5 — Assembly and QA** | Evidence-aware sound/video/export QA and repair impact | Post-S6 timeline and local rendering | Rights-cleared playable files, independent quality inspection |
| **E6 — Hybrid workflows** | Mode-aware AI/live-action contracts and safety/consent rules | Future mode-aware creator workspace | Separate independent workflow validation before hybrid claims |

**Compatibility policy:** Director owns canonical versioned schemas; Studio pins released immutable revisions and maintains consumer fixtures. Never silently drop unknown fields from a purported lossless export. Breaking contract changes require coordinated reviewed PRs, not assumed automatic upgrades. Studio S0 may proceed in parallel with V2.7; S1/S2 may be authorized with unrelated gaps explicitly documented.

## Delivery, adoption and governance

**North star:** independent creators repeatedly complete and improve films. Track first-plan completion, cross-host usability, successful project recovery, real finished films, repeat creators and external contributions. Downloads and stars do not equal unique users. The historical 500,000-star ambition by November 2028 remains an extreme aspirational target, never a release gate or forecast.

**Budget and solo scope:** no mandatory provider, account or backend; local/manual workflows first. Favor one testable slice and coherent PR over broad unvalidated feature sets. Optional Studio production, timeline and hybrid capabilities depend on demonstrated demand and separate implementation decisions.

**Branch/release control:** V2.x work on `main`, V3 research on `develop` following existing [governance](DEVELOPMENT.md); short-lived branches and owner-reviewed PRs. Preserve released history and all seven skills. No automatic merge, tag, release, spend, provider job or media publication from this roadmap. Update this canonical file and existing relevant docs rather than creating duplicate status documents.

## Historical implementation and decision record (preserved)

The following earlier phase notes and acceptance decisions are retained for traceability. Historical “pending” or “not authorized” language describes its original point in time and must not override the current released-version status in the table above.

## Baseline: what V2.0 actually established

- **Implemented:** seven portable Agent Skills, Director/specialist planning contracts, Project Bible, stage approvals, deterministic pipeline and recovery utilities.
- **Evidenced within limits:** specialist planning tests, targeted regressions, eight model-reviewed textual creative comparisons (V2 mean 4.83/5 versus historical V1 4.50/5; not proof of rendered film quality), public Skills CLI installation in CI, and a human-guided five-shot *The Last Light* V9 screening candidate.
- **Not established:** two independent hosts successfully invoking skills, autonomous seven-agent execution, independent real-media end-to-end acceptance, trusted cross-host approvals, final V9 sound/visual QA or film publication approval.
- **Security and rights:** the V9 MP4 was removed from current release source, but may remain in Git history; five reference PNGs use separate non-MIT media terms. Historical ZIP and other history/binary review limitations remain disclosed in [public exposure audit](security/v2-public-exposure-audit.md) and [media rights checklist](security/v2-media-release-rights.md).

**Evidence labels:** RELEASED = tagged release; IMPLEMENTED = feature exists; EVIDENCED = scoped reproducible evidence; PARTIAL = incomplete; BLOCKED = prerequisite unresolved; PROPOSED/RESEARCH = future ideas. Tests use PASS/FAIL/BLOCKED/NOT_RUN/NOT_VERIFIED. Never equate CI install with native invocation, textual plans with generated footage, or a screening candidate with approved publication.

## V2.1 — First-use experience and host portability

**User outcome:** someone unfamiliar with the project can install and actually invoke the Director, follow a concise quickstart and understand how to use specialists.

- Verify pinned public GitHub installation and real Director + at least two specialist invocations in **two supported hosts**, distinguishing native discovery from manually pasted instructions.
- Test the README quickstart from a clean environment; document only reproducible compatibility claims and actionable failure cases.
- Provide one short example with expected outputs, approvals and honest limits. Prefer updating existing README/installation docs rather than creating new reports.
- **Observed 2026-11-05 (owner-operated, partial evidence):** Codex CLI invoked the Director and two specialists separately with local installed `SKILL.md` reads and planning-only approval boundaries. Gemini CLI personal authentication was blocked; OpenCode responded using a free-labelled model, but skill installation was skipped and native skill invocation was not tested. See [installation observations](installation.md#owner-operated-windows-host-observations-2026-11-05). These observations are not independent clean-user acceptance and do not demonstrate two-host portability. **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-06 (owner-operated OpenCode screenshots):** OpenCode directly read the Director and two specialist `SKILL.md` files, produced approval-safe Director discovery behavior, and visibly invoked `film-storytelling` and `film-visual-direction` through its native skill tool. This adds scoped second-host specialist evidence; **native Director invocation, independent clean install, full reference loading and complete host transcripts remain NOT_VERIFIED**. See [OpenCode follow-up](installation.md#opencode-follow-up--owner-operated-windows-evidence-2026-11-06). **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-07 (owner-operated project-local OpenCode):** Skills CLI installed all seven skills under a Windows project's `.agents/skills/`; native Director + Storytelling calls and local paths were visibly captured, and Director + Visual Direction produced approval-safe visual proposals with local paths (native call lines not shown in that screenshot). This is stronger local first-use evidence, **not** independent clean-user acceptance or a complete two-host transcript. See [project-local OpenCode follow-up](installation.md#project-local-opencode-follow-up--owner-operated-windows-screenshots-2026-11-07). **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-07 (additional owner-operated checks):** All seven project-local skill entrypoints and seven Director references were present. A beginner-style OpenCode prompt yielded a draft Project Bible, planning-only constraints, one question and no implied approvals; local discovery reference was visibly read. Native Director invocation in this specific screenshot and independent clean-environment acceptance remain NOT_VERIFIED. See [additional local checks](installation.md#additional-local-completeness-and-beginner-check-2026-11-07). **V2.1 remains PARTIAL.**
- **Verified 2026-11-07 (existing CI run history):** Owner-provided GitHub Actions screenshot shows the `Local Skills CLI install smoke test` successful on `main` (run #39, manual, 2026-11-04) and on PRs #110 (run #38) and #88 (run #37). The current workflow checks local and credential-free public GitHub installation of all seven skills using pinned Skills CLI `1.7.4` and compares installed payloads. This establishes **installation CI PASS**, not native agent invocation or independently reviewed two-host transcripts. Broader unfamiliar-user validation remains the V2.3 goal. **V2.1 remains PARTIAL; release not authorized.**
- **2026-11-07 targeted host transcript review:** The owner supplied complete exported Codex JSONL and OpenCode JSON sessions; independent review confirmed recorded prompts, actual loading of Director and two specialists, reference reads, approval-safe 30-second proposals and a single focused question in both hosts. OpenCode used three native `skill` tool calls; Codex used file-based `SKILL.md` reads. **Targeted two-host planning PASS**, not independently operated execution. Exact installed Git revisions, clean unfamiliar-user acceptance and native Director-to-specialist delegation remain NOT_VERIFIED/NOT_RUN. Private transcripts are not committed; see [installation evidence](installation.md#complete-targeted-host-transcript-review-2026-11-07). **V2.1.0 was released on 2026-11-07; evidence remains scoped to the reviewed host sessions.**
- **Exit:** independently captured host invocation logs, repeatable instructions and CI regression coverage. If two hosts cannot be verified, report PARTIAL; do not certify portability.

## V2.2 — End-to-end planning and recovery

**User outcome:** start from one film idea and reach a coherent, generator-ready **text-only** production plan without losing decisions or bypassing approvals. V2.2 proves repeatability of the existing seven-skill planning workflow; it does not promise autonomous agent delegation, media rendering or independent user adoption.

**Scope and delivery sequence (one reviewed PR per coherent change, not one PR per minor test):**

| Phase | Deliverable | Evidence and completion gate |
| --- | --- | --- |
| **1. Baseline and gap review** | Inventory current Director, six specialists, Project Bible, approval contracts, pipeline and existing tests; identify only real missing handoffs or contradictions | Source-linked gap matrix with PASS / GAP / NOT_VERIFIED; propose minimal fixes before modifying runtime |
| **2. Director orchestration and handoffs** | Explicit stage ownership, inputs, outputs, specialist selection, single-agent fallback and approval-gated handoffs | A complete proposed handoff trace; no silent auto-approval, unsupported native delegation claim or duplicate orchestration layer |
| **3. Project Bible and decision continuity** | Canonical project state, provenance, revisions, locked assets, pending approvals and conflict/missing-field handling | Decisions survive stage changes; conflicting or missing approvals block progression rather than being invented |
| **4. Complete text-only film plan** | Discovery → screenplay → Visual Bible → timed storyboard → sound → generator-ready shot packets → planning-only QA | One complete preserved example using actual current skills and references, with coherent shot durations, asset IDs, narration and dependencies |
| **5. Recovery and scoped revisions** | Resume from a checkpoint; handle a rejected proposal and an approved change affecting downstream work | Before/after trace shows revision lineage, affected outputs, retained locks and no unauthorized production |
| **6. Independent acceptance and regressions** | Clean-context evaluation of the actual instructions and contracts, plus deterministic negative tests | Full prompt, source revision, complete outputs and criterion-level PASS / FAIL / BLOCKED / NOT_RUN; no simulated agent execution |
| **7. Release readiness** | Consolidated user-facing quickstart, changelog, roadmap status, CI and security review | Owner reviews evidence and unresolved limitations; tag/release require a separate explicit GO |

**Dependencies and stop rules:**
- Complete the Phase 1 gap review **before** proposing architecture or implementation changes. Advance only when the preceding phase's evidence has been reviewed; fix failed acceptance in the same coherent PR where practical.
- Reuse existing skills, `contracts/`, Project Bible schema, pipeline and test fixtures. Preserve all seven skill entrypoints and the public installation flow; no duplicate runtime trees or unnecessary report files.
- The Director coordinates proposals; the user remains the authority for screenplay, visual design, storyboard and any external action. Explicit approval provenance is required; unknown approval means HOLD.
- Keep all media generation, paid providers, API keys, account connections, credit spending and film publication outside V2.2. Text plans are not evidence of rendered footage.
- Distinguish independently operated agent tests from owner-operated transcripts, static fixtures and deterministic local tests. Never turn missing evidence into PASS.
- V2.x PRs branch from and target `main`. V3 research stays on `develop`; main-to-develop synchronization remains review-only.

**Exit criteria:** one reproducible complete text-only scenario; traceable Director/specialist handoffs; consistent Project Bible; demonstrated checkpoint recovery and scoped revision; negative approval/continuity tests; documented remaining limitations; passing required CI. If independent execution cannot be obtained, record NOT_RUN and hold any claim of independent end-to-end validation. The release itself remains a separate owner decision.

### V2.2.0 owner decision and evidence status — 2026-11-14

The owner explicitly approved the focused Phase 5 recovery/scoped revision and Phase 6 continuity QA/Director reconciliation evidence for V2.2.0, accepting the limitations below. This approval supported the subsequently published [stable V2.2.0 software release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.2.0) at `5047ac031770c576978eba30d19178b893127438`. It does not imply blanket independent-acceptance PASS, rendered-media validation or film-production permission.

- **Phase 5 focused behavior: PASS.** Genuine TLL-V22-01a1d700 revision 9 restored; rejected proposal not applied; separately labeled synthetic scoped authorization preserves locked-source lineage and downstream review boundaries. No real locked media or owner-authorized media replacement is inferred.
- **Phase 6 focused QA/reconciliation: PASS; full independent acceptance: PARTIAL.** Separate clean same-host/model QA, evaluator and Director contexts detected three injected textual defects, zero misses/false positives, and proposed three minimal repairs. This does not establish all P6-01–P6-14 criteria or independent human/host execution.
- **Local standard regressions: BLOCKED (EPERM), not PASS.** Isolation-disabled authority 12/12 and dependency 9/9 passed; recovery 1/2 passed with the fresh-child case blocked. A separate shell-launched restore passed without making that original regression green. Hosted CI successes are separate evidence.
- **Media verification: NOT_RUN.** SH05 readability remains deferred / NOT_VERIFIED / NOT_WAIVED / NOT_PASS; SH04 physical checks remain unverified and LAYOUT-P1 provisional. The Last Light stays revision 9, all operational flags false and Production GO HOLD.

The [existing V2 release checklist](archive/releases/v2.0.0-checklist.md#v220-release-preparation--owner-accepted-focused-evidence) records exact source/evidence hashes, owner decision, baseline CI and proposed notes. Original acceptance criteria and historical results remain unchanged. The owner subsequently merged PR #181 and published v2.2.0 on 2026-11-14. At release SHA `5047ac031770c576978eba30d19178b893127438`, hosted Validate skill, Secret scan, CodeQL and pre-production workflows completed successfully. Previously blocked local tests remain BLOCKED, not PASS. V2.3 independent creator onboarding is next.

## V2.3 — Development evidence and outstanding acceptance

**Implementation status (2026-11-14):** Four owner-reviewed PRs merged to `main` through commit `c977b2834dd5f62626473623988fa67f64a4cc35`. This records completed development, **not** V2.3 release or independent creator acceptance.

- [#185](https://github.com/montadhahri/universal-ai-film-director/pull/185): beginner first-film walkthrough and documentation regression checks.
- [#187](https://github.com/montadhahri/universal-ai-film-director/pull/187): deterministic discovery, approval, checkpoint and media-claim safeguards.
- [#189](https://github.com/montadhahri/universal-ai-film-director/pull/189): Director first-turn usability guidance and corrected public-vs-PR Skills CLI smoke comparison.
- [#191](https://github.com/montadhahri/universal-ai-film-director/pull/191): deterministic 30-second screenplay → Visual Bible → storyboard → sound → checkpoint integration and negative-path tests.

**Hosted evidence at final development SHA:** [Validate skill](https://github.com/montadhahri/universal-ai-film-director/actions/runs/43601865587), [Secret scan](https://github.com/montadhahri/universal-ai-film-director/actions/runs/43601865594), [CodeQL](https://github.com/montadhahri/universal-ai-film-director/actions/runs/43601851776) and [private pre-production](https://github.com/montadhahri/universal-ai-film-director/actions/runs/43601865639) succeeded. [Skills CLI install smoke](https://github.com/montadhahri/universal-ai-film-director/actions/runs/43601578378) succeeded at the preceding merge SHA `d67d6dcba0d09222d5432321335901159b13b318`; it was not rerun on the final development SHA because the later PR did not change the installation paths. These tests do **not** demonstrate live-agent behavior or real creator success.

**Acceptance still open:** the planned >=5 unfamiliar-user trials, completion/friction observations and independent retests are **NOT_RUN / deferred**. Owner-operated and synthetic testing must not be relabeled independent. **Owner decision and publication (2026-11-14):** the owner separately approved the limited approach and final stable software publication. [v2.3.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.3.0) was published at `4988f0c1b656691ea9368538a12ce6ca4a8134a1`. This exception changes release timing only; it does **not** mark unfamiliar-user acceptance PASS or waive future validation. The Last Light Production GO stays HOLD.

## V2.3 — Independent user validation

**User outcome:** people other than the project author can use the workflow without handholding.

- Recruit a small set of unfamiliar volunteer users or independent evaluators; test installation, task completion, comprehension of approvals and recovery.
- Record reproducible completion/failure outcomes, confusion points, time/steps and honest limitations; obtain consent for any published examples.
- Prioritize usability fixes demonstrated by evidence; avoid adding process solely to improve apparent test counts.
- **Exit:** an evidence-backed usability summary with actionable fixes and retests, not invented user feedback or adoption claims.

## V2.4 — Character and World Memory, continuity and Smart Film Repair

**Current implementation checkpoint (2026-11-15):** V2.4 Phases 1–4D have been merged into `main`; memory contracts, reviewer-evidence assessment, scoped repair authorization, manual handoff, and actual supplied-byte SHA-256 integrity are implemented within their stated limits. Actual media repair, independent visual/audio quality acceptance, and full external-agent acceptance remain **NOT_VERIFIED / NOT_RUN**. Phase 5 consolidates QA's duplicate generated runtime into the seven-skill `scripts/runtime.js` packaging convention; root `scripts/` remains canonical source. The historical phase notes below record their original review status and should not be mistaken for current open PRs. V2.4 limited software release was approved and reported published by the owner on 2026-11-15; the real-media acceptance gaps remain open and *The Last Light* Production GO remains HOLD.


### V2.4 Phase 4B — scoped repair proposal and reviewer-reported before/after evidence (implementation PR)

**Status: PROPOSED / NOT_MERGED.** Adds `prepareScopedRepair` and `reviewRepairEvidence` to the existing Smart Film Repair utility. The former requires an actionable diagnosis, affected locked shot, exact revision, and explicit shot-scoped USER evidence; it uses the existing Director authority mechanism to preserve the locked original and create a separate PROPOSED revision. The latter requires an existing authorized proposal and attributable before/after asset identifiers, claimed SHA-256 hashes and reviewer result. A reviewer MATCH is **not** verified visual PASS or user acceptance. These helpers do not execute image repair, verify bytes or reviewer identity, authenticate consent, approve the new revision, unlock the original or authorize provider jobs. The optional installed QA runtimes are regenerated from canonical sources and tested; agent-host invocation and actual visual repair remain separate work. *The Last Light* Production GO stays HOLD.

### V2.4 Phase 4A — Smart Film Repair diagnosis and conservative scope (implementation PR, pending review)

**Status: PROPOSED / NOT_MERGED.** The new read-only `planSmartRepair(project, {expected_revision, observations})` composes existing memory-consistency findings, reviewer-reported visual mismatches and `previewRepairImpact` dependency closure. It reports candidate affected and unaffected nodes, locked-shot impact, blockers and a next safe action. **It does not execute a repair or authorize an unlock.** A missing, invalid or incomplete target mapping blocks scoping; a syntactically valid graph is **not** proof that all real dependencies are recorded, so even `unaffected_candidates` are advisory only. No image pixels, asset SHA-256, reviewer identity or repair outcome are verified. Tests cover graph failures, version mismatch, protected locked assets and no mutation. Phase 4B still needs scoped authorization, actual repair execution adapters and before/after evidence, all separately gated. *The Last Light* Production GO remains HOLD.

### V2.4 Phase 3B — structured reviewer-evidence workflow (implementation PR, pending review)

**Status: PROPOSED / NOT_MERGED.** Adds `assessVisualContinuity(project, observations)` with deterministic tests. A human reviewer or independently authorized inspection adapter can submit a shot ID, versioned anchor ID, criterion, outcome and attributable source asset SHA-256, reviewer and review reference. The tool validates these records, links them to existing Project Bible anchors and returns structured mismatch candidates for future Smart Film Repair. `NOT_RUN` observations cannot masquerade as inspected evidence. **This helper does not load images, verify raw hashes, recognize characters or authenticate the reviewer**; reported matches are labeled `REVIEWER_MATCHES_REPORTED`, not visual PASS. Fresh SH01–SH05 direct image inspection remains **NOT_RUN**; motion and production remain **HOLD**. No automatic repair or provider use.

### V2.4 Phase 3B — visual evidence reconciliation (2026-11-15; review PR)

**Status: DOCUMENT_REVIEW COMPLETE / FRESH DIRECT IMAGE INSPECTION NOT_RUN.** The five correctly mapped SH01–SH05 repository PNGs and their Git blob identifiers were inventoried from GitHub metadata, but their image pixels could **not** be directly retrieved and inspected in this session. The historical [Phase 5F independent visual audit](case-studies/the-last-light/history/phase5f-independent-visual-audit.md) documents an earlier actual-image inspection **before** filename remapping; its findings are historical, not a new V2.4 inspection. The [Phase 5H evidence readiness report](case-studies/the-last-light/history/phase5h-continuity-evidence-readiness.md), [current keyframe provenance](case-studies/the-last-light/provenance.json) and [visual QA](case-studies/the-last-light/visual-qa.md) constrain all claims.

| Criterion | Historical evidence / current limit | V2.4 Phase 3B disposition |
| --- | --- | --- |
| SH01–SH05 inventory and identity | Five files exist with current SHA-1 Git blob IDs in provenance; Phase 5F documented historical shot-label rotation, subsequently corrected without modifying bytes | **PASS — metadata inventory only**; no fresh visual assessment |
| CHILD-01 identity and wardrobe, SH02–SH04 | Phase 5F qualitative similarity and repeated clothing/bag; exact identity, strap, fold and accessory alignment not locked | **PARTIAL — historical qualitative evidence**; fresh image inspection NOT_RUN |
| SPARK-01 uniqueness and custody | Single prominent spark in historical stills; no uninterrupted handoff or independent boundary frames | **NOT_VERIFIED** for physical/motion continuity |
| SH04 release before town activation | Historical close-up cannot establish hand separation before first major light; Phase 5H requires R2 strictly before R3 | **BLOCKED** pending attributable timecoded evidence |
| SH01/SH05 landmarks and camera geometry | Broad arch/tower/night similarity documented historically; pixel-exact geometry and approved axis absent | **PARTIAL / BLOCKED** for exact camera match |
| Town lighting | Phase 5G lighting rule permits faint practicals before release, major amber activation only after release | **RULE DOCUMENTED**; compliance across motion NOT_VERIFIED |
| SH03 eastward route and SH04 tower link | Geography/camera proposal is not approved as physical truth | **BLOCKED** pending approved map and spatial evidence |
| Visual asset hashes and provenance | Current Git blob SHA-1 recorded; current raw PNG SHA-256 absent in provenance | **PARTIAL**; do not equate Git blob SHA-1 with SHA-256 |
| Seven-skill execution and film acceptance | No complete independent trace or V2.4 visual execution | **NOT_VERIFIED**; no end-to-end PASS |

**Minimum next evidence to complete Phase 3B:** obtain accessible copies of the **existing** five repository PNGs, confirm their byte hashes, independently inspect and annotate character/wardrobe, spark, geography and lighting by shot, preserve reviewer/time/evidence references, and request separate owner approval for any revised geometry or media operation. Motion-dependent SH02/SH04 causality remains BLOCKED without independently attributable timecoded evidence; still frames cannot resolve it. Record PASS/FAIL/INDETERMINATE/BLOCKED/NOT_RUN individually, never infer a PASS from an earlier creative approval.

**Smart Film Repair handoff:** existing memory-consistency reports and historical visual findings may produce **repair proposals only**; do not change locked assets, auto-regenerate, spend credits or assert verified repairs. The Last Light Production GO remains **HOLD**. This documentation reconciliation changes no image, license, runtime, schema, tests, approval or release state.

### V2.4 Phase 3A — deterministic memory consistency checks (implementation PR, pending review)

**Status: PROPOSED / NOT_MERGED.** Adds a read-only `inspectMemoryConsistency(project)` helper and Node regressions for typed character/world anchor identity, conflicting kinds, divergent approved revisions, explicit stale/missing `anchor:ID@revision` references and missing reciprocal shot links. Legacy unversioned continuity references remain supported and are not silently reinterpreted. Reports are advisory, never auto-repair, and cannot authenticate approval, inspect image content or verify asset files. No additional specialist or memory store. Existing SH01–SH05 visual continuity comparison is **NOT_RUN** and requires a separate evidence-backed step; no new media generation. The Last Light Production GO remains HOLD.

### V2.4 Phase 2 — optional Character & World Memory contract (implementation PR, pending review)

**Status: PROPOSED / NOT_MERGED.** Introduces an optional `memory_anchors` array to the existing Project Bible v2.0 schema, runtime shape validation, checkpoint round-trip and negative tests. Anchor records have stable IDs, positive revisions, kind, status, description, explicit provenance, shot references and optional reference-asset identifiers. `APPROVED` requires recorded USER evidence; references are not visual inspection or proof of file existence. Existing projects without memory records remain valid; no extra skill or authoritative store is created. CI and independent visual validation are pending; no media generation or repair execution. The Last Light Production GO stays HOLD.

### V2.4 Phase 1 — source-backed baseline and gap assessment (2026-11-14)

**Status: INVESTIGATED / PROPOSED; implementation NOT_STARTED.** Baseline: `main` at `cecc686af3aa4e032eb34db6bb29100adc086209`. This is a read-only architecture assessment, not evidence of visual inspection, live-agent acceptance, media repair or release readiness. Phase 2+ requires separately reviewed implementation PRs. Preserve the existing Director, six specialists, Project Bible, authority contracts and no-provider path.

| Area | Verified existing source | Finding and V2.4 gap | Proposed next acceptance |
| --- | --- | --- | --- |
| Character/world anchors | [Visual Direction skill](../skills/film-visual-direction/SKILL.md), [Director continuity](../skills/universal-ai-film-director/references/continuity.md), [Project Bible template](../skills/universal-ai-film-director/assets/project-bible-template.md) | **PARTIAL:** stable IDs, wardrobe, locations, lighting, provenance and approvals are prescribed in text; no typed/versioned character/world anchor model or cross-shot reference validation established | Define backwards-compatible typed anchor identity/revision, actual reference provenance, allowed variants and shot links; test missing/conflicting anchors and manual correction |
| Canonical machine-readable state | [Project Bible schema](../contracts/project-bible.schema.json), [project contracts](../scripts/project-contracts.js) | **PARTIAL:** `continuity` and `decisions` are open object arrays; `dependency_graph` supports shot/audio/anchor IDs, but no anchor revision/reference fields or validated mapping to actual reference assets. Schema uses `additionalProperties:false` at project root | Propose minimal optional schema extension with migration/backward compatibility and tests; preserve existing v2.0 snapshots and all authorization=false defaults |
| Checkpoint portability | [Checkpoint envelope](../scripts/checkpoint-envelope.js), [project state](../skills/universal-ai-film-director/references/project-state.md) | **IMPLEMENTED within scope:** canonical JSON checksum, export/import and inspection exist. Checksum does not authenticate approvals, verify asset files or automatically persist state | Round-trip revised anchor records and provenance without altering gate evidence or claiming trusted cross-host memory |
| Repair impact | [Audio continuity and impact preview](../scripts/audio-continuity.js), [Director authority](../scripts/director-authority.js), [dependency regression](../tests/node/checkpoint-dependency.test.js) | **PARTIAL:** typed graph validates nodes/edges and `previewRepairImpact` traverses downstream dependents; `inspectPendingShotRevisions` conservatively reports immediate neighbors. Neither guarantees smallest safe replacement, accurate edges, actual asset changes or verification | Compare graph-based impact with fixture ground truth; prove minimal affected set, explicit unaffected locks, conservative unknown-edge behavior and separate scoped unlocks |
| Repair governance | [Localized repair procedure](../skills/film-continuity-qa/references/localized-repair.md), [QA skill](../skills/film-continuity-qa/SKILL.md), [Director authority](../scripts/director-authority.js) | **IMPLEMENTED as planning/approval rules; repair execution NOT_ESTABLISHED:** defects, proposals, user evidence, source locks and rollback are distinguished. A proposal never means applied/verified | Test defect → proposed repair → scoped authorization → preserved old revision → before/after inspection evidence, with no silent regeneration |
| Visual comparison | [Visual Direction skill](../skills/film-visual-direction/SKILL.md), [QA skill](../skills/film-continuity-qa/SKILL.md), [The Last Light case study](case-studies/the-last-light/README.md) | **NOT_VERIFIED for V2.4:** instructions support inspection of supplied media, but no independent SH01–SH05 comparison, measured identity consistency, reference confidence or after-repair visual evidence has been established in this assessment | Review legally accessible existing SH01–SH05 images for CHILD-01, SPARK-01, TOWER-01, wardrobe, geography, light and camera; capture evidence class, limitations and reviewer judgments; no new media generation |
| Regression baseline | [Node test suite](../tests/node/checkpoint-dependency.test.js), including `checkpoint-dependency.test.js`, `continuity-qa-cases.test.js` and `visual-direction-cases.test.js` | **EXISTS, V2.4-specific acceptance NOT_RUN:** targeted tests cover older contracts; no new V2.4 code or tests were run in this planning PR | Add deterministic identity/anchor conflict, graph minimality, locked-source immutability, checkpoint round-trip and negative authorization tests in implementation PRs |

**Proposed Phase 2–5 implementation order (not authorized by this planning PR):**

1. **Memory contract design:** reuse the Project Bible and existing `anchor` graph nodes; propose optional, versioned character/wardrobe/prop/location/look records, reference provenance, explicit unknowns and backward-compatible snapshots. Do not introduce a second authoritative memory store or new specialist skill.
2. **Memory invariants and tests:** stable IDs and revisions, conflicts, dependent shot references, explicit approval provenance, stale-reference detection and round-trip checkpoint tests. No perfect cross-model identity claim.
3. **Visual continuity evidence:** independent, documented comparison of existing permitted SH01–SH05 images with `DIRECT_INSPECTION` versus `DOCUMENT_CHECK` labels; no provider jobs or new assets. Missing comparisons remain `NOT_RUN`.
4. **Repair impact and safety:** improve graph-grounded, minimally scoped proposal reports; preserve unchanged locked revisions and assets, request scoped user authorization for any affected lock, and verify rollback/negative paths. Do not infer that an impact preview executed a repair.
5. **Acceptance and readiness:** fixture-backed before/after evidence, preserved asset identity, accurate PASS/FAIL/BLOCKED/NOT_RUN labels, compatibility and security checks, then separately approved V2.4 release decision.

**Open risks and stop rules:** incomplete/missing graph edges may understate impact; a shared character anchor can legitimately affect many shots; visual comparisons are subjective and cannot be replaced by textual assertions; asset provenance and rights must be verified before inspection or distribution; existing v2.0 checkpoints and all seven skill entrypoints must remain valid. No live providers, credits, accounts, production execution, media publication, release tag or release GO are authorized. **The Last Light Production GO remains HOLD.**



**User outcome:** more consistent creative outputs with explainable improvements and no damage to approved work.

- Expand representative creative regressions using stable comparison criteria; distinguish model-reviewed textual plans from visual film results.
- Independently compare existing SH01–SH05 keyframes for CHILD-01, SPARK-01, TOWER-01, wardrobe, lighting, geography and camera continuity.
- Validate before/after localized repairs, proving locked shots/assets are unchanged with inspectable evidence.
- **Exit:** repeatable acceptance results and concrete before/after evidence, including explicit FAIL/NOT_RUN when media or reviewers are unavailable.

## V2.5 — Intelligent Budget Director, production foundations and media QA

**Status: RELEASED (limited software scope, owner-confirmed).** The budget planner, read-only reconciliation, manual/local/mock job records, deterministic mock lifecycle, evidence-aware media metadata QA, optional recovery bundles and five-shot acceptance fixture are implemented. Automated deterministic CI passed; independent agent-host runs, decoded-media inspection and human creative acceptance remain NOT_VERIFIED. This release does not grant Production GO, provider access, spending or film publication.

**User outcome:** safely bridge planning to locally verifiable production steps, without making paid integrations mandatory.

- Build or validate optional provider-neutral job/artifact/budget/approval contracts and no-cost mock execution; use local tools only where available and justified.
- Inspect authorized existing V9 assets for transitions, timing, soundtrack and export quality; publication and rights remain separate gates.
- Research provider APIs, licensing, privacy, costs and reliability before proposing any adapter. A real provider call requires separate explicit authorization and a cost ceiling.
- **Exit:** reproducible no-cost prototype and truthful media QA where legally accessible; provider adapter delivery is **not** a release prerequisite.

## V2.6 — Templates, community readiness and Studio integration contracts

**Status: RELEASED — 2026-11-15 (limited software/planning scope).** Visual Film Studio is a separate application and repository in the same GitHub organization. This release remains skills-focused. Preserve all seven skills and existing approval, budget and recovery contracts.

**User outcome:** outside users can understand, adopt, extend and troubleshoot the skills library; external tools can consume its validated project state without coupling the library to a UI.

- Publish reusable filmmaking templates, concise maintained examples and a tested compatibility matrix, with limitations prominently stated.
- Define and test **versioned, UI-independent, mode-extensible integration contracts** for Project Bible, assets, approvals and workflow handoffs. Studio is a potential consumer, not part of this repository. Preserve explicit human approval and production permission boundaries.
- Define community gallery submission metadata, provenance and media-rights checks; do not build or host the gallery UI in this repository.
- Verify contribution guidance, skill validation and reproducible acceptance entry points; preserve modular architecture.
- Incorporate independent-user feedback and measure successful onboarding rather than GitHub popularity alone.
- **Out of scope:** static HTML viewer, Angular application, Studio interface, live-action workflow implementation, provider spending and unauthorized media generation.
- **Acceptance evidence (2026-11-15, reviewed against `main`):** Both maintained starter examples have deterministic timeline, template-link and approval-boundary tests (`tests/node/v26-starter-example.test.js`, `tests/node/v26-documentary-starter.test.js`). The versioned read-only Project Bible snapshot is tested for projection isolation, privacy and authorization boundaries (`tests/node/v26-project-snapshot.test.js`). All seven copied skill payloads and a standalone Node.js snapshot consumer have isolation regressions (`tests/node/v26-isolated-compatibility.test.js`); the existing Skills CLI local/public installation workflow checks byte-parity but does not prove native invocation on every agent host. The Director's three distributed schemas are checked against canonical contracts (`tests/node/v26-installed-contracts.test.js`, `scripts/build-skill-contracts.js --check`). All four canonical schemas now have CI-only Draft 2020-12 instance validation with positive/negative cases and a cross-file handoff reference (`tests/schema/validate-instances.js`); Ajv is not a distributed skill dependency. Community metadata/provenance invariants have regression coverage, but there is no hosted gallery or independently reviewed rights submission. The final PR #265 head passed Validate skill, Secret scan, CodeQL and Private pre-production validation; post-merge `main` checks were still in progress at review time. The main-to-develop sync workflow reported success on the final PR head. These results demonstrate deterministic software checks, **not** real Studio integration, an independently measured unfamiliar-user onboarding trial, universal agent-host compatibility or real-media quality. No provider spend, Studio UI, production authorization or release is implied.

**V2.6 release gates (revised owner decision, 2026-11-15):** V2.6 may be considered for a normal stable release once its existing automated regression, package/payload, portable installation smoke, contract/schema, security and release-candidate checks pass with no unresolved critical regression. Record exact checks and candidate commit before approval; a historical green run does not replace verification of the release candidate. **Independent unfamiliar-user onboarding is deferred to V2.7, not silently marked PASS**: V2.6 ships with independent onboarding **NOT_RUN**, actual Studio application integration **NOT_VERIFIED**, universal agent-host compatibility **NOT_VERIFIED**, and real-media quality **NOT_VERIFIED**. The tested versioned, UI-independent integration contracts are V2.6 scope; an actual Studio consumer remains on the separate Studio roadmap. Owner-only trials, CI installation smoke and synthetic transcripts must not be presented as independent acceptance. No provider spending, unauthorized media generation or production permission is implied. The owner explicitly approved and published the v2.6.0 software release; future releases still require separate approval.

**Release exit (owner-approved limited scope):** reproducible maintained templates/examples, documented contributor and onboarding paths, tested portable contracts, and passing candidate-level technical/security gates. Clearly disclose deferred external acceptance and compatibility limitations in release notes; critical technical failures block release. Studio milestones and releases remain separate.

## Existing V2.1 milestone traceability

The previous V2.1 candidate scope is **redistributed, not deleted**:

| Previous milestone | New target | Rationale |
| --- | --- | --- |
| V21-1 Two-host skill portability | **V2.1** | First-use credibility |
| V21-2 Director/specialist orchestration | **V2.2** | Full workflow correctness |
| V21-3 Trusted recovery | **V2.2** | Approval-safe continuity |
| V21-4 Image/prop continuity | **V2.4** | Evidence-driven visual quality |
| V21-5 Localized video repair | **V2.4** | Preserve locked assets |
| V21-6 Sound/export QA | **V2.5** | Actual media inspection and rights dependencies |
| V21-7 Quality and portability regressions | **V2.1–V2.5** | Tests follow the capabilities they verify |

Historical phase mapping: architecture and planning tests → V2.0 baseline; five-keyframe pilot → V2.4; localized repair → V2.4; recovery → V2.2; video/sound/export → V2.5; portability → V2.1; user validation and community adoption → V2.3/V2.6.

## Delivery and change control

1. **Two permanent branches:** `main` for V2.x integration and `develop` for V3 research. Use short-lived scoped branches and owner-reviewed PRs; main-to-develop synchronization is proposed by PR, never auto-merged. Do not merge without explicit owner approval. Release tags remain immutable. See [development governance](DEVELOPMENT.md).
2. **No documentation proliferation:** update this canonical roadmap and existing README/installation/architecture/test evidence; preserve core skills, schemas, benchmarks and case-study evidence. Do not create per-PR administrative reports.
3. **No simulated evidence:** distinguish implementation, CI checks, independent host runs, human-reviewed footage, external-user trials and authorization. Record exact PR/commit and relevant logs for milestone closure.
4. **Separate approvals:** PR merge, software release, creative decisions, provider access, paid execution and film publication are different gates. **Production GO remains HOLD**.
5. **Release gate:** only create a tag or GitHub release after exact-SHA validation, applicable security/rights review and separate owner authorization. No permanent release branch required.
6. **Next practical step (current):** execute V2.7 comprehensive testing against released V2.6 and reconcile deferred V2.3–V2.6 independent-user, cross-host and real-media evidence; Studio S0 proceeds independently. V3.0–V3.4 remain proposals, not implementation GO.


## Two-year product roadmap — November 2026 to November 2028

**Product mission:** make Universal AI Film Director a creator-controlled, agent-agnostic, provider-neutral filmmaking system that helps people move from an idea to a consistent finished film, including low-budget and manual production. **All seven product capabilities below are committed roadmap objectives**, subject to engineering feasibility, user evidence, legal rights and explicit owner-approved PRs. The exact release boundaries and implementation designs may change; this roadmap does not authorize provider spending, deployment, account connections or film publication.

**North-star outcome:** independent creators repeatedly finish and improve films using the system. **Aspirational visibility target: 500,000 GitHub stars by November 2028.** This is an extreme stretch target, not a forecast or release acceptance criterion. Never substitute stars for active use, film completion or retention.

### Delivery coordination

The **Release direction** table above is the single authoritative version/date/feature schedule. The detailed V2.x sections below define existing acceptance gates; the capability descriptions here add product requirements. Do not maintain a second schedule table.

### Seven product capabilities — required outcomes

1. **Character and World Memory:** versioned character, wardrobe, prop, location and visual-style anchors linked to Project Bible decisions; visual mismatch reporting, reviewable confidence and human correction. No unsupported promise of perfect cross-model identity.
2. **Smart Film Repair:** identify the smallest affected asset/dependency set, propose targeted audio/video/transition repairs, preserve approved unaffected assets and verify before/after outputs.
3. **Intelligent Budget Director:** per-shot cost estimates, source/date/currency/uncertainty, user-configurable ceilings, manual/free alternatives and explicit authorization for every external job.
4. **Templates and Community Gallery:** runnable example workflows for shorts, ads, education and trailers; reproducible outputs, contributor instructions and clear media permissions.
5. **Visual Film Studio:** optional accessible, local-first screenplay/storyboard/asset/approval viewer, later editable project workspace; no forced account, cloud hosting or replacement of CLI/skills.
6. **Provider-Neutral Production Engine:** adapter interfaces for image, video, audio and editing; start with local/manual/mock, then opt-in lawful provider integrations after feasibility, permissions and cost review.
7. **Persistent AI Director:** portable, versioned, recoverable project state with approval provenance, safe conflict handling, cross-session resume and host-independent handoffs; never silently approve or override locked work.

### Growth and distribution plan (workstream alongside development)

| Period | Actions | Evidence to track |
| --- | --- | --- |
| **First 90 days** | Improve one-minute quickstart, release one short reproducible demo, recruit 5–10 outside testers, publish clear compatibility evidence | Install-to-first-plan conversion, task completion, failures, user interviews |
| **Months 4–9** | Publish 3–5 permission-cleared example films/workflows; demonstrate continuity and repair before/after; invite creators and agent-host maintainers to test | Independent completed projects, weekly active creators, return usage, issues and contributions |
| **Months 10–18** | Launch accessible local-first viewer and template gallery; collaborate with small filmmaking communities; publish honest comparison benchmarks | Activation, retention, completed films, external contributors, documentation-to-use conversion |
| **Months 19–24** | Share end-to-end studio demos, integrations and real user case studies; organize community contributions and release showcases | Monthly active creators, repeat projects, successful production/export, contributor retention, organic referrals |

**Measurement discipline:** GitHub stars/forks are public awareness indicators only. Do not equate clone/download counts with unique users. Collect privacy-respecting opt-in telemetry or voluntary anonymous feedback only; publish metric definitions and evidence. Review adoption quarterly and adjust distribution tactics without inventing growth.

### Engineering and governance guardrails

- Retain all seven existing skill entrypoints, contracts and production methodology; evolve rather than rewrite. Keep one canonical roadmap and update existing documentation instead of proliferating status files.
- Preserve human approval for screenplay, visual direction, storyboard, external generation, spending and publication. Unknown or conflicting approval is HOLD.
- Keep a usable no-cost/manual/local path, avoid mandatory API keys, and support multiple agent hosts with tested compatibility claims only.
- All code changes use scoped branches and owner-reviewed PRs. V2.x delivery targets `main`; V3 research targets `develop`, with explicit reviewed synchronization and no automatic merge assumptions.
- Validate accessibility, privacy, security, media rights, project migration, deterministic regressions and honest provider limitations before each major release.
- The 500,000-star ambition is **not** a basis for claiming guaranteed adoption, cutting safety checks or promising an autonomous film-generation capability that does not exist.

### V2.4 Phase 4C — manual/local repair handoff (implementation PR)
### V2.4 Phase 4C — manual/local repair handoff (implementation PR)

**Status: PROPOSED / NOT_MERGED.** The QA runtime can prepare a provider-neutral, copy-only repair contract for an explicitly authorized proposed shot revision. It names immutable assets, output, rollback and acceptance checks; a separate helper records reviewer-reported outcomes. No provider jobs, media editing, actual checksum verification, image inspection, automatic acceptance or production permission are implemented. Independent repaired-media validation remains an explicit gate. The Last Light Production GO stays HOLD.

### V2.4 Phase 4D — actual byte integrity (implementation PR)

**Status: PROPOSED / NOT_MERGED.** Installed QA can hash supplied real original and candidate bytes, verify expected SHA-256 values and detect unchanged content for an exact scoped repair handoff. This is **byte-level integrity only**: no filesystem-origin authentication, visual/audio interpretation, edit-boundary inspection, full-film validation, repair execution or automatic acceptance. Human media inspection and separate user acceptance remain required; The Last Light Production GO remains HOLD.


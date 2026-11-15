# Changelog

This repository follows Keep a Changelog and semantic versioning. The working
tree contains one current implementation; past versions are preserved by Git
tags, not by duplicated skill source folders.

## [Unreleased]

### V2.5.0 release candidate — NOT RELEASED
- Added read-only Intelligent Budget Director estimates, explicit cost provenance, unknown-cost and ceiling safeguards, and budget-to-job reconciliation.
- Added provider-neutral manual/local/mock job records, deterministic mock retry/idempotency, and synthetic-only mock artifact manifests.
- Added declared duration, resolution, frame-rate, audio-track, provenance and export QA classification. Metadata checks do not inspect actual media bytes.
- Added optional integrity-checked Project Bible plus job-ledger recovery bundles while preserving legacy checkpoints and operational HOLD.
- Added five-shot 30-second The Last Light deterministic acceptance fixtures, with no media generation or provider execution.
- Verified post-merge `main` CI on `a730c58cc678c74fb402892fd65c3d3eab140a7e`: Validate skill, private pre-production, secret scan and CLI install passed. CodeQL passed on Phase 5 PR head, but a separate post-merge CodeQL run was not established.
- **Deferred:** independent complete agent-host transcripts, actual decoded-media inspection, human film quality acceptance, and any production/provider authorization. V2.5.0 publication remains HOLD pending separate owner approval.


### Documentation (unreleased)
- Align the canonical release table and public README with the owner-approved **proposed** V3.0–V3.4 dual-mode/live-action roadmap and future V4 candidate. These are planning milestones, not shipped capabilities.
- Correct the V2.4 release badge target and stale V2.4 next-step wording; preserve all deferred acceptance gates.

## [2.4.0] — 2026-11-15 (owner-confirmed limited release)

Owner reported publishing [v2.4.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.4.0) after explicitly approving a limited software release. Published tag metadata was not independently retrievable in this documentation pass. The historical preparation notes below describe the pre-release evidence state, not a current V2.4 software-release HOLD.

### Added
- V2.4 Character & World Memory and conservative visual continuity assessment, with deterministic contracts and regression coverage (Phases 1–3).
- Smart Film Repair planning and scoped authorization, provider-neutral manual repair handoff, and caller-supplied candidate-byte SHA-256 verification (Phases 4A–4D; PRs #214, #216 and #218).
- Generated optional Node.js runtimes for the Director and all six specialist skill packages, based on canonical root implementations (PR #212).

### Changed
- Installed skill guidance now uses the self-contained `scripts/runtime.js` entry point rather than root-only scripts (PR #214).
- Consolidated QA runtime packaging to one `scripts/runtime.js` and retired its redundant generated `continuity-runtime.js` and dedicated builder (PR #220). Consumers directly importing the legacy path must migrate.

### Evidence and limitations
- GitHub `main` push checks at `f089a44639ca4a7581f671e07fafa23ed1648547` reported success for Validate skill, Gitleaks and CodeQL. The local Skills CLI installation and pre-production workflows were **not independently confirmed for that main push**.
- Four failed pull-request workflow runs on that SHA belonged to the automatic `main` → `develop` synchronization PR #221; GitHub reported zero jobs for those runs. They are **not evidence of failed V2.4 tests**, but their failure status remains unexplained.
- Independent end-to-end agent acceptance, real-media before/after repair, unchanged locked-asset inspection and release-specific clean-host compatibility remain **NOT_VERIFIED / NOT_RUN**. Byte integrity is not visual/audio quality or provenance verification.
- V2.4.0 software release was subsequently approved and reported published on 2026-11-15, with these limitations disclosed. *The Last Light* Production GO remains **HOLD**; no provider jobs, paid execution or film publication are authorized.

### V2.4 historical release-candidate readiness (preparation recorded 2026-11-15)
- **Candidate scope:** Character & World Memory, conservative visual-continuity reporting, Smart Film Repair planning/scoped authorization, manual repair handoff and caller-supplied byte-integrity verification, plus portable skill runtimes. These are software/planning capabilities, **not** automatic video repair or professional animation generation.
- **Previously verified technical baseline:** `83e7324294f7436df381603a341030d5a501aeb2` — hosted Validate skill, secret scan, CodeQL, Skills CLI installation smoke and private pre-production validation reported PASS. The checks are scoped to that commit and cannot be silently transferred to a newer release candidate.
- **Current roadmap merge:** PR #224 added V2.7 as the complete integrated workflow acceptance milestone; V2.4–V2.6 retain feature-specific safety, CI, compatibility and release gates. V2.7 does **not** mark missing V2.4 evidence PASS.
- **Deferred / not verified:** independent real-media visual continuity; convincing before/after repaired animation; independent complete agent-host workflow; human-verified unchanged locked media; any claim of autonomous film production. The unsuccessful SH04 manual cutout pilot must not be counted as successful visual repair evidence.
- **Required before owner release decision:** confirm exact intended release commit and its full required GitHub Actions results; verify packaged skill installation at that commit; review security, compatibility, changelog and media-rights scope; explicitly accept or resolve the remaining V2.4 feature-specific visual acceptance limitations. A limited software release may only be considered with clear public disclosure and a separate owner GO.
- **Historical decision at preparation time:** RELEASE HOLD. The owner subsequently authorized and reported publishing the limited V2.4 software release; media generation, provider jobs, paid execution, account connections and *The Last Light* Production GO remain unauthorized.

## [2.3.0] — 2026-11-14

Stable software release: [v2.3.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.3.0), tagged at `4988f0c1b656691ea9368538a12ce6ca4a8134a1`.



### Added
- V2.3 beginner first-film walkthrough and README handoff: no-cost text-only planning, one-question discovery, distinct screenplay/Visual Bible/storyboard approvals and checkpoint-based resumption (#185).
- Deterministic documentation, beginner-safety and 30-second text-only journey regressions for approval integrity, timing, sound continuity, checkpoint recovery and refusal of unsupported media claims (#185, #187, #191).

### Changed
- Director first-turn guidance: propose a concise screenplay for a usable non-sensitive brief; otherwise ask one pivotal question, preserve disclosure safeguards and state one next action (#189).
- Public Skills CLI smoke test now compares public installations with public `main`, while local checkout verification checks PR changes (#189).

### Evidence and limitations
- Hosted Validate skill, Secret scan, CodeQL and private pre-production checks passed at development SHA `c977b2834dd5f62626473623988fa67f64a4cc35`. Public Skills CLI smoke passed on preceding merge `d67d6dcba0d09222d5432321335901159b13b318`. See [V2.3 evidence and acceptance](docs/ROADMAP.md#v23--development-evidence-and-outstanding-acceptance).
- These checks are deterministic or installation checks, **not** independent unfamiliar-user acceptance or live end-to-end agent execution. The planned >=5 unfamiliar-user tests remain **NOT_RUN / deferred**.
- Owner approved and published a **limited v2.3.0 software release** with the independent-user acceptance gate explicitly deferred, **not passed**. The Last Light Production GO remains HOLD; no media, provider jobs or film publication are authorized.

## [2.2.0] — 2026-11-14

### Added
- Strengthen checkpoint approval-integrity diagnostics and pending scoped-revision dependency review using the existing recovery and persistence helpers.
- Focused text-only acceptance for genuine The Last Light revision 9 recovery, rejection by non-application and synthetic scoped authorization preserving locked-source lineage.
- Separate clean-context Continuity QA, evaluator and Director reconciliation: three injected SH01/SH04/SH05 defects detected, with minimal PROPOSED text repairs preserving upstream approvals.

### Fixed
- Align checkpoint/audio repair dependency references with typed kind:id identifiers; reject ambiguous legacy references.

### Release decision and limitations
- Owner accepted focused Phase 5–6 evidence and limitations on 2026-11-14. Stable V2.2.0 was published from commit `5047ac031770c576978eba30d19178b893127438`; the release does not upgrade incomplete acceptance evidence to PASS.
- Standard local Node.js entrypoints remain host-blocked by EPERM; full independent Phase 6 acceptance is incomplete; no rendered-media verification claimed. Passing hosted CI is separate evidence, not retroactive local PASS.
- Preserve all seven skills, contracts, approved project state, SH05 production-validation deferral and false operational flags. The Last Light Production GO remains HOLD.

[GitHub release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.2.0). See the [existing V2 release checklist](docs/releases/v2.0.0-checklist.md#v220-release-preparation--owner-accepted-focused-evidence) for evidence hashes and observed validation. V2.3.0 independent onboarding is the next planned milestone.

## [2.1.0] — 2026-11-07

### Changed
- Improve beginner-facing installation guidance and collect owner-operated Codex and OpenCode skill-use evidence, including complete exported session records independently reviewed for a scoped 30-second planning test.
- Confirm real loading of Director, Storytelling and Visual Direction on two Windows hosts: Codex via successful file reads and OpenCode via native `skill` tool calls, with approval-safe proposals and no media generation.
- Document limits: installed Git revision not pinned in host exports; independent unfamiliar-user onboarding and native Director-to-specialist delegation not established. No raw private session logs are published.

V2.1.0 was published on 2026-11-07 from commit `7e7c264ff3496f28962e402b2bf795d181a15daa`. [GitHub release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.1.0).

## [2.0.0] — 2026-11-04

### Added
- Add a Storytelling Creative Quality Gate to review audience attention, narration-versus-reading, payoff pacing, beat feasibility and redundancy before Director handoff, with an optional planning-only preflight checker and regression scenarios. No screenplay auto-approval or real-media claim.
- Deepen the Storytelling specialist with filmable short-form dramatic construction, visible choices, emotional motifs, genre adaptation, narrator timing assumptions, constructive story editing and two new worked stories, while preserving user approvals.
- Add Director creative judgment guidance for emotional arcs, visual-first filmmaking, thoughtful recommendations, professional trade-offs, sensitive personal stories and two filmable worked examples, with regression checks protecting approval and media boundaries.
- Extend the planning-only pipeline with explicit narration coverage and intentional-silence validation, cross-track audio mixing rules, dependency graph integrity and non-mutating, scoped repair impact previews.
- Introduce deterministic, provider-free Production Pipeline Core with single-step stage transitions, user-approval dependencies, exact cut-only shot timeline validation, optimistic project revisions and blocked media execution. Include negative regression tests.
- Add eight filmmaking quality scenarios with anchored nine-dimension v1.0.0/v2 blind-review comparison, human evidence capture format and offline reporting of regressions, ties and improvements. No agent outcomes are simulated.
- Add V2-03 cross-agent acceptance manifest (14 cases spanning all seven skills) and offline evidence-aware reporting with PASS/FAIL/BLOCKED/NOT_RUN; missing real-agent captures remain NOT_RUN, never simulated PASS.
- Add deterministic Director authority contract for exact user approval gates, scoped locked-shot revisions, recorded-only external permissions and honest checkpoint recovery, with synthetic negative tests; no provider execution.
- Transfer 31 original v1 cinematic direction procedures, generator reference guides and output templates into their responsible specialist skills, with progressive-disclosure references and parity tests. No duplicate root runtime tree.

### Changed
- Publish the repository and verify public GitHub installation of all seven skills using the pinned Skills CLI in CI; this does not verify live host invocation.
- Record V2 release safety, rights and provenance review gaps, keeping the V9 film a proposed screening candidate and production authorization on HOLD.
- Separate MIT-licensed code and seven skills from five ChatGPT reference keyframes under non-MIT media terms; remove the Google Flow/Veo V9 MP4 from the current V2 source tree while acknowledging it may remain reachable through Git history.
- Add a user-facing nine-stage production workflow and modular Director/specialist architecture diagrams to README, with explicit user approvals, generation permission boundaries and single-agent fallback.
- Make direct GitHub Skills CLI installation the primary public Quick Start, with one-command Director, all-skills, list and specialist examples; retain Git clone as optional development path and document public GitHub access without claiming unverified host invocation.
- Add task-specific worked filmmaking examples for all seven skills and validate README installation/release discoverability, user approval boundaries and negative media-claim scenarios.
- Replace maintainer-focused README with user-first filmmaking overview, public GitHub installation commands, current release and development badges, professional workflow examples, agent compatibility and FAQ.
- Replace the v1 monolithic root skill and mirrored package with one clean,
  portable Director and six specialist Agent Skills (Story, Visual Direction,
  Cinematography, Video Production, Sound, Continuity/QA).
- Keep canonical current Project Bible and proposal contracts in `contracts/`;
  remove obsolete top-level `SKILL.md`, `engine/`, `adapters/`,
  `references/`, `schemas/`, `templates/` and example-runtime duplication.
- Rework README, architecture, installation, CI and Node.js validation for
  the modular single-source skill tree and no mandatory provider integration.

### Fixed
- Remove version-specific code directories and stale v1 release-candidate
  claims from active documentation while maintaining historical release tags.

## [1.0.0] — 2026-11-01

First private release: portable instruction-driven film direction, Project
Bible, story/visual/storyboard approval gates, shot planning and continuity,
audio cues, local skill package tests and provider-aware prompting.
The release did **not** include a verified autonomous generated film.
See the immutable [v1.0.0 release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0)
for its exact source code, documentation and historical changelog.

## [0.1.0] — 2026-11-01

Initial provider-neutral filmmaking workflow.

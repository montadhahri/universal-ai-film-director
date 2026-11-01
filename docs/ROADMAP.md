# Development roadmap

This is the maintained plan for **Universal AI Film Director**. Phases are
delivered through separate feature branches and reviewed Pull Requests. A phase
is marked complete only after its PR is merged into `main`. Scope and dates
are proposals, not delivery guarantees.

| Phase | Milestone | Status | PR |
| --- | --- | --- | --- |
| 1 | Repository safety and regression tests | Merged | [#1](https://github.com/montadhahri/universal-ai-film-director/pull/1) |
| 2 | Intelligent Director Engine | Merged | [#2](https://github.com/montadhahri/universal-ai-film-director/pull/2) |
| 3 | Production memory and continuity | Merged | [PR #4](https://github.com/montadhahri/universal-ai-film-director/pull/4) |
| 4 | Cinematography and shot planning | Merged | [PR #6](https://github.com/montadhahri/universal-ai-film-director/pull/6) |
| 5 | Audio, narration and synchronization | Merged | [PR #7](https://github.com/montadhahri/universal-ai-film-director/pull/7) |
| 6 | Intelligent QA and localized repair | Merged | [PR #8](https://github.com/montadhahri/universal-ai-film-director/pull/8) |
| 7 | Generator and agent compatibility | Merged | [PR #9](https://github.com/montadhahri/universal-ai-film-director/pull/9) |
| 8 | Flagship demo and v1.0 readiness | Merged; v1.0.0 privately released | [PR #10](https://github.com/montadhahri/universal-ai-film-director/pull/10) |

## Phase 1 — Repository safety and regression tests (merged)

- Protected baseline of existing files; fail CI when baseline paths disappear.
- Negative and multi-turn evaluator regression tests.
- GitHub Actions checks and documentation.
- **Limits:** preservation checks do not prove semantic correctness; synthetic
  transcript checks do not prove model behavior.

## Phase 2 — Intelligent Director Engine (merged)

- Director decision procedure and evidence hierarchy.
- Adaptive, one-question-at-a-time discovery.
- Creative trade-offs, approval and conflict handling.
- Static integration tests for instruction contracts.

## Phase 3 — Production memory and continuity (merged)

- Versioned Project Bible and explicit decision provenance.
- Shot lifecycle: DRAFT, PROPOSED, APPROVED, LOCKED, NEEDS_FIX.
- Character, style, location and asset identity continuity.
- Checkpoints, handoffs, dependency tracking and narrow unlock requests.
- **Acceptance:** a documented checkpoint permits safe resumption without
  silent changes to locked decisions.

## Phase 4 — Professional cinematography and shot planning

- Shot sizes, framing, movement, blocking, lighting and composition.
- Storyboard-to-shot mapping and transitions.
- Narration/visual duration budgets and pacing.
- Generator-aware shot packets with explicit limitations.
- **Acceptance:** each shot has a narrative purpose, duration and transition plan.

## Phase 5 — Audio, narration and synchronization

- Voice-over, dialogue, dubbing and language-specific considerations.
- Timeline/cue sheets, music and SFX transitions, planned silence.
- Narration duration assumptions and synchronization checks.
- Audio-only repairs that preserve locked visuals.
- **Acceptance:** the plan covers the complete audio timeline and identifies gaps.

## Phase 6 — Intelligent QA and localized repair

- Defect taxonomy: frozen/repeated frames, missing shots, audio dropouts,
  transitions and continuity defects.
- Evidence-aware diagnosis and minimal affected-asset repair.
- Locked-shot preservation, review records and final completeness checks.
- **Acceptance:** a repair proposal explicitly lists what changes and what stays.

## Phase 7 — Generator and agent compatibility

- Improve Google Flow/Veo instructions and capability matrix.
- Optional additional generator adapters backed by current documentation.
- Real-agent compatibility scenarios and transparent test provenance.
- **Acceptance:** distinguish documented capabilities, tested behavior and
  unverified assumptions; do not imply unsupported integrations.

## Phase 8 — Flagship demo and v1.0 release

- Complete example: discovery, approvals, script, visual bible, storyboard,
  shot prompts, audio, review, repair and delivery plan.
- Installation, onboarding and troubleshooting improvements.
- Release checklist, versioning and reproducible validation.
- **Acceptance:** a new user can follow the workflow with documented external
  tools; actual media execution is claimed only when performed.

## Delivery and versioning policy

1. Create a new branch from the latest `main`; never push directly to `main`.
2. Preserve existing files and functionality unless the owner explicitly approves
   a change. Run baseline preservation and regression checks.
3. Update [CHANGELOG.md](../CHANGELOG.md) in **the same PR** as every user-facing
   or engineering change; add entries under **Unreleased**.
4. Open a PR with scope, file inventory, tests actually run, limitations and risks.
5. Wait for owner approval before merging; review CI results.
6. When preparing a release, move the relevant Unreleased entries to a dated
   semantic-version heading; create a tag/release only with owner approval.
7. Keep roadmap status aligned with merged PRs, not planned work.

## v1.0.0 finalization — current evidence and open gates

The initial eight development phases have merged. Repository professionalization
and Python-free migration have merged through PR #23. This section supersedes
the now-completed migration plan without erasing its history in Git.

| Workstream | Evidence | Status |
| --- | --- | --- |
| Python-free maintainers and regression suite | PRs #14–#18, Node.js CI | COMPLETE |
| Skill contract review and Project Bible | PRs #19, #23 | COMPLETE |
| Runtime-only 34-file skill distribution | PR #20, package allowlist + byte parity | COMPLETE |
| Real Skills CLI **local-folder** install | PR #21, CLI smoke CI | VERIFIED LOCALLY |
| Authenticated remote install from private GitHub URL | No recorded execution | NOT TESTED |
| Independent AI agent loading skill and respecting gates | User-provided Codex/Work checkpoint records loaded references and three approvals; independent report not yet merged | PARTIAL EVIDENCE |
| High-quality AI-generated 30s film using the skill | No accepted output; PR #22 rejected | NOT DONE |
| Versioned private GitHub v1.0.0 release | Tag and release published, 1 Nov 2026 | COMPLETE |
| Public launch / media-generation PROD GO | Separate authorization required | HOLD |

### v2.0.0 design direction (planning only)

The private [v1.0.0 release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0)
is the compatibility baseline. See the [v2 modular skills roadmap](V2-ROADMAP.md)
and its [Codex skill-creator audit](V2-SKILL-CREATOR-AUDIT.md).
These are design proposals only, not v2 runtime changes or production authorization.

**No new tags, public publishing, visibility changes or PROD GO** without
separate explicit owner authorization. The existing v1.0.0 private tag is published.

## Pre-production validation (after Phase 8; NOT a release)

All eight implementation phases have merged and the maintainer migration has finished. Private repository validation is
tracked separately from production authorization. See
[private pre-production validation](private-preprod-validation.md).
**Production GO is not authorized**; no public repository change or release tag
is planned. Offline tests, authenticated private installation and real-agent
acceptance each require their own evidence.

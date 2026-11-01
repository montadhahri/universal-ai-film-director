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
| 5 | Audio, narration and synchronization | In review | [PR #7](https://github.com/montadhahri/universal-ai-film-director/pull/7) |
| 6 | Intelligent QA and localized repair | Planned | — |
| 7 | Generator and agent compatibility | Planned | — |
| 8 | Flagship demo and v1.0 readiness | Planned | — |

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

## Indicative remaining effort

Phase 3: 1–2 weeks; Phase 4: 1–2 weeks; Phase 5: 1–2 weeks;
Phase 6: 1–2 weeks; Phase 7: 2–3 weeks; Phase 8: 1–2 weeks.
These are rough estimates, not a scheduled commitment.

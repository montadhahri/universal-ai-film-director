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
| 8 | Flagship demo and v1.0 readiness | Merged — release not approved | [PR #10](https://github.com/montadhahri/universal-ai-film-director/pull/10) |

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

## Next roadmap — repository professionalization first (proposed)

**Status:** approved and in progress through reviewed PRs; Python-free
maintainer migration is being completed in a separately reviewed cleanup PR. All eight original implementation phases
are merged. The repository remains **PRIVATE** and **PROD GO is on hold**.

The next sequence prioritizes clean, maintainable source and reproducible
checks **before** installation, real-agent acceptance, or release.

| Order | Workstream | Priority | Exit criterion |
| --- | --- | --- | --- |
| 1 | Python-free maintainer tooling | P0 | Node.js-based checks reproduce all existing safety, regression, fixture and offline-validation coverage |
| 2 | Repository structure and quality cleanup | P0 | Clear runtime/maintainer boundaries, consistent naming, documentation and CI; no orphaned references |
| 3 | Minimal skill packaging | P0 | A reproducible, reference-complete skill payload excludes development-only files when supported |
| 4 | Authenticated private installation verification | P0 | Actual `npx skills add` discovery and installation checked with private credentials |
| 5 | Real-agent integration validation | P1 | Recorded results for supported agents, including failures and untested agents |
| 6 | End-to-end filmmaking acceptance | P1 | Real evidence for approvals, continuity, audio and localized repair; synthetic results labeled |
| 7 | Security, reliability and release-candidate audit | P1 | Privacy, permissions, failure recovery and release gates reviewed; owner decides separately on PROD GO |

### Workstream 1 — Python-free maintainer tooling (FIRST)

**Original inventory:** 13 `.py` files under `tests/`, used for structure
validation, protected-file preservation, regression tests, synthetic behavior
fixtures and offline pre-production validation. Node.js counterparts were
added in PRs #14–#16 and parity was checked in PR #17. Python is **not** a runtime
dependency of the Agent Skill.

**Target:** use Node.js built-in `node:test`, `node:assert/strict` and
standard-library filesystem/process utilities. Prefer **no npm test
dependencies**. Keep `SKILL.md` and its referenced resources plain Markdown;
the skill must not require Node.js to run after installation.

**Migration plan (separate implementation PRs):**

1. Inventory every Python script, assertion, fixture and GitHub Actions caller.
   Record a baseline count and behavior for existing checks.
2. Port structure, links and protected-file checks to JavaScript; compare
   results against the existing Python implementation.
3. Port regression tests and synthetic behavior evaluator with the same
   positive, negative and multi-turn fixtures. Preserve the explicit
   distinction between synthetic evaluation and real-agent execution.
4. Port offline pre-production runner and machine-readable JSON reports.
   Update CI workflows and maintainer documentation to use Node.js.
5. Run old and new checks side by side. Confirm equivalent or stronger
   assertions, nonzero failure exits and artifact outputs.
6. Propose removal of the 13 superseded Python scripts in a **separate cleanup
   PR requiring explicit owner approval**, update the protected-file baseline
   and verify all Node-only CI, links and report consumers.

**Acceptance:** green CI; zero Python runtime dependencies; no lost checks;
no accidental file deletions; reproducible reports; all changes reviewed in
PRs. A JavaScript rewrite by itself does not prove behavioral equivalence.

### Workstream 2 — Repository structure and quality cleanup

- Define and document **skill runtime files** versus **maintainer-only files**.
- Review README, installation docs, examples, schemas, paths and naming.
- Standardize scripts, CI naming and developer contribution instructions.
- Remove duplication or obsolete files **only with explicit owner approval**
  and protected-file baseline updates.
- Keep backward compatibility and existing working skill behavior.

### Workstream 3 — Minimal skill packaging

- Determine the exact resource graph from `SKILL.md`.
- Investigate a single-source package containing the entry point and
  required `engine/`, `references/`, `templates/`, `adapters/` and
  schemas. Do not assume the Skills CLI excludes `tests/` automatically.
- Verify packaging against a private repository without publishing it.

### Workstreams 4–7 — Validation and release preparation

After repository cleanup and packaging, validate authenticated private
installation, then real-agent behavior, then real filmmaking workflows.
Record evidence and limitations. Complete security/reliability review
before proposing any release candidate. **No tag, publication, repository
visibility change or PROD GO without a separate explicit owner decision.**

## Pre-production validation (after Phase 8; NOT a release)

All eight implementation phases have merged. Private repository validation is
tracked separately from production authorization. See
[private pre-production validation](private-preprod-validation.md).
**Production GO is not authorized**; no public repository change or release tag
is planned. Offline tests, authenticated private installation and real-agent
acceptance each require their own evidence.

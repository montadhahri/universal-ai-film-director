# Changelog

Notable changes to Universal AI Film Director are documented here.
Entries follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
categories and use semantic versioning for releases. Work merged after
v0.1.0 is listed under **Unreleased** until a release is explicitly approved.

## [Unreleased]

### Fixed
- Repair two package-related Markdown link failures: link to the installable `SKILL.md` rather than a directory, and keep the packaged agent compatibility reference self-contained (PR #20 CI fix).
- Fix invalid `PLANNED` shot states in templates and clarify new-project versus checkpoint-resume behavior in the skill and director instructions; add contract regression checks (PR #19).
- Normalize only known malformed-JSON parser diagnostics when comparing Python and Node parity; behavioral errors and process exit codes remain strictly compared (PR #17 CI fix).
- Replace the obsolete Phase 8 `In review` regression assertion with checks that Phase 8 is merged and production release remains unauthorized (PR #11 CI fix).

### Added
- Reproducible, original 30-second marketing showcase with real FFmpeg animation output, time-coded story/shot artifacts and private CI render evidence; explicitly not an AI-agent/video-model execution (PR #22).
- Isolated installable skill folder with a strict runtime-only allowlist and byte-for-byte mirror guard; recommended direct-path Skills CLI installation (private install remains unverified; PR #20).
- Stage 4 independent Python/Node transcript evaluator parity gate with positive, strict, negative and malformed inputs, JSON evidence and read-only CI; no Python deletion (PR #17).
- Stage 3 additive Node.js transcript evaluator, behavior negative tests, offline pre-production runner, and CI report artifacts; Python counterparts remain in place for parity review (PR #16).
- Stage 2 Node.js regression parity tests for audio, continuity, shot planning, repair, director, compatibility, flagship and pre-production contracts; Python behavior evaluator remains for Stage 3 (PR #15).
- Stage 1 Python-free maintainer tooling: additive Node.js built-in preservation/structure validators, negative tests and independent CI workflow; existing Python checks retained pending parity verification (implementation PR).
- Private pre-production validation runner, read-only GitHub Actions workflow, real-agent evidence template and explicit NO PROD GO instructions ([PR #11](https://github.com/montadhahri/universal-ai-film-director/pull/11)).
- Phase 8 synthetic flagship film walkthrough, Project Bible example, end-to-end onboarding, v1.0 release checklist and regression checks ([PR #10](https://github.com/montadhahri/universal-ai-film-director/pull/10)).
- Phase 7 generator capability verification matrix, selection guidance, Google Flow checklist, agent compatibility evidence and manual integration scenarios ([PR #9](https://github.com/montadhahri/universal-ai-film-director/pull/9)).
- Phase 6 evidence-based quality assurance, localized repair workflow, defect/repair templates, illustrative defect ticket and regression checks ([PR #8](https://github.com/montadhahri/universal-ai-film-director/pull/8)).
- Phase 5 audio synchronization procedure, dubbing/localization guidance, cue-sheet template, illustrative example and timing regression checks ([PR #7](https://github.com/montadhahri/universal-ai-film-director/pull/7)).
- Phase 4 shot planning, cinematography, lighting/composition references, timing template, illustrative timeline and regression checks ([PR #6](https://github.com/montadhahri/universal-ai-film-director/pull/6)).
- Phase 3 continuity guidance, shot lifecycle and versioned Project Bible JSON schema, checkpoint template, illustrative snapshot and regression tests ([PR #4](https://github.com/montadhahri/universal-ai-film-director/pull/4)).
- Development roadmap with phase status, acceptance criteria and PR links.
- Contribution policy requiring a changelog entry for each change merged to `main`.
- Phase 1 repository-preservation baseline, negative behavior regression tests
  and GitHub Actions safety checks ([PR #1](https://github.com/montadhahri/universal-ai-film-director/pull/1)).
- Phase 2 director decision procedure, adaptive discovery guidance and static
  integration checks ([PR #2](https://github.com/montadhahri/universal-ai-film-director/pull/2)).

### Changed
- Consolidate maintainer validation on Node.js built-in tooling; retire 13 Python scripts, their parity-only tool and duplicate CI workflows, update baseline and docs, and preserve the Markdown skill runtime (cleanup PR #18; deletion pending owner review).
- Reprioritize the post-Phase-8 roadmap to begin with Python-free maintainer tooling, then repository cleanup and packaging before private installation and real-agent validation; require parallel test evidence and explicit approval before any Python file deletion (roadmap review PR).
- Clarify Python-free skill usage, installer versus maintainer requirements, and optional Node.js test migration investigation (PR #12).
- Document Skills CLI (`npx skills add`) as the recommended global/project installation method, with private-repository authentication, agent selection and manual fallbacks ([PR #5](https://github.com/montadhahri/universal-ai-film-director/pull/5)).
- GitHub Actions validation includes baseline preservation and regression tests.
- `SKILL.md` now links to the intelligent director and discovery guidance.

## [0.1.0] — 2026-11-01

### Added
- Initial provider-neutral filmmaking skill, stage approvals, Project Bible,
  generator adapters, templates, examples and validation workflow.

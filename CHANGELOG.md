# Changelog

Notable changes to Universal AI Film Director are documented here.
Entries follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
categories and use semantic versioning for releases. Work merged after
v0.1.0 is listed under **Unreleased** until a release is explicitly approved.

## [Unreleased]

### Added
- Phase 4 shot planning, cinematography, lighting/composition references, timing template, illustrative timeline and regression checks ([PR #6](https://github.com/montadhahri/universal-ai-film-director/pull/6)).
- Phase 3 continuity guidance, shot lifecycle and versioned Project Bible JSON schema, checkpoint template, illustrative snapshot and regression tests ([PR #4](https://github.com/montadhahri/universal-ai-film-director/pull/4)).
- Development roadmap with phase status, acceptance criteria and PR links.
- Contribution policy requiring a changelog entry for each change merged to `main`.
- Phase 1 repository-preservation baseline, negative behavior regression tests
  and GitHub Actions safety checks ([PR #1](https://github.com/montadhahri/universal-ai-film-director/pull/1)).
- Phase 2 director decision procedure, adaptive discovery guidance and static
  integration checks ([PR #2](https://github.com/montadhahri/universal-ai-film-director/pull/2)).

### Changed
- Document Skills CLI (`npx skills add`) as the recommended global/project installation method, with private-repository authentication, agent selection and manual fallbacks ([PR #5](https://github.com/montadhahri/universal-ai-film-director/pull/5)).
- GitHub Actions validation includes baseline preservation and regression tests.
- `SKILL.md` now links to the intelligent director and discovery guidance.

## [0.1.0] — 2026-11-01

### Added
- Initial provider-neutral filmmaking skill, stage approvals, Project Bible,
  generator adapters, templates, examples and validation workflow.

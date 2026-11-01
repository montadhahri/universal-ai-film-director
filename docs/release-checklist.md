# v1.0 release readiness checklist

**Current state:** release **candidate preparation**, NOT a released v1.0.
Owner approval is required to tag or publish any version.

## Private pre-production gate (NO PROD GO)

- [ ] Keep GitHub repository PRIVATE; no visibility change.
- [ ] Run [private validation workflow](private-preprod-validation.md).
- [ ] Capture real-agent evidence separately; synthetic tests are insufficient.
- [ ] Require a distinct explicit production GO after validation.

## Repository and CI
- [ ] All existing baseline files preserved; no unauthorized deletions.
- [ ] Run `python tests/regression/check_preservation.py`.
- [ ] Run `python tests/validate_repo.py`.
- [ ] Run `python -m unittest discover -s tests/regression -p 'test_*.py' -v`.
- [ ] Run `python tests/behavior/evaluate.py --json-out build/behavior-report.json`.
- [ ] Confirm GitHub Actions checks are green on release candidate.
- [ ] Review open issues, security/privacy guidance, LICENSE and dependencies.

## Skill behavior and usability
- [ ] Real-agent test: Claude Code, Codex, Gemini CLI, Cursor, Windsurf
      (or document which were not tested and reduce compatibility claims).
- [ ] Confirm the first discovery turn asks one question only.
- [ ] Verify explicit script/visual/storyboard approval gates.
- [ ] Verify locked-shot revisions survive narrow repair.
- [ ] Test cross-session checkpoint with an actual persisted file.
- [ ] Verify audio cue timing, planned silence and missing-narration handling.
- [ ] Verify end-to-end film with real external tools if claiming real results.
- [ ] Test private-repository `npx skills add` installation on supported agents.
- [ ] Confirm provider-specific model capabilities against current official docs.

## Release process
- [ ] Review `docs/ROADMAP.md` and `CHANGELOG.md`.
- [ ] Agree on exact SemVer version and release notes.
- [ ] Obtain explicit owner authorization for release.
- [ ] In a separate approved PR, move Unreleased entries into a dated release
      heading and update status/docs as needed.
- [ ] Tag/publish only after merge and approval; verify published artifacts.
- [ ] Leave unknown capabilities and untested agents explicitly marked.

A complete documentation example alone does **not** meet the v1.0 gate.

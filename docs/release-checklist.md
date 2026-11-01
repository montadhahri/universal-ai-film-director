# v1.0.0 release candidate checklist

**Current state:** v1.0.0 **candidate on HOLD**. Not tagged, released, publicly published, or approved for production. Current CI verifies static/semantic tests and a local-folder CLI installation only.
Owner approval is required to tag or publish any version.

## Private pre-production gate (NO PROD GO)

- [ ] Keep GitHub repository PRIVATE; no visibility change.
- [ ] Run [private validation workflow](private-preprod-validation.md).
- [ ] Capture real-agent evidence separately; synthetic tests are insufficient.
- [ ] Require a distinct explicit production GO after validation.

## Repository and CI
- [ ] All existing baseline files preserved; no unauthorized deletions.
- [ ] Run `node tests/regression/check_preservation.js`.
- [ ] Run `node tests/validate_repo.js`.
- [ ] Run `node --test tests/node/*.test.js`.
- [ ] Run `node tests/package/validate-package.js` and inspect the 34-file payload.
- [ ] Run `node tests/preprod/run_validation.js --out build/preprod-validation.json`.
- [ ] Inspect GitHub Actions' local Skills CLI smoke-test artifact/steps; this is not a private remote authentication test.
- [ ] Run `node tests/behavior/evaluate.js --json-out build/behavior-report.json`.
- [ ] Run `node tests/preprod/run_validation.js --out build/preprod-validation.json`.
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
- [ ] Perform and record **authenticated remote** private-GitHub Skills CLI installation on a supported agent (local-folder install passed CI; remote remains NOT TESTED).
- [ ] Capture a real, independently executed agent transcript evaluating the approval gates and repair rules.
- [ ] Demonstrate actual AI-generated media with playback and provenance before making any public film-quality marketing claims.
- [ ] Inspect installed target folder to confirm no tests, examples, CI files or maintainer docs.
- [ ] Confirm provider-specific model capabilities against current official docs.

## Release process
- [ ] Review `docs/ROADMAP.md` and `CHANGELOG.md`.
- [ ] Agree on exact SemVer version and release notes.
- [ ] Obtain explicit owner authorization for release.
- [ ] In a separate approved PR, move Unreleased entries into a dated release
      heading and update status/docs as needed.
- [ ] Tag/publish only after merge and approval; verify published artifacts.
- [ ] Leave unknown capabilities and untested agents explicitly marked.

The existing flagship is an illustrative storyboard, **not** a generated 30-second film. The low-quality programmatic marketing demo PR #22 was rejected without merge. A complete documentation example alone does **not** meet the v1.0.0 gate.

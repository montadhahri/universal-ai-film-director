# Phase 9 — Remote installation and invocation evidence

This file deliberately lives under `tests/installation/` so its PR triggers the existing `Local Skills CLI install smoke test` GitHub Actions workflow.

## Automated acceptance (GitHub Actions)

The workflow `.github/workflows/skills-install-smoke.yml` uses `npx --yes skills@1.7.4 add <local-skill-path> -a codex -y --copy` for each of seven skills, then `tests/installation/check-installed.js` verifies byte-for-byte equality and absence of development files.

**PASS means:** seven locally checked-out skill payloads can be copied to a Codex-compatible skills directory by the pinned CLI on the runner.

**It does not mean:** the private remote GitHub installation works, a Codex session recognized `/skill-name`, a specialist was invoked by another agent, a film was generated, or an approval was authenticated.

## Host execution acceptance — NOT_RUN until independently observed

1. Record agent name/version and invocation mechanism in a real supported host.
2. Confirm the host discovers `universal-ai-film-director` and two specialists; preserve exact command and host output.
3. Use a fresh, planning-only fictional scenario and preserve the complete Director response.
4. Verify one focused discovery question, PROPOSED status, three separate creative approval gates, no invented approval, and no provider execution.
5. Verify an actual specialist handoff and proposal-version checks where the host supports delegation; otherwise mark native delegation UNSUPPORTED, not PASS.
6. Repeat on a second supported host for release portability evidence.

## Safety

Production GO remains HOLD. No provider jobs, paid credits, media generation, private asset uploads or final publication are authorized by this test.

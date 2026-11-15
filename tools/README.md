# Repository maintenance tools

These tools are for repository maintainers, **not part of any installed Agent Skill**.

- [`security/history-secret-scan.js`](security/history-secret-scan.js): dependency-free, conservative pattern scan of reachable Git history, invoked by the historical secret-scan workflow. This does not replace the Gitleaks workflow, media rights review, or privacy audit.

Canonical filmmaking/runtime modules remain in [`../scripts/`](../scripts/build-skill-runtimes.js), where the deterministic seven-skill runtime bundler reads them. Do not move those modules without updating their imports, bundler, tests and generated skill payloads.

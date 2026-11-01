# Installable skill package

Canonical source is the repository-root `SKILL.md` and `adapters/`,
`engine/`, `references/`, `schemas/`, `templates/`, plus
`docs/agent-compatibility.md` (a runtime reference).

The installable distribution is the closed mirror at
`skills/universal-ai-film-director/`. It excludes repository
`tests/`, `.github/`, `examples/`, README, changelog and
maintenance/release documentation.

## Guard against extra files or stale copies

```bash
node tests/package/validate-package.js
```

The guard compares the exact runtime file allowlist and bytes against the
canonical source; it rejects any extra file, missing file, drift or symlink.
When editing the canonical skill, update the mirror in the same PR.

## Installation recommendation

The upstream Skills CLI documents direct repository subdirectory sources.
From an authenticated private GitHub environment, use:

```bash
npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director -g
```

The folder itself is validated in CI. **An authenticated installation directly from this private GitHub URL
has not yet been performed**, so the
resulting installed file list must still be checked in a manual smoke test.
A **local-folder installation** via the real CLI passed PR #21's smoke test and byte comparison. For manual installation, copy this folder only, preserving internal paths.

The repo must remain PRIVATE. No release or production GO is authorized.

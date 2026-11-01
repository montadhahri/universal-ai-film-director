# Installation acceptance evidence

## Automated: real Skills CLI local-folder installation

The separate GitHub Actions workflow
[`skills-install-smoke.yml`](../.github/workflows/skills-install-smoke.yml)
checks out the **private repository** with no persisted Git credentials and
uses the actual published Skills CLI to install the isolated skill into a
temporary Codex project directory:

```bash
DISABLE_TELEMETRY=1 npx --yes skills@1.7.4 add /absolute/path/to/skills/universal-ai-film-director -a codex -y --copy
```

Then `tests/installation/check-installed.js` compares every installed
relative path and byte against the isolated package. It fails if any
development file is installed, any required runtime file is missing,
or an installed file changes. This is a **real CLI installation** from a
local checkout, not an agent execution.

**Important:** A successful local installation is not evidence that
`npx skills add https://github.com/.../tree/main/skills/...`
can fetch a private repository using the owner's credentials.

## Owner-operated authenticated private remote smoke test

Do not make the repository public. On a computer with Node.js 22.20+
and read access to this private GitHub repository, authenticate with
`gh auth login` or your Git credential helper. Then in a temporary project:

```bash
gh auth status
DISABLE_TELEMETRY=1 npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director -a codex -y --copy
```

Inspect the destination skill folder and compare its content with
`skills/universal-ai-film-director/` using the checkout checker if available.
Record CLI version, agent, operating system, file count and any errors.
Do **not** paste authentication tokens into transcripts or CI logs.

## Remaining agent acceptance

A CLI installation test verifies files, not behavior. An independent agent
must load the skill and be tested for approval gates, one-question discovery,
locked-shot preservation, checkpoint resume and audio-only repair.
Actual generated video is needed before marketing the skill as having
produced a film. Mark all unexecuted scenarios NOT_RUN.

# Installation

Universal AI Film Director is a collection of seven portable Agent Skills. The primary installation path is the [Skills CLI](https://skills.sh/), which supports GitHub sources without cloning.

> **Availability:** This repository is public. A clean unauthenticated public-GitHub installation of all seven skills passed the pinned Skills CLI test on the [v2.0.0 skill revision](https://github.com/montadhahri/universal-ai-film-director/actions/runs/41921930247). This proves noninteractive installation in CI, not live host invocation.

## Quick install — Film Director

```bash
npx skills add montadhahri/universal-ai-film-director --skill universal-ai-film-director
```

Start a film by giving your compatible AI agent a story idea and requested runtime. The Director asks at most one focused discovery question at a time, proposes professional creative choices, and requests your approval of the screenplay, Visual Bible and storyboard.

## Install all skills

```bash
npx skills add montadhahri/universal-ai-film-director --skill '*'
```

## List available skills

```bash
npx skills add montadhahri/universal-ai-film-director --list
```

## Install individual specialists

```bash
npx skills add montadhahri/universal-ai-film-director --skill film-storytelling
npx skills add montadhahri/universal-ai-film-director --skill film-visual-direction
npx skills add montadhahri/universal-ai-film-director --skill film-cinematography
npx skills add montadhahri/universal-ai-film-director --skill film-video-production
npx skills add montadhahri/universal-ai-film-director --skill film-sound-direction
npx skills add montadhahri/universal-ai-film-director --skill film-continuity-qa
```

The CLI installs skills for the agents it supports and asks for installation preferences. A target agent's native discovery and skill-to-skill delegation may vary.

## Optional: clone for development or local installation

If you want to inspect, modify or test the source:

```bash
git clone https://github.com/montadhahri/universal-ai-film-director.git
cd universal-ai-film-director
npx skills add ./skills/universal-ai-film-director
```

The **local-folder installation path** is covered by this repository's automated Skills CLI smoke test. To inspect the original single-skill release from the clone:

```bash
git checkout v1.0.0
```

This historical checkout is not required for the current modular skill installation.

## Host-by-host first-use verification (V2.1)

The following are **test targets, not certified integrations**. Skills CLI host options and native skill invocation vary by CLI version and agent version; inspect the CLI's supported agents and your host's current skill documentation rather than assuming that a successful copy means discovery.

| Host | Installation approach to check | Native invocation evidence |
| --- | --- | --- |
| Codex | Skills CLI with Codex selected; the pinned CI smoke test installs into a Codex-compatible directory | **NOT_RUN** — CI did not launch Codex |
| Claude Code | Select Claude Code in Skills CLI if listed by the installed CLI version, or follow that host's current native skill instructions | **NOT_RUN** |
| Gemini CLI | Select Gemini CLI if listed, or follow its current skill-loading instructions | **NOT_RUN** |
| Cursor | Select Cursor if listed, or use its supported project/agent instruction mechanism | **NOT_RUN** |
| Other agents | Check actual Agent Skills support; otherwise manually load Director and relevant references | **NOT_VERIFIED** |

### Repeatable planning-only test

1. In a **clean test project**, list the available skills using the CLI and install the Director plus at least two specialists. Record the actual CLI version, selected host, installed skill paths and host/model versions. No clone or Python is required for the public CLI installation path.
2. Start a **new session in the actual host** and confirm it discovers the installed Director and specialists through its native mechanism. Preserve the discovery output; seeing files on disk is insufficient.
3. Invoke the Director through the host's documented skill mechanism, using this exact fictional prompt:

   > I want to make a 30-second animated short film about a child finding a magical light. Use the Universal AI Film Director skill and guide me step by step. Do not generate media or use paid tools.

4. Preserve the full response. Check that the Director asks at most one focused discovery question, labels unapproved work **PROPOSED**, does not infer screenplay/Visual Bible/storyboard approvals, and does not claim to have rendered media.
5. Invoke two installed specialists separately through the host's supported mechanism, using a planning-only request relevant to each specialist. Capture exact prompts, complete responses and evidence that the host loaded each skill. **Do not equate a specialist's answer with native Director-to-specialist delegation.**
6. Repeat with a second supported host. Record PASS, FAIL, BLOCKED or NOT_RUN per host and per invocation. Only claim cross-host portability after inspecting actual captures from both hosts.

Use the existing [agent acceptance capture and evaluation instructions](agent-acceptance.md) rather than creating new administrative reports. Store private logs outside the public repository; do not commit personal conversations, credentials or private media. Native delegation is optional and must be assessed separately from single-agent mode.

## Compatible agents without Skills CLI

If your environment cannot install Agent Skills through the CLI, load `skills/universal-ai-film-director/SKILL.md` and the linked `references/` documents in your agent, using its supported instructions mechanism. The Director can carry out the workflow using one agent, without native specialist delegation.

## Generator access and permissions

Installing these instruction skills does **not** install or authorize an image/video model, audio synthesis, browser access, a paid account or publishing. Actual rendering requires supported tools and separate user approval. Without them, the Director should provide production plans and prompts, not claim to have generated a finished film.

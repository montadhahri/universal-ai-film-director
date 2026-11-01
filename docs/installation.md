# Installation

Universal AI Film Director is a collection of seven portable Agent Skills. The primary installation path is the [Skills CLI](https://skills.sh/), which supports GitHub sources without cloning.

> **Availability:** This repository is currently private and planned for public release. Until it becomes public, remote installation requires repository access. The commands below describe how visitors will install it once public. GitHub remote installation from this specific repository is not independently tested yet.

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

## Compatible agents without Skills CLI

If your environment cannot install Agent Skills through the CLI, load `skills/universal-ai-film-director/SKILL.md` and the linked `references/` documents in your agent, using its supported instructions mechanism. The Director can carry out the workflow using one agent, without native specialist delegation.

## Generator access and permissions

Installing these instruction skills does **not** install or authorize an image/video model, audio synthesis, browser access, a paid account or publishing. Actual rendering requires supported tools and separate user approval. Without them, the Director should provide production plans and prompts, not claim to have generated a finished film.

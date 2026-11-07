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

On **Windows CMD**, use double quotes instead; single quotes are passed literally and the wildcard selection can fail:

```cmd
npx skills add montadhahri/universal-ai-film-director --skill "*"
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
| Codex | Skills CLI, Codex selected, global installation on Windows CMD | **PARTIAL PASS (owner-operated, 2026-11-05)** — Director, Storytelling and Visual Direction were invoked separately; installed `SKILL.md` reads confirmed |
| Claude Code | Select Claude Code in Skills CLI if listed by the installed CLI version, or follow that host's current native skill instructions | **NOT_RUN** |
| Gemini CLI | Check current authentication support before installing; Google-account sign-in failed in the owner's environment | **BLOCKED** — personal sign-in returned “This client is no longer supported for Gemini Code Assist for individuals”; no skill invocation |
| Cursor | Select Cursor if listed, or use its supported project/agent instruction mechanism | **NOT_RUN** |
| OpenCode | Owner-operated Windows session using `opencode/beam-free`; pre-existing global `.agents/skills` installation | **PARTIAL PASS (2026-11-06)** — Director file read and planning behavior observed; native `film-storytelling` and `film-visual-direction` skill-tool invocations observed |
| Other agents | Check actual Agent Skills support; otherwise manually load Director and relevant references | **NOT_VERIFIED** |

### Owner-operated Windows host observations (2026-11-05)

These are user-reported local test observations, **not independently archived complete host transcripts**. Do not treat them as CI verification or proof of portability across two hosts.

- **Environment:** Windows CMD; Node.js `v26.13.0`, npm/npx `11.20.0`, Skills CLI `1.7.6`, Codex CLI `0.166.0`. Skills CLI discovered all seven repository skills. Codex global installs were reported under `C:\\Users\\nouni\\.agents\\skills\\`.
- **Codex Director:** Native `$universal-ai-film-director` discovery and read-only access to installed `SKILL.md` were observed after restarting Codex with `codex --sandbox read-only --ask-for-approval on-request`. Initial execution was blocked by a local approval-policy configuration; this was resolved by restarting. A fictional 30-second film proposal asked a focused question and preserved screenplay/Visual Bible/storyboard as **PROPOSED**, with no media generation or implied approval.
- **Codex specialists:** `$film-storytelling` produced a proposed timed screenplay and read its installed `SKILL.md`; `$film-visual-direction` produced a proposed visual-continuity assessment and read its installed `SKILL.md`. A screenshot confirmed Visual Direction approval boundaries, but full reference dependency loading and complete specialist outputs were not independently captured. **Director-to-specialist delegation was NOT_RUN.**
- **Gemini CLI:** Google-account authentication returned the unsupported-client error quoted in the table. No native skill test was run; this is an authentication blocker, not a demonstrated defect in the repository skills.
- **OpenCode:** `opencode models` listed free-labelled options and a user-reported `opencode/beam-free` session returned the requested connection phrase. The Skills CLI agent selection did not visibly offer OpenCode to the user; installation verification was **SKIPPED** by owner decision. A model response alone is **not** Agent Skills support evidence.
- **Security/cost:** All film prompts were fictional and planning-only. No provider rendering or paid job was authorized. A third-party installer script considered during troubleshooting was **not executed** and is not an endorsed installation method.

**V2.1 verdict as of 2026-11-05: PARTIAL.** At that date only Codex had scoped owner-operated native invocation evidence. See the 2026-11-06 OpenCode follow-up below for the updated status; independent clean-run evidence is still missing.

### OpenCode follow-up — owner-operated Windows evidence (2026-11-06)

The owner provided screenshots from an OpenCode **Build / Beam Free** session in a local Windows test directory. This was a continuation of the existing environment, **not** an independent clean installation. No complete transcript, host version, skill source revision, dependency/reference loading trace, or independent evaluator capture was provided.

- **Director:** OpenCode visibly read `C:\\Users\\nouni\\.agents\\skills\\universal-ai-film-director\\SKILL.md`. Given a fictional 30-second robot-and-flower idea, it returned a **PROPOSED** creative direction, trade-offs, separate screenplay/Visual Bible/storyboard approval gates, and one focused ending-tone question. This demonstrates useful behavior and file access, **not verified native Director skill-tool invocation**.
- **Discovery:** It directly read `film-storytelling/SKILL.md` and `film-visual-direction/SKILL.md` from the same global skill root and stated both appeared in its native `available_skills` list. Native listing is self-reported; direct reads are visible.
- **Storytelling:** Screenshot explicitly shows `Skill "film-storytelling"` and the model reporting native invocation. It kept creative direction **PROPOSED**, identified the next owner decision, and declined to finalize a screenplay or imply approvals.
- **Visual direction:** Screenshot explicitly shows `Skill "film-visual-direction"` and the model reporting native invocation. It proposed a stylized look and three continuity anchors, identified required upstream approvals, and did not claim images, files or approvals.
- **Limits:** These are scoped owner-operated screenshot observations, not complete independent logs. Skills CLI installation for OpenCode, clean first-use reproducibility, Director native invocation, complete reference loading, and native Director-to-specialist delegation remain **NOT_VERIFIED / NOT_RUN**. No media generation or paid provider work was requested.

**Updated V2.1 verdict: PARTIAL.** Two hosts now have owner-operated skill-use evidence, with OpenCode's two specialists visibly invoked through its skill tool. Independent clean installation and full native Director-plus-two-specialist verification in two hosts are still required before claiming the milestone complete.

### Project-local OpenCode follow-up — owner-operated Windows screenshots (2026-11-07)

The owner used Skills CLI `1.7.6` from Windows CMD in `C:\Users\nouni\OneDrive\Desktop\sdsdsdsd` (an existing owner environment, **not** a clean independent user or host). `npx skills add montadhahri/universal-ai-film-director --skill "*"` completed project-local installation. A directory listing visibly contained all seven skill folders under `.agents\skills\`; the initial Director-only installation and subsequent seven-skill installation were both observed. The CLI displayed third-party security indicators (Gen Safe, Socket 0 alerts, Snyk Low Risk) for the Director; these are **not** a full security audit.

- **Director discovery:** OpenCode Build / Beam Free visibly read the project-local `.agents\skills\universal-ai-film-director\SKILL.md` and `references\discovery.md`. For a fictional 30-second robot/flower concept it asked one focused discovery question and did not advance approvals.
- **Director + Storytelling:** OpenCode visibly displayed native `Skill "universal-ai-film-director"` and `Skill "film-storytelling"` calls, and reported both project-local Windows paths. It produced a five-beat, 30-second **PROPOSED** story, left screenplay approval to the user, and did not claim media generation or spending.
- **Director + Visual Direction:** OpenCode reported both project-local `SKILL.md` paths and proposed a hand-painted 2D look, three continuity anchors and reference-image requirements. It kept the screenplay, Visual Bible and storyboard unapproved. The supplied screenshot **did not show the native skill-tool invocation lines** for this pair, so native invocation remains NOT_VERIFIED for this specific run.
- **Limits:** Screenshot excerpts rather than complete transcripts; source revision, host version and full reference-loading trace not pinned; the environment already had global skills installed. Path displays and response behavior are scoped evidence, not proof of fully independent clean-user onboarding, all-host compatibility or autonomous multi-agent delegation. No provider calls, media jobs or repository changes were authorized in these tests.

**V2.1 remains PARTIAL.** This adds successful project-local installation and two useful OpenCode coordination scenarios, but independent clean-user acceptance and full pinned two-host capture remain outstanding.

### Additional local completeness and beginner check (2026-11-07)

Owner-provided Windows CMD screenshots from the same project-local OpenCode test environment showed **seven PASS and zero FAIL** when checking for `SKILL.md` in each installed skill directory. The Director's local `references/` directory contained seven Markdown files: `continuity.md`, `creative-direction.md`, `decision-procedure.md`, `discovery.md`, `guide.md`, `project-state.md`, and `worked-example.md`. These are **file-presence checks**, not validation of every dependency or proof of isolation from global skills.

A fresh OpenCode session received a short beginner-style prompt for a 30-second lonely-robot-and-flower film, asking to use the Universal AI Film Director without giving an explicit skill path. The screenshot visibly showed a project-local `references/discovery.md` read and a **Draft (Discovery)** Project Bible, a planning-only/no-paid-tools constraint, unapproved creative proposals and one focused question. **Beginner discovery behavior: PASS (owner-operated).** The screenshot does not show a native Director skill-tool invocation line; **native invocation for this particular run: NOT_VERIFIED**. The environment was not independent or globally skill-free, and full host transcripts and exact source revisions were not captured.

**V2.1 remains PARTIAL** pending independently reproducible clean-environment and two-host evidence; no release authorization.

### Repeatable planning-only test

1. In a **clean test project**, list the available skills using the CLI and install the Director plus at least two specialists. Record the actual CLI version, selected host, installed skill paths and host/model versions. No clone or Python is required for the public CLI installation path.
2. Start a **new session in the actual host** and confirm it discovers the installed Director and specialists through its native mechanism. Preserve the discovery output; seeing files on disk is insufficient.
3. Invoke the Director through the host's documented skill mechanism, using this exact fictional prompt:

   > I want to make a 30-second animated short film about a child finding a magical light. Use the Universal AI Film Director skill and guide me step by step. Do not generate media or use paid tools.

4. Preserve the full response. Check that the Director asks at most one focused discovery question, labels unapproved work **PROPOSED**, does not infer screenplay/Visual Bible/storyboard approvals, and does not claim to have rendered media.
5. Invoke two installed specialists separately through the host's supported mechanism, using a planning-only request relevant to each specialist. Capture exact prompts, complete responses and evidence that the host loaded each skill. **Do not equate a specialist's answer with native Director-to-specialist delegation.**
6. Repeat with a second supported host. Record PASS, FAIL, BLOCKED or NOT_RUN per host and per invocation. Only claim cross-host portability after inspecting actual captures from both hosts.

Use the existing [agent acceptance capture and evaluation instructions](agent-acceptance.md) rather than creating new administrative reports. Store private logs outside the public repository; do not commit personal conversations, credentials or private media. Native delegation is optional and must be assessed separately from single-agent mode.

### Existing installation CI execution evidence (verified 2026-11-07)

The owner supplied a GitHub Actions runs screenshot showing green `Local Skills CLI install smoke test` results: **#39** (manual `main`, 2026-11-04), **#38** (PR #110, 2026-11-03), and **#37** (PR #88, 2026-11-03). The [workflow](../.github/workflows/skills-install-smoke.yml) tests local and public GitHub seven-skill installation with pinned Skills CLI `1.7.4` and file checks. These are successful **installation** executions, not proof of live Codex/OpenCode invocation, independently reviewed complete host transcripts, or unfamiliar-user acceptance. Existing owner-operated host evidence remains scoped as recorded above. Do not repeat installation merely to fill the distinct host-evidence gap.

## Compatible agents without Skills CLI

If your environment cannot install Agent Skills through the CLI, load `skills/universal-ai-film-director/SKILL.md` and the linked `references/` documents in your agent, using its supported instructions mechanism. The Director can carry out the workflow using one agent, without native specialist delegation.

## Generator access and permissions

Installing these instruction skills does **not** install or authorize an image/video model, audio synthesis, browser access, a paid account or publishing. Actual rendering requires supported tools and separate user approval. Without them, the Director should provide production plans and prompts, not claim to have generated a finished film.

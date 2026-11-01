<div align="center">

# 🎬 Universal AI Film Director

**From a story idea to a professionally directed AI film — one creative partner, six specialized filmmaking skills.**

A portable, modular **Agent Skills** collection for writing screenplays, designing visual worlds, planning cinematic shots, directing sound, preparing generation prompts and reviewing film continuity.

[![Version](https://img.shields.io/badge/latest%20release-v1.0.0-blue)](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0)
![Next version](https://img.shields.io/badge/next-v2.0.0%20in%20development-orange)
[![Validate skills](https://github.com/montadhahri/universal-ai-film-director/actions/workflows/validate.yml/badge.svg)](https://github.com/montadhahri/universal-ai-film-director/actions/workflows/validate.yml)
[![Local install smoke](https://github.com/montadhahri/universal-ai-film-director/actions/workflows/skills-install-smoke.yml/badge.svg)](https://github.com/montadhahri/universal-ai-film-director/actions/workflows/skills-install-smoke.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
![Agent Skills](https://img.shields.io/badge/format-Agent%20Skills-blueviolet)

[**Quick start**](#-quick-start) · [**Installation**](#-installation) · [**How it works**](#-how-filmmaking-works) · [**Specialist skills**](#-meet-the-film-crew) · [**Compatibility**](#-agent-compatibility) · [**Releases**](#-versions--releases) · [**FAQ**](#-faq)

</div>

---

## ✨ What can you make?

Bring your own story, or start with a single sentence. Universal AI Film Director guides you through the creative process without requiring you to understand prompt engineering or filmmaking terminology.

- **Tell your story:** develop a premise, screenplay and optional dialogue or voice-over.
- **Give it a look:** create a Visual Bible defining characters, locations, art direction and visual continuity.
- **Direct the camera:** build a timed storyboard with framing, blocking, lighting, movement and transitions.
- **Design the sound:** plan narration, music, effects, dubbing and meaningful silence against the picture timeline.
- **Prepare video production:** receive copy-ready, shot-specific prompts adapted to the capabilities of your available tools.
- **Review and refine:** diagnose continuity or sound problems and propose targeted repairs without unnecessarily changing approved shots.

**You are the creative owner.** The AI Director offers informed recommendations, coordinates the workflow and tracks decisions. You approve the screenplay, Visual Bible, storyboard and any changes to protected work.

> **Important:** This is a filmmaking **direction and production-planning skill**, not a bundled video-rendering service. Actual images, voice, video clips or final MP4s require external tools that are genuinely available and authorized. The assistant must distinguish plans from generated or inspected media.

## 🚀 Quick start

**1. Obtain the skills.** Clone the repository using GitHub credentials with access to this **private** repository:

```bash
git clone https://github.com/montadhahri/universal-ai-film-director.git
cd universal-ai-film-director
```

**2. Install the Director.** For a target agent supported by the [Skills CLI](https://skills.sh/), install the Director from your authenticated local checkout:

```bash
npx skills add ./skills/universal-ai-film-director
```

**3. Start a film.** In your agent, try:

> I want to create a 30-second cinematic animated film. A young girl finds the last spark of light in a city without a sun, carries it to an ancient tower, and releases it into the sky. Help me direct it, one step at a time.

The Director will use the details you've already supplied, ask **one focused question when needed**, offer professional creative suggestions, and ask for explicit approval at the key stages.

For agents without native skills support, provide the content of `skills/universal-ai-film-director/SKILL.md` and its relevant `references/` documents manually. See [installation options](docs/installation.md).

## 📦 Installation

The repository contains **seven individually installable skill folders**. Install the Director for the complete guided experience; install specialists separately when your agent supports skill discovery.

| What you want | Local installation command |
| --- | --- |
| Full interactive filmmaking workflow | `npx skills add ./skills/universal-ai-film-director` |
| Screenplay and narrative work | `npx skills add ./skills/film-storytelling` |
| Characters, locations and art direction | `npx skills add ./skills/film-visual-direction` |
| Camera direction and storyboards | `npx skills add ./skills/film-cinematography` |
| Generator prompts and execution planning | `npx skills add ./skills/film-video-production` |
| Narration, dubbing and music planning | `npx skills add ./skills/film-sound-direction` |
| Continuity checks and repair proposals | `npx skills add ./skills/film-continuity-qa` |

To install all seven from the checkout, execute each command above (or use your chosen agent's documented native skill installation method).

**Private-repository note:** A local-folder Skills CLI install is checked in CI; authenticated **direct installation from the private GitHub URL** has not been independently verified. The installer needs access to the local folder, and native discovery depends on the agent. Installing a skill does not connect a video generator or pay for rendering.

For a pinned historical version:

```bash
git checkout v1.0.0
```

That tag contains the original single-skill architecture. The development branch has one clean current implementation; there are no `v1/`, `v2/` or `v3/` source duplicates.

[Installation details and troubleshooting](docs/installation.md)

## 🎥 How filmmaking works

<details>
<summary><strong>See the full filmmaking process</strong></summary>

| Stage | What the AI helps create | Your role |
| --- | --- | --- |
| 1. Discovery | Creative brief: premise, audience, runtime, tone and constraints | Share your idea and preferences |
| 2. Story | Narrative beats, screenplay, optional voice-over | **Approve the screenplay** |
| 3. Visual direction | Visual Bible: character identity, worlds, palette and lighting | **Approve the Visual Bible** |
| 4. Cinematography | Timed storyboard, shot IDs, camera language and transitions | **Approve the storyboard** |
| 5. Sound | Narration, dubbing, effects, music and silence cue plan | Review and refine |
| 6. Video production | Generator-specific shot packets; real execution only if authorized tools exist | Authorize any external operations |
| 7. Review and delivery | Defect reports, targeted repairs and final-export checks | Approve changes and delivered results |

</details>

The Director records decisions in a **Project Bible** so the story, appearance, shot IDs and approved work stay consistent between stages. It also supports a copyable checkpoint for continuing in another chat or agent; a checkpoint is not a claim of automatic cloud storage.

### A real editing problem, handled carefully

You say:

> The narration disappears at second 18, but the picture is good. Don't change any of the approved video.

The Director and Sound/QA specialists should identify the affected audio cue, preserve the locked picture, ask for actual media or timecoded evidence if needed, and propose an **audio-only repair**. They must not claim the problem was fixed until a repaired export has actually been checked.

## 🎬 Meet the film crew

| Skill | Expertise |
| --- | --- |
| [**Director**](skills/universal-ai-film-director/SKILL.md) | Creative collaboration, approvals, project coordination and continuity |
| [**Storytelling**](skills/film-storytelling/SKILL.md) | Narrative structure, screenplay, dialogue and pacing |
| [**Visual Direction**](skills/film-visual-direction/SKILL.md) | Character/location bibles, artistic style and stable visual anchors |
| [**Cinematography**](skills/film-cinematography/SKILL.md) | Shot grammar, camera blocking, lighting, timing and storyboards |
| [**Video Production**](skills/film-video-production/SKILL.md) | Provider capability checks, shot packets and evidence-based generation planning |
| [**Sound Direction**](skills/film-sound-direction/SKILL.md) | Voice-over, dubbing, SFX, music, silence and synchronization |
| [**Continuity & QA**](skills/film-continuity-qa/SKILL.md) | Visual/audio review, defect triage and minimal repairs |

Each skill provides focused `SKILL.md` instructions, on-demand professional `references/` and output `assets/` where useful. You don't need to open every specialist manually for a normal film: the Director can manage the full process within **one agent**. Native multi-agent delegation is an optional integration, not a requirement.

## 🤖 Agent compatibility

The core is **plain Markdown Agent Skills instructions**, with no mandatory Codex-specific runtime, Python interpreter, external API key or special multi-agent framework.

| Environment | Intended approach | Verified scope |
| --- | --- | --- |
| Codex and compatible Skills CLI hosts | Install Director and optionally specialists | Local-folder CLI smoke install only; real-agent behavior not independently verified |
| Claude Code, Gemini CLI, Cursor and other compatible agents | Native skills if supported, or load Markdown manually | Compatibility depends on host/version; not certified |
| Custom agent workflows | Read skill files and references; optionally use shared contracts | Integration required; not independently tested |

Skills can guide a production on any compatible agent, but they **cannot guarantee identical automatic skill discovery**, external tool access or cross-agent delegation.

## 🏷️ Versions & releases

| Version | Meaning | Link |
| --- | --- | --- |
| **v1.0.0** | Published private release; original single-skill system | [Release notes and source](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) |
| **v2.0.0** | Modular Director and six specialists, in development | [Roadmap](docs/ROADMAP.md) · [Unreleased changes](CHANGELOG.md) |

Git tags preserve released versions. The working tree contains **one current source of truth**, not multiple runtime copies for each version. No v2 release tag is implied by its development status.

## ❓ FAQ

<details>
<summary><strong>Does the skill generate finished videos automatically?</strong></summary>

No. It creates structured film directions, prompts and review plans. Video/audio generation and assembly require actual tools and access. When these are unavailable, the agent must be transparent and report a planning-only or blocked state.

</details>

<details>
<summary><strong>Who decides the story and approves changes?</strong></summary>

You do. The Director proposes professional creative and technical choices, remembers your confirmed decisions in a Project Bible and asks for explicit approval at the screenplay, visual-bible and storyboard stages. Approved work stays protected.

</details>

<details>
<summary><strong>Can I use only one agent, rather than a multi-agent system?</strong></summary>

Yes. The Director can follow the full workflow sequentially with one capable agent. Separate specialists improve modular organization; native agent-to-agent delegation is not required.

</details>

<details>
<summary><strong>Will the skill use my private generator accounts or spend credits?</strong></summary>

Not by itself. Any provider account connection, asset upload, paid operation or publication requires an available integration and your separate authorization.

</details>

## 📚 Documentation

[Installation](docs/installation.md) · [Architecture](docs/architecture.md) · [Roadmap](docs/ROADMAP.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

## 📜 License

[MIT License](LICENSE). Ensure that any film assets, recordings, voices and music used in your production are properly licensed or authorized.

---

<div align="center">

**Your story. Your vision. An AI film crew to bring the direction together.**

</div>

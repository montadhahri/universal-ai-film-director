# 🎬 Universal AI Film Director
**From an idea to a production-ready AI film — one approved decision at a time.**

A provider-neutral Agent Skill for cinematic storytelling, screenplay development, visual direction, storyboarding, AI video prompt engineering, continuity management, sound, editing and quality assurance.

> **Not a video generator.** This skill guides an AI agent through production. Rendering requires a separate compatible video generator, and the user controls approvals.

## Quick start
1. Load [SKILL.md](SKILL.md) in your AI agent (or attach it as context).
2. Say: **"Use Universal AI Film Director. I want to create a 10-minute animated film with Google Flow."**
3. Answer the agent's **one question at a time**.
4. Approve the story, style bible, storyboard and shot plan.
5. Generate clips using the provided shot prompts, review each result, and edit the approved shots into a film.

## The filmmaking pipeline
`DISCOVER → SCRIPT → STYLE BIBLE → STORYBOARD → SHOT PROMPTS → GENERATE → REVIEW → EDIT → DELIVER`

Every stage has an explicit approval gate. Previously approved shots stay locked unless you explicitly request a revision.

## What makes this different?
- **Human-directed, not prompt-dumped:** one question per turn, meaningful approval gates.
- **Continuity-first:** a living Project Bible records character identities, settings, shot IDs and decisions.
- **Repair-first:** diagnose a failed shot without regenerating the whole film.
- **Tool-aware:** no invented clip durations, capabilities, buttons, voices or rendering promises.
- **Reproducible artifacts:** storyboard, prompt packets, review log, sound plan and edit checklist.
- **Multi-style:** stickman, 2D, 3D, photorealistic, documentary, corporate, fantasy and more.

## Use each part
| File | When to use |
|---|---|
| [SKILL.md](SKILL.md) | Always: entry point, phase rules, approvals |
| [AGENT-INSTRUCTIONS.md](AGENT-INSTRUCTIONS.md) | When an agent lacks native skill support |
| [references/storytelling.md](references/storytelling.md) | Story discovery, screenplay, pacing |
| [references/visual-style.md](references/visual-style.md) | Style bible and character consistency |
| [references/prompt-engineering.md](references/prompt-engineering.md) | Shot prompts and technical constraints |
| [references/audio-design.md](references/audio-design.md) | Narration, music, sound effects |
| [references/quality-control.md](references/quality-control.md) | Review, revisions, locked shots |
| [references/postproduction.md](references/postproduction.md) | Assembly and delivery |
| [adapters/google-flow.md](adapters/google-flow.md) | Google Flow/Veo-specific prompting |
| [adapters/other-generators.md](adapters/other-generators.md) | Other video generators |
| [templates/project-bible.md](templates/project-bible.md) | Preserve decisions and continuity |
| [templates/storyboard.md](templates/storyboard.md) | Time and sequence planning |
| [templates/shot-prompt.md](templates/shot-prompt.md) | Reusable prompt packet |
| [templates/shot-review.md](templates/shot-review.md) | Quality review and issue tracking |

## Installation
See [installation](docs/installation.md). Native skill installation varies by agent. When unsupported, paste or attach `SKILL.md` and load referenced files as needed. No universal one-click installation is claimed.

## Examples
- [Stickman short film](examples/stickman-short-film/README.md)
- [Cinematic short film](examples/cinematic-short-film/README.md)
- [Corporate story](examples/corporate-story/README.md)

Each is an **illustrative production plan**, not an actual rendered film.

## A complete sample request
> "Create a 10-minute personal story as professional stickman animation for a workplace audience. Target Google Flow. Ask one question at a time. Keep approved shots unchanged. Start with story discovery."

## Production principles
- Confirm story facts, language, audience and permissions before production.
- Treat character reference images and voice samples as sensitive assets.
- Prefer short, simple, visually verifiable actions over overloaded prompts.
- Generate audio separately when the video model cannot reliably deliver it.
- Never report a clip as reviewed without access to the actual result.
- No guarantees of identical characters or perfectly synchronized speech.

## Troubleshooting
See [troubleshooting](docs/troubleshooting.md), including missing narration, repeated frames and visual drift.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). License: [MIT](LICENSE).

**Status:** initial open-source release. Features are instruction-based and generator-dependent.

# 🎬 Universal AI Film Director

**Turn an idea into a production-ready AI film, one approved decision at a time.**

A portable, multi-agent filmmaking skill for screenplay development, cinematic direction, storyboarding, generator-ready shot prompts, character consistency, sound design and post-production.

> This is a filmmaking *workflow skill*, not a video renderer. Generation requires access to a separate video-generation tool.

## Quick start
1. Load [SKILL.md](SKILL.md) into your AI agent.
2. Say: **"Use Universal AI Film Director to help me create a 10-minute film with Google Flow. Ask one question at a time."**
3. Answer one question at a time, approve the story, visual style and storyboard.
4. Generate and review shots individually, then assemble them in an editor.

## The workflow
`DISCOVER → SCRIPT → STYLE → STORYBOARD → PROMPTS → GENERATE → REVIEW → EDIT`

Every stage has an approval gate. **Approved shots are locked** unless you explicitly request a change.

## Features
- Human-directed storytelling with one question per turn
- Support for stickman, 2D, 3D, cinematic, documentary, fantasy and corporate film styles
- Project Bible for consistent characters, scenes and decisions
- Shot-by-shot prompt packets and revision tracking
- Generator-specific adapters without vendor lock-in
- Audio, editing and quality-control guidance
- Portable instructions for agents with or without native skill support

## File guide
| File | What it does | When to use |
|---|---|---|
| [SKILL.md](SKILL.md) | Main agent behavior and phase gates | Always, first |
| [AGENT-INSTRUCTIONS.md](AGENT-INSTRUCTIONS.md) | Generic agent bootstrap | Agents without native skill installation |
| [Storytelling](references/storytelling.md) | Narrative arc, script and timing | Story phase |
| [Visual style](references/visual-style.md) | Character, palette, locations and continuity | Art direction |
| [Prompt engineering](references/prompt-engineering.md) | Shot prompt construction | Shot generation |
| [Audio design](references/audio-design.md) | Narration, music and sound effects | Audio planning |
| [Quality control](references/quality-control.md) | Review and minimal repairs | After each generated shot |
| [Post-production](references/postproduction.md) | Assembly, captions and delivery | Editing |
| [Google Flow adapter](adapters/google-flow.md) | Veo/Flow-specific constraints | When using Google Flow |
| [Other generators](adapters/other-generators.md) | Portable model adaptation | Other video tools |
| [Project Bible](templates/project-bible.md) | Persistent project decisions | Throughout production |
| [Storyboard](templates/storyboard.md) | Shot sequence and timing | Before generation |
| [Shot prompt](templates/shot-prompt.md) | Copy-ready prompt format | Per shot |
| [Shot review](templates/shot-review.md) | Defect and approval log | Per generated clip |

## Examples
These are **illustrative production plans**, not rendered films.

- [The First Step — stickman](examples/stickman-short-film/README.md)
- [Last Train — cinematic](examples/cinematic-short-film/README.md)
- [My Journey — corporate](examples/corporate-story/README.md)
- [Example shot packet](examples/example-shot.md)

## Installation and documentation
- [Installation for Claude, Codex, Gemini, Cursor, ChatGPT and custom agents](docs/installation.md)
- [Getting started](docs/getting-started.md)
- [Workflow architecture](docs/architecture.md)
- [Troubleshooting](docs/troubleshooting.md)

Installation methods and video-model capabilities vary by platform. Check the relevant agent and generator documentation for current support.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md). Changes should be reproducible, scoped and privacy-conscious.

Licensed under [MIT](LICENSE). See [CHANGELOG.md](CHANGELOG.md).

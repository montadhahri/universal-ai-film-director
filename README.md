# 🎬 Universal AI Film Director

**Portable, modular AI filmmaking skills.** One Director orchestrates six specialist skills for story, visual identity, cinematography, video production, sound and continuity/quality review. The skill collection contains instructions and contracts; it is **not** a built-in video generator.

**Development:** v2 architecture (Unreleased). **Latest tagged version:** [v1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) remains available in Git history. Repository PRIVATE; Production GO HOLD. No finished film has been generated or verified by this repository.

[Architecture](docs/architecture.md) · [Roadmap](docs/ROADMAP.md) · [Installation](docs/installation.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

## Skills

| Skill folder | Responsibility |
| --- | --- |
| `skills/universal-ai-film-director/` | Director: discovery, approvals, canonical Project Bible, stage handoffs |
| `skills/film-storytelling/` | Story structure, screenplay and narration |
| `skills/film-visual-direction/` | Visual Bible, character identity and world continuity |
| `skills/film-cinematography/` | Storyboards, timed shots, camera and lighting |
| `skills/film-video-production/` | Generator-adapted shot packets and factual execution evidence |
| `skills/film-sound-direction/` | Narration, dubbing, music, cues and intentional silence |
| `skills/film-continuity-qa/` | Defect reports, media review and scoped repairs |

Each skill is a self-contained `SKILL.md` with a just-in-time `references/guide.md`. Skills are not required to execute other skills: if the host has no delegation, a single agent can follow the Director instructions and stage logic sequentially.

## Use

Give a compatible agent the Director `skills/universal-ai-film-director/SKILL.md` and its references. For native skill discovery, install the desired skill directories per [installation instructions](docs/installation.md). The Director asks one discovery question at a time and never infers screenplay, Visual Bible or storyboard approvals.

**Provider access is optional for planning.** Actual video or audio generation requires a real, authorized service/tool. Without it, the skill returns shot packets or reports `BLOCKED_NO_PROVIDER` rather than claiming a finished MP4. Published private releases and Git tags do not grant Production GO.

## State and tests

- `contracts/project-bible.schema.json` — current Project Bible JSON contract.
- `contracts/handoff.schema.json` — versioned specialist PROPOSED artifact contract.
- `scripts/project-contracts.js` — optional Node.js deterministic state utilities.
- `tests/` — offline repository, safety, packaging and synthetic behavior tests.

Run with Node.js 22:

```bash
node tests/validate_repo.js
node tests/package/validate-package.js
node --test tests/node/*.test.js
node tests/preprod/run_validation.js --out build/preprod-validation.json
```

CI tests instruction contracts and packaging but **does not** invoke an LLM, render video, access private accounts or verify film quality.

## Versioning and governance

The working branch has **one current implementation**. Do not add version folders such as `v1/`, `v2/` or `v3/`; historic versions are accessible via Git tags. All work proceeds in reviewed PRs. No direct pushes to `main`, unauthorized account access, public visibility changes, tags or PROD GO.

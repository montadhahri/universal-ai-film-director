# Marketing showcase — The Missing Umbrella

**Playable output:** an original 30-second 2D animation with a 5-shot
storyboard, moving rain/characters, synthesized ambience and a final caption.

**Actual execution evidence:** The vector frames and MP4 video are rendered
by the repository's `render-demo.js` using Node.js + FFmpeg. The
`showcase-render.yml` workflow runs the renderer, verifies media duration and
streams using `ffprobe`, then uploads `missing-umbrella.mp4` as a **private
GitHub Actions artifact**. The source for this result lives in this directory.

**Truthful limitation:** No external AI agent, AI video generator, character
reference tool or voice-dubbing service was executed. This is an
**editorially scripted, skill-guided, reproducible render**, NOT evidence of
autonomous agent compliance, video-model quality or approved customer work.
The discovery and approval records below are **fictional demonstration data**.

## Story and approval gates (illustrative)

*Premise:* A tired commuter encounters a stranger without an umbrella.
The first commuter opens an absurdly tiny umbrella; the two manage to share
it, and the rain stops. The message is that small gestures matter.

*Discovery inputs:* 30 seconds, all ages, 16:9, 2D flat animation, no speech,
warm humor, no identifiable real people, no third-party media.

*Gate log:* screenplay v1 — **SIMULATED APPROVAL**; visual bible v1 —
**SIMULATED APPROVAL**; storyboard v1 — **SIMULATED APPROVAL**.
These are not actual user permissions for another project.

## Approved-for-demonstration visual continuity

C01 = dark blue raincoat, dark hair. C02 = red coat with warm scarf.
L01 = blue-gray bus shelter with fixed supports and bench.
U01 = small golden-yellow umbrella. Rain decreases in final shot.
Shot IDs are stable; no protected shot revisions are overwritten.

| Shot | Output time | Dramatic beat | State |
| --- | --- | --- | --- |
| S01 | 0–6s | Establish the rainy shelter | SIMULATED_APPROVED |
| S02 | 6–12s | Stranger arrives without shelter | SIMULATED_APPROVED |
| S03 | 12–19s | Tiny yellow umbrella opens | SIMULATED_APPROVED |
| S04 | 19–26s | Shared cover becomes the punchline | SIMULATED_APPROVED |
| S05 | 26–30s | Rain clears; concluding caption | SIMULATED_APPROVED |

**Audio:** original programmatically synthesized pink-noise ambience and
a quiet sine-tone bed; no third-party recordings, dialogue or AI-generated voice.

## Reproduce the film

Requires Node.js 22 and FFmpeg with `librsvg` SVG support, `libx264`
and AAC support:

```bash
node examples/marketing-showcase/render-demo.js build/marketing-showcase
ffprobe -v error -show_entries format=duration:stream=codec_type -of json build/marketing-showcase/missing-umbrella.mp4
```

The GitHub Actions workflow stores the playable MP4 as a 14-day private build
artifact. This is not a public marketing distribution mechanism and does not
change repository visibility.

## Evidence levels

- Actual scripted video render: **EXECUTED** (when the render workflow passes).
- Byte-level file/package validation: **separate automated checks**.
- Independent Agent Skill test: **NOT RUN**.
- Authenticated private remote `npx` installation: **NOT RUN**.
- AI video model: **NOT RUN**.
- Narration/dubbing model: **NOT RUN**.
- User/customer approval: **NOT RUN**.

No user footage, personal story or private workplace material was used.

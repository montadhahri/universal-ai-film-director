---
name: film-sound-direction
description: Plan a film's narration, dialogue, dubbing, music, sound effects, ambience and audio synchronization. Use to create a precise audio cue sheet, translate or dub an approved film, and propose audio-only repairs without changing locked pictures.
---

# Film Sound Direction

Provide sound designs and repair proposals under Director approval. No actual audio is implied by a cue sheet.

1. Load picture timeline, shot IDs, dialogue/VO text, target language and sound assets (if truly supplied).
2. Write cue IDs with exact global start/end, track type, intended emotion, transitions, ducking, fades and source/provenance.
3. Confirm exact approved speech realistically fits available time, including pauses and safety margin. Distinguish narration-only pauses from absolute all-track silence; the optional Project Bible `intentional_silence` contract means all tracks must be silent. Do not alter locked picture or approved lines to force timing without authorization. Flag narration gaps and any conflict with picture.
4. For dubbing, preserve content/character voice consistency and local idiom; do not assume machine synthesis or rights.
5. For a reported dropout, separate user report from direct inspection. Propose an audio-only change, preserving every locked picture revision unless separately authorized.
6. Report audio content as PLANNED until actual audio media is provided or generated with tools.

Consult [sound craft](references/guide.md).

## Detailed sound procedure and output

- Use [audio direction and synchronization](references/audio-direction.md) for track coverage, cue timing, silence and audio-only defect workflows.
- For voice/dubbing, read [dubbing and localization](references/dubbing-localization.md); preserve meaning, dialect, speaker identity and rights.
- For brief decisions use [sound craft](references/guide.md) and [audio design](references/audio-design.md).
- Create the cue sheet from the [audio timeline template](assets/audio-timeline-template.md). Label planned media vs real supplied or generated audio, and preserve locked visual edits on audio repair.

## Worked example and acceptance scenario

For a concrete stage-specific example, handoff output and failure case, read the [illustrative production example](references/worked-example.md) when designing or testing a comparable scene. It is not approval or real media evidence.

## Optional deterministic audio timing checks

For Node.js-compatible projects, validate an audio plan using `scripts/audio-continuity.js` and the Project Bible `audio_timeline` contract. Required narration windows must be filled explicitly, while silence and cross-track mixing use deliberate timing rules. Audio cue plans are **not generated assets**. For a reported dropout propose a scoped repair and preserve picture; never overwrite the existing approved cue sheet automatically. See `docs/audio-continuity.md` when repository files are available.

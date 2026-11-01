# Audio timing and dependency-aware continuity (planning-only)

The Pipeline V2 extension validates an **audio cue plan** and computes the downstream impact of a proposed change without modifying any assets or Project Bible entries.

## Audio timeline contract

`audio_timeline` uses integer milliseconds and the same film duration as `shot_timeline`. Every cue has a unique `id`, `track` (narration/dialogue/music/sfx/ambience), `start_ms`, `end_ms`, and `status` (`PLANNED`, `USER_SUPPLIED`, `GENERATED_UNVERIFIED`). A cue is a planning record; its status **does not prove a media file exists or was inspected**.

Different tracks may overlap: VO + music + sound effects are expected. Within a single track, overlapping cues are rejected until an explicit mix/layer contract is designed. Declared `intentional_silence` intervals prohibit **all** cue activity. The `required_narration` array lists only the time windows that genuinely require narration; every millisecond of those windows must be covered by narration cues. Other portions are **not automatically treated as missing voice-over**. For pauses that preserve music or ambience, leave a gap in `required_narration` instead of declaring absolute silence.

Example: narration at 0–8 s and 18–26 s, music at 0–18 s, absolute silence at 26–30 s. Intentional silence is explicitly distinguished from a narration dropout.

## Dependencies and repair impact

`dependency_graph` contains unique `shot:<id>`, `audio:<id>`, and `anchor:<id>` nodes. Each edge `from -> to` means **the destination depends on the source**. Graph validation detects missing nodes, duplicates and cycles.

`previewRepairImpact(project, {expected_revision, target})` walks **only outgoing downstream dependencies** and returns impacted/unaffected IDs and any affected locked picture. It never automatically regenerates, unlocks, approves, uploads, writes files or inspects media. Edges must reflect actual production dependencies: incomplete graphs under-report impact and must be reviewed by the Director.

An audio-only change to `audio:VO2` leaves locked `shot:S02` unchanged when no downstream shot depends on that audio. Changing `anchor:CHAR1` may impact `shot:S01`, `shot:S02` and their dependent cues; this is a **planning report**, not permission to edit locked assets.

## Usage and limits

```js
const {validateAudioTimeline,validateDependencyGraph,previewRepairImpact}=require('./scripts/audio-continuity.js');
```

`recordAudioTimeline` is allowed once during approved storyboard sound planning and uses `expected_revision` to prevent stale writes. Replacements require a future scoped audio-repair proposal; existing timelines are never silently overwritten.

No media generation, account connection, spending, release, or production authorization. The user controls approvals. The tools are optional Node.js helpers; portable Markdown-only skill use remains supported.

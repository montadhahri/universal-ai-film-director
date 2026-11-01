# Audio direction and synchronization

This is a planning/review procedure, not a speech generator or audio editor.
Load the approved storyboard, shot plan and Project Bible. Never infer that
unprovided media was inspected or rendered.

## Timeline contract
- Use one film timeline in seconds, starting at zero and ending at the approved
  film duration. Each cue has stable ID, kind, start, end, source/status and
  optional shot IDs. Audio cues may span visual cuts.
- Separate narration, dialogue, music, ambience, SFX and intentional silence.
  Overlap across **different** tracks is normal. Overlap on a single narration
  track requires an explicit artistic reason and mixing plan.
- Distinguish **track-specific silence** (e.g. a deliberate narration pause while music or ambience continues) from **absolute silence** (no cues on any track). Narration gaps are defects only where narration is expected. In the optional Project Bible `audio_timeline` validator, `intentional_silence` means absolute silence and forbids all cue activity; represent narration-only pauses as gaps in `required_narration`, not as `intentional_silence`.
- When preparing the portable cue sheet, label silence scope (`narration-only`, `dialogue-only`, or `all-tracks`) and its exact interval; do not imply that a voice pause mutes music or ambience.
- Align each exact approved line to a cue window. Record its word count, estimated delivery rate/duration, breaths/pauses and remaining margin. Flag impossible or unverified speech timing rather than shortening approved text or shifting locked picture. Speech-rate estimates are planning assumptions, not proof of generated audio duration.
- Before publishing speech estimates, independently recount the literal approved line (do not include cue IDs or punctuation-only tokens) and cross-check arithmetic: articulation seconds = word count × 60 / assumed words per minute; estimated total = articulation + breaths/pause allowance; remaining margin = cue window duration − estimated total. Show inputs and calculations for each line, recompute if any text changes, and mark performance timing UNVERIFIED until a real take is measured. Do not claim a precise margin from an unverified count.
- Check complete coverage for each **required** continuous track (e.g. music
  bed) and narration segments individually; do not demand narration at every
  second of a film.

## Workflow
1. Collect exact approved narration/dialogue script and target language/dialect.
2. Assign cue IDs and time windows against the approved visual timeline.
3. Mark speaker/voice identity, pronunciation, emotional delivery and rights.
4. Specify separate audio assets and their actual file references if supplied.
5. Verify the cue plan against film duration, shot cuts and transitions.
6. For an observed defect, request the media or timecoded evidence; diagnose
   only what evidence supports.
7. Propose an **audio-only** repair plan identifying unchanged locked picture,
   affected cue IDs, revised timing and acceptance criteria.
8. Record revisions without overwriting prior approved audio.

## Dubbing and localization
Use **dubbing guidance**. Preserve
meaning, speaker identity and approved language variety. Timing can differ
between languages; do not translate word-for-word if it breaks natural speech.
Obtain approval for changed lines. Do not clone real voices without consent.

## Typical failure: narration cuts out at 33s
Do not infer why it happened. Ask for the actual audio/video or export timeline,
check the intended cue and source length, then propose re-recording/replacing
only the missing audio range. Keep picture, shot order and visual transitions
unchanged. Re-export and verify the entire film, not just the patched second.

## Acceptance
Audio plan includes all intended narration lines, explicit silence, cue
boundaries, crossfade/ducking notes, language and asset provenance. A plan
alone does not prove the final export is synchronized.

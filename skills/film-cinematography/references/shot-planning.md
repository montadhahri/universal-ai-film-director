# Professional shot planning — director workflow

Use after screenplay and visual-bible approval. The storyboard itself remains
PROPOSED until explicitly approved. Load
**cinematography**,
**lighting and composition**,
**the shot plan**, and the existing
**storyboard**.

## Per-sequence planning

1. State the dramatic beat, viewer information, emotional intent and scene
   geography. Do not add story facts without user authorization.
2. Divide the beat into **necessary** shots. Prefer fewer purposeful shots over
   gratuitous camera movement; note establishing, action and reaction coverage.
3. Give each shot a stable ID, version, duration, camera size/angle, subject
   blocking, action, light, continuity anchors, audio cue and transition.
4. Check eyelines, screen direction, matching action and position continuity.
5. Identify what the viewer sees/hears at each cut, including intentional
   pauses. A transition is an edit decision, not automatically a new shot.
6. Fit the duration budget and generator limits. If an individual clip is longer
   than verified generator capabilities, plan multiple clips or an edit; never
   claim a tool can generate it in one pass without verification.
7. Present a complete **proposed** storyboard and obtain explicit approval.
8. On revision, list affected shot IDs and dependencies. Locked shots remain
   unchanged unless the user explicitly authorizes a scoped unlock.

## Camera decision rubric

- Establishing/wide: geography and relationships.
- Medium: character action and dialogue readability.
- Close-up: precise emotion or important object.
- Static: clarity, tension, contemplation or budget constraints.
- Pan/tilt/dolly/tracking: only when motivated by subject movement, discovery
  or emotion. Prefer one legible camera move per generated shot.
- Handheld/rapid moves: use sparingly; motion complexity increases artifact risk.
- Camera rules from the approved visual bible take precedence over defaults.

For every shot ask: what must be understood, why this viewpoint, what changes
during the shot, and what motivates the next cut?

## Timing accounting

Use **one continuous film timeline**. Each shot has an explicit start and end,
with duration `end - start`. Overlaps are allowed only when explicitly
declared as transitions (e.g. dissolves). Avoid double-counting transition
duration: if a dissolve overlaps two clips by 1s, total timeline duration is
`sum(clip durations) - sum(overlap durations)`. Audio may cross shot boundaries
without creating a new visual shot. Reserve planned silence and title cards.

## Output contract

The shot packet retains separate visual, narration/dialogue, SFX/music and edit
instructions. Include acceptance criteria and handoff to the next shot.
Mark unknown generator limits as UNVERIFIED. Do not claim real rendered
footage or successful continuity from text alone.

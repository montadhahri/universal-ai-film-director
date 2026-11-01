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
4. Check eyelines, screen direction, matching action and position continuity. For each cut record the stable location/character/prop IDs, screen-side or axis assumptions, handoff state, dependent adjacent shot IDs, and any unresolved blocking. A camera reversal does not authorize mirroring the approved set.
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

Use **one continuous global edit timeline**. Each on-screen shot interval has an explicit start and end; the union of visible coverage must reach the target duration without unintended gaps. Separately track source-clip in/out durations and each transition's overlap with incoming/outgoing shot IDs. For sequential clips, edit duration is `sum(source clip durations) - sum(transition overlaps)`, but **never subtract overlaps again from global edit timestamps**. If a dissolve occupies 1s of global edit time, label that same second as both clips visible; do not add a phantom second or conceal a gap. Flag any conflict between the two accounting methods as BLOCKED/UNRESOLVED for Director review. Audio may cross shot boundaries
without creating a new visual shot. Reserve planned silence and title cards.

## Output contract

The shot packet retains separate visual, narration/dialogue, SFX/music and edit
instructions. Include acceptance criteria and handoff to the next shot.
Mark unknown generator limits as UNVERIFIED. Do not claim real rendered
footage or successful continuity from text alone.

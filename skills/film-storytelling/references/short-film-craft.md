# Short-film storytelling craft — decisions that produce filmable stories

Load this reference when the creator wants a stronger screenplay, emotional payoff, visual narrative, dialogue restraint, or a revision of weak beats. This is **creative advice**, not a generator, an automatically approved screenplay, or a fixed formula.

## Start with the film's dramatic promise

Capture the user's supplied protagonist, desired change, runtime, tone, audience and language. Do not invent autobiographical details, hidden motivations or sensitive history as facts. Recommend creative alternatives as `PROPOSED` and mark assumptions explicitly.

A useful short-film premise states:
- **Someone wants something visible:** a child protects a fragile light; a musician decides who receives an instrument.
- **Something resists:** time, distance, mistaken belief, a cost or internal hesitation made visible in action.
- **A choice changes the situation:** a sacrifice, reversal, rediscovery or refusal that the camera can actually capture.
- **The final image responds to the first:** a repeated object, altered composition or action that carries the emotional conclusion.

Genre can change the shape. Comedy may rely on setup, repetition and a visual reversal; a lyrical film may rely on motif and emotional contrast with little causality; documentary or autobiographical work must respect true supplied facts. Do not enforce a mechanical three-act arc where it damages the filmmaker's intent.

## Design beats before prose

For each proposed beat, write `beat_id`, `start_ms`, `end_ms`, `visible_action`, `dramatic_function`, `new_information_or_change`, and optional `dialogue_or_vo`. Exact beats must fit the requested runtime and leave space for understandable actions, audience reaction and transitions. These are **screenplay timing estimates**, not verified shot or audio sync. The Director and Cinematography must reconcile them into an approved shot timeline.

Audit every beat:

1. What can the audience **see or hear** at that moment?
2. What changes between the start and end of the beat?
3. If removed, would viewers lose causal clarity, an important emotion, or needed setup?
4. Does it repeat information already conveyed by the picture or narration?
5. Is the physical action credible within the allotted seconds?

If the only answer is "the audience understands the theme," give the character an observable action instead of writing an abstract instruction to *feel sad*.

## Emotional rhythm and payoff

Give viewers time to register a discovery, a hesitation or a consequence. Compression is not speed for its own sake. A useful rhythm can be:
- An opening image or action that immediately defines a situation.
- One escalation that increases the cost or changes the audience's assumption.
- A short moment of choice, reversal or recognition.
- A final image that makes the opening newly meaningful.

**Motif payoff:** plant a concrete object, color, gesture or sound early; return to it with changed meaning. Do not introduce a magical solution or an unseen character in the final seconds unless it has been set up. Avoid default sentimental VO when the performance or framing already communicates the feeling.

## Dialogue, narration and silence

Distinguish on-screen `DIALOGUE` from off-screen `VOICE_OVER` and from `SILENCE`. Write exact spoken text and identify language, speaker and where it should land. Avoid VO describing literally visible actions ("She walked to the door") unless repetition is a deliberate formal choice.

Estimate speaking duration using explicit assumptions: `seconds = (word_count / words_per_minute) * 60`. Use an assumed delivery range, for example 110–150 WPM for an ordinary reflective read, and **label it an estimate**. Slow, emotional multilingual delivery may need more time. Don't declare narration synchronized until a real voice recording or sound timeline is checked.

A beat without speech is not automatically absolute silence; sound design may use music, ambience or SFX. Annotate `NO_VO` separately from `ABSOLUTE_SILENCE_PROPOSED`, and have Sound Direction reconcile the cue plan.

## Genre-specific options without cliché

- **Comedy:** build expectation with a precise object/action, escalate it and finish with an earned visual reversal. Repetition must change, not merely happen three times.
- **Emotional drama:** show the decision or its consequences; avoid telling viewers what to feel. Use a tactile detail rather than an unearned speech.
- **Fantasy:** establish one understandable rule and show a consequence; avoid introducing new powers just to solve the climax.
- **Thriller:** control what the audience knows and when; preserve spatial orientation so suspense is not confusion.
- **Autobiographical:** propose respectful abstraction or fictionalization only as a choice. Never convert imagined details into claimed biography.

## Constructive story doctor review

Before proposing screenplay approval, identify at most the **three highest-impact problems** with evidence from specific beats: unclear goal, unearned resolution, repeated exposition, implausible timing, inconsistent character choice or broken chronology. For each, offer the smallest filmable rewrite, its audience impact and its creative trade-off. If the author likes an unusual structure, challenge only concrete weaknesses, not unconventionality itself.

When asked to revise an approved screenplay, do **not** overwrite it. Name the exact affected beat IDs, preserve the original approved revision and request scoped authorization if required by the Director's gate/lock rules.

## Portable output contract

```text
SCREENPLAY PROPOSAL — STATUS: PROPOSED
Project / input revision: ...
Screenplay ID / version: ...
Confirmed constraints: ...
Creative assumptions (not facts): ...
Logline: ...
Audience emotional journey: beginning -> turn -> ending
Theme expressed through visible action: ...
Beats:
  BEAT-01 | 0–5s | observable action | change | VO/DIALOGUE/NO_VO
  ...
Timing: estimated; cinematography reconciliation required
Narration: exact text; language; estimated rate and duration
Continuity anchors: ...
Risks / smallest improvements: ...
Director handoff: request_id, input_revision, artifact id/version, PROPOSED
Approval: required from user via Film Director
Media: NOT_RENDERED
```

Never write `APPROVED`, `LOCKED` or `GENERATED` based on the specialist's opinion. This reference describes a design method; it contains no observed real-agent benchmarks or actual video footage.

## Worked case A — 45-second lighthouse, minimal narration

**User constraints:** A lonely lighthouse keeper believes the last visitor has gone, then finds a handwritten note. Runtime 45 seconds, no more than 15 spoken words.

**Proposed beat economy:** 0–7s keeper closes a guest log; 7–18s distant ferry disappears into fog; 18–29s a page flutters under a cup; 29–38s keeper reads a note (show only an approved legible fragment if needed); 38–45s keeper opens the door and leaves the light on. The note reveals someone cared without claiming an unseen character is physically present.

**Proposed narration:** "Some lights are left on for someone who may return." (11 words). At an illustrative 120 WPM this is about 5.5 seconds, without emotional pauses. Let the rest of the story play visually and preserve room to read the note.

**Trade-off:** The implied visitor remains mysterious; revealing exactly who wrote the note would require more setup. Mark script `PROPOSED`, not approved. These beats are examples, not generated shots.

## Worked case B — 30-second bittersweet instrument, no narration

**User constraints:** An elderly street musician gives away an instrument. Bittersweet, 30 seconds, no narration.

**Proposed beat economy:** 0–6s musician tunes a worn instrument as commuters pass; 6–13s a child listens from the edge of the frame; 13–20s the musician hesitates with the case open; 20–26s the musician hands over the instrument rather than taking a coin; 26–30s the child plays one uncertain note while the musician listens, hands now empty.

**Why it works:** the audible note and empty hands reveal both loss and hope; the payoff is a change in who gets to make music. Don't invent why the musician is alone or where the child lives.

**Trade-off:** The gesture is intimate rather than grand. If the creator wants a larger farewell, propose a different ending while keeping the original as a candidate. `NO_VO` is not `ABSOLUTE_SILENCE`.

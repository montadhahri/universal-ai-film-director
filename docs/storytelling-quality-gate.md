# Storytelling Creative Quality Gate — pre-handoff checklist

This is an **editorial preflight**, not a screenplay approval, an autonomous creative critic, a production gate, or evidence that the skill outperforms v1. It runs *before* the specialist returns a **PROPOSED** screenplay to the Director. A clean structural report only means the proposal is ready for a human/Director review.

## Pre-generation feasibility

Use `reviewBrief` for structured hard timing constraints before drafting. Compatible note-reading and absolute-silence intervals may overlap; calculate their union. BLOCKED means constraints are infeasible, not that artistic quality is poor.

## Review sequence

1. **Audience attention:** Does the audience need to read an on-screen note, recognize a visual clue, or study a subtle facial reaction? Avoid simultaneous explanatory voice-over unless the artist intentionally chooses that effect. Flag competing VO as a review warning rather than blindly prohibiting overlapping sound.
2. **Emotional breathing room:** Allow enough screen time to register a decision and its consequence, especially the final image. Review a payoff under ~3.5 seconds, not as a universally invalid cut.
3. **Filmable action:** Mark complex physical actions for scrutiny when compressed into under ~4 seconds. Estimate camera/readability and possible edit pacing, not just narration words.
4. **Narrative redundancy and causality:** Challenge VO that repeats the picture, mystery revelations without setup, payoffs unrelated to the opening, and unmotivated location changes. These require **human creative judgment**, not automatic scores. Review emotional specificity, protagonist choice/recognition and a transformed earlier motif; allow unconventional storytelling.
5. **Prop continuity:** Track story-critical props by owner/location across beat IDs. Explicitly identify transfers; if the same scarf appears on a departing character and later indoors with no handoff, flag the contradiction. A self-declared continuity PASS is insufficient.
6. **Timing and constraints:** No invalid beat boundaries, beat gaps, narration that cannot fit its estimated delivery, or violation of a strict no-VO/maximum-word constraint.
7. **Revision discipline:** Identify up to three most important changes and their beat IDs. Make the **smallest proposed revision** before handoff. Never silently modify previously approved screenplay, picture, or audio.

## Optional deterministic aid

`scripts/storytelling-preflight.js` consumes a *proposed*, structured screenplay draft with beat intervals, optional visual_attention annotations (`READ_TEXT`, `SUBTLE_REACTION`), narration cues and optional assumed speaking rate. Its outputs are `REVISION_REQUIRED` for objective issues or `READY_FOR_DIRECTOR_REVIEW` when no objective violations are detected; both may carry editorial warnings.

The rule-of-thumb reaction and physical-action thresholds (3.5 and 4 seconds) are **prompts for review**, not established film laws. On-screen reading conflicts rely on a correctly annotated beat, not actual media observation. Word counts use whitespace-separated tokens from the finalized narration text (including contractions as one token). A supplied `declared_word_count` is checked against that count; do not trust an agent's stated total. Speaking rate estimates do not establish audio synchronization. A structural PASS does not imply artistic merit or user approval.

## Reproduce the four offline scenarios

```bash
node --test tests/node/storytelling-preflight.test.js
```

- Lighthouse (45s): narration overlaps reading a handwritten note; flag competition for attention. Moving it after the reveal should eliminate that warning while leaving visuals intact.
- The Last Note (30s): no narration; flag a hypothetical compressed reaction.
- Unseen test A: a new envelope reveal with voice-over occurring during a text-reading shot.
- Unseen test B: a new door-opening film with an extremely short final reaction.

These are **synthetic regression fixtures**, not independent agent-generated screenplays. To claim improved storytelling, run the prompts through the actual installed skill on an independent host, capture its responses, review the outputs and compare them using the repo's v1/v2 benchmark.

## Scoped revision safety

For audio-only changes, preserve approved visuals, screenplay and shot timing. Declare changed artifact IDs, protected versions and dependencies; escalate conflicts to the Director. `reviewRevisionScope` checks declared types only, not real diffs or authentic approval.

## Approval boundary

`READY_FOR_DIRECTOR_REVIEW` is not an approval gate and must never set `gates.script.approved`. The Director presents the actual screenplay version to the user; only explicit, verified user approval may advance the project.

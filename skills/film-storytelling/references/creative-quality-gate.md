# Storytelling Creative Quality Gate

Use **before handing a PROPOSED screenplay to the Film Director** and whenever a draft risks poor clarity, rushed emotion or unfilmable timing. This is an editorial self-review, not a replacement for the user approval gate. Avoid endless self-rewriting: identify at most three high-impact problems; propose a targeted fix; keep unusual choices when intentional.

## Attention competition

Mark beats where the audience must **read text**, **notice a small clue**, or **study a subtle reaction**. Ask whether concurrent narration draws attention away from that job. Consider delaying the VO, giving the visual detail more time, or replacing redundant VO with image/sound. Simultaneous text and VO can be intentional; record a reason instead of applying a blanket prohibition.

## Reaction and action timing

Audit whether the final choice/reversal has time to register. A 2-second emotional reaction or rushed handover is a **review warning**, not necessarily a failure. Allow the Director to choose a faster style if justified by genre. Check complex action beats against physical staging and shot count, not just a beat timestamp.

## Causality and payoff

Does every important payoff have an earlier plant? Does the character make a visible choice? If narration states what the viewer already sees, cut or reinterpret it. Preserve the filmmaker's desired emotion and genre. Avoid generic formulas, invented biography and new unstated plot facts.

## Safe handoff format

```text
SCREENPLAY-Vn — PROPOSED
Creative preflight: READY_FOR_DIRECTOR_REVIEW | REVISION_REQUIRED
Beat continuity: ...
Audience attention conflicts: ...
Narration timing assumption: ...
Emotional payoff dwell: ...
Highest-impact concerns (up to three): ...
Proposed scoped changes and tradeoffs: ...
Approved revisions preserved: ...
User approval: NOT_GRANTED
Media status: NOT_RENDERED
```

If a structural check passes but artistic quality remains doubtful, report the concern transparently. `READY_FOR_DIRECTOR_REVIEW` means only that objective rule checks did not find a blocker; it is **not** script approval, a verified emotional impact or a media inspection result.

## Optional Node.js preflight

The repository includes `scripts/storytelling-preflight.js` to flag timing/annotation conflicts in an optional machine-readable draft. It can inspect labeled screenplay data, not real film, actual voice performance, or authentic user authorization. Without Node.js, perform the same human-readable checks manually. For example, a 45-second lighthouse reveal should not casually place explanatory narration over reading a note; a 30-second gift story should check whether its final musical exchange has time to register.

These are **teaching examples only** and do not constitute actual agent evaluation.

# SND-01–SND-06 — Sound Direction independent-agent evaluation

Exact versioned prompts and **private reviewer criteria**: [sound-direction-cases.json](../tests/agent-acceptance/sound-direction-cases.json). Separate from the canonical 14-case V2-03 suite; no additional runner.

## Coverage

| Case | Primary risk |
| --- | --- |
| SND-01 | Exact narration and multi-track 30s audio coverage |
| SND-02 | Narration-only pause while music/ambience continue |
| SND-03 | Absolute all-track silence and conflicting beds/SFX |
| SND-04 | Tunisian Arabic dub, rights and speech feasibility |
| SND-05 | Reported dropout, audio-only repair, locked picture |
| SND-06 | Missing approvals/script, overlapping VO and unverified provider |

## Independent execution

1. Pin main SHA after merge; load actual `skills/film-sound-direction/SKILL.md`, `references/guide.md`, `references/audio-direction.md`, `references/dubbing-localization.md`, `references/audio-design.md`, `references/worked-example.md`, `assets/audio-timeline-template.md`, and `docs/audio-continuity.md` (when available). Record hashes and loading evidence.
2. Execute each **exact manifest prompt** in a separate clean agent context. Provide the executing agent no `expected` criteria, previous responses or reviewer notes.
3. Preserve full outputs, host/model details if available, timestamps if available, file-loading evidence and provenance limitations.
4. Privately score all four documented criteria per case with concrete cue/timing/text evidence. Scenario PASS requires 4/4; otherwise FAIL, BLOCKED or NOT_RUN.
5. Distinguish observed failures from fixture ambiguity and untested risks. Only propose minimal evidence-based fixes. The canonical runner does not grade this pack; do not claim offline runner coverage.

Fixture check: `node --test tests/node/sound-direction-cases.test.js`.

No media generation, dubbing, accounts, approvals or production submissions. Production GO **HOLD**.

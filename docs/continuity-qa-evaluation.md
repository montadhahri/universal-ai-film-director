# QA-01–QA-06 — Continuity QA independent-agent evaluation

Exact scenario prompts and **private reviewer criteria**: [continuity-qa-cases.json](../tests/agent-acceptance/continuity-qa-cases.json). This pack supplements, but does not replace, canonical acceptance tests.

## Coverage

| ID | Primary risk |
| --- | --- |
| QA-01 | Reported repeated frames without accessible media |
| QA-02 | Narration-only repair while picture remains locked |
| QA-03 | Missing opening/ending and source asset uncertainty |
| QA-04 | SH03→SH04→SH05 spark transfer and retained location |
| QA-05 | Provider-reported generation versus repair verification and release |
| QA-06 | Narration dependency, localized rollback and no bulk video regeneration |

## Independent execution protocol

1. Pin latest merged main SHA. Load actual `skills/film-continuity-qa/SKILL.md`, every linked reference, all three asset templates, and `docs/audio-continuity.md` when dependency conventions matter. Record file paths and hashes.
2. Run each **exact prompt** in a separate fresh clean agent context. Supply only that prompt and the actual skill instructions/references. **Withhold expected criteria, historical reports, reviewer notes and other responses** from executing agents.
3. Capture full unabridged responses, prompt hashes, file hashes, execution timestamps and available host/model identity. Describe filesystem/process isolation limitations rather than inventing guarantees.
4. Independently evaluate four documented criteria per scenario using direct quotations/locations in responses. A scenario PASS requires 4/4. Use PASS, FAIL, BLOCKED or NOT_RUN; distinguish fixture omissions from skill defects.
5. Preserve original results and rerun only affected scenarios after narrowly scoped fixes. The repository's existing offline runner does not automatically grade these cases; never claim it did.

Fixture integrity: `node --test tests/node/continuity-qa-cases.test.js`.

No real footage is supplied in these scenarios. The expected result is evidence-grounded **planning**, not completed repair or media-based release. No accounts, uploads, paid tools, generation, repository edits or approvals. Production GO **HOLD**.

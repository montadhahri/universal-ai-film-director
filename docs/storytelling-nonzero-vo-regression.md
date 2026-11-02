# ST-01B — nonzero narration arithmetic regression

This **additive** scenario closes a coverage gap in the historical ST-01 post-fix run: ST-01 permitted zero narration and therefore could not exercise spoken-word counting or performance-time arithmetic. Historical ST-01 remains unchanged, including its historical FAIL and later 4/4 PASS.

The specified VO is **10** whitespace-separated tokens: Some / lights / are / left / on / for / someone / who / may / return. At exactly 120 WPM, the unpaused estimated duration is **5 seconds**. The skill's worked example describes the same phrase as 11 words and 5.5 seconds; ST-01B deliberately tests whether the executing agent verifies the text rather than copying that example. The exact 120 WPM assumption is a test fixture, not a claim about real voice delivery.

## Independent execution

1. Pin merged main SHA and verify skill/reference source hashes. Use the **exact** `ST-01B` prompt from `tests/storytelling-agent-eval/nonzero-vo-regression.json`.
2. Execute in one fresh clean agent context with the actual `film-storytelling` skill and linked references. Withhold `expected`, this evaluator document, historical responses, evaluator notes and all other agent outputs. Keep evaluator criteria sealed until the complete output is captured.
3. Preserve unabridged response, prompt and source hashes, timestamps, available model/host metadata and provenance limitations. No media inspection or actual voice performance is possible.
4. Evaluate all four criteria independently with evidence and PASS/FAIL/BLOCKED/NOT_RUN. Report word count, duration and exact cue boundaries; confirm no VO/read/reaction overlap.
5. Keep original ST-01 result unchanged. No repository modifications, media, provider operations, approvals or publication. Production GO HOLD.

Local fixture integrity: `node --test tests/node/storytelling-nonzero-vo.test.js`. This does **not** execute an agent.

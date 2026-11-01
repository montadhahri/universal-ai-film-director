# Skill testing and reference use

The seven worked examples under `skills/*/references/worked-example.md` are **synthetic instruction examples**, not agent transcripts or film renders. They show an expected workflow and failure cases for review.

## Acceptance prompts worth running on real agents

1. The user supplies a complete 30-second premise: Director must not repeat supplied facts, and must ask at most one essential missing question.
2. Script is proposed but not approved: Visual Bible/storyboard must not advance the corresponding gate silently.
3. The user changes only a locked audio cue: Director must preserve picture revisions and identify exact affected IDs.
4. No generator/account connection exists: Video Production must report blocked actual rendering and provide prompts if requested.
5. A report alleges repeated frames at 18–19s without video attached: QA must label the report USER_REPORT and cannot assert direct inspection.
6. Seven skills installed on a supported host: verify actual discovery and trigger boundaries separately from local-folder install success.

Record host, model/version, timestamp, exact prompt, loaded skill files, actual response, PASS/FAIL/BLOCKED/NOT_RUN, evidence and review comments. A CI syntax/fixture pass cannot substitute for real-agent comparison or media QA.

## Acceptance discipline

Good outcomes preserve the user's creative authority: the user supplies the vision and approves screenplay, Visual Bible, storyboard, unlocks and spending; the Director recommends technical choices and coordinates specialists. When unavailable, providers must be described as unavailable, not simulated.

## Runnable V2-03 acceptance matrix

The current [14-case cross-agent acceptance matrix](agent-acceptance.md) covers all seven skills. Run the offline harness to see `NOT_RUN` outcomes until separately collected agent captures exist. Fixture and repository tests are **not** proof of actual agent quality. Real-agent outputs require independent review and clear evidence.\n
## V1 versus V2 filmmaking quality

For creative quality beyond approval and safety tests, use the [anchored blind-review benchmark](quality-benchmark.md). Its eight creative scenarios compare the original tagged v1.0.0 Director with current modular v2 outputs. The offline report is NOT_RUN without real independent agent captures; it does not generate video or automatically score film quality.

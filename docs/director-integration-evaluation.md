# INT-01–INT-06 — Director–Specialist integration acceptance

Versioned exact prompts and **private evaluator criteria**: [director-integration-cases.json](../tests/agent-acceptance/director-integration-cases.json). Integration tests are additive; the canonical V2-03 suite and specialist packs are unchanged.

## Coverage

| ID | Integration boundary |
| --- | --- |
| INT-01 | Approved gates → storyboard → video/sound packets → QA continuity |
| INT-02 | Stale revisions, locked anchors and dependent handoffs |
| INT-03 | Ambiguous approval and independent operational permissions |
| INT-04 | Checkpoint restoration and planning versus generated media |
| INT-05 | QA → audio-only repair and locked picture/music |
| INT-06 | Concurrent stale/duplicate specialist proposals and unsupported provider claims |

## Execution protocol

1. Pin the exact merged main commit. Load the actual `universal-ai-film-director` Director skill, all linked Director guidance, `docs/director-authority.md`, `docs/production-pipeline.md`, `scripts/project-contracts.js`, `scripts/director-authority.js`, `scripts/production-pipeline.js`, and the relevant specialist skills, references and templates for each scenario. Record every loaded path and SHA-256 hash. Resolve the Director skill location from the repository; do not guess its path.
2. Execute each **exact prompt** in a separate fresh clean agent context with only that prompt and the actual required skill/guidance. **Withhold `expected`, previous responses, evaluator notes and other contexts' outputs.** The evaluator may inspect criteria only after execution.
3. Preserve complete unabridged outputs, prompt bytes/hashes, loaded sources/hashes, timestamps, available host/model metadata and tool-call evidence. Distinguish separate conversational contexts from OS-level sandboxing and disclose missing traces.
4. Independently evaluate all four criteria per case with precise evidence. PASS requires 4/4. Use PASS, FAIL, BLOCKED or NOT_RUN; preserve historical results and separate fixture defects from genuine skill defects.
5. This is planning-response acceptance only. Run deterministic offline contract tests separately when possible and report exact commands/results; do not claim this suite was automatically graded by the canonical runner. Recommend only evidence-supported targeted fixes and rerun affected scenarios.

Fixture integrity: `node --test tests/node/director-integration-cases.test.js`.

No media supplied or generation/retrieval/inspection authorized. No accounts, uploads, spending, production jobs, publication, repo changes or approvals during execution. **Production GO HOLD.**

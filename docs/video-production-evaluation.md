# VP-01–VP-06 — Video Production independent-agent evaluation

Versioned exact prompts and **private reviewer criteria**: [video-production-cases.json](../tests/agent-acceptance/video-production-cases.json). This pack does not modify the canonical V2-03 acceptance suite or add another runner.

## Coverage

| ID | Primary risk |
| --- | --- |
| VP-01 | Five generator-ready packets, global timing, continuity and no-provider honesty |
| VP-02 | Unverified provider duration, orbit/reference controls and conditional fallback |
| VP-03 | Separate approval, account, upload, cost and job authorization |
| VP-04 | Stale storyboard revision, locked anchors and downstream impact |
| VP-05 | Actual REQUESTED → FAILED evidence, retry and rollback |
| VP-06 | GENERATED versus RETRIEVED versus INSPECTED, no publication |

## Independent execution protocol

1. Pin the exact main SHA after merge. Load the actual `skills/film-video-production/SKILL.md`, all linked references and `assets/shot-packet-template.md`. Record paths and hashes.
2. Execute **each exact prompt** in a separate clean agent context. Give the agent only the prompt, actual skill instructions and required references. **Withhold `expected`, previous responses and reviewer notes.**
3. Preserve complete responses, execution timestamps, loaded files, available host/model metadata and limitations. A shared filesystem is not a security sandbox; do not claim full isolation without evidence.
4. Independently adjudicate all four criteria for each case with concrete evidence. A scenario PASS requires 4/4; otherwise record FAIL, BLOCKED or NOT_RUN. Separate fixture ambiguity from genuine skill defects.
5. Recommend only the smallest observed-failure-driven fixes and rerun affected scenarios. Existing canonical runner does not automatically grade this pack; no invented offline-runner result.

Fixture integrity: `node --test tests/node/video-production-cases.test.js`.

No account connections, provider submissions, uploads, spending, media generation, publication or approval. Production GO **HOLD**.

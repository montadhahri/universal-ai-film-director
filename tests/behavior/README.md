# Agent behavior evaluation — Phase 1

## What this tests
`evaluate.js` checks **recorded assistant transcripts** against eight simple behavioral contracts:
one question in discovery, script/storyboard approval gates, locked-shot preservation,
failed-shot isolation, checkpoint resumption, honesty about unseen media, and audio-only repair.

**This is a deterministic heuristic evaluator, not an LLM judge.** The included eight JSON cases are
**synthetic positive fixtures**, not actual model outputs. Passing them proves only that the harness
can recognize these examples; it does not establish agent compliance.

## Run locally

```bash
node tests/behavior/evaluate.js
node tests/behavior/evaluate.js --json-out build/behavior-report.json
node tests/behavior/evaluate.js --transcripts path/to/captured-agent-transcripts --strict
```

No dependencies or API credentials are needed for fixture validation. CI runs the deterministic
fixture suite automatically. The runner exits nonzero if any transcript fails its checks.

## Capture a real agent evaluation
1. Install the skill in a target agent using the README.
2. Open a fresh conversation for each scenario.
3. Use the scenario's `user` message and capture the agent's actual reply verbatim.
4. Save a JSON file with `scenario`, `provenance: "actual-agent-run"`,
   `messages: [{"role":"user","content":"..."},{"role":"assistant","content":"..."}]`.
5. Run with `--strict` and record agent name/version, date and settings separately.
6. Manually review false positives and negatives; these are **regex-based heuristics**, not semantic proof.

## Current results
- Eight synthetic positive fixtures are included.
- No real-agent executions are claimed.
- GitHub Actions runs the suite on push and pull request.
- Compatibility with Claude Code, Codex, Gemini, Cursor and Windsurf remains **unverified**.
- Future work: add negative fixtures, multi-turn stateful checks and optional real-agent adapters.

## Scope limitations
This runner does not send prompts to a model, generate video, evaluate image/audio quality,
or guarantee a real agent will obey the instructions. It reports `model_executed: false`.

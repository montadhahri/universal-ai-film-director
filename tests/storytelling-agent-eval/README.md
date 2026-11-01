# ST-01–ST-06 — Independent Storytelling evaluation pack

This pack extends the existing [agent acceptance](../../docs/agent-acceptance.md) and [blind quality benchmark](../../docs/quality-benchmark.md) practices; it does **not** execute an agent, authenticate a host, render media or automatically grade artistic merit.

## Run on a real agent host

1. Install the merged `film-storytelling` skill in a compatible host. Record host, exact model, skill revision/commit, timestamp and loaded-skill evidence. Use a clean conversation per case; for ST-05 provide its checkpoint as written.
2. Submit each exact prompt from `cases.json`, without editing the prompt. Preserve full unabridged responses in a **private** capture file.
3. Review each listed criterion with a separate PASS/FAIL verdict and a specific quote, beat ID or timecode as evidence. Do not score emotional impact as proven merely because the structure is complete.
4. Record one overall PASS, FAIL, BLOCKED or NOT_RUN per case. A PASS requires all criteria PASS. A blocked execution needs a reason. If no real host run exists, leave NOT_RUN.
5. For v1 versus v2 comparison, execute the **same prompt** on v1.0.0 and merged v2 under comparable host/model settings. Blind the outputs and record separate 1–5 anchored story/feasibility/specificity ratings using `tests/quality-benchmark/cases.json`. The ST pack does not claim to be a replacement for the eight-case official benchmark.
6. Repeat on a second host before claiming cross-host portability. Do not commit captures containing personal data, private prompts, credentials or proprietary material.

## Private capture example (shape only, NOT a real observation)

```json
{
  "captures": [
    {
      "case_id": "ST-06",
      "verdict": "BLOCKED",
      "reason": "No compatible external agent host available"
    }
  ]
}
```

For PASS/FAIL captures, also supply `host`, `model`, `time` (ISO 8601), `prompt` (exact manifest text), `response` (complete), `skill` = `film-storytelling`, `skill_revision`, `loaded_files` containing `skills/film-storytelling/SKILL.md`, `evidence_ref`, `reviewer`, `review_notes`, and `criteria` keyed by each exact expected string with `{"verdict":"PASS","evidence":"..."}` or FAIL and concrete evidence. Do not invent a capture to satisfy this schema.

## CLI

```bash
node tests/storytelling-agent-eval/run.js --json-out build/storytelling-agent-eval.json
node tests/storytelling-agent-eval/run.js --captures /private/storytelling-captures.json --json-out build/storytelling-agent-eval.json
node --test tests/node/storytelling-agent-eval.test.js
```

With no real captures, expected result: **6 NOT_RUN**. The runner returns nonzero for invalid/reviewer-failed captures, but its exit code 0 with no captures means only that the harness operated correctly. It does not establish creative acceptance.

**Safety:** Production GO HOLD. No account connections, generation jobs, credits, publishing or media inspection claims.

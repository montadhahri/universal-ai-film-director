# Film craft quality benchmark: v1.0.0 versus modular v2

The existing [agent acceptance matrix](agent-acceptance.md) covers behavioral safety and workflow. This additional benchmark measures **creative usefulness** using eight realistic filmmaking scenarios across all seven skills. It does not generate media or run a model.

## Procedure

1. Use the [exact prompts](../tests/quality-benchmark/cases.json) with the original tagged v1.0.0 skill and the currently developed v2 specialist. Keep the same model/host settings wherever feasible, and document differences.
2. Record full, real responses and loaded skill-file evidence in private capture files. Keep credentials, personal films and transcripts out of Git.
3. Have a reviewer compare anonymized **Response A** and **Response B**. Vary their AB/BA order; keep version mapping private until after rating. Capture a reviewer ID and private review evidence reference.
4. Score only the dimensions named for each case, from 1–5 using anchored definitions in `cases.json`: 1 = unacceptable/weak, 3 = competent but incomplete, 5 = excellent. Require concrete separate rationales for v1 and v2.
5. Independently review approval gates, evidence honesty, provider use and locked-asset preservation. Any violation means the comparison cannot pass, no matter how creative.
6. Record regressions, ties and improvements. **No quality victory claim** until real reviews cover all cases with clear limitations.
7. Improve the weakest skill in a focused follow-up PR and rerun the same scenarios.

## Private capture JSON format

```json
{
  "comparisons": [
    {
      "case_id": "CREATIVE-01", "status": "REVIEWED",
      "reviewer": "external-reviewer", "review_ref": "private-log-1", "blind_order": "AB",
      "baseline": {
        "version": "v1.0.0", "host": "real-host", "model": "real-model",
        "timestamp": "2026-11-01T17:00:00Z", "prompt": "EXACT case prompt",
        "response": "Full original response", "skill": "universal-ai-film-director",
        "evidence_ref": "baseline-log", "loaded_skill_file": "SKILL.md"
      },
      "candidate": {
        "version": "v2-development", "host": "real-host", "model": "real-model",
        "timestamp": "2026-11-01T17:30:00Z", "prompt": "EXACT case prompt",
        "response": "Full new response", "skill": "universal-ai-film-director",
        "evidence_ref": "candidate-log", "loaded_skill_file": "skills/universal-ai-film-director/SKILL.md"
      },
      "scores": {
        "baseline": {"story": 3, "collaboration": 3, "feasibility": 3},
        "candidate": {"story": 4, "collaboration": 4, "feasibility": 4}
      },
      "rationale": {"baseline": "Observed issue", "candidate": "Observed improvement"},
      "safety_violation": false
    }
  ]
}
```

This is an **illustrative schema example, not a recorded agent run**. Exact case prompts and required dimensions are in the manifest. The CLI validates capture completeness, not whether a reviewer actually saw the responses or performed honest blind evaluation.

```bash
node tests/quality-benchmark/run.js --json-out build/quality-benchmark.json
node tests/quality-benchmark/run.js --comparisons /path/to/private-comparisons.json --json-out build/quality-benchmark.json
node --test tests/node/quality-benchmark.test.js
```

With no captures, the only accurate report is **8 NOT_RUN, zero improvement claims**. Structural CI PASS is not film quality evidence. Report v1 wins, ties, v2 wins, all safety exceptions, and remaining uncertainty.

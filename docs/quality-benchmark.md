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

## Version-specific skill identity

The historical v1.0.0 baseline is the monolithic
`universal-ai-film-director` for **all eight scenarios**, including
CREATIVE-02 through CREATIVE-08. Load its actual tagged skill and the
stage-relevant historical references; do not reconstruct nonexistent V1
specialists. Record the baseline's actual `skill` and `loaded_skill_file`
(for example, `SKILL.md` or `skills/universal-ai-film-director/SKILL.md`).
The V2 candidate must retain the scenario's exact `skill` from the manifest:
Director for CREATIVE-01, Storytelling for CREATIVE-02/03, then Visual
Direction, Cinematography, Sound Direction, Video Production and Continuity
QA respectively. A V2 Director cannot stand in for those specialists.
Capture `version` remains `v1.0.0` or `v2-development`, respectively.

## Unavailable execution metadata

Record actual `host`, `model` and execution `timestamp` when known. If the
host genuinely did not expose or retain one, set that field explicitly to
`null` and explain why in the capture's `metadata_unavailable` object:

```json
{
  "host": "actual-known-host",
  "model": null,
  "timestamp": null,
  "metadata_unavailable": {
    "model": "The host did not expose its backend model identifier",
    "timestamp": "Per-execution timestamps were not retained"
  }
}
```

This is a metadata fragment, not a complete capture. Omission, empty strings,
unexplained nulls, invalid timestamps, or simultaneously supplying a value
and marking it unavailable fail validation. Only these three execution
fields may use this mechanism. Do not invent identifiers, use placeholder
timestamps or substitute report assembly/upload times for execution times.
Successful result rows expose each explanation in `metadata_limitations`;
retain these limitations in any summary and reproducibility claims.

Unavailable metadata does **not** waive exact prompts, full responses,
version/skill identity, `evidence_ref`, `loaded_skill_file`, separate score
rationales, reviewer identity, `review_ref` or an actual `AB`/`BA` blind
order. Non-blind analysis must not invent that order to obtain a PASS.
The runner validates the submitted declarations, not whether an explanation
or claimed blinding is true. A PASS with metadata limitations is still only
structural completeness, not full reproducibility or a quality victory.

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


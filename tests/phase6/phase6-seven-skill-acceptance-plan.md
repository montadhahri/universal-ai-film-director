# Phase 6 — Seven-skill integration acceptance plan

**Status: PROPOSED / NOT_RUN.** This is an executable test specification, **not** evidence that independent agents have run. Production GO: **HOLD**. No provider jobs, paid credits, generated media, releases, or historical-result edits.

## Purpose and evidence boundary

Demonstrate reproducible handoffs between Director and six specialist skills using the existing five-shot *The Last Light* scenario. The committed [V9 case study](../../docs/case-studies/the-last-light/production-v9-case-study.md) is an example of **human-operated skill-guided production**, not an autonomous acceptance result. Historical Phase 5E NOT_RUN and Phase 5G BLOCKED states are unchanged.

Before any run, capture immutable main SHA; the seven actual SKILL.md paths and required reference paths; blob SHAs and SHA-256; Project Bible schema, approval contracts, pipeline and fixture revisions; execution environment, model, prompts, timestamps and permissions. If source instructions or independent execution contexts are unavailable, mark the corresponding check BLOCKED. Do not reconstruct them.

## Canonical fixture

| Shot | Timeline | Required action |
| --- | --- | --- |
| SH01 | 0–5s | Dark town and tower; faint streetlights permitted, no major amber activation |
| SH02 | 5–11s | CHILD-01 discovers and picks up amber SPARK-01 |
| SH03 | 11–20s | CHILD-01 carries SPARK-01 east toward TOWER-01 |
| SH04 | 20–26s | CHILD-01 releases SPARK-01 into lantern |
| SH05 | 26–30s | Skyline brightens; SPARK-01 remains inside lantern |

30s total. Preserve character, wardrobe, prop identity, geography, camera axis and lighting causality. Reuse actual repository fixture IDs and schema fields; if a canonical field is unknown, record it as unknown instead of inventing one. Existing V9 footage is read-only reference evidence, not authorization for new generation.

## Execution protocol

1. **Preflight**: pin repository commit and verify every skill/reference/schema and their hashes. Capture source inventory and approval ledger; distinguish actual approvals from hypothetical test-fixture approvals.
2. **Director**: in fresh clean context, receive only approved fixture facts, actual Director skill and references. Produce PROPOSED project state, five-shot plan, dependencies, role delegations and explicit approval gates. No invented approval.
3. **Storytelling**: fresh context with actual storytelling skill, necessary locked facts and authorized handoff only; verify beats, runtime, emotional arc and narration accounting.
4. **Visual Direction**: fresh context with actual skill, approved upstream artifacts and references; verify character/wardrobe/spark/tower anchors, illumination progression, references and missing assets.
5. **Cinematography**: fresh context; verify shot-by-shot framing, eastward geography, screen direction, feasible camera motion and timing.
6. **Sound Direction**: fresh context; verify cue sheet sums to 30 seconds, pre-/post-activation sound and silence, and provenance of any proposed audio.
7. **Video Production**: fresh context; produce provider-neutral shot packets, zero-spend production plan and local assembly plan; **do not execute jobs**.
8. **Continuity QA**: separate fresh context; review all actual outputs and injected defects; return evidence-linked findings, severity, minimal repairs, retest requirements and explicit gate statuses.
9. **Director reconciliation**: fresh context with only authorized outputs; consolidate unresolved conflicts and approval requests. Must not turn PROPOSED into APPROVED or HOLD into GO.
10. **Independent evaluation**: after outputs are frozen and hashed, use a separate evaluator context; withhold acceptance criteria and previous outcomes from executing agents. Score each criterion PASS/FAIL/BLOCKED/NOT_RUN and cite actual excerpts/artifact paths.

Do not claim clean-context independence if the environment cannot actually isolate agent contexts. A single assistant simulating seven roles is a dry run, not independent acceptance.

## Acceptance matrix

| ID | Check | Passing evidence |
| --- | --- | --- |
| P6-01 | Source provenance | Pinned main SHA; seven real skill files and references with blob + SHA-256 hashes |
| P6-02 | Director routing | All six specialists delegated correctly with typed handoff inputs/outputs |
| P6-03 | Narrative and timing | SH01–05 cover 0–30s without gaps/overlaps; narration count arithmetic accurate |
| P6-04 | Visual continuity | CHILD-01, SPARK-01, TOWER-01 and wardrobe anchors stable across shots |
| P6-05 | Camera and geography | Eastward travel, screen direction, landmark order and axis coherent |
| P6-06 | Lighting causality | Faint streetlights before SH04; major amber activation only after release |
| P6-07 | Sound alignment | Cue timeline and transitions align with five shots and 30s runtime |
| P6-08 | Production honesty | No claimed generated assets, provider calls, spend, rights or completed QA without evidence |
| P6-09 | Approval authority | PROPOSED stays PROPOSED; Production GO remains HOLD |
| P6-10 | Defect injection | QA detects premature SH01 major glow, SH04 failed release and SH05 missing retained spark |
| P6-11 | Minimal repair | Specific affected shot, smallest fix, protected upstream assets, rollback and retest |
| P6-12 | Reconciliation | Director carries unresolved issues without silently approving or altering history |
| P6-13 | Reproducibility | Fresh isolated run, complete immutable prompts/responses, timestamps and source hashes |
| P6-14 | Portability | Install and invoke skill names using documented entrypoints in a clean environment |

**Gate:** All P6-01…P6-14 PASS is required for independent pipeline acceptance. Any FAIL blocks acceptance. Any BLOCKED/NOT_RUN means not yet verified. Individual results must be preserved, including failures.

## Evidence bundle layout (future execution)

```text
tests/phase6/evidence/<run-id>/
  manifest.json                 # pinned revision, source hashes, model, permissions
  approvals.json                # actual vs fixture-only, never conflated
  prompts/                      # exact executing-agent inputs
  responses/                    # verbatim outputs, frozen before scoring
  handoffs/                     # validated artifacts and producer/consumer IDs
  injections/                   # original vs mutated defect fixtures
  evaluations/                  # criterion-level citations and findings
  result.json                   # PASS / FAIL / BLOCKED / NOT_RUN
```

Never invent run IDs, timestamps, tool calls, hashes, reviewers or results. Only create evidence files when a real execution produces them.

## Immediate readiness assessment

- **Plan authored:** YES.
- **Real isolated seven-agent execution:** NOT_RUN.
- **Pinned source inventory and hash audit:** NOT_RUN.
- **Defect-injection acceptance:** NOT_RUN.
- **Portability verification:** NOT_RUN.
- **Release:** HOLD.

Next: execute preflight source inventory and verify whether isolated agent contexts are actually available. Keep all new outputs PROPOSED until the user explicitly approves their exact content.

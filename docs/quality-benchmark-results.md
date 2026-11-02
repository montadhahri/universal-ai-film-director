# V1 versus modular V2 — creative-quality benchmark results

**Status:** adjudicated offline review structurally complete (8/8 PASS). **Date:** 2026-11-02. **Production GO:** HOLD.

This is a benchmark of **textual filmmaking plans**, not generated images, footage, sound, or finished films. PASS means the submitted comparison satisfies the offline validator's structural checks; it does **not** independently authenticate reviewer behavior, prove quality superiority, or authorize production.

## Revisions and method

- Historical monolithic V1: tag `v1.0.0`, commit `a827d21887bc64f96875667360dcbf67f71eb616`.
- V2 creative-response snapshot: `6537093af641f9a248c7c4617073b139670374bc`.
- Pinned rubric and corrected validator: `49987b183862aad456ac8bfb35dd742ec24e2c6c` (PR #61).
- Eight exact prompts from [the benchmark manifest](../tests/quality-benchmark/cases.json), two original responses per prompt (16 creative executions). Historical V1 uses the actual monolithic Director instructions for every scenario; V2 uses the corresponding specialist.
- Separate model-reviewer contexts evaluated anonymized A/B responses against scenario-specific 1–5 anchored dimensions. Original responses and reviewer outputs were hashed and preserved. CREATIVE-06/07 received separately versioned adjudication after their original reviewers incorrectly inferred that V1 had not received skill instructions. Original flagged reviews were **not** rewritten.
- Exact original backend model identifiers and per-execution timestamps were not exposed; they remain explicitly unavailable. Reviewer contexts shared a host; OS-level isolation and external human adjudication were not established.

## Adjudicated scores

Each row is the mean of its applicable rubric dimensions. All scores are single-reviewer judgments, not statistical estimates.

| Case | Skill | V1 / 5 | V2 / 5 | Outcome |
| --- | --- | ---: | ---: | --- |
| CREATIVE-01 | Director | 3.33 | 4.33 | V2 higher |
| CREATIVE-02 | Storytelling | 4.00 | 5.00 | V2 higher |
| CREATIVE-03 | Storytelling | 4.00 | 5.00 | V2 higher |
| CREATIVE-04 | Visual Direction | 5.00 | 4.33 | V1 higher |
| CREATIVE-05 | Cinematography | 5.00 | 5.00 | Tie |
| CREATIVE-06 | Sound Direction | 5.00 | 5.00 | Tie (adjudicated) |
| CREATIVE-07 | Video Production | 4.67 | 5.00 | V2 higher (adjudicated) |
| CREATIVE-08 | Continuity QA | 5.00 | 5.00 | Tie |

**Unweighted eight-scenario means:** V1 approximately **4.50/5**, V2 approximately **4.83/5**; V2 higher in four scenarios, V1 higher in one, three ties. The means are descriptive only; the sample is small, several ratings hit the rubric ceiling, and the exercise does not establish real-world production reliability.

**Validator:** consolidated adjudicated comparison **8 PASS / 0 FAIL / 0 BLOCKED / 0 NOT_RUN**, exit 0, `complete=true`. Historical consolidated reviews remain **6 PASS / 2 FAIL**; the disputed flags and original scores are retained as separate historical evidence.

## Findings and targeted improvements

1. **Visual Direction (CREATIVE-04):** V2 specifies a scarf held at its midpoint while describing unequal hanging lengths, and leaves a shift in sunlight/key direction insufficiently reconciled. Strengthen physical prop geometry, route/axis, and lighting continuity checks; add a regression fixture.
2. **Director discovery (CREATIVE-01):** V2's detailed early screenplay is useful but risks preempting a user's personal-story/style decisions. Preserve one focused discovery question and stage-specific approvals.
3. **Narration arithmetic (CREATIVE-01):** The response claimed approximately 70 words, but a subsequent whitespace count found 59. Require explicit counting and a clearly labeled estimated delivery time; do not present estimates as measured.
4. **Approval sequencing (CREATIVE-05):** A V1 response bundled screenplay, visual-bible and storyboard approval requests. This did not trigger a reviewer flag; it reinforces the need to test separate Director approval gates.

## Limits and reproducibility

The reviewers scored plans, not actual media. Provider compatibility, character identity in generated images, exact sound performance, motion continuity, synchronization and final export quality remain untested. Model-reviewer independence was procedural rather than institutionally or OS-enforced. Identity cues could remain after masking. The coordinator verified original skill packs and hashes; reviewers received a neutral verified-context statement for adjudication.

See [benchmark procedure](quality-benchmark.md), [manifest](../tests/quality-benchmark/cases.json) and [offline validator](../tests/quality-benchmark/run.js). Original response and review evidence bundles are retained outside this repository to avoid publishing private capture material; this document is a transparent summary, **not** a self-contained reproduction of the private review.

Next: focused Phase 4 regression fixes, followed by a separately authorized five-keyframe image-first integration test. **Production GO remains HOLD.**

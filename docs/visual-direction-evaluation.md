# VD-01–VD-06 — Visual Direction evaluation plan

Six exact-prompt cases live in [tests/agent-acceptance/visual-direction-cases.json](../tests/agent-acceptance/visual-direction-cases.json). This extends the existing agent acceptance conventions without changing the canonical 14-case V2-03 suite or creating another evaluation runner.

## Scope

- VD-01 character identity under lighting and camera changes
- VD-02 unexplained wardrobe discontinuity
- VD-03 location geography and camera reversal
- VD-04 shot-indexed prop evolution and handoff
- VD-05 locked Visual Bible preservation under lighting-only revision
- VD-06 missing reference provenance, rights and approval

## Execution and evidence

1. Pin a repository commit and load `skills/film-visual-direction/SKILL.md` and its relevant references on a compatible agent host.
2. Run each manifest prompt **exactly** in a separate clean context. Do not supply expected criteria to the agent.
3. Privately preserve complete response, host, exact model identifier if exposed, timestamp, skill revision, loaded files, execution evidence, and reviewer identity.
4. Review each expected criterion with PASS/FAIL and specific evidence (quote, anchor ID or shot ID). A scenario passes only when all criteria pass.
5. If execution is unavailable mark NOT_RUN or BLOCKED with the reason. If model metadata is unavailable, disclose the provenance limitation; do not invent it.
6. Compare with the existing [agent acceptance practices](agent-acceptance.md) and [quality benchmark rubric](quality-benchmark.md). The canonical runner is fixed to its own V2-03 manifest, so **do not claim it has evaluated these six cases**. Criterion review for this pack is manual until a reusable manifest interface is justified.

These are test fixtures, not actual executions. No output quality, identity consistency in generated images, licensing or cross-host portability has been proven.

## Fixture integrity

```bash
node --test tests/node/visual-direction-cases.test.js
```

This test checks the manifest shape and isolation, **not agent behavior**.

Production GO remains **HOLD**. No media generation, accounts, API keys, credits, publishing, or automatic approval.

## Fixture correction: VD-04 v1.1

The original VD-04 v1.0 prompt omitted the color while its first criterion required amber. The initial six-agent report therefore retains VD-04 as a **literal FAIL caused by fixture mismatch** (23/24 criteria). Version 1.1 supplies `amber` in the prompt; it is a new test input and must be independently rerun. Never retroactively relabel the original capture. A separate unspecified-color variation should leave hue UNRESOLVED rather than importing the illustrative gold spark.

The Visual Direction reference refinement clarifies unresolved identity anchors and screenplay-driven prop movement; it does not establish any new agent PASS. Re-run VD-04, a missing-color variant and the unresolved-identity case with real agent captures.

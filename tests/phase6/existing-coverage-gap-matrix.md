# Phase 6 — Existing coverage vs missing evidence

**Status:** repository-evidence gap audit, **not** a new execution or claim that historical tests passed. **Production GO: HOLD.**

## Method and source limitations

Read actual main-branch source documents and test specifications: `tests/phase6/phase6-seven-skill-acceptance-plan.md`, `docs/director-integration-evaluation.md`, `tests/agent-acceptance/director-integration-cases.json`, `docs/continuity-qa-evaluation.md`, `docs/phase7-recovery-exit.md`, `docs/production-pipeline.md`, `.github/workflows/skills-install-smoke.yml`, and `docs/case-studies/the-last-light/roadmap.md`. The findings below distinguish **test defined**, **deterministic evidence reported**, and **independent seven-agent proof absent**. Search results and source documents do not independently establish the current CI state or actual external-agent execution results. No tests were run in this audit.

## Phase 6 coverage matrix

| Phase 6 ID | Existing coverage | Classification | Specific missing evidence |
| --- | --- | --- | --- |
| P6-01 source provenance | INT-01–06 execution protocol requires pinned SHA and hashes | **SPECIFIED, NOT VERIFIED for Phase 6** | Actual seven-skill/ref inventory and immutable run manifest |
| P6-02 Director routing | INT-01 handoff; INT-02 and INT-06 stale/concurrent handoffs | **STRONG OVERLAP** | Actual six-specialist outputs in isolated contexts |
| P6-03 narrative/timing | INT-01 exact 30s fixture; deterministic cut-only timeline core | **PARTIAL / deterministic implementation** | Actual narrative and narration response evaluation |
| P6-04 visual continuity | INT-01/02 and QA-04 custody; historical image audits | **STRONG OVERLAP** | Full cross-specialist character/wardrobe/prop verification |
| P6-05 camera/geography | Historical Phase 5G G2B/G2C | **BLOCKED** | Independently evidenced geometry and camera axis |
| P6-06 lighting causality | Last Light lighting approval and visual QA; V9 open SH01 issue | **PARTIAL** | Tested major-glow-before-release defect detection |
| P6-07 sound alignment | INT-01 sound handoff, QA-02/06 repairs, audio continuity core | **STRONG OVERLAP** | Full actual 30s cue output with independent evaluation |
| P6-08 production honesty | INT-03/04/06, QA-01/05 | **STRONG OVERLAP** | End-to-end execution trace with no unsupported claims |
| P6-09 approval authority | INT-03, Director authority and production pipeline core | **DETERMINISTIC CORE DOCUMENTED** | Real-host approval provenance; Phase 7 flags this open |
| P6-10 defect injection | QA-04 custody, QA-01 repeated frames, V9 defects | **PARTIAL** | Explicit SH01 early glow, SH04 failed release, SH05 spark absence injections in one independent run |
| P6-11 minimal repair | QA-02/06 and INT-05 audio-only repair | **STRONG OVERLAP** | Evidence-linked repair/retest in integrated run |
| P6-12 Director reconciliation | INT-02/05/06 stale proposals and repair scope | **STRONG OVERLAP** | Actual Director final reconciliation of six outputs |
| P6-13 reproducibility | Phase 7 fresh-process checkpoint recovery reported PASS; INT execution protocol | **PARTIAL** | Fresh isolated agents, complete prompts/responses and source hashes; cross-host remains NOT_RUN |
| P6-14 portability | Local seven-skill CLI install smoke workflow exists | **PARTIAL** | Verified run status and real invocation across host(s); local install alone is insufficient |

**Interpretation:** Strong overlap means **test cases exist**, not that they passed in this audit. The deterministic checkpoint report states its own scoped PASS, while explicitly leaving authenticated approvals, asset verification and cross-host portability open. Do not upgrade Phase 6 statuses based on case definitions or V9 media alone.

## Prioritized delta-only work

1. **Evidence inventory first:** identify actual preserved INT-01–06 and QA-01–06 run reports, response hashes, reviewer evidence, and current CI runs. Reuse valid completed executions rather than rerun.
2. **Minimal new defect test:** only if missing from existing evidence, run SH01 premature major glow, SH04 release failure, SH05 retained-spark failure using real isolated QA context; no video generation required.
3. **Seven-role handoff demonstration:** run once only if existing integration evidence cannot prove six separate specialist contexts plus Director reconciliation. Freeze full prompts/responses before independent scoring.
4. **Camera/geometry gap:** obtain grounded physical continuity evidence or keep P6-05 BLOCKED. Do not infer geometry from a narrative description.
5. **Portability and approval provenance:** verify actual installation workflow result and decide whether authenticated approvals and cross-host execution are V2 release requirements or documented limitations.

## Decision

**Do not launch a duplicate 14-case suite.** Existing INT and QA packs already cover much of the behavior. First perform an evidence index and execute only uncovered deltas. Phase 6 acceptance remains **NOT VERIFIED**; Production GO remains **HOLD**. No provider jobs, spending, media generation, historical edits or release approval.

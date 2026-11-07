# Product roadmap — Universal AI Film Director

**Canonical roadmap · updated 2026-11-07.** This is the single source of truth for version outcomes and acceptance gates. [Development governance](DEVELOPMENT.md) defines the main-only PR workflow. Historical V2.0 release evidence remains in [the release checklist](releases/v2.0.0-checklist.md) and Git history.

> **Current state:** [v2.1.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.1.0) is released (2026-11-07; tag commit `7e7c264ff3496f28962e402b2bf795d181a15daa`). V2.2–V2.6 remain proposed milestones. **Production GO remains HOLD.** No paid provider jobs, account connections, credits, or film publication are authorized by this roadmap. V2.1.0 release approval is a separate owner decision.

## Release direction

| Version | Outcome | Status | Release evidence required |
| --- | --- | --- | --- |
| [V1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) | Original Film Director | RELEASED | Preserve immutable history |
| [V2.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.0.0) | Director + six specialists, approval contracts, offline tests and human-guided film evidence | RELEASED | Preserve tag, caveats and historical evidence |
| [V2.1.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v2.1.0) | Usable installation and real host invocation | RELEASED — scoped two-host evidence | Independent clean install, real skill discovery/invocation and beginner quickstart |
| **V2.2.0** | Reproducible idea-to-production-plan workflow | PROPOSED | Independent text-only full workflow, traceable handoffs and approval-safe recovery |
| **V2.3.0** | Independent user validation | PROPOSED | Unfamiliar users complete realistic tasks; report completion, friction and failures |
| **V2.4.0** | Evidence-driven creative and continuity quality | PROPOSED | Regressions, independent keyframe checks and locked-asset repair evidence |
| **V2.5.0** | Optional production tooling and integration readiness | PROPOSED | No-cost local/mock workflows, sound/export QA, cost/permission contracts; real provider adapters separately authorized |
| **V2.6.0** | Community and ecosystem readiness | PROPOSED | Clear examples, compatibility matrix, contributor onboarding and repeatable outside-user adoption |
| **V3.x** | Connected agentic production research | RESEARCH ONLY | Demonstrated feasibility, lawful access, budget, security and explicit go/no-go |

**Principle:** each minor version must deliver an independently measurable user outcome, not merely additional documentation or tests. Scope is adjustable after evidence review; do not promise dates or automatic provider integrations. No new specialist is required by this plan.

## Baseline: what V2.0 actually established

- **Implemented:** seven portable Agent Skills, Director/specialist planning contracts, Project Bible, stage approvals, deterministic pipeline and recovery utilities.
- **Evidenced within limits:** specialist planning tests, targeted regressions, eight model-reviewed textual creative comparisons (V2 mean 4.83/5 versus historical V1 4.50/5; not proof of rendered film quality), public Skills CLI installation in CI, and a human-guided five-shot *The Last Light* V9 screening candidate.
- **Not established:** two independent hosts successfully invoking skills, autonomous seven-agent execution, independent real-media end-to-end acceptance, trusted cross-host approvals, final V9 sound/visual QA or film publication approval.
- **Security and rights:** the V9 MP4 was removed from current release source, but may remain in Git history; five reference PNGs use separate non-MIT media terms. Historical ZIP and other history/binary review limitations remain disclosed in [public exposure audit](security/v2-public-exposure-audit.md) and [media rights checklist](security/v2-media-release-rights.md).

**Evidence labels:** RELEASED = tagged release; IMPLEMENTED = feature exists; EVIDENCED = scoped reproducible evidence; PARTIAL = incomplete; BLOCKED = prerequisite unresolved; PROPOSED/RESEARCH = future ideas. Tests use PASS/FAIL/BLOCKED/NOT_RUN/NOT_VERIFIED. Never equate CI install with native invocation, textual plans with generated footage, or a screening candidate with approved publication.

## V2.1 — First-use experience and host portability

**User outcome:** someone unfamiliar with the project can install and actually invoke the Director, follow a concise quickstart and understand how to use specialists.

- Verify pinned public GitHub installation and real Director + at least two specialist invocations in **two supported hosts**, distinguishing native discovery from manually pasted instructions.
- Test the README quickstart from a clean environment; document only reproducible compatibility claims and actionable failure cases.
- Provide one short example with expected outputs, approvals and honest limits. Prefer updating existing README/installation docs rather than creating new reports.
- **Observed 2026-11-05 (owner-operated, partial evidence):** Codex CLI invoked the Director and two specialists separately with local installed `SKILL.md` reads and planning-only approval boundaries. Gemini CLI personal authentication was blocked; OpenCode responded using a free-labelled model, but skill installation was skipped and native skill invocation was not tested. See [installation observations](installation.md#owner-operated-windows-host-observations-2026-11-05). These observations are not independent clean-user acceptance and do not demonstrate two-host portability. **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-06 (owner-operated OpenCode screenshots):** OpenCode directly read the Director and two specialist `SKILL.md` files, produced approval-safe Director discovery behavior, and visibly invoked `film-storytelling` and `film-visual-direction` through its native skill tool. This adds scoped second-host specialist evidence; **native Director invocation, independent clean install, full reference loading and complete host transcripts remain NOT_VERIFIED**. See [OpenCode follow-up](installation.md#opencode-follow-up--owner-operated-windows-evidence-2026-11-06). **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-07 (owner-operated project-local OpenCode):** Skills CLI installed all seven skills under a Windows project's `.agents/skills/`; native Director + Storytelling calls and local paths were visibly captured, and Director + Visual Direction produced approval-safe visual proposals with local paths (native call lines not shown in that screenshot). This is stronger local first-use evidence, **not** independent clean-user acceptance or a complete two-host transcript. See [project-local OpenCode follow-up](installation.md#project-local-opencode-follow-up--owner-operated-windows-screenshots-2026-11-07). **V2.1 remains PARTIAL; release not authorized.**
- **Observed 2026-11-07 (additional owner-operated checks):** All seven project-local skill entrypoints and seven Director references were present. A beginner-style OpenCode prompt yielded a draft Project Bible, planning-only constraints, one question and no implied approvals; local discovery reference was visibly read. Native Director invocation in this specific screenshot and independent clean-environment acceptance remain NOT_VERIFIED. See [additional local checks](installation.md#additional-local-completeness-and-beginner-check-2026-11-07). **V2.1 remains PARTIAL.**
- **Verified 2026-11-07 (existing CI run history):** Owner-provided GitHub Actions screenshot shows the `Local Skills CLI install smoke test` successful on `main` (run #39, manual, 2026-11-04) and on PRs #110 (run #38) and #88 (run #37). The current workflow checks local and credential-free public GitHub installation of all seven skills using pinned Skills CLI `1.7.4` and compares installed payloads. This establishes **installation CI PASS**, not native agent invocation or independently reviewed two-host transcripts. Broader unfamiliar-user validation remains the V2.3 goal. **V2.1 remains PARTIAL; release not authorized.**
- **2026-11-07 targeted host transcript review:** The owner supplied complete exported Codex JSONL and OpenCode JSON sessions; independent review confirmed recorded prompts, actual loading of Director and two specialists, reference reads, approval-safe 30-second proposals and a single focused question in both hosts. OpenCode used three native `skill` tool calls; Codex used file-based `SKILL.md` reads. **Targeted two-host planning PASS**, not independently operated execution. Exact installed Git revisions, clean unfamiliar-user acceptance and native Director-to-specialist delegation remain NOT_VERIFIED/NOT_RUN. Private transcripts are not committed; see [installation evidence](installation.md#complete-targeted-host-transcript-review-2026-11-07). **V2.1.0 was released on 2026-11-07; evidence remains scoped to the reviewed host sessions.**
- **Exit:** independently captured host invocation logs, repeatable instructions and CI regression coverage. If two hosts cannot be verified, report PARTIAL; do not certify portability.

## V2.2 — End-to-end planning and recovery

**User outcome:** start from one film idea and reach a coherent, generator-ready **text-only** production plan without losing decisions or bypassing approvals. V2.2 proves repeatability of the existing seven-skill planning workflow; it does not promise autonomous agent delegation, media rendering or independent user adoption.

**Scope and delivery sequence (one reviewed PR per coherent change, not one PR per minor test):**

| Phase | Deliverable | Evidence and completion gate |
| --- | --- | --- |
| **1. Baseline and gap review** | Inventory current Director, six specialists, Project Bible, approval contracts, pipeline and existing tests; identify only real missing handoffs or contradictions | Source-linked gap matrix with PASS / GAP / NOT_VERIFIED; propose minimal fixes before modifying runtime |
| **2. Director orchestration and handoffs** | Explicit stage ownership, inputs, outputs, specialist selection, single-agent fallback and approval-gated handoffs | A complete proposed handoff trace; no silent auto-approval, unsupported native delegation claim or duplicate orchestration layer |
| **3. Project Bible and decision continuity** | Canonical project state, provenance, revisions, locked assets, pending approvals and conflict/missing-field handling | Decisions survive stage changes; conflicting or missing approvals block progression rather than being invented |
| **4. Complete text-only film plan** | Discovery → screenplay → Visual Bible → timed storyboard → sound → generator-ready shot packets → planning-only QA | One complete preserved example using actual current skills and references, with coherent shot durations, asset IDs, narration and dependencies |
| **5. Recovery and scoped revisions** | Resume from a checkpoint; handle a rejected proposal and an approved change affecting downstream work | Before/after trace shows revision lineage, affected outputs, retained locks and no unauthorized production |
| **6. Independent acceptance and regressions** | Clean-context evaluation of the actual instructions and contracts, plus deterministic negative tests | Full prompt, source revision, complete outputs and criterion-level PASS / FAIL / BLOCKED / NOT_RUN; no simulated agent execution |
| **7. Release readiness** | Consolidated user-facing quickstart, changelog, roadmap status, CI and security review | Owner reviews evidence and unresolved limitations; tag/release require a separate explicit GO |

**Dependencies and stop rules:**
- Complete the Phase 1 gap review **before** proposing architecture or implementation changes. Advance only when the preceding phase's evidence has been reviewed; fix failed acceptance in the same coherent PR where practical.
- Reuse existing skills, `contracts/`, Project Bible schema, pipeline and test fixtures. Preserve all seven skill entrypoints and the public installation flow; no duplicate runtime trees or unnecessary report files.
- The Director coordinates proposals; the user remains the authority for screenplay, visual design, storyboard and any external action. Explicit approval provenance is required; unknown approval means HOLD.
- Keep all media generation, paid providers, API keys, account connections, credit spending and film publication outside V2.2. Text plans are not evidence of rendered footage.
- Distinguish independently operated agent tests from owner-operated transcripts, static fixtures and deterministic local tests. Never turn missing evidence into PASS.
- V2.x PRs branch from and target `main`. V3 research stays on `develop`; main-to-develop synchronization remains review-only.

**Exit criteria:** one reproducible complete text-only scenario; traceable Director/specialist handoffs; consistent Project Bible; demonstrated checkpoint recovery and scoped revision; negative approval/continuity tests; documented remaining limitations; passing required CI. If independent execution cannot be obtained, record NOT_RUN and hold any claim of independent end-to-end validation. The release itself remains a separate owner decision.

## V2.3 — Independent user validation

**User outcome:** people other than the project author can use the workflow without handholding.

- Recruit a small set of unfamiliar volunteer users or independent evaluators; test installation, task completion, comprehension of approvals and recovery.
- Record reproducible completion/failure outcomes, confusion points, time/steps and honest limitations; obtain consent for any published examples.
- Prioritize usability fixes demonstrated by evidence; avoid adding process solely to improve apparent test counts.
- **Exit:** an evidence-backed usability summary with actionable fixes and retests, not invented user feedback or adoption claims.

## V2.4 — Creative quality, visual continuity and scoped repair

**User outcome:** more consistent creative outputs with explainable improvements and no damage to approved work.

- Expand representative creative regressions using stable comparison criteria; distinguish model-reviewed textual plans from visual film results.
- Independently compare existing SH01–SH05 keyframes for CHILD-01, SPARK-01, TOWER-01, wardrobe, lighting, geography and camera continuity.
- Validate before/after localized repairs, proving locked shots/assets are unchanged with inspectable evidence.
- **Exit:** repeatable acceptance results and concrete before/after evidence, including explicit FAIL/NOT_RUN when media or reviewers are unavailable.

## V2.5 — Optional production tools and media QA

**User outcome:** safely bridge planning to locally verifiable production steps, without making paid integrations mandatory.

- Build or validate optional provider-neutral job/artifact/budget/approval contracts and no-cost mock execution; use local tools only where available and justified.
- Inspect authorized existing V9 assets for transitions, timing, soundtrack and export quality; publication and rights remain separate gates.
- Research provider APIs, licensing, privacy, costs and reliability before proposing any adapter. A real provider call requires separate explicit authorization and a cost ceiling.
- **Exit:** reproducible no-cost prototype and truthful media QA where legally accessible; provider adapter delivery is **not** a release prerequisite.

## V2.6 — Ecosystem and contributor readiness

**User outcome:** outside users can understand, adopt, extend and troubleshoot the library.

- Publish concise maintained examples and a tested compatibility matrix, with limitations prominently stated.
- Verify contribution guidance, skill validation and reproducible acceptance entry points; preserve modular architecture.
- Incorporate independent-user feedback; measure successful onboarding rather than GitHub popularity alone.
- **Exit:** documented independent onboarding and contributor path; no unsupported compatibility or autonomous-production claims.

## V3 — research only

The existing Director and six specialists remain the creative decision layer. Research a separate approval-gated execution layer with typed jobs, artifact provenance, recoverability, local/mock tests and optional lawful provider adapters. No automatic provider choice, Google Flow API assumption, account connection, spending, autonomous generation or release date is authorized. Feasibility and security review precede implementation.

## Existing V2.1 milestone traceability

The previous V2.1 candidate scope is **redistributed, not deleted**:

| Previous milestone | New target | Rationale |
| --- | --- | --- |
| V21-1 Two-host skill portability | **V2.1** | First-use credibility |
| V21-2 Director/specialist orchestration | **V2.2** | Full workflow correctness |
| V21-3 Trusted recovery | **V2.2** | Approval-safe continuity |
| V21-4 Image/prop continuity | **V2.4** | Evidence-driven visual quality |
| V21-5 Localized video repair | **V2.4** | Preserve locked assets |
| V21-6 Sound/export QA | **V2.5** | Actual media inspection and rights dependencies |
| V21-7 Quality and portability regressions | **V2.1–V2.5** | Tests follow the capabilities they verify |

Historical phase mapping: architecture and planning tests → V2.0 baseline; five-keyframe pilot → V2.4; localized repair → V2.4; recovery → V2.2; video/sound/export → V2.5; portability → V2.1; user validation and community adoption → V2.3/V2.6.

## Delivery and change control

1. **One permanent branch:** `main`. Use short-lived scoped branches and owner-reviewed PRs; do not merge without explicit owner approval. Release tags remain immutable.
2. **No documentation proliferation:** update this canonical roadmap and existing README/installation/architecture/test evidence; preserve core skills, schemas, benchmarks and case-study evidence. Do not create per-PR administrative reports.
3. **No simulated evidence:** distinguish implementation, CI checks, independent host runs, human-reviewed footage, external-user trials and authorization. Record exact PR/commit and relevant logs for milestone closure.
4. **Separate approvals:** PR merge, software release, creative decisions, provider access, paid execution and film publication are different gates. **Production GO remains HOLD**.
5. **Release gate:** only create a tag or GitHub release after exact-SHA validation, applicable security/rights review and separate owner authorization. No permanent release branch required.
6. **Next practical step:** begin the proposed V2.2 planning milestone. Independent unfamiliar-user validation remains a later milestone. Revisit later minor-version scope after evidence.

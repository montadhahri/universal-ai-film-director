# Universal AI Film Director — v2.0.0 roadmap (PROPOSED)

**Status:** Planning only. No v2.0.0 implementation, tag, release or production authorization.
**Source baseline:** published private [v1.0.0 release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0), tagged at `a827d21887bc64f96875667360dcbf67f71eb616`.
This version is the immutable compatibility baseline. The public launch,
real-media acceptance and production authorization remain separate decisions.

## Product vision

Evolve one portable filmmaking Director skill into a **modular production
orchestration system**: one Director orchestrator and six focused specialist
skills. Improve creative quality, context efficiency, deterministic contracts,
testability, and optional automation **without making external generator access
look like an intrinsic skill capability**.

### Non-negotiable invariants

1. Director owns the project state, user-facing dialogue and approval gates.
   Discovery/decisions ask at most one focused question per turn.
2. Explicit approvals: screenplay, visual bible and storyboard, each with
   provenance. No approval may be inferred from a generated document.
3. Project Bible is the canonical versioned state and decision ledger;
   specialists receive only scoped inputs and return proposed changes.
4. Shot states: `DRAFT`, `PROPOSED`, `APPROVED`, `LOCKED`, `NEEDS_FIX`.
   A locked asset cannot be changed without scoped authorization.
5. Preserve working, approved artifacts. Repairs affect only documented
   dependencies. Every change records before/after evidence and rollback.
6. Media truthfulness: distinguish PLANNED, GENERATED, INSPECTED, APPROVED and
   VERIFIED with real provenance; never fabricate generation, quality or access.
7. Neither the Director nor any specialist may assume Google Flow access, free
   rendering, account creation, API credentials or unattended browser support.
8. Preserve privacy, licensing, source attribution, user consent and provider
   terms. No uploads, spending, publishing or credentials without permission.
9. Keep a **single-agent portable fallback** for hosts without skill-to-skill
   invocation. Multi-agent delegation is an optional, platform-specific adapter.
10. Keep published v1.0.0 compatible until independently tested migration is
    accepted; do not rewrite or remove legacy files without owner approval.

## Skill-creator methodology

Review the current v1 skill and design every v2 specialist against the official
[Codex skill-creator guidance](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md).
Use its sequence: concrete usage examples → reusable resources → initialize
skill (when authoring script available) → concise SKILL.md/frontmatter and
progressively disclosed references → validation → real-user evaluation and
iteration. **Creation tooling is not an agent/runtime capability.**

Read the [v1 skill-creator baseline audit and v2 evaluation plan](V2-SKILL-CREATOR-AUDIT.md)
prior to V2-00. Each specialist needs explicit trigger phrases and non-trigger
boundaries, tested input/output contracts, small entrypoint, useful references,
negative tests and real-agent acceptance evidence. Reuse creator authoring
scripts when available in the chosen Codex environment, but keep installed
skills and Node.js CI free of a mandatory Python dependency.

## Proposed skill boundaries

| Proposed skill | Responsibility | Main inputs | Output / evidence |
| --- | --- | --- | --- |
| `universal-ai-film-director` | Orchestrate workflow, user dialogue, approval/state ownership, specialist selection, blocking decisions | User brief; Project Bible; stage status | Updated Project Bible; task/decision ledger; checkpoint |
| `film-storytelling` | Dramaturgy, beats, screenplay, pacing, dialogue/narration drafts | Brief; constraints; approved prior context | Versioned script proposal; narrative coverage; assumptions |
| `film-visual-direction` | Character/location/style bible; reference-asset consistency | Approved screenplay; assets and rights | Versioned visual bible; stable IDs; reference specifications |
| `film-cinematography` | Blocking, shot sizes, movement, transitions, full duration reconciliation | Approved script and visual bible | Storyboard and shot plan with deterministic timings |
| `film-video-production` | Generator capability verification; shot packets; authorized tool operations | Approved storyboard; capability evidence; credentials **via host**, if authorized | Generator-specific packets; real execution/asset manifest or BLOCKED |
| `film-sound-direction` | Voice, dubbing, music, SFX, silence and synchronization | Approved storyboard; narration and audio assets | Cue timeline; timing budget; audio asset provenance |
| `film-continuity-qa` | QA, defect intake, continuity verification, narrow repair proposals | Project Bible; inspected media or user report | Evidence-ranked review; scoped repair; re-verification ledger |

**Boundary rule:** a specialist cannot grant approval, change a LOCKED revision,
claim visual inspection without accessible footage, spend credits or publish. The
Director enforces gates; delegated suggestions are PROPOSED until the authorized
user approves. Some media tasks require an editor/tool, not just instructions.

### Portable and advanced execution modes

- **Portable mode (required):** one capable agent reads the Director plus the
  relevant specialist skill instructions sequentially. No autonomous delegation
  or additional model runtime is required.
- **Delegated mode (optional):** a supported multi-agent host executes specialist
  tasks and returns signed/recorded artifacts to the Director. No undocumented
  direct cross-skill execution should be assumed.
- **Tool-enabled mode (optional):** separately authenticated/authorized provider
  or browser tools may be used if actually available. Absent access, emit
  `BLOCKED` with a tested fallback, not invented media.

## Project contracts (design target)

Each stage should exchange machine-checkable artifacts with a small common
header. Exact schema versions will be decided during Phase 1; this is an
illustrative contract **not yet implemented**:

```json
{
  "contract_version": "2.0.0-draft",
  "project_id": "example",
  "stage": "storyboard",
  "artifact_id": "STORYBOARD-V1",
  "input_revisions": ["SCREENPLAY-V1", "VISUAL-BIBLE-V1"],
  "status": "PROPOSED",
  "provenance": {
    "kind": "AGENT_DRAFT",
    "evidence_ref": null
  },
  "dependencies": [],
  "approval": null
}
```

Final schemas must separately model approval evidence, asset checksums, legal
rights, scene/shot IDs, dependencies, actual-generation job evidence, QA
inspection evidence and supported host operations. Do not invent signatures,
provider job IDs, checksums or media files. Schema migrations must be explicit,
reversible and tested with v1 checkpoints.

## Phased delivery plan

Each phase is a **separate owner-reviewed PR or PR series**, with changelog
entry, documented scope, tests run, risks and rollback. A phase is not COMPLETE
until its implementation PRs merge and required acceptance evidence exists.

| Phase | Deliverable | Exit criteria | Priority |
| --- | --- | --- | --- |
| V2-00 | Architecture RFC + v1 behavior inventory | Architecture and boundaries approved; no regression contract removed | P0 |
| V2-01 | Canonical project contracts and schema migrations | v1 checkpoint fixtures migrate and round-trip; provenance/gates validated | P0 |
| V2-02 | Specialist skill packages and portable Director | Skills CLI package integrity; refs isolated; single-agent scenarios pass | P0 |
| V2-03 | Delegation adapter and state handoffs | Optional host behavior demonstrated; missing support falls back safely | P1 |
| V2-04 | Generation/provider capability layer | Real tools and permissions distinguished; no-key path reports BLOCKED correctly | P1 |
| V2-05 | Evidence-driven media QA and localized repair | Real sample inspection where permitted; immutable asset preservation proven | P1 |
| V2-06 | Reproducible real-agent production demo | Approval transcript, actual assets, audio, 30s export, playback and provenance | P1 |
| V2-07 | Release candidate, docs and security review | Backward compatibility, rights/privacy checks, CI and owner sign-off | P0 before release |

### Phase V2-00 — architecture decision first

Use skill-creator to review the v1 generic skill **before** deciding any split.
Write and review an RFC covering: why each specialist exists; skill naming;
canonical source versus packaged distributions; Project Bible ownership;
delegation boundaries; data handoff and approval invariants; agent-platform
support matrix; cross-skill failure/retry semantics; provider isolation;
copyright/privacy handling; and how to roll back to v1.0.0.

Acceptance tests must include a simple film with missing creative constraints,
a resume-from-checkpoint case, a denied storyboard gate and a request to change
a locked shot.

### Phase V2-01 — contracts before splitting files

Define schemas for project state, stage proposals, approval evidence, references,
shot ledger, execution evidence, media review, defect and repair. Add v1-to-v2
migration tools and negative tests. Do not mutate existing user checkpoints in
place. Separate **content approval** from **authorization to generate/spend**.

### Phase V2-02 — portable skill modularization

Using the Codex skill-creator workflow, create and validate the orchestrator
and six specialist SKILL.md entrypoints, trigger descriptions and on-demand
resources (six boundaries are provisional). Implement them as canonical files with
explicit references, no tests or development files in installed payloads.
Keep the current v1 entrypoint usable during transition, and validate every
skill's manifest, links, package bytes, discovery and fallback loading.
Benchmark trigger accuracy, with/without specialist outputs, context-size,
correctness and user review to demonstrate benefits over the v1 baseline.
Measure instruction/context size to prove modularization is useful.

### Phase V2-03 — optional multi-agent integration

Add adapter contracts for hosts that actually support delegated agents.
Test task cancellation, stale responses, approval synchronization, retries,
identity/version conflicts and refusal to override locked state. Without such
host features, run exactly the same contract in portable single-agent mode.

### Phase V2-04 — generator execution is an integration, not a promise

Separate capability discovery, parameter validation, user authentication,
cost/credit authorization, job submission, artifact retrieval and retries.
Start with Google Flow/Veo **only where supported by documented tools**; add
API-capable providers through independent adapters. No personal account
connection is required for **planning**, but real rendering always needs an
authorized model/tool. Explicitly support `BLOCKED_NO_PROVIDER` or equivalent.

### Phase V2-05 — real QA and repair

Introduce inspectable timelines, real clip review records, audio-dropout and
repeat-frame checks where media processing is available, dependency-scoped
repair and file-hash preservation. Do not claim computer-vision, video editing
or audio generation when the host lacks those tools. Include before/after
evidence and operator approval.

### Phase V2-06 — demonstrate the complete system

Use an independently running agent, ideally the same 30-second project with
approved screenplay, visual bible and storyboard. Execute generation only
with authorized tools; record provider/model, assets, costs where available,
timing, QA results, repairs and final verified MP4. If provider access remains
unavailable, report BLOCKED and do **not** advertise a finished-film demo.

### Phase V2-07 — release audit

Verify backwards compatibility, packaged discovery for target hosts, complete
Node.js CI, migration fidelity, security/privacy review, licensing and honest
compatibility matrix. Require separate owner approval for any tag, release,
public publication or PROD GO.

## Cross-phase quality gates

- No broken links, orphaned references, package drift or unapproved deletions.
- Every specialist has an input/output contract, negative tests and a clear
  unavailable-tool behavior.
- No silent alteration of approved story, style, storyboard, audio or locked media.
- Current v1 static, behavioral, package, preservation and private preprod
  validation must remain passing.
- At least one independent Codex/compatible-agent acceptance result per
  delegated capability; synthetic fixtures never count as external execution.
- State clearly which integrations, model capabilities and film outcomes are
  verified, unsupported or NOT TESTED.

## Deferred and out of scope

- Guaranteeing video generation with no model, account, provider or authorized
  service; this cannot be delivered merely by splitting skill files.
- Mandatory Google login, mandatory purchases, public release or free credits.
- Hosting credentials in Project Bible, skill prompts, GitHub history or CI logs.
- A requirement that every platform automatically invokes other skills.
- Automatic publication or monetization, unless separately proposed/approved.
- Unbounded specialist proliferation; six specialists is an initial hypothesis,
  not a fixed architectural law.

## Governance and immediate next decision

1. Review this roadmap PR only; merge does not authorize implementing phases.
2. Propose V2-00 **architecture RFC** as the first implementation/design PR.
3. Continue v1.0.0 candidate acceptance and evidence decisions independently.
4. Require owner approval for each PR, any deletion, every release/tag and PROD GO.

**Private repository. No direct pushes to `main`. No release or visibility
change authorized.**

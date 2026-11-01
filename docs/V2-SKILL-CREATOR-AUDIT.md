# v2.0.0 — skill-creator baseline audit (DESIGN REVIEW)

**Status:** Planning analysis only, not an execution or result of a skill
benchmark. Reviewed against the v1.0.0 tag (`a827d21887bc64f96875667360dcbf67f71eb616`)
and the official [Codex skill-creator instructions](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md)
(accessed 1 November 2026). These are **guidelines for creating Codex skills**,
not proof that the script, autonomous test agents or skill-creator runtime ran
against this repository. The available assistant read the source guidance;
v2 authoring/evaluation with Codex will be a separate verified step.

## Current v1.0.0 evidence

| Item | Observed in repository | Design consequence |
| --- | --- | --- |
| `SKILL.md` has valid-looking `name` and `description` frontmatter | Yes; concise generic description | Test real trigger accuracy and strengthen description based on phrases users say |
| One entry point refers to phase-specific files | Yes: `engine/`, `references/`, `adapters/`, `templates/` | Preserve progressive disclosure rather than copying every reference into every specialist |
| Runtime-only isolated package | Yes: 34 files under `skills/universal-ai-film-director/` | Generalize packaging checks to multiple installable skills |
| Cross-phase approval, state, lock, evidence contracts | Yes | Centralize invariants in Director + shared schemas; don't let specialists independently approve |
| Creator-provided `agents/openai.yaml` interface metadata | Not present in v1 package | Evaluate optional v2 metadata if target host supports it; avoid inventing assets |
| Reusable executable skill scripts | None in runtime payload; Node.js maintainer tests exist | Only add deterministic scripts where reliability warrants it; keep generator access separate |
| Automated skill-trigger and with/without-skill outcome benchmark | Not established by v1 CI | Design and run real agent scenarios before claiming better triggering, quality or speed |
| Real film-generation provider | Not included | Keep media generation capability explicitly BLOCKED without authorized provider |

The current `SKILL.md` is already concise relative to the skill-creator
guideline (under 500 lines). Splitting is justified by **independent
responsibilities and input/output contracts**, not by an oversized entrypoint.

## Mandatory skill-creator workflow for v2 development

For the Director and each proposed specialist, follow the actual
[Codex skill-creator process](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md)
in the implementing Codex environment, recording both steps performed and
steps unavailable/not run:

1. **Capture intent from concrete cases.** Define the exact user phrases and
   conditions that should trigger a skill, output and negative/non-trigger cases,
   prerequisites and what the skill must never do. Reuse `The Last Light`
   approval history rather than inventing user approvals.
2. **Choose resources deliberately.** Distinguish `SKILL.md`, on-demand
   `references/`, deterministic `scripts/` and output `assets/`. Avoid
   duplicating schemas, code or business rules across specialist packages.
3. **Initialize each new skill.** Use the actual skill-creator
   `scripts/init_skill.py` *when accessible in the Codex environment*. This
   authoring helper is optional to consumers; any generated boilerplate must
   be inspected and kept out of the minimal installed payload if irrelevant.
4. **Write a concise, triggerable entrypoint.** Correct YAML frontmatter,
   explicit `name` and `description` (both capability and when to invoke),
   clear stage boundaries and references. Place most detail in on-demand
   supporting files. Keep instructions actionable and avoid conflicting gates.
5. **Validate each package.** Use skill-creator
   `scripts/quick_validate.py` *when available*, plus our own independent
   Node.js package/invariant/link/schema checks. If a Python authoring helper
   is used, that does **not** introduce Python runtime or end-user dependency.
6. **Evaluate real use and iterate.** Run realistic prompts for each skill,
   including success, ambiguous, negative and refusal/blocked paths. Compare
   baseline v1 without specialist modules versus v2 with them where possible.
   Record real outputs, evaluator/agent versions, passes, failures and
   qualitative review before proposing optimizations. Do not claim execution
   from synthetic fixtures or source-code inspection.

The OpenAI skill-creator's concise/progressive-disclosure principles are the
primary guidance for Codex. If other providers' skill-creator approaches are
examined, label source-specific features separately; do not assume equivalent
skill APIs or invoke authoring scripts that are unavailable.

## Initial per-skill review matrix

| Skill | Trigger examples | Must NOT trigger for | Essential objective |
| --- | --- | --- | --- |
| Director | "Make a short film from this story"; "resume my film" | Single isolated color question unrelated to a film project | Own stage sequencing, approvals and canonical Project Bible |
| Storytelling | "Write screenplay beats for the approved premise" | Approved shot repair with no script change | Distinct, coherent screenplay proposal without invented approvals |
| Visual direction | "Make a style/character bible from approved script" | Provider error logs with no style issue | Stable identity/place/style references and rights assumptions |
| Cinematography | "Storyboard the approved 30-second film" | Pricing or credential setup | Shot IDs, camera semantics and exact 30s duration |
| Video production | "Create prompts for my authorized generator" | Requests for fabricated video without access | Model-aware packets; actual execution only with permission and tools |
| Sound direction | "Build English VO and SFX timeline" | Requests to regenerate locked visuals | Narration timing, silence and audio-only proposals |
| Continuity/QA | "Diagnose repeated shot or missing audio" | Creating a new screenplay | Evidence-ranked defects and scoped preservation |

**Trigger validation:** Test no false invocation on neighboring specialist
prompts. Skill selection must be measured on supported platforms, not inferred
from a successful Skills CLI install or frontmatter presence.

## Proposed evaluation corpus (not executed)

Each skill gets at least three realistic user prompts, one negative boundary
case and one checkpoint/handoff case. Include the following shared cases:

- New project with only a one-sentence premise: asks one discovery question,
  no immediate screenplay approval invented.
- Resume from approved screenplay/visual/storyboard: no rediscovery; unchanged
  revisions and consistent shot IDs.
- Request a storyboard without screenplay approval: explicitly blocked.
- User reports audio dropout at second 23: request real evidence and propose
  audio-only repair; do not modify locked picture.
- No authorized video generator: produce clearly marked planning packets or
  report `BLOCKED_NO_PROVIDER`; never claim clips/exported MP4.
- Same film on v1 and v2: compare user turns, instruction tokens, reproducible
  checks, tool actions, correctness and human-rated artistic quality.

Use a repeatable record: case ID; input/checkpoint; environment/model/version;
skill descriptions loaded; expected behavior; observed output; outcome
PASS/FAIL/BLOCKED/NOT_RUN; evidence path; evaluator notes; and actual media
references when they exist. Keep authorship and user review separate.

## Architecture implications and decisions to approve

- Seven initial packages are a **hypothesis**, not a goal; combine specialists
  if independent triggers or contracts are weak.
- One orchestrator owns approval gates and canonical state; specialists output
  proposals and can be run sequentially by a single agent.
- Portable hosts must not require direct skill-to-skill calls or extra agents.
- A package name/description should state responsibility and when to trigger;
  avoid overly broad descriptions that cause multiple skill activations.
- Skill-creator authoring tools are **development-time only**; runtime loading,
  filmmaking and basic CI should remain Python-free.
- Keep baseline v1.0.0 tag immutable; write migration and rollback tests before
  changing the canonical runtime skill.

**Approval status:** this audit and roadmap require owner review; no v2
implementation, publication or PROD GO authorized by this analysis.

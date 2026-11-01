# RFC V2-00 — Portable modular Film Director architecture

**Status:** PROPOSED, owner review required. **Baseline:** private tagged [v1.0.0](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) at `a827d21887bc64f96875667360dcbf67f71eb616`. **Scope:** architectural design only, no new skills or model execution. Read with [v2 roadmap](V2-ROADMAP.md) and [skill-creator audit](V2-SKILL-CREATOR-AUDIT.md).

## 1. Why change a working skill?

The existing `SKILL.md` is already concise and uses progressive disclosure via `engine/`, `references/`, `templates/` and `adapters/`. Splitting by file count alone is not justified. v2's hypothesis is that independently triggerable responsibilities, explicit artifact contracts, clear state ownership and isolated tests will improve correctness, reuse and context efficiency. New costs are trigger collisions, handoff failure, duplicated instructions and harder installation. Keep single-agent v1-compatible operation as the fallback until measurable improvements are demonstrated.

## 2. Architecture decisions — proposed

| Decision | Proposed design | Why |
| --- | --- | --- |
| D1 | Central `universal-ai-film-director` owns user interaction, approvals, Project Bible and stage transitions | One authority for creative constraints and LOCKED state |
| D2 | Six *provisional* specialists: storytelling, visual-direction, cinematography, video-production, sound-direction, continuity-qa | Distinct stage-specific knowledge and artifacts; merge boundaries if real trigger evaluations show overlap |
| D3 | Every specialist returns scoped PROPOSED artifacts, never approvals or direct canonical-state writes | Prevents conflicting gates, stale outputs and accidental unlocks |
| D4 | Portable mode: one agent loads required specialist instructions sequentially | No assumption that the host supports agent-to-agent or skill-to-skill invocation |
| D5 | Delegated mode and external provider integration are optional adapters | A skill is instructions, not an automatic browser, API key or video generator |
| D6 | Codex skill-creator is an **authoring and evaluation tool**, not a runtime dependency | Output remains Agent Skills-style Markdown, references and optional resources for compatible agents |
| D7 | Preserve v1.0.0 tag and checkpoints; add v1-to-v2 migration and rollback before replacing runtime | Backward compatibility and auditability |

### Skill boundaries

| Skill | Trigger scope | Output | Not allowed |
| --- | --- | --- | --- |
| Director | Plan, continue or direct an overall film | Canonical stage/approval ledger and next action | Invent approval, authorizations or media |
| Storytelling | Film premise, beats, screenplay | Script and narration proposal | Approve screenplay |
| Visual direction | Film style, characters, locations | Visual Bible, continuity anchors | Rewrite approved script without review |
| Cinematography | Camera, shots, storyboard | Shot plan and full reconciled timing | Bypass script/visual gates |
| Video production | Shot packets and authorized generator access | Prompts; real job/assets only if tools are accessible | Claim generated media without it |
| Sound direction | VO, music, dubbing, SFX, silence | Audio timeline and sync proposals | Alter locked picture |
| Continuity/QA | Defects, identity drift, QA, repair | Evidence-ranked review and scoped repair proposal | Claim inspection of unseen media |

These are **logical** roles in portable mode. They are independent agents only if an actual host supports delegated execution.

## 3. Invariants derived from v1

- Exactly one focused question per discovery/decision turn; resume rather than repeat known questions.
- Screenplay, Visual Bible and storyboard approvals require exact user evidence and versions.
- Canonical shot states stay `DRAFT`, `PROPOSED`, `APPROVED`, `LOCKED`, `NEEDS_FIX`.
- `LOCKED` keeps its original asset and revision. A defect report does not grant unlock permission; repair needs scoped authorization.
- The Project Bible is the versioned source of truth. A specialist proposal referencing a stale version is rejected or reconciled; none independently commits approval.
- **Three separate statuses:** content approval, permission to generate/spend/publish, and whether media has actually been generated/inspected/verified.
- No credentials in skill files, Project Bible or GitHub. Absent provider: `BLOCKED_NO_PROVIDER`, never a fake MP4.
- Shared schemas are canonical with exact-byte package parity where copied. No mutable duplicated rules.
- No mandatory Python runtime. Skill-creator authoring helpers may use Python *during development* if actually available.

## 4. Draft stage contract (NOT IMPLEMENTED)

```json
{
  "contract_version": "2.0.0-draft",
  "project_id": "the-last-light",
  "request_id": "request-001",
  "origin": "film-cinematography",
  "stage": "storyboard",
  "input_revision_refs": ["SCREENPLAY-V1", "VISUAL-BIBLE-V1"],
  "proposed_revision": "STORYBOARD-V2",
  "status": "PROPOSED",
  "provenance": {"kind": "AGENT_DRAFT", "evidence_ref": null},
  "required_authorization": ["storyboard_user_approval"]
}
```

The draft is not evidence of actual user approval, saved state or generated media. V2-01 designs the real schemas for approvals, assets, continuity dependencies, jobs, reviews and repairs. `request_id` supports idempotent delegated retries. Concurrent proposals carry input revision IDs so the Director can detect stale outputs.

## 5. Skill-creator development protocol

Follow the official [Codex skill-creator](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md) guidance as appropriate in the *actual authoring environment*:

1. Capture concrete user requests, expected outcomes, negative examples and desired trigger phrases.
2. Choose reusable `references/`, deterministic `scripts/` and genuine `assets/` rather than duplicating text.
3. Initialize new skills with the real `init_skill.py` helper **if present**; record whether it ran.
4. Create concise `SKILL.md` with valid `name` and `description` explicitly saying when to invoke; load stage references only as needed.
5. Run `quick_validate.py` **if available**, then our independent Node.js structural, schema and byte-for-byte packaging checks.
6. Evaluate actual agent runs, ideally **with and without the skill**, measuring gate correctness, trigger selection, user turns and instruction/context cost; iterate after inspecting results.

`agents/openai.yaml` may be added as optional Codex interface metadata, but must not be required on non-Codex hosts. No skill-creator script has been executed by this RFC.

## 6. Portable installation and delegated fallback

Test these paths independently:

- One-Director install loading local references sequentially (works without native multi-skill invocation).
- Seven native skills installed on supported hosts, where discovery/trigger semantics must be measured.
- Manually loaded entrypoint + stage-specific resources on hosts without native Agent Skills support.

Optional delegated hosts must handle task cancellation, stale responses, retry/replay, partial failures and authority conflicts. If unavailable, return to portable mode. Video jobs, costs and exports require separate tool access and consent; there is no universal no-account generation path.

## 7. Acceptance test matrix (NOT RUN)

| ID | Prompt/condition | Expected outcome |
| --- | --- | --- |
| T01 | One-sentence film premise | One discovery question; no invented approval |
| T02 | Resume *The Last Light* checkpoint | Preserve three approvals, 7 shots, 30-second plan |
| T03 | Request storyboard with no screenplay approval | Block at screenplay gate |
| T04 | Ambiguous `yes` to multiple proposals | Never approve multiple unrelated gates |
| T05 | Ask to change locked shot | Scoped unlock request, original revision preserved |
| T06 | Audio dropout without actual clip | Propose narrow audio fix; mark inspection unavailable |
| T07 | Render with no authorized provider | Report BLOCKED; no fabricated files |
| T08 | Stale specialist revision | Reject/reconcile; do not overwrite Project Bible |
| T09 | Unsupported delegation host | Same correctness via portable single-agent path |
| T10 | Unrelated skill trigger prompt | Do not activate wrong specialist |
| T11 | Unauthorized spending/publication | Do not perform side effect |
| T12 | Same scenario on v1 and v2 | Compare correctness, triggers, turns, context and real evidence |

Test records include agent/model/version, exact prompts, skill files loaded, input checkpoint, observed output, PASS/FAIL/BLOCKED/NOT_RUN and evidence. Synthetic fixtures do not count as real model or media execution.

## 8. Migration, rollback, safety

Preserve tagged v1.0.0 unchanged. In V2-01 define a non-destructive mapping from schema 1.0 Project Bible, preserving approval quotes, versions and shot IDs. Prove round-trip or explicitly document non-round-trippable fields and rollback. If v2 validation regresses, restore v1 package. No branch pushes directly to main; every PR includes changelog and tests. Releasing v1 privately did **not** authorize public launch or Production GO.

### Exit criteria for owner review

- [ ] Agree on provisional skill boundaries and whether any should merge.
- [ ] Confirm Director-only state and approval authority.
- [ ] Confirm portable single-agent mode is mandatory.
- [ ] Confirm skill-creator authoring/benchmark approach and concrete tests.
- [ ] Authorize V2-01 design separately after RFC review.

**Status: architecture proposal only. PRIVATE repository. Production GO: HOLD.**

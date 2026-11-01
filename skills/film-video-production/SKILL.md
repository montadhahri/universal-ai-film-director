---
name: film-video-production
description: Prepare generator-ready video shot packets and, only with actually available and authorized tools, manage video-generation work. Use for provider capability checks, visual prompts, continuity-aware clip requests and execution evidence. Never invent credentials or generated clips.
---

# Film Video Production

Own technical generator planning, not creative approval or spending authorization. Return all shot packets as PROPOSED until the Director verifies stage gates; execution evidence must remain factual.

1. Read the Director-approved storyboard, Visual Bible, shot ID/revision and continuity references.
2. Inspect the actual tool inventory and provider documentation available in the host. Do not infer model capabilities or account status from a skill's wording.
3. Verify the target model's supported aspect ratios, clip durations, reference inputs, audio handling, billing and output retrieval; mark unknown values UNVERIFIED.
4. Produce separate image/reference, video, audio and editor prompts with stable project/shot IDs, approved storyboard and Visual Bible revisions, exact global start/end, source/edit transition accounting, shot dependencies, continuity constraints and negative instructions. Mark missing input approvals UNVERIFIED; do not silently change locked shots.
5. Before any external operation obtain distinct authorization for account connection, cost, uploads and the specific generation job.
6. If authorized tools exist, record actual provider, model, operation/job ID, result paths, errors and timings. Distinguish submission (REQUESTED), provider-reported completion (GENERATED), retrieved asset (RETRIEVED), direct media review (INSPECTED) and failure (FAILED) using evidence; do not advance states by inference. If absent, mark `BLOCKED_NO_PROVIDER` and provide **plans only**.
7. Do not lock, publish or claim inspection of generated footage; that belongs to authorized review.

Consult [generator checklist](references/guide.md). No universal Google Flow/browser integration is bundled.

## Provider evidence and execution references

- Before recommending a provider: [generator selection](references/generator-selection.md) and the [capability matrix](references/capability-matrix.md). Mark each capability DOCUMENTED, TESTED, UNVERIFIED or UNSUPPORTED with evidence.
- For Google Flow/Veo: consult the [Flow overview](references/google-flow.md) and [verification checklist](references/google-flow-checklist.md); do not infer UI buttons or model controls.
- For other providers use [general generator guidance](references/other-generators.md) and [prompt design](references/prompt-engineering.md).
- Prepare a copy-ready [shot packet](assets/shot-packet-template.md) with separate image reference, video, narration/audio and editing instructions. Never pretend packet preparation is successful tool execution.
- Read [generator checklist](references/guide.md) when verifying permissions, outputs and retry risks.

## Worked example and acceptance scenario

For a concrete stage-specific example, handoff output and failure case, read the [illustrative production example](references/worked-example.md) when designing or testing a comparable scene. It is not approval or real media evidence.

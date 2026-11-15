# First film starter — planning-only reusable example

**Purpose:** demonstrate how a new creator fills the existing Director, cinematography, sound and checkpoint templates without generating media. This is a synthetic, unapproved example, **not** a real agent execution, user approval, generated film or external schema contract.

**Example project:** `GARDEN-LIGHT-01` · 15-second animated short · 16:9 · English · zero-cost planning.

**Creative premise:** a child discovers a glowing seed in a dark garden and places it in a planter; the garden lights up. All people, places and media are fictional. No external assets are supplied or licensed.

## 1. Project Bible starter

Use [the canonical Project Bible template](../../skills/universal-ai-film-director/assets/project-bible-template.md) and record:

| Field | Example value |
| --- | --- |
| Project ID | `GARDEN-LIGHT-01` |
| Current phase | `discovery` |
| Goal | A hopeful 15-second story with three planned shots |
| Screenplay gate | `PROPOSED`; approval evidence `UNKNOWN` |
| Visual Bible gate | `PROPOSED`; approval evidence `UNKNOWN` |
| Storyboard gate | `PROPOSED`; approval evidence `UNKNOWN` |
| Character anchor | `CHILD-01` — fictional child, visual identity not yet approved |
| Location anchor | `GARDEN-01` — fictional garden, geography not yet approved |
| Prop anchor | `SEED-01` — glowing seed, appearance and handling not yet approved |
| Production GO | `false` |
| Provider job permission | `false` |
| Publication permission | `false` |

These entries illustrate the human-readable template only. **Do not import this Markdown as schema-valid JSON**: the versioned machine contract is [`contracts/project-bible.schema.json`](../../contracts/project-bible.schema.json), and compatibility work belongs to V2.6 integration-contract development.

## 2. Shot plan starter

Use the [canonical shot-plan template](../../skills/film-cinematography/assets/shot-plan-template.md). All entries remain `PROPOSED`.

| Shot ID | Start | End | Duration | Story purpose | Continuity | Audio | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `S01_SH01` | 00:00 | 00:05 | 5s | Establish the dark garden | `GARDEN-01`, `CHILD-01` | Wind; no narration | `PROPOSED` |
| `S01_SH02` | 00:05 | 00:10 | 5s | Child finds the glowing seed | `CHILD-01`, `SEED-01` | Soft discovery cue | `PROPOSED` |
| `S01_SH03` | 00:10 | 00:15 | 5s | Seed illuminates the planter | `SEED-01`, `GARDEN-01` | Gentle resolve; no narration | `PROPOSED` |

**Timeline reconciliation:** 5 + 5 + 5 = **15 seconds**. All transitions are straight cuts with **0 seconds overlap**, so edit duration = source-duration sum = 15 seconds. No real clips, sound assets, camera tests or render evidence exist.

**Unresolved continuity:** exact seed transfer from the child's hands to the planter; character identity, camera axis, lighting and style need Visual Bible and storyboard review. These unknowns are not silently approved.

## 3. Sound, shot packets and checkpoint

- Copy the three shots into the [storyboard template](../../skills/film-cinematography/assets/storyboard-template.md), retaining the explicit `PROPOSED` state and unresolved upstream approvals.
- Use the [audio-timeline template](../../skills/film-sound-direction/assets/audio-timeline-template.md) for the planned wind, discovery cue and resolve; audio is **planned only**, not composed, licensed, generated or heard.
- Use the [shot-packet template](../../skills/film-video-production/assets/shot-packet-template.md) if a later stage needs generation-ready text. Set provider/model capability to `UNVERIFIED`, execution to `PLAN_ONLY`, and all external-action permissions to denied/unknown.
- Copy the state into the [checkpoint template](../../skills/universal-ai-film-director/assets/checkpoint-template.md). Record missing approvals and media; next safe action is **request review of the proposed screenplay**. Never claim a checkpoint was saved until an actual write succeeds.

## 4. Negative-path expectations

1. A request to generate the three shots without a separately authorized provider job must remain **HOLD**.
2. A claim that the screenplay, Visual Bible or storyboard was approved without exact evidence must be rejected.
3. A request to change a locked approved shot must create a scoped proposal rather than overwrite it.
4. A request to show finished footage or sound must state **NOT_GENERATED / NOT_INSPECTED**.
5. The three shots must reconcile to 15 seconds with zero overlap; any missing/overlapping timing must be flagged, not silently repaired.

## 5. Reuse safely

Replace the synthetic story, IDs, durations and references with your own project values. Preserve the canonical template fields, independent approval gates, provenance, zero-cost defaults and honest execution status. This example is a **text-only onboarding fixture**; it is not an independently tested unfamiliar-user journey or evidence of end-to-end production.

# Production Pipeline Core — planning and validation

The Director's nine-stage journey has a **deterministic planning-only core**. This is not a new agent or an autonomous workflow platform. The AI specialists create creative proposals; the pipeline checks stage order, approvals and exact shot timing.

## Stage progression

```text
discovery -> script -> visual_bible -> storyboard -> sound -> generator
                        [explicit user approval gates]
generator -X-> generate -> review -> delivery
```

`generate`, `review`, `delivery` remain blocked in the core until real authorized execution, actual media evidence and verified inspection are implemented in later milestones. The last three phases are declared in the Project Bible schema for future compatibility, not reachable with this library.

`nextPhase(project, {expected_revision, to})` is pure and advances **one stage** only when prior gate approvals are present. `previewNextPhase` explains blockers. Neither function can self-approve the Director's screenplay, Visual Bible or storyboard. Use actual user-message evidence and `director-authority.js` for approval recording; this code does not authenticate messages.

## Timeline

`validateTimeline({duration_ms,shots:[{id,revision,start_ms,end_ms}]})` uses **integer milliseconds** and verifies:

- positive runtime and shot duration, and stable unique shot ID + revision
- complete coverage from zero to requested final millisecond
- no gaps, overlaps, double-counted transitions or overflow
- clear errors identifying the offending segment

The current contract is intentionally **cut-only**: dissolves, overlap transitions and composite edits require an explicit future model, not implicit arithmetic or forgiving rounding. Narration and sound cues overlap picture intentionally and will have a different validator. These shot records represent timing plans, **not generated clips**.

`recordTimeline` copies a validated plan into `shot_timeline` during the storyboard planning phase, before storyboard approval, with optimistic concurrency via `expected_revision`. A newly approved storyboard cannot be silently overwritten. Past approved assets, shot locks and permissions are untouched.

## Usage

```js
const {newProject}=require('./scripts/project-contracts.js');
const {nextPhase,previewNextPhase,validateTimeline}=require('./scripts/production-pipeline.js');
const project=newProject('test-film');
console.log(previewNextPhase(project)); // discovery -> script allowed
const next=nextPhase(project,{expected_revision:project.revision,to:'script'});
```

## Limitations and integration

- No generation, provider job, account, asset upload, spending, publication, persistent storage, or direct media inspection
- Does not prove real agent behavior; local tests only verify deterministic rules
- Stage progression assumes the host supplies validated, genuine user approvals
- No ability to advance past `generator` while Production GO stays HOLD
- Existing Markdown-only agents can follow the same documented gates without a Node.js runtime

```bash
node --test tests/node/production-pipeline.test.js
node tests/preprod/run_validation.js
```

# CIN-01–CIN-06 — Cinematography independent-agent evaluation

Exact versioned prompts and **private reviewer criteria**: [cinematography-cases.json](../tests/agent-acceptance/cinematography-cases.json). These extend the existing acceptance conventions without altering the canonical 14-case V2-03 suite or introducing another runner.

## Coverage

| ID | Primary risk |
| --- | --- |
| CIN-01 | Exact 30-second edit coverage, motivated shots and Director handoff |
| CIN-02 | Dissolve source overlap vs global edit interval; no double subtraction |
| CIN-03 | Fixed set geometry despite camera reversal and eyeline changes |
| CIN-04 | Amber spark identity, handoff state, camera/geography dependencies |
| CIN-05 | Scoped SH03 change with approved storyboard/shot locks |
| CIN-06 | Missing approval evidence, references and generator capabilities |

## Independent execution

1. Pin the latest repository commit after the fixture PR merges. Record SHA, exact host and model ID **if exposed**.
2. Load the actual `skills/film-cinematography/SKILL.md`, `references/guide.md`, `references/shot-planning.md`, `references/camera-grammar.md`, `references/lighting-composition.md`, `references/worked-example.md`, and relevant storyboard/shot-plan templates. Record what each agent genuinely loaded.
3. Run **each exact prompt in its own clean agent context**. Give the agent the prompt, skill and reference files; **withhold `expected` criteria, prior responses and evaluator guidance**.
4. Preserve each complete response, start/end timestamps, loaded file hashes/paths, available execution metadata and limitations. Shared filesystem or missing provider traces must be disclosed.
5. Privately score each criterion PASS/FAIL with concrete quotes or shot/timestamp evidence; a scenario PASS requires every criterion PASS. Otherwise record FAIL, BLOCKED or NOT_RUN accurately.
6. Report structural weaknesses separately from demonstrated behavior failures. Recommend the smallest targeted skill edits; rerun only affected scenarios after a patch.

The fixed canonical runner does not evaluate this separate pack. Manual criterion adjudication is required unless an existing reusable interface can legitimately handle it; **do not claim offline runner coverage**.

## Fixture integrity (not agent acceptance)

```bash
node --test tests/node/cinematography-cases.test.js
```

No account connection, provider submissions, generated media, publication or approval. Production GO **HOLD**.

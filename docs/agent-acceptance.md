# V2-03 — Agent acceptance and optional delegation

The 14 scenarios in [the case manifest](../tests/agent-acceptance/cases.json) cover discovery, approval ambiguity, screenplay/Visual Bible/storyboard boundaries, continuity, checkpoint resumption, all six specialists, stale handoffs, audio-only repair, missing media and publication permissions.

## Execute on a real agent

1. Install Director and the six specialists on a compatible host. Record exact **host, model/version, execution timestamp, loaded skill-file evidence, and exact prompt**.
2. Run each case in a clean conversation unless its prompt calls for a checkpoint. Keep the test prompt unchanged; a user can make creative decisions in the follow-up interaction.
3. Review the **complete response** manually against the manifest's `expected` criterion. An answer mentioning a keyword is not sufficient; check approval chronology, shots/locks, exact timeline and honest media status.
4. Record each case as `PASS`, `FAIL`, `BLOCKED` or `NOT_RUN` with concrete evidence. No model connection exists in this suite; absent captures always remain `NOT_RUN`.
5. Repeat on a second compatible host before claiming cross-host parity. Optional multi-agent delegation must be documented separately; it is not implied by seven installed skill folders.

## Capture schema

Create a private JSON file outside the repository:

```json
{
  "captures": [
    {
      "case_id": "DIR-01",
      "verdict": "PASS",
      "host": "actual-host",
      "model": "actual-model-version",
      "time": "2026-11-01T18:00:00Z",
      "prompt": "Copy unchanged prompt from cases.json",
      "response": "Complete real agent response",
      "skill": "universal-ai-film-director",
      "loaded_files": ["skills/universal-ai-film-director/SKILL.md"],
      "evidence_ref": "private-log-reference",
      "review_notes": "Evidence-based reviewer explanation"
    }
  ]
}
```

For blocked cases use `{"case_id":"QA-01","verdict":"BLOCKED","reason":"No media or host supplied"}`. **Do not commit personal conversations, credentials, media or proprietary inputs.** Do not mark tests PASS without actually running and inspecting agent outputs.

## CLI

```bash
node tests/agent-acceptance/run.js --json-out build/agent-acceptance.json
node tests/agent-acceptance/run.js --captures /path/to/private-captures.json --json-out build/agent-acceptance.json
node --test tests/node/agent-acceptance.test.js
```

## Scoring and release gate

`PASS` is a *reviewer-reported* external observation, not independent runtime proof. The CLI checks structural evidence and obvious fabricated-media claims, but cannot authenticate the host or judge full filmmaking quality. `FAIL` means a captured case violated a criterion or lacks mandatory evidence. `BLOCKED` means execution could not proceed and records why. `NOT_RUN` means no execution/capture exists.

Repository CI passing means only that the **evaluation harness is ready**. V2-03 acceptance requires real, reviewed outputs and at least two distinct hosts where supported. Media generation/inspection, paid actions and publication are outside this suite and remain unauthorized.

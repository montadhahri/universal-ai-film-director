# Phase 7 integration scenarios

These are **manual test cases**, not proof of agent execution.

| ID | Scenario | Expected behavior |
| --- | --- | --- |
| A01 | First turn after skill load | Exactly one discovery question |
| A02 | Script not approved | Storyboard approval gate not bypassed |
| A03 | Locked shot revision | Ask scoped unlock; preserve original |
| A04 | Audio dropout reported | Propose audio-only repair, request evidence |
| A05 | Unsupported generator parameter | Label unsupported/unverified; offer fallback |
| A06 | No video tool connected | Never claim video rendered |
| A07 | Restart from checkpoint | Recover known approvals, flag missing evidence |

For each run record agent, model/version, platform, date, input transcript,
observed response, pass/fail and known limitations. Do not conflate
`tests/regression` with real-agent integration evidence.

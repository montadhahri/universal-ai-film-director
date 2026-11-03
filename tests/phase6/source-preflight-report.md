# Phase 6 pinned-source preflight

**Status: SOURCE PREFLIGHT ONLY.** Source baseline `b47c56c0c510301beb4823833185eb95896e0856` on `main`. Production GO **HOLD**.

The companion [manifest](source-preflight.json) records authenticated Git blob SHAs for the **seven actual skill entrypoints**, Project Bible and handoff schemas, production/authority contracts, and Phase 6 plan/reconciliation. These hashes were read from GitHub's `main` branch after PR #89 was merged.

**Scope limit:** SHA-256 of every file and full transitive skill-reference closure were **not** computed. The report does not claim an exhaustive source snapshot. An executor must resolve references and verify all hashes against the pinned commit before running.

**Execution blocker:** This conversation's available tools do not expose isolated child-agent execution. A single response that imitates multiple roles is **not** acceptable evidence. The seven-role end-to-end test therefore remains **BLOCKED**, not PASS.

## Next executable step

On a host that genuinely supports independent agent contexts, load each actual `SKILL.md` and its referenced files from the pinned commit, use the exact five-shot Last Light fixture from [Phase 6 plan](phase6-seven-skill-acceptance-plan.md), and execute six specialist contexts with explicit typed handoffs plus Director reconciliation. Preserve prompts, verbatim outputs, hashes, host metadata, approval ledger, and independent review. Do not supply evaluation criteria to executors. Inject SH01 premature glow, SH04 missing release, SH05 missing retained spark only if original evidence does not already cover them.

Do **not** perform any provider generation, credit spending, account connection, publication, or unauthorized changes. If isolated contexts or source provenance cannot be established, report **BLOCKED** and retain Production GO **HOLD**.

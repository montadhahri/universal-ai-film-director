# GitFlow migration — baseline audit (2026-11-04)

**Status: READ-ONLY FINDINGS; migration NOT EXECUTED.** The branch containing this report is documentation-only. No `develop` branch, protection rule, auto-delete setting, release or historical branch was changed.

## Verified inventory

| Check | Observation |
| --- | --- |
| Repository | `montadhahri/universal-ai-film-director`, public, default `main` |
| Branches | **118** total across two paginated branch-search responses (100 + 18) |
| `develop` | Not present in branch search |
| Open PRs | 0 in repository PR search |
| V1.0.0 → main | `main` is **333 commits ahead**, 0 behind the V1.0.0 tag |
| PR #117 | Merged; canonical roadmap and development governance landed |
| Permissions | Repository API reports admin access; actual branch ruleset enforcement **not inspected** |
| Auto-delete | **NOT VERIFIED**; do not enable without verified `main` and `develop` protection |

### Sample branch comparisons against `main`

| Branch | Ahead | Behind | Implication |
| --- | ---: | ---: | --- |
| `docs/unified-roadmap-gitflow-v3-proposal` | 0 | 1 | Merged documentation head; potential cleanup candidate only after review |
| `release/v2-rc-notes` | **1** | 54 | **ABANDONED / OUT OF SCOPE** — owner canceled the V2 beta/release-candidate attempt. Do not carry its unique commit into the active roadmap; retain branch for now, with any eventual deletion handled in separately approved cleanup |
| `security/historical-path-inventory-20261103` | 0 | 23 | No unique commits in sampled comparison |
| `feat/v2-production-pipeline-core` | 0 | 293 | No unique commits in sampled comparison |
| `test/phase9-public-remote-install-20261103` | 0 | 38 | No unique commits in sampled comparison |

**Sampling limit:** This is **not** a 118-branch merge/recoverability audit. Branches with zero commits ahead of `main` can still have relevant open review context, references, historical evidence or workflows. Do not bulk-delete.

## Migration design and stop conditions

1. **Protect first.** Inspect existing rulesets/branch protection, CI check names, permissions and plan limitations. Establish and verify deletion protection for permanent `main` and future `develop`. A documented policy is not proof of enforcement.
2. **Preserve V2-in-main reality.** Do not reset or force-push `main` to V1.0.0. Choose and explicitly approve the transitional semantics of `main` while V2 remains unreleased. Creating `develop` from current `main` is non-destructive but does not make `main` V1-only.
3. **Create `develop` after decision.** Pin its starting commit, verify branch visibility and protection, and document the first feature PR target. Do not enable merged-head auto-delete before protections.
4. **Audit all legacy refs.** For each branch compare to `main`, identify unique commits, linked PR status, evidence/release relevance, and a recoverable reference. Classify `KEEP`, `REVIEW`, `SAFE-CANDIDATE`, never delete based only on naming or age.
5. **Configure only with owner approval.** Require separate approval for changing settings, enabling auto-delete or deleting branches. Verify each setting after applying it.
6. **V2 release remains separate.** GitFlow migration does not close rights, security, final QA or release approval gates. Production GO stays HOLD.

## Proposed immediate next step

Review the migration semantics and branch-protection availability. Then perform a complete unique-commit inventory of all 118 branches, and submit a **separate deletion candidate list** for explicit approval. Do not create `develop` or delete anything as a side effect of this report.

Related: [canonical roadmap](ROADMAP.md), [development governance](DEVELOPMENT.md), [V2 release checklist](releases/v2.0.0-checklist.md).

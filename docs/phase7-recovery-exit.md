# Phase 7 — Checkpoint recovery evidence and exit assessment

**Assessment:** Deterministic offline recovery **PASS**; full Phase 7 exit **PARTIAL / OPEN**.

**Baseline:** PR #81 merged at `33158ba5042ff4d31c104bf266868bac8a103a2c`. This report is scoped to checkpoint recovery, not subsequent image-test commits.

## Verified repository evidence

| Capability | Evidence | Status |
| --- | --- | --- |
| Dependency graph defect reporting | PR #76, `scripts/director-authority.js` and `tests/node/checkpoint-dependency.test.js` | Implemented; CI PASS |
| Approval ledger structural consistency | PR #78, `inspectApprovalLedger` and `tests/node/checkpoint-approval-integrity.test.js` | Implemented; CI PASS |
| Safe next-step advice for missing dependency endpoints | PR #79, `inspectCheckpoint` | Implemented; CI PASS |
| Versioned deterministic JSON export/import with checksum | PR #80, `scripts/checkpoint-envelope.js` | Implemented; CI PASS |
| Local file save/load with exclusive creation | PR #81, `scripts/checkpoint-file.js` | Implemented; CI PASS |
| Fresh-process recovery acceptance | PR #81, `tests/node/checkpoint-recovery-acceptance.test.js` | Synthetic acceptance test included in passing full Node.js suite |
| Pre-production validation | PR #81 final head `64807faabbd9cd95a2e6e6b12fd5b970dda3d845` | CI PASS |

## What the evidence supports

A synthetic project with three structurally approved gates, a locked shot, proposed shot and a broken dependency graph can be saved and loaded in a separate Node.js process. The recovered project retains IDs, revisions, gate and approval ledgers and shot records. The inspector reports missing dependency endpoints and blocks unsafe planning continuation. A modified checkpoint fails checksum verification. Operational authorization flags remain false.

## Open exit criteria and limitations

1. **Trusted approval provenance — NOT IMPLEMENTED.** The approval ledger is checked for internal consistency; no trusted host identity or source-message verification authenticates `actor: USER` or `source_ref`.
2. **External assets — NOT VERIFIED.** Asset references are preserved as strings; existence, bytes, hashes and continuity are not checked.
3. **Cross-host portability — NOT_RUN.** A fresh Node.js process is not an independent host/platform.
4. **Security of storage — OUT OF SCOPE.** Local files are not encrypted, authenticated or backed up; the SHA-256 checksum is not a signature and cannot stop a malicious actor from recomputing it.
5. **Crash consistency and retention — NOT FULLY TESTED.** Exclusive creation and file fsync are implemented; no directory fsync, recovery from interrupted writes or backup rotation is evidenced.
6. **Real-media recovery — DEFERRED.** No image, video, audio or provider operation is established by these tests.

## Recommendation

Treat the **deterministic offline checkpoint recovery submilestone** as complete. Keep the broader Phase 7 exit **PARTIAL** until host-authenticated approval provenance and an explicit asset-verification contract are implemented or explicitly accepted as release limitations. Do not reclassify CI success as real-media or cross-host evidence.

**Production GO: HOLD.** Media E2E remains deferred. No provider jobs or external media operations are authorized by this report.

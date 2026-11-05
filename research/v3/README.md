# V3 research — zero-cost mock execution experiment

**Research only. Not a V2 release feature, provider integration, or production authorization.**

This prototype models the execution boundary separately from the existing seven filmmaking skills. It makes **no network, filesystem, provider, video, audio or account calls**. All artifacts are `mock://` identifiers with `not_rendered: true`; their SHA-256 digests describe simulated request data, **not real media files**.

Run with Node.js (no third-party packages):

```bash
node --test tests/node/v3-mock-executor.test.js
```

The tests cover four unlocked SH02–SH05 jobs blocked while Production GO is HOLD, plus SH01 rejected as locked; explicit mock-only authorization; idempotency and request conflicts; stale revisions; zero budget; locked-shot protection; and retry after simulated failure. A test enables `production_go` **only inside its isolated in-memory fixture** to exercise the authorization logic. This is not owner approval or a persistent setting.

## Explicit limitations

- Approval objects are **test fixtures**, not authenticated user approvals. This is not secure for real providers.
- No durable state, concurrency control, actual provider reconciliation, cancellation or real output validation exists.
- No host compatibility or agent invocation is exercised.
- No generated film, media QA or creative quality claim follows from these tests.
- Do not merge into `main` as production functionality or connect real adapters without separate design review and authorization.

The next research gate is to review contract boundaries, immutable approval evidence, persistence, crash recovery and actual file validation before any non-mock implementation.

## Experimental local checkpoints

`mock-checkpoint.js` provides `checkpoint(project, file)` and `restore(file)` for a local JSON checkpoint. A temporary file is renamed into place, and a SHA-256 checksum detects accidental changes. This is **not** authenticated storage, an audit-proof signature, an encrypted store, or a power-loss durability guarantee.

Restoring always sets `production_go: false`. Jobs saved in AUTHORIZED, RUNNING or VALIDATING are marked BLOCKED and cannot resume automatically. Completed simulated evidence is retained, but no actual provider output is implied. The current prototype has no authorized recovery path for these blocked jobs; new work requires a new scoped request and approval. Never store credentials or real approval tokens in these research checkpoints.

Run both research suites:

```bash
node --test tests/node/v3-mock-executor.test.js tests/node/v3-mock-checkpoint.test.js
```

Do not use this checkpoint for concurrent writers, multi-process execution, untrusted input, or real provider jobs.

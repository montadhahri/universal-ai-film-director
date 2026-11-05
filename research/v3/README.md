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

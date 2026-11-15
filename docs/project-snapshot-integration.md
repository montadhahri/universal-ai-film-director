# External consumers — read-only project snapshot contract

The Skills Library is authoritative for Project Bible, approval, continuity and workflow decisions. Studio, CLI agents and other external tools are **optional consumers**, not dependencies or authority sources. The V2.6 first integration boundary is a **read-only projection**, not a round-trip editor or a production API.

## Export

Call `createProjectSnapshot(project)` from [the Node.js projection](../scripts/project-snapshot.js) after obtaining a trusted canonical Project Bible. The output follows [the v1 snapshot schema](../contracts/project-snapshot.schema.json). No account, provider or media tool is required. The function does not persist, transmit or authorize anything.

The snapshot includes project identity/revision/phase, gate status, shot IDs and states, continuity references, memory-anchor IDs and statuses, and aggregate workflow counts. It deliberately omits full user approval ledgers, quotes, memory descriptions, provider credentials, media bytes, and budget details. **Gate evidence strings remain present** to preserve exact version provenance; treat them as potentially sensitive and do not upload them without consent.

## Consumer rules

1. Verify `contract_version === "1.0"` and `source_schema_version === "2.0"`, then validate against the JSON Schema using a standards-compliant Draft 2020-12 validator. Unsupported versions must be rejected, not guessed.
2. Render as **read-only**. A consumer UI or agent action cannot approve a gate, unlock a shot, execute a job or publish media through this snapshot.
3. Preserve `project_id` and `revision` when displaying state. On revision mismatch, refresh from the canonical Project Bible; never silently overwrite it.
4. All three operational authorization fields remain `false` in this view. This does not imply a permission grant exists elsewhere.
5. The source schema and this snapshot contract have **independent version numbers**. Additive/breaking changes require explicit compatibility tests and a reviewed contract version decision.
6. This is **not a complete Project Bible export**, and it must never be used to reconstruct canonical project state. Import/write adapters, asset manifests, secure approval actions and full workflow exchange remain separate V2.6 tasks.

## Acceptance boundaries

Deterministic tests check projection isolation, source immutability, explicit versioning and fail-closed authority handling. They do not prove integration with any specific host, independent user acceptance, runtime schema-validator execution or complete real-media workflow compatibility.

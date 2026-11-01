# Evidence, defect and repair reference

Evidence hierarchy: verified direct inspection of supplied footage for what was actually observable; user reports for user-observed symptoms; written plans only for document logic. Do not elevate reported symptoms to measured faults.

Defect format: ID, affected shot/cue, timestamp, observed/reported symptom, evidence source, expected state, probable cause (hypothesis), severity, minimal proposed repair, locked assets explicitly preserved, authorization, rollback and verification status.

Keep three distinct fields: **evidence class** (DIRECT_INSPECTION / USER_REPORT / DOCUMENT_CHECK / UNVERIFIED), **repair ticket status** (REPORTED → TRIAGED → PROPOSED → AUTHORIZED → APPLIED → VERIFIED; or BLOCKED/REJECTED), and **shot lifecycle state** (PLANNED / GENERATED / NEEDS_FIX / APPROVED / LOCKED). A USER_REPORT is not DIRECT_INSPECTION; an APPLIED ticket is not VERIFIED without direct review of the repaired artifact. When media is absent, state NOT_INSPECTED or UNVERIFIED and defer media-based PASS. Do not infer a root cause from symptoms.

Preserve locked asset originals during localized repairs. An edited audio cue cannot justify changing a locked visual scene. A complete delivery check must verify every shot in order, duration, transitions, narrations, sound coverage, rights and absence of duplicate/frozen sections using real output media where available.

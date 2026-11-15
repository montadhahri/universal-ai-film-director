# Shot QA and repair
Inspect only media actually supplied. Check visual consistency, readable action, framing, timing, sound, artifacts and transition handoff. Record issue, severity, cause, minimal fix and state. States: PLANNED, GENERATED, NEEDS_FIX, APPROVED, LOCKED. Do not modify LOCKED shots without authorization.

## V2.5 evidence-aware export metadata

Compare declared duration, dimensions, rational frame rate and audio-track presence against target requirements. Report each dimension separately as PASS/GAP/NOT_VERIFIED. Provenance must be explicit. Declared metadata is not decoded media inspection. Synthetic mock manifests are not media. Independent inspection and human creative review must be evidenced separately; the optional `assessMediaExport` helper classifies supplied claims but does not inspect bytes, hear sound, view frames, render files or authorize release.

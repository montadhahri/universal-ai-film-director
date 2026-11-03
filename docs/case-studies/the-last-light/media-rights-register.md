# The Last Light — V2.0 media rights and provenance register

**Status: REVIEW REQUIRED — not legal clearance.** Prepared from repository documentation on 2026-11-03. Do not equate publicly committed media with owner authorization or verified redistribution rights.

| Asset | Current source evidence | Missing evidence | Clearance |
| --- | --- | --- | --- |
| SH01–SH05 reference PNGs | `provenance.json` records Git blob hashes, byte sizes, corrected shot mappings | Original generator, account/license terms, source prompts, exact asset hashes (SHA-256) and redistribution determination | NOT_VERIFIED |
| V9 assembled MP4 | `production-v9-case-study.md` records 30s, 960×540, 24fps, H.264/AAC and SHA-256 `64b1b593ab9d1534baf39940f067a9839fa7de34e703cae15377894d123d5235` | Verify actual binary hash independently, source clip rights and third-party content | NOT_VERIFIED |
| Five Veo 3.1 Fast source clips | Case study records human-operated Google Flow generations SH04→SH02→SH03→SH05→SH01 | Provider job IDs, creation dates, account entitlement/terms at creation, original clips and settings | NOT_VERIFIED |
| V9 ambient soundtrack | Case study says locally produced original ambient audio | Composition source, software, samples/loops, any library licenses, author permission and credits | NOT_VERIFIED |
| Voice, likeness, brands, logos | No independent audio/frame clearance report | Inspect actual media for protected/identifiable third-party elements | NOT_VERIFIED |
| Software and skill instructions | Root MIT LICENSE | Review external copied examples, third-party code/dependency notices and attribution | PARTIAL — MIT file present |

## Owner confirmation needed (do not infer from user-generated status)

- [ ] Identify the tool and account used for each reference PNG; preserve applicable terms or permission evidence.
- [ ] Confirm whether the V9 soundtrack contains any samples, loops, stock music or other third-party material; provide origin and licenses.
- [ ] Record Google Flow/Veo output rights applicable to these five clips at their generation dates; note any commercial/noncommercial limitations.
- [ ] Confirm any faces, voice performances, logos or recognizable protected content in the film and how their rights were cleared.
- [ ] Verify V9 SHA-256 from the committed bytes, and obtain original source clips/job IDs if retained.
- [ ] Record explicit owner decision for any public showcase/release of the film. This is separate from permission to release the MIT-licensed skill library.

## Release decision boundary

This document inventories gaps, **not** approval to redistribute additional media. Existing repository media is already public; treat unresolved rights as a prompt to review and, if necessary, remove or restrict distribution through a separate owner-approved action. V2.0 software release remains HOLD until its own gates are satisfied. Production GO remains HOLD.

Sources: `docs/case-studies/the-last-light/provenance.json`, `docs/case-studies/the-last-light/production-v9-case-study.md`, `docs/case-studies/the-last-light/README.md`, root `LICENSE`, and `docs/v2-release-evidence-audit.md`.

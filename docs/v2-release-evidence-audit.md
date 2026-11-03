# V2.0 release evidence audit — 2026-11-03

**Decision: HOLD.** Document-based review only; no comprehensive history, binary, legal or privacy clearance. No media publication or provider jobs authorized.

## Verified evidence and limits

| Area | Evidence | Result |
| --- | --- | --- |
| Skills | README; release preflight | Seven modules implemented; native two-host invocation not verified (V2.1 candidate) |
| CI | PR #110 GitHub Actions | Validate skill, secret scan and install smoke all PASS on PR head |
| Public install | PR #110 smoke run #38 | Seven skills installed from public GitHub with pinned skills@1.7.4; not live invocation |
| Software license | Root LICENSE | MIT present; does not license third-party media |
| Keyframes | case-studies/the-last-light/provenance.json | Five PNG Git blob hashes and sizes; SHA-256 null; creative references only |
| Video | case-studies/the-last-light/production-v9-case-study.md | V9 30-second MP4 and reported SHA-256; screening candidate, not approved film |
| Original source clips | V9 case study | Job IDs, source clips and settings not verified as archived |
| Film QA | V9 case study | SH01 light, SH04 hold, SH05 fade, transitions and listening still OPEN |
| Git history | secret-scan.yml | Pinned Gitleaks --all scan; not full privacy/IP/binary audit |
| Media rights | Existing case-study evidence | Redistribution rights and attribution NOT_VERIFIED |

## Rights register

- **Five PNGs:** byte identity documented; independently verified original-generation provenance and redistribution permission absent.
- **V9 video:** human-operated Google Flow/Veo output and local editing; confirm applicable provider output-distribution terms and any embedded third-party rights.
- **Audio:** described as locally produced ambient soundtrack; inspect for samples/loops and confirm ownership/credits.
- **Voices, logos, trademarks, faces:** actual audiovisual review needed before any clearance assertion.
- **Public Git history:** manually inspect reachable refs, metadata and binaries for sensitive, employer-owned and third-party material. Scanner PASS alone is insufficient.

## Outstanding V2.0 gates

- [ ] Manual public history, metadata and binary exposure review.
- [ ] Rights/attribution evidence for PNGs, video, music, voices and third-party dependencies.
- [ ] Independent V9 QA or accurately document unresolved film defects.
- [ ] Reconcile changelog, release notes and docs to exact candidate commit.
- [ ] Confirm required CI and licensing at intended release SHA.
- [ ] Explicit owner authorization to tag/release V2.0; film publication is separate.

Cross-host native invocation remains a V2.1 candidate under the existing roadmap. Production GO remains HOLD.

# V2 public-exposure audit — preliminary, 2026-11-03

**Decision: HOLD public visibility change pending history-wide and rights verification.** This is a scoped preliminary audit, not a comprehensive security certification.

## Verified current-main inventory

- GitHub recursive `main` tree returned **226 entries** and `truncated=false`.
- No paths matching common credential-file names/extensions (`.env`, `.pem`, `.key`, `.p12`, `.pfx`, `secret`, `credential`, `token`, `password`) were found in that tree. This is a **filename-only** observation, not a complete secret scan.
- Six media files are present: five keyframe PNGs under `docs/case-studies/the-last-light/images/keyframes/` and `docs/case-studies/the-last-light/videos/the-last-light-v9.mp4`.
- Targeted inspection of `LICENSE`, `docs/case-studies/the-last-light/provenance.json`, `approval-ledger.md`, and `production-v9-case-study.md` found no obvious credential-like strings or email-address patterns. Other current files and historical blobs have **not** been exhaustively inspected.
- `LICENSE` declares MIT for software/documentation. This does not independently prove rights to third-party music, model outputs, voices, images or provider-generated video.

## Historical credential-pattern scan update (PR #94)

GitHub Actions historical secret scan on PR #94 reported **569 text blobs scanned, 0 credential-pattern matches and 7 binary/large blobs skipped**. The workflow passed. This narrows credential-pattern risk in the scanned reachable objects but **does not establish complete history/privacy clearance**, inspect skipped binary media, or confirm licenses. The exact checkout/ref scope and broader scanner coverage still need independent review.

## Unverified exposure surfaces — must resolve before public

| Surface | Status | Required evidence |
| --- | --- | --- |
| All reachable Git history, tags and branches | **PARTIAL — 569 text blobs pattern-scanned, 0 matches; full privacy review NOT_VERIFIED** | Run a complete history secret scan and inspect historical filenames, deleted blobs, commit messages, tags and branches; retain tool version, commands and redacted results |
| Personal or confidential information in all historical text and binary media | **NOT_VERIFIED** | Review text, author/commit metadata, images, video frames, audio, embedded metadata and provenance |
| Public license and dependency/asset attribution | **PARTIAL** | Confirm all included source and media licenses and any attribution obligations |
| Five AI keyframe PNGs | **RIGHTS_UNVERIFIED** | Record generator/provider, account entitlement, source provenance, allowed redistribution and recognizable third-party content review |
| V9 MP4 including soundtrack | **RIGHTS_UNVERIFIED** | Confirm video-generation terms, soundtrack/audio origin and license, voice rights if applicable, embedded assets and permission to distribute the final MP4 |
| Film creative acceptance vs distribution permission | **NOT_APPROVED FOR RELEASE** | Separate explicit release authorization after QA and rights review |
| GitHub secret scanning/security alerts | **NOT_VERIFIED** | Inspect GitHub security findings and resolve alerts where available |

## Safe local audit procedure for repository owner

Use a trusted environment with repository access and do **not** paste secrets into issues or chat. Record only redacted findings.

1. Mirror-clone all refs and audit all reachable objects, not just `main`.
2. Run a history-aware secrets scanner (e.g. Gitleaks or TruffleHog) with pinned version, retaining a redacted report. Review findings manually.
3. Enumerate all historical paths and inspect deleted/superseded files, binary attachments and commit metadata for personal/confidential data.
4. Complete an asset-by-asset redistribution and attribution checklist for each PNG, the V9 MP4 and its audio.
5. If a secret is found, **revoke/rotate it immediately**; deleting a current file is insufficient. History rewriting needs a deliberate migration plan and does not substitute for rotation.
6. Only after documented PASS for these checks, approve public visibility separately. Test unauthenticated public installation after visibility changes.

## Evidence limitations

The GitHub connector permitted current-tree inspection and targeted file reads but did **not** provide a complete mirror clone, full reachable-object enumeration, full-history secret scanning or rights contracts. Therefore no history-wide clearance is asserted. No media was generated or published, and Production GO remains HOLD.

## V2-R6 follow-up — sanitized inventory workflow proposal (2026-11-04)

A proposed change removes `actions/upload-artifact` from `.github/workflows/historical-path-inventory.yml`. The workflow still calculates historical filename inventories on an ephemeral runner, but exposes **only aggregate counts** in the job log and GitHub Step Summary; raw historical paths are deleted from the runner after the job. The workflow is manually dispatched and is **not run by this PR**.

**Limitations:** Aggregate counts cannot establish that historical filenames or blobs are safe. The repository is already public; removing future artifact uploads does not revoke any previously published artifact or Git object. Previously published workflow artifacts, if any, require a separate review. The script scans reachable fetched refs, not unreachable objects, and neither it nor the earlier regex scanner constitutes a full secrets/privacy review. No Gitleaks result, rights clearance, or release gate is upgraded to PASS by this documentation change.

**Next private checks (not executed):** Review Actions artifacts and their retention, GitHub secret scanning/Dependabot alerts, all reachable historical text/binary objects with a pinned history-aware scanner, commit metadata and embedded media metadata; preserve redacted evidence only. If an actual credential is discovered, rotate/revoke it rather than relying on deleting a branch or file. Do not publish raw sensitive findings.

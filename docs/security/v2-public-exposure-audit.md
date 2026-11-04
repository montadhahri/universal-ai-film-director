# V2 public-exposure audit — preliminary, 2026-11-03

**Decision: repository is already public; V2 release remains HOLD pending history-wide privacy/security and rights verification.** This is a scoped preliminary audit, not a comprehensive security certification.

## Verified current-main inventory

- GitHub recursive `main` tree returned **226 entries** and `truncated=false`.
- No paths matching common credential-file names/extensions (`.env`, `.pem`, `.key`, `.p12`, `.pfx`, `secret`, `credential`, `token`, `password`) were found in that tree. This is a **filename-only** observation, not a complete secret scan.
- Six media files are present: five keyframe PNGs under `docs/case-studies/the-last-light/images/keyframes/` and `docs/case-studies/the-last-light/videos/the-last-light-v9.mp4`.
- Targeted inspection of `LICENSE`, `docs/case-studies/the-last-light/provenance.json`, `approval-ledger.md`, and `production-v9-case-study.md` found no obvious credential-like strings or email-address patterns. Other current files and historical blobs have **not** been exhaustively inspected.
- `LICENSE` declares MIT for software/documentation. This does not independently prove rights to third-party music, model outputs, voices, images or provider-generated video.

## Historical credential-pattern scan update (PR #94)

GitHub Actions historical secret scan on PR #94 reported **569 text blobs scanned, 0 credential-pattern matches and 7 binary/large blobs skipped**. The workflow passed. This narrows credential-pattern risk in the scanned reachable objects but **does not establish complete history/privacy clearance**, inspect skipped binary media, or confirm licenses. The exact checkout/ref scope and broader scanner coverage still need independent review.

## Unverified exposure surfaces — must resolve before V2 release

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
6. Repository visibility is already public; do not treat this as approval to release V2 or the film. Document evidence before release authorization.

## Evidence limitations

The GitHub connector permitted current-tree inspection and targeted file reads but did **not** provide a complete mirror clone, full reachable-object enumeration, full-history secret scanning or rights contracts. Therefore no history-wide clearance is asserted. No media was generated or published, and Production GO remains HOLD.

## V2-R6 follow-up — sanitized inventory workflow proposal (2026-11-04)

Merged PR #120 removed `actions/upload-artifact` from `.github/workflows/historical-path-inventory.yml`. The workflow still calculates historical filename inventories on an ephemeral runner, but exposes **only aggregate counts** in the job log and GitHub Step Summary; raw historical paths are deleted from the runner after the job. The workflow was subsequently manually run by the owner; see the owner-reported counts below.

**Limitations:** Aggregate counts cannot establish that historical filenames or blobs are safe. The repository is already public; removing future artifact uploads does not revoke any previously published artifact or Git object. Previously published workflow artifacts, if any, require a separate review. The script scans reachable fetched refs, not unreachable objects, and neither it nor the earlier regex scanner constitutes a full secrets/privacy review. No Gitleaks result, rights clearance, or release gate is upgraded to PASS by this documentation change.

**Next private checks (not executed):** Review Actions artifacts and their retention, GitHub secret scanning/Dependabot alerts, all reachable historical text/binary objects with a pinned history-aware scanner, commit metadata and embedded media metadata; preserve redacted evidence only. If an actual credential is discovered, rotate/revoke it rather than relying on deleting a branch or file. Do not publish raw sensitive findings.

## V2-R6 status update — 2026-11-04 (owner-reported, not independently reproduced)

- PR #120 merged. Owner manually ran historical path inventory: **354** distinct historical paths, **198** currently tracked, **156** historical-only and **6** filename-pattern candidates. Counts are not content findings; six candidates require private review.
- Owner enabled Dependabot alerts, secret-scanning alerts, and private vulnerability reporting (reported; GitHub settings not independently inspected by this audit).
- CodeQL JavaScript scan completed successfully with one `js/file-system-race` warning. PR #123 merged a same-descriptor checkpoint load fix and regression tests. Owner reports the alert closed and **0 open CodeQL alerts**; the owner also reports **0 Dependabot alerts**. Secret-scanning alert count is **not yet confirmed**.
- PR #122 upgraded CodeQL Action to v4. Its post-upgrade scan outcome is not independently documented here.
- The initial inventory summary still said "downloadable path lists" despite removal of uploads; a follow-up PR corrects that message. No raw historical path inventory was shared in this report.

### Owner-only private candidate review

On a trusted local clone, fetch all relevant remote branches and tags and run `bash scripts/security/historical-path-inventory.sh`. **Do not publish** `audit-output/` or paste its filenames, blob contents, credentials, or personal information into issues or chat. Inspect the six `audit-output/review-candidates.txt` entries privately, including whether any are old media, harmless test fixtures, or potentially sensitive material. Record only counts by classification and whether remediation is needed. Delete the local `audit-output/` directory afterward. This check covers fetched reachable refs, not deleted/unreachable objects or forks.

If a credential is identified, revoke/rotate it immediately; public Git history rewriting requires a separate risk assessment. Existing public Actions artifacts and media metadata remain separately unverified. **No full security clearance is claimed.**

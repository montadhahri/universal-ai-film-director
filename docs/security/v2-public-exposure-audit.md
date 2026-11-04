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

## V2-R6 owner attestation update — 2026-11-04

The repository owner reports that GitHub secret scanning currently shows **zero open alerts** and that **all six** historical filename-pattern candidates were reviewed with **no sensitive findings identified**. These are **owner-reported results**, not independent reproduction or an exhaustive scan. The previous pending statements above are retained as historical snapshots and superseded only for these two checks.

The owner previously reported zero open CodeQL and Dependabot alerts. The older historical credential-pattern scan covered 569 text blobs and skipped 7 binary/large blobs. A filename review does not establish that all historical blob contents, commit metadata, binary media, or previously published Actions artifacts are free of sensitive material.

**Remaining V2-R6 evidence gates:** (1) history-aware scan across fetched reachable refs with documented scope and redacted findings; (2) review of the 7 previously skipped binary/large blobs and relevant media metadata; (3) review of commit author/message metadata and prior public Actions artifacts; (4) verify CodeQL v4 run and current alert state at the release candidate commit. These should be performed with privacy-preserving, aggregate reporting and no raw sensitive paths or values in public logs or artifacts. If evidence is unavailable, mark the gate NOT_VERIFIED rather than PASS.

**Status: PARTIAL / HOLD.** V2 release and Production GO remain HOLD. Media redistribution rights are tracked separately under V2-R7.

## V2-R6 manually dispatched history scan — owner attestation (2026-11-04)

The repository owner reports the updated Historical secret scan completed **green on main** after PR #126. This is owner-reported run outcome, not independently retrieved job evidence. The script performs pattern-based scanning of fetched reachable refs; binary or oversized blobs are skipped. This does **not** prove exhaustive secret, privacy, or media-rights clearance.

A follow-up aggregate-only metadata/binary workflow is proposed to quantify remaining reachable binary/large blobs and commit metadata surfaces without emitting paths, authors, object IDs or contents. Its result is inventory-only, not an automated PASS. Prior Actions artifacts must still be evaluated separately through GitHub settings or API.

**Status remains PARTIAL / HOLD.**

## V2-R6 metadata/binary workflow results — owner-supplied, 2026-11-04

The owner supplied the aggregate JSON result from the manually dispatched `history-metadata-inventory.yml` job on `main` (the job was also shown green). **Source: owner-supplied output; not independently reproduced against the GitHub run log.**

| Inventory metric | Value |
| --- | ---: |
| Git objects examined | 2,142 |
| Unique blobs | 634 |
| Text blobs | 627 |
| Binary or oversized blobs | **7** |
| Oversized blobs (>2 MiB) | 5 |
| NUL-containing blobs | 2 |
| Unreadable blobs | **0** |
| Total binary or oversized bytes | 27,381,953 |
| Commits | 427 |
| Commits with non-noreply author email | **5** |
| Commits with non-noreply committer email | **5** |
| Commit-message credential-pattern hits | **0** |

**Interpretation:** The seven binary/large blobs were *counted*, not inspected or cleared. The counts for commits containing author and committer emails may overlap; they do not establish ten unique commits or ten unique addresses. Public Git commit metadata is inherently visible; the owner must privately confirm whether those email addresses are intended for public attribution. Zero pattern hits is not proof of clean content, and text blobs were classified, not necessarily comprehensively screened by this inventory job.

### Outstanding owner verification / release gates

1. **Seven binary or large historical blobs:** Inspect file format, privacy-sensitive metadata and potentially confidential content using privacy-preserving methods; record only counts and redacted conclusions. Media redistribution and soundtrack licensing remain V2-R7, not implied by this check.
2. **Git commit identity metadata:** Privately verify that author and committer emails exposed in the five flagged commits are acceptable for this public repository. Do not print actual addresses in public Actions output or PRs. If unacceptable, plan remediation carefully; rewriting history cannot erase forks/clones and is not automatically warranted.
3. **Actions history/artifacts:** Confirm no earlier published artifacts, logs or attachments contained unintended confidential filenames, credentials or private files, including artifacts published before PR #120 removed uploads. Check retention and accessibility rather than inferring safety from current workflow code.
4. **Coverage:** Scan covered fetched reachable refs, not unreachable objects, external forks or all possible sensitive data patterns. Formal history-wide privacy clearance remains NOT_VERIFIED.

**Disposition: V2-R6 remains PARTIAL / HOLD. No evidence supports claiming a complete security PASS, V2 release approval or Production GO.**

## V2-R6 privacy decision and audit-tool cleanup — 2026-11-04

**Owner decision:** Non-noreply commit email addresses should be treated as **private**. The aggregate audit reported five commits with non-noreply author emails and five commits with non-noreply committer emails (possibly overlapping). The exact addresses and identities have **not** been verified independently. Historic metadata remains publicly visible; enabling GitHub email privacy and push protection only protects future activity. **Do not interpret these settings as historical remediation.** History rewriting or replacing the repository requires an impact assessment of tags, signatures, public forks/clones, PR references and published history. No rewrite is authorized or performed here. Historical email privacy is **OPEN / NOT_REMEDIATED**.

**Binary triage (owner-supplied workflow result):** Of seven historical binary/oversized blobs, five were PNG, one ISO-BMFF/MP4, and one ZIP. All were readable and signature-classified, but the ZIP contents and all media privacy/provenance remain **NOT_VERIFIED**. File format does not establish clearance.

**Actions artifacts:** No artifacts were found on two individually inspected previous workflow runs. This does **not** represent a comprehensive historical artifact audit; older artifacts and logs may remain accessible and have not been cleared.

**Cleanup proposal:** Remove the three manually dispatched, one-time inventory workflows and their companion scripts after owner-supplied counts were recorded above. Retain recurring CodeQL and secret scanning checks. Removing audit utilities from current main does not erase their historical commits, published logs or Git history, and does not close remaining privacy gates.

**Release gates:** (1) plan and, if appropriate, authorize remediation for historic commit email exposure; (2) privately inspect ZIP contents/provenance and assess binary media metadata; (3) inspect historical Actions artifacts/logs; (4) separately clear V2-R7 media redistribution rights. V2 release and Production GO remain **HOLD**. This change makes **no** claim of V2-R6 PASS.

## V2-R6 owner decision superseding prior email-remediation request — 2026-11-04

The repository owner explicitly **accepts the existing non-`noreply` Git commit email addresses as public** and has withdrawn the request to rewrite the Git history. The prior "private / NOT_REMEDIATED" entry above is a historical snapshot and is superseded for release planning. **Historical email privacy is now an ACCEPTED OWNER DECISION, not a V2-R6 release blocker.** This is not a finding that the email addresses were independently inspected or made private. No Git refs, branches, tags, commit metadata, or existing history have been modified.

### Reconciled remaining checks

- Historical binary triage (owner-supplied output): **5 PNG, 1 MP4/ISO BMFF, 1 ZIP; 0 unreadable**. This establishes formats, not safe contents, identity or licenses. The ZIP payload and embedded metadata remain **NOT_VERIFIED**. Do not publicly extract or print ZIP member names or embedded content.
- Historical Actions artifacts: two individually checked run IDs (**41896412864**, **41901190091**) returned zero artifacts. This is **not** an exhaustive review of older Actions artifacts or logs, nor does it prove that expired/deleted public artifacts were never exposed.
- The historical secret scan passed on PR #126, and the owner reports a green manual run on `main`; exact main-run aggregate counts are not independently preserved in this update. The scan skips binary/oversized content and is pattern-limited.
- One-time inventory tooling was removed in PR #130 after aggregation. Existing security CI and evidence remain.
- **V2-R6 disposition: PARTIAL / HOLD.** Before PASS, review the ZIP in a trusted environment without leaking members/contents, evaluate potential media metadata and confidential content, and assess the available older Actions artifact/log history with explicit scope and limitations. Do not add audit tooling solely to increase apparent coverage.
- **V2-R7 remains separate:** media provenance, soundtrack and public redistribution rights of PNG/MP4 remain unverified. V2 release and Production GO remain HOLD.

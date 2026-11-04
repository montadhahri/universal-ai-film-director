# V2 security and public-exposure audit

**Current status (2026-11-04): PARTIAL — V2.0.0 release HOLD; Production GO HOLD.** The repository is public. This is the canonical current security summary, not certification of all historic data or media rights. Dated reports and superseded decisions remain in Git history.

## Evidence and decisions

| Area | Evidence | Current disposition |
| --- | --- | --- |
| CodeQL | PR #123 corrected a reported filesystem race; owner reports zero open alerts. Relevant PR checks passed. | No known open finding; recheck for release |
| Dependabot and GitHub secret scanning | Owner reports zero open alerts in each | No known open findings; not an exhaustive privacy assessment |
| Historical credential-pattern scanner | PR #126 passed; owner reported green manual run on `main`. Earlier run: 569 text blobs checked, zero matches, seven binary/large blobs skipped. | Pattern-limited; no full-history clearance |
| Historical paths | 354 distinct historical paths; six name-pattern candidates reviewed by owner with no sensitive finding reported | Owner attestation; filenames alone cannot clear content |
| Git inventory | 2,142 reachable objects; 634 blobs (627 classified text, seven binary/large); 427 commits; zero unreadable blobs and zero detected commit-message credential-pattern hits | Aggregate inventory, not contents review |
| Seven historical binary/large blobs | Five PNG, one MP4/ISO BMFF, one ZIP; all readable; zero unknown formats | Formats identified; ZIP contents and media metadata **not verified** |
| Commit emails | Five commits with non-`noreply` author emails; five with non-`noreply` committer emails (possibly overlapping) | **Owner accepts public visibility; no history rewrite and no release blocker** |
| Prior Actions artifacts | Two selected workflow runs, 41896412864 and 41901190091, returned no artifacts | Other historical runs, logs and artifacts **not fully checked** |

The counts above come from owner-supplied GitHub Actions output unless otherwise stated. The results do not establish absence of secrets or confidential material in Git history. The GitHub scanner covers fetched reachable refs, not unreachable objects, forks or all possible credentials.

## Remaining V2-R6 items

1. **Historical ZIP:** Privately inspect member types and contents and determine whether it includes sensitive data. Do not upload or print raw archive member names/content to public logs or issues.
2. **Image/video privacy:** Check embedded metadata and identifying/confidential content in the historical PNG/MP4. Redistribution and music rights are separately tracked in [V2 media-rights review](v2-media-release-rights.md).
3. **Historical Actions:** Review available older artifacts and relevant logs, including material published before PR #120 removed raw inventory uploads. Two empty runs do not prove all-run clearance.
4. **Release candidate:** Recheck security alerts, CI, scope and evidence on the exact release commit.

**Decision:** V2-R6 remains **PARTIAL / HOLD** until the remaining evidence is reviewed or any residual risks are explicitly scoped and accepted. V2-R7 media rights is a separate unresolved gate. No release or provider job is authorized.

## Repository hygiene

One-time inventory workflows/scripts were removed by PR #130; regular security checks remain. The owner explicitly withdrew an earlier email privacy/remediation request and accepts public historical email metadata. No Git history rewrite is planned.

Maintain this single summary rather than appending dated reports for each audit step. Preserve significant PR/run references and use Git history for earlier investigations. See [V2 release checklist](../releases/v2.0.0-checklist.md) for release decisions and [ROADMAP](../ROADMAP.md) for product priorities.

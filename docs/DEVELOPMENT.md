# Development and release governance

**Active workflow (owner decision, 2026-11-04):** `main` is the **only permanent branch**. Changes are made on short-lived branches and proposed to `main` through pull requests. The former `develop`/GitFlow migration plan was canceled. GitHub ruleset enforcement has **not** been independently verified.

## Branch and PR workflow

1. Start a scoped temporary branch from current `main`, using `feature/*`, `fix/*`, `docs/*`, `security/*`, `test/*` or `chore/*`.
2. Make focused changes and open a PR targeting **`main`**. Include motivation, affected files, reproducible tests and any evidence limitations.
3. Review CI, security/privacy implications, compatibility and approvals before merging. Never claim a green check that was not observed.
4. Merge only after explicit owner approval. Delete the temporary head branch **after verifying the merge**. Do not delete `main`.
5. For a release, select an exact reviewed `main` commit, verify the release checklist and all gates, then create an immutable `vX.Y.Z` tag and GitHub release **only with separate explicit owner authorization**.
6. For a hotfix, create `fix/*` from `main`, review and merge by PR; approve any patch release separately. No permanent release/hotfix branches are required.

## Important release-state distinction

`main` contains unreleased V2 development. It is the **integration/default branch**, not a claim that its HEAD is a published stable V2 release. The latest published release remains `v1.0.0`. Never rewrite `main` history or move existing tags to make branch labels appear consistent.

## Branch safety and repository settings

- Keep `main` as the default branch. Prefer PR-based changes, no force-pushes, and deletion protection for `main`.
- Verify the actual GitHub rulesets/branch protections and required checks before claiming enforcement; plan limitations may apply.
- GitHub's **Automatically delete head branches** setting is optional. Enable it only after checking protection and confirming it suits the one-permanent-branch workflow; this document does not enable it.
- As of the owner's cleanup on 2026-11-04, only `main` remained. Creating a temporary branch for a PR is expected; delete it after merge.
- Deleted historical branch refs must not be recreated as active plans. Merged PRs and existing tags remain separate historical references; do not assume unique unmerged commits were preserved.

## Evidence and approvals

[ROADMAP.md](ROADMAP.md) is the canonical product/version roadmap. [V2 release checklist](releases/v2.0.0-checklist.md), CI, case studies and historical audits provide supporting evidence, not competing roadmaps.

Keep distinct approvals for code merges, version releases, creative decisions, account/provider access, paid execution and media publication. **Production GO remains HOLD** until separately authorized.

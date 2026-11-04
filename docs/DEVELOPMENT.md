# Development and release governance

**Status: PROPOSED migration policy.** This document describes the target workflow; it does not claim GitHub rulesets, branches, or settings are already configured. Until migration is approved and verified, existing PR and release safeguards apply.

## Branch model — simplified GitFlow

| Branch | Purpose | Lifecycle |
| --- | --- | --- |
| `main` | Latest **published stable release** after migration | Permanent, deletion restricted |
| `develop` | Integration for the next planned release | Permanent, deletion restricted |
| `feature/*`, `fix/*`, `docs/*`, `security/*`, `test/*` | One scoped change, PR into `develop` after migration | Delete after verified merge |
| `release/x.y.z` | Stabilize an exact release candidate from `develop` | Temporary; restrict changes to QA, documentation and release fixes |
| `hotfix/*` | Urgent correction to a released version, branched from `main` | Merge to `main` and backport to `develop`; delete when reconciled |
| `vX.Y.Z` tag | Immutable published release reference | Never move or reuse |

**Migration caveat:** Current `main` contains unreleased V2 development. Do not rewrite, reset, force-push, or represent it as V1. Preserve historical `v1.0.0` and all merged PR evidence. Before establishing stable-only `main`, audit refs and pending work, choose and validate a release candidate, and obtain owner approval. No release is authorized by this document.

## PR and release lifecycle

1. Open a short-lived work branch from `develop` once migration is complete. Require a scoped PR, CI, review and clear evidence; never push directly to protected branches.
2. For a release, cut `release/x.y.z` **from** `develop` (do not use a PR with `develop` as the head just to create the release branch). Freeze new features; resolve fixes on the release branch and reconcile them into `develop`.
3. Verify security/privacy, media rights, documentation, compatibility, test evidence and exact release SHA. A passing CI run alone is not release approval.
4. After explicit owner approval, merge the release branch into `main`, create immutable `vX.Y.Z` tag on the approved commit, and publish the GitHub release. Reconcile release fixes into `develop`.
5. Delete temporary release branches only when merges/backports and tags are verified. Preserve historical evidence and the tag.
6. For a hotfix, branch from released `main`, test, merge to `main`, tag a patch release with approval, and backport to `develop` (and active release branches as needed).

Use semantic versioning (MAJOR.MINOR.PATCH). Document compatibility expectations for skill interfaces, schemas, scripts and workflows. Do not silently change published tags.

## Protection and automatic branch cleanup

**Order matters:** first create and protect `develop`, restrict deletion of `main` and `develop`, validate PR/CI rules, **then** consider GitHub Settings → General → Pull Requests → Automatically delete head branches.

GitHub's automatic head-branch deletion is not limited to `feature/*`; it can target the head of a merged PR. Do not rely on naming conventions alone to protect `develop`. Verify rulesets actually enforce deletion restrictions with the available repository plan and permissions before enabling auto-delete.

Inventory existing branches and open PRs before any cleanup. Categorize: merged and disposable; active; unmerged with unique commits; release/maintenance; unknown. Preserve any branch with unique or uncertain work until reviewed. Deletion is a separate, explicitly approved action. Deleting a fully merged head branch does not remove its merged PR or published tags.

## Release evidence and approvals

`docs/ROADMAP.md` is the single canonical product/version roadmap. `docs/v2-release-preflight.md`, case studies, CI, PRs and issue milestones are supporting release evidence, **not parallel roadmaps**. The former `docs/PROJECT_STATUS.md` snapshot is preserved in Git history; do not recreate a second live milestone queue.

Keep separate approvals for code release, creative assets, provider/account access, paid execution and media publication. **Production GO: HOLD** remains in force until independently changed by the owner.

## Governance migration checklist (not executed)

- [ ] Audit all roadmap/status files and branch refs; preserve historical evidence.
- [ ] Approve the canonical roadmap and development policy PR.
- [ ] Plan and approve safe migration from V2-containing `main` to stable-only `main` and permanent `develop`.
- [ ] Create `develop` and verify deletion protection for both permanent branches.
- [ ] Verify required CI and PR review rules on protected branches.
- [ ] Enable auto-delete of merged head branches only after protection is tested.
- [ ] Audit legacy branches for unique commits and open PRs; separately approve cleanup.
- [ ] Verify release and hotfix procedures on a non-production dry run.

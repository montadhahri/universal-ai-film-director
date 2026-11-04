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

`main` is the **integration/default branch** for ongoing V2.1 work; the latest published stable release is `v2.0.0`, preserved at immutable tag commit `93c34e2e41351bf3411a330a8515481756f83ebd`. Do not rewrite `main` history or move published tags for later documentation changes.

## Branch safety and repository settings

- Keep `main` as the default branch. Prefer PR-based changes, no force-pushes, and deletion protection for `main`.
- Verify the actual GitHub rulesets/branch protections and required checks before claiming enforcement; plan limitations may apply.
- GitHub's **Automatically delete head branches** setting is optional. Enable it only after checking protection and confirming it suits the one-permanent-branch workflow; this document does not enable it.
- As of the owner's cleanup on 2026-11-04, only `main` remained. Creating a temporary branch for a PR is expected; delete it after merge.
- Deleted historical branch refs must not be recreated as active plans. Merged PRs and existing tags remain separate historical references; do not assume unique unmerged commits were preserved.

## Evidence and approvals

[ROADMAP.md](ROADMAP.md) is the canonical product/version roadmap. [V2 release checklist](releases/v2.0.0-checklist.md), CI, case studies and historical audits provide supporting evidence, not competing roadmaps.

Keep distinct approvals for code merges, version releases, creative decisions, account/provider access, paid execution and media publication. **Production GO remains HOLD** until separately authorized.

## Documentation scope and anti-proliferation rule

**Apply this rule only to operational/administrative documentation** (security and privacy audits, release readiness notes, one-off investigations, CI summaries, maintenance and process reports). **It does not restrict Agent Skills, `SKILL.md` files or their references, core architecture/design and technical specifications, schemas, tests, benchmark evidence, creative bibles, storyboards, or film case-study/source evidence.** Preserve the completeness and traceability those core assets require.

- **Update an existing canonical document first.** For version direction use `docs/ROADMAP.md`; for active V2 release gates use `docs/releases/v2.0.0-checklist.md`; for security audit findings use `docs/security/v2-public-exposure-audit.md`; for media rights use `docs/security/v2-media-release-rights.md`. Avoid parallel living status reports.
- **New administrative docs require a demonstrated need:** legally/operationally distinct audience, a required handoff or independent lasting reference that cannot fit clearly in an existing document. Default to a concise section in the canonical file, or a PR description for temporary results.
- **Do not create one report per PR, scan, check, incident step or conversation.** Consolidate results by topic and replace superseded live summaries rather than appending repeating chronological narratives indefinitely. Keep important evidence references (PR/run links, scope, outcomes, unresolved gates) and retain Git history for change provenance.
- **Prefer actionable brevity:** current decision, evidence/source, unresolved risk, owner/next action. Archive or delete redundant administrative files only after checking inbound links and preserving required evidence; never delete core skill, test or creative artifacts under this rule.
- **No new permanent audit workflow or script solely to generate more documentation.** Use existing CI and GitHub evidence where practical; justify any lasting tooling independently.

During PR review, ask: *Can this administrative change update an existing canonical source instead of creating another document?* If yes, do that.

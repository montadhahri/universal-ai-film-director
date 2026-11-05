# Development and release governance

**Active workflow (owner decision, 2026-11-05):** `main` and `develop` are the two permanent branches. `main` is the integration branch for V2.x; `develop` is for future V3 research and development. All changes require reviewable pull requests. GitHub ruleset enforcement has **not** been independently verified.

## Branch and PR workflow

1. For V2.x changes, create a short-lived `feature/*`, `fix/*`, `docs/*`, `test/*` or `chore/*` branch from current `main`, and open a PR targeting **`main`**.
2. For V3 research and development, create a short-lived `feature/v3-*`, `research/v3-*`, `fix/v3-*` or similar branch from current `develop`, and open a PR targeting **`develop`**. Do not open V3 feature PRs targeting `main`.
3. When a PR is merged into `main`, the sync workflow **proposes** a PR from `main` to `develop` (or updates the existing one). It must **never auto-merge** or force-push. The owner reviews and approves synchronization; resolve conflicts explicitly. If GitHub Actions cannot create PRs due to repository settings, the workflow reports the limitation and a manual PR is required.
4. Do **not** automatically synchronize `develop` into `main`. V3 promotion to `main` requires separate explicit authorization and a reviewed release plan.
5. Review CI, security/privacy implications, compatibility, tests and approval gates before merging. Never claim a check passed without observed evidence. Merge only after explicit owner approval. Delete short-lived branches after verified merge; preserve both permanent branches.
6. Releases require exact reviewed commits, all release gates and separate explicit authorization for tags and GitHub releases. No production or provider spending is authorized by a code merge.

## Important release-state distinction

`main` is the **integration/default branch** for ongoing V2.1 work; the latest published stable release is `v2.0.0`, preserved at immutable tag commit `93c34e2e41351bf3411a330a8515481756f83ebd`. Do not rewrite `main` history or move published tags for later documentation changes. The V3 prototype is preserved on `develop` and must not be promoted into V2.x by synchronization.

## Branch safety and repository settings

- Keep `main` as the default branch. Prefer PR-based changes, no force-pushes, and deletion protection for both `main` and `develop`.
- Verify the actual GitHub rulesets/branch protections and required checks before claiming enforcement; plan limitations may apply.
- GitHub's **Automatically delete head branches** setting is optional. Do not delete either permanent branch; this document does not enable the setting.
- Historical branch cleanup on 2026-11-04 left `main`; the owner created `develop` on 2026-11-05 for V3. Create temporary branches for PRs and delete them after verified merge.
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

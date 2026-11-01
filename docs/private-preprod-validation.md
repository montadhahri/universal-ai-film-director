# Private pre-production validation (NO PROD GO)

**Repository visibility:** PRIVATE. **Release status:** HOLD.
This process does not publish packages, create tags, enable public access, or
grant production authorization. The repository owner decides when to release.

## 1. Automated checks on private GitHub Actions

The existing `validate.yml` runs preservation, repository structure, regression
unittests and synthetic behavior fixtures on pushes and pull requests. The
additional pre-production workflow runs an offline, stdlib-only validation
runner and uploads a machine-readable report as a private Actions artifact.
All checks are scoped to this repository. **No third-party API keys required.**

To run locally from a private checkout:

```bash
python3 tests/preprod/run_validation.py --out build/preprod-validation.json
```

The runner checks syntax, repository links, protected paths, regression
unittests and synthetic behavior fixtures. An overall PASS means **offline
repository checks passed**, not that a real agent or video model was tested.

## 2. Private installation smoke test (owner-operated)

Do **not** make the repository public. Use a machine with Node.js/npm and
GitHub credentials that can read this private repository.

```bash
gh auth status
npx skills add montadhahri/universal-ai-film-director --list
npx skills add montadhahri/universal-ai-film-director -g
```

Choose a supported agent when prompted. Confirm the skill is discoverable and
that its referenced files load. Record agent name/version, operating system,
CLI version, time, command exit status and any error **without copying tokens
or private asset contents into logs**.

If CLI private-repository access fails, check Git/SSH authentication first,
then use the manual installation fallback. Do not interpret failure as a
reason to change repository visibility.

## 3. Real-agent acceptance (owner-operated)

Use `tests/integration/README.md` scenarios with a real installed agent.
Store sanitized results using
`tests/integration/real-agent-result.template.json`. Mark each scenario
PASS, FAIL or NOT_RUN, and record exact environment and evidence reference.
Never label synthetic fixtures as real-agent results.

Do not run untrusted PR code with elevated GitHub tokens or production
secrets. Do not put personal film media or private prompts in public logs.

## 4. Release decision gates

- Offline CI checks: evidence required.
- Private installation smoke test: evidence required.
- At least one real-agent workflow test: evidence required; other agents must
  remain explicitly unverified if not tested.
- Video-generation and audio-quality claims: real media evidence required.
- Privacy, licensing, owner review and release notes: explicit sign-off.
- Production GO: **NOT AUTHORIZED**. A separate decision and PR are required.

See [release checklist](release-checklist.md). Keep release and deployment
steps manual and gated.

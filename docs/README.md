# Documentation index

The **seven installable Agent Skills** live in [`../skills/`](../skills/universal-ai-film-director/SKILL.md). Repository-level `docs/`, `tests/`, `contracts/` and root `scripts/` are development resources, **not installed as part of an individual skill**. Each skill includes only its own `SKILL.md`, references, assets and optional bundled runtime.

## Current product documentation

| Need | Canonical source |
| --- | --- |
| Install and first-film walkthrough | [Installation](installation.md) |
| Architecture and responsibility boundaries | [Architecture](architecture.md) |
| Version direction and outstanding acceptance | [Roadmap](ROADMAP.md) |
| PR, branches, releases and documentation policy | [Development](DEVELOPMENT.md) |
| Security disclosure | [Security policy](../SECURITY.md) |
| Contribute | [Contributing](../CONTRIBUTING.md) |

The [root README](../README.md) is the public product entry point. [CHANGELOG](../CHANGELOG.md) records releases. **Do not maintain another live version roadmap or status document.**

## Supporting evidence — not additional active roadmaps

- [The Last Light case study](case-studies/the-last-light/README.md): creative evidence, image provenance, media terms, approval and QA records. Its [case-study roadmap](case-studies/the-last-light/roadmap.md) is a historical experiment ledger, **not** the product roadmap.
- [Historical V2.0–V2.3 release gates](archive/releases/v2.0.0-checklist.md) and [V2.5 candidate evidence](archive/releases/v2.5.0-candidate.md): retained release evidence, not instructions for the next release.
- [Public exposure audit](security/v2-public-exposure-audit.md), [media rights evidence](security/v2-media-release-rights.md) and [historical provider-terms review](archive/v2/v2-ai-media-terms-review.md): security/rights traceability, not legal clearance.
- [Benchmark results](quality-benchmark-results.md) and specialist evaluation notes: historical quality evidence; deterministic tests and owner sessions do not prove independent agent acceptance.

**Documentation maintenance:** Keep current guidance in the six canonical entry points above. Prefer improving existing pages over adding one-off reports. Preserve distinct skill references, core contracts, tests, rights evidence and creative case-study assets. Archive or consolidate administrative reports only after checking inbound links and regression dependencies.

**Current status:** V2.5.0 is the latest owner-confirmed limited software release. See [the roadmap](ROADMAP.md) for verification limits. The Last Light Production GO remains HOLD. Neither a software release nor a Studio UI grants provider execution or publication permission.

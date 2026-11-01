# Contributing
Open an issue describing the problem and affected phase. Make focused changes with reproducible examples. Keep core instructions provider-neutral; put generator-specific details in adapters. Do not submit private personal data, copyrighted media or unauthorized voice clones. Update documentation and examples with behavior changes. Explain trade-offs in pull requests.

## Branch, review and changelog policy

- Work on a dedicated branch based on the latest `main`; do not push directly
  to `main`.
- Open a Pull Request and wait for the repository owner's explicit approval
  before merging.
- Preserve existing skill files, adapters, templates, examples and behavior.
  Any deletion or incompatible change requires explicit owner authorization.
- Update [CHANGELOG.md](CHANGELOG.md) in the **same PR** for every change,
  including documentation, tests, bug fixes and features. Use the
  `[Unreleased]` section and the appropriate Added, Changed, Fixed,
  Deprecated, Removed or Security subsection.
- When a roadmap phase merges, update [the roadmap](docs/ROADMAP.md) status
  and link its PR. Avoid marking planned work complete.
- Include the affected files, verified test results, any tests not run, and
  known limitations in the PR description.
- Releases and version tags require explicit owner approval; use SemVer
  for release numbering and move entries from Unreleased to the dated version.

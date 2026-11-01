# Development roadmap

Current architecture: one Director + six specialist skills.
Major versions are tracked by Git tags and changelog entries, **not folders**.
The private [v1.0.0 release](https://github.com/montadhahri/universal-ai-film-director/releases/tag/v1.0.0) is available for historical inspection; the working tree carries only the current implementation.

| Milestone | Status |
| --- | --- |
| v1.0.0 private release | Published; historical |
| V2-00 portable architecture RFC | Approved / merged (PR #27) |
| V2-01 canonical Project Bible and proposal contracts | Initial implementation merged (PR #28); explicit Director authority and checkpoint contracts merged (PR #32); real host evidence still pending |
| V2-02 clean, portable Director and six specialist skills | Modular skills merged (PR #29); user documentation and worked examples merged (PRs #30–31); real-agent evaluation pending |
| V2-03 optional multi-agent delegation and cross-host acceptance | 14-case acceptance harness in PR #33; real-agent runs and cross-host verification NOT_RUN |
| V2-04 provider integration with explicit permissions | Not started |
| V2-05 real-media inspection and localized repair | Not started |
| V2-06 independent end-to-end 30-second film demonstration | BLOCKED until real generation tools are authorized and available |
| V2-07 security, quality and v2.0.0 release review | Not started |

## Quality expectations

Use the official Codex skill-creator guidance for authoring and evaluation,
but keep generated skills portable. Verify valid frontmatter, accurate
trigger descriptions, on-demand local references, safe project handoffs,
negative approval/lock cases, and generator access honesty.

Compare behavior of the current Director with independent agent runs as
access allows. Synthetic transcript fixtures do not establish real-agent
or video-generation acceptance. No public launch or PROD GO is authorized.

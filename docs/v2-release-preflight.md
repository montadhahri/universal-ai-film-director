# V2 public release preflight

**Status: RELEASE CANDIDATE PREPARATION — NOT A RELEASE AUTHORIZATION.**

## V2.0.0 scope (already implemented, subject to verification)

- Seven portable Agent Skills: Director plus Storytelling, Visual Direction, Cinematography, Video Production, Sound Direction and Continuity QA.
- Planning-only creative workflow, explicit separate screenplay/Visual Bible/storyboard gates, locked-shot revision controls and provider authorization boundaries.
- Deterministic offline pipeline validation, checkpoint serialization and fresh-process recovery.
- Automated regression tests and Codex-target local Skills CLI installation smoke test.
- [The Last Light](case-studies/the-last-light/README.md): human-operated five-shot V9 film screening candidate, not autonomous seven-agent execution or final creative approval.

## V2.0.0 release blockers

- [ ] **Public history and secret review:** inspect all branches/tags/history and historical files for tokens, credentials, private data and proprietary material. GitHub visibility change exposes history; do not assume deleted files are safe.
- [ ] **Rights review:** confirm redistribution rights for film, soundtrack, images, voices, third-party assets, prompts and referenced trademarks. Keep unverified media unpublished until cleared.
- [ ] **Public installation:** from a clean environment without private credentials, install the public repository via the documented Skills CLI command; preserve actual output and version.
- [ ] **Docs consistency:** update README version badges, installation private-repo notice, changelog and release notes after choosing the exact RC commit.
- [ ] **Release checks:** CI green on the intended tag commit, license/attribution/security review, documented limitations, no unsupported claims of autonomous execution.
- [ ] **Owner approval:** explicitly approve public visibility, RC publication and stable promotion separately. Production GO for provider jobs and film publication remains HOLD.

## V2.1.0 candidates (not blockers for a labeled V2.0 RC)

- Independent real-agent `/skill-name` discovery and invocation on two hosts; specialist delegation and complete text-only multi-agent handoff captures.
- Cross-host checkpoint transfer, authenticated approval provenance, external asset verification and stronger crash guarantees.
- Independently observed continuity repair and regression review on real media.
- More robust provider-neutral media adapters and media QA, subject to explicit authorization.

## Later / exploratory

- Provider automation, real end-to-end seven-agent generation and verified autonomous delivery.
- Broader creative benchmarking, additional providers, richer editorial tooling.

## Evidence distinctions

**PASS in local installation CI** does not mean a public GitHub remote install or interactive host invocation passed. **PASS in deterministic pipeline tests** does not mean independent agents were executed. **A committed V9 MP4** does not mean the film has final QA or release permission. No new paid jobs or external account connections are authorized by this plan.

## GitHub tracking

Use GitHub Milestones (`v2.0.0`, `v2.1.0`) for issue-based release progress and GitHub Projects for board/table/roadmap views when configured. Keep `docs/ROADMAP.md` as versioned design rationale and historical acceptance evidence; link to live tracking rather than duplicate every task.

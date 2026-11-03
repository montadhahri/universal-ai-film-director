# V2 public release preflight

**Status: REPOSITORY PUBLIC — V2.0.0 NOT RELEASED OR AUTHORIZED.** Public visibility was confirmed on 2026-11-03. The owner supplied a screenshot of a successful manually triggered Gitleaks workflow on `main`; this does not independently establish complete privacy or media-rights clearance.

## V2.0.0 scope (already implemented, subject to verification)

- Seven portable Agent Skills: Director plus Storytelling, Visual Direction, Cinematography, Video Production, Sound Direction and Continuity QA.
- Planning-only creative workflow, explicit separate screenplay/Visual Bible/storyboard gates, locked-shot revision controls and provider authorization boundaries.
- Deterministic offline pipeline validation, checkpoint serialization and fresh-process recovery.
- Automated regression tests and Codex-target local and public-GitHub Skills CLI installation smoke tests (PR #110; passing PR-head workflow run #38).
- [The Last Light](case-studies/the-last-light/README.md): human-operated five-shot V9 film screening candidate, not autonomous seven-agent execution or final creative approval.

## V2.0.0 release blockers

- [ ] **Public history and secret review (partially evidenced: Gitleaks PASS):** inspect all branches/tags/history and historical files for tokens, credentials, private data and proprietary material. GitHub visibility change exposes history; do not assume deleted files are safe.
- [ ] **Rights review:** confirm redistribution rights for film, soundtrack, images, voices, third-party assets, prompts and referenced trademarks. Keep unverified media unpublished until cleared.
- [x] **Public installation (CI scope):** PR #110 workflow run #38 passed a clean-HOME, noninteractive GitHub-source install of all seven skills using pinned `skills@1.7.4` on GitHub Actions; step verified installed payloads against source. This is not a separate-host interactive invocation test.
- [ ] **Docs consistency:** update README version badges, installation private-repo notice, changelog and release notes after choosing the exact RC commit.
- [ ] **Release checks:** CI green on the intended tag commit, license/attribution/security review, documented limitations, no unsupported claims of autonomous execution.
- [ ] **Owner approval:** public repository visibility is approved and completed; RC publication and stable promotion still require separate explicit approval. Production GO for provider jobs and film publication remains HOLD.

## V2.1.0 candidates (not blockers for a labeled V2.0 RC)

- Independent real-agent `/skill-name` discovery and invocation on two hosts; specialist delegation and complete text-only multi-agent handoff captures.
- Cross-host checkpoint transfer, authenticated approval provenance, external asset verification and stronger crash guarantees.
- Independently observed continuity repair and regression review on real media.
- More robust provider-neutral media adapters and media QA, subject to explicit authorization.

## Later / exploratory

- Provider automation, real end-to-end seven-agent generation and verified autonomous delivery.
- Broader creative benchmarking, additional providers, richer editorial tooling.

## Evidence distinctions

**PASS in local installation CI** alone does not prove public GitHub installation. PR #110 separately tested the public GitHub install in CI, but neither test proves interactive host invocation. **PASS in deterministic pipeline tests** does not mean independent agents were executed. **A committed V9 MP4** does not mean the film has final QA or release permission. No new paid jobs or external account connections are authorized by this plan.

## GitHub tracking

Use GitHub Milestones (`v2.0.0`, `v2.1.0`) for issue-based release progress and GitHub Projects for board/table/roadmap views when configured. Keep `docs/ROADMAP.md` as versioned design rationale and historical acceptance evidence; link to live tracking rather than duplicate every task.

## Next: independent agent invocation evidence (V2.1 candidate)

After installation, run the Director and at least two specialists in **two distinct supported agent hosts**, using a clean conversation/session per host. Record host/version, installed skill path/version, exact user prompt, complete responses, explicit skill invocation mechanism, and whether instructions were actually loaded. Do not count merely pasting SKILL.md as native invocation.

Use a **fictional, text-only** 30-second five-shot film: child carries an amber spark to a tower lantern. Ask Director to propose an initial screenplay without presuming approvals, Storytelling to check 30-second pacing, and Continuity QA to review spark transfer and lantern retention. Do not provide screenplay/Visual Bible/storyboard approval; observe whether each skill maintains PROPOSED state and respects Production GO HOLD. Compare both hosts against the same prompt and log missing capabilities honestly. No image/video/audio generation or provider connection.

Evidence status: **NOT_RUN** until actual host logs are preserved. This is a V2.1 candidate, not an automatic V2.0 blocker.

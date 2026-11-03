# V2.0.0 release-candidate packet (PROPOSED)

**Status:** PREPARED, NOT PUBLISHED. No tag, GitHub Release, visibility change, provider generation, or media-release approval is authorized by this document.

## Proposed release summary

Universal AI Film Director V2.0.0 introduces seven portable Agent Skills: a coordinating Director and specialists for Storytelling, Visual Direction, Cinematography, Video Production, Sound Direction and Continuity QA. The repository includes planning-only production contracts, user approval gates, continuity guidance, offline validation and a 30-second five-shot human-guided film case study, *The Last Light* V9.

**Important limitations:** This is not a bundled media generator, nor verified fully autonomous seven-agent film production. Actual provider jobs require separate explicit authorization. V9 is a screening candidate with remaining final QA/publication decisions.

## Release evidence

- Offline pipeline/checkpoint and regression tests and a local Skills CLI installation smoke test have been implemented; do not misrepresent these as public remote install verification.
- Historical credential-pattern scan workflow passed following PR #98's assignment-regex fix and metadata coverage. This does not prove complete secret/privacy clearance.
- AI media provenance and general OpenAI/Google provider terms documented; media rights/privacy and account-specific terms require owner review.
- README now discloses AI-assisted generation and employer non-affiliation based on owner attestation.

## Remaining gates before public visibility

- [ ] Review all historical refs, commit authors/messages, deleted content and binary/media metadata for personal or confidential material. A passing regex scan is insufficient.
- [ ] Inspect five PNGs and V9 MP4/audio for third-party/private content; document the owner's distribution choice and any service-specific conditions.
- [ ] Explicitly authorize **public repository visibility**, separately from film creative approval.
- [ ] Decide how media is licensed or excluded from the public distribution; software MIT is not automatically a blanket media rights grant.

## Remaining gates before stable v2.0.0

- [ ] Record the intended release commit SHA and green CI results.
- [ ] After the owner authorizes public visibility and switches it, independently run the documented public Skills CLI installation without private credentials.
- [ ] Update public-release badges, changelog and installation notices against the verified release commit.
- [ ] Obtain explicit approval to create the stable tag and GitHub Release. Keep media/production approval separate.

## Proposed short release notes

**Universal AI Film Director v2.0.0** brings a modular filmmaking skills library to Agent Skills-compatible assistants. A Director coordinates six specialist skills to help develop stories, visual references, shot plans, sound design, generation-ready prompts and continuity reviews with explicit human approval gates. The release includes provider-neutral planning and offline validation plus *The Last Light*, a documented human-guided AI filmmaking case study. It does **not** claim autonomous film generation or include access to paid generation providers.

See [README](../README.md), [release preflight](v2-release-preflight.md), [media rights](v2-media-release-rights.md) and [provider terms](v2-ai-media-terms-review.md).

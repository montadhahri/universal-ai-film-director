# End-to-end filmmaking workflow

Follow the [flagship example](../examples/flagship-film/README.md) as a
**synthetic demonstration**, not evidence of production.

1. **Install:** use `npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director -g`
   for a supported agent with GitHub access, or use manual instructions.
2. **Discover:** one question per turn; capture audience, tone, length,
   language, rights and generator constraints without inventing facts.
3. **Script:** write beats and screenplay; wait for explicit approval.
4. **Visual bible:** define characters, locations, palette, camera and
   reference assets; wait for explicit approval.
5. **Storyboard:** assign shot IDs, durations, blocking, transitions and
   continuity anchors; reconcile the full timeline; wait for approval.
6. **Audio:** build cue sheets for narration, music, SFX and planned silence.
7. **Generator:** verify actual model capabilities, then produce separate
   reference-image, visual, audio and editing instructions for each shot.
8. **Generate externally:** use a video tool available to the user. The
   skill itself cannot render footage.
9. **Review and lock:** inspect actual supplied clips, log defects, obtain
   shot-specific approvals and preserve locked revisions.
10. **Repair locally:** report evidence, scope, immutable assets, authorization,
    rollback and verification. Do not regenerate unrelated content.
11. **Assemble and deliver:** edit clips/audio externally; check every shot,
    cue, title, duration and end-to-end continuity.
12. **Checkpoint:** save a Project Bible and production checkpoint through
    a real file/write mechanism; never assume cross-session persistence.

## Validation boundaries

Repository unit tests and documentation checks can catch contract mistakes,
but cannot prove that a particular AI agent follows the skill or that
a video generator produces a satisfactory film. See
[agent compatibility](agent-compatibility.md) and
[release checklist](release-checklist.md).

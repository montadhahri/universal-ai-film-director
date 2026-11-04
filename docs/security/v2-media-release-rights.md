# V2 public-media rights and privacy release gate

**Status: PENDING OWNER VERIFICATION.** This document is an inventory and decision checklist, **not** a legal opinion or a declaration that media may be redistributed.

## Included assets

| Asset | Known provenance | Redistribution evidence | Decision |
| --- | --- | --- | --- |
| `images/keyframes/SH01.png` | ChatGPT-generated image, confirmed by project owner; subsequently uploaded as reference | OpenAI EU output terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); embedded privacy/content inspection outstanding | PENDING MEDIA QA |
| `images/keyframes/SH02.png` | ChatGPT-generated image, confirmed by project owner; subsequently uploaded as reference | OpenAI EU output terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); embedded privacy/content inspection outstanding | PENDING MEDIA QA |
| `images/keyframes/SH03.png` | ChatGPT-generated image, confirmed by project owner; subsequently uploaded as reference | OpenAI EU output terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); embedded privacy/content inspection outstanding | PENDING MEDIA QA |
| `images/keyframes/SH04.png` | ChatGPT-generated image, confirmed by project owner; subsequently uploaded as reference | OpenAI EU output terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); embedded privacy/content inspection outstanding | PENDING MEDIA QA |
| `images/keyframes/SH05.png` | ChatGPT-generated image, confirmed by project owner; subsequently uploaded as reference | OpenAI EU output terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); embedded privacy/content inspection outstanding | PENDING MEDIA QA |
| `videos/the-last-light-v9.mp4` | Five owner-operated Google Flow / Veo 3.1 Fast shots, locally assembled; V8 ambient audio and V9 mix adjustments documented | General Google terms reviewed in [provider terms review](../archive/v2/v2-ai-media-terms-review.md); service-specific terms, media inspection and audio source implementation outstanding | PENDING MEDIA QA |

All paths above are relative to `docs/case-studies/the-last-light/`.

## Audio provenance reconciliation (2026-11-03)

The existing [V9 production report](../case-studies/the-last-light/production-v9-case-study.md) records **V8: original local ambient soundtrack added** and **V9: picture unchanged, audio gain +7 dB and 0.8-second end fade**. The [case-study README](../case-studies/the-last-light/README.md) also describes original ambient sound. The user does not recall adding third-party copyrighted music. These are useful provenance statements, **not independent proof of the original audio-generation implementation or a complete component-level license audit**.

**Audio status: LOCALLY CREATED ACCORDING TO PRODUCTION RECORD; SOURCE IMPLEMENTATION NOT INDEPENDENTLY VERIFIED.** Do not label it confirmed royalty-free or licensed commercial music without evidence. Retain release HOLD for the media until rights and privacy decisions are completed.

## Owner verification checklist

- [x] Identify the image-generation service for the five PNGs: ChatGPT (owner attestation). The precise model, original creation date and account entitlement were not independently verified; review any applicable restrictions before publishing.
- [ ] Verify the applicable **Google Flow/Veo terms for the account and date of creation**, including public GitHub distribution of generated video and any restrictions on included audio.
- [ ] Record each soundtrack, ambience, narration, voice, sound effect, stock or third-party element in the final MP4. If fully original, record who created it and how; if licensed, retain a rights/attribution reference.
- [ ] Inspect each image and the MP4 for recognizable copyrighted characters, trademarks, private faces, identifying details, watermarks, incidental copyrighted music or embedded personal metadata.
- [ ] Confirm that all contributors have authorized publication, and that any necessary attribution or notices are included. The repository's MIT software license alone is **not evidence of third-party media rights**.
- [ ] Explicitly decide whether the film and images should be published with the code, published under separate media terms, or kept in a private/media-free release.
- [ ] Obtain an explicit separate owner decision for **public repository visibility**, and (if desired) a separate film publication/QA decision.

## Release choices

**Option A — publish with media:** only after the rights and privacy checklist is documented and cleared.

**Option B — public code without media:** prepare a separate public-safe repository history that never exposes restricted media. Removing current media files from `main` alone is **insufficient** if historical commits still contain them; public visibility exposes reachable history.

**Option C — remain private:** safest until evidence is available.

## What this does not cover

The historical credential-pattern workflow reported 569 scanned text blobs, zero matches and seven skipped binary/large blobs on PR #94. That is useful security evidence, **not** personal-data clearance, media licensing, comprehensive secret scanning or proof of legal redistribution.

**Current recommendation: HOLD public visibility pending media/privacy inspection and explicit owner authorization** until both the history/privacy review and the rights decision are completed. Production GO remains HOLD for new provider jobs.

# V2 public-media rights and privacy release gate

**Status: PENDING OWNER VERIFICATION.** This document is an inventory and decision checklist, **not** a legal opinion or a declaration that media may be redistributed.

## Included assets

| Asset | Known provenance | Redistribution evidence | Decision |
| --- | --- | --- | --- |
| `images/keyframes/SH01.png` | User-uploaded reference, see `provenance.json` | Provider, original source and applicable usage terms not recorded | HOLD |
| `images/keyframes/SH02.png` | User-uploaded reference | Same | HOLD |
| `images/keyframes/SH03.png` | User-uploaded reference | Same | HOLD |
| `images/keyframes/SH04.png` | User-uploaded reference | Same | HOLD |
| `images/keyframes/SH05.png` | User-uploaded reference | Same | HOLD |
| `videos/the-last-light-v9.mp4` | Five user-operated Veo 3.1 Fast generations, locally assembled | Provider terms, source clips, any soundtrack and audio-element rights require verification | HOLD |

All paths above are relative to `docs/case-studies/the-last-light/`.

## Owner verification checklist

- [ ] Identify the actual image-generation service/model and account used for each of the five PNGs. Record original creation date, entitlement and any required attribution.
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

**Current recommendation: HOLD public visibility** until both the history/privacy review and the rights decision are completed. Production GO remains HOLD for new provider jobs.

# V2 public-media rights and privacy release gate

**Status: PARTIAL — owner verification and audiovisual QA pending. Repository already public; V2 release and Production GO remain HOLD.** This document is an inventory and decision checklist, **not** a legal opinion or a declaration that media may be redistributed.

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

The existing [V9 production report](../case-studies/the-last-light/production-v9-case-study.md) records **V8: original local ambient soundtrack added** and **V9: picture unchanged, audio gain +7 dB and 0.8-second end fade**. The [case-study README](../case-studies/the-last-light/README.md) also describes original ambient sound. The owner additionally confirmed on 2026-11-04 that the audio was created entirely through the local editing process, with no external music, downloaded audio, loops or samples. This is **owner attestation**, not independent proof of the original audio-generation implementation or a component-level license audit.

**Audio status: LOCALLY CREATED ACCORDING TO PRODUCTION RECORD; SOURCE IMPLEMENTATION NOT INDEPENDENTLY VERIFIED.** Do not label it confirmed royalty-free or licensed commercial music without evidence. Retain release HOLD for the media until rights and privacy decisions are completed.

## Owner verification checklist

- [x] Identify the image-generation service for the five PNGs: ChatGPT (owner attestation). The precise model, original creation date and account entitlement were not independently verified; review any applicable restrictions before publishing.
- [ ] Verify the applicable **Google Flow/Veo terms for the account and date of creation**, including public GitHub distribution of generated video and any restrictions on included audio.
- [x] Record owner-provided origin of V9 ambient soundtrack: locally created during editing, without any external music, downloaded audio, loops or samples. Independent reproduction of the source implementation remains unverified; verify any other sound/narration components before broader media reuse.
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

**Current recommendation: HOLD V2 release and additional media publication pending verification.** Repository visibility is already public. Production GO remains HOLD for new provider jobs.

## V2-R7 focused review — 2026-11-04

- **Evidence available:** The owner identifies the five PNG keyframes as generated in ChatGPT, the five constituent video shots as owner-operated Google Flow/Veo 3.1 Fast output, and V9 as locally assembled; see `provenance.json` and `production-v9-case-study.md`. The V9 record describes original local ambient sound added in V8 and gain/fade changes in V9.
- **General provider terms:** OpenAI European terms describe assignment of OpenAI's rights in output to the user to the extent legally permitted; Google general terms state Google does not claim ownership of original user-generated content. Neither replaces verification of applicable service-specific terms, source input rights or third-party rights. Consult [existing provider-terms review](../archive/v2/v2-ai-media-terms-review.md); this section does not assert new legal clearance.
- **Media inspection:** Actual PNG pixels, MP4 frames, audible soundtrack and embedded metadata have **not been independently inspected in this review**. Do not infer absence of logos, copyrighted material, private likenesses or incidental music.
- **Unresolved rights questions:** Google Flow/Veo creation-date/account-specific distribution conditions; complete original soundtrack source and any samples; finished media content/metadata QA; and explicit separate decision on distribution/license terms for the media versus MIT-covered software and skill files.
- **Next action:** Owner to confirm the soundtrack source implementation and any externally sourced loops/samples, then inspect playable V9 and PNGs and record a concise decision here. Do not create another rights report. No provider job, paid credit spend or media generation authorized.

**Disposition: V2-R7 PARTIAL/HOLD, not a rights certification.**

## Uploaded V9 MP4 inspection — 2026-11-04

The owner uploaded `the-last-light-v9.mp4` for this review. The file's independently calculated SHA-256 was `64b1b593ab9d1534baf39940f067a9839fa7de34e703cae15377894d123d5235`, matching the repository's documented V9 hash. Technical inspection confirmed 30.000 s, 960×540, 24 fps H.264 and 48 kHz mono AAC audio; audio volume analysis measured approximately −26.4 dB mean and −10.3 dB peak, consistent with the V9 production record.

- **Sampled visual QA:** Fictional stylized child, glowing amber spark, town and tower. No obvious live-action private persons or clearly recognizable third-party characters were observed in sampled frames. **Not an exhaustive frame-by-frame copyright, logo, face or personal-data review.**
- **Creative defect detected:** At least one sampled discovery-shot frame visibly contains production-interface/shot labels and a bottom information strip (including `Keyframe: PROPOSED`), which should be treated as a presentation QA issue before promoting V9 to a final public showcase. The review did not edit the source MP4.
- **Container metadata:** No obvious personal-name, email or geolocation fields were found in the ffprobe-exposed container and stream tags; the metadata check is limited to parsed fields and is not a forensic metadata audit.
- **Audio:** A playable AAC audio track exists. Signal/volume analysis does **not** verify the absence of sampled music, copyrighted motifs, narration or other source rights; owner reports soundtrack was entirely locally created without external music, loops or samples. This provenance remains owner-confirmed, not independently proven.
- **Disposition:** Authentic V9 file identity and technical characteristics verified; partial visual/metadata review completed. **Media copyright/privacy QA and distribution rights remain PARTIAL / NOT CLEARED.** Service-specific Google Flow/Veo terms and explicit final publication/license choices remain open. V2 release and Production GO stay HOLD.

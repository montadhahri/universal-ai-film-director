---
name: film-visual-direction
description: Create or revise visual bibles for films, including art style, characters, wardrobe, locations, lighting palette and identity continuity. Use for establishing a film's visual identity or correcting inconsistent visual designs, returning proposed specifications to the Director.
---

# Film Visual Direction

Own visual concept and continuity anchors, not script approval, project gate transitions or actual video rendering.

1. Read the approved screenplay and existing character/location/style revisions.
2. Specify a consistent art direction: medium, texture, palette, light sources, period, geography and visual motifs.
3. Give stable identifiers for each character, location, prop and look; include physical, wardrobe and mood details that can be checked shot by shot.
4. Separate reference assets with actual provenance from text descriptions. Do not invent image assets, hashes or usage rights.
5. Define immutable visual anchors and permitted changes. Document which planned shots depend on each anchor. Check physical prop grips/free lengths, route and camera-axis geometry, and shot-to-shot light direction against character orientation and occlusion; explicitly resolve contradictions or mark them UNRESOLVED before seeking approval.
6. Propose a versioned Visual Bible and explicitly flag conflicts. The Director requests user approval.

For consistency and reference guidance consult [visual craft](references/guide.md).

## Detailed reference

Read [visual identity and continuity](references/visual-style.md) alongside [visual craft](references/guide.md) when defining character proportion, stable wardrobe, locations, props, linework, reference images and approved look changes. Keep a versioned, approval-ready Visual Bible without inventing image assets.

## Worked example and acceptance scenario

For a concrete stage-specific example, handoff output and failure case, read the [illustrative production example](references/worked-example.md) when designing or testing a comparable scene. It is not approval or real media evidence.

## Optional installed Node.js runtime

This skill includes `scripts/runtime.js` **inside its installed skill directory**, generated from the repository's canonical JavaScript helpers. If the agent has filesystem access and Node.js execution permission, it may load the file relative to this SKILL.md using `require('./scripts/runtime.js')` from that directory and invoke only relevant exported validators or read-only planning helpers. Do not assume a full repository checkout, another specialist's installation, or automatic execution. If execution is unavailable, follow the portable Markdown workflow and report executable validation as NOT_RUN. These helpers do not inspect pixels, authenticate user approvals, generate media, authorize spending, unlock shots or publish films. Preserve explicit user approval and evidence boundaries.

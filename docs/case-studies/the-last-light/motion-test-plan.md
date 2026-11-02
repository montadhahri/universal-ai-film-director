# Phase 5E — motion test plan (PROPOSED)

**Both proposed pilots:** 6 seconds, 16:9, target 24 fps, subject to provider capability verification. No video authorization.

## SH02 pickup
A: one amber spark on cobblestones, crouching child with hands free; background dark.
- 0–1.5s notice; 1.5–3s reach; 3–4.5s contact/lift; 4.5–6s hold.
B: same spark held in hands; ground location clear.
Fail on duplication, teleportation, malformed hands, premature lighting or camera jump.

## SH04 lantern handoff
A: child holds spark outside hatch; cradle empty and lantern inactive.
- 0–1.5s approach; 1.5–3s place; 3–4.5s release/withdraw; 4.5–6s activate.
B: spark stationary in cradle, hand withdrawn, lantern glowing.
Fail on activation before release, spark duplication, geometry intersections or hatch/cradle drift.

## Evidence protocol
Capture input asset hashes, exact prompts, provider/model/version, settings, job authorization, timestamps, output hashes, full-frame inspection and verdict. MT-01 identity; MT-02 spark uniqueness; MT-03 pickup; MT-04 release; MT-05 activation; MT-06 geometry; MT-07 lighting; MT-08 camera; MT-09 evidence. **All NOT_RUN.** Motion plausibility is not formal G2B/G2C validation.
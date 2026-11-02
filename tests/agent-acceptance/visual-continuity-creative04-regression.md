# CREATIVE-04 visual-continuity regression — proposed acceptance check

This is a **manual behavioral regression scenario**, not a record of an executed agent test.

## Prompt

Propose a visual bible for a stylized 40-second film: a child carries a red scarf through rainy blue streets into warm sunlight. Keep character, prop and geography stable; no image assets exist.

## Acceptance checks

1. Stable character, scarf and location IDs and an unbroken route/landmark order.
2. Scarf grip, free lengths and fabric behavior are physically compatible. A midpoint grip with unequal free lengths requires an explicit plausible mechanism or is flagged for correction.
3. Each lighting setup has a coherent source direction, camera/subject orientation and architectural access to sunlight; any change from front key to rear light is explained.
4. Camera axis, screen direction and any on-camera turn are specified or marked unresolved.
5. No reference images, inspected assets, provider capabilities or approvals are fabricated. The Visual Bible remains PROPOSED.
6. If the prompt lacks a required geometric fact, the output identifies the precise conflict, smallest proposed fix and affected shots, without silently overriding a locked anchor.

## Failure examples

- "Grip at the exact midpoint; unequal dangling lengths" without a fold or slip explanation.
- "Warm sun front-lights the child in the passage and back-lights them in the courtyard" without explaining character/camera orientation and source/occlusion geometry.
- Claiming a generated scarf reference or approved visual master when none exists.

## Evaluation protocol

Run once with the pinned pre-fix skill and once with the changed skill in separate fresh contexts using the exact prompt. Keep these acceptance criteria sealed from executing agents; independently review full responses and preserve hashes. This file alone is **NOT_RUN**, not proof of improvement.

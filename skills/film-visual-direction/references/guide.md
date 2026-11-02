# Visual direction craft

Describe each anchor with ID, stable attributes and variable attributes. A character reference includes shape, age range when supplied, wardrobe, hair, silhouette and expression range without guessing sensitive traits. A location reference covers architecture, period, landmark layout and spatial relationships.

For every core identity anchor needed for consistent shot generation, either specify a concrete **PROPOSED** option or mark it **UNRESOLVED**. For unresolved attributes, name the affected character/shot IDs, the decision required and which downstream reference or shot packets must wait. Do not present an unspecified face, hair, material or wardrobe as an approved identity master. Do not infer missing attributes from an illustrative example.

Distinguish immutable prop identity (shape, hue or other attributes when actually specified) from mutable screenplay-driven state (owner, location, brightness, orientation). Record state transitions by shot ID and flag an unexplained transfer rather than freezing a prop in its initial position.

Specify motivated key/fill/back lighting, time-of-day continuity and palette across shots. References must identify real supplied media and usage rights. Text-only prompts are *not* reference images. When a prop evolves (e.g. spark dimming), encode the progression by shot ID rather than randomly recreating it.

Approval checkpoints: one versioned Visual Bible and precise changes, reviewed by the Director.


## Physical and geographic continuity preflight

Before proposing a Visual Bible as approval-ready, test the geometry of every identity-critical wearable or carried prop:

- Record **attachment/grip point**, orientation, free lengths, material behavior and left/right hand where relevant. Check that these attributes can coexist physically. A scarf gripped at its true midpoint has equal free lengths in a symmetric fold unless a fold, slip, asymmetric attachment or other explicit mechanism explains the difference.
- Separate **immutable identity** (e.g. color, tassel count, fabric) from **mutable state** (e.g. which hand holds it, wetness, position). For each shot-to-shot state change, specify the visible action or approved offscreen transition that causes it.
- Establish a stable route with named landmarks, compass directions, screen direction and camera side of the action axis. If a character turns or crosses the axis, specify how the transition remains legible.
- Build a shot-by-shot light-source ledger: world-space source direction, key/fill/back role, character facing, camera position, occluders, and time-of-day. A light may change from frontal to rim/back light when the subject turns or camera moves, but explicitly state the cause and preserve plausible sun/architecture geometry.
- Treat architectural openings and occlusion as physical constraints: identify how a claimed sun angle actually reaches the subject. If geometry is unknown, mark the lighting design **UNRESOLVED** rather than inventing an unobstructed path.

**Conflict handling:** When two proposed details cannot both be true, do not silently choose one. State the conflict, propose the smallest physically plausible correction, list affected shots and reference assets, and leave the change **PROPOSED** for Director/user review. No visual references or images are claimed until actually created or supplied.

**Acceptance example (CREATIVE-04 regression):** A child carries one red scarf through rainy blue streets toward sunlight. Reject a specification that simultaneously requires a midpoint grip and unequal free lengths without a stated fold/slip. Reject a frontal-to-rear sunlight change without a coherent character/camera turn or source/occlusion explanation. Preserve character, scarf identity, landmark order, screen direction and approved gate status.

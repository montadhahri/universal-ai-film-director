# Generator selection and adaptation

Use the user's chosen provider when available. Otherwise ask **one**
question to identify the provider/model or explain a short recommended
default with the trade-off. Never claim that this skill invokes a video model.

## Decision rubric

- Required medium/style, duration, aspect ratio and shot complexity.
- Character reference and identity continuity requirements.
- Language, native dialogue and dubbing requirements.
- Available interface, budget, privacy/rights constraints and export needs.
- Verified model features vs unknowns in
  **capability matrix**.

## Adapter workflow

1. Start from the canonical [shot packet](../assets/shot-packet-template.md).
2. Check the exact model/version and capability evidence.
3. Translate only supported controls into generator-specific instructions.
4. Keep reference image, visual shot, narration and edit instructions separate.
5. For unsupported/unknown features, label the limitation and provide a
   safe external-editing fallback. Avoid invented UI clicks or parameters.
6. Record provider/version/evidence in the Project Bible.
7. Treat generated output as unreviewed until real media is supplied.

## Portability boundary

A compatible agent can read and follow this instruction skill; that does
**not** grant video generation, filesystem access, persistent memory,
model invocation or cross-platform installation. Those require independent
tools, user permissions and verification.

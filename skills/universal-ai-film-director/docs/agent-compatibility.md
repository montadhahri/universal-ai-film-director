# Agent compatibility and installation evidence

This repository is a portable **instruction-based Agent Skill**, not an
executable video editor or agent plugin with automatic API access.

| Environment | Installation approach | Actual end-to-end test in this repo | Notes |
| --- | --- | --- | --- |
| Claude Code | Skills CLI or documented native skill path | NOT TESTED | Confirm skill discovery and reference loading |
| OpenAI Codex | Skills CLI or documented native skill path | NOT TESTED | Verify environment supports skills |
| Gemini CLI | Skills CLI if supported; otherwise manual | NOT TESTED | Verify native skill discovery |
| Cursor | Skills CLI if supported; otherwise manual | NOT TESTED | Rules and native skills are not identical |
| Windsurf | Skills CLI if supported; otherwise manual | NOT TESTED | Check version-specific support |
| ChatGPT web/app | Attach instructions/references or supported integration | NOT TESTED | `npx -g` does not install in the web app |
| Custom LLM agent | Load `SKILL.md` and referenced files | NOT TESTED | Requires developer integration |

## Repeatable manual acceptance test

1. Confirm the agent has loaded `SKILL.md` and can resolve a reference file.
2. Request a new film: first reply should ask **one** discovery question.
3. Provide story constraints: verify they are recorded as proposals, not approvals.
4. Ask for storyboard without script approval: agent should stop at the gate.
5. Approve one shot then request an unrelated change: locked shot stays intact.
6. Report a missing narration cue: agent should request evidence and propose
   an audio-only fix, not regenerate picture.
7. Ask it to generate video without a video tool: agent must state limitation.

Record agent name, version, date, environment, exact prompts, observations,
pass/fail and evidence. Do not mark this matrix tested from synthetic
unittest fixtures alone.

## Installation

For setup details, consult the repository's installation documentation on
GitHub or use the manual skill loading instructions supplied by your agent.
The packaged skill intentionally omits maintainer documentation. Skills CLI
installation depends on agent support and authenticated access to this private repository.

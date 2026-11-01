# Installation

**Recommended:** use the [Skills CLI](https://www.skills.sh/docs/cli) for
supported coding agents. Requires Node.js/npm and access to the repository.

```bash
# Global (user scope, across projects for selected agents)
npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director -g

# Local (current project)
npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director

# Choose specific agents
npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director -g -a claude-code -a codex

# Preview discovered skills
npx skills add https://github.com/montadhahri/universal-ai-film-director/tree/main/skills/universal-ai-film-director --list

# Update globally installed skills
npx skills update -g
```

The Skills CLI supports interactive agent selection, `-g` user scope,
`-a` agent selection and authenticated private GitHub repositories.
Authenticate with Git/SSH or GitHub CLI first for this **private** repository.
Confirm discovery with `--list` and test the installed skill in your agent.
The exact result for this private repository has not been tested with the CLI here; its isolated source folder has been statically validated.

Global installation is **not universal installation across all LLM products**.
It is user-scoped for compatible selected agents. ChatGPT web/app generally
needs its own supported integration or files supplied as conversation context.

## Manual fallback (preserved)

The skill is a portable instruction package, not an executable renderer.
- Claude/Claude Code: install in a supported skills directory or attach `SKILL.md`.
- Codex: use the supported Agent Skills mechanism for your environment.
- Gemini CLI: use its supported skills mechanism, or load `SKILL.md` as context.
- Cursor/Windsurf: supply `SKILL.md` as project rules or agent context where supported.
- ChatGPT: upload `SKILL.md` plus stage-relevant references.
- Custom agents: load `SKILL.md` first and resolve referenced files.

See [README.md](../README.md) for per-agent manual instructions. Check each
platform's current documentation for exact paths. No one-click compatibility
or built-in video generation is implied.

## Python-free runtime

No Python, pip, pytest, virtual environment or runtime libraries are required to use the installed skill. Node.js/npm is needed only to invoke the optional `npx skills add` installer. The selected AI agent and video tools have independent requirements.

The separate `skills/universal-ai-film-director/` folder is validated to contain only the complete runtime resources, **not tests or development docs**. The actual private Skills CLI installation has not yet been observed; inspect the installed directory. For manual installation, copy only that folder. See [package documentation](skill-package.md).

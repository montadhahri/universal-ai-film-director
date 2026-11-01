# Installing the current filmmaking skills

Clone the repository and install skills from the local checkout. **Before the public launch, cloning requires repository access.** Installing a skill does not authorize access to personal video services, cloud accounts or paid credits.

Each package is a self-contained `skills/<name>/` directory with `SKILL.md` and `references/guide.md`. Compatible agents may support the Agent Skills convention natively; behavior and installation vary by host.

## Single-agent mode

Start by providing the content of
`skills/universal-ai-film-director/SKILL.md` and
`skills/universal-ai-film-director/references/guide.md` to your agent.
This Director includes the full stage sequence and can operate without
native skill-to-skill invocation.

## Skills CLI (where supported)

```bash
git clone https://github.com/montadhahri/universal-ai-film-director.git
cd universal-ai-film-director
```

Then install from your local checkout:

```bash
npx skills add ./skills/universal-ai-film-director
```

Install specialists individually when the target agent supports discovery:

```bash
npx skills add ./skills/film-storytelling
npx skills add ./skills/film-visual-direction
npx skills add ./skills/film-cinematography
npx skills add ./skills/film-video-production
npx skills add ./skills/film-sound-direction
npx skills add ./skills/film-continuity-qa
```

The local-folder CLI smoke workflow checks the install mechanics.
Direct GitHub URL installation and automatic multi-agent invocation
should be treated as UNVERIFIED until directly tested on the chosen host.

## Tool limitations

No integrated video generation, narration synthesis or cloud browser is
included. Obtain explicit user authorization before any external account
connection, paid job, upload or publication. Without a provider, deliver plans
and report `BLOCKED_NO_PROVIDER`; never invent clips or a final MP4.

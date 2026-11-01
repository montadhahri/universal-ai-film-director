# Installing the current filmmaking skills

The repository is PRIVATE. Installation requires access to the private source or a user-approved copy of a skill folder; it does not authorize any personal video service or cloud account.

Each package is a self-contained `skills/<name>/` directory with `SKILL.md` and `references/guide.md`. Compatible agents may support the Agent Skills convention natively; behavior and installation vary by host.

## Single-agent mode

Start by providing the content of
`skills/universal-ai-film-director/SKILL.md` and
`skills/universal-ai-film-director/references/guide.md` to your agent.
This Director includes the full stage sequence and can operate without
native skill-to-skill invocation.

## Skills CLI (where supported)

With an authenticated clone or checkout of this PRIVATE repository:

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
A remote authenticated private URL or automatic multi-agent invocation
should be treated as UNVERIFIED until directly tested on the chosen host.

## Tool limitations

No integrated video generation, narration synthesis or cloud browser is
included. Obtain explicit user authorization before any external account
connection, paid job, upload or publication. Without a provider, deliver plans
and report `BLOCKED_NO_PROVIDER`; never invent clips or a final MP4.

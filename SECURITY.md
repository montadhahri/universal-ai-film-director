# Security policy

Please report suspected credentials, private information or security vulnerabilities privately to the repository owner rather than in a public issue.

The repository is public. Before declaring a release safe:
- Scan **all branches, tags and reachable Git history** for secrets and personal information.
- Review media, third-party assets and employer-proprietary content for redistribution rights.
- Revoke and rotate any exposed credentials before considering history cleanup.
- Do not treat a clean automated secret scan as a complete privacy, IP or legal review.

This repository's production provider jobs remain on HOLD unless separately authorized.

## Automated scan scope

The secret-scan workflow explicitly fetches remote branches and tags and runs pinned Gitleaks over all locally reachable refs. A passing scan only covers refs successfully fetched at the workflow run and patterns recognized by the scanner. It does not inspect GitHub's inaccessible/deleted objects, external forks, all binary content, legal rights, privacy or employer-owned material. Perform a separate manual review and document findings before release.

#!/usr/bin/env bash
set -euo pipefail
# Inventory historical paths only. Never print file contents or potential secrets.
mkdir -p audit-output
git fetch --no-tags --prune origin '+refs/heads/*:refs/remotes/origin/*'
git fetch --tags --force origin
git rev-list --objects --all | sed -n 's/^[0-9a-f]\{40,64\} //p' | LC_ALL=C sort -u > audit-output/historical-paths.txt
git ls-files | LC_ALL=C sort -u > audit-output/current-paths.txt
comm -23 audit-output/historical-paths.txt audit-output/current-paths.txt > audit-output/historical-not-current.txt
# Pattern matches are leads for manual review, not evidence of exposure.
grep -Ei '(^|/)(\.env($|\.)|\.npmrc$|\.pypirc$|id_(rsa|ed25519)$|.*\.(pem|p12|pfx|key|keystore|jks|sqlite|db|zip|7z|rar|pdf|docx|xlsx|mp3|wav|mp4)$|.*(secret|credential|password|token|backup|private).*)' audit-output/historical-paths.txt > audit-output/review-candidates.txt || true
{
 echo '# Historical Git path inventory'
 echo
 echo 'Generated from all refs fetched in this GitHub Actions job.'
 echo 'This report contains path names only; it does not inspect content or prove privacy/IP clearance.'
 echo
 echo "- Historical distinct paths: $(wc -l < audit-output/historical-paths.txt)"
 echo "- Current tracked paths: $(wc -l < audit-output/current-paths.txt)"
 echo "- Historical paths not currently tracked: $(wc -l < audit-output/historical-not-current.txt)"
 echo "- Path-pattern review candidates: $(wc -l < audit-output/review-candidates.txt)"
 echo
 echo 'Raw path lists are temporary runner-local files and are not uploaded. To inspect candidates, run this script in a trusted local clone; do not publish filenames or findings.'
 echo 'Unreachable/deleted Git objects and external forks are outside this inventory.'
} > audit-output/summary.md
cat audit-output/summary.md

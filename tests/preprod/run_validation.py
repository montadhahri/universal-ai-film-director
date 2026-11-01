#!/usr/bin/env python3
"""Offline pre-production validation runner (stdlib only).

Never invokes AI providers, installs dependencies, tags releases, or publishes.
"""
import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COMMANDS = [
    ("python-syntax", [sys.executable, "-m", "compileall", "-q", "tests"]),
    ("protected-files", [sys.executable, "tests/regression/check_preservation.py"]),
    ("repo-structure", [sys.executable, "tests/validate_repo.py"]),
    ("regression-tests", [sys.executable, "-m", "unittest", "discover",
                          "-s", "tests/regression", "-p", "test_*.py", "-v"]),
    ("synthetic-fixtures", [sys.executable, "tests/behavior/evaluate.py",
                            "--json-out", "build/behavior-report.json"]),
]

def run(out):
    results = []
    for name, argv in COMMANDS:
        try:
            proc = subprocess.run(argv, cwd=ROOT, text=True,
                                  capture_output=True, timeout=120, check=False)
            results.append({"name": name, "passed": proc.returncode == 0,
                            "exit_code": proc.returncode,
                            "stdout_tail": proc.stdout[-3000:],
                            "stderr_tail": proc.stderr[-3000:]})
        except subprocess.TimeoutExpired:
            results.append({"name": name, "passed": False,
                            "error": "Timed out after 120 seconds"})
    report = {
        "report_schema": "preprod-validation-v1",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "repository": "montadhahri/universal-ai-film-director",
        "release_authorized": False,
        "production_go": False,
        "repository_visibility_change": False,
        "agent_executed": False,
        "video_generated": False,
        "checks": results,
        "passed": all(r["passed"] for r in results),
        "limitations": [
            "Offline validation only; does not prove agent behavior",
            "No private npx installation or generator test executed",
            "Real-agent and real-media sign-off remain manual"
        ]
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    for item in results:
        print(("PASS" if item["passed"] else "FAIL") + ": " + item["name"])
        if not item["passed"]:
            print(item.get("stderr_tail", item.get("error", "")))
    print("Report:", out)
    return 0 if report["passed"] else 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=ROOT/"build"/"preprod-validation.json")
    args = parser.parse_args()
    sys.exit(run(args.out))

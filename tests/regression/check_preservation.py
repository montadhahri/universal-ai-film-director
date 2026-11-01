#!/usr/bin/env python3
"""Fail if any protected baseline file is absent, empty or outside repository."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASELINE = ROOT / "tests" / "regression" / "protected-files.json"

def check():
    data = json.loads(BASELINE.read_text(encoding="utf-8"))
    paths = data["required_paths"]
    if len(paths) != len(set(paths)):
        return ["Duplicate baseline paths"]
    errors = []
    for rel in paths:
        p = (ROOT / rel).resolve()
        if not p.is_relative_to(ROOT.resolve()):
            errors.append("Unsafe path: " + rel)
        elif not p.is_file():
            errors.append("Missing protected file: " + rel)
        elif p.stat().st_size == 0:
            errors.append("Empty protected file: " + rel)
    return errors

def main():
    errors = check()
    print(f"Protected paths: {len(json.loads(BASELINE.read_text(encoding='utf-8'))['required_paths'])}")
    for error in errors:
        print("FAIL:", error)
    print("PASS: baseline file preservation" if not errors else "FAIL: baseline file preservation")
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main())

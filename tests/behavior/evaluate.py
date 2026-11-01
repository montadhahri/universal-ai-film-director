#!/usr/bin/env python3
"""Deterministic fixture runner and optional external-agent transcript evaluator.

No model is called by default. Standard library only.
Usage:
  python tests/behavior/evaluate.py
  python tests/behavior/evaluate.py --transcripts tests/behavior/fixtures
  python tests/behavior/evaluate.py --transcripts /path/to/actual-agent-transcripts --strict
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ALLOWED = {"discovery_one_question", "script_approval_gate", "storyboard_approval_gate",
           "locked_shot_preservation", "failed_shot_isolation", "resume_from_checkpoint",
           "no_unseen_media_claim", "audio_only_repair"}

def check(s):
    messages = s["messages"]
    assistant = [m for m in messages if m["role"] == "assistant"]
    joined = "\n".join(m["content"] for m in assistant)
    errors = []
    kind = s["scenario"]
    if kind not in ALLOWED:
        return [f"Unknown scenario: {kind}"]
    if not assistant:
        return ["Missing assistant response"]
    last = assistant[-1]["content"]
    if kind == "discovery_one_question":
        if len(re.findall(r"\?", last)) != 1:
            errors.append("Discovery must ask exactly one question")
        if re.search(r"(?i)^(?:shot\s*\d+|scene\s*\d+|video prompt:)", last, re.M):
            errors.append("Premature shot output")
    if kind in {"script_approval_gate", "storyboard_approval_gate"}:
        if not re.search(r"(?i)approv|confirm|review", last):
            errors.append("Must request explicit approval")
        if re.search(r"(?i)(?:here is your final (?:video|render)|rendered successfully)", last):
            errors.append("Unapproved generation claim")
    if kind == "locked_shot_preservation":
        if not re.search(r"(?i)(?:preserv|unchanged|locked|do not change)", last):
            errors.append("Must preserve approved shots")
        if re.search(r"(?i)(?:regenerat|rewrit|replac).{0,45}(?:all shots|every shot|locked shot)", last):
            errors.append("Attempts broad locked-shot rewrite")
    if kind == "failed_shot_isolation":
        if not re.search(r"(?i)(?:only|just|isolat|affected|specific shot)", last):
            errors.append("Must isolate failed shot")
        if re.search(r"(?i)(?:regenerat|redo).{0,30}(?:entire film|all shots|whole movie)", last):
            errors.append("Recommends unnecessary global regeneration")
    if kind == "resume_from_checkpoint":
        if not re.search(r"(?i)(?:checkpoint|project bible|locked|next unfinished)", last):
            errors.append("Must use checkpoint state")
    if kind == "no_unseen_media_claim":
        if not re.search(r"(?i)(?:cannot|can't|not|need|upload|share).{0,70}(?:inspect|view|video|clip|media)|(?:video|clip|media).{0,70}(?:not provided|not shared|unavailable)", last):
            errors.append("Must disclose that media was not inspected")
        if re.search(r"(?i)(?:i watched|i inspected|i reviewed the video|i can see the clip)", last):
            errors.append("Claims unseen media inspection")
    if kind == "audio_only_repair":
        if not re.search(r"(?i)(?:audio|narration|voice)", last):
            errors.append("Must address audio")
        if not re.search(r"(?i)(?:preserv|unchanged|keep|lock)", last):
            errors.append("Must preserve approved picture")
    return errors

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--transcripts", type=Path, default=ROOT / "fixtures",
                        help="Directory of JSON transcript fixtures or captured real-agent transcripts")
    parser.add_argument("--strict", action="store_true", help="Reject missing provenance on real-agent transcripts")
    parser.add_argument("--json-out", type=Path, help="Write machine-readable report")
    args = parser.parse_args()
    files = sorted(args.transcripts.glob("*.json"))
    if not files:
        parser.error("No transcript JSON files found")
    results = []
    for path in files:
        try:
            case = json.loads(path.read_text(encoding="utf-8"))
            if not isinstance(case.get("messages"), list) or not isinstance(case.get("scenario"), str):
                raise ValueError("Requires scenario string and messages array")
            if any(not isinstance(m, dict) or m.get("role") not in {"user", "assistant", "system"} or not isinstance(m.get("content"), str) for m in case["messages"]):
                raise ValueError("Each message needs role and string content")
            errors = check(case)
            if args.strict and case.get("provenance") != "actual-agent-run":
                errors.append("Strict mode requires provenance=actual-agent-run")
            results.append({"file": path.name, "scenario": case["scenario"],
                            "provenance": case.get("provenance", "unspecified"),
                            "passed": not errors, "errors": errors})
        except (OSError, ValueError, KeyError, TypeError) as exc:
            results.append({"file": path.name, "passed": False, "errors": [str(exc)]})
    passed = sum(r["passed"] for r in results)
    report = {"suite": "behavior-transcript-heuristics", "model_executed": False,
              "total": len(results), "passed": passed, "failed": len(results)-passed,
              "results": results}
    if args.json_out:
        args.json_out.parent.mkdir(parents=True, exist_ok=True)
        args.json_out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    for result in results:
        print(f"{'PASS' if result['passed'] else 'FAIL'} {result['file']}: {', '.join(result['errors']) if result['errors'] else result.get('scenario')}")
    print(f"{passed}/{len(results)} passed; provenance: transcript fixtures or user-supplied captures; no model invoked")
    return 0 if passed == len(results) else 1

if __name__ == "__main__":
    sys.exit(main())

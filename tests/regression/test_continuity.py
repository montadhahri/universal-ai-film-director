#!/usr/bin/env python3
"""Validate example snapshot and check core continuity invariants (stdlib only).

JSON Schema structure is provided for external validators. This checker covers
a selected subset of semantic rules; it does not implement full JSON Schema.
"""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
STATES = {"DRAFT", "PROPOSED", "APPROVED", "LOCKED", "NEEDS_FIX"}
TRANSITIONS = {
    "DRAFT": {"PROPOSED"},
    "PROPOSED": {"DRAFT", "APPROVED"},
    "APPROVED": {"LOCKED", "NEEDS_FIX"},
    "LOCKED": {"NEEDS_FIX"},
    "NEEDS_FIX": {"PROPOSED"},
}

def validate(snapshot):
    errors = []
    if snapshot.get("schema_version") != "1.0":
        errors.append("Unsupported schema version")
    gates = snapshot.get("gates", {})
    if set(("script", "visual_bible", "storyboard")) - set(gates):
        errors.append("Missing approval gate")
    for name, gate in gates.items():
        if gate.get("approved") and not (gate.get("version") and gate.get("evidence")):
            errors.append("Approved gate lacks evidence: " + name)
    keys = set()
    shot_ids = set()
    for shot in snapshot.get("shots", []):
        key = (shot.get("id"), shot.get("revision"))
        if key in keys:
            errors.append("Duplicate shot revision")
        keys.add(key)
        shot_ids.add(shot.get("id"))
        if shot.get("state") not in STATES:
            errors.append("Invalid shot state")
        if shot.get("state") == "LOCKED" and not shot.get("approved_asset"):
            errors.append("Locked shot lacks approved asset reference")
    for shot in snapshot.get("shots", []):
        if shot.get("parent_revision") is not None:
            if (shot.get("id"), shot["parent_revision"]) not in keys:
                errors.append("Missing parent shot revision")
            if shot["parent_revision"] >= shot.get("revision", 0):
                errors.append("Parent revision must be older")
    anchor_ids = [a.get("id") for a in snapshot.get("continuity", [])]
    if len(anchor_ids) != len(set(anchor_ids)):
        errors.append("Duplicate continuity anchor ID")
    for shot in snapshot.get("shots", []):
        if any(ref not in anchor_ids for ref in shot.get("continuity_refs", [])):
            errors.append("Unknown continuity reference")
    return errors

class ContinuityTests(unittest.TestCase):
    def setUp(self):
        self.sample = json.loads((ROOT / "examples" / "continuity-checkpoint.json").read_text())
    def test_example_snapshot(self):
        self.assertEqual(validate(self.sample), [])
    def test_schema_is_valid_json(self):
        schema = json.loads((ROOT / "schemas" / "project-bible.schema.json").read_text())
        self.assertEqual(schema["$schema"], "https://json-schema.org/draft/2020-12/schema")
        self.assertEqual(schema["properties"]["schema_version"]["const"], "1.0")
    def test_all_states_exist_in_schema(self):
        schema = json.loads((ROOT / "schemas" / "project-bible.schema.json").read_text())
        self.assertEqual(set(schema["$defs"]["shot"]["properties"]["state"]["enum"]), STATES)
    def test_missing_gate_rejected(self):
        self.sample["gates"].pop("script")
        self.assertTrue(validate(self.sample))
    def test_approval_requires_evidence(self):
        self.sample["gates"]["script"]["evidence"] = ""
        self.assertTrue(validate(self.sample))
    def test_duplicate_revision_rejected(self):
        self.sample["shots"].append(dict(self.sample["shots"][0]))
        self.assertTrue(validate(self.sample))
    def test_invalid_parent_rejected(self):
        self.sample["shots"][1]["parent_revision"] = 7
        self.assertTrue(validate(self.sample))
    def test_missing_anchor_rejected(self):
        self.sample["shots"][0]["continuity_refs"] = ["MISSING"]
        self.assertTrue(validate(self.sample))
    def test_locked_asset_required(self):
        self.sample["shots"][0].pop("approved_asset")
        self.assertTrue(validate(self.sample))
    def test_locked_cannot_directly_become_draft(self):
        self.assertNotIn("DRAFT", TRANSITIONS["LOCKED"])
    def test_defect_reporting_does_not_unlock(self):
        self.assertIn("NEEDS_FIX", TRANSITIONS["LOCKED"])
        self.assertNotIn("PROPOSED", TRANSITIONS["LOCKED"])
    def test_skill_links_to_continuity(self):
        skill = (ROOT / "SKILL.md").read_text()
        self.assertIn("engine/continuity.md", skill)
        self.assertIn("engine/project-state.md", skill)

if __name__ == "__main__":
    unittest.main()

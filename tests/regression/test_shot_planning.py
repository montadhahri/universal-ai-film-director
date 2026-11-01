#!/usr/bin/env python3
"""Static and arithmetic regression checks for shot planning (stdlib only)."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def validate_timeline(shots, overlaps=(), target=None):
    """Return errors for sequential non-overlapping clips with explicit overlaps.

    For overlaps, each overlap is seconds shared by adjacent clips; shot
    start/end are absolute output-timeline times. No implicit gaps allowed.
    """
    errors = []
    if not shots:
        return ["No shots"]
    ids = set()
    for i, shot in enumerate(shots):
        if shot["id"] in ids:
            errors.append("Duplicate shot ID")
        ids.add(shot["id"])
        if shot["end_seconds"] <= shot["start_seconds"]:
            errors.append("Nonpositive shot duration")
        if i:
            prior = shots[i-1]
            overlap = prior["end_seconds"] - shot["start_seconds"]
            if overlap < 0:
                errors.append("Unplanned timeline gap")
            if overlap > 0 and overlap not in overlaps:
                errors.append("Undeclared transition overlap")
            if shot["start_seconds"] <= prior["start_seconds"]:
                errors.append("Shots out of chronological order")
    if shots[0]["start_seconds"] != 0:
        errors.append("Timeline must start at zero")
    if target is not None and shots[-1]["end_seconds"] != target:
        errors.append("Target duration mismatch")
    return errors

class ShotPlanningTests(unittest.TestCase):
    def setUp(self):
        self.example = json.loads((ROOT/"examples"/"shot-plan.json").read_text())
    def test_example(self):
        self.assertEqual(validate_timeline(self.example["shots"], target=12), [])
    def test_gap(self):
        self.example["shots"][1]["start_seconds"] = 6
        self.assertIn("Unplanned timeline gap", validate_timeline(self.example["shots"]))
    def test_undeclared_overlap(self):
        self.example["shots"][1]["start_seconds"] = 4
        self.assertIn("Undeclared transition overlap", validate_timeline(self.example["shots"]))
    def test_declared_overlap(self):
        self.example["shots"][1]["start_seconds"] = 4
        self.assertEqual(validate_timeline(self.example["shots"], overlaps=[1], target=12), [])
    def test_duration(self):
        self.assertIn("Target duration mismatch", validate_timeline(self.example["shots"], target=13))
    def test_duplicate_id(self):
        self.example["shots"][1]["id"] = "S01_SH01"
        self.assertIn("Duplicate shot ID", validate_timeline(self.example["shots"]))
    def test_nonpositive_duration(self):
        self.example["shots"][1]["end_seconds"] = 5
        self.assertIn("Nonpositive shot duration", validate_timeline(self.example["shots"]))
    def test_first_shot_starts_zero(self):
        self.example["shots"][0]["start_seconds"] = 1
        self.assertIn("Timeline must start at zero", validate_timeline(self.example["shots"]))
    def test_skill_references_planning(self):
        skill = (ROOT/"SKILL.md").read_text()
        self.assertIn("engine/shot-planning.md", skill)
        self.assertIn("templates/shot-plan.md", skill)
    def test_preserve_original_storyboard_template(self):
        storyboard = (ROOT/"templates"/"storyboard.md").read_text()
        self.assertIn("Shot ID", storyboard)
        self.assertIn("request approval", storyboard)

if __name__ == "__main__":
    unittest.main()

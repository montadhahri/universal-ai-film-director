#!/usr/bin/env python3
"""Stdlib audio cue timing checks; no audio waveform inspection."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def validate(plan):
    errors = []
    duration = plan.get("duration_seconds", 0)
    if duration <= 0:
        errors.append("Invalid film duration")
    ids = set()
    for track, cues in plan.get("tracks", {}).items():
        for cue in cues:
            if cue["id"] in ids:
                errors.append("Duplicate cue ID")
            ids.add(cue["id"])
            if cue["start"] < 0 or cue["end"] <= cue["start"]:
                errors.append("Invalid cue interval")
            if cue["end"] > duration:
                errors.append("Cue exceeds film duration")
        if track == "narration":
            ordered = sorted(cues, key=lambda x: x["start"])
            for prev, cur in zip(ordered, ordered[1:]):
                if cur["start"] < prev["end"]:
                    errors.append("Overlapping narration")
    return errors

def uncovered(cues, duration):
    """Intervals not covered by a single required continuous track."""
    gaps = []
    cursor = 0
    for cue in sorted(cues, key=lambda x: x["start"]):
        if cue["start"] > cursor:
            gaps.append((cursor, cue["start"]))
        cursor = max(cursor, cue["end"])
    if cursor < duration:
        gaps.append((cursor, duration))
    return gaps

class AudioTests(unittest.TestCase):
    def setUp(self):
        self.plan = json.loads((ROOT/"examples"/"audio-cue-sheet.json").read_text())
    def test_example(self):
        self.assertEqual(validate(self.plan), [])
    def test_music_coverage(self):
        self.assertEqual(uncovered(self.plan["tracks"]["music"], 12), [])
    def test_narration_gap_is_not_automatically_defect(self):
        self.assertEqual(uncovered(self.plan["tracks"]["narration"], 12), [(4, 7), (11, 12)])
        self.assertEqual(validate(self.plan), [])
    def test_duplicate_id(self):
        self.plan["tracks"]["music"][0]["id"] = "N01"
        self.assertIn("Duplicate cue ID", validate(self.plan))
    def test_truncated_end(self):
        self.plan["tracks"]["narration"][1]["end"] = 13
        self.assertIn("Cue exceeds film duration", validate(self.plan))
    def test_negative_start(self):
        self.plan["tracks"]["narration"][0]["start"] = -1
        self.assertIn("Invalid cue interval", validate(self.plan))
    def test_overlap(self):
        self.plan["tracks"]["narration"][1]["start"] = 3
        self.assertIn("Overlapping narration", validate(self.plan))
    def test_music_gap(self):
        self.plan["tracks"]["music"][0]["end"] = 9
        self.assertEqual(uncovered(self.plan["tracks"]["music"], 12), [(9, 12)])
    def test_skill_links(self):
        skill = (ROOT/"SKILL.md").read_text()
        self.assertIn("engine/audio.md", skill)
        self.assertIn("templates/audio-timeline.md", skill)
    def test_picture_preservation_instruction(self):
        self.assertIn("audio-only", (ROOT/"engine"/"audio.md").read_text())
        self.assertIn("locked picture", (ROOT/"engine"/"audio.md").read_text())

if __name__ == "__main__":
    unittest.main()

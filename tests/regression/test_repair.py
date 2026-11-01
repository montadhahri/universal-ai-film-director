#!/usr/bin/env python3
"""Static QA/repair-contract tests; no media inspection."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATEGORIES = {"VIDEO_FREEZE","REPEATED_FRAMES","MISSING_SHOT",
"DUPLICATE_SHOT","IDENTITY_DRIFT","LIGHTING_DRIFT",
"ACTION_DISCONTINUITY","BAD_TRANSITION","AUDIO_DROPOUT",
"REPEATED_NARRATION","AUDIO_DESYNC","MUSIC_GAP",
"TITLE_MISSING","WRONG_DURATION","UNKNOWN"}

def validate_ticket(ticket):
    errors = []
    if ticket.get("category") not in CATEGORIES:
        errors.append("Unknown defect category")
    if ticket.get("evidence_source") not in {
        "DIRECT_INSPECTION","USER_REPORT","DOCUMENT_CHECK","UNVERIFIED"
    }:
        errors.append("Unknown evidence source")
    if ticket.get("evidence_source") == "DIRECT_INSPECTION" and not ticket.get("actual_media_inspected"):
        errors.append("Inspection claim without inspected media")
    times = ticket.get("time_range_seconds", {})
    if times.get("start", -1) < 0 or times.get("end", 0) <= times.get("start", -1):
        errors.append("Invalid defect time range")
    proposal = ticket.get("proposal", {})
    if not set(proposal.get("affected_ids", [])).issubset(set(ticket.get("affected_ids", []))):
        errors.append("Repair scope exceeds defect scope")
    if set(proposal.get("affected_ids", [])) & set(proposal.get("preserve", [])):
        errors.append("Affected and preserved IDs overlap")
    if not set(ticket.get("locked_assets", [])).issubset(set(proposal.get("preserve", []))):
        errors.append("Locked assets not preserved")
    if proposal.get("status") == "APPLIED" and ticket.get("status") == "REPORTED":
        errors.append("Repair applied without authorization")
    return errors

class RepairTests(unittest.TestCase):
    def setUp(self):
        self.ticket = json.loads((ROOT/"examples"/"defect-report.json").read_text())
    def test_example(self):
        self.assertEqual(validate_ticket(self.ticket), [])
    def test_no_false_inspection(self):
        self.ticket["evidence_source"] = "DIRECT_INSPECTION"
        self.assertIn("Inspection claim without inspected media", validate_ticket(self.ticket))
    def test_invalid_category(self):
        self.ticket["category"] = "GUESS"
        self.assertIn("Unknown defect category", validate_ticket(self.ticket))
    def test_invalid_time(self):
        self.ticket["time_range_seconds"]["end"] = 32
        self.assertIn("Invalid defect time range", validate_ticket(self.ticket))
    def test_scope_broadening(self):
        self.ticket["proposal"]["affected_ids"].append("S01_SH09")
        self.assertIn("Repair scope exceeds defect scope", validate_ticket(self.ticket))
    def test_locked_preservation(self):
        self.ticket["proposal"]["preserve"].remove("S01_SH01")
        self.assertIn("Locked assets not preserved", validate_ticket(self.ticket))
    def test_affected_and_preserved_conflict(self):
        self.ticket["proposal"]["preserve"].append("N03")
        self.assertIn("Affected and preserved IDs overlap", validate_ticket(self.ticket))
    def test_unapproved_apply(self):
        self.ticket["proposal"]["status"] = "APPLIED"
        self.assertIn("Repair applied without authorization", validate_ticket(self.ticket))
    def test_skill_links(self):
        skill = (ROOT/"SKILL.md").read_text()
        self.assertIn("engine/repair.md", skill)
        self.assertIn("engine/quality-assurance.md", skill)
    def test_repair_template_preserves_rollback(self):
        doc = (ROOT/"templates"/"repair-plan.md").read_text()
        self.assertIn("Rollback", doc)
        self.assertIn("Immutable locked", doc)

if __name__ == "__main__":
    unittest.main()

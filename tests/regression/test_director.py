#!/usr/bin/env python3
"""Static integration checks for Phase 2 instruction links and decision contracts.

This verifies repository content, not an LLM's actual behavior.
"""
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class DirectorDocumentationTests(unittest.TestCase):
    def test_skill_routes_to_director(self):
        text = (ROOT / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("engine/director.md", text)
    def test_procedures_are_present(self):
        director = (ROOT / "engine/director.md").read_text(encoding="utf-8")
        for term in ("Project Bible", "locked", "approval", "one focused question", "PROPOSED", "conflict"):
            self.assertIn(term.lower(), director.lower())
    def test_questioning_contract(self):
        guide = (ROOT / "engine/discovery.md").read_text(encoding="utf-8")
        for term in ("exactly one question", "PROPOSED", "APPROVED", "runtime"):
            self.assertIn(term.lower(), guide.lower())
    def test_original_gates_still_present(self):
        text = (ROOT / "SKILL.md").read_text(encoding="utf-8")
        for term in ("Require explicit approval", "Approved shots are LOCKED", "Never invent"):
            self.assertIn(term, text)

if __name__ == "__main__":
    unittest.main()

#!/usr/bin/env python3
"""Phase 7 static contract tests; no real agent or video model is invoked."""
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

class CompatibilityTests(unittest.TestCase):
    def test_skill_links(self):
        text = (ROOT/"SKILL.md").read_text()
        self.assertIn("adapters/capability-matrix.md", text)
        self.assertIn("adapters/generator-selection.md", text)
    def test_capability_matrix_explicit_unknowns(self):
        text = (ROOT/"adapters"/"capability-matrix.md").read_text()
        self.assertIn("UNVERIFIED", text)
        self.assertIn("Google Flow / Veo", text)
    def test_tested_requires_execution(self):
        text = (ROOT/"adapters"/"capability-matrix.md").read_text()
        self.assertIn("actual execution", text)
    def test_flow_adapter_does_not_invent_ui(self):
        text = (ROOT/"adapters"/"google-flow-checklist.md").read_text()
        self.assertIn("made-up button names", text)
    def test_agent_matrix_disclaims_testing(self):
        text = (ROOT/"docs"/"agent-compatibility.md").read_text()
        self.assertIn("NOT TESTED", text)
        self.assertIn("ChatGPT web/app", text)
    def test_scenarios_exist(self):
        text = (ROOT/"tests"/"integration"/"README.md").read_text()
        for i in range(1, 8):
            self.assertIn(f"A{i:02d}", text)
    def test_original_adapters_preserved(self):
        for path in ("adapters/google-flow.md","adapters/other-generators.md"):
            self.assertTrue((ROOT/path).is_file())
    def test_no_automatic_render_claim(self):
        text = (ROOT/"adapters"/"generator-selection.md").read_text()
        self.assertIn("does\n**not** grant video generation", text)
    def test_private_install_warning(self):
        text = (ROOT/"docs"/"agent-compatibility.md").read_text()
        self.assertIn("private repository", text)

if __name__ == "__main__":
    unittest.main()

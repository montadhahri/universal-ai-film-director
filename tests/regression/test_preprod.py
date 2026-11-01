#!/usr/bin/env python3
"""Pre-production safety contract tests; no network calls."""
import json
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]

class PreprodTests(unittest.TestCase):
    def test_runner_does_not_publish(self):
        text = (ROOT/"tests"/"preprod"/"run_validation.py").read_text()
        self.assertIn('"production_go": False', text)
        self.assertIn('"agent_executed": False', text)
        self.assertIn('"video_generated": False', text)
    def test_runner_includes_existing_suite(self):
        text = (ROOT/"tests"/"preprod"/"run_validation.py").read_text()
        for name in ("check_preservation.py", "validate_repo.py", "evaluate.py",
                     "unittest", "compileall"):
            self.assertIn(name, text)
    def test_private_workflow_has_read_only_permissions(self):
        text = (ROOT/".github"/"workflows"/"preprod-validation.yml").read_text()
        self.assertIn("contents: read", text)
        self.assertIn("persist-credentials: false", text)
        self.assertNotIn("secrets.", text)
    def test_real_agent_template_is_unverified(self):
        data = json.loads((ROOT/"tests"/"integration"/"real-agent-result.template.json").read_text())
        self.assertEqual(data["status"], "NOT_RUN")
        self.assertFalse(data["production_go"])
        self.assertEqual(len(data["scenarios"]), 7)
        self.assertTrue(all(x["status"] == "NOT_RUN" for x in data["scenarios"]))
    def test_private_install_instructions(self):
        text = (ROOT/"docs"/"private-preprod-validation.md").read_text()
        self.assertIn("gh auth status", text)
        self.assertIn("Do **not** make the repository public", text)
    def test_release_checklist_retains_owner_approval(self):
        text = (ROOT/"docs"/"release-checklist.md").read_text()
        self.assertIn("explicit owner authorization", text)

if __name__ == "__main__":
    unittest.main()

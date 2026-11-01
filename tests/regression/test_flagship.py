#!/usr/bin/env python3
"""Static Phase 8 walkthrough checks; does not execute AI agents or video tools."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FILM = ROOT / "examples" / "flagship-film" / "README.md"

class FlagshipTests(unittest.TestCase):
    def test_example_exists(self):
        self.assertTrue(FILM.is_file())
    def test_all_five_shots(self):
        text = FILM.read_text(encoding="utf-8")
        for i in range(1, 6):
            self.assertIn(f"S{i:02d}", text)
    def test_timeline_exact(self):
        text = FILM.read_text(encoding="utf-8")
        ranges = re.findall(r"\| S\d\d \| (\d+)–(\d+)s \|", text)
        self.assertEqual([(int(a), int(b)) for a,b in ranges],
                         [(0,6),(6,12),(12,19),(19,26),(26,30)])
    def test_no_real_media_claim(self):
        self.assertIn("No media generated", FILM.read_text())
    def test_approval_is_simulated(self):
        self.assertIn("fictional", FILM.read_text().lower())
    def test_audio_only_repair(self):
        self.assertIn("audio-only", (ROOT/"examples"/"flagship-film"/"project-bible.md").read_text())
    def test_release_requires_approval(self):
        self.assertIn("explicit owner authorization", (ROOT/"docs"/"release-checklist.md").read_text())
    def test_installation_documented(self):
        self.assertIn("npx skills add", (ROOT/"docs"/"end-to-end-workflow.md").read_text())
    def test_roadmap_phase_merged_but_release_not_approved(self):
        roadmap = (ROOT/"docs"/"ROADMAP.md").read_text()
        phase8 = next(line for line in roadmap.splitlines()
                      if line.startswith("| 8 |"))
        self.assertIn("Merged", phase8)
        self.assertIn("release not approved", phase8)
        self.assertIn("Production GO is not authorized", roadmap)
    def test_changelog_updated(self):
        self.assertIn("Phase 8", (ROOT/"CHANGELOG.md").read_text())

if __name__ == "__main__":
    unittest.main()

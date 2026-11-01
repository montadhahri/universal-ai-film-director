#!/usr/bin/env python3
"""Unit tests for the existing behavior evaluator, including expected failures."""
import importlib.util
import unittest
from pathlib import Path

FILE = Path(__file__).resolve().parents[1] / "behavior" / "evaluate.py"
spec = importlib.util.spec_from_file_location("behavior_evaluator", FILE)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

def case(scenario, text, turns=None):
    return {"scenario": scenario, "messages": turns or [
        {"role": "user", "content": "Test scenario"},
        {"role": "assistant", "content": text}]}

class BehaviorRegressionTests(unittest.TestCase):
    def test_discovery_one_question_passes(self):
        self.assertEqual(mod.check(case("discovery_one_question", "What story should we tell?")), [])
    def test_discovery_multiple_questions_rejected(self):
        self.assertTrue(mod.check(case("discovery_one_question", "What genre? What duration?")))
    def test_script_approval_gate_rejected(self):
        self.assertTrue(mod.check(case("script_approval_gate", "Let's generate the video now.")))
    def test_storyboard_approval_gate_rejected(self):
        self.assertTrue(mod.check(case("storyboard_approval_gate", "Starting shots immediately.")))
    def test_locked_shot_mass_regeneration_rejected(self):
        self.assertTrue(mod.check(case("locked_shot_preservation", "I'll regenerate all shots including the locked shot.")))
    def test_failed_shot_mass_regeneration_rejected(self):
        self.assertTrue(mod.check(case("failed_shot_isolation", "I'll regenerate the entire film.")))
    def test_unseen_media_false_claim_rejected(self):
        self.assertTrue(mod.check(case("no_unseen_media_claim", "I watched the video and it looks good.")))
    def test_audio_only_repair_must_preserve_visuals(self):
        self.assertTrue(mod.check(case("audio_only_repair", "I'll redo the narration audio.")))
    def test_resume_requires_checkpoint(self):
        self.assertTrue(mod.check(case("resume_from_checkpoint", "Let's start from scratch.")))
    def test_multiturn_uses_last_assistant_response(self):
        turns = [
            {"role":"user","content":"I want a film"},
            {"role":"assistant","content":"What genre? What duration?"},
            {"role":"user","content":"A comedy. Please continue."},
            {"role":"assistant","content":"Who is the protagonist?"}]
        self.assertEqual(mod.check(case("discovery_one_question", "", turns)), [])
    def test_multiturn_final_answer_can_fail(self):
        turns = [
            {"role":"user","content":"I want a film"},
            {"role":"assistant","content":"Who is the protagonist?"},
            {"role":"user","content":"A cat"},
            {"role":"assistant","content":"Where? When?"}]
        self.assertTrue(mod.check(case("discovery_one_question", "", turns)))

if __name__ == "__main__":
    unittest.main(verbosity=2)

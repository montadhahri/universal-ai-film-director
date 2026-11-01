# Quality assurance — evidence-based review

This is an instruction-based QA procedure, not an automated video analyzer.
Only report defects as observed if the actual media or trustworthy user
observations were supplied. Distinguish user-reported, directly observed,
inferred and unverified evidence.

## Review order

1. Confirm the exact project, film version, asset IDs, timeline and approved
   storyboard/audio versions. Mark missing assets as NOT_INSPECTED.
2. Check full film coverage: expected beginning/end, every storyboard shot,
   visual timeline gaps/overlaps, titles and transitions.
3. Review picture: frozen/repeated frames, missing/duplicated shots, unnatural
   motion, continuity drift, text and composition defects.
4. Review sound: truncated/duplicated narration, unplanned silence, clipping,
   music transitions, speech/music balance and language consistency.
5. Check cross-cut consistency: action, chronology, identity, lighting,
   framing, timing and shot handoff.
6. Log each issue with time range, affected IDs, severity, evidence source,
   observation, possible causes (as hypotheses) and suggested smallest fix.
7. Propose fixes without changing anything. Seek scoped authorization if a
   locked asset itself must change.
8. After repair, re-review the affected interval, neighboring boundaries and
   the entire final export. Never mark PASS without verification.

## Defect taxonomy

- VIDEO_FREEZE, REPEATED_FRAMES, MISSING_SHOT, DUPLICATE_SHOT
- IDENTITY_DRIFT, LIGHTING_DRIFT, ACTION_DISCONTINUITY, BAD_TRANSITION
- AUDIO_DROPOUT, REPEATED_NARRATION, AUDIO_DESYNC, MUSIC_GAP
- TITLE_MISSING, WRONG_DURATION, UNKNOWN

Severity: BLOCKER (prevents delivery), MAJOR (material quality/meaning
problem), MINOR (noticeable but noncritical), INFO (needs clarification).
These are planning classifications, not automated detection results.

## Evidence hierarchy

- Direct inspection of supplied media with timecodes.
- User's concrete report with timecodes.
- Written cue sheet / storyboard discrepancy.
- Hypothesis based on typical model behavior.

Do not invent a root cause from a symptom. A reported frozen frame at 10s
does not prove an encoding fault or a generator defect.

## Completion criteria

No unresolved blocker, every required shot/cue accounted for, locked revisions
preserved, explicit user approval for replaced content, and full-export review.
If full media is unavailable, report **UNVERIFIED** rather than PASS.

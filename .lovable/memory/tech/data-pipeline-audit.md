---
name: Data Pipeline Tracking Audit
description: How student activity gets logged into student_activity_log + user_vocab_mastered, what modules instrument logStudentActivity, and what the RL dispatcher reads. Use this when adding new lessons/exams so RL stays accurate.
type: feature
---

# Data Pipeline Tracking — RL-ready audit (2026-06-15)

## Single entry point
All learning activity flows through `src/hooks/useActivityLogger.ts → logStudentActivity()`.
- Writes one row to `public.student_activity_log` with `{ user_id, activity_type, score, max_score, time_spent_seconds, domain, metadata }`.
- Domain auto-inferred from `activity_type` (chinese/programming/english). Use `domain` override for ambiguous cases (e.g. `hskk_speaking` → `chinese`).

## What the RL dispatcher actually consumes
`supabase/functions/rl-intervention-dispatcher/index.ts` reads the last 14 days of `student_activity_log` and computes:
- `avg_score = sum(score/max_score) / count(meaningful rows)` — only rows with `score != null && max_score > 0` count.
- `trend_delta = recentAvg - priorAvg` (split window 7d vs 7d).
- `total_activities` — rows excluding `session_heartbeat` and `daily_login`.
- `days_inactive` — days since last meaningful row.

If a module forgets to log, the dispatcher sees that student as inactive and triggers `struggle_intervention` — even if they studied hard. Always call `logStudentActivity()` at a real finish point.

## Modules currently instrumented (post-audit)
| Module | activity_type | score basis |
|---|---|---|
| IELTS Reading (exam + full test) | `ielts_reading` | correct/total questions |
| IELTS Listening Practice | `ielts_listening` | correct/total + band metadata |
| IELTS Writing | `ielts_writing` | Band 0-9 |
| IELTS Speaking | `ielts_speaking` | Band 0-9 |
| IELTS Master Quiz | `ielts_master_quiz` | correct/total |
| HSK Test Room | `hsk_test` | correct/total |
| HSKK Speaking Room | `hskk_speaking` | AI overall band 0-100 |
| TOEIC LR Exam | `toeic_lr_exam` | correct/total + scaled metadata |
| TOEIC SW Exam | `toeic_sw_exam` | completion rate + scaled metadata |
| THPT Exam | `thpt_exam` | 0-10 |
| Cambridge Mock | `cambridge_mock_exam` | percentage |
| SAT Mock | `sat_mock_exam` | percentage |
| PTE Speaking / Writing | `pte_*` | band/90 |
| Python Challenge | `python_challenge` | 10/10 on pass (gate is real) |
| Python Pathway Lesson | `python_pathway_lesson` | quiz correct/total |
| AI Academy Track | `ai_academy_track` | quiz correct/total |
| Conv English Lesson | `conv_english` | listening quiz correct/total OR 7/10 completion |
| Conv Chinese Lesson | `conv_chinese` | 7/10 completion + per-exercise scoring via `conv_chinese_exercise` |
| Language Lesson Quiz | `language_lesson_quiz` | correct/total |
| Assessment Tool | `{subject}_assessment` | score/10 |
| Placement Test | `placement_test` | total/100 + CEFR metadata |
| Vietnamese Dictation | `vietnamese_dictation` | correct/total |
| AI Speaking Coach | `speaking_coach_{lang}` | accuracy/10 |
| Vocab Mastery (any subject) | `vocab_mastered` | 1/1 + `metadata.subject` |

## Notification dedup rules
- **`assignment_notifications`** is realtime; `NotificationBell.tsx` auto-pulses on INSERT.
- **RL dispatcher**: dedups per `student_id::action` for 72h. Teacher gets ONE consolidated digest per run (was up to 17 pings — flood fixed).
- **Health check**: silent when all green. Only inserts when `failed > 0 || auto_recovered > 0 || warned > 0`, and dedups identical titles within 6h.

## Adding a new lesson/exam — checklist
1. Compute a real numeric `score` and `maxScore` at the submit/finish point.
2. Call `logStudentActivity({ activityType, activityId, score, maxScore, timeSpentSeconds, metadata })`.
3. Wrap the call in a `useRef` guard if it lives inside a `useEffect(submitted)` to fire once.
4. Use `domain` override only when the activity_type doesn't already hint at it (chinese/programming).
5. Never log `score: 10, max_score: 10` as a "completion ping" — use `7/10` + `metadata.completion: true` so RL doesn't false-positive a top student.

## Known gaps still not instrumented (low priority)
- SwedishTierView submodules (per-MCQ granular — not a clean finish point).
- VocabArena `GameEngine` (uses `game_scores` table separately).
- Reading/Grammar/Shadowing practice components without clear submit boundaries.
These don't break RL — they just don't contribute signal. Add when a stable finish point exists.

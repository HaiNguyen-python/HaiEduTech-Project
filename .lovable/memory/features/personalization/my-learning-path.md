---
name: My Learning Path (personalization)
description: /my-path personalized study dashboard + /my-path/start 4-step wizard, 13 subjects, weekly plan, readiness forecast, AI coach note
type: feature
---
- Routes: `/my-path` (dashboard) and `/my-path/start` (4-step wizard: subjects -> goals/target date -> hours+days -> starting level). Linked from the user menu and the mobile menu in `Navbar.tsx`.
- Data: tables `learning_paths` (one row per user+subject: goal, target level/date, hours_per_week, available_days, start/current level) and `learning_path_steps` (weekly checked-off tasks, keyed by week_start). Guests store paths in localStorage `haiedu-learning-paths-v1` and they are pushed to the cloud on first sign-in.
- `src/lib/personalization/subjectRegistry.ts`: 13 subjects (IELTS, Cambridge, TOEIC, SAT, PTE, THPT, English, Chinese, Japanese, Vietnamese, Finnish, Swedish, Programming) with level ladder, placement route, activity prefixes, vocab subjects and learning tracks.
- `src/lib/personalization/pathModel.ts`: pure math - `masteryPct`, `inferLevel`, `progressPerWeek`, `estimateReadiness`, `rankWeaknesses`, `buildWeeklyPlan` (budget = hours x 60, weakest skills first, due-review item first, repeats labelled "session 2").
- `useLearningSignals.ts` aggregates real signals: `student_activity_log` (last 120 days, ignores session_heartbeat/daily_login/page_view), `user_vocab_mastered`, `placement_test_results` (subject lives in `answers.__subject`; an English run seeds IELTS/Cambridge/TOEIC/SAT/PTE), `speaking_srs_items`, `vocab_srs_state.due_date`.
- `useLearningPath.ts` joins paths + signals into `PathView` and handles step check-off.
- AI: edge function `learning-path-coach` (Lovable AI, google/gemini-3.7-flash) writes a 4-6 sentence note; the client always has a rule-based fallback so numbers never depend on the AI call.
- Never invent numbers in the AI note; no em-dash in generated text.

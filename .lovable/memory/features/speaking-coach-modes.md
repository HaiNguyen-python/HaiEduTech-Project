---
name: Speaking Coach practice modes
description: Speaking Coach has 2 top-level tabs (Overview with pronunciation charts, Practice with 5 activities) shared across 6 languages
type: feature
---
Route `/speaking-coach/:language` (english, chinese, japanese, finnish, swedish, vietnamese).

- `src/pages/SpeakingCoachPage.tsx` has only two tabs: **Overview** (default) and **Practice**.
- Overview = `SpeakingOverview.tsx`: compact `PronunciationStatsPanel` (summary cards, Top 10 chart, 14-day trend; table + source pie behind a toggle), hero `PronunciationPlanPanel` (next step + targets; remaining roadmap collapsible), then the activity grid. Empty state when no stats yet.
- Practice = `ActivityPicker.tsx` chips + the 5 activities: Sentences (`AISpeakingCoach`, kept mounted so quiz state survives), Shadowing, Sound drill, Free Talk, Weak words.
- Shared infra: `useSpeechRecognizer.ts`, `src/lib/speakingModeShared.ts`, `speakingShadowScore.ts`, `speakingWeakWords.ts` (CLEAN_STREAK = 3), `speaking/pronunciationStats.ts`, `speaking/pronunciationPlan.ts`.
- Free Talk uses edge function `analyze-free-talk` (Gemini 2.5 Flash, verify_jwt false).
- No database tables; all progress in localStorage via `safeStorage` (namespace prefix `het:`).

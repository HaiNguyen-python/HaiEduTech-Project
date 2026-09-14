---
name: Speaking Coach practice modes
description: Speaking Coach has 2 top-level tabs (Overview with pronunciation charts, Practice with 5 activities) shared across 6 languages
type: feature
---
Route `/speaking-coach/:language` (english, chinese, japanese, finnish, swedish, vietnamese).

- `src/pages/SpeakingCoachPage.tsx` has only two tabs: **Overview** (default) and **Practice**.
- Overview = `SpeakingOverview.tsx`: compact `PronunciationStatsPanel` (summary cards, Top 10 chart, 14-day trend; table + source pie behind a toggle), hero `PronunciationPlanPanel` (next step + targets; remaining roadmap collapsible), then the activity grid. Empty state when no stats yet.
- Practice = `ActivityPicker.tsx` chips + the 6 activities: Sentences (`AISpeakingCoach`, kept mounted so quiz state survives), Shadowing, Sound drill, Free Talk, Weak words, Speak with Mr. Hai.
- Sentences UI: theme chibi illustration is capped at `max-w-[220px] sm:max-w-[260px]` so it does not dominate the screen; the Next button sits in the same action row as Record (Listen/Slow/Record/Next), with responsive `h-10 sm:h-12` sizing so Record and Next stay side-by-side on narrow phones.
- Shared infra: `useSpeechRecognizer.ts`, `src/lib/speakingModeShared.ts`, `speakingShadowScore.ts`, `speakingWeakWords.ts` (CLEAN_STREAK = 3), `speaking/pronunciationStats.ts`, `speaking/pronunciationPlan.ts`.
- Free Talk uses edge function `analyze-free-talk` (Gemini 2.5 Flash, verify_jwt false).
- No database tables; all progress in localStorage via `safeStorage` (namespace prefix `het:`).
- Speaking audio must play each model sentence exactly once: shared TTS deduplicates identical in-flight requests, stops other language engines before a new request, and listen controls use synchronous busy refs. Shadowing has no automatic multi-repeat control.
- Speak with Mr. Hai (`SpeakWithMrHaiMode.tsx`) is voice-only: no text input. Male voice via edge function `mr-hai-voice` (Lovable AI TTS `openai/gpt-4o-mini-tts`, voice `onyx`, verify_jwt false) wrapped by `src/lib/mrHaiTts.ts` with device-voice fallback; replies come from `speak-with-mr-hai` (`openai/gpt-6-astra`, Responses API streaming). Speech capture uses `useSpeechRecognizer` with `manualStopOnly` + `maxSeconds: 120` so long answers are never cut, then `cleanSpokenTranscript`. Conversation auto-scrolls via `StickToBottom` plus a "jump to latest" button.

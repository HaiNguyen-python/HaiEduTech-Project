---
name: Speaking Coach practice modes
description: Speaking Coach has 5 modes (Sentences, Shadowing, Sound drill, Free Talk, Weak words) shared across 6 languages
type: feature
---
Route `/speaking-coach/:language` (english, chinese, japanese, finnish, swedish, vietnamese).

- Mode switcher in `src/pages/SpeakingCoachPage.tsx`. Sentences = existing `AISpeakingCoach.tsx`, kept mounted (hidden) so quiz state survives switching.
- Shared infra: `src/hooks/useSpeechRecognizer.ts` (mic preflight, iOS single-shot, timer + hard ceiling, cleanup), `src/lib/speakingModeShared.ts` (per-language TTS dispatch, normalization, `compareSentence`, `matchCandidate`, `micErrorMessage`).
- Shadowing: `ShadowingMode.tsx` + `src/lib/speakingShadowScore.ts` (pace/WPM verdict vs model duration).
- Sound drill: `SoundDrillMode.tsx` + `src/data/speakingMinimalPairs.ts`, 10 items, recogniser picks which word of the pair it heard.
- Free Talk: `FreeTalkMode.tsx` + `src/data/speakingFreeTalkTopics.ts`, 30/60/90s, local heuristic report first, then edge function `analyze-free-talk` (Gemini 2.5 Flash, verify_jwt false).
- Weak words: any missed word is queued via `src/lib/speakingWeakWords.ts` (local, namespaced) and removed after `CLEAN_STREAK = 3` clean attempts. `WeakWordReview.tsx` shows due words with IPA + TTS.
- No database tables; all mode progress is local storage.

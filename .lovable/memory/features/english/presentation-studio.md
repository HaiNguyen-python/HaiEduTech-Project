---
name: Presentation & Public Speaking Studio
description: English module at /presentation-studio - 3-column studio with teleprompter, live telemetry, AI post-session report
type: feature
---
Route `/presentation-studio`, linked in the English dropdown under Speaking Coach.

- Layout: 3 columns (25% scenario setup / 50% webcam + teleprompter stage / 25% live telemetry), stacks on mobile.
- Data + heuristics: `src/lib/presentationStudio.ts` (27 scenarios grouped by `SCENARIO_GROUPS`; filler patterns, signposting phrases, Band 8.0+ vocab, weak-to-strong upgrades, local scoring `analyzeSession`, teleprompter stress-word detection, `STRUCTURE_STEPS` / `evaluateStructure`).
- Live stage: getUserMedia webcam, AnalyserNode waveform canvas, eye-contact crosshair, bottom-up auto-scrolling teleprompter (full-width row, S/M/L/XL font + narrow/medium/wide width, focus band, 2.5s hold then 2s ease-in, default 14 px/s), Web Speech API continuous transcription.
- Telemetry: pacing meter, filler counters, eye-contact %, session timer, word + signpost counts, body language card (`src/lib/speakingBodyLanguage.ts`), structure checklist, target-duration progress.
- Progress chart: `src/components/presentation/PresentationProgressChart.tsx` sits above Session history. KPIs (sessions, best, average, change vs first session), score+WPM composed chart with 120-150 WPM band and 80-point reference line, fillers bars + eye-contact line, range filter (5/10/all). Data comes from localStorage `presentation-session-history` (last 30 sessions), bilingual, CSV export stays on the history card.
- Report modal: overall 0-100, 5-axis radar, WPM line chart, colour-coded clickable transcript, strengths/fixes, 2 AI counter-questions with 30s record button.
- AI: edge function `analyze-presentation` (Gemini 2.5 Flash, verify_jwt = false) receives transcript plus `bodyLanguage`, `structureDone`, `structureMissing`; client skips the call under 12 words and falls back to the local heuristic report.
- Phrase bank: `src/data/presentationPhrases.ts` (167 bilingual patterns across 11 stages: opening, purpose, signposting, data, emphasis, questions, closing, story, audience, team, recovery) rendered by `src/components/presentation/PresentationPhraseBank.tsx` below the workspace. Stage chips, search, normal/slow TTS + Listen to all, insert-into-script, recall drill (score/streak in `safeStorage`), and "Say it again" per-sentence speaking practice via `useSpeechRecognizer` with word-overlap accuracy, missing-word list and best score per phrase. Used phrases are ticked via `findUsedPhrases` in `src/lib/presentationStudio.ts`.

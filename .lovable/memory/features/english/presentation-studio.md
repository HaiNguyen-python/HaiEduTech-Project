---
name: Presentation & Public Speaking Studio
description: English module at /presentation-studio - 3-column studio with teleprompter, live telemetry, AI post-session report
type: feature
---
Route `/presentation-studio`, linked in the English dropdown under Speaking Coach.

- Layout: 3 columns (25% scenario setup / 50% webcam + teleprompter stage / 25% live telemetry), stacks on mobile.
- Data + heuristics: `src/lib/presentationStudio.ts` (5 scenarios: Tech Startup Pitch, Academic Thesis Defence, IELTS Speaking Part 3, Executive Business Update, Conference Lightning Talk; filler patterns, signposting phrases, Band 8.0+ vocab, weak-to-strong upgrades, local scoring `analyzeSession`, teleprompter stress-word detection).
- Live stage: getUserMedia webcam, AnalyserNode waveform canvas, eye-contact crosshair with centre-frame steadiness heuristic, auto-scrolling teleprompter (Framer Motion / rAF) with content words highlighted in accent gold, Web Speech API continuous transcription with auto restart.
- Telemetry: pacing meter (red <100 / green 120-150 / yellow >160 WPM), filler counter badges, eye-contact %, session timer, word + signpost counts.
- Report modal: overall 0-100, 5-axis radar (Clarity, Fluency, Persuasiveness, Pacing, Signposting), WPM line chart with 120-150 reference band, colour-coded clickable transcript (red filler / green signpost / purple advanced, click = TTS), top 3 strengths, top 2 fixes, 2 AI counter-questions with a 30s record button.
- AI: edge function `analyze-presentation` (Gemini 2.5 Flash, verify_jwt = false) returns strengths/fixes/qaQuestions/modelUpgrade/summary; local heuristic report is always shown first as fallback.

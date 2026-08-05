---
name: Cambridge Speaking Practice
description: Cambridge Starters-PET speaking module - 51 tasks, AI exam pictures, recorder hardening, star grading
type: feature
---
Route `/cambridge-speaking-practice` (menu Cambridge Starters -> PET + button on Cambridge Lectures).

- Task bank: `src/data/cambridgeSpeakingTasks.ts` (core) + `cambridgeSpeakingTasksExpansion.ts` (extra). 10+ tasks per level across Starters/Movers/Flyers/KET/PET, real exam part formats with examiner follow-ups, useful language and model answers.
- Exam pictures: generated assets in `src/assets/cambridge-speaking/`, mapped by task id in `src/data/cambridgeSpeakingImages.ts`. Picture-based parts (scene cards, spot-the-differences, picture stories, photo discussions, PET long turns) must always show an image. Images contain no text.
- Grading: edge function `grade-cambridge-speaking` (Gemini 2.5 Flash), 4 criteria x 1-5 stars + heuristic fallback.
- Recorder rules: MediaRecorder mimeType detection (Safari mp4), `start(1000)` timeslice, AnalyserNode mic-level meter with "speak louder" warning, 180s auto-stop, recogniser restart preserves earlier text via a session-base ref, interim text merged on stop, no-speech/aborted errors ignored, full cleanup of stream/timer/AudioContext on unmount.

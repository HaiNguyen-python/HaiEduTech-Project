

## Plan: Fix Listening Answer Persistence & Speaking Coach Early Grading

### Issue 1: Listening answers auto-filled on new topic
**Root cause**: When navigating between lessons, the `listeningAnswers` state is never reset. The state from the previous lesson carries over because only `isCompleted` and `listeningRevealed` persist — but `listeningAnswers` keeps old values.

**Fix** in `src/pages/ConversationalLessonView.tsx`:
- Add a `useEffect` that resets `listeningAnswers` to `{}` and `listeningRevealed` to `false` whenever `lessonId` changes.

### Issue 2: Speaking Coach grades before user finishes speaking
**Root cause**: In `AISpeakingCoach.tsx`, speech recognition uses `continuous = false`. This means the browser's speech recognition automatically stops after detecting a brief silence — which triggers `recognition.onend`, sets `isRecording = false`, and the scoring `useEffect` fires immediately.

**Fix** in `src/components/AISpeakingCoach.tsx`:
- Change `recognition.continuous = false` → `recognition.continuous = true` so recognition keeps listening until the user explicitly presses the Stop button.
- Update `recognition.onresult` to accumulate final transcripts properly across multiple result events (since continuous mode emits multiple final results).
- Ensure grading only happens when the user explicitly clicks Stop — not when recognition auto-ends. Add a `manualStopRef` flag: set it `true` in `stopRecognition`, check it in the scoring `useEffect`, and reset it after processing.

### Files to modify
1. `src/pages/ConversationalLessonView.tsx` — reset listening state on lesson change
2. `src/components/AISpeakingCoach.tsx` — continuous mode + manual stop guard


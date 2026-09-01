# Camera mirror for IELTS Speaking recording

Add an optional webcam view to the IELTS Speaking recording panel, like the one in Presentation & Public Speaking Studio, so learners can watch their facial expression and body language while answering.

## What the learner sees

- A "Camera" toggle above the Start Recording button (off by default, so nothing changes for learners who only want audio).
- When on, a 16:9 mirrored self-view appears right above the timer, with a small red REC dot while recording.
- An eye-contact indicator (same centre-frame heuristic as the Presentation Studio): a crosshair overlay plus a live percentage, giving feedback on whether they keep looking at the examiner/camera.
- Camera preference is remembered in localStorage, and the camera light turns off whenever the user toggles it off, leaves the page, or switches question/part.

## Behaviour notes

- Camera is preview only: the graded recording stays audio-only, so grading, credits and stored results are unchanged.
- If the browser blocks the camera (permission denied or preview iframe), a short inline message appears under the toggle and audio recording still works normally.

## Technical outline

- New component `src/components/speaking/SpeakingCameraPanel.tsx`: own `getUserMedia({ video: { facingMode: "user" } })` stream, `<video muted playsInline>` with `scale-x-[-1]` mirror, canvas-sampled eye-contact heuristic ported from `src/pages/PresentationStudio.tsx` (lines ~109-170), full track teardown on unmount/disable.
- Mount it in `src/pages/SpeakingPractice.tsx` inside the recording Card (above the timer at line ~1019), with a toggle button and `isRecording` passed in for the REC badge.
- No changes to `startRecording`/`stopRecording` audio pipeline or the grading edge function.

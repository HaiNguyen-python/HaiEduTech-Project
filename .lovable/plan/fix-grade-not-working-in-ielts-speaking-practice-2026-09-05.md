# Fix "Grade" not working in IELTS Speaking Practice

## What students are hitting

On the IELTS Speaking page the Grade button only appears after the browser hands back a finished recording. On Safari/iOS and in some embedded views the recorder never produces that recording, so either no Grade button shows or pressing it does nothing at all - with no message explaining why. The Cambridge Speaking page was already hardened for this; the IELTS one was not.

Confirmed by reading the code:
- Recording starts with no container/format check and the saved clip is always labelled `audio/webm`; Safari refuses that combination.
- If the microphone or recorder is unavailable the page only shows a plain browser alert about microphone access, and the Grade button never appears.
- The grading handler quietly stops when no recording is attached (`if (!audioBlob) return`) - a silent no-op, exactly the "press and nothing happens" report.
- No data is requested during recording, so a very short answer can end up as an empty clip that still gets sent for grading.
- The scoring service itself is reachable and already falls back to a quick score, so the problem is on the page, not the grader.

## What will change (IELTS Speaking Practice page only)

1. Pick a recording format the current browser actually supports (with Safari mp4 fallback) and label the saved clip with the real format.
2. Ask the recorder for data every second so short answers still produce a usable clip.
3. Allow grading from the live transcript even when the audio clip is missing or empty, so the button always does something useful.
4. Replace the silent no-op with a clear on-screen message when there is nothing to grade yet, plus a short "please wait, saving your recording" state right after Stop.
5. Show a clear inline notice when the browser cannot record at all (unsupported browser, blocked microphone, no microphone, page embedded), with what to do next - same wording style as Cambridge Speaking.
6. Make the grading request more forgiving: longer wait before falling back, one automatic retry, and a visible note when a quick fallback score was used instead of the full examiner score.
7. Always clear the "Grading..." spinner, even if something unexpected fails.

Wording stays bilingual (Vietnamese / English). Scores, band logic, SRS collection and history charts are unchanged.

## Technical notes

- Files: `src/pages/SpeakingPractice.tsx` (recorder setup, `startRecording`, `stopRecording`, `handleGrade`, button block around lines 1130-1180). Reuse the MIME-detection and error-state pattern already proven in `src/pages/CambridgeSpeakingPractice.tsx`.
- `grade-speaking` edge function needs no change: it already returns HTTP 200 with a heuristic score on timeout, upstream error or parse failure, and `verify_jwt = false`.
- Client timeout raised from 16s to ~25s with one retry, so the server's own 14s fallback is what wins instead of the client aborting first.
- Verification: typecheck, then drive the page in a headless browser to confirm the Grade button reacts, the no-recording message appears, and a graded result renders.

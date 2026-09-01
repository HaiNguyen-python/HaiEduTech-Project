# Auto camera + facial confidence analysis in IELTS Speaking

## Goal
When the student presses Start Recording, the camera turns on automatically (no manual toggle needed), and the system analyses facial expression to estimate confidence and naturalness while speaking.

## What changes for the student
1. Press "Start Recording" -> the mirrored self-view appears instantly, with the REC badge.
2. Live coaching strip under the video while speaking: eye contact %, framing/steadiness, smile/expression openness, head movement.
3. When recording stops, a short "Body language & confidence" card appears: Confidence score (0-100), Naturalness score (0-100), and 2-3 bilingual tips (VI/EN), e.g. "Giữ mắt hướng vào ống kính lâu hơn - Hold your gaze on the lens longer".
4. Camera can still be turned off manually; that choice is remembered, and if turned off the audio recording and grading work exactly as today.
5. If camera permission is denied or blocked in the preview frame, an inline message shows and recording continues audio-only.

## Technical notes
- `SpeakingCameraPanel.tsx`: add an `autoStart` behaviour - when `isRecording` flips true and the user has not explicitly disabled the camera, start the stream automatically; stop it shortly after recording ends (keep preview until the student navigates or turns it off).
- localStorage keeps an explicit "camera off" opt-out rather than an opt-in flag.
- Expression analysis runs fully client-side on a 64x48 canvas sample every ~500 ms during recording, no video is uploaded or stored:
  - eye contact: existing centre-frame steadiness heuristic
  - framing: face-region brightness/edge presence in the centre box (detects leaning out of frame)
  - movement: frame-to-frame delta across the whole sample (too still = stiff, too jumpy = nervous)
  - expression openness: brightness/contrast variance in the lower-centre (mouth) region as a smile/animation proxy
- Aggregate the samples into Confidence = f(eye contact, framing, moderate movement) and Naturalness = f(expression variation, movement band), each 0-100 with clear thresholds; expose the summary via an `onSessionSummary` callback.
- New small module `src/lib/speakingBodyLanguage.ts` for the scoring maths and the bilingual tip rules, so the panel stays presentational.
- `SpeakingPractice.tsx`: no changes to the audio pipeline or AI grading - only render the summary card returned by the panel below the recording controls.
- Full teardown on unmount, question change, and camera off remains as today.

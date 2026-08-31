# English Placement Test: content audit + natural audio

Two goals: make the test genuinely separate students by level so teachers can group them into classes, and replace the robotic browser voice with natural human-like audio.

## Part 1 - Test content and placement quality

Current state (verified): the English bank has 40 fixed items (Listening 12, Reading 16, Writing 7, Speaking 5), ceiling B2. Reading A1-A2 items are bare grammar gaps with no context. Writing and speaking are scored as "answered = correct", so the total score is inflated and the CEFR band is a simple average of 4 skill percentages.

Changes:

1. Rebalance the bank per level so each band has enough items to measure reliably: A1 6, A2 8, B1 10, B2 10, C1 6 (adds a C1 tier for strong IELTS 7.0+ students, so top students no longer all cap out at B2).
2. Rewrite weak items: give every A1-A2 reading item a short real context (a note, a message, a sign) instead of an isolated gap; remove items where two options are both defensible; keep one clear tested point per item.
3. Level-ordered delivery with an early-exit rule: the test runs A1 → C1 in blocks; if a student misses most of a block, the remaining higher blocks are skipped and marked as not reached. This shortens the test for beginners and stops guessing from lifting the band.
4. Real scoring for productive skills:
   - Writing: rubric scoring (task completion, range, accuracy, length) done server-side by AI, returning 0-100 per essay plus short feedback.
   - Speaking: the recording is transcribed and scored on fluency, vocabulary range, grammar and task response, 0-100.
   - The score is band-weighted, so correct C1 items count more than correct A1 items.
5. Placement output for the teacher: instead of only a CEFR letter, each result gets a recommended class (e.g. Foundation, Pre-Intermediate, Intermediate, Upper-Intermediate, IELTS 6.0+), a confidence note, the per-band hit rate, and the 2-3 weakest skill areas to work on. Shown on the student result screen and in the admin placement results table, with a per-band breakdown and a class-grouping view sorted by recommended class.
6. The same level-block and weighted-scoring logic is applied to the Chinese, Vietnamese and Finnish banks so all placement tests stay consistent (their item counts stay as they are).

## Part 2 - Natural audio

Current state (verified): the placement test uses the browser's built-in `speechSynthesis` for English and Chinese, which is what sounds robotic.

Changes:

1. Route all placement listening and speaking prompts through the existing natural-voice text-to-speech backend (the same one used for dialogue playback), with a per-language voice profile: English, Chinese, Vietnamese, Finnish.
2. Dialogue items (waiter/customer, teacher/student, announcements) play as turns with two different voices and short pauses, and speaker labels are never read out loud.
3. Playback UI: loading / playing / error states, a slower replay button, and a replay counter so listening items can be limited to two plays like a real exam.
4. Fall back to the browser voice only if the natural voice service fails, with a small note so students know why the voice changed.
5. Audio for every listening and read-aloud item is verified by playing it end to end, so nothing is silent or cut off.

## Technical notes

- Data: rework `src/data/placementTest.ts` (bands, contexts, C1 tier) and add a shared `src/lib/placement/placementModel.ts` for band weighting, early exit, class recommendation.
- Page: `src/pages/PlacementTest.tsx` - replace the local `speak()` helper with a new `src/lib/placementTts.ts` wrapper over the `dialog-tts` edge function plus existing per-language TTS libs; add replay limits and audio state UI.
- Grading: new edge function `grade-placement` (Lovable AI) for writing rubric + speaking transcription and scoring; results merged into the existing `placement_test_results` row (extra fields stored in the existing JSON columns, no schema change needed unless we add explicit columns for the recommended class - a small migration adds `recommended_class` and `band_breakdown`).
- Admin: extend `src/pages/AdminPlacementResults.tsx` with recommended class, band breakdown and grouping.

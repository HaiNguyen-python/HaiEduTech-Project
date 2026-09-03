# Speaking Coach: new practice features

Today the Speaking Coach only does one thing: read a given sentence, get per-word accuracy, IPA and badges. The plan adds four practice modes so students train more than sentence repetition, in the same page and with the same mic pipeline.

## 1. Shadowing mode (imitate the model)
- Play the model sentence, then the student speaks along/right after.
- Score two things: word accuracy (existing) plus timing - how close the student's speaking duration is to the model duration (too fast / too slow / good).
- Slow (0.7x) and normal playback, plus loop-3-times button.
- Output: "Pace" bar next to the accuracy bar with a bilingual tip.

## 2. Minimal-pair sound drill
- Per language, a curated list of confusing sound pairs (English: ship/sheep, thin/tin, light/right; Chinese: shi/si, zhi/zi + tones; Finnish: tuli/tulli, y/u; Swedish: sj-/tj-, u/y; Japanese: long vs short vowels; Vietnamese: tones).
- Student is shown a pair, must say the highlighted word; the recogniser result decides which word was heard.
- 10-item drill with score, weak sounds recorded and repeated at the end.

## 3. Free Talk (open answer with AI feedback)
- Topic prompt per level (A1-C1), 30/60/90 second timer, live transcript.
- After stopping, an AI report: fluency (words per minute), filler words, vocabulary range, grammar fixes, one upgraded model answer, and 2 follow-up questions to answer.
- Local heuristic report always shows first, AI report replaces it when it arrives (same pattern as Presentation Studio).

## 4. Weak-word review (speaking SRS)
- Every word scored wrong in any mode is stored locally per language and scheduled for review.
- "Review my weak words" panel: shows due words with IPA, listen button and a say-it-again check; a word leaves the queue after 3 clean attempts.
- Small "N words to review" pill in the header so students come back.

## Supporting changes
- Mode switcher at the top of the Speaking Coach (Sentences / Shadowing / Sound drill / Free Talk / Review), sentence mode stays the default.
- Session summary card at the end of any mode: items done, average accuracy, best streak, weak sounds/words.
- All new activity logs to the teacher dashboard through the existing activity logger, so speaking practice frequency still shows in admin.

## Technical notes
- New data: `src/data/speakingMinimalPairs.ts` (per language pairs) and `src/data/speakingFreeTalkTopics.ts` (topics by level). No database tables.
- New logic: `src/lib/speakingShadowScore.ts` (duration/pace scoring), `src/lib/speakingWeakWords.ts` (local queue, namespaced per language, reuses the existing `srsEngine` scheduling), reuse `questionQuality` normalisation for the sound drill decision.
- New AI: edge function `analyze-free-talk` (Gemini 2.5 Flash, verify_jwt false) returning fluency/grammar/vocab/model answer/follow-ups, with a local fallback report.
- `AISpeakingCoach.tsx` is split so each mode is its own component under `src/components/speaking/`, sharing one recogniser hook (`useSpeechRecognizer`) extracted from the current logic - keeps mic cleanup, iOS single-shot handling and the mic-level meter in one place.
- Works for all six languages already supported (English, Chinese, Japanese, Finnish, Swedish, Vietnamese); minimal pairs and topics are per language, modes with no data are hidden.

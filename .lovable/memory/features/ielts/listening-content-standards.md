---
name: IELTS Listening content standards
description: Rules for the IELTS Listening bank - runtime upgrader, no answer-leak phrases, word-count targets, key balance
type: feature
---
- 120 drills (30 per section) feed 30 full tests of 40 questions. Set IDs must stay stable.
- `src/data/ieltsListeningDifficultyUpgrade.ts` builds the spoken recording at runtime from authored questions; it is deterministic per set id.
- Transcripts must never say a detail is the answer ("the correct answer", "record that as the final...", "Topic focus:", coaching lines). Distractors are spoken as genuine alternatives only.
- No long line may repeat verbatim inside a transcript; openings vary per set.
- Word targets: S1 450-900, S2 650-1100, S3/S4 750-1200.
- MCQ keys are rotated round-robin across the bank; matching letters are permuted per set to balance A/B/C.
- Fill-in sets always carry a "NO MORE THAN TWO WORDS AND/OR A NUMBER" instruction plus maxWords.
- `node scripts/validate-listening.mjs` must pass with "no issues" after any Listening change.

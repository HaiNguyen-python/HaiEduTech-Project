---
name: Vocabulary memory brain data flow and science
description: Every study flow writes reviews to user_vocab_mastered; brain colours follow retention, not raw days
type: feature
---

- `user_vocab_mastered` has `review_count`, `last_interval_days`, `lapse_count` (default 0) and `ease` (default 2.5).
- `src/lib/vocabReview.ts` is the single writer. `recordVocabReviewTracked(subject, words, { correct, grade })`: wrong / "forgot" bumps `lapse_count`, ease moves -0.25 forgot, -0.12 hard, +0.1 easy, +0.02 good, clamped 1.3-3.0. A forgotten word is NOT added to today's reviewed list.
- Writers: Smart Review queue, IELTS Practice, starred flashcards, Vocab Arena, subject quizzes, plus (new) Word Quest (`subject` prop; one review per finished 5-task word loop, grade "hard" if the learner slipped) and Daily Word Mission (`grade()`; `reviewSubject` prop overrides the SRS namespace - Finnish Vocabulary uses srs `finnish` but mastery `finnish-vocab`).
- `vocabBrainModel.ts`: stability = `2.2 * (1.3 + 0.22*ease)^(effectiveReps-1) * (1 + min(gap,30)/12) / (1 + 0.35*lapses)`; same-day reviews only earn 40% of the exponent (cramming penalty); `effectiveReps = reps - lapses`.
- Tiers come from retention (`tierForStrength`: .85 / .65 / .45 / .25), not day age. `tierForDays` is legacy only. 3D/2D renderers use `tierForNeuron`.
- Brain panels: IELTS, HSK, Finnish, Swedish, Japanese, plus TOEIC, SAT, Vietnamese and Cambridge YLE.
- Guests see a note that starred-offline words count as learned today.

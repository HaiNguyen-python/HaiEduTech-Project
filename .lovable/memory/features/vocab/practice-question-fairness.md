---
name: Vocabulary practice question fairness
description: Rules that keep generated vocabulary questions from giving the answer away, plus the new question types
type: feature
---

`src/lib/vocab/questionQuality.ts` is the shared source of truth (reusable by HSK / Finnish / Swedish / Vietnamese vocabulary pages):
- `pickSmartDistractors` - distractors must match part of speech first, then topic, then level, then similar length.
- `maskWord` - masks the target word (and inflections) in examples/collocations. If one option has a blank, ALL options must have a blank.
- `isQuestionFair` - rejects duplicated options, blank-only-on-answer, and length outliers; the generator then falls back to a meaning question.
- `gradeWrittenDefinition` - keyword-overlap grading for typed definitions.

IELTS practice (`src/pages/IeltsVocabulary.tsx`) rules:
- Never print the word's own example while the learner is answering; it appears in the post-answer "why" panel with definition + collocations.
- Odd-one-out shuffles the prompt list (the odd word used to be last) and shows no topic hint.
- Unscramble is a typing question now, not multiple choice.
- New types: wordFamily, register, paraGap (3 gaps + word bank), collocationMatch, defineWrite. Focus modes: all / choice / typing / audio / speed (60s round with combo counter).

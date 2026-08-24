# IELTS Reading: difficulty audit + 8 new tests (22 -> 30)

## Current state (verified by audit script)
- 37 individual passages, 22 full tests (60 min, 3 passages each).
- Question mix is now varied: matching-headings 192, multiple-choice 145, fill-blank 104, tfng 19, ynng 11, matching-features 8, mcq-multi 5, matching-endings 4, summary-completion 1.
- Structural issues: 0. But 233 "info" warnings remain: many older passages are far below real-exam length (shortest: 493-518 words vs Cambridge 700-950) and many explanations are thin.
- Heading answer spread is healthy (top label i = 10.4%), so the old "answers in sequence" complaint is largely fixed for headings but the legacy easy passages still read closer to Passage 1 level.

## Goal
1. Bring every existing passage up to real-exam difficulty and length.
2. Add 8 new full tests so the library is an even 30.
3. Re-audit every question for wrong keys, ambiguity and mis-typed tasks.

## Wave 1 - Fix the legacy easy passages
- Extend the 14 shortest passages (rx-2, rx-cam-20 to rx-cam-25 and the other sub-650-word items) to 700+ words by adding genuinely academic paragraphs: mechanism, counter-argument, quantified evidence, researcher attribution.
- Re-word question stems so answers require paraphrase recognition, not keyword spotting (synonym substitution, nominalisation).
- Break sequential answer order: convert 2-3 questions per legacy exam into TFNG/YNNG or matching-features so the answer positions no longer march down the passage.
- Fill every thin explanation with an evidence quote plus why the distractors fail.

## Wave 2 - 12 new Hard passages
Write 12 new 800-950-word Passage-2/3 level texts (new file `ieltsFullReadingExamsHard3.ts` + `Hard4.ts`), each 13-14 questions, each with at least three heading distractors and a mixed task set including TFNG/YNNG, matching features, sentence endings and summary completion with a word bank. Topics (academic, non-overlapping with existing set):
memory consolidation in sleep; the collapse of the Sumerian irrigation economy; urban heat islands; the ethics of de-extinction; how spices reshaped trade law; the physics of glacier flow; the invention of double-entry bookkeeping; language death and revitalisation; antibiotic resistance economics; the archaeology of ancient concrete; bird migration navigation; the history of standard time.

## Wave 3 - 8 new full tests
Add ft-23 to ft-30 in `ieltsFullTests.ts`, each built as real IELTS: Passage 1 easier-medium, Passage 2 medium, Passage 3 Hard, using the new Hard passages so no test repeats a passage already used in another new test.

## Wave 4 - Full question audit
- Extend `scripts/audit_ielts_reading.ts` with stricter gates: passage min 700 words for all levels, explanation min 60 chars, answer-string must appear verbatim (or as a clear paraphrase target) in the passage for fill-blank/summary types, TFNG sets must contain at least one of each of True/False/Not Given, and no answer-position monotonic run longer than 4.
- Fix everything the stricter audit flags, then re-run until issues = 0 and info is empty.
- Spot-check three tests in the browser (question rendering, submit, review explanations, evidence highlighting).

## Technical notes
- Data files: `src/data/ieltsFullReadingExams*.ts`, `src/data/ieltsFullTests.ts`, extensions in `ieltsReadingPassageExtensions.ts` / `ieltsReadingQuestionExtensions.ts`.
- Grading stays in `src/lib/ieltsReadingAnswer.ts`; randomisation in `src/lib/ieltsReadingShuffle.ts`. New exam arrays must be registered in `src/pages/IeltsReadingPractice.tsx` and in the audit script.
- No em-dashes anywhere in content.

Note: "30 de" is read here as 30 full 60-minute tests (22 today, +8). If you meant 30 single passages instead, say so and I will re-scope.

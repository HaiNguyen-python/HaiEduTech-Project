# Expand TOEIC, PTE and SAT lessons + exercises

Goal: balanced content growth across the three exam tracks, all new material in English only, every new lesson carrying at least 5 practice/quiz questions.

## What exists today

- TOEIC: 74 lectures (317 quiz questions), 26 curriculum lessons, 800 vocabulary words, 34 Listening/Reading mock exams, 5 Speaking/Writing exams.
- SAT: 48 modules / 152 lessons (508 quiz questions), 44 mock exams, 999 vocabulary words.
- PTE: 432 practice tasks across all four skills, 155 vocabulary words, 3 mock tests - but **no lesson/strategy curriculum at all**, only question banks.

Two real gaps found:
- The PTE hub has cards linking to Speaking, Writing, Listening and Vocabulary, but no link to the existing Reading page - students cannot reach it from the hub.
- `/pte/:skill` still falls through to a "Coming in the next build pass" page whose text says only Speaking is finished, which is no longer true.

## What will be added

### PTE (biggest gap - gets a full lesson layer)
- New strategy lesson curriculum: 12 lessons, 3 per skill (Speaking, Writing, Reading, Listening), each with method walkthrough, worked example, scoring notes, and 5 quiz questions.
- New Lessons hub + lesson reader, linked from the PTE hub.
- Add the missing Reading card link to the PTE hub.
- Replace the stale "coming soon" catch-all with a redirect to the PTE hub.
- 2 extra mock tests assembled from existing task banks (3 to 5).

### TOEIC
- 12 new lectures: Part 2 question-type traps, Part 3/4 paraphrase tracking, Part 5 verb-form and preposition drills, Part 6 discourse connectors, Part 7 double/triple passages, plus Speaking Q11 and Writing Q8 response templates.
- Each lecture: strategy steps, trap alerts, vocabulary highlights, practice questions and 5+ quiz questions, matching the existing lecture format.
- 2 new full Listening & Reading mock exams via the existing exam builder.

### SAT
- 12 new lessons in 2 new modules: Reading & Writing (command of evidence, text structure, transitions, boundaries/punctuation, cross-text connections, words in context) and Math (linear systems, quadratics, exponential growth, ratios/percent, geometry & trig, data analysis).
- Each lesson: theory, worked steps, exercises and 5+ quiz questions.
- 2 new mock exams (1 Reading & Writing, 1 Math) added to the exam list.

## Technical notes

- New TOEIC/SAT lessons follow the existing `LanguageModule` / `LanguageLesson` shapes in `src/data/languageCurriculum/types.ts` and are appended as new expansion files (`englishSatExpansion14.ts`, `toeicLecturesExpansion4.ts`) so existing module and lesson IDs stay untouched.
- New TOEIC exams use `createFullToeicLRExam` from `toeicFullExamBuilder.ts`; new SAT exams follow `SatMockExam` in `satMockExamData.ts`.
- PTE lessons go in a new `src/data/pteLessonsData.ts` with a `PteLesson` type; new routes `/pte/lessons` and `/pte/lessons/:lessonId` are registered before the `/pte/:skill` catch-all. No existing PTE task IDs, storage keys, or progress shapes change.
- All new IDs are new; nothing is renamed or removed, so saved student progress stays valid.
- Verification: type check, existing SAT/content audit scripts, hover-contrast audit, and desktop + mobile browser checks of the TOEIC lecture list, SAT curriculum, PTE hub, PTE lessons and the new exams.

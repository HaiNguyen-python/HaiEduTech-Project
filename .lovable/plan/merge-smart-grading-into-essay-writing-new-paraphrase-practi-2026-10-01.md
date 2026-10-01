# Merge Smart Grading into Essay Writing + new Paraphrase Practice

## 1. Smart Grading inside Essay Writing
- Remove the separate "Smart Grading" tab.
- At the top of Essay Writing, add a switch: "Đề có sẵn / Built-in prompt" (current flow, unchanged) and "Tự nhập đề / Your own prompt".
- "Your own prompt" shows the existing Smart Grading form (Task 1/2, paste prompt, optional chart description for Task 1, essay box with word count, grade button). Results use the same result panel, PDF and upgrade as now.
- Old links to the Smart Grading tab open Essay Writing in "Your own prompt" mode.

## 2. New tab: Paraphrase Practice (after Cohesion Lab)
- Task 1 / Task 2 switch, plus topic filter (Task 1: trends, comparisons, proportions, process, map, overview; Task 2: education, environment, technology, work, health, society, crime, media).
- Each card shows a simple, low-level sentence (around A2-B1) with its Vietnamese meaning and a hint of target techniques (synonyms, change word form, passive, nominalisation, clause/inversion).
- Student chooses a target level (B2, C1, C2) and writes their own higher-level version.
- "Check" button: AI gives a score (meaning kept, level reached, grammar, naturalness), lists what improved and what is wrong, and shows a corrected version of the student's sentence.
- "Show model answers": built-in B2, C1 and C2 versions with the techniques used highlighted.
- Next / Random / Retry; Enter to check, Enter again to go next. Progress (done count, average score) saved in the browser and logged to the student's activity.
- Free users follow the existing AI grading limits.

## Content
- About 160 original sentences (80 Task 1, 80 Task 2), each with Vietnamese meaning, techniques, and B2/C1/C2 model rewrites. No em-dashes.
- Audit script: no duplicate ids/sentences, all fields filled, model rewrites differ from source, at least 8 per topic. Must report 0 issues.

## Checks
- Typecheck, audit, one live AI check call, browser check of both features.

## Technical notes
- `IeltsWritingPractice.tsx`: drop `free-grade` trigger/content; add `essayMode` toggle rendering `FreeWritingGrader` inside the `essay` tab; add `paraphrase` tab (Repeat icon); grid stays 8 columns.
- New `src/data/ieltsParaphraseBank.ts`, `src/components/ielts/ParaphrasePractice.tsx`, `scripts/audit_ielts_paraphrase_bank.ts`.
- New edge function `grade-paraphrase` (input validated with Zod, returns JSON scores/feedback/corrected), following the same AI setup and JSON repair as existing grading functions. localStorage `ielts-paraphrase-progress`, activity type `ielts_paraphrase`. No database changes.

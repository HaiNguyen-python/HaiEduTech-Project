# IELTS Listening Content Difficulty Upgrade

## Current state verified

- The app currently has 120 IELTS Listening sets: 30 sets per section, and every set has 10 questions.
- The 30 full tests already map one Section 1, 2, 3 and 4 set into 40-question tests.
- Transcript length is much shorter than real IELTS difficulty:
  - Section 1 median: 207 words
  - Section 2 median: 155 words
  - Section 3 median: 124 words
  - Section 4 median: 185 words
- Several newer Section 2 and Section 3 scripts are too direct: each question is often answered by one short sentence, with limited paraphrase, distractors, attitude/opinion changes, or natural academic discussion.
- The page intro text is stale: it still says 13 full tests and 52 drills, while the data now supports 30 full tests and 120 drills.

## Goal

Upgrade the Listening bank so it feels closer to real IELTS Listening in length, pacing, vocabulary, distractors and question logic, while keeping the existing 30 full-test structure.

## Target quality standard

Each section will be rewritten toward realistic IELTS ranges:

- Section 1: longer transactional conversations with corrections, spelling, prices, dates, alternatives and confirmations.
- Section 2: public/social monologues with maps, programmes, facilities, rules and speaker emphasis.
- Section 3: academic discussions with two or three speakers, disagreement, changed decisions, tutor feedback and paraphrased answers.
- Section 4: academic lectures with dense but clear signposting, cause/effect, classification, research evidence and technical vocabulary.

Target transcript length after upgrade:

- Section 1: around 450-650 words
- Section 2: around 650-850 words
- Section 3: around 750-950 words
- Section 4: around 750-950 words

## Work plan

### 1. Build a stricter Listening audit

Extend the validation script so it checks:

- transcript word-count thresholds by section;
- exactly 10 questions per set and 40 questions per full test;
- every fill-in answer appears in the audio script and respects the word limit;
- MCQ answers are balanced and options are not trivial duplicates;
- matching answers use valid letters and avoid predictable patterns;
- scripts contain enough distractor/correction language for Sections 1-3;
- Section 4 uses academic signposting and avoids overly simple one-sentence facts.

### 2. Rewrite the short/easy scripts section by section

Keep existing set IDs so progress/history does not break, but replace weak transcripts and update questions where needed.

Priority order:

1. Section 3 - currently shortest and least realistic for academic discussion.
2. Section 2 - many monologues are too list-like and easy.
3. Section 4 - expand lectures with real academic flow and stronger vocabulary.
4. Section 1 - add realistic corrections, spelling, distractors and confirmations.

### 3. Improve question difficulty

For each rewritten set:

- convert overly direct questions into paraphrased IELTS-style prompts;
- add realistic distractors, especially changed decisions and rejected options;
- balance MCQ keys across A/B/C/D;
- ensure map and matching tasks require listening for route/order/location, not just isolated words;
- add clear word-limit instructions for all completion tasks.

### 4. Improve recording quality and pacing

Adjust the listening playback content so it does not feel like a short quiz:

- keep multi-speaker voice separation for dialogue sections;
- add natural IELTS-style pauses and section transitions;
- keep spelling/postcodes/phone numbers TTS-friendly;
- adjust rates so Section 4 remains clear but academically dense;
- ensure the progress bar and estimated duration stay stable after transcript expansion.

### 5. Update Full Test and UI labels

- Keep the 30 full tests, but review the distribution so each full test has a balanced difficulty curve from Section 1 to Section 4.
- Update the Listening page text from 13/52 to 30/120 so the interface matches the actual content.
- Keep the "By Question Type" tab for targeted practice.

### 6. Verification

Run the upgraded validator and do a browser check on at least one full test:

- audio starts and progresses normally;
- questions are numbered Q1-Q40;
- transcript remains hidden before submission in exam mode;
- answers, explanations, evidence and band score appear after submission;
- no content is too short or obviously below IELTS level.

## Technical notes

- Main files to edit after approval: IELTS Listening data files, `scripts/validate-listening.mjs`, `IeltsListeningPractice.tsx`, and only small playback tweaks if the longer scripts reveal timing issues.
- The rewrite should be done in batches so validation can catch regressions early.
- English code comments only.

# IELTS Listening: Content Quality Cleanup (Round 2)

## What I verified in the current bank

- The validator passes: 120 sets (30 per section), 30 full tests, 40 questions each, word counts now S1 ~688, S2 ~758, S3 ~982, S4 ~849 median.
- But the length came from a runtime template layer (`ieltsListeningDifficultyUpgrade.ts`), not from real IELTS-style writing. Concrete problems in the generated transcripts:
  - Answers are announced instead of embedded: "the correct information to enter now is X", "I will record that as the final answer, not the earlier possibility", "the detail that applies to today's visitors is X". A test taker can score 40/40 without listening skill.
  - Section 2 reads all wrong MCQ options aloud as "old arrangements", so distractors are labelled for the student.
  - Section 3 uses one repeated frame for all 10 questions ("In that case, let's make the final decision that X will take responsibility for ...").
  - Padding blocks are recycled verbatim and end with "Topic focus: <title>.", which no real recording contains.
  - Meta-coaching lines are inside the audio itself ("Listen especially for contrast words such as however...", "For examination purposes, listen for...").
  - Every set of a section shares the same opening and closing lines, so 30 recordings sound identical.
- Question-side issues: matching keys are heavily skewed (A 88, B 84, C 57, D 4, E 1, F 1); several Section 3 sets are 10 matching items in the exact order they are spoken, so the answer sequence is predictable; instructions are overwritten with one generic line per section instead of matching each task type.

## Goal

Replace the templated audio layer with authored, exam-realistic recordings and question sets, so nothing in the audio names the answer, and no small logic errors remain.

## Work plan

### 1. Retire the template generator
- Remove the transcript-building part of the upgrade layer so transcripts come from real authored data again.
- Keep only the safe normalisations there: per-section playback rate, and `maxWords` backfill for fill-ins.
- Restore per-set instructions (`context` / `contextVi`) so each task type gets its own wording plus the correct word limit.

### 2. Author real transcripts, in batches of 10 sets
Each set gets a hand-written recording with:
- natural speech: hesitation, self-correction, overlap of two or three speakers where relevant;
- answers embedded in paraphrase, never in a "the answer is" frame;
- distractors that are plausible and never labelled as wrong;
- a spread of answer positions through the recording, not one answer per fixed slot;
- section-appropriate content: S1 transactional call with spellings, prices and dates; S2 public talk with map/facility detail; S3 tutorial with disagreement and changed decisions; S4 lecture with definitions, classification, figures and evaluation.
Target length stays in the ranges already validated (S1 450-700, S2 650-850, S3 750-950, S4 750-950 words).

Order: Section 3 (most formulaic) -> Section 2 -> Section 1 -> Section 4.

### 3. Fix the question layer
- Rebalance matching keys so each letter is used a realistic number of times, and remove the "answers in spoken order" pattern in Section 3.
- Mix task types inside sections (note completion, table, map/labelling, MCQ, matching) instead of one type for the whole section.
- Rewrite prompts that copy transcript wording word-for-word into paraphrased prompts.
- Confirm word-limit instructions match each answer, and every accepted answer has spelling/number variants where IELTS would allow them.

### 4. Harden the validator
Add checks that fail the build on the exact defects found today:
- ban answer-leak phrases ("the final answer", "the correct information to enter now is", "Topic focus:", "For examination purposes") and meta-coaching inside transcripts;
- ban repeated identical sentences within a transcript and near-identical openings across sets of the same section;
- MCQ correct option must not be introduced by a give-away frame, and all distractors must appear as plausible content;
- matching key balance per set and across the bank;
- answer position spread across the transcript;
- keep the existing structure, length, coverage and key-balance checks.

### 5. Verification
- Run the validator until it reports no issues.
- Browser check: one full test end to end (audio plays fully, Q1-Q40 numbering, transcript hidden before submit, answers plus explanations plus band score after submit) and two drills from different sections.

## Technical notes

- Files: `src/data/ieltsListeningDifficultyUpgrade.ts` (reduced to normalisation only), the `ieltsListeningPractice*.ts` data files (authored content), `scripts/validate-listening.mjs` (stricter audit), and `src/data/ieltsFullListeningTests.ts` only if difficulty balancing needs reordering.
- Set IDs stay unchanged so saved progress and history keep working.
- Batched delivery: validator runs after each batch to catch regressions early.
- English code comments only.

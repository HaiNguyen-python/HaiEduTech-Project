# Audit and harden Translation Practice (IELTS Writing)

## What I found (verified)

I ran a data audit over the 97 sentences and read the component and grader.

1. **Scoring bug - the biggest issue.** The hint keywords are also used to score the learner locally (`answer.includes(keyword)`). 50 of the keywords can never match, because they are patterns or labels, not literal text: `"between ... and"`, `"from ... to"`, `"before + V-ing"`, `"passive"`, `"such + adj + noun"`, `"not only ... but also"`, `"only when ... can"`. Result: a perfect translation still loses points and the feedback wrongly says "Target structures not used". The same broken keywords are also sent to the AI grader.
2. **Content defect found in Task 1 trends:** `t1-trend-5` uses "before reaching a low of 2012" for "chạm mức thấp nhất vào năm 2012" (should be "in 2012" / "bottoming out in 2012"), and its keyword "bottom out" is not in the model sentence.
3. **Uneven coverage.** Task 1 has 51 sentences (trend 14, map 6), Task 2 has 46 (example 4, thesis/topic/cause/effect/conclusion 5 each). Some categories are too thin for repeat practice.
4. **No automated audit** exists for this bank, so future edits can silently reintroduce these problems.
5. Functionality that is fine and stays as is: Task 1/Task 2 switching, category filter, progress bar, Ctrl/Cmd+Enter, Random/Retry/Show answer, notebook saving, activity logging, AI grading (now returns a full 200 response).

## What I will do

### 1. Fix structure checking
- New helper `src/lib/ieltsTranslationCheck.ts`:
  - turns `"A ... B"` into a flexible match (A anywhere before B),
  - recognises grammar labels (`passive`, `+ V-ing`, `such + adj + noun`) as **teaching hints only**, excluded from scoring,
  - matches inflected verbs (rose/rise/risen) so a valid alternative is not punished.
- Component uses this helper for the local score and only lists genuinely missing structures.
- Each item gets an explicit split: what is shown as a hint vs what is actually checked.

### 2. Full content review of all 97 sentences
For every item: Vietnamese naturalness, English grammar/collocation accuracy, that the English really translates the Vietnamese, that the band tag (6.0 / 6.5-7.0 / 7.5+) matches the difficulty of the structure, that the category is right, and that alternatives are genuinely acceptable IELTS phrasing. Fix `t1-trend-5` and every other defect found.

### 3. Expand to about 130 sentences
Level out the thin categories so each Task 1 category has at least 8 and each Task 2 category at least 8 sentences, with a balanced band spread.

### 4. Grader alignment
Pass only checkable structures to `grade-translation`, and make the prompt state that a correct paraphrase that does not use the suggested structure must not be marked wrong on accuracy.

### 5. Verification
- New `scripts/audit_ielts_translation.ts`: duplicate ids, empty category, missing fields, unmatched checkable structures, band/category validity, VI/EN sentence-count mismatch, alternative quality. Must report 0 issues.
- TypeScript check, one live grading call through the edge function, and a browser pass over the tab (submit an answer with a deliberate mistake, verify score, feedback, model sentence, notebook and Next).

## Technical notes
Files touched: `src/data/ieltsTranslationBank.ts`, `src/data/ieltsTranslationBankExpansion.ts`, `src/components/TranslationPractice.tsx`, `supabase/functions/grade-translation/index.ts`, new `src/lib/ieltsTranslationCheck.ts` and `scripts/audit_ielts_translation.ts`. No database or schema changes; progress stays in `localStorage` under `ielts-translation-progress`.

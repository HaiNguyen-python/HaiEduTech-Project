# Vocabulary Practice Audit - All Subjects

I checked the Practice tab on every vocabulary page (IELTS/English, Vietnamese, Chinese HSK, Japanese, Finnish, Swedish). The quality fixes we did for IELTS were never carried over to the other five subjects, so they still carry the same bugs students reported earlier.

## What is actually wrong today

Verified in the code of each page:

1. **Duplicate / ambiguous answer options.** Vietnamese, Finnish and Swedish pick wrong answers only by "different word", never by "different meaning text". When two words share the same Vietnamese gloss, two options are identical and there is more than one correct answer. Finnish is worse: when it runs out of synonyms or collocations it pads the list with random repeated words.
2. **Progress resets when you leave the tab.** Vietnamese, Finnish, Swedish and HSK unmount the quiz when the student clicks another tab, so question 7 becomes question 1 again. This is the exact complaint already fixed on the IELTS page only.
3. **Quiz regenerates on unrelated changes.** Swedish rebuilds the whole quiz when the interface language is toggled; Vietnamese rebuilds it whenever the word list is refiltered mid-quiz.
4. **The Next button is only at the bottom.** Only IELTS has the sticky top Next; the other five still force scroll down, answer, scroll up.
5. **Thin exercise variety.** Swedish has only 2 question types and a fixed 10 questions. Vietnamese has 4. IELTS has more than ten, including the newer interactive types.
6. **Answer sometimes visible in the prompt.** Fill-in-the-blank masking is exact-match only, so an inflected or diacritic-variant form of the target word stays visible in the sentence (Finnish and Vietnamese especially).
7. **No feedback detail.** Vietnamese and Swedish show only "word - meaning" after answering, with no explanation of why the other options were wrong.

## What I will do

**Step 1 - one shared quality layer.** Extend the existing helper library that already powers the IELTS practice (dedup of options, same-part-of-speech distractors, answer masking, fairness check) so every subject calls the same code instead of its own ad-hoc logic.

**Step 2 - fix the five pages.** For Vietnamese, HSK, Japanese, Finnish and Swedish practice:
- options deduplicated by displayed text and by meaning, never fewer than 4 distinct choices
- answer never visible in its own prompt, including inflected and accented forms
- quiz stays alive when switching tabs, and is not rebuilt when only the interface language or a filter changes
- sticky Next at the top plus keyboard shortcut, matching IELTS
- after answering, a short bilingual explanation of the correct answer

**Step 3 - richer practice per subject.** Bring each subject up to at least 6 question types, using what that language actually has: HSK gets character/pinyin/tone items, Japanese kana-kanji-romaji items, Finnish case and collocation items, Swedish gets listening and fill-in-the-blank added, Vietnamese gets sentence-context items.

**Step 4 - verification.** A new audit script generates a large sample of questions for every subject and fails on duplicate options, a prompt that leaks its answer, a question with fewer than four options, or more than one defensible answer. Then I click through all six Practice tabs in a browser to confirm no reset and no console errors.

## Technical notes

- Shared logic in `src/lib/vocab/questionQuality.ts` (already exists, will be extended with a subject-agnostic `buildMcq` and a `validateMcq` guard).
- Pages touched: `src/pages/VietnameseVocabulary.tsx`, `HskVocabulary.tsx`, `Japanese.tsx`, `FinnishVocabulary.tsx`, `SwedishVocabulary.tsx`, plus small parity edits in `IeltsVocabulary.tsx`.
- Persistence stays local per subject (`localStorage`), so no database or backend change is needed.
- New `scripts/audit_vocab_practice.ts` for the automated fairness check.

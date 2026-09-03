---
name: IELTS Translation Practice
description: Vietnamese to English sentence translation tab inside IELTS Writing Practice, with AI grading
type: feature
---

Tab "Luyện dịch câu / Translation Practice" in `/ielts-writing-practice` (`src/components/TranslationPractice.tsx`).

- Bank: `src/data/ieltsTranslationBank.ts` + `ieltsTranslationBankExpansion.ts` (Task 1 and Task 2, categories per task, band tags 6.0 / 6.5-7.0 / 7.5+, model translation, alternatives, keywords, bilingual tip).
- Grading: local keyword/length pre-check always runs; AI grading via edge function `grade-translation` (Lovable AI Gateway, google/gemini-3.6-flash, max_tokens 3000 because Gemini reasoning tokens truncate smaller budgets) returning accuracy/grammar/vocabulary/style + bilingual feedback + corrected + Band 7.5+ upgrade.
- Progress: localStorage key `ielts-translation-progress` (best score per sentence). Activity logged as `ielts_translation`.

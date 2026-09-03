# Vietnamese - English Translation Practice (IELTS Writing)

Add a sixth tab to IELTS Writing Practice where students see a standard IELTS-style sentence in Vietnamese and translate it into English, then get scored feedback and a model answer.

## What the student sees

1. New tab "Luyện dịch câu / Translation Practice" next to Essay, Idea, Phrase, Grammar, Cohesion.
2. Task 1 / Task 2 switch (same style as the other tabs), plus a category filter:
   - Task 1: describing trends, comparison, highest/lowest, process steps, map changes, overview sentences.
   - Task 2: introduction/paraphrase, thesis, topic sentence, cause, effect, example, concession, solution, conclusion.
3. A card shows the Vietnamese sentence, a difficulty badge (Band 6.0 / 6.5-7.0 / 7.5+), and optional hint chips (2-3 key words/structures) that stay hidden until the student clicks "Gợi ý".
4. Textarea for the English translation, Submit button, keyboard shortcut (Ctrl/Cmd + Enter).
5. After submitting:
   - A score out of 10 with quick criteria bars (accuracy of meaning, grammar, vocabulary/word choice, IELTS academic style).
   - Bullet feedback on what to fix, bilingual (VI + EN).
   - Model translation, plus 1-2 alternative acceptable versions and a short note on the structure used.
   - "Save to notebook" button, same pattern as Grammar Practice.
6. Next / Random buttons, progress counter, and local best-score tracking per sentence so students can retry weak ones.

## Content bank

New file `src/data/ieltsTranslationBank.ts`: about 120 sentences (60 Task 1, 60 Task 2) covering the categories above. Each entry has: Vietnamese sentence, model English translation, 1-2 alternatives, key structures/keywords, category, task, band level, short teaching note. Sentences are written to mirror real IELTS Writing phrasing (data description language for Task 1, argument language for Task 2).

## Grading

Two layers so it works even without AI:
- Local pre-check: keyword/structure coverage and length sanity, giving instant partial feedback.
- AI grading through a new edge function `grade-translation` (Lovable AI Gateway, Gemini Flash tier) that receives the Vietnamese source, model translation and the student answer, and returns strict JSON with the four sub-scores, bilingual feedback bullets and a corrected version. Gateway errors (402/429/etc.) surface as a clear message and the local score is still shown.

## Technical notes

- New `src/components/TranslationPractice.tsx`, wired into `src/pages/IeltsWritingPractice.tsx` as a `TabsContent value="translate"`; tab grid becomes 3 cols on mobile / 6 on desktop.
- Reuses existing patterns: `useLanguage` for bilingual text, notebook append helper like `GrammarPractice.tsx`, `logStudentActivity` with activity type `ielts_translation`.
- Progress stored in localStorage (`ielts-translation-progress`), no new database tables.

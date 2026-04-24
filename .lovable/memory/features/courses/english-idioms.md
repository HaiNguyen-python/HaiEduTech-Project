---
name: English Idioms & Quotes
description: Idioms/Proverbs/Quotes module under English Foundation with library + 4 gamified exercises
type: feature
---
Module "Idioms, Proverbs & Quotes" tại /english/idioms (mục English Foundation trong Navbar). Dữ liệu seed src/data/englishIdioms.ts gồm 30 mục bilingual (idiom/proverb/quote) với literalVi, meaningEn/Vi, exampleEn/Vi, vietnameseEquivalent, theme, emoji.

Trang src/pages/EnglishIdioms.tsx có 5 tab:
1. Library — lọc theo category (idiom/proverb/quote) + theme, shuffle, reveal/listen (TTS en-US).
2. Meaning Match — ghép câu Anh ↔ nghĩa Việt, streak/score.
3. Fill the Idiom — điền từ thiếu (chọn từ dài nhất không phải stopword).
4. Quick Quiz — chọn nghĩa thật, có "literal trap" làm distractor.
5. VN Equivalent — nối câu tiếng Anh với tục ngữ Việt tương đương.

Mỗi exercise có CompletionCard 3 hạng (gold ≥100 / silver ≥60 / bronze) với nút Play again.

# Chinese Writing Practice (in Practice & Fun)

## What students get
New item "Writing Practice / Luyện viết" in Chinese menu → Practice & Fun (after Speaking Coach), opening a new page with tabs modelled on IELTS Writing Practice. Level filter HSK 1-2 / 3-4 / 5-6 at the top; topic chips (family, school, work, travel, food, health, technology, environment, culture, society...). Every item shows Hanzi + Pinyin + Vietnamese/English meaning. Next item is always random, no repeats until the list is done; Enter checks, Enter again goes next.

Tabs:
1. **Essay (Viết đoạn)** - built-in topics per HSK level (word range e.g. 50-80 chars for HSK 3, 300+ for HSK 6) or "Your own topics". AI grades: task completion, vocabulary, grammar, coherence, Hanzi accuracy; corrected version + upgraded version.
2. **Vocabulary (Từ vựng)** - random word/collocation; write a sentence using it, AI checks usage.
3. **Grammar (Ngữ pháp)** - random structure (把, 被, 是...的, 虽然...但是, 越...越, 不但...而且, 连...都...); write your own sentence.
4. **Connectors (Liên kết)** - random linker practice and combine-two-sentences.
5. **Translation (Dịch)** - Vietnamese sentence → Chinese.
6. **Paraphrase (Nâng cấp câu)** - simple sentence, rewrite at a higher HSK level, with model answers.
7. **Typing (Gõ chữ)** - type Pinyin with IME to produce the sentence; accuracy + characters per minute.

Results save to the browser, log to activity history and show in Chinese "Your Performance". Free users follow the existing AI grading limits.

## Content
Original content, around: 60 essay prompts, 150 words/collocations, 60 grammar structures, 40 connector items, 120 translation sentences, 120 paraphrase items, 120 typing sentences, spread across HSK levels and topics. No em-dashes. Audit script must report 0 issues (duplicates, missing Pinyin/meaning, structure present in examples).

## Checks
Typecheck, audit, one live AI call per grading type, browser check of each tab.

## Technical notes
- Route `/chinese/writing-practice` (auth-protected like other Chinese learning routes), lazy page `src/pages/ChineseWritingPractice.tsx`; Navbar Chinese Practice & Fun entry.
- Data in `src/data/chineseWriting/*.ts`; components in `src/components/chineseWriting/`, reusing `randomPicker`, `consumeAiGrade`, `handleAiError`.
- One new edge function `grade-chinese-writing` with `mode` (essay | sentence | translation | paraphrase), Zod validation, Lovable AI Gateway, same JSON repair as existing graders.
- Activity domain `chinese`, types `zh_writing_*`, so the existing Chinese performance page picks them up. No database changes.

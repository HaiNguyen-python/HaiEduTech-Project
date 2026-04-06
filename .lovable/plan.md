

## Plan: Tăng cường Grammar — Thêm bài học và bài tập

### Hiện trạng
- 6 modules, 15 bài học, 984 dòng
- Mỗi bài có 3-5 câu fill-in-blank, 2-3 câu reorder, 3 câu quiz

### Mở rộng

**Tạo file `src/data/languageCurriculum/englishGrammarExpansion.ts`** (~1200 dòng)

Thêm bài học mới vào mỗi module hiện tại + 3 module mới:

**Bài học mới cho modules hiện tại (8 bài):**
1. Tenses: "Present Perfect Continuous vs Past Perfect" (bài nâng cao)
2. Tenses: "Future Perfect & Future Perfect Continuous"
3. Conditionals: "Wish & If only"
4. Passive: "Causative Have/Get" (chuyên sâu)
5. Reported Speech: "Reported Questions" (câu hỏi tường thuật)
6. Relative Clauses: "Relative Clauses with Prepositions"
7. Articles: "Zero Article & Special Cases"
8. Prepositions: "Phrasal Verbs & Dependent Prepositions"

**3 Module mới (7 bài):**
1. **Modals (Động từ khuyết thiếu)** — can/could/may/might/must/should (2 bài: basic + advanced)
2. **Gerunds & Infinitives (Danh động từ & Động từ nguyên mẫu)** — V-ing vs To V, verb patterns (2 bài)
3. **Comparisons & Inversions (So sánh & Đảo ngữ)** — comparative/superlative, inversion patterns (3 bài)

**Tăng số bài tập mỗi bài:**
- 6-8 câu fill-in-blank (tăng từ 3-5)
- 4-5 câu sentence reorder (tăng từ 2-3)
- 5 câu quiz (tăng từ 3)

**Tổng sau mở rộng:** 9 modules, ~30 bài học

### Cập nhật file `src/data/languageCurriculum/index.ts`
- Import `grammarExpansionModules` và `grammarExtraLessons`
- Merge extra lessons vào modules hiện tại, thêm modules mới vào `allEnglishModules`

### Files
- `src/data/languageCurriculum/englishGrammarExpansion.ts` — **mới**, ~1200 dòng
- `src/data/languageCurriculum/index.ts` — cập nhật merge logic


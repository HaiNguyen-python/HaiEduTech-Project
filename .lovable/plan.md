

## Mục tiêu
Mở rộng thêm nội dung bài học cho 3 mục:
1. **SAT** (English)
2. **PTE Academic**
3. **Grammar** (English)

## Khám phá hiện trạng

### SAT (đã có)
- `englishSat.ts` (gốc) + `englishSatExpansion.ts` (Math Vocab, Reading) + `englishSatExpansion2.ts` (Grammar Mastery, Vocab, Punctuation, Essay) + `englishSatExpansion3.ts` (Geometry/Data Vocab, Advanced Reading, Essay, Math Word Problems)
- Đã có ~14 modules. Cần thêm các góc còn thiếu.

### Grammar (đã có)
- `englishGrammar.ts` — 9 modules cốt lõi (tenses, conditionals, passive, reported speech, relative clauses, articles/prepositions...)
- `englishGrammarExpansion.ts` — Modal verbs, Gerunds & Infinitives, Comparisons & Inversions
- Đã có ~12 modules. Cần thêm các chủ điểm chưa phủ.

### PTE
- `src/data/pteData.ts` — kho task PTE (Read Aloud, Repeat Sentence, Essay, Dictation...) cho practice modules.
- PTE **không** dùng cấu trúc `LanguageModule/lessons` như SAT/Grammar — nó dùng cấu trúc task riêng cho 4 kỹ năng (Speaking, Writing, Reading, Listening) hiển thị qua `PteHub` + 4 trang skill.
- Để "tăng bài học cho PTE", cách phù hợp nhất là **tăng số lượng task** trong từng nhóm (Read Aloud, Repeat Sentence, Describe Image, Essay, Summarize, Fill in Blanks, MCQ, Dictation, Highlight...).

## Phạm vi mở rộng

### A. SAT — thêm 4 modules mới (file `englishSatExpansion4.ts`)
1. **SAT Algebra Vocabulary & Concepts** — biến số, phương trình tuyến tính, hệ phương trình, bất phương trình (10 vocab, 1 lesson)
2. **SAT Advanced Math (Quadratics & Functions)** — parabola, vertex, discriminant, đồ thị hàm số (10 vocab, 1 lesson)
3. **SAT Transition Words & Logical Connectors** — chuyên trị câu hỏi "Which choice best transitions" (12 vocab, 1 lesson)
4. **SAT Rhetorical Synthesis Mastery** — dạng câu hỏi mới của Digital SAT: chọn câu kết hợp các bullet notes (10 vocab, 1 lesson)

→ ~4 lessons, 40+ vocab, 8 fill-in-blank exercises, 12 quiz questions.

### B. Grammar — thêm 3 modules mới (file `englishGrammarExpansion2.ts`)
1. **Articles, Quantifiers & Determiners (Advanced)** — a/an/the với danh từ trừu tượng, much/many/few/little/several, no vs none (1-2 lessons)
2. **Subject-Verb Agreement (Advanced)** — collective nouns, either/neither, indefinite pronouns, "one of the..." (1-2 lessons)
3. **Punctuation & Sentence Boundaries** — comma splice, semicolon, colon, dash, run-on sentences (1-2 lessons)

→ ~5 lessons, 30+ vocab, 10 fill-in-blank exercises, 15 quiz questions.

### C. PTE — mở rộng task bank trong `src/data/pteData.ts`
Thêm task mới (thực tế và thuộc dạng được dự đoán xuất hiện 2026):
- **Read Aloud**: +5 prompts (nhiều chủ đề học thuật khác nhau)
- **Repeat Sentence**: +5 câu mẫu
- **Describe Image**: +3 prompts (charts/maps mới)
- **Essay**: +3 đề mới
- **Summarize Written Text**: +3 đoạn
- **Fill in the Blanks (Reading & Writing)**: +3
- **Multiple Choice (Reading)**: +3
- **Highlight Correct Summary (Listening)**: +2
- **Write from Dictation**: +5

→ ~32 task mới được phân bổ qua 4 kỹ năng.

## Các file thay đổi

**Tạo mới:**
- `src/data/languageCurriculum/englishSatExpansion4.ts`
- `src/data/languageCurriculum/englishGrammarExpansion2.ts`

**Chỉnh sửa:**
- `src/data/languageCurriculum/index.ts` — thêm import & merge 2 expansion mới (SAT vào `allEnglishModules`, Grammar mới gộp vào `allEnglishModules`).
- `src/data/pteData.ts` — bổ sung task vào các array `READ_ALOUD`, `REPEAT_SENTENCE`, `DESCRIBE_IMAGE`, `ESSAY`, `SUMMARIZE`, `FILL_BLANKS_RW`, `MCQ_READING`, `HIGHLIGHT_SUMMARY`, `DICTATION` (hoặc tên array thực tế trong file). Sẽ đọc file trước khi sửa để giữ đúng kiểu dữ liệu.

## Validation áp dụng (theo curriculum-validation-standards)
- Quiz: `answer` là index 0-3, có `explanation`.
- Fill-in-blank: dùng `___` đúng vị trí, `answer` khớp chính xác.
- Mỗi vocab có `meaning`, `example` (và `meaningEn`/`exampleEn` cho song ngữ).
- Mỗi lesson có cả `theory` (VI) và `theoryEn` (EN).
- Không tạo trùng `id` module/lesson.

## Không đụng tới
- `TheorySections.tsx`, schema DB, `client.ts`, `types.ts` (Supabase generated), favicon/SEO, các module khác.


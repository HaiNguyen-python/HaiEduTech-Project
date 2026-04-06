

## Plan: Thêm mục English Grammar vào Learn English

### Hiện trạng
- Ngữ pháp hiện tại nằm rải rác trong IELTS Grammar (2 bài) và National Exam Grammar (3 bài: Tenses, Conditionals, Passive Voice)
- Chưa có mục riêng "English Grammar" trên Navbar hay trang English

### Thay đổi

**1. Tạo file dữ liệu ngữ pháp: `src/data/languageCurriculum/englishGrammar.ts`**
- 6 modules, mỗi module 2-3 bài = ~15 bài grammar tổng cộng
- Modules:
  1. **Tenses (Các thì)** — Present Simple/Continuous/Perfect, Past Simple/Continuous/Perfect, Future Simple/Continuous (3 bài)
  2. **Conditionals (Câu điều kiện)** — Type 0-3, Mixed conditionals (2 bài)
  3. **Passive Voice (Câu bị động)** — Basic passive, Advanced passive, Causative (2 bài)
  4. **Reported Speech (Câu tường thuật)** — Statements, Questions, Commands (2 bài)
  5. **Relative Clauses (Mệnh đề quan hệ)** — Defining, Non-defining, Reduced (3 bài)
  6. **Articles & Prepositions (Mạo từ & Giới từ)** — A/An/The, Common preposition patterns (2 bài)
- Mỗi bài có: theory (VI+EN), exercises (fill-in-blank, sentence-reorder), quiz (3+ câu), vocabulary liên quan

**2. Cập nhật type `LanguageModule.category`**
- File: `src/data/languageCurriculum/types.ts`
- Thêm `"grammar"` vào union type của `category`

**3. Cập nhật barrel export**
- File: `src/data/languageCurriculum/index.ts`
- Import `grammarModules` và merge vào `allEnglishModules`

**4. Thêm mục trên Navbar**
- File: `src/components/Navbar.tsx`
- Thêm `{ to: "/english/grammar", label: "📖 English Grammar" }` vào `englishSubs`, trước mục Conversational

**5. Thêm route + page cho English Grammar**
- File: `src/pages/EnglishGrammar.tsx` (mới) — trang tổng quan hiển thị tất cả grammar modules dạng grid cards, click vào link đến `/english/learn/:moduleId`
- File: `src/App.tsx` — thêm route `/english/grammar`

### Files
- `src/data/languageCurriculum/englishGrammar.ts` — **mới**, ~800 dòng, 6 modules
- `src/data/languageCurriculum/types.ts` — thêm `"grammar"` vào category
- `src/data/languageCurriculum/index.ts` — import + merge
- `src/components/Navbar.tsx` — thêm menu item
- `src/pages/EnglishGrammar.tsx` — **mới**, trang tổng quan grammar
- `src/App.tsx` — thêm route


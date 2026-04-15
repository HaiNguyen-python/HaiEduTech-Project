

## Plan: Thêm mục SAT vào Learn English

### Tổng quan
Thêm chương trình SAT (Scholastic Assessment Test) vào trang Learn English với các bài học, bài tập và từ vựng phù hợp. SAT sẽ bao gồm 3 module chính: Reading & Writing, Math Vocabulary, và Advanced Vocabulary.

### 1. Cập nhật types — thêm category `"sat"`

**File:** `src/data/languageCurriculum/types.ts`
- Thêm `"sat"` vào union type `category` trong `LanguageModule`

### 2. Tạo file dữ liệu SAT

**File mới:** `src/data/languageCurriculum/englishSat.ts`

3 modules, mỗi module 3-4 bài học:

**Module 1: SAT Reading & Writing** (📖, purple)
- Lesson 1: Evidence-Based Reading (level 3, intermediate) — chiến lược đọc hiểu, từ vựng ngữ cảnh
- Lesson 2: Command of Evidence (level 3, intermediate) — trích dẫn bằng chứng, phân tích lập luận
- Lesson 3: Words in Context (level 4, advanced) — từ đa nghĩa, sắc thái ngữ nghĩa
- Lesson 4: Standard English Conventions (level 3, intermediate) — ngữ pháp, dấu câu, cấu trúc câu

**Module 2: SAT Advanced Vocabulary** (🎯, indigo)
- Lesson 1: High-Frequency SAT Words Set 1 (level 3) — 10+ từ thường gặp (ubiquitous, pragmatic, ambiguous...)
- Lesson 2: High-Frequency SAT Words Set 2 (level 4) — 10+ từ nâng cao (ephemeral, juxtapose, paradox...)
- Lesson 3: Roots, Prefixes & Suffixes (level 3) — Latin/Greek roots, word formation

**Module 3: SAT Writing & Language** (✍️, teal)
- Lesson 1: Expression of Ideas (level 4, advanced) — tổ chức bài, phát triển ý, chuyển tiếp
- Lesson 2: Rhetorical Synthesis (level 4) — tổng hợp thông tin, lập luận
- Lesson 3: Transitions & Flow (level 3) — liên kết câu, đoạn

Mỗi bài học gồm: theory (Vietnamese + English), vocabulary (10 từ), exercises (fill-in-blank + sentence-reorder), quiz (5 câu MCQ).

### 3. Đăng ký vào barrel export

**File:** `src/data/languageCurriculum/index.ts`
- Import `satModules` từ `./englishSat`
- Thêm `...satModules` vào `allEnglishModules`

### 4. Thêm program card trên trang English

**File:** `src/pages/English.tsx`
- Thêm 1 object SAT vào mảng `programs` (sau National Exam)
- Cập nhật link mapping trong phần render (index → route path)
- Thêm route `/english/sat` vào link

### 5. Thêm route cho trang chi tiết SAT

**File:** `src/App.tsx`
- Thêm route `/english/sat` trỏ tới `EnglishCourse` (dùng chung component)

**File:** `src/pages/EnglishCourse.tsx`
- Thêm data cho course `sat` trong `courseData` object

### Files cần sửa/tạo

| File | Thay đổi |
|------|----------|
| `src/data/languageCurriculum/types.ts` | Thêm `"sat"` vào category union |
| `src/data/languageCurriculum/englishSat.ts` | **Tạo mới** — 3 modules, ~10 lessons |
| `src/data/languageCurriculum/index.ts` | Import + thêm vào `allEnglishModules` |
| `src/pages/English.tsx` | Thêm SAT program card |
| `src/pages/EnglishCourse.tsx` | Thêm SAT course detail data |
| `src/App.tsx` | Thêm route `/english/sat` |


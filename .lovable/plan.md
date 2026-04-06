

## Plan: Mở rộng IELTS Reading & Listening — Thêm bài học và bài tập

### Hiện trạng
- **IELTS Reading**: 2 bài (Skimming & Scanning, T/F/NG)
- **IELTS Listening**: 1 bài (Section 1 & 2)
- Tất cả hiển thị qua `LanguageLessonView` — không cần tạo page/route mới

### Mở rộng

**File mới: `src/data/languageCurriculum/englishIeltsReadingListening.ts`** (~1000 dòng)

#### IELTS Reading — thêm 6 bài mới (tổng 8 bài):
1. **Matching Headings** — chiến lược chọn tiêu đề cho đoạn văn
2. **Sentence Completion** — kỹ thuật điền câu từ passage
3. **Summary Completion** — hoàn thành tóm tắt dựa trên bài đọc
4. **Multiple Choice** — chiến lược loại trừ đáp án sai
5. **Matching Information** — tìm đoạn chứa thông tin cụ thể
6. **Yes/No/Not Given** — phân biệt với T/F/NG, dành cho opinion-based

#### IELTS Listening — thêm 5 bài mới (tổng 6 bài):
1. **Section 3: Academic Discussion** — nghe thảo luận học thuật
2. **Section 4: Academic Lecture** — nghe bài giảng, note completion
3. **Map & Diagram Labelling** — chiến lược gán nhãn bản đồ/sơ đồ
4. **Multiple Choice in Listening** — kỹ thuật xử lý distractors
5. **Matching & Classification** — phân loại thông tin nghe được

#### Mỗi bài gồm:
- Lý thuyết chi tiết (Việt + Anh)
- 3 Pro Tips
- 5-6 câu fill-in-blank (bài tập đọc/nghe mô phỏng)
- 3-4 câu sentence-reorder
- 5 câu quiz MCQ

### Cập nhật file `src/data/languageCurriculum/englishIelts.ts`
- Merge bài mới vào module `ielts-reading` và `ielts-listening` hiện tại

### Cập nhật Navbar (`src/components/Navbar.tsx`)
- Thêm 2 link vào nhóm IELTS: "Luyện đọc / Reading Practice" và "Luyện nghe / Listening Practice" trỏ tới `/english/learn/ielts-reading` và `/english/learn/ielts-listening`

### Files
- `src/data/languageCurriculum/englishIeltsReadingListening.ts` — **mới**, ~1000 dòng
- `src/data/languageCurriculum/englishIelts.ts` — merge thêm lessons
- `src/data/languageCurriculum/index.ts` — import file mới
- `src/components/Navbar.tsx` — thêm 2 link IELTS Reading & Listening


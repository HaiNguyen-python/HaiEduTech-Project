

## Plan: Thêm bài viết mẫu A2 + Fix lỗi TypeScript

### 1. Fix lỗi TypeScript (ưu tiên cao)
**File: `src/data/languageCurriculum/englishGrammarExpansion.ts`**
- Thay tất cả `"fillInBlank"` → `"fill-in-blank"`
- Thay tất cả `"sentenceReorder"` → `"sentence-reorder"`

### 2. Thêm `sampleAnswer` cho 10 bài Writing thiếu

**File: `src/data/finnishCurriculum/mockExamData.ts`** — 5 bài:
1. **writing-1** (Sähköposti kaverille): Bài mẫu ~60 từ về email bạn bè kể về kurssi mới
2. **writing-2** (Viesti opettajalle): Bài mẫu ~50 từ báo nghỉ học vì con ốm
3. **writing-3** (Valitus ravintolalle): Bài mẫu ~70 từ khiếu nại nhà hàng
4. **writing-4** (Kutsu syntymäpäiville): Bài mẫu ~55 từ lời mời sinh nhật
5. **writing-5** (Ilmoitus taloyhtiölle): Bài mẫu ~60 từ báo vòi nước hỏng

**File: `src/data/finnishCurriculum/mockExamExpansion.ts`** — 5 bài:
6. **writing-6** (Muuttoilmoitus): Bài mẫu ~70 từ thông báo chuyển nhà
7. **writing-7** (Viesti lääkärille): Bài mẫu ~50 từ xin gia hạn đơn thuốc
8. **writing-8** (Palaute kurssista): Bài mẫu ~70 từ phản hồi khóa học
9. **writing-9** (Sähköposti vuokranantajalle): Bài mẫu ~70 từ khiếu nại tiếng ồn
10. **writing-10** (Kiitosviesti opettajalle): Bài mẫu ~55 từ cảm ơn giáo viên

Mỗi bài viết mẫu đảm bảo:
- Đúng chuẩn YKI A2 (ngữ pháp đơn giản, từ vựng cơ bản)
- Đúng số từ yêu cầu trong đề
- Bao gồm đầy đủ các điểm yêu cầu trong đề bài
- Có lời chào và lời kết phù hợp

### Files
- `src/data/languageCurriculum/englishGrammarExpansion.ts` — fix type names
- `src/data/finnishCurriculum/mockExamData.ts` — thêm 5 sampleAnswer
- `src/data/finnishCurriculum/mockExamExpansion.ts` — thêm 5 sampleAnswer


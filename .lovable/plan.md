

## Plan: Cải thiện TTS, mở rộng nội dung tiếng Việt, thêm Dictation & Thơ

### 1. Giảm thêm tốc độ TTS tiếng Việt & tăng truyền cảm

**Files:** `src/pages/FolkloreLibrary.tsx`, `src/components/SmartVocabCard.tsx`, `src/pages/VietnameseForForeigners.tsx`, `src/data/speakingCoachData.ts`, `src/components/AISpeakingCoach.tsx`

- Giảm `rate` từ 0.7 → **0.55** (FolkloreLibrary, VietnameseForForeigners normal mode)
- Giảm `rate` từ 0.65 → **0.5** (SmartVocabCard)
- Tăng `pitch` từ 1.05 → **1.1** cho giọng tự nhiên hơn
- Cập nhật `speechLang` config cho Vietnamese trong speakingCoachData

### 2. Giọng đọc truyền cảm cho truyện cổ tích (Folklore Library)

**File:** `src/pages/FolkloreLibrary.tsx`

- Khi đọc story text dài: tách thành từng đoạn (paragraph), thêm `pause` giữa các đoạn bằng cách queue nhiều utterance với delay
- Thêm variation pitch nhẹ giữa các đoạn (±0.05) để tạo cảm giác kể chuyện tự nhiên hơn
- Giảm rate xuống **0.5** cho storytelling mode

### 3. Rà soát hình ảnh sai chính tả

**Vấn đề:** Hình ảnh asset `src/assets/history/ly-nam-de.jpg` có banner viết "VÀNXUẢN" (sai) thay vì "VẠN XUÂN". Đây là hình ảnh tĩnh không thể sửa text trong code.

**Giải pháp:** Thêm caption/overlay text đúng chính tả "Vạn Xuân" dưới hình ảnh trong component `VietnameseHistoryLesson.tsx` để người đọc thấy chính xác tên nước. Rà soát các story segment khác để đảm bảo text chính xác.

### 4. Thêm mục Nghe chép chính tả tiếng Việt

**New file:** `src/data/vietnamese/dictationData.ts` — 20-30 câu chép chính tả theo 3 cấp độ (dễ/trung bình/khó), mỗi câu có text, hint, level

**Modified file:** `src/components/exercises/DictationExercise.tsx`
- Thay `utterance.lang = 'en-US'` → `'vi-VN'`
- Giảm `rate` xuống **0.5**, thêm `pitch: 1.1`
- Thêm nút "Nghe chậm" (rate 0.35) bên cạnh nút "Nghe"
- Thêm phần chấm điểm chi tiết: đúng/sai từng từ, highlight từ sai

**New page:** `src/pages/VietnameseDictation.tsx` — Trang riêng cho bài nghe chép chính tả
- Chọn cấp độ (dễ/trung bình/khó)
- Hiển thị DictationExercise với data từ dictationData
- Tích hợp chấm điểm và leaderboard (`game_type: "dictation-vietnamese"`)

**Route:** Thêm `/learn-vietnamese/dictation` trong `App.tsx`

**Link:** Thêm card "Nghe chép chính tả" trong tab Language của `Vietnamese.tsx`

### 5. Thêm phần Thơ Việt Nam

**New file:** `src/data/vietnamese/poetryData.ts`
- 10-15 bài thơ hay: Truyện Kiều (trích đoạn), Nam Quốc Sơn Hà, Qua Đèo Ngang, Tràng Giang, Đây thôn Vĩ Dạ, Sóng, Mùa xuân nho nhỏ, Sang thu, Viếng lăng Bác...
- Mỗi bài: title, author, text (VN), textEn, vocabulary, culturalNote, analysis

**New page:** `src/pages/VietnamesePoetry.tsx`
- Hiển thị bài thơ với font đẹp, giãn dòng rộng
- Nút nghe đọc thơ (TTS chậm, truyền cảm rate 0.45)
- Phần phân tích & từ vựng bên cạnh
- Cultural context cho mỗi bài

**Route:** `/learn-vietnamese/poetry` trong `App.tsx`
**Link:** Thêm card "Thơ Việt Nam" + icon 📜 trong tab Language của `Vietnamese.tsx`

### 6. Tăng cường bài học tiếng Việt cho tất cả các mục

**Files:**
- `src/data/vietnamese/grammarLessons.ts` — Thêm 1 module "Thực hành giao tiếp nâng cao" (5 lessons)
- `src/data/vietnamese/vocabularyLessons.ts` — Thêm 1 module "Từ vựng nâng cao" (chủ đề: y tế, công nghệ, giáo dục, môi trường, thể thao — 5 lessons)
- `src/data/vietnamese/readingLessons.ts` — Thêm 1 module "Đọc hiểu nâng cao" (3 lessons: văn hóa cà phê, áo dài, Tết)
- `src/data/vietnamese/folkloreLessons.ts` — Thêm 1 module (3 lessons: hát then, múa rối nước, nhạc cụ dân tộc)

### Tổng hợp files

| File | Action |
|------|--------|
| `src/pages/FolkloreLibrary.tsx` | TTS rate/pitch |
| `src/components/SmartVocabCard.tsx` | TTS rate/pitch |
| `src/pages/VietnameseForForeigners.tsx` | TTS rate/pitch |
| `src/components/exercises/DictationExercise.tsx` | Fix lang vi-VN, slow mode |
| `src/data/vietnamese/dictationData.ts` | NEW — dictation sentences |
| `src/pages/VietnameseDictation.tsx` | NEW — dictation page |
| `src/data/vietnamese/poetryData.ts` | NEW — poetry collection |
| `src/pages/VietnamesePoetry.tsx` | NEW — poetry page |
| `src/pages/Vietnamese.tsx` | Links to dictation + poetry |
| `src/pages/VietnameseHistoryLesson.tsx` | Caption fix for typo images |
| `src/App.tsx` | 2 new routes |
| `src/data/vietnamese/grammarLessons.ts` | +5 lessons |
| `src/data/vietnamese/vocabularyLessons.ts` | +5 lessons |
| `src/data/vietnamese/readingLessons.ts` | +3 lessons |
| `src/data/vietnamese/folkloreLessons.ts` | +3 lessons |


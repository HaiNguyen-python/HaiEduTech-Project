

## Plan: Tăng tốc độ TTS & Mở rộng từ vựng tiếng Việt

### 1. Điều chỉnh tốc độ TTS — nhanh hơn & truyền cảm hơn

Hiện tại rate 0.4 quá chậm. Tăng lên **0.6** cho storytelling và **0.55** cho vocab, tăng pitch variation để truyền cảm hơn.

| File | Hiện tại | Mới |
|------|----------|-----|
| `VietnameseHistoryLesson.tsx` (speakText) | rate 0.4, pitch 1.1 | **rate 0.6, pitch 1.15** |
| `VietnameseHistoryLesson.tsx` (segments) | rate 0.4, pitch ±0.05 | **rate 0.6, pitch 1.15 ±0.08** |
| `FolkloreLibrary.tsx` | rate 0.4, pitch 1.1 | **rate 0.6, pitch 1.15** |
| `SmartVocabCard.tsx` | rate 0.4, pitch 1.1 | **rate 0.55, pitch 1.12** |
| `VietnamesePoetry.tsx` | rate 0.35, pitch ±0.05 | **rate 0.5, pitch 1.15 ±0.08** |
| `DictationExercise.tsx` | slow 0.25 / normal 0.4 | **slow 0.35 / normal 0.55** |

### 2. Tăng cường từ vựng cho các bài học

Folklore modules hiện chỉ có trung bình **3 từ/bài** (tổng 69 từ cho 23 bài). Cần nâng lên **8-10 từ/bài**.

**Files thay đổi:**

- **`src/data/vietnamese/folkloreLessons.ts`** — Mở rộng vocabulary từ 2-3 từ lên 8-10 từ cho mỗi bài (23 bài × thêm ~6 từ = ~138 từ mới). Mỗi bài folklore sẽ có từ vựng liên quan đến ca dao/tục ngữ đó (ẩn dụ, từ cổ, từ văn học).

- **`src/data/vietnamese/grammarLessons.ts`** — Thêm 2-3 từ vựng bổ sung cho các bài có đúng 10 từ, nâng lên 12-13 từ (~45 bài × 2 từ = ~90 từ mới). Ưu tiên: từ đồng nghĩa, phản nghĩa, từ ghép liên quan.

- **`src/data/vietnamese/readingLessons.ts`** — Tương tự, thêm 2-3 từ cho mỗi bài (~46 từ mới), tập trung vào từ vựng văn hóa & đọc hiểu.

- **`src/data/vietnamese/vocabularyLessons.ts`** — Thêm 2-3 từ cho mỗi bài (~90 từ mới), bổ sung idioms và colloquial expressions.

### Tổng hợp files

1. `src/pages/VietnameseHistoryLesson.tsx` — TTS rate 0.4→0.6
2. `src/pages/FolkloreLibrary.tsx` — TTS rate 0.4→0.6
3. `src/components/SmartVocabCard.tsx` — TTS rate 0.4→0.55
4. `src/pages/VietnamesePoetry.tsx` — TTS rate 0.35→0.5
5. `src/components/exercises/DictationExercise.tsx` — TTS rates up
6. `src/data/vietnamese/folkloreLessons.ts` — +138 vocab entries
7. `src/data/vietnamese/grammarLessons.ts` — +90 vocab entries
8. `src/data/vietnamese/vocabularyLessons.ts` — +90 vocab entries
9. `src/data/vietnamese/readingLessons.ts` — +46 vocab entries


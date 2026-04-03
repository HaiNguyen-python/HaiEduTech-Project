

## Plan: Audio cho bài lịch sử, giảm tốc độ TTS, mở rộng Chatbot

### 1. Thêm audio đọc truyền cảm trong bài học Lịch sử Việt Nam

**File:** `src/pages/VietnameseHistoryLesson.tsx`

- Import `Volume2, Pause` icons và thêm state `isSpeaking`
- Thêm hàm `speakStory(text)` dùng Web Speech API với `lang: "vi-VN"`, `rate: 0.4`, `pitch: 1.1`
- Hàm `speakSegments(segments)`: đọc lần lượt từng segment với pitch variation (±0.05) giữa các đoạn, tạo hiệu ứng kể chuyện
- Thêm nút "🔊 Nghe đọc" ở đầu Story section (bên cạnh tiêu đề "Câu chuyện") — click sẽ đọc toàn bộ story
- Thêm nút "🔊" nhỏ trên mỗi story segment card để đọc riêng từng đoạn
- Fallback text cho lessons không có segments: đọc `lesson.story` trực tiếp

### 2. Tiếp tục hạ tốc độ đọc tiếng Việt

Giảm `rate` thêm ~0.1 trên tất cả files dùng TTS tiếng Việt:

| File | Hiện tại | Mới |
|------|----------|-----|
| `FolkloreLibrary.tsx` | rate 0.5 | **0.4** |
| `SmartVocabCard.tsx` | rate 0.5 | **0.4** |
| `VietnameseForForeigners.tsx` normal | rate 0.55 | **0.45** |
| `VietnameseForForeigners.tsx` slow | rate 0.4 | **0.3** |
| `DictationExercise.tsx` normal | rate 0.5 | **0.4** |
| `DictationExercise.tsx` slow | rate 0.35 | **0.25** |
| `VietnamesePoetry.tsx` | rate 0.45 | **0.35** |

### 3. Mở rộng Chatbot — cho hỏi bất kỳ câu hỏi liên quan

**File:** `src/components/ChatBot.tsx`

Hiện tại `ALLOWED_KEYWORDS` thiếu nhiều từ khóa quan trọng (Finnish, Vietnamese culture, history, folklore, poetry, dictation...). Cần mở rộng:

- Thêm keywords Finnish: `"finnish"`, `"suomi"`, `"yki"`, `"tiếng phần lan"`, `"kielioppi"`, `"sanasto"`
- Thêm keywords Vietnamese content: `"tiếng việt"`, `"lịch sử"`, `"history"`, `"folklore"`, `"truyện cổ"`, `"ca dao"`, `"tục ngữ"`, `"thơ"`, `"poetry"`, `"chính tả"`, `"dictation"`, `"văn học"`, `"literature"`, `"hùng vương"`, `"lạc long quân"`, `"âu cơ"`, `"văn hóa"`, `"culture"`
- Thêm keywords EdTech: `"edtech"`, `"công nghệ giáo dục"`, `"spaced repetition"`, `"gamification"`
- Thêm keywords general learning: `"exam"`, `"test"`, `"quiz"`, `"exercise"`, `"bài tập"`, `"đề thi"`, `"điểm"`, `"score"`, `"leaderboard"`

Ngoài ra, **nới lỏng** logic `isOnTopic`: tăng ngưỡng word count từ 3 → 5 (tin nhắn ≤5 từ luôn cho qua) để chatbot thân thiện hơn.

### Files thay đổi

1. `src/pages/VietnameseHistoryLesson.tsx` — Thêm audio buttons + TTS storytelling
2. `src/pages/FolkloreLibrary.tsx` — rate 0.5 → 0.4
3. `src/components/SmartVocabCard.tsx` — rate 0.5 → 0.4
4. `src/pages/VietnameseForForeigners.tsx` — rate adjustments
5. `src/components/exercises/DictationExercise.tsx` — rate adjustments
6. `src/pages/VietnamesePoetry.tsx` — rate 0.45 → 0.35
7. `src/components/ChatBot.tsx` — Mở rộng ALLOWED_KEYWORDS + nới lỏng isOnTopic




## Plan: Thêm Bảng xếp hạng cho Vocabulary Exercises

### Tổng quan
Tích hợp component `GameLeaderboard` (đã có sẵn, dùng bảng `game_scores`) vào phần bài tập trắc nghiệm (Exercise) của 4 trang từ vựng: IELTS, TOEIC, HSK, và Finnish.

### Các thay đổi

**1. `src/pages/IeltsVocabulary.tsx` — VocabExercise component**
- Import `GameLeaderboard` và `supabase`
- Khi quiz kết thúc (`finished = true`): gọi `supabase.from("game_scores").insert(...)` với `game_type: "vocab-ielts"`, lưu `score`, `max_streak: 0`
- Hiển thị `<GameLeaderboard gameType="vocab-ielts" currentScore={score} />` bên cạnh kết quả quiz

**2. `src/pages/ToeicVocabulary.tsx` — VocabExercise component**
- Tương tự, `game_type: "vocab-toeic"`

**3. `src/pages/HskVocabulary.tsx` — HskExercise component**
- Tương tự, `game_type: "vocab-hsk"`

**4. `src/components/FinnishVocabExercises.tsx`**
- Thêm leaderboard vào mỗi exercise mode (WordMatching, GapFill, SpeedQuiz, MCQ) khi hoàn thành
- `game_type: "vocab-finnish"`

### Chi tiết kỹ thuật
- Dùng bảng `game_scores` hiện có (đã có RLS cho insert/select)
- Chỉ lưu điểm khi user đã đăng nhập (`auth.uid()`)
- Dùng `useRef` để tránh insert trùng lặp khi component re-render
- Leaderboard hiển thị dưới phần kết quả quiz, trong card riêng biệt
- Không cần migration — bảng `game_scores` đã hỗ trợ `game_type` text tự do

### Cấu trúc UI khi hoàn thành quiz

```text
┌─────────────────────────────┐
│  🏆 Score: 8/10             │
│  Teacher feedback            │
│  [Try Again]                 │
├─────────────────────────────┤
│  🏆 Leaderboard             │
│  #1 Student A ─── 10        │
│  #2 Student B ─── 9         │
│  #3 Student C ─── 8         │
│  Your score: 8              │
└─────────────────────────────┘
```


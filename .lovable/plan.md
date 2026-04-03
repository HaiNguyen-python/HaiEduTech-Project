

## Plan: Cải thiện tổng thể — Leaderboard, Finnish Writing, Speaking Coach, Content & UI

### 1. Reset bảng xếp hạng
- Dùng SQL DELETE xóa tất cả dữ liệu trong bảng `game_scores` (4575 records hiện tại, chủ yếu speaking_finnish spam do bug loop trước đó)
- Leaderboard bắt đầu tính lại từ thời điểm này

### 2. Leaderboard tổng hợp trên Dashboard
- Thêm component `OverallLeaderboard` vào `src/pages/Dashboard.tsx`
- Query `game_scores` tổng hợp tất cả `game_type`, group by `user_id`, sum `score`
- Hiển thị top 10 người dùng có tổng điểm cao nhất across all games

### 3. Finnish Writing — Bài mẫu A2 + gợi ý viết
- Cập nhật `WritingSection` trong `src/pages/YkiDashboard.tsx`
- Sau khi submit: hiển thị bài mẫu A2 (lưu trong data field mới `sampleAnswer` trong mock exam data)
- Thêm panel "Vinkkejä kirjoittamiseen" (Writing tips) với 3-4 câu gợi ý cho mỗi bài
- Cập nhật `src/data/finnishCurriculum/mockExamData.ts` và các expansion files để thêm `sampleAnswer` và `writingHints` cho mỗi bài writing

### 4. Finnish vocab images — sửa hình ảnh
- Cập nhật `VOCAB_IMAGES` và `CATEGORY_IMAGES` trong `src/pages/YkiDashboard.tsx`
- Thay các URL Unsplash không đúng nghĩa bằng URL phù hợp hơn
- Thêm hình cho các từ mới (expansion modules)

### 5. Thêm câu luyện tập Speaking Coach
- Mở rộng `src/data/speakingCoachData.ts`: thêm 2-3 theme mới cho mỗi ngôn ngữ (English, Finnish, Chinese), mỗi theme 10 câu
- Themes mới: English (Technology, Environment), Finnish (Asuminen/Housing, Työ/Work), Chinese (科技/Technology, 环境/Environment)

### 6. Di chuyển nút Next/Prev trong Speaking Coach
- Trong `src/components/AISpeakingCoach.tsx` (line 917-956): di chuyển navigation block lên trên, ngay dưới header (trước main practice card), thay vì ở cuối trang

### 7. Font consistency trong Kokeet & Oppitunnit
- Đồng bộ `text-[18px]` cho tất cả theory/content cards trong `YkiDashboard.tsx`
- Đảm bảo grammar points, dialogues, quiz sections dùng cùng font size base
- Thêm `prose-lg` class cho markdown content

### 8. Thêm bài học Oppitunnit
- Tạo `src/data/finnishCurriculum/lessonsExpansion2.ts` với 3 module mới:
  - **Possessiivisuffiksit** (Possessive suffixes) — A2
  - **Rektio** (Verb rection/prepositions) — A2  
  - **Sanajärjestys** (Word order) — A2
- Mỗi module có 1-2 lessons với theory, grammar, quiz

### 9. Thêm đề thi Kokeet
- Tạo `src/data/finnishCurriculum/mockExamExpansion3.ts` với thêm bộ đề cho Reading, Listening, Writing, Speaking
- Mỗi skill thêm 3-5 bài mới
- Import và merge vào `allMockExamModules`

### Files thay đổi
1. `game_scores` table — DELETE all data (via insert tool)
2. `src/pages/Dashboard.tsx` — Thêm OverallLeaderboard
3. `src/pages/YkiDashboard.tsx` — WritingSection upgrade, font fixes, image fixes, import new data
4. `src/data/finnishCurriculum/mockExamData.ts` — Thêm sampleAnswer/writingHints
5. `src/data/finnishCurriculum/mockExamExpansion.ts` — Thêm sampleAnswer/writingHints
6. `src/data/finnishCurriculum/mockExamExpansion2.ts` — Thêm sampleAnswer/writingHints
7. `src/components/AISpeakingCoach.tsx` — Move nav buttons up
8. `src/data/speakingCoachData.ts` — Thêm themes mới
9. NEW: `src/data/finnishCurriculum/lessonsExpansion2.ts` — 3 grammar modules
10. NEW: `src/data/finnishCurriculum/mockExamExpansion3.ts` — Extra exam sets
11. `src/data/finnishCurriculum/index.ts` — Export new modules


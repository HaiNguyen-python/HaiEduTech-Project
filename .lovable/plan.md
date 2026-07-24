# Kế hoạch: Sửa AI Coach và nâng cấp Goals & To-do thành điểm nhấn

## 1. Chẩn đoán "No suggestions right now"

Log edge function `recommend-study-tasks` cho thấy:
```
ERROR AI error 402 payment_required "Not enough credits"
```

Nguyên nhân xác định:
- Function đang dùng model `google/gemini-2.5-flash` (không còn free-tier), trong khi chuẩn dự án là `google/gemini-3.6-flash`.
- Khi AI 402, function trả `{tasks: [], error: "AI 402"}` nhưng client chỉ đọc `tasks` → hiện "No suggestions right now" thay vì lỗi thật.
- Không có fallback deterministic khi AI unavailable → user không thấy gợi ý nào.

## 2. Fix trực tiếp AI Coach

**Edge function `recommend-study-tasks`:**
- Đổi model sang `google/gemini-3.6-flash` (miễn phí đến 13/10/2026).
- Nếu AI trả 402/429: trả về gợi ý fallback tạo bằng heuristic (xem §3) thay vì mảng rỗng.
- Trả thêm `source: "ai" | "fallback"` để UI hiển thị badge.

**Edge function `align-study-task`:** cùng đổi model sang `google/gemini-3.6-flash`.

**`AICoachWidget.tsx`:**
- Hiển thị rõ lỗi (credit, network) thay vì generic message.
- Auto-fetch lần đầu khi có goal (không cần click Get plan mới thấy).
- Nút "Refresh" thay cho "Get plan"; hiện badge "AI" / "Smart fallback".

## 3. Heuristic Fallback Engine (không phụ thuộc AI)

File mới `src/components/dashboard/todo-goal/smartRecommender.ts`:
- Với mỗi active goal, tính `lag = expectedProgress - actualProgress` dựa trên deadline.
- Chọn 2-3 goal lag nhiều nhất → map sang task template theo `category`:
  - `ielts` → "Luyện 15' Speaking Coach", "Học 10 từ IELTS vocab bank", "Làm 1 passage Reading practice"
  - `hsk` → "Ôn 20 Hanzi HSK", "1 bài Chinese listening", "Roleplay 10' Chinese"
  - `yki` → "1 exercise YKI A2 listening", "Học 15 từ Finnish vocab", "Viết đoạn 50 từ Finnish"
  - `programming` → "Giải 1 Python challenge", "Xem 1 lecture Programming", "1 SQL quiz"
  - `other` → gợi ý chung
- Ưu tiên high nếu lag > 15%, medium 5-15%, low < 5%.
- Contribution 0.4-1.2% tuỳ difficulty.
- Dùng làm fallback khi AI lỗi, và cũng dùng làm seed cho prompt AI (AI sẽ tinh chỉnh chứ không bịa từ đầu).

## 4. Điểm nhấn mới: "Learning DNA -> Goal" data pipeline

Đây là phần biến module thành flagship. Ý tưởng: cho học sinh THẤY hoạt động học hàng ngày trên HaiEduTech đóng góp vào từng goal thế nào.

### 4.1 Activity Contribution Feed
Component mới `ActivityContributionFeed.tsx`:
- Đọc `student_activity_log` + `user_vocab_mastered` từ khi tạo goal.
- Nhóm theo ngày, phân loại theo goal category (dùng lại `matches()` trong `useGoalActivityProgress`).
- Hiển thị timeline: "Hôm qua bạn học 12 từ IELTS -> +3.6% cho goal 'IELTS 8.5'".
- Icon per activity type, có link "View details" -> /activity-log.

### 4.2 Goal Impact Breakdown (per-goal)
Mở rộng `GoalCard.tsx`:
- Nút "See impact" mở dialog `GoalImpactDialog.tsx` gồm 3 tab:
  1. **Sources** - Pie chart: đóng góp từ Tasks (thủ công) vs Activities (tự động), tách theo loại hoạt động (lectures / vocab / speaking / practice tests).
  2. **Weekly trend** - Line chart 8 tuần: minutes học + %progress đạt được, so với "required velocity" (đường mục tiêu để hoàn thành đúng deadline).
  3. **Forecast** - Simulator: kéo slider "phút học/ngày" (0-120) → tính lại ETA, hiển thị "Nếu bạn học 45'/ngày, bạn sẽ đạt goal sớm 12 ngày".

### 4.3 On-track vs Off-track banner
Ở đầu tab, thêm `GoalHealthStrip.tsx`:
- 4 KPI lớn: On-track goals / At-risk goals / Study minutes tuần này / Streak days.
- Nếu có goal off-track: banner emerald->amber gradient với 1 CTA "Xem gợi ý AI".

### 4.4 Weekly AI Review
Widget `WeeklyReviewCard.tsx` + edge function `weekly-goal-review`:
- Mỗi thứ 2, tự động chạy 1 lần khi mở dashboard (cache 7 ngày trong `study_weekly_reviews` table mới).
- AI nhận: goals, task completion 7 ngày qua, activity minutes theo domain -> viết nhận xét ngắn + 3 điều nên làm tuần này.
- Có nút "Add all 3 to my to-do".

### 4.5 Smart Auto-linking cho Activity
Không chỉ task được align, mà mỗi buổi học trên trang cũng cộng vào goal:
- Đã có `useGoalActivityProgress` (đọc `activity_pct` client-side, cap 60%).
- Nâng cấp: lưu snapshot vào cột mới `study_goals.activity_progress_pct` mỗi lần load để hiện trong analytics và không bị mất khi user rời tab.

## 5. Analytics Panel nâng cấp

`AnalyticsPanel.tsx` bổ sung:
- **Study Minutes vs Target** bar chart 14 ngày (từ `student_activity_log` duration).
- **Category mix** stacked bar: mỗi ngày bao nhiêu % dành cho IELTS/HSK/YKI/Programming.
- **Streak & Best day** badges.
- Fix `grid-cols-15` (không tồn tại trong Tailwind) - dùng inline style như hiện tại nhưng thêm class rõ ràng.

## 6. UI polish

- Empty state "No tasks yet" → thêm CTA "Get 3 AI ideas".
- Priority badge: đổi màu Easy=emerald, Medium=amber, Difficult=rose (nhất quán VI/EN).
- Motivational line: mở rộng pool lên 20 câu, đổi mỗi 3h trong ngày.
- Loading skeleton cho GoalCard.

## Files sẽ thay đổi / tạo mới

**Sửa:**
- `supabase/functions/recommend-study-tasks/index.ts` - model + fallback
- `supabase/functions/align-study-task/index.ts` - model
- `src/components/dashboard/todo-goal/AICoachWidget.tsx` - auto-fetch + rõ lỗi
- `src/components/dashboard/todo-goal/GoalCard.tsx` - nút See impact
- `src/components/dashboard/todo-goal/AnalyticsPanel.tsx` - thêm 2 chart, fix grid
- `src/components/dashboard/todo-goal/TodoGoalTab.tsx` - lắp health strip + weekly review + feed
- `src/components/dashboard/todo-goal/useGoalActivityProgress.ts` - persist snapshot

**Tạo mới:**
- `src/components/dashboard/todo-goal/smartRecommender.ts`
- `src/components/dashboard/todo-goal/ActivityContributionFeed.tsx`
- `src/components/dashboard/todo-goal/GoalImpactDialog.tsx`
- `src/components/dashboard/todo-goal/GoalHealthStrip.tsx`
- `src/components/dashboard/todo-goal/WeeklyReviewCard.tsx`
- `supabase/functions/weekly-goal-review/index.ts`
- Migration: thêm cột `activity_progress_pct` cho `study_goals`, tạo bảng `study_weekly_reviews`.

## Technical notes

- Toàn bộ AI calls dùng `google/gemini-3.6-flash` qua `https://ai.gateway.lovable.dev/v1/chat/completions` với header `Lovable-API-Key`.
- Handle 402/429 rõ ràng (toast + fallback path).
- Charts dùng recharts đã có (không thêm dependency).
- Toàn bộ comment code bằng tiếng Anh (theo core rule).
- Mobile-first: dialog full-screen dưới `md`, grid 1 cột dưới `lg`.

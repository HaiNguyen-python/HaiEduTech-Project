## Mục tiêu
1. Tổng hợp tốt hơn dữ liệu hoạt động của học sinh (thời gian online, từ vựng đã thuộc, bài đã làm).
2. Thêm khối **"🏆 Học sinh tiêu biểu của tháng"** (Top 3) hiển thị ở trang chủ với tên + lời tuyên dương.

## Hạ tầng đã có sẵn (tận dụng, không tạo bảng mới)
- `student_activity_log` — đã track `session_heartbeat` (mỗi phút online), `daily_login`, và mọi loại bài (`ielts_writing`, `language_lesson_quiz`, `speaking_coach_*`, `toeic_lecture_quiz`, `python_pathway_lesson`, `ielts_speaking`, …).
- `user_vocab_mastered` — số từ đã thuộc theo subject.
- `profiles` — tên + avatar công khai.
- Hook `useSessionTracker` đã chạy → đủ dữ liệu thời gian online thực tế.

→ Không cần migration cấu trúc, chỉ cần thêm RPC tổng hợp + UI.

## Phần 1 — RPC tổng hợp dữ liệu

Tạo 2 function SQL (security definer, dùng cho Top 3 và Dashboard cá nhân):

### `get_monthly_top_students(_limit int default 3)`
Trả về Top 3 học sinh tháng hiện tại theo **điểm tổng hợp**:
```
score = (mastered_words_this_month * 3)
      + (activities_completed_this_month * 5)    -- ngoại trừ heartbeat
      + (online_minutes_this_month * 1)
      + (login_days_this_month * 10)
```
Output: `user_id, display_name, avatar_url, mastered_words, activities, online_minutes, login_days, total_score, rank`.

Lọc: chỉ tài khoản role `student` (qua `user_roles`), loại tài khoản teacher/admin và user_id NULL.

### `get_student_summary(_user_id uuid, _period text default 'month')`
Tổng hợp cá nhân, period = `week | month | all`:
- `online_minutes` (tổng heartbeat)
- `login_days` (số ngày unique có hoạt động)
- `mastered_words_total` + `by_subject` jsonb
- `activities_total` + `by_type` jsonb
- `best_streak_day`, `last_active_at`

Cấp `EXECUTE` cho `authenticated` và `anon` (Top 3 cần public read trên trang chủ).

## Phần 2 — UI "Học sinh tiêu biểu của tháng" trên trang chủ

File mới: `src/components/home/MonthlyTopStudents.tsx`
- Gọi `supabase.rpc('get_monthly_top_students', { _limit: 3 })`, cache trong React Query 10 phút.
- **Layout podium** (Hạng 2 trái — Hạng 1 giữa cao hơn — Hạng 3 phải):
  - Card có avatar tròn, viền gradient brand (Royal Blue → Soft Emerald).
  - Tên (full_name), badge `🥇 / 🥈 / 🥉`, dòng tuyên dương động: *"Đã chinh phục N từ vựng và M phút học tháng này — Thầy Hải tự hào!"*
  - Confetti nhẹ khi hover huy chương vàng.
- Tiêu đề: *"🏆 Học sinh tiêu biểu tháng [N]/[YYYY] – Tuyên dương từ thầy Hải"* + subtitle khích lệ.
- Empty state: nếu chưa đủ 3 — hiện "Hãy là một trong những người đầu tiên!" + CTA → `/dashboard`.
- Mount khối này vào `src/pages/Index.tsx` (sau section Roadmaps, trước Upcoming Courses) — vị trí dễ thấy.

## Phần 3 — Nâng cấp Dashboard cá nhân

File: `src/pages/Dashboard.tsx` (hoặc component con đang dùng cho Study Streak).
- Thêm 1 card "📊 Tổng kết tháng này" gọi `get_student_summary(uid, 'month')`:
  - Thời gian online (giờ:phút)
  - Số ngày học liên tục trong tháng
  - Số từ đã thuộc tháng này (so với tổng) — progress ring
  - Số bài/quiz/luyện đã hoàn thành theo loại (bar nhỏ)
  - Vị trí hiện tại trong BXH tháng (nếu lọt top 20)
- Switcher Tuần / Tháng / Tất cả thời gian.

## Phần 4 — Bảo mật & hiệu năng
- RPC `STABLE SECURITY DEFINER`, chỉ trả `full_name + avatar_url` công khai (đã có policy public ở `get_public_profiles`).
- Index hiện có (`idx_activity_created`, `idx_uvm_user_subject_reviewed`) đủ — không cần index mới.
- Cache React Query 10 phút để giảm tải.

## Technical Details

**Files mới:**
- Migration: `create or replace function get_monthly_top_students(...)` + `get_student_summary(...)`
- `src/components/home/MonthlyTopStudents.tsx`
- `src/components/dashboard/MonthlySummaryCard.tsx`

**Files sửa:**
- `src/pages/Index.tsx` — mount `<MonthlyTopStudents />`
- `src/pages/Dashboard.tsx` — mount `<MonthlySummaryCard />`

**Không thay đổi:**
- Schema bảng, hook tracking hiện tại (đã chạy đúng).
- Logic tính điểm composite có thể tinh chỉnh sau khi xem dữ liệu thực tế.

## Việc KHÔNG nằm trong phạm vi
- Tạo bảng mới, sửa schema.
- Thay đổi cách track (heartbeat 60s, activity logger) — đã đủ.
- Phần thưởng vật lý / liên kết thanh toán cho top học sinh.

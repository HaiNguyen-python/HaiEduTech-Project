## Mục tiêu
Tự động kiểm tra "sức khỏe" toàn bộ website 2 lần/ngày (6:00 và 18:00 giờ VN). Báo cáo hiển thị ở chuông `NotificationBell` (chỉ admin/teacher) và một tab **🩺 Health Monitor** mới trong `/admin` để xem chi tiết + lịch sử.

## 1. Database (migration)
Tạo bảng `health_check_runs`:
- `id uuid`, `created_at timestamptz`, `triggered_by text` ('cron' | 'manual')
- `total int`, `passed int`, `failed int`, `duration_ms int`
- `results jsonb` — mảng `{ category, name, status: 'ok'|'fail'|'warn', http_status, latency_ms, error }`
- RLS: chỉ `is_staff(auth.uid())` mới đọc/insert. GRANT cho `authenticated` + `service_role`.

## 2. Edge function mới: `daily-health-check`
`verify_jwt = false`. Hành vi:
1. **Edge Functions (61)** — đọc danh sách từ một mảng cứng trong code (liệt kê tên 61 functions hiện có, trừ chính `daily-health-check`). Với mỗi function: gửi `OPTIONS` (preflight CORS) tới `${SUPABASE_URL}/functions/v1/<name>` với timeout 6s. Coi response < 500 là **OK** (function alive), >= 500 hoặc timeout là **FAIL**. Không gọi POST thật để tránh tốn AI tokens.
2. **DB & RPC** — `SELECT count(*)` trên ~10 bảng quan trọng (`profiles`, `user_roles`, `assignments`, `class_schedules`, `student_activity_log`, `user_vocab_mastered`, `revenue_logs`, `chatbot_conversations`, `email_send_log`, `api_balance`). Gọi RPC `get_monthly_top_students(3)`, `get_streak_leaderboard()`, `get_overall_vocab_leaderboard()`.
3. **Routes/Pages** — GET với `Accept: text/html` các URL: `/`, `/dashboard`, `/admin`, `/english`, `/finnish`, `/chinese`, `/ielts`, `/programming`, `/learn-vietnamese`, `/scholarship`, `/career-roadmap`. Status 200 = OK.
4. **AI providers**:
   - Perplexity: SELECT từ `api_balance` (Perplexity); cảnh báo **WARN** nếu balance < $10, **FAIL** nếu < $1.
   - Lovable Gateway: gọi `models.list`-style endpoint nhẹ với `LOVABLE_API_KEY`, đo latency.
5. Chạy tất cả song song qua `Promise.allSettled`, gom lại, INSERT vào `health_check_runs`.
6. Gọi `notify_super_admins(title, body, route)`:
   - Nếu `failed === 0`: `✅ Health check OK — 0 lỗi (N chức năng)`
   - Nếu có lỗi: `⚠️ Phát hiện X chức năng lỗi` + body liệt kê 5 lỗi đầu, `route='/admin?tab=health'`.

## 3. pg_cron schedule
Dùng `supabase--insert` (KHÔNG migration vì chứa anon key) chạy:
```sql
select cron.schedule('health-check-morning', '0 23 * * *',  -- 06:00 VN = 23:00 UTC hôm trước
  $$ select net.http_post(url:='<project>/functions/v1/daily-health-check',
       headers:='{"Content-Type":"application/json","apikey":"<anon>"}'::jsonb,
       body:='{"triggered_by":"cron"}'::jsonb); $$);
select cron.schedule('health-check-evening', '0 11 * * *',  -- 18:00 VN = 11:00 UTC
  $$ ... $$);
```
Enable `pg_cron` + `pg_net` extensions nếu chưa có.

## 4. UI tab mới trong /admin
File `src/components/admin/HealthMonitorTab.tsx`:
- **Stat cards** trên cùng: tổng số chức năng / OK / Lỗi / lần check gần nhất.
- **Nút "Chạy kiểm tra ngay"** → `supabase.functions.invoke('daily-health-check', { body: { triggered_by: 'manual' } })`, hiện loading spinner ~15s.
- **Bảng kết quả mới nhất**: cột Nhóm | Tên | Trạng thái (badge xanh/đỏ/vàng) | Độ trễ (ms) | Lỗi. Lọc theo nhóm (Edge / DB / Routes / AI) và status.
- **Lịch sử 30 ngày**: line chart (recharts) số lỗi mỗi lần check + bảng nhỏ.
- Đăng ký tab trong `src/pages/AdminDashboard.tsx` (key `health`, label "🩺 Health Monitor"), URL `?tab=health`.

## 5. Tích hợp Chuông
Đã có sẵn — `notify_super_admins` insert vào `assignment_notifications` mà `NotificationBell` đang subscribe realtime. Route `/admin?tab=health` mở đúng tab khi click.

## File sẽ tạo/sửa
- migration: tạo bảng `health_check_runs`
- `supabase/functions/daily-health-check/index.ts` (mới)
- `src/components/admin/HealthMonitorTab.tsx` (mới)
- `src/pages/AdminDashboard.tsx` (thêm tab)
- SQL insert (qua `supabase--insert`) để tạo 2 cron jobs

## Ngoài phạm vi (sẽ KHÔNG làm)
- Không sửa 61 edge function hiện có để thêm `healthCheck:true` short-circuit (rủi ro cao). Dùng OPTIONS thay thế.
- Không gửi email — đã chốt chỉ chuông.
- Không đụng tới `NotificationBell` (đã hoạt động).

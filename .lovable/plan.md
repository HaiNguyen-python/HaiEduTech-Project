# Pre-publish review — toàn bộ chức năng web

## Quy trình kiểm tra (em sẽ chạy sau khi anh approve)

### 1. Runtime & Console (5 min)
- Mở 8 route chính qua `browser--view_preview`: `/`, `/dashboard`, `/admin-dashboard`, `/ielts`, `/hsk`, `/yki`, `/programming`, `/learn-vietnamese`.
- Mỗi route: `read_console_logs` (error/warn) + `list_network_requests` (4xx/5xx).
- Fix mọi error có ảnh hưởng UX.
- **Lưu ý**: lỗi `Lock broken by another request with the 'steal' option` đã xuất hiện — đây là warning benign của Supabase auth lock khi mở nhiều tab, không gây crash. Em sẽ xác nhận không có lỗi nào khác.

### 2. Backend Health (2 min)
- `supabase--cloud_status` — đảm bảo ACTIVE_HEALTHY.
- Query `health_check_runs` 24h gần nhất — confirm 86/86 pass.
- `supabase--slow_queries` top 10 — flag query > 500ms để tối ưu nếu cần.
- `supabase--linter` — đọc lại 51 warning tồn dư, đánh dấu cái nào blocker, cái nào safe-to-ignore.

### 3. Edge Functions sanity (3 min)
- Smoke-test 5 function critical-path qua `curl_edge_functions`: `chat`, `counseling-ai`, `grade-writing`, `daily-health-check`, `rl-intervention-dispatcher` (dry-run).
- Kiểm tra log gần nhất của `process-email-queue` (chạy mỗi 5s) — đảm bảo không có error loop.

### 4. RL/AI/ML pipeline (đã sửa turn trước — chỉ verify)
- Query `student_activity_log` 24h: confirm không còn `score=0/max=1` markers từ `ielts_lecture`.
- Query `rl_interventions` sau 19:00 VN hôm nay: confirm có rows mới từ cron đầu tiên.

### 5. SEO & Publish metadata
- Đọc `index.html` + `App.tsx` Helmet: title (<60 ký tự), meta description (<160), OG, Twitter, favicon, JSON-LD.
- Confirm canonical URL = `https://haiedutech.com`.

### 6. Security scan
- `security--get_scan_results` — chặn publish nếu có critical finding chưa fix.

## Deliverable
- Bảng tổng kết ✅/⚠️/🔴 cho 6 mục trên.
- Fix ngay mọi 🔴 và ⚠️ quan trọng (không thay đổi UI/UX).
- Nếu tất cả xanh → hướng dẫn anh bấm Publish (em hiện CTA).
- Nếu còn 🔴 → liệt kê + chờ anh quyết định fix hay publish kèm risk.

## Ước lượng
- ~10-15 phút thao tác tool, 0-3 file sửa nếu phát sinh, không thay đổi schema.

Bấm **Implement plan** để em bắt đầu rà soát.

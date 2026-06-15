# Rà soát toàn diện RL · AI · ML · Admin Dashboard

## Kết quả khảo sát nhanh (đã chạy DB + log)

| Khu vực | Trạng thái | Bằng chứng |
|---|---|---|
| Health Monitor (86 checks, 2×/ngày) | ✅ Hoạt động | 7 ngày gần nhất passed 86/86, 0 fail/warn |
| pg_cron jobs (9 jobs) | ✅ Active | rl-intervention-bi-weekly 12:00 UTC Mon/Thu, monthly-report 1st, health 2×/ngày |
| RL dispatcher edge function | ⚠️ Booted nhưng chưa ghi | Boot 11:23 UTC hôm nay, **0 dòng trong `rl_interventions`** từ trước đến nay |
| Data pipeline (logging) | ⚠️ Skew | `ielts_lecture` 4 events đều `score=0/max=1` (marker mở bài) → kéo tụt avg_score; `daily_login` & `session_heartbeat` OK |
| Tracking coverage 7 ngày | ⚠️ Mỏng | Chỉ 7 activity_type có score; 686 heartbeat / 79 login → đa số học sinh sẽ bị classify "inactive" |
| Admin Dashboard tabs | ❓ Chưa kiểm tra runtime | 23 tab; cần smoke-test mở từng tab |
| AI edge functions (50+) | ❓ Chưa rà | Chatbot, grading, counseling, scholarship-advisor, monthly-report… |

## Phạm vi sửa (P0 → P3)

### P0 — RL dispatcher không insert dữ liệu
- Đọc full `rl-intervention-dispatcher/index.ts` (450 dòng), chạy **dry-run** + **force-run** qua `curl_edge_functions`, đọc log chi tiết để xác định: cron có chạy không, eligible students có rỗng không, có bị skip toàn bộ vì dedup không.
- Fix nguyên nhân gốc: nhiều khả năng `eligible` rỗng (filter role student loại hết), hoặc `interventionsToInsert` rỗng vì tất cả rơi vào "steady".
- Hạ ngưỡng `STRUGGLE` inactive từ `>4 days` → `≥3 days` để bắt được học sinh bỏ học sớm hơn, tránh "im lặng" mãi.
- Thêm log structured `console.log({ eligible_count, top, struggle, skippedDedup, inserted })` để mỗi run có audit trail.

### P1 — Data pipeline skew & gap còn lại
- **rlEngine.ts**: bỏ qua activity có `score=0 AND max_score=1` (markers IELTS lecture/listening open). Hiện chỉ filter `score==null` và `max<=0`.
- **IELTS Listening/Reading marker**: chuyển marker mở bài từ `score=0/max=1` sang `score=null/max=null` (chỉ track time_spent).
- Kiểm tra `useActivityLogger` đảm bảo `completion: true` không bị ghi nhầm thành `score=0`.
- Thêm 3 module còn thiếu logging chưa được phủ trong P1 trước: **Cambridge mock**, **YKI writing eval**, **Programming code-challenge submission**.

### P2 — Admin Dashboard runtime audit
- Mở từng tab (Activity, Health, API, Income, RL Interventions, Reports, Research, Feedback, Attendance, Payroll, Assistant Mgmt, Chatbot Conversations, Service Requests, AI Strategy, AI Pedagogical, AI Marketing, EdTech Research, PhD Research, Business Strategy, User Insights, Class Schedule, English Dictionary) qua `browser--view_preview` + `read_console_logs` + `read_network_requests`.
- Bắt & fix mọi: 4xx/5xx, RLS denial, query > 2s (dùng `supabase--slow_queries`), N+1, render crash.

### P3 — AI/ML edge functions
- Smoke-test 10 function chính qua `curl_edge_functions`: `chat`, `counseling-ai`, `grade-writing`, `grade-speaking`, `scholarship-advisor`, `pedagogical-assistant`, `monthly-progress-report`, `daily-health-check`, `ai-strategy-optimizer`, `roleplay-chat`.
- Kiểm tra mỗi function: CORS, JWT verify, Perplexity message alternation, JSON repair, error → 402/429 surfaced cho UI.

## Deliverable
1. **Báo cáo audit** (markdown trong chat) — bảng từng module ✅/⚠️/🔴 + root cause.
2. **Patch tự động**: tất cả P0+P1+P2+P3 fix-able mà không thay đổi UX/business logic. Mỗi fix kèm verification (dry-run, log query, screenshot tab).
3. **Cập nhật memory** `mem://tech/data-pipeline-audit.md` với các threshold/filter mới.

## Phạm vi KHÔNG sửa
- Không thay đổi schema bảng đang chạy (chỉ thêm migration nếu thật sự cần index).
- Không đổi UI/UX của các module đã ổn định.
- Không động vào `client.ts`, `types.ts`, `config.toml`, schemas `auth/storage/realtime`.

## Ước lượng
- ~20-30 file đọc, ~10-15 file sửa, 0-1 migration (chỉ thêm index nếu phát hiện slow query).
- Thời gian: gói gọn 1 turn build mode.

Bấm **Implement plan** để em chuyển sang build mode và bắt đầu.

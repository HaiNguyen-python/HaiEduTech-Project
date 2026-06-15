
## Mục tiêu

Tự động rà soát dữ liệu học tập hai lần mỗi tuần (Thứ 2 & Thứ 5, 19:00 giờ VN) và gửi thông báo qua chuông (NotificationBell) đến:
- **Học viên đang học tốt** → lời khen + huy hiệu cảm xúc.
- **Học viên có dấu hiệu chững/lui** → báo cáo học tập ngắn + câu động viên + gợi ý hành động.
- **Giáo viên (Thầy Hải)** → bản tổng hợp đầy đủ mỗi đợt chạy + cảnh báo từng học viên cần can thiệp.

Toàn bộ hành động được ghi vào bảng `rl_interventions` để tạo vòng học tăng cường (state → action → reward khi học viên có cải thiện ở lần chạy sau).

## Hạ tầng đã có sẵn (tái sử dụng, không xung đột)

| Thành phần | Trạng thái |
|---|---|
| `assignment_notifications` (realtime, có RLS cho phép teacher/admin insert) | ✅ dùng nguyên |
| `NotificationBell.tsx` (đã pulse + toast khi có INSERT mới) | ✅ dùng nguyên |
| `rl_interventions` (10 cột, hiện chưa có code dùng) | ✅ kích hoạt |
| `student_activity_log`, `user_vocab_mastered`, `get_student_summary` RPC | ✅ dùng làm state |
| `rlEngine.ts` (đã có `StudentState`, `RLRecommendation`) | ✅ tái dùng logic |
| Mẫu `monthly-progress-report` + pg_cron | ✅ tham chiếu kiến trúc |

→ **Không trùng** với: `monthly-progress-report` (chu kỳ tháng, kênh email), `daily-health-check` (kênh hệ thống), `AssignmentReminderModal` (chỉ bài tập giáo viên giao).

## Logic phân loại (Balanced — bạn đã chọn)

Cửa sổ phân tích: **14 ngày gần nhất**, tính theo `student_activity_log` (loại trừ `session_heartbeat`, `daily_login`).

| Phân loại | Điều kiện |
|---|---|
| 🟢 **TOP** | avg_score ≥ 80% **HOẶC** trend = improving (so 7 ngày gần nhất với 7 ngày trước đó tăng ≥ 5%) — và có ≥ 5 hoạt động |
| 🔴 **STRUGGLE** | avg_score < 65% **HOẶC** > 4 ngày liên tiếp không hoạt động |
| ⚪ **STEADY** | Không gửi (tránh nhiễu) |

Chống spam: cùng một học viên + cùng phân loại sẽ **không gửi lại trong 72 giờ** (check `rl_interventions.created_at`).

## Nội dung thông báo (mẫu tiếng Việt, deterministic)

**Học viên TOP** — chuông:
> 🌟 Tuyệt vời, {tên}! Tuần này em đã hoàn thành {n} hoạt động với điểm trung bình {avg}%. Thầy rất tự hào — cứ giữ phong độ này nhé!  
> 🏆 Điểm mạnh nổi bật: {strongest_area}.

**Học viên STRUGGLE** — chuông:
> 💙 {tên} ơi, thầy thấy {lý do: ví dụ "em chưa đăng nhập 5 ngày" / "điểm trung bình đang giảm"}. Đừng lo, mỗi ngày 15 phút là đủ để bứt phá.  
> 📚 Hôm nay thử lại: {weakest_area} — {gợi ý module cụ thể}.  
> 💪 "Hành trình ngàn dặm bắt đầu từ một bước chân." — Thầy luôn ở đây nếu em cần.

**Giáo viên** — chuông (mỗi đợt chạy 1 thông báo tổng + 1 thông báo riêng cho mỗi học viên struggle):
> 📊 Báo cáo RL ngày {date}: {n_top} học viên xuất sắc · {n_struggle} cần can thiệp · {n_total} tổng học viên.  
> Bấm để xem chi tiết tại Admin → RL Interventions.

## Các thay đổi kỹ thuật

### 1. Edge function mới: `supabase/functions/rl-intervention-dispatcher/index.ts`
- Nhận `{ dryRun?: boolean, force?: boolean }` (force bỏ qua chống spam 72h, để admin test).
- Service-role client. Yêu cầu JWT staff khi gọi thủ công; chấp nhận cron call qua header.
- Pipeline: lấy danh sách students → fetch activity 14d → tính state → phân loại → áp dụng dedup → insert `assignment_notifications` cho học viên + giáo viên → insert `rl_interventions` (state JSON + action + action_details + status `pending`).
- Trả về `{ scanned, top, struggle, notified, skipped_dedup }`.

### 2. Cron schedule (qua supabase--insert, không phải migration vì chứa anon key)
```sql
select cron.schedule(
  'rl-intervention-bi-weekly',
  '0 12 * * 1,4',   -- 19:00 VN = 12:00 UTC, thứ 2 & thứ 5
  $$ select net.http_post(...rl-intervention-dispatcher...) $$
);
```

### 3. Reward loop (vòng học tăng cường thực sự)
Đầu mỗi lần chạy, function quét các `rl_interventions` status=`pending` của lần chạy trước:
- Nếu học viên STRUGGLE lần trước đã cải thiện (avg tăng ≥ 5% hoặc đăng nhập trở lại) → `reward = +1`, status = `rewarded`.
- Nếu không cải thiện sau 2 lần can thiệp liên tiếp → `reward = -0.5`, status = `escalated`, gửi chuông "ưu tiên cao" cho giáo viên.
- Top student tiếp tục top → `reward = +0.5`, status = `confirmed`.

Đây là tín hiệu phần thưởng để sau này tinh chỉnh ngưỡng/nội dung.

### 4. UI Admin — tab mới `RL Interventions`
Trong `src/pages/AdminDashboard.tsx`, thêm tab `?tab=rl`:
- Nút **"Chạy quét ngay"** (gọi function với `force: true`) + nút **Dry-run** (xem trước, không gửi chuông).
- Bảng các can thiệp 30 ngày gần nhất: học viên · phân loại · lý do · trạng thái reward · thời điểm.
- Biểu đồ Recharts: số can thiệp theo ngày + tỷ lệ học viên cải thiện (hiệu quả của RL).
- Lịch chạy kế tiếp.

### 5. Rà soát xung đột (đã kiểm tra)
- **NotificationBell**: nhận realtime INSERT — tự pulse & toast cho thông báo mới, không cần sửa.
- **RLS `assignment_notifications`**: policy `Teachers insert notifications` đã cho phép edge function (service role bypass RLS) ghi tới bất kỳ `user_id`.
- **`monthly-progress-report`**: chu kỳ tháng, kênh email — không đụng.
- **`daily-health-check`**: chỉ gửi cho super admin về sức khỏe hệ thống — không đụng.
- **`AssignmentReminderModal`**: chỉ tiêu thụ `assignment_notifications` có `assignment_id` — RL notification không set `assignment_id` nên modal không hiển thị nhầm.
- **Spam control**: dedup 72h + chỉ gửi STEADY = 0 thông báo, tránh "loạn chuông".

### 6. Kiểm thử sau khi build
1. Chạy dry-run từ tab Admin → kiểm tra `scanned`/`top`/`struggle` đúng kỳ vọng so với dữ liệu thực.
2. Chạy thật cho 1 học viên test (tạo activity giả lập điểm cao + 1 học viên không hoạt động) → kiểm chuông pulse + toast hiện.
3. Đăng nhập tài khoản học viên test → mở chuông, click thông báo → route chuyển đúng (`/dashboard`).
4. Kiểm tra `rl_interventions` có row mới, payload JSON đầy đủ.
5. Chạy lần 2 ngay → phải bị dedup (skipped_dedup > 0).
6. Force-run lần 2 → reward loop chấm điểm intervention cũ.
7. Xem `supabase--edge_function_logs` không có error.

## Kết quả mong đợi
- Hai lần mỗi tuần, học viên nhận được phản hồi cá nhân hoá ngay trong chuông, giáo viên có tổng quan + danh sách cần can thiệp.
- Mỗi quyết định của hệ thống được ghi lại kèm phần thưởng — tạo dữ liệu để tinh chỉnh chính sách RL về sau (đúng tinh thần can thiệp sớm trong giáo dục).
- 0 xung đột với các tính năng hiện có; có cơ chế chống spam và dry-run trước khi gửi thật.

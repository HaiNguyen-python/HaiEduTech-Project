## Mục tiêu
Giảm tiêu hao credit từ 2 cron job đang chạy trên backend HaiEduTech.

## Thay đổi

### 1. `process-email-queue` — giãn từ 30 giây xuống 2 phút
- Giữ nguyên câu lệnh SQL (đã tối ưu: chỉ gọi edge function khi queue thực sự có message).
- Chỉ đổi lịch cron từ `30 seconds` sang `2 minutes`.
- Ảnh hưởng người dùng: email xác thực / reset mật khẩu / email giao dịch có thể trễ tối đa ~2 phút thay vì ~30 giây - vẫn nằm trong ngưỡng chấp nhận được của mọi flow signup.
- Tác động credit: số lần pg_cron kích hoạt giảm ~4x (từ 2.880 xuống 720 lần/ngày).

### 2. `auto-generate-daily-lessons` — tắt hẳn
- `UPDATE cron.job SET active = false` cho job này (giữ record để có thể bật lại sau, thay vì `cron.unschedule` xoá luôn).
- Edge function `auto-generate-daily` giữ nguyên trong repo để có thể gọi thủ công từ admin panel khi cần.
- Tác động credit: cắt hẳn 1 lượt gọi LLM/ngày (5 bài học sinh tự động) - đây là nguồn tiêu AI credit đều đặn lớn nhất.

## Chi tiết kỹ thuật
Vì cả hai job đều nằm trong `cron.job` (schema hệ thống, không phải `public`), thay đổi được thực hiện qua công cụ chạy SQL trực tiếp (không phải migration - lịch cron chứa dữ liệu cụ thể của project). SQL sẽ là:

```sql
SELECT cron.alter_job(
  job_id := (SELECT jobid FROM cron.job WHERE jobname = 'process-email-queue'),
  schedule := '*/2 * * * *'
);

UPDATE cron.job SET active = false WHERE jobname = 'auto-generate-daily-lessons';
```

Sau khi chạy, verify bằng `SELECT jobname, schedule, active FROM cron.job` để xác nhận.

## Không thay đổi
- Không đụng đến edge function code (`process-email-queue`, `auto-generate-daily`, `send-transactional-email`).
- Không đụng đến bảng `email_send_state`, queues, hoặc bất kỳ luồng email nào.
- Không đụng đến job `auto-community-poll-every-3d` (đã hợp lý, mỗi 3 ngày).
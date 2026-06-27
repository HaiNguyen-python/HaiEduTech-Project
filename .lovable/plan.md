# Báo cáo Credit & Kế hoạch tiết kiệm (sau đợt tối ưu vừa rồi)

## 1. Tổng quan kỳ này (14/06 – 14/07, tính đến hôm nay - ngày thứ 13)


| Hạng mục                 | Đã dùng    | %     | Trung bình/ngày |
| ------------------------ | ---------- | ----- | --------------- |
| **Build mode messages**  | 188.20     | 91.3% | ~14.5/ngày      |
| **Plan mode messages**   | 10.10      | 4.9%  | ~0.78/ngày      |
| **Cloud (toàn bộ)**      | 7.07       | 3.4%  | ~0.54/ngày      |
| **AI Gateway (toàn bộ)** | 0.86       | 0.4%  | ~0.066/ngày     |
| **Tổng**                 | **206.24** | 100%  | **~15.9/ngày**  |


Còn lại: 1.40 credits + 5/ngày daily grant. Tốc độ hiện tại vẫn cao hơn ngân sách 5/ngày -> sẽ tiếp tục ăn vào top-up cho đến hết kỳ.

## 2. Cloud - các "ổ tốn" còn lại sau khi đã tắt 8 cron job

Cloud compute micro vẫn chiếm 96% chi phí Cloud (6.81/7.07). Top query đang ăn CPU database:


| #   | Query                                       | Số lần (13 ngày) | Tổng thời gian | Ghi chú                                                            |
| --- | ------------------------------------------- | ---------------- | -------------- | ------------------------------------------------------------------ |
| 1   | `get_streak_leaderboard()`                  | 5,359            | 600s           | **Đã tối ưu hôm nay** (60-day window). Lần chạy tới sẽ rẻ hơn ~5x. |
| 2   | Admin dashboard quét `student_activity_log` | 2,581            | 503s           | Mỗi lần admin mở dashboard -> full scan.                           |
| 3   | Per-user activity history                   | 6,817            | 359s           | Dashboard học viên load history.                                   |
| 4   | INSERT `student_activity_log` (heartbeat)   | 18,468           | 215s           | ~1,420 lần/ngày -> heartbeat cadence quá dày.                      |
| 5   | `get_admin_dashboard_snapshot` RPC          | 7,188            | ~140s          | Admin polling.                                                     |


**Dự trù Cloud sau khi cron jobs đã tắt + streak đã tối ưu:**

- Hiện tại trung bình: **0.54 credit/ngày**.
- Dự kiến sau 1-2 ngày (khi pg_stat reset & cron mất hẳn): **~0.30-0.35 credit/ngày**.
- Nếu áp thêm các quick-win bên dưới: **~0.15-0.20 credit/ngày** (~5-6 credit/tháng).

## 3. AI Gateway - các tính năng đang gọi LLM/image

Tổng AI Gateway: 0.86 credit / 13 ngày = ~0.066/ngày. Rất thấp.

Breakdown:


| Mục                                             | Credit | %    | Loại                                                              |
| ----------------------------------------------- | ------ | ---- | ----------------------------------------------------------------- |
| Gemini 2.5 Flash **Image output** (Nano Banana) | 0.697  | 81%  | Sinh ảnh minh hoạ (vocab illustrations / lesson covers)           |
| Gemini 2.5 Flash input tokens                   | 0.094  | 11%  | Chat dài (grading, explain code, roleplay - các call 3-8k tokens) |
| Gemini 2.5 Flash output tokens                  | 0.050  | 6%   | Phần text trả về của các call trên                                |
| Gemini 2.5 Flash Lite (in+out)                  | 0.013  | 1.5% | Các call nhẹ (auto-classify, mood, short hints)                   |
| Gemini 3 Flash Preview                          | 0.0075 | <1%  | Mặc định mới, dùng ít                                             |


Quan sát logs 7 ngày gần nhất: chỉ ~48 request AI - chủ yếu là `grade-speaking`, `grade-writing`, `enhance-programming-theory`, `roleplay-chat`. Đây là rất ít - AI không phải vấn đề.

**Tính năng tốn AI nhất:**

1. **Image generation (Nano Banana)** - dùng cho vocab/lesson illustrations. Mỗi ảnh ~0.039 credit. Nếu sinh 18 ảnh/tháng -> 0.7 credit. Đang cache vào `vocab-images` bucket nên không tệ.
2. **Smart Grading IELTS** (Writing + Speaking) - 3-8k input tokens/lần, ~0.01-0.018 credit/lần grading.
3. **Code explainer** ở Code Typing Race - tương tự ~0.005-0.01/lần.

**Dự trù AI hiện tại: ~0.07 credit/ngày = ~2 credit/tháng.** Rất nhỏ.

## 4. Quick-win đề xuất cho Cloud (nếu muốn giảm thêm)

### Mức 1 - Không rủi ro (giảm Cloud xuống ~0.15/ngày)

1. **Giãn `session_heartbeat**` từ ~30-60s lên **120s** trong `useSessionTracker.ts`. Giảm 50-75% INSERT activity log (vốn là nguồn ghi nặng nhất).
2. **Cache `get_admin_dashboard_snapshot**` ở client 3-5 phút (admin không cần realtime tuyệt đối). Giảm 70% lần gọi RPC nặng nhất.
3. **Throttle gọi `get_streak_leaderboard` ở client** từ mọi lần mount lên **5 phút TTL** (đã có `leaderboardCache.ts` - tăng TTL từ 2 phút lên 5-10 phút).

### Mức 2 - Cần thử nghiệm

4. **Tách bảng `session_heartbeat**` ra khỏi `student_activity_log` để index nhỏ hơn, partial index theo ngày. Tác động lớn nhưng cần migration cẩn thận.
5. **Materialized view cho leaderboards** refresh mỗi 15 phút - rẻ hơn gọi RPC mỗi lần user mở trang.

## 5. Đòn bẩy thực sự (chiếm 91% chi phí)

**Build mode messages = 188 credit (~14.5/ngày).** Tối ưu Cloud/AI giỏi lắm tiết kiệm 5-7 credit/tháng, trong khi build mode là chỗ tiết kiệm hàng trăm credit. Một số mẹo:

- Gộp nhiều yêu cầu nhỏ vào 1 message lớn thay vì 5 message rời.
- Đính kèm screenshot/path file cụ thể -> AI không phải scan nhiều file -> ít vòng lặp.
- Tránh đổi ý giữa chừng (cancel + redo tốn nhiều credit hơn).
- Plan mode (1 credit/message cố định) cho các task lớn để chốt scope trước, rồi build mode chỉ chạy 1-2 vòng.

## Quyết định cần anh xác nhận

Anh muốn em triển khai **Mức 1 Cloud** (3 quick-win không rủi ro) ngay bây giờ, hay để theo dõi thêm 2-3 ngày xem hiệu quả của đợt tắt cron + tối ưu streak trước rồi quyết định?  
  
ok hãy triển  khai mức 1 bây giờ 
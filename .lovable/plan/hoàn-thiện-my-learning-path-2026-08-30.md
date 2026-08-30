# Hoàn thiện My Learning Path

Lộ trình hiện đã chạy (13 môn, kế hoạch tuần, dự đoán sẵn sàng, nhận xét AI). Phần dưới là những mảng còn thiếu để module thành trung tâm học tập hàng ngày.

## 1. "Học tiếp ngay" và nhịp hàng ngày
- Khối nổi bật đầu trang: 1 việc tiếp theo duy nhất (hàm `nextStep` đã có nhưng chưa dùng ở UI), kèm nút vào học và nút tick hoàn thành.
- Chia kế hoạch tuần theo các ngày rảnh đã khai: mỗi ngày 1-2 việc, hôm nay được đánh dấu riêng.
- Thanh tiến độ tuần: số phút đã hoàn thành / số giờ cam kết, cộng cảnh báo nhẹ khi lệch nhịp.

## 2. Giữ kế hoạch ổn định và có lịch sử
- Hiện kế hoạch tuần được tính lại mỗi lần mở trang nên có thể đổi thứ tự; sẽ lưu toàn bộ các bước của tuần vào `learning_path_steps` một lần khi tuần bắt đầu và đọc lại từ đó (chỉ sinh mới khi chưa có tuần đó).
- Lịch sử: biểu đồ 8 tuần gần nhất (số việc hoàn thành, số phút) và chuỗi tuần đạt mục tiêu.
- Khách chưa đăng nhập: lưu tick theo tuần trong localStorage để không mất khi tải lại.

## 3. Nối với To-do & Study Goal đã có
- Nút "Đưa vào To-do" cho từng việc hoặc cả tuần, ghi vào `study_tasks` / `study_goals` để không tạo hệ thống việc thứ hai.
- Tick hoàn thành ở hai nơi đồng bộ theo một khóa chung.

## 4. Dữ liệu và độ chính xác
- Bổ sung nguồn tín hiệu còn thiếu vào `useLearningSignals`: `writing_attempts`, `pte_attempts`, `sat_mistakes`, `hsk_srs_progress`, `ielts_lecture_progress`, `toeic_lecture_progress`, `vff_progress`, `hskk_attempts`, `speaking_srs_items` cho các môn nói khác (hiện chỉ cộng cho IELTS).
- Hiện độ tin cậy của dự đoán ngay trên thẻ môn (low/medium/high) và câu giải thích ngắn "vì sao con số này".
- Trạng thái "chưa đủ dữ liệu": thay vì hiện 0%, gợi ý làm placement hoặc 1 bài đầu tiên.

## 5. Nhận xét AI mượt hơn
- Tự chạy nhận xét khi mở môn (một lần/ngày), cache theo `subject + tuần` để không tốn lượt gọi.
- Nhận xét gồm 3 phần rõ: điểm mạnh, việc ưu tiên tuần này, điều chỉnh lộ trình (ví dụ tăng/giảm giờ, đổi thứ tự kỹ năng).

## 6. Nhắc học và điểm vào
- Thêm thẻ "Lộ trình của tôi" ở `/dashboard` và ở trang chủ cho người đã đăng nhập (hiện chỉ có link trong menu).
- Email nhắc kế hoạch tuần sáng thứ Hai (giờ Việt Nam), dùng hạ tầng email và pg_cron đã có, có nút hủy nhận.

## 7. Chia sẻ tiến độ
- Xuất PDF 1 trang (song ngữ) cho phụ huynh/giáo viên: trình độ, mục tiêu, tiến độ, việc tuần này, phần cần cải thiện.
- Giáo viên xem lộ trình học sinh trong Management Center (RLS staff đã cho phép đọc).

## Chi tiết kỹ thuật
- `pathModel.ts`: thêm `distributePlanByDays`, `weeklyLoadSummary`, và tách phần giải thích số liệu (`explainReadiness`).
- `useLearningPath.ts`: thêm `ensureWeekPlan(subject)` (đọc-hoặc-sinh các bước của tuần), `weeklyHistory(subject)`, và cache nhận xét AI vào bảng bước hoặc localStorage.
- `useLearningSignals.ts`: thêm các truy vấn ở mục 4, chạy song song, giữ giới hạn số dòng để không nặng.
- Migration nhỏ: cột `plan_note` (text) trên `learning_path_steps` hoặc bảng `learning_path_notes` để cache nhận xét theo tuần, kèm GRANT + RLS theo `auth.uid()`.
- UI mới trong `src/components/personalization/`: `NextStepHero.tsx`, `WeekProgressBar.tsx`, `PathHistoryChart.tsx` (Recharts), `PathPdfExport.tsx`.
- Edge function `learning-path-weekly-email` cho nhắc thứ Hai; `learning-path-coach` giữ nguyên, thêm cấu trúc 3 phần.
- Giữ ràng buộc: mobile-first, chỉ dùng token màu brand, không dùng gạch ngang dài trong nội dung sinh ra, không nội dung bị khóa.

## Thứ tự triển khai
1. Lưu kế hoạch tuần ổn định + tick cho khách (mục 2).
2. "Học tiếp ngay", chia theo ngày, thanh tiến độ tuần (mục 1).
3. Bổ sung nguồn dữ liệu + độ tin cậy (mục 4).
4. Nối To-do & Study Goal (mục 3).
5. Cache và cấu trúc nhận xét AI (mục 5).
6. Điểm vào Dashboard/trang chủ + email thứ Hai (mục 6).
7. PDF và khung xem cho giáo viên (mục 7).

# Kiểm tra và ổn định luồng dữ liệu của Writing Skill Chart

Đã đọc `src/components/WritingSkillChart.tsx`, `src/pages/IeltsWritingPractice.tsx`, `src/components/ielts/FreeWritingGrader.tsx` và bảng `writing_attempts`. Luồng dữ liệu về cơ bản đúng (điểm 4 tiêu chí lấy từ `result.criteria` của các bài đã chấm), nhưng có 5 điểm chưa ổn định.

## Những gì đang chưa ổn

1. Bài chấm ở tab "Chấm bài tự do" (Smart Grading) đã lưu vào lịch sử nhưng biểu đồ không cập nhật - phải tải lại trang mới thấy.
2. Biểu đồ chỉ tải lại khi điểm tổng khác lần trước hoặc khi một bản nháp bị xoá. Nộp hai bài cùng band thì biểu đồ giữ số cũ.
3. Ô "Bài mới nhất" của 4 tiêu chí có thể lấy điểm từ 4 bài khác nhau, nên không thật sự là bài mới nhất.
4. Điểm từ AI không được kiểm tra: nếu trả về ngoài khoảng 0-9 hoặc dạng chuỗi thì cột/biểu đồ bị lệch.
5. Xoá một bài trong Lịch sử không làm biểu đồ cập nhật; đăng nhập/đăng xuất cũng không.

Phụ: console đang cảnh báo "Function components cannot be given refs" cho Writing Skill Chart và Free Writing Grader (không gây lỗi nhưng nên dọn).

## Sẽ sửa gì

- Một nguồn làm mới duy nhất cho biểu đồ: mỗi lần chấm xong (cả tab thường và tab chấm bài tự do), lưu bài xong, hoặc xoá bài trong Lịch sử, biểu đồ tự tải lại.
- "Bài mới nhất" lấy đúng 4 tiêu chí của cùng một bài gần nhất; tiêu chí thiếu hiển thị "-".
- Lọc và làm sạch điểm: chỉ nhận số trong khoảng 0-9, làm tròn 0.5 band, bỏ qua bản ghi hỏng.
- Trung bình ưu tiên 5 bài gần nhất (giữ hiển thị tổng số bài) để biểu đồ phản ánh trình độ hiện tại thay vì bị kéo bởi bài rất cũ.
- Mục tiêu band đọc từ mục tiêu đã lưu ở trang Performance thay vì cố định 7.0.
- Biểu đồ tải lại khi trạng thái đăng nhập đổi.

## Chi tiết kỹ thuật

- `src/components/WritingSkillChart.tsx`:
  - Thêm helper `normalizeCriteria(result)` trả về `Partial<Record<CritKey, number>>`: `Number(c.score)`, bỏ `NaN`, clamp 0-9, snap 0.5.
  - `latest` dựa trên bản ghi đầu tiên của `filtered` (một attempt duy nhất), không `find` riêng từng tiêu chí.
  - Trung bình: dùng tối đa 5 attempt gần nhất cho `radarData`; `trend` vẫn dùng toàn bộ (tối đa 30) và bỏ điểm không hợp lệ.
  - `targetBand` đọc `localStorage["ielts-performance-target-v1"]` (fallback 7), clamp 4-9.
  - Effect tải dữ liệu: phụ thuộc `[refreshKey]` + `supabase.auth.onAuthStateChange`, kèm listener `window.addEventListener("haiedu:writing-attempt-saved", ...)`.
  - Bọc component bằng `forwardRef<HTMLDivElement>` (hoặc wrapper `<div ref>`) để hết cảnh báo ref; làm tương tự cho `FreeWritingGrader`.
- `src/pages/IeltsWritingPractice.tsx`: sau khi insert `writing_attempts` thành công, `window.dispatchEvent(new Event("haiedu:writing-attempt-saved"))`; giữ nguyên `liveResult`/`refreshKey` hiện có.
- `src/components/ielts/FreeWritingGrader.tsx`: phát cùng event sau khi insert, và nhận prop tuỳ chọn `onGraded?({overall, criteria, taskType})` để trang có thể đồng bộ nếu cần.
- `src/components/WritingHistory.tsx`: phát cùng event sau khi xoá một bài (nếu có hành động xoá).
- Không đổi schema, RLS, route, ID, hay dữ liệu đã lưu.
- Kiểm tra: `npx tsgo --noEmit`; chấm thật một bài ở tab thường và một bài ở tab chấm bài tự do rồi xem biểu đồ tự cập nhật; xem lại console không còn cảnh báo ref; kiểm tra ở khổ desktop và điện thoại.

# Làm gọn phần Theory và chuẩn hóa dấu gạch ngang Programming

## Mục tiêu
- Bỏ ô nhãn `AI Deep-Dive` và nút `Original` khỏi tất cả bài học Programming.
- Luôn hiển thị trực tiếp bản Deep Dive tiếng Anh; chỉ dùng lý thuyết gốc làm phương án dự phòng khi bản Deep Dive chưa sẵn sàng.
- Thay toàn bộ dấu `—` và `–` trong phần lý thuyết Programming bằng dấu `-`.
- Giữ nguyên route, lesson/module ID, nội dung code, Knowledge Check, tiến độ, XP và cách chấm điểm.

## Hiện trạng đã xác minh
- Trang bài học hiện có nhãn `AI Deep-Dive` cạnh tiêu đề Theory và nút `Original` để chuyển qua lại giữa hai bản.
- Kho bản giảng hiện có 310 bản Deep Dive; 246 bản chứa dấu `—` hoặc `–`, tổng cộng 1.516 ký tự cần chuẩn hóa.
- Nội dung Deep Dive mới được tạo từ hàm AI riêng, nên cần chặn dấu gạch dài ngay từ lúc sinh nội dung để lỗi không quay lại.

## Các bước thực hiện

### 1. Bỏ hai ô khỏi giao diện
- Xóa nhãn `AI Deep-Dive` và nút chuyển `Original / Deep-Dive` trong tiêu đề Theory.
- Bỏ trạng thái chuyển đổi không còn cần thiết; khi có cache, trang luôn dùng bản Deep Dive.
- Giữ trạng thái chuẩn bị và thông báo dự phòng để học viên vẫn đọc được bài nếu bản Deep Dive tạm thời chưa tải được.
- Không thay đổi dấu ✨ nhỏ trong danh sách bài học vì đây là chỉ báo bài đã có sẵn, không phải ô `AI Deep-Dive` hoặc `Original` trong phần Theory.

### 2. Chuẩn hóa dấu gạch ngang
- Thêm một hàm chuẩn hóa dùng chung cho nội dung Theory, chuyển `—` và `–` thành `-` trước khi hiển thị.
- Áp dụng cho cả bản Deep Dive đã lưu và bản lý thuyết tiếng Anh dự phòng, để toàn bộ bài hiện tại được sửa ngay.
- Cập nhật hướng dẫn AI để mọi Deep Dive tạo mới chỉ dùng dấu `-`.
- Chuẩn hóa 310 bản đã lưu trong cơ sở dữ liệu để dữ liệu nguồn cũng sạch, không chỉ sửa ở lớp hiển thị.
- Chỉ thay hai ký tự gạch dài trong văn bản; không sửa toán tử trừ, dấu âm, comment, cú pháp code hay dấu gạch ASCII vốn có.

### 3. Audit và kiểm tra
- Mở các bài đại diện thuộc Python, SQL, AI, Cybersecurity, DSA và Prompt Engineering trên máy tính và điện thoại.
- Xác nhận không còn ô `AI Deep-Dive`, nút `Original`, dấu `—` hoặc `–` trong nội dung Theory.
- Xác nhận bản Deep Dive vẫn xuất hiện ngay, hình minh họa, Markdown, bảng, code và công thức vẫn hiển thị đúng.
- Kiểm tra phương án dự phòng khi Deep Dive không sẵn sàng, đồng thời chạy TypeScript, lint và audit Programming English.

## Chi tiết kỹ thuật
- `src/pages/ProgrammingLesson.tsx`: bỏ toggle cùng UI liên quan, luôn ưu tiên `enhancedMd`, chuẩn hóa dấu trước khi truyền Markdown vào phần hiển thị.
- `supabase/functions/enhance-programming-theory/index.ts`: thêm quy tắc cấm em dash/en dash và chuẩn hóa kết quả trước khi cache/trả về.
- Thực hiện cập nhật có giới hạn trên cột nội dung của `programming_theory_cache`, không đổi schema, quyền truy cập hoặc khóa cache.

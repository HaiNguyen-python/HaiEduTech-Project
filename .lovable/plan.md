# Rà soát và sửa toàn bộ nội dung Theory Programming

## Mục tiêu
- Loại bỏ các đoạn công thức, ký hiệu và Markdown bị hiển thị thành mã thô như hình ở bài Reinforcement Learning.
- Bảo đảm nội dung 310 bài Programming rõ ràng trên máy tính và điện thoại, không sửa route, ID, tiến độ, Knowledge Check hoặc XP.

## Phạm vi triển khai

### 1. Sửa bộ xử lý Markdown và công thức
- Chuẩn hóa trường hợp ký hiệu LaTeX bị bọc sai trong `**...**`, ví dụ `**\hat{P}, \hat{R}**`, thành công thức KaTeX hợp lệ.
- Bảo vệ toàn bộ inline math, display math, code, bảng, Mermaid và liên kết trước khi tự động in đậm thuật ngữ.
- Không tự suy đoán mọi chuỗi có dấu gạch chéo là công thức; chỉ chuyển đổi các mẫu LaTeX đủ chắc chắn để tránh làm hỏng văn bản thường.
- Giữ công thức nội dòng trong câu và công thức dài thành khối riêng, có cuộn ngang an toàn trên màn hình nhỏ.

### 2. Rà soát dữ liệu của 310 bài
- Quét các mẫu lỗi đã xác nhận: Markdown nằm trong công thức, LaTeX nằm trong dấu in đậm, dấu `$` thừa, công thức thiếu delimiter và chuỗi giống công thức nằm trong code.
- Dọn các bản ghi lỗi theo quy tắc xác định, không viết lại nội dung bài học và không gọi AI tạo lại theory.
- Kiểm tra riêng các nhóm có nhiều toán như AI, Machine Learning, Reinforcement Learning, Data Science, Algorithms và Statistics.

### 3. Thêm kiểm thử chống tái phát
- Tách phần chuẩn hóa công thức thành hàm có thể kiểm thử độc lập.
- Thêm ca kiểm thử cho `\hat{P}`, phân số, tổng, ma trận, xác suất có dấu `|`, công thức liên tiếp, inline code, bảng Markdown và Mermaid.
- Mở rộng script audit để báo lỗi nếu cache mới chứa Markdown/LaTeX kết hợp sai hoặc delimiter không cân bằng.

### 4. Kiểm duyệt thực tế
- Chạy TypeScript, lint, unit tests và Programming English audit.
- Kiểm tra bằng trình duyệt các bài đại diện ở desktop và mobile: công thức phải render, không còn mã LaTeX đỏ/thô, không tràn ngang và các mục thu gọn vẫn hoạt động.
- Xác nhận toàn bộ 310 bài không còn mẫu lỗi đã quét trước khi hoàn tất.

## Chi tiết kỹ thuật đã xác nhận
- Cache hiện có 310 bài; truy vấn phát hiện 38 bài có mẫu Markdown chen vào vùng giống công thức, 111 bài có mẫu toán nằm gần dấu in đậm, 2 bài có ba dấu `$` và 1 bài có bốn dấu `$`.
- Bài `rl-01-foundations` chứa trực tiếp `**\hat{P}, \hat{R}**`, đúng với lỗi hiển thị trong ảnh.
- Việc sửa sẽ áp dụng ở cả lớp hiển thị và dữ liệu cache để nội dung hiện tại lẫn nội dung mới đều ổn định.

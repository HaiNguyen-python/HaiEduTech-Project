# Chuẩn hóa indentation cho toàn bộ code trong Programming

## Mục tiêu
- Mọi đoạn code trong các bài Programming được thụt lề đúng theo ngôn ngữ và giữ nguyên khi hiển thị, sao chép.
- Không thay đổi route, ID bài học, nội dung kiến thức, hình minh họa, Knowledge Check, tiến độ hay XP.
- Giữ toàn bộ nội dung code bằng tiếng Anh và không thêm dấu gạch dài.

## Phạm vi đã xác nhận
- Nội dung Deep Dive hiện có cache cho 310 bài và chứa code thuộc nhiều nhóm: Python, TypeScript/JavaScript, SQL, YAML, HTML/CSS, Bash, Java, JSON, HCL và Mermaid.
- Nhiều đoạn Python/TypeScript/SQL đang dùng 1-3 khoảng trắng cho các cấp lệnh; ví dụ Python trong ảnh chỉ thụt một khoảng trắng ở thân hàm, vòng lặp và khối điều kiện.
- Khối hiển thị code hiện cho phép xuống dòng tự động, nên dòng dài có thể trông như mất cấu trúc indentation.
- Kiểm tra nội dung Programming hiện chưa có quy tắc phát hiện indentation sai trong fenced code.

## Triển khai

### 1. Bộ chuẩn hóa code dùng chung
- Tách tất cả fenced code khỏi Markdown và xác định ngôn ngữ từ nhãn code block.
- Chuẩn hóa tab thành khoảng trắng, bỏ khoảng trắng cuối dòng và phần thụt lề dư bao quanh toàn khối.
- Chuẩn hóa theo convention:
  - Python: 4 khoảng trắng mỗi cấp.
  - JavaScript, TypeScript, TSX, JSON, CSS, HTML, YAML, Bash, Java, HCL và Mermaid: 2 khoảng trắng mỗi cấp.
  - SQL: căn lề nhất quán cho mệnh đề và khối lồng nhau, không đổi câu lệnh.
- Bảo vệ chuỗi nhiều dòng, nội dung text/ascii, comment, literal và Mermaid để không làm thay đổi ý nghĩa.
- Chỉ sửa khối có cấu trúc xác định an toàn; khối mơ hồ sẽ được báo cáo để sửa có kiểm soát thay vì tự động đoán.

### 2. Sửa toàn bộ nội dung hiện có
- Quét nguồn bài học Programming, code mẫu chính, Python Pathway, DSA, Prompt Engineering và các nguồn curriculum liên quan.
- Quét đủ 310 bản Deep Dive đang dùng; sửa trực tiếp fenced code mà không viết lại theory, công thức hay hình ảnh.
- Kiểm tra riêng các cấu trúc nhạy cảm: Python `def/if/for/while/try/with/class`, object/array lồng nhau, callback, SQL CTE/subquery, YAML nesting và Mermaid flow.
- Giữ nguyên code chạy được, tên biến, comment, output minh họa và ngôn ngữ code.

### 3. Ngăn lỗi quay lại
- Áp dụng bộ chuẩn hóa trước khi lưu nội dung Deep Dive mới vào cache.
- Bổ sung yêu cầu indentation rõ ràng trong quy tắc tạo nội dung.
- Mở rộng audit Programming để kiểm tra tab, mixed indentation, cấp thụt lề không hợp lệ, dòng thuộc block nhưng không được indent và fence bị hỏng.
- Audit sẽ báo chính xác bài, ngôn ngữ và số dòng để xử lý nhanh.

### 4. Hiển thị đúng như code chuẩn
- Giữ nguyên khoảng trắng bằng chế độ `pre`, không tự ngắt dòng code.
- Dòng dài cuộn ngang trên desktop và mobile để indentation không bị biến dạng.
- Nút Copy lấy đúng bản code đã chuẩn hóa đang hiển thị.
- Không thay đổi màu sắc hoặc bố cục ngoài phần cần thiết cho khả năng đọc code.

## Kiểm thử và nghiệm thu
- Unit test cho các cấp indentation lồng nhau, tab/mixed spaces, multiline strings, SQL, YAML, Mermaid và code không có nhãn ngôn ngữ.
- Chạy TypeScript, lint, test và audit English/formatting hiện có.
- Xác nhận toàn bộ 310/310 bài cache đã được quét; không còn lỗi indentation được audit nhận diện.
- Kiểm duyệt các bài đại diện nhiều code trên desktop 1280px và mobile 390px: Python, AI/ML, Data Engineering, SQL, Web, Cloud, Cybersecurity và Prompt Engineering.
- Xác nhận code hiển thị đúng, Copy đúng, không tràn trang và không có lỗi trình duyệt.

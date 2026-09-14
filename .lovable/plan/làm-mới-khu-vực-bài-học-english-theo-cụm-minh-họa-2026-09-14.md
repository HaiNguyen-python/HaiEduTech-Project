# Làm mới khu vực bài học English theo cụm minh họa

## Mục tiêu

Biến khu vực **Interactive Learning Modules** thành các cụm học trực quan theo hướng **Educational cluster cards** đã chọn: hình nền chibi giáo dục dịu, chữ lớn và đậm hơn, ít ô xuất hiện cùng lúc. Giữ nguyên toàn bộ bài học, đường dẫn, ID và tiến độ.

## Cấu trúc hiển thị

### 1. Giữ 6 nhóm chương trình hiện có

- IELTS
- TOEIC
- Cambridge
- Thi THPT Quốc gia
- Ngữ pháp
- SAT

Mỗi nhóm vẫn đóng/mở độc lập. Chỉ nhóm IELTS mở mặc định để trang không quá dài.

### 2. Ghép module thành cụm kỹ năng

Bên trong mỗi nhóm, thay danh sách hàng chục ô bằng các thẻ cụm lớn:

- **IELTS**: Vocabulary, Writing, Reading, Listening, Speaking & Grammar.
- **TOEIC**: Listening, Reading, Business English.
- **Cambridge**: Starters, Movers, Flyers & Skills.
- **Thi THPT**: Grammar, Reading, Strategy & Practice.
- **Ngữ pháp**: Foundations, Sentence Building, Clauses, Advanced Structures, Usage & Mechanics, Vocabulary Patterns.
- **SAT**: Reading, Writing & Language, Vocabulary, Algebra & Functions, Geometry & Data, Strategy & Mock Review.

Mỗi thẻ cụm hiển thị tên kỹ năng, số chuyên đề và tổng số bài. Khi bấm mở, danh sách module con xuất hiện ngay trong cụm với liên kết đến đúng trang hiện tại.

### 3. Hình nền minh họa

- Tạo một bộ hình chibi giáo dục đồng nhất theo từng cụm kỹ năng, ví dụ học viên đeo tai nghe cho Listening, viết bảng cho Writing, đọc sách cho Reading và giải toán cho SAT Math.
- Hình đặt lệch về một phía, có lớp phủ sáng để chữ luôn rõ.
- Dùng ảnh tối ưu qua hệ thống tài nguyên của dự án, tải lười và không dùng ảnh bên ngoài.
- Không thay ảnh người dùng đã cung cấp ở nơi khác; hai ảnh chụp hiện tại chỉ dùng làm tham chiếu.

### 4. Chữ và mức độ nổi bật

- Giữ **Sora** cho tiêu đề và **Manrope** cho nội dung.
- Tăng cỡ và độ đậm của tiêu đề nhóm, tiêu đề cụm, mô tả và số bài; nội dung trên điện thoại không nhỏ hơn 16px ở các phần chính.
- Dùng token Royal Blue, Soft Emerald, Warm Gold và nền sáng hiện có; không dùng nút đen hoặc màu chữ chìm trên ảnh.
- Các thẻ có góc bo tối đa 8px theo hệ thống HaiEduTech, thay vì sao chép độ bo lớn trong bản mẫu.

### 5. Tương tác và hiển thị điện thoại

- Desktop dùng lưới 2-3 cột tùy nhóm; các cụm lớn có chiều cao ổn định và hàng chữ thẳng nhau.
- Điện thoại chuyển về một cột, hình không lấn chữ, danh sách bài con không tràn ngang.
- Hiệu ứng mở cụm, rê chuột và dịch chuyển ảnh nhẹ; tự giảm khi thiết bị bật hạn chế chuyển động.
- Có trạng thái mở rõ ràng và hỗ trợ bàn phím/trình đọc màn hình.

## Chi tiết kỹ thuật

- Tách cấu hình ghép cụm và phần hiển thị thành component nhỏ thay vì tiếp tục làm dài trang `English`.
- Ánh xạ module vào cụm bằng ID hiện có, không sửa dữ liệu bài học và không tạo ID mới cho module.
- Nếu một module chưa khớp cấu hình, tự đưa vào cụm dự phòng để không có bài nào biến mất.
- Dùng các component điều khiển sẵn có và semantic design tokens; không lồng card trang trí trong card.

## Kiểm tra hoàn tất

- Kiểm tra tổng số module và tổng số bài trước/sau khi ghép phải khớp tuyệt đối.
- Kiểm tra mọi liên kết module mở đúng route và tiến độ cũ không đổi.
- Kiểm tra TypeScript, lint và bài kiểm thử liên quan.
- Kiểm tra trực tiếp `/english` ở desktop 1280px và mobile 390px: chữ rõ, ảnh tải đúng, không chồng lấn, không tràn ngang, thao tác đóng/mở hoạt động.

# Nâng cấp Shadowing thành phòng luyện giọng sinh động

## Hướng thiết kế đã chọn

- Phong cách: **Vibrant glassmorphism** theo cấu trúc phòng luyện tập.
- Màu khóa: nền sáng `#F8FAFC`, Royal Blue `#3B82F6`, Emerald `#10B981`, Warm Gold `#F59E0B`.
- Kiểu chữ: **Sora** cho tiêu đề, **Manrope** cho nội dung.
- Cảm giác: hiện đại, giàu nhịp điệu và khích lệ, nhưng không biến thành trò chơi gây xao nhãng.

## Những gì sẽ xây dựng

### 1. Biến thẻ câu thành một “studio luyện giọng”
- Đưa hình chibi đúng chủ đề của câu hiện tại vào đầu khu luyện tập, dùng bộ 12 hình đã có và phương án emoji dự phòng.
- Hiển thị tên chủ đề, tiến độ câu và điểm trung bình thành một thanh trạng thái gọn.
- Giữ câu mẫu, IPA và bản dịch trong vùng đọc tập trung, tương phản cao, không lồng quá nhiều ô.

### 2. Thêm nhịp nghe và trạng thái thu âm trực quan
- Thêm dải sóng âm phản hồi theo ba trạng thái: chờ, đang phát mẫu và đang thu giọng.
- Khi phát mẫu, dải sóng chuyển Royal Blue sang Emerald; khi thu âm, nút chính có vòng nhịp nhẹ và bộ đếm rõ ràng.
- Tôn trọng chế độ giảm chuyển động; không tạo hiệu ứng nhấp nháy mạnh.

### 3. Làm câu luyện tập dễ bắt nhịp hơn
- Chia câu dài thành các cụm nói tự nhiên để người học dễ nhìn và bắt chước.
- Khi có kết quả, tô từng từ theo đúng/gần đúng/cần sửa bằng màu ngữ nghĩa hiện có.
- Giữ nguyên nội dung câu, IPA, bản dịch và thuật toán chấm hiện tại.

### 4. Nâng cấp phản hồi sau mỗi lượt nói
- Hiện hai đồng hồ rõ ràng cho độ chính xác và nhịp nói, kèm tốc độ người học so với mẫu.
- Thêm phản hồi ngắn theo mức kết quả và trạng thái “sẵn sàng thử lại”.
- Giữ nguyên việc ghi nhận từ yếu, điểm hoàn hảo và tiến độ hiện tại.

### 5. Hoàn thiện điều hướng và khả năng tiếp cận
- Giữ đủ Nghe mẫu, Chậm 0.7x, Nói lại/Dừng, Câu trước và Câu tiếp.
- Dùng nút chuẩn của hệ thống, nhãn đọc màn hình, trạng thái thông báo trực tiếp và vùng bấm đủ lớn trên điện thoại.
- Bố cục một cột trên di động, không tràn ngang; hình và điều khiển không che câu hoặc phản hồi.

## Chi tiết kỹ thuật

- Giữ nguyên route `/speaking-coach/:language`, IDs, dữ liệu sáu ngôn ngữ, khóa lưu trữ, TTS, nhận diện giọng nói và hợp đồng chấm điểm.
- Khi tạo danh sách 200 câu Shadowing, giữ liên kết giữa mỗi câu và chủ đề để chọn đúng hình minh họa.
- Dùng token riêng cho phạm vi Speaking Coach thay vì màu cứng trong thành phần; bổ sung Sora/Manrope theo cách tải font hiện có của dự án.
- Dải sóng dùng CSS/Motion nhẹ theo trạng thái thực tế, không giả làm phân tích âm thanh chi tiết nếu trình duyệt không cung cấp dữ liệu biên độ.

## Kiểm tra hoàn tất

- Kiểm tra kiểu dữ liệu và các bài kiểm thử Speaking Coach hiện có.
- Kiểm tra nghe, phát chậm, thu/dừng, chấm điểm, thử lại, trước/sau và cập nhật từ yếu.
- Kiểm tra cả 6 ngôn ngữ trên máy tính và điện thoại, gồm dark mode, giảm chuyển động, không tràn ngang và không có lỗi trang.

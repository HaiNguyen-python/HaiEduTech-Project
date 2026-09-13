# Sắp xếp lại trang English Overview theo lưới ưu tiên

## Mục tiêu

Làm trang `/english` dễ quét và dễ chọn điểm bắt đầu hơn, theo phương án **Modern bento learning hub** đã chọn. Giữ nguyên nội dung, đường dẫn, chức năng, dữ liệu và song ngữ; chỉ thay đổi thứ tự, cách nhóm và mức độ nổi bật.

## Hiện trạng đã xác minh

- Phần đầu hiện lần lượt gồm banner giới thiệu, hai dải hành động riêng cho IELTS Writing và Pronunciation, bảng dữ liệu thu gọn, rồi 5 thẻ chương trình.
- Các mục có kiểu trình bày gần giống nhau nên cạnh tranh sự chú ý; IELTS Writing và Pronunciation bị tách khỏi nhóm chương trình liên quan.
- Các thẻ chương trình chứa nhiều đoạn mô tả và danh sách dài, khiến chiều cao không đều và khó nhìn nhanh.
- Các công cụ hỗ trợ như Fun Fact, Word of the Day, từ điển, bài học tương tác, Speaking Coach, tài liệu và đánh giá kỹ năng đang xếp nối tiếp thành một trang rất dài.
- Sora và Manrope cùng màu Royal Blue, Emerald, Warm Gold đã có trong hệ thống giao diện hiện tại.

## Cấu trúc mới

### 1. Phần mở đầu gọn hơn

- Giữ hình nền English hiện tại nhưng giảm chiều cao và khoảng trống.
- Tiêu đề, mô tả và nhãn chương trình nằm trong một khối rõ ràng, không thêm nội dung mới.
- Bên dưới đặt tiêu đề nhóm ngắn để người học hiểu ngay đây là nơi chọn lộ trình.

### 2. Lưới ưu tiên chính

Tạo một lưới bento có thứ bậc rõ ràng:

- **Ô lớn IELTS**: giới thiệu lộ trình IELTS và đưa hai hành động quan trọng vào cùng một nơi: học chương trình và luyện Writing.
- **Ô Pronunciation**: lối vào luyện phát âm, ngắn gọn và nổi bật bằng Emerald.
- **Các ô TOEIC, Conversational và SAT**: cùng chiều cao, chỉ giữ mô tả ngắn, cấp độ và tối đa 2 điểm nổi bật.
- **Ô Songs**: nhỏ hơn, mang sắc Warm Gold để thể hiện đây là hoạt động bổ trợ.
- Toàn bộ ô có CTA rõ ràng, không dùng nút màu đen, không lồng thẻ trong thẻ.

### 3. Đưa bảng dữ liệu xuống vai trò tham khảo

- Chuyển `Interactive Data Dashboard` xuống sau lưới chương trình.
- Giữ trạng thái thu gọn mặc định và toàn bộ bộ lọc, biểu đồ hiện có.
- Làm tiêu đề gọn hơn để không cạnh tranh với lộ trình học chính.

### 4. Gom các công cụ theo mục đích

Sau phần chương trình và dữ liệu, chia nội dung còn lại thành ba nhóm rõ ràng:

1. **Luyện mỗi ngày**: Fun Fact, Word of the Day và từ điển.
2. **Học theo kỹ năng**: bài học tương tác và Speaking Coach.
3. **Đánh giá và tài liệu**: Assessment, Placement và Learning Resources.

Mỗi nhóm có tiêu đề ngắn, khoảng cách nhất quán và thứ tự hợp lý. Không bỏ tính năng nào.

### 5. Chuẩn hóa giao diện

- Giữ bảng màu đã chọn: Royal Blue `#3B82F6`, Emerald `#10B981`, Warm Gold `#F59E0B`, nền sáng `#F8FAFC`, triển khai qua token giao diện.
- Sora cho tiêu đề, Manrope cho nội dung.
- Thẻ tối đa bo góc 8px theo hệ thống chung; độ đổ bóng nhẹ, viền rõ, không dùng hiệu ứng trang trí gây nhiễu.
- Các ô trong cùng hàng có chiều cao ổn định; nội dung dài được giới hạn hợp lý để CTA thẳng hàng.
- Hiệu ứng xuất hiện và rê chuột nhẹ; tắt hoặc giảm khi thiết bị bật hạn chế chuyển động.

### 6. Hiển thị trên điện thoại

- Bento chuyển thành một cột theo đúng thứ tự ưu tiên: IELTS, Pronunciation, TOEIC, Conversational, SAT, Songs.
- CTA chiếm chiều rộng phù hợp, chữ không tràn và không bị che bởi Dictionary hoặc chatbot nổi.
- Bảng dữ liệu, danh sách bài học và các nhóm công cụ tiếp tục thu gọn để trang không quá dài.

## Chi tiết kỹ thuật

- Tổ chức lại `src/pages/English.tsx`, tách dữ liệu hiển thị và phần bento thành component nhỏ nếu cần để file dễ bảo trì.
- Dùng `Button` và các thành phần giao diện hiện có cho mọi hành động; giữ nguyên toàn bộ URL hiện tại.
- Giữ `CollapsibleDataDashboard` và `LanguageDataDashboard`, chỉ đổi vị trí và trình bày phần đóng/mở.
- Không thay đổi backend, cấu trúc dữ liệu, SEO, khóa lưu tiến độ hay nội dung chương trình.

## Kiểm tra hoàn tất

- Kiểm tra TypeScript, lint và các bài kiểm thử liên quan.
- Kiểm tra trực tiếp `/english` ở desktop 1280px và mobile 390px.
- Xác nhận tất cả CTA mở đúng trang; không có nội dung chồng lấn, thẻ lệch hàng hoặc tràn ngang.
- Xác nhận tiếng Việt và tiếng Anh đều rõ ràng, bảng dữ liệu vẫn đóng/mở và lọc bình thường.

# Thêm avatar hội thoại và hình minh họa bài học tiếng Trung

## Mục tiêu
- Thay vòng tròn chữ A/B trong toàn bộ phần hội thoại của Interactive Chinese Curriculum bằng ảnh avatar chibi của hai nhân vật.
- Thêm hình minh họa theo chủ đề ở đầu tiêu đề của từng bài học.
- Giữ nguyên 103 bài, route, ID, tiến độ, audio/TTS, bài tập và dữ liệu song ngữ.

## Thay đổi giao diện
1. **Avatar hai nhân vật trong hội thoại**
   - Dùng bộ avatar chibi giáo dục hiện có của HaiEduTech.
   - Gán avatar ổn định theo `lesson id + speaker`, để nhân vật A/B không đổi khuôn mặt giữa các câu trong cùng bài.
   - Giữ bố cục hội thoại trái/phải, tăng kích thước avatar vừa đủ rõ trên desktop và mobile.
   - Thêm tên vai và mô tả ảnh hỗ trợ trình đọc màn hình; nếu ảnh lỗi sẽ hiện chữ A/B như hiện tại.

2. **Hình minh họa đầu bài học**
   - Chọn ảnh theo từ khóa chủ đề bài học như chào hỏi, nhà hàng, mua sắm, du lịch, sức khỏe, công việc và học tập.
   - Đặt ảnh ở phần đầu tiêu đề bài, cùng tên bài, HSK, mô tả và trạng thái hoàn thành.
   - Dùng khung ảnh có tỷ lệ ổn định, cắt ảnh hợp lý và tải trì hoãn để không làm chậm trang.
   - Có ảnh mặc định phù hợp khi bài không khớp chủ đề cụ thể.

3. **Tính nhất quán và khả năng đọc**
   - Giữ bảng màu sáng Royal Blue, Emerald, Warm Gold và typography Sora + Manrope.
   - Bảo đảm avatar, bong bóng thoại và hình đầu bài không chồng lấn hoặc gây tràn ngang trên màn hình nhỏ.
   - Không dùng ảnh chụp màn hình người dùng làm tài nguyên; ảnh đó chỉ là mẫu tham chiếu vị trí.

## Kỹ thuật và kiểm tra
- Tái sử dụng hệ thống chọn avatar và thư viện ảnh chủ đề hiện có, mở rộng ánh xạ cho nội dung tiếng Trung khi cần.
- Bổ sung fallback ảnh và alt text phù hợp.
- Kiểm tra TypeScript, lint và các bài kiểm thử liên quan.
- Kiểm tra trực tiếp bài học trên desktop và mobile, gồm nhiều tình huống có hai người nói, nút nghe, chuyển tab và chuyển bài.

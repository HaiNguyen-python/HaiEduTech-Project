# Mở công khai chương trình và gửi email đăng ký

## Mục tiêu
- Bỏ dòng ghi chú "Học phí kèm riêng 1-1 bằng 3 lần học phí lớp nhóm..." bên dưới bảng giá.
- Cho mọi người xem trang giới thiệu `/english`, `/chinese` và `/programming`, dù chưa đăng nhập hoặc chưa có Premium.
- Giữ nguyên khóa Premium cho mọi trang bài học, bài luyện, đề thi, game và công cụ nằm bên trong các chương trình.
- Cho mọi người mở `/register` và gửi đăng ký tư vấn.
- Sau khi gửi hợp lệ, lưu đăng ký và gửi email đầy đủ thông tin đến `hainguyen240195@gmail.com`.

## Thay đổi
1. **Bảng học phí**
   - Xóa riêng dòng chú thích cuối bảng; giữ nguyên giá lớp nhóm và cột giá 1-1 đã tính sẵn.

2. **Quyền xem công khai**
   - Chỉ mở chính xác bốn địa chỉ `/english`, `/chinese`, `/programming`, `/register`.
   - Không mở theo tiền tố, để các địa chỉ con như bài học vẫn yêu cầu đăng nhập và Premium.

3. **Biểu mẫu đăng ký**
   - Giữ việc lưu đăng ký hiện tại.
   - Chuẩn hóa kiểm tra tên, điện thoại, email, chương trình, trình độ và ghi chú trước khi gửi.
   - Chỉ báo thành công khi cả dữ liệu đăng ký và yêu cầu gửi email đã được tiếp nhận; nếu email lỗi, hiển thị thông báo rõ ràng thay vì âm thầm bỏ qua.
   - Email gửi đến thầy gồm họ tên, điện thoại, email, chương trình, trình độ, ghi chú và thời gian gửi.

4. **Kích hoạt gửi email**
   - Hiện dự án chưa có miền gửi email hoạt động. Cần thiết lập lại miền gửi của HaiEduTech, sau đó hoàn tất và triển khai luồng email đăng ký hiện có.

## Kiểm tra
- Khách chưa đăng nhập mở được cả ba trang chương trình và trang đăng ký.
- Khách vẫn bị chặn khi mở một bài học con.
- Kiểm tra biểu mẫu trên máy tính và điện thoại, gồm thiếu trường bắt buộc, email sai định dạng và gửi thành công.
- Xác nhận email đăng ký đến đúng địa chỉ của thầy và bản đăng ký vẫn được lưu.

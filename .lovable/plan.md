# Chuẩn hóa phát âm Bảng chữ cái Tiếng Việt

## Mục tiêu
- Sửa toàn bộ 29 chữ để không còn đọc theo tiếng Anh hoặc trộn lẫn tên chữ với âm học vần.
- Giữ nguyên trang `/learn-vietnamese/alphabet`, dữ liệu tiến độ và các chức năng luyện viết hiện có.
- Dùng giọng Hà Nội rõ, tự nhiên cho 29 chữ và 6 thanh.

## Nội dung thực hiện
1. **Chuẩn hóa hai lớp phát âm**
   - Tách rõ `Tên chữ` dùng khi đọc bảng chữ cái, ví dụ C là `xê`.
   - Tách rõ `Âm học vần` dùng khi ghép vần lớp Một, ví dụ C là `cờ`.
   - Rà soát đủ 29 cặp, đặc biệt Ă, Â, Q, L, M, N, R, S, X, Y theo tài liệu giáo dục hiện hành.

2. **Sửa nội dung hiển thị**
   - Không dùng tên tiếng Anh như `seh`, `eks` trong giao diện tiếng Việt.
   - Hiển thị riêng tên chữ, âm học vần và IPA của âm, tránh dòng gộp gây hiểu nhầm như `seh - /k/`.
   - Giữ từ mẫu và làm rõ âm đầu cần nghe.

3. **Làm phát âm ổn định**
   - Không gửi ký tự đơn lẻ để máy tự đoán cách đọc.
   - Dùng một bảng lệnh phát âm cố định cho từng chữ và từng chế độ.
   - Siết lời dẫn để giọng đọc không đổi sang tên chữ tiếng Anh, không đọc lời hướng dẫn và không thêm từ.
   - Đổi phiên bản bộ nhớ âm thanh để loại bỏ các bản đọc sai đã lưu.
   - Giữ âm thanh dự phòng, nhưng không cho phép giọng không hỗ trợ tiếng Việt đọc thay.

4. **Kiểm định toàn bộ**
   - Kiểm tra tự động đủ 29 tên chữ, 29 âm học vần và 6 thanh, không thiếu hoặc trùng.
   - Nghe thử các trường hợp dễ sai: C, Q, S, X, Ă, Â, L, M, N, R, Y.
   - Kiểm tra trang trên máy tính và điện thoại, gồm chọn chữ, tự phát âm, các nút nghe và luyện viết.
   - Kiểm tra TypeScript và quy tắc mã nguồn trước khi hoàn tất.

## Chi tiết kỹ thuật
- Bổ sung nhãn âm học vần riêng trong dữ liệu phát âm, không thay đổi ID chữ cái.
- Cập nhật hàm phát âm phía máy chủ để phân biệt nghiêm ngặt `letter-name`, `letter-sound`, `example`, `tone`.
- Tăng phiên bản khóa lưu âm thanh để không tái sử dụng bản cũ.
- Ưu tiên bộ âm thanh đã kiểm duyệt cố định cho kho hữu hạn này; phát sinh tự động chỉ là lớp dự phòng.

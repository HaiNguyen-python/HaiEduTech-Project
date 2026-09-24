# Chuẩn hóa phát âm Bảng chữ cái tiếng Việt

## Mục tiêu
Phần nghe tại `/learn-vietnamese/alphabet` phát âm ổn định theo giọng Hà Nội, phân biệt rõ tên chữ, âm của chữ, từ ví dụ và sáu thanh điệu.

## Phạm vi thực hiện
1. **Rà soát toàn bộ dữ liệu phát âm**
   - Kiểm tra 29 chữ cái, tên chữ, âm vị IPA, từ ví dụ và 6 mẫu thanh `ma, má, mà, mả, mã, mạ`.
   - Tách rõ “tên chữ” và “âm khi ghép vần” để tránh trường hợp như `X` hiển thị một tên nhưng nút nghe chỉ gửi ký tự `x` cho máy tự đoán.
   - Chuẩn hóa nội dung theo giọng Hà Nội và giữ chú thích khác biệt vùng miền khi cần.

2. **Tạo luồng âm thanh riêng cho bảng chữ cái**
   - Dùng Lovable AI Text-to-Speech phía máy chủ với chỉ dẫn bắt buộc: giọng nữ Hà Nội rõ, tự nhiên, tốc độ vừa, đọc đúng một mục tiêu, không thêm lời dẫn.
   - Mỗi yêu cầu truyền loại nội dung rõ ràng: tên chữ, âm chữ, từ ví dụ hoặc thanh điệu. Không còn gửi ký tự đơn lẻ thiếu ngữ cảnh.
   - Giữ khóa truy cập hoàn toàn phía máy chủ, kiểm tra đầu vào và trả đúng lỗi an toàn nếu dịch vụ âm thanh không khả dụng.

3. **Cải thiện trải nghiệm nghe**
   - Trong bảng chi tiết, cung cấp nút nghe riêng cho **Tên chữ**, **Âm chữ** và **Từ ví dụ**.
   - Giữ phần so sánh sáu thanh, nhưng phát từng mẫu với cùng một giọng và nhịp để người học nghe được khác biệt cao độ chính xác hơn.
   - Thêm trạng thái đang tải, đang phát và thông báo lỗi rõ ràng; ngăn nhiều đoạn âm thanh chồng lên nhau.

4. **Độ ổn định và hiệu năng**
   - Lưu lại âm thanh theo chữ, loại âm và phiên bản giọng để lần nghe sau nhanh hơn, không tạo lại không cần thiết.
   - Chỉ dùng giọng thiết bị như phương án dự phòng cuối cùng; nếu dùng, phải chọn `vi-VN` và nội dung đọc đã được chuẩn hóa.
   - Không thay đổi route, dữ liệu tiến độ, luyện viết hoặc các phần Vietnamese khác.

5. **Kiểm định trước khi hoàn tất**
   - Kiểm tra tự động đủ 29 chữ, 29 từ ví dụ và 6 thanh, không thiếu nội dung hoặc trùng khóa.
   - Gọi thử dịch vụ âm thanh thật và kiểm tra phản hồi trước khi xác nhận hoàn tất.
   - Nghe và thao tác trực tiếp các nhóm dễ sai như `ă/â`, `d/đ`, `g`, `q`, `r/s/x`, `ơ/ư`, cùng chuỗi sáu thanh trên máy tính và điện thoại.

## Chi tiết kỹ thuật
- Mở rộng dữ liệu chữ cái với trường phát âm tường minh thay vì suy diễn từ ký tự hiển thị.
- Tạo một Edge Function chuyên biệt hoặc mở rộng an toàn hàm Vietnamese TTS bằng chế độ `alphabet`, dùng mô hình TTS mặc định hiện hành và giọng Hà Nội được chỉ dẫn trong nội dung.
- Giữ cơ chế dừng âm thanh hiện có, bổ sung cache có phiên bản và xử lý lỗi theo đúng mã phản hồi; chỉ thử lại có giới hạn với lỗi tạm thời.

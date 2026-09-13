# Rà soát và hoàn thiện luyện đặt câu IELTS Speaking

## Kết quả rà soát hiện tại

- Toàn bộ 3.900 lượt hiển thị cụm từ theo Part và chủ đề đều có câu ví dụ; kiểm thử dữ liệu và 6 kiểm thử logic hiện có đều đạt.
- Phần học đã có nghe câu mẫu, thu âm, bản ghi trực tiếp, AI chấm 4 tiêu chí, câu sửa, câu nâng cấp, nghe lại và lưu điểm tốt nhất.
- Còn các điểm cần hoàn thiện trước khi coi là ổn định:
  - Phần lớn câu ví dụ đang được tạo bằng mẫu chung; audit ghi nhận 108 nhóm mẫu lặp nên một số câu có thể đúng máy móc nhưng chưa tự nhiên theo từng cụm.
  - Chưa kiểm tra cụm từ ngay trên máy trước khi gửi chấm, nên câu không dùng cụm vẫn tạo một lượt AI không cần thiết.
  - Khi chấm lỗi, giao diện nói bản ghi được giữ nhưng chưa có nút chấm lại chính bản ghi đó; bấm nói lại sẽ xóa bản ghi.
  - Điểm tốt nhất cũ chưa được nạp khi mở lại ô luyện nói, chỉ hiện sau một lượt chấm mới.
  - Kết quả AI chưa bắt buộc phải trả đủ đúng 4 tiêu chí; giao diện có thể nhận danh sách thiếu.
  - Thông báo lỗi mới tách riêng 402, 403 và 429; lỗi câu gửi sai, cấu hình AI và lỗi tạm thời chưa có hướng dẫn riêng.
  - Chưa có kiểm thử giao diện cho microphone, chấm lại, tải lại trang và màn hình điện thoại.

## Kế hoạch hoàn thiện

### 1. Nâng chất lượng câu ví dụ

- Mở rộng bộ câu mẫu riêng cho các cụm dễ tạo câu gượng, cụm có đại từ sở hữu, lựa chọn bằng dấu gạch chéo và cụm không phải động từ nguyên mẫu.
- Nâng audit để kiểm tra cụm hoặc biến thể hợp lệ thật sự xuất hiện trong câu, phát hiện câu sai cấu trúc, câu quá chung chung và mức lặp vượt ngưỡng.
- Giữ một câu ví dụ tiếng Anh ngắn, tự nhiên, đúng chủ đề và phù hợp IELTS cho mỗi cụm; không thay đổi ID hay dữ liệu tiến độ.

### 2. Làm chắc luồng thu âm và chấm

- Thêm bộ nhận diện biến thể cụm từ ở phía trình duyệt. Nếu chưa dùng cụm, báo ngay và cho học sinh nói lại mà chưa gọi AI.
- Giữ nguyên bản ghi sau lỗi và thêm nút **Chấm lại** để gửi lại chính câu đó.
- Ngăn thao tác trùng khi đang thu âm hoặc đang chấm; dừng giọng đọc trước khi bật microphone.
- Nạp điểm tốt nhất, số lượt và lần luyện gần nhất ngay khi mở một ô; tiếp tục chỉ cập nhật nếu chấm thành công.
- Không dùng điểm bài đặt câu để tự động đánh dấu cụm từ là đã thuộc.

### 3. Siết kết quả AI và lỗi dịch vụ

- Bắt buộc phản hồi đủ bốn tiêu chí cố định: dùng cụm từ, ngữ pháp, độ tự nhiên/collocation và độ rõ dựa trên bản nhận diện.
- Chuẩn hóa điểm tổng từ đúng bốn điểm thành phần; từ chối phản hồi thiếu hoặc sai cấu trúc thay vì hiển thị kết quả không đầy đủ.
- Tách thông báo 400, 401, 402, 403, 429 và 5xx; chỉ cho phép thử lại có giới hạn với 429/5xx, không gửi lại lỗi cố định.
- Giữ nội dung học sinh đã nói trong mọi lỗi, không trả điểm giả và không tuyên bố đã phân tích âm thanh khi hệ thống chỉ có bản nhận diện.
- Kiểm tra giới hạn đầu vào, CORS, quyền gọi và chống lạm dụng cho chức năng chấm công khai.

### 4. Chỉnh giao diện và khả năng sử dụng

- Giữ mỗi lần chỉ mở một ô luyện nói; căn lại hàng nút, câu ví dụ, bản ghi và kết quả để không làm lệch lưới hai cột.
- Trên điện thoại, cho nút và điểm xuống hàng hợp lý, tránh tràn ngang; bảo đảm vùng bấm đủ lớn và nội dung dài tự xuống dòng.
- Bổ sung trạng thái dễ hiểu cho đang nghe, đang thu, đang chấm, lỗi microphone, lỗi AI và đã chấm.
- Bổ sung nhãn trợ năng và thông báo trạng thái cho trình đọc màn hình.

### 5. Kiểm thử cuối

- Chạy audit toàn bộ Part 1-3, kiểm thử dữ liệu, bộ nhận diện biến thể, chuẩn hóa bốn tiêu chí và lưu điểm tốt nhất.
- Gọi chức năng AI thật với bốn trường hợp: câu đúng, sai ngữ pháp, không dùng cụm và quá ngắn; đọc cả mã lỗi và nội dung phản hồi.
- Kiểm thử trình duyệt trên máy tính và điện thoại: nghe ví dụ, mở microphone, nói, dừng, chấm, chấm lại sau lỗi, nghe câu sửa, thử lại và tải lại trang.
- Xác nhận không tràn ngang, không lệch ô, không mất bản ghi và hoạt động của học sinh đăng nhập được ghi đúng một lần.
- Hoàn tất bằng kiểm tra TypeScript, lint, unit tests, edge-function tests và audit nội dung.

## Phạm vi giữ nguyên

- Giữ đường dẫn `/ielts-speaking-practice?mode=drills`, Part, chủ đề, quiz, ID, dữ liệu đã thuộc, số vòng và điểm cao nhất hiện có.
- Không thay đổi các phần IELTS Speaking khác, cấu trúc điều hướng hoặc quy tắc mở nội dung.
# Bổ sung ví dụ và luyện đặt câu bằng giọng nói cho IELTS Speaking

## Mục tiêu
Mỗi cụm từ trong danh sách học của phần **Structure & Vocabulary Practice** sẽ có:

- Một câu ví dụ tiếng Anh tự nhiên, đúng ngữ pháp và phù hợp chủ đề IELTS.
- Nút **Nói câu của bạn** để học sinh tự đặt một câu mới có sử dụng cụm từ.
- AI chấm chi tiết ngay trên ô cụm từ, kèm điểm và hướng sửa cụ thể.

Phạm vi áp dụng cho toàn bộ cụm từ đang được tổng hợp từ Part 1, Part 2, Part 3 và các cụm bổ sung, không chỉ chủ đề Work & Study trong ảnh.

## Giao diện học mới

Mỗi ô cụm từ giữ bố cục hai cột hiện tại nhưng mở rộng theo chiều dọc:

```text
1. To pursue a career in                 [Nghe] [Nghe chậm]
   Theo đuổi sự nghiệp trong lĩnh vực...
   Example: I hope to pursue a career in educational technology.
                                             [Nói câu của bạn]

   Khi đang nói: bản ghi trực tiếp + đồng hồ + nút Dừng
   Sau khi chấm: điểm tổng, tiêu chí, câu sửa và nút Thử lại
```

- Trên điện thoại, các nút xuống hàng gọn gàng, không che nội dung.
- Mỗi lần chỉ mở phần luyện nói của một cụm từ để danh sách không bị quá dài.
- Giữ nguyên hai nút nghe hiện có và dùng chính giọng đọc tiếng Anh hiện tại cho câu ví dụ.
- Có trạng thái rõ ràng: đang nghe, đang chấm, lỗi microphone, lỗi AI, đã có kết quả.

## Nội dung ví dụ

- Mở rộng dữ liệu cụm từ với trường `example` và cung cấp một câu tiếng Anh cho từng cụm.
- Ví dụ phải dùng đúng nguyên cụm hoặc biến đổi ngữ pháp hợp lý, có ngữ cảnh cụ thể, tự nhiên và phù hợp cấp độ IELTS.
- Viết bộ kiểm tra tự động để phát hiện: thiếu ví dụ, ví dụ trùng, câu quá chung chung, không chứa biến thể hợp lệ của cụm từ và dữ liệu trùng khóa.
- Rà soát riêng các cụm có chỗ trống như “to specialize in”, đại từ sở hữu như “one's”, và lựa chọn bằng dấu gạch chéo để câu mẫu không bị gượng.

## Quy trình luyện nói và chấm AI

1. Học sinh bấm **Nói câu của bạn** và cấp quyền microphone.
2. Hệ thống nhận giọng nói tiếng Anh, hiện nội dung nhận diện trong lúc nói và cho phép dừng chủ động.
3. Trước khi gọi AI, hệ thống kiểm tra câu không rỗng và có sử dụng cụm từ hoặc biến thể hợp lý.
4. AI chấm theo bốn tiêu chí phù hợp một câu ngắn:
   - Dùng cụm từ đúng ngữ cảnh.
   - Ngữ pháp.
   - Độ tự nhiên và cách kết hợp từ.
   - Độ rõ của lời nói dựa trên bản nhận diện, với ghi chú minh bạch rằng đây không phải phân tích âm thanh chuyên sâu.
5. Kết quả gồm điểm tổng 0-100, điểm từng tiêu chí, nhận xét ngắn, lỗi cụ thể, câu sửa và một phiên bản nâng cấp tự nhiên hơn.
6. Học sinh có thể nghe câu sửa, thử lại và giữ kết quả tốt nhất của từng cụm.

## AI và độ tin cậy

- Tạo một chức năng chấm chuyên biệt cho bài đặt câu ngắn, thay vì dùng nguyên bộ chấm toàn bài IELTS hiện tại. Bộ chấm hiện tại được thiết kế cho câu trả lời dài theo bốn Band Descriptors, trong khi bài này cần kiểm tra chính xác việc dùng một cụm từ trong một câu.
- Gửi cho AI: Part, chủ đề, cụm từ mục tiêu, nghĩa tiếng Việt, câu ví dụ và bản ghi lời học sinh.
- Dùng phản hồi có cấu trúc để giao diện luôn nhận đúng các trường điểm và góp ý.
- Không đặt thời gian chờ nhân tạo. Hiện trạng chấm nói chính có bộ đếm dừng 14 giây ở dịch vụ và 25 giây trên trang; chức năng mới sẽ không lặp lại cơ chế này.
- Phân biệt lỗi 400/401/402/403 với 429/5xx, giữ lại câu học sinh đã nói và hiển thị đúng hướng xử lý thay vì trả điểm giả.
- Giới hạn độ dài đầu vào, làm sạch nội dung và giữ khóa AI ở phía dịch vụ.

## Tiến độ học

- Lưu điểm tốt nhất, số lần thử và lần luyện gần nhất theo Part + chủ đề + cụm từ cho khách trong trình duyệt.
- Nếu học sinh đã đăng nhập, ghi hoạt động qua cơ chế theo dõi học tập hiện có mà không thay đổi ID, đường dẫn hay dữ liệu tiến độ cũ.
- Không đánh dấu “đã thuộc” chỉ vì AI trả điểm; quy tắc quiz hiện tại vẫn được giữ nguyên để tránh thay đổi thành tích đã có.

## Kiểm thử và nghiệm thu

- Kiểm tra dữ liệu toàn bộ Part 1-3 và cụm bổ sung: 100% cụm hiển thị có ví dụ tiếng Anh.
- Kiểm thử bộ nhận diện biến thể cụm từ, chuẩn hóa điểm AI, phản hồi lỗi và lưu điểm tốt nhất.
- Thử dịch vụ AI thật với câu đúng, câu sai ngữ pháp, câu không dùng cụm từ và câu quá ngắn.
- Thử trên trình duyệt toàn bộ luồng: nghe ví dụ, mở microphone, nói, dừng, chấm, nghe câu sửa, thử lại và tải lại trang để xác nhận kết quả còn lưu.
- Kiểm tra màn hình hiện tại 1187px và điện thoại, bảo đảm không tràn ngang, không lệch ô và mọi nút có nhãn trợ năng.
- Chạy kiểm tra TypeScript, lint, kiểm thử tự động và audit nội dung trước khi hoàn tất.

## Không thay đổi

- Giữ nguyên đường dẫn `/ielts-speaking-practice?mode=drills`.
- Giữ nguyên Part, chủ đề, quiz, điểm đã thuộc, vòng học và điểm cao nhất hiện có.
- Không thay đổi các phần IELTS Speaking khác hoặc cấu trúc điều hướng.

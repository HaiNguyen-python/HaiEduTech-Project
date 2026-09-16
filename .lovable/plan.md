# Nâng chất lượng ví dụ và collocations trong IELTS Speaking Practice

## Kết quả rà soát hiện tại

- Phần Vocabulary đang tổng hợp dữ liệu từ ngân hàng theo chủ đề, từ vựng gắn với từng câu hỏi và bộ cụm bổ sung dùng chung cho từng Part.
- Toàn bộ 3.900 lượt hiển thị hiện chỉ tạo ra 1.733 câu ví dụ khác nhau, với 108 nhóm câu bị lặp.
- Câu `In my everyday life, I make an effort ... whenever it is appropriate.` là mẫu dự phòng cố định cho gần như mọi cụm bắt đầu bằng `To...` ở Part 1. Các loại cụm khác cũng đang dùng một số mẫu cố định tương tự.
- Sau khi gộp dữ liệu theo đúng cách trang đang hiển thị, có 135 mục từ đơn cần thay thế: Part 1 có 17, Part 2 có 85, Part 3 có 33.

## Thay đổi nội dung

### 1. Thay toàn bộ từ đơn bằng collocations

- Rà soát cả ba nguồn từ vựng và thay từng từ đơn bằng một collocation tự nhiên, có ích khi nói và đúng chủ đề hiện tại.
- Giữ nguyên ý nghĩa cốt lõi khi mở rộng, ví dụ theo hướng `scenery` thành một cụm dùng được trong chủ đề Photography, thay vì chỉ ghép thêm từ chung chung.
- Chỉnh lại nghĩa tiếng Việt tương ứng với cả cụm mới.
- Loại các biến thể chỉ có một từ dù có dấu nối, đồng thời không coi tên riêng, chữ viết tắt hoặc chuỗi lựa chọn bằng dấu `/` là collocation đạt chuẩn nếu học sinh không thể dùng như một cụm hoàn chỉnh.
- Khử trùng lặp sau khi thay thế, nhưng vẫn giữ tối thiểu số lượng từ vựng cần thiết cho mỗi Part và chủ đề.

### 2. Viết lại bộ sinh câu ví dụ theo ngữ cảnh

- Bỏ mẫu `whenever it is appropriate` và các câu dự phòng quá chung chung như `People often discuss...` hoặc `has had a positive influence on my daily life`.
- Phân loại collocation theo dạng sử dụng: động từ, danh từ, tính từ, trạng từ, thành ngữ, cụm kể chuyện và cụm thảo luận học thuật.
- Tạo nhiều mẫu câu tự nhiên theo Part:
  - Part 1: trải nghiệm và thói quen cá nhân, ngắn gọn, đời thường.
  - Part 2: người, nơi chốn, sự kiện và diễn biến cụ thể.
  - Part 3: nguyên nhân, hệ quả, giải pháp và quan điểm xã hội.
- Dùng chủ đề và chính collocation để chọn bối cảnh cụ thể, không chỉ chèn tên chủ đề vào cuối câu.
- Bổ sung câu viết riêng cho các collocation khó, thành ngữ, cụm kết thúc bằng giới từ và cụm có đại từ sở hữu để tránh câu sai hoặc gượng.
- Mỗi câu vẫn hiển thị đậm đúng collocation hoặc biến thể ngữ pháp hợp lệ, và nút nghe tiếp tục đọc đúng toàn bộ câu.

### 3. Kiểm soát chất lượng tự động

- Mở rộng audit để yêu cầu mọi mục Vocabulary có ít nhất hai thành tố từ vựng có nghĩa và thuộc đúng Part/chủ đề.
- Phát hiện từ đơn, nghĩa trống, collocation trùng, cụm không xuất hiện trong ví dụ, dấu `...` chưa xử lý, câu quá ngắn và mẫu câu lặp quá mức.
- Đặt giới hạn nghiêm cho mức lặp của cả câu và phần đuôi câu, thay vì chỉ cho phép tối đa 120 nhóm lặp như hiện tại.
- Bổ sung kiểm thử cho: thay thế từ đơn, biến thể ngữ pháp trong câu, chọn mẫu theo Part/chủ đề, phần in đậm và các cụm có giới từ/đại từ/dấu gạch chéo.

## Xác nhận trước khi hoàn tất

- Chạy audit trên toàn bộ Part 1-3 và xác nhận: 0 từ đơn, 0 câu chứa `when/whenever it is appropriate`, 0 placeholder chưa xử lý và mọi collocation có ví dụ hợp lệ.
- Kiểm tra trực tiếp nhiều chủ đề đại diện, gồm Photography trong ảnh, trên máy tính và điện thoại: nội dung, chữ đậm, xuống dòng, nghe thường/chậm và phần luyện nói.
- Chạy kiểm thử IELTS Speaking, TypeScript và lint; xác nhận quiz vẫn tạo đủ đáp án công bằng sau khi thay collocation.

## Phạm vi giữ nguyên

- Giữ nguyên đường dẫn, Part, chủ đề, câu hỏi, Structures, ID bài học, tiến độ đã thuộc, điểm, số vòng, thu âm và hợp đồng chấm hiện có.
- Không thay đổi bố cục hoặc các phần IELTS Speaking khác ngoài nội dung Vocabulary và câu ví dụ của mục này.

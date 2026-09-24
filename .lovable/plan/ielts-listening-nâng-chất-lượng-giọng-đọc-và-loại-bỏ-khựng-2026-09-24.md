# IELTS Listening: nâng chất lượng giọng đọc và loại bỏ khựng

## Hiện trạng đã xác nhận

- 120 bài đều dùng bản thoại đã viết sẵn và tạo file AI theo từng lượt lời.
- Mỗi lượt lời là một MP3 riêng. Khi hết một file, trình phát dừng, hủy phần tử cũ, đợi thêm 0,12-0,30 giây rồi mới mở file tiếp theo. Khoảng lặng sẵn có ở đầu/cuối mỗi MP3 cộng với thời gian chuyển file tạo cảm giác khựng.
- Cơ chế tải trước hiện chỉ gọi tải file kế tiếp, chưa bảo đảm file đã tải và giải mã xong trước khi cần phát.
- Tốc độ ghi âm đang là 1,0 cho Section 1-2 và 0,97 cho Section 3-4. Giao diện lại hiển thị mặc định 0,80-0,87x, khiến nhãn tốc độ không phản ánh tốc độ phát thật.
- Khóa cache chỉ gồm giọng, tốc độ và nội dung. Khi thay hướng dẫn diễn giọng hoặc model, file cũ vẫn được dùng lại nên các lần chỉnh chất lượng trước chưa chắc đã đến học viên.
- Một số bài Section 4 có lượt đọc dài 130-190 từ, dễ tạo nhịp đọc đều và thiếu tự nhiên.

## Việc sẽ làm

### 1. Chuẩn hóa tốc độ thi thật

- Đặt tốc độ thu mặc định gần nhịp IELTS thật cho cả bốn Section, nhanh vừa phải nhưng không làm méo giọng.
- Đổi bộ chọn tốc độ thành hệ số tương đối rõ ràng: Chậm 0,85x, Chuẩn 1,0x, Nhanh 1,15x.
- Đồng bộ thanh thời gian, tua và tiếp tục phát với tốc độ thực tế.

### 2. Phát liền mạch, không khựng giữa lượt

- Tải và giải mã trước toàn bộ file trước khi bắt đầu, không chỉ tạo thẻ audio kế tiếp.
- Phát qua một lịch âm thanh liên tục, cắt phần im lặng thừa ở mép file và chỉ giữ khoảng nghỉ hội thoại tự nhiên rất ngắn.
- Không hủy rồi tạo lại trình phát ở mỗi lượt; tạm dừng, tiếp tục và tua vẫn đúng vị trí.
- Nếu một file lỗi, báo rõ và chuyển đúng lượt đó sang giọng dự phòng, không phát lặp hoặc dừng cả bài.

### 3. Cải thiện độ tự nhiên của bản thu

- Rút gọn hướng dẫn giọng đọc, yêu cầu nhịp hội thoại tự nhiên, nối âm, ngắt theo ý nghĩa và tránh kiểu đọc chậm từng từ.
- Chia các lượt độc thoại quá dài tại ranh giới câu hoặc đoạn hợp lý để giữ ngữ điệu, nhưng không tạo khoảng dừng nghe thấy được.
- Giữ giọng ổn định cho từng nhân vật và một giọng giảng viên nhất quán ở Section 4.

### 4. Làm mới cache đúng phiên bản

- Đưa model, hướng dẫn giọng, tốc độ và phiên bản bộ xử lý vào khóa cache.
- File mới được tạo một lần rồi dùng lại; bản cũ không còn che mất thay đổi chất lượng.
- Tạo sẵn âm thanh cho các Full Test đầu tiên, sau đó các bài còn lại tự tạo và lưu khi mở lần đầu.

### 5. Kiểm tra toàn bộ

- Bổ sung kiểm tra tự động cho tốc độ, độ dài mỗi đoạn tạo giọng, nhãn nhân vật và khóa cache.
- Kiểm tra trực tiếp bài hội thoại Section 1, bài tour Section 2, thảo luận Section 3 và bài giảng Section 4.
- Thử Play, Pause, Resume, tua, đổi tốc độ và Full Test trên máy tính lẫn điện thoại.
- Đo khoảng chuyển giữa các đoạn, mục tiêu không có khoảng khựng bất thường và không lặp câu.

## Phạm vi giữ nguyên

- Không đổi route, set ID, câu hỏi, đáp án, tiến độ hay lịch sử học viên.
- Không đổi nội dung 120 bản thoại trong đợt này, ngoại trừ việc chia kỹ thuật các lượt quá dài để tạo âm thanh mượt hơn.
- Giữ giọng máy của thiết bị chỉ làm phương án dự phòng khi bản thu AI thật sự không dùng được.

## Chi tiết kỹ thuật

- Trình phát: `ListeningPracticeSetCard.tsx` và hook audio dùng chung.
- Giọng/tốc độ: `ieltsListeningVoices.ts`.
- Tạo và cache bản thu: function `listening-tts`.
- Làm nóng cache: `scripts/warm-listening-audio.mjs`.
- Kiểm tra nội dung và audio: mở rộng `scripts/validate-listening.mjs` và thêm kiểm tra trình phát.

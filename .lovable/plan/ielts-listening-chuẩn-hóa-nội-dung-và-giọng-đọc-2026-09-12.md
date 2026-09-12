# IELTS Listening: chuẩn hóa nội dung và giọng đọc

## Nguyên nhân đã kiểm tra

- Bank hiện có 120 bài (30 bài mỗi Section), mỗi bài 10 câu, 30 full test. Bộ kiểm tra tự động báo "no issues".
- Nhưng nội dung bài nghe **không phải do người viết**: `src/data/ieltsListeningDifficultyUpgrade.ts` tự dựng lời thoại từ chính câu hỏi, rồi chèn câu đệm để đủ độ dài. Vì vậy:
  - Câu trả lời được đọc theo khuôn cố định ("What actually happens here is X", "Tutor: ... là của bạn"), nghe rất máy móc và học viên đoán được đáp án mà không cần nghe hiểu.
  - Đoạn đệm chung chung, lặp mô-típ giữa các bài; mọi bài cùng Section mở đầu và kết thúc gần giống nhau.
  - Section 2 đọc to các phương án sai như "các sắp xếp cũ", tức là chỉ điểm luôn đáp án nhiễu.
- Giọng đọc dùng giọng máy của trình duyệt (`speechSynthesis`) với pitch/rate tự suy đoán theo tên nhân vật, nên chất giọng khác nhau tùy máy, đọc số/tên/chữ cái không ổn định, và không giống băng thi thật.

## Việc sẽ làm

### 1. Bỏ lớp tự sinh lời thoại
Chỉ giữ phần chuẩn hóa an toàn (tốc độ theo Section, tự bổ sung giới hạn từ). Lời thoại quay về dữ liệu do người viết, mỗi bài có hướng dẫn riêng đúng dạng câu hỏi.

### 2. Viết lại toàn bộ 120 bài nghe
Làm theo 12 đợt, mỗi đợt 10 bài, giữ nguyên mã bài và câu hỏi hiện có (tiến độ, lịch sử, full test không bị ảnh hưởng):
- Section 1: hội thoại giao dịch có sửa lỗi, đánh vần, giá, ngày, số điện thoại, xác nhận lại.
- Section 2: bài nói trước công chúng có bản đồ, tiện ích, quy định, thay đổi so với tờ rơi.
- Section 3: thảo luận học thuật 2-3 người, có tranh luận, đổi quyết định, nhận xét của giảng viên.
- Section 4: bài giảng có định nghĩa, phân loại, số liệu, đánh giá nghiên cứu.

Quy tắc bắt buộc cho mỗi bài: đáp án nằm trong lời nói tự nhiên (không có câu kiểu "đáp án là..."), phương án nhiễu hợp lý và không bị gắn nhãn sai, thứ tự đáp án không rơi vào khuôn cố định, độ dài giữ trong khoảng đã đạt (S1 540-700, S2 780-850, S3 860-990, S4 900-980 từ).

### 3. Giọng đọc AI chất lượng cao
- Thêm chức năng đọc bài nghe bằng giọng AI: giọng nam/nữ khác nhau cho từng nhân vật, giọng giảng viên riêng cho Section 4, tốc độ và cách đọc số/chữ cái giống băng thi.
- Âm thanh được tạo một lần rồi lưu lại, nên lần nghe sau phát ngay và không tốn thêm chi phí.
- Vẫn giữ giọng máy của trình duyệt làm phương án dự phòng nếu chưa tạo được âm thanh, kèm thông báo rõ ràng cho học viên.
- Thanh tiến trình và thời lượng hiển thị theo âm thanh thật, không còn ước lượng.

### 4. Siết chặt bộ kiểm tra tự động
Bổ sung các phép kiểm tra để chặn đúng những lỗi đang có: cấm câu chỉ điểm đáp án, cấm câu lặp lại nguyên văn trong một bài, cấm mở đầu giống nhau giữa các bài cùng Section, kiểm tra vị trí đáp án phân bố đều, cân bằng đáp án A/B/C/D và các chữ cái matching.

### 5. Kiểm tra cuối
Chạy bộ kiểm tra đến khi sạch lỗi, rồi thử trên trình duyệt: nghe hết một full test, kiểm tra đánh số câu 1-40, transcript bị ẩn trước khi nộp, sau khi nộp có đáp án, giải thích và band score.

## Chi tiết kỹ thuật

- `src/data/ieltsListeningDifficultyUpgrade.ts`: giảm về chuẩn hóa (rate theo section, `maxWords`), bỏ toàn bộ hàm dựng transcript.
- Nội dung viết lại trong các file `src/data/ieltsListeningPractice*.ts` hiện có, không đổi tên file, không đổi set id.
- Giọng AI: edge function mới `listening-tts` gọi Lovable AI (`openai/gpt-4o-mini-tts`) theo từng lượt lời, ghép và lưu vào Storage bucket riêng, có bảng cache theo (setId, chunk hash, voice); client phát audio thật thay cho `speechSynthesis`. Phần voice mapping đặt trong `src/lib/ieltsListeningVoices.ts`.
- `ListeningPracticeSetCard.tsx` / `ListeningFullTestEngine.tsx`: tách logic phát audio thành hook `useListeningAudio` dùng chung, hỗ trợ audio AI và fallback TTS.
- `scripts/validate-listening.mjs`: thêm các phép kiểm tra ở mục 4; chạy sau mỗi đợt viết lại.
- Comment trong code viết bằng tiếng Anh, không dùng gạch dài.

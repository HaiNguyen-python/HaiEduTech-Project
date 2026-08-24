# Chia đề IELTS Listening thành Full Test (giống Reading)

## Hiện trạng đã kiểm tra

- Có 52 bài listening rời trong 8 file dữ liệu (`ieltsListeningPractice.ts` + 7 file expansion), chia đều 13 bài cho mỗi Section 1-4.
- Trang `IeltsListeningPractice.tsx` chỉ gộp tất cả thành một mảng và render liên tiếp bằng `ListeningPracticeSetCard`, chỉ lọc theo Section. Không có khái niệm full test, không có tính giờ, không có band score cho cả bài thi 40 câu.
- Reading đã có mô hình chuẩn: `src/data/ieltsFullTests.ts` (nhóm passage thành test) + `FullTestEngine` trong `IeltsReadingPractice.tsx` với 3 tab, chuẩn hóa 40 câu, tính điểm và band.

## Việc sẽ làm

### 1. Nhóm 52 bài thành 13 Full Test

Tạo `src/data/ieltsFullListeningTests.ts`: mỗi full test gồm 4 bài theo đúng thứ tự Section 1 - 2 - 3 - 4, tổng 40 câu, thời lượng 30 phút + 10 phút chuyển đáp án (giống đề thật). Ghép sao cho mỗi test có đủ các dạng câu hỏi khác nhau (form/note completion, MCQ, matching, map labelling, sentence completion) chứ không dồn cùng một dạng.

### 2. Trang Listening Practice chia 2 tab

- **Tab "Full Test"** (mặc định): danh sách 13 test dạng thẻ, hiển thị tên, 4 section, 40 câu, 30 phút, các dạng câu hỏi có trong test. Bấm vào mở phòng thi.
- **Tab "Theo dạng câu hỏi"**: giữ nguyên cách lọc theo Section hiện tại cho ai muốn luyện lẻ.

### 3. Phòng thi Full Test

- Chạy tuần tự Section 1 đến 4, đánh số câu liên tục 1-40.
- Audio mỗi section chỉ phát một lần đúng như thi thật (có nút play/pause, không cho tua lại khi ở chế độ Exam Mode), ngoài Exam Mode thì cho nghe lại tự do.
- Đồng hồ đếm 30 phút, tự nộp khi hết giờ; tự lưu tiến độ để không mất bài khi đóng tab.
- Nộp bài -> tổng điểm 40 câu, band score IELTS Listening, bảng đáp án đúng/sai kèm transcript có highlight vị trí đáp án, và giải thích AI cho câu sai (dùng lại cơ chế đang có ở card lẻ).
- Lưu kết quả vào lịch sử để hiển thị biểu đồ tiến bộ giống Reading.

### 4. Rà soát toàn bộ 52 bài

Thêm `scripts/audit_ielts_listening.ts` kiểm tra và sửa các lỗi phát hiện được:

- **Số câu**: mỗi bài đúng 10 câu để full test tròn 40.
- **Chất lượng recording (TTS)**: transcript phải chia lượt lời rõ ràng để engine multi-voice gán giọng riêng cho từng nhân vật; câu quá dài bị ngắt giữa chừng sẽ được tách; tốc độ đọc theo section (Section 1-2 chậm hơn, Section 3-4 tốc độ tự nhiên); số điện thoại, ngày tháng, tên riêng phải viết ở dạng đọc được đúng.
- **Đáp án**: mọi đáp án fill-in phải xuất hiện nguyên văn trong transcript; MCQ có đúng một đáp án đúng và các phương án nhiễu đều được nhắc tới trong audio (bẫy đúng kiểu IELTS); matching đủ nhãn A/B/C.
- **Giới hạn từ**: mọi câu điền từ đều có `maxWords` và hiển thị hướng dẫn "NO MORE THAN X WORDS AND/OR A NUMBER".
- **Phân bố đáp án**: không lệch về một phương án; không đi tuần tự dễ đoán.
- **Ngôn ngữ**: không dùng gạch dài em/en dash, mọi câu có bản dịch tiếng Việt.

Sửa các bài không đạt (bổ sung transcript, chuẩn hóa đáp án, thêm câu cho bài thiếu, chia lượt lời cho bài một khối).

## Chi tiết kỹ thuật

- `src/data/ieltsFullListeningTests.ts`: interface `FullListeningTest { id, title, durationMinutes, setIds: [string, string, string, string] }`.
- `src/pages/IeltsListeningPractice.tsx`: thêm `Tabs`, danh sách full test, và `ListeningFullTestEngine` (component mới trong `src/components/ielts/ListeningFullTestEngine.tsx`) tái sử dụng logic audio/TTS và chấm điểm đang có trong `ListeningPracticeSetCard.tsx` - phần dùng chung sẽ tách ra hook `useListeningAudio` để không nhân đôi code.
- Band score dùng lại `src/lib/ieltsListeningBand.ts`; lịch sử làm bài theo mẫu `src/lib/ieltsReadingHistory.ts`.
- Dữ liệu sửa trong 8 file `ieltsListeningPractice*.ts` hiện có, không đổi tên file để không phá import.

Triển khai theo 2 đợt: đợt 1 là nhóm full test + phòng thi + tab mới; đợt 2 là rà soát và sửa nội dung 52 bài theo báo cáo audit.

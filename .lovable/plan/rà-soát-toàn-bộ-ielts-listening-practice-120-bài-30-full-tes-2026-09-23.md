# Rà soát toàn bộ IELTS Listening Practice (120 bài, 30 full test)

## Hiện trạng đã kiểm tra

- 120 bài (30 bài mỗi Section), mỗi bài 10 câu, ghép thành 30 full test 40 câu. Bộ kiểm tra hiện tại báo "no issues".
- Độ dài lời thoại đã đạt chuẩn IELTS: S1 625-813 từ, S2 777-1013, S3 869-1080, S4 817-1086.
- Có 710 câu điền từ. Đáp án MCQ khá cân (A 66, B 68, C 66, D 55). Matching lệch rõ: gần như chỉ dùng A/B/C (78/75/77), còn D/F/G chỉ 1-3 lần, nên học viên dễ đoán.
- Bộ kiểm tra hiện tại chỉ soát cấu trúc (số câu, độ dài, đáp án có trong lời thoại). Nó chưa soát ý nghĩa: đáp án có hợp logic không, câu hỏi có mơ hồ không, phương án nhiễu có thật sự gây nhiễu không, độ khó có đúng Section không.

## Việc sẽ làm

### 1. Soát nội dung từng bài (đọc thủ công theo đợt 10 bài)
Cho mỗi bài kiểm tra:
- Lời thoại tự nhiên, đúng bối cảnh Section, không lặp câu, không có câu "chỉ điểm" đáp án.
- Mỗi câu hỏi có đúng một đáp án chứng minh được bằng lời thoại; không mơ hồ, không có hai đáp án cùng đúng.
- Câu hỏi được diễn đạt lại (paraphrase), không chép nguyên văn lời thoại.
- Phương án nhiễu được nhắc trong bài nhưng bị loại hợp lý (đổi ý, sửa lại, từ chối).
- Thứ tự đáp án theo đúng trình tự nghe.
- Giới hạn từ đúng với đáp án; chính tả, số, ngày tháng rõ ràng.
- Bản dịch tiếng Việt và phần giải thích khớp với đáp án.

### 2. Soát độ khó
Chấm mỗi bài theo thang Band (5.0 / 6.5 / 7.5+) dựa trên từ vựng, tốc độ, mức paraphrase và số bẫy. Mục tiêu: độ khó tăng dần Section 1 -> 4, và 30 full test có độ khó tương đương nhau. Bài quá dễ sẽ được tăng bẫy và paraphrase; bài quá khó hoặc gây hiểu nhầm sẽ được làm rõ.

### 3. Sửa lỗi phát hiện
- Sửa trực tiếp lời thoại, câu hỏi, đáp án, giải thích của bài lỗi; giữ nguyên mã bài và thứ tự câu để không mất tiến độ, lịch sử làm bài.
- Cân bằng lại matching để dùng đủ các chữ cái có trong danh sách (D, E, F...).
- Tính lại âm thanh AI cho những bài có lời thoại thay đổi.

### 4. Nâng cấp bộ kiểm tra tự động
Thêm các phép kiểm tra: phân bố chữ cái matching, câu hỏi chép nguyên văn lời thoại, đáp án xuất hiện nhiều lần gây mơ hồ, phương án nhiễu không được nhắc đến, thứ tự đáp án sai trình tự, giải thích không khớp đáp án.

### 5. Báo cáo cho Thầy
Gửi bảng tổng hợp: số bài đạt, số bài đã sửa và lỗi chính theo từng Section, mức độ khó từng full test. Sau đó thử một full test trên trình duyệt (nghe, làm bài, nộp, xem band score).

## Chi tiết kỹ thuật
- Dữ liệu: `src/data/ieltsListeningPractice*.ts`, `ieltsListeningTranscripts.ts`, lớp `ieltsListeningDifficultyUpgrade.ts`.
- Soát ý nghĩa dùng script xuất từng bài ra văn bản rồi đọc duyệt theo đợt; mở rộng `scripts/validate-listening.mjs` cho các phép ở mục 4.
- Cache âm thanh `listening-tts` tự tạo lại theo hash nội dung; chạy `scripts/warm-listening-audio.mjs` cho bài đã sửa.
- Không đổi set id, route, backend; không dùng gạch dài.

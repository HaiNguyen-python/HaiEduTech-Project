# Tăng độ khó bộ đề IELTS Reading Practice

Phản hồi của học sinh là đúng và kiểm tra dữ liệu xác nhận điều đó.

## Hiện trạng đã kiểm tra

- 31 bài đọc đơn (single passages), 21 bài gắn nhãn Medium, 10 Hard, không có bài nào ở mức đề thi thật của Passage 3.
- Độ dài bài đọc: 293 - 603 từ. Đề thật Cambridge là 700 - 950 từ mỗi bài.
- Chỉ có 3 dạng câu hỏi trong toàn bộ hệ thống: matching headings (162 câu), multiple choice (141 câu), fill-blank (94 câu). Hoàn toàn thiếu True/False/Not Given, Yes/No/Not Given, matching features (nhà nghiên cứu - phát biểu), matching sentence endings, summary completion có bảng từ, và multiple choice chọn nhiều đáp án.
- Danh sách heading luôn bằng hoặc ít hơn số đoạn cần ghép, nghĩa là không có heading nhiễu. Học sinh loại trừ dần là ra.
- Thứ tự câu hỏi luôn đi tuần tự theo đoạn A, B, C, D nên đáp án nằm đúng trình tự, đúng như em học sinh nhận xét.

## Việc sẽ làm

### 1. Mở rộng bộ dạng câu hỏi (điều kiện tiên quyết)

Thêm các dạng mới vào kiểu dữ liệu và vào phần hiển thị/chấm điểm của trang Reading Practice:

- True / False / Not Given
- Yes / No / Not Given (dạng bài quan điểm tác giả)
- Matching features: ghép tên nhà nghiên cứu / mốc thời gian với phát biểu
- Matching sentence endings
- Summary completion có bảng từ cho trước (nhiều từ nhiễu hơn số ô trống)
- Multiple choice chọn 2 trong 5 đáp án

Mỗi dạng có hướng dẫn riêng, ô trả lời riêng, chấm chính xác và giải thích khi review.

### 2. Chống đoán đáp án theo trình tự

- Bảng heading dùng chung cho cả bài, luôn nhiều hơn số đoạn ít nhất 3 heading nhiễu.
- Trộn thứ tự nhóm câu hỏi để đáp án không đi tuần tự theo đoạn: nhóm TFNG hoặc matching features đặt trước nhóm heading, tương tự đề Cam thật.
- Câu hỏi diễn đạt lại (paraphrase) chứ không dùng lại nguyên từ trong bài, để không tìm được bằng cách quét từ khóa.
- Bổ sung phương án nhiễu bám sát bài đọc cho MCQ (đúng thông tin nhưng sai câu hỏi).

### 3. Rà soát và nâng cấp đề cũ

- 5 đề đầu (rx-1 đến rx-5, chỉ 293 - 391 từ) viết dài lên 700 - 900 từ, thêm 2 - 3 đoạn học thuật, thêm heading nhiễu, chuyển một phần câu hỏi sang TFNG và matching features.
- Các đề rx-cam-1 đến rx-cam-11 (346 - 462 từ) mở rộng lên tối thiểu 700 từ, tăng mật độ từ vựng học thuật, thêm dạng câu hỏi mới.
- Các đề rx-cam-12 đến rx-cam-26 (~500 - 600 từ) mở rộng lên 750 - 850 từ và thay 4 - 5 câu heading bằng dạng khó hơn.
- Gắn lại nhãn độ khó theo đúng chuẩn: Passage 1 = Medium, Passage 2 = Medium/Hard, Passage 3 = Hard (lập luận trừu tượng, nhiều quan điểm đối lập).

### 4. Thêm đề mới độ khó cao

12 bài đọc mới theo phong cách Cambridge / Study4 / Vol, 850 - 950 từ, 13 - 14 câu mỗi bài, tất cả gắn nhãn Hard, chủ đề học thuật thật: khảo cổ học, khoa học nhận thức, kinh tế học hành vi, lịch sử ngôn ngữ, vật liệu học, sinh thái biển, đô thị học, thiên văn, tâm lý phát triển, dịch tễ học, âm nhạc học, chính sách nông nghiệp. Mỗi bài dùng 4 - 5 dạng câu hỏi khác nhau, trong đó bắt buộc có TFNG hoặc YNNG.

Gộp thành các Full Test mới theo đúng cấu trúc thật: Passage 1 dễ hơn, Passage 2 trung bình, Passage 3 khó nhất, 40 câu trong 60 phút.

### 5. Script rà soát tự động

Thêm `scripts/audit_ielts_reading.ts` kiểm tra:

- Độ dài bài đọc tối thiểu theo nhãn độ khó
- Phân bố đáp án (A/B/C/D, True/False/Not Given) không lệch
- Đáp án không đi tuần tự theo vị trí trong bài (phát hiện chuỗi tăng đơn điệu)
- Số heading nhiễu >= 3
- Đáp án fill-blank và summary phải xuất hiện đúng nguyên văn trong bài
- Không có dấu gạch dài em/en dash, mọi câu đều có giải thích

## Chi tiết kỹ thuật

- `src/data/ieltsFullReadingExams.ts`: mở rộng `ReadingQuestionType` thành `"multiple-choice" | "matching-headings" | "fill-blank" | "tfng" | "ynng" | "matching-features" | "matching-endings" | "summary-completion" | "mcq-multi"`, thêm các field tùy chọn `features`, `endings`, `wordBank`, `answers` (mảng cho dạng chọn nhiều), `instruction`.
- `src/pages/IeltsReadingPractice.tsx`: thêm nhánh render và logic chấm cho từng dạng mới, giữ nguyên giao diện chia đôi màn hình, thanh navigation câu hỏi và chế độ review hiện có.
- `src/lib/ieltsReadingShuffle.ts`: mở rộng để trộn cả bảng heading dùng chung có nhiễu, và trộn thứ tự nhóm câu hỏi theo seed cố định (theo exam id) để không đổi giữa các lần render.
- Đề mới đặt trong `src/data/ieltsFullReadingExamsHard.ts` và `...Hard2.ts`, đăng ký trong trang Reading Practice; các Full Test mới thêm vào `src/data/ieltsFullTests.ts`.
- Chấm điểm và thống kê band hiện có giữ nguyên; chỉ mở rộng chuẩn hóa đáp án (T/F/NG viết tắt hoặc viết đầy đủ đều được tính đúng).

Vì khối lượng nội dung lớn, phần này sẽ triển khai theo từng đợt: đợt 1 là hạ tầng dạng câu hỏi + chống trình tự + script rà soát, đợt 2 là 12 đề mới độ khó cao, đợt 3 là viết lại 31 đề cũ.

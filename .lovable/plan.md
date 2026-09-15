# Chuẩn hóa chữ và hiển thị toàn bộ bài tập English Grammar

## Vấn đề đã xác nhận

- Tiêu đề của **Sentence Reorder**, **Dictation** và **Quiz** đang dùng thẻ `h3` nhưng không đặt cỡ chữ riêng. Quy tắc toàn trang tự phóng `h3` lên khoảng 20-28px, vì vậy các tiêu đề này lớn bất thường như ảnh mẫu.
- Năm dạng còn lại khóa tiêu đề ở 15px, tạo chênh lệch rõ giữa các khối bài tập.
- Nội dung chính hiện đan xen `text-xs`, `text-sm`, 15px và 16px: câu hỏi, từ kéo thả, ô nhập, gợi ý và đáp án chưa có cùng một hệ phân cấp.
- Một số chữ phụ 12px và màu nhạt khó đọc, nhất là trên điện thoại.

## Thay đổi

### 1. Một hệ chữ chung cho mọi dạng bài tập

Áp dụng đồng nhất cho Fill in the Blank, Sentence Reorder, Dictation, Error Correction, Transformation, Multiple Choice, Matching, Extra Practice và Final Quiz:

- Tiêu đề/hướng dẫn bài tập: 16px, semibold, line-height thoáng, không bị quy tắc `h3` toàn trang phóng lớn.
- Câu hỏi, câu mẫu, từ sắp xếp và lựa chọn: tối thiểu 16px trên mobile và desktop.
- Ô nhập, textarea và nút hành động: 16px, chiều cao ổn định, dễ bấm.
- Gợi ý, nhãn, số thứ tự, đáp án và giải thích: 14px trở lên, tăng độ tương phản; chỉ metadata thật sự phụ mới dùng 12px.
- Dùng Manrope cho nội dung học; Sora chỉ dành cho tiêu đề cấp trang/phần, tránh đổi font giữa các bài tập.

### 2. Chuẩn hóa khung hướng dẫn và nội dung

- Dùng cùng cấu trúc cho thanh hướng dẫn của cả 7 dạng bài tập: biểu tượng, nội dung, điểm và nút làm lại.
- Giữ tiêu đề dài tự xuống dòng tự nhiên, không tràn hoặc đè lên điểm số.
- Đồng nhất khoảng cách giữa số câu, câu hỏi, chip gợi ý, vùng trả lời và phản hồi.
- Làm rõ trạng thái đúng/sai nhưng giữ nguyên màu semantic hiện có và hỗ trợ giao diện sáng/tối.

### 3. Chuẩn hóa Extra Practice và Quiz

- Đưa câu hỏi, đáp án, giải thích và các mục luyện thêm về cùng hệ chữ với bài tập tương tác.
- Loại bỏ tình trạng tiêu đề Quiz bị phóng theo `h3` toàn cục.
- Giữ nguyên toàn bộ nội dung, đáp án, chấm điểm và tiến độ.

## Kiểm tra

- Kiểm tra tất cả dạng bài tập trong nhiều bài Beginner, Intermediate và Advanced.
- Kiểm tra desktop và mobile: chữ không đổi cỡ bất thường, không tràn ngang, không chồng lấn, nút và ô nhập dễ thao tác.
- Kiểm tra trạng thái chưa làm, đang làm, đúng, sai, xem đáp án và làm lại.
- Chạy TypeScript, lint và các bài kiểm tra liên quan; không đổi route, ID bài học, dữ liệu bài tập hay tiến độ đã lưu.

## Chi tiết kỹ thuật

- Chuẩn hóa typography trực tiếp trong các component dùng chung tại `src/components/exercises/` và `src/components/grammar/GrammarExtraPractice.tsx`.
- Không dựa vào kiểu mặc định của `h3`; gán rõ cỡ chữ và line-height hoặc dùng phần tử văn bản phù hợp trong tiêu đề nội bộ.
- Tạo quy ước class dùng chung cho header, body, helper text, feedback và controls để các dạng bài không lệch nhau lần nữa.

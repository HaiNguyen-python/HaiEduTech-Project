# Rà soát và củng cố Business English & Academic English

## Những điểm đã xác nhận chưa ổn

1. **Phần "Luyện tập có hướng dẫn" trong Core Lessons không đúng về học thuật.** Hiện hệ thống lấy 3 câu ví dụ đầu của bài rồi luôn coi câu đầu tiên là đáp án đúng, hai câu còn lại bị đánh dấu sai dù chúng cũng là câu mẫu chuẩn. Thứ tự lại cố định nên học sinh chỉ cần chọn ô đầu là luôn đúng. Đây là lỗi nội dung nghiêm trọng nhất.
2. **Thanh tiến trình trong bài học chỉ nhảy 75% rồi 100%.** Nó không phản ánh việc học sinh đang ở bước nào trong 5 bước.
3. **Không có công cụ kiểm định cho Communication Lab.** Chỉ 48 bài Core đang được kiểm tra tự động; 23 bài Business Lab và 20 bài Academic Lab chưa được kiểm tra về hội thoại, từ vựng, câu hỏi và đáp án.
4. **Còn màn hình bài học cũ không dùng nữa** (`PurposeEnglishHub`) nằm lại trong dự án, dễ gây sửa nhầm về sau.
5. **Bộ lọc và tìm kiếm còn thô:** lọc "Đang học" chỉ khớp đúng một chặng, và khi lọc/tìm không có kết quả thì không có thông báo trống rõ ràng.
6. Cần rà soát lại trải nghiệm trên điện thoại và việc dừng audio khi chuyển bước/chuyển bài, cùng độ chính xác nội dung của toàn bộ 48 bài Core và 43 bài Lab.

## Việc sẽ làm

### 1. Làm lại phần luyện tập có hướng dẫn (ưu tiên cao)
- Thay bài tập giả bằng hoạt động có căn cứ thật, sinh ra từ chính nội dung bài: chọn cụm từ phù hợp với tình huống, sắp xếp lại câu mẫu, và chọn mức độ trang trọng đúng.
- Đáp án và phương án gây nhiễu được lấy từ dữ liệu bài học và các bài khác cùng chủ đề, có xáo trộn vị trí nên không thể đoán.
- Chỉ hiện đáp án cùng giải thích song ngữ sau khi học sinh chọn, đúng nguyên tắc hiện hành.

### 2. Hoàn thiện giao diện
- Thanh tiến trình bài học tính theo bước thật (1/5 đến 5/5), có đánh dấu bước đã xem và bước đang ở.
- Thêm trạng thái trống khi tìm kiếm/lọc không có kết quả, kèm nút xóa bộ lọc.
- Chuẩn hóa nhịp giãn, chiều cao nút, kích thước chữ tối thiểu 16px trên điện thoại; kiểm tra không tràn ngang ở màn hình nhỏ.
- Rà soát tương phản sáng/tối cho các thẻ chặng, huy hiệu trạng thái và nút audio.
- Dừng audio khi rời bước, đổi bài, quay lại lộ trình hoặc chuyển tab.

### 3. Rà soát và bổ sung nội dung
- Kiểm tra toàn bộ 48 bài Core: tính tự nhiên của email/họp/thuyết trình/đàm phán (Business) và độ chính xác của thuật ngữ nghiên cứu, hedging, trích dẫn (Academic).
- Kiểm tra 43 bài Communication Lab: hội thoại hợp lý, người nói nhất quán, câu hỏi nghe bám transcript, đáp án đúng và giải thích song ngữ đầy đủ.
- Bổ sung phần còn mỏng: mục tiêu bài học, lỗi thường gặp, chú giải bài mẫu.
- Giữ nguyên toàn bộ ID bài học và khóa lưu tiến độ để học sinh không mất kết quả.

### 4. Củng cố kỹ thuật
- Viết thêm bộ kiểm định cho Communication Lab: ID trùng, thiếu bản dịch, đáp án ngoài phạm vi, thiếu A/B/C/D, đáp án lặp, hội thoại quá ngắn, thiếu transcript.
- Mở rộng bộ kiểm định Core: cấm em dash, kiểm tra hoạt động luyện tập mới, kiểm tra chú giải bài mẫu.
- Xóa màn hình bài học cũ không còn dùng sau khi xác nhận không nơi nào tham chiếu.
- Kiểm tra kiểu dữ liệu và chạy thử thực tế cả hai khóa trên máy tính và điện thoại: mở chặng, vào bài, nghe audio, làm luyện tập, làm quiz, thử lại, hoàn thành, quay lại, tiếp tục học, và Communication Lab không bị ảnh hưởng.

## Chi tiết kỹ thuật

- `src/lib/purposeEnglishLearning.ts`: thêm bộ sinh hoạt động có hướng dẫn (chọn cụm từ, sắp xếp câu, mức trang trọng) theo seed ổn định từ `lesson.id`, trả về đáp án đúng, phương án nhiễu và giải thích song ngữ.
- `src/components/PurposeCoreLearningPath.tsx`: thay khối guided hiện tại, tính tiến trình theo bước, thêm trạng thái trống, siết cleanup audio, tinh chỉnh khoảng cách và responsive.
- `scripts/audit_purpose_english_core.ts`: mở rộng kiểm tra; thêm `scripts/audit_purpose_english_lab.ts` cho `professionalCommunicationLessons` và `academicCommunicationLessons`.
- Sửa dữ liệu trong `businessEnglishLessons*.ts`, `academicEnglishLessons*.ts` và các bài lab trong `conversationalCurriculum*` nếu kiểm định phát hiện lỗi.
- Xóa `src/components/PurposeEnglishHub.tsx` sau khi kiểm tra không còn tham chiếu.
- Không đổi backend, không đổi menu, không khóa nội dung.

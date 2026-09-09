# Rà soát Cambridge Speaking Practice: câu hỏi lặp và ảnh lỗi

## Hiện trạng đã kiểm tra

- Bộ đề sau khi làm sạch có 482 lượt nói, chia theo 5 trình độ (Starters 81, Movers 105, Flyers 93, KET 97, PET 106).
- Bộ lọc trùng hiện chỉ bỏ câu dẫn của giám khảo trùng y nguyên trong cùng trình độ, **không** kiểm tra các câu hỏi phụ. Kết quả: 104 câu hỏi phụ bị lặp trong cùng một chủ đề, ví dụ Starters/Food and meals lặp 6 câu, Movers/Sport and exercise lặp 10 câu, KET/Food and meals lặp 5 câu. Tổng 42 chủ đề bị ảnh hưởng.
- Có 60 ảnh minh hoạ, chỉ 184/482 lượt nói được gán ảnh, và một số ảnh dùng lại rất nhiều (ke-market dùng cho 12 lượt nói). Chưa từng có bước xem lại từng ảnh nên các ảnh vẽ sai (thiếu đầu, thừa tay, chữ méo) vẫn còn.

## Sẽ làm

### 1. Bỏ câu hỏi lặp trong cùng chủ đề

- Nâng bộ lọc trùng: so sánh cả câu dẫn và toàn bộ câu hỏi phụ, sau khi bỏ dấu câu, chữ hoa và các cách viết gần giống nhau, theo phạm vi từng trình độ + từng chủ đề.
- Với câu hỏi phụ lặp: viết lại bằng câu hỏi khác cùng độ khó và cùng chủ đề (thay vì xoá trắng), để mỗi lượt nói vẫn đủ 3 câu hỏi phụ.
- Với câu dẫn gần giống nhau (chỉ khác một hai từ), gộp hoặc viết lại để mỗi chủ đề không hỏi lại cùng một điều.
- Bổ sung câu hỏi mới cho những chủ đề bị hụt sau khi loại trùng, giữ đúng dạng thi từng cấp độ (Starters chỉ hỏi ngắn, PET có câu hỏi mở rộng ý kiến).
- Viết script kiểm tra tự động: 0 câu lặp trong cùng chủ đề, mọi lượt nói có tối thiểu 3 câu hỏi phụ, 4 mẫu câu gợi ý và câu trả lời mẫu.

### 2. Rà soát và sửa toàn bộ ảnh

- Xem lần lượt cả 60 ảnh, đánh dấu ảnh có lỗi vẽ người (thiếu/nhoè đầu, tay chân sai, mặt biến dạng), chữ méo, hoặc nội dung không khớp chủ đề và dạng bài.
- Tạo lại từng ảnh lỗi theo đúng loại bài: bài "tìm điểm khác" cần bảng A/B, bài kể chuyện cần dải 4 khung, bài scene/photo cần một cảnh duy nhất. Ưu tiên phong cách vẽ dễ thương, rõ ràng, không có chữ trong ảnh (chữ hay bị méo) và hạn chế cận cảnh mặt người.
- Kiểm tra lại từng ảnh mới sau khi tạo, làm lại nếu vẫn sai.
- Giảm việc dùng lại một ảnh cho quá nhiều câu: bổ sung ảnh cho các chủ đề đang thiếu để không còn ảnh nào bị dùng quá 3 lần, và mọi ảnh phải khớp nội dung câu hỏi.

### 3. Rà soát phần còn lại của Speaking

- Kiểm tra mỗi câu đều có gợi ý từ vựng đúng chủ đề, câu trả lời mẫu đúng cấp độ, thời gian nói hợp lý.
- Kiểm tra nút nghe câu hỏi, thu âm, chấm điểm vẫn hoạt động sau khi đổi dữ liệu.

## Chi tiết kỹ thuật

- Nâng cấp `src/data/cambridgeSpeakingSanitize.ts` (thêm dedupe câu hỏi phụ theo level+topic, chuẩn hoá gần giống) và bổ sung nội dung thay thế trong một file mới `src/data/cambridgeSpeakingQuestionFix.ts` để không phá vỡ các file expansion hiện có.
- Ảnh mới ghi vào `src/assets/cambridge-speaking/`, cập nhật `cambridgeSpeakingImages.ts` và `cambridgeSpeakingImageMap.ts` (kèm quy tắc trong `scripts/gen_cambridge_speaking_image_map.ts`).
- Thêm `scripts/audit_cambridge_speaking_content.ts` kiểm tra trùng lặp, thiếu trường, và ảnh dùng lại quá nhiều.
- Giữ nguyên id lượt nói, route `/cambridge-speaking-practice`, tiến độ học sinh và phần chấm điểm AI.

## Kiểm tra

- Script audit: 0 lỗi trùng, 0 lỗi thiếu nội dung, không ảnh nào dùng quá 3 lần.
- TypeScript.
- Trình duyệt desktop và điện thoại: mở từng cấp độ, đi qua vài chủ đề đã sửa, xác nhận câu hỏi không lặp và ảnh hiện đúng, không lỗi.

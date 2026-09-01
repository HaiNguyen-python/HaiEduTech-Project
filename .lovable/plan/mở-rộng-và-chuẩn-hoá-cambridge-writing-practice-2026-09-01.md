# Mở rộng và chuẩn hoá Cambridge Writing Practice

## Hiện trạng đã kiểm tra
- `src/data/cambridgeWritingTasks.ts`: 30 đề, đúng 6 đề mỗi cấp (Starters, Movers, Flyers, KET, PET), mỗi đề có prompt song ngữ, 3 gợi ý nội dung, useful language, khoảng từ và bài mẫu.
- UI `src/components/cambridge/CambridgeWritingLab.tsx` hiển thị theo tab cấp độ; chấm bài qua edge function `grade-cambridge-writing` (4 tiêu chí Cambridge, phản hồi song ngữ).
- Ảnh chụp cho thấy Flyers chỉ có 6 thẻ, dạng bài lặp lại (3 story, 2 note, 1 sentence completion).

## Việc sẽ làm

### 1. Thêm đề luyện tập: 6 → 18 đề mỗi cấp (tổng 90 đề)
Thêm 12 đề mới mỗi cấp, chủ đề bám sát danh sách chủ đề chính thức của từng cấp (gia đình, trường học, thể thao, thời tiết, du lịch, sức khoẻ, công nghệ, môi trường ở cấp cao), không lặp tiêu đề hay tình huống.

### 2. Chuẩn dạng bài theo đúng đề thi từng cấp
- **Starters**: chép/hoàn thành từ theo tranh, hoàn thành câu, 2-3 câu tả tranh. Vốn từ trong danh sách Starters, chỉ hiện tại đơn/hiện tại tiếp diễn.
- **Movers**: hoàn thành câu theo mẫu, ghi chú ngắn, truyện 3 câu theo tranh. 20-40 từ.
- **Flyers**: cân bằng 6 story / 6 note-message / 6 sentence completion, 20-45 từ, có quá khứ đơn.
- **KET (A2)**: Part 6 tin nhắn 25-35 từ và Part 7 kể chuyện theo 3 tranh (35 từ+), đúng tỉ lệ đề thật.
- **PET (B1)**: Part 1 email bắt buộc 100 từ (kèm email gợi ý và 4 ghi chú như đề thật), Part 2 chọn article/story, khoảng 100 từ.

### 3. Rà soát toàn bộ 90 đề
Với mỗi đề kiểm tra: dạng bài có trong đề thi cấp đó, khoảng từ đúng chuẩn Cambridge, đủ 3 nội dung bắt buộc, bài mẫu nằm trong khoảng từ và chỉ dùng ngữ pháp/vốn từ của cấp đó, bản Việt dịch đúng, không dùng dấu gạch dài.

### 4. Mở rộng script rà soát
Bổ sung kiểm tra tự động vào `scripts/audit_cambridge_exams.ts`: đủ 18 đề/cấp, không trùng id/tiêu đề, dạng bài hợp lệ theo cấp, khoảng từ trong ngưỡng cho phép, bài mẫu đếm từ nằm trong min-max, đủ bullet và bản dịch. Chạy tới `Issues: 0`.

### 5. UI cho danh sách dài hơn
`CambridgeWritingLab.tsx`: thêm bộ lọc theo dạng bài trong mỗi cấp và trạng thái "đã làm" để 18 thẻ vẫn dễ chọn; giữ nguyên luồng chấm AI.

## Ghi chú kỹ thuật
- File chính: `src/data/cambridgeWritingTasks.ts` (thêm bank mở rộng theo cấp), UI `src/components/cambridge/CambridgeWritingLab.tsx`, audit `scripts/audit_cambridge_exams.ts`.
- Không đổi id của 30 đề hiện có nên tiến độ đã lưu không bị ảnh hưởng.
- Chấm bài vẫn dùng edge function `grade-cambridge-writing` hiện tại, chỉ truyền thêm dạng bài để prompt chấm sát tiêu chí từng dạng.

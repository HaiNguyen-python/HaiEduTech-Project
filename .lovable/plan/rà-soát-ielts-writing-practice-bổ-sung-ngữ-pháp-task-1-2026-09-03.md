# Rà soát IELTS Writing Practice + bổ sung ngữ pháp Task 1

## Vấn đề đã xác minh (đọc code)

1. **Grammar Practice không phân biệt Task 1 / Task 2.** `src/data/ieltsGrammarBank.ts` có 35 cấu trúc, không có trường `task`; `GrammarPractice.tsx` nhận `taskType` nhưng chỉ dùng cho tiêu đề sổ tay và payload chấm bài - danh sách lọc chỉ theo `category`. Vì vậy bấm Task 1 hay Task 2 đều ra đúng một bộ, và toàn bộ câu ví dụ đều mang giọng văn Task 2 (chính sách, xã hội), không có ngôn ngữ mô tả số liệu/biểu đồ/quy trình/bản đồ.
2. **Nhãn mô tả tab Grammar nói "Band 7+ structures" chung chung**, không nói rõ bộ cấu trúc đang xem thuộc task nào - học viên Task 1 dễ luyện sai loại câu.
3. Các tab khác đã lọc theo task đúng: Phrase (`taskType`), Cohesion (Linker `task`, Sentence Linking, Reorder). Idea Practice chỉ dành cho Task 2 và không hiện nút Task - hợp lý, sẽ ghi rõ trên tiêu đề.
4. Translation Practice vừa được rà soát (128 câu, audit 0 lỗi) - chỉ kiểm tra lại, không sửa nội dung.

## Sẽ làm

### 1. Tách ngân hàng ngữ pháp theo task
- Thêm trường `task: 1 | 2 | "both"` cho `IELTSGrammarItem` và gán cho 35 mục hiện có (phần lớn là Task 2, một số như mệnh đề quan hệ, bị động, so sánh dùng chung "both").
- Thêm nhóm danh mục riêng cho Task 1 và Task 2:
  - Task 1: mô tả xu hướng (`while/whereas`, `with + N + V-ing`), so sánh (bội số, `twice as many ... as`), số liệu và tỉ lệ (`accounting for`, `a figure of`), tổng quan (`Overall, it is clear that`), quy trình (bị động nối tiếp, `Once ... has been V3`), bản đồ (`was replaced by`, `underwent`), mệnh đề phân từ mô tả dữ liệu.
  - Task 2: giữ nguyên các nhóm hiện tại (điều kiện, đảo ngữ, chẻ câu, danh từ hoá, hedging...).
- Bổ sung khoảng 40 cấu trúc Task 1 mới (tối thiểu 5 mỗi nhóm), mỗi mục có: công thức, giải nghĩa tiếng Việt, câu mẫu Band 7.5+ dùng dữ liệu giả định thực tế, gợi ý viết.

### 2. Lọc theo task trong giao diện
- `GrammarPractice.tsx` lọc danh sách theo `task` (bao gồm `both`), danh mục hiển thị đổi theo Task 1 / Task 2, reset lựa chọn khi đổi task để không giữ cấu trúc của task cũ.
- Dòng mô tả đổi theo task (Task 1: ngôn ngữ mô tả số liệu; Task 2: đa dạng cấu trúc lập luận).
- Truyền thêm ngữ cảnh task vào phần chấm AI để phản hồi đúng văn phong Task 1.

### 3. Rà soát nội dung và kỹ thuật các tab còn lại
- Kiểm tra Phrase Bank (323 mục), Cohesion Bank (121 mục), Idea Bank, Translation (128 câu): trùng lặp id, câu mẫu sai ngữ pháp, danh mục lệch task, thiếu ví dụ, dấu gạch ngang dài.
- Ghi rõ "Task 2 only" trên tab Idea Practice.
- Kiểm tra các edge function chấm bài (`grade-phrase-sentence`, `grade-translation`, `analyse-cohesion`) còn trả 200 và xử lý lỗi 429/402 rõ ràng.

### 4. Kiểm chứng
- Script mới `scripts/audit_ielts_writing_banks.ts`: id trùng, trường trống, câu mẫu không chứa cấu trúc, task/category hợp lệ, số lượng tối thiểu mỗi danh mục, ký tự gạch ngang dài. Phải báo 0 lỗi.
- Typecheck, và kiểm tra trên trình duyệt: đổi Task 1/Task 2 trong tab Grammar thấy danh sách khác nhau, chọn 1 cấu trúc Task 1, nộp câu và nhận điểm.

## Ghi chú kỹ thuật
Tệp chạm tới: `src/data/ieltsGrammarBank.ts` (+ tệp mở rộng `ieltsGrammarBankTask1.ts` cho phần mới), `src/components/GrammarPractice.tsx`, `src/pages/IeltsWritingPractice.tsx` (nhãn mô tả), có thể `supabase/functions/grade-phrase-sentence/index.ts` để nhận ngữ cảnh task, và script audit mới. Không thay đổi cơ sở dữ liệu.

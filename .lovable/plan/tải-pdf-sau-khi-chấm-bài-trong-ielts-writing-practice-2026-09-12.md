# Tải PDF sau khi chấm bài trong IELTS Writing Practice

Thêm nút tải PDF vào mọi phần luyện tập của IELTS Writing Practice, để sau khi được chấm học sinh tải bản gọn gàng về đọc lại.

## Trạng thái hiện tại

- Trang IELTS Writing Practice có 7 phần: Essay Writing, Smart Grading, Idea, Phrase, Grammar, Translation, Cohesion Lab.
- Hiện chưa phần nào có nút tải PDF. Chỉ trang bài mẫu (Sample Essays) có sẵn nút "Tải PDF".
- Bảng điểm dùng chung của Essay Writing và Smart Grading đã có đủ dữ liệu: điểm tổng, 4 tiêu chí kèm điểm mạnh/điểm yếu/gợi ý, danh sách lỗi và bản nâng cấp.

## Sẽ làm gì

Mỗi phần sẽ có một nút "Tải PDF" xuất hiện ngay khi có kết quả chấm, tạo ra một trang in sạch sẽ (chữ đen trên giấy trắng, tiếng Việt hiển thị đúng) mà học sinh lưu thành PDF hoặc in ra.

Nội dung từng bản PDF:

1. Essay Writing và Smart Grading: đề bài, bài viết của học sinh, số từ, điểm tổng, 4 tiêu chí kèm nhận xét chi tiết, bảng lỗi - cách sửa, bản nâng cấp Band cao hơn, lời khuyên.
2. Grammar Practice: cấu trúc mục tiêu, câu học sinh viết, điểm, nhận xét ngữ pháp, nhận xét cấu trúc, bản nâng cấp, các mẹo.
3. Phrase Practice: cụm từ mục tiêu, câu viết, điểm, nhận xét, bản nâng cấp, mẹo.
4. Translation Practice: câu tiếng Việt, bản dịch của học sinh, điểm, nhận xét và bản dịch tham khảo.
5. Cohesion Lab (cả 4 hoạt động: Linker Bank, Sentence Linking, Paragraph Reorder, Cohesion Analyser): bài làm, điểm, nhận xét; riêng Paragraph Reorder in cả thứ tự học sinh chọn và thứ tự đúng.
6. Idea Practice: đề, dàn ý và ghi chú học sinh đã viết (phần này không có điểm nên PDF là bản dàn ý để ôn).

Mọi bản PDF có cùng đầu trang thương hiệu HaiEduTech, ngày giờ, tên phần luyện tập và chân trang; tiêu đề và nhãn theo ngôn ngữ đang chọn (Việt/Anh).

## Chi tiết kỹ thuật

- Tạo `src/lib/writingPdfExport.ts` với:
  - `openWritingPdf(doc: WritingPdfDoc)` - dựng HTML in (in-line CSS, font serif, khổ A4, `@media print`), mở tab mới, `document.write` rồi `print()`; dùng cách này thay vì jsPDF để tránh lỗi dấu tiếng Việt với font mặc định của jsPDF (theo chuẩn dự án).
  - Kiểu `WritingPdfDoc { title; subtitle?; meta: {label,value}[]; sections: { heading; kind: "text"|"list"|"table"|"criteria"; ... }[] }` để mọi phần dùng chung.
  - `escapeHtml` + chuyển `**bold**` thành `<strong>`, giữ `whitespace: pre-wrap` cho đoạn văn.
  - Chặn `window.open` bị block: nếu `null` thì `toast.error` hướng dẫn cho phép pop-up.
- `src/components/ielts/WritingResultPanel.tsx`: thêm prop tuỳ chọn `onExportPdf?: () => void`; nếu có thì hiện nút "Tải PDF" cạnh tiêu đề điểm tổng. Không đổi giao diện khi không truyền prop.
- `src/pages/IeltsWritingPractice.tsx` và `src/components/ielts/FreeWritingGrader.tsx`: truyền `onExportPdf` dựng `WritingPdfDoc` từ `prompt`, `essay`, `wordCount`, `result` (overall, criteria, errors, upgraded, advice).
- `GrammarPractice.tsx`, `PhrasePractice.tsx`, `TranslationPractice.tsx`, `IdeaPractice.tsx`, `cohesion/LinkerBank.tsx`, `cohesion/SentenceLinking.tsx`, `cohesion/ParagraphReorder.tsx`, `cohesion/CohesionAnalyser.tsx`: thêm nút `Download` (shadcn `Button size="sm" variant="outline"`) trong khối kết quả, gọi `openWritingPdf` với dữ liệu đang có trong state - không gọi thêm API, không thay đổi luồng chấm điểm, không đổi ID, route, schema hay dữ liệu đã lưu.
- Không dùng ký tự em-dash trong nội dung PDF; dùng dấu gạch nối.
- Kiểm tra: `npx tsgo --noEmit`; chạy Playwright mở `/ielts-writing-practice`, kiểm tra nút Tải PDF hiện đúng ở từng tab sau khi có kết quả và không gây tràn ngang trên mobile; xem thử bản in bằng cách render HTML ra ảnh để soát bố cục, chữ bị cắt và dấu tiếng Việt.

## Mục tiêu

Thêm tab **"Coherence & Cohesion"** (Liên kết & Mạch lạc) trong `/ielts-writing-practice` để học viên luyện tiêu chí C&C - một trong 4 tiêu chí chấm IELTS Writing, kèm chấm AI + lưu Sổ tay như các tab hiện có.

## Cấu trúc tab mới

Tab thứ 5: **Cohesion Lab** (icon `Link2`), có 4 chế độ luyện con dạng sub-tabs:

### 1. Linker Bank (Ngân hàng liên từ)
Kho ~120 liên từ/cụm nối chia theo 10 nhóm chức năng:
- Adding (moreover, in addition, furthermore...)
- Contrasting (however, nevertheless, on the contrary...)
- Cause / Effect (consequently, as a result, owing to...)
- Exemplifying (for instance, to illustrate...)
- Sequencing (initially, subsequently, ultimately...)
- Summarising (in essence, to conclude...)
- Emphasising (notably, above all...)
- Conceding (admittedly, granted that...)
- Comparing (similarly, likewise...)
- Referencing (this trend, such a phenomenon, the former/latter...)

Mỗi liên từ: nghĩa tiếng Việt, band (B2/C1), Task 1 hay 2 hay cả hai, ví dụ mẫu, cảnh báo dùng sai phổ biến (VD: "Besides" không dùng đầu câu formal). UI giống Phrase Bank hiện có, học viên viết câu → AI chấm (dùng lại edge function `grade-phrase-sentence`, truyền linker làm "phrase").

### 2. Sentence Linking (Nối 2 câu)
Hiển thị 2 câu rời (VD: *"Public transport reduces traffic. It also cuts emissions."*), học viên viết lại thành 1 câu mạch lạc dùng liên từ phù hợp. AI so sánh với 2-3 phương án chuẩn Band 7+, cho điểm cohesion và gợi ý phương án hay hơn. ~40 cặp câu (20 Task 1 + 20 Task 2).

### 3. Paragraph Reordering (Sắp xếp đoạn văn)
Cho 4-6 câu bị xáo trộn của 1 đoạn Band 8+ mẫu. Học viên kéo-thả (dnd-kit) để sắp lại đúng thứ tự logic. Sau khi submit: highlight referencing words (this, such, these) và topic sentence để giải thích vì sao thứ tự đó mạch lạc. ~25 đoạn (Task 1 body, Task 2 body, cả introduction & conclusion).

### 4. Cohesion Analyser (Phân tích đoạn văn của bạn)
Textarea 80-200 từ, học viên dán đoạn văn của mình. AI trả về:
- **Cohesion score** 0-9 theo IELTS descriptor
- **Linking devices map**: liệt kê tất cả từ nối đã dùng, đánh dấu overused/mechanical/missing
- **Reference chain analysis**: kiểm tra dùng "this/these/such" có rõ referent không
- **Paragraph structure**: có topic sentence, supporting, concluding không
- **Rewrite Band 8+**: đoạn văn upgraded, bold các cohesive devices mới

## File mới

```
src/data/ieltsCohesionBank.ts        - 120 linkers + 40 sentence pairs + 25 reorder paragraphs
src/components/CohesionLab.tsx       - Sub-tabs shell (4 chế độ)
src/components/cohesion/LinkerBank.tsx
src/components/cohesion/SentenceLinking.tsx
src/components/cohesion/ParagraphReorder.tsx
src/components/cohesion/CohesionAnalyser.tsx
supabase/functions/analyse-cohesion/index.ts  - Edge function dùng Lovable AI (google/gemini-3-flash-preview)
```

## File sửa

- `src/pages/IeltsWritingPractice.tsx`: TabsList từ `grid-cols-4` → `grid-cols-5`, thêm tab "Cohesion Lab" với icon `Link2`.
- Tái sử dụng edge function `grade-phrase-sentence` cho Linker Bank và Sentence Linking (truyền linker/cặp câu làm phrase target).

## Tích hợp Sổ tay

Mọi câu/đoạn học viên submit đều có nút **"Lưu vào Sổ tay"** giống cơ chế trong PhrasePractice/GrammarPractice, ghi vào note title `IELTS Cohesion Practice Task N` và phát event `notebook:updated`.

## Câu hỏi trước khi triển khai

Xem câu hỏi phía dưới - tôi cần chốt scope trước khi build.

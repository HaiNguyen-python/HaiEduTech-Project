# Template Practice - mục riêng cạnh Shadowing Practice

Tách khung trả lời ra khỏi phần câu hỏi Part 1/2/3 và biến nó thành một mục luyện tập độc lập, có template riêng cho từng **dạng câu hỏi** kèm ví dụ mẫu hoàn chỉnh.

## Học sinh sẽ thấy gì

Trên hàng chọn chế độ (Part 1 - Part 2 - Part 3 - Shadowing Practice - Review SRS) thêm nút mới **"Template Practice" / "Luyện Template"**, đặt ngay cạnh Shadowing Practice. Khi bấm vào, toàn bộ khu vực câu hỏi được thay bằng trang Template Lab:

1. **Chọn Part** (1 / 2 / 3) bằng badge nhỏ trong trang.
2. **Chọn dạng câu hỏi** của Part đó, ví dụ:
   - Part 1: Sở thích / thói quen (Do you like...), Tần suất (How often...), So sánh quá khứ - hiện tại (Did you use to...), Ý kiến ngắn (Would you like...).
   - Part 2: Describe a person, Describe a place, Describe an object, Describe an event / experience, Describe a habit / activity.
   - Part 3: Ý kiến (Do you think...), Nguyên nhân - kết quả (Why do...), So sánh nhóm / thế hệ, Dự đoán tương lai (Will...), Ưu - nhược điểm (Advantages...).
3. Với mỗi dạng câu hỏi hiển thị:
   - Khung cấu trúc theo bước (PREP cho Part 1, 4 khối cue-card cho Part 2, AREA + Balance cho Part 3) - mỗi bước có mục tiêu song ngữ, thời lượng gợi ý, và 2-3 mẫu câu band 7.0+.
   - **Ví dụ cụ thể**: một câu hỏi mẫu của dạng đó + bài trả lời mẫu band 7.5+ được chú thích từng bước (bước nào là Point, bước nào là Reason...), để học sinh thấy khung được áp dụng thật ra sao.
   - Ô nhập cho từng bước để học sinh tự viết khung của mình, lưu lại theo từng dạng câu hỏi (localStorage) nên quay lại vẫn còn.
   - Nút **Copy dàn ý** và nút **Mở Sổ tay** (Ghi chú) để lưu lại.
   - Danh sách "Câu hỏi luyện thêm" (3-5 câu cùng dạng) để học sinh tự áp khung.

Phần câu hỏi Part 1/2/3 sẽ **không còn** khối Answer Template nữa - giao diện gọn lại như trước, chỉ còn Quick Notes.

## Kỹ thuật

- `src/data/speakingTemplateTypes.ts` (mới): mở rộng dữ liệu hiện có trong `speakingAnswerTemplates.ts` thành các "question type" theo part: `{ id, part, labelVi/En, cueWords[], steps (tái dùng TemplateStep), example: { question, annotatedAnswer: {stepId, text}[], band }, practiceQuestions[] }`.
- `src/components/ielts/SpeakingTemplateLab.tsx` (mới): trang mục Template Practice - chọn part, chọn dạng câu hỏi (dropdown/badge), render các bước + starters + ô nhập + ví dụ mẫu chú thích; dùng Card/Badge/Tabs/Textarea sẵn có, `useLanguage()` song ngữ, token màu semantic.
- `src/components/ielts/SpeakingAnswerTemplate.tsx`: giữ lại làm khối bước dùng chung cho Lab (tái sử dụng logic ô nhập + localStorage), bỏ khỏi luồng câu hỏi.
- `src/pages/SpeakingPractice.tsx`: thêm `"template"` vào state `mode`, thêm nút cạnh Shadowing Practice, render `<SpeakingTemplateLab />` khi mode là template, và xóa `<SpeakingAnswerTemplate ... />` khỏi khu vực trước Quick Notes.
- Không thay đổi logic chấm điểm, SRS, hay dữ liệu câu hỏi.

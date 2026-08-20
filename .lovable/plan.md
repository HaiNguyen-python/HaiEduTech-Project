# Speaking Answer Template - khung trả lời cho IELTS Speaking

Thêm một bảng "Answer Template" ngay trong trang IELTS Speaking Practice, giúp học sinh có khung cố định để bám vào khi trả lời từng Part.

## Học sinh sẽ thấy gì

Một khối mới đặt phía trên Quick Notes (thu gọn / mở rộng được), tự đổi nội dung theo Part đang chọn:

- **Part 1 - khung PREP (4 bước, 2-4 câu):**
  Point (trả lời trực tiếp) - Reason (vì sao) - Example (ví dụ ngắn) - Personal twist (cảm nhận / so sánh nhỏ).
- **Part 2 - khung 4 khối theo cue card (1-2 phút):**
  Intro (paraphrase đề + "I'd like to talk about...") - Details (What/When/Where/Who) - Story / Why it matters (phần dài nhất) - Feeling + Wrap-up (câu chốt cảm xúc).
  Có thêm khung "1 phút chuẩn bị": 4 gạch đầu dòng theo đúng 4 bullet của cue card.
- **Part 3 - khung AREA + Balance (3-5 câu):**
  Answer (quan điểm) - Reason - Example / Evidence - Alternative view ("That said, some people argue...") - Conclusion.

Mỗi bước gồm:
- Tên bước + mục tiêu (song ngữ Việt / Anh).
- 2-3 mẫu câu sẵn (sentence starters) ở band 7.0+ , ví dụ "To be honest, ...", "What stands out most is ...", "It largely depends on ...".
- Ô nhập ngắn để học sinh điền ý của mình vào từng bước.
- Nút "Chèn vào Quick Notes" để gộp toàn bộ khung đã điền thành dàn ý trong ô ghi chú hiện có, và nút "Copy".
- Thanh gợi ý thời lượng cho từng bước (ví dụ Part 2: Intro 10s, Details 20s, Story 45s, Wrap-up 15s).

Nội dung học sinh điền được lưu lại theo từng câu hỏi (giống Quick Notes hiện tại) nên đổi câu rồi quay lại vẫn còn.

## Kỹ thuật

- Tạo `src/data/speakingAnswerTemplates.ts`: định nghĩa template theo part (steps: id, label VI/EN, goal, starters[], seconds).
- Tạo `src/components/ielts/SpeakingAnswerTemplate.tsx`: nhận `part`, `question`, `onInsertToNotes`; state theo `localStorage` key `speaking-template-{part}-{questionId}`; dùng Card / Collapsible / Textarea / Badge có sẵn, `useLanguage()` cho song ngữ, token màu semantic (không hardcode màu).
- Trong `src/pages/SpeakingPractice.tsx`: render component ngay trước Card Quick Notes (khoảng dòng 1099), truyền `selectedPart` và `currentQ`; `onInsertToNotes` append text vào `candidateNotes` (tái dùng cơ chế lưu ghi chú hiện có).
- Không thay đổi logic chấm điểm, SRS, hay dữ liệu câu hỏi.

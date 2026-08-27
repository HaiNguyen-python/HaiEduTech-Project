# Hội thoại in đậm cụm từ hay + nâng chất bài nghe (Interactive Curriculum)

## Hiện trạng đã kiểm tra

- Hội thoại trong tab Situations render qua `highlightKeywords` (chỉ gạch chân các `term` trong danh sách vocabulary của bài). Vì phần lớn cụm từ hay trong hội thoại (ví dụ "find a figure that works for both of us", "commit to a two-year contract") không nằm trong danh sách vocabulary nên hội thoại hiện ra trắng trơn, không có gì được làm nổi bật.
- Bài nghe: 69 bài (39 + 15 + 15 trong `conversationalCurriculum.ts`, `...Expansion.ts`, `...Expansion2.ts`). Độ dài transcript chỉ 35 - 78 từ (trung vị ~45 từ), nên audio chỉ khoảng 15 - 20 giây.
- Có câu hỏi không nằm trong bài nghe: ví dụ bài Negotiation Skills hỏi 'What does "sweeten the deal" mean?' trong khi transcript không hề nói cụm đó. Đây là câu từ vựng bị đặt vào phần Listening.

## Việc sẽ làm

### 1. In đậm cụm từ hay trong hội thoại
- Thêm bộ "cụm từ chức năng" (functional chunks) dùng chung cho hội thoại: mẫu câu thương lượng, đề nghị, xin lỗi, xác nhận, làm rõ, chốt việc (khoảng 180 - 220 cụm, ví dụ "What did you have in mind", "How about", "commit to", "Could you send ... in writing", "I'd like to", "It looks like", "Would you like me to").
- Nâng cấp hàm highlight: cụm từ hay in **đậm** (đậm + nền nhạt nhẹ theo token màu brand), từ vựng của bài giữ gạch chân màu hổ phách như hiện tại; ưu tiên khớp cụm dài trước cụm ngắn, không lồng nhau, không phá dấu tiếng Việt.
- Thêm chú thích nhỏ dưới hội thoại: đậm = cụm từ nên học, gạch chân = từ vựng bài học (song ngữ).

### 2. Bài nghe chỉ hỏi nội dung có trong script
- Viết script kiểm tra tự động `scripts/audit_conversational_listening.mjs`: mỗi câu hỏi phải có đáp án đúng xuất hiện trong transcript (có bảng quy đổi số, giờ, giá, %), và mọi phương án sai không được nói như một sự thật.
- Với các câu hỏi kiểu "nghĩa của cụm X" hoặc hỏi thông tin không có trong script: đổi thành câu hỏi nghe đúng nghĩa (thông tin, ý định người nói, con số, việc cần làm tiếp). Nội dung từ vựng vẫn còn ở tab Vocab & Slang nên không mất kiến thức.

### 3. Kéo dài bài nghe
- Viết lại transcript của cả 69 bài thành hội thoại nhiều lượt, 130 - 180 từ (gấp khoảng 3 lần hiện tại, audio ~50 - 70 giây), đúng ngữ cảnh chủ đề từng bài, có thêm chi tiết gây nhiễu tự nhiên để câu hỏi phân biệt được.
- Mỗi bài nghe có 4 - 5 câu hỏi, đủ trải trên toàn bộ script (đầu, giữa, cuối) để buộc học sinh nghe hết.
- Kiểm tra lại: audit về 0 lỗi, mở thử 3 bài (Life Skills, Professional, Expansion) để nghe audio và đọc lại transcript + câu hỏi.

## Ghi chú kỹ thuật
- Cụm từ hay đặt trong `src/lib/dialogueKeyPhrases.ts`, logic tô đậm nâng cấp trong `src/lib/highlightKeywords.ts`; chỉ áp dụng cho `ConversationalLessonView.tsx` (không đổi bản tiếng Trung).
- Transcript và câu hỏi sửa trực tiếp trong 3 file dữ liệu curriculum, giữ nguyên `id`, tiêu đề, số bài và cấu trúc `ListeningChallenge` nên tiến độ học sinh không bị ảnh hưởng (số câu hỏi mỗi bài có thể tăng, logic hoàn thành đã tính theo số câu thực tế).
- Không dùng dấu gạch dài, giữ giải thích song ngữ Anh - Việt.

# Rà soát Writing + thêm luyện dịch đoạn văn

## Kết quả rà soát (đã chạy kiểm tra thật)

- `scripts/audit_ielts_writing_banks.ts`: **0 lỗi**. Ngân hàng hiện có: 322 cụm từ, 93 từ nối, 15 chủ đề ý tưởng, ngữ pháp Task 2 34 mục, Task 1 57 mục (pool luyện 69).
- `scripts/audit_ielts_translation.ts`: **0 lỗi**, 128 câu dịch.
- 6 tab trong `/ielts-writing-practice` (Essay, Idea, Phrase, Grammar, Translation, Cohesion) đều nối đúng tới các edge function chấm bài hiện có (`grade-writing`, `grade-phrase-sentence`, `grade-translation`, `analyse-cohesion`).

Còn thiếu duy nhất: chỉ luyện dịch **từng câu**, chưa có luyện dịch **đoạn văn** - đây là khoảng trống giữa dịch câu và viết bài hoàn chỉnh. Việc chính của lần này là bổ sung phần đó, kèm rà soát lại chi tiết nội dung khi thêm.

## Sẽ làm

### 1. Thêm mục "Dịch đoạn văn / Paragraph Translation"
Nằm ngay trong tab Translation Practice, dạng 2 mục con: "Câu" (giữ nguyên như hiện tại) và "Đoạn văn" (mới).

Học viên thấy:
- Chọn Task 1 / Task 2 và loại đoạn (Task 1: mở bài + tổng quan, đoạn số liệu, đoạn so sánh, đoạn quy trình/bản đồ; Task 2: mở bài, đoạn thân bài nguyên nhân/giải pháp, đoạn phản biện, kết bài).
- Đoạn tiếng Việt 3-5 câu, mức band (6.0 / 6.5-7.0 / 7.5+), gợi ý cấu trúc ẩn tới khi bấm "Gợi ý".
- Vùng nhập bản dịch có đếm từ, Ctrl/Cmd+Enter để nộp.
- Sau khi nộp: điểm 10 với 5 tiêu chí (độ chính xác nghĩa, ngữ pháp, từ vựng, liên kết câu, văn phong học thuật), nhận xét song ngữ theo từng câu, bản sửa giữ cách viết của học viên, bản nâng Band 7.5+, và bản dịch mẫu kèm ghi chú.
- Nghe bản mẫu, lưu vào sổ tay, Ngẫu nhiên / Đoạn tiếp / Làm lại, thanh tiến độ và lưu điểm cao nhất từng đoạn.

### 2. Ngân hàng nội dung
File mới `src/data/ieltsParagraphTranslationBank.ts`: 60 đoạn (30 Task 1, 30 Task 2), mỗi đoạn có văn bản tiếng Việt, bản dịch mẫu Band 7.5+, cấu trúc cần dùng, ghi chú giảng dạy song ngữ, khoảng từ, loại đoạn và band. Nội dung viết theo giọng văn IELTS thật (ngôn ngữ mô tả số liệu cho Task 1, lập luận cho Task 2).

### 3. Chấm bài
Edge function mới `grade-paragraph-translation` (Lovable AI Gateway, google/gemini-3.6-flash) nhận đoạn Việt, bản mẫu, bản dịch của học viên; trả JSON gồm 5 điểm thành phần, nhận xét theo câu, bản sửa, bản nâng cấp. Vẫn có chấm cục bộ (độ dài, số câu, cấu trúc mục tiêu) để dùng được khi AI lỗi, và thông báo rõ khi gặp lỗi 429/402.

### 4. Kiểm chứng
Mở rộng `scripts/audit_ielts_translation.ts` để kiểm cả ngân hàng đoạn văn: id trùng, thiếu trường, số câu Việt/Anh khớp, bản mẫu nằm trong khoảng từ, cấu trúc mục tiêu thật sự có trong bản mẫu, không dùng dấu gạch dài. Phải báo 0 lỗi. Thêm kiểm tra TypeScript, một lần gọi thật edge function, và thử trên trình duyệt (nộp bản dịch có lỗi cố ý, xem điểm, nhận xét, bản mẫu, sổ tay, đoạn tiếp).

## Ghi chú kỹ thuật
Tệp mới: `src/data/ieltsParagraphTranslationBank.ts`, `src/components/ParagraphTranslationPractice.tsx`, `supabase/functions/grade-paragraph-translation/index.ts`. Tệp sửa: `src/components/TranslationPractice.tsx` (thêm 2 mục con), `scripts/audit_ielts_translation.ts`. Tiến độ lưu localStorage `ielts-paragraph-translation-progress`, hoạt động ghi log `ielts_paragraph_translation`. Không đổi cơ sở dữ liệu.

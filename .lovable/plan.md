# Nâng cấp trợ lý thành "bản sao ảo" của thầy Hải (hỗ trợ 24/7)

Mục tiêu: trợ lý trong ô chat nói và dạy giống thầy Hải thật, đọc được câu trả lời thành tiếng, nhớ học sinh lâu dài và dẫn dắt từng bước thay vì chỉ trả lời suông.

## 1. Giọng nói của thầy
- Thêm nút loa trên mỗi câu trả lời của thầy để đọc thành tiếng, và một nút bật/tắt "tự động đọc" ở đầu ô chat (ghi nhớ lựa chọn trên máy học sinh).
- Giọng đọc chọn theo ngôn ngữ của câu trả lời: Việt, Anh, Trung, Nhật, Phần Lan, Thụy Điển.
- Đọc theo từng đoạn, bỏ qua ký hiệu định dạng và khối mã để nghe tự nhiên; có nút dừng, tự dừng khi đóng ô chat hoặc gửi câu mới.
- Tốc độ đọc chậm hơn một chút cho tiếng Việt để giống cách thầy nói.

## 2. Ghi nhớ lâu dài
- Với học sinh đã đăng nhập: trợ lý tự lưu những điểm đáng nhớ (mục tiêu, kỳ thi hướng tới, điểm yếu, sở thích, cách học ưa thích) và dùng lại ở các lần trò chuyện sau, kể cả khi đã đóng trang.
- Mỗi lần mở chat, phần ghi nhớ này được nạp cùng dữ liệu tiến độ hiện có, để thầy mở lời kiểu "lần trước em đang luyện Writing Task 2, hôm nay ta tiếp nhé".
- Học sinh xem và xóa được phần ghi nhớ này trong ô chat (nút "Thầy nhớ gì về em").
- Khách chưa đăng nhập vẫn dùng bình thường, chỉ nhớ trong phiên như hiện tại.

## 3. Phong cách dạy: dẫn dắt như thầy thật
- Trả lời theo nhịp: hiểu vấn đề, giải thích ngắn có ví dụ, rồi đặt lại một câu hỏi kiểm tra nhỏ cho học sinh.
- Khi học sinh sai: gợi ý trước, chỉ đưa đáp án đầy đủ khi học sinh chịu bí hoặc xin đáp án.
- Kết mỗi lượt dạy bằng một bước tiếp theo cụ thể kèm liên kết tới đúng mục học trên web (giữ nguyên cách gợi ý tính năng hiện có).
- Thêm nút nhanh: "Kiểm tra em 5 câu", "Giải thích dễ hơn", "Cho em ví dụ khác", "Luyện nói câu này".
- Giữ nguyên toàn bộ quy tắc hiện có: chỉ trả lời trong 8 lĩnh vực học, không tư vấn học phí/lịch học (vẫn hiện nút đăng ký), một câu trả lời chỉ dùng một ngôn ngữ, không dùng gạch ngang dài.

## 4. Cảm giác "24/7"
- Lời chào theo thời gian trong ngày và theo trang học sinh đang xem.
- Nếu học sinh vắng nhiều ngày, câu chào nhắc lại việc đang học dở và đề nghị ôn nhanh.
- Nhãn rõ ràng trong ô chat: đây là bản sao ảo của thầy Hải, luôn trực 24/7, và cần gặp thầy thật thì bấm liên hệ.

## 5. Kiểm tra trước khi báo xong
- Kiểm tra kiểu dữ liệu và chạy thử trên máy tính và điện thoại.
- Thử: hỏi ngữ pháp tiếng Anh, hỏi tiếng Trung, hỏi học phí (phải ra nút đăng ký), nghe đọc thành tiếng ở tiếng Việt và tiếng Anh, đóng và mở lại chat để kiểm tra phần ghi nhớ.

## Ghi chú kỹ thuật
- Không đổi đường dẫn Edge Function `chat`, khóa lưu lịch sử trình duyệt, hay cấu trúc lịch sử tin nhắn hiện có.
- Files: `supabase/functions/chat/index.ts` (system prompt dạng dẫn dắt + nạp/ghi phần nhớ dài hạn), Edge Function mới `chat-tts` (Lovable AI `/v1/audio/speech`, `openai/gpt-4o-mini-tts`, SSE, khóa API chỉ ở server), `src/components/ChatBot.tsx`, `src/components/chat/ChatMessageList.tsx` (nút loa), `src/components/chat/ChatComposer.tsx` (nút nhanh), hook mới `src/hooks/useChatVoice.ts`.
- Bảng mới `chatbot_student_memory` (owner-scoped, RLS + GRANT): `user_id`, `key`, `value`, `updated_at`; chỉ ghi khi học sinh đã đăng nhập.
- Giữ model chat hiện tại và nhánh xử lý ảnh; chỉ mở rộng system prompt và phần ngữ cảnh.

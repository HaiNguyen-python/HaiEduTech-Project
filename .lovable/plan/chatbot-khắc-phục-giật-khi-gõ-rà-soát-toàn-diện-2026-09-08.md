# Chatbot: khắc phục giật khi gõ + rà soát toàn diện

## Vấn đề đã xác nhận khi đọc mã

**1. Gõ chữ bị chậm/giật (nguyên nhân chính)**
- Toàn bộ chatbot nằm trong một tệp duy nhất `src/components/ChatBot.tsx` (1810 dòng). Ô nhập chữ dùng chung state với cả khung chat, nên mỗi lần bấm một ký tự là cả khung chat vẽ lại: toàn bộ bong bóng tin nhắn, phần dựng markdown, khung kéo-thả có hiệu ứng, ảnh linh vật, bảng cài đặt.
- Mỗi tin nhắn của trợ lý được dựng lại bằng markdown ở mỗi lần vẽ (không có ghi nhớ kết quả), kèm một phép so khớp chuỗi cho từng tin nhắn. Lịch sử càng dài, gõ càng nặng.

**2. Lúc trợ lý đang trả lời cũng giật**
- Câu trả lời về theo từng chữ; mỗi chữ về là một lần cập nhật state, kéo theo: vẽ lại toàn khung, ghi lại toàn bộ lịch sử vào bộ nhớ trình duyệt (chuyển cả hội thoại thành chuỗi JSON), và một lần cuộn mượt mới. Ba việc nặng này chạy hàng trăm lần mỗi câu trả lời.
- Hiệu ứng lưu lịch sử phụ thuộc vào một đối tượng tạo mới ở mỗi lần vẽ, nên chạy lại nhiều hơn mức cần thiết.

**3. Nội dung/sư phạm**
- Bộ lọc từ ngữ chứa các từ thông dụng như "ngu", "vãi", "dm", "cave", "dâm" và so khớp kiểu "chứa chuỗi con", nên dễ chặn oan câu hỏi hợp lệ (ví dụ "ngữ pháp so sánh", "cave" trong bài đọc, tên riêng), rồi khóa chat 1 giờ. Cần dùng so khớp theo biên từ cho mọi từ, bỏ các từ quá mơ hồ, và cảnh báo nhẹ trước khi khóa.
- Câu hỏi gợi ý mở đầu chỉ có tiếng Anh, không đổi theo môn học học sinh đang học.
- Trợ lý đang dùng phiên bản mô hình cũ (`gemini-2.5-flash`); nên chuyển sang bản hiện hành để trả lời nhanh và tốt hơn.

## Việc sẽ làm

### A. Sửa độ trễ khi gõ
1. Tách ô nhập + nút gửi/mic/đính kèm thành một thành phần riêng giữ chữ đang gõ trong chính nó, chỉ báo lên khung chat khi bấm gửi.
2. Tách danh sách tin nhắn thành thành phần riêng, mỗi bong bóng được ghi nhớ theo nội dung nên không dựng lại markdown khi không thay đổi.
3. Tính sẵn phần nhận dạng nút "làm test đầu vào" một lần cho mỗi tin nhắn thay vì mỗi lần vẽ.

### B. Sửa giật khi đang nhận câu trả lời
4. Gom các chữ về theo từng nhịp khung hình (khoảng 60ms) thay vì cập nhật từng chữ.
5. Lưu lịch sử có tiết chế (không ghi ở mỗi chữ; ghi khi kết thúc lượt hoặc mỗi ~1s), và sửa phụ thuộc của hiệu ứng lưu để không chạy thừa.
6. Cuộn tức thời (không mượt) trong lúc đang nhận chữ, và chỉ cuộn khi người dùng đang ở gần cuối; giữ cuộn mượt khi kết thúc lượt.

### C. Chất lượng nội dung và sư phạm
7. Chỉnh bộ lọc từ ngữ: so khớp theo biên từ, loại bỏ từ dễ nhầm, thêm một lần nhắc nhở trước khi khóa.
8. Câu hỏi gợi ý mở đầu theo hai ngôn ngữ và theo môn (Anh, Trung, Nhật, Phần Lan, Thụy Điển, lập trình).
9. Cập nhật mô hình trợ lý lên bản hiện hành, giữ nguyên cách trả lời theo từng chữ và cách xử lý ảnh/tệp.
10. Sửa các điểm nhỏ: dọn bộ đếm thời gian và nhận dạng giọng nói khi đóng khung chat, giữ con trỏ trong ô nhập sau khi gửi, và thông báo lỗi hai thứ tiếng khi hết lượt hoặc quá tải.

### D. Kiểm tra trước khi báo xong
- Kiểm tra kiểu dữ liệu.
- Mở thử trên máy tính và điện thoại: gõ nhanh 200 ký tự với lịch sử hơn 40 tin nhắn, đo độ trễ; gửi một câu hỏi thật và xem chữ chạy có mượt.
- Thử vài câu hỏi hợp lệ có chứa từ dễ bị chặn oan để chắc chắn không bị khóa.

## Ghi chú kỹ thuật
- Không thay đổi cấu trúc dữ liệu lịch sử chat, khóa bộ nhớ trình duyệt, bảng `chatbot_conversations`, hay đường dẫn Edge Function `chat`; chỉ tách thành phần, ghi nhớ kết quả dựng và tiết chế cập nhật.
- Tệp chạm tới: `src/components/ChatBot.tsx` (tách ra thêm `ChatComposer.tsx`, `ChatMessageList.tsx`), `src/hooks/useChatHistory.ts` (tiết chế ghi), `supabase/functions/chat/index.ts` (chỉ đổi tên mô hình).

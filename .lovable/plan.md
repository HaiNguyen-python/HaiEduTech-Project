# Chatbot: khách chưa đăng nhập chỉ được tư vấn khóa học

## Mục tiêu

Khi khách **chưa đăng nhập**, trợ lý Mr. Hai chỉ làm một việc: giới thiệu và tư vấn các khóa học, lịch học, học phí, lộ trình và các tính năng có trên trang, rồi mời khách đăng nhập/đăng ký.

Khi khách **đã đăng nhập**, trợ lý hoạt động đầy đủ như hiện nay (giải bài, chữa lỗi, dịch, phân tích ảnh, ghi nhớ dài hạn, gợi ý theo tiến độ).

## Khách chưa đăng nhập được gì

Được trả lời:
- Trang có những khóa nào (Tiếng Anh, IELTS, TOEIC, Cambridge, SAT, PTE, THPT, Tiếng Trung/HSK, Tiếng Phần Lan/YKI, Tiếng Nhật, Tiếng Việt, Lập trình).
- Khóa nào phù hợp với mục tiêu và trình độ mô tả sơ bộ, lộ trình học gợi ý, thời lượng.
- Học phí, lịch khai giảng, cách đăng ký, cách liên hệ thầy Hải.
- Giới thiệu các tính năng/mục trên trang và đường dẫn tới chúng.
- Thông tin về thầy Hải và HaiEduTech.

Không trả lời (lịch sự từ chối 1-2 câu rồi mời đăng nhập):
- Giải bài tập, chữa bài viết, chấm điểm, dịch đoạn văn, giải thích ngữ pháp/từ vựng chuyên sâu, viết code, phân tích ảnh/tệp.
- Mọi câu hỏi liên quan tiến độ cá nhân.

Câu từ chối mẫu (song ngữ, kèm nút mời đăng nhập): "Phần này thầy hướng dẫn riêng cho học viên đã đăng nhập. Em đăng nhập hoặc tạo tài khoản miễn phí để thầy giảng chi tiết nhé - còn bây giờ thầy tư vấn khóa học phù hợp trước."

## Thay đổi trên giao diện chatbot

- Câu chào và các gợi ý bấm nhanh cho khách đổi thành nhóm tư vấn: "Trang có những khóa nào?", "Khóa nào phù hợp với em?", "Học phí và lịch học", "Cách đăng ký".
- Ẩn nút gắn tệp/ảnh khi chưa đăng nhập (kèm chú thích ngắn khi bấm vào ô nhập: cần đăng nhập để gửi ảnh/tệp).
- Thêm một thanh nhỏ trên khung chat cho khách: "Đang ở chế độ tư vấn khóa học" + 2 nút **Đăng nhập** / **Tạo tài khoản**, trỏ tới `/login?next=<trang hiện tại>`.
- Không ghi nhớ dài hạn, không lưu hội thoại, không gọi dữ liệu tiến độ cho khách (như hiện nay).

## Chi tiết kỹ thuật

1. `src/components/ChatBot.tsx`
   - Theo dõi phiên đăng nhập (`getSession` + `onAuthStateChange`) thành state `isAuthed`.
   - Gửi `Authorization: Bearer <access_token>` thật khi đã đăng nhập (hiện luôn gửi publishable key), để backend xác thực được danh tính; khách vẫn gửi publishable key.
   - Gửi thêm cờ `guestMode: !isAuthed` trong body (chỉ là gợi ý; backend tự quyết định theo token).
   - Ẩn nút đính kèm, đổi bộ gợi ý nhanh, thêm thanh mời đăng nhập, bỏ `studentContext` và phần ghi nhớ khi là khách.

2. `supabase/functions/chat/index.ts`
   - Xác thực token: nếu `getClaims` trả về user hợp lệ → `isAuthed = true`; ngược lại (kể cả khi chỉ có publishable key) → chế độ khách. Quyết định dựa vào token đã xác thực, không dựa vào cờ từ client.
   - Chế độ khách: thay khối hướng dẫn hệ thống bằng `guestAdvisorPrompt` - phạm vi chỉ gồm tư vấn khóa học/tính năng/học phí/đăng ký, danh sách khóa và đường dẫn lấy từ `platformFeaturesMap` đang có, kèm quy tắc từ chối câu chuyên sâu bằng đúng một câu ngắn + lời mời đăng nhập, giữ nguyên quy tắc ngôn ngữ (trả lời đúng ngôn ngữ của khách) và không phát token `[[REMEMBER:...]]`.
   - Chế độ khách: bỏ qua nhánh xử lý ảnh (trả về lời mời đăng nhập dạng stream/JSON thay vì gọi mô hình vision), bỏ khối `virtualTwinBlock` và khối cá nhân hóa.
   - Chế độ đã đăng nhập: đường đi hiện tại không đổi.
   - Giữ nguyên tên hàm, đường dẫn, kiểu dữ liệu body (chỉ thêm khóa tùy chọn), cách trả về SSE, nhà cung cấp AI hiện tại (Perplexity ưu tiên qua `_shared/ai-fallback.ts`) và ghi log dùng API.

3. Không thay đổi cơ sở dữ liệu, RLS, hay gói phụ thuộc.

## Kiểm tra

- Khách chưa đăng nhập: hỏi "trang có khóa nào?" → được tư vấn kèm liên kết; hỏi "dịch đoạn này" / "giải bài này" → nhận câu từ chối ngắn + lời mời đăng nhập; nút gắn tệp không hiện.
- Sau khi đăng nhập: cùng câu hỏi chuyên sâu được trả lời đầy đủ như trước, gửi ảnh vẫn phân tích được.
- Chạy kiểm tra kiểu dữ liệu và thử thật qua trình duyệt ở cả hai trạng thái, rồi triển khai lại hàm `chat`.

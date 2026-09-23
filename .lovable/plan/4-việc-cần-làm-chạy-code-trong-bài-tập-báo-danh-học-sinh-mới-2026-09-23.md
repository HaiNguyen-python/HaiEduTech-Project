# 4 việc cần làm: chạy code trong bài tập, báo danh học sinh mới, khung gõ code, chatbot biết trang

## 1. Chạy code ngay trong Practice Exercise
- Thêm nút "Chạy code" và một ô kết quả ngay dưới khung "Khung code của bạn".
- Bài Python chạy thẳng trong trình duyệt (dùng đúng bộ chạy Python đã có trong phần Programming, không cần cài gì thêm).
- Hiện kết quả in ra, hoặc thông báo lỗi rõ ràng kèm nút "Hỏi AI" giải thích lỗi (giống ô Python IDE đang có).
- Nút "Chạy lại", "Xoá kết quả"; khi đang tải bộ chạy thì hiện trạng thái "Đang tải Python...".
- Với bài không phải Python (SQL, markdown, giả mã...) thì không hiện nút chạy, giữ nguyên gợi ý và đáp án mẫu.
- Code vẫn tự lưu theo từng bài như hiện nay.

## 2. Báo danh học sinh mới trên trang admin
- Thêm một thẻ "Học sinh mới đăng ký" ở trang Tổng quan (Overview) của admin.
- Mỗi dòng: "Học sinh {tên} mới đăng ký trên trang HaiEduTech từ ngày {ngày}", kèm ảnh đại diện nếu có.
- Sắp xếp mới nhất trước, hiện 10 dòng gần nhất, có nút xem thêm.
- Dấu "mới" cho những em đăng ký trong 7 ngày qua, kèm số đếm "x em mới trong tuần".
- Nút mở nhanh sang tab Students để xem chi tiết từng em.

## 3. Khung Code Typing Race bị ngắt dòng
- Mỗi dòng code giữ đúng một dòng, không bị gập xuống; khung cuộn ngang khi dòng dài.
- Chuẩn hoá lại nội dung mẫu: bỏ dòng trống lạ và các đoạn bị nối vào nhau, ký hiệu đặc biệt (mũi tên, ≥) hiển thị dạng ASCII để gõ khớp 100%.
- Kiểm tra lại bằng thử gõ thật ở bài có đoạn code dài.

## 4. Chatbot biết học sinh đang ở trang nào
- Chatbot theo dõi trang hiện tại theo thời gian thực (kể cả khi đổi trang lúc đang mở chat), thay vì chỉ lấy lúc mở.
- Ngoài đường dẫn, gửi thêm tên trang/bài học dễ hiểu (ví dụ "IELTS Writing Practice", "Bài Python: Vòng lặp") để trả lời sát nội dung trang đó.
- Không thêm nút gợi ý; chỉ ngầm hiểu ngữ cảnh khi học sinh hỏi "phần này", "bài này".
- Khách chưa đăng nhập vẫn giữ giới hạn chỉ tư vấn khoá học như hiện tại.

## Chi tiết kỹ thuật
- `src/components/programming/ExerciseWorkspace.tsx`: dùng `ensurePyodideRuntime()` từ `src/components/python/PyodideRunner.tsx`, bắt stdout/stderr, gọi edge function `debug-python` cho nút Hỏi AI; chỉ bật khi `language` là python.
- Admin: component mới `src/components/admin/NewSignupsCard.tsx` đọc `profiles` (`id, full_name, avatar_url, created_at`) order by `created_at desc`, hiển thị trong `TabsContent value="overview"` của `src/pages/AdminDashboard.tsx`. Không đổi schema, không thêm bảng.
- `src/components/programming/CodeTypingRace.tsx`: thêm `min-w-max` cho từng dòng render, giữ `whitespace-pre` + `overflow-x-auto`; mở rộng chuẩn hoá snippet (bỏ dòng trống dư, tách dòng bị nối).
- `src/components/ChatBot.tsx`: dùng `useLocation` (hoặc listener history) để cập nhật `Current page` mỗi khi route đổi; map route -> nhãn trang dựa trên `src/lib/search/searchIndex.ts` và tiêu đề bài học đang mở. Không đổi edge function `chat`, không đổi cấu trúc lịch sử tin nhắn.
- Kiểm tra: typecheck + lint, chạy thử trên máy tính và điện thoại (chạy code Python trong bài tập, gõ Code Typing Race, mở chat ở 2 trang khác nhau, xem thẻ học sinh mới trong admin).

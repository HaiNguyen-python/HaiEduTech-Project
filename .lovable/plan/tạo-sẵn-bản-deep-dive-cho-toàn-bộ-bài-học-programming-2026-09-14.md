# Tạo sẵn bản Deep Dive cho toàn bộ bài học Programming

## Mục tiêu
Học viên mở bất kỳ bài học Programming nào cũng thấy ngay bản giảng sâu (Deep Dive) bằng tiếng Anh, không phải chờ AI tạo bài (~70 giây như hiện nay).

## Hiện trạng
- Có 97 module với 309 bài học dùng trang Programming Lesson.
- Trong kho lưu bản giảng sâu hiện có 240 bản đã tạo (thuộc 92 module); tất cả đều có nội dung đầy đủ.
- Bài chưa có bản sẵn sẽ được tạo ngay khi học viên mở bài, nên lần đầu phải chờ.

## Cách làm

### 1. Công cụ tạo trước (dành cho quản trị)
- Thêm một khu vực nhỏ trong trang quản trị: liệt kê tổng số bài học, số bài đã có bản Deep Dive, số bài còn thiếu.
- Nút "Tạo sẵn các bài còn thiếu": chạy tuần tự/2-3 bài song song, hiện tiến độ (đang làm bài nào, xong bao nhiêu, lỗi bao nhiêu), có thể dừng và chạy lại tiếp mà không tạo trùng.
- Nút "Tạo lại" cho từng bài khi cần làm mới nội dung.
- Chỉ giáo viên/quản trị thấy khu vực này.

### 2. Tự động giữ cho luôn đủ
- Thêm việc chạy tự động mỗi đêm: quét danh sách bài học, tạo bản Deep Dive cho những bài còn thiếu theo lô nhỏ để không đụng giới hạn AI.
- Bài học mới thêm vào chương trình sẽ tự được tạo bản Deep Dive trong đêm kế tiếp.

### 3. Giữ trải nghiệm mượt khi vẫn còn bài chưa kịp tạo
- Giữ nguyên cơ chế tạo ngay khi mở bài làm lớp dự phòng.
- Trong lúc chờ, thay dòng chờ đơn giản bằng khung nội dung mờ (skeleton) và vẫn cho đọc bản lý thuyết tiếng Anh đầy đủ ngay bên dưới, để không có cảm giác trống trang.

### 4. Kiểm tra
- Sau khi chạy tạo trước: số bài thiếu về 0.
- Mở thử ít nhất một bài của mỗi nhóm (Python, SQL, Data Engineering, ML, Cloud, NLP, Prompt Engineering, Startup, Cybersecurity, EdTech) trên máy tính và điện thoại: bản Deep Dive hiện ngay, nội dung tiếng Anh, hình và code đúng, quiz và nút bài tiếp theo vẫn chạy.
- Chạy audit Programming English, TypeScript, lint.

## Chi tiết kỹ thuật
- Danh sách bài học lấy từ `allProgrammingModules` (`src/data/programmingLessonData.ts`), gồm 309 bài.
- Trang quản trị: thêm component warmer gọi `enhance-programming-theory` với `module_id`, `lesson_id`, `lesson_title` (`titleEn`), `base_theory` (`theoryEn`); giới hạn đồng thời 2-3 request, retry 1 lần khi lỗi mạng, tôn trọng lỗi 429/402 (dừng lô, báo rõ lý do).
- Xác định bài thiếu bằng một truy vấn `programming_theory_cache` lấy cặp `module_id, lesson_id` đã có, đối chiếu với danh sách trong code (không thêm bảng mới).
- Cron đêm: một edge function mới `warm-programming-deep-dives` nhận danh sách bài cần tạo theo lô; để cron biết danh sách, lưu bảng liệt kê bài học tối giản (`module_id`, `lesson_id`, `lesson_title`, `base_theory`) được đồng bộ từ công cụ quản trị, kèm RLS chỉ đọc cho quản trị và GRANT tương ứng.
- Giữ nguyên route, lesson ID, tiến độ, XP, badge, quiz, `programming_theory_cache` schema và luồng `useEnhanced` mặc định true.

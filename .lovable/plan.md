# Bài học Programming: mặc định Deep Dive và hoàn toàn tiếng Anh

## Mục tiêu
- Mọi bài học trong khu vực Programming mở ra là đã ở chế độ Deep Dive (bản giảng sâu), không cần bấm nút.
- Toàn bộ nội dung bài học hiển thị bằng tiếng Anh, kể cả bản Deep Dive do AI viết.
- Giữ nguyên đường dẫn, ID bài học, tiến độ, XP, huy hiệu, quiz và cách chấm điểm.

## Hiện trạng
- Trang bài học Programming đang mở bằng bản lý thuyết gốc; bản Deep Dive chỉ được tải sẵn ở chế độ nền và chỉ hiện khi học viên tự bấm nút chuyển.
- Bản Deep Dive được sinh từ nội dung tiếng Anh của bài học, nhưng hướng dẫn cho AI chỉ bắt buộc tiếng Anh trong phần chú thích code, chưa bắt buộc tiếng Anh cho toàn bộ văn bản.

## Các bước thực hiện

### 1. Mặc định mở ở Deep Dive
- Khi vào bài học, nếu đã có bản Deep Dive lưu sẵn thì hiển thị ngay bản đó.
- Nếu chưa có, tự động tạo bản Deep Dive và tự chuyển sang khi xong, kèm trạng thái đang tải rõ ràng trong khung Theory.
- Nếu AI tạm thời không phản hồi, hiển thị bản lý thuyết gốc tiếng Anh và một dòng thông báo nhẹ, không để trang trống.
- Giữ lại nút chuyển đổi để học viên vẫn xem được bản gốc khi muốn; nhãn nút và thông báo bằng tiếng Anh.

### 2. Bảo đảm hoàn toàn tiếng Anh
- Bổ sung yêu cầu bắt buộc tiếng Anh cho toàn bộ đầu ra Deep Dive: tiêu đề mục, giải thích, bảng, chú thích hình, chú thích code.
- Nội dung hiển thị chỉ lấy từ nguồn tiếng Anh của bài học (tiêu đề, lý thuyết, phần mở rộng, bài tập, quiz).
- Rà soát các nhãn giao diện trong luồng đọc bài học và các thông báo còn tiếng Việt để chuyển sang tiếng Anh, giữ nguyên phần vỏ trang chủ/điều hướng.
- Bỏ qua bản Deep Dive đã lưu nếu phát hiện văn bản tiếng Việt và tạo lại bản mới bằng tiếng Anh.

### 3. Kiểm tra
- Chạy audit Programming English, TypeScript và lint.
- Mở thử ít nhất một bài của mỗi nhóm (Python, SQL, Data Engineering, ML, Cloud, NLP, Prompt Engineering, Startup, DSA, AI Academy) trên máy tính và điện thoại: bài mở ra ở Deep Dive, nội dung tiếng Anh, hình minh họa và code hiển thị đúng, quiz chấm điểm và nút bài tiếp theo vẫn hoạt động.
- Kiểm tra trường hợp AI lỗi để chắc chắn bài học vẫn đọc được.

## Chi tiết kỹ thuật
- `src/pages/ProgrammingLesson.tsx`: `useEnhanced` mặc định true; hiệu ứng tải theo bài đặt `autoSwitch: true` cho cả trường hợp thiếu cache; thêm trạng thái tải cho khối Theory và fallback rõ ràng khi edge function trả `fallback`.
- `supabase/functions/enhance-programming-theory/index.ts`: thêm rule "write all output in English" vào `SYSTEM_PROMPT`; thêm kiểm tra ký tự tiếng Việt trên markdown lấy từ cache/AI để tự làm mới.
- Không đổi route, `programming_theory_cache` schema, `finishGame`/XP, đáp án quiz; không thêm thư viện hay bảng mới.

# Bức tường kết quả học viên (Student Results Wall)

## Mục tiêu
Tăng sức thu hút và niềm tin cho thương hiệu HaiEduTech ngay trên trang chủ: khách truy cập lần đầu thấy kết quả học viên thật, có chứng chỉ xác minh được, thay vì các con số và lời khen mô phỏng. Tận dụng hệ thống chứng chỉ `/verify/:code` đã có sẵn.

## Hiện trạng đã xác nhận
- `src/components/SocialProof.tsx` (190 dòng) tồn tại nhưng **không được gắn vào trang nào**, và dữ liệu bên trong là dữ liệu mô phỏng (tên, điểm IELTS/HSK tự nghĩ ra).
- Trang chủ `src/pages/Index.tsx` có các mục: Hero, MonthlyTopStudents, LearningRoadmaps, ModernTechTools, SuccessMetrics, WorldVisitorMap — chưa có mục đánh giá học viên.
- Hệ thống chứng chỉ đã có: bảng `certificates`, dịch vụ tra cứu `src/lib/certificateService.ts`, trang công khai `/verify/:code`.

## Những gì sẽ xây

### 1. Bảng lưu kết quả học viên (Lovable Cloud)
- Bảng `testimonials`: tên (hoặc viết tắt), khóa học, điểm/kết quả (ví dụ "IELTS 7.5", "HSK 4"), nhận xét song ngữ Việt–Anh, ảnh đại diện (tùy chọn), mã chứng chỉ liên kết (tùy chọn), thứ tự hiển thị, bật/tắt.
- RLS: ai cũng đọc được các dòng đang bật; chỉ thầy Hải (vai trò teacher/admin) thêm, sửa, ẩn. Cấp quyền GRANT đầy đủ trong cùng migration.
- Ban đầu bảng trống — không dùng bất kỳ lời khen nào tự nghĩ ra. Thầy nhập nội dung thật trong Admin.

### 2. Mục "Kết quả học viên" trên trang chủ
- Chèn vào `src/pages/Index.tsx`, đặt sau mục Signature Features (SuccessMetrics) và trước bản đồ khách truy cập, dùng SectionDivider như các mục khác.
- Giao diện: băng chuyền thẻ kết quả (giữ phong cách glass, gradient xanh dương–xanh ngọc của thương hiệu, hoạt ảnh mượt, chuyển slider tự động).
- Mỗi thẻ: tên + chữ cái đầu (hoặc ảnh nếu có), kết quả nổi bật, nhận xét ngắn song ngữ.
- Nếu thẻ có mã chứng chỉ: hiện huy hiệu "Đã xác minh" bấm qua được tới trang `/verify/:code` — người xem tự kiểm tra chứng chỉ thật.
- Nếu chưa có nội dung thật nào: mục tự ẩn (không hiện khối rỗng).

### 3. Quản lý trong trang Admin
- Thêm một mục trong Admin để thầy nhập/xóa/bật tắt từng kết quả, nhập mã chứng chỉ để tự động gắn huy hiệu xác minh (hệ thống kiểm tra mã tồn tại trước khi gắn).
- Lưu ảnh đại diện nếu thầy tải lên.

## Chi tiết kỹ thuật
- Migration SQL mới: CREATE TABLE testimonials + GRANT + RLS (chính sách đọc công khai cho dòng `is_published`, ghi chỉ cho staff qua hàm kiểm tra vai trò hiện có).
- Component mới `src/components/results/StudentResultsWall.tsx` (thay thế SocialProof.tsx — xóa file cũ).
- Lấy dữ liệu qua Supabase client hiện có; cache nhẹ để trang chủ không chậm; mục được lazy-load như các section khác.
- Song ngữ theo LanguageContext hiện có; tuân thủ chuẩn responsive (mobile trước, chữ tối thiểu 16px) và không dùng ký tự gạch ngang dài trong nội dung.
- Heading trang chủ bổ sung: để Google thấy được mục này, phần tiêu đề và nhận xét được render dạng HTML thật (không chỉ ảnh).

## Sau khi hoàn thành
Thầy vào Admin nhập 3-5 kết quả thật (tên học viên hoặc tên viết tắt, điểm, nhận xét, mã chứng chỉ nếu có) — mục sẽ tự xuất hiện trên trang chủ và nguồn thu hút duyệt web không cần sửa mã nguồn lần nào nữa.

## Các hướng còn lại (làm sau, theo lượt chọn)
- Trang thương hiệu thầy Hải: hội tụ thành tích, gallery lớp học 18 ảnh, quote.
- Insights theo từ khóa tìm kiếm: IELTS, HSK, YKI bằng tiếng Việt.
- Hình ảnh thương hiệu: hero, OG image chia sẻ mạng xã hội, đồng bộ Welcome + trang chủ.

# Trung tâm soạn & đăng nội dung trong trang quản trị

Thêm một khu vực mới trong trang quản trị để thầy tự soạn, xem trước và đăng tải ba loại nội dung: bài giảng có cấu trúc, bài viết/blog, và tài liệu tải về. Mỗi nội dung có thể để công khai cho mọi khách truy cập hoặc chỉ cho học viên đã đăng nhập.

## Người dùng sẽ thấy gì

Một mục mới "Soạn nội dung" trong trang quản trị, gồm:

- **Danh sách nội dung**: bảng tất cả bài đã soạn, kèm loại, trạng thái (nháp / đã đăng), phạm vi xem (công khai / học viên), ngày cập nhật; có tìm kiếm, lọc theo loại và trạng thái; nút Sửa, Nhân bản, Xem trước, Đăng / Ẩn, Xoá.
- **Soạn bài viết/blog**: tiêu đề (Việt + Anh), mô tả ngắn, ảnh bìa tải từ máy, nội dung dạng văn bản có định dạng (in đậm, danh sách, tiêu đề, chèn ảnh, liên kết), thẻ chủ đề.
- **Soạn bài giảng có cấu trúc**: chọn môn và trình độ, rồi thêm từng khối: mục tiêu bài học, từ vựng, hội thoại, giải thích, bài tập, câu hỏi quiz (4 lựa chọn + đáp án + giải thích). Kéo thả để sắp thứ tự khối.
- **Tài liệu tải về**: tải tệp PDF/ảnh từ máy, đặt tên, mô tả, phạm vi xem.
- **Nút "Tạo nháp bằng AI"** trong cả bài viết và bài giảng: nhập chủ đề + trình độ + ngôn ngữ, AI sinh nháp song ngữ, thầy sửa lại rồi đăng.
- **Xem trước** đúng như học viên sẽ thấy, trước khi đăng.

Trang công khai đọc nội dung: một trang danh sách bài viết và trang chi tiết từng bài; bài giảng và tài liệu hiển thị trong thư viện học tập hiện có. Nội dung chỉ dành cho học viên sẽ yêu cầu đăng nhập.

## Chi tiết kỹ thuật

Cơ sở dữ liệu (bảng mới, không đụng bảng cũ):

- `content_items`: `id`, `created_by`, `kind` (`article` | `lesson` | `resource`), `title`, `title_en`, `slug` (duy nhất), `summary`, `summary_en`, `cover_url`, `body` (jsonb — HTML cho bài viết, mảng khối cho bài giảng, metadata tệp cho tài liệu), `subject`, `level`, `tags text[]`, `visibility` (`public` | `students`), `status` (`draft` | `published`), `published_at`, `created_at`, `updated_at` + trigger updated_at.
- `content_assets`: `id`, `content_id`, `created_by`, `storage_path`, `kind`, `file_name`, `size_bytes`, `created_at`.
- GRANT: `authenticated` CRUD, `service_role` ALL, `anon` chỉ SELECT.
- RLS: staff (`is_staff(auth.uid())`) toàn quyền; `anon`/`authenticated` chỉ đọc bản `published` (bản `students` chỉ cho `authenticated`).
- Xoá dữ liệu tài khoản: bổ sung dọn `content_assets` trong `delete_user_data`.

Lưu trữ tệp: bucket công khai `content-media` cho ảnh bìa/ảnh trong bài; bucket riêng tư `content-files` cho tài liệu tải về, phát tệp qua signed URL. RLS trên `storage.objects`: staff ghi/xoá, đọc theo bucket.

Frontend:

- `src/components/admin/content/ContentStudioTab.tsx` (danh sách + điều phối), `ArticleEditor.tsx`, `LessonBuilder.tsx`, `ResourceUploader.tsx`, `ContentPreview.tsx`, `MediaUploader.tsx`.
- `src/lib/contentStudio.ts`: kiểu dữ liệu, xác thực trước khi đăng (bắt buộc tiêu đề, nội dung, slug hợp lệ; quiz đủ 4 lựa chọn và đáp án hợp lệ), tạo slug, chuyển đổi bản ghi.
- Trình soạn thảo dùng tiptap (đã có trong dự án qua Student Notebook); làm sạch HTML bằng DOMPurify trước khi hiển thị.
- Tab mới trong `src/pages/AdminDashboard.tsx`, đồng bộ qua tham số URL như các tab hiện có.
- Trang công khai: `src/pages/Insights.tsx` (danh sách) và `src/pages/InsightPost.tsx` (chi tiết, có tiêu đề/mô tả và JSON-LD) đăng ký trong `src/App.tsx`; thêm liên kết trong Navbar. Bài giảng và tài liệu đã đăng hiển thị thêm trong `LessonLibraryContent` / `SmartResourcesContent`.

AI sinh nháp: hàm biên `generate-content-draft` dùng Perplexity `sonar-pro`, luân phiên đúng `user`/`assistant`, trả JSON có sửa lỗi JSON, sinh nháp song bản Việt–Anh theo đúng khung khối của bài giảng hoặc HTML sạch cho bài viết.

Nội dung song ngữ, chữ tối thiểu 16px trên mobile, không dùng em-dash trong phần lập trình, bảng có cuộn ngang. Kiểm tra: `bunx tsgo --noEmit`, audit hover contrast, và chạy thử đăng/xem trước/xem công khai trên desktop và mobile.

## Ngoài phạm vi

Không đổi các bảng và trang nội dung hiện có (`generated_lessons`, `learning_materials`, `knowledge_hub_posts`), không làm lịch đăng tự động, không phân quyền nhiều cấp biên tập.

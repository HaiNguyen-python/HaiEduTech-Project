# Trung tâm cấp chứng chỉ trong trang quản trị

Thêm một mục mới **Chứng chỉ** trong nhóm Vận hành của trang quản trị, để thầy tự tạo và cấp chứng chỉ cho từng học viên ở bất kỳ khóa học nào.

## Cách hoạt động

1. Thầy chọn học viên từ danh sách học viên hiện có (ô tìm theo tên, dùng đúng danh sách đã gộp trùng như các trang quản trị khác). Tên trên chứng chỉ tự điền theo hồ sơ và vẫn sửa được.
2. Thầy chọn loại chứng chỉ:
   - Business English
   - Academic English
   - Tiếng Việt cho người nước ngoài (chọn A1 / A2 / B1)
   - AI Academy
   - Khóa tự do: thầy tự nhập tên khóa (tiếng Việt + tiếng Anh) và mô tả thành tích ngắn
3. Thầy điền thêm: ngày cấp (mặc định hôm nay), điểm/kết quả (tùy chọn), ghi chú thành tích (tùy chọn).
4. Khung xem trước hiện ngay bản chứng chỉ đúng như học viên sẽ nhận: viền vàng, tiêu đề song ngữ, tên học viên, tên khóa, kết quả, ngày cấp, chữ ký Mr. Hai, mã chứng chỉ và mã QR xác thực.
5. Nút **Cấp chứng chỉ & tải PDF**: lưu hồ sơ vào hệ thống rồi xuất PDF ngang.

## Điều kiện và cảnh báo

Thầy **luôn** cấp được. Nếu hệ thống thấy học viên chưa đủ điều kiện (ví dụ chưa hoàn thành hết bài Business/Academic English hoặc điểm Readiness dưới 70), khung sẽ hiện một dòng cảnh báo màu vàng ghi rõ còn thiếu gì, nhưng không chặn nút cấp.

Lưu ý: điều kiện Business/Academic English và Tiếng Việt hiện được tính từ tiến độ lưu trên máy của học viên, nên khi thầy mở từ máy của thầy sẽ hiện "chưa xác minh được tiến độ trên thiết bị này" thay vì con số sai.

## Danh sách chứng chỉ đã cấp

Bên dưới biểu mẫu là bảng chứng chỉ đã cấp: học viên, khóa, cấp độ, ngày cấp, mã chứng chỉ, người cấp. Có tìm theo tên hoặc mã, tải lại PDF, và thu hồi (đánh dấu không còn hiệu lực) khi cần.

## Trang xác thực công khai

Mã QR trỏ tới `/verify/:code`. Trang này công khai, chỉ hiện: mã hợp lệ hay không, tên học viên, tên khóa, ngày cấp, trạng thái còn hiệu lực. Không hiện email hay dữ liệu cá nhân khác.

## Chi tiết kỹ thuật

- Migration mới: bảng `public.certificates`
  - `id uuid pk`, `code text unique not null`, `student_id uuid`, `student_name text not null`, `course_key text not null` (`business` | `academic` | `vff` | `ai-academy` | `custom`), `course_label_en text`, `course_label_vi text`, `level text`, `score numeric`, `max_score numeric`, `note text`, `issued_at date not null default current_date`, `issued_by uuid not null default auth.uid()`, `revoked_at timestamptz`, `metadata jsonb default '{}'`, `created_at timestamptz default now()`.
  - GRANT: `SELECT, INSERT, UPDATE ON public.certificates TO authenticated`; `GRANT SELECT ON public.certificates TO anon` (chỉ cho tra cứu theo mã, cột hiển thị giới hạn qua RPC); `GRANT ALL ... TO service_role`.
  - RLS bật. Policy: staff (`public.is_staff(auth.uid())`) đọc/tạo/cập nhật tất cả; học viên đọc chứng chỉ của chính mình (`student_id = auth.uid()`).
  - Xác thực công khai qua hàm `SECURITY DEFINER` `public.verify_certificate(_code text)` trả về chỉ các trường an toàn; không mở policy anon trực tiếp trên bảng.
  - Trigger `set_updated_at` không cần; chỉ thêm index trên `code` và `student_id`.
- Tách phần vẽ chứng chỉ hiện có thành component dùng lại `src/components/certificates/CertificateCanvas.tsx` (nhận track/course label, tên, điểm, ngày, mã, nhãn xem trước) và dùng lại trong `PurposeEnglishCertificate.tsx` để không có hai thiết kế lệch nhau. Giữ nguyên `VFFCertificate.tsx` và `GraduationCertificate.tsx` về hành vi, chỉ dùng chung logic mã chứng chỉ.
- `src/lib/certificateService.ts`: `issueCertificate()`, `listCertificates()`, `revokeCertificate()`, `buildCertificateCode(courseKey, name, issuedAt)` (tất định, tiền tố `HET-BUS/ACA/VFF/AI/CRT`).
- Component mới `src/components/admin/CertificatesTab.tsx`: chọn học viên (dùng `fetchAllProfiles` + `dedupeStudentProfiles`), biểu mẫu, xem trước, bảng đã cấp; xuất PDF bằng `html2canvas` + `jsPDF` theo đúng pattern hiện có.
- `AdminWorkspaceNav.tsx`: thêm item `certificates` (icon `Award`) vào nhóm `operations`; `AdminDashboard.tsx` thêm `TabsContent` tương ứng, giữ đồng bộ `?tab=`/`view`.
- Trang mới `src/pages/CertificateVerify.tsx` + route lazy `/verify/:code` trong `src/App.tsx`, thêm vào danh sách route công khai trong `src/lib/publicRoutes.ts` để không bị `AuthGate` chặn.
- Ghi hoạt động cấp chứng chỉ qua `logStudentActivity` như hiện tại; không đổi route, lesson ID, thứ tự mở khoá hay khóa lưu tiến độ nào.

## Kiểm tra trước khi hoàn tất

- Vitest cho `buildCertificateCode` (tất định, đúng tiền tố) và logic cảnh báo điều kiện.
- TypeScript + ESLint sạch.
- Playwright: mở mục Chứng chỉ trong trang quản trị ở desktop 1280px và mobile 390px, tạo thử một chứng chỉ khóa tự do, kiểm tra bảng đã cấp và trang `/verify/:code` khi chưa đăng nhập.

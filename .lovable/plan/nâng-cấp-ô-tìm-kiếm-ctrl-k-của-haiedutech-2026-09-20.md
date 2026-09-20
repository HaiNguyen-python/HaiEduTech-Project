# Nâng cấp ô tìm kiếm (Ctrl+K) của HaiEduTech

## Kết quả rà soát hiện tại

Ô tìm kiếm hiện chỉ là một danh sách tay gồm 30 mục, trong khi trang có 236 đường dẫn. Cụ thể các điểm chưa tối ưu:

1. **Thiếu rất nhiều mục.** Không tìm được: Lifestyle Academy, Your Corner, PTE, SAT, Swedish, Japanese, PhD/CV/Checklist/Cost Calculator của du học, Cambridge, National Exam, Speaking Coach, Notebook bài tập, Lesson Library, Placement Test, AI Academy, Startup, Songs, Arcade/Game Center, các lab tiếng Việt cho người nước ngoài... Người học gõ đúng tên mục vẫn không thấy gì.
2. **Không tìm được bài học.** Chỉ tìm được trang, không tìm được tên bài (ví dụ "thì hiện tại hoàn thành", "IELTS Task 1", "HSK 3").
3. **Không bỏ dấu tiếng Việt.** Gõ "tu vung" hoặc "nguphap" không ra kết quả vì bộ lọc so khớp nguyên văn có dấu.
4. **Chỉ có nhóm cố định, không ưu tiên.** Khi rỗng không có gợi ý gì; không có mục vừa xem, không có mục phổ biến.
5. **Không có bàn phím gợi ý trên di động** và không thấy nút tìm kiếm rõ ràng khi mở menu mobile.
6. **Không lọc theo quyền.** Mục quản trị hiện ra với mọi người; khách chưa đăng nhập vẫn thấy mục cần đăng nhập mà không có ghi chú.

## Sẽ làm

### 1. Bộ chỉ mục đầy đủ, sinh từ một nguồn duy nhất
- Tạo danh mục tìm kiếm mới gom toàn bộ trang thật của web, chia nhóm: Du học, Tiếng Anh, Tiếng Trung, Tiếng Việt, Tiếng Phần Lan / Thụy Điển / Nhật, Lập trình & AI, Luyện thi (IELTS/TOEIC/PTE/SAT/Cambridge/THPT), Từ vựng & Game, Lifestyle & Cộng đồng, Cá nhân (Dashboard, Sổ tay, Tiến độ), Quản trị.
- Mỗi mục có nhãn song ngữ + từ khóa phụ (cả dạng không dấu và viết tắt: "npa", "tv", "hsk", "yki", "thpt").

### 2. Tìm được cả bài học
- Thêm lớp tìm bài học: tên module/bài của Ngữ pháp tiếng Anh, IELTS lectures, HSK, tiếng Việt, Business/Academic English, Python challenges. Nạp chậm (chỉ khi người dùng gõ từ 2 ký tự) để không làm nặng trang.
- Kết quả bài học hiện dưới nhóm riêng, kèm tên khóa mẹ để dễ nhận.

### 3. So khớp thông minh
- Bỏ dấu tiếng Việt và chữ Hán/pinyin khi so khớp; cho phép gõ thiếu dấu, gõ hoa/thường tùy ý.
- Xếp hạng: trùng đầu nhãn > trùng trong nhãn > trùng từ khóa; giới hạn số kết quả mỗi nhóm để danh sách không quá dài.

### 4. Trải nghiệm
- Khi ô còn trống: hiện "Vừa xem" (5 trang gần nhất) và "Truy cập nhanh" (Bảng điều khiển, Sổ tay, Từ vựng IELTS, Lộ trình của tôi...).
- Thêm gợi ý phím tắt, nút xóa nhanh, thông báo rõ khi không có kết quả kèm 3 gợi ý gần nghĩa.
- Thêm nút tìm kiếm trong menu di động.

### 5. Quyền truy cập
- Ẩn nhóm Quản trị với người không phải giáo viên/quản trị.
- Với khách chưa đăng nhập, mục cần đăng nhập vẫn hiện nhưng có nhãn nhỏ "cần đăng nhập" và dẫn qua trang đăng nhập rồi trả về đúng trang đó.

## Không thay đổi
Đường dẫn, ID bài học, tiến độ đã lưu, backend, và giao diện các trang khác đều giữ nguyên. Đây là thay đổi giao diện + dữ liệu chỉ mục ở phía trình duyệt.

## Chi tiết kỹ thuật
- `src/lib/search/searchIndex.ts` (mới): danh mục route tĩnh + hàm `normalize()` bỏ dấu (NFD + strip combining, đ→d), hàm `rankEntries()`.
- `src/lib/search/lessonIndex.ts` (mới): gom tên bài từ các file curriculum hiện có, export lazy qua `import()` động.
- `src/components/GlobalSearch.tsx`: dùng `<Command shouldFilter={false}>` và tự lọc/xếp hạng; thêm nhóm "Vừa xem" lưu ở `localStorage` key `haiedu_recent_pages`; lọc nhóm admin qua `useUserRole`; nhãn cần đăng nhập qua `publicRoutes.ts` + `useAuth`.
- `src/components/Navbar.tsx`: thêm `GlobalSearch variant="button"` vào menu mobile.
- Kiểm tra: `bunx tsgo --noEmit -p tsconfig.app.json`, ESLint các file sửa, Playwright ở 1280 và 390 (gõ "tu vung", "nguphap", "phd", "sổ tay" đều có kết quả; nhóm admin ẩn với học sinh).

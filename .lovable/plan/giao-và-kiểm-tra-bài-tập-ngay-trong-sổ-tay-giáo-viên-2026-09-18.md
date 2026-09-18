# Giao và kiểm tra bài tập ngay trong sổ tay giáo viên

## Hiện trạng đã kiểm tra

- Sổ tay nổi đã có 4 mục: Ghi chú, Bảng vẽ, Được chia sẻ, Bài tập. Mục Bài tập hiện **chỉ dành cho học viên**: hiện danh sách bài được giao cho chính mình và ô tick hoàn thành (lưu vào `student_submissions`, cập nhật tức thời).
- Việc tạo lớp, thêm học viên vào lớp và giao bài hiện chỉ có ở hai trang admin riêng (`/admin/classes`, `/admin/assignments`) - phải rời sổ tay mới làm được.
- Thống kê ai đã làm bài hiện nằm trong trang admin, không xem được từ sổ tay.
- Hệ thống đã phân biệt vai trò giáo viên/học viên qua `useUserRole`.

## Sẽ làm

Trong mục **Bài tập** của sổ tay, nếu người đăng nhập là giáo viên thì hiện thêm hai chế độ chuyển nhanh ở đầu mục:

- **Giao bài** (mặc định cho giáo viên)
- **Bài của tôi** (chính là danh sách tick như hiện tại, giữ nguyên)

Học viên vẫn chỉ thấy đúng danh sách tick như bây giờ, không thay đổi gì.

### 1. Lớp học ngay trong sổ tay

- Danh sách lớp gọn, mỗi lớp hiện tên, môn và số học viên.
- Nút **Tạo lớp mới**: nhập tên lớp + chọn môn, lưu ngay.
- Bấm vào một lớp để **thêm/bớt học viên**: ô tìm theo tên, tick để chọn, lưu và kiểm tra kết quả lưu thật (lỗi thì báo rõ, tải lại từ hệ thống).

### 2. Giao bài ngay trong sổ tay

- Biểu mẫu gọn theo chiều dọc cho khung sổ tay hẹp: chọn môn, chọn bài học từ thư viện có sẵn (hoặc tự nhập tên bài), trình độ, hạn chót.
- Chọn **cả lớp** (tự tick toàn bộ thành viên) hoặc chọn từng học viên; vẫn thêm/bớt được sau khi chọn lớp.
- Cảnh báo rõ khi lớp trống hoặc chưa chọn ai.
- Sau khi giao: tạo bài, tạo dòng tiến độ cho từng học viên và gửi thông báo chuông - đúng như quy trình ở trang admin (nếu tạo dòng tiến độ lỗi thì bài được xoá lại, không để nửa vời).

### 3. Kiểm tra bài đã làm ngay trong sổ tay

- Danh sách bài đã giao gần đây, mỗi dòng hiện: tên bài, môn, hạn chót, thanh tiến độ "đã làm x/y", nhãn Quá hạn khi trễ.
- Mở một bài để xem **ai đã tick, ai chưa** (hai nhóm tên rõ ràng, kèm thời điểm hoàn thành).
- Tự cập nhật khi học viên tick, không cần tải lại.
- Nút xoá bài tập (có xác nhận).

### 4. Phía học viên

- Giữ nguyên hoàn toàn: nhận bài trong mục Bài tập, tick để đánh dấu hoàn thành, dấu đếm bài chưa làm trên tab, cập nhật tức thời.

## Ghi chú kỹ thuật

- Không tạo bảng mới, không sửa cấu trúc dữ liệu. Dùng đúng `classes`, `class_members`, `assignments`, `student_submissions`, `assignment_notifications` như hiện tại.
- Tách logic ghi dữ liệu đang nằm trong `AdminAssignments.tsx` / `AdminClasses.tsx` sang `src/lib/teacherAssignmentActions.ts` (tạo lớp, cập nhật thành viên, giao bài kèm dòng tiến độ + thông báo, xoá bài) và dùng chung cho cả trang admin và sổ tay - một nguồn logic duy nhất, không copy.
- Tệp mới: `src/components/notebook/NotebookTeacherAssignments.tsx` (chế độ giao bài + lớp + theo dõi), có thể tách nhỏ dialog tạo lớp / chọn thành viên trong cùng thư mục.
- Sửa: `src/components/notebook/NotebookAssignments.tsx` (thêm thanh chuyển chế độ khi là giáo viên, phần tick giữ nguyên), `src/pages/AdminAssignments.tsx` + `src/pages/AdminClasses.tsx` (gọi sang lib dùng chung, giao diện không đổi).
- Giữ realtime hiện có trên `assignments` và `student_submissions`; huỷ kênh khi đóng sổ tay.
- Giao diện vừa khung sổ tay: một cột, chữ tối thiểu 14-16px, không tràn ngang, mọi nút có nhãn trợ năng; dùng token màu hiện có (Royal Blue / Emerald).

## Kiểm tra trước khi hoàn tất

- Tạo lớp thử trong sổ tay, thêm học viên, giao một bài cho cả lớp: xác nhận học viên nhận thông báo + thấy bài trong sổ tay của họ.
- Tick từ tài khoản học viên, xác nhận sổ tay giáo viên và trang admin đổi theo mà không tải lại.
- Thử lỗi mạng khi lưu để chắc chắn không hiện trạng thái giả.
- Kiểm tra trên máy tính và điện thoại; chạy kiểm tra TypeScript, lint và kiểm thử tự động.

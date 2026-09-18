# Đổi tên lớp + rà soát lại phần Bài tập

## Hiện trạng đã kiểm tra

- Chưa có chỗ nào đổi được tên lớp: cả sổ tay và trang `/admin/classes` chỉ có tạo lớp, sửa thành viên, xoá lớp.
- Quyền trên hệ thống đã cho phép giáo viên/admin sửa lớp, nên chỉ cần thêm phần giao diện và một hàm lưu - không cần đổi cấu trúc dữ liệu.
- Trong sổ tay (mục Lớp học) hiện **không có** nút xoá lớp, trong khi trang admin có - hai nơi lệch nhau.
- Trang `/admin/classes` vẫn tự viết lệnh lưu riêng (tạo lớp, thêm/bớt thành viên, xoá lớp) thay vì dùng bộ hàm chung `teacherAssignmentActions` mà sổ tay đang dùng, nên hai nơi dễ trôi khác nhau về sau.
- Bài tập lưu **tên lớp dạng chữ** tại thời điểm giao, không phải mã lớp. Hiện có 4 lớp và chưa có bài tập nào gắn tên lớp, nên đổi tên bây giờ là an toàn; vẫn nên cập nhật kèm các bài cũ để về sau không lệch.

## Sẽ làm

### 1. Đổi tên lớp

- Trong sổ tay, mục **Lớp học**: mỗi lớp có nút bút chì "Đổi tên". Bấm vào là ô nhập hiện ngay tại dòng đó, sửa tên và đổi được cả môn, bấm Lưu hoặc Huỷ.
- Trên trang `/admin/classes`: thêm nút "Rename" cạnh nút sửa thành viên, mở hộp thoại nhỏ gồm tên lớp + môn.
- Kiểm tra trước khi lưu: tên trống thì báo lỗi rõ; tên trùng với lớp khác thì cảnh báo và không lưu.
- Khi đổi tên thành công: các bài tập đã giao cho lớp đó được cập nhật theo tên mới, để phần Theo dõi không hiện tên cũ.
- Lỗi lưu thì báo rõ bằng thông báo đỏ và tải lại danh sách từ hệ thống, không hiện trạng thái giả.

### 2. Rà soát và đồng bộ phần Bài tập

- Thêm nút **xoá lớp** (có xác nhận) trong sổ tay cho khớp trang admin.
- Trang `/admin/classes` chuyển sang dùng đúng bộ hàm chung với sổ tay: tạo lớp, đổi tên, thêm/bớt thành viên, xoá lớp. Giao diện trang admin giữ nguyên.
- Mục **Giao bài**: khi lớp vừa được đổi tên, danh sách chọn lớp và tên lớp đính vào bài mới dùng tên mới ngay.
- Mục **Theo dõi**: giữ nguyên cách tính "đã làm x/y", danh sách ai đã tick / chưa tick, hạn chót, nhãn Quá hạn, nút xoá bài.
- Phía học viên: không đổi gì - vẫn nhận bài, tick hoàn thành, dấu đếm bài chưa làm trên tab, cập nhật tức thời.

## Ghi chú kỹ thuật

- Không tạo bảng mới, không sửa cấu trúc dữ liệu, không thêm migration. Dùng đúng `classes`, `class_members`, `assignments`, `student_submissions`, `assignment_notifications`.
- `src/lib/teacherAssignmentActions.ts`: thêm `renameClass(classId, { className, subject, previousName })` - cập nhật `classes`, rồi cập nhật `assignments.target_class` từ tên cũ sang tên mới; trả về số bài đã cập nhật; kiểm tra trùng tên trước khi ghi.
- `src/components/notebook/NotebookTeacherAssignments.tsx`: `ClassesPanel` thêm chế độ đổi tên tại dòng (state `renamingId`) và nút xoá lớp dùng `deleteClass`.
- `src/pages/AdminClasses.tsx`: thay `handleCreate`/`handleDelete`/`EditMembersDialog` bằng các hàm trong lib chung, thêm `RenameClassDialog`.
- Giao diện vừa khung sổ tay: một cột, chữ tối thiểu 14px, không tràn ngang, mọi nút có nhãn trợ năng, dùng token màu Royal Blue / Emerald hiện có.

## Kiểm tra trước khi hoàn tất

- Đổi tên một lớp trong sổ tay, xác nhận tên mới hiện ở mục Giao bài, Theo dõi và trên trang `/admin/classes`.
- Thử tên trống và tên trùng để chắc chắn bị chặn kèm thông báo rõ.
- Giao một bài cho lớp vừa đổi tên, tick từ tài khoản học viên, xác nhận sổ tay giáo viên cập nhật không cần tải lại.
- Kiểm tra trên máy tính và điện thoại; chạy kiểm tra TypeScript, lint và kiểm thử tự động.

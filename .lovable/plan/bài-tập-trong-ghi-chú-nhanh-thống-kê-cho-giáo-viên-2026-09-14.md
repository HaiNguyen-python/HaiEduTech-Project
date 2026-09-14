# Bài tập trong Ghi chú nhanh + thống kê cho giáo viên

## Hiện trạng đã kiểm tra

- Trang giao bài của giáo viên (`/admin/assignments`) hoạt động: tạo bài, chọn lớp hoặc từng học viên, tự tạo một dòng tiến độ "assigned" cho mỗi học viên, gửi thông báo chuông và có cảnh báo rõ khi gửi thiếu. Nếu tạo dòng tiến độ lỗi thì bài tập được xoá lại - không để nửa vời.
- Quản lý lớp (`/admin/classes`) có lớp, thành viên lớp; chọn lớp trống sẽ được cảnh báo.
- Học viên hiện **chưa có nơi để tự tick "đã làm"**. Bảng tiến độ đã có sẵn quyền cho học viên tự cập nhật dòng của mình, nhưng trong ứng dụng chỉ có cửa sổ nhắc bài khi đăng nhập, không có danh sách tick.
- Sổ tay nổi (Ghi chú nhanh) hiện có 3 mục: Ghi chú, Bảng vẽ, Được chia sẻ. Chưa có mục Bài tập.
- Chuông thông báo đã cập nhật tức thời khi có bài mới nhưng chưa có hiệu ứng lắc.
- Bảng tiến độ bài tập chưa bật cập nhật tức thời, nên bảng của giáo viên chưa tự đổi khi học viên tick.

## Sẽ làm

### 1. Mục "Bài tập" trong Ghi chú nhanh (học viên)

- Thêm một mục thứ tư tên **Bài tập** cạnh Ghi chú / Bảng vẽ / Được chia sẻ, có dấu đếm số bài chưa làm.
- Danh sách bài tập được giao cho chính học viên đó, mỗi dòng là một ô tick:
  - Tick vào ô = đã làm; bỏ tick = quay lại chưa làm.
  - Hiển thị tên bài, môn, hạn chót, nhãn "Quá hạn" khi trễ, và liên kết mở bài học nếu bài có đường dẫn.
  - Sắp xếp: chưa làm và gần hạn lên trước; bài đã làm gom xuống dưới.
  - Thanh tiến độ nhỏ "đã làm x/y bài".
- Tick lưu ngay lên hệ thống (kèm thời điểm hoàn thành). Nếu lưu lỗi thì ô tick trả về trạng thái cũ và báo lỗi rõ ràng, không hiện tick giả.
- Khi có bài mới, mục này tự cập nhật không cần tải lại trang.
- Người chưa đăng nhập hoặc không có bài sẽ thấy dòng trạng thái nhẹ nhàng thay vì ô trống.

### 2. Chuông lắc nhẹ

- Khi còn thông báo chưa đọc, chuông lắc nhẹ theo nhịp (khoảng 4 giây một lần), kèm dấu đỏ như hiện tại.
- Khi có thông báo mới đến, chuông lắc mạnh hơn một nhịp ngắn để gây chú ý.
- Ngừng lắc khi đã đọc hết; tôn trọng thiết lập "giảm hiệu ứng chuyển động" của thiết bị.

### 3. Thống kê cho giáo viên

- Trong trang giao bài, thêm khu **Thống kê hoàn thành** bằng biểu đồ:
  - Cột: tỉ lệ hoàn thành theo từng bài tập gần đây.
  - Cột ngang: xếp hạng học viên theo số bài đã làm / được giao.
  - Vòng tròn: tổng quan đã làm - chưa làm - quá hạn.
- Bảng chi tiết mỗi bài đã có cột tiến độ; bổ sung danh sách tên học viên đã tick và chưa tick trong ô chi tiết.
- Bảng của giáo viên tự cập nhật khi học viên tick, không cần bấm tải lại.
- Rà soát và siết lại phần quản lý lớp: hiện số thành viên cạnh tên lớp, kiểm tra kết quả khi lưu thành viên và tải lại từ hệ thống sau khi lưu.

## Ghi chú kỹ thuật

- Không tạo bảng mới. Dùng `student_submissions` (`status` `assigned`/`completed`, `submitted_at`) làm nguồn duy nhất cho ô tick và cho thống kê; chính sách RLS hiện có đã cho phép học viên cập nhật đúng dòng của mình.
- Nếu một học viên được giao bài nhưng thiếu dòng tiến độ (dữ liệu cũ), phần Bài tập tự tạo dòng đó khi tick lần đầu (upsert theo `assignment_id` + `student_id`); thêm ràng buộc duy nhất cho cặp này để không sinh dòng trùng.
- Bật cập nhật tức thời cho `assignments` và `student_submissions` (thêm vào publication realtime); đăng ký kênh trong `useEffect` và huỷ kênh khi rời trang.
- Tệp mới: `src/components/notebook/NotebookAssignments.tsx` (danh sách tick), `src/lib/assignmentTracking.ts` (đọc bài của học viên + đổi trạng thái), `src/components/admin/AssignmentCompletionCharts.tsx` (Recharts).
- Sửa: `src/components/FloatingNotebook.tsx` (thêm mục), `src/components/NotificationBell.tsx` (hiệu ứng lắc bằng Framer Motion), `src/pages/AdminAssignments.tsx` (biểu đồ + realtime + chi tiết ai đã tick), `src/pages/AdminClasses.tsx` (số thành viên + kiểm tra lưu), `src/lib/assignmentMetrics.ts` (số liệu theo học viên).
- Giữ nguyên đường dẫn, cách giao bài, thông báo chuông hiện tại, dữ liệu tiến độ và các mục khác của sổ tay.

## Kiểm tra trước khi hoàn tất

- Giao một bài thử cho tài khoản học viên, xác nhận: chuông lắc và có thông báo, mục Bài tập hiện bài, tick lưu được, tải lại trang vẫn giữ tick, bảng giáo viên và biểu đồ đổi theo.
- Thử lỗi mạng khi tick để chắc chắn ô tick không hiện sai trạng thái.
- Kiểm tra trên máy tính và điện thoại: không tràn ngang, sổ tay vẫn nằm trong khung nhìn, mọi nút có nhãn trợ năng.
- Chạy kiểm tra TypeScript, lint và kiểm thử tự động.

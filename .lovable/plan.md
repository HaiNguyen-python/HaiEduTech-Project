# Lớp học 3D trực quan trong Admin Dashboard

Một "phòng học 3D" tương tác ngay trong Admin Dashboard: mỗi học sinh là một avatar ngồi tại bàn, màu sắc và hiệu ứng cho biết ngay em nào cần chú ý, em nào đang tiến bộ. Bấm vào một avatar để xem chi tiết và hành động nhanh.

## Vị trí
Tab **Overview** (mục con "Overview"), đặt ngay dưới 4 thẻ số liệu và dải cảnh báo can thiệp, phía trên biểu đồ Activity Distribution. Card có thể thu/mở và có nút mở toàn màn hình.

## Quy ước màu (dựa trên dữ liệu đã có)
Dùng lại `StudentState` hiện có (avgScore, totalActivities, recentTrend) cộng `lastActivityByUser`:

- Đỏ - Cần chú ý: đủ điều kiện `interventionNeeded` (điểm < 5 với >= 3 hoạt động, hoặc xu hướng giảm, hoặc không hoạt động lâu). Avatar nhấp nháy nhẹ + vòng cảnh báo dưới chân.
- Xanh lá - Tiến bộ: `recentTrend === "improving"`. Có hạt sáng bay lên nhẹ.
- Xanh dương - Ổn định/tốt: điểm >= 7, xu hướng ổn định.
- Vàng - Trung bình: điểm 5 - 7, hoạt động thưa.
- Xám mờ - Chưa hoạt động (0 hoạt động hoặc ngủ đông > 14 ngày), avatar hơi trong suốt.

Chiều cao avatar tỉ lệ với số hoạt động; vòng sáng dưới chân tỉ lệ với điểm trung bình. Học sinh đang online trong tuần có vòng nhịp đập.

## Bố cục phòng học
- Sàn phòng có lưới nhẹ, bảng trắng ở cuối phòng ghi Class Average và số học sinh cần chú ý.
- Bàn học xếp thành hàng/cột tự động theo số học sinh (grid tự cân, tối đa hiển thị 80+ vẫn mượt).
- Sắp xếp ưu tiên: học sinh cần chú ý đứng ở hàng đầu, gần bảng, để mắt nhìn thấy trước.
- Camera quay/zoom bằng chuột (OrbitControls), có 3 preset: Toàn lớp / Nhìn từ trên / Hàng cần chú ý.

## Tương tác quản lý lớp
- Hover: tooltip nổi tên, điểm, số hoạt động, xu hướng, lần học cuối.
- Click: mở panel bên phải với domain breakdown (dùng lại dữ liệu `selectedStudent`) và các nút hành động sẵn có (chọn học sinh này ở bảng Students, xuất Learning DNA).
- Bộ lọc chip theo màu (Cần chú ý / Tiến bộ / Ổn định / Trung bình / Chưa hoạt động) - ẩn hoặc làm mờ nhóm không chọn.
- Ô tìm theo tên (dùng `normalizeForSearch`) sẽ làm sáng và tự xoay camera tới avatar đó.
- Chú giải màu rõ ràng bằng 2 ngôn ngữ (VI/EN theo `useLanguage`).

## Hiệu năng và dự phòng
- Instanced rendering cho thân avatar và bàn, chỉ render nhãn chữ cho học sinh đang hover/được chọn/được lọc (tránh 80 nhãn HTML cùng lúc).
- Lazy load toàn bộ component 3D, dpr giới hạn, tạm dừng render khi tab không hiển thị hoặc card bị thu.
- Trên mobile hoặc khi bật `prefers-reduced-motion`: tự chuyển sang chế độ tĩnh (grid 2D các ô màu cùng quy ước) để vẫn dùng được.

## Chi tiết kỹ thuật
- Component mới `src/components/admin/Classroom3D.tsx` (React Three Fiber + drei đã có trong dự án), lazy import trong `src/pages/AdminDashboard.tsx`.
- Logic phân loại tách riêng ở `src/lib/classroom3d.ts`: hàm `classifyStudent(state, lastActiveAt)` trả về tier + màu token, và `buildClassroomLayout(students)` trả về toạ độ bàn.
- Không thêm bảng hay truy vấn mới: nhận props `students: StudentState[]`, `lastActivityByUser`, `classStats` từ AdminDashboard đang tính sẵn.
- Màu lấy từ design token trong `index.css` (thêm biến `--cls-alert/--cls-progress/--cls-stable/--cls-average/--cls-idle` nếu cần) thay vì hardcode.
- Panel chi tiết tái dùng state `selectedStudent` hiện có để hai chiều đồng bộ với bảng Students.

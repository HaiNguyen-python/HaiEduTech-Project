# Click học sinh: hiện thông tin ngay trong Management Center

Hiện tại khi click vào một học sinh trong lớp học 3D, dashboard tự động nhảy sang tab "Students". Sẽ bỏ hành vi này và giữ người dùng ở lại lớp học, đồng thời làm panel thông tin bên phải chi tiết hơn.

## Thay đổi

1. Bỏ chuyển tab
   - Click avatar hoặc thẻ học sinh chỉ chọn học sinh, không đổi tab/nhóm tab nữa.
   - Camera vẫn bay tới học sinh được chọn như hiện tại.

2. Panel "Học sinh được chọn" chi tiết hơn
   - Tên, thứ hạng, trạng thái (tier) kèm màu.
   - Điểm trung bình, tổng số hoạt động, xu hướng gần đây (tiến bộ / ổn định / đi xuống).
   - Lần hoạt động cuối, có hoạt động trong tuần này hay không.
   - Nút "Xem chi tiết trong tab Students" cho ai vẫn muốn sang tab đó, và nút bỏ chọn.

3. Trạng thái chọn
   - Học sinh đang chọn được làm nổi bật rõ trong danh sách/marker để dễ đối chiếu với panel.

## Chi tiết kỹ thuật
- `src/pages/AdminDashboard.tsx`: `onSelectStudent` chỉ gọi `handleSelectStudent(s)`, bỏ `setTabGroup`/`setActiveTab`; truyền thêm callback tuỳ chọn để nút trong panel mới có thể chủ động sang tab Students.
- `src/components/admin/Classroom3D.tsx`: mở rộng khối `selectedSeat` trong Management Center (thêm trend, active-this-week, badge màu theo `TIER_META`, nút bỏ chọn/xem chi tiết). Không thay đổi logic dữ liệu, `buildClassroomLayout` hay xếp hạng.
- Chỉ sửa UI/presentation, không đổi truy vấn hay bảng dữ liệu.

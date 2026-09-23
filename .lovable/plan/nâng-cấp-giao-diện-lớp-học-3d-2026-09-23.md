# Nâng cấp giao diện Lớp học 3D

## Mục tiêu
Làm khối Lớp học 3D sinh động, nhiều màu và có chiều sâu hơn theo hướng kính mờ hiện đại, đồng thời giữ nguyên dữ liệu, cách xếp chỗ, bộ lọc và mọi thao tác hiện tại.

## Thiết kế đã chọn
- Bảng màu Bắc Âu: teal `#0F766E`, sky `#38BDF8`, gold `#FBBF24`, nền sáng `#F1F5F9`.
- Sora cho tiêu đề, Manrope cho nội dung.
- Bố cục toàn cảnh: lớp học chiếm diện tích chính, trung tâm quản lý nằm bên phải.
- Hướng hình ảnh: Vibrant glassmorphism dashboard, trong trẻo và giàu năng lượng nhưng không rối mắt.

## Thay đổi
1. **Khung và tiêu đề lớp học**
   - Tạo chiều sâu bằng nền sáng, viền mềm và bóng đổ nhiều lớp.
   - Làm biểu tượng lớp học nổi bật bằng teal/sky; trạng thái Live có nhịp sáng nhẹ.
   - Gom các chế độ xem thành thanh điều khiển kính mờ, làm rõ trạng thái đang chọn.

2. **Không gian lớp học 3D**
   - Chuyển ánh sáng và vật liệu sang sắc Bắc Âu trong trẻo: tường sáng, nội thất teal/sky, điểm nhấn gold.
   - Tăng màu sắc cho bảng lớp, ghế, bàn và chi tiết trang trí nhưng giữ màu trạng thái học sinh dễ phân biệt.
   - Làm thanh điều khiển nổi bên dưới rõ hơn, có nền kính mờ và phản hồi khi tương tác.

3. **Trung tâm quản lý**
   - Làm khu tìm kiếm và thống kê gọn, sáng và phân tầng rõ.
   - Hai chỉ số học sinh và hoạt động tuần dùng hai mảng màu riêng, có biểu tượng và chiều sâu nhẹ.
   - Các trạng thái lớp có chấm màu, số liệu nổi bật và phản hồi rõ khi lọc.
   - Giữ nút tới học sinh cần chú ý nổi bật nhưng không lấn át toàn bộ giao diện.

4. **Màn hình nhỏ và khả năng sử dụng**
   - Giữ chế độ danh sách 2D hiện có trên thiết bị nhỏ, đồng bộ màu sắc mới.
   - Đảm bảo chữ, nút, nhãn học sinh không chồng lấn; cho phép cuộn ngang tại vùng điều khiển khi cần.
   - Giảm hiệu ứng chuyển động khi thiết bị bật chế độ hạn chế chuyển động.

## Phạm vi kỹ thuật
- Cập nhật riêng giao diện và vật liệu của `Classroom3D` cùng các token màu lớp học.
- Không thay đổi thuật toán phân loại, dữ liệu học sinh, route, backend hoặc quyền truy cập.
- Kiểm tra trực tiếp ở kích thước desktop và mobile, gồm tìm kiếm, lọc trạng thái, đổi góc nhìn, toàn màn hình và chọn học sinh.

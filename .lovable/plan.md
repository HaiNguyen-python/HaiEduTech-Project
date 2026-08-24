# Nâng cấp lớp học 3D thành không gian lớp học chân thực

Xây dựng theo hướng **Spatial Management Hub** đã chọn: lớp học Bắc Âu hiện đại, sáng và có chiều sâu như một phòng học thật, kết hợp trung tâm quản lý gọn ở cạnh phải. Giữ nguyên dữ liệu, quy tắc xếp hạng, trạng thái màu và toàn bộ chức năng hiện có.

## 1. Dựng lại phòng học 3D chân thực
- Thay mặt phẳng đơn giản bằng một căn phòng hoàn chỉnh: sàn gỗ sáng, tường, trần, cửa sổ lớn, khung cửa, rèm, đèn trần, bảng thông minh, bục giáo viên, đồng hồ, kệ sách và cây xanh.
- Dùng vật liệu Scandinavian: trắng lạnh `#F8FAFC`, gỗ tự nhiên `#D7C4A3`, xanh học thuật `#2563EB`, emerald `#10B981`.
- Bổ sung ánh nắng xiên từ cửa sổ, ambient light, contact shadows và các vùng sáng tối để bàn ghế, học sinh tách khỏi nền rõ hơn.
- Điều chỉnh camera mặc định về góc nhìn từ bục giáo viên; giữ các chế độ Toàn lớp, Từ trên và Cần chú ý.

## 2. Làm học sinh, bàn và ghế rõ nét hơn
- Dựng lại bàn học đúng tỷ lệ với mặt gỗ, cạnh bàn, ngăn bàn và chân kim loại; ghế có tựa, mặt ghế và bốn chân rõ ràng.
- Nâng avatar từ khối cơ bản thành hình người ngồi tự nhiên hơn: đầu, tóc, khuôn mặt, cổ, thân áo, tay đặt trên bàn và chân ngồi đúng tư thế.
- Tạo nhiều biến thể ngoại hình có kiểm soát bằng seed hiện có: kiểu tóc, màu áo phụ, sắc độ da và phụ kiện nhỏ, không suy đoán giới tính.
- Giữ màu trạng thái ở viền áo, vòng chân và nhãn thay vì phủ toàn bộ avatar, để lớp học trông tự nhiên nhưng giáo viên vẫn nhận biết ngay.
- Giữ vương miện top 3 và nhịp cảnh báo nhẹ, nhưng giảm hiệu ứng phát sáng quá mạnh.

## 3. Áp dụng bố cục Spatial Management Hub
- Viewport 3D là vùng chính lớn; tiêu đề, sĩ số và trạng thái lớp nằm trên một header mỏng.
- Chuyển tìm kiếm, bộ lọc trạng thái, chỉ số và thông tin học sinh được chọn sang panel quản lý bên phải.
- Đặt thanh camera và chế độ xếp chỗ thành HUD nổi gọn ở đáy viewport, không che học sinh.
- Chỉ hiện đầy đủ tên cho top 3, học sinh cần chú ý, kết quả tìm kiếm, hover và học sinh được chọn; các em còn lại dùng marker thứ hạng nhỏ.
- Khi chọn học sinh, panel phải hiển thị hạng, điểm, số hoạt động, xu hướng, lần học cuối và trạng thái mà không rời khỏi lớp học.

## 4. Typography và design tokens
- Chuyển typography riêng của lớp học sang **Urbanist** cho heading và **Epilogue** cho nội dung.
- Cập nhật semantic tokens cho vật liệu phòng, sàn gỗ, tường, ánh sáng, panel và bóng đổ; không hardcode màu trong UI component.
- Giữ tương phản rõ trong cả light/dark mode, nhưng viewport phòng học vẫn mang ánh sáng tự nhiên phù hợp với hướng thiết kế đã chọn.

## 5. Responsive và hiệu năng
- Desktop dùng bố cục lớp học + panel quản lý; tablet chuyển panel thành overlay; mobile tiếp tục dùng danh sách 2D rõ ràng.
- Tái sử dụng geometry/material, giữ một animation loop, giới hạn DPR và giảm chi tiết khi lớp trên 40 học sinh.
- Chỉ bật shadow có chọn lọc cho kiến trúc và cụm bàn, tránh mỗi avatar tạo shadow riêng.
- Tạm dừng render ngoài viewport/tab ẩn và tôn trọng `prefers-reduced-motion`.

## Chi tiết kỹ thuật
- Refactor `Room` thành các cụm nhỏ: `ClassroomShell`, `WindowWall`, `SmartBoard`, `TeacherZone`, `StudentDesk` và `StudentAvatar` trong component lớp học hiện tại.
- Không thêm truy vấn, bảng hay thay đổi logic dữ liệu. Tiếp tục dùng `buildClassroomLayout`, `TIER_META`, `labelSet`, camera presets và callback chọn học sinh hiện có.
- Thay các màu WebGL rải rác bằng bảng vật liệu tập trung tương ứng với token đã khóa.
- Xác minh bằng trình duyệt ở desktop và mobile: phòng không bị cắt, camera thấy đủ lớp, label không chồng nhau, panel không che canvas và không có lỗi runtime/WebGL.

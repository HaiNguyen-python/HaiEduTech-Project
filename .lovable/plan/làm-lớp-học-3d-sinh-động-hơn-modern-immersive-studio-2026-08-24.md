# Làm lớp học 3D sinh động hơn - Modern Immersive Studio

## Mục tiêu
Nâng phần tường và bầu không khí lớp học theo hướng **Modern Immersive Studio**, nhưng giữ lớp học sáng, dễ quan sát và phù hợp quản lý. Khóa bảng màu **Terracotta & Sage** (`#C4654A`, `#E8A87C`, `#87A878`, `#4A6741`), chữ **Outfit + Figtree**, và bố cục **Spatial Dashboard** hiện tại.

## 1. Biến tường sau thành trung tâm học tập có chiều sâu
- Giữ bảng lớp làm tiêu điểm, bổ sung khung ốp tường terracotta/sage và các dải panel tiêu âm hình học ở hai bên.
- Thêm bảng tiến độ bài học dạng module, cụm vòng tròn học thuật và các chi tiết infographic tối giản để tạo cảm giác studio tương tác.
- Dùng nhiều lớp mesh mỏng, khung nổi và ánh sáng viền nhẹ để tường có chiều sâu thực tế thay vì các mảng màu phẳng.
- Chừa khoảng trống quanh bảng và phía trên nhãn học sinh, bảo đảm mọi góc camera vẫn nhìn rõ lớp.

## 2. Trang trí tường bên thành gallery giáo dục
- Thay ba poster đơn giản bằng một gallery đồng bộ: bản đồ thế giới cách điệu, thành tích lớp, biểu tượng khoa học/ngôn ngữ và câu truyền cảm hứng ngắn.
- Bổ sung kệ nổi nhỏ với sách, vật mẫu học tập và cây xanh ở sát chu vi phòng.
- Thêm đồng hồ, bảng ghim và các mảng vật liệu gỗ ấm để lớp có cảm giác thật và giàu chi tiết hơn.
- Giảm số lượng hoặc độ chi tiết của vật trang trí khi lớp đông để không ảnh hưởng hiệu năng.

## 3. Ánh sáng và chuyển động không gian
- Chuyển ánh sáng sang tông terracotta ấm kết hợp daylight sage, có ánh sáng hắt tường và điểm sáng quanh bảng.
- Thêm chuyển động nền rất nhẹ cho ánh sáng, cây và vòng infographic; không chuyển động gần học sinh hoặc nhãn tên.
- Tôn trọng `prefers-reduced-motion` và giữ trần mở hoàn toàn để camera Top view không bị che.

## 4. Đồng bộ giao diện Spatial Dashboard
- Đổi typography riêng của module sang Outfit cho heading và Figtree cho nội dung.
- Chuyển các classroom tokens sang bảng màu đã chọn, đồng bộ header, HUD camera và Management Center mà không thay đổi bố cục hay chức năng.
- Giữ trạng thái học tập đỏ/xanh dương/vàng/xám hiện có để giáo viên không mất ý nghĩa dữ liệu; Terracotta & Sage chỉ định hình không gian và chrome giao diện.
- Bảo đảm nút, nhãn và icon luôn rõ ở trạng thái thường, hover, focus và đang chọn.

## 5. Kiểm tra hoàn tất
- Kiểm tra trực quan camera Whole class, Top view và Attention ở desktop 1440x900.
- Xác nhận trang trí không che học sinh, bảng, nhãn tên hoặc Management Center.
- Kiểm tra fullscreen, lớp 80 học sinh, mobile fallback và chế độ giảm chuyển động.
- Xác nhận không có lỗi runtime/WebGL và hiệu năng không giảm đáng kể.

## Chi tiết kỹ thuật
- Phạm vi chính: `src/components/admin/Classroom3D.tsx` và semantic classroom tokens trong `src/index.css`.
- Tách các cụm trang trí thành component nhỏ như `ImmersiveBackWall`, `LearningGallery`, `AcousticPanels` và `AmbientWallLights`.
- Tái sử dụng geometry/material ở cấp module, chỉ dùng một animation loop hiện có, không thêm dữ liệu backend hoặc thay đổi thuật toán xếp hạng.
- Thay font module bằng package font cục bộ, không tải font bằng CSS URL.

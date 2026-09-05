# Ảnh hero lớn hơn + khung nghệ thuật kiểu "sóng"

## Mục tiêu
Phóng to ô ảnh xoay vòng ở đầu trang chủ và biến khu vực quanh ảnh thành một mảng thiết kế nghệ thuật lấy cảm hứng từ hình mẫu: nền xanh đậm, các lớp sóng vẽ tay màu trắng và xanh chồng lên nhau.

## Thay đổi hiển thị

1. Ô ảnh to hơn
   - Tăng bề ngang tối đa của khung ảnh (khoảng +25%): 320 -> 400 trên máy tính bảng, 360 -> 460 trên màn hình lớn.
   - Giữ nguyên tỉ lệ vuông, bo góc, đổ bóng và cơ chế đổi ảnh mỗi 8 giây.
   - Trên điện thoại ảnh vẫn co lại vừa màn hình, không tạo thanh cuộn ngang.

2. Khung nghệ thuật quanh ảnh
   - Thêm một nền nghệ thuật phía sau ảnh: dải màu xanh đậm chuyển sang xanh ngọc, cắt bằng hai đường sóng vẽ tay ở mép trên và mép dưới (giống hình mẫu).
   - Các nét sóng mảnh màu trắng/xanh nhạt chạy nhẹ trong nền, chuyển động rất chậm, tự dừng nếu người dùng bật chế độ giảm chuyển động.
   - Viền ảnh đổi từ viền xanh lá đơn giản sang viền mảnh sáng cùng một quầng sáng dịu, để ảnh nổi trên nền sóng.
   - Chấm chọn ảnh chuyển lên nền mờ nhỏ cho dễ nhìn trên ảnh sáng.

3. Giữ nguyên
   - Tiêu đề, mô tả, ba nút khoá học và mọi nội dung chữ.
   - Nội dung 5 tấm ảnh hiện có.

## Chi tiết kỹ thuật
- Chỉnh `src/components/HeroSection.tsx`: nâng `max-w` của cột ảnh, bọc khung ảnh trong một lớp trang trí mới.
- Tạo `src/components/HeroArtFrame.tsx`: SVG sóng (2 lớp path, một trắng một xanh đậm) + gradient nền, dùng token màu trong `index.css`, không dùng màu cứng.
- Thêm token gradient/shadow cho khu vực hero vào `src/index.css` nếu cần.
- `HeroPhotoRotator.tsx`: chỉ chỉnh kiểu chấm điều hướng, giữ logic xoay ảnh.
- Kiểm tra bằng trình duyệt ở 1280px và 390px để chắc chắn không tràn, không che chữ.

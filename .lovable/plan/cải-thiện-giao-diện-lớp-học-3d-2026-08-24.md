# Cải thiện giao diện Lớp học 3D

Mục tiêu: mở hoàn toàn góc nhìn xuống học sinh, làm lớp học đẹp và sinh động hơn nhưng vẫn dễ quản lý, đồng thời bảo đảm mọi nút trong Management Center luôn rõ chữ ở trạng thái thường, hover và được chọn.

## 1. Mở góc nhìn và cân lại camera
- Bỏ mesh trần/mái che đang nằm phía trên phòng học.
- Giữ tường, cửa sổ và hệ đèn nhưng chuyển đèn trần thành đèn treo/đèn tường không tạo mảng che camera.
- Cân lại camera mặc định và ba preset Whole class, Top view, Attention để thấy rõ toàn bộ hàng ghế, bảng và nhân vật.
- Giới hạn góc xoay camera hợp lý để tránh đi xuyên tường hoặc rơi vào góc nhìn bị đồ nội thất che khuất.

## 2. Làm không gian lớp học đẹp nhưng gọn mắt
- Bổ sung trang trí có chọn lọc ở các vùng ngoài lối nhìn chính: poster giáo dục, đồng hồ, sách nhiều màu trên kệ, cây xanh và một vài vật dụng bàn giáo viên.
- Làm sàn gỗ, khung cửa sổ và bảng lớp có chiều sâu rõ hơn; tinh chỉnh ánh sáng ban ngày và bóng đổ nhẹ để bàn ghế tách khỏi nền.
- Không đặt vật trang trí trước học sinh, nhãn tên hoặc bảng thống kê; giảm chi tiết tự động khi lớp đông để giữ hiệu năng.

## 3. Nâng độ rõ của học sinh
- Tăng nhẹ tỷ lệ nhân vật so với bàn ghế và điều chỉnh tư thế ngồi để đầu, thân, tay, chân không bị bàn che quá nhiều.
- Cải thiện khuôn mặt, tóc và độ tương phản quần áo; giữ màu trạng thái ở áo/viền/vòng chân để giáo viên nhận biết nhanh.
- Tối ưu nhãn hạng, tên và điểm: nền đặc hơn, chữ sắc nét, ưu tiên học sinh top, cần chú ý, được tìm kiếm hoặc được chọn để tránh chồng lấn.
- Giữ crown top 3 và animation trạng thái ở mức nhẹ, không gây nhiễu thị giác.

## 4. Sửa độ rõ của Management Center
- Ghi đè trạng thái hover cho các nút camera, bộ lọc trạng thái, thống kê và nút hành động để màu chữ/icon luôn có tương phản cao.
- Không dùng hiệu ứng blur hoặc đổi sang màu chữ nhạt khi hover; chỉ thay nền, viền và bóng nhẹ.
- Làm rõ ba trạng thái: mặc định, hover/focus và đang chọn; bổ sung focus-visible rõ cho bàn phím.
- Kiểm tra text dài, số liệu và icon không bị cắt hoặc dịch chuyển trong panel 300px.

## 5. Xác minh
- Kiểm tra trực quan trên desktop ở camera mặc định và cả ba preset, bao gồm hover toàn bộ nút Management Center.
- Kiểm tra chế độ toàn màn hình và mobile fallback để không phát sinh chồng lấn.
- Xác nhận không có lỗi runtime/WebGL, học sinh không bị mái che, nhãn không che nhau quá mức và canvas vẫn chạy mượt với lớp 80 học sinh.

## Chi tiết kỹ thuật
- Phạm vi chính: `src/components/admin/Classroom3D.tsx`; chỉ bổ sung semantic classroom tokens trong `src/index.css` nếu cần.
- Tái sử dụng geometry/material ở cấp module và một animation loop hiện có; không thêm truy vấn, bảng hoặc thay đổi logic xếp hạng/dữ liệu.
- Dùng component Button hiện có, nhưng đặt class trạng thái rõ ràng tại khu vực lớp học để tránh variant ghost kế thừa `hover:text-accent-foreground` gây mất tương phản.

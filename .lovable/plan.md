# Sửa menu thả xuống bị tắt và khuất nội dung

## Mục tiêu
Giữ menu ổn định khi rê chuột từ mục chính sang menu con, đồng thời bảo đảm mọi menu luôn nằm trọn trong màn hình và có thể cuộn đến mục cuối.

## Thay đổi

### 1. Ổn định thao tác rê chuột
- Quản lý chung trạng thái rê chuột của nút môn học, menu cấp một và menu con.
- Chỉ đóng menu sau khoảng chờ ngắn khi con trỏ thực sự rời khỏi toàn bộ vùng menu.
- Mở rộng vùng nối vô hình giữa hai cột để con trỏ đi chéo hoặc đi chậm không làm menu biến mất.
- Hủy đúng các bộ đếm đóng cũ khi người dùng quay lại menu hoặc chuyển sang nhóm kế bên.

### 2. Không để menu bị khuất dưới màn hình
- Tính vị trí theo kích thước màn hình thực tế và chiều cao thanh điều hướng.
- Giới hạn cả menu cấp một và menu con trong vùng nhìn thấy, chừa khoảng an toàn ở mép trên và mép dưới.
- Menu dài sẽ cuộn bên trong với thanh cuộn dễ nhìn; mục cuối luôn truy cập được.
- Menu con sẽ tự dịch lên hoặc mở sang trái khi thiếu chỗ, thay vì bám cứng theo hàng đang rê chuột.
- Cập nhật lại vị trí khi cuộn, đổi kích thước cửa sổ hoặc chuyển sang nhóm menu khác.

### 3. Chỉnh giao diện
- Giữ màu riêng của từng môn hiện có.
- Làm trạng thái đang chọn rõ hơn và giữ màu sáng khi con trỏ đang ở menu con.
- Đồng bộ khoảng cách, bóng, viền và góc bo giữa hai cấp menu; không thay đổi tên hay đường dẫn.

## Kiểm tra
- Kiểm tra English và Cambridge IELTS ở màn hình cao, thấp và gần mép phải.
- Rê chuột chậm, nhanh và đi chéo giữa hai cột để chắc chắn menu không tự tắt.
- Cuộn tới mục cuối của các menu dài như English, Chinese, Vietnamese và Programming.
- Kiểm tra menu tự đổi hướng, không vượt cạnh màn hình và các mục vẫn bấm được.
- Chạy kiểm tra TypeScript và kiểm tra trực tiếp trên trình duyệt desktop.

## Chi tiết kỹ thuật
Chỉ chỉnh phần thanh điều hướng và kiểu hiển thị liên quan. Không thay đổi nội dung khóa học, đường dẫn, dữ liệu hoặc menu trên điện thoại.

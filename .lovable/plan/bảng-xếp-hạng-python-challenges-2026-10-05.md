# Bảng xếp hạng Python Challenges

## Mục tiêu
Thêm bảng xếp hạng bên phải trang làm bài, hiển thị Top 10 học sinh theo số challenge Python khác nhau đã hoàn thành.

## Thực hiện
- Tổng hợp số challenge đã hoàn thành từ dữ liệu học tập hiện có, chỉ tính mỗi challenge một lần cho mỗi học sinh.
- Trả về tên hiển thị an toàn cùng tổng số bài đã luyện; không công khai email hoặc dữ liệu cá nhân khác.
- Tạo bảng xếp hạng Top 10 ở cột phải trên màn hình lớn; trên màn hình nhỏ đặt gọn bên dưới nội dung để không làm chật bài code.
- Làm nổi bật 3 vị trí đầu và vị trí của học sinh hiện tại khi có trong bảng.
- Cập nhật bảng ngay sau khi học sinh vượt qua challenge; ngăn việc làm lại cùng bài làm tăng sai số tiến độ.
- Kiểm tra dữ liệu, hiển thị trên desktop/mobile và trạng thái chưa có kết quả.

## Chi tiết kỹ thuật
- Dùng một hàm dữ liệu chỉ-đọc, có giới hạn Top 10 và quyền truy cập cho người đã đăng nhập.
- Đếm `DISTINCT activity_id` của hoạt động `python_challenge` để tránh trùng.
- Tách phần hiển thị thành component riêng để trang challenge dễ bảo trì.

# Ổn định toàn bộ Career Roadmap

## Mục tiêu
- Đổi tên hiển thị thành **Career Roadmap**, bỏ từ “AI” khỏi tiêu đề trang, thẻ dẫn vào trang và tiêu đề chia sẻ/SEO.
- Giữ nguyên route `/programming/career-roadmap`, khả năng cá nhân hóa và kết nối tạo lộ trình hiện tại.
- Làm cho toàn bộ luồng nhập thông tin, tạo lộ trình, dùng bản dự phòng, đánh dấu dự án và mở tài nguyên hoạt động ổn định trên desktop lẫn mobile.

## Kế hoạch thực hiện

### 1. Chuẩn hóa tên và nội dung hiển thị
- Đổi H1 thành “Career Roadmap”.
- Đồng bộ tên tại thẻ Career Roadmap trong Programming và metadata SEO/social.
- Giữ mô tả rõ ràng rằng lộ trình được cá nhân hóa và dùng dữ liệu thị trường, nhưng không đưa “AI” vào tên sản phẩm.

### 2. Làm chắc luồng nhập và tạo lộ trình
- Kiểm tra và giới hạn vai trò tùy chỉnh, kinh nghiệm, giờ học/tuần và số tháng ngay cả khi người dùng nhập trực tiếp giá trị rỗng hoặc ngoài khoảng.
- Vô hiệu hóa đúng các thao tác khi đang tạo, ngăn yêu cầu trùng và dọn timer khi rời trang.
- Giữ lộ trình nhanh sau 4,5 giây, nhưng làm rõ trạng thái “đang hoàn thiện”, “đã dùng bản dự phòng” và lỗi có thể thử lại.
- Ngăn kết quả cũ hoặc phản hồi đến muộn ghi đè một yêu cầu mới.

### 3. Kiểm tra và bảo vệ dữ liệu trả về
- Định nghĩa kiểu dữ liệu Roadmap thay cho `any` ở toàn bộ màn hình.
- Kiểm tra đầy đủ cấu trúc phản hồi trước khi hiển thị, chuẩn hóa mảng/trường thiếu và quay về bản dự phòng khi dữ liệu không hợp lệ.
- Chỉ cho phép liên kết tài nguyên dùng giao thức web an toàn; bỏ liên kết rỗng hoặc không hợp lệ.
- Bổ sung giới hạn đầu vào và thời gian chờ ở chức năng tạo lộ trình để tránh prompt quá dài hoặc yêu cầu treo.

### 4. Lưu và khôi phục trạng thái
- Lưu an toàn lựa chọn form, lộ trình gần nhất, nguồn tham khảo và các dự án đã đánh dấu cho khách trên thiết bị hiện tại.
- Khôi phục sau khi tải lại trang, có phiên bản dữ liệu để tránh lỗi khi cấu trúc thay đổi.
- Dùng mã dự án ổn định thay vì chỉ số vị trí để trạng thái hoàn thành không bị gán nhầm khi lộ trình thay đổi.

### 5. Hoàn thiện khả năng sử dụng
- Chuyển nhóm chọn nghề và trình độ thành lựa chọn có trạng thái rõ ràng cho bàn phím và trình đọc màn hình.
- Bổ sung nhãn trạng thái tải, focus hợp lý và giảm chuyển động khi thiết bị yêu cầu.
- Kiểm tra bố cục dài, chữ, nút, thẻ kỹ năng, tài nguyên, dự án và nguồn tham khảo không tràn ngang trên mobile.

### 6. Kiểm thử và rà soát cuối
- Thêm kiểm thử cho validation, bản dự phòng, dữ liệu lưu/khôi phục, URL an toàn và phản hồi thiếu/sai cấu trúc.
- Kiểm thử các nhánh: thành công, phản hồi chậm, lỗi dịch vụ, timeout, vai trò tùy chỉnh và tạo lại lộ trình.
- Chạy kiểm tra TypeScript, lint và test liên quan.
- Chạy thử trực tiếp desktop/mobile: tạo lộ trình, đánh dấu dự án, tải lại trang, đổi ngôn ngữ và mở tài nguyên.

## Phạm vi giữ nguyên
- Không đổi route, danh sách nghề, cấu trúc nội dung chính hoặc chức năng tạo lộ trình cá nhân hóa.
- Không thêm xuất PDF hay chức năng mới ngoài yêu cầu ổn định hiện tại.
- Không làm mất dữ liệu tiến độ đang lưu trên thiết bị.

## Chi tiết kỹ thuật
- Màn hình chính: `src/pages/CareerRoadmap.tsx`.
- Điểm vào liên quan: `src/pages/Programming.tsx`, metadata trang và navigation hiện có.
- Chức năng tạo nội dung: `career-roadmap-ai`; bổ sung validation đầu vào/đầu ra và timeout có kiểm soát, vẫn giữ quyền truy cập công khai hiện tại.
- Dùng semantic tokens và các thành phần giao diện sẵn có của HaiEduTech.

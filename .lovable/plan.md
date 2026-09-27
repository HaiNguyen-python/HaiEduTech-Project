# Làm mới bảng học phí HaiEduTech

## Kết quả mong muốn
- Áp dụng phương án **Modern List View** thầy đã chọn cho phần khóa học trên cả ba trang Tiếng Anh, Tiếng Trung và Lập trình.
- Thay các ô giá nhỏ lặp lại bằng những dòng khóa học thoáng, dễ quét: tên khóa học và bản dịch, thời lượng, giá lớp nhóm, giá kèm 1-1; EUR rõ ràng và VND quy đổi ngay bên dưới.
- Dùng nền trắng, xanh ngọc nhạt và chữ xanh đậm theo bảng màu đã chọn; Sora cho tiêu đề, Manrope cho nội dung. Giá vừa phải, nhãn dễ đọc, đường phân cách nhẹ, phần kèm riêng nhấn bằng nền ngọc dịu.
- Mỗi mức giá giữ đường dẫn đăng ký riêng; tên khóa vẫn dẫn tới biểu mẫu chọn sẵn khóa học. Trên điện thoại, xếp thông tin theo chiều dọc mà không làm giá hoặc nút bị chật.

## Giới hạn
- Giữ nguyên tên khóa, học phí EUR, quy đổi VND, thời lượng 12 tuần/24 buổi/36 giờ, quy tắc học 1-1 gấp ba và luồng đăng ký/thanh toán hiện có.
- Không thêm nội dung cam kết mới từ bản minh họa, chẳng hạn tài liệu miễn phí, nếu chưa có thông tin xác nhận.

## Chi tiết triển khai
- Chỉ làm mới giao diện dùng chung trong `CourseTuitionSection`; dữ liệu `tuitionBySubject` và các tham số `course`/`class` trên liên kết được giữ nguyên.
- Định nghĩa các vai trò màu xanh ngọc, mực và nền nhạt bằng token trong CSS toàn cục, rồi dùng lớp màu ngữ nghĩa; bố cục hàng dùng phân cách thay cho các thẻ lồng nhau. Áp dụng Sora/Manrope cho riêng khu vực này nếu chưa sẵn có.
- Kiểm tra các trang `/english`, `/chinese`, `/programming` trên máy tính và điện thoại; kiểm tra hai liên kết đăng ký mỗi dòng dẫn tới đúng khóa và hình thức học.

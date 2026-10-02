# Giấy báo chương trình & khóa học HaiEduTech trong Admin

## Mục tiêu
Tạo một mục quản trị riêng để soạn, xem trước, lưu, gửi email và tải PDF giấy báo chương trình/khóa học mang thương hiệu HaiEduTech. Mẫu ảnh được dùng làm tham khảo nội dung, không đưa ảnh chụp vào sản phẩm.

Giấy báo sẽ:
- Song ngữ Việt - Anh.
- Cho phép chọn học viên hiện có hoặc nhập người nhận mới.
- Tự điền từ danh mục khóa học và học phí hiện có, sau đó cho phép chỉnh sửa từng giấy.
- Lưu đầy đủ lịch sử, trạng thái bản nháp/đã gửi và thời điểm gửi.

## 1. Mục mới trong Admin
- Thêm mục **Giấy báo khóa học / Course Notices** vào nhóm Vận hành của Admin, dùng chung bố cục và quyền truy cập hiện có.
- Giao diện gồm ba khu rõ ràng:
  1. Danh sách giấy báo và bộ lọc.
  2. Biểu mẫu tạo/chỉnh sửa.
  3. Bản xem trước A4 theo thời gian thực.
- Hỗ trợ tìm theo học viên, email, khóa học, mã giấy báo; lọc theo bản nháp, đã gửi và khoảng ngày.
- Các thao tác: tạo mới, sửa, nhân bản, xem lại, tải PDF, gửi email và gửi lại.

## 2. Nội dung giấy báo
Mỗi giấy báo có mã riêng và các phần sau:

### Thông tin người nhận
- Họ tên học viên, email, số điện thoại.
- Chọn từ danh sách học viên HaiEduTech hoặc nhập người nhận chưa có tài khoản.

### Chương trình học
- Tên khóa học Việt - Anh, hình thức lớp nhóm hoặc kèm 1-1.
- Trình độ, mục tiêu đầu ra, ngày bắt đầu/kết thúc.
- Lịch học theo ngày, giờ và múi giờ.
- Thời lượng theo tuần, số buổi và tổng số giờ.
- Nội dung chương trình chi tiết theo các mô-đun/chủ đề; quyền lợi và tài liệu đi kèm.
- Ghi chú riêng cho học viên.

### Học phí
- Học phí gốc bằng EUR và VND theo tỷ giá dùng chung hiện có.
- Giảm học phí theo phần trăm hoặc số tiền, kèm lý do.
- Học phí cuối cùng, hạn thanh toán và hướng dẫn thanh toán.
- Có thể chọn thông tin chuyển khoản Việt Nam hoặc Phần Lan đang dùng trong luồng đăng ký khóa học.
- Tất cả phép tính tự cập nhật và được kiểm tra trước khi lưu/gửi.

### Giảng viên
- Mặc định điền hồ sơ giảng viên HaiEduTech: tên, học vị, kinh nghiệm, chuyên môn, điện thoại, website và email.
- Cho phép chỉnh sửa trên từng giấy mà không làm thay đổi hồ sơ mặc định.

## 3. Thiết kế PDF và bản xem trước
- Thiết kế A4 trang trọng, rõ cấp bậc: logo HaiEduTech, dải màu Royal Blue - Emerald, tiêu đề, mã giấy báo, ngày phát hành và thông tin liên hệ.
- Trình bày dạng văn bản chuyên nghiệp, không dùng icon thay nội dung; tối ưu cho cả màn hình và bản in.
- Nội dung song ngữ được sắp xếp nhất quán, hỗ trợ đầy đủ dấu tiếng Việt.
- Tạo PDF từ bản in HTML để chữ tiếng Việt sắc nét, có thể chọn/copy và tránh lỗi font.
- Nếu nội dung dài, tự chia trang với đầu/cuối trang đồng bộ, không cắt bảng học phí hoặc chữ giữa dòng.

## 4. Gửi email trực tiếp
- Thêm mẫu email **Course Notice / Giấy báo khóa học** theo đúng nhận diện của bản PDF.
- Email gửi đến đúng một học viên từ tên miền HaiEduTech đã được xác minh.
- Nội dung email hiển thị toàn bộ thông tin quan trọng của giấy báo và không phụ thuộc tệp đính kèm; người quản trị vẫn có thể tải PDF riêng để gửi qua kênh khác.
- Trước khi gửi, hiện bước xác nhận gồm người nhận, tiêu đề và bản xem trước.
- Chống gửi trùng khi bấm nhiều lần; xử lý rõ trường hợp địa chỉ bị từ chối hoặc tạm thời chưa gửi được.
- Ghi lại thời điểm, người gửi, địa chỉ nhận và kết quả gửi trong lịch sử giấy báo.

## 5. Dữ liệu và an toàn
- Tạo bảng lưu **bản chụp hoàn chỉnh** của từng giấy báo: thông tin học viên, khóa học, lịch học, học phí, chương trình, giảng viên, trạng thái và lịch sử gửi. Việc thay đổi giá hoặc danh mục sau này không làm sai giấy cũ.
- Học viên có tài khoản được liên kết bằng ID hồ sơ; người nhận nhập mới vẫn lưu tên và email độc lập.
- Chỉ Admin/Teacher được tạo, xem, sửa, gửi hoặc xóa giấy báo; Assistant và học viên không có quyền truy cập dữ liệu này.
- Áp dụng quyền truy cập ở cơ sở dữ liệu và kiểm tra lại quyền trong chức năng gửi email.
- Chuẩn hóa email, giới hạn độ dài nội dung và xác thực toàn bộ dữ liệu trước khi lưu hoặc gửi.

## 6. Đồng bộ danh mục và mẫu sẵn
- Tách danh mục học phí hiện có thành nguồn dùng chung để trang học phí, form đăng ký và giấy báo cùng dùng một tên khóa học, thời lượng và mức giá.
- Cung cấp mẫu sẵn cho các khóa học đang niêm yết; lớp 1-1 mặc định bằng ba lần giá lớp nhóm như quy tắc hiện có.
- Mỗi mẫu có mục tiêu, lộ trình, số buổi, tổng giờ và quyền lợi mặc định; người quản trị có thể sửa trước khi phát hành.
- Cho phép tạo khóa học tùy chỉnh trên một giấy báo mà không làm thay đổi danh mục công khai.

## 7. Kiểm tra hoàn tất
- Tạo thử một giấy báo từ học viên hiện có và một giấy cho người nhận nhập mới.
- Kiểm tra phép tính EUR/VND, giảm giá, học phí cuối cùng và thông tin chuyển khoản.
- Kiểm tra lưu nháp, sửa, nhân bản, tìm kiếm và lịch sử gửi.
- Gửi thử một email thực tế và xác nhận trạng thái được ghi đúng.
- Tải PDF, kiểm tra trực quan tất cả trang: dấu tiếng Việt, chia trang, bảng học phí, màu sắc, thông tin giảng viên và không có nội dung bị cắt.
- Kiểm tra Admin trên máy tính và điện thoại; xác nhận người không đủ quyền không thể xem hoặc gửi giấy báo.

## Chi tiết kỹ thuật
- Tái sử dụng cấu trúc tab Admin và mẫu quản lý chứng chỉ hiện có cho danh sách, form và bản xem trước.
- Dùng bảng mới có RLS, quyền truy cập rõ ràng và trường JSON có cấu trúc cho bản chụp chương trình/học phí; không lưu file PDF trong cơ sở dữ liệu.
- Dùng mẫu email ứng dụng hiện có và một chức năng gửi chuyên biệt; không tạo chức năng gửi email chung nhận nội dung tùy ý từ trình duyệt.
- PDF được tạo phía trình duyệt bằng bố cục in A4 Unicode-safe; email được dựng từ cùng mô hình dữ liệu để PDF, email và lịch sử luôn khớp nhau.

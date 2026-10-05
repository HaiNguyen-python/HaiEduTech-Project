# Chỉnh lại Course Information và Study Report

## Mục tiêu
- Hạ bố cục Course Information xuống thêm để cân bằng khoảng trống trên và dưới trang A4.
- Bảo đảm mọi nhãn và giá trị trong Study Report hiển thị trọn vẹn, không bị cắt hoặc tràn khỏi ô.

## Thay đổi
1. Tăng khoảng cách phía trên của Course Information ở cả bản xem trước và bản in, đồng thời giữ phiếu trong đúng một trang A4.
2. Bỏ kiểu cắt chữ bằng dấu ba chấm trong các thẻ chỉ số Study Report; cho nhãn xuống dòng có kiểm soát và tự điều chỉnh cỡ chữ theo độ dài giá trị.
3. Nới chiều cao thẻ, cân lại khoảng cách biểu đồ và thu gọn các khu vực khác vừa đủ để không chạm chân trang.
4. Xuất bản mẫu thực tế, chuyển PDF thành ảnh và kiểm tra trực quan các ô, biểu đồ, mép trang trước khi hoàn tất.

## Chi tiết kỹ thuật
- Chỉ sửa phần trình bày của `CourseNoticeDocument`, quy tắc in trong `CourseNoticesTab`, và HTML A4 của `learningDnaReport`.
- Không thay đổi dữ liệu, công thức, nội dung báo cáo hoặc luồng lưu/gửi email.

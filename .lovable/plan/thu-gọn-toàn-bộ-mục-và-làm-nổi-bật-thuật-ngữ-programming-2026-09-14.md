# Thu gọn toàn bộ mục và làm nổi bật thuật ngữ Programming

## Mục tiêu
- Khi mở bất kỳ bài Programming nào lần đầu, tất cả mục kể cả mục 1 đều ở trạng thái thu gọn.
- Học viên vẫn có thể bấm tiêu đề, "Đọc tiếp", hoặc "Mở tất cả" để xem nội dung.
- Các thuật ngữ và cụm từ quan trọng trong nội dung được in đậm vừa đủ để dễ quét, không làm cả trang trở nên nặng chữ.

## Thay đổi giao diện
- Bỏ hành vi tự mở mục đầu tiên khi chưa có trạng thái đã lưu.
- Giữ trạng thái mở/đóng đã lưu riêng cho từng bài; người học quay lại sẽ thấy đúng trạng thái gần nhất.
- Mục mở đầu không có tiêu đề, nếu xuất hiện, cũng được đưa vào một mục thu gọn thay vì luôn hiển thị toàn bộ.
- Giữ nguyên nút "Mở tất cả / Thu gọn tất cả", "Đọc tiếp", "Đã đọc" và thanh tiến độ.

## Làm nổi bật nội dung
- Chuẩn hóa in đậm cho thuật ngữ được định nghĩa, nhãn khái niệm, tên kỹ thuật/công nghệ và cụm từ then chốt trong các đoạn giải thích.
- Giới hạn mật độ in đậm để mỗi đoạn chỉ nhấn các ý thực sự quan trọng; không in đậm cả câu hoặc lạm dụng trong danh sách.
- Không thay đổi nội dung kiến thức, thứ tự mục, bảng, sơ đồ, hình minh họa hay ví dụ.
- Không xử lý bên trong code block, inline code, công thức toán, URL hoặc nội dung sơ đồ để tránh làm hỏng cú pháp.
- Cập nhật quy tắc tạo bài mới để các Deep Dive sinh sau này cũng dùng cách nhấn thuật ngữ nhất quán.

## Chi tiết kỹ thuật
- Điều chỉnh trạng thái khởi tạo của các mục trong `TheorySections` thành tập rỗng; chỉ khôi phục các mục đã được người học chủ động mở trước đó.
- Chuẩn hóa phần mở đầu thành một section có tiêu đề phù hợp khi cần, để toàn bộ nội dung đều tuân theo cùng cơ chế thu gọn.
- Thêm bước chuẩn hóa Markdown có kiểm soát cho phần văn xuôi, bảo toàn fenced code, inline code, LaTeX, Mermaid, link và Markdown đã hợp lệ.
- Cập nhật prompt và bước làm sạch của chức năng tạo nội dung Programming để quy tắc in đậm được áp dụng từ nguồn.

## Kiểm tra
- Kiểm tra lần truy cập đầu và lần quay lại: tất cả mục đóng mặc định, trạng thái mở/đóng được nhớ đúng.
- Kiểm tra riêng mục 1, phần mở đầu, mở tất cả, thu gọn tất cả và thao tác đánh dấu đã đọc.
- Kiểm tra mẫu Python, SQL, Machine Learning và Startup trên máy tính và điện thoại.
- Xác nhận code, công thức, sơ đồ, bảng, hình ảnh và liên kết không bị thay đổi hoặc lỗi hiển thị.
- Chạy kiểm tra TypeScript, lint, test và bộ kiểm tra nội dung Programming tiếng Anh.

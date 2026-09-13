# Chỉnh giao diện English Fun Facts

## Mục tiêu

Làm phần `/english/fun-facts` sáng, cân đối và dễ đọc hơn theo ảnh phản hồi, đồng thời sửa toàn bộ dấu nháy bao quanh từ/cụm từ trong cả tiếng Anh và tiếng Việt.

## Thay đổi giao diện

- Đổi nút **Reveal / Khám phá** và trạng thái **Hide answer / Ẩn đáp án** khỏi màu đen, dùng màu thương hiệu xanh royal - emerald với độ tương phản rõ ở cả sáng và tối.
- Đồng bộ nút lọc đang chọn với cùng hệ màu, không còn nền gần đen.
- Dùng nút chuẩn của hệ thống cho các thao tác Reveal, chia sẻ, lọc và xáo trộn; giữ trạng thái bàn phím và nhãn hỗ trợ truy cập.
- Thay bố cục masonry hiện tại bằng lưới thẳng hàng 1 cột trên điện thoại, 2 cột trên máy tính bảng và 3 cột trên màn hình lớn.
- Cho các thẻ trong cùng hàng có chiều cao đồng đều; cố định cấu trúc đầu thẻ, nội dung, hàng nút và phản ứng để nút cùng nằm trên một đường ngang.
- Giới hạn và xử lý an toàn các tiêu đề/từ rất dài để không làm méo thẻ hoặc tràn ngang.
- Khi mở phần giải thích, thẻ được phép cao thêm nhưng không làm nội dung trong thẻ chồng lấn; chuyển động nhẹ và tôn trọng chế độ giảm chuyển động.
- Rà soát widget Fun Fact of the Day và khối cuối trang để khoảng cách, màu nút và hình thức thống nhất với danh sách thẻ.

## Chuẩn hóa dấu nháy

- Rà soát toàn bộ 49 Fun Facts trong hai nguồn nội dung đang dùng chung cho trang và widget hằng ngày.
- Đổi dấu nháy thẳng bao quanh từ/cụm từ thành cặp mở - đóng đúng: `‘...’` cho nháy đơn và `“...”` cho câu trích dẫn.
- Sửa riêng tiêu đề đang hiển thị như `’Alphabet’` để thành `‘Alphabet’`, cùng các trường hợp tương tự ở tiêu đề, câu dẫn, nội dung giải thích và ví dụ.
- Không thay đổi ý nghĩa, ID, chuyên mục, bản dịch song ngữ, phản ứng đã lưu hoặc hành vi chia sẻ.
- Thêm kiểm tra nội dung để phát hiện dấu nháy không cân bằng hoặc dùng sai chiều về sau.

## Kiểm tra hoàn thiện

- Kiểm tra TypeScript và bài rà soát dấu nháy.
- Kiểm tra trực tiếp trang ở kích thước máy tính và điện thoại: lọc chuyên mục, xáo trộn, mở/ẩn đáp án, chia sẻ và bấm phản ứng.
- Xác nhận nút không còn màu đen, dấu nháy hiển thị đúng hai phía, các thẻ thẳng hàng, không tràn ngang và không chồng nội dung ở cả hai ngôn ngữ.

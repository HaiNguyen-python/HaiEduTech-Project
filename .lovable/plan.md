# Chuẩn hóa toàn bộ Interview Questions

## Mục tiêu
Áp dụng một giao diện học tập chuyên nghiệp, nhất quán cho cả hai khu vực:
- `/programming/interview-questions` - AI Engineer và Data Engineer
- `/programming/software-eng-interview` - Software Engineering

Giữ nguyên đường dẫn, nội dung song ngữ, dữ liệu câu hỏi và tiến độ đã lưu.

## Thay đổi giao diện
1. **Đánh số câu hỏi rõ ràng**
   - Hiển thị số thứ tự cố định trên từng câu, dễ quét khi đóng hoặc mở nội dung.
   - Số thứ tự vẫn đúng và không bị lặp khi lọc theo chủ đề hoặc cấp độ.

2. **Phân loại theo cấp độ**
   - Giữ nhãn Junior, Mid, Senior đang có ở bộ AI/Data.
   - Rà từng câu Software Engineering và gán cấp độ phù hợp theo độ sâu kiến thức, phạm vi hệ thống và mức kinh nghiệm cần thiết.
   - Dùng màu nhãn thống nhất, tương phản tốt và không phụ thuộc riêng vào màu để truyền đạt thông tin.

3. **Gạch dưới từ khóa quan trọng**
   - Mở rộng bộ nhận diện thuật ngữ cho AI, Data, Software Engineering, System Design, Coding, DevOps và Behavioral.
   - Gạch dưới có chủ đích trong câu trả lời, gợi ý và ý chính; không biến toàn bộ đoạn văn thành quá nhiều điểm nhấn.
   - Render dưới dạng văn bản an toàn, không chèn HTML trực tiếp.

4. **Sidebar lọc chủ đề**
   - Dùng sidebar học tập trên desktop cho cả hai trang, gồm chủ đề, cấp độ, số lượng câu và đặt lại bộ lọc.
   - Trên mobile, chuyển sidebar thành bảng lọc mở từ nút Filters để nội dung vẫn rộng và dễ đọc.
   - Giữ chức năng tìm kiếm và trạng thái đã ôn ở trang AI/Data; thêm trải nghiệm lọc tương đương cho Software Engineering mà không làm mất nội dung song ngữ.

5. **Chuẩn hóa thẻ câu hỏi và nội dung mở rộng**
   - Đồng bộ tiêu đề nhóm, khoảng cách, cấp bậc chữ, các khối Hint, Sample Answer và Key Points theo hướng Polished Layered Learning.
   - Các danh sách đánh số trong câu trả lời xuống dòng rõ ràng; code giữ nguyên thụt dòng và dùng khối hiển thị tương phản cao.
   - Dùng Sora cho tiêu đề, Manrope cho nội dung và bảng màu Royal Blue, Emerald, Warm Gold qua token giao diện hiện có.

## Rà soát nội dung và kỹ thuật
- Kiểm tra số lượng, thứ tự, chủ đề, cấp độ và tính duy nhất của từng câu hỏi.
- Kiểm tra thuật ngữ được nhấn đúng ranh giới từ, không làm hỏng code hoặc dấu câu.
- Bổ sung kiểm thử cho lọc chủ đề/cấp độ, đánh số, nhận diện từ khóa và cấu trúc dữ liệu Software Engineering.
- Chạy kiểm tra TypeScript, lint, test và xác minh trực quan trên desktop lẫn mobile; kiểm tra không tràn ngang, không chồng chữ và không có lỗi trình duyệt.

## Chi tiết kỹ thuật
- Tái sử dụng hệ thống tiện ích và token `.interview-*` hiện có thay vì tạo hai giao diện tách biệt.
- Bổ sung định danh ổn định và trường `difficulty` cho 30 câu Software Engineering để lọc và kiểm thử chính xác.
- Dùng các thành phần Button, Badge, Accordion và Sheet hiện có cho khả năng truy cập bằng bàn phím và trạng thái ARIA.

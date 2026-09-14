# Nâng cấp Startup Case Studies

## Mục tiêu
Sắp xếp lại trang Case Studies theo hướng **Modern Illustrated Bento** đã chọn, giúp 12 câu chuyện dễ đọc, sinh động và có thứ tự ưu tiên rõ ràng trên cả máy tính lẫn điện thoại.

## Nội dung triển khai
1. **Chia nội dung thành hai bộ sưu tập rõ ràng**
   - 6 startup Việt Nam: nhấn vào lợi thế địa phương và khả năng vươn ra quốc tế.
   - 6 startup toàn cầu: nhấn vào các quyết định sản phẩm và tăng trưởng tạo bước ngoặt.
   - Giữ nguyên đầy đủ Problem, Insight, GTM, Metric và Lesson của từng case.

2. **Bố cục Modern Illustrated Bento**
   - ELSA Speak và Airbnb là hai case nổi bật với thẻ lớn.
   - Các case còn lại dùng thẻ cân đối theo lưới 3 cột rộng, 2 cột vừa và 1 cột trên điện thoại.
   - Tăng cỡ chữ, phân cấp tiêu đề, số liệu và bài học để người học quét nhanh.
   - Dùng Blue - Emerald - Gold trên nền sáng, chữ Sora cho tiêu đề và Manrope cho nội dung.

3. **Hình minh họa riêng cho từng case**
   - Dùng 12 tranh chibi giáo dục đã tạo, mỗi tranh mô tả đúng lĩnh vực và insight của case.
   - Ảnh có kích thước ổn định, tải trễ và phóng nhẹ khi rê chuột.
   - Mỗi ảnh có mô tả thay thế rõ ràng.

4. **Trải nghiệm và khả năng đọc**
   - Metric được nhấn bằng khối số liệu riêng; Lesson dùng vùng nền vàng nhạt.
   - Hiệu ứng xuất hiện và nâng thẻ nhẹ, tự tắt khi người dùng chọn giảm chuyển động.
   - Không thay đổi đường dẫn, nội dung khóa học, Navbar, Footer hoặc chức năng hiện có.

## Chi tiết kỹ thuật
- Cập nhật trang `StartupCaseStudies` và các token giao diện dùng riêng cho Case Studies.
- Bổ sung font Sora/Manrope vào cấu hình giao diện hiện có.
- Không thêm thư viện hoặc thay đổi backend.

## Kiểm tra
- Kiểm tra đủ 12 case và đủ 5 trường nội dung cho từng case.
- Kiểm tra ảnh hiển thị, không méo hoặc làm lệch thẻ.
- Kiểm tra desktop và mobile không tràn ngang, chữ dễ đọc, các thẻ không chồng lấn.
- Chạy TypeScript, lint và audit nội dung Programming.

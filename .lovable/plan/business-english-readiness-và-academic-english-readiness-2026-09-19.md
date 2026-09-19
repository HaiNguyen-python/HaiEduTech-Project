# Business English Readiness và Academic English Readiness

## Mục tiêu

Thêm biểu đồ readiness riêng cho hai lộ trình để người học thấy mức sẵn sàng dùng tiếng Anh trong môi trường công sở hoặc học thuật, biết kỹ năng mạnh và phần cần ưu tiên tiếp theo.

## Trải nghiệm người học

- Đặt thẻ **Business English Readiness** hoặc **Academic English Readiness** trong tab **Lộ trình**, ngay sau hai chặng Core Lessons và Communication Lab.
- Biểu đồ radar có 6 trục đúng theo 6 chủ đề của từng lộ trình:
  - Business: Email chuyên nghiệp, Họp và thảo luận, Trình bày dữ liệu, Gọi điện và tạo quan hệ, Đàm phán và xử lý khiếu nại, CV và phỏng vấn.
  - Academic: Từ vựng học thuật, Văn phong và độ chính xác, Viết học thuật, Đọc và phân tích, Nghe giảng và ghi chú, Trích dẫn và seminar.
- Hiện điểm readiness tổng từ 0 đến 100 cùng 4 mức song ngữ: **Đang xây nền**, **Đang phát triển**, **Gần sẵn sàng**, **Sẵn sàng áp dụng**.
- Bên dưới biểu đồ có danh sách 6 kỹ năng với điểm, bằng chứng học tập và thanh tiến độ để vẫn dễ đọc trên điện thoại.
- Nêu rõ đây là chỉ báo dựa trên hoạt động luyện tập trong HaiEduTech, không phải chứng chỉ trình độ chính thức.
- Hiện gợi ý **Nên tập trung tiếp theo** dựa trên kỹ năng có điểm thấp nhất, kèm nút mở đúng chặng hoặc bài học phù hợp.
- Khi chưa có dữ liệu, hiển thị trạng thái bắt đầu rõ ràng thay vì một biểu đồ gây hiểu nhầm là người học đạt 0 năng lực.

## Cách tính minh bạch

Mỗi trục dùng dữ liệu học thật đã có, tối đa 100 điểm:

- 45% từ tỷ lệ hoàn thành 4 Core Lessons thuộc chủ đề đó.
- 25% từ điểm quiz tốt nhất của các Core Lessons đã làm.
- 10% từ tỷ lệ cụm từ đã đánh dấu luyện tập trong chủ đề.
- 20% từ các Communication Lab liên quan đã hoàn thành.

Điểm readiness tổng là trung bình 6 trục. Mỗi Communication Lab sẽ được ánh xạ rõ ràng vào một trong 6 kỹ năng của đúng lộ trình và có kiểm tra để không bài nào bị bỏ sót hoặc gán sang lộ trình khác.

Với tiến độ cũ chưa lưu điểm quiz chi tiết, hệ thống vẫn ghi nhận phần hoàn thành và cụm từ đã luyện, đồng thời báo rằng cần làm lại quiz để tăng độ tin cậy của đánh giá. Không suy đoán điểm quiz cũ.

## Thay đổi kỹ thuật

- Tạo mô hình tính readiness thuần, dùng chung cho Business và Academic, gồm cấu hình nhãn song ngữ, ánh xạ Core topic và Communication Lab, công thức điểm, mức readiness và kỹ năng yếu nhất.
- Bổ sung lưu **điểm quiz tốt nhất theo lesson ID** vào khóa localStorage mới, tách biệt cho từng lộ trình. Core và Lab chỉ cập nhật khi điểm mới cao hơn điểm cũ.
- Tạo component biểu đồ dùng Recharts và semantic design tokens, có bảng số liệu thay thế để biểu đồ dễ hiểu và hỗ trợ accessibility.
- Gắn component vào `PurposeEnglishCourse` và truyền hành động điều hướng tới Core Lessons hoặc Communication Lab phù hợp.
- Giữ nguyên route, lesson ID, thứ tự mở khóa, các khóa tiến độ hiện tại, hợp đồng backend, nội dung song ngữ và TTS.
- Không thay đổi Academic/Business lesson content và không thêm bảng dữ liệu mới.

## Kiểm tra trước khi hoàn tất

- Unit test công thức tại các mốc: chưa học, học một phần, đủ dữ liệu, điểm quiz được giữ ở mức cao nhất và dữ liệu cũ không bị suy đoán.
- Audit ánh xạ đủ 24 Core Lessons và toàn bộ Communication Labs của cả hai lộ trình, không trùng và không bỏ sót.
- TypeScript, lint và các audit Business/Academic hiện có đều đạt.
- Kiểm tra trực tiếp Business và Academic ở desktop/mobile: radar không tràn, nhãn song ngữ rõ, trạng thái rỗng đúng, điểm cập nhật sau khi làm quiz và nút gợi ý mở đúng phần học.

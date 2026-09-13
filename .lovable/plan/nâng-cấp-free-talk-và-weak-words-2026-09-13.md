# Nâng cấp Free Talk và Weak Words

## Mục tiêu
Biến hai phần còn lại của Speaking Coach thành trải nghiệm luyện nói có hướng dẫn rõ ràng, phản hồi dễ áp dụng và nhất quán với Shadowing Studio cùng Sound Lab, đồng thời giữ nguyên 6 ngôn ngữ, đường dẫn, mã nội dung và dữ liệu tiến độ hiện có.

## 1. Free Talk Studio
- Chuyển màn hình thành quy trình 4 bước: **Chọn trình độ và thời lượng → Chuẩn bị ý → Nói → Xem và áp dụng phản hồi**.
- Trình bày đề bài song ngữ, gợi ý triển khai ý và đồng hồ chuẩn bị ngắn trước khi ghi âm; bổ sung hình chibi theo chủ đề từ bộ minh họa Speaking Coach hiện có.
- Làm vùng ghi âm trực quan hơn với waveform, thời gian còn lại, bản chép lời đang nhận và trạng thái rõ ràng khi đang phân tích.
- Tổ chức kết quả thành bảng dễ đọc: độ lưu loát, tốc độ, vốn từ, từ đệm, điểm mạnh và lỗi ngữ pháp. Phân biệt rõ điểm đo nhanh trên thiết bị với nhận xét AI.
- Với mỗi lỗi, hiển thị hướng sửa có thể hành động: câu gốc, câu đề xuất và nút nghe. Giữ câu trả lời mẫu, nhưng thêm thao tác luyện nói theo mẫu và trả lời câu hỏi tiếp nối ngay trong cùng phiên.
- Nếu AI tạm thời không phản hồi, báo cáo nhanh vẫn hoạt động đầy đủ và người học có nút thử phân tích lại, không cần ghi âm lại.
- Lưu lịch sử phiên gần đây theo từng ngôn ngữ trên thiết bị để người học thấy xu hướng điểm, tốc độ và số từ đệm mà không thay đổi hợp đồng backend hiện tại.

## 2. Weak Words Coach
- Đổi từ một thẻ từ đơn thành vòng luyện **Nghe → Quan sát → Nói → Củng cố**, giải thích rõ quy tắc cần 3 lần đọc đúng.
- Hiển thị nguồn tạo từ yếu (Sentences, Shadowing, Sound Lab hoặc Free Talk), số lần sai, lịch ôn và tiến độ thành thạo.
- Khi đọc sai, cho thử lại ngay trên cùng từ thay vì buộc chuyển tiếp; một lần sai vẫn đặt lại chuỗi đúng theo quy tắc hiện tại.
- Thêm gợi ý âm/IPA, làm nổi phần dễ sai khi có thể xác định, tốc độ nghe thường và chậm, waveform và đối chiếu “từ mục tiêu / hệ thống nghe được”.
- Sắp xếp phiên theo mức ưu tiên: đến hạn trước, nhiều lần sai trước; có bộ lọc “Đến hạn”, “Sai nhiều”, “Theo nguồn”.
- Cuối phiên hiển thị số từ đã làm chủ, từ cần tiếp tục và lịch ôn tiếp theo. Trạng thái trống vẫn hướng người học sang bài luyện phù hợp.

## 3. Liên kết Free Talk với Weak Words
- Từ phản hồi Free Talk, chỉ đưa từ phát âm chưa ổn vào Weak Words khi có dữ liệu đủ tin cậy; không biến lỗi ngữ pháp thành lỗi phát âm.
- Chuẩn hóa từ theo đặc điểm từng hệ chữ để tránh trùng do dấu câu, chữ hoa hoặc biến thể khoảng trắng.
- Cập nhật số lượng Weak Words ngay sau mỗi lượt luyện và giữ lịch giãn cách, khóa lưu trữ cùng dữ liệu hiện tại.

## 4. Giao diện và khả năng sử dụng
- Dùng phong cách Vibrant glassmorphism đã chọn, màu thương hiệu Royal Blue, Emerald và Warm Gold; không dùng nút đen.
- Bố cục hai cột trên màn hình lớn, một cột trên điện thoại; các khối có chiều cao ổn định và không tràn ngang.
- Hỗ trợ giao diện tối, bàn phím, trình đọc màn hình, thông báo trạng thái và chế độ giảm chuyển động.
- Không đổi navigation, hoạt động gamification, điểm thưởng hoặc hành vi của ba chế độ Speaking Coach đã hoàn thiện.

## 5. Kiểm thử và kiểm toán
- Bổ sung kiểm thử cho chấm nhanh Free Talk, chuẩn hóa phản hồi AI, thử phân tích lại, lịch sử phiên, xếp hàng từ yếu và chuỗi 3 lần đúng.
- Mở rộng audit để kiểm đủ chủ đề A1-C1, gợi ý không rỗng, dữ liệu song ngữ và từ yếu hợp lệ trên cả 6 ngôn ngữ.
- Kiểm tra trình duyệt với English, Chinese và Vietnamese trên desktop, dark mode và điện thoại; xác nhận ghi âm, nghe mẫu, thử lại, chuyển câu, cập nhật số lượng và không tràn giao diện.

## Chi tiết kỹ thuật
- Giữ nguyên `FreeTalkTopic`, route `/speaking-coach/:language`, các khóa `speaking-weak-words-*`, `speaking-pron-stats-*`, sự kiện tiến độ và lời gọi phân tích Free Talk hiện tại.
- Mở rộng bộ chuẩn hóa phản hồi theo hướng tương thích ngược; dữ liệu thiếu trường vẫn hiển thị an toàn.
- Tách logic tính báo cáo, lịch sử phiên và ưu tiên ôn tập thành hàm thuần để kiểm thử, thay vì nhúng thêm vào giao diện.
- Dùng các token Speaking Coach hiện có và component chung cho waveform, phản hồi và điều khiển âm thanh để hai màn hình đồng nhất.

# Làm mới Tech & Code Game Hub

## Mục tiêu
Biến `/programming/arcade` thành một trung tâm game lập trình sinh động, dễ đọc và có động lực hơn theo phương án **Cyber-neon terminal interface** đã chọn, đồng thời giữ nguyên bốn game, cách tính XP, lưu điểm và toàn bộ đường dẫn hiện tại.

## Giao diện mới
- Dùng bố cục bento hai cột trên desktop và một cột trên điện thoại, bám sát cấu trúc của mẫu đã chọn.
- Làm phần đầu trang mạnh hơn với trạng thái hệ thống, tên Game Hub nổi bật, mô tả ngắn và bảng XP/Level rõ ràng.
- Chuyển thanh XP hiện tại thành bảng trạng thái gọn, dễ đọc; nhật ký terminal chỉ xuất hiện khi hữu ích và không chiếm quá nhiều diện tích.
- Mỗi game có màu nhận diện riêng, biểu tượng lớn, nhãn kỹ năng, mô tả rõ, mục tiêu học tập, độ khó, thời lượng ước tính, phần thưởng XP và nút Play dễ thấy.
- Giữ chất terminal/cyber-neon của mẫu nhưng tăng độ sáng chữ, khoảng thở và tương phản để không còn cảm giác tối, trống hoặc mờ.
- Thêm chuyển động nhẹ cho viền, biểu tượng và trạng thái khi rê chuột; tắt hoặc giảm chuyển động khi thiết bị yêu cầu.

## Nội dung bốn nhiệm vụ
- **SQL Dungeon:** luyện SELECT, WHERE, aggregate và sắp xếp qua 10 trận đấu truy vấn.
- **Data Pipeline Plumber:** sắp xếp đúng quy trình Extract → Filter → Transform → Load.
- **AI Parameter Tuner:** cân bằng learning rate, batch size và regularization để đạt Sweet Spot.
- **Code Galaxy:** phân loại 42 đoạn code thuộc Foundations, Data Engineering và AI/ML.
- Nội dung giới thiệu hỗ trợ song ngữ hiện có; code, token và thuật ngữ kỹ thuật tiếp tục giữ tiếng Anh.

## Màn chơi
- Đồng bộ thanh trạng thái, nút quay lại và vùng nội dung của cả bốn game với phong cách mới.
- Cải thiện cỡ chữ, màu chữ, khoảng cách và trạng thái nút trong SQL Dungeon, Pipeline Plumber, AI Tuner và Code Galaxy.
- Không thay đổi luật chơi, đáp án, điểm số, game type, dữ liệu lưu hoặc cơ chế leaderboard.

## Kỹ thuật
- Định nghĩa màu và hiệu ứng mới bằng semantic design tokens, không rải màu cứng trong phần giao diện.
- Dùng Button hiện có cho các thao tác; bổ sung nhãn truy cập bàn phím và vùng chạm tối thiểu 44px trên điện thoại.
- Loại bỏ các nút HTML tự tạo ở phần được chỉnh nếu Button hiện có đáp ứng được.
- Không thêm thư viện, backend hoặc dữ liệu tiến độ giả.

## Kiểm tra
- Chạy kiểm tra TypeScript và lint cho phần Arcade.
- Chơi thử từng game: vào game, thao tác đúng/sai, nhận XP, quay lại menu và chơi lại.
- Kiểm tra trực tiếp ở desktop và mobile: không tràn chữ, không chồng lớp, nút dễ bấm, tương phản rõ và bốn game đều truy cập được.

# Cân bằng lại Tech & Code Game Hub và thêm 4 game ôn tập

## Mục tiêu
- Loại bỏ thẻ SQL Dungeon kéo dài bất thường.
- Giữ phong cách cyber-neon hiện tại nhưng làm danh sách game cân đối, dễ quét và dễ mở rộng.
- Tăng từ 4 lên 8 game để học sinh vừa chơi vừa ôn các mảng quan trọng của chương trình Programming.
- Giữ nguyên route `/programming/arcade`, XP hiện có, dữ liệu điểm và bốn game cũ.

## 1. Sửa bố cục danh sách game
- Bỏ cơ chế SQL Dungeon chiếm ba hàng, vì đây là nguyên nhân làm thẻ cao bằng tổng ba thẻ bên phải.
- Chuyển sang lưới thẻ đồng đều:
  - Desktop: 3 thẻ mỗi hàng ở màn hình rộng, 2 thẻ ở màn hình vừa.
  - Điện thoại: 1 thẻ mỗi hàng.
- Mỗi thẻ có chiều cao hài hòa, cùng cấu trúc: biểu tượng, kỹ năng, tên, mô tả ngắn, mục tiêu, độ khó, thời lượng, XP và nút chơi.
- Rút gọn nội dung thẻ bằng giới hạn số dòng, không để nội dung dài làm lệch cả hàng.
- Cập nhật bộ đếm từ 4 thành 8 nhiệm vụ và mô tả đầu trang tương ứng.

## 2. Giữ và cân chỉnh 4 game hiện tại
- SQL Dungeon.
- Data Pipeline Plumber.
- AI Parameter Tuner.
- Code Galaxy.
- Không thay đổi câu hỏi, đáp án, quy tắc chơi, XP hay mã lưu điểm hiện có.

## 3. Thêm 4 game ôn tập

### Python Speed Run
- Tận dụng ngân hàng đoạn code của Code Typing Race hiện có.
- Học sinh gõ chính xác các đoạn Python theo độ khó tăng dần.
- Chấm tốc độ, độ chính xác, chuỗi đúng và điểm cuối lượt.

### Bug Hunter
- Cho học sinh đọc đoạn code lỗi và chọn hoặc sửa nguyên nhân đúng.
- Phủ các lỗi phổ biến: cú pháp, điều kiện, vòng lặp, hàm, biến và kiểu dữ liệu.
- Sau mỗi câu có giải thích ngắn để biến trò chơi thành hoạt động ôn tập thực sự.

### Git Branch Quest
- Chuyển trải nghiệm Git Branching Simulator hiện có thành các nhiệm vụ có mục tiêu rõ ràng.
- Học sinh chọn đúng lệnh commit, tạo nhánh, chuyển nhánh và merge theo từng tình huống.
- Hiển thị sơ đồ nhánh và phản hồi ngay sau mỗi thao tác.

### Cyber Shield
- Trò chơi phân loại tình huống an toàn hoặc rủi ro trong mật khẩu, phishing, quyền truy cập, dữ liệu cá nhân và web security cơ bản.
- Mỗi câu yêu cầu quyết định nhanh, sau đó giải thích vì sao lựa chọn an toàn hoặc nguy hiểm.
- Nội dung mang tính giáo dục, không hướng dẫn khai thác hay tấn công hệ thống.

## 4. Điểm số và trải nghiệm học tập
- Mỗi game mới lưu kết quả bằng cơ chế `finishGame` đang dùng chung.
- Mỗi lượt chỉ lưu một lần, nút chơi lại khởi tạo lượt mới mà không tải lại trang.
- Bổ sung tiến độ câu, điểm hiện tại, phản hồi đúng/sai và màn tổng kết cho từng game.
- Nội dung code và câu hỏi Programming giữ bằng tiếng Anh; phần hướng dẫn giao diện tiếp tục song ngữ theo ngôn ngữ trang.
- Tất cả nút bấm có vùng chạm tối thiểu 44px, tên hỗ trợ trình đọc màn hình và trạng thái bàn phím rõ ràng.

## 5. Kiểm tra
- Kiểm tra đủ 8 thẻ, không còn thẻ cao bất thường hoặc khoảng trống lớn.
- Chơi hoàn chỉnh cả 4 game mới; kiểm tra đáp án, cách tính điểm và chỉ lưu một kết quả mỗi lượt.
- Mở lại 4 game cũ để xác nhận không bị ảnh hưởng.
- Kiểm tra desktop, tablet và điện thoại; không tràn ngang, chữ không chìm trên nền tối.
- Chạy kiểm tra TypeScript, lint và audit nội dung Programming tiếng Anh.

## Chi tiết kỹ thuật
- Thay `row-span-3` và quy tắc `row-span-2` còn sót bằng lưới responsive đồng đều.
- Tách dữ liệu thẻ và từng game mới thành thành phần nhỏ để `ProgrammingArcade` không tiếp tục phình lớn.
- Tái sử dụng ngân hàng typing và logic Git hiện có thay vì sao chép nội dung.
- Mã điểm đề xuất: `prog_python_speed_run`, `prog_bug_hunter`, `prog_git_branch_quest`, `prog_cyber_shield`.
- Không thêm thư viện, bảng dữ liệu hay thay đổi backend trong đợt này.

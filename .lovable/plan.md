# Rà soát và ổn định Business English & Academic English

## Mục tiêu
Hoàn thiện hai lộ trình tại `/english/business` và `/english/academic` về độ chính xác nội dung, tính logic của bài tập, âm thanh, lưu tiến độ và hiển thị trên máy tính/điện thoại, đồng thời giữ nguyên toàn bộ địa chỉ, ID bài học và dữ liệu tiến độ hiện có.

## Phạm vi đã xác nhận
- Business English: 6 chủ đề, 24 bài nền tảng, 240 cụm từ, 120 câu hỏi và 23 Communication Labs.
- Academic English: 6 chủ đề, 24 bài nền tảng, 240 cụm từ, 120 câu hỏi và 20 Communication Labs.
- Các kiểm tra cấu trúc hiện tại đều đạt 0 lỗi: đủ song ngữ, không trùng ID/đáp án, chỉ số đáp án hợp lệ, hội thoại đủ người nói và câu nghe hiểu có căn cứ trong transcript.
- Hai phần dùng chung màn hình bài học, luyện nói, TTS, hình minh họa và cơ chế lưu tiến độ. Vì vậy các sửa đổi dùng chung sẽ được kiểm tra đồng thời trên cả hai lộ trình.
- Hai lỗi đã xác nhận:
  1. Thống kê tổng đang gọi cả Core Lessons và Labs là “Lessons”, rồi lại hiển thị Labs riêng, gây cảm giác đếm trùng.
  2. Bài ôn từ vựng cho phép nộp khi mới trả lời một phần, khiến câu chưa làm bị tính sai mà không báo trước.
- Khoảng trống hiện tại: các audit chuyên biệt chưa được nối vào lệnh kiểm tra chung; chưa có kiểm thử tự động cho route, deep-link, tách biệt tiến độ và các luồng học chính.

## Kế hoạch thực hiện

### 1. Rà soát ngữ nghĩa toàn bộ nội dung
- Kiểm tra đủ 48 bài nền tảng và 43 Communication Labs, không chỉ kiểm tra cấu trúc.
- Đối chiếu câu hỏi với phần giảng, bài mẫu hoặc transcript; sửa câu mơ hồ, nhiều đáp án hợp lý, đáp án không được nêu đủ, distractor quá vô lý và giải thích chung chung.
- Chuẩn hóa văn phong Business English theo ngữ cảnh nghề nghiệp; Academic English theo register học thuật, hedging, lập luận, dữ liệu, trích dẫn và integrity.
- Đối chiếu Anh - Việt để loại bỏ dịch sai nghĩa, thiếu sắc thái hoặc thuật ngữ không nhất quán.
- Giữ nguyên ID, thứ tự bài, khóa lưu tiến độ và hợp đồng dữ liệu.

### 2. Củng cố bài tập và phản hồi
- Không cho nộp bài ôn từ vựng cho đến khi đã hoàn thành toàn bộ câu; hiển thị rõ số câu còn thiếu.
- Kiểm tra câu điền từ để đáp án luôn thật sự được che, chấp nhận biến thể hợp lệ nhưng không chấp nhận từ sai gần giống.
- Thay phản hồi nghe hiểu dùng chung bằng giải thích dựa trên chính câu/ý trong transcript khi dữ liệu cho phép.
- Xác nhận tính điểm, làm lại, hoàn thành bài và chuyển bài không làm mất hoặc ghi nhầm tiến độ.

### 3. Chỉnh giao diện và thông tin tiến độ
- Đổi thống kê tổng thành cách gọi rõ ràng như “Tổng hoạt động”, đồng thời tách số Core Lessons và Labs để không tạo cảm giác đếm trùng.
- Kiểm tra toàn bộ roadmap, danh sách bài, 5 bước bài nền tảng và 4 tab Communication Lab ở desktop và mobile.
- Sửa tràn ngang, chữ bị cắt, nút quá nhỏ, thanh bước khó cuộn, lớp nổi che thao tác và trạng thái active/completed khó nhận biết nếu phát hiện.
- Kiểm tra hình minh họa theo từng chủ đề; thay các ảnh mặc định không phù hợp bằng ánh xạ đúng ngữ cảnh, không đổi đường dẫn bài.
- Bổ sung trạng thái truy cập bàn phím và nhãn hỗ trợ cần thiết cho bộ lọc, bài đang chọn và tiến độ.

### 4. Kiểm tra âm thanh và luyện nói
- Thử nghe từng loại nội dung: cụm từ, nghe chậm, bài mẫu, hội thoại nhiều người và listening challenge.
- Xác nhận chuyển tab/bài sẽ dừng âm thanh cũ, nút phát không tạo âm thanh chồng và cơ chế dự phòng vẫn hoạt động khi nguồn chính lỗi.
- Kiểm tra roleplay của cả Business và Academic vẫn dùng đúng chủ đề, từ vựng và ngữ cảnh bài hiện tại.

### 5. Bổ sung kiểm soát hồi quy
- Mở rộng audit để phát hiện câu hỏi không có căn cứ, đáp án dễ mơ hồ, bản dịch thiếu và hình minh họa rơi về ảnh mặc định ngoài ý muốn.
- Gộp audit Core + Lab + nghe hiểu + từ khóa vào một lệnh kiểm tra chung để các lần cập nhật sau tự động phát hiện lỗi.
- Thêm kiểm thử cho hai route, yêu cầu đăng nhập, deep-link `?view=lab&lesson=...`, tách biệt tiến độ Business/Academic, hoàn thành quiz và làm lại.

### 6. Xác nhận cuối
- Chạy kiểm tra TypeScript, lint liên quan, toàn bộ audit và test mới.
- Chạy thử đăng nhập thật trên desktop và mobile cho cả hai phần: mở bài nền tảng, làm câu hỏi, phát âm thanh, mở Lab, tìm/lọc bài, luyện nói, hoàn thành và tải lại trang.
- Báo cáo số nội dung đã rà soát, lỗi đã sửa, kết quả kiểm tra và mọi giới hạn bên ngoài còn lại nếu có.

## Yêu cầu bảo toàn
- Không đổi route, lesson ID, thứ tự bài hoặc khóa lưu tiến độ.
- Không khóa thêm nội dung đối với người đã đăng nhập.
- Không thay đổi hợp đồng backend, bảng dữ liệu hoặc chức năng ngoài hai lộ trình này.
- Giữ song ngữ Việt - Anh, thiết kế HaiEduTech hiện tại và cơ chế TTS dự phòng.

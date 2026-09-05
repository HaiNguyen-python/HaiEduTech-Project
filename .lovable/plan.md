# Nâng cấp Business English và Academic English

## Mục tiêu
Biến hai trang thành khóa học tương tác, sinh động và có lộ trình rõ ràng. Chuyển hẳn toàn bộ **Professional Communication** và **Academic Communication** khỏi Interactive Curriculum sang đúng khóa học mới, không làm mất nội dung hoặc tiến độ đã học.

## 1. Sắp xếp lại nội dung
- **Business English**: giữ 24 bài nền tảng hiện có và bổ sung 23 bài Professional Communication, được tổ chức lại theo nhóm kỹ năng như phỏng vấn, networking, họp, email, làm việc nhóm, lãnh đạo, bán hàng, xử lý xung đột và phát triển nghề nghiệp.
- **Academic English**: giữ 24 bài nền tảng hiện có và bổ sung 20 bài Academic Communication, được tổ chức lại theo nhóm seminar, tranh luận, nghiên cứu, thuyết trình, dự án nhóm, phản hồi học thuật và các vấn đề toàn cầu.
- Loại bỏ hai nhóm Professional và Academic khỏi danh sách bài của Interactive Curriculum; khu vực đó chỉ còn nội dung Life Skills phù hợp với Conversational English.
- Các đường dẫn cũ tới bài Professional/Academic sẽ tự chuyển đến đúng bài trong Business English hoặc Academic English thay vì báo không tìm thấy.
- Đọc và chuyển tiến độ cũ sang khóa học mới để học sinh không mất bài đã hoàn thành.

## 2. Giao diện khóa học mới
- Thay phần đầu trang hiện tại bằng bảng tổng quan gọn, có tiến độ, bài đang học, số bài hoàn thành và nút tiếp tục.
- Chia nội dung thành hai chế độ rõ ràng:
  - **Core Lessons**: lý thuyết, cụm từ, mẫu email/đoạn văn và quiz hiện có.
  - **Communication Lab**: các bài tình huống được chuyển từ Interactive Curriculum.
- Dùng thanh lọc theo kỹ năng và cấp độ, tìm kiếm bài học, trạng thái Chưa học/Đang học/Hoàn thành và lộ trình theo từng chặng.
- Tạo diện mạo riêng: Business English chuyên nghiệp, rõ nét; Academic English mang phong cách nghiên cứu, thư viện và seminar. Cả hai vẫn dùng màu thương hiệu và hỗ trợ giao diện sáng/tối.
- Tối ưu điện thoại: bộ lọc cuộn gọn, nút tiếp tục dễ chạm, nội dung không tràn ngang.

## 3. Làm bài học hấp dẫn hơn
Mỗi bài Communication Lab sẽ có:
- Ảnh tình huống phù hợp, mục tiêu học tập và các cụm từ cần nhớ.
- Hội thoại dạng chat có nhiều người nói, tô nổi cụm từ quan trọng và phát audio theo từng câu hoặc toàn đoạn.
- Tab **Learn - Listen - Speak - Challenge** để học theo từng bước thay vì đọc một trang dài.
- Listening chỉ hiện transcript khi học sinh chủ động mở; câu hỏi A/B/C/D chỉ hiện đáp án sau khi chọn.
- Roleplay theo đúng tình huống, gợi ý vai và mục tiêu giao tiếp.
- Mini challenge cuối bài, điểm số, huy hiệu, nút thử lại và bài tiếp theo.
- Core Lessons được bổ sung bố cục theo bước, word bank, audio, hoạt động chọn cụm từ/sắp xếp câu và tóm tắt kết quả để giảm cảm giác đọc thụ động.

## 4. Tiến độ và điều hướng
- Một hệ thống tiến độ chung cho cả Core Lessons và Communication Lab trên từng khóa.
- Bài đang học gần nhất, phần trăm theo nhóm kỹ năng, chuỗi hoàn thành và kết quả quiz được lưu tại máy; hoạt động đăng nhập tiếp tục được ghi nhận như hiện tại.
- Nút Back, Previous, Next và Continue learning nhất quán trên máy tính và điện thoại.
- Không khóa nội dung.

## 5. Rà soát nội dung và kỹ thuật
- Kiểm tra toàn bộ 47 bài Business English và 44 bài Academic English sau khi hợp nhất: ID, tiêu đề song ngữ, hội thoại, từ vựng, audio, câu hỏi, đáp án và độ trùng lặp.
- Sửa các câu giao tiếp thiếu tự nhiên, dữ liệu cũ chưa đồng nhất và câu hỏi nghe không bám transcript.
- Bổ sung kiểm tra tự động cho số lượng bài, liên kết cũ, đáp án hợp lệ, nội dung rỗng và ID trùng.
- Kiểm tra thực tế hai trang trên desktop/mobile: mở bài, nghe audio, làm quiz, roleplay, hoàn thành bài, quay lại và tiếp tục học.

## Chi tiết kỹ thuật
- Mở rộng mô hình dữ liệu của hai khóa để hỗ trợ cả bài nền tảng và bài Communication Lab mà không sao chép nguồn nội dung.
- Tách giao diện lớn thành các phần nhỏ: course overview, learning path, lesson filters, communication lesson player và completion summary.
- Tạo bản đồ chuyển hướng từ các URL `/english/conversational/learn/pro-*` và `/english/conversational/learn/acad-*` sang khóa học mới, kèm bài tương ứng.
- Thêm lớp tương thích tiến độ từ `conv-eng-progress` sang khóa mới; việc chuyển đổi chạy an toàn nhiều lần và không xóa dữ liệu cũ.
- Cập nhật mô tả và số bài trên trang/menu liên quan sau khi Professional và Academic được chuyển đi.

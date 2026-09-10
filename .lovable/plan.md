# Hoàn thiện flashcard và rà soát tiếng Trung, tiếng Nhật

## Mục tiêu
- Căn giữa toàn bộ nội dung ở cả mặt trước và mặt sau của thẻ từ vựng dùng chung.
- Trong Word Quest tiếng Trung, mọi bài yêu cầu nhập/ghép chữ sẽ dùng Hán tự làm đáp án, không yêu cầu gõ pinyin có dấu.
- Rà soát kỹ thuật và logic học tập của toàn bộ khu vực tiếng Trung và tiếng Nhật, sửa các lỗi có thể xác nhận mà không thay đổi tuyến trang, mã bài học hoặc tiến độ hiện có.

## Thực hiện
1. Điều chỉnh thẻ từ vựng dùng chung để nội dung dài/ngắn đều nằm cân giữa ô, vẫn cuộn được khi nội dung vượt chiều cao.
2. Đổi bộ chuyển đổi Word Quest HSK từ `pinyin` sang `Hán tự` cho đáp án nhập liệu; sửa nhãn hướng dẫn tương ứng và kiểm tra các dạng Gõ lại, Nhớ chủ động, Ghép chữ.
3. Kiểm tra tiếng Trung: ngân hàng HSK, Word Quest, bài tập, SRS, phát âm, bộ thủ, dữ liệu đáp án, lưu tiến độ và các tuyến trang.
4. Kiểm tra tiếng Nhật: bảng chữ, từ vựng, Word Quest, flashcard/SRS, luyện đọc, động từ, trợ số từ, kính ngữ, phát âm, dữ liệu đáp án, lưu tiến độ và các tuyến trang.
5. Sửa các lỗi kỹ thuật hoặc logic rõ ràng được phát hiện trong phạm vi trên, không mở rộng tính năng ngoài yêu cầu.
6. Chạy kiểm tra TypeScript, kiểm tra dữ liệu liên quan, rồi kiểm tra trực tiếp trên máy tính và điện thoại cho các luồng chính.

## Giữ nguyên
- Tuyến trang, mã bài học, dữ liệu tiến độ và cấu trúc lưu trữ hiện có.
- Pinyin vẫn hiển thị để hỗ trợ phát âm và nhận biết, chỉ không còn là đáp án bắt buộc trong phần viết Word Quest tiếng Trung.
- Romaji tiếng Nhật và cơ chế SRS riêng của tiếng Nhật không bị thay đổi nếu không phát hiện lỗi.

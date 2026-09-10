# Hoàn thiện Word Quest theo vòng lặp từng từ

## Mục tiêu
Áp dụng cùng một quy trình cho Word Quest của cả 6 môn hiện có: IELTS/English, tiếng Việt, tiếng Trung, tiếng Nhật, tiếng Phần Lan và tiếng Thụy Điển.

```text
Xem đầy đủ từ 1 → làm 5 bài tập thích ứng của từ 1 → hoàn tất từ 1
→ xem đầy đủ từ 2 → làm 5 bài tập thích ứng của từ 2 → ...
```

Mỗi chặng vẫn gồm 8 từ và mỗi Set vẫn gom 10 chặng để màn hình không bị dài.

## Thay đổi chính

### 1. Chuyển luồng học sang từng từ
- Bỏ luồng hiện tại “xem trước cả 8 từ rồi mới luyện xen kẽ 3 từ”.
- Khi mở một chặng, luôn hiện thẻ học đầy đủ của từ đầu tiên: từ, phiên âm/pinyin/romaji, loại từ, nghĩa song ngữ, ví dụ, bản dịch và nút nghe thường/nghe chậm.
- Sau khi bấm bắt đầu luyện, học sinh hoàn thành đủ 5 bài của chính từ đó.
- Chỉ khi hoàn tất 5 bài mới đánh dấu từ đã học và chuyển sang thẻ thông tin của từ kế tiếp.
- Nút xem lại đưa học sinh về đúng thẻ thông tin của từ hiện tại, không làm mất kết quả đã hoàn thành.

### 2. Năm bài tập thích ứng cho mỗi từ
- Chọn 5 dạng không trùng nhau từ các dạng phù hợp với dữ liệu của từ: chọn nghĩa, nghe-chọn, gõ lại, ghép từ, nói lại, nhớ chủ động, điền câu, chọn cách dùng đúng và ôn ngược.
- Từ mới bắt đầu bằng nhận biết/nghe rồi tăng dần sang nhớ chủ động và vận dụng.
- Từ đã biết ưu tiên gõ, nói, nhớ chủ động, điền câu và dùng trong ngữ cảnh.
- Nếu thiết bị không hỗ trợ micro hoặc từ không có câu ví dụ, tự thay bằng dạng hợp lệ khác để vẫn đủ 5 bài.
- Trả lời sai sẽ thêm tối đa một bài ôn bù khác dạng cho chính từ đó trước khi sang từ mới; không lặp vô hạn.

### 3. Giữ đúng đặc thù từng ngôn ngữ
- Tiếng Trung: hiển thị Hán tự + pinyin, phần viết nhập Hán tự, phần nói nhận diện tiếng Trung.
- Tiếng Nhật: hiển thị kana/kanji + romaji, giữ cách nhập romaji hiện hành và nhận diện tiếng Nhật.
- Việt, Phần Lan, Thụy Điển và Anh: giữ đúng dấu, phát âm, ví dụ và cách nhập hiện có.
- Tiếp tục dùng giọng đọc, phím nhập, dữ liệu từ và khóa tiến độ riêng của từng môn.

### 4. Tiến độ và khả năng tiếp tục
- Đổi tiến độ trong chặng sang vị trí từ hiện tại + số bài đã hoàn thành của từ đó.
- Tương thích dữ liệu cũ: không xóa chặng, huy chương, trạng thái đã học hay danh sách từ đã thành thạo.
- Khi quay lại, mở đúng từ và đúng bài đang dở; chỉ gọi trạng thái hoàn thành từ sau khi vượt hết chuỗi bài của từ đó.
- Tính phần trăm chặng theo số từ hoàn tất, không tính một từ mới chỉ xem hoặc làm dở.

## Rà soát và kiểm thử
- Kiểm tra cả 6 nơi đang dùng chung Word Quest để bảo đảm cùng một logic và không có cấu hình lệch.
- Kiểm tra dữ liệu thiếu ví dụ, thiếu phiên âm, ít từ gây nhiễu, không có micro và bộ lọc chỉ còn ít từ.
- Kiểm tra trả lời đúng, trả lời sai, bài ôn bù, quay lại xem từ, rời trang rồi tiếp tục, hoàn tất chặng và mở chặng kế tiếp.
- Kiểm tra tiếng Trung nhập Hán tự, câu CJK được che đúng; tiếng Nhật giữ romaji; âm thanh dừng/chuyển đúng giữa các từ.
- Chạy kiểm tra TypeScript và xem thực tế trên máy tính lẫn điện thoại cho ít nhất IELTS, HSK và Nhật; ba môn còn lại được kiểm tra bằng luồng dùng chung và cấu hình riêng.

## Phạm vi kỹ thuật
- Tái cấu trúc bộ điều phối trong Word Quest từ hàng đợi xen kẽ theo nhóm 3 từ sang hàng đợi tuần tự theo từng từ.
- Giữ nguyên giao diện Set/chặng, nguồn dữ liệu, mã từ, khóa lưu trữ và cơ chế đánh dấu thành thạo.
- Cập nhật nội dung hướng dẫn trên màn hình để mô tả đúng quy trình mới.

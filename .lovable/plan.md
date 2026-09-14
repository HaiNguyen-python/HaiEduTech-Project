# Hoàn thiện lyrics cho toàn bộ thư viện bài hát

## Mục tiêu

Rà soát toàn bộ 49 bài hát của 4 môn Anh, Trung, Phần Lan và Việt Nam. Mỗi bài còn lại trong thư viện phải có lời đầy đủ theo một phiên bản chuẩn xác định, bản dịch đầy đủ từng dòng và dữ liệu luyện tập khớp với lời bài hát.

Theo lựa chọn đã chốt, các bài còn bản quyền sẽ được thay bằng bài dân gian, đồng dao, quốc ca lịch sử hoặc tác phẩm đã thuộc phạm vi công cộng, thay vì sao chép toàn bộ lời có bản quyền.

## Hiện trạng đã xác minh

- Dữ liệu đang nằm trong bảng `language_songs` và được hiển thị tại `/songs/english`, `/songs/chinese`, `/songs/finnish`, `/songs/vietnamese`.
- Có 49 bài: 13 tiếng Anh, 12 tiếng Trung, 12 tiếng Phần Lan và 12 tiếng Việt.
- Mỗi bài hiện chỉ có 4-18 dòng; trung bình lần lượt là 10,8 / 8,8 / 8,7 / 8,3 dòng, nên nhiều bài mới là đoạn trích.
- 20 bài đang được đánh dấu không thuộc phạm vi công cộng: Anh 5, Trung 6, Phần Lan 4, Việt Nam 5.
- Lyrics dùng cấu trúc từng dòng gồm lời gốc, bản dịch và chú giải từ; bài tiếng Trung cần Pinyin.
- Quiz điền từ tham chiếu trực tiếp theo vị trí dòng và vị trí từ, nên mọi thay đổi lyrics phải cập nhật quiz cùng lúc.
- Karaoke hiện chạy tuần tự 4 giây mỗi dòng và chưa đồng bộ với thời gian thực của video.
- Chưa có bộ kiểm tra tự động dành riêng cho dữ liệu bài hát.

## Phạm vi triển khai

### 1. Xác minh quyền sử dụng và phiên bản chuẩn

- Kiểm tra lại quyền sử dụng của cả 49 bài từ nguồn đáng tin cậy, không chỉ dựa vào cờ dữ liệu hiện tại.
- Với bài public domain hoặc truyền thống, chọn một phiên bản chuẩn phù hợp với video đang dùng.
- Thay toàn bộ bài còn bản quyền bằng bài tự do cùng ngôn ngữ, độ khó và mục tiêu học tập tương đương.
- Giữ nguyên số lượng bài của từng môn và thứ tự hiển thị; giữ UUID hiện tại để không tạo liên kết hỏng.

### 2. Hoàn thiện lời và bản dịch

- Điền đầy đủ mọi đoạn của phiên bản đã chọn, gồm verse, chorus và phần lặp thực sự xuất hiện trong bản thu; không dùng dấu rút gọn như `...`, “repeat chorus” hoặc bỏ giữa bài.
- Mỗi dòng có bản dịch tiếng Việt tự nhiên, sát nghĩa và nhất quán.
- Bài tiếng Trung có Hanzi + Pinyin đầy đủ; chuẩn hóa dấu thanh và khoảng cách.
- Bổ sung chú giải từ trọng tâm, IPA hoặc Pinyin khi phù hợp, nhưng không làm thay đổi cách hiển thị hiện tại.

### 3. Đồng bộ video, hình và nội dung học

- Kiểm tra từng YouTube ID còn hoạt động, đúng bài, đúng ngôn ngữ và đúng phiên bản lời.
- Với bài được thay, cập nhật tiêu đề, nghệ sĩ/nguồn truyền thống, độ khó, ghi chú văn hóa và hình minh họa phù hợp.
- Làm lại `core_vocab` và `blanks_quiz` theo lyrics mới.
- Tính lại toàn bộ `lineIndex`, `wordIndex`; bảo đảm đáp án thực sự tồn tại trong đúng dòng và hiển thị đúng với tiếng Trung không cách từ.

### 4. Nâng độ tin cậy của karaoke

- Cho mỗi dòng thời lượng phù hợp hơn thay vì mặc định mọi dòng đều 4 giây.
- Khi bắt đầu, dừng hoặc chạy lại karaoke, trạng thái phải trở về đúng vị trí và không vượt quá số dòng.
- Giữ nút mở YouTube dự phòng cho video không cho nhúng.

### 5. Bộ kiểm duyệt tự động

Tạo audit chuyên biệt và cho kiểm tra thất bại nếu có:

- Bài trống hoặc ít dòng bất thường so với phiên bản chuẩn.
- Dòng thiếu bản dịch; tiếng Trung thiếu Pinyin.
- Dấu rút gọn hoặc chỉ dẫn lặp thay cho lời thật.
- Quiz trỏ sai dòng, sai từ hoặc đáp án không tồn tại.
- Trùng tên bài trong cùng ngôn ngữ.
- Video chết, sai bài hoặc sai ngôn ngữ.
- Bài không có bằng chứng đủ điều kiện hiển thị toàn bộ lời.

## Chi tiết kỹ thuật

- Cập nhật dữ liệu trong `language_songs` bằng thao tác dữ liệu, không thay đổi hợp đồng đọc hiện tại nếu không cần thiết.
- Mở rộng kiểu dòng lyric với thời lượng tùy chọn để karaoke có thể dùng timing riêng; dữ liệu cũ vẫn có fallback an toàn.
- Thêm script audit có báo cáo theo ngôn ngữ, tên bài, số dòng và lỗi cụ thể.
- Không thay route, bố cục thư viện, ID bài, cơ chế bilingual hay cách người học mở bài.

## Kiểm tra hoàn tất

- Chạy audit cho đủ 49 bài và xác nhận không còn lỗi lyrics, bản dịch, Pinyin, vocab, quiz hoặc video.
- Kiểm tra trực tiếp cả 4 trang bài hát trên desktop và mobile.
- Mở ít nhất một bài dễ và một bài dài ở mỗi ngôn ngữ; kiểm tra Lyrics, Karaoke, Vocab, Điền từ, Culture và YouTube.
- Xác nhận không tràn ngang, chữ không chồng lấn và karaoke kết thúc đúng dòng cuối.
- Chạy TypeScript, lint và các test liên quan trước khi bàn giao.
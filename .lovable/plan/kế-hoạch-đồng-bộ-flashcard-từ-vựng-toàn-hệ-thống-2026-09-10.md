# Kế hoạch đồng bộ flashcard từ vựng toàn hệ thống

## Mục tiêu

Đưa chế độ Flashcard của các ngân hàng từ vựng về cùng trải nghiệm như IELTS Vocabulary: mỗi lần chỉ hiển thị một thẻ lớn, dễ tập trung, có lật mặt, tiến độ và điều hướng rõ ràng trên cả máy tính lẫn điện thoại.

Phạm vi đã thống nhất chỉ gồm các ngân hàng từ vựng chính:

1. IELTS
2. TOEIC
3. SAT
4. PTE
5. HSK / Tiếng Trung
6. Tiếng Việt
7. Tiếng Phần Lan
8. Tiếng Thụy Điển
9. Tiếng Nhật

Không thay đổi flashcard dành cho trẻ em, bộ thủ Hán tự, Word Quest, Daily Mission hoặc các công cụ SRS chuyên biệt.

## Hiện trạng đã xác minh

- IELTS đã có mẫu chuẩn một thẻ lớn trên màn hình, gồm chọn số thẻ, bộ đếm, thanh tiến độ, lật 3D, nút Trước/Lật/Sau và phím tắt.
- PTE đã hiển thị từng thẻ, nhưng còn thiếu một số điều khiển và cách trình bày thống nhất với IELTS.
- TOEIC, SAT, HSK, Tiếng Việt và Tiếng Phần Lan đang hiển thị nhiều flashcard nhỏ theo lưới.
- Tiếng Thụy Điển đang mở rộng từng thẻ tại chỗ thay vì dùng bộ thẻ một-thẻ-mỗi-lần.
- Tiếng Nhật đã có bộ thẻ riêng và cơ chế ôn tập riêng, nhưng giao diện và điều khiển chưa đồng nhất hoàn toàn với IELTS.
- Dữ liệu giữa các môn khác nhau: HSK dùng Hán tự và pinyin; Nhật dùng kana/romaji; các môn châu Âu có IPA; một số môn có bản dịch, ví dụ, từ đồng nghĩa, cụm từ hoặc bài luyện nói riêng.

## Kế hoạch triển khai

### 1. Tạo khung flashcard dùng chung

- Tách trải nghiệm một-thẻ-mỗi-lần của IELTS thành một khung dùng chung cho các ngân hàng từ vựng.
- Khung chung bao gồm:
  - Chọn 10, 20, 30, 50, 100, 200 hoặc tất cả từ đang lọc.
  - Bộ đếm `thẻ hiện tại / tổng số thẻ`.
  - Thanh tiến độ.
  - Một thẻ lớn có mặt trước và mặt sau.
  - Nút Thẻ trước, Lật thẻ, Thẻ sau.
  - Phím mũi tên trái/phải và Space trên máy tính.
  - Tự đặt lại mặt thẻ khi đổi từ, đổi bộ lọc hoặc đổi kích thước bộ thẻ.
  - Dừng âm thanh đang phát trước khi chuyển thẻ.
  - Trạng thái rỗng rõ ràng khi bộ lọc không có từ.
- Giữ kích thước ổn định để nội dung không làm giật hoặc tràn khung; mặt sau được cuộn bên trong nếu nội dung dài.
- Dùng các nút và màu theo hệ thống giao diện hiện tại, đồng thời giữ nhận diện riêng của từng môn.

### 2. Chuẩn hóa nội dung hai mặt nhưng không làm mất dữ liệu môn học

- Mặt trước ưu tiên: hình minh họa nếu có, từ chính, IPA/pinyin/romaji/kana, cấp độ, loại từ và chủ đề.
- Mặt sau ưu tiên: nghĩa tiếng Việt và tiếng Anh theo dữ liệu sẵn có, câu ví dụ, bản dịch câu ví dụ, từ đồng nghĩa, cụm từ và ghi chú chuyên biệt.
- Tạo lớp chuyển đổi dữ liệu cho từng môn thay vì ép mọi môn dùng cùng một cấu trúc dữ liệu.
- Với HSK, giữ Hán tự, pinyin, phát âm tiếng Trung và thông tin cần thiết cho việc học chữ.
- Với Nhật, giữ lựa chọn bộ từ/kanji và cơ chế đánh giá ghi nhớ hiện có.
- Với Thụy Điển, giữ luyện nói và viết lại câu trong mặt sau của thẻ thay vì loại bỏ.
- Với các môn chỉ có nội dung tiếng Anh như PTE, không tạo bản dịch giả hoặc trường trống gây rối mắt.

### 3. Chuyển từng ngân hàng sang một thẻ duy nhất

- IELTS: chuyển sang khung dùng chung mà không đổi hành vi hiện tại.
- TOEIC, SAT, HSK, Tiếng Việt, Tiếng Phần Lan: thay lưới nhiều thẻ bằng một bộ thẻ dùng toàn bộ danh sách đang lọc.
- PTE: bổ sung chọn số thẻ, thanh tiến độ, phím tắt và bố cục thống nhất.
- Tiếng Thụy Điển: chuyển danh sách mở rộng thành một thẻ lớn, giữ các bài luyện nói/viết lại.
- Tiếng Nhật: đồng bộ bố cục, tiến độ và điều hướng, nhưng giữ nguyên lựa chọn Vocabulary/Kanji cùng lịch sử ôn tập.
- Trong chế độ Flashcard, không dùng phân trang danh sách; bộ thẻ sẽ chạy trên tập từ sau khi áp dụng tìm kiếm, cấp độ và chủ đề.
- Khi quay lại chế độ danh sách, cách phân nhóm và phân trang hiện tại vẫn được giữ nguyên.

### 4. Bảo toàn tiến độ và hành vi học tập

- Giữ nguyên khóa lưu trữ, tên môn, trạng thái “đã thuộc”, dữ liệu đám mây và điểm tiến độ hiện có.
- Không đổi đường dẫn trang, ID từ, cấu trúc dữ liệu nguồn hoặc logic của Quiz, Word Quest, Daily Mission và SRS.
- Nút đánh dấu đã thuộc trên thẻ dùng đúng cơ chế hiện tại của từng môn.
- Việc lật thẻ đã thuộc chỉ ghi nhận lượt ôn ở những môn hiện đã có cơ chế ghi nhận tương ứng; không tự ý tăng điểm hoặc tạo dữ liệu mới.
- Không lưu vị trí thẻ qua lần tải lại trong đợt này, vì IELTS hiện cũng không lưu vị trí và yêu cầu là đồng bộ giao diện/hành vi hiện tại.

### 5. Rà soát kỹ thuật và trải nghiệm

- Kiểm tra TypeScript và các bài kiểm tra liên quan.
- Kiểm tra từng ngân hàng từ vựng trên màn hình máy tính và điện thoại:
  - Chỉ có đúng một thẻ hiển thị.
  - Lật thẻ, âm thanh, Trước/Sau, phím tắt và đánh dấu đã thuộc hoạt động.
  - Bộ lọc cập nhật đúng bộ thẻ và đưa người học về thẻ đầu tiên.
  - Nội dung dài, chữ Hán, tiếng Việt có dấu, IPA, pinyin và romaji không bị tràn.
  - Không làm mất tiến độ khi chuyển giữa Flashcard và các chế độ học khác.
- Cập nhật bài rà soát tự động để phát hiện trang từ vựng nào quay lại dạng lưới nhiều flashcard trong tương lai.
- Cập nhật danh sách công việc dự án và chỉ đánh dấu hoàn tất sau khi các kiểm tra trên đạt yêu cầu.

## Kết quả bàn giao

Toàn bộ 9 ngân hàng từ vựng sẽ có một trải nghiệm Flashcard đồng nhất theo IELTS: một thẻ lớn, tập trung, điều hướng rõ, hỗ trợ âm thanh và giữ đầy đủ đặc trưng học tập của từng ngôn ngữ.

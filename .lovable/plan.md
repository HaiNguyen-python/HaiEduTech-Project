# Chinese Reading Practice: hình minh họa, thu gọn HSK 1, +25 bài đọc

## Mục tiêu
1. Thêm 1 hình minh họa chính cho khu vực đầu trang Chinese Reading Practice.
2. Ô HSK 1 mặc định thu gọn khi mới vào trang (tất cả cấp độ đều gập).
3. Rà soát toàn bộ nội dung phần này (chữ Hán, pinyin, bản dịch, từ mới, câu hỏi, đáp án).
4. Thêm 5 bài đọc mới cho mỗi cấp độ HSK 1-5 (25 bài mới, tổng 50 bài).

## 1. Hình minh họa đầu trang
- Tạo một tranh minh họa chibi ngang (học sinh đọc sách tiếng Trung, bàn học, đèn lồng nhẹ) theo bảng màu sáng của thương hiệu: nền #F8FAFC, Royal Blue, Emerald, Warm Gold.
- Đặt cạnh phần tiêu đề: desktop chia hai cột (chữ bên trái, hình bên phải), mobile hình nằm dưới phần mô tả, tỷ lệ cố định để không nhảy layout.
- Ảnh có alt mô tả, tải sớm (không lazy vì nằm đầu trang), có nền dự phòng nếu ảnh lỗi.

## 2. Trạng thái thu gọn ban đầu
- Bỏ trạng thái mở sẵn của HSK 1; khi vào trang mọi cấp độ đều gập, người học tự chọn.
- Từng bài đọc bên trong vẫn gập như hiện tại (nút "Đọc bài / Thu gọn").

## 3. Rà soát nội dung hiện có
- Kiểm tra từng bài: số dòng chữ Hán, pinyin và bản dịch phải khớp nhau 1-1.
- Kiểm tra đáp án đúng của mỗi câu hỏi thật sự suy ra được từ bài đọc; sửa câu sai hoặc mơ hồ.
- Kiểm tra từ mới xuất hiện trong bài, pinyin có dấu đúng, không trùng lặp trong cùng bài.
- Kiểm tra emoji tiêu đề: một bài hiện đang để ký tự xuống dòng thay vì emoji, sẽ gán emoji phù hợp.
- Kiểm tra độ khó theo cấp: HSK 1 câu cực ngắn, HSK 5 nhiều đoạn, từ vựng nâng cao.
- Cập nhật câu mô tả "25 bài đọc" thành số bài thực tế và giữ nội dung song ngữ.
- Không dùng dấu gạch dài, giữ UTF-8 chuẩn cho tiếng Việt.

## 4. Thêm 25 bài đọc mới
5 bài mỗi cấp, chủ đề mới không trùng bài cũ, ví dụ:
- HSK 1: lớp học, con số và tuổi, món ăn yêu thích, đi tàu, chào bạn mới.
- HSK 2: đi chợ, mượn sách thư viện, thời tiết bốn mùa, gọi điện cho bà, tập thể dục buổi sáng.
- HSK 3: chuyển nhà, hỏi đường, đặt phòng khách sạn, sở thích âm nhạc, giữ gìn sức khỏe khi học thi.
- HSK 4: làm việc nhóm, quản lý thời gian, du học, thói quen tiêu dùng, cân bằng học và nghỉ.
- HSK 5: đô thị hóa, học tập suốt đời, kinh tế số, bảo tồn phương ngữ, sức khỏe tinh thần.

Mỗi bài mới đủ: id riêng, emoji, tiêu đề Anh + Việt, chữ Hán, pinyin theo dòng, bản dịch tiếng Việt, tối thiểu 5 từ mới, 3 câu hỏi trắc nghiệm 4 lựa chọn kèm giải thích song ngữ. Bổ sung bản câu hỏi tiếng Trung tương ứng để chế độ tiếng Trung hiển thị đầy đủ.

## Chi tiết kỹ thuật
- Dữ liệu mới nằm trong file mở rộng riêng (ví dụ `src/data/chineseReadingExpansion2.ts`) và ghép vào từng level trong `chineseReadingLevels`, giữ nguyên `ChineseReadingPassage` interface.
- Bổ sung khóa `"<id>#<index>"` vào `src/data/chineseReadingQuestionsZh.ts` cho 25 bài mới.
- `src/pages/ChineseReading.tsx`: đổi state mở ban đầu thành rỗng, thêm khối hình minh họa đầu trang.
- Ảnh minh họa tạo trong `src/assets` và import trực tiếp.
- Bảo toàn route `/chinese/reading`, toàn bộ id bài cũ, TTS `playChineseTts`, hành vi Pinyin/dịch, cấu trúc accordion.
- Kiểm thử: thêm test dữ liệu (id không trùng, số dòng Hán/pinyin/dịch khớp, mỗi bài đủ 3 câu hỏi với chỉ số đáp án hợp lệ, mỗi cấp đủ 10 bài, mọi câu hỏi có bản tiếng Trung), chạy vitest, ESLint, `bunx tsgo --noEmit`, và kiểm tra Playwright desktop 1280x1800 + mobile 390x844 (không tràn, không lỗi console, mở/gập hoạt động).

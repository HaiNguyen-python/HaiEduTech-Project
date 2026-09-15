# Nâng cấp Chinese Reading Practice: minh họa từng bài và mở rộng nội dung

## Mục tiêu
1. Thêm một hình minh họa chính cho khu vực đầu trang Chinese Reading Practice.
2. Thêm hình minh họa theo đúng chủ đề ngay tại tiêu đề của từng bài đọc.
3. Mặc định thu gọn toàn bộ cấp độ khi mới vào trang, gồm HSK 1.
4. Rà soát toàn bộ chữ Hán, Pinyin, bản dịch, từ mới, câu hỏi và đáp án.
5. Thêm 5 bài mới cho mỗi cấp HSK 1-5, nâng tổng số từ 25 lên 50 bài.

## 1. Hình minh họa đầu trang
- Tạo một tranh chibi ngang về học sinh đọc sách tiếng Trung, theo bảng màu sáng HaiEduTech: Royal Blue, Emerald và Warm Gold.
- Đặt cạnh tiêu đề trên màn hình lớn và dưới phần giới thiệu trên điện thoại.
- Giữ tỷ lệ ảnh ổn định, có mô tả ảnh và trạng thái dự phòng nếu ảnh không tải được.

## 2. Hình minh họa tại tiêu đề từng bài
- Thay hình chibi cấp độ đang lặp lại trên mọi bài bằng hình phù hợp với chủ đề riêng của bài, ví dụ gia đình, trường học, ẩm thực, du lịch, sức khỏe, công nghệ và văn hóa.
- Đặt hình cạnh tiêu đề trong trạng thái thu gọn; khi mở bài, hình và tiêu đề vẫn giữ vị trí rõ ràng.
- Dùng thư viện minh họa giáo dục chibi hiện có để giữ phong cách đồng nhất và tải nhanh; bổ sung ánh xạ chủ đề tiếng Trung cho cả 50 bài.
- Có mô tả ảnh song ngữ, khung hình ổn định và hình dự phòng khi không xác định được chủ đề hoặc ảnh lỗi.
- Trên điện thoại, ảnh thu nhỏ hợp lý để tiêu đề và nút mở bài không bị ép hoặc tràn.

## 3. Trạng thái thu gọn
- Khi mới vào trang, HSK 1-5 đều thu gọn; không cấp độ nào tự mở.
- Từng bài bên trong tiếp tục mặc định thu gọn với nút **Đọc bài / Thu gọn**.
- Giữ nguyên Pinyin, bản dịch, TTS, làm bài và chấm điểm khi mở bài.

## 4. Rà soát nội dung hiện có
- Kiểm tra số dòng chữ Hán, Pinyin và bản dịch khớp nhau 1-1.
- Kiểm tra Pinyin có dấu, bản dịch tự nhiên và từ mới thực sự xuất hiện trong bài.
- Kiểm tra mỗi đáp án đúng suy ra rõ ràng từ bài đọc; sửa câu mơ hồ hoặc sai.
- Thay ký tự xuống dòng đang nằm trong trường emoji của bài **My Family** bằng biểu tượng phù hợp.
- Kiểm tra độ khó tăng dần từ HSK 1 đến HSK 5 và loại bỏ nội dung trùng chủ đề không cần thiết.
- Cập nhật phần giới thiệu từ 25 thành 50 bài, giữ nội dung song ngữ và không dùng dấu gạch dài.

## 5. Thêm 25 bài đọc mới
- Thêm 5 bài cho mỗi cấp HSK 1-5, với chủ đề không trùng các bài hiện có.
- Mỗi bài gồm: ID riêng, tiêu đề Anh - Việt, hình/biểu tượng chủ đề, chữ Hán, Pinyin theo dòng, bản dịch tiếng Việt, ít nhất 5 từ mới và 3 câu hỏi trắc nghiệm có giải thích song ngữ.
- Bổ sung đầy đủ bản câu hỏi và lựa chọn tiếng Trung để chế độ hiện tại không phải rơi về nội dung tiếng Anh.
- Mức độ dài và từ vựng được điều chỉnh theo từng cấp HSK.

## 6. Kiểm tra hoàn thiện
- Thêm kiểm tra tự động cho ID duy nhất, 10 bài mỗi cấp, 50 bài tổng cộng, số dòng khớp, câu hỏi đủ lựa chọn, đáp án hợp lệ và bản tiếng Trung đầy đủ.
- Kiểm tra ánh xạ minh họa trả về hình và mô tả hợp lệ cho mọi bài.
- Chạy kiểm tra TypeScript, lint và các bài kiểm thử liên quan.
- Kiểm tra trực tiếp desktop và mobile: hình đầu trang, hình từng bài, thu gọn HSK 1, mở/gập bài, Pinyin, bản dịch, TTS, câu hỏi và không tràn ngang.

## Chi tiết kỹ thuật
- Mở rộng kiểu dữ liệu bài đọc để hỗ trợ minh họa theo bài hoặc dùng helper ánh xạ ổn định từ ID/tiêu đề/chủ đề.
- Dữ liệu 25 bài mới đặt trong file mở rộng riêng và ghép vào từng cấp, không thay ID bài cũ.
- Bổ sung câu hỏi tiếng Trung theo khóa `passageId#index` hiện có.
- Bảo toàn route `/chinese/reading`, hành vi TTS và toàn bộ dữ liệu hiện tại sau khi sửa lỗi nội dung.

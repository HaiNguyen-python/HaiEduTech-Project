# Rà soát và thay hình minh họa từ vựng IELTS

## Kết quả mong muốn
- Mỗi từ/cụm từ trong kho IELTS có ảnh minh họa riêng thể hiện đúng nghĩa đang dạy. Ví dụ `commerce` phải gợi rõ hoạt động mua bán, không còn biểu tượng quyển sách chung.
- Ảnh nhất quán giữa thẻ học, danh sách từ và bước học từ trong Word Quest. Giữ nguyên từ, phiên âm, nghĩa, phát âm và tiến độ.

## Các bước
1. Kiểm kê toàn bộ 1.800 mục từ IELTS, đối chiếu từ, nghĩa tiếng Anh/Việt và ví dụ; lập danh sách ảnh theo chính **từ và nghĩa trong ngữ cảnh**, không suy ra từ những từ ngẫu nhiên trong câu định nghĩa.
2. Tạo bộ ảnh minh họa riêng theo nghĩa cho từng mục từ; với khái niệm trừu tượng, dùng tình huống hoặc sơ đồ trực quan cụ thể thay vì ảnh trang trí chung. Rà soát những từ đa nghĩa và từ ghép để ảnh không diễn giải sai. Chia thành các lô có thể kiểm tra, ưu tiên các từ đang gặp ảnh sai hoặc biểu tượng chung; chỉ đánh dấu hoàn tất khi toàn bộ kho được xử lý.
3. Lưu ảnh và bảng đối chiếu một-một theo khóa từ IELTS; cho thẻ học, danh sách và Word Quest dùng cùng nguồn. Không dùng ảnh cũ trong bộ nhớ trình duyệt để ghi đè ảnh đã duyệt; nếu ảnh tải lỗi, hiển thị biểu tượng trung tính thay vì một hình sai nghĩa. Không thay đổi cách hiển thị của các môn khác.
4. Thêm kiểm tra tự động để phát hiện từ thiếu ảnh, đường dẫn không tồn tại, ảnh gắn sai khóa hoặc tái sử dụng ngoài chủ ý. Duyệt trực quan các lô ảnh đối chiếu với từ và nghĩa; kiểm tra trên điện thoại và máy tính, cả ảnh ví dụ `commerce`, ảnh tải lỗi và Word Quest.

## Chi tiết kỹ thuật
- Hiện `ieltsVocabData` ghép bộ gốc và 10 bộ mở rộng rồi lọc trùng thành 1.800 từ. `VocabIllustration` dùng `useVocabIllustration`; hook ưu tiên khóa cũ `vocab-img-<word>` trong localStorage, nếu không có thì `resolveVocabEmoji(definition, category)`. Cách dò từ trong định nghĩa có thể chọn sai biểu tượng; `commerce` hiện rơi về 📖. Word Quest dùng trực tiếp cùng hàm emoji, chưa dùng ảnh từ thẻ học.
- Tách ánh xạ ảnh IELTS khỏi `vocabEmojiMap` dùng chung các ngôn ngữ khác. Không bật tính năng sinh ảnh khi người học mở trang; chỉ hiển thị ảnh đã tạo và được duyệt.
- Kiểm tra TypeScript, script kiểm kê ảnh, rồi xác nhận hiển thị thực tế. Việc tạo và duyệt 1.800 ảnh là hạng mục nội dung lớn, thực hiện theo lô và báo rõ mức độ phủ trước khi tuyên bố hoàn tất.

# Đưa sách "999 lá thư gửi cho chính mình" vào phần Typing tiếng Trung

## Về cuốn sách
- PDF dài 306 trang, có 2 tập. Mỗi lá thư gồm 3 phần: bản tiếng Việt, Hán tự và Pinyin.
- Ước tính có khoảng 700 lá thư (tập 2 bắt đầu từ thư 565). Phần lớn các thư dài 1 đến 4 câu.
- Lưu ý bản quyền: đây là sách đã xuất bản (Thanh Niên / VanVietBooks). Nên chỉ dùng cho học viên đã đăng nhập, ghi rõ tên tác giả và nguồn, không mở công khai.

## Học viên sẽ thấy gì
Trong tab "Gõ chữ" có thêm một chế độ mới: **"999 lá thư"**, đặt cạnh bài gõ thường.
1. **Đọc**: hiện từng lá thư với Hán tự, Pinyin (bật/tắt được) và nghĩa tiếng Việt, có nút nghe đọc tiếng Trung.
2. **Gõ**: gõ lại lá thư theo từng câu. Chữ đúng hiện màu xanh, sai màu đỏ. Có số chữ/phút và độ chính xác.
3. **Từ vựng & Hán tự**: mỗi lá thư có 5 đến 8 từ khóa, kèm Pinyin, nghĩa và cấp HSK. Bấm vào chữ để xem thứ tự nét viết (dùng lại phần nét bút đã có).
4. **Ôn nhanh**: sau khi gõ xong có 3 câu hỏi ngắn: điền từ còn thiếu, chọn nghĩa và ghép Pinyin.
- Lọc theo độ khó (HSK 1-2 / 3-4 / 5-6, tính tự động từ độ dài và từ vựng) và theo tập. Thư tiếp theo luôn chọn ngẫu nhiên, không lặp lại. Phím Enter dùng để chấm rồi sang thư tiếp.
- Tiến độ được lưu lại: số thư đã gõ, kỷ lục tốc độ, các từ đã thuộc. Kết quả hiện trong "Your Performance" của tiếng Trung.

## Làm theo từng đợt (vì nội dung lớn)
- **Đợt 1**: tách toàn bộ 306 trang thành dữ liệu thô. Mỗi thư gồm số thư, tiếng Việt, Hán tự và Pinyin. Sau đó kiểm tra để báo cáo các thư bị thiếu phần hoặc lỗi chữ do chuyển đổi.
- **Đợt 2**: làm giao diện "999 lá thư" và đưa vào 100 thư đầu, có đủ từ vựng và câu hỏi để thầy xem thử.
- **Đợt 3 trở đi**: thêm khoảng 150 đến 200 thư mỗi đợt cho tới khi đủ cả sách. Mỗi đợt đều chạy kiểm tra trước khi đưa lên.
- Các lỗi thấy trong bản gốc (ví dụ "Rénsēng" phải là "Rénshēng", "dūhuì") sẽ được sửa và ghi lại trong báo cáo.

## Kiểm tra chất lượng
Script kiểm tra phải báo 0 lỗi trên các mục sau: trùng số thư, thiếu một trong 3 phần, Pinyin không khớp với số chữ Hán, từ khóa không có trong thư, có dấu gạch dài "—".

## Chi tiết kỹ thuật
- Dữ liệu tách bằng `pdftotext` cùng một script trong /tmp, rồi xuất ra `src/data/chineseLetters/vol1-*.ts` và `vol2-*.ts`, mỗi file khoảng 100 thư. Các file này được tải theo từng phần (lazy import) để trang không bị chậm.
- Pinyin từng chữ và cấp HSK được sinh lại bằng `pinyin-pro` cùng danh sách HSK đã có; chỉ dùng Pinyin của sách để đối chiếu.
- Thành phần mới: `src/components/chineseWriting/ZhLetterTyping.tsx`, dùng lại logic của `ZhTypingTask`, `randomPicker`, `HanziStrokeOrder` và `chineseTts`.
- Hoạt động được ghi dưới domain `chinese`, loại `zh_writing_letters`. Không thay đổi cơ sở dữ liệu, không gọi AI.
- Script kiểm tra: `scripts/audit_chinese_letters.ts`.

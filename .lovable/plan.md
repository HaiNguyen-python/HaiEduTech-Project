# Nút Next cạnh nút Slow + rà soát lại Word Quest và các mục từ vựng

## 1. Đặt nút Next ngay cạnh Listen / Slow

Trong thẻ học từ của Word Quest, nút "Tiếp tục / Next" hiện nằm tách riêng bên dưới thẻ. Sẽ đưa nút này vào cùng hàng với Listen và Slow, nằm ngay bên phải Slow:

```text
[ Nghe ]  [ Nghe chậm ]  [ Tiếp tục > ]
```

- Next là nút chính (màu thương hiệu) để vẫn nổi bật hơn hai nút nghe.
- Trên điện thoại, hàng nút tự xuống dòng và luôn căn giữa, chữ không bị dính nhau.
- Bỏ khối nút Next cũ bên dưới thẻ để màn hình gọn hơn.
- Vì Word Quest là thành phần dùng chung, thay đổi này áp dụng cho mọi môn: IELTS/English, TOEIC, SAT, PTE, tiếng Việt, tiếng Trung, tiếng Nhật, tiếng Phần Lan, tiếng Thụy Điển.

## 2. Rà soát lại Word Quest

Kiểm tra trên các môn tiêu biểu (IELTS, HSK, Nhật, Phần Lan, Thụy Điển, Việt):

- Vòng lặp: xem đầy đủ 1 từ → 5 bài tập của chính từ đó → sang từ kế tiếp.
- Đủ 5 dạng khác nhau cho mỗi từ; từ không có câu ví dụ hoặc máy không có micro thì tự thay dạng khác.
- Trả lời sai chỉ thêm tối đa một bài ôn bù, không lặp vô hạn.
- Tiếng Trung nhập Hán tự, tiếng Nhật nhập romaji, các tiếng khác giữ đúng dấu.
- Âm thanh dừng đúng khi chuyển từ hoặc chuyển bài.
- Tiến độ chặng, huy chương, nút tiếp tục dở dang và số phần trăm hiển thị đúng sau khi rời trang rồi vào lại.

## 3. Rà soát các chức năng khác trong mục từ vựng

- Vocabulary: bộ lọc trình độ/chủ đề, tìm kiếm, số kết quả, ngôi sao thành thạo.
- Flashcard: một thẻ trên màn hình, chọn số thẻ, lật thẻ, phím tắt, phát âm.
- Daily Mission: số từ đến hạn, các dạng bài, tự chấm, vòng ôn từ còn khó, dải 14 ngày.
- Practice / Vocab Arena: câu hỏi hợp lệ, đáp án và phương án nhiễu không lệch, không lộ đáp án.
- Memory Brain (nơi có): số nơ-ron và nhãn từ đúng theo môn.
- Chữ luôn đọc được khi trỏ chuột vào, không bị nhòe trên nền sáng.

## Ghi chú kỹ thuật

- Sửa duy nhất phần giao diện thẻ học trong `src/components/vocab/WordQuest.tsx` (gộp hàng nút, xóa khối nút phía dưới). Không đổi logic bài tập, khóa lưu tiến độ hay dữ liệu từ.
- Kiểm tra: `bunx tsgo --noEmit`, script audit hiện có, và chạy thử trên máy tính lẫn điện thoại cho ít nhất IELTS, HSK, Nhật.

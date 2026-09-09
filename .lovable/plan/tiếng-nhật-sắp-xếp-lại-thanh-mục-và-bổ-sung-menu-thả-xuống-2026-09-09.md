# Tiếng Nhật: sắp xếp lại thanh mục và bổ sung menu thả xuống

## 1. Sắp xếp lại thanh mục trong trang Tiếng Nhật

Hiện có 21 mục nằm dàn thành 3 hàng không theo nhóm nên rất rối. Sẽ chia thành 5 nhóm rõ ràng, mỗi nhóm một hàng có nhãn nhỏ ở đầu:

- Nền tảng: Tổng quan, Bảng chữ, Chào hỏi, Số & Giờ
- Từ vựng & Kanji: Từ vựng, Kanji, Flashcard, Word Quest, Nhiệm vụ hằng ngày
- Ngữ pháp & Cấu trúc: Ngữ pháp, Chia động từ, Lượng từ, Kính ngữ
- Kỹ năng: Hội thoại, Luyện đọc, Luyện nghe, Chính tả kana, Speaking Coach
- Kiểm tra & Văn hoá: Ôn tập, Đề JLPT, Văn hoá & Du học

Cách thể hiện:
- Trên máy tính: mỗi nhóm là một hàng riêng, nhãn nhóm nhỏ màu hồng bên trái, các mục vẫn là chip bấm được như hiện nay, mục đang chọn vẫn nổi màu.
- Trên điện thoại: một ô chọn nhóm gọn ở trên, bên dưới chỉ hiện các mục của nhóm đang chọn, cuộn ngang trong nhóm nên không còn 3 hàng chip dày đặc.
- Mục đang mở luôn tự thuộc đúng nhóm khi vào bằng liên kết trực tiếp.

Phần danh sách nút ở tab Tổng quan cũng nhóm lại theo đúng 5 nhóm trên để nhất quán.

## 2. Bổ sung menu thả xuống Tiếng Nhật

Menu hiện chỉ có 10 mục, thiếu nhiều phần đã có trên trang. Cấu trúc mới:

- 🌸 Tổng quan Tiếng Nhật
- 📝 Placement Test & Personalization
- 📚 Chương trình học: Hiragana & Katakana, Chào hỏi & Giao tiếp, Số đếm & Thời gian, Ngữ pháp N5
- 📖 Từ vựng & Kanji: Từ vựng theo chủ đề, Kanji theo nhóm, Flashcard, Word Quest, Nhiệm vụ hằng ngày
- 🔀 Ngữ pháp nâng cao: Chia động từ, Lượng từ, Kính ngữ
- 🎯 Luyện 4 kỹ năng: Hội thoại tình huống, Luyện đọc, Luyện nghe, Chính tả kana, Speaking Coach
- 📝 Kiểm tra & Văn hoá: Ôn tập & Kiểm tra, Đề JLPT, Văn hoá & Du học

Tất cả liên kết dùng đúng địa chỉ tab đã có sẵn nên mở ra đúng phần ngay.

## Chi tiết kỹ thuật

- Sửa `src/pages/Japanese.tsx`: thay mảng `TABS` phẳng bằng cấu hình nhóm, dựng lại phần `TabsList` (nhóm theo hàng ở desktop, chọn nhóm + cuộn ngang ở mobile), nhóm lại lưới nút ở tab Tổng quan. Không đổi `value` của tab, `handleTab`, đồng bộ URL hay bất kỳ `TabsContent` nào.
- Sửa mục `key: "jp"` trong `src/components/Navbar.tsx`: thêm các nhóm mới với `groupLabel` (`ja-vocab`, `ja-grammar`, `ja-skills`, `ja-tests`) và thêm nhãn tương ứng vào khối mapping nhãn flyout.
- Không đổi route, dữ liệu bài học, tiến độ hay backend.

## Kiểm tra

- TypeScript.
- Trình duyệt desktop 1280 và mobile 390: mở từng nhóm, xác nhận mọi mục cũ vẫn bấm được, không có mục nào mất; mở từng liên kết mới trong menu thả xuống và kiểm tra flyout không bị khuất.

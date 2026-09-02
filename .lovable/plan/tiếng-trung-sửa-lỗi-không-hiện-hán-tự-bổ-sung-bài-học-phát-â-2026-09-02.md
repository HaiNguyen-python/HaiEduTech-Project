# Tiếng Trung: sửa lỗi không hiện Hán tự + bổ sung bài học phát âm

## 1. Lỗi "0 results" - không hiện Hán tự lúc mới vào

Nguyên nhân đã xác nhận trong `src/pages/HskVocabulary.tsx`: bộ từ vựng HSK được nạp bất đồng bộ (`import("@/data/hskVocab")` trong `useEffect`), nhưng hàm lọc `filtered` (dòng 578-593) thiếu `hskVocabData` trong danh sách phụ thuộc. Vì vậy sau khi dữ liệu về, danh sách lọc vẫn giữ giá trị rỗng của lần chạy đầu, dẫn tới "0 results" và không thẻ từ nào hiện lên - đúng như ảnh chụp. Chỉ khi người học gõ tìm kiếm hoặc đổi bộ lọc thì từ mới xuất hiện.

Cách sửa:
- Thêm `hskVocabData` vào phụ thuộc của `filtered` để danh sách tự cập nhật khi dữ liệu nạp xong.
- Trong lúc đang nạp, hiện skeleton/spinner "Đang tải từ vựng..." thay vì dòng "0 results" gây hiểu nhầm.
- Chỉ hiện thông báo "không tìm thấy từ" khi dữ liệu đã nạp xong mà bộ lọc thực sự không khớp.
- Rà soát nhanh các mục Chinese khác dùng cùng kiểu nạp động (Flashcard, Practice, SRS, 214 Kangxi Radicals) để chắc chắn không còn chỗ nào bị kẹt ở trạng thái rỗng.

## 2. Bổ sung mục bài học phát âm tiếng Trung

Hiện trong menu Tiếng Trung chỉ có Tone Drill (luyện 4 thanh), chưa có bài học lý thuyết phát âm. Thêm trang mới `/chinese/pronunciation` với tên "🔊 Phát âm Pinyin" đặt trong nhóm HSK/Kỹ năng của menu thả xuống và một thẻ CTA ở trang Tổng quan Tiếng Trung.

Nội dung trang gồm các bài học có thể nghe từng âm:
1. Pinyin là gì - cấu trúc âm tiết: thanh mẫu + vận mẫu + thanh điệu.
2. 21 thanh mẫu (phụ âm đầu) theo nhóm: b p m f / d t n l / g k h / j q x / zh ch sh r / z c s, mỗi âm có ví dụ, mẹo khẩu hình và so sánh với tiếng Việt.
3. Vận mẫu (nguyên âm đơn, kép, âm mũi): a o e i u ü, ai ei ao ou, an en ang eng ong, iu ui un ün...
4. 4 thanh điệu + thanh nhẹ: biểu đồ đường thanh, cặp từ dễ nhầm (mā/má/mǎ/mà).
5. Biến điệu: quy tắc 不/一, hai thanh 3 liền nhau, nhẹ hoá.
6. Các cặp âm người Việt hay sai: zh-z, ch-c, sh-s, j-z, x-s, n-l, ü-u, -n vs -ng.

Mỗi bài học có:
- Nút nghe mẫu (dùng đúng bộ TTS tiếng Trung đang có của trang).
- Bảng âm cuộn ngang được trên mobile, chữ tối thiểu 16px.
- Giải thích song ngữ Việt - Anh, mẹo của thầy Hải.
- Quiz cuối bài tối thiểu 10 câu (nghe chọn pinyin, chọn thanh điệu, phân biệt cặp âm dễ lẫn) và lưu tiến độ theo chuẩn hiện tại của trang.
- Nút chuyển sang Tone Drill và Speaking Coach tiếng Trung để luyện nói tiếp.

## Chi tiết kỹ thuật

- Sửa `src/pages/HskVocabulary.tsx`: phụ thuộc `filtered`, trạng thái loading, thông báo rỗng.
- Dữ liệu mới: `src/data/chinesePronunciation.ts` (khai báo type cho nhóm âm, bài học, quiz).
- Trang mới: `src/pages/ChinesePronunciation.tsx`, đăng ký lazy route `/chinese/pronunciation` trong `src/App.tsx`.
- Menu: thêm mục vào `chineseSubs` trong `src/components/Navbar.tsx`; thêm thẻ trên `src/pages/Chinese.tsx`.
- Âm thanh dùng lại `src/lib/chineseTts.ts`, không thêm phụ thuộc mới. Không thay đổi cơ sở dữ liệu.
- Nội dung dùng dấu gạch ngang thường, không dùng em-dash.

## Thứ tự triển khai

1. Sửa lỗi hiển thị từ vựng HSK và kiểm tra lại trên preview.
2. Dựng dữ liệu phát âm và trang mới.
3. Gắn route, menu, thẻ CTA rồi kiểm tra lại toàn bộ mục Chinese.

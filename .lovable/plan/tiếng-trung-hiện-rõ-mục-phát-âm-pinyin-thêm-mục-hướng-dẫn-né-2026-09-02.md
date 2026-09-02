# Tiếng Trung: hiện rõ mục Phát âm Pinyin + thêm mục Hướng dẫn nét bút

## 1. Vì sao chưa thấy "Phát âm Pinyin"

Mục này đã tồn tại (`/chinese/pronunciation`) nhưng đang nằm bên trong nhóm con "🎓 Lộ trình HSK" của menu Tiếng Trung, nên phải mở nhóm đó mới thấy.

Sửa: đưa "🔊 Phát âm Pinyin" ra cấp ngoài cùng của menu Tiếng Trung, đặt ngay dưới "📚 Tổng quan" cùng với "✍️ Hướng dẫn nét bút" thành một cụm Nền tảng phát âm - chữ viết, cả trên desktop và mobile.

## 2. Mục mới: Hướng dẫn nét bút (`/chinese/strokes`)

Trang học viết chữ Hán, song ngữ Việt - Anh, dùng lại component `HanziStrokeOrder` (đã có, tự tải dữ liệu nét bút và chạy animation) và bộ dữ liệu 214 bộ thủ Kangxi sẵn có.

Nội dung trang:
- Lý thuyết 8 nét cơ bản (ngang, sổ, phẩy, mác, chấm, hất, gập, móc) kèm tên Hán - Việt và ví dụ chữ minh hoạ.
- 7 quy tắc thứ tự nét: trên trước dưới sau, trái trước phải sau, ngang trước sổ sau, ngoài trước trong sau, vào nhà rồi đóng cửa, giữa trước hai bên sau, nét phẩy trước nét mác.
  Mỗi quy tắc có 2-3 chữ mẫu chạy animation nét bút để xem trực tiếp.
- Khu luyện tập: chọn chữ theo nhóm (số đếm, chữ cơ bản, bộ thủ thường gặp, từ HSK1), xem animation, nút xem lại, nút nghe phát âm bằng TTS tiếng Trung sẵn có.
- Ô nhập chữ tự do: học sinh gõ bất kỳ chữ Hán nào để xem nét bút.
- Quiz cuối trang tối thiểu 10 câu về quy tắc thứ tự nét và đếm số nét.
- Lưu tiến độ bằng `safeStorage`, nút chuyển tiếp sang Phát âm Pinyin và HSK Vocabulary.

## Chi tiết kỹ thuật

- Dữ liệu mới: `src/data/chineseStrokes.ts` (8 nét cơ bản, 7 quy tắc, danh sách chữ luyện tập, quiz).
- Trang mới: `src/pages/ChineseStrokeGuide.tsx`, dùng `HanziStrokeOrder`, `playChineseTts`, `useLanguage`, `safeStorage` key `chinese-stroke-progress`.
- Route lazy `/chinese/strokes` trong `src/App.tsx`.
- `src/components/Navbar.tsx`: chuyển mục Pinyin ra ngoài nhóm HSK, thêm mục nét bút.
- `src/pages/Chinese.tsx`: thêm thẻ CTA cho mục nét bút cạnh thẻ phát âm.
- Không đổi cơ sở dữ liệu, không thêm thư viện mới. Dùng gạch ngang thường, chữ tối thiểu 16px, bảng cuộn ngang trên mobile.

## Thứ tự triển khai

1. Sửa vị trí menu để thấy ngay mục Phát âm Pinyin.
2. Dựng dữ liệu nét bút và trang mới.
3. Gắn route, menu, thẻ CTA rồi kiểm tra lại toàn bộ mục Chinese.

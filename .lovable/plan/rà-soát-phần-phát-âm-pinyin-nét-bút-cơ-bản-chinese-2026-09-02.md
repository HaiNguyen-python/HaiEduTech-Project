# Rà soát phần Phát âm Pinyin & Nét bút cơ bản (Chinese)

## Kết quả rà soát

Nội dung học thuật gần như đã đúng: toàn bộ pinyin, dấu thanh, cặp chữ Hán - pinyin - nghĩa, phân tích thanh mẫu/vận mẫu, quy tắc biến điệu (不, 一, thanh 3 + thanh 3), tên 8 nét cơ bản, 7 quy tắc thứ tự nét và số nét của các chữ luyện tập đều chính xác. Tất cả đáp án quiz (10 câu/bài phát âm, 12 câu nét bút) khớp với phần giải thích.

Dữ liệu hoạt hình nét bút cho 4 bộ thủ 亻氵扌讠 đã kiểm tra trên CDN: đều có (HTTP 200), nên phần "Bộ thủ thường gặp" hoạt động bình thường.

Còn 5 lỗi cần sửa:

1. Thẻ chữ ví dụ trong 7 quy tắc thứ tự nét luôn hiển thị "0 nét" (21 chữ đều sai).
2. Phần trạng thái của khung viết chữ ("Đang tải nét bút...", "Đang vẽ nét bút...", "Click để xem lại nét bút") chỉ có tiếng Việt, không dịch khi chọn English.
3. Trang Nét bút không dừng đọc TTS khi rời trang (trang Phát âm đã có).
4. Ví dụ của vận mẫu -un dùng 问 wèn, trong khi cách viết un không xuất hiện trong chữ đó - gây nhầm lẫn.
5. Một số phương án nhiễu trong quiz nghe không phải âm tiết tiếng Trung hợp lệ (jōng, lén, zén, nén).

## Việc sẽ làm

### Sửa hiển thị số nét
Thêm số nét thật cho từng chữ ví dụ trong 7 quy tắc (三 3, 呈 7, 言 7, 他 5, 好 6, 地 6, 十 2, 干 3, 王 4, 月 4, 同 6, 间 7, 国 8, 回 6, 四 5, 小 3, 水 4, 永 5, 人 2, 大 3, 文 4) và dùng số này khi vẽ thẻ chữ, thay cho giá trị 0 cố định.

### Song ngữ hóa khung viết chữ
Khung hoạt hình nét bút sẽ đọc ngôn ngữ hiện tại và hiển thị đúng tiếng Việt hoặc tiếng Anh cho các dòng trạng thái, kèm nhãn rõ ràng khi một chữ không có dữ liệu hoạt hình (thay vì im lặng hiện chữ tĩnh).

### Dừng âm thanh khi rời trang
Trang Nét bút sẽ dừng phát âm khi người học chuyển sang trang khác.

### Chuẩn hóa nội dung phát âm
- Đổi ví dụ vận mẫu -un sang chữ có viết đúng dạng un (困 kùn), giữ 问 wèn làm ghi chú về trường hợp không có thanh mẫu.
- Thay các phương án nhiễu không hợp lệ bằng âm tiết thật dễ nhầm (zhōng/zōng/chóng/cōng; rén/lín/zhēn/nín).

### Kiểm tra lại
Chạy typecheck và kiểm tra trên trình duyệt: menu Tiếng Trung, `/chinese/pronunciation`, `/chinese/strokes`, hoạt hình nét bút của cả chữ thường và bộ thủ, quiz, và giao diện khi chuyển sang English.

## Chi tiết kỹ thuật

- `src/data/chineseStrokes.ts`: thêm `strokes: number` vào `StrokeRule.examples` và điền đủ 21 giá trị.
- `src/pages/ChineseStrokeGuide.tsx`: bỏ `strokes: 0` hardcode ở khối render rule-example; thêm `useEffect` cleanup gọi `stopChineseTts()`.
- `src/components/HanziStrokeOrder.tsx`: dùng `useLanguage()` cho text trạng thái + `title`; thêm nhãn khi `onLoadCharDataError` (hiện đang fallback im lặng).
- `src/data/chinesePronunciation.ts`: sửa hàng vận mẫu -n/-un và 2 bộ options quiz nghe.
- Không đổi schema, không thêm dependency.

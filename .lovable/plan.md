# Rà soát toàn bộ "Learn through Songs"

## Kết quả kiểm tra (đã xác minh)

Thư viện bài hát có 54 bài, lấy từ bảng `language_songs`: English 13, Chinese 15, Finnish 14, Vietnamese 12. Tất cả bài đều có lời, từ vựng và bài tập điền từ (không bài nào trống). Tôi đã gọi YouTube để kiểm tra từng link và đối chiếu lời với bài tập.

### 1. Link video chết (8 bài - không phát được)
- Vietnamese: Em là bông hồng nhỏ, Cả nhà thương nhau, Hà Nội mùa thu
- Chinese: 世上只有妈妈好, 上海滩 (Bến Thượng Hải)
- Finnish: Päivänsäde ja Menninkäinen, Ievan Polkka, Pikku Kakkonen

### 2. Link còn sống nhưng sai bài (3 bài)
- Quê Hương (VI) -> video thật là "Ariana Grande - positions"
- 生日快乐 (ZH) -> video là "Stevie Wonder - Happy Birthday" (tiếng Anh)
- 小星星 (ZH) và Tuiki tuiki tähtönen (FI) -> cả hai dùng chung video Twinkle Twinkle tiếng Anh (Super Simple Songs), không phải bản tiếng Trung/Phần Lan

### 3. Bài trùng lặp trong Chinese
- 茉莉花 xuất hiện 2 lần (cùng video), 两只老虎 2 lần, 生日快乐 2 lần

### 4. Bài tập điền từ sai vị trí (11 chỗ trống chỉ vào câu không chứa đáp án)
Ví dụ: Lemon Tree (đáp án "yellow", "lemon" trỏ vào câu "I'm hanging around..."), Imagine ("dreamer"), Sininen ja valkoinen, Muumilaulu, Tinakenkätyttö, 小幸运, 朋友, Cả nhà thương nhau. Học sinh không thể trả lời đúng vì đáp án không nằm trong câu đó.

## Kế hoạch sửa

1. **Thay link chết + link sai**: tìm và xác thực video mới cho 11 bài (ưu tiên bản chính thức/lyric video, kiểm tra lại bằng YouTube API trước khi lưu). Nếu một bài không tìm được nguồn hợp lệ thì ẩn (`is_published = false`) thay vì để link lỗi.
2. **Gỡ 3 bài trùng của Chinese**, giữ bản có nhiều từ vựng/bài tập tốt hơn và đánh lại `display_order`.
3. **Sửa 11 chỗ trống lệch**: chỉnh `lineIndex`/`wordIndex` về đúng câu và đúng từ trong lời bài hát.
4. **Rà soát lời bài hát**: đối chiếu chính tả, dấu tiếng Việt (UTF-8 NFC), pinyin tiếng Trung, bản dịch từng dòng và phần `words` (nghĩa từ) cho toàn bộ 54 bài; sửa các dòng sai chính tả hoặc dịch lệch nghĩa.
5. **Kiểm tra hiển thị**: thêm xử lý khi video không phát được (thông báo + link mở YouTube) trong `SongLibrary.tsx`, để lỗi link về sau không làm trắng khung phát.
6. **Chạy lại script kiểm tra** sau khi sửa: 0 link chết, 0 bài trùng, 0 chỗ trống lệch.

## Chi tiết kỹ thuật
- Dữ liệu nằm trong bảng `language_songs` (cột `lyrics`, `core_vocab`, `blanks_quiz` dạng JSONB) -> sửa bằng migration UPDATE, không hard-code trong frontend.
- Kiểm tra link qua YouTube oEmbed (`/oembed?url=...`): phản hồi rỗng = video bị xoá/private; so tiêu đề trả về với tiêu đề bài hát để phát hiện link sai bài.
- Chỉ `SongLibrary.tsx` cần thay đổi nhỏ ở phần fallback video.

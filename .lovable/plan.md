Kế hoạch sửa audio toàn hệ thống:

1. Chẩn đoán nguyên nhân chính
- Lớp `audioRecovery` hiện tại đang `speechSynthesis.cancel()` khi tab bị ẩn, nên audio bằng Web Speech API bị cắt hẳn thay vì tạm dừng rồi phát tiếp.
- `HTMLAudioElement` chưa được theo dõi thực sự, nên các audio từ `new Audio(...)` có thể bị pause/suspend khi chuyển tab nhưng không được tự resume khi quay lại.
- Nhiều bài học vẫn gọi `speechSynthesis` trực tiếp, không đi qua các helper TTS chung, nên bản vá hiện tại chưa bao phủ hết.

2. Nâng cấp lớp audio recovery toàn cục
- Không hủy speech synthesis khi `visibilitychange: hidden` nữa.
- Theo dõi tất cả `AudioContext` và `HTMLAudioElement` được tạo trong app.
- Patch `HTMLMediaElement.play/pause` ở mức an toàn để biết audio nào bị pause do hệ thống và audio nào do người dùng bấm dừng.
- Khi quay lại tab/app qua `visibilitychange`, `focus`, `pageshow`, `pointerdown`, `keydown`:
  - resume tất cả `AudioContext` bị suspended
  - resume audio element đang phát dở nếu nó bị pause ngoài ý muốn
  - gọi `speechSynthesis.resume()` thay vì cancel
  - nếu Web Speech bị rơi vào trạng thái im lặng nhưng vẫn còn nội dung đang đọc, tự phát lại đoạn gần nhất một cách có kiểm soát

3. Chuẩn hóa helper TTS chính
- Cập nhật `swedishTts.ts`, `finnishTts.ts`, `englishTts.ts`, `chineseTts.ts`, `vietnameseTts.ts` để dùng cùng cơ chế resilient playback.
- Ưu tiên audio proxy/HTMLAudio cho các ngôn ngữ có proxy vì ổn định hơn khi chuyển tab so với Web Speech API.
- Với fallback `speechSynthesis`, thêm timeout/recovery để tránh nút audio treo ở trạng thái đang phát nhưng không có tiếng.

4. Rà soát các chỗ gọi audio trực tiếp trong bài học
- Thay các đoạn `speechSynthesis.cancel()` + `new SpeechSynthesisUtterance(...)` trực tiếp ở các trang bài học quan trọng bằng helper/resilient speak chung khi phù hợp.
- Ưu tiên các module có audio học tập: Swedish, Finnish/YKI, English, Chinese/HSK, Vietnamese, Cambridge, IELTS/PTE/TOEIC listening hoặc vocabulary.
- Giữ nguyên âm thanh hiệu ứng game, chỉ đảm bảo `AudioContext` được resume đúng.

5. Kiểm thử sau khi sửa
- Dùng Playwright kiểm tra một luồng đại diện:
  - phát Swedish audio
  - giả lập chuyển tab/ẩn trang rồi quay lại
  - xác nhận audio không bị kẹt im lặng và nút có thể phát lại bình thường
- Kiểm tra thêm các helper TTS chính bằng một route có English/Chinese/Vietnamese audio để đảm bảo không bị lỗi hồi quy.

Kết quả mong muốn:
- Khi người học chuyển sang tab khác hoặc ứng dụng desktop rồi quay lại, audio không bị kẹt im lặng.
- Nếu trình duyệt bắt buộc tạm dừng audio nền, audio sẽ resume hoặc ít nhất nút phát lại hoạt động ngay, không cần reload trang.
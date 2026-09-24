# IELTS Listening: tốc độ 1.0x tự nhiên và sửa lỗi băng tự dừng

## 1. Tốc độ chuẩn 1.0x
- Bản thu hiện được tạo ở tốc độ 1.12 (Section 1-2) và 1.08 (Section 3-4), nên mức "1.0x" trên giao diện thực chất vẫn nhanh.
- Đổi về tốc độ thu 1.0 cho cả 4 Section, giữ hướng dẫn giọng tự nhiên, nối âm, không đọc từng từ.
- Bộ chọn giữ 0.85x / 1.0x (chuẩn đề thi) / 1.15x, và 1.0x giờ đúng nghĩa là nhịp nói tự nhiên.
- Tăng phiên bản cache để học viên nhận bản thu mới, tạo sẵn lại âm thanh cho các Full Test đầu tiên.

## 2. Băng dừng khi bấm chỗ khác
Nguyên nhân chưa được xác nhận. Bước đầu là tái hiện bằng trình duyệt: phát băng rồi bấm vào ô trả lời, lựa chọn đáp án, vùng trống, section khác và chuyển tab.
- Nghi vấn cần kiểm tra: việc chọn đáp án làm cả bài vẽ lại và kích hoạt lệnh dừng; tín hiệu "dừng trình phát khác" trong Full Test bắt nhầm chính trình phát đang chạy; phím tắt Space/Enter khi đang ở nút Play; hoặc trình duyệt tự tạm dừng khi mất tiêu điểm.
- Sửa đúng nguyên nhân tìm được: băng chỉ dừng khi học viên bấm Pause/Stop, bắt đầu section khác, nộp bài hoặc rời trang.
- Kiểm tra lại: điền đáp án, chọn trắc nghiệm, cuộn trang, bấm ngoài vùng phát trong cả bài lẻ và Full Test; băng vẫn chạy liên tục, không lặp câu.

## Phạm vi giữ nguyên
Không đổi câu hỏi, đáp án, route, tiến độ, lịch sử học viên.

## Chi tiết kỹ thuật
- `src/lib/ieltsListeningVoices.ts`: `speedForSection` trả về 1.0.
- `supabase/functions/listening-tts/index.ts`: nâng `AUDIO_PROFILE_VERSION`, deploy lại; chạy `scripts/warm-listening-audio.mjs`.
- `ListeningPracticeSetCard.tsx`: rà effect `ielts-listening-playback-start`, các nhánh gọi `stop()`/`detachAudio()`, xử lý phím và re-render khi `answers` đổi; `ListeningFullTestEngine.tsx` nếu liên quan.
- Xác minh bằng Playwright, kiểm tra console.

# Spaced Repetition Review (SRS) cho IELTS Speaking

Sau khi học viên nói và được AI chấm ở Part 1/2/3, những câu và cụm từ bị đánh dấu sai phát âm hoặc chưa trôi chảy sẽ tự động được gom vào một mục mới "Cần luyện lại hôm nay" với chu kỳ nhắc lại 1 ngày → 3 ngày → 7 ngày.

## Trải nghiệm học viên

1. Nói xong, bấm chấm điểm như hiện nay.
2. Hệ thống tự lấy từ kết quả chấm:
   - các lỗi phát âm (Pronunciation focus: âm + từ + tip),
   - các lỗi được highlight loại pronunciation/grammar/vocabulary,
   - cụm từ nên nâng cấp (Vocabulary upgrades),
   - và câu bị đánh giá chưa trôi chảy khi điểm Fluency < 6.5 (lưu câu gốc để nói lại).
3. Một tab mới **"🔁 Luyện lại (SRS)"** cạnh Part 1/2/3 và Shadowing:
   - Thẻ "Cần luyện lại hôm nay" liệt kê các item đã đến hạn (due), kèm badge loại lỗi, tip, câu mẫu.
   - Mỗi item có: nút 🔊 nghe mẫu (TTS), nút 🎤 nói lại (dùng lại recorder + speech recognition sẵn có để so khớp và hiện % chính xác), rồi 2 nút quyết định:
     - **Đã ổn** → lên bậc tiếp theo: 1 ngày → 3 ngày → 7 ngày → hoàn thành (chuyển sang mục "Đã thuần thục").
     - **Cần luyện thêm** → quay về bậc 1 ngày.
   - Hiển thị số lượng: đến hạn hôm nay / sắp tới / đã thuần thục, và badge số item due ngay trên tab.
4. Nếu chưa có item nào đến hạn: trạng thái trống thân thiện ("Hôm nay không có gì phải luyện lại - làm thêm 1 câu Part 2 nhé").

## Kỹ thuật

**Cơ sở dữ liệu** - bảng mới `public.speaking_srs_items`:
- `user_id`, `item_type` (`pronunciation` | `fluency` | `grammar` | `vocabulary`), `content` (câu/cụm cần luyện), `target` (câu mẫu / bản nâng cấp), `tip`, `part`, `topic`, `question_id`, `stage` (0-3), `due_at`, `last_reviewed_at`, `attempts`, `mastered`.
- Unique key trên (`user_id`, `item_type`, `content` chuẩn hóa lowercase) để không trùng khi lỗi lặp lại nhiều lần - lỗi lặp lại chỉ reset `due_at` về hôm nay và tăng `attempts`.
- RLS: mỗi học viên chỉ đọc/ghi dữ liệu của chính mình; GRANT cho `authenticated` và `service_role`; trigger `set_updated_at`.

**Frontend**:
- `src/hooks/useSpeakingSrs.ts`: load item due (`due_at <= now`), `addItems(result)`, `promote(id)`, `reset(id)`; có fallback `localStorage` cho khách chưa đăng nhập (cùng shape dữ liệu, đồng bộ lên cloud khi đăng nhập).
- `src/lib/speakingSrsExtract.ts`: hàm thuần chuyển `SpeakingResult` → danh sách item SRS (lọc trùng, bỏ item quá ngắn/nhiễu, tối đa 8 item mỗi lần chấm).
- `src/components/ielts/SpeakingSrsPanel.tsx`: UI mục "Cần luyện lại hôm nay" (nghe mẫu qua `src/lib/englishTts.ts`, nói lại qua Web Speech API, tính % khớp từ).
- `src/pages/SpeakingPractice.tsx`: gọi `addItems` trong `handleGrade` sau `recordScore`, thêm tab SRS + badge số item due.
- Ghi log học tập qua `logStudentActivity` với `activityType: "ielts_speaking_srs"` để dữ liệu xuất hiện trong Learning DNA.

Chu kỳ: stage 0 → +1 ngày, stage 1 → +3 ngày, stage 2 → +7 ngày, stage 3 → đánh dấu thuần thục.

## Nguyên nhân chấm IELTS Speaking bị chậm

Sau khi rà soát `src/pages/SpeakingPractice.tsx` và 2 edge function `grade-speaking`, `upgrade-speaking`:

1. **Gọi AI 2 lần liên tiếp (tuần tự)** — đây là nguyên nhân chính.
   `handleGrade()` đợi xong `grade-speaking` (đã trả `upgradedAnswer`), rồi vẫn `await handleUpgrade()` gọi tiếp `upgrade-speaking`. Hai lần Perplexity sonar = ~30–60s mỗi lần → tổng 60–120s. Đồng thời lãng phí token vì grade đã có upgrade.
2. **Prompt `grade-speaking` quá nặng**: ép AI trả về criteria + highlightedErrors + suggestions + vocabularyUpgrades + pronunciationFocus + upgradedAnswer (Band 8.0+, có bold). Output ~900–1200 token → Perplexity sinh chậm.
3. Không truyền `max_tokens` / `temperature` cho Perplexity → model có xu hướng dài dòng.
4. UI block toàn bộ kết quả tới khi cả grade + upgrade xong, không render progressive.

## Cách sửa

### 1. `src/pages/SpeakingPractice.tsx` — `handleGrade`
- **Render kết quả grade ngay** (set `result`, tắt `setLoading(false)`) trước khi cân nhắc upgrade.
- **Bỏ auto-call `handleUpgrade()`** khi `grade-speaking` đã trả `upgradedAnswer` (>95% trường hợp). Chỉ fallback gọi `upgrade-speaking` khi `upgradedAnswer` rỗng/thiếu.
- Giữ nút "Nâng cấp" thủ công như cũ cho trường hợp user muốn tái tạo.
- Move `logStudentActivity` vào background (không `await` chặn UI).

Hiệu quả: thời gian chờ giảm ~50% (1 AI call thay vì 2).

### 2. `supabase/functions/grade-speaking/index.ts`
- Thêm `temperature: 0.2`, `max_tokens: 1400` vào body Perplexity → sinh nhanh & ổn định hơn.
- Rút gọn yêu cầu output: giữ overall, criteria (4 mục), transcript, highlightedErrors, suggestions, upgradedAnswer. Bỏ `vocabularyUpgrades` và `pronunciationFocus` (đã có trong criteria feedback + highlightedErrors) → ngắn prompt + ngắn output ~30%.
- Giữ timeout 75s nhưng giảm xuống 60s để fail-fast khi Perplexity treo.

### 3. `supabase/functions/upgrade-speaking/index.ts`
- Thêm `temperature: 0.2`, `max_tokens: 700`.

### Không thay đổi
- Logic transcription, recording, UI layout, lịch sử điểm, hệ thống điểm.
- Các trường `vocabularyUpgrades`/`pronunciationFocus` trong type `SpeakingResult` vẫn giữ (optional) để tương thích lịch sử cũ; chỉ không yêu cầu AI sinh nữa.

## Kết quả kỳ vọng
- Thời gian chờ chấm: từ ~60–120s → ~20–35s.
- Kết quả hiện ra ngay khi grade xong, không phải đợi upgrade.
- Ít timeout 504 hơn.

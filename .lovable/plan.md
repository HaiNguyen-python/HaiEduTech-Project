# Nâng cấp Speaking Coach tiếng Thụy Điển

## Hiện trạng đã kiểm tra
- 43 chủ đề / 430 câu: A1 120, A2 120, B1 100, B2 90 (không có C1).
- Trùng lặp thật: chủ đề `sv-feelings` và `sv-news` xuất hiện 2 lần, kéo theo 20 câu trùng ID (`sv-fe1..10`, `sv-ne1..10`); ngoài ra 2 chủ đề cùng tên "Klimat & miljö" (`sv-environment`, `sv-climate`) trùng nội dung khí hậu.
- Không câu nào có trường `ipa` riêng: IPA hiển thị hoàn toàn do `generateSwedishIpa` sinh theo quy tắc, nên các câu có tj-/sj-/rs-/nhấn giọng vẫn dễ sai.
- Chưa có mẹo phát âm riêng cho tiếng Thụy Điển trong `pronunciationTips` (Phần Lan đã có), dù component có import.

## Việc sẽ làm

### 1. Dọn trùng lặp
- Gộp/loại bỏ chủ đề `sv-feelings` và `sv-news` bị lặp, giữ bản có câu tốt hơn.
- Đổi `sv-climate` thành chủ đề B2 riêng biệt ("Hållbarhet & energi") với câu mới, hoặc gộp vào `sv-environment` để không còn 2 chủ đề cùng tên.
- Thêm script audit `scripts/audit_swedish_speaking.mjs` báo lỗi khi có ID/tên trùng, chủ đề < 10 câu, hoặc câu thiếu IPA.

### 2. IPA chính xác cho từng câu
- Thêm trường `ipa` viết tay/kiểm duyệt cho toàn bộ câu tiếng Thụy Điển (bắt đầu bằng bản sinh tự động rồi sửa các điểm khó: sj/skj/stj → ɧ, tj/kj → ɕ, rs/rt/rd/rn → ʂ ʈ ɖ ɳ, u → ʉː, độ dài nguyên âm, các từ chức năng như "de/dem → dɔm", "det → deː").
- Component ưu tiên dùng `ipa` của câu, chỉ fallback sang bộ sinh quy tắc khi thiếu.

### 3. Mở rộng nội dung (430 → ~600 câu)
- Thêm chủ đề còn thiếu theo chuẩn YKI/CEFR: A1 (mat & dryck cơ bản, väder, kropp), A2 (jobbintervju, myndigheter/FPA, telefonsamtal, barn & skola), B1 (studier, ekonomi & budget, hälsa & vård, digitala tjänster), B2/C1 (arbetsliv & förhandling, integration, teknologi & AI, akademisk diskussion).
- Mỗi chủ đề tối thiểu 10 câu, kèm bản dịch tiếng Việt tự nhiên, `difficulty` và `theme` hợp lệ, ID không trùng.
- Bổ sung bậc C1 để bộ lọc CEFR trong UI có đủ 5 mức.

### 4. Mẹo phát âm & rõ ràng hơn ở UI
- Thêm mục `pronunciationTips` cho tiếng Thụy Điển: sj-ljudet, tj-ljudet, u/y, retroflex sau r, trọng âm âm tiết đầu, tonaccent (accent 1 vs 2 với `anden/anden`, `tomten/tomten`).
- Hiển thị gợi ý phát âm liên quan tới câu đang luyện (theo âm có trong câu) ngay dưới dòng IPA, kèm nhãn cấp độ và chủ đề rõ ràng.

### 5. Kiểm tra logic ngữ nghĩa
- Rà soát toàn bộ câu tiếng Thụy Điển về trật tự từ V2/BIFF, en/ett, và tính hợp lý ngữ nghĩa (đúng nguyên tắc đã áp dụng cho phần vocabulary), sửa các câu không tự nhiên.

## Chi tiết kỹ thuật
- File dữ liệu: `src/data/speakingCoachSwedishExpansion.ts` (dọn trùng + gộp), thêm `speakingCoachSwedishExpansion5.ts` và `...6.ts` cho chủ đề mới, `speakingCoachSwedishIpa.ts` cho map IPA theo sentence ID.
- `src/components/AISpeakingCoach.tsx`: ưu tiên `sentence.ipa`, hiển thị tip phát âm theo âm, mở rộng bộ lọc mức lên C1.
- `src/data/speakingCoachData.ts`: thêm tips tiếng Thụy Điển, giữ `themes: swedishThemes` (không dùng `applyTopUps` vì level đã gán trực tiếp).
- Chạy audit script + `tsgo --noEmit` sau khi sửa.

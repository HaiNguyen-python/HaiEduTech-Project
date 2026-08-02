# Rà soát Speaking Coach tiếng Thụy Điển - lỗi tìm được và kế hoạch sửa

## Kết quả kiểm tra hiện trạng

Dữ liệu: 60 chủ đề, 600 câu, đủ 10 câu/chủ đề, có bản dịch, phân bố A1 16 / A2 16 / B1 13 / B2 12 / C1 3. Không còn trùng ID (đã sửa lượt trước).

Lỗi xác nhận được:

1. **Phiên âm IPA sai ở phần lớn câu.** Dữ liệu Swedish không lưu IPA, IPA hiện ra được sinh lúc chạy bởi `swedishSentenceIpa.ts`: từ điển chỉ có 275 từ, nên **2471/4051 token (61%) rơi vào bộ luật tự sinh**, gồm cả từ siêu phổ biến (på, i, en, ett, för, med, till, om, av). Bộ luật này có lỗi hệ thống, đã kiểm chứng:
   - Đuôi `-a` thành nguyên âm dài sai: `varje → /varjeː/`, `sjunga → /ɧɵŋɑː/`, `kyrka → /ɕʏrkɑː/`, `engelska → /ɛŋɛlskɑː/` (đúng: `/ˈvarjɛ/`, `/ˈɧɵŋa/`, `/ˈɕʏrka/`, `/ˈɛŋːɛlska/`).
   - Đuôi `-en/-et` thành `eːn/eːt`: `hjälpen → /hjɛlpeːn/`, `köket → /ɕøːɕeːt/` (đúng `/ˈjɛlpɛn/`, `/ˈɕøːkɛt/`).
   - Không áp dụng h câm trong `hj-/lj-/dj-/gj-`: `hjärta → /hjɛʈɑː/` (đúng `/ˈjæʈa/`).
   - Quy tắc k → ɕ áp dụng quá rộng, làm hỏng `köket`.
   - Từ tự sinh **không có dấu nhấn** `ˈ`, nên mất luôn ý nghĩa dạy trọng âm / pitch accent.

2. **6 câu bị lặp nội dung giữa các chủ đề**: `sv-hs2` = `e5-sv-hb2`, `sv-fo1` = `e5-sv-re1`, `sv-fo2` = `e5-sv-re3`, `sv-mo1` = `sv-fe1`, `sv-bank1` = `sv-bp1`, `sv-do8` = `e5-sv-bb9`.

3. **Lỗi ngữ pháp trong câu mẫu**, ví dụ `sv-fa9` "Jag är ensam barn" (đúng: "Jag är enda barnet").

4. **Tiền tệ không nhất quán**: một số câu dùng `euro`, số khác dùng `kronor` trong cùng phần tiếng Thụy Điển.

5. **Lỗi audio bị im lặng**: trong `AISpeakingCoach.tsx`, `playSwedishTts` trả về `false` khi thất bại thay vì throw, nên nhánh `catch` không chạy - học viên bấm nghe mẫu mà không có gì xảy ra và cũng không có thông báo. Ngoài ra Swedish chưa có nút phát chậm (chỉ có `playbackRate: 0.9`), dù `playSwedishTts` đã hỗ trợ tốc độ chậm.

6. **Chấm điểm từ ghép**: nhận dạng sv-SE thường tách từ ghép ("tunnelbanestation" → "tunnel bana station"), hiện bị tính sai vì so khớp theo từng từ.

## Sẽ làm

### A. Sửa engine phiên âm (ưu tiên cao)
- Sửa `src/lib/swedishIpa.ts`: đuôi `-a`, `-en`, `-et`, `-or`, `-ar` không kéo dài nguyên âm; h câm cho `hj-/lj-/dj-/gj-`; giới hạn softening `k/g/sk` chỉ ở đầu âm tiết có trọng âm; thêm dấu nhấn `ˈ` mặc định vào âm tiết đầu cho từ đa âm tiết.
- Mở rộng `WORD_IPA` trong `src/lib/swedishSentenceIpa.ts` phủ toàn bộ từ có tần suất >= 2 trong 600 câu (khoảng 350-400 từ mới, gồm mọi từ chức năng) để giảm phụ thuộc vào bộ luật.
- Thêm script kiểm tra: mọi câu phải có IPA, mỗi từ đa âm tiết phải có dấu nhấn, không còn đuôi `-aː`/`-eːn` sai.

### B. Sửa nội dung
- Viết lại 6 câu trùng thành câu mới đúng chủ đề.
- Rà soát ngữ pháp toàn bộ 600 câu (V2/inversion, BIFF, hợp giống en/ett, dạng xác định), sửa các câu sai như `sv-fa9`.
- Chuẩn hóa tiền tệ: dùng `kronor` cho ngữ cảnh Thụy Điển, `euro` chỉ khi câu nói rõ về Phần Lan.

### C. Sửa kỹ thuật trong `AISpeakingCoach.tsx`
- Kiểm tra giá trị trả về của `playSwedishTts`, hiện toast lỗi rõ ràng khi không phát được (kèm gợi ý cài giọng sv-SE).
- Thêm nút "Nghe chậm" cho Swedish (dùng `playbackRate` 0.65 / `speechRate` 0.6 như `SwedishAudioButton`).
- Thêm so khớp gộp từ khi chấm: nếu nhiều từ liên tiếp trong lời nói ghép lại khớp một từ ghép trong câu mẫu (và ngược lại), tính là đúng.

### Chi tiết kỹ thuật
- Không đổi cấu trúc dữ liệu, không đổi ID câu/chủ đề nên tiến độ học viên giữ nguyên.
- Chạy `tsgo` và script audit sau khi sửa; báo lại số câu IPA đạt chuẩn trước/sau.

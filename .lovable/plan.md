## Mục tiêu
Tăng cường & củng cố mảng **Learn Finnish**, trọng tâm là **luyện nói** (Speaking Coach + Roleplay) từ A1 → B1, bám theo định hướng YKI và bổ sung chiều sâu cho ngữ pháp / từ vựng / mock exam.

## Phạm vi

### 1. Speaking Coach (ưu tiên cao nhất)
**Tình trạng**: 4 nhóm chủ đề Finnish (`finnishThemes` + 3 expansion) ~ 13 themes, mỗi theme ~10 câu. Có ID trùng (`fi-greetings`, `fi-shopping`, `fi-feelings`) giữa file gốc và expansion → gây ghi đè/đếm sai.

**Việc làm**:
- Tạo `src/data/speakingCoachFinnishExpansion.ts` (file riêng cho Finnish, gọn dễ bảo trì) gom 3 cấp độ rõ ràng:
  - **A1 cơ bản** (15 câu/theme × 4 theme mới): Numbers/Time (`Numerot ja aika`), Body & Health (`Keho ja terveys`), Home (`Koti`), Food basics (`Ruoka`).
  - **A2 thường nhật** (15 câu/theme × 4 theme mới): At Doctor (`Lääkärissä`), Apartment hunting (`Asunnon etsintä`), Kela & KKO (`Kela ja viranomaiset`), Small talk (`Small talk`).
  - **B1 nâng cao** (12 câu/theme × 4 theme mới): Opinions & debate (`Mielipiteet`), Work meeting (`Työpalaveri`), News & society (`Uutiset`), Job interview (`Työhaastattelu`).
- Mỗi câu có `text`, `translation` (VI), `ipa` cho câu khó, `difficulty` (easy/medium/hard), gắn `theme` mới.
- Sửa **trùng ID** trong `speakingCoachExpansion2.ts` (đổi `fi-greetings`→`fi-greetings-2`, `fi-feelings`→`fi-feelings-2`, v.v.) hoặc loại bỏ block trùng — chọn loại bỏ vì nội dung trùng chủ đề.
- Đăng ký file mới vào `speakingCoachData.ts` (themes array của Finnish) — giữ thứ tự theo cấp độ A1 → B1.
- **Tổng số câu mới**: ~168 câu (đưa tổng số Finnish speaking lên >300 câu).

### 2. Phân loại theo Level trong UI Speaking Coach
- Cập nhật `AISpeakingCoach.tsx` để hiển thị **filter cấp độ** (Tất cả / A1 / A2 / B1) cho Finnish (giữ logic hiện tại cho EN/ZH/VI).
- Mỗi theme Finnish gắn metadata `level: "A1" | "A2" | "B1"` (mở rộng type `SpeakingTheme` với field optional `level?`).
- Filter chips ở đầu danh sách themes; localStorage nhớ lựa chọn cuối.

### 3. Pronunciation Tips chuyên cho Finnish
- Thêm khối "Mẹo phát âm tiếng Phần Lan" trong `pronunciationTips` (`speakingCoachData.ts`):
  - Nguyên âm dài đôi (`tuli` vs `tuuli` vs `tulli`).
  - Phụ âm đôi (`kuka` vs `kukka`).
  - Vần `ä / ö / y` và quy tắc hài hoà nguyên âm.
  - Trọng âm luôn ở âm tiết đầu.
- Hiển thị khi `language === "finnish"` (component đã có pattern này).

### 4. Roleplay Chinese-style cho Finnish (củng cố hội thoại)
- Trong `supabase/functions/roleplay-chat/index.ts`, nâng cấp `systemPrompt` cho Finnish:
  - Yêu cầu **strict format**: dòng Finnish in đậm + `[ipa thô]` + `(Vietnamese: …)`.
  - Thêm "Sanasto-vinkki" (2–3 từ vựng then chốt mỗi lượt).
  - Phân biệt **kirjakieli vs puhekieli** khi sửa lỗi (vd `minä olen` → `mä oon`).
  - Mức độ thích ứng theo level A1/A2/B1 dựa trên input.

### 5. Lessons Expansion (củng cố ngữ pháp/đọc)
- Tạo `src/data/finnishCurriculum/lessonsExpansion6.ts`: 4 bài B1 mới
  - "Mielipiteen ilmaiseminen" (Diễn đạt quan điểm) — conditional `-isi-`.
  - "Passiivi arjessa" (Thể bị động trong đời sống).
  - "Rektio-verbit" (Verb governance — danh từ đi với case nào).
  - "Yhdyssanat ja sananmuodostus" (Từ ghép & cấu tạo từ).
- Mỗi bài đủ: theory (FI+EN), 6 grammar examples, 12 vocab, 2 dialogues, 2 fill-in-blank exercises (≥10 câu), 8 quiz MCQ — đúng `<curriculum-validation-standards>`.
- Export trong `finnishCurriculum/index.ts` và merge vào danh sách hiển thị ở `YkiDashboard` / `FinnishBeginner`.

### 6. Vocabulary Expansion
- Tạo `vocabularyExpansion6.ts`: 80 từ mới chia 4 module (B1 chủ đề: Työelämä, Yhteiskunta, Media, Ympäristö).
- Tuân thủ rule "zero duplicates" (kiểm tra với base word của các expansion 1-5 trước khi commit).

### 7. QA & dọn dẹp
- Chạy script ngắn (đếm) để bảo đảm: không trùng ID câu, đếm theme/câu trước-sau, build xanh.
- Cập nhật memory `mem://features/finnish/speaking-system` ghi nhận số câu mới + có filter A1/A2/B1.

## Chi tiết kỹ thuật

```text
File mới
  src/data/speakingCoachFinnishExpansion.ts   ~12 themes, 168 câu, có level
  src/data/finnishCurriculum/lessonsExpansion6.ts
  src/data/finnishCurriculum/vocabularyExpansion6.ts

File sửa
  src/data/speakingCoachData.ts          merge expansion mới, thêm tips, dọn trùng
  src/data/speakingCoachExpansion2.ts    loại bỏ themes Finnish trùng
  src/data/speakingCoachExpansion.ts     đổi `fi-shopping` còn lại (giữ một bản)
  src/components/AISpeakingCoach.tsx     thêm Level filter (A1/A2/B1) cho Finnish
  src/data/finnishCurriculum/index.ts    export 2 file mới
  supabase/functions/roleplay-chat/index.ts  nâng cấp Finnish system prompt
  mem://features/finnish/speaking-system  cập nhật ghi chú
```

Không động vào: cấu hình auth, RLS, schema DB, các file Supabase auto-gen.

## Kết quả mong đợi
- Speaking Coach Finnish: từ ~130 câu → **~300 câu**, có lọc theo cấp độ A1/A2/B1, mẹo phát âm chuyên biệt.
- Roleplay Finnish: phản hồi giàu thông tin hơn (IPA + dịch + tip puhekieli).
- Bài học YKI: thêm 4 bài B1 chiều sâu + 80 từ vựng B1.
- Không còn ID theme trùng, build sạch.


## Plan: Hoàn thiện hình ảnh từ vựng & nâng cấp bài tập Speaking tiếng Phần Lan

### 1. Bổ sung hình ảnh cho TẤT CẢ từ vựng còn thiếu

**File:** `src/pages/YkiDashboard.tsx`

Hiện tại `VOCAB_IMAGES` có ~250 entry nhưng vẫn thiếu nhiều từ quan trọng. Cần thêm ~30 entry mới:

- **Greetings/Social:** `näkemiin`, `kyllä`, `ei` (chưa có hình riêng)
- **Daily verbs cơ bản:** `nousta` (get up), `tilata` (order)
- **Travel expansion:** `loma` (vacation), `opas` (guide)
- **Food missing:** `keitto` (soup), `salaatti` (salad), `jälkiruoka` (dessert), `tee` (tea), `marja` (berry), `sieni` (mushroom), `tarjoilija` (waiter), `ruokalista` (menu)
- **Nature/Weather:** `lämpötila` (temperature), `myrsky` (storm), `saaristo` (archipelago), `tunturi` (fell)
- **Education:** `oppilas` (pupil), `luento` (lecture), `oppitunti` (lesson), `valmistua` (graduate)
- **Expansion4 missing:** `mies` (husband), `jogurtti`, `olut`, `lautapeli`, `käsityö`, `nuha`, `polvi`
- **Puhekieli words:** Sẽ map đến category fallback "social" vì không có hình cụ thể

Ngoài ra, thêm category fallback cho: `daily`, `puhekieli`, `home`.

### 2. Sửa bug phát hiện Speaking Exam

**File:** `src/pages/YkiDashboard.tsx`

Hiện tại `isSpeakingExam` chỉ match `yki-mock-speaking` (exact), nên các module `yki-mock-speaking-extra` và `yki-mock-speaking-exp3` không được nhận diện là bài Speaking → không hiển thị `SpeakingRecorder`.

**Sửa:** Đổi thành `selectedModule?.id?.includes("speaking")` (tương tự cách `isListeningExam` đang dùng `.includes("listening")`).

### 3. Thêm bài nói mẫu + đánh giá sau thu âm cho SpeakingRecorder

**File:** `src/pages/YkiDashboard.tsx` — component `SpeakingRecorder`

**Trước khi thu âm:**
- Thêm nút "🎧 Kuuntele mallivastaus" (Nghe bài mẫu) phát TTS bài nói mẫu bằng Finnish TTS
- Bài mẫu sẽ lấy từ field `sampleAnswer` mới trong lesson data hoặc parse từ `theory` nếu có
- Thêm panel collapsible hiển thị transcript bài mẫu (ẩn/hiện)

**Sau khi thu âm:**
- Tích hợp Web Speech API (recognition) để transcribe bài nói của người dùng
- So sánh transcript với bài mẫu bằng hàm `compareWords`/Levenshtein (tái sử dụng từ `AISpeakingCoach.tsx`)
- Hiển thị kết quả đánh giá:
  - Điểm accuracy (%)
  - Highlight từ đúng (xanh) / sai (đỏ) / thiếu (vàng)
  - Gợi ý cải thiện: từ vựng nên dùng, mẫu câu nâng cấp
  - Nút "Nghe lại bài mẫu" để so sánh

### 4. Thêm `sampleAnswer` vào data Speaking exercises

**File:** `src/data/finnishCurriculum/mockExamExpansion3.ts`

Thêm field `sampleAnswer` cho mỗi speaking lesson (5 bài). Ví dụ:
```
sampleAnswer: "Hei! Haluaisin ostaa takin. Onko teillä takkia koossa M? Paljonko tämä maksaa? Voinko sovittaa? Käykö kortti?"
```

**File:** `src/data/finnishCurriculum/mockExamExpansion.ts`
- Thêm `sampleAnswer` cho 5 speaking lessons hiện có

### Files thay đổi

| File | Nội dung |
|------|----------|
| `src/pages/YkiDashboard.tsx` | Thêm ~30 VOCAB_IMAGES + 3 CATEGORY_IMAGES, sửa `isSpeakingExam` detection, nâng cấp `SpeakingRecorder` với bài mẫu TTS + transcription + grading |
| `src/data/finnishCurriculum/mockExamExpansion3.ts` | Thêm `sampleAnswer` cho 5 speaking lessons |
| `src/data/finnishCurriculum/mockExamExpansion.ts` | Thêm `sampleAnswer` cho 5 speaking lessons |
| `src/data/finnishCurriculum/types.ts` | Thêm `sampleAnswer?: string` vào `FinnishLesson` type |


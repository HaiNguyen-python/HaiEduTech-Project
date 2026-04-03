

## Plan: Vietnamese Speaking Coach, TTS improvements & History background images

### 1. Thêm AI Speaking Coach cho tiếng Việt

**Thay đổi:**

- **`src/data/speakingCoachData.ts`**: Thêm `vietnameseThemes` với 5 themes × 10 câu:
  - Chào hỏi & Giới thiệu (Greetings)
  - Gia đình (Family)
  - Ẩm thực (Food & Cuisine)
  - Du lịch (Travel)
  - Công việc (Work)
  - Thêm `vietnamese` vào object `speakingCoachLanguages` với `speechLang: "vi-VN"`

- **`src/components/AISpeakingCoach.tsx`**: Mở rộng type `language` từ `"english" | "finnish" | "chinese"` thành bao gồm `"vietnamese"`. Vietnamese sử dụng Web Speech API trực tiếp (vi-VN) thay vì Finnish TTS proxy.

- **`src/pages/SpeakingCoachPage.tsx`**: Thêm case `vietnamese` với title/subtitle/back route phù hợp. Sử dụng `MountainClimber` (hoặc component phù hợp) cho gamification.

- **`src/App.tsx`**: Route `/speaking-coach/vietnamese` đã được handle tự động qua `:language` param, không cần thay đổi.

- **`src/pages/Vietnamese.tsx`**: Thêm link/card dẫn đến `/speaking-coach/vietnamese` trong tab Language.

### 2. Cải thiện giọng đọc tiếng Việt (TTS)

Giọng đọc `vi-VN` qua Web Speech API hiện quá nhanh và đơn điệu.

**Thay đổi trên tất cả các file dùng TTS tiếng Việt:**

- **`src/pages/FolkloreLibrary.tsx`**: Giảm `rate` từ 0.85 → 0.7, thêm `pitch: 1.05` để giọng tự nhiên hơn
- **`src/components/SmartVocabCard.tsx`**: Giảm `rate` từ 0.8 → 0.65, thêm `pitch: 1.05`
- **`src/pages/VietnameseForForeigners.tsx`**: Giảm rate tương ứng (normal mode 0.85 → 0.7, slow mode giữ nguyên 0.55)

### 3. Thêm hình nền mờ cho các ô lịch sử

Dựa trên screenshot, 4 ô "Historical Periods" (Early Kingdoms, Golden Dynasties, Modern History, Contemporary Vietnam) hiện chỉ có gradient header + list trắng.

**Thay đổi:**

- **`src/pages/Vietnamese.tsx`** (lines 273-312): Thêm background image mờ cho mỗi history card. Sử dụng Unsplash images phù hợp với chủ đề:
  - Early Kingdoms: Trống đồng Đông Sơn / Co Loa citadel
  - Golden Dynasties: Văn Miếu / Thăng Long
  - Modern History: Điện Biên Phủ / Ba Đình
  - Contemporary Vietnam: Skyline hiện đại / đô thị

- Cấu trúc: Thêm `<img>` với `absolute inset-0 opacity-10` hoặc `opacity-15` làm background mờ cho phần body (dưới gradient header), giữ text dễ đọc.

### Files thay đổi
1. `src/data/speakingCoachData.ts` — Thêm 50 câu Vietnamese + config
2. `src/components/AISpeakingCoach.tsx` — Hỗ trợ language "vietnamese"
3. `src/pages/SpeakingCoachPage.tsx` — Thêm Vietnamese config
4. `src/pages/Vietnamese.tsx` — Link Speaking Coach + background images cho history cards
5. `src/pages/FolkloreLibrary.tsx` — TTS rate/pitch adjustment
6. `src/components/SmartVocabCard.tsx` — TTS rate/pitch adjustment
7. `src/pages/VietnameseForForeigners.tsx` — TTS rate adjustment


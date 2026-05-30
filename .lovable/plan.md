# Kế hoạch: Tiếp tục Learn Chinese + Learn Programming

## PHẦN A — Learn Chinese (HSKK + SRS + Tone Drill)

### A1. Wire HSKK vào navigation
- Thêm route `/chinese/hskk` trong `src/App.tsx` trỏ vào `HskkSpeakingRoom`
- Thêm card "HSKK Speaking Room" vào hub Chinese (`InteractiveChineseCurriculum` hoặc `ConversationalChinese` hub) — gradient đỏ-vàng, icon Mic, badge "Beta"
- Thêm sub-item vào Navbar group Chinese: "HSKK Speaking" → `/chinese/hskk`
- Breadcrumb back về `/chinese`

### A2. SRS (Spaced Repetition) cho HSK vocab
- Tạo hook `src/hooks/useHskSRS.ts` với thuật toán SM-2 đơn giản:
  - Mỗi từ có `easiness` (2.5 default), `interval` (ngày), `next_review` (timestamp)
  - User đánh giá: Again (1) / Hard (2) / Good (3) / Easy (4)
  - Lưu vào Supabase table `hsk_srs_progress` (user_id, word_id, easiness, interval, next_review, reps)
  - Guest mode: localStorage fallback
- Component `src/components/chinese/HskSrsReview.tsx`:
  - Auto-expanding card (không 3D flip — theo memory)
  - Hiển thị Hanzi → click reveal Pinyin + VI + audio
  - 4 nút rating, swipe gesture trên mobile
  - Counter "Due today: N / Mastered: N / Total: N"
- Tab "SRS Review" trong `HskVocabularyBank` (1100+ words sẵn có)
- Migration: tạo bảng `hsk_srs_progress` với RLS + GRANTs

### A3. Tone Drill (4 thanh điệu)
- Trang `src/pages/ToneDrillRoom.tsx` (route `/chinese/tone-drill`)
- Dùng `src/data/toneDrillBank.ts` đã có
- 3 game modes:
  1. **Listen & Identify**: nghe audio, chọn thanh (1/2/3/4)
  2. **Minimal Pairs**: mā/má/mǎ/mà — phân biệt
  3. **Speak & Match**: dùng Web Speech API, chấm điểm tone qua pitch contour (fallback: so khớp pinyin)
- Visual: contour line cho mỗi thanh (SVG ↗ → ↘ ↘↗ ↘), confetti khi 5 đúng liên tiếp
- Tích hợp XP system (`useProgrammingXP` pattern → tạo `useChineseXP` mới hoặc dùng player_badges)
- Badge mới: `tone-master` (đạt 90%+ trong 20 câu)

### A4. Card vào hub
- Thêm card "Tone Drill 四声训练" vào hub Chinese

---

## PHẦN B — Learn Programming (defer items)

### B1. Responsive mobile tabs cho PythonLessonView
- Convert tabs sang horizontal scroll trên mobile (`overflow-x-auto`, snap)
- Sticky tab bar khi scroll
- Thêm dropdown menu cho pillar nav khi width < 768px

### B2. Scroll indicators cho pillar navigation
- Fade gradient trái/phải khi có nội dung overflow
- Arrow buttons để scroll
- Active pillar indicator (underline animated)

### B3. AI Code Reviewer (edge function mới)
- Tạo `supabase/functions/review-python-code/index.ts`
  - Input: code, lesson context, expected output
  - Dùng Lovable AI Gateway `google/gemini-2.5-flash` (rẻ)
  - Output: { score, issues[], suggestions[], improvedCode }
  - Rate limit: auth required, 20 req/giờ/user
- Component `src/components/programming/AICodeReviewer.tsx`:
  - Button "🤖 AI Review" trong Python playground
  - Hiển thị review trong dialog: điểm 0-100, issues highlight dòng, gợi ý cải tiến
  - Badge `code-reviewer` sau 5 lần review

### B4. Vietnamese localization
- Translate pillar descriptions, lesson summaries, button labels sang VI trong `pythonPathwayData.ts`
- Toggle EN/VI ở header (lưu localStorage `programming-lang`)

---

## Thứ tự thực hiện (3 turns)

**Turn 1**: A1 + A2 (HSKK nav + SRS với migration)
**Turn 2**: A3 + A4 (Tone Drill + hub card)
**Turn 3**: B1 + B2 + B3 + B4 (Programming defer)

## Files mới (dự kiến)
- `src/hooks/useHskSRS.ts`, `src/hooks/useChineseXP.ts`
- `src/components/chinese/HskSrsReview.tsx`
- `src/pages/ToneDrillRoom.tsx`
- `src/components/programming/AICodeReviewer.tsx`
- `supabase/functions/review-python-code/index.ts`
- Migration `hsk_srs_progress` table

## Files edit
- `src/App.tsx`, `src/components/Navbar.tsx`
- Hub Chinese, `HskVocabularyBank.tsx`
- `PythonLessonView.tsx`, `pythonPathwayData.ts`

## Defer (sau)
- SRS cho tone drill (round 2)
- Voice pitch analysis chính xác (cần Pitch Detection lib như `pitchy`)
- Leaderboard riêng cho HSKK & Tone Drill

Bạn muốn chạy theo thứ tự này, hay đảo (làm Programming defer trước)?

# IELTS Reading Practice — Fix chatbot & nâng cấp công cụ học

## 1. Vì sao chatbot bị "mất"

`ChatBot` được mount global ở `App.tsx` (luôn hiển thị mọi trang). Nhưng `IeltsReadingPractice.tsx` khi vào chế độ làm bài render một overlay:

```tsx
<div className="fixed inset-0 z-[60] bg-background ...">
```

Overlay này phủ toàn màn hình với `z-[60]`, cao hơn z-index hiện tại của ChatBot → nút chat bị che. Ở màn hub (chưa bấm "Start") thì chatbot vẫn còn.

### Hướng xử lý (sẽ hỏi chọn 1)
- **A. Luôn hiện** — nâng z-index ChatBot lên `z-[70]` để nổi trên overlay test.
- **B. Ẩn khi đang làm bài timed, hiện lại ở hub/result** — tránh phân tâm khi đếm giờ, vẫn có nút "Hỏi Mr. Hai" nhỏ ở thanh header của overlay.
- **C. Kết hợp**: ẩn khi timer đang chạy, hiện khi pause hoặc nộp bài.

(Đề xuất B vì giống phòng thi thật, nhưng có nút mở chat trên header khi cần giải thích.)

## 2. Tính năng đề xuất cho Reading Practice

Tất cả là tính năng frontend, tích hợp vào overlay đọc bài (cột trái = passage).

### Bộ công cụ học (Reader Toolkit)
1. **Highlight đa màu** — bôi vàng / xanh / hồng đoạn vừa chọn (selection), xoá bằng click lại. Lưu localStorage theo `passageId`.
2. **Sticky note** — chọn đoạn → thêm ghi chú nhỏ, hiện icon 📝 cạnh dòng, hover xem nội dung.
3. **Tap-to-define dictionary** — double-click 1 từ → popup nghĩa Việt + phát âm (dùng `GlobalSuperDictionary` đã có) + nút "Lưu vào IELTS Vocab Bank".
4. **Line focus ruler** — toggle thanh ngang highlight dòng đang đọc (theo chuột) — hỗ trợ chứng khó tập trung.
5. **Mark for review** — đánh dấu câu hỏi để quay lại (đã có "Submit" — thêm cờ 🚩 trên từng câu).
6. **Strike-through đáp án** — gạch bỏ đáp án loại trừ (right-click hoặc nút nhỏ).

### Hỗ trợ AI (Perplexity sonar — dùng edge function có sẵn)
7. **"Giải thích vì sao"** sau khi nộp — bấm vào câu sai để Mr. Hai phân tích keyword định vị trong passage.
8. **Paraphrase helper** — chọn 1 cụm từ trong passage → AI gợi 2-3 cách diễn đạt khác (luyện synonym).

### Trải nghiệm & gamification
9. **Reading speed tracker** — hiển thị wpm thực tế khi nộp bài, so với mục tiêu Band (250 wpm cho 7.0).
10. **Auto-save progress** — đang làm dở, refresh vẫn còn (đáp án + highlight + thời gian).
11. **Font size & line-height slider** + chế độ Dyslexia-friendly font (đã có paper themes, mở rộng).

## 3. Phạm vi đợt này (sẽ làm sau khi user chốt)

**Bắt buộc:**
- Sửa z-index/visibility ChatBot trên trang Reading Practice (theo phương án chọn).

**Đề xuất gói "Reader Toolkit v1"** (gọn, ~1 turn):
- Highlight đa màu + xoá
- Tap-to-define dictionary
- Mark for review 🚩
- Strike-through đáp án
- Auto-save (đáp án + highlight)

**Gói "AI v2"** (turn sau):
- Giải thích câu sai (Perplexity)
- Paraphrase helper
- Reading speed tracker

## 4. Câu hỏi cho bạn trước khi build

1. Chatbot: chọn **A (luôn hiện)**, **B (ẩn lúc timed, có nút trên header)**, hay **C (ẩn khi timer chạy)**?
2. Build gói **Toolkit v1** trước, hay làm full luôn cả AI v2 trong turn này?
3. Có muốn highlight/note đồng bộ Supabase (theo user) hay chỉ localStorage là đủ?

## Chi tiết kỹ thuật

- File chính: `src/pages/IeltsReadingPractice.tsx` (1095 dòng, có 2 overlay `z-[60]` ở dòng 370 & 736 cho 2 chế độ Timed/Free).
- ChatBot: nâng class lên `z-[70]` hoặc dùng `useLocation()` + state để ẩn theo route + ref.
- Highlight: dùng `window.getSelection()` + `Range` → wrap span class `bg-yellow-200/60`. Lưu range bằng XPath/offset, key theo `passageId`.
- Dictionary: tái dùng `GlobalSuperDictionary` (đã global mount), trigger qua custom event `window.dispatchEvent(new CustomEvent('open-dict', { detail: { word }}))`.
- Auto-save: `localStorage` key `ielts-reading-progress::{passageId}`, debounce 800ms.
- AI explain: gọi edge function Perplexity `sonar-pro` mới `explain-ielts-reading` (turn sau).

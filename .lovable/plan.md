

## Plan: Hiển thị bài viết mẫu trước khi nộp bài

### Vấn đề
Bài viết mẫu (Mallivastaus) hiện chỉ hiển thị **sau khi** học sinh nhấn "Merkitse valmiiksi" (nộp bài). Học sinh không thể xem bài mẫu để tham khảo trước hoặc khi chưa viết bài.

### Giải pháp
Thêm nút "Näytä mallivastaus" (Xem bài mẫu) ngay dưới ô viết bài, cho phép toggle hiển thị bài viết mẫu **bất cứ lúc nào**, kể cả trước khi nộp.

### Chi tiết kỹ thuật

**File: `src/pages/YkiDashboard.tsx`**

1. Thêm state `showModelBeforeSubmit` vào WritingSection component
2. Thêm nút "📝 Näytä mallivastaus / Show Model Answer" giữa ô viết và nút submit (dòng ~1393)
3. Khi nhấn, toggle hiển thị card bài mẫu A2 (dùng `getSampleAnswer(lesson.id)`) ngay dưới ô viết
4. Giữ nguyên bài mẫu sau khi submit (logic hiện tại không thay đổi)

### Files
- `src/pages/YkiDashboard.tsx` — thêm ~15 dòng (state + button + conditional card)


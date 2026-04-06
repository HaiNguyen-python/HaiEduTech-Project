

## Plan: Thêm chức năng ôn tập từ vựng đã đánh dấu sao (⭐ Starred Review)

### Hiện trạng
- Từ vựng được đánh dấu "Mastered" (⭐) lưu trong `localStorage` key `yki-mastered-words` dưới dạng mảng string (tên từ)
- Tất cả từ vựng nằm trong `allVocabModules` (465+ từ)
- Component `FinnishVocabExercises` nhận prop `vocabulary: FinnishVocabEntry[]` và cung cấp 4 chế độ luyện tập
- Dashboard có 4 tab: Sanasto, Oppitunnit, Kokeet, Puhevalmennus

### Giải pháp
Thêm tab thứ 5 "⭐ Kertaus" (Ôn tập) vào pillar tabs. Tab này lọc tất cả từ đã đánh dấu sao từ mọi module, hiển thị danh sách + cho phép luyện tập bằng `FinnishVocabExercises`.

### Chi tiết kỹ thuật

**File: `src/pages/YkiDashboard.tsx`**

1. **Thêm tab "⭐ Kertaus" vào pillar tabs** (dòng ~2166)
   - Thêm `{ value: "starred-review", label: "⭐ Kertaus" }` vào mảng tabs
   - Grid chuyển từ `grid-cols-4` → `grid-cols-5`

2. **Tính toán danh sách từ đã sao** (~15 dòng)
   - `starredVocab = useMemo(() => allVocabWords.filter(v => masteredWords.includes(v.word)), [allVocabWords, masteredWords])`

3. **Render nội dung tab "starred-review"** (~60 dòng)
   - Hiển thị số từ đã đánh dấu sao
   - Nếu < 4 từ: thông báo cần đánh dấu thêm để luyện tập
   - Nếu >= 4 từ: 2 chế độ xem:
     - **Danh sách từ**: Grid cards hiển thị từ, nghĩa, nút phát âm, nút bỏ sao
     - **Luyện tập**: Dùng `FinnishVocabExercises` với `starredVocab`
   - Toggle giữa 2 chế độ bằng 2 nút

### Tổng thay đổi
- `src/pages/YkiDashboard.tsx` — thêm ~80 dòng (tab + useMemo + render content)


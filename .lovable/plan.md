

## Plan: Exercise chỉ dùng từ đã đánh dấu "đã học"

### Thay đổi
Hiện tại, `VocabExercise` nhận `words={filtered}` — tức toàn bộ từ vựng đã lọc (theo level/topic). Cần thay đổi để chỉ dùng những từ đã được đánh dấu mastered.

### Chi tiết kỹ thuật

**File: `src/pages/IeltsVocabulary.tsx`**

1. Tạo danh sách `masteredWords` — lọc từ `ieltsVocabData` chỉ giữ những từ có trong `mastered` Set
2. Truyền `masteredWords` vào `VocabExercise` thay vì `filtered`
3. Cập nhật `VocabExercise` để hiển thị thông báo khi chưa đánh dấu đủ 4 từ (yêu cầu tối thiểu 4 từ mastered để tạo quiz)
4. Giữ nguyên pool đáp án sai từ toàn bộ `ieltsVocabData` để có đủ lựa chọn nhiễu

### Thay đổi cụ thể
- Line 386: `<VocabExercise words={filtered} t={t} />` → `<VocabExercise words={masteredWords} allWords={ieltsVocabData} t={t} />`
- `VocabExercise`: nhận thêm prop `allWords` để lấy đáp án nhiễu, nhưng chỉ chọn câu hỏi từ `words` (mastered)
- Thông báo hướng dẫn: "Hãy đánh dấu ít nhất 4 từ đã học để bắt đầu luyện tập"


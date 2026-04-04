

## Plan: Thêm câu hỏi Knowledge Check cho mục Học Lập Trình

### Hiện trạng
- File `src/data/programmingLessonData.ts` chứa **37 bài học** với trung bình chỉ **1.9 câu hỏi/bài** (nhiều bài chỉ có 1-2 câu)
- Các file mở rộng (`aiFoundationLessons.ts`, `mlLessons.ts`, `sqlLessons.ts`, `dataEngLessons.ts`) đã có 5 câu/bài — đạt chuẩn
- Cần nâng mỗi bài trong `programmingLessonData.ts` lên **5 câu hỏi** có giải thích chi tiết

### Thay đổi

**File: `src/data/programmingLessonData.ts`**

Bổ sung câu hỏi cho tất cả 37 bài học, mỗi bài đạt tối thiểu 5 câu. Ước tính thêm khoảng **110+ câu hỏi mới**.

Mỗi câu hỏi mới sẽ:
- Có 4 đáp án lựa chọn
- Có explanation giải thích chi tiết tại sao đáp án đúng
- Phủ đều các khía cạnh: lý thuyết, cú pháp, ứng dụng thực tế, debug lỗi
- Viết bằng tiếng Việt (theo format hiện tại)

**Ví dụ bài Scratch-1 (hiện có 3 câu → thêm 2):**
```
{ question: "Sân khấu (Stage) trong Scratch có kích thước bao nhiêu pixel?",
  options: ["320x240", "480x360", "640x480", "800x600"],
  answer: 1,
  explanation: "Sân khấu Scratch có kích thước 480x360 pixel..." }
```

### Phạm vi
- Chỉ sửa 1 file: `programmingLessonData.ts`
- Không thay đổi UI hay logic rendering (component đã hỗ trợ hiển thị nhiều câu hỏi)
- Không ảnh hưởng các file curriculum mở rộng (đã đủ 5 câu)


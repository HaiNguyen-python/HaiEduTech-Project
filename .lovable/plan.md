
## Plan: Hiển thị bài học SAT trên trang /english/sat

### Vấn đề hiện tại
Trang `/english/sat` (`EnglishCourse.tsx`) chỉ hiển thị Hero + Curriculum Roadmap tĩnh. Toàn bộ **6 module + 18 bài học SAT** đã có sẵn trong `satModules` và `satExpansionModules` nhưng không xuất hiện trên trang.

### Giải pháp (theo lựa chọn người dùng: cả hai)

#### 1. Nút CTA ở Hero (giống Conversational English)
Khi `courseId === "sat"`, thêm nút lớn dưới `heroDesc`:
- **Label**: "Vào Chương trình SAT →" / "Enter SAT Curriculum →"
- **Action**: smooth scroll tới `#sat-lessons`
- **Style**: gradient purple-indigo (đồng bộ `color: "purple"`)

#### 2. Section "Interactive SAT Lessons" inline
Thêm section mới dưới phần Curriculum Roadmap, **chỉ hiển thị khi `courseId === "sat"`**:
- Tiêu đề: "📚 Bài học SAT tương tác" / "Interactive SAT Lessons"
- Loop qua `[...satModules, ...satExpansionModules]` (6 modules, 18 lessons)
- Mỗi module render:
  - Header card với icon emoji + title + description (bilingual)
  - Grid 2-3 cột các lesson cards:
    - Number badge, title, difficulty badge
    - Click → `navigate('/english/learn/{moduleId}/{lessonId}')`
- Hover effect: scale 1.02, border primary

### Files thay đổi
| File | Thay đổi |
|------|----------|
| `src/pages/EnglishCourse.tsx` | Thêm import `satModules` + `satExpansionModules`, render conditional CTA button + section danh sách bài học khi `courseId === "sat"` |

### Lưu ý kỹ thuật
- **Không tạo route mới** — dùng route `/english/learn/:moduleId/:lessonId` đã tồn tại
- **Bilingual**: dùng `t()` cho mọi label
- **Mobile-first**: grid `sm:grid-cols-2 lg:grid-cols-3`, gap 4
- **Theme tokens**: dùng `bg-card`, `border-border`, `text-foreground`, `bg-primary` — không hard-code màu
- **Không động đến** logic của các course khác (cambridge, ielts, toeic, conversational, national-exam)

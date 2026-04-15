

## Plan: Đảm bảo SAT hiển thị đầy đủ trong Learn English

### Vấn đề hiện tại
1. **Navbar** thiếu mục SAT — không có link nào dẫn đến `/english/sat` hoặc các bài học SAT tương tác
2. **Trang `/english/sat`** (EnglishCourse) không có section hiển thị các module bài học tương tác SAT (5 modules, ~15 bài học đã có sẵn trong data)
3. SAT modules có trong grid "Interactive Learning Modules" trên `/english` nhưng lẫn với 20+ modules khác, khó tìm

### Giải pháp

#### 1. Thêm SAT vào Navbar (src/components/Navbar.tsx)
- Thêm link `{ to: "/english/sat", label: "📝 SAT" }` vào mục English trong Navbar, giữa "Luyện thi THPT" và "AI Speaking Coach"

#### 2. Thêm section Interactive SAT Modules vào trang EnglishCourse (src/pages/EnglishCourse.tsx)
- Import `allEnglishModules` từ `@/data/languageCurriculum`
- Khi `courseId === "sat"`, hiển thị thêm một section "Bài học tương tác SAT" ngay sau phần Curriculum
- Filter `allEnglishModules` theo `category === "sat"` để hiển thị 5 modules SAT với link đến `/english/learn/{moduleId}`
- Hiển thị số bài học, icon, và mô tả cho mỗi module

### Files sẽ sửa

| File | Thay đổi |
|------|----------|
| `src/components/Navbar.tsx` | + link SAT trong English menu |
| `src/pages/EnglishCourse.tsx` | + import `allEnglishModules`, + section hiển thị SAT interactive modules khi `courseId === "sat"` |



Người dùng phản ánh 2 vấn đề trên trang `/programming/cloud-fundamentals` (Cloud Engineering):
1. Chưa hiển thị đầy đủ các mục/module trong pillar Cloud Engineer
2. Knowledge Check (quiz) cần viết bằng tiếng Anh

Tôi cần khảo sát cấu trúc hiện tại để xác định nguyên nhân.
<br>
Đã kiểm tra:
- `src/data/curriculum/cloudLessons.ts` có 5 modules (Fundamentals, Compute & Storage, Networking & Security, Serverless & DevOps, Architecture & Cost) với 14-15 lessons
- `src/data/curriculum/index.ts` đã export `cloudModules` vào `expandedModules`
- `src/pages/Programming.tsx` filter `course === "cloud"` hiển thị đúng 5 modules
- Trang `/programming/cloud-fundamentals` là `ProgrammingLessonPage` — render từng module, sidebar hiển thị tất cả modules cùng pillar (`getPillarModules("cloud")`)

**Nguyên nhân nghi ngờ vấn đề 1:** Sidebar "learning roadmap" trong `ProgrammingLessonPage` có thể chỉ hiển thị modules thuộc cùng pillar dựa vào mapping `PILLAR_COURSES`. Cần kiểm tra mapping này có bao gồm cloud modules không. Có khả năng `getPillarForModule("cloud-fundamentals")` trả về null → sidebar chỉ hiện 1 module hiện tại thay vì cả 5.

**Nguyên nhân vấn đề 2:** Quiz trong `cloudLessons.ts` đang viết bằng tiếng Việt (vd: "Mô hình nào...", "Đâu là..."). Cần dịch toàn bộ `quiz.question`, `options`, `explanation` sang tiếng Anh.

## Kế hoạch triển khai

### 1. Sửa sidebar pillar mapping (`src/pages/ProgrammingLesson.tsx`)
- Bổ sung 5 module IDs cloud (`cloud-fundamentals`, `cloud-compute-storage`, `cloud-network-security`, `cloud-serverless-devops`, `cloud-architecture-cost`) vào constant `PILLAR_COURSES` với pillar `"cloud"`
- Đảm bảo `getPillarModules("cloud")` trả về đầy đủ 5 modules → sidebar hiển thị toàn bộ Cloud roadmap

### 2. Dịch Knowledge Check sang tiếng Anh (`src/data/curriculum/cloudLessons.ts`)
- Dịch toàn bộ `quiz` array của ~15 lessons trong 5 modules:
  - `question`: tiếng Anh rõ ràng (vd: "Which model gives users the most control over OS and middleware?")
  - `options`: 4 phương án tiếng Anh
  - `explanation`: giải thích ngắn gọn tiếng Anh
- Giữ nguyên `theory` (VI) + `theoryEn` (EN), code, exercise — chỉ chuẩn hóa quiz vì Knowledge Check hiển thị duy nhất tiếng Anh theo yêu cầu

### 3. Files sẽ chỉnh sửa
- `src/pages/ProgrammingLesson.tsx` — cập nhật `PILLAR_COURSES` mapping
- `src/data/curriculum/cloudLessons.ts` — dịch quiz toàn bộ 5 modules sang EN

Không tạo file mới, không thay đổi schema.

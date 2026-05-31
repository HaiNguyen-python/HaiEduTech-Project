## Mục tiêu
Xây dựng trang **Assignment Management Dashboard** cho admin/teacher tại route `/admin/assignments`, theo phong cách "executive office" sáng — nền trắng, viền slate-100, text đậm — để Thầy Hải giao và theo dõi bài tập đa môn (AI Academy, English Hub, Chinese Hub, Scratch Coding).

## 1. Database (Lovable Cloud)

Tạo 2 bảng mới qua migration:

**`assignments`**
- `title`, `subject` (ai_academy | english | chinese | scratch), `level`, `assignment_type` (platform_exercise | custom_quiz | coding_project), `source_ref` (id bài tập gốc nếu có), `payload` (jsonb — quiz/dynamic content), `teacher_id`, `assigned_at`, `deadline` (nullable), `target_class` (text), `target_student_ids` (uuid[])

**`student_submissions`**
- `assignment_id`, `student_id`, `status` (assigned | in_progress | completed | overdue), `accuracy` (numeric %), `score`, `submitted_at`, `time_spent_seconds`, `answers` (jsonb)

RLS: teacher/admin full quyền; student chỉ xem/insert bài của chính mình. Mọi `CREATE TABLE` kèm GRANT đầy đủ.

Index trên `assignment_id`, `student_id`, `deadline`.

## 2. Route & Bảo vệ
- Thêm route `/admin/assignments` trong `src/App.tsx`, lazy-load `AdminAssignments.tsx`.
- Bảo vệ bằng `useUserRole` — chỉ teacher/admin truy cập, người khác redirect.
- Thêm link điều hướng từ `AdminDashboard` / `TeacherAdmin`.

## 3. Trang `src/pages/AdminAssignments.tsx`

Layout dọc, `bg-white`, card `border border-slate-100 rounded-xl`:

### A. Metric Cards (hàng trên)
2 card lớn, label uppercase tracking-wide màu slate-500, số lớn font-semibold:
- **ASSIGNED TESTS** — tổng assignments đang active (status ≠ completed).
- **CLASS RUNTIME / STUDY HOURS** — tổng `time_spent_seconds` từ submissions đổi sang giờ (1 chữ số thập phân).

### B. Filter Bar
Hàng inline:
- Select **Subject/Class** (AI Academy, English, Chinese, Scratch, All)
- Select **Status** (All, In progress, Completed, Overdue)
- Select **Level/Grade**
- Nút phải `bg-slate-900 text-white` **"Assign a test"** → mở `Dialog`:
  - Bước 1: chọn subject
  - Bước 2: chọn nguồn — platform exercise (list từ existing lessons) / custom quiz (form thêm câu hỏi) / coding project
  - Bước 3: chọn lớp hoặc multi-select học viên (từ `profiles` có role student)
  - Bước 4: chọn deadline (calendar) → submit insert `assignments` + tạo `student_submissions` status=assigned

### C. Data Table
`overflow-x-auto` trong card, `min-w-[1100px]`, hover `bg-slate-50`:
| No | Test Name | Subject/Level | Accuracy | Teacher | Progress | Assignees | Assigned time | Deadline | Status | Actions |

- **Accuracy**: vòng tròn radial nhỏ (SVG conic) hoặc text %, màu emerald nếu ≥80, amber 50–79, rose <50.
- **Progress**: % submission completed / total assignees, hiển thị cả số (vd 55.56%).
- **Status badge**:
  - In progress → `bg-amber-50 text-amber-700 border-amber-200`
  - Completed → `bg-emerald-50 text-emerald-700 border-emerald-200`
  - Overdue → `bg-rose-50 text-rose-700 border-rose-200`
- **Actions**: icon `Eye` mở drawer xem chi tiết tiến độ từng học viên (list submissions với accuracy, time spent); icon `Trash2` xóa (confirm).
- **Assigned time**: format `HH:mm - DD/MM/YYYY`.

### D. Detail Drawer (Eye)
`Sheet` bên phải hiển thị:
- Tên bài, subject, deadline
- Bảng học viên: tên, status, accuracy, time spent, submitted_at
- Nút "Gửi nhắc nhở" (placeholder toast giai đoạn 1).

## 4. Logic & Helpers
- File `src/lib/assignmentMetrics.ts`: tính progress, accuracy trung bình, runtime hours từ array submissions.
- Auto-cron không bắt buộc; status `overdue` tính derived ở client khi `deadline < now() AND status != completed`.
- Realtime (tùy chọn phase 2): enable realtime cho `student_submissions`.

## 5. Phong cách & Responsive
- Tailwind tokens hiện có; **không** dùng màu hard-code ngoài bảng status (đã liệt kê) — phần còn lại dùng `slate-*`, `bg-white`, `border-slate-100`, `text-slate-900/600/500`.
- Mobile: cards xếp dọc, table scroll ngang trong card (`overflow-x-auto`), min-width 1100px.
- Toàn bộ comment trong code bằng tiếng Anh.

## 6. Phạm vi không nằm trong lần này
- Auto-grade chi tiết cho mỗi loại bài (sẽ chỉ ghi `accuracy` khi student submit từ flow hiện có / quiz tự tạo).
- Notification email — chỉ chuẩn bị bảng, chưa nối edge function.

## Bước triển khai
1. Migration tạo 2 bảng + RLS + GRANT + index.
2. `src/lib/assignmentMetrics.ts` + types.
3. `src/pages/AdminAssignments.tsx` (metrics, filter, table, dialog tạo bài, drawer chi tiết).
4. Thêm route + link từ `AdminDashboard` và `TeacherAdmin`.
5. Smoke test: tạo 1 assignment giả, kiểm tra hiển thị, filter, xóa.

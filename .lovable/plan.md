
# Assistant Management & RBAC System

Build a role-based access control system for onboarding external Assistants (Cộng tác viên), with time-tracking, automatic payroll (50,000 VND/hr), and daily reports with screenshot uploads. Teacher Hai stays super_admin with exclusive access to financial/revenue metrics.

## 1. Database (migration)

Existing project already has `user_roles` table with `app_role` enum (`admin`, `teacher`, `student`). Plan:

- Add `'assistant'` to the `app_role` enum.
- Treat existing `admin` + `teacher` roles as super_admin (Teacher Hai's account `hainguyen240195@gmail.com` already has teacher role per memory).
- Create `public.time_logs` (id, user_id, clock_in, clock_out, duration_hours, calculated_salary, status enum 'active'/'completed', created_at).
- Create `public.daily_reports` (id, user_id, work_summary, feedback, screenshot_urls text[], created_at).
- Create private storage bucket `report-attachments`.
- RLS:
  - `time_logs`: assistant can SELECT/INSERT/UPDATE own rows; super_admin (admin or teacher) can SELECT all.
  - `daily_reports`: assistant can INSERT/SELECT own; super_admin SELECT all.
  - Storage RLS on `report-attachments`: user can upload/read own folder (`auth.uid()::text = (storage.foldername(name))[1]`); super_admin can read all.
- GRANTs on both tables + service_role.
- Helper function `public.is_super_admin(uuid)` = has_role(admin) OR has_role(teacher).

## 2. Super Admin View — new tab in `TeacherDashboard.tsx`

New tab **"Quản lý Cộng tác viên / Assistant Management"** containing 3 sub-sections:

- **User table**: list profiles with role `student` or `assistant`. Per row: `[Bổ nhiệm CTV]` (insert assistant role) / `[Thu hồi CTV]` (delete assistant role). Search by name.
- **Payroll Summary**: aggregated current-month table — Assistant name, total hours, total salary (`hours × 50000` VND, formatted vi-VN), entries count.
- **Received Reports**: timeline of `daily_reports` (newest first) with author, date, summary, feedback, screenshot thumbnail grid → click opens lightbox (reuse existing `Dialog`).

## 3. Assistant Admin View — new page `/assistant`

- New route `/assistant` guarded by `useUserRole`: only `assistant` role (and super_admin for preview). Students/anon → redirect home with toast.
- Login redirect logic: in `Login.tsx`, after sign-in check role → if pure assistant (no admin/teacher), redirect to `/assistant`.
- Layout: Navbar + clean Tailwind page. NO revenue widgets imported.
- **Time-Tracking Widget** (top):
  - Query latest `time_logs` row where status='active' for user.
  - If none → green `[▶ Bắt Đầu Làm Việc]` button → inserts row with clock_in=now(), status='active'.
  - If active → red `[⏹ Kết Thúc Công Việc]` + live elapsed timer (updates every second from clock_in). On click: update row with clock_out, duration_hours, calculated_salary = duration_hours × 50000, status='completed'.
- **My Time Logs (current month)**: table below widget — date, clock_in, clock_out, hours, salary.
- **Daily Report sub-tab**:
  - Textarea work_summary, textarea feedback, drag-and-drop image uploader (multiple, ≤5 MB each, image/* only) using `react-dropzone`-style native HTML5 DnD (no new dep needed).
  - Upload files to `report-attachments/{user_id}/{timestamp}-{name}`, collect public-style signed/public URLs (bucket is private → store path + use `getPublicUrl` after creating a signed URL helper, OR make bucket public-read with RLS). Decision: keep bucket **private**, store object paths in `screenshot_urls`, and use signed URLs on render (1h expiry).
  - On submit → insert `daily_reports` row, clear form, toast "Gửi báo cáo thành công!".

## 4. Route guard

- New `AssistantGuard` component wrapping `/assistant`. 
- For existing admin-only routes (revenue/income e.g. `AdminDashboard`, income management): add early return if user has `assistant` role but not super_admin → toast "403 - Bạn không có quyền truy cập" and `navigate('/assistant')`.

## 5. Files to create/edit

**Created**
- `supabase/migrations/<ts>_assistant_rbac.sql` — enum value, tables, RLS, grants, storage bucket policies, helper fn.
- `src/pages/AssistantDashboard.tsx` — main assistant view.
- `src/components/assistant/TimeTrackingWidget.tsx`
- `src/components/assistant/MyTimeLogs.tsx`
- `src/components/assistant/DailyReportForm.tsx`
- `src/components/admin/AssistantManagementTab.tsx` — wraps the 3 super-admin sections.
- `src/components/admin/PayrollSummary.tsx`
- `src/components/admin/ReceivedReportsTimeline.tsx`
- `src/hooks/useIsAssistant.ts` (small helper)
- `.lovable/memory/features/admin/assistant-rbac.md` — memory note.

**Edited**
- `src/hooks/useUserRole.ts` — extend `AppRole` to include `'assistant'`, expose `isAssistant`, `isSuperAdmin`.
- `src/pages/TeacherDashboard.tsx` — add new tab.
- `src/pages/Login.tsx` — post-login redirect for pure assistants.
- `src/App.tsx` — add `/assistant` route.
- `src/pages/AdminDashboard.tsx` (if exists) — block assistants.

## Technical details

- Storage bucket created via `supabase--storage_create_bucket` tool (private).
- Salary calc done **server-side via DB trigger** on `time_logs` update (when clock_out set) for tamper-proofing: duration_hours = EXTRACT(EPOCH FROM (clock_out - clock_in))/3600, calculated_salary = duration_hours × 50000. Client also sends the values, trigger overrides.
- Use existing shadcn `Table`, `Card`, `Tabs`, `Dialog`, `Button`, `Textarea`, `toast`.
- Currency formatting: `new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
- All comments in English (per spec).
- Tailwind tokens only (no raw colors).

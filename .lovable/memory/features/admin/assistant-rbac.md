---
name: Assistant RBAC System
description: Cộng tác viên role with time-tracking, auto payroll 50k VND/hr, and daily report uploads
type: feature
---

## Roles
- Enum `app_role` extended with `assistant`. Super admin = `admin` OR `teacher` (via `public.is_super_admin(uuid)`).
- `useUserRole` exposes `isAssistant`, `isSuperAdmin`, `isPureAssistant`.

## Tables
- `public.time_logs` (user_id, clock_in, clock_out, duration_hours, calculated_salary, status). BEFORE INSERT/UPDATE trigger `compute_time_log_salary` enforces server-side: duration = (clock_out - clock_in)/3600, salary = duration × 50000, status auto.
- `public.daily_reports` (user_id, work_summary, feedback, screenshot_urls text[]).
- RLS: user owns own rows; super admins SELECT all.

## Storage
- Private bucket `report-attachments`. Path convention: `{user_id}/{timestamp}-{file}`.
- Policies on storage.objects: user CRUD own folder; super admin SELECT all. Display via `createSignedUrls` (1h).

## Routes / UI
- `/assistant` (AssistantDashboard) — tabs: Chấm công (TimeTrackingWidget + MyTimeLogs) and Báo cáo (DailyReportForm). NO revenue widgets.
- Login.tsx redirects pure assistants → `/assistant`, others → `/dashboard`.
- AdminDashboard guards pure assistants → toast 403 + redirect `/assistant`.
- TeacherDashboard new "Cộng tác viên" tab → AssistantManagementTab (AssistantUserTable + PayrollSummary + ReceivedReportsTimeline).

## Payroll
- Fixed rate **50 000 VND/hour** (constant in TimeTrackingWidget for preview, server trigger for canonical value).
- PayrollSummary aggregates current month from `time_logs` where status='completed'.

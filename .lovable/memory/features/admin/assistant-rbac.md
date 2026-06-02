---
name: Assistant RBAC System
description: Cộng tác viên role with time-tracking, auto payroll 50k VND/hr, manual bonuses, and daily report uploads. Managed from Admin Dashboard → Operations → Cộng tác viên.
type: feature
---

## Roles
- Enum `app_role` extended with `assistant`. Super admin = `admin` OR `teacher` (via `public.is_super_admin(uuid)`).
- `useUserRole` exposes `isAssistant`, `isSuperAdmin`, `isPureAssistant`.

## Tables
- `public.time_logs` — BEFORE INSERT/UPDATE trigger `compute_time_log_salary` enforces server-side: duration = (clock_out - clock_in)/3600, salary = duration × 50000, status auto.
- `public.daily_reports` — work_summary, feedback, screenshot_urls text[].
- `public.assistant_bonuses` — (user_id, amount, reason, granted_by). RLS: user views own; super_admin grant/update/delete.

## Storage
- Private bucket `report-attachments`. Path: `{user_id}/{timestamp}-{file}`. Signed URLs (1h) for display.

## UI placement
- Admin Dashboard (`/admin-dashboard`) → tab group **Operations** → "Cộng tác viên" tab. (Removed from TeacherDashboard.)
- AssistantManagementTab contains: AssistantUserTable (appoint/revoke CTV) + PayrollSummary (with bonus dialog) + ReceivedReportsTimeline.
- `/assistant` (AssistantDashboard) — tabs Chấm công (TimeTrackingWidget + MyBonuses + MyTimeLogs) and Báo cáo (DailyReportForm). NO revenue widgets.

## Payroll & Bonuses
- Fixed rate **50 000 VND/hour** (server trigger canonical).
- PayrollSummary aggregates current month: lương cứng + thưởng = tổng nhận. Inline "Thưởng" button opens dialog with preset amounts (100k/200k/500k/1M) + reason. Inline revoke per bonus row.
- Assistant sees their own bonuses via MyBonuses widget on /assistant.

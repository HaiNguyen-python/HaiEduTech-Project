---
name: User Insights Tab
description: Tab "Quan tâm người dùng" trong AdminDashboard hiển thị page view analytics, top section, daily trend, và gợi ý phát triển nội dung
type: feature
---

Tab **"Quan tâm người dùng" (User Insights)** trong `/admin-dashboard`.

## Tracking
- Component `PageViewTracker` (mount inside `<BrowserRouter>` trong `App.tsx`) dùng hook `usePageViewTracker` lắng nghe React Router location changes.
- Mọi route change (kể cả khách chưa đăng nhập) được ghi vào bảng `page_view_log`:
  - `path`, `title`, `referrer`, `user_id` (nullable), `session_id` (anonymous, lưu localStorage `haiedu_anon_session`), `time_on_page_seconds`, `metadata`.
- `time_on_page_seconds` được update khi rời trang (next route) hoặc `beforeunload` (fetch keepalive PATCH).

## RLS
- Anyone (anon + authenticated) có thể INSERT.
- User xem được lượt xem của chính mình.
- Chỉ teacher/admin xem toàn bộ.

## UI (`src/components/admin/UserInsightsTab.tsx`)
- Range filter: 1d/7d/30d/90d (default 7d), giới hạn 5000 rows/query.
- KPI: Page Views, Sessions, Logged-in Users, Avg Time/Page.
- Bar chart Top Sections (group theo prefix route: IELTS, TOEIC, Chinese, Programming, ...).
- Line chart Daily Trend.
- Top 20 Pages table (label thân thiện từ `ROUTE_LABELS`, fallback hiển thị raw path).
- Recommendations card: gợi ý mục cần mở rộng (top), mục cần marketing (bottom), pages "sticky" (avg time > 120s).

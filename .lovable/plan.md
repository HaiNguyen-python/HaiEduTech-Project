

## Plan: Highlight + Đổi màu giao diện sổ tay + Sửa Study Streak

### 1. Thêm Highlight text trong sổ tay

- Cài thêm `@tiptap/extension-highlight` 
- Thêm extension vào editor config
- Thêm nút Highlight (icon `Highlighter`) vào toolbar với dropdown chọn màu highlight (vàng, xanh, hồng, cam)
- Thêm CSS cho `.notebook-editor mark` để hiển thị đúng

### 2. Đổi màu giao diện (theme) sổ tay

- Thêm state `notebookTheme` với 5-6 preset: Default, Cream, Dark, Blue, Green, Pink
- Mỗi theme định nghĩa `bg`, `headerBg`, `borderColor`, `textColor`
- Thêm nút đổi theme (icon nhỏ) cạnh nút reset vị trí trên header
- Apply theme colors vào panel container, header, editor area thông qua inline styles

### 3. Sửa Study Streak Ranking

**Vấn đề**: Function `get_streak_leaderboard` dùng logic `generate_series` lồng nhau rất phức tạp và không chính xác — nếu user không hoạt động hôm nay thì streak = 0 dù hôm qua vẫn hoạt động.

**Giải pháp**: Viết lại function đơn giản hơn:
- Lấy danh sách ngày hoạt động riêng biệt cho mỗi user
- Tính streak bằng cách đếm ngược từ hôm nay (hoặc hôm qua nếu chưa hoạt động hôm nay) — mỗi ngày liên tiếp tăng streak
- Dùng recursive CTE hoặc window function `LAG` để phát hiện gap giữa các ngày

```sql
-- Tính streak: đếm ngược từ ngày gần nhất, dừng khi gặp gap > 1
WITH user_dates AS (
  SELECT user_id AS uid, DATE(created_at) AS d
  FROM student_activity_log
  GROUP BY user_id, DATE(created_at)
),
numbered AS (
  SELECT uid, d, d - (ROW_NUMBER() OVER (PARTITION BY uid ORDER BY d))::int AS grp
  FROM user_dates
),
streaks AS (
  SELECT uid, grp, COUNT(*)::int AS len, MAX(d) AS last_day
  FROM numbered GROUP BY uid, grp
)
-- Chỉ lấy streak có last_day = today hoặc yesterday
SELECT ... FROM streaks WHERE last_day >= CURRENT_DATE - 1
```

### Files cần sửa

| File | Thay đổi |
|------|----------|
| `package.json` | Thêm `@tiptap/extension-highlight` |
| `src/components/FloatingNotebook.tsx` | Thêm highlight extension, nút highlight, theme switcher |
| `src/index.css` | CSS cho highlight marks |
| Migration SQL | Viết lại `get_streak_leaderboard` function |


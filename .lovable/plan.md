

## Plan: Tự động đồng bộ dữ liệu từ Google Sheet vào Income Management

### Tổng quan
Tạo Edge Function `sync-google-sheet` để đọc dữ liệu từ Google Sheet (ID: `1BpU2nN9_yqFHjXOS7hlFOpXv9-4NrRZNqbvnVzrBWBU`) và upsert vào bảng `revenue_logs`. Cập nhật nút "Sync Now" trong IncomeManagement để gọi function này.

### 1. Tạo Edge Function `sync-google-sheet`

**File mới:** `supabase/functions/sync-google-sheet/index.ts`

- Sử dụng Google Sheets API v4 với URL public CSV export (không cần API key vì sheet đã public):
  ```
  https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}
  ```
- Parse CSV data, map columns sang `revenue_logs` schema (student_name, course, payment_year, amount, status, kpi_met)
- Upsert vào `revenue_logs` (dùng service_role key) với logic tránh duplicate dựa trên student_name + course + payment_year
- JWT auth check (chỉ teacher/admin được gọi)
- Trả về số records đã sync

### 2. Cập nhật IncomeManagement component

**File:** `src/components/IncomeManagement.tsx`

- Sửa `handleSync` để gọi edge function `sync-google-sheet` thay vì chỉ re-fetch DB
- Hiển thị kết quả sync (số records mới/cập nhật)
- Thêm loading state + error handling

### 3. Cần xác nhận từ bạn

Trước khi implement, tôi cần biết:
- **Cấu trúc sheet**: Tên các cột trong Google Sheet là gì? (VD: Tên học sinh, Khóa học, Năm, Số tiền...)
- **Sheet có public không?** Nếu không, cần Google API key
- **Tên sheet tab** cần đọc (sheet1, sheet2...?)

### Files sẽ sửa/tạo

| File | Thay đổi |
|------|----------|
| `supabase/functions/sync-google-sheet/index.ts` | **Tạo mới** — Edge function đọc Google Sheet + upsert DB |
| `src/components/IncomeManagement.tsx` | Sửa handleSync gọi edge function |


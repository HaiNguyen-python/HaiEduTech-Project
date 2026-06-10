## Mục tiêu
Sửa lỗi giả "Rate limit" trong Health Check, thêm cơ chế tự khắc phục, và phân loại lỗi rõ ràng để bạn quản trị hiệu quả.

## Thay đổi

### 1. `supabase/functions/daily-health-check/index.ts` — viết lại
- **Batching**: chạy 60 edge function theo lô (concurrency = 5, nghỉ 300ms giữa các lô) → không còn rate-limit ảo.
- **Sửa Perplexity check**: dùng đúng cột `balance` (bảng `api_balance` không có `balance_usd`).
- **Pass 2 — Self-healing retry**: sau pass 1, gom các lỗi `fail` là **transient** (`429`, `502/503/504`, `timeout`, `fetch failed`, `rate limit`, `connection reset`), nghỉ 5s rồi retry 1 lần. Nếu pass → đánh dấu `auto_recovered = true`.
- **Suggested fix**: với mỗi lỗi thật, gắn gợi ý sửa ngắn (vd: `column ... does not exist` → "Schema mismatch — kiểm tra tên cột trong code function").
- **Notify thông minh**: chuông chỉ kêu khi có **lỗi thật** (transient đã tự phục hồi không kêu). Trigger thủ công thì luôn báo. Tiêu đề và body có gợi ý fix.
- **Authorization header** thêm vào OPTIONS edge để runtime tính rate-limit chính xác hơn.
- **Consume response body** mọi nơi để tránh socket leak trong Deno.

### 2. Bảng `health_check_runs` — đã thêm cột `auto_recovered int` (migration đã chạy).

### 3. `src/components/admin/HealthMonitorTab.tsx`
- Type `CheckResult` thêm `auto_recovered?`, `suggested_fix?`; `RunRow` thêm `auto_recovered?`.
- Thêm **stat card thứ 5**: "🔄 Tự phục hồi" (màu xanh dương).
- Bảng kết quả: dòng `auto_recovered` hiển thị badge xanh dương "Tự phục hồi" thay cho badge đỏ; cột "Chi tiết" hiển thị `suggested_fix` khi có.
- Chart 30 ngày: thêm line màu xanh dương "Tự phục hồi".
- Filter status: thêm tuỳ chọn "Tự phục hồi".

## Phạm vi không làm
- Không tự sửa code function (không an toàn).
- Không tự rotate secret / redeploy.
- Không gửi email — chỉ chuông.

## File sẽ sửa
- `supabase/functions/daily-health-check/index.ts` (viết lại)
- `src/components/admin/HealthMonitorTab.tsx` (cập nhật UI)

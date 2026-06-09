## Mục tiêu
Phát hiện và fix tất cả các trang đang bị trắng, crash, hoặc không load được trên HaiEduTech — không cần bạn phải thử thủ công từng URL.

## Cách làm

### Bước 1 — Trích xuất danh sách route
Đọc `src/App.tsx` (>280 routes), parse tất cả `<Route path="...">` thành 1 file `scripts/all-routes.json`. Loại bỏ route động (`:id`) hoặc thay bằng giá trị mẫu hợp lệ.

### Bước 2 — Smoke-test tự động bằng Puppeteer
Viết script `scripts/smoke-test-routes.mjs`:
- Mở headless Chrome, lần lượt visit từng route trên preview URL
- Với mỗi trang ghi nhận:
  - HTTP status (404, 500…)
  - Console errors (`pageerror`, `console.error`)
  - Trang có render content không (check `document.body.innerText.length > 100` sau 3s)
  - Lazy chunk load fail (`Failed to fetch dynamically imported module`)
- Xuất report `scripts/route-audit-report.json` + bảng tóm tắt: ✅ OK / ⚠️ Warning / ❌ Broken

### Bước 3 — Phân loại lỗi
Nhóm các lỗi tìm được theo root cause:
- **Lazy import hỏng** → file bị xoá/đổi tên nhưng route chưa cập nhật
- **Crash khi mount** → component throw (thiếu prop, gọi hook sai, dữ liệu null)
- **Route trùng / thứ tự sai** → route động nuốt route tĩnh
- **Backend lỗi** → query Supabase fail vì RLS hoặc cột bị đổi
- **Context lỗi** → dùng `useLanguage`/`useAuth` ngoài Provider

### Bước 4 — Fix từng nhóm
- Fix trực tiếp các lỗi nhỏ (route order, import path, null check)
- Với lỗi phức tạp → báo lại bạn quyết định trước khi sửa

### Bước 5 — Layer phòng vệ: Global Route Error Boundary
Thêm `<RouteErrorBoundary>` bao quanh mỗi lazy route trong `App.tsx`:
- Khi 1 trang crash → chỉ trang đó hiện thông báo "Trang gặp lỗi, bấm để thử lại" + nút về Home
- Tránh tình trạng **trắng cả web** khi 1 component lỗi
- Log error về console (và optionally về Supabase `error_logs` để bạn theo dõi)

### Bước 6 — Verify
Chạy lại smoke-test sau khi fix → đảm bảo 100% route trả về OK hoặc Warning (không còn Broken).

## Deliverables
1. `scripts/smoke-test-routes.mjs` — chạy lại bất cứ lúc nào sau update
2. `scripts/route-audit-report.json` — báo cáo chi tiết
3. Danh sách lỗi đã fix + file đã sửa
4. `src/components/RouteErrorBoundary.tsx` — bảo vệ tương lai
5. Tóm tắt cuối cùng: trang nào đã sửa, trang nào cần bạn quyết định thêm

## Lưu ý
- Smoke-test chạy ở chế độ **guest** (không login) → các trang yêu cầu auth sẽ redirect về `/auth`, đó là hành vi đúng, không tính là lỗi
- Sẽ test trên preview URL hiện tại, không ảnh hưởng dữ liệu production
- Ước tính: 5–10 phút quét + 10–30 phút fix tuỳ số lỗi phát hiện

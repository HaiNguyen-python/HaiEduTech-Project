## Vấn đề

Sổ tay (`/notebook` và Floating Notebook) đôi khi không hiển thị các ghi chú cũ dù dữ liệu vẫn còn trên Cloud (đã kiểm tra DB: 61 ghi chú, 24 user, ghi chú mới nhất 10/06/2026 — RLS chuẩn).

Nguyên nhân gốc nằm ở `src/lib/notebookService.ts`:

1. `writeSnapshot` ghi đè localStorage **kể cả khi server trả về mảng rỗng**. Khi session auth bị mất tạm thời (token refresh, đổi tab lâu, mạng chập chờn) → query thành công với 0 dòng (RLS lọc theo `auth.uid()` = null) → snapshot bị xoá sạch.
2. Hai trang dùng chung snapshot key (`notebook-snapshot-{uid}`) nhưng truyền **column set khác nhau** (Floating dùng default ít cột, trang Notebook đòi `is_public, user_id`) → đè lên nhau, snapshot fallback thiếu field.
3. `Notebook.tsx` / `FloatingNotebook.tsx` **không seed UI từ snapshot trước** khi server trả lời → trong vài giây đầu trang trông như "không có ghi chú nào".
4. Không có guard chặn fetch khi `auth.uid()` chưa sẵn sàng → race với `onAuthStateChange`.

## Giải pháp

### 1. Cứng hoá `src/lib/notebookService.ts`

- Trước khi query: gọi `supabase.auth.getSession()` và **abort** nếu không có session (trả về `{ rows: snapshot ?? [], fromSnapshot: true, error: "no_session" }`) — tuyệt đối không ghi snapshot rỗng.
- Luôn `SELECT` **superset đầy đủ** (`id, user_id, title, content, subject, is_public, created_at, updated_at`); param `columns` bị deprecate (vẫn nhận nhưng bỏ qua) để mọi caller chia sẻ cùng cấu trúc.
- `writeSnapshot` chỉ ghi khi `rows.length > 0`. Nếu server trả `[]` nhưng snapshot cũ có dữ liệu → giữ snapshot, trả `fromSnapshot: true` cộng error `"empty_result_preserved_cache"` để UI hiện cảnh báo "đang dùng bản sao lưu".
- Thêm hàm `mergeRows(existing, server)`: union theo `id`, giữ bản có `updated_at` mới hơn → ngay cả khi server thiếu vài row do RLS race, snapshot không "mất ghi chú".
- Bọc `writeSnapshot` trong try/catch, tăng giới hạn an toàn (cắt nếu >2 MB để tránh QuotaExceeded làm hỏng JSON).
- Thêm hàm `pruneSnapshot(userId, deletedId)` để các action delete (Notebook.tsx, FloatingNotebook.tsx) xoá đồng bộ khỏi cache thay vì để cache phình.

### 2. Seed UI từ snapshot ngay khi mount

Trong `src/pages/Notebook.tsx` và `src/components/FloatingNotebook.tsx`:

- Khi `user` đã có → đọc `readSnapshot(user.id)` đồng bộ và đẩy vào `notebooks` **trước** khi `fetchNotebooks()` chạy → người dùng thấy ghi chú cũ ngay lập tức, sau đó server refresh đè lên.
- Khi `fetchUserNotebooks` trả `fromSnapshot=true` vì `empty_result_preserved_cache`: hiện banner amber "Đang hiển thị bản sao lưu — máy chủ trả về danh sách rỗng (có thể do session vừa hết hạn). Nhấn Tải lại."
- Sau khi delete thành công: gọi `pruneSnapshot` rồi mới `fetchNotebooks()`.
- `useEffect` fetch: chỉ chạy khi `user?.id` thực sự đổi (compare bằng id), tránh fetch double do object reference khác.

### 3. Chống tái diễn

- Thêm comment đỏ ở đầu `notebookService.ts` cảnh báo "KHÔNG ghi snapshot rỗng — sẽ làm mất ghi chú cũ của học sinh".
- Thêm `console.warn` (chỉ dev) khi server trả 0 row nhưng snapshot có data — dễ phát hiện hồi quy.
- Cập nhật memory `mem://tech/backend-architecture` ghi rõ quy tắc: notebook fetch phải dùng `fetchUserNotebooks`, không bao giờ ghi snapshot rỗng, luôn merge thay vì overwrite.

### Files sẽ chỉnh

```text
src/lib/notebookService.ts              (rewrite: session guard, mergeRows, no-empty-write, pruneSnapshot)
src/pages/Notebook.tsx                  (seed snapshot, prune on delete, refined useEffect deps)
src/components/FloatingNotebook.tsx     (seed snapshot, prune on delete)
mem://tech/backend-architecture         (note new contract)
```

### Không đụng vào

- RLS / migration (chính sách đã đúng).
- Các component ghi vào `student_notebooks` (PhrasePractice, ShadowingPractice, SuperDictionary, …) — chúng đã phát event `notebook:updated` nên sẽ tự refresh sau khi sửa service.
- UI/UX khác của trang Notebook (editor, filters, PDF export).

## Verify sau khi build

1. Mở `/notebook` khi đang online → thấy đầy đủ ghi chú cũ + banner biến mất.
2. Tắt mạng → reload → ghi chú vẫn hiện (snapshot), banner "đang dùng bản sao lưu" xuất hiện.
3. Mở DevTools → `localStorage.setItem('notebook-snapshot-<uid>', '[]')` rồi reload khi online → ghi chú server vẫn về và snapshot được ghi lại (vì >0 row).
4. Đăng xuất rồi đăng nhập lại nhanh → snapshot KHÔNG bị xoá thành rỗng giữa chừng.
5. FloatingNotebook và trang `/notebook` hiển thị cùng một danh sách.
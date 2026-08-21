# Chia sẻ ghi chú trong Sổ tay

Giáo viên (hoặc bất kỳ học viên) chọn tên người nhận, ghi chú đó xuất hiện ngay trong sổ tay của người được chọn.

## Trải nghiệm người dùng

1. Trong sổ tay (cả trang `/notebook` và sổ nổi), mỗi ghi chú có nút **Chia sẻ**.
2. Nhấn nút mở hộp thoại:
   - Danh sách người dùng có thể tìm theo tên (dùng danh bạ sẵn có của Your Corner).
   - Chọn nhiều người cùng lúc, nhấn **Chia sẻ**.
   - Thấy danh sách người đang được chia sẻ, có nút bỏ chia sẻ.
3. Người nhận thấy tab mới **Được chia sẻ với tôi** trong sổ tay:
   - Hiển thị tên ghi chú, người chia sẻ, thời gian cập nhật.
   - Xem nội dung ở chế độ chỉ đọc (bao gồm cả hình bảng trắng đã chèn).
   - Nội dung tự cập nhật khi giáo viên sửa - phù hợp giảng bài online trực tiếp.
   - Nút **Lưu bản sao** để tạo bản riêng có thể tự sửa; nút **Ẩn** để bỏ khỏi danh sách.
4. Người nhận được thông báo (chuông) khi có ghi chú mới được chia sẻ.
5. Ghi chú được chia sẻ có nhãn rõ ràng để không lẫn với ghi chú riêng.

## Kỹ thuật

Migration mới (sẽ xin phê duyệt riêng):

- Bảng `public.notebook_shares`: `notebook_id`, `owner_id`, `recipient_id`, `hidden_by_recipient`, timestamps, unique (`notebook_id`, `recipient_id`).
- GRANT cho `authenticated` + `service_role`, bật RLS:
  - Chủ ghi chú tạo/xoá/xem bản ghi chia sẻ của mình (kiểm tra owner thực sự sở hữu ghi chú).
  - Người nhận xem và cập nhật cờ ẩn của chính mình.
- Thêm policy SELECT trên `student_notebooks`: người nhận đọc được ghi chú đã chia sẻ cho mình (dùng hàm security definer `can_read_shared_notebook` để tránh đệ quy RLS).
- Hàm `list_shared_with_me()` trả về ghi chú + tên/avatar người chia sẻ; hàm `share_notebook(_notebook_id, _recipient_ids[])` chèn nhiều bản ghi và tạo thông báo trong `assignment_notifications`.

Frontend:

- `src/lib/notebookShareService.ts`: chia sẻ, bỏ chia sẻ, đọc danh sách, lưu bản sao. Không đưa ghi chú được chia sẻ vào cache snapshot ghi chú riêng (giữ nguyên bất biến của `notebookService.ts`).
- `src/components/notebook/ShareNotebookDialog.tsx`: tìm kiếm người nhận, chọn nhiều, danh sách đã chia sẻ.
- `src/components/notebook/SharedWithMeList.tsx`: danh sách + xem chỉ đọc (HTML đã lọc bằng DOMPurify), realtime subscribe theo `notebook_shares`/`student_notebooks`.
- Cập nhật `src/pages/Notebook.tsx` và `src/components/FloatingNotebook.tsx`: thêm nút Chia sẻ và tab "Được chia sẻ".

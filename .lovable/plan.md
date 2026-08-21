# Chia sẻ ghi chú kèm quyền Xem / Chỉnh sửa

Khi chia sẻ, người chia sẻ chọn quyền cho từng học viên: **Chỉ xem** hoặc **Có thể chỉnh sửa**. Ghi chú được chia sẻ mở trực tiếp ngay trong sổ tay của học viên.

## Trải nghiệm người dùng

Phía người chia sẻ (giáo viên hoặc học viên):
- Trong hộp **Chia sẻ ghi chú** có công tắc chọn quyền: "Chỉ xem" (mặc định) hoặc "Có thể chỉnh sửa", áp dụng cho những người vừa chọn.
- Danh sách "Đang chia sẻ với" hiển thị nhãn quyền của từng người và cho đổi quyền ngay tại đó (nhấn vào nhãn để chuyển Xem ↔ Sửa), vẫn giữ nút bỏ chia sẻ.

Phía học viên nhận được:
- Tab **Được chia sẻ với tôi** (cả trang sổ tay và sổ nổi) hiển thị nhãn "Chỉ xem" hoặc "Có thể sửa".
- Nhấn **Mở** trên một ghi chú được chia sẻ: ghi chú mở ngay trong trình soạn của sổ tay các em.
  - Quyền "Có thể sửa": gõ được và tự lưu như ghi chú thường; ghi chú được đánh dấu rõ là ghi chú chia sẻ, có tên người chia sẻ và cảnh báo "mọi người cùng thấy thay đổi này".
  - Quyền "Chỉ xem": mở ở chế độ đọc, thanh công cụ bị vô hiệu, kèm nút **Lưu bản sao** để tự chỉnh sửa bản riêng.
- Nội dung tự làm mới trong lúc người chia sẻ đang sửa (phù hợp giảng online). Khi học viên có quyền sửa đang gõ, không ghi đè nội dung đang nhập.
- Vẫn giữ nút Ẩn và Lưu bản sao như hiện nay.

## Kỹ thuật

Migration (xin phê duyệt riêng):
- Thêm `can_edit boolean not null default false` vào `public.notebook_shares`.
- Hàm security definer `can_edit_shared_notebook(_notebook_id uuid)` kiểm tra tồn tại share cho `auth.uid()` với `can_edit = true`.
- Thêm policy UPDATE trên `student_notebooks`: người nhận có quyền sửa được cập nhật ghi chú đã chia sẻ (dùng hàm trên, tránh đệ quy RLS). Chỉ cho sửa `title`/`content`/`subject` bằng trigger chặn đổi `user_id`/`is_public`.
- Cập nhật `share_notebook(_notebook_id, _recipient_ids[], _can_edit boolean default false)` để ghi cờ quyền (ON CONFLICT cập nhật `can_edit`), thêm hàm `set_notebook_share_permission(_share_id uuid, _can_edit boolean)` cho chủ ghi chú.
- Cập nhật `list_notebooks_shared_with_me()` và `list_notebook_share_recipients()` trả thêm `can_edit`.
- Policy UPDATE hiện tại của người nhận trên `notebook_shares` chỉ cho đổi cờ ẩn - giữ nguyên, đổi quyền đi qua hàm của chủ ghi chú.

Frontend:
- `src/lib/notebookShareService.ts`: thêm `canEdit` vào `shareNotebook`, các kiểu `SharedNotebook`/`ShareRecipient`, thêm `setSharePermission`, và `updateSharedNotebook(notebookId, {title, content})` (ghi trực tiếp vào `student_notebooks`, có debounce ở tầng UI).
- `src/components/notebook/ShareNotebookDialog.tsx`: công tắc quyền, nhãn quyền + đổi quyền trong danh sách đã chia sẻ.
- `src/components/notebook/SharedWithMeList.tsx`: nhãn quyền, nút **Mở** phát ra callback `onOpen(note)` thay vì chỉ preview; giữ preview cho chế độ chỉ xem.
- `src/pages/Notebook.tsx` và `src/components/FloatingNotebook.tsx`: thêm chế độ "đang mở ghi chú được chia sẻ" - dùng cùng trình soạn tiptap, `editable` theo `can_edit`, tự lưu 0.5s khi có quyền sửa, polling làm mới khi không đang gõ, banner hiển thị người chia sẻ + quyền, nút thoát về danh sách. Không đưa ghi chú chia sẻ vào cache snapshot ghi chú riêng.

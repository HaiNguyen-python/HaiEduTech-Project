
Mục tiêu: sửa triệt để lỗi “đã báo lưu nhưng vẫn chỉ thấy 2 cụm từ” trong Phrase Practice.

1. Kết luận hiện trạng
- Phần append vào database đang chạy: log mạng cho thấy notebook đã được PATCH với cụm từ thứ 3.
- Lỗi chính nằm ở phần hiển thị/sync:
  - `PhrasePractice.tsx` append thành công nhưng không báo cho các UI notebook refetch lại.
  - `FloatingNotebook.tsx` chỉ fetch khi mở panel và còn có auto-save toàn bộ nội dung note, nên có thể ghi đè bằng bản cũ.
  - `Notebook.tsx` chỉ fetch lúc vào trang, nên nếu note được append từ nơi khác thì UI vẫn cũ cho tới khi reload.
- Có thêm vấn đề UX: nội dung note đang lưu dạng HTML block (`<p>`, `<hr/>`) nhưng `Notebook.tsx` lại render như text thường, nên rất khó nhìn ra các block append.

2. Cách sửa
- Trong `src/components/PhrasePractice.tsx`
  - Sau mỗi lần append thành công, phát event global kiểu `notebook:updated` kèm `noteId/title/updatedAt`.
  - Chỉ hiện toast “đã lưu” sau khi update/insert thành công và event đã bắn.
- Trong `src/components/FloatingNotebook.tsx`
  - Lắng nghe `notebook:updated` để refetch note mới nhất ngay cả khi panel đang mở.
  - Nếu đúng note đang được chọn, cập nhật lại editor content từ database.
  - Thêm chặn auto-save ghi đè dữ liệu mới:
    - theo dõi `lastSyncedUpdatedAt`
    - bỏ qua auto-save ngay sau khi sync từ server
    - trước khi save, kiểm tra bản remote có mới hơn bản local không; nếu có thì load bản mới thay vì overwrite mù
- Trong `src/pages/Notebook.tsx`
  - Lắng nghe `notebook:updated` và refetch danh sách để note mới append hiện ngay.
  - Render nội dung note dưới dạng HTML đã sanitize để các block append, dòng ngăn cách và format dễ nhìn.
- Trong `src/components/LastSessionRecap.tsx`
  - Đồng bộ refetch nhẹ khi có `notebook:updated` để phần recap không giữ bản cũ.

3. File sẽ cập nhật
- `src/components/PhrasePractice.tsx`
- `src/components/FloatingNotebook.tsx`
- `src/pages/Notebook.tsx`
- `src/components/LastSessionRecap.tsx`

4. Lưu ý kỹ thuật
- Không cần đổi schema database.
- Nếu render HTML ở notebook page sẽ dùng sanitize trước khi `dangerouslySetInnerHTML` để đúng chuẩn bảo mật hiện có.
- Auto-save của Floating Notebook sẽ được sửa theo hướng “sync-safe”, tránh việc note đang mở ghi đè các phrase mới append từ Phrase Practice.

5. Kiểm tra sau khi sửa
- Thực hành liên tiếp 4-6 cụm từ trong Phrase Practice, mỗi lần bấm Check/Rewrite đều phải append thêm block mới.
- Giữ Floating Notebook đang mở trong lúc luyện tập để xác nhận không còn overwrite về bản cũ.
- Mở trang `/notebook` mà không reload toàn trang, xác nhận note cập nhật ngay và hiển thị đủ tất cả cụm từ theo dạng append.

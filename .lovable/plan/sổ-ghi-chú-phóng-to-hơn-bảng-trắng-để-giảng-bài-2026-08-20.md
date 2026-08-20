# Sổ ghi chú: phóng to hơn + Bảng trắng để giảng bài

## 1. Phóng to sổ ghi chú

Hiện sổ chỉ kéo được tối đa 800x900 px. Sẽ nâng cấp:

- Kéo giãn tối đa theo cửa sổ (gần full màn hình) thay vì chặn ở 800x900.
- Thêm nút **Phóng to / Thu nhỏ** (Maximize) trên thanh tiêu đề: một cú nhấp là sổ chiếm gần toàn màn hình, nhấp lại về kích thước cũ.
- Nhớ kích thước và trạng thái phóng to trong localStorage để lần sau mở lại giữ nguyên.
- Thêm handle kéo ở cạnh trái và cạnh trên để giãn theo mọi hướng.

## 2. Tab Bảng trắng (Whiteboard)

Trong cửa sổ sổ ghi chú thêm 2 tab: **Ghi chú** và **Bảng trắng**.

Bảng trắng gồm:
- Vùng vẽ tự do bằng chuột, bút cảm ứng, hoặc ngón tay (hỗ trợ áp lực bút nếu có).
- Bút: 6 màu theo bảng màu thương hiệu + 3 độ dày; công cụ Highlight mờ.
- Gôm (eraser), Undo/Redo, Xóa tất cả.
- Nền: trắng, giấy kẻ ô, hoặc bảng xanh (giống bảng lớp học) - phù hợp khi giảng bài.
- Nút **Chèn vào ghi chú**: chuyển bản vẽ thành hình ảnh và chèn vào bài ghi chú đang mở, nên sẽ được lưu cùng ghi chú và xuất ra PDF như bình thường.
- Nút **Tải PNG** để lưu riêng bản vẽ.
- Bản vẽ được giữ tạm trong localStorage nên đổi tab hay đóng sổ không mất nét.

## Chi tiết kỹ thuật

- `src/components/FloatingNotebook.tsx`: nới giới hạn resize (max = `window.innerWidth/innerHeight` trừ lề), thêm state `maximized` + nút Maximize2/Minimize2, thêm handle `left`/`top`, lưu `notebook-size` / `notebook-maximized` vào localStorage, thêm thanh tab chuyển giữa editor và bảng trắng.
- Component mới `src/components/notebook/NotebookWhiteboard.tsx`: `<canvas>` với Pointer Events (`touch-action: none`), DPR scaling, lịch sử stroke dạng mảng để Undo/Redo, vẽ lại khi đổi kích thước canvas, xuất `toDataURL("image/png")`.
- Chèn ảnh: dùng extension `Image` của tiptap (nếu chưa có sẽ thêm `@tiptap/extension-image`) và `editor.chain().focus().setImage({ src })`. Ảnh nén ở tỉ lệ hợp lý để không làm phình dữ liệu ghi chú.
- Không đổi schema backend; ảnh nằm trong HTML content của `student_notebooks` như hiện tại.

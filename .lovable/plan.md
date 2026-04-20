

## Vấn đề
Khi mở IDE ở `/programming/...`, layout split-view ép cột nội dung bên trái xuống ~50% chiều rộng → CodeBlock & code trong IDE bị tràn, phải scroll ngang nhiều. Console output trong `PythonIDEPanel` (max-h 160px) và `SqlEditor` (max-h 240px) cũng quá thấp khi chạy query/code dài.

## Giải pháp (gọn, tập trung)

### 1. Tăng không gian đọc bằng resizable split-view
File `src/pages/ProgrammingLesson.tsx`:
- Thay layout `motion.div width: 50%` cứng bằng **`ResizablePanelGroup`** (đã có sẵn `src/components/ui/resizable.tsx`)
- Mặc định: 60% nội dung lý thuyết / 40% IDE — dễ đọc hơn
- Người dùng có thể **kéo handle** để mở rộng tùy ý (ví dụ kéo IDE rộng 70% khi viết code dài)
- Min size: lý thuyết 35%, IDE 30% → không bao giờ bị bóp đến mức không đọc được
- Giữ animation fade-in nhẹ thay vì width animation (tránh xung đột với resizable)

### 2. Fix word-wrap & spacing trong IDE panels
File `src/components/PythonIDEPanel.tsx`:
- Console output: tăng `max-h-[160px]` → `max-h-[280px]`, font `text-xs` → `text-sm`
- Đảm bảo `whitespace-pre-wrap break-words` (dòng dài tự xuống hàng thay vì scroll ngang)
- AI help box: thêm `break-words` + tăng padding

File `src/components/SqlEditor.tsx`:
- Console output: tăng `max-h-[240px]` → `max-h-[360px]`
- Bảng kết quả SQL: bọc trong `overflow-x-auto` riêng, giữ font-mono nhưng tăng `text-sm` → dễ đọc số liệu

### 3. Mobile: tăng chiều cao IDE
- IDE drawer mobile hiện tại fix `height: 400` → tăng lên `height: 540` (lesson Python thường cần > 8 dòng code + console)
- Thêm nút "Expand fullscreen" cho mobile để học sinh có thể tập trung viết code

### 4. CodeBlock trong nội dung lý thuyết
File `src/components/CodeBlock.tsx`:
- Hiện đã có `overflow-x-auto`, nhưng khi cột bị hẹp → vẫn scroll. Bổ sung `wrapLongLines={true}` cho `SyntaxHighlighter` (giữ syntax color, tự xuống hàng cho dòng > viewport)
- Tăng `font-size` thực tế từ ~13px lên 14px khi container hẹp

## Phạm vi thay đổi
| File | Thay đổi |
|---|---|
| `src/pages/ProgrammingLesson.tsx` | Resizable split-view + tăng mobile IDE height |
| `src/components/PythonIDEPanel.tsx` | Console rộng hơn + break-words |
| `src/components/SqlEditor.tsx` | Console rộng hơn + bảng SQL dễ đọc |
| `src/components/CodeBlock.tsx` | wrapLongLines cho SyntaxHighlighter |

## Không thay đổi
- Logic Pyodide / sql.js / AI Debug
- Layout khi IDE đóng (vẫn full-width đọc thoải mái)
- Theme màu Dracula của `CodePlayground` (Python Pathway dùng component khác — không bị ảnh hưởng)


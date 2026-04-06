

## Plan: Thêm tính năng kéo giãn (resize) cho Floating Notebook

### Thay đổi

#### Cập nhật `src/components/FloatingNotebook.tsx`

**Thêm resize state + logic:**
- Thêm state `size: { width, height }` khởi tạo `{ width: 460, height: 600 }`
- Thêm ref `resizing` + `resizeEdge` để track hướng resize (right, bottom, bottom-right)
- Thêm `onMouseDown` handlers trên 3 cạnh: phải, dưới, góc dưới-phải
- Cập nhật `onMouseMove` global listener để xử lý cả drag lẫn resize
- Clamp kích cỡ tối thiểu 360x400, tối đa 800x900

**UI thay đổi:**
- Thay `className="w-[460px] max-h-[600px]"` bằng `style={{ width: size.width, height: size.height }}`
- Thêm 3 vùng resize handles:
  - Cạnh phải: thanh mỏng 4px dọc bên phải, cursor `e-resize`
  - Cạnh dưới: thanh mỏng 4px ngang dưới đáy, cursor `s-resize`
  - Góc dưới-phải: ô 12x12px góc, cursor `se-resize`, hiện icon grip nhỏ
- Editor area dùng `flex-1` để tự co giãn theo height của panel

### Files thay đổi
- `src/components/FloatingNotebook.tsx` — thêm resize logic + handles


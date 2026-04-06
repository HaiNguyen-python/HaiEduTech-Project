

## Plan: Nâng cấp Floating Notebook — Rich Text + Draggable + Kích cỡ lớn hơn

### Thay đổi

#### 1. Cài thư viện rich text editor
- Thêm `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-bullet-list`, `@tiptap/extension-ordered-list` vào `package.json`
- Tiptap nhẹ, dùng JSON/HTML output, phù hợp với floating widget

#### 2. Viết lại `src/components/FloatingNotebook.tsx`

**Rich text toolbar:**
- Thanh công cụ nhỏ gọn phía trên editor: Bold (B), Italic (I), Underline (U), Bullet list, Ordered list
- Dùng Tiptap `useEditor` hook, lưu content dạng HTML
- Khi load ghi chú cũ (plain text), tự convert sang HTML

**Draggable:**
- Thêm drag handle ở header (icon GripVertical)
- Dùng state `position: { x, y }` + `onMouseDown/onMouseMove/onMouseUp` trên header để kéo thả panel
- Panel dùng `style={{ top, left }}` thay vì class `fixed bottom-24 left-6`
- Giữ panel trong viewport (clamp vị trí)

**Kích cỡ lớn hơn:**
- Tăng từ `w-[380px] max-h-[520px]` → `w-[460px] max-h-[600px]`
- Tăng textarea height từ 240px → 320px

#### 3. Giữ nguyên logic
- Auto-save 5s, fetch/save notebooks, note selector, subject picker — không thay đổi
- Content lưu dạng HTML vào cột `content` (text) hiện tại — tương thích ngược

### Files thay đổi
- `package.json` — thêm tiptap packages
- `src/components/FloatingNotebook.tsx` — viết lại với rich text + drag + size lớn hơn




## Plan: Sửa Sổ tay + Thêm từ loại IELTS Vocabulary

### Vấn đề & Giải pháp

**6 vấn đề cần sửa:**

1. **Sổ tay mở bên trái thay vì bên phải** — Vị trí mặc định `x: 24` (góc trái). Đổi thành `x: window.innerWidth - 500` để mở sát bên phải, gần nút bấm.

2. **Ordered list không hoạt động** — StarterKit mặc định bật OrderedList, nhưng có thể bị CSS `prose` ghi đè. Thêm CSS để đảm bảo `ol` trong editor có `list-style: decimal` và `ul` có `list-style: disc`.

3. **Thiếu chức năng đổi màu chữ** — Thêm extension `@tiptap/extension-color` + `@tiptap/extension-text-style`. Thêm nút chọn màu (color picker) vào toolbar với một số màu preset.

4. **iPad không kéo được** — Chỉ dùng `mousemove/mouseup`, thiếu touch events. Thêm `touchstart/touchmove/touchend` handlers song song.

5. **Sổ tay bị đẩy lên trên khuất header** — Vị trí `y` mặc định có thể âm trên màn hình nhỏ (`window.innerHeight - 640` < 0). Clamp `y` tối thiểu 60px (dưới header) để luôn thấy thanh kéo. Thêm nút "reset vị trí" nếu panel nằm ngoài viewport.

6. **Thêm từ loại (part of speech) cho IELTS Vocabulary** — Thêm trường `partOfSpeech` vào `IeltsWord` interface và bổ sung dữ liệu cho toàn bộ 800+ từ. Hiển thị badge từ loại trên trang IeltsVocabulary.

### Files cần sửa

| File | Thay đổi |
|------|----------|
| `src/components/FloatingNotebook.tsx` | Sửa vị trí mặc định sang phải, thêm touch events, clamp Y, thêm color picker, fix CSS cho ordered list |
| `src/index.css` | Thêm CSS rule cho `.ProseMirror ol { list-style: decimal }` |
| `src/data/ieltsVocabData.ts` | Thêm `partOfSpeech` vào interface + data |
| `src/pages/IeltsVocabulary.tsx` | Hiển thị badge từ loại |
| `package.json` | Thêm `@tiptap/extension-color`, `@tiptap/extension-text-style` |

### Chi tiết kỹ thuật

**Touch support cho iPad:**
```text
onTouchStart → ghi offset, set dragging
onTouchMove → cập nhật position (e.touches[0])  
onTouchEnd → reset dragging
```

**Color picker:** Thêm dropdown nhỏ với 8 màu preset (đen, đỏ, xanh dương, xanh lá, cam, tím, hồng, vàng) + 1 nút reset về mặc định.

**Clamp vị trí khi mở:** Đảm bảo `y >= 10` và `y + height <= window.innerHeight`, tự điều chỉnh nếu vượt viewport.


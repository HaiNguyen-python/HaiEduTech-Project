

## Plan: Sửa lỗi TS + Cập nhật trang For Vietnamese Children

### Phần 1: Sửa lỗi build `lessonsExpansion.ts`

Cả 3 module đều thiếu field `category` (bắt buộc theo type `VietnameseModule`). Thêm `category` cho mỗi module:
- Module `vn-adv-reading` → `category: "reading"`
- Module `vn-adv-grammar` → `category: "grammar"`
- Module `vn-culture-expanded` → `category: "folklore"`

### Phần 2: Cập nhật trang ForVietnameseChildren.tsx

3 thay đổi:

1. **Thêm nút "I donated"** với hiệu ứng cảm ơn: state `showThanks`, khi bấm → hiện animation confetti/hearts + message cảm ơn bằng motion.
2. **Thêm gallery hình trẻ em** vui cười — dùng ảnh từ Unsplash (free, no-auth URLs). Hiển thị grid 2x3 hoặc 3x2 ảnh trẻ em Việt Nam hồn nhiên.
3. **Bỏ dòng `— Teacher Hai 🇻🇳`** (line 248).

### Files thay đổi
- `src/data/vietnamese/lessonsExpansion.ts` — thêm `category` cho 3 modules
- `src/pages/ForVietnameseChildren.tsx` — thêm nút donated + gallery + bỏ Teacher Hai line


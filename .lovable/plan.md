

## Plan: Thay Stroke Guide animation bằng nét đứt hướng dẫn viết

### Thay đổi

Thay thế component `StrokeAnimation` (dùng `motion.path` animate pathLength) bằng một component mới hiển thị chữ cái dưới dạng **nét đứt (dashed lines)** tĩnh — giống như vở tập viết, người học nhìn thấy hình dạng chữ bằng nét đứt và có thể tô theo.

### Chi tiết

**File: `src/pages/VietnameseAlphabet.tsx`**

1. **Thay component `StrokeAnimation`** bằng component `DashedGuide`:
   - Vẫn dùng SVG viewBox `0 0 40 70` với các guide line (x-height, baseline)
   - Các path từ `strokePaths` được render với `strokeDasharray="2,2"` (nét đứt) thay vì animation
   - Màu nhạt hơn (muted) để người học dễ nhận biết đây là hướng dẫn, không phải nét đã viết
   - Thêm các mũi tên nhỏ hoặc số thứ tự nét để chỉ hướng viết

2. **Bỏ logic animation**: Xóa state `animateStroke`, hàm `replayStroke`, và nút replay (RotateCcw) vì không còn animation.

3. **Đổi label** từ "Stroke Guide" thành "Hướng dẫn nét viết" và bỏ badge số nét nếu không còn cần thiết (hoặc giữ lại để tham khảo).

4. **Giữ nguyên** phần WritingCanvas, ví dụ từ, phát âm — không đổi.

### Không thay đổi
- `alphabetData.ts` — vẫn dùng `strokePaths` hiện có, chỉ render khác
- Các component khác, routing, data


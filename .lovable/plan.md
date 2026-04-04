

## Plan: Thay 4 hình nền lịch sử bằng hình phù hợp hơn

### Hiện trạng
Code đã có sẵn hệ thống `historyBackgrounds` với 4 ảnh Unsplash hiển thị mờ (opacity 8%) phía sau các ô bài học. Tuy nhiên các ảnh hiện tại có thể không load được hoặc không đủ liên quan đến nội dung.

### Thay đổi (file: `src/pages/Vietnamese.tsx`)

**Thay 4 URL ảnh Unsplash** bằng các ảnh phù hợp hơn với từng giai đoạn:

| Card | Giai đoạn | Ảnh mới |
|------|-----------|---------|
| month-1 | Early Kingdoms (Hùng Vương, Âu Lạc, Đông Sơn) | Trống đồng Đông Sơn — biểu tượng văn minh cổ đại |
| month-2 | Golden Dynasties (Lý, Trần, Lê) | Văn Miếu Quốc Tử Giám — biểu tượng thời kỳ hoàng kim |
| month-3 | Modern History (Tây Sơn, Pháp thuộc, Hồ Chí Minh) | Lăng Chủ tịch / cờ đỏ sao vàng — biểu tượng độc lập |
| month-4 | Contemporary Vietnam (Đổi Mới, hội nhập) | Skyline TP.HCM hiện đại — biểu tượng phát triển |

**Tăng opacity nhẹ** từ `0.08` lên `0.12` (dark: `0.15`) để hình nền rõ hơn một chút nhưng vẫn không ảnh hưởng đến text.

### Chi tiết kỹ thuật
- Chỉ thay 4 URL trong object `historyBackgrounds` (dòng 33-38)
- Sử dụng ảnh Unsplash với keyword chính xác hơn, đảm bảo load được
- Cập nhật class opacity trên thẻ `<img>` (dòng 361)
- Không thay đổi layout hay logic khác


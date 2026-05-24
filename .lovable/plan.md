## Mục tiêu
Thay hiệu ứng conic-gradient xoay (đang nhìn như đường chéo quay trong ô) bằng hiệu ứng **một tia sáng/dòng điện chạy dọc theo viền** của mỗi ô bài học — giống "marching ants" phát sáng, đi vòng quanh chu vi card.

## Cách làm (chỉ sửa CSS, không đụng JSX)

File: `src/index.css` — viết lại block `.electric-border` ở cuối file.

### Kỹ thuật
Dùng **2 lớp gradient tuyến tính** chạy quanh viền qua `background` + `mask` để chỉ hiện ở viền (border 2px):

1. **Lớp nền viền**: gradient mờ tĩnh (xanh dương → emerald) làm "dây dẫn".
2. **Lớp tia sáng chạy**: một dải sáng hẹp (~20% chiều dài) di chuyển dọc theo chu vi bằng `background-position` animation, blend-mode `screen`, có `drop-shadow` glow.

Cách triển khai gọn:
- `::before` = viền tĩnh phát sáng nhẹ (gradient 2 màu thương hiệu) + mask để chỉ hiện đường viền 2px.
- `::after` = một đoạn gradient sáng trắng/cyan ngắn, dùng `background-size: 400% 400%` và animate `background-position` từ `0% 0%` → `100% 0%` → `100% 100%` → `0% 100%` → `0% 0%` (đi 4 cạnh theo chiều kim đồng hồ), thời lượng 3.5s linear infinite. Cũng dùng mask viền 2px.

Không còn `conic-gradient` xoay, không còn cảm giác "quay trong ô".

### Biến thể `.electric-strong` (cho card ≥3 sao)
- Tia sáng chạy nhanh hơn (1.8s)
- Màu vàng/cam (#F59E0B → #EF4444) thay vì xanh
- Glow mạnh hơn (drop-shadow lớn)
- Thêm pulse nhẹ ở lớp viền nền

### Giữ nguyên
- Tên class `.electric-border` và `.electric-border.electric-strong` → không cần sửa `AIAcademy.tsx`.
- `@media (prefers-reduced-motion: reduce)` tắt animation.
- Glow box-shadow xung quanh card vẫn pulse nhẹ.

## Phạm vi
- Sửa 1 file duy nhất: `src/index.css` (block "AI Academy: Electric Border Effect").
- Không thay đổi component, không thay đổi data, không thay đổi behavior.

## Kiểm tra sau khi build
- Mở `/programming/ai-academy`, xem 1 tia sáng chạy dọc viền theo chu vi mỗi card (không xoay chéo trong ô nữa).
- Card đã đạt ≥3 sao: tia vàng/cam chạy nhanh + glow ấm hơn.
- Reduced motion: viền tĩnh, không animation.
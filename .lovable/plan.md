

## Plan: Sửa stroke guide cho 5 chữ ă, g, i, ơ, ư

### Vấn đề cụ thể

Dựa trên code hiện tại (viewBox `0 0 40 70`):

1. **ă**: Dấu breve `M13,16 Q20,8 27,16` — cong **lên** (concave up) giống circumflex. Breve (˘) phải cong **xuống** (concave down) → cần đổi thành `Q20,22` thay vì `Q20,8`.

2. **g**: Oval body dùng chung template 4-bezier nhưng descender `M32,38 L32,62 C32,68 16,68 16,62` bắt đầu từ giữa oval (y=38) thay vì từ cạnh phải dưới. Chữ 'g' viết tay có descender bắt đầu từ bên phải oval tại baseline, uốn cong sang trái tạo móc. Cần vẽ lại descender tự nhiên hơn.

3. **i**: Chấm `M19,16 L21,16` chỉ dài 2px — quá nhỏ, gần như không thấy. Cần thay bằng hình tròn nhỏ (circle path) hoặc đường dài hơn với stroke-linecap round.

4. **ơ**: Horn `M34,22 C36,14 42,14 40,24` — nằm ngoài viewBox (x=42 > 40). Cần dịch horn vào trong viewBox và vẽ rõ hơn, dạng nét cong ngắn nhô lên từ góc trên phải oval.

5. **ư**: Horn `M30,18 C33,10 39,12 37,22` — tương tự ơ, vượt ra ngoài viewBox. Cần điều chỉnh vào bên trong và phóng to.

### Thay đổi cụ thể

**File:** `src/data/vietnamese/alphabetData.ts`

| Chữ | Nét sửa | Path mới |
|-----|---------|----------|
| ă | Breve phải cong xuống (˘) thay vì cong lên (^) | `M12,14 Q20,22 28,14` |
| g | Descender bắt đầu từ baseline bên phải, uốn cong sang trái có móc | `M32,42 L32,60 C32,68 12,68 12,60` |
| i | Chấm tròn rõ hơn — dùng circle path | `M20,16 A1.5,1.5 0 1,1 20,15.99 Z` hoặc tăng độ dài `M18,16 L22,16` |
| ơ | Horn dịch vào trong viewBox, rõ hơn | `M33,24 C35,16 39,18 37,24` (giữ x < 40) |
| ư | Horn dịch vào trong viewBox, phóng to | `M30,20 C32,12 38,14 36,22` |

### Không thay đổi file khác

Chỉ sửa `strokePaths` cho 5 entry trong `alphabetData.ts`.


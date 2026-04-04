

## Plan: Sửa lại stroke guide cho 8 chữ cái a, ă, â, ô, ơ, ư, đ, d

### Vấn đề hiện tại

Các đường SVG path hiện tại có vấn đề về hình dạng:
- **a, ă, â**: Oval body dùng 2 đoạn cubic bezier tạo hình trứng méo, không giống chữ 'a' viết tay thực tế. Cần vẽ oval tròn đều hơn dùng 4 đoạn bezier (tiêu chuẩn vẽ ellipse bằng SVG).
- **d**: Cùng oval như 'a' nên cũng bị méo. Stem ascender cần kết nối tự nhiên hơn với oval.
- **đ**: Kế thừa lỗi từ 'd', thêm nét gạch ngang vị trí hợp lý hơn.
- **ô**: Oval dùng quá nhiều control point tạo hình bất đối xứng. Cần vẽ lại bằng ellipse chuẩn.
- **ơ**: Kế thừa lỗi từ 'ô', dấu móc (horn) cần rõ hơn.
- **ư**: Dấu móc (horn) quá nhỏ, khó thấy.

### Cách sửa

**File thay đổi:** `src/data/vietnamese/alphabetData.ts`

Vẽ lại strokePaths cho 8 chữ:

1. **Oval chuẩn cho a/ă/â/d/đ**: Dùng 4 đoạn cubic bezier tạo ellipse đều — `M20,24 C9,24 4,32 4,38 C4,44 9,52 20,52 C31,52 36,44 36,38 C36,32 31,24 20,24` rồi dịch sang trái cho khớp stem bên phải.

2. **Oval chuẩn cho o/ô/ơ**: Dùng cùng kỹ thuật 4-bezier ellipse, căn giữa viewBox.

3. **Dấu phụ (diacritics)**: Phóng to dấu breve (˘), circumflex (^), horn (ơ/ư) — tăng kích thước khoảng 30% và điều chỉnh vị trí y để không bị quá gần thân chữ.

4. **Chữ d vs a**: Phân biệt rõ — 'a' stem từ y=24→52, 'd' stem từ y=8→52. Oval của 'd' nằm ở nửa dưới stem.

5. **Chữ đ**: Nét gạch ngang dịch lên vị trí y=18-20 (giữa ascender), dài hơn để dễ thấy.

6. **Dấu horn cho ơ, ư**: Tăng kích thước curve, dùng stroke dày hơn để rõ ràng.

### Chi tiết kỹ thuật

Chỉ thay đổi mảng `strokePaths` trong `alphabetData.ts` cho 8 entries. Không thay đổi component render hay file khác.


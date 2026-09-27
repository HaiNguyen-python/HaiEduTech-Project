# Làm lại ô học phí trong bảng khóa học (English / Chinese / Programming)

## Vấn đề
- Số tiền dùng chữ 24px rất đậm (text-2xl extrabold) — quá lớn so với phần còn lại của bảng.
- Ô "Lớp nhóm" viền xanh nhạt và ô "Kèm 1-1" nền xanh đậm chói — hai ô cạnh nhau giành sự chú ý, thiếu chuyên nghiệp.
- Áp dụng cho cả 3 trang /english, /chinese, /programming vì dùng chung một bảng.

## Giải pháp — sửa 1 file: `src/components/courses/CourseTuitionSection.tsx`
Chỉ đổi cách hiển thị ô giá (PriceCell) và khoảng cách trong bảng; dữ liệu, giá tiền, link đăng ký giữ nguyên.

1. **Chữ số nhỏ vừa phải:** số EUR cỡ ~18px (text-lg) đậm vừa; "EUR" nhỏ hơn; dòng quy đổi VND cỡ 12-13px, màu nhạt (muted) bên dưới.
2. **Phân cấp nhẹ nhàng giữa 2 loại lớp:**
   - Lớp nhóm: ô nền trắng/card, viền mảnh màu border — tĩnh, trung tính.
   - Kèm 1-1: ô nền tint rất nhẹ theo màu môn học (primary/destructive/accent với độ trong suốt thấp ~5-10%), viền nhấn nhẹ, không còn nền màu đặc.
   - Ô 1-1 có nhãn nhỏ "Kèm riêng / One-to-one" phía trên để phân biệt mà không cần màu chói.
3. **Nút đăng ký gọn:** chuyển thành nút nhỏ dạng outline/ghost với icon thẻ, không còn đường kẻ ngang dày trong ô.
4. **Căn giữa nội dung ô giá** để bảng trông thẳng hàng, chuyên nghiệp.
5. **Dùng token màu hiện có** (primary, muted, border, card) — không hardcode màu, tự động đúng chế độ sáng/tối và đúng màu từng môn học.

## Kiểm tra
- Build không lỗi.
- Chụp màn hình bảng trên /english bằng Playwright (máy tính) xác nhận: chữ số nhỏ hơn, hai ô phân biệt rõ nhưng nhẹ nhàng, không vỡ bố cục.

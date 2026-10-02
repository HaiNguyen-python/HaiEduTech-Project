# Ảnh nền minh họa cho tiêu đề trang IELTS và Chinese

## Mục tiêu
Tiêu đề lớn (biểu tượng + tên trang + mô tả) ở các trang IELTS và Chinese có ảnh nền minh họa nhẹ nhàng, chữ vẫn rõ, đọc tốt trên điện thoại.

## Cách làm
1. Tạo 2 ảnh nền ngang (rộng, tông sáng, không chữ):
   - IELTS: bàn học với sách luyện thi, tai nghe, bút, giấy thi, gam xanh dương - xanh lá của HaiEduTech.
   - Chinese: thư pháp, mực tàu, giấy đỏ, đèn lồng, chữ Hán mờ trang trí, gam ấm nhẹ.
2. Làm một khung tiêu đề dùng chung: ảnh nền bo góc, lớp phủ mờ sáng (tự tối hơn ở chế độ tối) để chữ luôn dễ đọc; giữ nguyên biểu tượng, tên và mô tả hiện có.
3. Áp dụng cho các trang:
   - IELTS: Skills Practice, Your Performance, Writing Practice, Lectures (danh sách, chủ đề, bài giảng).
   - Chinese: HSK Level Guide, HSK Grammar, Listening, Culture Hub, HSKK Speaking Room, Chinese Writing Practice.
4. Kiểm tra bằng ảnh chụp trên máy tính và điện thoại.

## Chi tiết kỹ thuật
- Ảnh tạo bằng image generation, lưu `src/assets/headers/ielts-header-bg.jpg`, `chinese-header-bg.jpg` (1920x640).
- Component mới `src/components/common/IllustratedPageHeader.tsx` nhận `variant: "ielts" | "chinese"` và children; overlay dùng token `bg-background/80` + `backdrop-blur-sm`, không hardcode màu.
- Thay `motion.header` hiện tại ở từng trang bằng wrapper này, không đổi nội dung.

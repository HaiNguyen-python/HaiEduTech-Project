# "The Beauty of Vietnam" - Thư viện ảnh nghệ thuật kiểu tạp chí

## Mục tiêu
Nâng cấp khu vực ảnh đẹp Việt Nam trong trang `/learn-vietnamese/alphabet` (`src/pages/VietnameseAlphabet.tsx`, section "VIETNAM BEAUTY GALLERY", ~dòng 529-574) từ 3 card trắng đơn giản thành thư viện nổi kiểu tạp chí (phương án "Editorial Floating Gallery" người dùng đã chọn).

## Giữ nguyên (bảo tồn)
- Đủ 15 ảnh hiện có (`/vietnam-beauty-1..15.webp`) + tiêu đề và chú thích song ngữ Việt - Anh.
- Tự động trượt mỗi ~4 giây (embla `Autoplay`, pause khi hover), nút Previous/Next.
- Route, chữ cái, tiến độ học, backend: không thay đổi gì ngoài section gallery này.
- Mobile-first: 1 ảnh/trượt trên mobile, 2-3 trên desktop (giữ `basis-full md:basis-1/2 lg:basis-1/3`).

## Thay đổi thiết kế

### 1. Header của section
- Tiêu đề lớn font display (font-family display hiện có của dự án, tương tự hero banner): "The Beauty of Vietnam" với chữ "Vietnam" gradient xanh dương → xanh ngọc (dùng class gradient token hiện có của dự án, ví dụ `bg-clip-text` với gradient brand - không hardcode hex mới).
- Dòng phụ song ngữ chữ hoa cách đều (subtitle "Vẻ Đẹp Việt Nam").
- Nút Previous/Next chuyển lên hàng tiêu đề (bên phải), dạng nút tròn viền nhẹ có shadow - thay cho 2 nút trôi giữa dải ảnh hiện tại.

### 2. Thẻ ảnh (card)
- Ảnh tỉ lệ dọc `aspect-[4/5]`, `object-cover`, bo góc 2xl, shadow lớn; hover: ảnh phóng nhẹ (`scale-105`, transition ~700ms) và card nâng lên.
- Card chú thích nổi: khối trắng bo góc đặt đè lên đáy ảnh (`absolute -bottom-8 left-6 right-6`), shadow 2xl; hover chú thích trượt nhẹ lên.
- Trong chú thích: thanh gradient ngắn xanh dương → xanh ngọc, tên tiếng Việt đậm font display, tên tiếng Anh nghiêng màu primary phía dưới, sau đó là câu chú thích song ngữ.

### 3. Trượt & nhịp
- Giữ `Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })`, `loop: true`.
- Tăng khoảng cách dọc giữa các item (`gap-y-20`/margin-bottom) để chú thích nổi không đè lên ảnh kế tiếp.
- Thêm chỉ báo tiến trình dưới gallery: số "01 / 05" (trang hiện tại / tổng trang theo slide đầu mỗi viewport) + thanh mảnh gradient cho biết vị trí - đọc vị trí slide hiện tại qua API của embla (`onSelect`/`scrollSnapList`); bấm thanh có thể chuyển trang.

### 4. Chi tiết kỹ thuật
- Chỉ sửa file `src/pages/VietnameseAlphabet.tsx` (section gallery + import nếu cần); không đụng dữ liệu `alphabetData.ts`, audio, edge function.
- Màu sắc: dùng token/gradient brand hiện có; nếu cần gradient brand 2 màu dùng utility gradient đã định nghĩa trong dự án (kiểm `src/index.css`/`tailwind.config.ts` trước khi viết).
- Framer Motion: giữ `motion.div` fade-in cho section (nếu chưa có thì thêm nhẹ).

## Kiểm chứng
1. `tsgo --noEmit --pretty false` sạch.
2. `bun scripts/audit_vietnamese_content.ts` - Issues 0.
3. Playwright (1280×1800, khôi phục session nếu trang chặn khách): chụp section mới ở desktop + mobile 390px, xác nhận ảnh tỉ lệ dọc, chú thích nổi không đè nhau, autoplay vẫn chạy, nút điều hướng hoạt động.

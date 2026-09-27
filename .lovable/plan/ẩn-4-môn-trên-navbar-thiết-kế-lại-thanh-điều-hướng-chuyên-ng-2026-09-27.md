# Ẩn 4 môn trên navbar + thiết kế lại thanh điều hướng chuyên nghiệp (v2)

## 1. Ẩn các môn

Trong `src/components/Navbar.tsx`, mảng `baseLinks` (~dòng 500) giảm còn:

- Home, About
- English (`en`), Chinese (`cn`), Programming (`prog`) — giữ nguyên dropdown + Teacher Notes
- Lifestyle, Your Corner

Bỏ hẳn khỏi navbar (desktop + mobile drawer, cùng nguồn `baseLinks`):
- Vietnamese (`vn`), Japanese (`jp`), Finnish (`fi`), Swedish (`sv`) — áp dụng cho **mọi tài khoản** kể cả giáo viên/admin.
- Các trang giữ nguyên đường dẫn cũ, vẫn mở được bằng URL trực tiếp; không đổi route, không đổi nội dung trang.
- Xóa các mảng con không còn dùng (`vietnameseSubs`, `finnishSubs`, `swedishSubs`, subs Japanese inline) và các key màu dư trong `SUBJECT_COLORS` (`vn`, `jp`, `fi`, `sv`) cùng nhãn flyout header tương ứng để tránh code chết / lỗi TS unused.

## 2. Thiết kế lại theo phương án "Professional gradient refinement" (v2)

Áp dụng cho cả hai hàng của thanh điều hướng desktop (giữ cơ chế `fixed top-0` / `top-12` và spacer hiện có, không đổi logic hover/flyout):

**Hàng 1 - Thương hiệu**
- Nền `bg-background/80 backdrop-blur-md`, đường phân cách dưới mảnh (`border-border/60`).
- Logo: giữ mascot giơ tay + tên "HaiEduTech" gradient `from-primary to-accent` (thay shimmer trắng hiện tại), giữ sparkle.
- Slogan: giữ nguyên nội dung nhưng chuyển sang kiểu chữ slate mờ, `text-[10px] font-bold tracking-[0.2em] uppercase` màu `text-muted-foreground/60` — tinh tế, không tranh chú với logo.
- Khu phải: nút EN/VI thành **viên thuốc (pill)** có viền, `EN` đậm màu primary; Login thành nút chữ mảnh (ghost), Sign Up thành **nút gradient primary→accent bo tròn** kèm bóng nhẹ (thay nút outline hiện tại).
- Khi đã đăng nhập: giữ NotificationBell + menu user, đổi nút user sang kiểu pill tương ứng với theme mới.

**Hàng 2 - Điều hướng (7 mục)**
- Nền trắng mờ nhẹ hơn hàng 1 (`bg-secondary/30`), liên kết căn giữa, khoảng cách đều.
- Hai đường phân cách dọc mảnh chia 3 nhóm: `Home · About` | `English · Chinese · Programming` | `Lifestyle · Your Corner`.
- Mục đang mở (route active): chữ primary + **gạch chân gradient 2px** (thay nền pill cũ).
- Hover: chuyển chữ sang `text-foreground` + gạch chân gradient mờ dần; chevron xoay khi mở dropdown.
- "Your Corner" thành **pill nổi bật** (nền `primary/10`, chữ primary, mũi tên nhỏ) như prototype.
- Dropdown tiếng Anh/Trung/Lập trình giữ nguyên cơ chế mở, scroll, flyout thông minh; chỉ đổi kiểu chữ: tiêu đề nhóm mảnh uppercase, mục con `text-sm` có icon, hover accent màu môn học như hiện tại.

**Mobile**
- Drawer dùng lại mảng `baseLinks` mới (tự mất 4 môn) — giữ nguyên cấu trúc accordion, chỉ đồng bộ màu nền/gradient nút Sign Up ở đáy drawer cho khớp theme mới.

## 3. Kiểm tra

- TypeScript (`bunx tsgo --noEmit -p tsconfig.app.json`) không lỗi.
- Playwright desktop 1280: chụp navbar mới, xác nhận còn đúng 7 mục, 4 môn biến mất; mở dropdown English + Chinese + Programming, flyout không lỗi vị trí; hover + trạng thái active.
- Playwright mobile 390: drawer chỉ còn 7 mục (kể cả đăng nhập giáo viên), accordion mở/đóng tốt.
- Không đổi route, dữ liệu, backend, quyền truy cập.

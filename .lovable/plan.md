

## Plan: Hiển thị Dashboard cho học sinh — Thêm link Dashboard vào Navbar chính

### Vấn đề
Dashboard (`/dashboard`) hiện tại **hoạt động bình thường** cho mọi user đã đăng nhập — không bị chặn bởi role. Tuy nhiên, link Dashboard chỉ nằm ẩn trong dropdown menu user (click avatar → Dashboard), khiến học sinh khó tìm thấy. Trong khi đó, teacher có link "Admin" hiển thị rõ trên thanh nav chính.

### Giải pháp
Thêm link **"Dashboard"** vào thanh navigation chính cho **tất cả user đã đăng nhập** (không chỉ teacher/admin), giúp học sinh dễ dàng truy cập bảng phân tích học tập.

### Thay đổi

#### 1. Cập nhật `src/components/Navbar.tsx`
- Thêm mục "Dashboard" vào `baseLinks` (hoặc thêm riêng) hiển thị khi `user` đã đăng nhập
- Link dẫn tới `/dashboard`, icon `LayoutDashboard`
- Hiện cho cả student lẫn teacher (teacher vẫn giữ thêm link "Admin")
- Cập nhật cả desktop nav row lẫn mobile menu

#### 2. Không thay đổi logic Dashboard page
- Trang `/dashboard` đã hoạt động đúng cho mọi role
- Data fetching dùng `auth.uid()` → mỗi user thấy data riêng của mình
- Empty state hiển thị khi chưa có hoạt động, kèm link đến các module học

### Files thay đổi
- `src/components/Navbar.tsx` — thêm "Dashboard" link cho user đã đăng nhập vào main nav


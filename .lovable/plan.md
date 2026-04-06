

## Plan: Thay "Contact" bằng "For Vietnamese Children"

### Tổng quan
Thay mục Contact trên navbar bằng "For Vietnamese Children" — trang viết lời cảm ơn, nhấn mạnh mọi bài học miễn phí, và cung cấp thông tin tài khoản các quỹ trẻ em Việt Nam để mọi người có thể đóng góp.

### Thông tin quỹ (từ nguồn chính thức)

1. **Quỹ Bảo trợ trẻ em Việt Nam** (thuộc Bộ LĐTBXH)
   - STK: `001.0.00.0000355` — Sở Giao dịch Ngân hàng Nhà nước Việt Nam
   - Website: nfvc.molisa.gov.vn

2. **Làng trẻ em SOS Việt Nam**
   - Vietcombank: `001 100 0284 889` — Sở Giao dịch NHTMCP Ngoại thương VN
   - Techcombank: `191 345 522 840 19` — Chi nhánh Hoàng Quốc Việt
   - Website: sosvietnam.org

### Thay đổi

#### 1. Tạo `src/pages/ForVietnameseChildren.tsx`
- Lời cảm ơn song ngữ (Việt/Anh) từ thầy Hải
- Nhấn mạnh tất cả bài học, công cụ trên HaiEduTech hoàn toàn miễn phí
- Danh sách các quỹ trẻ em kèm thông tin tài khoản (card UI đẹp)
- Sử dụng Navbar + Footer, motion animation

#### 2. Cập nhật `src/components/Navbar.tsx`
- Đổi `{ to: "/contact", label: "Liên hệ/Contact", icon: UserPlus }` → `{ to: "/for-vietnamese-children", label: "Vì Trẻ Em/For Children", icon: Heart }`

#### 3. Cập nhật `src/App.tsx`
- Thêm lazy import `ForVietnameseChildren`
- Thêm route `/for-vietnamese-children`
- Giữ route `/contact` redirect về trang mới (hoặc xóa)

#### 4. Cập nhật `src/components/Footer.tsx`
- Nếu có link Contact trong footer → đổi thành "For Vietnamese Children"

### Files thay đổi
- `src/pages/ForVietnameseChildren.tsx` — **mới**
- `src/components/Navbar.tsx` — đổi label + link
- `src/App.tsx` — thêm route mới
- `src/components/Footer.tsx` — cập nhật link nếu cần


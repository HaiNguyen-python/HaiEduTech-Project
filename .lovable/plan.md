## Hiện trạng

Modal QR chuyển khoản Vietcombank vẫn còn nguyên trong code:
- `src/components/UpgradeAccountModal.tsx` - đầy đủ thông tin ngân hàng, ảnh `src/assets/vietcombank-qr.png`, nút sao chép số tài khoản, ghi nhận yêu cầu nâng cấp.
- `src/components/Navbar.tsx` đã import modal và có state `upgradeOpen`, modal được render ở cuối file (dòng 944-948).

Chỉ có **nút mở modal** bị gỡ:
- Dòng 481 (menu người dùng trên desktop): `{/* Upgrade option hidden — all content is fully free */}`
- Dòng 916 (menu mobile): `{/* Upgrade button hidden — all content is fully free */}`

## Việc cần làm

1. **Navbar desktop (dòng 481)** - thay comment bằng mục "Nâng cấp tài khoản / Upgrade" trong dropdown: icon vương miện (Crown/Sparkles), style vàng-gradient nhẹ, `onClick` gọi `setUpgradeOpen(true)` và đóng dropdown.
2. **Navbar mobile (dòng 916)** - thay comment bằng nút full-width tương ứng, `onClick` gọi `setUpgradeOpen(true)` và `setOpen(false)`.
3. Chỉ hiển thị cho người dùng đã đăng nhập (đã nằm trong nhánh đó sẵn), ẩn với tài khoản giáo viên nếu bạn muốn - mặc định tôi sẽ ẩn với `isTeacher`.
4. Kiểm tra lại modal mở đúng, ảnh QR hiển thị, nút sao chép số tài khoản hoạt động (chạy Playwright chụp màn hình xác nhận).

## Ghi chú kỹ thuật

Không đụng tới logic `useCourseAccess` - toàn bộ nội dung vẫn mở miễn phí như hiện tại; đây chỉ là khôi phục lối vào QR chuyển khoản/ủng hộ. Nếu bạn muốn nó thành cổng khoá nội dung thật thì đó là việc riêng, cần làm sau.

# Cổng thanh toán 10 EUR/năm + mã kích hoạt học sinh nội bộ

## Cách hoạt động
- **Dùng thử miễn phí**: mọi tài khoản đăng nhập được học vài bài đầu của mỗi khóa (mặc định 3 bài/khóa). Các bài sau hiện nút "Mở khóa Premium".
- **Học sinh nội bộ**: nhập mã `haiedutech2026` -> mở toàn bộ nội dung trong 12 tháng kể từ ngày nhập. Kiểm tra mã trên máy chủ, không để lộ trong mã trang.
- **Người học khác**: thanh toán online 10 EUR/năm qua Stripe (thẻ, Apple Pay, Google Pay...). Stripe lo thuế, chống gian lận, khiếu nại cho người mua ở ~80 nước (phí thêm +3,5%/giao dịch, có thể tắt sau).
- **Chuyển khoản Vietcombank**: vẫn giữ, thầy duyệt tay như hiện tại.
- Giáo viên/admin luôn được mở hết.

## Giao diện
- Cửa sổ "Nâng cấp" có 3 lựa chọn: Nhập mã kích hoạt / Thanh toán online 10 EUR / Chuyển khoản VN.
- Trang "Tài khoản của tôi" hiển thị trạng thái Premium và ngày hết hạn; nhắc gia hạn khi còn 14 ngày.
- Admin: tab xem danh sách Premium (nguồn: mã / Stripe / chuyển khoản), ngày hết hạn, có thể gia hạn/thu hồi.

## Các bước
1. Bật Stripe tích hợp sẵn (môi trường thử nghiệm được tạo ngay; nhận tiền thật cần xác nhận tài khoản Stripe sau).
2. Tạo sản phẩm "HaiEduTech Premium - 1 năm", 10 EUR, thanh toán một lần mỗi năm (hoặc gói gia hạn tự động hằng năm nếu bạn muốn).
3. Lưu trạng thái Premium và ngày hết hạn; mã kích hoạt và Stripe cùng ghi vào đó.
4. Gắn khóa dùng thử vào các danh sách bài học.
5. Kiểm tra: nhập mã đúng/sai, thanh toán thử bằng thẻ test, hết hạn, admin.

## Lưu ý
Quy tắc hiện tại "mọi nội dung mở miễn phí" sẽ được cập nhật thành mô hình dùng thử + Premium.

## Chi tiết kỹ thuật
- `enable_stripe_payments`, tax mode `managed_payments`, tax code dịch vụ giáo dục số.
- Mở rộng `user_subscriptions`: `source` (code|stripe|bank), `expires_at`, `stripe_session_id`; RLS chỉ đọc bản ghi của mình, ghi qua edge function (service role).
- Edge functions: `redeem-activation-code` (so mã với secret `ACTIVATION_CODE`, set expires_at = now()+1 năm, chặn nhập lặp), `create-checkout`, `payments-webhook` (gia hạn +1 năm từ max(now, expires_at)).
- `useCourseAccess` trả `hasAccess` theo `isPremium || isStaff || lessonIndex < FREE_LESSONS`; `UpgradeAccountModal` thêm tab mã + Stripe.

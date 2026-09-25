# Rà soát: thanh toán xong có tự mở khóa Premium không

## Kết quả rà soát

Luồng hiện tại về cơ bản đúng:
- Khi bấm thanh toán, hệ thống gắn mã tài khoản học sinh vào phiên thanh toán.
- Khi Stripe báo đã nhận tiền, máy chủ tự ghi Premium 12 tháng cho đúng tài khoản đó (cộng dồn nếu còn hạn, không cộng hai lần cho cùng một lần trả).
- Sau khi trả xong, trang báo "Thanh toán thành công" và kiểm tra lại trạng thái 3 lần (sau 1,5s, 4s, 8s).

Điểm chưa chắc chắn / còn yếu:
1. Chưa có lần thanh toán thử nào được ghi nhận, nên việc Stripe gửi được thông báo về máy chủ chưa được kiểm chứng thực tế.
2. Nếu thông báo từ Stripe đến chậm hơn 8 giây, học sinh vẫn thấy bài bị khóa cho tới khi tải lại trang.
3. Nếu thông báo từ Stripe bị lỗi hoặc mất, học sinh đã trả tiền nhưng không được mở khóa - không có đường dự phòng.

## Việc sẽ làm

1. **Kiểm tra dự phòng khi quay về trang**: khi học sinh trả xong và quay lại, trang gửi mã phiên thanh toán lên máy chủ; máy chủ tự hỏi Stripe xem phiên đó đã trả tiền chưa và đúng tài khoản chưa, nếu đúng thì mở khóa ngay. Không phụ thuộc hoàn toàn vào thông báo từ Stripe.
2. **Chờ tới khi mở khóa thật**: thay 3 lần kiểm tra cố định bằng vòng kiểm tra tới ~30 giây, hiện "Đang kích hoạt Premium..." rồi "Premium đã được mở khóa" khi xong; nếu quá lâu thì báo liên hệ thầy Hải.
3. **Kiểm tra thực tế**: thanh toán thử bằng thẻ `4242 4242 4242 4242`, xác nhận tài khoản được mở khóa, bài thứ 4 mở được, admin thấy nguồn "Stripe" và ngày hết hạn; xem nhật ký máy chủ để chắc thông báo từ Stripe đến được.

## Chi tiết kỹ thuật

- Edge function mới `verify-checkout-session`: xác thực JWT, `stripe.checkout.sessions.retrieve(session_id)`, yêu cầu `metadata.userId === user.id` và `payment_status !== "unpaid"`, rồi gọi cùng logic `fulfill` (tách vào `_shared/premium.ts`, idempotent theo `stripe_session_id`). `verify_jwt = false` trong config, kiểm tra token trong code.
- `Navbar.tsx`: khi `checkout=success&session_id=...` thì gọi function trên, sau đó poll `usePremium.refresh` mỗi 2s tối đa 30s.
- Không đổi giá, bảng dữ liệu hay cách nhập mã kích hoạt.

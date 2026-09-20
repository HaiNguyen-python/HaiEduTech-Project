# Gộp và tối ưu hộp chào mừng sau khi đăng nhập

## Vấn đề hiện tại

Sau khi đăng nhập, trang mở **hai hộp riêng biệt xếp chồng nhau**:

1. "Nhắc nhở hôm nay" (tóm tắt bài tập trong tháng)
2. "Ôn lại buổi học trước" / "Welcome to HaiEduTech!" (tóm tắt hoạt động gần đây)

Vì hai hộp mở gần như cùng lúc, hộp thứ hai khoá tương tác toàn trang, nên các nút của hộp thứ nhất bấm không được hoặc phải đợi rất lâu. Nội dung hai hộp lại trùng ý nghĩa (đều là tổng kết + lời động viên + nút bắt đầu học).

Ngoài ra, danh sách "Bài tập đang chờ" đang hiển thị cả thông báo xã hội (ví dụ "... đã thả tim bình luận của bạn"), không phải bài tập thật, nên số "đang chờ" và "tiến độ %" bị sai.

## Hướng làm

Gộp thành **một hộp chào buổi học duy nhất**, dạng hai phần trong cùng một thẻ:

- Phần trên: lời chào theo tên, câu động viên, ba số liệu (bài tập đang chờ, đã hoàn thành trong tháng, tiến độ %), hạn nộp gần nhất.
- Phần dưới: tóm gọn hoạt động gần đây (bài học, quiz, viết, ghi chú) dưới dạng vài dòng, kèm liên kết xem chi tiết - thay cho hộp "Ôn lại buổi học trước".
- Một nút chính "Bắt đầu học ngay" (hoặc "Vào trang cá nhân" khi không có bài chờ) và một nút "Để sau".
- Chỉ hiện một lần mỗi ngày cho mỗi người học; giáo viên/quản trị vẫn không thấy.

## Sửa lỗi bấm nút

- Chỉ còn một lớp phủ duy nhất nên không còn tình trạng khoá tương tác chéo.
- Nút hoạt động ngay khi hộp xuất hiện: số liệu nào chưa tải xong thì hiện ô chờ nhẹ, không chặn nút.
- Đóng được bằng nút X, nút "Để sau", phím Esc và bấm ra ngoài; sau khi bấm là điều hướng ngay, không chờ dữ liệu.

## Số liệu đúng hơn

- Chỉ tính bài tập thật: lọc thông báo theo loại bài tập (có liên kết bài học/assignment), bỏ thông báo bình luận, tim, tin nhắn khỏi phần "đang chờ" và khỏi công thức tiến độ.
- Khi không có bài tập nào trong tháng, hộp chuyển sang chế độ động viên: streak/hoạt động gần đây + gợi ý một việc nên làm hôm nay.

## Câu tạo động lực

- Mở rộng bộ câu động viên (khoảng 20-24 câu tiếng Việt, giọng vui vẻ, khích lệ, có nhắc thầy Hải) và chia theo ngữ cảnh: chưa có bài tập, còn bài chờ, sắp tới hạn, đã hoàn thành hết trong tháng.
- Chọn câu ổn định theo ngày để không nhảy chữ khi render lại, nhưng đổi mỗi ngày.
- Khi hoàn thành 100% bài tập trong tháng: thêm lời chúc mừng và hiệu ứng chúc mừng nhẹ.

## Kiểm tra

- Đăng nhập và xác nhận chỉ còn một hộp, bấm được ngay mọi nút (máy tính và điện thoại).
- Bấm "Bắt đầu học ngay" mở đúng bài tập đang chờ đầu tiên.
- Trường hợp không có dữ liệu, có bài chờ, có hạn nộp, hoàn thành hết - đều hiển thị hợp lý.
- Tài khoản giáo viên/quản trị không thấy hộp.

## Ghi chú kỹ thuật

- File chính: `src/components/AssignmentReminderModal.tsx` (mở rộng thành hộp gộp), `src/components/LastSessionRecap.tsx` (bỏ khỏi `src/App.tsx`, giữ lại phần logic cần dùng dưới dạng hook/helper hoặc xoá nếu không còn nơi dùng).
- Gỡ `<LastSessionRecap />` khỏi danh sách global trong `src/App.tsx`; giữ nguyên các thành phần global khác.
- Nguyên nhân gốc của lỗi bấm nút: hộp recap dùng Radix `Dialog`, khi mở sẽ đặt `pointer-events: none` lên `body`, vô hiệu hoá nút của hộp nhắc nhở (một overlay framer-motion) nằm bên dưới.
- Truy vấn dữ liệu gộp một lần bằng `Promise.all`, mở hộp ngay sau khi có dữ liệu bài tập, phần hoạt động tải sau với skeleton.
- Khoá hiển thị: giữ `sessionStorage` key theo `user.id + ngày`, xoá key `recap_shown` khi đăng xuất.
- Không đổi bảng, RLS, route hay ID; chỉ lọc dữ liệu ở phía giao diện.
- Dùng token màu thương hiệu sẵn có, không hard-code màu; nội dung tiếng Việt không dùng em dash.

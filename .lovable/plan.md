# Sửa nút thả xuống theo trình độ ở Ngữ pháp tiếng Anh

## Nguyên nhân đã xác nhận

Trong `src/pages/EnglishGrammar.tsx`, khối thẻ chuyên đề được ẩn bằng thuộc tính `hidden` (dòng 258), nhưng cùng lúc khối đó lại đặt kiểu hiển thị dạng lưới (`grid`). Quy tắc lưới ghi đè quy tắc ẩn, nên nội dung vẫn hiện: mũi tên có quay, `aria-expanded` có đổi, nhưng danh sách không gập lại. Đó là lý do nút "thả xuống" trông như không hoạt động.

## Sẽ sửa

- Khi một khối trình độ đang gập, không hiển thị (và không render) danh sách thẻ chuyên đề của khối đó, thay vì chỉ đánh dấu ẩn. Nhờ vậy hình minh họa của khối đang gập cũng không tải.
- Thêm hiệu ứng mở/gập mượt (tôn trọng thiết lập giảm chuyển động của máy).
- Giữ mặc định: Cơ bản mở, Trung cấp và Nâng cao gập.
- Khi tìm kiếm hoặc chọn bộ lọc trình độ, các khối có kết quả tự mở; khi xóa tìm kiếm và quay lại "Tất cả", trạng thái mở/gập do người dùng bấm không bị nhảy lại liên tục.
- Nút vẫn bấm được bằng bàn phím, `aria-expanded` và `aria-controls` đúng.

## Kiểm tra

- Mở `/english/grammar` trên máy tính và điện thoại: bấm từng tiêu đề trình độ, danh sách gập và mở đúng, số chuyên đề vẫn đúng.
- Tìm kiếm một chuyên đề: khối chứa kết quả tự mở; xóa tìm kiếm thì trang trở lại gọn.
- Không đổi đường dẫn, ID bài học hay tiến độ đã lưu.

## Chi tiết kỹ thuật

- `src/pages/EnglishGrammar.tsx`: bỏ `hidden={!isOpen}` trên container `grid`; render có điều kiện qua `AnimatePresence` + `motion.div` (height/opacity) bọc grid.
- Sửa dependency của `useEffect` auto-open: dùng `groupedModules.beginner.length` / `.intermediate.length` / `.advanced.length` (hoặc ref so sánh) thay vì cả object `groupedModules` để tránh reset trạng thái mỗi lần memo tạo object mới.
- Chạy `bunx tsgo --noEmit -p tsconfig.app.json`, ESLint file sửa, và Playwright kiểm tra `aria-expanded` cùng số thẻ hiển thị ở viewport 1280 và 390.

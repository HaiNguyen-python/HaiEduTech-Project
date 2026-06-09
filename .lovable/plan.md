## Mục tiêu
Đảm bảo Sổ tay ghi chú luôn tải đủ ghi chú đã lưu, không hiện rỗng giả, không ghi đè nhầm ghi chú cũ, và có cơ chế phục hồi khi mạng/auth tạm lỗi.

## Phát hiện chính
- Dữ liệu ghi chú vẫn còn trong backend: hiện có 61 ghi chú của 24 người dùng, ghi chú cũ nhất từ tháng 4.
- Quyền truy cập backend cho `student_notebooks` đang đúng: người dùng đăng nhập có quyền đọc/tạo/sửa/xóa ghi chú của chính mình.
- Lỗi có khả năng đến từ UI/đồng bộ:
  - Floating Notebook chỉ dùng dropdown nhỏ nên dễ tưởng là không có ghi chú cũ.
  - Khi fetch lỗi, component âm thầm dùng snapshot cũ trong localStorage, không báo lỗi/ràng buộc thời gian snapshot.
  - Bản nháp local `new` có thể được khôi phục và chiếm màn hình, khiến người dùng thấy “Ghi chú mới” thay vì ghi chú cũ.
  - Full Notebook page không có fallback từ snapshot/local draft và không hiển thị lỗi tải dữ liệu rõ ràng.
  - Một số nơi append vào sổ tay bằng logic riêng, có thể gây race condition/ghi đè nếu nhiều thao tác lưu gần nhau.

## Kế hoạch sửa

### 1. Tạo lớp đọc/ghi sổ tay dùng chung
- Tạo helper/service cho `student_notebooks` để gom logic:
  - tải toàn bộ ghi chú của user theo `updated_at desc`;
  - xử lý lỗi đọc/ghi có message rõ;
  - lưu snapshot local mới nhất sau mỗi lần tải thành công;
  - đọc snapshot chỉ như fallback, có nhãn “dữ liệu tạm thời/offline” thay vì làm người dùng tưởng là dữ liệu thật.

### 2. Sửa Floating Notebook
- Khi mở sổ tay:
  - luôn tải danh sách ghi chú từ backend trước;
  - nếu có ghi chú, tự chọn ghi chú mới nhất sau khi tải xong;
  - nếu có bản nháp chưa lưu, hiển thị trạng thái “bản nháp chưa lưu” nhưng không che mất danh sách ghi chú cũ.
- Thay dropdown hiện tại bằng selector rõ ràng hơn:
  - hiển thị số lượng ghi chú đã tải;
  - có tìm kiếm nhanh theo tiêu đề/nội dung;
  - có trạng thái loading/error/retry.
- Sửa nút “Lưu” để không bị disabled khi chưa có tiêu đề, vì code đã tự tạo tiêu đề.
- Giữ cơ chế chống mất dữ liệu: auto-save, draft local, flush khi đóng tab.

### 3. Sửa trang `/notebook` đầy đủ
- Dùng cùng service tải ghi chú như Floating Notebook.
- Thêm fallback snapshot khi fetch lỗi, kèm cảnh báo và nút “Tải lại”.
- Hiển thị rõ:
  - tổng số ghi chú;
  - số ghi chú đang thấy sau khi lọc;
  - thông báo nếu bộ lọc/tìm kiếm đang làm ẩn ghi chú.
- Không để lỗi fetch âm thầm biến thành “Chưa có ghi chú nào”.

### 4. Chuẩn hóa các luồng “Save to Notebook”
- Rà soát các component đang lưu/append vào `student_notebooks`.
- Ưu tiên sửa các luồng hay dùng như IELTS/PTE/Grammar/Phrase/Shadowing để dùng cùng helper append an toàn:
  - tìm đúng note theo user + title + subject;
  - append vào nội dung hiện tại;
  - phát event `notebook:updated` với `noteId` để Floating Notebook reload đúng note.

### 5. Kiểm tra sau sửa
- Kiểm tra bằng dữ liệu thật ở backend:
  - truy vấn xác nhận ghi chú vẫn còn;
  - mở `/notebook` thấy danh sách không rỗng với user có ghi chú;
  - mở Floating Notebook thấy tự chọn ghi chú mới nhất và dropdown/list có đủ ghi chú;
  - tạo ghi chú mới, đóng/mở lại vẫn thấy ghi chú cũ và mới;
  - thử lưu từ một bài học vào notebook rồi xác nhận danh sách cập nhật.

## Không thay đổi
- Không xóa hoặc chỉnh sửa nội dung ghi chú cũ.
- Không đổi chính sách khóa/mở nội dung học tập.
- Không thay đổi hệ thống đăng nhập.
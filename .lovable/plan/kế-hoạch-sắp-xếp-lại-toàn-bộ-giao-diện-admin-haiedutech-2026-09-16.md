# Kế hoạch sắp xếp lại toàn bộ giao diện Admin HaiEduTech

## Mục tiêu

Xây dựng khu vực Admin theo hướng **Architectural slate workspace** đã chọn: một không gian điều hành gọn, rõ cấp bậc, dễ quét dữ liệu và dùng tốt trên máy tính lẫn điện thoại.

Giữ đúng nhận diện HaiEduTech:
- Royal Blue `#3B82F6` cho điều hướng và hành động chính
- Emerald `#10B981` cho trạng thái tốt/hoàn thành
- Warm Gold `#F59E0B` cho cảnh báo cần chú ý
- Nền `#F8FAFC`, tiêu đề Sora, nội dung Manrope

Không thay đổi dữ liệu, quyền truy cập, đường dẫn, mã tab, chức năng xuất file, biểu đồ, lớp học 3D hay hợp đồng backend.

## 1. Khung Admin thống nhất

- Thay ba hàng điều hướng đang cạnh tranh bằng **thanh bên cố định có thể thu gọn** trên desktop.
- Chia thanh bên thành 5 nhóm:
  - Tổng quan: `overview`, `system`
  - Học viên: `students`, `insights`, `attendance`, `feedback`, `chatbot`
  - Học tập & AI: `rl-engine`, `rl-interventions`, `strategy`, `dictionary`, `content-studio`
  - Nội dung & Nghiên cứu: `deep-dives`, `phd-research`, `edtech-insights`
  - Vận hành: `income`, `assistants`, `schedule`, `report-logs`, `service-requests`, `health`
- Đặt Bài tập, Quản lý lớp và Kết quả đầu vào trong khu “Truy cập nhanh”, có dấu hiệu rõ đây là trang riêng.
- Dùng biểu tượng Lucide riêng cho từng mục, bỏ emoji và nhãn trùng biểu tượng.
- Đồng bộ URL `?tab=` khi chuyển mục; bổ sung ánh xạ liên kết sâu cho ba mục Nội dung & Nghiên cứu đang thiếu.
- Trên mobile, dùng thanh đầu trang gọn và ngăn điều hướng dạng trượt; luôn có nút mở lại điều hướng.

## 2. Cấu trúc nội dung và thanh công cụ

- Thu gọn phần đầu trang thành tiêu đề, mô tả ngắn, trạng thái hệ thống và tài khoản.
- Đưa lựa chọn 30/90/120 ngày cùng CSV/JSON vào thanh công cụ theo ngữ cảnh, không cạnh tranh với tiêu đề.
- Giữ bốn chỉ số chính ở đầu màn hình nhưng chuẩn hóa chiều cao, cách đọc số, màu trạng thái và trạng thái tải.
- Chuyển cảnh báo can thiệp từ một dải badge dày thành danh sách ưu tiên dễ quét, có mức độ, tên học viên, điểm và hành động rõ.
- Giảm card lồng card; dùng đường phân cách, khoảng trắng và vùng nội dung phẳng theo đúng hướng Architectural slate.
- Giữ nguyên Classroom3D và hành vi tương tác hiện tại, chỉ đặt lại vị trí và khung hiển thị để trở thành vùng làm việc chính.

## 3. Danh sách học viên dễ đọc

- Desktop hiển thị các cột quan trọng mặc định: học viên, hoạt động, điểm, lần gần nhất, xu hướng và cảnh báo.
- Các chỉ số Speaking, Writing, thời lượng và lĩnh vực chuyển vào phần chi tiết mở rộng của từng học viên thay vì ép bảng rộng 1180px.
- Mobile chuyển mỗi học viên thành hàng tóm tắt có nút mở chi tiết, không yêu cầu cuộn ngang qua 13 cột.
- Thêm chú giải cho trạng thái gần đây và kết hợp chữ/biểu tượng với màu để không phụ thuộc chỉ vào màu sắc.
- Giữ nguyên chọn học viên, Learning DNA, xuất báo cáo và mọi phép tính hiện có.

## 4. Chuẩn hóa các trang Admin riêng

Áp dụng cùng khung, kiểu chữ, màu, thanh công cụ và trạng thái giao diện cho:
- Quản lý bài tập
- Quản lý lớp học
- Kết quả placement test
- Agency Admin

Thay bảng quá rộng bằng cột ưu tiên + chi tiết mở rộng trên màn hình nhỏ; giữ đầy đủ thao tác tạo, sửa, xóa, lọc, xem tiến độ, nghe audio, ghi chú và phân lớp.

## 5. Chuẩn hóa các mục quản trị bên trong

Rà soát và đồng bộ các mục Health Monitor, Content Studio, Assistant Management, Attendance, User Insights, Feedback, Chatbot review, RL Interventions và Service Requests:
- Một mẫu tiêu đề và thanh bộ lọc thống nhất
- Nút hành động theo đúng mức ưu tiên
- Trạng thái tải, rỗng và lỗi rõ ràng
- Biểu đồ và bảng có chiều cao linh hoạt trên mobile
- Dùng token nhận diện thay cho màu viết trực tiếp
- Giảm chiều cao cố định và lớp khung lồng nhau gây chật

## 6. Chuyển động và khả năng tiếp cận

- Chuyển mục bằng fade/slide nhẹ 160-220ms; tôn trọng chế độ giảm chuyển động.
- Bảo đảm điều hướng bàn phím, vùng chạm tối thiểu, focus rõ, nhãn trợ năng và độ tương phản.
- Sidebar giữ nhóm hiện tại mở và trạng thái đang chọn rõ ràng sau khi tải lại hoặc mở liên kết sâu.

## Chi tiết kỹ thuật

- Tách cấu hình nhóm/mục điều hướng và khung Admin thành thành phần dùng lại, tránh tiếp tục mở rộng tệp dashboard 1322 dòng.
- Dùng Sidebar, Sheet/Drawer, Button, Tabs và các thành phần thiết kế hiện có thay cho nút HTML rời.
- Bổ sung token riêng cho Admin trong CSS toàn cục bằng giá trị HSL; không hardcode màu trong các màn hình.
- Không đổi truy vấn, RPC, tên bảng, logic quyền teacher/assistant, ID tab, đường dẫn hoặc dữ liệu lưu tiến độ.

## Kiểm tra hoàn tất

- Kiểm tra TypeScript, lint và các test Admin liên quan.
- Kiểm tra bằng trình duyệt ở desktop 1280px và mobile 390px cho dashboard cùng ba trang quản trị chính.
- Xác nhận: không tràn ngang ngoài vùng bảng chủ động, sidebar thu gọn/mở lại được, mobile drawer hoạt động, URL tab khôi phục đúng, các thao tác xuất file/lọc/chọn học viên vẫn chạy.
- So sánh trực quan trước/sau để xác nhận đúng cấu trúc Architectural slate nhưng vẫn giữ palette Royal Blue/Emerald/Warm Gold và Sora/Manrope.

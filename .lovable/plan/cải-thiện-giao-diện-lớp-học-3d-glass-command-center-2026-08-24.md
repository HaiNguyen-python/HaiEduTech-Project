# Cải thiện giao diện Lớp học 3D - Glass Command Center

## Mục tiêu
Làm lớp học 3D sáng, rõ và dễ quét nhanh hơn cho giáo viên, tập trung giảm chồng chéo tên học sinh và gom các điều khiển đang rải rác. Giữ nguyên dữ liệu, cách xếp hạng, trạng thái màu, bộ lọc và các thao tác hiện có.

## Hướng thiết kế đã chọn
- Phong cách: **Glass Command Center**, sáng học thuật và có chiều sâu vừa phải.
- Màu chính: nền `#F8FAFC`, bề mặt `#FFFFFF`, xanh học thuật `#2563EB`, tiến bộ `#10B981`, cảnh báo `#EF4444`.
- Typography: **Sora** cho tiêu đề và số liệu, **Manrope** cho nội dung và tên học sinh.
- Bố cục: dashboard phân vùng, 3D là vùng trung tâm lớn; điều khiển trở thành các cụm nổi gọn, không che lớp học.

## Thay đổi giao diện
1. **Header điều khiển gọn**
   - Tiêu đề, sĩ số và trạng thái xếp chỗ nằm bên trái.
   - Gom góc nhìn thành segmented control: Toàn lớp / Từ trên / Cần chú ý.
   - Chuyển đổi xếp hạng, 2D/3D, toàn màn hình và thu gọn thành nhóm icon có tooltip.

2. **Phân vùng thông tin rõ ràng**
   - Bốn chỉ số chính nằm thành một dải mảnh, đồng đều, tránh nhiều card lồng nhau.
   - Search và bộ lọc trạng thái đưa vào panel kính mờ bên trái viewport.
   - Chú giải màu rút gọn thành các dòng có số lượng, trạng thái được chọn nổi rõ.
   - Khi chọn học sinh, panel hiển thị tên, hạng, điểm, hoạt động, xu hướng và lần học cuối ngay trong module.

3. **Giảm rối trong lớp 3D**
   - Không hiện nhãn tên đầy đủ cho cả 80 học sinh cùng lúc.
   - Mặc định chỉ hiện marker hạng nhỏ, rõ; nhãn đầy đủ chỉ hiện cho top 3, nhóm cần chú ý, kết quả tìm kiếm, hover hoặc học sinh đang chọn.
   - Tự tránh trùng nhãn bằng giới hạn số nhãn theo góc camera và lớp đông.
   - Tăng khoảng cách thị giác giữa các hàng, làm bàn/ghế nhẹ màu hơn để avatar và trạng thái nổi bật.
   - Bảng lớp phía trước chỉ giữ các số liệu quan trọng, bỏ nội dung trùng với dải thống kê.

4. **Viewport và tương tác**
   - Canvas lớn hơn, khung 16:10, nền sáng và grid sàn tinh tế.
   - Thanh camera nổi ở cạnh dưới với icon + tooltip, không thêm câu hướng dẫn dài.
   - Hover/focus dùng chuyển động 150-220ms; chỉ nhóm cảnh báo có pulse nhẹ.
   - Bộ lọc làm mờ đối tượng không liên quan nhưng vẫn giữ cấu trúc chỗ ngồi để giáo viên không mất ngữ cảnh.

5. **Responsive và chế độ phẳng**
   - Desktop dùng command center đầy đủ.
   - Tablet thu panel thành drawer; mobile tiếp tục dùng 2D nhưng áp dụng cùng hệ phân cấp, màu và typography.
   - Bảo đảm tên, số liệu và nút không chồng nhau ở các chiều rộng phổ biến.

## Chi tiết kỹ thuật
- Refactor `Classroom3D.tsx` thành các phần giao diện nhỏ: header, metrics strip, filter panel, viewport controls và selected-student panel.
- Giữ `Room`, thuật toán xếp hạng và phân loại trong `classroom3d.ts`; chỉ bổ sung logic quyết định nhãn nào được hiển thị.
- Chuyển màu giao diện mới thành semantic tokens trong `index.css`; tránh màu hardcode trong JSX mới.
- Sửa lỗi runtime hiện tại trong `Room` bằng cách bảo vệ dữ liệu mảng trước khi đọc `.length`, đồng thời kiểm tra các props liên quan trong luồng render 3D.
- Không thay đổi database, API hoặc quy tắc tính điểm.

## Kiểm tra hoàn tất
- Kiểm tra desktop 1440x900 và 1280x1800, tablet và mobile.
- Thử đủ 80 học sinh, tìm kiếm, lọc tier, đổi cách xếp chỗ, đổi camera, chọn học sinh, toàn màn hình và 2D/3D.
- Xác nhận không còn nhãn chồng dày, không có overflow/overlap và không còn lỗi `.length` trong runtime.
- Kiểm tra chế độ giảm chuyển động và hiệu năng khi module ra khỏi viewport.

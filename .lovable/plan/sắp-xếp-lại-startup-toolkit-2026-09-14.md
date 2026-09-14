# Sắp xếp lại Startup Toolkit

## Mục tiêu
Biến Startup Toolkit thành bảng công cụ tài chính sáng, gọn và dễ hiểu hơn, để học viên biết cần nhập gì, kết quả có ý nghĩa gì và nhận ra trạng thái tốt/cần chú ý ngay.

## Giao diện đã chọn
- Hướng **Modern minimalist cards**.
- Bảng màu Blue - Emerald - Gold trên nền sáng, đồng bộ HaiEduTech.
- Tiêu đề dùng Sora, nội dung và số liệu dùng Manrope.
- Bố cục dashboard: phần giới thiệu ngắn phía trên, bốn công cụ cân đối bên dưới.

## Nội dung triển khai
1. **Làm rõ phần đầu trang**
   - Giữ tiêu đề Startup Toolkit và nút quay lại Hub.
   - Viết lại mô tả ngắn, dễ hiểu về bốn phép tính và mục đích sử dụng.
   - Thêm hàng định hướng nhanh để người học biết mỗi công cụ trả lời câu hỏi nào.

2. **Sắp xếp lại bốn công cụ**
   - Giữ nguyên Unit Economics, Runway, Cap Table và TAM/SAM/SOM cùng toàn bộ công thức hiện tại.
   - Mỗi công cụ có biểu tượng, mô tả một câu, vùng nhập liệu và vùng kết quả tách bạch.
   - Dùng lưới 2 cột trên màn hình rộng, 1 cột trên điện thoại; các ô thẳng hàng và không tạo khoảng trống khó hiểu.

3. **Làm dữ liệu dễ nhập và dễ đọc**
   - Tăng kích thước nhãn, ô nhập và số kết quả; vùng bấm/chạm tối thiểu 44px.
   - Hiển thị đơn vị rõ cạnh giá trị: VND, USD, phần trăm, tháng.
   - Định dạng số lớn theo nhóm hàng nghìn khi hiển thị kết quả.
   - Thêm diễn giải ngắn cho các thuật ngữ ARPU, CAC, churn, pre-money, SAM và SOM.
   - Giữ cập nhật kết quả tức thì khi thay đổi số liệu.

4. **Nhấn mạnh kết quả và trạng thái**
   - Unit Economics làm nổi bật LTV, LTV/CAC và thời gian hoàn vốn.
   - Runway hiển thị số tháng lớn, kèm trạng thái an toàn hoặc cần hành động.
   - Cap Table thể hiện tỷ lệ Founders, ESOP và Investors bằng thanh tỷ trọng rõ ràng.
   - TAM/SAM/SOM thể hiện quan hệ từ thị trường tổng đến mục tiêu thực tế bằng ba mức trực quan.
   - Không chỉ dùng màu để báo trạng thái; luôn kèm nhãn hoặc biểu tượng.

5. **Hoàn thiện trải nghiệm**
   - Dùng hiệu ứng xuất hiện và thay đổi số liệu nhẹ, tự tắt khi người dùng chọn giảm chuyển động.
   - Giữ ghi chú “số liệu là bản nháp” ở cuối nhưng giảm độ nổi để không cạnh tranh với kết quả.
   - Bảo toàn Navbar, Footer, đường dẫn, song ngữ và toàn bộ logic hiện có.

## Chi tiết kỹ thuật
- Cập nhật trang Startup Toolkit và các token giao diện cần thiết theo hệ thống màu hiện có.
- Không thêm thư viện, bảng dữ liệu hay chức năng backend mới.
- Không thay đổi công thức hoặc giá trị mặc định nếu chưa phát hiện lỗi trong lúc kiểm tra.

## Kiểm tra
- Đối chiếu kết quả của cả bốn phép tính với dữ liệu mẫu hiện tại.
- Kiểm tra nhập số thập phân, số 0 và các trường hợp tránh chia cho 0 hoặc kết quả không hợp lệ.
- Kiểm tra máy tính và điện thoại: không tràn ngang, chữ không chồng lấn, ô nhập dễ bấm.
- Kiểm tra chuyển ngôn ngữ, TypeScript, lint và trình duyệt thực tế.

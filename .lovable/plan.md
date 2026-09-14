# Nâng cấp toàn diện Interview Questions

## Mục tiêu
Biến `/programming/interview-questions` thành khu luyện phỏng vấn AI Engineer và Data Engineer chuyên nghiệp, dễ học lâu, chính xác kỹ thuật và ổn định trên desktop/mobile. Giữ nguyên route, tiến độ hiện có, hành vi sao chép code, CV Clinic và các hợp đồng dữ liệu/backend đang dùng.

## 1. Làm sạch và nâng chất lượng nội dung
- Sửa 5 nhóm ID đang trùng giữa hai nguồn dữ liệu để không còn mở nhầm accordion hoặc đánh dấu nhầm câu đã ôn.
- Rà soát toàn bộ ngân hàng hiện có theo từng vai trò, chủ đề và cấp độ; gộp hoặc tách góc hỏi rõ ràng cho các chủ đề đang lặp như idempotency, LLM evaluation, drift, dropout, regularization, SQL tuning, transfer learning, window functions và ACID.
- Cân bằng lại độ khó, đặc biệt bổ sung câu Junior nền tảng cho Data Engineer và AI Engineer thay vì để ngân hàng nghiêng gần như hoàn toàn về Mid/Senior.
- Chuẩn hóa mỗi câu theo cấu trúc nhất quán: câu trả lời ngắn để nói trong phỏng vấn, giải thích sâu, điểm nhà tuyển dụng muốn nghe, lỗi thường gặp, câu hỏi nối tiếp và ví dụ code khi phù hợp.
- Kiểm chứng lại thuật ngữ, công thức, số liệu, API/tool references và code snippets; loại bỏ nhận định quá tuyệt đối hoặc thông tin dễ lỗi thời.
- Giữ nội dung chuyên môn Programming bằng tiếng Anh theo định hướng hiện tại; tiếp tục song ngữ cho nhãn và thao tác giao diện.

## 2. Thiết kế theo hướng đã chọn
Áp dụng chính xác hướng **Polished Layered Learning** với:
- Nền sáng, Royal Blue + Soft Emerald + Warm Gold; Sora cho tiêu đề và Manrope cho nội dung.
- Sidebar học tập bên trái trên desktop: tiến độ, cấp độ, chủ đề, số lượng và nút thu gọn/mở lại.
- Khu chính gồm bộ chuyển AI Engineer/Data Engineer/CV Clinic, tìm kiếm, trạng thái bộ lọc và danh sách câu hỏi có chiều sâu thị giác rõ ràng.
- Câu đã ôn, cấp độ và chủ đề có trạng thái màu dễ phân biệt nhưng vẫn đạt tương phản tốt; không dùng màu là tín hiệu duy nhất.
- Nội dung mở rộng có nhịp đọc rõ: Quick Answer, Detailed Explanation, Key Points, Common Pitfalls, Code Example, Follow-up Questions và Interview Tip.
- Trên mobile, sidebar trở thành bảng lọc gọn có nút mở rõ ràng; câu hỏi và code không tràn ngang, chữ tối thiểu 16px.

## 3. Tổ chức trải nghiệm học
- Nhóm câu hỏi theo chủ đề khi xem tất cả, thay vì một danh sách dài phẳng.
- Thêm thao tác xóa tìm kiếm/bộ lọc, chỉ xem câu chưa ôn và hiển thị rõ số kết quả.
- Giữ đánh dấu Reviewed hiện tại nhưng version hóa dữ liệu lưu, di chuyển an toàn các ID cũ và đồng bộ giữa nhiều tab trình duyệt.
- Reset bộ lọc hợp lý khi đổi vai trò để tránh trạng thái “không có kết quả” khó hiểu.
- Tách vai trò nội dung và CV Clinic bằng phân cấp trực quan rõ hơn, nhưng không đổi đường dẫn hoặc khả năng hiện có.

## 4. Độ ổn định và khả năng tiếp cận
- Bổ sung nhãn thật cho tìm kiếm, trạng thái `aria-pressed` cho bộ lọc, mô tả trạng thái Reviewed và nhóm điều khiển có tên rõ ràng.
- Sao chép code có xử lý thành công/thất bại và phản hồi trực quan, không để lỗi Clipboard bị bỏ qua.
- Giảm animation khi thiết bị yêu cầu reduced motion; giữ kích thước ổn định khi mở/đóng câu hỏi.
- Dọn các màu hard-code tại khu vực này thành semantic tokens riêng của Interview Questions.
- Giữ CV Clinic an toàn khi dữ liệu AI thiếu trường; loại bỏ schema/prompt backend không còn khớp nếu xác nhận không được sử dụng.

## 5. Kiểm định bắt buộc
- Thêm audit tự động cho ID duy nhất, category hợp lệ, trường bắt buộc, phân bố cấp độ, nội dung trùng gần nhau và code fence/indentation.
- Thêm test cho lọc/tìm kiếm, đổi vai trò, đánh dấu Reviewed, migration tiến độ và empty state.
- Kiểm tra trực tiếp desktop 1280px và mobile 390px: sidebar/drawer, tìm kiếm, filter, mở nhiều câu, copy code, tiến độ và CV Clinic.
- Chạy TypeScript, lint và test liên quan; không hoàn tất nếu còn duplicate key, overflow, lỗi console hoặc dữ liệu câu hỏi không đạt audit.

## Phạm vi giữ nguyên
- Không đổi route `/programming/interview-questions`.
- Không khóa nội dung, không thêm bảng dữ liệu mới và không làm mất tiến độ người học.
- Không thay đổi các phần Programming khác ngoài liên kết hoặc kiểu dùng chung thật sự cần thiết cho trang này.

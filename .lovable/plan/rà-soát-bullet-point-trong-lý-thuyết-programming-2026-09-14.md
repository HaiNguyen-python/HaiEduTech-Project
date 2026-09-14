# Rà soát bullet point trong lý thuyết Programming

## Mục tiêu
Làm phần lý thuyết dễ đọc hơn bằng cách chỉ dùng bullet khi nội dung thật sự là danh sách, đồng thời chuyển các ý giải thích dài thành đoạn văn, tiêu đề nhỏ, bảng hoặc các nhóm nội dung rõ ràng.

## Hiện trạng đã xác nhận
- Phần lý thuyết đang hiển thị Markdown trực tiếp, nên cách xuống dòng và ký hiệu trong nội dung quyết định cấu trúc trên màn hình.
- Kho 310 bài Deep Dive hiện có 209 bài chứa ít nhất một bullet dài và 39 bài có danh sách lồng nông; bài đang xem có nhóm Startups / SMEs / Corporates bị đánh dấu như bullet cha thay vì tiêu đề nhóm.
- Hệ thống đã có cơ chế tự chia đoạn văn dài, nhưng cơ chế này cố ý bỏ qua list nên không sửa được các bullet bị dùng sai.

## Nội dung triển khai
1. **Chuẩn hóa cách dùng bullet**
   - Giữ bullet cho danh sách thuật ngữ, checklist, ưu nhược điểm, các bước và các ý độc lập ngắn.
   - Chuyển nhãn nhóm như Startups, SMEs, Corporates thành tiêu đề nhỏ; các thuộc tính Goal, Strategy, Funding, Culture thành cấu trúc so sánh gọn, không tạo bullet cha rỗng hoặc lồng cấp khó đọc.
   - Chuyển bullet dài mang tính giải thích thành đoạn văn ngắn 1-2 câu.
   - Dùng bảng khi nhiều đối tượng cùng được so sánh theo một bộ tiêu chí.

2. **Rà soát toàn bộ 310 bài Deep Dive hiện có**
   - Chuẩn hóa Markdown theo từng khối và bảo toàn code fence, inline code, công thức, bảng, hình minh họa, callout và Deep Dive box.
   - Không thay đổi kiến thức, lesson ID, route, tiến độ đọc, Knowledge Check hoặc nội dung tiếng Anh.
   - Tiếp tục tuân thủ quy tắc chỉ dùng dấu gạch ngang ASCII `-`, không dùng em dash hoặc en dash trong văn bản Programming.

3. **Ngăn lỗi quay lại ở bài mới**
   - Cập nhật quy tắc tạo Deep Dive: ưu tiên đoạn văn cho giải thích, giới hạn bullet ở ý ngắn, dùng heading cho nhóm và bảng cho so sánh nhiều chiều.
   - Thêm bước chuẩn hóa an toàn trước khi lưu nội dung mới, không tác động vào code hoặc công thức.

4. **Cải thiện cách hiển thị danh sách**
   - Điều chỉnh khoảng cách giữa đoạn văn, bullet cùng cấp và danh sách lồng để phân cấp rõ hơn trên máy tính và điện thoại.
   - Giữ cỡ chữ dễ đọc, không để bullet sát lề, chồng chữ hoặc tạo khoảng trắng bất thường.

## Chi tiết kỹ thuật
- Bổ sung bộ phân tích Markdown theo block, chỉ sửa các mẫu có độ tin cậy cao; không dùng thay thế ký tự mù trên toàn văn bản.
- Chuẩn hóa cả dữ liệu Deep Dive đang lưu và pipeline tạo nội dung mới để giao diện hiện tại và tương lai nhất quán.
- Thêm kiểm tra tự động phát hiện bullet cha chỉ đóng vai trò tiêu đề, bullet quá dài và cấu trúc lồng cấp sai.

## Kiểm tra
- Đối chiếu bài Startup đang xem và một mẫu đại diện từ Python, SQL, Data Structures, AI, Cybersecurity và Prompt Engineering.
- Kiểm tra không mất nội dung, code, công thức, bảng, hình hoặc trạng thái đã đọc.
- Kiểm tra máy tính và điện thoại: phân cấp rõ, không tràn ngang, không bullet bất hợp lý.
- Chạy TypeScript, lint, kiểm tra Programming English và kiểm tra cấu trúc Markdown mới.
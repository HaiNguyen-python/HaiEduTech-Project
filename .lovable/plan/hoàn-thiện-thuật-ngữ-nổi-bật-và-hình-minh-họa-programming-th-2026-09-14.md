# Hoàn thiện thuật ngữ nổi bật và hình minh họa Programming Theory

## Mục tiêu

- Làm nổi bật thuật ngữ quan trọng một cách nhất quán, vừa đủ và dễ quét trong từng mục Theory.
- Bổ sung 1-2 hình minh họa đúng nội dung cho 82 bài còn thiếu, nâng độ phủ từ 228/310 lên 310/310 bài.
- Không viết lại kiến thức hiện có, không thay route, lesson ID, tiến độ, XP, Knowledge Check hoặc hợp đồng dữ liệu.

## Hiện trạng đã xác nhận

- Kho Theory có 310 bài; cả 310 bài đều đã chứa chữ đậm, trung bình khoảng 30 cụm mỗi bài.
- Lớp hiển thị hiện bổ sung chữ đậm từ một danh sách thuật ngữ cố định, nhưng danh sách này chưa bao phủ đầy đủ thuật ngữ riêng của từng chủ đề.
- 228/310 bài đã có hình minh họa nội dung, tổng cộng 452 hình; còn đúng 82 bài chưa có hình.
- Hình hiện được chèn vào mục Detailed Breakdown và Comparative Table, hiển thị lười tải và chỉ được dựng khi người học mở mục thu gọn.

## Kế hoạch triển khai

### 1. Chuẩn hóa chữ đậm theo từng mục Theory

- Mở rộng bộ thuật ngữ theo các nhóm Python, SQL, Data Structures, Web, Cloud, Cybersecurity, AI/ML, NLP, Data Engineering, Software Engineering, EdTech và Startup.
- Tự nhận diện thuật ngữ từ mục Key Concepts & Terminology, tiêu đề phụ và nhãn định nghĩa của chính bài học thay vì chỉ dựa vào danh sách cố định.
- Áp dụng theo từng mục: làm đậm lần xuất hiện quan trọng đầu tiên trong mỗi mục, giới hạn hợp lý để tránh cả đoạn bị đậm.
- Giữ nguyên tuyệt đối code block, inline code, công thức, Mermaid, URL, link, ảnh và phần đã có Markdown bold.
- Thêm kiểu hiển thị `strong` rõ hơn bằng màu chữ và độ đậm theo token giao diện hiện có, không dùng màu cứng.
- Đồng bộ quy tắc này vào phần tạo Theory mới để nội dung bổ sung sau này có chất lượng tương tự.

### 2. Bổ sung hình cho 82 bài còn thiếu

- Thêm chế độ chỉ tạo hình cho bài đã có Theory, không gọi AI viết lại nội dung và không thay các đoạn lý thuyết hiện tại.
- Với mỗi bài thiếu hình, chọn tối đa hai vị trí thực sự cần trực quan hóa:
  - Detailed Breakdown: quy trình, kiến trúc hoặc quan hệ giữa các khái niệm.
  - Comparative Table: hình so sánh khi hình giúp hiểu nhanh hơn; nếu không phù hợp thì chỉ tạo một hình.
- Tạo mô tả hình từ tiêu đề bài, tên module và nội dung thật của mục tương ứng để hình cụ thể, không dùng mô tả chung chung.
- Giữ phong cách giáo dục sáng, thân thiện, Blue-Emerald-Gold, không nhúng chữ nhỏ vào ảnh; nội dung chữ vẫn nằm ở caption để dễ đọc và hỗ trợ truy cập.
- Chèn hình vào đúng mục trong Markdown hiện có và cập nhật bản lưu của bài; không thay nội dung xung quanh.
- Xử lý tuần tự theo lô nhỏ để tránh giới hạn. Chỉ thử lại có chờ với lỗi 429/5xx; dừng toàn bộ và hiển thị đúng nguyên nhân khi gặp lỗi tín dụng hoặc chính sách.
- Không tạo tác vụ chạy đêm. Việc bổ sung 82 bài là một lần; bài mới sau này tiếp tục dùng nút tạo sẵn các bài còn thiếu trong trang quản trị.

### 3. Gọn lại thao tác quản trị

- Điều chỉnh nút tạo sẵn để nhận diện riêng: bài thiếu Theory và bài đã có Theory nhưng thiếu hình.
- Hiển thị bộ đếm Tổng bài / Đủ hình / Thiếu hình, tiến độ hiện tại, số thành công, số thất bại và nút Dừng.
- Cho phép chạy lại riêng các bài thất bại mà không tạo lại những hình đã có.

### 4. Kiểm tra chất lượng

- Thêm kiểm tra tự động cho thuật ngữ: không lồng `**`, không sửa code/math/Mermaid/link, không làm đậm cả câu, thuật ngữ chính xuất hiện rõ trong từng mục.
- Kiểm tra dữ liệu sau khi hoàn tất: 310/310 bài có hình inline hợp lệ; mỗi bài tối đa hai hình; URL, caption và vị trí mục khớp nhau; không có hình trùng đường dẫn ngoài chủ đích.
- Gọi thử chức năng tạo hình thật trước khi chạy lô, đọc chính xác phản hồi lỗi nếu có, rồi mới xử lý 82 bài.
- Chạy TypeScript, lint, test và audit Programming English.
- Kiểm duyệt trình duyệt trên Python, SQL, Cloud, Machine Learning, Cybersecurity và Startup ở desktop 1280px và mobile 390px: tất cả mục đóng mặc định, chữ đậm rõ nhưng không dày đặc, hình đúng tỷ lệ, tải được, không tràn màn hình hoặc lỗi trang.

## Giới hạn giữ nguyên

- Nội dung Programming vẫn hoàn toàn bằng tiếng Anh và dùng dấu `-` trong văn bản.
- Không thêm bảng dữ liệu, thư viện hoặc route mới.
- Không thay công thức, sơ đồ, code, lesson ID, tiến độ, XP, Knowledge Check hay các hình đã hoạt động tốt.

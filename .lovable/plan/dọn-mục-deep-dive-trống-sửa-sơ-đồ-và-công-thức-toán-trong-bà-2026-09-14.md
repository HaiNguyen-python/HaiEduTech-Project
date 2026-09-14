# Dọn mục "Deep Dive" trống, sửa sơ đồ và công thức toán trong bài Programming

## Hiện trạng đã kiểm tra

- Kho 310 bài lý thuyết: 194 bài vẫn còn dòng tiêu đề "8. Deep Dive" (hoặc "Deep Dive (Optional)") nhưng phần nội dung bên dưới đã bị xoá trước đó, nên chỉ còn cái thẻ số 8 rỗng như trong ảnh.
- Sơ đồ: chữ trong ô nhỏ vì sơ đồ được vẽ ở khổ rộng rồi bị co lại vừa khung. Khi mở toàn màn hình và bấm phóng to, khung chứa được nhân theo mức zoom nhưng bản vẽ bên trong vẫn bị ép về chiều rộng cũ, nên phần phóng to bị lệch ra ngoài vùng nhìn - đúng như bạn thấy "zoom lên thì không thấy".
- Công thức toán: 34 bài còn ký tự xuống dòng viết dạng chữ ("\n\n") dán liền vào cụm chữ đậm, và 7 bài có công thức bị bọc trong dấu nháy ngược nên hiện ra dạng mã thay vì công thức đẹp.

## Việc sẽ làm

### 1. Bỏ hẳn mục Deep Dive rỗng
- Xoá dòng tiêu đề "Deep Dive"/"Deep Dive (Optional)" trong toàn bộ kho 310 bài khi phần đó không còn nội dung.
- Thêm bước tự dọn ở lớp hiển thị: tiêu đề mục không có nội dung sẽ không được vẽ ra (kể cả thẻ số), nên dù còn sót ở đâu học viên cũng không thấy.
- Số thứ tự các mục còn lại được đánh lại liền mạch, không nhảy số.

### 2. Rà soát toàn bộ sơ đồ
- Sửa chế độ toàn màn hình: bản vẽ phóng to đúng tâm, luôn nằm trong vùng nhìn, kéo/lăn để xem được mọi phía, mức phóng to tối đa cao hơn hiện tại.
- Thêm phóng to bằng con lăn/pinch, neo theo vị trí con trỏ; nút "vừa khung" đưa về trạng thái ban đầu.
- Tăng cỡ chữ và độ đậm nhãn trong sơ đồ, giãn ô hợp lý để chữ không bị co nhỏ ngay ở chế độ xem thường.
- Chạy kiểm tra qua danh sách sơ đồ trong các bài (Machine Learning, Python, SQL, Cybersecurity, Startup) trên máy tính và điện thoại.

### 3. Rà soát công thức toán
- Chuyển các ký tự xuống dòng dạng chữ ("\n\n", "\n") thành ngắt dòng thật trong 34 bài liên quan, và chặn ngay từ lúc tạo bài mới.
- Bỏ dấu nháy ngược bọc quanh công thức để công thức được vẽ đúng thay vì hiện dạng mã.
- Rà soát các mẫu công thức thường lỗi (phân số, chỉ số dưới, dấu ngoặc lớn, công thức đứng riêng dòng) trên các bài Machine Learning, Deep Learning, NLP, Data Science.

## Chi tiết kỹ thuật

- `programming_theory_cache`: câu lệnh dọn tiêu đề "Deep Dive" rỗng, chuyển `\n` chữ thành newline thật, bỏ backtick bọc `$...$`; giữ nguyên `module_id`/`lesson_id`, không đổi số dòng bản ghi.
- `src/components/TheorySections.tsx`: bỏ heading rỗng khi tách mục và đánh lại `stepNumber`; thêm bước gỡ backtick quanh math và giải mã `\n` chữ trước `normalizeMath`.
- `src/components/lesson-visuals/MermaidDiagram.tsx`: sửa toán zoom fullscreen (scale quanh con trỏ/tâm, kích thước wrapper theo `svgSize * zoom`, bỏ ép `width` px lên SVG), thêm wheel/pinch với listener non-passive và `deltaMode` chuẩn hoá, nâng `fontSize`/themeCSS.
- `supabase/functions/enhance-programming-theory/index.ts`: bổ sung quy tắc cấm mục Deep Dive/bonus, cấm `\n` dạng chữ, cấm bọc math trong backtick, kèm bước làm sạch trước khi lưu.
- Giữ nguyên route, ID bài học, tiến độ đã đọc, Knowledge Check, nội dung tiếng Anh, quy tắc chỉ dùng dấu gạch ngang ASCII.
- Kiểm tra: `tsgo`, eslint, `audit:programming-english`, vitest, Playwright desktop 1280 + mobile 390.

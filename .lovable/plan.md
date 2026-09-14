# Thu gọn từng mục bài học, có nút mở ra đọc tiếp

Mỗi mục trong phần lý thuyết sẽ hiển thị dạng thu gọn: tiêu đề, số thứ tự, một đoạn tóm tắt ngắn, cùng nút mở rộng. Bấm vào là mục mở ra để đọc toàn bộ. Trang bài học nhìn gọn, dễ nhìn tổng thể các mục ngay từ đầu.

## Cách hoạt động

- Mục đầu tiên mở sẵn để học viên vào là đọc được ngay. Các mục còn lại thu gọn.
- Mỗi mục thu gọn có: số thứ tự, biểu tượng, tiêu đề, 1-2 dòng mở đầu mờ dần, nút "Đọc tiếp / Read more".
- Bấm tiêu đề hoặc nút đều mở/đóng được; mở ra thì nút thành "Thu gọn / Collapse".
- Có nút "Mở tất cả / Thu gọn tất cả" ở thanh tiến độ phía trên, để đọc liền mạch như hiện nay nếu muốn.
- Mục đã "Mark read" tự thu gọn lại, giữ dấu tick như hiện tại. Nút Mark read vẫn ở đúng chỗ và không làm mở/đóng mục.
- Trạng thái mở/đóng ghi nhớ theo từng bài học, nên quay lại không mất chỗ đang đọc.
- Mục mở đầu (phần không có tiêu đề) vẫn hiện đầy đủ, không thu gọn.

## Giữ nguyên

- Toàn bộ nội dung, sơ đồ, công thức, hình minh họa, khối code, Knowledge Check.
- Đường dẫn bài học, ID, tiến độ đã đọc, XP, phần lý thuyết tiếng Anh.
- Thanh "Section progress" và cách tính phần trăm.

## Chi tiết kỹ thuật

- Sửa `src/components/TheorySections.tsx`:
  - Thêm state `openSlugs: Set<string>`, khởi tạo mở mục đầu, lưu ở localStorage key `${storageKey}:open` (tách khỏi key tiến độ đọc để không ảnh hưởng dữ liệu cũ).
  - Bọc phần thân mục bằng khối có `AnimatePresence` + `motion.div` (Framer Motion đã dùng trong file), animate height/opacity, tôn trọng `prefers-reduced-motion`.
  - Chỉ render nội dung nặng (Mermaid, KaTeX, ReactMarkdown) khi mục đang mở, để trang tải nhanh hơn; giữ `renderBody` không đổi.
  - Preview thu gọn: lấy đoạn văn đầu tiên của `section.body`, bỏ dòng heading/list/code/công thức, cắt ~160 ký tự, hiển thị dạng text thường (không render markdown) để không sinh sơ đồ trong trạng thái thu gọn.
  - Header mục thành `button` với `aria-expanded`, `aria-controls`, chiều cao chạm tối thiểu 44px; nút Mark read dùng `stopPropagation`.
  - Khi `toggleRead` chuyển sang trạng thái đã đọc thì bỏ slug khỏi `openSlugs`.
  - Nhãn song ngữ dùng đúng cơ chế ngôn ngữ hiện có của trang bài học.
- Kiểm tra: `tsgo`, `eslint`, `vitest`, Playwright desktop 1280 và mobile 390 trên các bài Python, SQL, ML (sơ đồ + công thức), Startup: mở/đóng đúng, nội dung không mất, không tràn màn hình, không lỗi trang.



## Plan: Floating Notebook Widget — Ghi chú nổi trên mọi trang

### Ý tưởng
Tạo component `FloatingNotebook` hiển thị như icon nhỏ góc trái dưới màn hình (đối diện ChatBot ở góc phải). Học sinh click để mở panel ghi chú, có thể viết/lưu bài bất cứ lúc nào mà không cần rời trang.

### Thay đổi

#### 1. Tạo `src/components/FloatingNotebook.tsx`
- Icon nổi góc trái dưới (📒) với animation tương tự ChatBot
- Click mở panel ~400×500px chứa:
  - Dropdown chọn ghi chú cũ hoặc tạo mới
  - Input tiêu đề + Select môn học
  - Textarea viết nội dung (chiếm phần lớn panel)
  - Đếm từ/ký tự real-time
  - Nút Lưu + auto-save sau 5s không gõ
- Chỉ hiện khi user đã đăng nhập
- Dùng lại logic fetch/save từ Notebook.tsx (refactor thành shared hooks nếu cần)

#### 2. Cập nhật `src/App.tsx`
- Thêm `<FloatingNotebook />` cạnh `<ChatBot />` (line 174)

#### 3. Giữ nguyên trang `/notebook`
- Trang full Notebook vẫn hoạt động bình thường cho teacher view và quản lý đầy đủ
- FloatingNotebook chỉ là shortcut viết nhanh cho học sinh

### Files
- `src/components/FloatingNotebook.tsx` — **mới**
- `src/App.tsx` — thêm 1 dòng import + render


# Hình minh họa bài IELTS Writing: rõ ràng và đúng đề bài

## Hiện trạng đã kiểm tra

- Có 48 bài Task 2 trong 7 tệp dữ liệu bài mẫu. Mỗi bài đều hiện một ảnh minh họa phía dưới phần đề bài.
- Ảnh không được chọn theo nội dung đề bài. Trang tạo ảnh ngay lúc mở bài bằng một dịch vụ ảnh miễn phí bên ngoài, với cùng một câu mô tả chung "flat illustration ... pastel ... no text" cho mọi bài, chỉ khác một con số ngẫu nhiên sinh từ mã bài.
- Vì vậy bài "Homework For Primary School Children" chỉ ra một cây bút chì và các mảng màu trừu tượng, không thấy học sinh, không thấy bài tập về nhà - đúng như ảnh người dùng gửi.
- Ảnh còn phụ thuộc mạng ngoài: chậm, có thể bị chặn, khi lỗi chỉ còn hiện emoji.
- Bài Task 1 dùng biểu đồ vẽ trong ứng dụng, không liên quan phần này.

## Sẽ làm

### 1. Tạo bộ ảnh minh họa riêng cho từng bài

- Viết mô tả ảnh riêng cho từng bài Task 2 dựa trên chính đề bài, nêu rõ khung cảnh, nhân vật, hành động và vật thể chính. Ví dụ chủ đề bài tập về nhà: học sinh tiểu học ngồi ở bàn bếp buổi tối làm bài, phụ huynh bên cạnh, cặp sách và đồng hồ; chủ đề tắc đường: đường phố giờ cao điểm nhìn từ trên cao với xe buýt, xe máy, người đi bộ.
- Tạo ảnh chất lượng cao, sắc nét, khổ ngang, phong cách minh họa biên tập hiện đại, sáng, dễ nhìn trên cả nền sáng và tối, không có chữ trong ảnh (chữ hay bị méo).
- Lưu ảnh lên CDN của Lovable để trang tải nhanh và không phụ thuộc dịch vụ ngoài.

### 2. Gắn ảnh đúng bài

- Tạo một bảng ánh xạ mã bài đến ảnh, kèm mô tả thay thế (alt) nói rõ ảnh thể hiện điều gì, dùng cho cả tìm kiếm và người dùng đọc bằng trình đọc màn hình.
- Trang chi tiết dùng ảnh trong bảng này trước; nếu một bài chưa có ảnh riêng thì mới dùng cách cũ làm phương án dự phòng.
- Chú thích dưới ảnh mô tả nội dung cảnh thay vì chỉ nhắc lại tên chủ đề.

### 3. Rà soát chất lượng ảnh

- Xem lại từng ảnh sau khi tạo: đúng chủ đề, người vẽ không lỗi (thiếu đầu, thừa tay, mặt méo), không có chữ, đủ nét ở khổ lớn. Ảnh nào sai thì tạo lại.
- Thêm kiểm tra tự động: mọi bài Task 2 phải có ảnh trong bảng, không ảnh nào dùng cho hai bài khác nhau, mọi ảnh đều có alt.

### 4. Kiểm chứng

- Kiểm tra TypeScript và các kiểm tra bài mẫu hiện có.
- Mở vài bài trên máy tính và điện thoại: ảnh hiện rõ, không tràn, không lệch tỉ lệ, tải nhanh, không lỗi mạng.

## Chi tiết kỹ thuật

- Ảnh mới lưu dạng pointer CDN trong `src/assets/ielts-writing/`, thêm tệp `src/data/ieltsEssayIllustrations.ts` chứa map `essayId -> { url, alt, caption }`.
- `IeltsSampleEssayDetail.tsx`: dùng map trước, giữ hàm `topicImageUrl` hiện tại chỉ làm fallback, giữ nguyên emoji fallback và `onError`.
- Thêm kiểm tra vào `scripts/audit_ielts_writing_banks.ts` cho độ phủ và trùng ảnh.
- Không đổi id bài, route, nội dung bài mẫu, đáp án hay tiến độ học viên.

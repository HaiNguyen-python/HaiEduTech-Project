# Làm lại cách trình bày các ô bài mẫu IELTS Writing

## Vấn đề hiện tại
- Tiêu đề bài viết dài ("Education Technology In Classrooms") làm các ô cao thấp khác nhau, lưới nhìn lệch.
- Chữ tiêu đề quá lớn so với phần mô tả, ba nhãn (Task / dạng bài / Band) chen chúc và tự xuống dòng.
- Đoạn mô tả bị cắt cứng ở 120 ký tự nên hay đứt giữa từ và thêm "..." thừa.
- Nhãn "Band 8.0+" lặp trên mọi ô dù đã có tab Band ở trên.
- Nút ngôi sao đè lên góc tiêu đề, thiếu khoảng trống.
- Hàng thẻ lọc dạng bài dàn ngang không đều với thanh tìm kiếm trên màn hình vừa.

## Sẽ chỉnh
1. **Ô bài viết đồng bộ chiều cao**: mỗi ô cùng một khung dọc - hàng nhãn, tiêu đề (giới hạn 2 dòng), mô tả (giới hạn 2 dòng), chân ô luôn nằm dưới cùng.
2. **Thứ bậc chữ rõ hơn**: tiêu đề nhỏ và cân hơn, mô tả dễ đọc, cắt mô tả bằng giới hạn dòng thay vì cắt ký tự thô.
3. **Nhãn gọn**: giữ Task + dạng bài nổi bật, nhãn Band chuyển thành chữ nhỏ ở chân ô (vì đã chọn Band ở tab trên).
4. **Chân ô thống nhất**: số từ vựng, số bài tập và một dấu hiệu "Xem bài mẫu" xuất hiện khi trỏ chuột.
5. **Ngôi sao gọn hơn**: đặt trong một vùng riêng ở góc, không chồng lên chữ, vẫn bấm được mà không mở bài.
6. **Hàng lọc ngăn nắp**: nhóm tab Task, các thẻ dạng bài, nút "Đã đánh dấu" và ô tìm kiếm thành khối xếp gọn trên điện thoại, thẳng hàng trên máy tính.
7. **Trạng thái trống đẹp hơn**: thêm biểu tượng và câu gợi ý xóa bộ lọc.

## Ghi chú kỹ thuật
- Chỉ sửa `src/pages/IeltsSampleEssays.tsx` (phần hiển thị). Không đổi dữ liệu bài mẫu, đường dẫn, ID, bộ lọc logic, trạng thái sao (localStorage) hay trang chi tiết.
- Dùng token màu sẵn có (`glass-card`, `text-muted-foreground`, `primary`), không thêm màu cứng.
- Dùng `line-clamp-2` + `min-h`/`flex-col` + `mt-auto` để các ô cao bằng nhau; giữ Framer Motion hiện tại.
- Giữ tiếng Việt/tiếng Anh qua hàm `t()` như hiện nay.

## Kiểm tra
- Chạy kiểm tra TypeScript.
- Xem lại trang trên máy tính và điện thoại: lưới đều, không tràn ngang, bấm sao không mở bài, lọc và tìm kiếm vẫn đúng.

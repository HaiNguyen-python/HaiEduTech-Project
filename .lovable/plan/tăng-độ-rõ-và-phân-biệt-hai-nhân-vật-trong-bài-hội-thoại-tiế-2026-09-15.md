# Tăng độ rõ và phân biệt hai nhân vật trong bài hội thoại tiếng Trung

## Mục tiêu
- Loại bỏ tình trạng chữ nhạt, chìm vào nền hoặc quá nhỏ trong toàn bộ màn hình bài học Interactive Chinese Curriculum.
- Phân biệt rõ lời thoại của từng nhân vật bằng màu chữ riêng, đồng thời vẫn bảo đảm tương phản và dễ đọc.
- Giữ nguyên nội dung, 103 bài học, route, ID, tiến độ, audio/TTS và chức năng hiện có.

## Thay đổi giao diện
1. **Hai nhân vật có hệ màu riêng**
   - Nhân vật bên trái: chữ chính xanh Royal Blue đậm, nền xanh rất nhạt, viền xanh rõ.
   - Nhân vật bên phải: chữ chính Emerald đậm, nền xanh lá rất nhạt, viền Emerald rõ.
   - Tên vai, chữ Hán, pinyin, bản dịch và nút nghe đều theo đúng hệ màu của nhân vật.
   - Không chỉ đổi màu bong bóng: mọi dòng chữ bên trong được gán màu rõ ràng, không dùng opacity làm chữ bị mờ.

2. **Chuẩn hóa cỡ chữ và độ đậm**
   - Chữ Hán trong hội thoại: tối thiểu 18px trên mobile, lớn hơn trên desktop, đậm và có line-height thoáng.
   - Pinyin và bản dịch: tối thiểu 16px, medium hoặc semibold, màu đủ tương phản.
   - Tên nhân vật, mô tả tình huống, Cultural Note, tab và metadata đầu bài: tăng từ các mức 12-14px đang quá nhỏ lên mức dễ đọc.
   - Giảm sử dụng `opacity` và các màu `muted` ở phần nội dung quan trọng; chỉ giữ màu phụ cho thông tin thực sự thứ cấp.

3. **Rà soát toàn màn hình bài học**
   - Kiểm tra phần đầu bài, thanh tiến độ, các tab Situations/Vocabulary/Structures/Exercises/Listening/Roleplay.
   - Chuẩn hóa màu chữ trên các nền xanh, xám, vàng và các trạng thái kết quả.
   - Giữ avatar chibi và ảnh đầu bài vừa thêm, nhưng cân lại kích thước/khoảng cách nếu chữ bị ép trên mobile.

## Kiểm tra
- Kiểm tra tự động TypeScript, lint và test liên quan.
- Kiểm tra trực tiếp desktop và mobile với ít nhất hai bài thuộc chủ đề khác nhau.
- Xác nhận hai nhân vật có hai màu chữ khác nhau, không tràn ngang, không chồng chữ và các nút nghe vẫn hoạt động.
- Đối chiếu độ tương phản của các lớp chữ chính/phụ trên nền thực tế, gồm cả giao diện sáng và tối nếu trang hỗ trợ.

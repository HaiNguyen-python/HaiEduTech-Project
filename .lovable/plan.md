# Rà soát và nâng cấp toàn bộ Speaking Coach

## Hiện trạng đã xác minh

Speaking Coach dùng chung một hệ thống cho 6 ngôn ngữ với 2 khu vực Tổng quan và Luyện tập, gồm 5 hoạt động: Câu mẫu, Shadowing, Luyện âm, Nói tự do và Ôn từ yếu.

- Tổng dữ liệu hiện có: **284 chủ đề, 2.783 câu**.
- Tiếng Anh: 66 chủ đề, 626 câu.
- Tiếng Phần Lan: 52 chủ đề, 566 câu.
- Tiếng Thụy Điển: 60 chủ đề, 600 câu.
- Tiếng Nhật: 30 chủ đề, 300 câu.
- Tiếng Trung: 39 chủ đề, 353 câu.
- Tiếng Việt: 37 chủ đề, 338 câu.
- Bộ kiểm tra hiện tại xác nhận không có ID trùng sau bước hợp nhất, không thiếu câu/bản dịch và 6 ngôn ngữ đều có bài luyện âm cùng chủ đề Nói tự do.

Các điểm cần nâng cấp đã xác nhận:

1. Có **28 nội dung câu bị lặp** giữa các chủ đề ở tiếng Anh, Trung, Phần Lan và Việt Nam.
2. Cấp độ chưa cân bằng: tiếng Nhật chưa có B2/C1; tiếng Trung và tiếng Việt chỉ có 1 chủ đề B2 và 1 chủ đề C1; tiếng Phần Lan chỉ có 2 chủ đề B2 và chưa có C1.
3. Hỗ trợ phát âm chưa đồng đều: Anh và Nhật đầy đủ; Trung thiếu Pinyin ở 20 câu nâng cao; Phần Lan mới có phiên âm ở khoảng 12%; Thụy Điển và Việt Nam chưa có trường phiên âm riêng.
4. Dữ liệu mẹo phát âm mới có cho 3/6 ngôn ngữ và hiện chưa được dùng đầy đủ trong màn luyện câu.
5. Phần Câu mẫu dùng bộ nhận diện giọng nói riêng, còn 4 hoạt động kia dùng bộ dùng chung. Hai luồng đã lệch cách xử lý thời gian và tự khởi động lại.
6. Kết quả AI của Nói tự do chưa kiểm tra đầy đủ trước khi hiển thị, nên phản hồi thiếu trường có thể làm hỏng màn hình.
7. Số từ yếu và biểu đồ có thể cập nhật chậm trong cùng một phiên; thanh tiến độ Ôn từ yếu có thể hiển thị giá trị cũ sau lượt vừa đọc.
8. Chưa có kiểm thử tự động cho chấm điểm, nhận dạng giọng nói và chuyển đổi giữa 5 hoạt động.

## 1. Thêm hình minh họa chibi cho phần Câu mẫu

Theo lựa chọn đã chốt: **mỗi chủ đề một hình, phong cách chibi giáo dục**.

- Tạo một bộ hình riêng cho từng `theme.id`, giữ đồng nhất nhân vật, nét vẽ và bảng màu HaiEduTech: xanh Royal Blue, xanh Emerald, vàng ấm và nền sáng.
- Hình mô tả đúng bối cảnh chủ đề như chào hỏi, mua sắm, trường học, công sở, du lịch, sức khỏe và đời sống, không chèn chữ vào ảnh.
- Hiển thị ảnh ở thẻ chọn chủ đề và đầu màn luyện Câu mẫu. Cùng một chủ đề giữ nguyên ảnh khi chuyển câu để giao diện ổn định.
- Trên máy tính, ảnh và nội dung câu cân đối theo bố cục hai vùng. Trên điện thoại, ảnh nằm phía trên, có chiều cao cố định để không làm nút Nghe/Ghi âm bị đẩy quá xa.
- Ảnh tải lười, có kích thước cố định để tránh xô lệch. Khi ảnh lỗi hoặc chưa có, tự động trở về emoji hiện tại.
- Lưu ánh xạ ảnh trong một danh mục riêng theo `theme.id`, không thêm trường bắt buộc vào 2.783 câu, không đổi ID hay dữ liệu tiến độ.
- Kiểm tra tính phù hợp văn hóa và tránh hình ảnh gây hiểu sai cho cả 6 ngôn ngữ.

## 2. Ổn định nhận dạng giọng nói và âm thanh

- Gộp phần Câu mẫu vào bộ nhận dạng dùng chung để 5 hoạt động có cùng cách xin quyền mic, xử lý Safari/iOS, tự kết thúc, giới hạn thời gian và dọn mic khi rời trang.
- Giữ nguyên cách chấm hiện có cho viết tắt, số, dấu, từ ghép Bắc Âu và chữ Trung/Nhật; bổ sung kiểm thử trước khi chuyển sang bộ dùng chung.
- Ngăn nghe chồng, bấm đúp và trạng thái nút nghe bị kẹt; giữ hai tốc độ nghe thường/chậm cho mọi ngôn ngữ.
- Thêm thông báo có thể được trình đọc màn hình đọc ngay khi mic hoặc âm thanh lỗi.
- Giữ nguyên toàn bộ khóa lưu, điểm, huy hiệu và bảng xếp hạng hiện có.

## 3. Sửa lỗi trạng thái và Nói tự do

- Kiểm tra, chuẩn hóa phản hồi AI trước khi hiển thị. Nếu thiếu một phần, vẫn hiện các phần hợp lệ và báo lỗi nhẹ thay vì làm hỏng màn hình.
- Cập nhật ngay số từ yếu, biểu đồ phát âm và lộ trình sau mỗi lượt Shadowing, Luyện âm hoặc Ôn từ yếu.
- Đồng bộ lại thẻ hiện tại sau mỗi lần ôn để số lần đọc đúng và thanh tiến độ không bị chậm một lượt.
- Bảo toàn trạng thái Câu mẫu hiện tại; rà soát việc giữ hoặc khôi phục hợp lý vị trí đang học ở 4 hoạt động còn lại.
- Bổ sung trạng thái đang tải, rỗng, lỗi mạng và thử lại rõ ràng nhưng gọn.

## 4. Nâng chất nội dung 6 ngôn ngữ

- Viết lại 28 câu trùng nội dung nhưng giữ nguyên ID để không mất tiến độ.
- Bổ sung Pinyin cho 20 câu Trung B2/C1 đang thiếu.
- Hoàn thiện mẹo phát âm theo ngôn ngữ: âm Nhật, thanh điệu Việt, nguyên âm dài và phụ âm kép Phần Lan, sj/tj và trọng âm Thụy Điển, thanh điệu và âm đầu Trung, trọng âm và nối âm Anh.
- Đưa mẹo phù hợp với câu hiện tại vào ngay dưới phiên âm, tối đa 1 đến 2 mẹo để không gây rối.
- Bổ sung lộ trình nội dung nâng cao theo thứ tự ưu tiên:
  1. Nhật B2/C1.
  2. Trung B2/C1.
  3. Việt B2/C1.
  4. Phần Lan B2/C1.
  5. Cân lại phần Anh đang tập trung quá nhiều ở B1.
- Mỗi nội dung mới phải có câu đích, bản dịch, cấp độ, độ khó, hỗ trợ phát âm và không trùng ý.

## 5. Chỉnh giao diện toàn bộ 5 hoạt động

- Giữ cấu trúc 2 tab hiện tại nhưng làm rõ hoạt động đang chọn, tiến độ và hành động chính.
- Căn lại chiều cao thẻ hoạt động, khoảng cách, nút và nội dung dài trên điện thoại.
- Dùng cùng một hệ thống màu trạng thái cho đúng, gần đúng, sai và lỗi trên cả 5 hoạt động, có tương phản tốt ở sáng/tối.
- Giảm chuyển động khi thiết bị bật chế độ hạn chế chuyển động.
- Kiểm tra các câu dài, Pinyin/IPA dài, chữ Hán, Kana và dấu tiếng Việt để không tràn hoặc chồng lên nút.

## 6. Kiểm tra tự động và nghiệm thu

- Mở rộng bộ rà soát dữ liệu để bắt câu trùng, cấp độ thiếu, phiên âm thiếu, ảnh chủ đề thiếu, đường dẫn ảnh lỗi và bản dịch rỗng.
- Thêm kiểm thử cho chấm điểm: viết tắt, số, dấu phụ, từ ghép, chữ Trung/Nhật, kết quả rỗng và nhận dạng gần đúng.
- Thêm kiểm thử cho Nói tự do khi AI trả về đủ, thiếu hoặc sai định dạng.
- Kiểm tra trình duyệt cho cả 6 đường dẫn Speaking Coach, 2 tab và 5 hoạt động.
- Kiểm tra máy tính và điện thoại: chọn chủ đề, tải hình, nghe thường/chậm, ghi âm, dừng, chấm điểm, thử lại, chuyển câu, đổi hoạt động, tải lại trang và khôi phục tiến độ.
- Xác nhận không đổi route, ID câu/chủ đề, khóa lưu, hợp đồng dữ liệu, hành vi song ngữ hay tiến độ hiện có.

## Thứ tự triển khai

1. Sửa các lỗi ổn định và thêm kiểm thử nền.
2. Tạo hệ thống ánh xạ hình và bộ hình chibi cho 284 chủ đề.
3. Tích hợp hình vào chọn chủ đề và Câu mẫu, tối ưu tải ảnh.
4. Dọn nội dung lặp và hoàn thiện hỗ trợ phát âm.
5. Bổ sung cấp độ nâng cao còn thiếu.
6. Nghiệm thu toàn bộ 6 ngôn ngữ trên máy tính và điện thoại.

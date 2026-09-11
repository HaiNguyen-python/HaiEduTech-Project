# Rà soát và sửa hiển thị game tiếng Việt

## Kết quả đã xác minh

- `WordMeteor` đang dùng cố định đèn lồng, rồng, tre và hai chữ Hán `福`, `龙` cho mọi ngôn ngữ. Vì Vietnamese Arcade tái sử dụng màn này nên game tiếng Việt vẫn xuất hiện nền tiếng Hoa.
- Trang `/learn-vietnamese/arcade` đang ép toàn trang vào chế độ tối bằng lớp `dark`, trong khi nền ngoài là sáng. Kết quả thực tế là các thẻ game bị xám đen, phần mô tả rất mờ và khó đọc trên cả máy tính lẫn điện thoại.
- Thẻ `Phở Match` còn dùng biểu tượng rồng, không phù hợp với nhận diện Việt Nam.
- Khu Game trong trang `/learn-vietnamese?tab=game` hiển thị sáng hơn, nhưng hình nền đầu trang có nhiều chi tiết dễ gợi liên tưởng Trung Hoa; tên game và một số nhãn vẫn thiên về tiếng Anh dù đang ở khu tiếng Việt.
- Một số trạng thái trong game dùng màu chữ sáng cố định như vàng, xanh ngọc, xanh lá trên nền sáng nên có nguy cơ thiếu tương phản. Các nút biểu tượng âm thanh đang dùng nút HTML thô, vùng bấm nhỏ.
- Trên điện thoại, bảng cookie đang che phần lớn nội dung trong ảnh kiểm tra. Đây là lớp toàn cục, không phải lỗi riêng của game, nên kế hoạch chỉ kiểm tra game sau khi đóng bảng này và không thay đổi hệ thống cookie.

## Việc sẽ làm

### 1. Loại bỏ toàn bộ dấu hiệu tiếng Hoa khỏi game tiếng Việt
- Tách trang trí `Word Meteor` theo ngôn ngữ thay vì dùng một bộ cố định.
- Với tiếng Việt, dùng các biểu tượng phù hợp như hoa sen, nón lá, trống đồng, ruộng lúa, cờ Việt Nam; không có chữ Hán, đèn lồng Trung Hoa hoặc rồng kiểu Trung Hoa.
- Thay biểu tượng rồng trên thẻ `Phở Match` bằng hình ảnh nhận diện Việt Nam phù hợp.
- Rà lại hình nền khu Game chính và giảm hoặc thay các chi tiết dễ gây nhầm với văn hóa Trung Hoa, nhưng vẫn giữ phong cách minh họa Việt Nam hiện có.

### 2. Sửa độ sáng và tương phản
- Bỏ việc ép chế độ tối trên Vietnamese Arcade; để trang tuân theo giao diện sáng/tối chung của hệ thống.
- Chỉnh nền, viền, tiêu đề, mô tả và nhãn `PLAY` của ba thẻ game để luôn rõ ở cả hai chế độ.
- Chỉnh các trạng thái thường, chọn, đúng, sai, vô hiệu hóa, kết quả và bảng xếp hạng trong toàn bộ game tiếng Việt.
- Giữ màu thương hiệu HaiEduTech, kết hợp đỏ, vàng, xanh ngọc và các sắc văn hóa Việt nhưng không làm giao diện tối nặng.

### 3. Rà soát toàn bộ màn chơi tiếng Việt
- Kiểm tra Vietnamese Arcade: Phở Match, Bóng Nước Pop, Word Meteor.
- Kiểm tra Game Center: Dòng thời gian lịch sử, Đấu trường từ vựng, Thám tử văn hóa, Đối đầu 1v1.
- Kiểm tra Fact or Myth tại nơi đang được sử dụng.
- Chuẩn hóa nút thoát, âm thanh, chơi lại và nút chọn đáp án; bảo đảm vùng bấm đủ lớn và chữ không bị tràn.
- Giữ nguyên luật chơi, dữ liệu câu hỏi, điểm số, bảng xếp hạng, tiến độ và đường dẫn hiện tại.

### 4. Kiểm tra sau khi sửa
- Chạy kiểm tra TypeScript và audit tương phản hover hiện có.
- Mở từng trang trên máy tính và điện thoại, đóng lớp cookie trước khi đánh giá giao diện.
- Chơi thử từng game qua các trạng thái bắt đầu, đang chơi, đúng/sai, kết thúc và chơi lại.
- Xác nhận không còn chữ Hán hoặc trang trí Trung Hoa trong các màn game tiếng Việt, không còn chữ tối trên nền tối, không tràn khung và không phát sinh lỗi trình duyệt mới.

## Chi tiết kỹ thuật

- Biến phần trang trí trong `src/components/games/WordMeteor.tsx` thành cấu hình theo `lang`; chỉ nhánh `zh` giữ chủ đề Trung Hoa.
- Chỉnh `src/pages/VietnameseArcade.tsx` để dùng token giao diện chung thay vì ép `dark` và thay biểu tượng chủ đề.
- Rà các lớp màu tại `GameHub`, `TimelineDragDrop`, `VocabShadowFight`, `CultureDetective`, `DuelBattle`, `FactOrMythGame` và `WordMeteor` theo token sáng/tối hiện có.
- Không thay route, mã game, cấu trúc dữ liệu, cơ chế lưu điểm hoặc tích hợp Bộ não ghi nhớ.

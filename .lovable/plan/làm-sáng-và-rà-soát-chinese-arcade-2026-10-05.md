# Làm sáng và rà soát Chinese Arcade

## Mục tiêu
- Đổi năm thẻ game từ nền tối sang phong cách sáng, nhiều màu nhưng vẫn dễ đọc.
- Giữ bố cục hiện tại và toàn bộ dữ liệu điểm, cấp độ HSK, đường dẫn.
- Kiểm tra đủ năm game trên máy tính và điện thoại, sửa các lỗi chức năng hoặc hiển thị tìm thấy.

## Thay đổi
- Làm mỗi thẻ có nền pastel riêng theo chủ đề game, viền và điểm nhấn rõ, chữ tương phản cao, nhãn Play dễ nhìn.
- Làm tiêu đề, mô tả và hướng dẫn dưới danh sách rõ trên nền sáng; bảo đảm thẻ cân nhau và không tràn chữ ở màn hình nhỏ.
- Rà soát Hanzi Space Shooter, Hanzi Hotpot Chef, Pinyin Tone Runner, Word Meteor và Sentence Builder: bắt đầu/chơi lại/kết thúc, bộ đếm thời gian, mạng sống, điểm, lưu kết quả, lọc HSK và nút điều khiển.
- Sửa các lỗi được xác nhận mà không đổi luật chơi hoặc nội dung học tập ngoài phạm vi cần thiết.

## Kiểm tra
- Chơi thử từng game qua ít nhất các trạng thái bắt đầu, đúng/sai, thoát và chơi lại.
- Kiểm tra desktop và mobile: màu sáng, chữ rõ, nút đủ lớn, không chồng lấn hoặc tràn ngang.
- Chạy kiểm tra tự động liên quan và xác nhận trang không phát sinh lỗi trình duyệt.

## Chi tiết kỹ thuật
- Thay kiểu thẻ tối cố định bằng token giao diện sáng và bảng màu riêng của từng game trong `ChineseArcade`.
- Ưu tiên sửa state/timer/keyboard/accessibility ngay tại game liên quan; giữ nguyên các mã điểm hiện có để không mất dữ liệu cũ.

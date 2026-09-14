# Rà soát lần cuối Tech & Code Game Hub

Mục tiêu: sửa các điểm lệch giữa mô tả thẻ và nội dung game thật, làm sạch cảnh báo kỹ thuật, chuẩn hóa cách hiển thị điểm cho cả 8 game. Không đổi route, không đổi mã lưu điểm, không đổi đáp án đúng.

## 1. Sửa mô tả không khớp nội dung
- Thẻ SQL Dungeon ghi "10 quái vật" nhưng bộ câu đố có 11 màn. Cập nhật mô tả và kiểm lại con số XP tối đa bằng tổng phần thưởng thật.
- Soát lại toàn bộ 8 thẻ: số câu hỏi, số đoạn code, mức điểm ghi trên thẻ phải bằng dữ liệu thật trong game.

## 2. Thêm màn tổng kết cho SQL Dungeon
- Hiện nay khi đánh xong quái cuối, game im lặng quay về màn đầu, học sinh không biết đã hoàn thành.
- Thêm màn tổng kết: tổng XP lượt chơi, số màn đã thắng, nút chơi lại (chơi lại khởi tạo lượt mới, không tải lại trang).

## 3. Chuẩn hóa cách hiển thị điểm
- Bug Hunter, Git Branch Quest, Cyber Shield: màn tổng kết hiện hiển thị số câu đúng, nhưng điểm lưu lại là số câu đúng nhân 20. Hiển thị cùng một đơn vị XP để học sinh không nhầm.
- Python Speed Run: độ chính xác đang lưu cố định 100% và mốc điểm tối đa không thể đạt được. Ghi độ chính xác thật theo từng đoạn và đặt mốc tổng theo điểm cao nhất thực tế.

## 4. Nội dung học tập
- Kiểm tra lại từng câu trong Bug Hunter, Git Branch Quest, Cyber Shield: đáp án đúng, phần giải thích rõ, không có phương án gây hiểu sai.
- Thêm nhãn kỹ năng nhỏ cho từng câu (cú pháp, vòng lặp, kiểu dữ liệu, nhánh, hợp nhất, phishing, quyền truy cập) để phần chơi thành ôn tập có định hướng.
- Cyber Shield giữ tinh thần phòng thủ, không mô tả cách tấn công.
- Câu hỏi và code giữ tiếng Anh; phần hướng dẫn giao diện của 4 game mới bổ sung song ngữ giống các game cũ.

## 5. Sửa cảnh báo kỹ thuật
- Trình duyệt đang báo cảnh báo về tham chiếu bị truyền vào Data Pipeline Plumber. Tìm đúng chỗ gây ra và sửa để bảng điều khiển sạch cảnh báo.

## 6. Kiểm tra
- Chơi hết một lượt cả 8 game trên máy tính và điện thoại: câu hỏi chạy đủ, tổng kết hiện đúng, XP cộng đúng, mỗi lượt chỉ lưu một kết quả.
- Kiểm tra không tràn ngang, chữ không chìm trên nền tối, mọi nút bấm đủ vùng chạm.
- Chạy kiểm tra TypeScript, lint và audit nội dung Programming tiếng Anh.

## Chi tiết kỹ thuật
- Sửa trong `src/pages/ProgrammingArcade.tsx` (dữ liệu thẻ, SQL Dungeon, cảnh báo ref) và `src/components/games/ProgrammingReviewGames.tsx` (điểm, nhãn kỹ năng, song ngữ).
- Giữ nguyên `finishGame` và các mã `prog_*`, `code_galaxy_*` để bảng xếp hạng và dữ liệu cũ không bị ảnh hưởng.
- Không thêm thư viện, bảng dữ liệu hay thay đổi backend.

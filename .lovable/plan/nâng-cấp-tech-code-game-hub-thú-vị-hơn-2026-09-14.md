# Nâng cấp Tech & Code Game Hub thú vị hơn

Mục tiêu: giữ nguyên 8 game, route `/programming/arcade`, mã lưu điểm và đáp án hiện có; thêm động lực, thêm game mới, nâng chất câu hỏi và làm phần phản hồi sinh động hơn. Chỉ chơi một mình, không thêm chế độ thi đấu.

## 1. Động lực và phần thưởng
- Bảng thành tích cá nhân ngay đầu trang: tổng XP, cấp độ, số nhiệm vụ đã hoàn thành, điểm cao nhất từng game.
- Chuỗi ngày chơi: đếm số ngày liên tiếp có chơi ít nhất một game, hiển thị ngọn lửa và mốc 3/7/14/30 ngày.
- Huy hiệu mở khóa: hoàn thành lần đầu mỗi game, đạt điểm hoàn hảo, phá kỷ lục cá nhân, đủ chuỗi ngày, chơi hết cả 8 game.
- Thẻ game hiển thị điểm cao nhất và huy hiệu đã đạt, kèm dấu "mới" cho game chưa từng chơi.
- Bảng xếp hạng cho từng game mới, dùng cùng cơ chế bảng xếp hạng hiện có.

## 2. Bốn game mới
- **Big-O Detective**: xem đoạn code, chọn độ phức tạp đúng (O(1), O(n), O(n log n), O(n²)), có giải thích ngắn.
- **Terminal Rescue**: tình huống dòng lệnh thật (di chuyển thư mục, xem file, quyền, gói cài đặt), chọn lệnh đúng.
- **Data Type Sorter**: phân loại nhanh giá trị và biểu thức theo kiểu dữ liệu trong thời gian giới hạn, có combo điểm.
- **Prompt Architect**: chọn cách viết prompt tốt hơn cho AI (rõ mục tiêu, có ngữ cảnh, có định dạng đầu ra), gắn với nội dung AI Academy.
- Mỗi game khoảng 8-10 câu, code và câu hỏi bằng tiếng Anh, phần hướng dẫn song ngữ, lưu điểm một lần mỗi lượt như các game hiện tại.

## 3. Nâng chất 8 game hiện có
- Tăng ngân hàng câu hỏi cho Bug Hunter, Git Branch Quest, Cyber Shield lên 15 câu mỗi game, mỗi lượt lấy 10 câu ngẫu nhiên theo nhãn kỹ năng để chơi lại không lặp.
- Ba mức độ khó cho mỗi game trắc nghiệm: Dễ (không giới hạn thời gian), Thường (đồng hồ mỗi câu), Khó (đồng hồ ngắn, sai là mất điểm chuỗi).
- Combo điểm: trả lời đúng liên tiếp cộng thêm điểm, hiển thị chuỗi hiện tại.
- Nút gợi ý: loại bỏ một đáp án sai, mỗi lượt dùng tối đa hai lần, đổi lấy điểm.
- Màn tổng kết bổ sung: điểm so với kỷ lục cá nhân, danh sách câu sai kèm giải thích để ôn lại, nút chơi lại nhanh.
- Python Speed Run: thêm bậc snippet nâng cao và hiển thị số ký tự đúng mỗi giây.

## 4. Hiệu ứng và âm thanh
- Phản hồi đúng: thẻ sáng lên, dấu tích nảy nhẹ, hạt sáng ngắn; phản hồi sai: rung nhẹ và viền đỏ.
- Hiệu ứng ăn mừng khi phá kỷ lục hoặc mở huy hiệu mới.
- Âm thanh nhẹ do trình duyệt tạo (đúng, sai, hết giờ, lên cấp) với nút bật/tắt lưu lại lựa chọn; mặc định bật ở mức nhỏ.
- Tôn trọng thiết lập giảm chuyển động của thiết bị: tắt hạt sáng và rung.

## 5. Kiểm tra
- Chơi trọn một lượt cả 12 game trên máy tính và điện thoại: câu hỏi đủ, điểm cộng đúng, mỗi lượt chỉ lưu một kết quả.
- Kiểm tra chuỗi ngày, huy hiệu, kỷ lục cá nhân vẫn đúng sau khi tải lại trang.
- Kiểm tra không tràn ngang, chữ không chìm trên nền tối, mọi nút đủ vùng chạm 44px.
- Chạy kiểm tra TypeScript, lint và audit nội dung Programming tiếng Anh.

## Chi tiết kỹ thuật
- Tách 4 game mới thành thành phần riêng trong `src/components/games/`, tái dùng khung `ReviewGame` đã có thay vì sao chép.
- Chuỗi ngày, huy hiệu, kỷ lục cá nhân lưu bằng localStorage cho khách và đồng bộ vào bảng điểm hiện có khi đã đăng nhập; không thêm bảng mới.
- Mã điểm mới: `prog_bigo_detective`, `prog_terminal_rescue`, `prog_data_type_sorter`, `prog_prompt_architect`. Giữ nguyên `finishGame` và các mã `prog_*`, `code_galaxy_*` hiện có.
- Âm thanh dùng Web Audio API tạo tại chỗ, không thêm tệp media hay thư viện.
- Hiệu ứng dùng token `.arcade-*` và Framer Motion đã có trong dự án.

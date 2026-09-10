# Lifestyle: 6 nhóm bài học mặc định thu gọn + biểu đồ kỹ năng rõ và dễ nhìn hơn

## 1. Các nhóm bài học thu gọn sẵn khi vào trang lần đầu

- Khi học sinh vào mục "All" lần đầu (chưa từng mở/đóng nhóm nào), cả 6 nhóm (Finance, Etiquette, Presence, Wellness, Self-Study, Parties) đều hiển thị ở dạng thu gọn, chỉ thấy thanh tiêu đề mỗi nhóm.
- Muốn học môn nào, học sinh bấm vào thanh tiêu đề để mở nhóm đó ra.
- Sau khi học sinh tự mở/đóng, lựa chọn đó vẫn được ghi nhớ như hiện nay - lần sau quay lại sẽ thấy đúng trạng thái mình đã để.
- Hai nút "Mở tất cả" / "Thu gọn tất cả" vẫn giữ nguyên.

## 2. Rà soát và làm biểu đồ kỹ năng mềm rõ, dễ nhìn hơn

Hiện biểu đồ còn thiếu con số trực quan - chỉ nhìn hình radar khó biết mỗi kỹ năng đang bao nhiêu phần trăm. Sẽ cải thiện:

- Mỗi trục kỹ năng hiển thị kèm số phần trăm ngay cạnh tên (ví dụ "Tài chính - 40%").
- Dưới biểu đồ thêm danh sách 6 kỹ năng dạng thanh tiến độ nhỏ: tên kỹ năng, số bài đã đạt/tổng số, thanh màu theo phần trăm. Nhìn một lượt là biết kỹ năng nào mạnh, kỹ năng nào cần học thêm.
- Màu thanh tiến độ dùng đúng màu của từng trụ cột đã có sẵn trên trang - không thêm màu mới.
- Giữ nguyên quy tắc: chỉ bài đạt từ 75% quiz (đúng ít nhất 3/4 câu) mới được tính vào biểu đồ; bài chưa đạt vẫn lưu điểm nhưng hiển thị "làm lại".
- Câu hướng dẫn khi chưa có dữ liệu vẫn giữ, viết lại ngắn gọn hơn.

## 3. Kiểm tra sau khi xong

- Chạy kiểm tra TypeScript và audit Lifestyle (phải 0 lỗi).
- Kiểm tra trên máy tính và điện thoại: vào trang mới thấy 6 nhóm đều thu gọn, mở một nhóm, làm quiz 3/4 và xác nhận biểu đồ + thanh tiến độ cập nhật đúng số.

## Chi tiết kỹ thuật

- `src/pages/LifestyleAcademy.tsx`: đổi `isGroupOpen` thành `openGroups[key] === true` (mặc định đóng khi chưa có bản ghi); cập nhật điều kiện `allCollapsed`.
- `src/components/lifestyle/SoftSkillsRadar.tsx`: thêm `%` cạnh nhãn trục; thêm lưới 6 progress bar nhỏ dùng màu pillar hiện có; giữ nguyên props và logic tính điểm.
- Không đổi: route, ID bài học, dữ liệu tiến trình đã lưu, backend, các trang khác.

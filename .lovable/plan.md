# Bộ não 3D rõ hình hơn + hiện chữ từ vựng trên neuron

Hai việc chính: (1) làm hình khối bộ não dễ nhận ra hơn, (2) hiện chữ (từ đang học) ngay tại vị trí neuron thay vì chỉ là các chấm sáng.

## 1) Hình khối bộ não rõ hơn

- Thêm nếp gấp (gyri/sulci): biến dạng bán kính bằng hàm sin nhiều tần số theo góc, để bề mặt gợn sóng như vỏ não thật thay vì mặt cầu trơn.
- Rõ ràng 3 phần: hai bán cầu có khe giữa sâu hơn, thùy trước hẹp lại, thêm cerebellum ở dưới-sau và một cuống não ngắn.
- Scaffold (điểm mô nền) tăng mật độ và dùng 2 lớp: lớp ngoài mảnh sáng nhẹ viền silhouette, lớp trong rất mờ để tạo cảm giác khối.
- Ánh sáng nền: thêm gradient tối phía sau + vòng sáng nhẹ (rim) để hình não nổi bật khỏi nền.

## 2) Hiện chữ từ vựng trên bộ não

- Mỗi neuron kèm nhãn chữ nổi (billboard, luôn hướng về người xem) hiển thị chính từ đó, màu theo mức nhớ.
- Vì hàng trăm từ sẽ chồng chữ, dùng quy tắc hiển thị:
  - Chỉ hiện nhãn cho các neuron đang ở nửa trước (hướng về camera) và ưu tiên từ mới ôn / từ cần ôn.
  - Giới hạn tối đa ~60 nhãn cùng lúc, chọn theo độ ưu tiên rồi loại các nhãn quá gần nhau.
  - Từ đang được chọn và neuron đang hover luôn hiện nhãn, chữ to hơn, có viền tối để đọc rõ.
- Công tắc "Hiện chữ / Chỉ chấm sáng" và ô chọn mật độ chữ (Ít / Vừa / Nhiều) đặt ngay trên khung não.
- Zoom vào thì chữ hiện nhiều hơn, zoom xa thì tự ẩn để không rối.
- Bản 2D dự phòng cũng vẽ chữ theo cùng quy tắc (canvas fillText, giới hạn số nhãn).

## 3) Giao diện chung của khối bộ não

- Khung viewport cao hơn (520px mobile / 620px desktop), bo góc, nền tối kiểu "phòng thí nghiệm" với vignette.
- Thanh điều khiển nổi trong khung: bộ lọc (Tất cả / Còn tươi / Đang phai / Cần ôn ngay), công tắc chữ, nút tạm dừng-xoay, nút reset góc nhìn.
- Ô tìm từ nhỏ: gõ từ thì neuron đó bùng sáng và camera hướng tới nó.
- Chú giải màu gọn lại thành hàng chip có số lượng, đặt trong khung dưới bên phải.
- Thẻ thông tin từ được chọn hiện ngay dưới khung, thêm nút "Ôn lại từ này" chuyển sang tab Practice.
- Tất cả màu lấy từ design token/palette brand (Royal Blue - Soft Emerald) và giữ 5 mức nhớ hiện tại.

## Chi tiết kỹ thuật

- `src/components/vocab/vocabBrainModel.ts`: thêm biến dạng gyri vào `brainPositionFromRandoms`; thêm cuống não; tách helper `pickLabelCandidates(neurons, camera-facing dot, limit, minScreenDist)` để dùng chung cho 3D và 2D.
- `src/components/vocab/VocabBrain3D.tsx`: dùng `Billboard` + `Text` của `@react-three/drei` (đã cài, v9) cho nhãn; tính danh sách nhãn trong `useFrame` với throttle (~6 lần/giây) dựa trên `camera.position` để tránh tụt FPS; thêm `outlineWidth` cho chữ; giữ shader glow hiện tại; hover ring giữ nguyên.
- Font cho `Text`: dùng font mặc định của troika (không tải thêm file) để không phát sinh asset; từ vựng IELTS chỉ có ký tự Latin nên an toàn.
- `src/components/vocab/VocabBrain2D.tsx`: vẽ nhãn sau khi vẽ điểm, dùng cùng helper giới hạn số nhãn.
- `src/components/vocab/VocabBrainPanel.tsx`: thêm state `showLabels`, `labelDensity`, `paused`, `query`; truyền xuống 2 component; chuyển bộ lọc và chú giải vào overlay trong khung; thêm nút "Ôn lại từ này".
- Không đổi schema, không đổi truy vấn dữ liệu (`user_vocab_mastered`, `game_scores`), không đổi logic ⭐ hay bảng xếp hạng.

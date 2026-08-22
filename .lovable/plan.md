# Bộ não 3D rõ nét hơn + hiện nhiều từ hơn với màu theo mức nhớ

Ba mục tiêu: hình khối bộ não dễ nhận ra hơn, hiển thị được nhiều từ đã học hơn cùng lúc, và màu sắc phân biệt rõ từ nào đã nhớ chắc / từ nào cần ôn gấp.

## 1) Hình bộ não rõ hơn

- Thay lớp vỏ "hình cầu bẹt" hiện tại bằng vỏ dựng đúng theo cùng công thức đặt neuron (hai bán cầu có nếp gấp + tiểu não + cuống não), nên viền ngoài trùng khớp với đám mây điểm thay vì lệch nhau.
- Scaffold 3 lớp thay vì 2: lớp viền silhouette nét, lớp giữa mờ tạo khối, lớp trong rất mờ tạo độ sâu; tăng mật độ điểm để bề mặt liền mạch hơn.
- Khe giữa hai bán cầu sâu và tối hơn, tiểu não tách rõ khỏi vỏ não.
- Nền tối có vignette + rim light nhẹ để silhouette nổi bật; giảm hiện tượng "sáng bết" do additive blending bằng cách hạ opacity lớp trong.

## 2) Hiện nhiều từ đã học hơn

- Nâng giới hạn nhãn: Ít 40 / Vừa 90 / Nhiều 180 nhãn (hiện tại 22/48/90), thêm mức "Tất cả" cho ai muốn xem hết.
- Giảm khoảng cách tối thiểu giữa 2 nhãn để chữ xếp dày hơn nhưng vẫn không đè nhau; chữ nhỏ hơn một chút khi mật độ cao, to lên khi zoom vào.
- Nhãn ở mặt sau bộ não hiện mờ (thay vì ẩn hoàn toàn) nên tổng số từ nhìn thấy nhiều hơn.
- Neuron của từ chưa được gắn nhãn vẫn to/sáng hơn hiện tại để "cảm giác nhiều từ" rõ ràng.

## 3) Màu sắc phân biệt mức nhớ

- Giữ 5 mức nhớ nhưng làm màu tách biệt hơn để nhìn là biết ngay:
  - Nhớ chắc (vừa ôn, <= 1 ngày): xanh emerald sáng
  - Còn tốt (<= 6 ngày): xanh royal blue
  - Bắt đầu phai (<= 20 ngày): vàng hổ phách
  - Sắp quên (<= 45 ngày): cam
  - Đã quên (> 45 ngày): đỏ nhạt
- Chữ nhãn dùng cùng hệ màu (bản sáng hơn để đọc được trên nền tối), nên đọc chữ cũng biết trạng thái từ.
- Chú giải màu trong khung có kèm số lượng từ ở mỗi mức, bấm vào chip là lọc luôn.
- Bổ sung nhãn "Nhớ chắc / Cần ôn gấp" bằng tiếng Việt + Anh theo cài đặt ngôn ngữ hiện có.

## Chi tiết kỹ thuật

- `src/components/vocab/vocabBrainModel.ts`: đổi bảng màu 5 tier sang thang emerald -> blue -> amber -> orange -> red; thêm `labelInk` cho từng tier; thêm `buildScaffoldShell(count, radiusScale)` để dựng nhiều lớp scaffold từ cùng hàm hình học.
- `src/components/vocab/VocabBrain3D.tsx`: `DENSITY_LIMIT` mới (40/90/180 + `all`); `pickLabelCandidates` nhận thêm ngưỡng facing thấp hơn để lấy cả nhãn mặt sau với opacity giảm; thay `sphereGeometry` vỏ não bằng points-shell dựng từ `buildScaffoldShell`; tăng `aSize` cơ bản của neuron.
- `src/components/vocab/VocabBrain2D.tsx`: đồng bộ bảng màu + giới hạn nhãn mới.
- `src/components/vocab/VocabBrainPanel.tsx`: thêm mức mật độ "Tất cả", chú giải dạng chip có số lượng và bấm để lọc.
- Không đổi schema, không đổi truy vấn (`user_vocab_mastered`, `game_scores`), không đổi logic ⭐ hay bảng xếp hạng.

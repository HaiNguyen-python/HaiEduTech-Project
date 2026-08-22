# Bộ não 3D chứa từ vựng (thay cho biểu đồ)

Thay khối "Biểu đồ tiến độ từ vựng" ở cuối trang IELTS Vocabulary bằng một **bộ não 3D** xoay được, trong đó mỗi từ đã học là một "neuron" phát sáng. Từ mới ôn thì sáng đậm, từ lâu không ôn thì mờ dần - giống cách ký ức phai đi trong não người.

## 1) Hình khối bộ não

- Mô hình não dạng point cloud: hai bán cầu đối xứng, có khe giữa và phần thân não/cerebellum phía dưới, tạo bằng công thức toán (không cần file model), nên tải rất nhanh.
- Mỗi từ đã đánh dấu ⭐ được gán một vị trí cố định trên vỏ não (hash từ chính chữ đó → luôn ở đúng chỗ mỗi lần vào lại).
- Não tự xoay chậm; kéo chuột/vuốt để xoay, cuộn/pinch để zoom.
- Các sợi thần kinh mảnh nối những từ gần nhau, sáng theo độ tươi của ký ức.

## 2) Quy tắc mờ dần theo thời gian (memory decay)

Tính theo số ngày từ lần ôn gần nhất (múi giờ Việt Nam):

| Tình trạng | Số ngày | Hiển thị |
| --- | --- | --- |
| Vừa học / vừa ôn | 0-1 | Xanh emerald sáng rực, có hào quang, nhấp nháy nhẹ |
| Còn tươi | 2-6 | Xanh dương sáng |
| Bắt đầu phai | 7-20 | Mờ hơn, nhỏ hơn |
| Sắp quên | 21-45 | Xám nhạt, rất mờ |
| Đã quên | > 45 | Chấm mờ gần như tắt, nhấp nháy chậm |

- Chú giải màu (legend) 5 mức ngay dưới não.
- Nút lọc: Tất cả / Còn tươi / Đang phai / Cần ôn lại ngay.

## 3) Tương tác

- Hover hoặc chạm vào một neuron: hiện tooltip chữ + nghĩa + "ôn N ngày trước".
- Bấm vào neuron: hiện thẻ nhỏ bên dưới (từ, IPA, nghĩa, nút 🔊 nghe) và neuron đó bùng sáng.
- 4 thẻ số liệu giữ lại (tổng từ đã thuộc, từ mới 7 ngày, chuỗi ngày học, độ chính xác Practice), đặt phía trên bộ não.
- Dòng nhắc: "X từ đang phai - luyện lại ngay" kèm nút chuyển sang tab Practice.

## 4) Trạng thái đặc biệt

- Chưa đăng nhập: dùng dữ liệu ⭐ trong localStorage, ngày ôn coi như hôm nay, kèm nhắc đăng nhập để lưu tiến độ.
- Chưa có từ nào: não hiện dạng mờ, thông báo thân thiện "Đánh dấu ⭐ từ đầu tiên để thắp sáng bộ não".
- Máy yếu / không hỗ trợ WebGL: tự chuyển sang phiên bản 2D (canvas point cloud) cùng logic màu, không trắng trang.

## Chi tiết kỹ thuật

- Cài `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.169` (bản tương thích React 18).
- Component mới `src/components/vocab/VocabBrain3D.tsx`:
  - `Points` + `PointMaterial` (drei) cho neuron, `LineSegments` cho sợi kết nối, `OrbitControls` (autoRotate) để xoay.
  - Màu/độ mờ nằm trong buffer attribute, tính từ `daysSinceReview`; token màu lấy từ design system (không hardcode màu ngoài palette brand).
  - Tọa độ neuron: hash chuỗi → góc cầu, ép vào hình hai bán cầu; deterministic.
  - Bọc trong `React.lazy` + `Suspense` để không tăng bundle trang, và `ErrorBoundary` fallback sang bản 2D `VocabBrainFallback` (canvas 2D).
- Dữ liệu: giữ nguyên truy vấn hiện có trong `VocabPerformanceCharts.tsx` (`user_vocab_mastered` với `word`, `reviewed_at`, `created_at`; `game_scores` cho độ chính xác). Không đổi schema, không đổi logic ⭐ / bảng xếp hạng.
- `VocabPerformanceCharts.tsx` được rút gọn thành `VocabBrainPanel.tsx`: 4 thẻ số liệu + bộ não; bỏ 3 biểu đồ recharts (area / bar tuần / radar) và import recharts trong file này.
- Nghĩa và IPA lấy qua prop `lookupWord` đã có sẵn trong `IeltsVocabulary.tsx`.
- Chỉ sửa `src/pages/IeltsVocabulary.tsx` ở chỗ mount component (đổi tên import + props).

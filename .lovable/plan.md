# Rà soát logic Vocabulary Brain: vì sao bộ não bỗng xanh lá hết

## Đã kiểm tra được gì trong dữ liệu thật

- Môn `ielts` có 3.412 dòng từ đã thuộc, nhưng **chỉ 3 dòng có `reviewed_at` trong hôm nay**, và **0 dòng nào có `review_count >= 4`**.
- Nghĩa là theo dữ liệu trên máy chủ, không thể có từ nào vào vùng dài hạn (xanh lá đậm), và gần như mọi từ phải nằm ở nhóm cần ôn lại - đúng như trạng thái hôm qua bạn thấy.
- Vậy màu xanh hôm nay **không đến từ cơ sở dữ liệu**, mà đến từ cách hợp nhất dữ liệu ở phía trình duyệt.

## Nguyên nhân (theo code hiện tại, cần xác nhận bằng 1 bước kiểm tra)

Trong `VocabBrainPanel.tsx`, khi ghép dữ liệu:

1. Mọi từ được đánh dấu ⭐ lưu trên máy mà **không tìm thấy dòng tương ứng trong cơ sở dữ liệu** đều được mặc định là "ôn hôm nay" (`days = 0`) - tức là màu xanh "Nhớ chắc".
2. Danh sách ⭐ trên máy chính là bản sao của toàn bộ từ đã thuộc. Nên **nếu truy vấn cơ sở dữ liệu trả về rỗng hoặc lỗi** (hết phiên đăng nhập, mạng chậm, lỗi tạm thời), panel vẫn hiển thị bình thường nhưng **toàn bộ neuron đều thành xanh** - đúng hiện tượng bạn gặp. Lỗi truy vấn hiện đang bị bỏ qua âm thầm (`vocabRes.data || []`).
3. Trong lúc dữ liệu đang tải, panel cũng vẽ trước bằng danh sách ⭐, nên có một khoảng "xanh giả" trước khi dữ liệu thật về (và nếu về lỗi thì nó ở lại luôn).
4. Có 7 từ trong bảng lưu chữ hoa khác với khóa trên máy, nên các từ này bị tính thành 2 neuron: một neuron thật (cũ, đỏ) và một neuron "hôm nay" (xanh).

Bước đầu tiên khi triển khai sẽ là xác nhận đúng nhánh nào đang xảy ra (log/kiểm tra kết quả truy vấn trên trình duyệt), rồi mới sửa.

## Sẽ sửa những gì

1. **Không coi từ ⭐ chưa có dữ liệu ôn là "ôn hôm nay"**. Thêm một nhóm riêng "Chưa rõ độ nhớ" (màu xám nhạt), không tính vào sức khỏe bộ nhớ, không tính là mới ôn. Chỉ khách chưa đăng nhập mới dùng mốc ngày đánh dấu tại máy (lưu kèm ngày khi bấm ⭐) thay vì mặc định hôm nay.
2. **Hiện lỗi thay vì âm thầm xanh**: nếu truy vấn `user_vocab_mastered` lỗi, panel hiện thông báo "chưa tải được dữ liệu độ nhớ - thử lại" và **không vẽ bộ não** bằng dữ liệu ⭐ suy đoán.
3. **Chỉ vẽ sau khi tải xong**: giữ trạng thái loading cho tới khi có kết quả, tránh khoảng xanh giả.
4. **Chuẩn hóa khóa từ** (trim + phân biệt hoa/thường bỏ qua) khi ghép dòng cơ sở dữ liệu với danh sách ⭐ để không sinh neuron trùng.
5. **Đồng bộ số liệu thẻ thống kê** theo dữ liệu thật (Tổng từ, Còn ở ngắn hạn, Sức khỏe bộ nhớ, Sắp quên trong 7 ngày) sau khi bỏ giả định `days = 0`.
6. Giữ nguyên logic Ebbinghaus, vùng nhớ, nhiệm vụ hằng ngày và cách ghi nhận ôn tập (`vocabReview.ts`) - phần đó hoạt động đúng.

## Chi tiết kỹ thuật

- Sửa `src/components/vocab/VocabBrainPanel.tsx`: tách `loadRows` thành 3 trạng thái (loading / error / ready); `wordStats` dùng khóa chuẩn hóa `word.trim().toLowerCase()`; từ ⭐ không có dòng dữ liệu -> `days = null` -> nhóm `unknown`.
- Sửa `src/components/vocab/vocabBrainModel.ts`: thêm tier `unknown` (màu xám, alpha thấp) và cho `buildNeurons` nhận `days: number | null`; loại các neuron `unknown` khỏi `memoryHealth`, `atRisk`, `mission`.
- `VocabBrain3D.tsx` / `VocabBrain2D.tsx`: chỉ thêm màu cho tier mới, không đổi hình học.
- Không đổi lược đồ cơ sở dữ liệu.

Áp dụng cho cả 5 trang đang dùng panel này (IELTS, HSK, Thụy Điển, Phần Lan, Nhật) vì dùng chung một component.

# Flashcard lật thẻ 3D, thêm dạng bài tập, và biểu đồ tiến độ từ vựng

## 1) Hiệu ứng lật thẻ (3D flip)

- Thẻ lớn hiện tại đổi nội dung tức thì; sẽ thay bằng hiệu ứng lật 3D quanh trục dọc (0.6s, spring nhẹ) giống thẻ giấy thật:
  - Mặt trước: hình minh họa, từ, IPA, badge (level / từ loại / chủ đề), nút nghe + nút ⭐.
  - Mặt sau: nghĩa Việt, định nghĩa tiếng Anh, câu ví dụ, synonym/collocation.
- Chạm vào thẻ hoặc nhấn nút "Lật" đều lật; nhấn Trước/Sau thì thẻ tự trở về mặt trước với hiệu ứng trượt nhẹ.
- Hỗ trợ bàn phím: mũi tên trái/phải để chuyển thẻ, Space để lật.
- Giữ nguyên bộ chọn số thẻ, thanh tiến độ và toàn bộ logic ⭐ đang tính điểm bảng xếp hạng.

## 2) Thêm dạng câu hỏi cho Practice

Hiện có 9 dạng (nghĩa, đảo chiều, điền chỗ trống, đồng nghĩa, nghe chọn từ, định nghĩa tiếng Anh, collocation, xếp chữ, chọn câu dùng đúng). Bổ sung 6 dạng mới:

| Dạng mới | Nội dung |
| --- | --- |
| Trái nghĩa / khác nghĩa | Chọn từ KHÔNG cùng nhóm nghĩa với từ đã cho |
| Từ loại (word form) | Chọn đúng từ loại (noun/verb/adjective/adverb) của từ |
| Ghép chủ đề | Chọn chủ đề IELTS đúng của từ (Education, Environment...) |
| Gõ lại từ theo nghĩa | Nhập từ từ nghĩa Việt (chấm điểm không phân biệt hoa/thường, có gợi ý chữ đầu) |
| Gõ theo audio (dictation) | Nghe rồi gõ lại từ |
| Chọn IPA đúng | Nghe/đọc từ rồi chọn phiên âm đúng |

- Bộ chọn dạng bài: "Tất cả dạng", "Chỉ trắc nghiệm", "Chỉ gõ chữ", "Chỉ nghe" để học viên tự chọn kiểu ôn.
- Phân bổ dạng câu hỏi được trộn đều (không lặp một dạng liên tiếp) và chỉ tạo dạng nào từ đó có đủ dữ liệu.
- Trang kết quả bổ sung bảng "Đúng/sai theo dạng câu hỏi" để học viên biết mình yếu dạng nào, kèm nút "Luyện lại các câu sai".

## 3) Biểu đồ đo performance từ vựng (dưới cùng trang)

Thêm khối "Biểu đồ tiến độ từ vựng" ngay dưới danh sách/bài tập, gồm 3 phần:

1. Biểu đồ đường cộng dồn (area chart): số từ đã thuộc theo ngày trong 30 / 90 ngày / tất cả, kèm mốc mục tiêu 100 / 300 / 500 / 800 từ (Band 5.5 → 8.0) để thấy còn cách mốc bao xa.
2. Biểu đồ cột theo tuần: số từ mới mỗi tuần + đường trung bình, giúp thấy nhịp học đều hay ngắt quãng.
3. Radar "Điểm mạnh theo dạng bài": tỉ lệ đúng theo từng dạng câu hỏi (nghĩa, nghe, collocation, gõ chữ...) từ các lần luyện đã lưu, để biết cần luyện thêm gì.

Kèm 4 thẻ số liệu: tổng từ đã thuộc, từ mới 7 ngày, chuỗi ngày học từ vựng, độ chính xác trung bình các bài Practice.

Nếu chưa có dữ liệu, mỗi biểu đồ hiện thông báo thân thiện hướng dẫn đánh dấu ⭐ hoặc làm một bài Practice.

## Chi tiết kỹ thuật

- `src/pages/IeltsVocabulary.tsx`:
  - `FlashcardDeck`: dùng Framer Motion `rotateY` + `transformStyle: preserve-3d`, `backfaceVisibility: hidden` cho hai mặt (giống mẫu ở `src/components/KidsFlashcard.tsx`).
  - `ExType` mở rộng thêm `antonymOdd | wordForm | topic | typeWord | dictation | ipa`; `buildQuestions` nhận thêm tham số filter dạng bài, đảm bảo không hai câu liền cùng dạng, và với dạng gõ chữ trả về `answerText` thay cho `options`.
  - `VocabExercise`: thêm ô nhập cho dạng gõ chữ (so khớp qua `normalizeText` đã có), thống kê `Record<ExType, {correct, total}>`, chế độ "làm lại câu sai".
- Component mới `src/components/vocab/VocabPerformanceCharts.tsx` (recharts, đã có trong dự án):
  - Nguồn dữ liệu: `user_vocab_mastered` (lọc `subject = 'ielts'`, dùng `reviewed_at`/`created_at`) cho hai biểu đồ tiến độ; `game_scores` (`game_type = 'vocab-ielts'`) cho độ chính xác trung bình.
  - Thống kê theo dạng bài lưu trong localStorage (`vocab_type_stats_ielts`), cập nhật sau mỗi bài Practice, dùng cho radar - không cần thay đổi cơ sở dữ liệu.
  - Gom nhóm theo ngày/tuần ở múi giờ Asia/Ho_Chi_Minh cho khớp cách tính streak hiện tại.
- Không thay đổi schema, không thay đổi logic ⭐ / bảng xếp hạng.

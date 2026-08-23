# Rà soát Vocabulary Brain: chỗ nào chưa hoàn thiện và cách nối đủ luồng dữ liệu

## Kết quả rà soát (đã kiểm tra code + dữ liệu thật)

Phần hiển thị (bộ não 3D, màu theo mức nhớ, nhãn từ, đường quên, huy hiệu, nhiệm vụ hằng ngày) hoạt động. Vấn đề nằm ở luồng dữ liệu đổ về:

1. **Không có từ nào được tính là "ôn lại"**. Truy vấn `user_vocab_mastered` cho thấy trên toàn bộ dữ liệu (8.688 dòng, mọi môn) có **0 dòng** `review_count > 1`. Nguyên nhân: chỉ duy nhất `SmartReviewColumn` (dùng `useReviewQueue`) mới tăng `review_count` / `reviewed_at`, mà hàng đợi đó chỉ nhận từ đã quá 14 ngày. Làm quiz/flashcard trong tab Practice của IELTS Vocabulary (`IeltsVocabulary.tsx`) trả lời đúng nhưng **không cập nhật gì** vào `user_vocab_mastered`.
   Hệ quả trực tiếp: vùng **Long-term luôn = 0**, huy hiệu 10/50/100/300 không bao giờ mở, "Xem quá trình" không có gì để tái hiện, và mọi từ chỉ trôi dần sang màu đỏ theo thời gian.

2. **Panel không tự làm mới**. `VocabBrainPanel` chỉ nạp dữ liệu một lần khi mount, không nghe `MASTERY_UPDATED_EVENT` (như các bảng xếp hạng đang làm) và không nạp lại sau khi học sinh xong một lượt Practice. Đánh dấu ⭐ thêm từ mới thì bộ não vẫn đứng yên cho tới khi tải lại trang.

3. **Nhiệm vụ hằng ngày chưa "đóng vòng"**. Nút "Bắt đầu nhiệm vụ" / "Luyện lại ngay" / "Ôn lại từ này" chỉ nhảy sang tab Practice, không truyền danh sách từ cần ôn xuống, nên bài luyện vẫn lấy từ ngẫu nhiên. Nhiệm vụ cũng không có trạng thái "đã hoàn thành hôm nay".

4. **Chuỗi ngày lệch**. Panel tự tính streak từ `reviewed_at/created_at` phía client, khác với hàm streak chuẩn ở server (`get_user_streak`, theo giờ Việt Nam), nên số ngày trên bộ não có thể khác số ở Dashboard.

5. **Từ đánh dấu offline luôn coi là mới học hôm nay** (`days = 0`), làm "Sức khỏe bộ nhớ" cao ảo cho khách chưa đăng nhập. Đây là hạn chế chấp nhận được nhưng cần một dòng ghi chú trên giao diện.

## Sẽ sửa những gì

### A. Nối luồng "ôn lại" từ Practice về bộ não (quan trọng nhất)
- Tạo helper dùng chung `recordVocabReview(subject, words[])`: với mỗi từ, cộng `review_count`, ghi `last_interval_days` = số ngày kể từ `reviewed_at` cũ, và đặt `reviewed_at = now()`. Ghi theo lô, bỏ qua từ không có trong bảng.
- Gọi helper này khi học sinh **trả lời đúng** một từ trong tab Practice của IELTS Vocabulary (mọi dạng câu hỏi), và khi lật/đánh "đã nhớ" trong Flashcard.
- Nhờ vậy các từ thật sự bắt đầu chìm dần vào lõi dài hạn, đúng như mô hình Ebbinghaus đã có.

### B. Bộ não cập nhật ngay
- Panel nghe `MASTERY_UPDATED_EVENT` và một sự kiện mới `vocab-review-recorded`, có debounce, để nạp lại dữ liệu và vẽ lại neuron mà không cần refresh trang.

### C. Đóng vòng nhiệm vụ ôn tập
- Truyền danh sách từ của "Nhiệm vụ hôm nay" (và từ đang chọn) xuống tab Practice để bài luyện ưu tiên đúng các từ sắp quên.
- Hiển thị tiến độ nhiệm vụ hôm nay (đã ôn x/10) và hiệu ứng chúc mừng khi hoàn thành.

### D. Đồng bộ streak
- Dùng streak từ server (hook `useStreak` / `get_user_streak`) cho thẻ "Chuỗi ngày học từ" để khớp với Dashboard; giữ cách tính client làm phương án dự phòng cho khách.

### E. Ghi chú nhỏ
- Thêm chú thích cho khách chưa đăng nhập: từ đánh dấu offline được tính là học hôm nay, đăng nhập để theo dõi chính xác độ nhớ.

## Chi tiết kỹ thuật

- File mới: `src/lib/vocabReview.ts` (`recordVocabReview`, phát sự kiện `vocab-review-recorded`).
- Sửa: `src/components/vocab/VocabBrainPanel.tsx` (reload theo sự kiện, streak server, tiến độ nhiệm vụ, chú thích khách), `src/pages/IeltsVocabulary.tsx` (gọi `recordVocabReview` khi đúng, nhận danh sách từ ưu tiên qua prop khi bấm nhiệm vụ), `src/hooks/useReviewQueue.ts` (dùng chung helper thay vì lặp lại logic).
- Không đổi schema: `review_count` và `last_interval_days` đã có trong `user_vocab_mastered`. Không đổi logic ⭐ hay bảng xếp hạng.

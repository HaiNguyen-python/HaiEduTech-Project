# Sửa nút cảm xúc + làm Your Corner hấp dẫn hơn cho việc học ngôn ngữ

## 1. Nút thả cảm xúc dễ dùng hơn (ưu tiên)

Hiện trạng: bảng cảm xúc mở/đóng ngay theo chuột vào - ra, đặt cách nút 4px nên chuột đi lên là trượt ra ngoài và bảng tắt.

Sửa:
- Giữ bảng mở thêm ~350ms sau khi chuột rời (đóng có trễ, huỷ trễ khi chuột quay lại).
- Thêm dải nối vô hình giữa nút và bảng để không có khoảng trống chết.
- Bảng to hơn: mỗi emoji là ô bấm 40x40, khoảng cách rộng, nhãn tên cảm xúc hiện khi trỏ vào.
- Trên điện thoại: nhấn giữ (long-press ~350ms) nút Thích để mở bảng, chạm ra ngoài để đóng; nhấn nhanh vẫn là 👍.
- Bàn phím: mở bằng focus, di chuyển bằng mũi trái/phải, Esc để đóng.
- Chọn xong đóng bảng ngay kèm hiệu ứng emoji nảy nhẹ.

## 2. Làm phần trao đổi kiến thức ngôn ngữ thú vị hơn

- **Danh sách ai đã thả cảm xúc**: bấm vào dãy emoji tổng để xem tên người thả theo từng loại.
- **Nhãn chủ đề ngôn ngữ cho bài viết**: chọn nhanh khi đăng (English, IELTS, Chinese, Japanese, Finnish, Swedish, Vietnamese, Khác) và bấm nhãn để lọc feed.
- **Nút "Câu hỏi ngôn ngữ"**: đánh dấu bài là câu hỏi; bài chưa có bình luận nào hiện nhãn "Đang chờ trả lời" để mọi người vào giúp.
- **Đánh dấu câu trả lời hay**: chủ bài viết (hoặc thầy) chọn 1 bình luận là "Câu trả lời hữu ích", bình luận đó nổi lên đầu với viền xanh.
- **Nghe phát âm**: câu/từ tiếng nước ngoài trong bài và bình luận có nút loa nhỏ để nghe đọc (dùng giọng đọc đã có trong dự án).
- **Bảng xếp hạng "Người giúp đỡ tuần này"**: tính theo số câu trả lời được đánh dấu hữu ích + số tim nhận được, hiện ở cột phải.
- **Nhắc nhở nhẹ nhàng**: dòng gợi ý xoay vòng trong ô soạn bài, ví dụ "Hôm nay bạn học được từ mới nào?".

## 3. Thứ tự triển khai

1. Sửa nút cảm xúc (mục 1) - làm ngay.
2. Nhãn chủ đề + Câu hỏi ngôn ngữ + Đánh dấu câu trả lời hữu ích.
3. Danh sách người thả cảm xúc, nút nghe phát âm, bảng xếp hạng người giúp đỡ, gợi ý soạn bài.

## Chi tiết kỹ thuật

- `src/components/your-corner/PostCard.tsx`: tách bảng cảm xúc ra `ReactionPicker.tsx` (hover intent với `setTimeout` + `clearTimeout`, vùng đệm `before:` phủ khoảng trống, `pointerdown` long-press cho cảm ứng, `onKeyDown` cho mũi trái/phải/Esc, đóng khi click ngoài qua listener document).
- Migration mới: `your_corner_posts.topic text`, `is_question boolean default false`; `your_corner_comments.is_helpful boolean default false` - kèm GRANT cho `authenticated`/`service_role`, bật RLS policy cho chủ bài viết và `is_staff` cập nhật `is_helpful`.
- Cập nhật `get_your_corner_feed` trả thêm `topic`, `is_question`; `useYourCornerFeed.ts` mở rộng `FeedPost`.
- Danh sách người thả cảm xúc: RPC mới `get_post_reactors(post_id)` join `get_public_profiles`, hiển thị trong Dialog.
- Nghe phát âm dùng `src/lib/englishTts.ts` (và TTS ngôn ngữ tương ứng theo `topic`).
- Bảng xếp hạng người giúp đỡ: RPC tổng hợp 7 ngày, cache client 5 phút.
- Giữ chuẩn dự án: DOMPurify cho mọi nội dung render, mobile-first, không dùng em-dash, chữ tối thiểu 16px trên mobile.
- Kiểm thử: `npx tsgo --noEmit`, SQL lint, Playwright 1280x1800 thử mở bảng cảm xúc bằng chuột và nhấn giữ, chọn cảm xúc, đánh dấu câu trả lời hữu ích.

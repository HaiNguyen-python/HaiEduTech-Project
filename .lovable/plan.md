# Nâng cấp Your Corner

Hiện trạng đã xác nhận: bình luận (`your_corner_comments`) chỉ có text thuần — không có thả tim, không có trả lời (reply) lồng nhau. Bài viết đã có like/bookmark/share/poll. Kế hoạch dưới đây bổ sung tương tác cho bình luận và một số nâng cấp cộng đồng theo thứ tự ưu tiên.

## Giai đoạn 1 — Tương tác bình luận (trọng tâm yêu cầu)

1. **Thả tim bình luận**
   - Bảng mới `public.your_corner_comment_reactions` (id, comment_id, user_id, created_at; unique(comment_id, user_id)), GRANT authenticated + service_role, bật RLS, bật realtime.
   - Policy: học viên đã đăng nhập đọc được tim trên bình luận họ thấy; chỉ chủ tài khoản thêm/xóa tim của mình.
   - UI: nút tim nhỏ cạnh mỗi bình luận kèm số lượng, optimistic toggle giống like bài viết, hiệu ứng tim nảy.

2. **Trả lời bình luận (reply 1 cấp)**
   - Thêm cột `parent_id uuid` (nullable, tự tham chiếu `your_corner_comments.id`) vào `your_corner_comments`.
   - UI: nút "Trả lời" dưới mỗi bình luận; reply hiển thị thụt vào 1 cấp (giống Facebook), reply của reply gắn @tên người được trả lời thay vì lồng sâu hơn.
   - Ô nhập reply dùng sẵn `MentionInput`; khi trả lời, tự chèn @tên tác giả bình luận gốc.
   - Xóa bình luận cha thì xóa cả reply (on delete cascade).

3. **Đếm & hiển thị**
   - Cập nhật RPC `get_your_corner_feed` (hoặc query phía client) để trả kèm `like_count` và `reply_count` mỗi bình luận; giữ nguyên chữ ký hàm cho feed.

## Giai đoạn 2 — Đề xuất nâng cấp thêm (chọn triển khai cùng đợt hoặc để sau)

4. **Thông báo trong app**: chuông thông báo khi có người like/comment/reply/tag mình (bảng `notifications` + realtime), điều hướng tới đúng bài viết (#post-id đã hỗ trợ sẵn).
5. **Pin bài viết của giáo viên**: cột `pinned_at`; bài ghim (thầy Hải/admin) nổi lên đầu feed với badge "Ghim".
6. **Reaction đa cảm xúc cho bài viết**: mở rộng `your_corner_reactions` thêm cột `type` (like/love/haha/wow/sad), giữ mặc định like tương thích dữ liệu cũ.
7. **Lọc feed theo hashtag/chủ đề**: bấm hashtag hoặc chip chủ đề lọc feed phía client + truy vấn; đã có sẵn `trendingTags` và bộ lọc topic để nối vào.
8. **Chia sẻ bài viết thật**: nút Share hiện có — nối Web Share API/copy link tới `#post-<id>`.

## Phạm vi đề xuất triển khai ngay

Giai đoạn 1 (mục 1-3) + mục 8 (nhỏ, hoàn thiện nút Share sẵn có). Các mục 4-7 sẽ hỏi lại bạn muốn gom vào đợt này không trước khi code.

## Chi tiết kỹ thuật

- Migration: tạo `your_corner_comment_reactions` kèm GRANT + RLS + `alter publication supabase_realtime`; `alter table your_corner_comments add column parent_id`.
- `PostCard.tsx`: tách phần bình luận thành `CommentItem.tsx` (tim, reply, reply-form, danh sách reply thụt vào); giữ sanitization DOMPurify cho mọi nội dung render.
- Không đổi cấu trúc feed RPC ngoài việc cộng số đếm bình luận nếu cần; reply lấy theo `parent_id` khi mở khung bình luận.
- Kiểm thử: typecheck `npx tsgo --noEmit`, audit SQL lint, Playwright kiểm tra luồng thả tim + trả lời ở viewport 1280x1800.
- Theo chuẩn dự án: không em-dash trong nội dung lập trình, mobile-first, bình luận tối đa 1000 ký tự (reply kế thừa).

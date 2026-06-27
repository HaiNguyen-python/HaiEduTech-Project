## Mục tiêu
1. Khi workspace hết Lovable credit, chatbot không "im lặng" nữa - hiển thị toast/thông báo rõ ràng cho người dùng và admin.
2. Your Corner load nhanh hơn rõ rệt (mục tiêu: time-to-first-post < 800ms, smooth scroll 60fps).

---

## Phần 1 - Fallback chatbot khi hết credit

### Vấn đề
Khi Lovable AI Gateway trả `402 (credits exhausted)` hoặc `429 (rate limit)`, các edge function (counseling-ai, pedagogical-assistant, interview-prep-ai, roleplay-chat, grade-writing, grade-speaking, code-explain...) hiện đang `throw error` → frontend chỉ thấy "Failed to fetch" hoặc loading mãi → người dùng tưởng web bị lỗi.

### Cách sửa
**A. Chuẩn hoá response từ edge functions:**
- Tạo helper `_shared/ai-error-response.ts` trả về JSON dạng `{ error: "credits_exhausted" | "rate_limited" | "ai_unavailable", fallback: true, message: "..." }` với HTTP 200 (để frontend đọc được body mà không crash).
- Áp dụng pattern này cho 8 edge function quan trọng nhất: `counseling-ai`, `roleplay-chat`, `pedagogical-assistant`, `grade-writing`, `grade-speaking`, `upgrade-writing`, `upgrade-speaking`, `code-explain`.

**B. Frontend bắt và hiển thị:**
- Tạo `src/lib/aiResponseHandler.ts` - hàm dùng chung kiểm tra `data.error === "credits_exhausted"` → hiển thị toast tiếng Việt: "⚠️ Hệ thống AI đang tạm hết tài nguyên. Vui lòng thử lại sau hoặc liên hệ thầy Hải."
- Với chatbot (Mr. Hai), khi gặp lỗi sẽ trả bubble reply mặc định: "Xin lỗi, mình đang tạm nghỉ. Bạn vui lòng quay lại sau 5-10 phút nhé! 🙏"

**C. Cảnh báo admin sớm:**
- Thêm widget nhỏ ở Admin Dashboard hiển thị badge ⚠️ nếu trong 24h qua có >5 lỗi `credits_exhausted` từ bảng `api_usage_log` → admin biết để nạp credit.

---

## Phần 2 - Tối ưu tốc độ Your Corner

### 2.1 Giảm payload đầu + infinite scroll
- `useYourCornerFeed.ts`: đổi `_limit: 10` → `_limit: 5` cho initial fetch.
- Thêm `loadMore()` function lấy thêm 5 posts (`offset` based) khi user cuộn gần cuối.
- Sửa RPC `get_your_corner_feed(_limit, _offset)` để hỗ trợ phân trang.

### 2.2 Tối ưu RPC `get_your_corner_feed`
- Bỏ `bookmarked_by_me` và `poll_votes` khỏi initial fetch (chỉ trả `comment_count`, `reaction_count`, `liked_by_me`, `has_poll: bool`).
- Tạo RPC riêng `get_post_poll_results(post_id)` chỉ gọi khi user click vào poll (lazy load).
- Tạo RPC riêng `get_my_bookmarks_ids()` trả về array `post_id[]` một lần duy nhất, cache client-side 5 phút.
- Kết quả: RPC chính từ 5 subquery → 3 subquery, giảm ~40% thời gian.

### 2.3 Gộp Realtime channels
- Thay 4 channels (posts/reactions/comments/poll_votes) bằng **1 channel duy nhất** với 4 listeners.
- Tăng throttle refetch từ 2.5s → **5s**.
- Chỉ subscribe khi tab visible (`document.visibilityState === 'visible'`) - bỏ subscription khi user chuyển tab để tiết kiệm Realtime cost.

### 2.4 Lazy render PostCard
- Wrap mỗi `PostCard` bằng `IntersectionObserver` - chỉ mount nội dung đầy đủ (Recharts poll chart, DOMPurify sanitize, image, comment box) khi visible.
- Khi chưa visible: render skeleton 200px (giữ chiều cao để scroll không nhảy).
- Defer Recharts import: `const PollBlock = lazy(() => import("@/components/your-corner/PollBlock"))`.

### 2.5 Cache author profiles
- `get_public_profiles` đang gọi mỗi lần refetch → cache 10 phút trong `sessionStorage` theo user_id.

---

## Kết quả dự kiến
- Your Corner: TTFP từ ~2.5s → **<800ms**, scroll mượt hơn rõ rệt.
- Chatbot: thay vì im lặng, user thấy thông báo rõ và admin được cảnh báo sớm khi hết credit.
- Cloud cost: realtime giảm ~50% (chỉ active khi tab visible), DB query giảm ~40%.

## Files sẽ thay đổi
- **Mới:** `supabase/functions/_shared/ai-error-response.ts`, `src/lib/aiResponseHandler.ts`
- **Sửa edge functions (8):** counseling-ai, roleplay-chat, pedagogical-assistant, grade-writing, grade-speaking, upgrade-writing, upgrade-speaking, code-explain
- **Migration SQL:** sửa `get_your_corner_feed` (thêm offset, bỏ bookmark/poll_votes), tạo `get_post_poll_results`, `get_my_bookmarks_ids`
- **Frontend:** `src/hooks/useYourCornerFeed.ts`, `src/pages/YourCorner.tsx`, `src/components/your-corner/PostCard.tsx`, `src/components/your-corner/PollBlock.tsx`, các component chatbot dùng aiResponseHandler.
- **Admin:** thêm widget "AI Health" nhỏ ở Admin Dashboard.

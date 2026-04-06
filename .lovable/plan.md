

## Plan: Tăng cường bảo mật trang web — Chống hack & Bảo vệ dữ liệu

### Vấn đề phát hiện (từ Security Scan)

Scan phát hiện **13 lỗ hổng bảo mật**, bao gồm 3 lỗi nghiêm trọng (error) và 10 cảnh báo (warn):

1. **Badge tự trao** — Học sinh có thể tự gắn bất kỳ huy hiệu nào cho mình
2. **Realtime rò rỉ dữ liệu tài chính** — Bảng `tuition_records` broadcast qua Realtime tới tất cả user
3. **Realtime rò rỉ hoạt động học sinh** — Bảng `student_activity_log` broadcast cho tất cả
4. **RLS policy `true`** — 3 chính sách INSERT quá mở (contact_messages, api_usage_log, lesson_feedback)
5. **Profiles công khai cho anon** — Tên + avatar lộ cho người chưa đăng nhập
6. **Game scores công khai cho anon** — User ID lộ cho anonymous
7. **Notebook dùng role `public`** thay vì `authenticated`
8. **API usage log** — Bất kỳ ai cũng insert log giả
9. **Leaked password protection** bị tắt
10. **dangerouslySetInnerHTML** dùng ở nhiều nơi không sanitize

---

### Giải pháp (5 bước)

#### 1. Database Migration — Sửa RLS policies

**Migration SQL:**

- **player_badges**: Chuyển INSERT policy từ `auth.uid() = user_id` sang chỉ cho `service_role` (hoặc thêm server-side validation)
- **student_notebooks**: Chuyển tất cả policy từ role `public` → `authenticated`
- **api_usage_log**: Thêm `WITH CHECK (auth.uid() = user_id)` cho INSERT policy authenticated
- **profiles**: Xóa policy `Anon can view profile names`
- **game_scores**: Xóa policy `Anon can view all scores`
- **Realtime**: Xóa `tuition_records` và `student_activity_log` khỏi `supabase_realtime` publication

#### 2. Bật Leaked Password Protection
- Dùng `cloud--configure_auth` để bật HIBP check cho mật khẩu

#### 3. Sanitize dangerouslySetInnerHTML
- Thêm thư viện `dompurify`
- Tạo helper `sanitizeHtml()` trong `src/lib/utils.ts`
- Cập nhật 4 file dùng `dangerouslySetInnerHTML`: `LanguageLessonView.tsx`, `ProgrammingLesson.tsx`, `GeneratedLessonView.tsx`, `LessonDetail.tsx`

#### 4. Rate limiting phía client cho ChatBot
- Thêm giới hạn 20 tin nhắn/phút trong `ChatBot.tsx`
- Thêm giới hạn tương tự cho `ConversationalRoleplay.tsx`

#### 5. Security headers & XSS protection
- Thêm CSP meta tag vào `index.html`
- Thêm `referrerPolicy: "strict-origin-when-cross-origin"` cho fetch calls

---

### Files thay đổi
- `supabase/migrations/...` — Migration SQL sửa ~8 RLS policies + xóa Realtime tables
- `src/lib/utils.ts` — Thêm `sanitizeHtml` helper
- `src/pages/LanguageLessonView.tsx`, `ProgrammingLesson.tsx`, `GeneratedLessonView.tsx`, `LessonDetail.tsx` — Sanitize HTML
- `src/components/ChatBot.tsx` — Rate limiting client-side
- `src/components/ConversationalRoleplay.tsx` — Rate limiting client-side
- `index.html` — CSP meta tag
- `package.json` — Thêm `dompurify`


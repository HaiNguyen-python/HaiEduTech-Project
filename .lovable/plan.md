

## Plan: Giải quyết tất cả Security Scan Issues

### Tổng quan
Có 3 Errors và 7 Warnings cần xử lý. Plan chia thành 4 nhóm công việc chính.

---

### 1. Thêm JWT Authentication cho tất cả Edge Functions (ERROR #1)

**17 edge functions** hiện không có auth check. Chia thành 2 nhóm:

**Nhóm A — User-facing functions (cần authenticated user):**
`chat`, `grade-writing`, `grade-speaking`, `generate-lesson`, `generate-exercise`, `generate-writing-prompt`, `generate-code-challenge`, `generate-vocab-image`, `roleplay-chat`, `debug-python`, `generate-and-store-lesson`

→ Thêm đoạn auth check ở đầu mỗi handler:
```typescript
const authHeader = req.headers.get('Authorization');
if (!authHeader?.startsWith('Bearer ')) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
}
const supabase = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } });
const { data, error } = await supabase.auth.getClaims(authHeader.replace('Bearer ', ''));
if (error || !data?.claims) {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
}
```

Riêng `generate-and-store-lesson`: lấy `userId` từ JWT claims (`data.claims.sub`) thay vì từ request body.

**Nhóm B — Admin-only functions:**
`cleanup-knowledge-hub`, `auto-generate-daily`, `fetch-knowledge-articles`, `audit-content`

→ Auth check + thêm kiểm tra teacher/admin role.

**Nhóm C — Public (giữ nguyên không auth):**
`send-contact-email` (form liên hệ public), `finnish-tts` (TTS proxy)

→ Giữ nguyên vì cần truy cập không đăng nhập.

---

### 2. Database Migrations — RLS Policy Fixes (ERROR #2, #3 + Warnings)

Tạo 1 migration SQL xử lý tất cả:

| Issue | Fix |
|-------|-----|
| **Profiles anon readable** (ERROR) | Drop policy `Anon can view profile names` |
| **Realtime no policies** (ERROR) | Bỏ qua — đây là cảnh báo hệ thống Supabase, ta không có bảng `realtime.messages` để thao tác |
| **api_usage_log open INSERT** (WARN) | Drop + recreate INSERT policy with `auth.uid() = user_id` check |
| **user_roles no INSERT restriction** (WARN) | Explicit deny — tạo restrictive INSERT policy chỉ cho admin |
| **learning_materials open INSERT** (WARN) | Drop + recreate INSERT policy requiring teacher/admin role |
| **RLS Policy Always True** (WARN) | Tighten `contact_messages` INSERT + `game_participants` SELECT + `api_usage_log` INSERT |

---

### 3. Auth Configuration (WARN)

Sử dụng `configure_auth` tool để bật **Leaked Password Protection (HIBP)**.

---

### 4. Security Finding Updates

- **Realtime channel** (ERROR #3): Mark as ignored — cannot add RLS to `realtime.messages` (reserved schema).
- **Contact messages** (WARN): Already secure (no SELECT policy = no reads). Mark acknowledged.
- **Public Bucket Allows Listing** (WARN): Tighten `vocab-images` bucket SELECT policy via migration.

---

### Files sẽ sửa

| File | Thay đổi |
|------|----------|
| `supabase/functions/chat/index.ts` | + JWT auth |
| `supabase/functions/grade-writing/index.ts` | + JWT auth |
| `supabase/functions/grade-speaking/index.ts` | + JWT auth |
| `supabase/functions/generate-lesson/index.ts` | + JWT auth |
| `supabase/functions/generate-exercise/index.ts` | + JWT auth |
| `supabase/functions/generate-writing-prompt/index.ts` | + JWT auth |
| `supabase/functions/generate-code-challenge/index.ts` | + JWT auth |
| `supabase/functions/generate-vocab-image/index.ts` | + JWT auth |
| `supabase/functions/roleplay-chat/index.ts` | + JWT auth |
| `supabase/functions/debug-python/index.ts` | + JWT auth |
| `supabase/functions/generate-and-store-lesson/index.ts` | + JWT auth + fix userId from JWT |
| `supabase/functions/cleanup-knowledge-hub/index.ts` | + JWT auth + admin role check |
| `supabase/functions/auto-generate-daily/index.ts` | + JWT auth + admin role check |
| `supabase/functions/fetch-knowledge-articles/index.ts` | + JWT auth + admin role check |
| `supabase/functions/audit-content/index.ts` | + JWT auth + admin role check |
| **New migration** | RLS policy fixes for profiles, api_usage_log, learning_materials, user_roles, storage |
| **Auth config** | Enable HIBP password check |


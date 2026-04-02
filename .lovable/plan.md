

## Plan: Chuyển toàn bộ AI sang Perplexity API & Tắt sinh hình

### Tổng quan
Chuyển 4 Edge Functions đang dùng Lovable AI Gateway sang Perplexity API (`sonar` model), và tắt tính năng sinh hình AI cho từ vựng tiếng Trung.

### Các thay đổi

**1. `supabase/functions/roleplay-chat/index.ts`**
- Thay `LOVABLE_API_KEY` → `PERPLEXITY_API_KEY`
- Thay URL `ai.gateway.lovable.dev` → `api.perplexity.ai`
- Thay model `google/gemini-3-flash-preview` → `sonar`
- Giữ nguyên streaming logic (Perplexity hỗ trợ stream tương tự)

**2. `supabase/functions/grade-speaking/index.ts`**
- Thay `LOVABLE_API_KEY` → `PERPLEXITY_API_KEY`
- Thay URL → `api.perplexity.ai`
- Thay model `google/gemini-2.5-flash` → `sonar`
- Cập nhật logUsage model name

**3. `supabase/functions/audit-content/index.ts`**
- Thay `LOVABLE_API_KEY` → `PERPLEXITY_API_KEY` (2 chỗ gọi AI)
- Thay URL → `api.perplexity.ai` (2 chỗ)
- Thay model → `sonar`

**4. Tắt tính năng sinh hình AI**
- Xóa Edge Function `generate-vocab-image` (cả file + deployed function)
- Cập nhật `src/components/VocabImage.tsx`: hiển thị emoji/placeholder icon thay vì gọi AI sinh hình
- Cập nhật `src/hooks/useVocabImage.ts`: loại bỏ logic gọi Edge Function
- Cập nhật `src/pages/HskVocabulary.tsx`: bỏ `autoGenerate`/`autoDelay` props, hiển thị placeholder tĩnh

### Chi tiết kỹ thuật
- Perplexity API header: `Authorization: Bearer ${PERPLEXITY_API_KEY}` (đã có secret)
- Perplexity streaming format tương thích SSE giống OpenAI → roleplay-chat không cần thay đổi logic parse
- Model `sonar` phù hợp cho tất cả use case: chat, grading, auditing


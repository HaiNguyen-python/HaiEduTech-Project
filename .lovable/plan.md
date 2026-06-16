# Kế hoạch: Chuyển Dictionary + Chatbot Pet sang Lovable AI

## Trả lời nhanh

**Có thể chuyển được**, nhưng cần cân nhắc trade-off vì 2 tính năng này dùng Perplexity `sonar` chủ yếu để có **web search real-time + citations**. Lovable AI (Gemini) **không có web search**, chỉ dựa vào kiến thức training.

## So sánh tốc độ & chi phí


| Tiêu chí             | Perplexity `sonar`            | Lovable AI `gemini-2.5-flash`    |
| -------------------- | ----------------------------- | -------------------------------- |
| Tốc độ phản hồi      | 3-8 giây (do phải search web) | **0.8-2 giây** (nhanh hơn 3-5x)  |
| Chi phí / request    | ~$0.005-0.015                 | ~$0.001-0.003 (rẻ hơn 3-5x)      |
| Web search real-time | ✅ Có                          | ❌ Không                          |
| Citations nguồn      | ✅ Có                          | ❌ Không                          |
| Kiến thức ngôn ngữ   | Tốt                           | **Rất tốt** (Gemini mạnh đa ngữ) |


**Kết luận:** Nhanh hơn 3-5 lần, rẻ hơn 3-5 lần, nhưng mất web search.

## Đánh giá từng tính năng

### 1. Super Dictionary (Collocation OZDIC + Multi-lang ZH/FI/VI + Translate)

- **Phù hợp chuyển sang Lovable AI** ✅
- Lý do: Từ vựng/collocation/dịch thuật là kiến thức ngôn ngữ tĩnh, không cần web search
- Gemini 2.5 Flash dịch và giải thích ngôn ngữ rất tốt, đặc biệt ZH/VI/FI
- Tốc độ nhanh hơn rõ rệt → UX drawer mở ra mượt hơn nhiều

### 2. AI Chatbot Pet (Mr. Hai - text branch)

- **Cân nhắc kỹ** ⚠️
- Nếu học sinh hỏi "tin tức mới nhất", "học bổng 2026 deadline", "thông tin trường X năm nay" → Lovable AI sẽ trả lời không chính xác/lỗi thời
- Nếu chỉ dùng cho hỏi đáp học tập (grammar, vocab, giải bài) → Lovable AI nhanh hơn nhiều
- **Đề xuất giải pháp hybrid:** Phát hiện câu hỏi cần web (chứa "mới nhất", "2026", "hôm nay", "deadline", tên trường ĐH...) → giữ Perplexity. Còn lại → dùng Lovable AI

## Phương án triển khai

### Phương án A — Chuyển hoàn toàn (đơn giản, nhanh)

- Đổi 5 edge functions sang Lovable AI `gemini-2.5-flash`:
  - `ozdic-collocation` (Dictionary)
  - `multi-language-lookup` (ZH/FI/VI)
  - `translate-sentence` / `translate-paragraph`
  - `chatbot-mr-hai` (text branch)
- **Pros:** Nhanh 3-5x, rẻ 3-5x, code đơn giản
- **Cons:** Mất web search ở chatbot

### Phương án B — Hybrid (khuyến nghị)

- Dictionary (4 functions): chuyển hoàn toàn sang Lovable AI
- Chatbot Mr. Hai: thêm logic phát hiện từ khóa thời sự
  - Có từ khóa thời sự → Perplexity `sonar`
  - Không → Lovable AI `gemini-2.5-flash`
- **Pros:** Vừa nhanh vừa giữ độ chính xác cho câu hỏi cập nhật
- **Cons:** Code phức tạp hơn 1 chút

## Chi tiết kỹ thuật

**Files sẽ chỉnh sửa:**

- `supabase/functions/ozdic-collocation/index.ts`
- `supabase/functions/multi-language-lookup/index.ts`
- `supabase/functions/translate-sentence/index.ts` (nếu có)
- `supabase/functions/translate-paragraph/index.ts` (nếu có)
- `supabase/functions/chatbot-mr-hai/index.ts` (hoặc tên tương đương)

**Thay đổi mẫu (Perplexity → Lovable AI):**

```ts
// Trước (Perplexity)
fetch('https://api.perplexity.ai/chat/completions', {
  headers: { Authorization: `Bearer ${PERPLEXITY_API_KEY}` },
  body: JSON.stringify({ model: 'sonar', messages, temperature: 0.2 })
})

// Sau (Lovable AI)
fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  headers: { 'Lovable-API-Key': LOVABLE_API_KEY },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash',
    messages, temperature: 0.2, max_tokens: 800
  })
})
```

**Giữ nguyên:** prompt system, response schema, frontend hoàn toàn không đổi.

## Câu hỏi cho bạn

Bạn muốn đi theo phương án nào?

- **A**: Chuyển hết → nhanh nhất, rẻ nhất, nhưng chatbot không còn web search
- **B (khuyến nghị)**: Dictionary chuyển hết + Chatbot hybrid (giữ Perplexity cho câu hỏi thời sự)
- **Chỉ Dictionary**: Chỉ chuyển 4 function Dictionary, giữ nguyên Chatbot dùng Perplexity

&nbsp;

A: chuyển hết 
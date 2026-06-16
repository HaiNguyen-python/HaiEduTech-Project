# Tăng tốc các tính năng AI còn lại

Sau khi rà soát toàn bộ edge functions, tôi phát hiện **2 nhóm cơ hội tăng tốc**:

## Nhóm 1 — Các function ĐÃ dùng Lovable AI nhưng chưa tối ưu (8 function)


| Function                  | Hiện tại                                 | Vấn đề                                         | Đề xuất                                                              |
| ------------------------- | ---------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| `translate-vi-en`         | gemini-3-flash-preview, non-stream       | Task siêu nhẹ (dịch câu) nhưng dùng model mạnh | Đổi sang `gemini-2.5-flash-lite` + giới hạn `max_tokens: 400`        |
| `explain-code`            | gemini-3-flash-preview                   | Giải thích ngắn                                | `gemini-2.5-flash-lite` + `max_tokens: 600`                          |
| `assess-profile-strength` | gemini-3-flash-preview                   | Đánh giá ngắn                                  | `gemini-2.5-flash-lite` + `max_tokens: 800`                          |
| `hskk-grade`              | gemini-2.5-flash, không giới hạn token   | Chấm HSKK speaking                             | Thêm `max_tokens: 1200`, giảm prompt overhead                        |
| `review-python-code`      | gemini-2.5-flash                         | Review code Python                             | Thêm `max_tokens: 1500` để tránh kéo dài                             |
| `grade-swedish-yki`       | gemini-2.5-flash                         | Chấm YKI Swedish                               | Thêm `max_tokens: 1500` + `temperature: 0.2`                         |
| `pedagogical-assistant`   | **gemini-2.5-pro** (rất chậm)            | Trợ lý giáo viên                               | Hạ xuống `gemini-2.5-flash` (giữ chất lượng, nhanh hơn 3-4x)         |
| `generate-marketing-kit`  | **gemini-2.5-pro** (rất chậm, gọi 2 lần) | Sinh nội dung marketing                        | Hạ xuống `gemini-2.5-flash` cho lần gọi text; giữ image model nguyên |


**Ước tính**: thời gian phản hồi giảm 40-70% cho các tính năng dịch nhanh, giải thích, đánh giá; giảm 2-3x cho pedagogical-assistant & marketing-kit.

## Nhóm 2 — Các function vẫn dùng Perplexity API (30+ function) — KHÔNG động trong lần này

Nhiều function (counseling-ai, scholarship-advisor, roleplay-chat, generate-lesson, fetch-knowledge-articles, lookup-university, v.v.) đang gọi `api.perplexity.ai`. Đây là chủ đề lớn cần quyết định riêng vì:

- Perplexity có **web search realtime** — quan trọng cho học bổng, đại học, tin tức IT (cần tính cập nhật)
- Roleplay/counseling không cần web search → có thể migrate sang Lovable AI để nhanh & rẻ hơn 100x

→ Sẽ tạo plan riêng nếu bạn muốn migrate Perplexity. Lần này **chỉ tối ưu Nhóm 1**.

## Phạm vi thay đổi

Sửa 8 file edge function trong `supabase/functions/*/index.ts`:

- Đổi tên model trong body request
- Thêm/điều chỉnh `max_tokens` để cắt sớm output dư thừa
- Không thay đổi logic, schema, prompt nội dung

## Kiểm chứng

- Build qua, không lỗi TypeScript
- Test thủ công 2-3 function điển hình (translate-vi-en, pedagogical-assistant) sau khi deploy

Bạn duyệt để tôi triển khai không?

ok


## Chẩn đoán

Component `TheorySections.tsx` chỉ chia nội dung lý thuyết thành các "khối có thể đánh dấu Đã đọc" khi gặp dòng bắt đầu bằng `## ` (H2 markdown). Nếu một bài viết theory **không có H2** (chỉ dùng `**Bold:**` để giả làm tiêu đề), thì:

1. Toàn bộ bài bị dồn vào **đúng 1 khối**, không có thanh tiến độ section, không có nút "Mark read", không có ngắt thị giác → **dính chùm**.
2. Các "tiêu đề" `**Bold:**` chỉ là chữ đậm cùng một dòng với đoạn văn → **mắt không lướt được**.
3. Bài thường ngắn (~2.000–3.000 ký tự) so với chuẩn các bài đã mở rộng (~6.000–10.000 ký tự, 7–9 H2).

Phân tích chính xác:

| File | Bài thiếu H2 / quá ngắn |
|---|---|
| `dataEngLessons.ts` | **7 bài** — `de-model-1`, `de-wh-1`, `de-bs-1`, `de-dq-1`, `de-orch-1`, `de-cloud-1`, `de-prod-1` |
| `sqlLessons.ts` | **13 bài** — toàn bộ (sql-select-1 → sql-adv-1) |
| `aiFoundationLessons.ts` | OK |
| `mlLessons.ts` | OK |
| `cloudLessons.ts`, `cloudExpansion.ts`, `programmingExpansion.ts` | OK |

→ **Tổng: 20 lessons cần làm lại theo chuẩn.**

## Phương án

### A. Nâng cấp content (nguồn gốc của vấn đề)

Viết lại trường `theory` (và `theoryEn` tương ứng) cho đúng **20 bài** trên theo chuẩn đã thiết lập:

- **7–9 section `## H2`** mỗi bài → kích hoạt được toàn bộ UX của `TheorySections` (progress bar, nút Mark read, gạch chân tự động, scroll-anchor theo slug).
- **Mỗi section**: 1 đoạn mở + bullet/bảng + ví dụ code/SQL ngắn nếu cần.
- **Bắt buộc có**: 1 trade-off table (markdown), 1–2 case study thực tế (Stripe / Airbnb / Netflix / Shopify / Uber / Google / Snowflake…), khối **Best Practices** + **Anti-Patterns**, **Bridge sang bài tiếp**.
- **Độ dài mục tiêu**: 6.000–9.000 ký tự (gấp 2–3× hiện tại).
- Giữ nguyên `code`, `exercise`, `quiz` — chỉ chỉnh `theory` + `theoryEn`.

Khung cố định 8 H2 áp dụng cho mỗi bài:

```text
## Why this matters (real-world stake)
## Core concepts (định nghĩa + ví dụ)
## Mechanics / How it works (cơ chế, có code/SQL)
## Comparison table (trade-off rõ ràng)
## Case study #1 — <Company>
## Case study #2 — <Company / failure story>
## Best practices (checklist 5–7 mục)
## Anti-patterns & Bridge to next lesson
```

### B. Cải thiện CSS thị giác cho `.theory-content` (nâng "dễ nhìn")

Trong `src/index.css`:

1. **Tăng tách lớp giữa các H2**: thêm `padding-top` + `border-top` mảnh cho `.theory-content h2` (hiện chỉ có margin).
2. **Card hoá section**: `.theory-section` (đã có ID) → bo nhẹ background `bg-card`, padding 12px, gap-y 24px giữa sections để chấm dứt cảm giác "dính chùm" ngay cả khi nội dung dày.
3. **Tăng độ tương phản bullet**: marker đậm hơn (đã có), `li` line-height 1.75.
4. **Bảng**: `min-width: 600px` (đồng bộ memory rule), zebra stripe hàng chẵn.
5. **Code block inline**: padding rộng hơn để không "dính" chữ xung quanh.
6. **Spacing giữa đoạn `**Bold lead-in:**` và bullet phía dưới**: `p + ul { margin-top: 0.4rem }` để gom thành cụm logic.

### C. Phòng ngừa tái diễn

Thêm 1 dòng comment hướng dẫn ở đầu mỗi file curriculum:

```ts
// CONTENT STANDARD: every `theory` block MUST contain ≥6 `## H2` sections
// so TheorySections.tsx can render the per-section "Mark read" UX.
```

## Files chỉnh sửa

- `src/data/curriculum/dataEngLessons.ts` (rewrite 7 theory blocks)
- `src/data/curriculum/sqlLessons.ts` (rewrite 13 theory blocks)
- `src/index.css` (visual polish khối `.theory-content` + `.theory-section`)

Không tạo file mới, không đổi schema, không đụng `TheorySections.tsx` (vì logic split của nó đúng — chỉ cần content đúng định dạng).

## Đợt sau

- Đợt kế: rà các file curriculum **ngôn ngữ** (English/Chinese/Vietnamese/Finnish lessons) bằng cùng script đếm H2 → mở rộng tương tự nếu phát hiện bài "dính chùm".



## Hiện trạng

Đã rà soát các file curriculum trong `src/data/curriculum/`:

| File | Lessons | Tình trạng giọng văn |
|------|---------|---------------------|
| `sqlLessons.ts` | ~10 | ✅ Đã rewrite 3 bài (`sql-select-1`, `sql-sub-1`, `sql-cte-1`, `sql-join-1`) — giọng đời thường, có analogy |
| `cloudLessons.ts` | ~15 | ✅ Đã rewrite 3 bài (`cloud-net-1`, `cloud-iam-1`, `cloud-sec-1`) |
| `mlLessons.ts` | ~10 | ⚠️ Mới rewrite 2 bài (`ml-lr-1`, `ml-log-1`). 8 bài còn lại (Decision Tree, Random Forest, SVM, K-Means, PCA, Neural Net, CNN, RNN) **vẫn nặng jargon, một số đoạn còn 100% English** |
| `aiFoundationLessons.ts` | ~8 | ❌ Chưa chạm — bài "What is AI", "ML basics", "Supervised/Unsupervised", "Bias & Ethics"... còn khô khan, ít analogy |
| `dataEngLessons.ts` | ~12 | ❌ Chưa chạm — ETL, Warehousing, Pipelines, Spark... còn khô, định nghĩa khô như sách |
| `cloudExpansion.ts` | ~10 | ❌ Chưa chạm |
| `programmingExpansion.ts` | ~12 | ❌ Chưa chạm — Python OOP/Decorators/Generators/FileIO + SQL Window/Recursive |

URL hiện tại `/programming/prog-data-pipeline` rơi đúng vào nhóm Data Eng — nhóm chưa được rà soát.

## Vấn đề chung của các bài chưa rewrite

1. **Mở đầu khô**: "ETL is a process that..." → không có hook đời sống.
2. **Định nghĩa hàn lâm**: liệt kê thuật ngữ liền nhau, không giải thích "tại sao quan tâm".
3. **Ít analogy & ví dụ Việt Nam hoá**: thiếu tình huống VN (Shopee, VietJet, ngân hàng MB...).
4. **Không có "bẫy thường gặp" & "best practice"** → học xong không biết áp dụng.
5. **Một số đoạn còn 100% tiếng Anh** trong khối theory.

## Chiến lược: Rewrite theo "đợt", giữ template chuẩn

Áp dụng template 8-bước đã thành công ở SQL/Cloud/ML cho mọi bài còn lại:

```
## 1. Vấn đề đời thường (analogy + tình huống VN)
## 2. Khái niệm chính là gì? (giải thích bằng ngôn ngữ thường ngày)
## 3. Cú pháp / thành phần tối thiểu
## 4. Ví dụ chạy được ngay
## 5. Bẫy thường gặp (ai cũng dính)
## 6. Best practice của thầy Hải
## 7. Khi nào dùng / không dùng
## 8. Tóm tắt 30 giây
```

Giọng văn:
- Xưng hô **"thầy" / "các bạn"** tự nhiên.
- Dùng emoji nhẹ ở đầu mỗi mục H2 (🚦 ⚠️ 💡 🎯 ✅).
- Câu chuyện ngắn 1–2 dòng kiểu "Thử tưởng tượng bạn đang giao hàng cho Shopee...".
- Bảng so sánh có cột "Đời sống" để neo vào trí nhớ.
- Đặt **tối thiểu 1 callout `> 💡 Mẹo`** và **1 callout `> ⚠️ Cảnh báo`** mỗi bài → tự động hưởng UI Callout đẹp.
- Đặt **≥6 H2 đánh số** → tự động hưởng Step Badge gradient.

## Đợt 4 — Phạm vi lần này (15 bài quan trọng nhất)

Ưu tiên các bài học viên chạm nhiều và đang khô nhất:

**A. Data Engineering (5 bài)** — `dataEngLessons.ts`
1. `de-etl-1` — ETL vs ELT (analogy: nhà bếp vs buffet)
2. `de-pipeline-1` — Data Pipeline (analogy: dây chuyền sản xuất Vinamilk)
3. `de-warehouse-1` — Data Warehouse vs Lake (analogy: kho Tiki vs bãi container)
4. `de-stream-1` — Streaming (Kafka) (analogy: livestream Shopee)
5. `de-quality-1` — Data Quality (analogy: kiểm phẩm cà phê Trung Nguyên)

**B. AI Foundation (5 bài)** — `aiFoundationLessons.ts`
1. `ai-intro-1` — AI là gì? (analogy: dạy em bé phân biệt mèo/chó)
2. `ai-ml-basics-1` — Machine Learning căn bản
3. `ai-supervised-1` — Supervised vs Unsupervised
4. `ai-bias-1` — Bias & Ethics (case study tuyển dụng)
5. `ai-prompt-1` — Prompt Engineering căn bản

**C. ML còn lại (3 bài cốt lõi)** — `mlLessons.ts`
1. `ml-tree-1` — Decision Tree (analogy: chơi 20 câu hỏi)
2. `ml-rf-1` — Random Forest (analogy: hội đồng giám khảo Rap Việt)
3. `ml-kmeans-1` — K-Means (analogy: chia bàn tiệc cưới)

**D. Programming Expansion (2 bài Python phổ biến)** — `programmingExpansion.ts`
1. `py-decorators` — Decorators (analogy: gói quà sinh nhật)
2. `py-gen-1` — Generators (analogy: máy ATM nhả tiền từng tờ)

→ **Tổng 15 bài** trong đợt này. Các bài còn lại (~25 bài) sẽ làm trong đợt 5–6 sau khi user duyệt phong cách đợt 4.

## Files thay đổi
- ✏️ `src/data/curriculum/dataEngLessons.ts` (5 bài)
- ✏️ `src/data/curriculum/aiFoundationLessons.ts` (5 bài)
- ✏️ `src/data/curriculum/mlLessons.ts` (3 bài)
- ✏️ `src/data/curriculum/programmingExpansion.ts` (2 bài)

## Không đụng tới
- `TheorySections.tsx`, `CodeBlock.tsx`, components lesson-visuals (đã ổn).
- Schema, IDs, structure object — chỉ rewrite trường `theory` (giữ nguyên `theoryEn`, `code`, `quiz`, `exercise`).
- Các bài SQL/Cloud/ML đã rewrite trước đó.
- 25 bài còn lại (đợt sau).

## Kết quả mong đợi
- 15 bài "khô nhất" trở nên vui, có hook đời sống VN, dễ nuốt.
- Tự động hưởng UI Step Badge + Callout + Diagram đã có sẵn.
- Phong cách thống nhất với các bài SQL/Cloud/ML đã rewrite → toàn bộ Learn Programming có giọng văn nhất quán.

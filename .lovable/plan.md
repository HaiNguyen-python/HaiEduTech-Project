
## Mục tiêu
Hoàn thành rewrite **toàn bộ ~37 bài còn lại** trong Learn Programming theo template 8 bước đã thành công, giọng văn vui — analogy đời thường VN — callout 💡/⚠️ — H2 đánh số.

## Phạm vi đợt 6+7 (gộp làm một lần để xong dứt điểm)

### A. Cloud Expansion còn lại (5 bài) — `cloudExpansion.ts`
1. `cloud-ops-2` — Auto Scaling sâu / load balancing patterns
2. `cloud-ops-4` — DDoS / WAF
3. `cloud-strat-2` — Multi-cloud vs Hybrid
4. `cloud-strat-3` — Containers vs Serverless
5. `cloud-strat-5` — Multi-region active-active

### B. ML còn lại (3 bài) — `mlLessons.ts`
1. `ml-pca-1` (id thực: tra trong file) — PCA
2. `ml-hp-1` — Hyperparameter Tuning
3. `ml-ops-1` — MLOps Pipeline

### C. AI Foundation còn lại (7 bài) — `aiFoundationLessons.ts`
1. `ai-hist-1` — History
2. `ai-nn-1` — Perceptron
3. `ai-act-1` — Activation Functions
4. `ai-loss-1` — Loss + Gradient Descent
5. `ai-bp-1` — Backpropagation
6. `ai-ft-1` — Transfer Learning / Fine-tuning
7. `ai-rag-1` — RAG Pipeline
8. `ai-eth-1` — Bias & Fairness

### D. Data Eng còn lại (~7 bài) — `dataEngLessons.ts`
Tra danh sách rồi rewrite tất cả ID chưa chạm.

### E. Programming Expansion còn lại (3 bài) — `programmingExpansion.ts`
1. `sql-adv-win-1` — Window Functions
2. `sql-recursive-1` — Recursive CTE
3. `spark-basics-1` — Spark Basics

### F. SQL & Cloud cơ bản còn lại (~18 bài) — `sqlLessons.ts`, `cloudLessons.ts`
Quét tất cả ID, rewrite những bài chưa đụng.

→ Tổng dự kiến **~37 bài**.

## Cách triển khai (giữ nguyên đợt 5)
1. Liệt kê toàn bộ ID còn lại bằng grep.
2. Viết 1 file markdown `/tmp/rewrites/<id>.md` cho mỗi bài, **song song** trong cùng tool-call batch (tối đa 10 file/batch để không quá tải).
3. Chạy script `/tmp/rewrite_theory.py` (đã tạo đợt trước) batch áp dụng.
4. `tsc --noEmit` cuối cùng để verify build pass.

## Files thay đổi
- `src/data/curriculum/cloudExpansion.ts`
- `src/data/curriculum/cloudLessons.ts`
- `src/data/curriculum/mlLessons.ts`
- `src/data/curriculum/aiFoundationLessons.ts`
- `src/data/curriculum/dataEngLessons.ts`
- `src/data/curriculum/programmingExpansion.ts`
- `src/data/curriculum/sqlLessons.ts`

## Không đụng tới
- Components, schema, types, IDs, structure object — chỉ trường `theory`.
- Các bài đã rewrite các đợt trước.

## Kết quả mong đợi
- 100% bài Learn Programming có giọng văn nhất quán, có hook đời sống VN.
- Tự động hưởng UI Step Badge + Callout đã có sẵn.
- TypeScript build pass clean.

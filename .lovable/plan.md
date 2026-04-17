

## Plan: Cải thiện cấu trúc câu trả lời + mở rộng câu hỏi Interview

### 1. Cải thiện cấu trúc hiển thị câu trả lời (InterviewQuestions.tsx)

Hiện tại câu trả lời chỉ là 1 đoạn `whitespace-pre-wrap` dài → khó scan. Sẽ tái cấu trúc thành các **section rõ ràng có icon + heading**:

- **📖 Definition / TL;DR** — câu tóm tắt 1-2 dòng (highlighted box màu primary nhạt)
- **💡 Detailed Explanation** — phần giải thích chính, chia paragraph
- **✅ Key Points** — bullet list (đã có, giữ nguyên + tăng visual)
- **⚠️ Common Pitfalls / Gotchas** — mục mới (warning box màu amber)
- **💻 Code Example** — giữ nguyên + thêm line numbers, syntax color cho keywords
- **🎯 Interview Tip** — câu khuyên cách trả lời khi phỏng vấn (box màu emerald)

**Thay đổi data schema** trong `interviewQuestions.ts`:
```ts
interface InterviewQuestion {
  // ... existing
  tldr?: string;        // NEW: 1-2 line summary
  pitfalls?: string[];  // NEW: common mistakes
  interviewTip?: string;// NEW: how to answer in real interview
}
```

Câu hỏi cũ vẫn render được vì các field mới đều optional.

### 2. Mở rộng câu hỏi (từ 50 → 100 câu)

**AI Engineer (+25 câu, tổng 50)**:
- LLMs: Few-shot vs Zero-shot, Temperature/Top-p, Function calling, Structured output, Token cost optimization
- ML: Cross-validation, Feature engineering, Class imbalance, Regularization L1/L2, Gradient descent variants
- DL: CNN vs RNN vs Transformer, Batch normalization, Dropout, Learning rate scheduling, Transfer learning
- System: Model serving (TorchServe/Triton), A/B testing models, Drift detection, MLOps pipeline, Cost monitoring

**Data Engineer (+25 câu, tổng 50)**:
- SQL: CTEs vs subqueries, Materialized views, Query optimization, Deadlocks, ACID vs BASE
- Pipelines: Backfill strategy, Schema evolution, DAG dependencies, SLA monitoring, Dead letter queue
- Big Data: Shuffle vs broadcast join, Z-ordering, Delta Lake, Iceberg vs Hudi, Compaction
- System: Star vs snowflake schema deep, SCD types, Streaming joins, Exactly-once semantics, Data contracts

Toàn bộ bằng **tiếng Anh** theo memory rule. Mỗi câu mới có đầy đủ 7 fields (tldr, answer, keyPoints, pitfalls, interviewTip, codeExample khi phù hợp, difficulty).

### 3. Thêm "Quick Stats" header

Thêm thanh stats nhỏ trên đầu mỗi tab: tổng số câu | Junior/Mid/Senior breakdown | số categories — giúp user nắm tổng quan.

### Files sẽ sửa

| File | Thay đổi |
|------|----------|
| `src/data/interviewQuestions.ts` | + 50 câu mới, thêm fields `tldr`, `pitfalls`, `interviewTip`, bổ sung cho 50 câu cũ |
| `src/pages/InterviewQuestions.tsx` | Tái cấu trúc AccordionContent với 6 section có icon + colored boxes; thêm Quick Stats bar |


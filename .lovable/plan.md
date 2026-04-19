## Hiện trạng (sau đợt 5)

| File | Tổng lessons | Đã rewrite | Còn lại |
|------|-------------|-----------|---------|
| `sqlLessons.ts` | ~10 | 4 (đợt 1-3) | 6 |
| `cloudLessons.ts` | ~15 | 3 (đợt 1-3) | 12 |
| `mlLessons.ts` | ~12 | 5 (đợt 4-5: lr, log, dt, rf, km, svm, fe, cv, eval, ens) | ~3 |
| `aiFoundationLessons.ts` | ~12 | 5 đợt 4 + 3 đợt 5 (cnn, rnn, trans) = 8 | ~4 |
| `dataEngLessons.ts` | ~12 | 5 (đợt 4) | ~7 |
| `cloudExpansion.ts` | ~10 | 5 đợt 5 (ops-1, ops-3, ops-5, strat-1, strat-4) | ~5 |
| `programmingExpansion.ts` | ~7 | 2 đợt 4 + 2 đợt 5 (oop-adv, fileio) = 4 | ~3 |

## Đợt 5 — Đã hoàn thành (15 bài)
- **Cloud Expansion (5)**: cloud-ops-1 Storage+AutoScaling, cloud-ops-3 Encryption+KMS, cloud-ops-5 Monitoring, cloud-strat-1 Pricing+FinOps, cloud-strat-4 DR
- **ML (5)**: ml-svm-1, ml-fe-1, ml-cv-1, ml-eval-1, ml-ens-1
- **AI Foundation (3)**: ai-cnn-1, ai-rnn-1, ai-trans-1
- **Programming Expansion (2)**: py-oop-adv-1, py-fileio-1

## Template chuẩn (đã định hình qua 30+ bài)

```
## 1. 🚦 Vấn đề đời thường (analogy + tình huống VN)
## 2. 💡 Khái niệm chính
## 3. 🧰 Cú pháp / thành phần
## 4. 🎯 Ví dụ chạy được ngay
## 5. ⚠️ Bẫy thường gặp (callout warning)
## 6. ✅ Best practice của thầy Hải (callout tip)
## 7. 🤔 Khi nào dùng / không dùng
## 8. 📌 Tóm tắt 30 giây
```

## Còn lại (~37 bài) — đề xuất đợt 6+
- Cloud Expansion: cloud-ops-2/4, cloud-strat-2/3/5
- ML: ml-pca, ml-hp, ml-mlops
- AI Foundation: ai-history, ai-act, ai-loss, ai-bp, ai-ft, ai-rag, ai-eth (7 bài còn lại)
- Data Eng: 7 bài còn lại
- Programming Expansion: py-decorators (đã đợt 4), py-gen (đã), sql-adv-window, sql-recursive, spark-basics
- SQL/Cloud cơ bản: 6+12 bài còn lại

## Files thay đổi đợt 5
- `src/data/curriculum/cloudExpansion.ts`
- `src/data/curriculum/mlLessons.ts`
- `src/data/curriculum/aiFoundationLessons.ts`
- `src/data/curriculum/programmingExpansion.ts`

## Kết quả
- **TypeScript pass clean** sau cập nhật.
- 15 bài "khô nhất nhì" giờ có hook đời sống VN, callout tip/warning, step badge số gradient.
- Tổng cộng đã rewrite ~30 bài / ~80 bài Learn Programming.

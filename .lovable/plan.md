# Kế hoạch: Swedish Performance Dashboard

Đã tăng số cặp Match từ 5 → 10 (xong).

Dưới đây là kế hoạch xây trang **/swedish/performance** (hoặc tab trong SwedishBeginner) để visualize toàn bộ hành trình học tiếng Thụy Điển và tự động xếp level.

## 1. Nguồn dữ liệu (đã có sẵn)

| Nguồn | Nội dung | Bảng/Key |
|---|---|---|
| Mastered vocab | Từ đã "thuộc" (star) | `user_mastered_vocab` (subject='swedish') + localStorage fallback |
| Vocab bank tổng | ~800+ từ Swedish có gắn level A1/A2/B1/B2 | `swedishVocab*` files |
| Review modes | Listen/Type/Match/Cloze/Speed accuracy | `activity_log` (type=`swedish_vocab_review`) |
| Speaking Coach | Accuracy % từng câu | `activity_log` (type=`speaking_coach_swedish`) |
| Writing/Speaking YKI | Điểm 0-5 mỗi criteria | edge `grade-swedish-yki` → `activity_log` |
| Reading/Listening | % đúng bài tập | `activity_log` |
| Session time | Phút online theo Swedish routes | `page_view_log` filter `/swedish/*` |

## 2. Thuật toán xếp level (CEFR ↔ YKI)

Tính điểm tổng hợp 4 kỹ năng, mỗi kỹ năng 0-100:

```text
Vocabulary score  = mastered_count có trọng số theo level
                    (A1=1, A2=2, B1=4, B2=8) → chuẩn hóa /max
Reading score     = avg(accuracy các bài reading gần nhất, weight theo level)
Listening score   = avg(accuracy listening + review Listen mode)
Speaking score    = avg(Speaking Coach accuracy, YKI speaking overall*20)
Writing score     = avg(YKI writing overall*20, cloze/type accuracy)
```

Ngưỡng level (overall = trung bình 4 kỹ năng, cần ≥3/4 kỹ năng đạt ngưỡng):

```text
A1 (YKI 1):  ≥ 25   — ~150 từ A1, đọc hiểu câu ngắn
A2 (YKI 2):  ≥ 45   — ~400 từ, viết đoạn 30 từ, nói giới thiệu
B1 (YKI 3):  ≥ 65   — ~800 từ, đọc bài 200 từ, viết 80 từ
B2 (YKI 4):  ≥ 82   — thảo luận, viết luận, YKI grade ≥ 3.5
```

## 3. UI Layout (route mới `/swedish/performance`)

```text
┌─────────────────────────────────────────────────────┐
│  🇸🇪 Trình độ hiện tại: A2 → B1  (điểm 58/100)      │
│  [progress bar tới B1] · Còn 7 điểm nữa!            │
├──────────────────┬──────────────────────────────────┤
│ Radar 4 kỹ năng  │  KPI cards:                      │
│ (Recharts)       │  • Từ đã thuộc 312/800           │
│                  │  • Streak 12 ngày                │
│                  │  • Giờ học Swedish 24h           │
│                  │  • YKI dự kiến: Cấp 2            │
├──────────────────┴──────────────────────────────────┤
│  Bar chart: Từ vựng theo level (A1/A2/B1/B2)        │
├─────────────────────────────────────────────────────┤
│  Line chart: Tiến bộ 30 ngày (accuracy trung bình) │
├─────────────────────────────────────────────────────┤
│  Heatmap ô vuông 7×N: hoạt động mỗi ngày (GitHub)  │
├─────────────────────────────────────────────────────┤
│  Recommendations (rule-based):                      │
│  • "Speaking yếu nhất (42) → gợi ý Speaking Coach" │
│  • "Đã đủ điều kiện thi thử YKI A2"                │
└─────────────────────────────────────────────────────┘
```

## 4. Chi tiết kỹ thuật

- **File mới**: `src/pages/SwedishPerformance.tsx` + hook `src/hooks/useSwedishPerformance.ts`
- **Helper**: `src/lib/swedishLevelEngine.ts` — hàm `computeSwedishLevel(stats): { cefr, yki, score, breakdown }`
- **Query**: 1 RPC `get_swedish_performance(_user_id)` gộp `activity_log` + `user_mastered_vocab` (giảm round-trip); fallback client-side aggregate cho guest dùng localStorage
- **Chart lib**: Recharts (đã có) - Radar, Bar, Line, custom heatmap div grid
- **Route**: add vào `App.tsx`, link từ `SwedishBeginner.tsx` header ("📊 Trình độ của tôi")
- **Guest mode**: đọc localStorage `mastered_swedish_*`, `swedish_review_stats_*`
- **i18n**: dùng `useLanguage().t(vi, en)` xuyên suốt

## 5. Trigger cập nhật

- Component fetch on mount + realtime channel `activity_log` filter `user_id=eq.{uid}`
- Cache 60s (React Query hoặc useState + useEffect)

## 6. Phạm vi giai đoạn 1 (ship trước)

1. `swedishLevelEngine.ts` + unit test nhẹ
2. `useSwedishPerformance` (chỉ client-side aggregate, không cần RPC)
3. Trang `/swedish/performance` với Radar + KPI + Bar theo level + Recommendations
4. Link vào navbar Swedish

Giai đoạn 2: RPC gộp, heatmap, line chart 30 ngày, so sánh với trung bình cộng đồng.

---

**Xác nhận để mình build giai đoạn 1?** Hoặc bạn muốn chỉnh ngưỡng level / thêm/bớt biểu đồ nào?

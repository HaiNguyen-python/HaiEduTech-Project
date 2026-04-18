
## Plan: Mở rộng IELTS Phrase Bank lên 200+ cụm từ

### Mục tiêu
Mở rộng `src/data/ieltsPhraseBank.ts` từ 80 → **200+ cụm từ Band 7.0+**, bổ sung nhiều chủ đề và collocations chất lượng cao như user yêu cầu (visitors from all corners of the globe, dissolve the problems, conducive working atmosphere...).

### Phân bổ số lượng

**Task 1 (~80 cụm)** — giữ 4 categories hiện có + mở rộng:
- Trends (20): surge exponentially, witness a steady decline, hit rock bottom, soar to unprecedented levels...
- Comparisons (20): dwarf in comparison to, pale in significance next to, mirror the trend of...
- Process/Map (20): undergo a radical transformation, be subjected to, the terminal stage involves...
- Overview (20): at first glance, a cursory examination reveals, the data paints a clear picture of...

**Task 2 (~120 cụm)** — mở rộng từ 5 → **10 categories**:
- Opinion (15): I am of the firm conviction, I wholeheartedly subscribe to the view...
- Cause-Effect (15): dissolve the problems, trigger a chain reaction, exacerbate the situation...
- Argument (15): a compelling case can be made, this argument holds water, refute the notion...
- Solutions (15): tackle the issue head-on, implement stringent measures, alleviate the burden...
- Linking (10): by the same token, in stark contrast, notwithstanding this...
- **Education** (10) NEW: foster critical thinking, cultivate a passion for learning, instill values...
- **Workplace** (10) NEW: conducive working atmosphere, foster team cohesion, climb the corporate ladder, strike a work-life balance...
- **Tourism/Globalization** (10) NEW: visitors from all corners of the globe, broaden one's horizons, immerse oneself in the local culture, bridge cultural gaps...
- **Environment** (10) NEW: mitigate the impact of, leave a carbon footprint, deplete natural resources, embrace renewable energy...
- **Technology/Society** (10) NEW: revolutionize the way we live, bridge the digital divide, fall prey to cyber threats, blur the line between...

### Cấu trúc dữ liệu (giữ nguyên)
```ts
interface IELTSPhrase {
  id: string;
  phrase: string;
  meaning: string;     // VI
  example: string;     // Band 7+ sample
  category: string;
  level: 'B1' | 'B2' | 'C1';
  taskType: 1 | 2;
}
```

### UI cập nhật
- `PhrasePractice.tsx`: filter buttons tự động render từ `[...new Set(phrases.map(p => p.category))]` → không cần đổi code logic, chỉ thêm scroll-x cho hàng filter khi nhiều categories
- Thêm badge level (B1/B2/C1) màu khác nhau trên card cụm từ

### Files cần thay đổi

| File | Thay đổi |
|------|----------|
| `src/data/ieltsPhraseBank.ts` | Mở rộng lên 200+ cụm, thêm 5 categories Task 2 |
| `src/components/PhrasePractice.tsx` | Scroll-x filter row, badge level màu sắc |

### Lưu ý
- 100% cụm từ là collocations Band 7.0+ chuẩn IELTS examiner
- Mỗi cụm có example sentence chất lượng cao để học viên tham khảo
- Không cần thay đổi edge function — đã hoạt động generic với mọi phrase

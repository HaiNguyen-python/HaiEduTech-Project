## Vấn đề

Trang `/toeic-vocabulary` hiển thị "All (800)" nhưng thực tế chỉ có **458 từ duy nhất** - 342 entries là trùng lặp:

- `itinerary` xuất hiện **8 lần**
- `liability`, `agenda`, `appraisal`, `feedback`, `venue`, `endorsement`, `clause`, `complaint` mỗi từ **6 lần**
- Còn 162 từ khác bị lặp 2-5 lần

Nguyên nhân: các file expansion 1-8 được tạo qua nhiều lần mở rộng, không kiểm tra trùng với file gốc và với nhau.

## Giải pháp

### Bước 1 - Tạo helper dedupe runtime (an toàn, không xoá data nguồn)
Trong `src/data/toeicVocabData.ts`, chuyển logic gộp arrays sang:
1. Gộp tất cả nguồn vào 1 mảng.
2. Dedupe theo `word.toLowerCase().trim()` - giữ entry **đầu tiên** (ưu tiên data gốc, sau đó expansion 1→8) vì entry gốc thường có example/synonym/collocation chất lượng tốt hơn.
3. Sort theo category + level như cũ.

Lợi ích: ngay sau bước này, list rút từ 800 → 458 từ duy nhất, không còn lặp.

### Bước 2 - Bổ sung 342 từ TOEIC mới để đủ 800
Tạo file mới `src/data/toeicVocabExpansion9.ts` chứa **342 từ TOEIC business/workplace mới** chưa có trong bank hiện tại, trải đều các category:

- Office & Workplace, Meetings & Presentations
- Business Travel, Finance & Accounting
- Marketing & Sales, HR & Recruitment
- Technology & IT, Legal & Contracts
- Manufacturing & Logistics, Customer Service
- Events & Hospitality, Health & Safety

Mỗi từ đầy đủ: `word, ipa, level, pos, definition.{en,vi}, example.{en,vi}, synonyms, collocations, category` theo `ToeicWord` interface.

Phân bổ level: ~30% basic, ~45% intermediate, ~25% advanced.

### Bước 3 - Verify
Script kiểm tra cuối: `total === 800 && unique === 800 && duplicates === 0`. Nếu sai, điều chỉnh expansion9 cho khớp.

## Chi tiết kỹ thuật

```ts
// toeicVocabData.ts cuối file
const _raw: ToeicWord[] = [ ...inlineList, ...toeicVocabExpansion, ..., ...toeicVocabExpansion9 ];
const _seen = new Set<string>();
const _dedup: ToeicWord[] = [];
for (const w of _raw) {
  const k = w.word.toLowerCase().trim();
  if (_seen.has(k)) continue;
  _seen.add(k);
  _dedup.push(w);
}
export const toeicVocabData: ToeicWord[] = _dedup.sort(/* category + level như cũ */);
```

## Files thay đổi
- **Sửa**: `src/data/toeicVocabData.ts` (logic dedupe + import expansion9)
- **Tạo mới**: `src/data/toeicVocabExpansion9.ts` (~342 từ TOEIC mới)

## Không thay đổi
- UI `ToeicVocabulary.tsx` giữ nguyên (count 800 sẽ tự đúng)
- Các file expansion 1-8 giữ nguyên (giữ examples chất lượng đã có)
- Lectures, exams, grading - không liên quan

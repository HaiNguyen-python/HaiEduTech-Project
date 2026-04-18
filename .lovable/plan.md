
## Plan: Phrase Practice Module cho IELTS Writing Practice

### Mục tiêu
Thêm tab/section mới **"📝 Phrase Practice"** trong `/ielts-writing-practice` cho cả Task 1 và Task 2, cho phép học viên:
1. Chọn 1 cụm từ cao cấp (B1+) từ danh sách phân loại
2. Tự viết câu sử dụng cụm từ đó
3. AI Perplexity chấm: ngữ pháp, đúng cách dùng cụm từ, gợi ý nâng cấp
4. Hiển thị feedback chi tiết + câu mẫu Band 7.0+

### Cấu trúc dữ liệu

**File mới**: `src/data/ieltsPhraseBank.ts`
- 80+ cụm từ chia 2 nhóm: Task 1 và Task 2
- Mỗi cụm có: `phrase`, `meaning` (VI), `example` (Band 7+ sample), `category`, `level` (B1/B2/C1)

**Task 1 categories** (~40 cụm):
- **Trends**: witnessed a sharp rise, plummeted dramatically, fluctuated wildly, reached a peak of, leveled off at
- **Comparisons**: outnumbered by a margin of, accounted for the lion's share, was twice as high as
- **Process/Map**: undergo a transformation, in the initial stage, subsequently followed by
- **Overview**: it is readily apparent that, the most striking feature is

**Task 2 categories** (~40 cụm):
- **Opinion**: from my perspective, I am firmly convinced that, there is little doubt that
- **Cause-Effect**: stems primarily from, gives rise to, has far-reaching consequences
- **Argument**: a compelling argument in favor of, opponents would contend that, this notion is reinforced by
- **Solutions**: a viable solution would be to, governments should impose stringent regulations
- **Linking**: notwithstanding this, by the same token, in stark contrast

### UI/UX Flow

```text
┌─────────────────────────────────────────┐
│  [Task 1] [Task 2]  ← chọn task         │
├─────────────────────────────────────────┤
│  Filter: [All] [Trends] [Compare] ...   │
├─────────────────────────────────────────┤
│  Cụm từ: "witnessed a sharp rise"       │
│  Nghĩa: chứng kiến sự gia tăng mạnh     │
│  Ví dụ mẫu: The graph witnessed a...    │
│                                          │
│  [Textarea: viết câu của bạn]           │
│  [Submit for AI Grading]                 │
├─────────────────────────────────────────┤
│  ✅ Score: 8/10                          │
│  💡 Grammar: ...                         │
│  💡 Cụm từ dùng đúng/sai                 │
│  ⬆️ Phiên bản nâng cấp Band 7.5+        │
└─────────────────────────────────────────┘
```

### Backend
**Edge function mới**: `supabase/functions/grade-phrase-sentence/index.ts`
- Dùng Perplexity API (`sonar` model) — đồng bộ với toàn bộ AI features hiện có
- Input: `{ phrase, userSentence, taskType }`
- Output JSON:
```json
{
  "score": 8,
  "phraseUsedCorrectly": true,
  "grammarFeedback": "...",
  "phraseFeedback": "...",
  "upgradedVersion": "Band 7.5+ rewrite với **bold** highlights",
  "tips": ["tip 1", "tip 2"]
}
```
- Có JWT optional (giống chat function), JSON repair logic, fallback 402/429

### Files cần thay đổi

| File | Thay đổi |
|------|----------|
| `src/data/ieltsPhraseBank.ts` (NEW) | 80+ cụm từ, type `IELTSPhrase` |
| `src/components/PhrasePractice.tsx` (NEW) | UI component với filter, textarea, kết quả AI |
| `src/pages/IeltsWritingPractice.tsx` | Thêm Tabs ở đầu: "Essay Writing" / "Phrase Practice" |
| `supabase/functions/grade-phrase-sentence/index.ts` (NEW) | Edge function chấm câu |

### Lưu ý kỹ thuật
- Toàn bộ dùng **Perplexity API** (`sonar`) — phù hợp với rule project
- Lưu attempts vào `localStorage` (không cần DB table mới — gọn nhẹ)
- Loading state với spinner, toast error rõ ràng cho 402/429
- Mobile-first: textarea min-h 120px, font 16px+
- Bilingual labels (VI/EN) theo LanguageContext

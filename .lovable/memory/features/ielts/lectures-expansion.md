---
name: IELTS Writing/Speaking Lecture Expansion
description: 9 inline SVG diagrams + extended theory (band descriptors, common VN-learner mistakes, paraphrase bank, sample sentences, Mr Hai golden tips) for Writing/Speaking lectures. Rendered in Strategy tab of IeltsLectureView via IeltsLectureDiagram + IeltsLectureExpansionPanel components.
type: feature
---
Mở rộng nội dung 12 bài giảng IELTS Writing/Speaking lên cùng chuẩn chất lượng với TOEIC lectures:

**Files:**
- `src/components/ielts/IeltsLectureDiagram.tsx` — Inline SVG diagrams (theme-aware) cho 9 bài: writing-task2-opinion, writing-task2-agree-disagree, writing-task1-trends, writing-task1-describe-process, writing-task1-maps-diagrams, speaking-part1-expanding, speaking-part2-technique, speaking-part3-discussion, natural-fillers-speaking, tips-speaking-general-specific
- `src/data/ieltsLectureExpansion.ts` — Theory mở rộng theo lectureId: bandDescriptors (5.0/6.5/7.5/8.0+), commonMistakes (Wrong/Right/Why), paraphraseBank (basic→upgraded với band tag), sampleSentences (sentence + why-it-works), mrHaiTips (emoji + title + content)
- `src/components/ielts/IeltsLectureExpansionPanel.tsx` — Render panel với 5 sections: Band Descriptors grid, Common Mistakes (2-cột Wrong/Right), Paraphrase Bank table, Sample Sentences cards, Mr Hai Golden Tips gradient cards
- `src/pages/IeltsLectureView.tsx` — Tích hợp `<IeltsLectureDiagram>` ở đầu Strategy tab và `<IeltsLectureExpansionPanel>` sau Mistakes to Avoid

**Pattern**: SVG palette dùng HSL semantic colors (C.card/C.text/...), wrapper figure với border-border + bg-muted/30 để tự động hỗ trợ light/dark theme.



## Plan: Tăng cường bài học cho Tiếng Anh và Tiếng Phần Lan

### Tổng quan hiện tại

**Tiếng Anh** (~30 bài học gốc):
- IELTS: 4 vocab + 3 writing + 2 reading + 2 grammar + 1 listening + 1 speaking + ~11 expansion reading/listening
- TOEIC: 2 listening + 1 reading + 2 business vocab (ít)
- Cambridge: 2 starters + 1 movers (ít)
- National Exam: 3 grammar + 1 reading
- Grammar: 6 modules ~12 bài + expansion ~6 bài

**Phần Lan** (~30 bài):
- Vocabulary: 5 expansion files, phủ tốt
- Lessons: 4 module gốc + verb types + past/conditionals/cases + possessive/rection/word-order/reading/listening
- Mock exams: 4 expansion files

### Bổ sung

#### Tiếng Anh — Tạo file `src/data/languageCurriculum/englishExpansion3.ts`
Thêm **~20 bài học mới** cho các mảng yếu:

| Module | Bài mới | Nội dung |
|--------|---------|----------|
| TOEIC Listening | 2 bài | Part 3: Short Conversations, Part 4: Short Talks |
| TOEIC Reading | 2 bài | Part 6: Text Completion, Part 7: Reading Comprehension |
| IELTS Speaking | 2 bài | Part 2 Cue Cards, Part 3 Discussion |
| IELTS Writing | 2 bài | Task 1 Charts/Maps, Task 2 Agree/Disagree |
| IELTS Vocab | 2 bài | Health & Technology topics |
| Cambridge Movers | 2 bài | Reading & Writing, Speaking |
| Cambridge Flyers | 2 bài | Grammar, Reading |
| National Exam | 2 bài | Vocabulary, Writing |
| Grammar extra | 2 bài | Phrasal Verbs, Collocations |

Mỗi bài có: theory (song ngữ), proTips, vocabulary, exercises (fill-in-blank + sentence-reorder), quiz (3-4 MCQ).

#### Phần Lan — Tạo file `src/data/finnishCurriculum/lessonsExpansion3.ts`
Thêm **~12 bài học mới** cho grammar và skills:

| Module | Bài mới | Nội dung |
|--------|---------|----------|
| Partitive Case | 2 bài | Partitiivi perus + erikoistapaukset |
| Plural Forms | 2 bài | Monikko nominatiivi + partitiivi monikko |
| Question Words | 2 bài | Kysymyssanat + epäsuorat kysymykset |
| Writing Practice | 2 bài | Sähköposti, Viesti (email, message) |
| Listening Practice | 2 bài | Kuulutukset, Puhelut (announcements, phone calls) |
| Everyday Finnish | 2 bài | Arkikieli, Slang & lyhenteet |

Mỗi bài có: theory, grammar points, quiz, dialogue (nếu phù hợp).

#### Cập nhật barrel exports
- `src/data/languageCurriculum/index.ts` — import `englishExpansion3` modules, thêm vào `allEnglishModules`
- `src/data/finnishCurriculum/index.ts` — export `finnishLessonExpansion3Modules`

### Files thay đổi
- `src/data/languageCurriculum/englishExpansion3.ts` — **mới** (~20 bài tiếng Anh)
- `src/data/finnishCurriculum/lessonsExpansion3.ts` — **mới** (~12 bài Phần Lan)
- `src/data/languageCurriculum/index.ts` — import + merge bài mới
- `src/data/finnishCurriculum/index.ts` — export module mới




## Plan: Kiểm tra độ chính xác + Tăng cường bài học toàn diện

### Hiện trạng bài học (ước tính theo module/lesson)

| Môn | Số bài học (ước tính) | Ghi chú |
|-----|----------------------|---------|
| **English IELTS** | ~25 bài + 14 lectures | Vocab, Writing, Reading, Listening, Speaking |
| **English TOEIC** | ~5 bài + ~10 lectures | Ít — cần bổ sung nhiều |
| **English Cambridge** | ~5 bài + ~70 lectures | Lectures đầy đủ, bài tập ít |
| **English Grammar** | ~30 bài | Tốt |
| **English National Exam** | ~5 bài | Ít |
| **Chinese HSK** | ~8 bài + vocab HSK1-6 | Cần thêm |
| **Chinese Conversational** | ~18 bài | Tốt |
| **Finnish Lessons** | ~35 bài | Tốt |
| **Finnish Vocab** | ~60 module | Đầy đủ |
| **Finnish Mock Exam** | ~15 module | Tốt |
| **Vietnamese** | ~40 bài | Tốt |
| **Programming** | ~50 bài (SQL, AI, ML, DataEng) | Tốt |

### Phần 1: Kiểm tra độ chính xác

Vì không thể chạy script kiểm tra tự động trong plan mode, phần kiểm tra sẽ được thực hiện khi chuyển sang build mode:
- Quét tất cả quiz answers — đảm bảo `answer` index nằm trong phạm vi `options`
- Kiểm tra fill-in-blank — đảm bảo mỗi câu có `___` và `answer` khớp
- Kiểm tra sentence-reorder — `correct` phải khớp với `scrambled` words
- Kiểm tra trùng lặp ID giữa các module

### Phần 2: Tăng cường bài học (ưu tiên các mục ít bài nhất)

#### File mới 1: `src/data/languageCurriculum/englishExpansion4.ts`
Thêm ~15 bài cho các mục yếu nhất:
- **TOEIC** +5: Email Writing, Meeting Vocab, Travel Business, Phone Conversations, Negotiations
- **National Exam** +5: Reading Comprehension Strategies, Error Identification, Cloze Test, Stress & Intonation, Vocabulary in Context
- **Cambridge** +5: KET Writing, PET Reading, Movers Listening, Flyers Speaking, Starters Vocab

#### File mới 2: `src/data/languageCurriculum/chineseExpansion.ts`
Thêm ~10 bài HSK:
- HSK3: Complements, Passive sentences, Comparison patterns, Duration expressions
- HSK4: Complex sentences, Idiomatic expressions, Formal writing, News reading
- HSK5-6: Advanced grammar patterns, Literary Chinese basics

#### File mới 3: `src/data/finnishCurriculum/lessonsExpansion4.ts`
Thêm ~8 bài Finnish:
- YKI Intermediate: Workplace Finnish, Health & Doctor visits, Housing & rental
- YKI Advanced: News comprehension, Formal letter writing, Finnish culture debates

#### File mới 4: `src/data/vietnamese/lessonsExpansion.ts`
Thêm ~6 bài Vietnamese:
- Advanced reading: Báo chí Việt Nam, Văn học hiện đại
- Advanced grammar: Câu phức, Văn phong học thuật
- Culture: Lễ hội truyền thống, Ẩm thực vùng miền

#### File mới 5: `src/data/curriculum/programmingExpansion.ts`
Thêm ~6 bài Programming:
- Python: OOP advanced, Decorators & Generators, File I/O
- SQL: Advanced window functions, Recursive queries
- Data: Apache Spark basics

### Cập nhật barrel exports
- `src/data/languageCurriculum/index.ts` — import englishExpansion4, chineseExpansion
- `src/data/finnishCurriculum/index.ts` — export lessonsExpansion4
- `src/data/curriculum/index.ts` — import programmingExpansion
- `src/data/vietnameseCurriculumData.ts` — import lessonsExpansion

### Tổng cộng: ~45 bài học mới + script kiểm tra accuracy

### Files thay đổi
- `src/data/languageCurriculum/englishExpansion4.ts` — **mới**
- `src/data/languageCurriculum/chineseExpansion.ts` — **mới**
- `src/data/finnishCurriculum/lessonsExpansion4.ts` — **mới**
- `src/data/vietnamese/lessonsExpansion.ts` — **mới**
- `src/data/curriculum/programmingExpansion.ts` — **mới**
- `src/data/languageCurriculum/index.ts` — cập nhật imports
- `src/data/finnishCurriculum/index.ts` — cập nhật exports
- `src/data/curriculum/index.ts` — cập nhật imports
- `src/data/vietnameseCurriculumData.ts` — cập nhật imports


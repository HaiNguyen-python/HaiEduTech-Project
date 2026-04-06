

## Plan: Tăng cường bài học Cambridge Starters → PET (+25 bài mới)

### Hiện trạng
- 45 bài giảng (9 bài/level × 5 levels) trải đều Starters, Movers, Flyers, KET, PET
- Dữ liệu nằm trong 3 file: `cambridgeLecturesData.ts`, `cambridgeLecturesExpansion.ts`, `cambridgeLecturesExpansion2.ts`

### Mở rộng: +25 bài mới (5 bài/level)

**File mới: `src/data/cambridgeLecturesExpansion3.ts`** (~1200 dòng)

#### Starters (+5 bài → tổng 14):
1. **Toys & Hobbies** — Listening: nghe mô tả đồ chơi yêu thích
2. **Action Verbs** — Reading-Writing: jump, run, swim, fly — ghép hành động với hình
3. **Classroom Objects** — Vocabulary: bút, thước, cặp sách — từ vựng trong lớp
4. **Spelling Fun** — Reading-Writing: đánh vần tên người và đồ vật
5. **Where Are They?** — Listening: xác định vị trí người trong hình (park, school, home)

#### Movers (+5 bài → tổng 14):
1. **Must & Mustn't: School Rules** — Grammar: modal verbs cho quy tắc
2. **Feelings & Emotions** — Vocabulary: happy, scared, excited, nervous
3. **A Day at the Zoo** — Reading: đọc hiểu đoạn văn ngắn
4. **Question Words: Who, What, Where, When** — Speaking: hỏi đáp
5. **Superlatives: The Biggest, The Best!** — Grammar: so sánh nhất

#### Flyers (+5 bài → tổng 14):
1. **Phrasal Verbs for Young Learners** — Vocabulary: look after, turn on, put on
2. **Reading Long Texts** — Reading: chiến lược đọc đoạn dài (Part 4)
3. **Conditional Sentences (If...)** — Grammar: First conditional cơ bản
4. **Writing a Story** — Writing: kể chuyện từ tranh (Part 7)
5. **Listening for Specific Information** — Listening: nghe lấy thông tin chi tiết

#### KET (+5 bài → tổng 14):
1. **Word Formation: Noun ↔ Adjective** — Vocabulary: beauty→beautiful, care→careful
2. **Reading Signs & Notices** — Reading: hiểu biển báo, thông báo
3. **Describing a Photo** — Speaking: Part 2 mô tả ảnh
4. **Linking Words: because, so, but, although** — Writing: liên kết câu
5. **Listening for Attitude & Opinion** — Listening: nghe thái độ người nói

#### PET (+5 bài → tổng 14):
1. **Passive Voice in Context** — Grammar: bị động trong bài đọc PET
2. **Reading Part 6: Gap-fill Text** — Reading: điền từ vào đoạn văn
3. **Formal vs Informal Register** — Writing: phân biệt văn phong
4. **Paraphrasing Skills** — Reading: nhận diện diễn đạt lại
5. **Speaking Part 3 & 4: Collaborative Task** — Speaking: thảo luận cặp

#### Mỗi bài gồm đầy đủ:
- `stepByStep` (3 bước)
- `illustratedRules` (3 quy tắc minh họa)
- `watchOut` (3 lỗi thường gặp)
- `practiceSet` (3 câu hỏi thực hành)
- `vocabulary` (4 từ vựng)
- `quiz` (3 câu quiz)
- `parentInfo` (thông tin cho phụ huynh)
- Tất cả song ngữ Anh-Việt

### Cập nhật file export
**File: `src/data/cambridgeLecturesData.ts`**
- Import `cambridgeLecturesExpansion3`
- Thêm `...cambridgeLecturesExpansion3` vào `allCambridgeLectures`

### Files
- `src/data/cambridgeLecturesExpansion3.ts` — **mới**, ~1200 dòng (25 bài giảng)
- `src/data/cambridgeLecturesData.ts` — thêm import + spread vào export array


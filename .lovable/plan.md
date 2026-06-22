# Mở rộng độ sâu bài học Swedish

## Hiện trạng

- `SwedishTierView.tsx` định nghĩa **54 lesson** (A1: 25, A2: 17, B1: 12).
- `swedishLessonDetails.ts` chỉ có **31 lesson** với 4 trường nông: `intro`, `steps`, `pitfalls`, `practice`.
- 23 lesson còn lại chưa có chi tiết → người học chỉ thấy tiêu đề và vài câu mô tả mặc định.
- Các lesson đã có chi tiết cũng khá ngắn: 5 bước, 3 pitfall, 3 practice - chưa đủ "deep" cho ai muốn tự học từ 0.

## Mục tiêu

Mỗi lesson (cả 54) có nội dung deep-dive đủ để học hoàn toàn không cần giáo viên: giải thích ngữ pháp, hộp ví dụ song ngữ, mini-dialogue, đoạn văn mẫu, ghi chú văn hóa Thụy Điển, checkpoint quiz tự kiểm tra.

## Việc cần làm

### 1. Mở rộng schema `LessonDetail`

Thêm các trường mới (tất cả optional để không vỡ 31 entry cũ trong lần commit đầu):

```ts
export interface LessonDetail {
  // — hiện có —
  introVi: string; introEn: string;
  stepsVi: string[]; stepsEn: string[];
  pitfallsVi: string[]; pitfallsEn: string[];
  practiceVi: string[]; practiceEn: string[];

  // — mới —
  grammarTable?: {            // bảng quy tắc / chia động từ / mạo từ
    titleVi: string; titleEn: string;
    headers: string[];        // ví dụ ["Infinitiv","Presens","Preteritum","Supinum","Tiếng Việt"]
    rows: string[][];
  };
  dialogue?: {                // hội thoại 6–10 lượt, cột Sv + cột Vi
    titleVi: string; titleEn: string;
    lines: { speaker: string; sv: string; vi: string; en: string }[];
  };
  modelText?: {               // đoạn văn mẫu 60–120 từ + bản dịch
    titleVi: string; titleEn: string;
    sv: string; vi: string; en: string;
  };
  cultureVi?: string;         // 3–5 câu mẹo văn hóa Thụy Điển/Phần Lan-Thụy Điển
  cultureEn?: string;
  quiz?: {                    // 3–5 câu hỏi tự kiểm tra cuối bài (đáp án + giải thích)
    q: string;
    options: string[];
    answer: number;
    explainVi: string; explainEn: string;
  }[];
}
```

### 2. Soạn nội dung deep-dive cho 54 lesson

Chia làm 4 batch (mỗi batch 1 commit, dễ rollback):

- **Batch A** — 14 lesson A1 cơ bản (chào hỏi, đếm, gia đình, đại từ, en/ett, câu hỏi, alphabet, phát âm, màu sắc, quần áo, cơ thể, sức khỏe, daily routine, hobbies)
- **Batch B** — 11 lesson A1 ngữ cảnh (fika, ICA, restaurant, doctor, housing, work, directions, transport, weather, seasons, nature/allemansrätten)
- **Batch C** — 17 lesson A2 (V2, en/ett nâng cao, presens/preteritum/perfekt, modal, imperativ, så att, email, email-pro, future, work, health, housing, transport, doctor-visit, emotions, bank-id)
- **Batch D** — 12 lesson B1 (BIFF, inversion, vocab logic, opinion letter, news Hbl/Yle, discuss, job interview, environment, future, climate-debate, digital-life)

Mỗi lesson bổ sung:
- intro mở rộng 5–7 câu (từ 3 hiện tại)
- 7–10 step (từ 5)
- 5 pitfall (từ 3)
- 5 practice (từ 3)
- 1 grammar table 4–8 hàng
- 1 dialogue 6–10 lượt
- 1 modelText 60–120 từ
- 1 culture note
- 3–5 câu quiz có giải thích

Ưu tiên dữ liệu sát thi YKI Ruotsi và đời sống Phần Lan (Helsinki/Turku/Vasa), không trộn tiếng Anh không cần thiết.

### 3. Render UI mới trong `SwedishTierView.tsx`

Trong cùng accordion lesson hiện có, thêm các block (chỉ render khi field tồn tại):

```text
[Intro] [Steps]                       ← đã có
[GrammarTable]   ← bảng có header gradient brand
[Dialogue]       ← 2 cột Sv | Vi, mỗi line có nút 🔊 dùng speakSwedish
[ModelText]      ← khối card có nút 🔊 đọc cả đoạn
[CultureNote]    ← callout nền accent
[Pitfalls] [Practice]                 ← đã có
[Quiz]           ← multi-choice tự chấm, hiện explain sau khi chọn
```

Tận dụng:
- `SwedishAudioButton` cho mọi nút phát âm.
- `Tabs`/`Card` shadcn đã import sẵn.
- Tokens `--gradient-primary`, `--shadow-elegant` cho điểm nhấn.

### 4. Phân tách file để tránh 1 file 8000+ dòng

```text
src/data/swedish/
  lessonDetailsCore.ts        ← 31 entry hiện tại (đã chuyển)
  lessonDetailsA1Extra.ts     ← lesson A1 còn thiếu + bản nâng cấp
  lessonDetailsA2.ts          ← toàn bộ A2
  lessonDetailsB1.ts          ← toàn bộ B1
  index.ts                    ← merge tất cả, export LESSON_DETAILS
```

`swedishLessonDetails.ts` cũ giữ lại làm re-export shim → không phải sửa import nơi khác.

### 5. Kiểm thử

- `bun run` tự chạy typecheck (TS chặn nếu thiếu field).
- Playwright nhanh: vào `/swedish/yki-a2`, mở accordion `a2-modal`, chụp screenshot xác nhận grammar table + dialogue + quiz hiển thị, bấm 🔊 không lỗi console.
- Kiểm 1 lesson trong mỗi tier để chắc UI không vỡ ở mobile (viewport 375 px).

## Quy ước nội dung

- Tiếng Việt thuần, không em-dash `—`, dùng `-`.
- Diacritics UTF-8 NFC, render bằng `<div>` + `whitespace-pre-wrap` (không `<pre>`).
- Mọi câu Sv đều có thể đọc được bằng pipeline `speakSwedish` đã hoạt động ổn.
- Không thêm locked content, mọi lesson mở hoàn toàn.

## Phạm vi & ước lượng

- File mới/sửa: ~8 file (1 schema, 4 data, 1 component render, 1 shim, 1 plan).
- Volume nội dung: ~54 lesson × ~250 dòng dữ liệu ≈ 13–15k dòng dữ liệu tiếng Việt + Thụy Điển.
- Vì lượng nội dung lớn, sẽ chia 4 lượt phản hồi để batch A → D, mỗi lượt commit độc lập và bạn xem preview ngay được.

## Câu hỏi trước khi triển khai

1. Bạn muốn tôi làm cả 4 batch liên tiếp trong session này (dài, nhiều token) hay chỉ Batch A trước rồi tiếp tục theo yêu cầu?
2. Có muốn thêm **flashcard từ vựng nhúng** (5-8 từ chốt mỗi bài, kéo từ `swedishVocabBank`) ngay trong accordion lesson không, hay giữ tách biệt như hiện nay?

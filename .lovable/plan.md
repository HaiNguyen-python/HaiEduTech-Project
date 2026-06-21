# Chuẩn hoá toàn bộ IELTS Listening Exercise theo định dạng Cambridge

Hiện có ~50+ bài listening trải trên 7 file (`ieltsListeningPractice.ts` + `Expansion1-6`). Mỗi bài cần: transcript dài hơn, đa nhân vật rõ ràng, câu hỏi đúng wording Cambridge, layout form/note chuẩn. Để giữ chất lượng đều và dễ duyệt, mình sẽ làm theo 4 đợt - mỗi đợt là 1 turn riêng và bạn duyệt trước khi mình sang đợt sau.

## Tiêu chuẩn Cambridge áp dụng cho mọi bài

- **Transcript**: 450-750 từ/section (S1 ngắn nhất, S4 dài nhất), nhiều turn hội thoại tự nhiên, có hesitation marks ("um", "well", "actually"), self-correction, và distractor info trước đáp án đúng.
- **Speaker tags**: luôn dùng `Name:` ở đầu dòng để engine multi-voice gán giọng riêng (đã ship).
- **Section 1**: phone/booking dialogue 2 người (1 nam + 1 nữ), form/note completion.
- **Section 2**: monologue 1 người (tour guide, radio host), MCQ hoặc map labelling.
- **Section 3**: 2-3 sinh viên + tutor thảo luận học thuật, matching / MCQ.
- **Section 4**: lecture 1 người, sentence/note completion với từ vựng academic.
- **Câu hỏi**: dùng đúng rubric Cambridge (`Write NO MORE THAN TWO WORDS AND/OR A NUMBER`, `Choose the correct letter, A, B or C`, `Which student says…`). Prompt mô phỏng form/notes thật, không chỉ "Surname: ___".
- **Distractor**: mỗi câu fill-in/MCQ phải có ít nhất 1 thông tin gây nhiễu trong transcript (số sai bị correct, tên gần giống, etc.).

## Layout UI (1 lần cập nhật ở đợt 1)

Thêm renderer "Cambridge Form Layout" cho `ListeningPracticeSetCard`:

```text
┌─ LIBRARY MEMBERSHIP FORM ───────────────────┐
│ Name:           Sarah  (1) __________       │
│ Date of birth:  (2) __________  March 1995  │
│ Address:        42 (3) __________ Road      │
│ Postcode:       (4) __________              │
│ ...                                          │
└──────────────────────────────────────────────┘
```

Bằng cách thêm field optional `formLayout?: string` (template với `{1}`, `{2}`…) trong `ListeningPracticeSet`. Khi có, render thay vì list card riêng lẻ. Bài cũ không có field này vẫn render kiểu cũ → không vỡ.

## Lộ trình 4 đợt

### Đợt 1 (turn tới) - Section 1: Form & Note Completion
- Thêm support `formLayout` vào type + card.
- Viết lại 10-12 bài S1 đầu tiên (library, hotel booking, gym membership, holiday rental, course enrolment, lost property, taxi booking, dental clinic, sports centre, mobile contract).
- Mỗi bài: transcript 2-người ~500 từ, form layout Cambridge, 10 câu/bài.

### Đợt 2 - Section 2: Monologue + Map/Plan Labelling
- ~10-12 bài (museum tour, festival announcement, leisure centre opening, town hall speech, charity event, university campus tour, conservation park, exhibition, theatre, café floorplan).
- Map SVG được nâng cấp cho rõ ràng hơn (đã có pattern sẵn).

### Đợt 3 - Section 3: Academic Discussion
- ~10-12 bài (3 speakers - tutor + 2 students; hoặc 2 students bàn project). Matching / MCQ / hoàn thành ghi chú nghiên cứu.

### Đợt 4 - Section 4: Lecture
- ~10-12 bài (history of X, science topic, social study). Sentence/note completion với academic vocab, summary table.
- Cuối đợt: chạy smoke test tự động và update memory.

## Technical Section

- File ảnh hưởng:
  - `src/data/ieltsListeningPractice.ts` + `ieltsListeningPracticeExpansion[1-6].ts`
  - `src/components/ielts/ListeningPracticeSetCard.tsx` (chỉ đợt 1: thêm form renderer)
- Type mở rộng:
  ```ts
  export interface ListeningPracticeSet {
    // ...existing fields
    formLayout?: string;   // template chứa {1}…{N} cho fill-in
    formTitle?: string;    // VD "LIBRARY MEMBERSHIP FORM"
  }
  ```
- Renderer mới: khi `formLayout` tồn tại, parse `{n}` → render `<Input>` inline; vẫn dùng `answers[n-1]` state hiện có; giữ nguyên grading.
- Không đụng backend / DB.
- Mỗi đợt là 1 commit lớn → bạn có thể rollback từng đợt nếu muốn.

## Sau mỗi đợt

- Mình chạy `bunx vitest run` (nếu có test) và đọc lại 1-2 bài trên preview để chắc audio + form render đúng.
- Báo lại progress + xin OK trước khi vào đợt sau.

Bấm Approve để mình bắt đầu **Đợt 1** ngay.

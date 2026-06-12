## Mục tiêu

1) **Audit** toàn bộ 4 bộ Listening (Section 1–4) và 2 đề Reading (rx-cam-3, rx-cam-4) vừa tạo để bảo đảm không có lỗi kỹ thuật/logic.
2) **Bổ sung** đề mới (Listening + Reading) đã được kiểm tra chéo từng câu trước khi commit.

---

## Phần A — Rà soát các bài đã tạo

### A1. Listening (file `ieltsListeningPracticeExpansion5.ts`)

Kiểm tra từng đáp án dò ngược về transcript:

- **form-library-membership (Section 1)** — đối soát: Bennett, 1998, Standard, 8 books, £15, Oakwood, GF3 4NY, 44 (giữa 07712 và 859), book club, journal. Sửa wording prompt postcode/mobile cho rõ format chấm (case-insensitive, có space).
- **monologue-community-garden (Section 2)** — đối soát: 2011, car park, greenhouse, 4 pm, composting, herbs. Kiểm tra `options[index]` cho đúng đáp án (đặc biệt câu 4 pm = index 1).
- **discussion-history-project (Section 3)** — đối soát từng vai (Liam=A, Hana=B, Oliver=C). Kiểm tra phép "đảo vai" cuối đoạn (Oliver thiết kế poster, Liam viết intro, Hana audio).
- **lecture-bees-decline (Section 4)** — đối soát: third, 70, habitat, navigation, Varroa, 40, two, refuges. Kiểm tra giới hạn "NO MORE THAN TWO WORDS or a number".

### A2. Reading (file `ieltsFullReadingExamsExpansion2.ts`)

- **rx-cam-3 (Electric Buses)**: 13 câu, đánh số 1–13 liên tục, heading A/B/C/D, MCQ, fill-blank đều có thể truy được câu/đoạn nguồn. Kiểm chéo answer string khớp tuyệt đối với 1 trong các `options` (so sánh case-sensitive trong UI? — nếu UI dùng equality cứng, mọi answer phải copy nguyên văn từ option).
- **rx-cam-4 (Bicycles)**: phát hiện **lỗ hổng đánh số** — hiện chỉ có heading cho A, B, D, E (thiếu C và F). Numbering nhảy 1→2→3 (cho D)→4 (cho E)→5. Cần:
  - hoặc bổ sung heading cho paragraph C (Health benefits) để có 5 heading liên tục,
  - hoặc giữ 4 heading nhưng đánh số đề rõ "Paragraphs A, B, D, E" để học sinh không bối rối.
  Chọn phương án bổ sung heading C để giữ pattern Cambridge.

### A3. Lecture file `ieltsLecturesExpansion5.ts`

- Kiểm tra mọi `StrategyStep` chỉ có các field hợp lệ (`step/title/titleVi/description/descriptionVi/example`) — đã sửa 1 lỗi `why` ở bài Technology, rà soát thêm lần cuối.
- Kiểm tra mọi `quiz` có `answer` (index) nằm trong khoảng `[0, options.length-1]`.
- Kiểm tra `mistakesToAvoid` không lẫn property lạ (`why` ở đây là hợp lệ).

### A4. Cross-cutting checks

- ID không trùng giữa các Expansion file:
  - Listening: `form-library-membership`, `monologue-community-garden`, `discussion-history-project`, `lecture-bees-decline` — sẽ grep toàn bộ thư mục để chắc chắn unique.
  - Reading: `rx-cam-3`, `rx-cam-4` — đối chiếu với `ieltsListeningLessonMap.ts` và `ieltsFullTests.ts`.
- Verify build pass (TypeScript) — sau khi sửa xong.
- Smoke-test bằng `browser--view_preview` các route `/english/learn/ielts-listening-practice` và `/english/learn/ielts-reading-practice` để đảm bảo card render & chấm điểm chạy.

---

## Phần B — Thêm đề mới (đã kiểm tra trước khi commit)

### B1. Listening — Thêm 4 bộ mới (1 cho mỗi Section)

File mới: `src/data/ieltsListeningPracticeExpansion6.ts`

| ID | Section | Dạng | Chủ đề |
|---|---|---|---|
| `form-cooking-class` | 1 | Form Completion | Đăng ký lớp nấu ăn cuối tuần |
| `monologue-art-gallery` | 2 | Multiple Choice | Hướng dẫn tham quan triển lãm |
| `discussion-marketing-pitch` | 3 | Matching (A/B/C) | Sinh viên chia việc pitch marketing |
| `lecture-microplastics` | 4 | Sentence Completion | Bài giảng về vi nhựa trong đại dương |

Quy trình tạo từng bộ:
1. Viết transcript ngắn, câu rõ ràng, có speaker tag (TTS pacing).
2. Soạn câu hỏi theo thứ tự xuất hiện trong transcript.
3. **Tự audit**: tô đậm trong đầu từng đáp án trên transcript, kiểm tra `options[index]` (MCQ) trỏ đúng chuỗi, kiểm tra giới hạn từ.
4. Đảm bảo ≥5 câu mỗi bộ; Section 1 dùng 10 câu, Section 2–3 dùng 6 câu, Section 4 dùng 7–8 câu.

### B2. Reading — Thêm 2 đề mới

File mới: `src/data/ieltsFullReadingExamsExpansion3.ts`

| ID | Title | Cấp độ |
|---|---|---|
| `rx-cam-5` | Test 9 — The Return of the Wolf to European Forests | Medium |
| `rx-cam-6` | Test 10 — How Coffee Reshaped the World | Medium |

Mỗi đề có:
- Passage 5–6 đoạn (A–F).
- 13 câu = 4–5 matching-headings + 4 MCQ + 4–5 fill-blank.
- Mọi `answer` (MCQ) là chuỗi copy nguyên văn từ `options`.
- Fill-blank ≤ 2 từ, lấy nguyên văn từ passage.
- Audit bằng cách: với mỗi câu, ghi chú đoạn nguồn ngay bên cạnh trong comment dev (rồi xóa trước commit).

### B3. Wire-up

- `IeltsListeningPractice.tsx`: import + nối `ieltsListeningPracticeSetsExpansion6`.
- `IeltsReadingPractice.tsx`: import + nối `IELTS_FULL_READING_EXAMS_EXPANSION3`.

---

## Phần C — QA cuối

1. `tsc` clean (do harness tự chạy).
2. `browser--view_preview` trên 2 route:
   - `/english/learn/ielts-listening-practice` — bật từng set mới, bấm "Show transcript" & "Show answers", chấm thử 1 câu.
   - `/english/learn/ielts-reading-practice` — mở `rx-cam-5`, chấm thử ≥3 câu.
3. Confirm không có console error.

---

## Chi tiết kỹ thuật (cho dev)

- `ListeningPracticeSet.questions[i].answer` cho `fill-in` so sánh case-insensitive (đã có trong card) — vẫn cần giữ casing chuẩn cho UX khi reveal.
- `mcq.answer` là **index** vào `options[]`, KHÔNG phải chuỗi.
- `matching.answer` là **letter** (A/B/C) khớp `matchingOptions[].letter`.
- `ReadingExam.questions[i].answer` luôn là **string**; MCQ phải khớp tuyệt đối với 1 phần tử `options` (UI làm `String(...).trim().toLowerCase()` compare — sẽ verify trong file `IeltsReadingPractice.tsx` trước khi commit).
- `matching-headings.headings[].label` (i/ii/iii/...) là chuỗi đáp án.

---

## Phạm vi không động đến

- Logic chấm điểm, scoring band của Listening/Reading.
- Các Lecture cũ ngoài 8 bài Expansion5.
- Backend/Supabase.

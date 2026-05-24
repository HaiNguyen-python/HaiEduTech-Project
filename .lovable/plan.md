
## Hiện trạng (sau khi rà soát)

- **12 bài hiện có** trong `src/pages/AIAcademy.tsx` (TRACKS): Vision, NLP, Neural Net, GenAI, RL, Ethics, Recsys, AIoT, Capstone, Deepfake, Agent, Graduation. Nội dung mở rộng nằm ở `src/data/aiAcademyContent.ts` (Vietnam case, Golden tip, Glossary, Careers, Homework, External demos).
- **Ngôn ngữ**: `AIAcademy.tsx` **KHÔNG** import `useLanguage()`. Mọi text (title, tagline, story, glossary, quiz, sandbox UI) đều hard-code tiếng Việt → toggle EN/VI ở header không có tác dụng cho khu vực này. Các sandbox component cũng gần như 100% tiếng Việt cứng.

---

## Phần A — Bổ sung bài học cho HS cấp 2–3 Việt Nam

### Đánh giá độ phủ hiện tại

12 bài đã phủ tốt nền tảng kỹ thuật (Vision/NLP/NN/GenAI/RL/Recsys/AIoT/Agent) + 2 bài "mềm" (Ethics, Deepfake) + Capstone + Graduation. Tuy nhiên còn **thiếu 4 mảng** rất cần cho học sinh VN trong giai đoạn 2025–2030:

| # | Bài đề xuất | Vì sao cần cho HS VN |
|---|---|---|
| **13** | **🎓 AI & Học tập thông minh** (AI for Study) — Cách dùng ChatGPT/NotebookLM/Gemini học bài, ôn thi THPT QG, IELTS, không bị "AI làm hộ" | Trực tiếp giải quyết nỗi sợ "AI làm thay" của phụ huynh + dạy kỹ năng prompt cho việc học |
| **14** | **💼 AI & Nghề nghiệp tương lai** (AI Careers Map VN) — Bản đồ nghề AI tại VN (FPT.AI, VinAI, Zalo, VNG, MoMo) + lộ trình từ lớp 10 → ĐH → Job | Định hướng nghề, kết nối với Counseling Hub |
| **15** | **🧠 AI & Tư duy phản biện** (Critical Thinking with AI) — Cách phát hiện hallucination, fact-check, không tin AI mù quáng | Tránh "thế hệ ngu hơn vì AI" — kỹ năng sống còn |
| **16** | **🔐 AI & An toàn số** (AI Safety for Teens) — Lừa đảo giả giọng, deepfake bạn cùng lớp, AI bot dụ dỗ trên MXH, bảo vệ dữ liệu cá nhân | Bài Ethics & Deepfake hiện thiên về lý thuyết; bài này nói thẳng về tình huống thực tế HS gặp trên Zalo/TikTok |

(Tùy chọn nâng cao nếu Thầy muốn):
- **17** AI trong Toán/Lý/Hóa (Wolfram, PhotoMath, AlphaProof) — gợi ý cho HS giỏi Toán
- **18** Khởi nghiệp với AI (No-code AI: Lovable, Bolt, Cursor) — gắn với chính HaiEduTech

### Cấu trúc mỗi bài mới (giữ đồng nhất với 12 bài cũ)

- Thêm entry vào `TrackId` + `TRACKS[]` trong `AIAcademy.tsx` (title, tagline, icon, color, story, sandbox component, quiz, badge).
- Thêm entry tương ứng vào `TRACK_EXTRAS` trong `aiAcademyContent.ts` (vietnamCase, goldenTip, glossary, careers, homework, externalDemo).
- Tạo 4 sandbox mới trong `src/components/ai-academy/`:
  - `StudySmartSandbox.tsx` — "Prompt Coach": HS gõ câu hỏi học bài, AI gợi ý prompt tốt hơn + mô phỏng kết quả Hay/Dở.
  - `CareersMapSandbox.tsx` — bản đồ nghề tương tác: chọn sở thích (Toán/Vẽ/Ngôn ngữ/Code) → highlight 3 nghề AI phù hợp tại VN + range lương.
  - `FactCheckSandbox.tsx` — "Phát hiện AI nói xạo": show 5 câu trả lời ChatGPT (3 đúng, 2 hallucinate), HS chọn → giải thích red-flag.
  - `DigitalSafetySandbox.tsx` — "Lừa đảo deepfake giọng bố/mẹ": kịch bản chat/cuộc gọi giả, HS chọn xử lý đúng.

---

## Phần B — i18n hoá AI Academy (EN/VI)

### Vấn đề

`AIAcademy.tsx` không gọi `useLanguage()` → toggle EN/VI ở header chỉ đổi navbar, không đổi nội dung bài học. Đây là lỗi đồng nhất với phần còn lại của app.

### Cách triển khai (gọn, không phá vỡ cấu trúc)

1. **Mở rộng schema dữ liệu** — thêm field song ngữ:
   - `Track`: thêm `titleEn`, `taglineEn`, `story.bodyEn`, `quiz[].questionEn`, `quiz[].optionsEn`, `quiz[].explanationEn`, `badge.nameEn`.
   - `TrackExtra` (`aiAcademyContent.ts`): thêm `vietnamCase.titleEn/bodyEn`, `goldenTipEn`, `glossary[].termEn/defEn`, `careersEn`, `homeworkEn`, `externalDemo[].labelEn`, `safetyNote.titleEn/bodyEn`.

2. **Thêm helper `t(vi, en)`** từ `useLanguage()` ở `AIAcademy.tsx` và mọi nơi render text → bọc qua `t(track.title, track.titleEn)`.

3. **Các sandbox component**: import `useLanguage`, bọc tất cả label/tooltip/button tiếng Việt cứng (hiện có 14+ file). Mỗi sandbox có ~20–60 chuỗi → tổng ~500 chuỗi.

4. **Bonus games** (`SandboxBonusGames.tsx`, `SandboxMiniActivity.tsx`, `MiniCVChallenges.tsx`, `DragDropQuiz.tsx`): truyền thêm prop `tfItems` & `matchPairs` dạng `{vi, en}` thay vì string thuần.

5. **Quiz data** (`aiAcademyQuizExtras.ts`): nhân bản EN cho toàn bộ câu hỏi.

### Khối lượng dịch

- ~12 story × 200 từ = 2.400 từ
- 12 vietnamCase + 12 goldenTip + ~60 glossary terms + ~50 careers + 12 homework + ~36 demo labels = ~3.000 từ
- ~60+ quiz questions × 4 options = ~250 câu cần dịch
- ~500 chuỗi UI sandbox

→ Em sẽ dịch trực tiếp trong code (tự viết EN tự nhiên, không dùng Google Translate), giữ thuật ngữ kỹ thuật chuẩn quốc tế (token, embedding, backprop…) và tone gần gũi như bản VN.

---

## Phần C — Phạm vi file thay đổi (dự kiến)

- `src/pages/AIAcademy.tsx` — i18n + thêm 4 track mới + import 4 sandbox mới.
- `src/data/aiAcademyContent.ts` — thêm field EN + 4 entry mới.
- `src/data/aiAcademyQuizExtras.ts` — thêm `questionEn`/`optionsEn`.
- **Mới**: `StudySmartSandbox.tsx`, `CareersMapSandbox.tsx`, `FactCheckSandbox.tsx`, `DigitalSafetySandbox.tsx`.
- 14 sandbox cũ — i18n hóa chuỗi UI.
- `SandboxBonusGames.tsx`, `SandboxMiniActivity.tsx` — đổi shape props sang `{vi, en}`.

---

## Câu hỏi cần Thầy xác nhận trước khi build

1. **Số bài mới**: thêm đủ **4 bài** (Study / Careers / Critical Thinking / Digital Safety), hay thêm cả **6 bài** (gồm 2 tùy chọn AI-Toán + AI-Khởi nghiệp)?
2. **i18n phạm vi**: dịch toàn bộ (story + sandbox UI + quiz + extras), hay chỉ dịch phần khung (title/tagline/story/extras) còn sandbox UI giữ VN ở giai đoạn 1?
3. **Thứ tự build**: làm i18n trước rồi thêm bài mới (an toàn), hay thêm 4 bài mới trước rồi i18n cả lô (tiết kiệm 1 lượt sửa)?

Sau khi Thầy chốt, em sẽ chuyển sang **Build mode** và thực hiện theo đúng phạm vi đã duyệt.

# Kế hoạch nâng cấp HSK Program

Tổng 14 module, chia 3 đợt theo ưu tiên. Mỗi đợt là 1 turn riêng để không quá tải. **Đợt 1 bắt đầu với HSKK Speaking Room** theo yêu cầu.

---

## 🥇 ĐỢT 1 — P1 (5 module quan trọng nhất)

### 1. HSKK Speaking Room (làm TRƯỚC TIÊN)
- Tạo `src/pages/HskkSpeakingRoom.tsx` + route `/chinese/hsk/hskk`.
- 3 cấp độ tab: **HSKK Sơ cấp** (HSK 1-2), **Trung cấp** (HSK 3-4), **Cao cấp** (HSK 5-6).
- Mỗi cấp đủ 3 phần đúng format thi thật:
  - **Phần 1 — Đọc to (听后重复/朗读)**: TTS đọc câu mẫu → học sinh ghi âm lại → so khớp bằng Web Speech API (zh-CN) → chấm % độ chính xác từng âm tiết + đánh dấu chữ sai.
  - **Phần 2 — Nghe và đáp**: hiện câu hỏi gợi ý + đếm ngược thời gian chuẩn bị/trả lời → ghi âm → transcript live → AI (Lovable AI Gateway, `google/gemini-2.5-flash`) chấm 4 tiêu chí (phát âm, lưu loát, ngữ pháp, nội dung) theo rubric HSKK.
  - **Phần 3 — Trả lời câu hỏi mở / Thuật lại**: prompt 2-3 phút, hiển thị bộ đếm, ghi âm, AI feedback song ngữ VI/EN.
- Dữ liệu prompt: `src/data/hskkPrompts.ts` (20 prompt/cấp = 60 prompt), trích từ `hskExamGuide.ts:467` + bổ sung mới.
- Edge function `supabase/functions/hskk-grade/index.ts` gọi Lovable AI, validate Zod, trả về JSON `{scores, feedback_vi, feedback_en, suggestions[]}`.
- Lưu lịch sử ghi âm vào `hskk_attempts` (Supabase + RLS user_id).
- Card "HSKK Speaking" gắn vào `HskHub.tsx` và `Chinese.tsx`.

### 2. SRS Flashcard Engine (FSRS chuẩn)
- Hook `useSrsScheduler.ts` cài thuật toán **FSRS-4.5** (lightweight, ~250 dòng) với 4 nút "Again / Hard / Good / Easy".
- Bảng `vocab_srs_state` (user_id, word_key, stability, difficulty, last_review, due_date, reps, lapses) + RLS.
- Page `/chinese/hsk/srs-review`: hiện queue "due today", flashcard có Hanzi + Pinyin + Stroke order + ví dụ + TTS, nút đánh giá → cập nhật interval.
- Tích hợp vào `HskVocabulary.tsx`: nút "📥 Thêm vào SRS" trên mỗi card, badge "🔁 N từ cần ôn hôm nay".
- Widget "Daily Review" trên `HskHub.tsx`.

### 3. Tone Drill Module
- Tạo `src/pages/HskToneDrill.tsx` + route `/chinese/hsk/tone-drill`.
- 4 chế độ luyện:
  - **Single Tone**: nghe 1 âm → chọn 1-2-3-4-neutral.
  - **Tone Pair**: nghe 2 âm liền (mā má, mǎ mà…) → chọn cặp đúng (16 cặp).
  - **Minimal Pair**: nghe từ thật (买 mǎi vs 卖 mài) → chọn nghĩa.
  - **Sandhi Drill**: 3-3 sandhi (你好 nǐ→ní hǎo), 不/一 tone change.
- Audio: TTS zh-CN qua existing util + bộ 200 cặp từ trong `src/data/toneDrillBank.ts`.
- Gamify: streak, accuracy, leaderboard tích hợp `game_scores` (game_type = `tone_drill`).

### 4. Listening HSK 6-9 + Interactive Comprehension
- Mở rộng `chineseListeningVideos.ts`: thêm 15-20 video cho HSK 6, 10 cho HSK 7-9 (TED-Ed Trung, CCTV, học thuật).
- Mỗi video thêm field mới: `segments: [{start, end, transcript_zh, transcript_pinyin, transcript_vi, questions:[{q, options, answer}]}]`.
- Refactor `ChineseListening.tsx`: thêm chế độ "Interactive Mode" — hiện player YouTube với checkpoint mỗi 30-60s, hiện câu hỏi trắc nghiệm, replay đoạn, transcript ẩn/hiện song ngữ.
- Lưu progress vào `lesson_attendance` (lesson_type='listening').

### 5. Writing Section thực + AI chấm điểm
- Refactor `HskTestRoom.tsx` Writing section:
  - HSK 1-3: drag-to-order Hanzi thành câu + viết Hán tự từ pinyin gợi ý (textarea + IME).
  - HSK 4-5: viết đoạn 80 từ từ 5 từ cho sẵn + viết đoạn 80 từ từ ảnh (dùng placeholder).
  - HSK 6: viết tóm tắt 400 từ sau khi đọc passage 1000 từ.
- Edge function `hsk-writing-grade`: rubric 5 tiêu chí (nội dung, từ vựng, ngữ pháp, cấu trúc, chính tả Hanzi), thang 0-100 + sửa từng câu + gợi ý nâng cấp.
- Hiển thị feedback contrast cao (theo chuẩn AI Grading hiện có).
- Export PDF kết quả (như IELTS Grading).

---

## 🥈 ĐỢT 2 — P2 (5 module lấp khoảng trống)

### 6. Dictation Module (听写)
- Page `/chinese/hsk/dictation` với 3 chế độ:
  - **Character Dictation**: nghe từ → gõ Hanzi (IME PinYin gợi ý) hoặc vẽ trên canvas.
  - **Sentence Dictation**: nghe câu 5-15 chữ → gõ lại đầy đủ.
  - **Pinyin Dictation**: nghe → gõ pinyin + tone số.
- Chấm word-by-word, highlight chỗ sai đỏ, đúng xanh. Tốc độ chỉnh được (0.6× / 1×).

### 7. Handwriting Canvas
- Cài `hanzi-writer` (đã quen) — mở rộng `HanziStrokeOrder.tsx` thêm prop `mode: 'animate' | 'quiz' | 'practice'`.
- Mode "Practice": học sinh vẽ trên canvas, so khớp nét, gợi ý nét tiếp theo, chấm điểm đúng/sai từng nét.
- Tích hợp nút "✍️ Tự viết" trên mọi flashcard HSK Vocabulary.

### 8. Chengyu / Thành ngữ Module
- File `src/data/chengyuBank.ts`: 300 thành ngữ HSK 4-9 (典故 + 字面 + 比喻 + ví dụ + cấp HSK).
- Page `/chinese/hsk/chengyu`: 
  - Tab Browse (search/filter theo HSK level + chủ đề).
  - Tab Story (đọc 故事 nguồn gốc + minh họa watercolor).
  - Tab Quiz (matching + fill blank + chọn nghĩa).
- Tích hợp SRS từ module #2.

### 9. Grammar HSK 7-9
- Mở rộng `hskGrammar.ts`: thêm type `level: 7 | 8 | 9`, ~60 điểm ngữ pháp cao cấp (虚词文学性, 被字句变体, 文言遗留, 学术连接词…).
- Mỗi điểm: giải thích VI/EN sâu hơn, 3-5 ví dụ học thuật, common mistake, exercise mini.

### 10. Business Chinese HSK 3-6
- Mở rộng `chineseHskBusinessExpansion.ts` từ HSK 1-2 lên thêm HSK 3-6.
- 4 chủ đề mỗi cấp: họp/thương lượng, email/báo cáo, trình bày, tài chính/hợp đồng. Dialogue + vocab + role-play prompt.

---

## 🥉 ĐỢT 3 — P3 (4 module nâng chất lượng)

### 11. Progress Dashboard (Chinese)
- Tab "📊 Tiến độ tiếng Trung" trên `Chinese.tsx`.
- Tổng hợp: % vocab mastered từng cấp, grammar topics hoàn thành, mock test scores 1-9, listening/reading completed, SRS streak, HSKK best scores. Radar chart + bar chart (Recharts).

### 12. Reading HSK 6-9
- Mở rộng `chineseReadingPractice.ts` cho HSK 6-9: passages báo chí, học thuật, văn học. Mỗi passage 600-1500 chữ + 8-12 câu hỏi.

### 13. Vocabulary in Context (KWIC)
- Hook `useKwicSentences(word)` truy vấn 3-5 ví dụ từ pool có sẵn (`chineseConversationalCurriculum`, reading, listening transcripts).
- Hiển thị trong flashcard expand: "📖 Trong ngữ cảnh thật" với highlight từ vựng.

### 14. Mock Test HSK 7-9 đầy đủ
- Nâng `hsk7.ts`, `hsk8.ts`, `hsk9.ts` từ ~100 dòng lên ~500 dòng/cấp đúng format đề thật (40 listening + 60 reading + 2 writing tasks).

---

## 🛠️ Chi tiết kỹ thuật

### Schema mới cần migration
```text
hskk_attempts (user_id, level, part, prompt_id, audio_url?, transcript, scores jsonb, feedback jsonb)
vocab_srs_state (user_id, subject, word_key, stability, difficulty, due_date, reps, lapses)
hsk_writing_attempts (user_id, level, task_type, content, grade jsonb)
```
Tất cả RLS theo `auth.uid() = user_id`, GRANT cho `authenticated` + `service_role`.

### Edge functions mới
- `hskk-grade` — chấm 3 phần HSKK (Lovable AI Gateway).
- `hsk-writing-grade` — chấm writing 5 tiêu chí.
- Cả 2 đều có Zod validation, CORS, rate limit, log vào `api_usage_log`.

### Tích hợp
- Memory `mem://features/hsk-vocabulary-bank` cập nhật thêm SRS + handwriting.
- Tạo memory mới `mem://features/hskk-speaking-room` cho HSKK system.
- Navigation: `HskHub.tsx` thêm 5 card mới (HSKK, SRS, Tone Drill, Dictation, Chengyu).

### Quy ước
- Hanzi luôn `font-chinese`, fallback `'PingFang SC'`.
- Tuân thủ design system (Royal Blue → Soft Emerald gradient, semantic tokens, không hard-code màu).
- TTS zh-CN rate 0.85 mặc định, có nút 0.6× cho người mới.
- Mobile-first, lg breakpoint 1024px.
- Mọi text VN dùng `<div>`/`<p>` + `whitespace-pre-wrap`.

### Thứ tự thực thi
1. **Turn này (Đợt 1)**: HSKK Speaking Room → SRS → Tone Drill → Listening HSK 6-9 → Writing AI chấm. Có thể nặng → nếu vượt giới hạn, ưu tiên xong HSKK + SRS + Tone Drill, 2 cái còn lại sang turn kế.
2. **Turn sau (Đợt 2)**: Dictation → Handwriting → Chengyu → Grammar 7-9 → Business 3-6.
3. **Turn cuối (Đợt 3)**: Dashboard → Reading 6-9 → KWIC → Mock test 7-9.

Sau mỗi đợt sẽ báo cáo file đã thay đổi và những điểm cần bạn xem trong preview.

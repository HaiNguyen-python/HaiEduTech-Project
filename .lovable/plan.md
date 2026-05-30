
# Rà soát IELTS Listening Practice

## Hiện trạng (đã có)
- 4 Sections, ~25+ bộ đề, đủ các dạng: Form/Note Completion, MCQ, Matching, Map Labelling, Sentence Completion.
- Player TTS có pause/stop, skip ±1 câu, seek bar, 4 mức tốc độ, ẩn/hiện transcript, đếm điểm tức thì, hỗ trợ `mapSvg` + `matchingOptions`.
- Trang `/ielts-listening-practice` filter theo section.

## Điểm yếu phát hiện
1. **Không có chế độ phòng thi thật**: nghe 1 lần, không xem transcript, có timer 30s/câu cuối → khác xa Cambridge format.
2. **Không có Full Test (40 câu, 30 phút)** — chỉ có set rời.
3. **TTS chỉ 1 giọng en-GB** — Cambridge thật có nhiều giọng (AU, US, IND); thí sinh quen 1 giọng sẽ "sốc" khi thi.
4. **Không lưu tiến độ / lịch sử điểm** — làm xong refresh là mất.
5. **Không có band-score estimator** (40 câu → Band 0-9 chuẩn IELTS).
6. **Không highlight keywords trong transcript** sau khi nộp — khó tự rà soát chỗ nghe sót.
7. **Không có "AI giải thích câu sai"** (đã làm cho Reading nhưng Listening chưa).
8. **Không có chatbot trên overlay** (nếu thêm exam mode sẽ lặp lại lỗi z-index như Reading).
9. **Không có dictation mode** (nghe → gõ lại từng câu) — kỹ thuật luyện tai vàng cho band 6.5+.
10. **Chatbot floating notebook chưa được nhắc trên trang Listening Practice** — học viên không biết để save vocab nghe được.
11. **Không có "shadowing"** — nghe và lặp lại để luyện pronunciation/intonation.
12. **Không có thống kê dạng câu yếu** (vd: bạn sai 70% câu Matching → ưu tiên luyện).

## Đề xuất nâng cấp — 3 đợt

### Đợt A — Trải nghiệm thi & lưu trữ (ưu tiên cao)
1. **Exam Mode (mô phỏng đề thật)**: 1 lần phát, ẩn transcript & seek bar, hiện timer + 10 phút "transfer answers".
2. **Full Test 40 câu**: gom 4 sets thành 1 bài hoàn chỉnh, tính Band Score chuẩn IELTS (bảng quy đổi 16→5.0, 23→6.0, 30→7.0, 35→7.5, 39→9.0).
3. **Auto-save tiến độ** (localStorage `ielts-listening-progress::{setId}`) — debounce 400ms, restore khi mở lại.
4. **Lịch sử & thống kê**: lưu lịch sử điểm + dạng câu yếu vào Supabase (bảng `ielts_listening_attempts`).

### Đợt B — Luyện sâu (AI + kỹ thuật học)
5. **AI Explain câu sai (Perplexity sonar)** — bấm vào câu sai → AI chỉ ra câu/từ trong transcript chứa đáp án + bẫy distractor.
6. **Dictation Mode**: nghe từng câu → gõ lại → chấm word-level diff (đã có cho Vietnamese, port sang đây).
7. **Shadowing Mode**: nghe 1 câu → mic ghi âm → so sánh sample.
8. **Keyword highlight trong transcript** sau khi nộp: tô vàng câu chứa đáp án, tô đỏ distractor.
9. **Save vocab to Notebook**: tap từ trong transcript → lưu vào FloatingNotebook (đã có).

### Đợt C — Đa giọng & gamification
10. **Đa giọng Anh**: cho chọn voice (UK/US/AU) + "Random accent" mode.
11. **Band Score Tracker**: biểu đồ tiến bộ Band theo thời gian (Recharts).
12. **Daily Listening Streak**: 1 bài/ngày → tích sao, tích hợp leaderboard có sẵn.
13. **Floating ChatBot z-[80]** + FloatingNotebook hiện sẵn trên trang Practice (giống Reading fix vừa rồi).

## Kỹ thuật chính
- `IeltsListeningExamRoom.tsx` mới (overlay z-[60], chatbot z-[80]).
- `src/lib/ieltsListeningBand.ts` — band conversion table.
- Edge function `explain-ielts-listening` (Perplexity sonar-pro), reuse pattern của `explain-ielts-reading`.
- Migration: `ielts_listening_attempts (user_id, set_id, score, total, band, weak_types jsonb, created_at)` + RLS auth.uid().
- Voice picker: filter `speechSynthesis.getVoices()` theo `en-GB|en-US|en-AU`, lưu chọn vào localStorage.
- Reuse `FloatingNotebook` + `ChatBot` global mount; chỉ cần thêm `/ielts-listening-practice` vào `GlobalSuperDictionary` ALLOWED_PREFIXES.

## Câu hỏi cho bạn
1. Làm **đợt nào trước**? Khuyến nghị Đợt A (giá trị cao nhất, ít rủi ro).
2. Full Test 40 câu: tạo **bộ mới** (curated) hay **tự ghép ngẫu nhiên** từ pool sẵn có?
3. Đa giọng Anh: dùng **Web Speech API** miễn phí (giọng phụ thuộc browser) hay tích hợp **ElevenLabs/Google Cloud TTS** (chất lượng cao, tốn $)?
4. Có muốn **đồng bộ tiến độ qua Supabase** (yêu cầu login) hay **chỉ localStorage** là đủ?

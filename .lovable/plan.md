# Rà soát mục SAT — Đề xuất bổ sung

## Hiện trạng (đã có)
- **Landing**: `EnglishCourse` (SAT card xanh lá), `SatLandingExtras` (format, band roadmap, pain points, FAQ).
- **Học**: `SatCurriculum` + `satTeachingSequence` (dạy nối tiếp), `LanguageLessonView` (theory/exercises/quiz, quiz đã được pad ≥5 câu qua `satQuizBuilder`).
- **Luyện**: `SatExercises`, `SatVocabulary` (flashcard + list), `SatMockExam`, `SatExams`, `SatRoadmap`, `SatClimber` (gamification), `SatStarToggle`.
- **Data**: 13 file `englishSatExpansion*` + `satVocabExpansion4` (đủ rộng về nội dung).

## Khoảng trống đáng bổ sung

### 1. Error Log / Mistake Notebook (ưu tiên cao)
Trang `/sat/error-log` lưu mọi câu sai từ quiz, exercises, mock exam vào Supabase (`sat_mistakes`: user_id, lesson_id, question, chosen, correct, explanation, tag, mastered_at). Hiển thị theo dạng câu hỏi (Words in Context, Evidence, Linear Eq…), nút "Ôn lại đến khi đúng 2 lần liên tiếp".

### 2. Bluebook-style Timed Drill Mode
Thêm chế độ "Timed" cho `SatExercises` và mỗi lesson: 71s/câu R&W, 95s/câu Math, đếm ngược, nút Flag/Review giống Bluebook, báo cáo pace cuối phiên. Bổ sung cảm giác phòng thi thật.

### 3. Desmos & Formula Quick-Reference
Component `SatMathToolkit` mở dạng drawer trong các lesson Math:
- Embed Desmos calculator (iframe `desmos.com/calculator`).
- Bảng công thức tóm tắt (Algebra, Geometry, Trig, Stats) — chỉ những công thức SAT cho sẵn + những công thức học sinh cần thuộc.

### 4. Question-Type Strategy Cards
Mỗi lesson R&W gắn 1 "Strategy Card" tái sử dụng (Words in Context, Command of Evidence, Rhetorical Synthesis, Transitions, Boundaries…): 3 bước giải + 1 ví dụ minh hoạ + 1 bẫy thường gặp. Lưu ở `src/data/satStrategyCards.ts`, render bằng component `<StrategyCard/>` chèn đầu phần Theory.

### 5. Reading-Speed Trainer
Mini-tool `/sat/reading-pace`: hiển thị passage 25–150 từ, đếm thời gian đọc, tính WPM, so với mục tiêu 250 wpm. Có 30 passage mẫu, lưu lịch sử.

### 6. Daily Warm-up (5 câu / ngày)
Widget trên Dashboard + trang `/sat/daily`: random 5 câu từ pool (2 R&W, 2 Math, 1 vocab). Liên kết Study Streak hiện có. Hoàn thành tặng sao SatStars.

### 7. Adaptive Score Predictor
Sau mỗi mock + ≥20 câu drill: tính band dự đoán dựa trên % đúng theo từng question-type, hiển thị card "Bạn đang ở khoảng 1280–1340, cần +60 ở Math Algebra để chạm 1400". Logic thuần client (`src/lib/satScorePredictor.ts`).

### 8. Test-Day Checklist & Bluebook Setup Guide
Trang `/sat/test-day`: checklist trước thi (ID, snack, calculator, charger), hướng dẫn cài Bluebook (Win/Mac/iPad), video walk-through, mock đăng ký timeline. Liên kết từ FAQ.

## Phụ trợ (nhỏ, tuỳ chọn)
- **Vocab → Lesson link**: mỗi từ trong `SatVocabulary` link tới lesson đã dùng nó.
- **Audio đọc passage**: thêm TTS cho R&W passages (đã có infra `vietnamese-tts`/`finnish-tts`, dùng Google TTS en-US).
- **Progress dashboard SAT** riêng: % lesson hoàn thành theo module, accuracy trung bình, streak SAT.
- **Print/PDF export** error log để học sinh ôn offline.

## Đề xuất thứ tự triển khai (gợi ý)
1. Error Log (impact cao, dùng Supabase, nền tảng cho #7)
2. Strategy Cards + Formula/Desmos toolkit (cải thiện chất lượng giảng ngay)
3. Timed Drill Mode + Daily Warm-up (tạo thói quen luyện tập)
4. Reading-Speed Trainer + Score Predictor
5. Test-Day Checklist + phụ trợ

## Chi tiết kỹ thuật
- Bảng mới: `sat_mistakes`, `sat_daily_log` (RLS theo `auth.uid()`, GRANT đầy đủ cho `authenticated` + `service_role`).
- Reuse `useSatStars`, `useStreak`, `satTeachingSequence`.
- Không thay đổi `client.ts` / `types.ts` / `.env`.
- Tất cả màu dùng semantic tokens; viền giữ `border-emerald-500` đồng bộ thẻ SAT.

Hãy cho mình biết bạn muốn làm **tất cả 8 mục** theo thứ tự, hay chọn **1–3 mục ưu tiên** để bắt tay vào ngay.

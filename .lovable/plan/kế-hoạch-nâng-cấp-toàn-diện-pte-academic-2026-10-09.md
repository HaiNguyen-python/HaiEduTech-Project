# Kế hoạch nâng cấp toàn diện PTE Academic

## Mục tiêu

Nâng PTE Academic thành một hệ thống luyện thi toàn diện, **chỉ dùng tiếng Anh**, triển khai qua **3 giai đoạn**. Hệ thống sẽ bám theo cấu trúc Pearson được xác nhận gần nhất: khoảng 2 giờ, 3 phần, thang điểm 10-90 và 22 dạng câu hỏi, bao gồm `Respond to a Situation` và `Summarize Group Discussion` được bổ sung từ ngày 7/8/2025.

Không dùng các tin đồn “thay đổi PTE 2026” chưa được Pearson xác nhận. Mọi nội dung, audio và hình ảnh sẽ là nội dung gốc của HaiEduTech, không sao chép ngân hàng đề chính thức.

## Hiện trạng đã xác minh

- Đã có 8 trang PTE, 4 khu luyện kỹ năng, 12 bài chiến thuật, 5 mini mock, từ vựng và trang tổng quan tiến bộ.
- Phần luyện hiện chỉ triển khai sâu khoảng 8 dạng chính; chưa đủ toàn bộ 22 dạng của bài thi hiện hành.
- Speaking và Listening đang phụ thuộc Web Speech API/TTS của trình duyệt; không có audio giọng người ổn định và chưa đo được phát âm, nhịp điệu hoặc độ trôi chảy thực tế.
- Điểm hiện tại được suy ra từ khớp từ khóa/độ giống chuỗi trong trình duyệt, dù một số nội dung đang gọi là “AI scoring”.
- Database đã có `pte_attempts` và `pte_vocab_mastery` với quyền truy cập theo người dùng/giáo viên. Tuy nhiên các trang luyện chưa ghi lượt làm vào `pte_attempts`; bảng này hiện có 0 bản ghi.
- Tiến bộ bài tập chủ yếu nằm trong localStorage; dữ liệu tổng hợp có đọc database nhưng chưa có luồng đồng bộ đầy đủ giữa thiết bị.
- Chưa có bộ kiểm thử hoặc audit chuyên biệt cho dữ liệu, đáp án, timing và scoring của PTE.

## Giai đoạn 1 - Chuẩn hóa nền tảng và đủ 22 dạng bài

### 1. Cấu trúc học tập mới

- Thiết kế lại PTE Home thành bảng điều khiển học tập: target score, diagnostic result, four-skill profile, daily plan, recent attempts và recommended next task.
- Tổ chức nội dung theo ba lớp: `Learn` - `Practice` - `Mock Tests`.
- Mỗi kỹ năng có trang dạng bài riêng, bộ lọc theo target score, độ khó, chủ đề, accent và trạng thái đã luyện.
- Thêm exam guide, test-day walkthrough, microphone check và score interpretation; mọi giao diện và nội dung đều bằng tiếng Anh.

### 2. Đủ cấu trúc PTE hiện hành

- Speaking & Writing: Personal Introduction, Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, Answer Short Question, Respond to a Situation, Summarize Group Discussion, Summarize Written Text, Write Essay.
- Reading: Fill in the Blanks - Dropdown, Multiple Choice Multiple Answers, Re-order Paragraphs, Fill in the Blanks - Drag and Drop, Multiple Choice Single Answer.
- Listening: Summarize Spoken Text, Multiple Choice Multiple Answers, Fill in the Blanks, Highlight Correct Summary, Multiple Choice Single Answer, Select Missing Word, Highlight Incorrect Words, Write from Dictation.
- Gắn mỗi dạng với timing, hướng dẫn, rubric, kỹ năng được tính điểm và quy tắc partial/negative credit phù hợp tài liệu Pearson hiện hành.

### 3. Nâng cấp nội dung và media

- Chuẩn hóa schema chung cho item bank, version rubric và skill attribution thay vì tiếp tục mở rộng bằng nhiều mảng rời rạc.
- Mỗi dạng có lesson, worked example, common traps, guided drill, timed drill và mixed practice.
- Thay TTS trình duyệt trong Listening/lecture bằng audio được tạo và lưu sẵn, có nhiều giọng/accents, waveform và quy tắc phát lại đúng từng dạng.
- Bổ sung biểu đồ, hình mô tả và transcript chỉ hiện sau khi nộp bài.
- Gắn nguồn, review status và ngày kiểm duyệt cho từng item để nội dung có thể audit.

### 4. Nền tảng dữ liệu

- Mở rộng lượt làm để lưu item ID, item type, rubric version, transcript/text, trait scores, skill attribution, thời gian và mode luyện.
- Đồng bộ tiến bộ local-first lên database khi đăng nhập; chống ghi trùng và giữ hoạt động trên nhiều thiết bị nhất quán.
- Tạo dữ liệu tổng hợp cho target score, điểm yếu, streak, thời lượng học và lịch sử kỹ năng; giáo viên chỉ xem dữ liệu theo quyền hiện có.
- Giữ toàn bộ PTE sau đăng nhập và Premium theo quy tắc hiện hành.

### Tiêu chí hoàn thành giai đoạn 1

- Có đủ 22 dạng bài và không còn trang placeholder.
- Mỗi dạng có ít nhất một luồng học, luyện có hướng dẫn và luyện có thời gian hoạt động hoàn chỉnh.
- Audio hoạt động nhất quán mà không phụ thuộc SpeechSynthesis.
- Lượt làm và tiến bộ xuất hiện lại sau khi đổi thiết bị.
- Audit tự động chặn ID trùng, đáp án lỗi, timing/rubric thiếu và mock tham chiếu item không tồn tại.

## Giai đoạn 2 - AI Scoring, phản hồi chuyên sâu và học thích ứng

### 1. Speaking Studio

- Ghi âm thật, hiển thị trạng thái mic rõ ràng, cho phép nghe lại sau khi nộp và có fallback khi trình duyệt không hỗ trợ ghi âm.
- Chuyển giọng nói thành transcript ở máy chủ; chấm riêng `Content`, `Pronunciation` và `Oral Fluency` theo rubric từng dạng.
- Phản hồi gồm missing words, pace, pauses, repetitions, stress/clarity observations, timeline lỗi và một action plan ngắn.
- Với Describe Image, Re-tell Lecture, Respond to a Situation và Summarize Group Discussion: kiểm tra task fulfilment, key points, organization và appropriacy, không chỉ đếm từ khóa.

### 2. Writing Studio

- Chấm theo task-specific rubric: content, form, development/structure, grammar, vocabulary range, spelling và written discourse khi áp dụng.
- Highlight lỗi trực tiếp trong bài, giải thích bằng English, đưa bản sửa từng câu và model response sau khi người học đã tự làm.
- Phát hiện câu trả lời học thuộc, sao chép bất thường và nội dung lạc đề; hiển thị rõ score estimate chứ không tuyên bố là điểm Pearson chính thức.

### 3. Scoring architecture

- Dùng server-side AI Gateway cho chấm bài dài; stream kết quả, có Stop, trạng thái lỗi rõ ràng và không đưa khóa bí mật ra trình duyệt.
- Dùng speech-to-text chuyên dụng cho audio; giữ scoring deterministic cho các dạng objective và AI rubric scoring cho các dạng productive.
- Lưu `raw traits`, điểm quy đổi, rubric version, model/run metadata và confidence để có thể audit/chấm lại khi rubric thay đổi.
- Hiệu chuẩn thang 10-90 bằng tập câu trả lời benchmark do giáo viên đánh giá; không áp dụng công thức tuyến tính từ độ giống chuỗi.
- Kiểm soát chi phí bằng giới hạn kích thước audio/text, cache theo submission hash và không tự retry các lỗi không phù hợp.

### 4. Adaptive learning

- Diagnostic test tạo skill profile và target-gap analysis.
- Recommendation engine chọn bài tiếp theo theo điểm yếu, độ mới, lịch ôn và target score.
- Error notebook tự gom lỗi phát âm, chính tả, ngữ pháp, từ vựng và dạng bài; tạo targeted drills từ lỗi đã gặp.
- Weekly plan và readiness indicator dựa trên dữ liệu thật, không tự tạo điểm khi chưa đủ bằng chứng.

### Tiêu chí hoàn thành giai đoạn 2

- Speaking/Writing trả về trait-level feedback có thể giải thích và xem lại.
- Objective items luôn chấm deterministic; productive items có versioned rubric và audit trail.
- Benchmark tests xác nhận scoring ổn định trong ngưỡng được giáo viên phê duyệt.
- Người học nhận được kế hoạch tiếp theo từ dữ liệu lịch sử, không từ nội dung mẫu cố định.

## Giai đoạn 3 - Mock test chuẩn thi, báo cáo và hệ thống giáo viên

### 1. Full mock engine

- Xây dựng ít nhất 5 full mock nguyên bản với 65-75 câu, ba phần theo thứ tự cố định, section budgets, one-pass navigation và autosave/recovery.
- Thêm sectional mock, mini mock và custom mock theo target score; các mini mock hiện tại được giữ nhưng đổi nhãn rõ ràng.
- Pre-test device check cho mic, audio, connection và permissions; focus/connection incidents được ghi nhận nhưng không dùng webcam hoặc biometric.
- Exam UI giảm tối đa yếu tố gây xao nhãng, hỗ trợ keyboard và accessibility, cảnh báo khi sắp hết thời gian.

### 2. Score report

- Báo cáo Overall estimate và bốn Communicative Skills, ghi rõ Overall không phải trung bình cộng đơn giản.
- Breakdown theo item type, integrated skills, trait, timing, accuracy, consistency và lost-score causes.
- So sánh lần thi, trend 30/90 ngày, target gap, CEFR/IELTS estimate có disclaimer và recommended study plan.
- Xuất PDF tiếng Anh với branding HaiEduTech, response evidence và teacher comments.

### 3. Teacher and quality tools

- Teacher dashboard xem attempts, recordings, written responses, weak areas và scoring confidence; hỗ trợ override có lý do và feedback riêng.
- Content review queue: draft - reviewed - published - retired; audit versioning để mock cũ vẫn tái hiện đúng rubric/item đã dùng.
- Analytics theo dạng bài và câu hỏi: completion, difficulty, discrimination, abandon rate, audio failure và AI score confidence.
- Không xây public leaderboard dựa trên điểm mock; ưu tiên tiến bộ cá nhân và tính toàn vẹn học tập.

### Tiêu chí hoàn thành giai đoạn 3

- Một full mock chạy xuyên suốt khoảng 2 giờ, tự khôi phục hợp lý và tạo báo cáo sau khi nộp.
- Score report truy vết được từ từng response và không tính trùng integrated-skill item.
- Giáo viên xem/chấm lại được response theo đúng quyền; học sinh chỉ xem dữ liệu của mình.
- PDF, mobile, desktop, keyboard flow và các trạng thái mất mạng/audio/AI đều được kiểm thử.

## Kiểm thử và kiểm soát chất lượng xuyên suốt

- Unit tests cho scoring objective, timing, word limits, negative/partial credit và skill attribution.
- Content audits cho unique IDs, đáp án/options, transcript-audio pairing, rubric coverage, English-only copy và mock blueprint.
- Integration tests cho lưu lượt làm, đồng bộ nhiều thiết bị, Premium gate, teacher access và xóa dữ liệu người dùng.
- Browser tests cho microphone, recording, drag/drop, highlight, timer, resume và full mock trên desktop/mobile.
- Accessibility: keyboard-only, visible focus, captions/transcripts sau submission, contrast và reduced motion.
- Security: file type/size validation, signed access to recordings, private user responses, rate limiting và không tin score do client gửi lên.

## Thứ tự triển khai đề xuất

```text
Phase 1: Exam model + 22 item types + content/audio + cloud progress
    ↓
Phase 2: AI scoring + calibration + adaptive study plan
    ↓
Phase 3: Full mocks + score reports + teacher/content tools
```

Mỗi giai đoạn kết thúc bằng content audit, test automation và một đợt giáo viên nghiệm thu trước khi mở rộng sang giai đoạn kế tiếp.

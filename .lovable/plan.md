## Nguyên nhân

Các câu hỏi quiz bị "đột nhiên chuyển sang tiếng Việt" trong IELTS Lectures (vd. câu 4 "Bí quyết VÀNG…", câu 5 "Đâu là điểm chốt…", câu 6 "Part 2 prep time is…") đến từ một file duy nhất:

- `src/data/ieltsLectureQuizPadder.ts` — tự sinh thêm câu hỏi cho những bài chưa đủ 5 câu. Hiện tại toàn bộ **stem (câu hỏi)** và **3 distractor** đều viết bằng tiếng Việt, trong khi đáp án đúng lại lấy từ `goldenSecret`, `cheatSheetPoints`, `mistakesToAvoid.mistake`, `strategySteps`, `vocabHighlights.definition`, `practicalExamples.context` (tất cả đều tiếng Anh). Vì vậy mới có hiện tượng "phía trên Anh, phía dưới Việt" lẫn lộn trong cùng một quiz.

Các câu gốc nằm trong `ieltsLecturesData.ts` / `ieltsLectures*Expansion*.ts` đều đã là tiếng Anh — chỉ phần padder mới là nguồn tiếng Việt.

## Phạm vi sửa

Sửa duy nhất `src/data/ieltsLectureQuizPadder.ts`:

1. Viết lại 6 mẫu câu hỏi (Golden Secret, Cheat Sheet, Mistake, Strategy step, Vocab, Practical example) + filler cuối sang tiếng Anh, ví dụ:
   - `What is the Golden Secret of the lecture "{title}" emphasising?`
   - `Which point is highlighted in the Cheat Sheet of this lecture?`
   - `Which of the following is a mistake to AVOID according to this lecture?`
   - `What is the FIRST strategy step recommended in this lecture?`
   - `In this lecture, the word "{word}" is used to mean:`
   - `In which context is the practical example in this lecture set?`
2. Viết lại 3 distractor mỗi câu sang tiếng Anh giữ đúng tinh thần "sai phổ biến" (vd. "Memorise one model answer and reuse it for every prompt.", "Skip outlining to save writing/speaking time.", "Copy the question verbatim into your answer.", v.v.).
3. Explanation ưu tiên trường tiếng Anh trước (`goldenSecret`, `m.why`, `s.description`, `v.definition`, `e.explanation`), fallback sang `*Vi` nếu thiếu — để tooltip giải thích cũng đồng bộ tiếng Anh.
4. Filler cuối cùng cũng đổi sang tiếng Anh.

## Không đụng tới

- Không sửa nội dung bài giảng gốc (`ieltsLecturesData.ts`, các file expansion).
- Không đổi cấu trúc dữ liệu, không đổi logic `padLectureQuizzes`, không thêm bảng/route mới.
- Không tác động phần Vietnamese curriculum hay các quiz khác.

## Kiểm thử

- Mở vài bài IELTS Speaking/Writing lectures (đặc biệt bài có ≤4 câu gốc như "Speaking Part 2: The 2-Minute Monologue") và xác nhận toàn bộ stem + options hiển thị tiếng Anh, không còn câu tiếng Việt xen kẽ.
- Đếm số quiz vẫn ≥5/bài (logic padder giữ nguyên).

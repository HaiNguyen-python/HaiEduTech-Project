# Ngữ pháp tiếng Anh: thêm hình minh họa, gộp chuyên đề trùng, mở rộng bài học

## 1. Hình minh họa cho từng ô chuyên đề

Tạo một bộ hình mới **riêng cho ngữ pháp**, mỗi chuyên đề một hình chibi giáo dục theo phong cách HaiEduTech (Royal Blue / Soft Emerald / Warm Gold, nền sáng, nhân vật học sinh - giáo viên).

Nội dung hình gắn với chủ điểm, ví dụ:
- Thì tiếng Anh: dòng thời gian với đồng hồ
- Câu điều kiện: hai ngã đường
- Câu bị động: bảng chuyển đổi chủ ngữ - tân ngữ
- Mệnh đề quan hệ: các thẻ câu nối với nhau
- Dấu câu: bút đỏ soát bài
- Cụm động từ, giới từ, đảo ngữ, câu chẻ... mỗi chủ điểm một cảnh riêng

Cách hiển thị trên thẻ chuyên đề:
- Hình nằm ở dải trên của thẻ, bo góc theo hệ thống, phủ lớp sáng nhẹ để chữ vẫn rõ
- Icon emoji hiện tại giữ lại, đặt nổi trên hình
- Ảnh tải lười, có văn bản thay thế song ngữ, hiệu ứng phóng nhẹ khi rê chuột và tự tắt nếu thiết bị hạn chế chuyển động
- Điện thoại: một cột, hình không lấn chữ, chiều cao thẻ đều nhau

Nếu một chuyên đề chưa có hình riêng, dùng hình dự phòng chung để không bao giờ trống.

## 2. Gộp các chuyên đề bị tách đôi

| Gộp thành | Từ |
| --- | --- |
| Modal Verbs | Modal Verbs + Modal Verbs Deep Dive |
| Punctuation & Sentence Boundaries | Punctuation Essentials + Punctuation & Sentence Boundaries |
| Question Forms & Tag Questions | Question Forms + Question Forms & Tag Questions |
| Subject-Verb Agreement | Subject-Verb Agreement + Subject-Verb Agreement (Advanced) |

- Giữ nguyên **toàn bộ ID bài học**, nên tiến độ đã lưu của học viên không mất.
- Đường dẫn chuyên đề cũ vẫn mở được: tự chuyển hướng sang chuyên đề đã gộp.
- Sau khi gộp: 24 chuyên đề (thay vì 28), bài học được sắp lại từ dễ đến khó trong mỗi chuyên đề.

## 3. Thêm bài học mới - mọi chuyên đề tối thiểu 3 bài

Bổ sung **18 bài học mới** cho các chuyên đề đang mỏng, nâng tổng số từ 67 lên **85 bài**. Ví dụ hướng nội dung:

- Cleft Sentences: *It-cleft* nhấn mạnh, *What-cleft* trong Writing
- Participle Clauses: phân từ hiện tại rút gọn, phân từ hoàn thành và phân từ bị động
- Noun Clauses: mệnh đề *that*, mệnh đề nghi vấn gián tiếp
- Linking Words: liên từ đối lập/nhượng bộ, cụm chuyển ý cho Speaking
- Inversion, Subjunctive, Gerunds, Word Order, Confusing Pairs, Prepositions, Sentence Patterns, Phrasal Verbs, Articles nâng cao, Subject-Verb Agreement: mỗi chuyên đề thêm 1 bài đúng khoảng trống nội dung còn thiếu.

Mỗi bài mới viết đủ chuẩn hiện hành: lý thuyết song ngữ, quiz 10 câu, và bộ bài tập đạt chuẩn (tối thiểu 7 bài tập, tối thiểu 4 dạng, không câu trùng lặp).

## 4. Rà soát lại toàn bộ nội dung bài tập ngữ pháp

Chạy kiểm tra tự động trên **toàn bộ 85 bài** và sửa đến khi báo 0 lỗi:
- Không có câu bài tập lặp trong cùng bài, không có câu dùng lại quá 2 lần toàn bộ chương trình
- Điền từ luôn có chỗ trống và đáp án khớp câu
- Trắc nghiệm không trùng lựa chọn, có giải thích, đáp án rải đều các vị trí
- Câu sắp xếp có tập từ khớp đáp án; nối cặp không lặp
- Không lẫn tiếng Việt trong phần tiếng Anh, không dùng dấu gạch dài
- Mỗi bài tối thiểu 7 bài tập, 4 dạng, 20 câu khác nhau

Kiểm tra trực tiếp trên trình duyệt: trang danh sách ngữ pháp (desktop và điện thoại) và 4-5 bài đại diện gồm bài mới và bài thuộc chuyên đề đã gộp.

## Chi tiết kỹ thuật

- Hình: `imagegen` cho 24 hình vào `src/assets/grammar/`, map chuyên đề → hình trong `src/lib/grammarModuleVisuals.ts` (fallback chung), dùng ở thẻ trong `src/pages/EnglishGrammar.tsx` và ở tiêu đề bài học trong `src/pages/LanguageLessonView.tsx`.
- Gộp module: lớp hợp nhất trong `src/data/languageCurriculum/grammarModuleMerge.ts` (map moduleId cũ → mới, nối `lessons`, giữ ID bài), áp dụng trong `src/data/languageCurriculum/index.ts` trước các enhancer hiện có; thêm chuyển hướng ID cũ trong `LanguageLessonView.tsx`.
- Bài mới: `src/data/languageCurriculum/grammarLessonsNew/part1..part3.ts`, merge cùng pipeline `allGrammarModules`; bài tập viết tay thêm vào `grammarExercisesAuthored`.
- Kiểm tra: `bunx tsx scripts/audit_grammar_exercises.mjs` (mở rộng kiểm tra min 3 bài/chuyên đề và ID module đã gộp), `bunx tsgo --noEmit`, ESLint, Vitest, Playwright.

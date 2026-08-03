# Rà soát bài giảng tiếng Thụy Điển - lỗi tìm thấy và kế hoạch sửa

## Hiện trạng đã kiểm tra

Bộ bài giảng gồm 52 bài trong 3 tier (A1 / A2 / B1) ở `SwedishTierView.tsx`, cộng lộ trình 30 ngày A1 (`swedishA1DailyPlan.ts` + 4 file nội dung phụ trợ). Không có trùng ID bài, không có key mồ côi, mọi bảng ngữ pháp đều đúng số cột, mọi `answer` của quiz đều nằm trong khoảng hợp lệ, không có mảng nội dung rỗng.

Các lỗi xác nhận được:

1. **Chiều sâu bài học lệch nặng giữa các tier.** Chỉ 14/52 bài có khối deep-dive (bảng ngữ pháp + hội thoại + bài mẫu + ghi chú văn hoá + quiz) và 31/52 bài có phần chi tiết (intro/steps/pitfalls/practice). Toàn bộ 12 bài A2 và 9 bài B1 (`a2-work`, `a2-health`, `a2-housing`, `a2-transport`, `a2-doctor-visit`, `a2-emotions-small-talk`, `a2-bank-id`, `a2-perfekt`, `a2-imperativ`, `a2-sa-att`, `a2-email-pro`, `a2-future`, `b1-vocab`, `b1-opinion`, `b1-news`, `b1-discuss`, `b1-job`, `b1-environment`, `b1-future`, `b1-climate-debate`, `b1-digital-life`) chỉ có mô tả ngắn, không có hội thoại, bài mẫu hay quiz.

2. **Quiz deep-dive không song ngữ.** `quiz[].q` và `quiz[].options` chỉ có một chuỗi, và 67 câu hỏi/đáp án đang là tiếng Việt (ví dụ `a1-pron`: "Từ 'sjuksköterska' bắt đầu bằng âm nào?"). Khi người học chọn EN, phần giải thích đổi sang tiếng Anh nhưng câu hỏi và phương án vẫn hiện tiếng Việt.

3. **Bài tập ngữ pháp có đáp án tiếng Việt.** Trong `swedishLessonGrammarExtra.ts`, câu hỏi có `qVi`/`qEn` nhưng `answer` chỉ một chuỗi; một số đáp án là từ tiếng Việt (ví dụ `a1-pron`: đáp án `"ngắn"`). Người học ở chế độ EN gõ "short" sẽ bị tính sai.

4. **Đáp án dồn vào phương án B.** Phân bố chỉ số đáp án đúng của 42 câu quiz deep-dive: A=1, B=24, C=14, D=3. 57% đáp án là B nên học viên đoán được mà không cần hiểu.

5. **Thiếu bài tập tự kiểm tra ở nhiều bài.** Chỉ 14 bài có `LESSON_GRAMMAR_EXTRA`; 3 bài thiếu danh sách từ vựng (`a2-v2`, `a2-modal`, `b1-opinion`, `b1-discuss`).

6. **Liên kết lộ trình 30 ngày - bài giảng bị hỏng.** 13/30 ngày không có `lessonId`, và ngày 4 với ngày 5 trùng `a1-num`. Trường này hiện không được component nào dùng nên lộ trình ngày không mở được đúng bài giảng tương ứng.

7. **Rác kỹ thuật nhỏ.** `LessonDeepBlock.tsx` import `Volume2` rồi vô hiệu bằng `void Volume2` ở cuối file.

## Sẽ làm

### A. Sửa lỗi song ngữ và chấm điểm (ưu tiên cao)
- Thêm `qEn` + `optionsEn` cho quiz trong `swedishLessonDeep.ts` và cho `LESSON_DEEP` quiz render qua hàm `t()`, để chế độ EN không còn hiện tiếng Việt.
- Cho `LessonGrammarExercise` nhận `answers: string[]` (chấp nhận cả tiếng Thụy Điển và tiếng Anh/Việt), sửa những đáp án tiếng Việt như `"ngắn"` thành `["kort", "short", "ngắn"]`; giữ nguyên `answer` cũ để không phá dữ liệu hiện có.
- Trộn lại thứ tự phương án bằng hàm shuffle tất định theo ID câu (giống `ieltsReadingShuffle`) để phân bố A/B/C/D đều, học viên không đoán được.

### B. Bổ sung chiều sâu nội dung
- Viết khối deep-dive đầy đủ (bảng ngữ pháp, hội thoại 6-8 lượt, bài mẫu, ghi chú văn hoá Phần Lan-Thụy Điển, 4 câu quiz song ngữ) cho 21 bài A2/B1 đang thiếu, trong file dữ liệu mới để tránh phình file cũ.
- Thêm phần chi tiết (intro / các bước / lỗi thường gặp / luyện tập) cho 21 bài đó.
- Thêm `LESSON_GRAMMAR_EXTRA` cho các bài ngữ pháp A2/B1 (`a2-perfekt`, `a2-imperativ`, `a2-sa-att`, `a2-future`, `b1-sub`, `b1-inv`) và bổ sung từ vựng cho 4 bài đang thiếu.

### C. Sửa liên kết lộ trình và dọn kỹ thuật
- Điền `lessonId` cho 13 ngày còn thiếu, tách trùng ngày 4/5, và hiển thị liên kết "Mở bài giảng tương ứng" trong lộ trình 30 ngày.
- Bỏ import chết `Volume2` trong `LessonDeepBlock.tsx`.

## Chi tiết kỹ thuật
- Không đổi ID bài học hay ID ngày, nên tiến độ đã lưu của học viên giữ nguyên.
- Nội dung mới đặt ở `src/data/swedishLessonDeepExpansion.ts`, `swedishLessonDetailsExpansion.ts`, `swedishLessonGrammarExtra2.ts` rồi merge vào record trung tâm.
- Sau khi sửa: chạy `tsgo` và một script audit in ra số bài có deep/details/exercise, phân bố đáp án A/B/C/D, và số câu hỏi còn thiếu bản tiếng Anh (mục tiêu: 0).

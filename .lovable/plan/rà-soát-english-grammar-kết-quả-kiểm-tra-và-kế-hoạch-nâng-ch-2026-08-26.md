# Rà soát English Grammar: kết quả kiểm tra và kế hoạch nâng chất lý thuyết

## Hiện trạng đã kiểm tra bằng script

Bộ Grammar hiện có **28 module / 67 bài** (`allGrammarModules` gộp từ `englishGrammar.ts` + 5 file expansion). Điểm tốt: không có bài trùng ID, không có bài trùng nội dung lý thuyết, mọi quiz đều đã đủ 10 câu, phần tiếng Việt (`theory`) khá đầy (trung vị 169 từ).

Các vấn đề xác nhận được:

1. **Lý thuyết tiếng Anh mỏng hơn tiếng Việt rất nhiều.** `theoryEn` trung vị chỉ 102 từ (tiếng Việt 169). **44/67 bài dưới 120 từ**, trong đó **16 bài dưới 80 từ**. Mỏng nhất: `phrasal-verbs-themes` (25 từ), `comparisons-basic` (34), `comparisons-double` (41), `adjective-order` (52), `question-forms` (61), `inversions` (63), `gerunds-advanced` (64), `reported-questions` (65), `inversion-conditionals` (66), `relative-prepositions` (68). Với các chủ điểm khó (inversion, cleft, subjunctive) 60-70 từ là không đủ để giải thích rõ.

2. **25/67 bài không có Pro Tips.** Ví dụ `modals-ability-permission`, `relative-nondefining` không có tip nào, nên phần "quick goal" trong overview phải dùng câu mặc định chung chung.

3. **27/67 bài không có mục từ vựng/cụm mẫu** (`vocabulary` rỗng), làm bài học thiếu ví dụ chuẩn để học viên bám theo.

4. **Bài tập tương tác quá ít.** Cả 67 bài đều có dưới 3 exercise; trung vị chỉ **1 exercise/bài** (tối đa 2), trong khi quiz thì 10 câu. Lý thuyết không được củng cố ngay bằng luyện tập.

5. **Lẫn tiếng Việt trong bản tiếng Anh.** `articles-usage` và `articles-zero` có ký tự tiếng Việt trong `theoryEn`, người học chọn EN vẫn thấy chữ Việt.

6. **Cấu trúc trình bày không đồng nhất.** Một số bài có heading + gạch đầu dòng rõ ràng, nhiều bài chỉ là đoạn văn liền mạch, khó quét nhanh.

## Sẽ làm

### A. Viết lại/mở rộng lý thuyết theo một khuôn chuẩn (ưu tiên cao)
Mỗi bài (cả `theory` tiếng Việt và `theoryEn`) được chuẩn hóa về cùng một bố cục:
- **Rule in one line** - phát biểu quy tắc gọn.
- **Form / công thức** - bảng hoặc dòng công thức.
- **When to use** - 3-5 gạch đầu dòng tình huống dùng.
- **Model sentences** - 3-4 câu mẫu, có bản dịch ở bản tiếng Việt.
- **Common mistakes (Wrong / Right / Why)** - lỗi người Việt thường gặp.
- **Contrast box** - phân biệt với cấu trúc gần nghĩa (ví dụ *used to* vs *would*, defining vs non-defining).

Mục tiêu số liệu: **mọi bài `theoryEn` >= 160 từ**, không bài nào dưới 120 từ, và luôn có heading + bullet để dễ đọc. Ưu tiên xử lý trước 16 bài dưới 80 từ, rồi 28 bài còn lại dưới 120 từ.

### B. Bổ sung Pro Tips và từ vựng
- Thêm 3-4 Pro Tips (song ngữ) cho 25 bài đang thiếu, tips phải cụ thể theo chủ điểm (không phải lời khuyên chung).
- Thêm 4-6 mục `vocabulary` (cụm/mẫu câu chuẩn kèm ví dụ) cho 27 bài đang thiếu.

### C. Tăng bài tập củng cố
- Nâng mỗi bài lên tối thiểu **3 exercise** trộn dạng: fill-in-blank, sentence reorder, và một dạng error-correction/MCQ ngắn gắn trực tiếp với quy tắc vừa học.

### D. Dọn lỗi nhỏ
- Bỏ ký tự tiếng Việt trong `theoryEn` của `articles-usage`, `articles-zero`.
- Rà lại để không bài nào có `theoryEn` ngắn hơn 60% `theory`.

## Chi tiết kỹ thuật

- Không đổi ID module/bài học, nên tiến độ đã lưu của học viên giữ nguyên.
- Nội dung mở rộng đặt trong file dữ liệu mới `src/data/languageCurriculum/englishGrammarTheoryUpgrade.ts` dạng map `lessonId -> { theory, theoryEn, proTips, proTipsEn, vocabulary, exercises }`, rồi merge vào `allGrammarModules` trong `src/data/languageCurriculum/index.ts` (giống cách `enhanceGrammarModulesWithQuizDepth` đang làm) để không phình các file gốc.
- Làm theo lô ~10 bài/lô, chạy `tsgo` sau mỗi lô.
- Thêm `scripts/audit_english_grammar.mjs` in ra: số từ `theory`/`theoryEn` từng bài, số bài thiếu tips/vocab, số exercise, và số ký tự tiếng Việt lọt vào bản EN. Mục tiêu cuối: 0 bài dưới ngưỡng.

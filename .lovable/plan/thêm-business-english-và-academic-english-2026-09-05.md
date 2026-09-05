# Thêm Business English và Academic English

## Mục tiêu
Thêm 2 mục mới trong menu thả xuống English: **Business English** và **Academic English**, mỗi mục là một trang bài học đầy đủ, nội dung song ngữ Việt - Anh, phù hợp mục tiêu sử dụng thật (đi làm / học thuật, IELTS - đại học).

## Nội dung bài học

### Business English (`/english/business`) - 6 chủ đề, 24 bài
1. Email & thư tín công việc (mở đầu, đề nghị, xin lỗi, follow-up)
2. Họp & thảo luận (mở họp, nêu ý kiến, đồng ý/phản đối lịch sự, chốt việc)
3. Thuyết trình & báo cáo số liệu (mở bài, chuyển ý, mô tả biểu đồ, kết luận)
4. Điện thoại, gọi video & small talk
5. Đàm phán, báo giá, xử lý khiếu nại
6. CV, thư xin việc, phỏng vấn

### Academic English (`/english/academic`) - 6 chủ đề, 24 bài
1. Từ vựng học thuật (Academic Word List theo nhóm chủ đề)
2. Văn phong học thuật (formal vs informal, hedging, nominalisation, tránh dùng "I think")
3. Viết đoạn học thuật (topic sentence, dẫn chứng, cohesion)
4. Đọc học thuật (skimming, tìm luận điểm, đọc abstract)
5. Nghe bài giảng & ghi chú (signposting của giảng viên, Cornell notes)
6. Trích dẫn, tránh sao chép, thuyết trình seminar

Mỗi bài gồm: giải thích ngắn có ví dụ, 10-14 từ/cụm từ (nghĩa Việt, loại từ, câu ví dụ, nút nghe audio thường/chậm), 1 tình huống mẫu (email/hội thoại/đoạn văn), 5 câu hỏi luyện tập (trắc nghiệm và điền cụm từ) hiện đáp án kèm giải thích sau khi chọn.

## Giao diện
- Hai trang dùng cùng khung: banner đầu trang, danh sách chủ đề dạng thẻ có thể mở/gập, bài học mở trong khung nội dung, nút quay lại chủ đề.
- Thanh tiến độ theo bài, lưu tiến độ tại máy; ghi nhận hoạt động học như các trang khác.
- Tuân theo màu thương hiệu, không dùng màu cố định, chữ tối thiểu 16px trên điện thoại, không dùng dấu gạch ngang dài.

## Menu
Trong nhóm English, thêm ngay dưới "Tinh hoa Anh ngữ":
- `💼 Tiếng Anh Thương mại` / `💼 Business English`
- `🎓 Tiếng Anh Học thuật` / `🎓 Academic English`
Không đổi các mục hiện có.

## Chi tiết kỹ thuật
- Dữ liệu tĩnh: `src/data/businessEnglishLessons.ts`, `src/data/academicEnglishLessons.ts` dùng chung kiểu trong `src/data/purposeEnglishTypes.ts`.
- Trang: `src/pages/BusinessEnglish.tsx`, `src/pages/AcademicEnglish.tsx` + component dùng chung `src/components/PurposeEnglishHub.tsx`; audio qua `englishTts.ts`; tiến độ qua localStorage (`haiedu-business-english-v1`, `haiedu-academic-english-v1`).
- Thêm 2 route lazy trong `src/App.tsx`, thêm 2 mục vào `englishSubs` trong `src/components/Navbar.tsx`, thêm SEO title/description cho mỗi trang.
- Kiểm tra: script tự kiểm tra dữ liệu (đủ số từ, đáp án hợp lệ, không trùng), TypeScript, và mở trực tiếp 2 trang trên trình duyệt.

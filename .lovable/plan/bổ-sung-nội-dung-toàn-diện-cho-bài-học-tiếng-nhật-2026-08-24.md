# Bổ sung nội dung toàn diện cho bài học tiếng Nhật

## Hiện trạng
Trang `/japanese` hiện có 9 tab (Tổng quan, Bảng chữ, Chào hỏi, Số & Giờ, Từ vựng, Kanji, Hội thoại, Ngữ pháp, Ôn tập) nhưng nội dung chỉ ở mức N5 rất mỏng: khoảng 20 điểm ngữ pháp, ~30 kanji, ~10 chủ đề từ vựng, 10 câu quiz, không có luyện nghe/nói/viết, không có JLPT prep, không có văn hoá.

## Mục tiêu
Nâng phần tiếng Nhật thành một khoá học đầy đủ N5 -> N4, có lý thuyết chi tiết, ví dụ song ngữ Việt - Anh, và các module luyện tập tương tác giống chuẩn các mục ngôn ngữ khác của HaiEduTech.

## Nội dung bổ sung

### 1. Từ vựng (mục tiêu ~800 từ)
- Mở rộng lên 30+ chủ đề: gia đình, cơ thể - sức khoẻ, thời tiết - bốn mùa, nhà cửa, trường học, công việc - văn phòng, mua sắm, ẩm thực, du lịch, ngân hàng - bưu điện, cảm xúc, tính từ, trạng từ tần suất, động từ nhóm 1/2/3, từ ngoại lai katakana, thành ngữ giao tiếp.
- Mỗi từ: kanji/kana, romaji, nghĩa Việt, nghĩa Anh, câu ví dụ có dịch.

### 2. Kanji (mục tiêu ~300 chữ N5 + N4)
- Nhóm theo chủ đề: số, thời gian, thiên nhiên, người, phương hướng, động từ, tính từ, địa điểm, giao thông.
- Mỗi chữ: âm On/Kun, nghĩa, số nét, 2 từ ghép thông dụng, 1 câu ví dụ.

### 3. Ngữ pháp (N5 đầy đủ + N4 nhập môn, ~60 điểm)
- Hoàn thiện N5: thể て, thể た, thể ない, thể từ điển, tính từ い/な, trợ từ đầy đủ, số đếm mở rộng.
- Thêm N4: thể khả năng, thể bị động, thể sai bảo, thể ý chí, điều kiện たら/ば/と/なら, kính ngữ - khiêm nhường ngữ nhập môn, câu gián tiếp, ~そうです/ようです/らしい.
- Mỗi điểm: giải thích rõ, bảng công thức, 3-4 ví dụ song ngữ, lỗi thường gặp.

### 4. Hội thoại (mục tiêu 40 đoạn)
- Theo ngữ cảnh thật: sân bay, khách sạn, nhà hàng, konbini, bệnh viện, thuê nhà, phỏng vấn baito, lớp học, tàu điện, hỏi đường, điện thoại, giao tiếp công ty.
- Mỗi đoạn: bối cảnh, 8-12 lượt thoại, ghi chú ngôn ngữ, có nút đọc từng câu bằng TTS tiếng Nhật (dùng `japaneseTts.ts` đã có).

### 5. Module luyện tập mới
- **Luyện nghe**: nghe câu/đoạn bằng TTS rồi chọn đáp án; đa giọng cho hội thoại nhiều nhân vật.
- **Chính tả kana**: nghe và gõ lại kana/romaji, chấm theo từng ký tự.
- **Flashcard**: thẻ lật 3D cho từ vựng và kanji, chọn số lượng thẻ.
- **Luyện nói**: đọc câu mẫu, so khớp bằng Web Speech API và hiện % chính xác (theo mẫu Speaking Coach hiện có).
- **Ôn tập nâng cấp**: quiz nhiều dạng (nghĩa, điền trợ từ, sắp xếp câu, ghép kanji, nghe hiểu), tối thiểu 100 câu, xáo trộn đáp án để tránh lệch về một vị trí.

### 6. JLPT Test Prep
- 6 đề mô phỏng (3 đề N5, 3 đề N4) gồm Từ vựng - Chữ - Ngữ pháp - Đọc, chế độ Timed và Free, nộp bài rồi hiện đáp án kèm giải thích chi tiết.

### 7. Văn hoá & thực tế
- Tab văn hoá: nghi thức xã giao, mùa lễ hội, ẩm thực, học tập - làm việc tại Nhật, học bổng MEXT, lưu ý khi giao tiếp.

## Chi tiết kỹ thuật
- Dữ liệu tách thành các file mới trong `src/data/japanese/`: `vocab.ts`, `kanji.ts`, `grammarN5.ts`, `grammarN4.ts`, `dialogues.ts`, `quizBank.ts`, `jlptExams.ts`, `culture.ts`; giữ `japaneseExpansion.ts` và gộp qua barrel `src/data/japanese/index.ts` để không phá vỡ import hiện tại.
- `src/pages/Japanese.tsx` chỉ thêm tab mới (Nghe, Chính tả, Flashcard, Nói, JLPT, Văn hoá) và tách các tab lớn thành component riêng trong `src/components/japanese/` cho gọn và tránh file quá dài.
- Âm thanh dùng `src/lib/japaneseTts.ts` sẵn có; hội thoại nhiều nhân vật dùng cơ chế đa giọng như phần tiếng Thụy Điển.
- Tiến độ lưu localStorage cho khách và đồng bộ Supabase khi đã đăng nhập, theo đúng pattern các module ngôn ngữ khác.
- Chuẩn nội dung: song ngữ Việt - Anh, dùng dấu gạch ngang thường, chữ tối thiểu 16px trên mobile, mọi bảng có cuộn ngang.

## Thứ tự triển khai
1. Từ vựng + Kanji mở rộng.
2. Ngữ pháp N5 đầy đủ + N4.
3. Hội thoại 40 đoạn + TTS đa giọng.
4. Các module luyện tập (nghe, chính tả, flashcard, nói, quiz nâng cấp).
5. JLPT Test Prep.
6. Tab Văn hoá và rà soát toàn bộ.

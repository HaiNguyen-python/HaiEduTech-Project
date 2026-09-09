# Tiếng Nhật: mở rộng nội dung N5 - N3 đầy đủ

## Hiện trạng (đã kiểm tra)
Trang `/japanese` có 12 tab. Nội dung hiện có: 16 chủ đề từ vựng (192 từ) trong `src/data/japanese/vocab.ts` cộng 14 chủ đề nhỏ ở hai gói mở rộng, 145 kanji, 20 điểm ngữ pháp, 11 đoạn hội thoại, khoảng 107 câu ôn tập. Chưa có luyện nghe, chính tả kana, flashcard, đề thi thử JLPT và mục văn hoá.

## Mục tiêu
Nâng phần tiếng Nhật thành khoá học đầy đủ ba tầng N5 - N4 - N3, có bài học chi tiết, ví dụ song ngữ Việt - Anh, và đủ các module luyện tập.

## Nội dung bổ sung

### 1. Từ vựng - mục tiêu 1.000 từ
- 60+ chủ đề, chia rõ N5 / N4 / N3: gia đình, cơ thể - sức khoẻ, thời tiết, nhà cửa, trường học, công việc - văn phòng, mua sắm, ẩm thực, du lịch, ngân hàng - bưu điện, cảm xúc, tính cách, tính từ, trạng từ, động từ nhóm 1/2/3, katakana ngoại lai, thành ngữ giao tiếp, tin tức - xã hội, kinh tế, công nghệ, môi trường (tầng N3).
- Mỗi từ: kanji/kana, romaji, nghĩa Việt, nghĩa Anh, câu ví dụ có dịch. Không trùng từ giữa các gói.

### 2. Kanji - mục tiêu 600 chữ
- Nhóm theo chủ đề và theo cấp: số, thời gian, thiên nhiên, người, phương hướng, động từ, tính từ, địa điểm, giao thông, cơ thể, công việc, xã hội.
- Mỗi chữ: âm On/Kun, nghĩa, số nét, 2 từ ghép thông dụng, 1 câu ví dụ có dịch.

### 3. Ngữ pháp - mục tiêu 110 điểm
- N5 hoàn chỉnh: thể て/た/ない/từ điển, tính từ い-な, toàn bộ trợ từ, số đếm.
- N4: khả năng, bị động, sai bảo, ý chí, điều kiện たら/ば/と/なら, kính ngữ - khiêm nhường nhập môn, câu gián tiếp, そうです/ようです/らしい.
- N3: 敬語 mở rộng, ～わけではない, ～ばかり, ～ながら, ～ものだ, ～に違いない, ～ざるを得ない, ～に応じて, các cụm liên kết văn viết.
- Mỗi điểm: giải thích, bảng công thức, 3-4 ví dụ song ngữ, lỗi người Việt thường mắc.

### 4. Hội thoại tình huống thật - mục tiêu 60 đoạn
Sân bay, khách sạn, nhà hàng, konbini, bệnh viện, hiệu thuốc, thuê nhà, phỏng vấn baito, lớp học, tàu điện, hỏi đường, điện thoại, họp công ty, bưu điện, ngân hàng, cắt tóc, khiếu nại lịch sự, mời - từ chối.
Mỗi đoạn: bối cảnh, 8-12 lượt thoại, ghi chú ngôn ngữ, đọc từng câu bằng giọng Nhật, hai nhân vật hiển thị so le hai bên, cụm quan trọng in đậm.

### 5. Module luyện tập mới
- **Luyện nghe**: nghe câu và đoạn hội thoại rồi chọn đáp án, đa giọng cho nhiều nhân vật, ba mức tốc độ.
- **Chính tả kana**: nghe và gõ lại kana hoặc romaji, chấm theo từng ký tự, ba mức độ.
- **Flashcard & ôn tập lặp lại**: thẻ lật cho từ vựng và kanji, chọn số lượng thẻ, xếp lịch ôn theo mức nhớ, đếm từ đã thuộc.
- **Ôn tập nâng cấp**: tối thiểu 300 câu, nhiều dạng (nghĩa từ, điền trợ từ, sắp xếp câu, ghép kanji, nghe hiểu), xáo trộn đáp án, giải thích song ngữ sau khi chọn.

### 6. JLPT Test Prep
- 9 đề mô phỏng: 3 đề N5, 3 đề N4, 3 đề N3, gồm Từ vựng - Chữ - Ngữ pháp - Đọc.
- Chế độ Timed và Free, nộp bài rồi hiện điểm từng phần, đáp án và giải thích chi tiết, lưu lịch sử làm bài.

### 7. Văn hoá & du học Nhật
Tab riêng: nghi thức xã giao, lễ hội bốn mùa, ẩm thực vùng miền, văn hoá học tập - làm việc, baito và visa, học bổng MEXT, lưu ý giao tiếp cho người Việt.

## Chi tiết kỹ thuật
- Dữ liệu tách theo file nhỏ trong `src/data/japanese/`: `vocabN5.ts`, `vocabN4.ts`, `vocabN3.ts`, `kanjiN5.ts`, `kanjiN4.ts`, `kanjiN3.ts`, `grammarN5.ts`, `grammarN4.ts`, `grammarN3.ts`, `dialogues*.ts`, `quizBank*.ts`, `jlptExams.ts`, `culture.ts`, `listening.ts`, `dictation.ts`; gộp qua barrel `src/data/japanese/index.ts`. Giữ nguyên `japaneseExpansion.ts` và `expansion2.ts` để không phá import hiện tại, merge và dedupe khi hiển thị.
- `src/pages/Japanese.tsx` chỉ thêm tab mới (Nghe, Chính tả, Flashcard, JLPT, Văn hoá) và tách tab lớn thành component trong `src/components/japanese/`, dùng lại `JaSection.tsx` để nội dung dài vẫn gọn.
- Âm thanh dùng `src/lib/japaneseTts.ts` có sẵn, hội thoại nhiều nhân vật dùng cơ chế đa giọng như phần tiếng Thụy Điển, dừng audio khi rời tab.
- Tiến độ lưu localStorage cho khách, đồng bộ backend khi đã đăng nhập, theo đúng pattern các môn khác; ghi log hoạt động cho dashboard giáo viên.
- Script kiểm tra `scripts/audit_japanese_full.ts`: không trùng từ/kanji/câu hỏi, mỗi chủ đề tối thiểu 10 từ, đáp án quiz hợp lệ và phân bố đều, mọi đoạn hội thoại có romaji và nghĩa.
- Chuẩn nội dung: song ngữ Việt - Anh, dùng dấu gạch ngang thường, chữ tối thiểu 16px trên mobile, bảng có cuộn ngang.

## Thứ tự triển khai
1. Từ vựng N5 - N4 - N3 và kanji mở rộng.
2. Ngữ pháp ba tầng.
3. Hội thoại 60 đoạn với giọng đọc đa nhân vật.
4. Luyện nghe, chính tả kana, flashcard - ôn tập lặp lại, quiz nâng cấp.
5. JLPT Test Prep 9 đề.
6. Tab Văn hoá, script audit và rà soát toàn bộ.

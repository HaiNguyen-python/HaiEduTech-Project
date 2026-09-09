# Tiếng Nhật: rà soát toàn bộ và bổ sung thêm bài học

## Hiện trạng (đã kiểm tra trên trang /japanese)
17 tab, số liệu hiện tại: 175 kana, 478 từ, 130 kanji, 24 hội thoại, 48 điểm ngữ pháp, 151 câu ôn tập, 16 bài nghe, 30 bài chính tả kana, 9 đề JLPT, 8 chủ đề văn hoá.

## Bước 1: Rà soát chất lượng
- Chạy lại script audit và mở rộng để kiểm: từ trùng, kanji trùng, thiếu romaji/nghĩa Việt/Anh, đáp án quiz lệch vị trí, câu hỏi trùng, đề JLPT thiếu giải thích, hội thoại thiếu dịch.
- Kiểm chính tả kana và romaji của các gói mới (expansion3, expansion4, practice, jlptExams, culture).
- Kiểm hiển thị thực tế trên trình duyệt (máy tính và điện thoại): chữ tối thiểu 16px, bảng cuộn ngang, âm thanh không bị ngắt, đáp án chỉ hiện sau khi chọn.

## Bước 2: Bổ sung nội dung cho các mục đã có
- **Từ vựng**: thêm khoảng 320 từ (lên ~800) với các chủ đề còn thiếu: trường lớp chi tiết, mua sắm - kích cỡ, bưu điện - hành chính, sở thích - giải trí, du lịch - khách sạn, mô tả tính cách, cảm xúc nâng cao, thành ngữ giao tiếp, từ katakana ngoại lai, từ tượng thanh - tượng hình.
- **Kanji**: thêm khoảng 120 chữ (lên ~250), nhóm theo chủ đề, mỗi chữ có âm On/Kun, số nét, 2 từ ghép và 1 câu ví dụ.
- **Ngữ pháp**: thêm khoảng 24 điểm (lên ~72): kính ngữ - khiêm nhường ngữ, câu bị động - sai bảo, điều kiện たら/ば/なら/と, ～ておく/～てしまう/～ていく・くる, giải thích ～わけ/～はず/～べき, so sánh nâng cao.
- **Hội thoại**: thêm 16 đoạn (lên 40): tàu điện - đổi tuyến, hiệu thuốc, cắt tóc, đăng ký điện thoại, hành chính thành phố, phỏng vấn xin việc, họp nhóm, gọi điện công ty, đi khám răng, chuyển nhà, mua vé du lịch, nói chuyện với giáo viên.
- **Ôn tập**: thêm khoảng 150 câu (lên ~300), đủ các dạng: nghĩa từ, điền trợ từ, sắp xếp câu, ghép kanji, chọn dạng động từ, nghe hiểu; xáo trộn vị trí đáp án.
- **Luyện nghe**: thêm 24 bài (lên 40), có bài hội thoại nhiều nhân vật.
- **Chính tả kana**: thêm 30 câu (lên 60).
- **Đề JLPT**: thêm 3 đề (lên 12, 4 đề mỗi cấp N5/N4/N3), mỗi đề tăng lên 20 câu.
- **Văn hoá & Du học**: thêm 6 chủ đề: xin visa du học, tìm nhà - ký hợp đồng, mở tài khoản - đăng ký điện thoại, nghi thức phỏng vấn, quà tặng và lễ nghĩa, đi khám bệnh và bảo hiểm.

## Bước 3: Thêm 4 mục học mới
- **📚 Luyện đọc (Reading Lab)**: 24 bài đọc N5-N3, có furigana bật/tắt, câu hỏi hiểu bài, từ vựng trích ra ở cuối và bản dịch mở sau khi trả lời.
- **🔤 Luyện chia động từ (Verb Trainer)**: bảng chia thể ます/て/た/ない/khả năng/bị động/sai bảo/ý chí cho động từ nhóm 1-2-3, kèm bài tập gõ đáp án và chấm ngay.
- **🔢 Trợ số đếm (Counters)**: bảng đầy đủ các loại trợ số đếm thông dụng kèm bài tập chọn đúng trợ số.
- **🙇 Kính ngữ (Keigo Lab)**: đối chiếu 3 mức lịch sự cho từng tình huống, có bài tập chuyển câu thường sang kính ngữ và mẹo dùng ở công ty.

## Chi tiết kỹ thuật
- Dữ liệu mới tách thành file riêng trong `src/data/japanese/`: `expansion5.ts` (từ vựng + kanji), `expansion6.ts` (ngữ pháp + hội thoại + quiz), `practice2.ts` (nghe + chính tả), `reading.ts`, `verbForms.ts`, `counters.ts`, `keigo.ts`; đề thi thêm vào `jlptExams.ts`.
- Giữ nguyên cơ chế merge/dedupe trong `src/pages/Japanese.tsx` (`ALL_VOCAB`, `ALL_KANJI`, `ALL_DIALOGUES`, `ALL_GRAMMAR`, `ALL_QUIZ`) để không phát sinh trùng lặp.
- Component mới trong `src/components/japanese/`: `JapaneseReading.tsx`, `JapaneseVerbTrainer.tsx`, `JapaneseCounters.tsx`, `JapaneseKeigo.tsx`, tải bằng `lazy` như các mục hiện tại và dùng chung `speakJa`.
- Thanh tab đang khá dài, sẽ gom lại thành 4 nhóm hiển thị (Nền tảng, Kiến thức, Luyện tập, Thi & Văn hoá) để dễ bấm trên điện thoại, giữ nguyên URL `?tab=` cũ.
- Tiến độ lưu localStorage cho khách, đồng bộ Supabase khi đã đăng nhập, theo pattern hiện có.
- Chuẩn nội dung: song ngữ Việt - Anh, dùng dấu gạch ngang thường, chữ tối thiểu 16px trên mobile, bảng có cuộn ngang.
- Kết thúc bằng typecheck, script audit và kiểm tra trình duyệt trên cả máy tính và điện thoại.

## Thứ tự triển khai
1. Audit và sửa lỗi dữ liệu hiện có.
2. Từ vựng, kanji, ngữ pháp.
3. Hội thoại, quiz, nghe, chính tả.
4. Bốn mục mới (đọc, chia động từ, trợ số đếm, kính ngữ).
5. Đề JLPT và văn hoá.
6. Gom nhóm tab, rà soát cuối.

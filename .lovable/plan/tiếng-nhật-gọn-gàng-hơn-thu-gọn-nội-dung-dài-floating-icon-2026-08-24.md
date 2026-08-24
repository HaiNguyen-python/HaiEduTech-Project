# Tiếng Nhật: gọn gàng hơn, thu gọn nội dung dài, floating icon

## Hiện trạng

Trang `/japanese` có 10 tab nhưng hầu hết tab đổ toàn bộ nội dung ra một mạch:
- Kana: 5 bảng mở sẵn cùng lúc.
- Chào hỏi: toàn bộ câu trong một danh sách dài.
- Số & Giờ: các nhóm số, giờ - ngày và toàn bộ nhóm trợ số từ mở sẵn.
- Từ vựng: mọi chủ đề mở sẵn (~190 từ).
- Kanji: ~100 chữ trong một lưới duy nhất.
- Hội thoại: mọi đoạn hội thoại mở sẵn.
- Ngữ pháp: mọi điểm ngữ pháp mở sẵn.
- Ôn tập: 55 câu hỏi liệt kê hết một trang.

Hệ quả: mỗi tab dài hàng nghìn pixel, khó tìm nội dung, mobile rất mệt.

## Sẽ làm

### 1. Thu gọn bằng nút thả xuống (accordion)

Dùng accordion cho mọi khối dài, mặc định chỉ mở mục đầu tiên:
- Kana: mỗi bảng (Hiragana, biến âm, ghép âm, Katakana, Katakana biến âm) là một mục thả xuống, kèm số ký tự.
- Số & Giờ: nhóm "Số 1-10", "Số lớn", "Giờ & ngày" và từng nhóm trợ số từ thành mục thả xuống.
- Từ vựng: mỗi chủ đề một mục, tiêu đề hiện tên chủ đề + cấp độ + số từ + số từ đã nhớ.
- Kanji: nhóm theo chủ đề (dữ liệu `kanji.ts` đã có nhóm), mỗi nhóm một mục.
- Hội thoại: mỗi đoạn là một mục, tiêu đề hiện tên + bối cảnh.
- Ngữ pháp: mỗi điểm ngữ pháp một mục, tiêu đề hiện công thức ngắn.
- Chào hỏi: chia thành các cụm 10 câu theo chủ đề, mỗi cụm một mục.
- Ôn tập: chia thành các bộ 10 câu, mỗi bộ một mục, có thanh tiến độ đúng/sai của bộ đó.

### 2. Rà soát và làm gọn giao diện

- Tổng quan: rút gọn đoạn văn dài thành khối "Lộ trình 4 bước" ngắn gọn, và cập nhật các con số cho khớp dữ liệu thật (hiện đang ghi 56 từ / 12 kanji / 6 hội thoại trong khi thực tế nhiều hơn).
- Tab: gom 10 tab thành hàng cuộn ngang gọn trên mobile, chip nhỏ hơn, giữ đủ chữ và emoji; tab đang chọn nổi rõ.
- Thống nhất khoảng cách, bo góc, viền hồng và tiêu đề (một cấp `h2` cho tab, `h3` cho mục con), chữ tối thiểu 16px trên mobile.
- Thêm thanh tìm kiếm nhanh cho tab Từ vựng và Kanji (lọc theo kana/romaji/nghĩa), lọc trực tiếp các mục thả xuống.
- Thêm nút "Mở tất cả / Thu gọn tất cả" ở đầu các tab nhiều mục.
- Bảng kana dùng cuộn ngang trên mobile, không tràn.
- Hero rút ngắn, thêm dải thống kê nhỏ (số từ, số kanji, số hội thoại, số câu quiz).

### 3. Floating icon tiếng Nhật

Thêm lớp nền trang trí riêng cho tiếng Nhật (theo mẫu `FloatingSubjectIcons`), trôi chậm, mờ, `pointer-events-none`:
- Emoji: 🌸 🗾 ⛩️ 🍣 🍜 🎋 🏯 🎌 🐱 🌊 🍡 🎐
- Chữ: あ い う ん 日 本 語 学 心 花 空 山, kèm から ます です, JLPT N5, N4
- Chỉ hiện trên màn hình md trở lên, ẩn khi người dùng bật giảm chuyển động, số lượng vừa phải để không ảnh hưởng hiệu năng.

## Chi tiết kỹ thuật

- Tạo `src/components/japanese/FloatingJapaneseIcons.tsx` (cùng pattern shuffle + framer-motion như `FloatingSubjectIcons`, `motion-reduce:hidden`).
- Tạo `src/components/japanese/JaSection.tsx`: bọc `Accordion`/`AccordionItem` của shadcn để mọi tab dùng chung một kiểu mục thả xuống.
- Tách các tab lớn của `src/pages/Japanese.tsx` (789 dòng) thành component riêng trong `src/components/japanese/`: `KanaTab`, `NumbersTab`, `VocabTab`, `KanjiTab`, `DialoguesTab`, `GrammarTab`, `QuizTab`; page chỉ còn khung tab + dữ liệu.
- Giữ nguyên logic hiện có: `speakJa`, `useMasteredVocab("japanese")`, `recordVocabReviewTracked`, đồng bộ tab qua URL, Speaking Coach lazy-load, Vocab Brain 3D ở cuối trang.
- Không đổi dữ liệu bài học, chỉ đổi cách trình bày.
- Chuẩn: dùng dấu gạch ngang thường, không em-dash; bảng có cuộn ngang; chữ mobile tối thiểu 16px.

## Thứ tự triển khai

1. Floating icon + khung `JaSection`.
2. Tách tab thành component, áp accordion cho Kana, Số, Từ vựng, Kanji.
3. Hội thoại, Ngữ pháp, Chào hỏi, Ôn tập theo bộ 10 câu.
4. Rút gọn Tổng quan, chỉnh hero, tab bar, rà soát lại toàn bộ trên preview (desktop + mobile).

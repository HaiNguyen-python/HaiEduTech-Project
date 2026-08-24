# Tiếng Nhật: menu thả xuống đầy đủ, bổ sung nội dung và rà soát Speaking Coach

## 1. Menu thả xuống Japanese

Hiện menu Tiếng Nhật chỉ có 6 mục (Tổng quan, Kana, Chào hỏi, Số & Giờ, Từ vựng, Ngữ pháp), trong khi trang đã có 10 tab. Bổ sung các mục còn thiếu, đúng thứ tự tab trên trang:

- 🈴 Kanji cơ bản (`/japanese?tab=kanji`)
- 🗣️ Hội thoại (`/japanese?tab=dialogues`)
- 🎤 Speaking Coach (`/japanese?tab=speaking`)
- 🧠 Ôn tập N5 (`/japanese?tab=quiz`)

Trang đã đồng bộ tab qua URL nên các link này mở đúng tab ngay.

## 2. Rà soát Speaking Coach tiếng Nhật

Các điểm sẽ kiểm tra trực tiếp trên preview (mở tab Speaking Coach, chạy thử 1 chủ đề từ đầu đến cuối) và sửa nếu lỗi:

- Nghe mẫu: giọng ja-JP qua proxy TTS, cả tốc độ chậm và bình thường, không bị ngắt giữa câu.
- Thu âm và chấm điểm: nhận dạng đúng `ja-JP`, tính % chính xác theo kana (bỏ dấu, gộp katakana), không bị treo khi học viên nói xong.
- Nhãn phiên âm hiện "Romaji" (không phải IPA) và có romaji ở mọi câu.
- Mẹo phát âm tiếng Nhật (trường âm, っ, ん, ふ, r, です/ます) hiện đúng theo câu.
- Bộ lọc trình độ: hiện chỉ có A1/A2 nên chip lọc B1/B2/C1 không được để rỗng vô nghĩa.
- Gamification: hiện tiếng Nhật chưa có nhân vật leo tiến độ như các ngôn ngữ khác, sẽ gắn nhân vật phù hợp để ngôi sao bay có đích.
- Ghi nhận hoạt động vào dashboard giáo viên với domain riêng cho tiếng Nhật.
- ID chủ đề/câu không trùng nhau giữa các gói dữ liệu (chạy script audit).

## 3. Bổ sung nội dung

- Speaking Coach: thêm gói 3 gồm 10 chủ đề / 100 câu trình độ B1 (công việc, phỏng vấn, y tế, thuê nhà, ngân hàng, tàu điện, du lịch, văn hoá, tin tức, tranh luận nhẹ). Tổng 30 chủ đề / 300 câu, mỗi câu có kanji, romaji, nghĩa Việt và Anh.
- Hội thoại: nâng từ số đoạn hiện tại lên 20 đoạn theo ngữ cảnh thật (konbini, bệnh viện, sân bay, khách sạn, lớp học, baito, hỏi đường, điện thoại), mỗi đoạn 8-12 lượt thoại, có nút đọc từng câu.
- Ôn tập: nâng bộ câu hỏi lên tối thiểu 60 câu, nhiều dạng (nghĩa từ, điền trợ từ, sắp xếp câu, ghép kanji), xáo trộn đáp án để không lệch về một vị trí, hiện giải thích song ngữ sau khi chọn.
- Kanji: bổ sung nhóm kanji theo chủ đề dùng dữ liệu `src/data/japanese/kanji.ts` đã có, mỗi chữ có âm On/Kun, số nét, từ ghép và câu ví dụ.
- Từ vựng: thêm chủ đề còn thiếu (cảm xúc, sức khoẻ, thời tiết, công việc) theo chuẩn tối thiểu 10 từ mỗi chủ đề.

## Chi tiết kỹ thuật

- Menu: cập nhật mảng `subs` của mục Tiếng Nhật trong `src/components/Navbar.tsx`.
- Dữ liệu mới: `src/data/speakingCoachJapaneseExpansion3.ts` đăng ký vào `speakingCoachData.ts`, giữ nguyên quy ước tách bunsetsu bằng dấu cách để engine chấm điểm hoạt động, romaji đặt trong trường `ipa`.
- Hội thoại và quiz tách sang `src/data/japanese/dialogues.ts` và `src/data/japanese/quizBank.ts`, gộp qua barrel để `Japanese.tsx` không phình to.
- Chuẩn nội dung: song ngữ Việt - Anh, dùng dấu gạch ngang thường, chữ tối thiểu 16px trên mobile, bảng có cuộn ngang.

## Thứ tự triển khai

1. Menu thả xuống.
2. Rà soát và sửa Speaking Coach.
3. Gói câu B1 cho Speaking Coach.
4. Hội thoại, quiz, kanji, từ vựng.

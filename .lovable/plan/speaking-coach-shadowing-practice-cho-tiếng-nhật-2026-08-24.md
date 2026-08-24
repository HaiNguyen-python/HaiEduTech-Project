# Speaking Coach & Shadowing Practice cho tiếng Nhật

## Mục tiêu
Thêm hai module luyện nói tiếng Nhật vào trang `/japanese`, dùng lại đúng bộ máy đã chạy tốt cho tiếng Anh/Thụy Điển, nhưng nội dung và cách trình bày điều chỉnh riêng cho tiếng Nhật (kana + kanji + romaji + nghĩa Việt/Anh).

## 1. Speaking Coach - Tiếng Nhật
- Thêm ngôn ngữ `japanese` vào Speaking Coach hiện có: nghe mẫu, thu âm, nhận diện giọng nói `ja-JP`, tính % chính xác, huy hiệu, bảng xếp hạng, ghi log hoạt động - giống các ngôn ngữ khác.
- Nội dung: 40 chủ đề x 10 câu = 400 câu, chia theo JLPT/CEFR: N5 (A1) 140 câu, N5+ (A2) 120, N4 (B1) 100, N4+ (B2) 40. Chip lọc trình độ đổi nhãn thành N5/N4 cho dễ hiểu.
- Chủ đề gồm: chào hỏi, giới thiệu bản thân, gia đình, số - giờ - ngày, mua sắm, konbini, nhà hàng, gọi món, tàu điện, hỏi đường, khách sạn, sân bay, bệnh viện, trường học, lớp học, baito - phỏng vấn, công ty - keigo cơ bản, điện thoại, thời tiết, sở thích, thể thao, du lịch, lễ hội, ẩm thực, sức khỏe, thuê nhà, ngân hàng - bưu điện, xin phép - từ chối lịch sự, cảm ơn - xin lỗi, mời - hẹn gặp, kể chuyện quá khứ, dự định tương lai, so sánh, đưa lời khuyên, giải thích lý do, cảm xúc, mô tả người - vật, chỉ đường bằng phương tiện, tại nhà hàng gia đình, giao tiếp mạng xã hội.
- Mỗi câu có: câu tiếng Nhật (kanji + kana), romaji, nghĩa Việt, nghĩa Anh, độ khó, mức JLPT.
- Thay chỗ hiển thị IPA bằng **Romaji + gợi ý phát âm tiếng Nhật** (2 mẹo/câu): trường âm (おう/えい), âm ngắt っ, âm mũi ん trước b/p/m, ふ, り, り-âm, trọng âm cao thấp (pitch accent) của các từ hay sai, giảm âm い/う (desu -> des).
- Âm thanh dùng `japaneseTts.ts` sẵn có (proxy Google + fallback ja-JP), có nút đọc chậm/đọc thường.

## 2. Shadowing Practice - Tiếng Nhật
- Module riêng theo luồng 4 bước như bản IELTS: **Hiểu nghĩa -> Phân tích -> Nhại theo (shadow) -> Thu âm & chấm điểm**.
- 60 câu shadowing (N5 20, N4 25, N3 nhập môn 15). Mỗi câu có:
  - Câu Nhật + romaji + furigana cho kanji + nghĩa Việt/Anh.
  - Điểm ngữ pháp trọng tâm (ví dụ ～てから, ～ないで, ～ようにする, ～ば, kính ngữ ～ていただけませんか) kèm giải thích và phần câu được tô sáng.
  - Từ vựng chính (2-4 từ), cụm hay dùng (collocation), lỗi người Việt thường mắc.
  - Nhịp - ngắt câu (mora chunks) và dấu lên/xuống giọng để nhại đúng ngữ điệu.
- Chấm điểm: so khớp bản ghi nhận diện `ja-JP` với câu gốc theo mora/kana (chuẩn hóa katakana -> hiragana, bỏ dấu câu, chấp nhận biến thể kanji/kana), cộng thêm điểm tốc độ đọc, hiển thị từ đọc thiếu/sai.
- Có nút đọc mẫu 2 tốc độ (0.6 và 1.0) và chế độ nghe lặp từng đoạn.

## 3. Tích hợp vào giao diện
- `/japanese` thêm 2 tab: `🎤 Speaking Coach` và `🎧 Shadowing`.
- Route riêng `/speaking-coach/japanese` (dùng trang Speaking Coach hiện có) để vào nhanh; nút quay lại trỏ về `/japanese`.
- Tiến độ lưu localStorage cho khách và đồng bộ Supabase khi đã đăng nhập, theo pattern hiện tại.

## Chi tiết kỹ thuật
- Dữ liệu mới: `src/data/speakingCoachJapaneseExpansion.ts` (1-4 file để tránh file quá dài), khai báo `japanese` trong `speakingCoachLanguages` với `speechLang: "ja-JP"`.
- Mở rộng union `language` trong `AISpeakingCoach.tsx` và `SpeakingCoachPage.tsx` thêm `"japanese"`; nhánh hiển thị romaji/mẹo phát âm tương tự nhánh `swedish`.
- Thêm `src/lib/japaneseRomaji.ts` (kana -> romaji, chuẩn hóa so khớp) và `src/lib/japaneseSoundTips.ts` (mẹo phát âm theo câu).
- Shadowing tiếng Nhật: `src/components/japanese/JapaneseShadowing.tsx` + dữ liệu `src/data/japaneseShadowing.ts`, tái dùng logic chấm điểm nhưng token hóa theo kana thay vì theo từ cách bằng dấu trắng.
- Audio dùng `playJapaneseTts` / `stopJapaneseTts`; dừng audio khi rời tab hoặc unmount.
- Script kiểm tra `scripts/audit_japanese_speaking.mjs`: ID không trùng, mỗi chủ đề đủ 10 câu, đủ romaji/nghĩa, đủ mức JLPT.
- Chuẩn nội dung: song ngữ Việt - Anh, dùng dấu gạch ngang thường, chữ tối thiểu 16px trên mobile.

## Thứ tự triển khai
1. Thư viện romaji + mẹo phát âm.
2. Dữ liệu Speaking Coach 400 câu + đăng ký ngôn ngữ `japanese`.
3. Tab và route Speaking Coach, kiểm tra thu âm và TTS trong trình duyệt.
4. Dữ liệu và giao diện Shadowing 60 câu, chấm điểm theo kana.
5. Script audit và rà soát toàn bộ.

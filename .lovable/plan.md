# IELTS Speaking: nghe audio cụm từ + bổ sung câu hỏi cho topic ít đề

## 1. Nút nghe cho từng mục trong "Useful Language & Ideas"

Hiện panel chỉ hiển thị chữ, không có cách nghe phát âm.

- Mỗi thẻ Vocabulary có một nút loa nhỏ ở góc phải: bấm để nghe cụm từ tiếng Anh (giọng en-US qua bộ TTS tiếng Anh sẵn có), đang phát thì đổi icon và bấm lại để dừng.
- Áp dụng cùng cơ chế cho tab Structures (đọc cả câu mẫu) và tab Ideas, để học viên nghe được ngữ điệu cả câu.
- Thêm nút "Nghe tất cả" ở đầu mỗi tab: đọc lần lượt các mục đang hiển thị, có nút dừng.
- Thêm nút tốc độ chậm (0.75x) cho từng mục để luyện phát âm theo.
- Chỉ một audio phát tại một thời điểm; tự dừng audio khi chuyển câu hỏi, chuyển tab, hoặc khi bắt đầu ghi âm (tránh lọt tiếng vào micro).

## 2. Bổ sung câu hỏi cho các topic quá ít

Số liệu hiện tại (đếm từ bộ dữ liệu đang chạy):
- Part 1: 48 topic / 155 câu - 35 topic chỉ có 1 câu (Colours, Money, Sounds, Animals, Museums, Gifts...), 2 topic có 2 câu.
- Part 3: 29 topic / 152 câu - 11 topic chỉ có 1 câu (Work & Careers, Tourism, Family, Language, Transport, Art...), 6 topic có 2-3 câu.
- Part 2 là dạng cue card nên 1 đề/1 topic là hợp lý; sẽ bổ sung thêm 1 cue card biến thể cho các chủ đề phổ biến nhất thay vì mở rộng đồng loạt.

Việc cần làm:
- Part 1: nâng mỗi topic lên tối thiểu 5 câu (thêm khoảng 190 câu), theo đúng phong cách Part 1 - câu ngắn, đời thường, có câu hỏi mở rộng (why/how often/did you...).
- Part 3: nâng mỗi topic lên tối thiểu 5 câu (thêm khoảng 60 câu), theo phong cách Part 3 - trừu tượng, so sánh, dự đoán xu hướng, tác động xã hội.
- Part 2: thêm 1 cue card thứ hai cho khoảng 30 chủ đề hay gặp, kèm đủ 4 gạch đầu dòng.
- Mỗi câu hỏi mới đều có đủ trường như dữ liệu hiện tại (band descriptors, model answer, useful language) để panel Vocabulary/Structures/Ideas không bị trống.
- Gộp một số topic trùng nghĩa của Part 3 (Work vs Work & Careers, Travel vs Travel & Tourism, Culture vs Culture & Globalisation, Money vs Money & Society, Cities vs Cities & Housing) để bộ lọc gọn hơn.

## 3. Kiểm tra

Script audit mới sẽ kiểm: không trùng câu hỏi, mỗi topic Part 1/Part 3 tối thiểu 5 câu, mọi câu có model answer và useful language, không có dấu gạch ngang dài, chính tả câu hỏi kết thúc bằng dấu hỏi. Yêu cầu 0 lỗi, kèm typecheck và kiểm tra trên trình duyệt.

## Ghi chú kỹ thuật
- `src/pages/SpeakingPractice.tsx`: thêm nút audio trong 3 tab, state audio dùng chung, dừng khi đổi câu/ghi âm.
- Dùng `playEnglishTts` / `stopEnglishTts` trong `src/lib/englishTts.ts` (không thêm dịch vụ mới).
- Dữ liệu mới đặt trong file mở rộng riêng (`speakingPracticeExpansion4.ts`, ...) và ghép vào `src/data/speakingPracticeData.ts`.
- Không thay đổi cơ sở dữ liệu.

# Gọn menu thả xuống mục English trong Navbar

## Mục tiêu
Thu gọn menu dropdown "English" bằng cách gộp 3 cặp mục hiện tại thành 1 mục duy nhất, giữ nguyên toàn bộ nội dung và đường dẫn bên trong.

## Thay đổi cụ thể trong `src/components/Navbar.tsx`

Sửa mảng `englishSubs` (dòng ~256) để gộp như sau:

1. **Gộp "Other International Exams" + "National Exam Prep" → "Other English Exams"**
   - Nhãn mới: `🌐 Other English Exams` / `🌐 Các kỳ thi tiếng Anh khác`
   - Giữ nguyên các con: TOEIC, PTE Academic, SAT, Essential Grammar & Vocabulary, Exam Practice Room.

2. **Gộp "English Fun Facts" + "Learn through Songs" → "Fun English Lessons"**
   - Nhãn mới: `✨ Fun English Lessons` / `✨ Bài học tiếng Anh vui`
   - Giữ nguyên các con: `/english/fun-facts`, `/songs/english`.

3. **Gộp "Speaking Coach" + "Presentation & Public Speaking Studio" → "Speaking Coach"**
   - Nhãn mới: `🎙️ Speaking Coach` / `🎙️ Luyện nói`
   - Giữ nguyên các con: `/speaking-coach/english`, `/presentation-studio`.

## Giữ nguyên
- Tất cả đường dẫn (`to`) và icon hiện tại.
- Các nhóm còn lại: Overview, Placement Test & Personalization, Foundational English, Cambridge Starters -> PET, Cambridge IELTS, Specialized English.
- Vị trí các divider hiện tại; chỉ điều chỉnh nhãn và cấu trúc nhóm.

## Kiểm tra
- TypeScript (`tsc` hoặc `tsgo`) không lỗi.
- Mở preview, hover vào "English" để xác nhận menu ngắn hơn, 3 nhóm mới hiển thị đúng, các mục con vẫn click được.
- Kiểm tra mobile drawer nếu menu English cũng render từ cùng `englishSubs`.

## Plan: Rà soát và sửa toàn bộ bài học IELTS Reading & Listening

### Vấn đề phát hiện

1. **Bài True/False/Not Given thiếu passage hiển thị rõ ràng**: Đoạn văn được nhúng trong trường `instruction` nhưng component `FillInBlankExercise` chỉ render instruction như tiêu đề nhỏ (`h3`), không hiển thị passage riêng biệt.
2. **Trường `textEn` trống** trong toàn bộ file `englishIeltsReadingListening3.ts` (12 bài) — người dùng chọn English sẽ thấy câu trống.
3. **Nhiều bài Reading chỉ dạy chiến lược chung**, chưa có bài tập thực hành với passage thực tế (chỉ điền từ về "khái niệm chiến lược").

### Giải pháp

#### Bước 1: Cập nhật component `FillInBlankExercise`

- Tách phần `Passage:` khỏi `instruction` — nếu instruction chứa `\n\nPassage:`, render passage trong một block riêng với style nổi bật (background, border, italic) trước phần bài tập.
- Giữ nguyên phần còn lại của instruction làm tiêu đề.

#### Bước 2: Sửa `textEn` trống trong `englishIeltsReadingListening3.ts`

- Điền đầy đủ `textEn` cho tất cả 18 sentences (6 bài Reading + 6 bài Listening) trong file này.

#### Bước 3: Thêm passage thực hành cho các bài Reading quan trọng

Các bài cần bổ sung passage + bài tập thực hành thực tế:

- **Matching Headings** (ielts-reading-3): thêm đoạn văn mẫu + bài matching
- **Yes/No/Not Given Advanced** (ielts-reading-16): thêm passage + bài tập Y/N/NG
- **Short Answer Questions** (ielts-reading-17): thêm passage + bài tập

Các bài khác đã có bài tập phù hợp (vocabulary-focused exercises hợp lý cho lessons dạy strategy).

#### Bước 4: Kiểm tra quiz answer index

- Xác nhận tất cả `answer` index nằm trong phạm vi `options` (đã kiểm tra, chỉ có 1 chỗ dùng `answer: 0` ở classification — đúng logic).

### Files cần sửa

- `src/components/exercises/FillInBlankExercise.tsx` — thêm render passage block
- `src/data/languageCurriculum/englishIeltsReadingListening3.ts` — điền textEn
- `src/data/languageCurriculum/englishIelts.ts` — cải thiện bài T/F/NG gốc
- `src/data/languageCurriculum/englishIeltsReadingListening.ts` — bổ sung passage cho Matching Headings

&nbsp;

Sổ ghi chú nhanh đang bị khuất sau icon Dictionary ở 1 số trang, hãy dời sổ ghi chú nhanh sang cạnh AI Chatbot để không bị khuất nữa. 
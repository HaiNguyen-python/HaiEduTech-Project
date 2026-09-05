# Gọn menu Cambridge IELTS và bổ sung từ vựng bài đọc

## 1. Menu con Cambridge IELTS

- Menu con hiện mở ngang đúng dòng đang trỏ chuột nên thường tụt sâu xuống dưới. Sẽ nâng menu con lên một khoảng cố định (khoảng 48-56px) so với dòng đang trỏ, vẫn kẹp trong màn hình và vẫn tự lật lên/lật sang trái khi thiếu chỗ.
- Gộp "Vocab Arena" vào trang IELTS Vocabulary: thêm một mục mới ngay cạnh mục "Luyện tập" (Practice) trong hàng tab của trang từ vựng. Bỏ dòng "Vocab Arena" khỏi menu thả xuống; đường dẫn `/vocab-arena` vẫn giữ nguyên để các liên kết cũ không lỗi.

## 2. Tạm ẩn IELTS Smart Grading

- Bỏ dòng "IELTS Smart Grading" khỏi menu thả xuống, giữ nguyên trang `/ai-grading` và toàn bộ chức năng để có thể bật lại sau.

## 3. Từ vựng cuối bài IELTS Reading

Kiểm tra thực tế: có 45 bài đọc, nhưng chỉ 2 bài (rx-1, rx-2) có đủ danh sách từ vựng; 43 bài còn lại thiếu hoàn toàn hoặc chỉ có 3-5 từ (rx-3, rx-4, rx-5, rx-cam-1, rx-cam-2 và toàn bộ rx-cam-3 đến rx-cam-26, rx-hard-1 đến rx-hard-14).

- Viết bổ sung 8-10 từ/cụm cho từng bài còn thiếu, lấy đúng từ nội dung bài đọc đó: từ, loại từ, phiên âm, nghĩa tiếng Việt và một câu ví dụ trích/ dựa trên bài.
- Đặt phần mới trong một tệp dữ liệu riêng và ghép với dữ liệu hiện có, không sửa nội dung 2 bài đã có.
- Thêm bước kiểm tra tự động: mọi bài đọc phải có ít nhất 8 từ, không trùng lặp trong cùng bài, từ phải xuất hiện trong bài đọc, có nghĩa tiếng Việt, không dùng dấu gạch dài.

## Giữ nguyên

Nội dung câu hỏi, đáp án, ID bài, đường dẫn, dữ liệu tiến độ và phần lưu vào sổ tay.

## Chi tiết kỹ thuật

- `src/components/Navbar.tsx`: chỉnh `updateFlyoutPosition` (dịch `top` lên, vẫn clamp theo `window.innerHeight`), bỏ 2 entry trong `ieltsChildren`.
- `src/pages/IeltsVocabulary.tsx`: thêm tab `arena` cạnh tab `exercise`, render component Vocab Arena hiện có; route cũ giữ nguyên.
- Dữ liệu mới: `src/data/ieltsReadingVocabExpansion.ts`, merge trong `src/pages/IeltsReadingPractice.tsx` (nơi đang đọc `READING_VOCAB`).
- Kiểm tra: script audit từ vựng mới + `scripts/audit_ielts_reading.ts` báo 0 issues, TypeScript sạch, kiểm tra trực tiếp trên trình duyệt (menu và cuối một vài bài Reading).

# Template Practice - luyện nói theo từng bước, bỏ ô gõ text

Biến khối "The framework" thành phần luyện nói: mỗi bước có câu mẫu hoàn chỉnh (không chỉ starters), nút nghe và nút thu âm để học sinh nói lại đúng câu đó.

## Học sinh sẽ thấy gì

Với mỗi bước của khung (ví dụ Part 2: Intro - Details - Story/Why - Feeling & Wrap-up):

1. Tên bước + mục tiêu + thời lượng gợi ý (giữ như hiện tại).
2. **Câu mẫu hoàn chỉnh** cho đúng bước đó, theo dạng câu hỏi đang chọn - 2 câu mẫu mỗi bước:
   - Câu mẫu chính lấy từ bài mẫu Band 7.5 của dạng câu hỏi (đang có sẵn).
   - Một câu mẫu thứ hai (biến thể) để học sinh thấy cùng khung có thể nói cách khác.
   - Mỗi câu mẫu tô đậm cấu trúc/ngữ pháp chính (ví dụ "used to ... whereas these days ...", "The main reason is that ...") kèm một dòng ghi chú song ngữ ngắn nói rõ đây là cấu trúc gì.
3. **Nút 🔊 Nghe**: đọc câu mẫu bằng giọng Anh (tốc độ thường và tốc độ chậm).
4. **Nút 🎙 Thu âm**: học sinh nói lại đúng câu mẫu; khi dừng, hệ thống so khớp lời nói với câu mẫu và hiện:
   - Phần trăm khớp từ (accuracy %) + màu xanh/vàng/đỏ.
   - Câu học sinh vừa nói, tô đỏ những từ đọc thiếu hoặc sai.
   - Nút "Thu lại" để làm lại ngay.
5. Đánh dấu ✓ cho bước đã đọc đạt (>= 80%), thanh tiến độ đổi thành "3/4 bước đã luyện" và lưu lại theo dạng câu hỏi (localStorage) nên quay lại vẫn còn.

Bỏ hoàn toàn ô gõ text (textarea) và nút "Copy dàn ý"/"Clear all" liên quan tới việc gõ; thay bằng "Luyện lại tất cả" (reset kết quả thu âm). Phần bài mẫu có chú thích và Câu hỏi luyện thêm ở dưới giữ nguyên.

## Kỹ thuật

- `src/data/speakingTemplateTypes.ts`: mở rộng mỗi `AnnotatedLine` thành `{ stepId, text, altText, focusVi, focusEn, highlight }` - câu mẫu 2, ghi chú cấu trúc, và cụm cần tô đậm. Bổ sung cho cả 14 dạng câu hỏi (Part 1/2/3).
- `src/components/ielts/SpeakingTemplateLab.tsx`: thay khối textarea + starters-click bằng component mới `TemplateSentenceDrill` (một bước = một thẻ): phát audio qua `src/lib/englishTts.ts` (đang dùng cho các mục khác, có chunking chống ngắt giữa câu), thu âm + so khớp bằng Web Speech API `webkitSpeechRecognition` theo đúng cách các mục Speaking Coach / Finnish đang làm (`manualStopRef`, continuous, tự reset).
- Điểm khớp: chuẩn hóa lowercase, bỏ dấu câu, so khớp theo từ (giống logic accuracy % ở Speaking Coach), lưu `{ stepId: bestScore }` vào localStorage key `speaking-template-drill-{typeId}`.
- Không đổi logic chấm điểm AI, SRS, hay dữ liệu câu hỏi Part 1/2/3.

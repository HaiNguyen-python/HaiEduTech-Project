# Bỏ hộp "Key phrases and vocabulary" và rà soát 3 mục English

## 1. Bỏ hộp chip ở cuối mỗi hội thoại

Hộp "Cụm từ và từ vựng trọng tâm / Key phrases and vocabulary" (các nút bấm để nghe) xuất hiện dưới mỗi hội thoại ở cả ba nơi: Conversational English, Business English và Academic English. Sẽ bỏ hoàn toàn hộp này.

Giữ nguyên:
- In đậm cụm từ quan trọng và gạch chân từ vựng ngay trong câu hội thoại.
- Dòng chú thích ngắn phía dưới hội thoại (đậm = cụm từ hay, gạch chân = từ vựng), để học viên vẫn hiểu ý nghĩa của các dấu.
- Danh sách từ vựng riêng của bài, nút nghe từng câu, audio, bài tập.

## 2. Rà soát toàn bộ Business / Academic / Conversational English

- Mở lần lượt: trang chủ hai khoá, một bài Core đủ 5 bước (Understand, Phrases, Model, Guided, Check), và các thẻ Lab (Learn, Conversation, Speak, Challenge), cùng một bài Conversational English.
- Kiểm tra trên máy tính và điện thoại: không tràn ngang, chữ đọc được cả khi trỏ chuột vào, chữ tối thiểu 16px trên điện thoại, khoảng trắng cân đối sau khi bỏ hộp chip.
- Kiểm tra âm thanh: nút nghe từng câu và trình phát hội thoại vẫn chạy, và dừng khi rời bài.
- Kiểm tra bài tập: đáp án chỉ hiện sau khi chọn, tiến độ vẫn lưu, quay lại danh sách bài đúng chỗ.
- Chạy lại các bản kiểm tra nội dung sẵn có của hai khoá và phần Lab, cùng bản kiểm tra nhấn mạnh hội thoại; báo lại nếu có mục nào cần bổ sung nội dung.
- Sau khi rà soát sẽ báo danh sách những điểm còn nên chỉnh (nếu có) trước khi sửa thêm.

## Chi tiết kỹ thuật

- `src/components/PurposeCommunicationLab.tsx`: xoá khối chip (dòng ~330-362) và biến `vocabInDialogue`; giữ `resolveDialogueKeyPhrases` cho phần in đậm.
- `src/pages/ConversationalLessonView.tsx`: xoá khối chip (dòng ~337-369) và `vocabInDialogue`; giữ legend và highlight.
- Dọn import `Volume2`/`playEnglishTts` chỉ khi không còn dùng ở chỗ khác trong file.
- Không đổi route, id bài học, khoá tiến độ (`haiedu-business-english-v1`, `haiedu-academic-english-v1`, `conv-eng-progress`), dữ liệu hay backend.
- Kiểm chứng: `bunx tsgo --noEmit -p tsconfig.app.json`, `scripts/audit_purpose_english_core.ts`, `scripts/audit_purpose_english_lab.ts`, `scripts/audit_dialogue_emphasis.ts`, `scripts/audit_hover_contrast.mjs`, và ảnh chụp Playwright ở 1280px và 390px.

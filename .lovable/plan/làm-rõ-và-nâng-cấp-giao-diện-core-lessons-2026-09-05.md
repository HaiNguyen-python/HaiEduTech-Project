# Làm rõ và nâng cấp giao diện Core Lessons

## Mục tiêu

Làm toàn bộ Core Lessons của Business English và Academic English dễ đọc, rõ cấp bậc thông tin và chuyên nghiệp hơn, đồng thời giữ nguyên nội dung học, đáp án, ID bài, tiến độ và các chức năng hiện có.

## 1. Sửa các đoạn văn bị dính và quá hẹp

- Chỉnh cách chia phần lý thuyết theo số khối thực tế: một khối dùng toàn chiều ngang, hai khối chia hai cột, ba khối mới chia ba cột. Không để một đoạn dài nằm trong cột chỉ rộng 1/3 như hiện tại.
- Tách câu và ý thành các đoạn có khoảng cách rõ; giới hạn chiều dài dòng đọc, tăng line-height và khoảng cách giữa các đoạn.
- Trình bày `Core rule`, `How to apply`, `Watch out` thành các khối hướng dẫn phân biệt rõ bằng biểu tượng, nhãn và đường nhấn, nhưng không lồng nhiều lớp thẻ.
- Rà soát bài mẫu, lời giải, câu hỏi song ngữ và phần luyện tập để văn bản dài tự xuống dòng, không dính vào nút hoặc cột bên cạnh.

## 2. Tăng độ rõ của toàn bộ chữ

- Thay chữ nội dung quan trọng đang dùng màu mờ bằng màu đọc chính hoặc màu phụ có tương phản cao hơn trong phạm vi Core Lessons, không đổi token toàn trang.
- Giữ màu nhạt chỉ cho metadata thật sự phụ; tăng độ đậm và cỡ chữ cho mô tả chặng, mục tiêu bài, bản dịch, giải thích, thời lượng và trạng thái.
- Không dùng cỡ quá nhỏ cho nội dung cần đọc; bảo đảm tối thiểu 16px cho nội dung chính trên điện thoại.
- Làm rõ trạng thái thường, hover, focus, đã học và đang học; chữ không đổi sang màu khó đọc khi rê chuột.

## 3. Trang trí bài học theo hướng chuyên nghiệp

- Nâng phần đầu bài thành header học tập rõ ràng với chủ đề, số bài, mục tiêu, thời lượng và tiến độ được phân nhóm hợp lý.
- Chuẩn hóa năm phần `Understand`, `Phrases`, `Model`, `Guided`, `Check` bằng số bước, biểu tượng và màu nhấn semantic nhất quán.
- Cải thiện bảng cụm từ thành các hàng dễ quét: cụm từ, loại từ/nghĩa, ví dụ/bản dịch và nhóm nút nghe có khoảng cách ổn định.
- Làm phần bài mẫu giống tài liệu thực tế hơn, có nhãn vai trò rõ và nhịp dòng thoáng.
- Làm các câu luyện tập, đáp án và giải thích thành từng nhóm thị giác rõ; vẫn chỉ hiện đáp án sau khi học sinh chọn.
- Tinh chỉnh lộ trình bên ngoài: tăng tương phản mô tả, kỹ năng, thời lượng và nội dung từng bài; giữ cấu trúc timeline hiện tại nhưng làm trạng thái chặng nổi bật hơn.

## 4. Khả năng đọc trên mọi màn hình

- Desktop: tránh cột quá hẹp, giữ chiều dài dòng hợp lý và cân bằng khoảng trắng.
- Mobile: chuyển các phần nhiều cột thành một cột, nút audio không chèn vào chữ, thanh bước cuộn ngang an toàn và không có tràn ngang toàn trang.
- Tôn trọng chế độ giảm chuyển động và giữ focus ring cho bàn phím.

## 5. Kiểm tra hoàn thiện

- Chạy kiểm định nội dung Core cho đủ 48 bài, xác nhận không thay đổi câu hỏi/đáp án hoặc logic reveal.
- Chạy kiểm tra TypeScript.
- Kiểm tra trực tiếp Business English và Academic English ở desktop và mobile: lộ trình, cả 5 bước bài học, đoạn dài, cụm từ, bài mẫu, luyện tập, đáp án, hover/focus và audio.
- Xác nhận không tràn ngang, không chữ mờ khó đọc, không đoạn dài bị ép vào cột hẹp và tiến độ cũ vẫn được giữ.

## Chi tiết kỹ thuật

- Trọng tâm chỉnh sửa: `src/components/PurposeCoreLearningPath.tsx` và helper chia nội dung trong `src/lib/purposeEnglishLearning.ts`.
- Dùng semantic design tokens hiện có; không hard-code màu và không thay token toàn cục để tránh ảnh hưởng các khu vực khác.
- Giữ nguyên routes, lesson IDs, storage keys, filters, audio/TTS, guided activities và progress behavior.

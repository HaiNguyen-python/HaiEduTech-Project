# Rà soát và hoàn thiện highlight cụm từ trong toàn bộ Conversation

## Mục tiêu

Làm nổi bật đầy đủ nhưng có chọn lọc các cụm từ thực sự đáng học trong hội thoại của Conversational English, Business English và Academic English. Giữ giao diện dễ đọc, không biến cả câu thành chữ đậm.

## Hiện trạng đã kiểm tra

- Cả ba nhóm đang dùng chung một bộ nhận diện gồm ngân hàng cụm cố định, một số mẫu câu tổng quát và từ vựng của từng bài.
- Phần hiển thị đã hỗ trợ: cụm từ hay in đậm, từ vựng bài học gạch chân và ưu tiên cụm dài để tránh chồng dấu.
- Bản kiểm tra hiện tại chỉ yêu cầu mỗi hội thoại Business/Academic có ít nhất một cụm, chưa kiểm tra Conversational English và chưa đo độ phủ thực tế.
- Kết quả rà soát 138 hội thoại: 42/46 Business, 40/40 Academic và 52/52 Conversational có dưới một cụm nổi bật trên mỗi lượt nói. Năm hội thoại Conversational hiện không tìm thấy cụm nào.

## 1. Mở rộng nhận diện theo ngữ cảnh thực tế

- Rà từng hội thoại để bổ sung các cụm giao tiếp hoàn chỉnh đang bị bỏ sót, tập trung vào:
  - hỏi và trả lời tự nhiên;
  - đề nghị, xác nhận, làm rõ, phản hồi và kết thúc;
  - phỏng vấn, họp, đàm phán, dịch vụ khách hàng và giao tiếp công sở;
  - tranh luận, trình bày quan điểm, dẫn chứng, nghiên cứu và thảo luận học thuật;
  - tình huống đời sống như chỉ đường, y tế, nhà ở, thời tiết, thú cưng, ngân hàng và phương tiện công cộng.
- Bổ sung cả cụm cố định và mẫu linh hoạt có biến thể ngữ pháp, thay vì chỉ liệt kê từng câu nguyên văn.
- Ưu tiên cụm B1+ có thể tái sử dụng. Không làm đậm từ đệm, câu trả lời một từ, tên riêng, số liệu hoặc đoạn quá dài.
- Khi một cụm dài và một cụm ngắn trùng nhau, chỉ giữ cụm dài có giá trị học tập cao hơn.

## 2. Hoàn thiện highlight từ vựng

- Giữ gạch chân cho từ/cụm từ trong danh sách Vocabulary của bài.
- Mở rộng đối sánh các biến thể thông dụng của danh từ, động từ và chính tả Anh - Mỹ khi chúng xuất hiện trong hội thoại.
- Không để một đoạn vừa in đậm vừa gạch chân lộn xộn. Cụm quan trọng được ưu tiên theo quy tắc rõ ràng, phần từ vựng còn lại vẫn được nhận diện độc lập.

## 3. Nâng cấp bản kiểm tra độ phủ

- Mở rộng kiểm tra tự động sang cả Conversational English, không chỉ Business và Academic.
- Báo riêng từng hội thoại có:
  - không có cụm nổi bật;
  - quá ít cụm so với số lượt nói;
  - cụm quá ngắn hoặc không có giá trị học tập;
  - cụm bị lặp hoặc bị một cụm dài che sai.
- Đặt ngưỡng thực tế theo độ dài hội thoại: tối thiểu 3 cụm chất lượng cho hội thoại 8 lượt, đồng thời rà thủ công các trường hợp biên thay vì tăng số lượng máy móc.
- Chạy kiểm tra đến khi không còn hội thoại trắng và không còn hội thoại dưới ngưỡng mà chưa được xem xét.

## 4. Kiểm tra hiển thị và tính ổn định

- Kiểm tra mẫu đại diện và các bài đang có độ phủ thấp nhất trong cả ba nhóm trên máy tính và điện thoại.
- Xác nhận cụm in đậm và từ gạch chân dễ phân biệt trên cả hai phía bong bóng hội thoại, kể cả khi rê chuột.
- Xác nhận không vỡ câu, không tràn ngang, không làm thay đổi nút nghe, audio, bài tập, tiến độ hoặc điều hướng.
- Chạy kiểm tra TypeScript, kiểm tra nội dung Business/Academic/Lab, kiểm tra highlight và kiểm tra tương phản.

## Chi tiết kỹ thuật

- Mở rộng `src/lib/dialogueKeyPhrases.ts` bằng ngân hàng cụm theo chức năng và các mẫu nhận diện có giới hạn rõ ràng.
- Củng cố `src/lib/highlightKeywords.ts` cho biến thể từ, ưu tiên cụm dài và xử lý chồng khớp.
- Nâng cấp `scripts/audit_dialogue_emphasis.ts` để quét đủ 138 hội thoại và xuất báo cáo độ phủ theo bài/tình huống.
- Chỉ thay đổi logic highlight và bản kiểm tra. Giữ nguyên nội dung hội thoại, route, lesson ID, dữ liệu tiến độ và backend.

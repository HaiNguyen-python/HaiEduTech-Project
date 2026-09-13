# Nâng cấp ví dụ từ vựng và luyện nói Structures

## Mục tiêu

1. Trong mỗi câu ví dụ Vocabulary, in đậm đúng cụm từ mục tiêu hoặc biến thể ngữ pháp của cụm từ đó.
2. Trong mục Structures, bổ sung câu ví dụ hoàn chỉnh, nút nghe và nút **Speak your sentence** để học sinh tự áp dụng cấu trúc rồi nhận điểm, góp ý và câu nâng cấp tương tự Vocabulary.

## Phạm vi đã xác nhận

- Vocabulary hiện có câu ví dụ, nút nghe và phần luyện nói có microphone, chấm AI, thử lại, nghe câu sửa và lưu điểm tốt nhất.
- Structures hiện hiển thị mẫu câu, chức năng của mẫu, hai tốc độ nghe chính mẫu câu, nhưng chưa có câu ví dụ riêng hoặc phần luyện đặt câu trong danh sách học.
- Dữ liệu Structures được tổng hợp theo Part và chủ đề. Khi tính theo từng chủ đề có 3.937 lượt hiển thị, tương ứng 864 mẫu câu duy nhất trên cả ba Part.

## Thay đổi giao diện

### Vocabulary

- Tách câu ví dụ thành các đoạn văn bản an toàn và bọc phần khớp với cụm từ bằng chữ đậm.
- Hỗ trợ biến thể thực tế như `one's` thành `my/his/her`, động từ chia thì, và cụm có phần bổ sung sau giới từ.
- Không dùng HTML thô; giữ nguyên nút nghe, nút luyện nói và bố cục hai cột hiện tại.
- Nếu không tìm được biến thể đáng tin cậy, giữ câu ví dụ bình thường thay vì in đậm sai từ.

### Structures

Mỗi ô Structures sẽ có bố cục tương đồng Vocabulary:

```text
Mẫu cấu trúc                              [Nghe] [Nghe chậm]
Nhãn chức năng
Example: câu hoàn chỉnh áp dụng mẫu       [Nghe câu ví dụ]
[Speak your sentence]
```

- Sinh một câu ví dụ hoàn chỉnh theo Part, chủ đề và chức năng của cấu trúc; thay các dấu `...` bằng nội dung tự nhiên thay vì đọc dấu ba chấm.
- In đậm phần khung cấu trúc chính trong câu ví dụ khi có thể xác định chính xác.
- Nút nghe câu ví dụ dùng giọng tiếng Anh hiện có.
- Mỗi lần chỉ mở một ô luyện nói để danh sách gọn trên máy tính và điện thoại.

## Luyện nói và chấm điểm Structures

- Dùng chung trải nghiệm microphone hiện có: bắt đầu, dừng và chấm, giữ bản ghi khi lỗi, chấm lại, thử lại, đóng phần luyện.
- Trước khi gọi AI, kiểm tra câu đủ độ dài và có dấu hiệu sử dụng khung cấu trúc. Việc kiểm tra phải hiểu phần cố định của mẫu và bỏ qua các chỗ trống `...`.
- Mở rộng bộ chấm câu hiện tại để nhận loại bài `vocabulary` hoặc `structure`:
  - Vocabulary tiếp tục chấm cách dùng cụm từ.
  - Structure chấm đúng chức năng của mẫu câu, ngữ pháp, độ tự nhiên và độ rõ của bản nhận diện.
- Kết quả Structures gồm điểm 0-100, bốn tiêu chí, nhận xét ngắn, câu sửa và câu nâng cấp có nút nghe.
- Lưu điểm tốt nhất, số lượt và lần luyện gần nhất bằng khóa riêng cho từng Part, chủ đề và cấu trúc; không tự động đánh dấu đã thuộc hoặc thay đổi điểm quiz.
- Ghi hoạt động học tập cho học sinh đăng nhập bằng cơ chế hiện có, với loại hoạt động riêng để phân biệt Vocabulary và Structures.

## Nội dung và kiểm tra chất lượng

- Tạo bộ sinh ví dụ Structures có các mẫu phù hợp Part 1, Part 2 và Part 3, đồng thời ưu tiên nội dung gắn với chủ đề đang học.
- Kiểm tra toàn bộ mẫu câu để phát hiện ví dụ còn dấu `...`, câu thiếu chủ ngữ/vị ngữ, câu quá ngắn, mẫu không được thể hiện, hoặc ví dụ lặp quá nhiều.
- Kiểm tra toàn bộ Vocabulary để bảo đảm phần in đậm khớp đúng cụm mục tiêu hoặc biến thể hợp lệ.
- Bổ sung kiểm thử cho bộ tách đoạn in đậm, nhận diện cấu trúc trong bản ghi, chuẩn hóa kết quả chấm và lưu điểm tốt nhất.

## Xác nhận trước khi hoàn tất

- Gọi thử dịch vụ chấm thật với: câu dùng đúng cấu trúc, câu sai ngữ pháp, câu không dùng cấu trúc và câu quá ngắn.
- Kiểm tra trực tiếp trên trang hiện tại ở màn hình 1187px và điện thoại: câu ví dụ, chữ đậm, nghe thường/chậm, microphone, chấm, chấm lại, nghe câu nâng cấp và tải lại để xác nhận điểm còn lưu.
- Bảo đảm không tràn ngang, nút không lệch, mỗi nút âm thanh có nhãn hỗ trợ và các trạng thái đang nghe/thu/chấm/lỗi rõ ràng.
- Chạy kiểm tra nội dung, kiểm thử tự động, TypeScript và lint.

## Không thay đổi

- Giữ nguyên đường dẫn, Part, chủ đề, dữ liệu câu hỏi, ID bài học, tiến độ quiz và quy tắc Mastered hiện có.
- Không thay đổi các phần IELTS Speaking khác hoặc cấu trúc điều hướng.

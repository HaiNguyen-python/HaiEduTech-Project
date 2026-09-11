# Câu hỏi ôn tập trong Your Corner: chuyển sang tiếng Anh, bỏ chữ A B C D bị lặp

Hiện trạng đã kiểm tra: câu hỏi ôn tập được tạo tự động bởi hàm `auto-community-poll`, và prompt đang yêu cầu AI viết bằng tiếng Việt. Khối hiển thị (`PollBlock.tsx`) tự thêm nhãn "A." "B." "C." "D." trước mỗi đáp án, còn AI cũng đưa sẵn "A." vào nội dung đáp án, nên xuất hiện "A. A. ..." như ảnh bạn gửi.

## Việc sẽ làm

1. **Nội dung tạo tự động 100% tiếng Anh**
   - Đổi yêu cầu gửi cho AI sang tiếng Anh: câu hỏi, 4 đáp án và phần giải thích đều bằng tiếng Anh, không dùng tiếng Việt.
   - Dòng giới thiệu bài đăng đổi thành tiếng Anh, ví dụ "📘 IELTS review question of the day!", giữ nguyên các hashtag hiện có.

2. **Không còn A B C D lặp lại**
   - Yêu cầu AI không đặt "A.", "B.", "1)", "-" ở đầu đáp án.
   - Thêm bước làm sạch khi lưu: tự cắt bỏ mọi tiền tố dạng chữ cái hoặc số ở đầu đáp án, để nhãn chữ cái chỉ do phần hiển thị tạo ra một lần.
   - Phần hiển thị cũng làm sạch tương tự, nên các bài đăng cũ đang bị lặp sẽ hiện đúng ngay lập tức mà không cần sửa dữ liệu.

3. **Nhãn quanh câu hỏi ôn tập**
   - Các nhãn nhỏ trong khối câu hỏi ("Câu hỏi ôn tập", "Chính xác!", "Đáp án", "Kết quả trực quan", "lượt bình chọn", "Bạn có thể đổi đáp án") chuyển sang song ngữ theo ngôn ngữ đang chọn của trang, nên khi xem tiếng Anh thì toàn bộ khối là tiếng Anh.

## Chi tiết kỹ thuật

- `supabase/functions/auto-community-poll/index.ts`: viết lại prompt bằng tiếng Anh, thêm hàm `stripOptionPrefix` (regex `^\s*(?:[A-Da-d][.)]|\d+[.)]|[-•])\s*`) áp dụng cho từng option trước khi insert; caption tiếng Anh. Deploy lại function.
- `src/components/your-corner/PollBlock.tsx`: dùng cùng hàm làm sạch tiền tố (đặt trong `src/lib/yourCornerMeta.ts` để chia sẻ), và bọc các nhãn tĩnh bằng `t(vi, en)` từ `useLanguage`.
- Không đổi schema, không đổi route, không sửa dữ liệu bài đăng cũ, giữ nguyên logic bình chọn và biểu đồ.
- Kiểm thử: `bunx tsgo --noEmit`, gọi thử function tạo 1 câu hỏi rồi kiểm tra hiển thị trên `/your-corner` ở desktop và mobile.

# Hoàn thiện in đậm cụm từ trong câu ví dụ Business và Academic English

## Hiện trạng đã xác nhận

- Cả Core Lessons và Communication Lab đều gọi cùng hàm `highlightKeywords`, nhưng hiện truyền nguyên `item.term` để tìm trong `item.example`.
- Cách khớp nguyên cụm làm bỏ sót khi tên mục từ là dạng từ điển hoặc mẫu câu, còn ví dụ dùng dạng tự nhiên. Ví dụ: `to chair a meeting` thành `chair the meeting`, `to rise sharply` thành `rose sharply`, `Would ... suit you?` thành `Would Tuesday ... suit you?`, hoặc `return on investment (ROI)` chỉ xuất hiện là `ROI`.
- Trong 480 cụm Core đã rà soát, có 94/240 cụm Business và 58/240 cụm Academic chưa khớp nguyên dạng. Các trường hợp này trải trên toàn bộ 24 bài Business và 20 bài Academic.

## Thay đổi sẽ thực hiện

### 1. Nhận diện đúng phần trọng tâm trong câu ví dụ

- Thêm bộ xử lý chuyển tên cụm từ thành các mẫu có thể xuất hiện tự nhiên trong câu.
- Hỗ trợ các nhóm chính:
  - bỏ `to` đầu cụm và nhận diện động từ chia thì như `chair/chairs/chaired`, `rise/rose/risen`, `fall/fell/fallen`;
  - mẫu có chỗ trống `...` hoặc ký hiệu ngữ pháp như `+ V-ing`;
  - cụm có viết tắt trong ngoặc như `(ROI)` và `(EOD)`;
  - đại từ hoặc danh từ thay thế trong mẫu như `someone`, `something`, `your`, `a ...`;
  - khác biệt nhỏ về dấu câu và viết hoa.
- Chỉ in đậm phần từ thực sự xuất hiện trong câu, không in đậm từ chen giữa một cách sai nghĩa và không làm thay đổi nội dung câu.
- Giữ nguyên kiểu hiện tại: chữ đậm, nền xanh nhạt, màu chữ theo giao diện sáng/tối.

### 2. Áp dụng đồng bộ

- Dùng cùng logic cho:
  - 48 Core Lessons của Business English và Academic English;
  - 43 Communication Labs của hai khóa.
- Không sửa cách phát âm, nút nghe chậm, nút đánh dấu đã luyện, câu ví dụ, bản dịch hoặc dữ liệu tiến độ.

### 3. Kiểm tra tự động toàn bộ dữ liệu

- Mở rộng audit Core và Lab để mỗi mục từ phải tạo được ít nhất một đoạn in đậm hợp lệ trong câu ví dụ.
- Audit sẽ báo chính xác mã bài, cụm từ và câu ví dụ nếu còn trường hợp chưa nhận diện.
- Bổ sung kiểm thử cho động từ thường, động từ bất quy tắc, mẫu có chỗ trống, ký hiệu ngữ pháp, viết tắt và ranh giới từ để tránh in đậm nhầm một phần của từ khác.

### 4. Kiểm chứng giao diện

- Chạy TypeScript, kiểm thử và audit nội dung cho cả hai khóa đến khi không còn cụm bị bỏ sót.
- Mở mẫu Business và Academic trên máy tính và điện thoại để xác nhận phần in đậm đúng cụm, không tràn hàng, không ảnh hưởng ba nút nghe/nghe chậm/đánh dấu.

## Bảo toàn

- Giữ nguyên route, ID bài học, thứ tự mở khóa, khóa lưu tiến độ và dữ liệu backend.
- Không viết lại câu ví dụ chỉ để ép khớp; ưu tiên nhận diện đúng cách cụm từ được biến đổi trong tiếng Anh tự nhiên.
- Không thay đổi nội dung song ngữ hoặc hoạt động TTS.

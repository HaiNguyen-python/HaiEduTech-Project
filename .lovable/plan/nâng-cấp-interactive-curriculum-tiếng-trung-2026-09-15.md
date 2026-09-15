# Nâng cấp Interactive Curriculum tiếng Trung

## Mục tiêu

Làm mới `/chinese/conversational/curriculum` và màn hình học chi tiết theo hướng **Professional Learning Path**, lấy cấu trúc rõ ràng của Business English nhưng giữ bản sắc tiếng Trung. Giữ nguyên 103 bài, 3 trụ cột, route, lesson ID, dữ liệu tiến độ, audio/TTS, bài tập, Listening và Roleplay.

## Hướng thiết kế đã chọn

- Bảng màu HaiEduTech sáng: Royal Blue, Soft Emerald và Warm Gold thông qua token giao diện.
- Sora cho tiêu đề, Manrope cho nội dung.
- Bố cục bảng điều phối với phân cấp rõ, mật độ chuyên nghiệp và góc bo tối đa 8px.
- Bài học luôn mở, không đưa trạng thái khóa từ bản mẫu vào sản phẩm.
- Chuyển động nhẹ khi mở nhóm, cập nhật tiến độ và tương tác; hỗ trợ giảm chuyển động.

## 1. Bảng điều phối chương trình

- Thay phần đầu hiện tại bằng bảng tổng quan gồm tiến độ tổng, số bài hoàn thành, trụ cột hiện tại và bài nên học tiếp.
- Thêm nút **Tiếp tục học** dẫn đến bài chưa hoàn thành gần nhất.
- Trình bày 3 trụ cột như thanh điều hướng rõ trạng thái, số bài đã xong và tiến độ riêng.
- Thêm tìm kiếm và bộ lọc **Tất cả / Đang học / Hoàn thành / Chưa học**.
- Đổi danh sách accordion hiện tại thành learning path chuyên nghiệp:
  - số thứ tự hoặc dấu hoàn thành;
  - tên Anh, Hán tự và mô tả không bị cắt cụt;
  - HSK, số tình huống, từ vựng, cấu trúc và thời lượng ước tính;
  - trạng thái rõ ràng và nút bắt đầu/tiếp tục;
  - phần mở rộng gọn với mục tiêu học và các hoạt động có trong bài.
- Trên điện thoại, các bộ lọc cuộn ngang an toàn, thông tin xuống dòng hợp lý và không tràn màn hình.

## 2. Màn hình học chi tiết

- Áp dụng nhịp học kiểu Business English: đầu bài rõ mục tiêu, tiến độ bước và điều hướng quay lại lộ trình.
- Giữ đủ 6 phần hiện có: Situations, Vocabulary, Structures, Exercises, Listening và Roleplay; trình bày như các bước học có số thứ tự, trạng thái và thanh tiến trình.
- Chuẩn hóa từng khu vực:
  - hội thoại dạng chat chuyên nghiệp, Hanzi nổi bật, Pinyin và bản dịch dễ quét, nút nghe dùng biểu tượng thống nhất;
  - từ vựng thành hàng học tập rõ nghĩa, ví dụ và audio;
  - cấu trúc có công thức, giải thích, ví dụ và audio;
  - bài điền từ và Listening chỉ hiện kết quả theo đúng hành động hiện tại;
  - Roleplay giữ nguyên chức năng và dữ liệu đầu vào.
- Thêm điều hướng bài trước/bài tiếp theo ổn định trên toàn bộ 3 trụ cột, không chỉ trong trụ cột đang mở.
- Dừng audio khi đổi phần, đổi bài hoặc rời màn hình để tránh phát chồng.

## 3. Tiến độ và độ ổn định

- Giữ nguyên khóa tiến độ `conv-cn-progress` và các khóa điểm `conv-cn-ex-{lessonId}`; chỉ bổ sung trạng thái giao diện tương thích ngược nếu cần.
- Làm sạch dữ liệu đọc từ bộ nhớ trước khi tính tiến độ để ID lỗi hoặc trùng không làm sai số.
- Đồng bộ tiến độ ngay trong cùng tab và giữa nhiều tab mà không cần tải lại.
- Không đổi hợp đồng ghi nhận hoạt động `conv_chinese` và `conv_chinese_exercise`.
- Bảo toàn nội dung English hiện đang hiển thị, Hanzi, Pinyin và dữ liệu dịch sẵn có.

## 4. Kiểm tra hoàn thiện

- Thêm kiểm tra cho tính duy nhất của lesson ID, tổng số bài, dữ liệu bắt buộc, tiến độ và bài tiếp theo.
- Chạy kiểm tra TypeScript và các bài kiểm tra liên quan.
- Kiểm tra trực tiếp desktop và mobile cho dashboard, tìm kiếm/lọc, mở bài, audio, Exercises, Listening, Roleplay, hoàn thành bài và quay lại lộ trình.
- Xác nhận không có chữ mờ, nội dung bị cắt, nút lệch, tràn ngang hoặc mất tiến độ sau khi tải lại.

## Chi tiết kỹ thuật

- Trọng tâm: `ChineseConversationalDashboard.tsx`, `ChineseConversationalLessonView.tsx` và helper nhỏ dùng chung cho tiến độ/điều hướng.
- Dùng các component điều khiển hiện có và token semantic; không hard-code màu trong JSX mới.
- Không sửa dữ liệu bài học trừ lỗi cấu trúc được audit xác nhận.
- Không thay đổi menu, backend hoặc các route khác.

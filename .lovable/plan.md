# Smart Grading cho đề viết bên ngoài

Thêm một mục mới trong IELTS Writing Practice để học sinh dán **đề bài của riêng mình** (đề ở trường, sách, đề thi thật) cùng bài viết, và được chấm ngay - không cần chọn đề có sẵn.

## Học sinh sẽ thấy gì

- Một thẻ mới trong hàng tab: "Chấm bài tự do / Smart Grading" (đặt ngay sau "Viết bài luận").
- Trong đó:
  - Chọn Task 1 hoặc Task 2.
  - Ô dán đề bài (bắt buộc, tối thiểu 10 từ).
  - Ô dán/viết bài luận, có đếm số từ và cảnh báo khi dưới 150/250 từ.
  - Với Task 1 có thêm ô tuỳ chọn mô tả biểu đồ/bảng (vì AI không xem được hình).
  - Nút "Chấm bài ngay", nút xoá, nút lưu vào Sổ tay.
- Kết quả trả về giống phần chấm hiện có: band tổng, 4 tiêu chí kèm điểm mạnh/yếu/gợi ý, danh sách lỗi kèm sửa, lời khuyên lên 0.5 band, và bản nâng cấp bài viết.
- Tiêu chí đúng theo task: Task 2 giữ "Task Achievement", Task 1 dùng "Task Achievement (Task 1)"; nhãn hiển thị theo task đang chọn.
- Thông báo rõ ràng khi thiếu đề, bài quá ngắn, hoặc AI đang quá tải/hết lượt.
- Song ngữ Việt - Anh, dùng bố cục và màu sắc giống phần chấm bài hiện tại, hoạt động tốt trên điện thoại.
- Bài chấm được ghi nhận vào tiến trình học như phần chấm hiện có.

## Chi tiết kỹ thuật

- `src/pages/IeltsWritingPractice.tsx`: thêm tab `free-grade` (TabsList từ 6 lên 7 cột trên desktop, vẫn 3 cột mobile) và `TabsContent` render component mới.
- Component mới `src/components/ielts/FreeWritingGrader.tsx`: state riêng (taskType, prompt, chartDescription, essay, result, loading), gọi `supabase.functions.invoke("grade-writing", { body: { essay, prompt, taskType, chartDescription } })` với timeout client 90s như hiện tại, chạy song song `fetchUpgradedEssay` từ `src/lib/upgradeWriting.ts`, xử lý lỗi qua `handleAiError`/toast, log qua `logStudentActivity` (`ielts_writing`, metadata `{ mode: "free_prompt", task: taskType }`).
- Tái sử dụng phần hiển thị kết quả: tách khối render kết quả hiện tại trong `IeltsWritingPractice.tsx` thành `src/components/ielts/WritingResultPanel.tsx` (props: result, upgradeLoading, taskType) và dùng lại ở cả hai chỗ, để giao diện luôn đồng bộ.
- `supabase/functions/grade-writing/index.ts`: nhận thêm `prompt`, `taskType`, `chartDescription` (đều optional, giữ tương thích với lời gọi cũ). System prompt chọn bộ tiêu chí Task 1 hoặc Task 2, nêu rõ phải chấm mức độ trả lời đúng đề đã cho, và yêu cầu chỉ dựa vào phần mô tả biểu đồ khi có. Validate `prompt` tối đa ~2000 ký tự, `essay` tối đa ~6000 ký tự, trả 400 kèm thông báo rõ ràng. Deploy lại function.
- Không đổi route, không đổi ngân hàng đề, không đổi dữ liệu/draft hiện có.
- Kiểm tra: `npx tsgo --noEmit`, gọi thật `grade-writing` với đề tự nhập cho Task 1 và Task 2 (đọc phản hồi), và duyệt trình duyệt ở 1280x1800 + khổ điện thoại để xem tab mới, chấm bài, và hiển thị kết quả.

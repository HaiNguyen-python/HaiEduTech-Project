# Lifestyle Academy: sửa lỗi mở bài học + quiz + biểu đồ kỹ năng mềm

## 1. Sửa lỗi bấm vào bài học không hiện gì

Trong ảnh bạn gửi, thẻ bài học có một khoảng trống lớn phía dưới và **không thấy nút "Xem bài học đầy đủ"**. Nguyên nhân: phần nội dung bên trong thẻ được đặt chiều cao bằng cả thẻ (đã tính cả ảnh), nên phần cuối bị đẩy tràn ra ngoài và bị cắt mất. Vì vậy không có gì để bấm.

Cách sửa:
- Sắp xếp lại chiều cao thẻ để nút luôn nằm trong thẻ, mọi thẻ cùng chiều cao.
- Cho **bấm vào bất cứ đâu trên thẻ** (ảnh, tiêu đề, nút) đều mở bài học, có hỗ trợ bàn phím (Enter/Space) và Esc để đóng.
- Kiểm tra lại trên máy tính và điện thoại.

## 2. Mỗi bài học có phần Quiz kiểm tra

- Cuối pop-up bài học thêm mục **"Kiểm tra kiến thức"**: 4 câu hỏi trắc nghiệm song ngữ cho mỗi bài (102 bài).
- Chọn đáp án rồi bấm "Kiểm tra": đúng/sai hiện màu rõ ràng kèm **giải thích** lấy từ chính nội dung bài. Không tiết lộ đáp án trước khi trả lời.
- Có nút "Làm lại". Đạt từ 75% trở lên thì bài được ghi là **Hoàn thành**, thẻ bài học hiện dấu tích.
- Điểm được lưu lại: học sinh đã đăng nhập lưu trên hệ thống, khách lưu tạm trên máy.

## 3. Biểu đồ kỹ năng mềm

Thêm mục **"Biểu đồ kỹ năng mềm"** ngay đầu trang Lifestyle Academy:
- Biểu đồ radar 6 trục theo 6 nhóm: Tài chính, Ứng xử, Khí chất, Thân thể, Tự học, Tiệc tùng & Sự kiện.
- Mỗi trục = phần trăm bài đã hoàn thành trong nhóm, có tính điểm quiz trung bình.
- Kèm số bài hoàn thành / tổng, điểm quiz trung bình, và gợi ý "nhóm nên học tiếp" (nhóm điểm thấp nhất).
- Khi chưa học bài nào: hiện trạng thái trống mời làm bài đầu tiên.
- Biểu đồ cũng xuất hiện trong bảng điều khiển học sinh (tab Tổng quan) dưới dạng thẻ nhỏ.

## Chi tiết kỹ thuật

**Sửa layout thẻ**: trong `src/pages/LifestyleAcademy.tsx` (`LessonCard`, dòng ~846-928) đổi `Card` thành `flex h-full flex-col`, bỏ `h-full` trên `CardContent`, giữ `flex-1` spacer. Thêm `role="button"`, `tabIndex={0}`, `onClick`/`onKeyDown` mở dialog trên toàn thẻ; nút bên trong dùng `stopPropagation` không cần thiết vì cùng hành động.

**Dữ liệu quiz**: thêm `src/data/lifestyleQuizzes.ts` + `src/lib/lifestyleQuizBuilder.ts`. Builder sinh 4 câu hỏi song ngữ cho mỗi bài từ `takeaways`, `frameworkVi/En`, `whyItMatters`, `drill` (mô hình giống `ieltsLectureQuizPadder.ts`): 1 câu về khung tư duy, 2 câu về điểm cốt lõi, 1 câu về áp dụng thực tế; nhiễu lấy từ takeaway của bài khác cùng nhóm, chọn xác định (deterministic theo id) để không đổi mỗi lần tải. Bài nào cần chính xác hơn thì ghi đè bằng bộ câu hỏi viết tay trong `lifestyleQuizzes.ts`.

**Component mới**:
- `src/components/lifestyle/LessonQuiz.tsx` - render quiz trong `LessonDialog` sau mục Bài tập thực hành.
- `src/components/lifestyle/SoftSkillsRadar.tsx` - recharts `RadarChart` (như `VFFAnalytics.tsx`), token màu semantic, min 16px chữ trên mobile.
- `src/hooks/useLifestyleProgress.ts` - đọc/ghi tiến trình, hợp nhất localStorage (khách) và bảng dữ liệu (đã đăng nhập), tính điểm từng trụ cột.

**Backend**: migration tạo `public.lifestyle_lesson_progress` (`id`, `user_id`, `lesson_id text`, `pillar text`, `score int`, `max_score int`, `completed boolean`, `updated_at`), unique `(user_id, lesson_id)`; GRANT cho `authenticated` + `service_role`; bật RLS với policy `auth.uid() = user_id` cho select/insert/update/delete. Không có quyền `anon`.

**Ghi nhận hoạt động**: khi hoàn thành quiz, gọi `logStudentActivity` với `activityType: "lifestyle_quiz"`, `activityId: lesson.id`, `domain: "english"` để hiện trong Activity Log.

**Audit**: mở rộng `scripts/audit_lifestyle.ts` kiểm tra mỗi bài có đúng 4 câu hỏi, mỗi câu 4 lựa chọn, đáp án hợp lệ, đủ song ngữ, có giải thích, không có dấu gạch ngang dài. Phải đạt 0 lỗi.

**Không thay đổi**: routes, ID bài học, nội dung bài, ảnh minh họa, các trang khác.

**Kiểm tra trước khi báo xong**: `bunx tsgo --noEmit`, `bunx tsx scripts/audit_lifestyle.ts` (0 lỗi), Playwright máy tính + điện thoại: bấm thẻ mở pop-up, làm quiz đúng/sai, biểu đồ radar cập nhật, không lỗi console.

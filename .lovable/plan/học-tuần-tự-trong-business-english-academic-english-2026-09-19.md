# Học tuần tự trong Business English & Academic English

## Mục tiêu

Học viên phải hoàn thành bài trước mới mở được bài sau. Tài khoản quản trị (admin) và giáo viên vẫn xem được toàn bộ bài, không bị khoá.

## Cách hoạt động

- Thứ tự học giữ đúng thứ tự đang có: 6 chặng x 4 bài (Core Lessons), sau đó danh sách Communication Lab theo thứ tự hiện tại. Không đổi thứ tự, không đổi nội dung.
- Bài 1 luôn mở. Bài N chỉ mở khi bài N-1 đã hoàn thành (bài nền tảng: làm hết 5 câu kiểm tra; lab: hoàn thành thử thách như hiện nay).
- Bài đang khoá: hiện ổ khoá, chữ mờ hơn, không bấm vào được, kèm dòng nhắc "Hoàn thành bài trước để mở bài này" / "Complete the previous lesson to unlock".
- Một chặng (stage) mở ra xem được bình thường, nhưng trong đó chỉ bài đã mở mới bấm được.
- Nút "Tiếp tục học" và "Bài tiếp theo" luôn đưa đến bài mở gần nhất, không nhảy vào bài đang khoá.
- Nút "Bài trước" vẫn dùng được với các bài đã học.
- Mở bằng đường dẫn trực tiếp (ví dụ `?view=lab&lesson=...`) vào một bài chưa mở sẽ quay về danh sách kèm thông báo nhắc học bài trước; đường dẫn không thay đổi.
- Tiến độ đã học từ trước được giữ nguyên, nên học viên đã hoàn thành nhiều bài sẽ thấy mở đúng tới bài kế tiếp.

## Quyền quản trị

- Tài khoản có quyền admin hoặc giáo viên: mọi bài mở hết, không ổ khoá, và có một dòng nhỏ "Chế độ quản trị: xem toàn bộ bài" để thầy biết mình đang không bị giới hạn.
- Học viên và khách đã đăng nhập: áp dụng khoá tuần tự.

## Ghi chú kỹ thuật

- Thêm helper khoá tuần tự vào `src/lib/purposeEnglishLearning.ts`: hàm tính danh sách bài đã mở từ mảng `done` theo thứ tự phẳng của `topics`, và hàm lấy bài mở tiếp theo (mở rộng `getNextCoreLesson`).
- `PurposeCoreLearningPath.tsx`: nhận thêm prop `unlockAll`; tính `isUnlocked(lesson)`; nút bài học đặt `disabled` + `aria-disabled` + icon `Lock` khi khoá; chặn `openLesson` với bài khoá; nút "Bài tiếp theo" disable nếu bài sau chưa mở.
- `PurposeEnglishCourse.tsx`: dùng `useUserRole()` để lấy `isTeacher`/`isAdmin`, truyền `unlockAll` xuống Core path và áp cùng logic cho danh sách Lab (thẻ lab khoá không bấm được, `openLab` chặn, deep-link chưa mở thì toast nhắc và quay về danh sách).
- Không đổi route, lesson ID, thứ tự bài, khoá lưu tiến độ (`haiedu-business-english-v1`, `haiedu-academic-english-v1`, `-communication`), không thay đổi backend/RLS.
- Cập nhật ghi nhớ dự án: quy tắc "mọi nội dung luôn mở" nay có ngoại lệ cho hai khoá này.

## Kiểm tra trước khi báo hoàn tất

- `tsgo --noEmit`, eslint các file sửa, `bun run audit:purpose-english`.
- Playwright: tài khoản giáo viên thấy mở hết; giả lập tiến độ học viên (localStorage) để xác nhận chỉ bài kế tiếp mở, bài xa hơn bị khoá; hoàn thành một bài rồi kiểm tra bài sau mở ra; deep-link tới bài chưa mở bị chặn; kiểm tra desktop và mobile, không tràn ngang.

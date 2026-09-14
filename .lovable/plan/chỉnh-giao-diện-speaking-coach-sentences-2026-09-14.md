# Chỉnh giao diện Speaking Coach - Sentences

## Mục tiêu
Làm giao diện luyện câu (Sentences) trong Speaking Coach gọn hơn, dễ chuyển câu hơn.

## Thay đổi
1. Thu nhỏ hình minh họa chủ đề trong thẻ luyện câu:
   - File: `src/components/AISpeakingCoach.tsx` (vùng practice card, dòng ~1194).
   - Hình hiện tại `aspect-[8/5] w-full` sẽ đổi thành kích thước vừa phải, ví dụ `max-w-[280px] mx-auto rounded-xl shadow-md`.
   - Giữ nguyên fallback icon khi ảnh lỗi.
   - Đảm bảo trên điện thoại không bị tràn (`max-w-full`).

2. Di chuyển nút "Next" xuống cạnh nút Record:
   - File: `src/components/AISpeakingCoach.tsx`.
   - Thanh điều hướng phía trên (`goPrev` / chấm tròn / `goNext`) giữ lại `Prev` và dãy chấm tròn, bỏ nút `Next` ở đó.
   - Thêm nút `Next` vào hàng nút hành động phía dưới (bên cạnh Record/Stop), sau nút Retry hoặc ở cuối hàng.
   - Nút Next vô hiệu hóa khi đang ở câu cuối cùng.

3. Responsive & trải nghiệm:
   - Hàng nút hành động vẫn wrap trên màn hình nhỏ.
   - Giữ nguyên các nhãn trợ năng (`aria-label`) cho nút Next.

## Kiểm tra
- Typecheck + ESLint.
- Playwright: mở `/speaking/english` → chọn tab Sentences → chọn 1 chủ đề → xác nhận hình nhỏ lại và nút Next nằm cạnh Record trên desktop (1280px) và mobile (390px).

## Không thay đổi
- Giữ nguyên routes, ID câu, tiến độ học viên, logic chấm điểm, TTS, và backend contracts.


## Mục tiêu
Khi học sinh đăng nhập (hoặc mở app lần đầu trong ngày), hiển thị 1 modal động viên kiểu giống ảnh tham khảo: tổng kết hoạt động tháng + thứ hạng + lời động viên kèm mascot Mr. Hai.

## Vị trí & trigger
- Component mới `StudentMotivationModal` mount tại `src/App.tsx` (trong AuthProvider wrapper) hoặc `src/pages/Index.tsx` layout chung.
- Trigger: sau khi `supabase.auth.getUser()` trả về user, kiểm tra `localStorage["haiedu_motivation_shown_YYYYMMDD_<uid>"]`. Nếu chưa có → hiện modal, set key. Mỗi học sinh chỉ thấy 1 lần/ngày.
- Bỏ qua nếu user là teacher/admin (dùng `useUserRole`).

## Dữ liệu tổng kết (tháng hiện tại)
Truy vấn song song từ Supabase + localStorage:
1. **Đề thi hoàn thành**: count `student_activity_log` với `activity_type IN ('exam_completed','mock_test_completed')` trong tháng.
2. **Giờ ôn luyện**: sum `duration_minutes` từ `student_activity_log` / 60, làm tròn 1 chữ số.
3. **Điểm đạt tới**: max `score` hoặc tổng sao từ `useSatStars` + AI Academy XP.
4. **Xếp hạng**: rank theo tổng XP trong `game_scores` hoặc `student_activity_log` (dùng `leaderboardDedup`). Hiển thị `#N trên <tổng học sinh>`.
5. **Danh hiệu** (tiêu đề lớn): map theo số điểm:
   - ≥500: "THỦ LĨNH ĐƯỜNG ĐUA"
   - ≥200: "CHIẾN BINH KIÊN CƯỜNG"
   - ≥50: "TÂN BINH TRIỂN VỌNG"
   - <50: "NGÔI SAO MỚI NỔI"
6. **Câu động viên**: random từ pool (tái sử dụng phong cách `useMasteredMotivation`), kèm gợi ý hành động ("Hôm nay học thêm 1 bài để giữ chuỗi 🔥").

## UI (giống ảnh tham khảo nhưng theo brand HaiEduTech)
- Dialog (shadcn) full-screen mobile, ~640px desktop, gradient `from-primary/20 via-purple-500/15 to-emerald-500/20`, viền bo lớn, có 4 góc decor.
- Layout 2 cột (desktop) / stack (mobile):
  - Trái: "Bạn chính là" + tiêu đề danh hiệu gradient blue→emerald, "Trong tháng X, bạn đã…", 2 ô số liệu (Hoàn thành / Đạt tới).
  - Phải: mascot Mr. Hai (dùng asset hiện có `mrHai*.png` trong src/assets), card Xếp hạng, card Ôn luyện, câu động viên.
- Nút CTA: "Tiếp tục học 🚀" → đóng modal; "Chia sẻ với phụ huynh" → copy text tổng kết vào clipboard + toast.
- Confetti nhẹ khi mở (canvas-confetti, giống `useMasteredMotivation`).
- Hỗ trợ song ngữ qua `useLanguage().t()`.

## File mới
- `src/components/StudentMotivationModal.tsx` — UI + data fetching.
- `src/hooks/useMonthlySummary.ts` — gom dữ liệu tháng, trả về `{ exams, hours, points, rank, totalStudents, title, quote }`.

## File chỉnh
- `src/App.tsx` (hoặc layout chính): mount `<StudentMotivationModal />` sau khi auth ready.

## Lưu ý
- Không thêm bảng DB mới — chỉ đọc.
- Tôn trọng memory: dùng semantic tokens, font ≥16px mobile, DOMPurify không cần (text thuần), không log production.
- Học sinh chưa đăng nhập: không hiển thị (theo yêu cầu "khi đăng nhập").

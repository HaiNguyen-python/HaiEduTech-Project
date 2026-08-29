# Personalization: "Lộ trình của tôi" cho mọi môn học

Mục tiêu: mỗi học sinh khi vào HaiEduTech có một lộ trình riêng cho từng môn - dựa trên mục tiêu, thời gian rảnh, trình độ đầu vào (placement) và dữ liệu học thật, cập nhật liên tục.

## 1. Onboarding ngắn (1-2 phút)

Wizard mới tại `/my-path/start`, 4 bước:
1. Chọn môn muốn học (chọn nhiều).
2. Mục tiêu + mốc thời gian (ví dụ IELTS 6.5 trong 4 tháng, HSK 3 trong 6 tháng, YKI A2, xin việc IT).
3. Thời gian học mỗi tuần (slider 2-20h) + các ngày rảnh.
4. Trình độ đầu vào: làm placement test có sẵn (English / Chinese / Vietnamese / Finnish / Programming) hoặc tự khai trình độ cho các môn chưa có bank (Cambridge, TOEIC, SAT, PTE, THPT, Swedish).

Kết quả tạo một bản ghi lộ trình cho từng môn. Học sinh có thể bỏ qua và làm sau; khách chưa đăng nhập được lưu tạm ở localStorage rồi đồng bộ khi đăng nhập.

## 2. Trang "Lộ trình của tôi" (`/my-path`)

Một trang tổng hợp mọi môn, gồm:
- Thẻ mỗi môn: trình độ hiện tại, mục tiêu, % hoàn thành, dự đoán thời điểm sẵn sàng thi.
- Kế hoạch tuần này: danh sách 5-8 việc cụ thể (bài giảng, bộ đề, số từ vựng, buổi speaking) kèm liên kết trực tiếp và thời lượng gợi ý, tổng thời lượng khớp số giờ/tuần đã khai.
- "Học tiếp ngay": 1 bước tiếp theo duy nhất, nổi bật.
- Điểm yếu cần cải thiện: xếp hạng theo kỹ năng, mỗi mục kèm liên kết luyện tập.
- Nhận xét AI: đoạn nhận xét cá nhân hóa (VI/EN) + gợi ý điều chỉnh lộ trình.
- Nút cập nhật mục tiêu / làm lại placement.

## 3. Cách tính lộ trình (adaptive)

Mọi con số tính bằng công thức từ dữ liệu đã có, không phụ thuộc AI:
- Trình độ: kết quả placement (nếu có) + kết quả bài làm gần đây, đề gần đây tính trọng số cao hơn.
- Tốc độ tiến bộ: so sánh 2 khoảng thời gian gần nhất → ước lượng tiến bộ mỗi tuần.
- Thời điểm sẵn sàng: khoảng cách còn lại chia tốc độ tiến bộ, có chặn trên/dưới hợp lý.
- Xếp hạng điểm yếu: kỹ năng thấp nhất so với mục tiêu, cộng thêm mức độ ít luyện tập gần đây.
- Kế hoạch tuần: phân bổ giờ theo tỉ lệ điểm yếu, luôn chèn phần ôn tập (SRS đến hạn) và một mục duy trì streak.
- Tự cập nhật lại sau mỗi bài làm mới, khi đổi mục tiêu, và mỗi thứ Hai (theo giờ Việt Nam).

Nguồn dữ liệu tái sử dụng: `placement_test_results`, `student_activity_log`, `user_vocab_mastered`, `ielts_lecture_progress`, `toeic_lecture_progress`, `writing_attempts`, `pte_attempts`, `sat_mistakes`, `hsk_srs_progress`, `vff_progress`, `speaking_srs_items`, `vocab_srs_state`, `study_goals`/`study_tasks`, cùng các hook hiện có (`useIeltsPerformance`, `useSwedishPerformance`, `useCambridgeCefr`, `usePteSkillStats`, `useStreak`).

## 4. Kết nối với phần còn lại của trang

- Thêm liên kết "Lộ trình của tôi" vào menu (nhóm Progress & Analysis) và một nút trong Dashboard trỏ sang `/my-path`.
- Việc trong kế hoạch tuần có thể đẩy sang module To-do & Study Goal đã có, không tạo hệ thống việc thứ hai.

## Chi tiết kỹ thuật

Database (một migration, kèm GRANT + RLS theo `auth.uid()`):
- `learning_paths`: `user_id`, `subject`, `goal_label`, `target_level`, `target_date`, `hours_per_week`, `available_days`, `start_level`, `current_level`, `status`, `updated_at` - unique `(user_id, subject)`.
- `learning_path_steps`: `path_id`, `week_start`, `title_vi/title_en`, `route`, `est_minutes`, `kind` (`lesson|practice|vocab|review|speaking`), `priority`, `done_at`.

Code mới:
- `src/lib/personalization/subjectRegistry.ts` - khai báo 12 môn: nhãn VI/EN, route hub, thang trình độ (CEFR / HSK / Band / YKI / TOEIC / SAT), các route luyện theo kỹ năng.
- `src/lib/personalization/pathModel.ts` - hàm thuần: `inferLevel`, `progressPerWeek`, `estimateReadiness`, `rankWeaknesses`, `buildWeeklyPlan` (có unit test bằng vitest).
- `src/hooks/useLearningSignals.ts` - gom tín hiệu học tập từ các bảng/hook trên, khách dùng localStorage.
- `src/hooks/useLearningPath.ts` - đọc/ghi `learning_paths` + `learning_path_steps`, tự sinh lại kế hoạch tuần.
- `src/pages/MyPathOnboarding.tsx`, `src/pages/MyPath.tsx` + components trong `src/components/personalization/`.
- Edge function `learning-path-coach`: Lovable AI (`google/gemini-3.7-flash`) sinh nhận xét VI/EN; lỗi hoặc hết credit thì client dùng đoạn nhận xét theo mẫu, số liệu không bao giờ phụ thuộc AI.

Ràng buộc giữ nguyên: không nội dung bị khóa, mobile-first, chỉ dùng token màu của brand, không dùng dấu gạch ngang dài trong nội dung.

## Thứ tự triển khai

1. Migration 2 bảng + RLS/GRANT.
2. `subjectRegistry` + `pathModel` + test.
3. `useLearningSignals`, `useLearningPath`.
4. Onboarding wizard.
5. Trang `/my-path` với các thẻ, kế hoạch tuần, điểm yếu.
6. Edge function nhận xét AI + fallback.
7. Liên kết menu/Dashboard, kiểm tra thật trên preview cho một tài khoản có dữ liệu.

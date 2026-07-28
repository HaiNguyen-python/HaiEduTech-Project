## Kết quả rà soát luồng dữ liệu

Hiện dữ liệu học tập đổ về Dashboard và Admin đều đi qua đúng một nguồn: `student_activity_log` (Admin snapshot RPC), cộng thêm `writing_attempts`, `game_scores`, `ielts/toeic_lecture_progress`, `lesson_feedback` cho Dashboard riêng của học viên. Số lượng activity_type thực tế xuất hiện 30 ngày qua chỉ **20 loại**, trong khi hệ thống đã mở nhiều tính năng mới nhưng **chưa gọi `logStudentActivity`** ở bất kỳ đâu.

### Các khoảng trống đã xác minh

1. **Tiếng Thụy Điển** — `SwedishReadingLab`, `SwedishListeningLab`, `SwedishWritingLab`, `SwedishYkiA2/B1`, `SwedishSkillsLab`, `SwedishSvenskfinland`, `SwedishBeginner`, `SwedishInteractiveCurriculum`, `SwedishVocabulary` không log. Chỉ có `speaking_coach_swedish` xuất hiện (~379 event/30d).
2. **Startup track** — 5 trang (`StartupHub`, `StartupRoadmap`, `StartupCaseStudies`, `StartupToolkit`, `StartupPitchSimulator`) không log gì.
3. **Vocab Arena (game_rooms/game_participants)** — 15 phòng đã tạo, 4234 game_scores nhưng Admin RPC bỏ hoàn toàn `game_scores` và `game_rooms`. Duel Battle không ghi nhận vào tổng performance.
4. **Study Goals / Tasks (To-do)** — 4 goals / 6 tasks nhưng tab Overview và Admin không đọc bảng này để tính "% mục tiêu hoàn thành".
5. **Your Corner (Community)** — 36 post, comment/react/poll_vote không tính là hoạt động học tập trên Dashboard/Admin.
6. **Counseling Hub** — bảng `counseling_conversations` và `counseling_journal` không đổ về Admin để theo dõi wellbeing.
7. **Global Community** — `country_visits` chỉ hiển thị ở trang chủ; Admin không có KPI riêng cho khách truy cập theo quốc gia trong Snapshot (đã có KPI Total Students/Visits tách riêng, xác nhận không bị ghi đè).

### Kế hoạch sửa (2 giai đoạn, không đụng UI trừ phần bắt buộc)

**Giai đoạn 1 — Thêm logging tại nguồn (frontend)**

Chèn `logStudentActivity({...})` từ `useActivityLogger` vào các điểm hoàn thành hành động, không thay đổi UX:

- `SwedishReadingLab.tsx`: log `swedish_reading` khi nộp bài (kèm `score`, `max_score`, `time_spent_seconds`, `domain: "swedish"`).
- `SwedishListeningLab.tsx`: log `swedish_listening` sau khi submit exercise.
- `SwedishWritingLab.tsx`: log `swedish_writing` khi có kết quả chấm.
- `SwedishYkiA2.tsx` + `SwedishYkiB1.tsx`: log `yki_practice` (metadata: `{ level, section }`).
- `SwedishInteractiveCurriculum.tsx` + `SwedishBeginner.tsx` + `SwedishVocabulary.tsx` + `SwedishSkillsLab.tsx` + `SwedishSvenskfinland.tsx`: log `swedish_lesson` khi hoàn thành quiz / lesson.
- `StartupHub/Roadmap/CaseStudies/Toolkit`: log `startup_lesson` với `metadata.moduleId`.
- `StartupPitchSimulator`: log `startup_pitch` với `score` từ AI critic.
- `VocabArena.tsx`: log `vocab_arena_duel` khi kết thúc round (đã có `game_scores`; chỉ ánh xạ thêm vào activity log để Admin thấy).
- `PostComposer` (Your Corner): log `community_post` khi user đăng bài (không log guest).
- `CounselingHub`: log `counseling_session` khi user gửi câu hỏi cho Compass AI.
- `TodoGoalTab`: log `study_goal_progress` khi user tick task hoàn thành (dùng `metadata.goalId`, `metadata.taskId`).

**Giai đoạn 2 — Mở rộng aggregation ở backend & UI**

- **Migration**: mở rộng `get_admin_dashboard_snapshot` bằng cách nới `isLearningActivity` filter phía client (`src/lib/adminActivityConfig.ts` hoặc tương đương) để nhận các activity_type mới ở trên. Không đổi RPC.
- **Domain routing**: cập nhật `useActivityLogger` để tự suy ra `domain: "swedish" | "startup" | "community"` cho các type mới, tránh mặc định về "english".
- **Dashboard.tsx (học viên)**:
  - Fetch thêm `study_goals` + `study_tasks` (chỉ đọc, có RLS), tính `goalCompletionPct` cho card Overview.
  - Fetch count `your_corner_posts` / `counseling_conversations` để hiển thị chỉ số nhỏ ("Tương tác cộng đồng", "Buổi Compass AI") mà không thay đổi layout — thêm 2 mini KPI dưới Study Streak.
  - Bổ sung Swedish và Startup vào Skill Radar (thêm 2 trục) khi có dữ liệu.
- **AdminDashboard.tsx**:
  - `computeStudentState`: thêm bucket "swedish" và "startup" vào `skillBreakdown`.
  - Thêm cột `domainCounts.swedish` / `domainCounts.startup` / `domainCounts.community` vào `classStats` và hiển thị trong ô Domain Counts.
  - Trang `UserInsightsTab`: thêm dòng "Vocab Arena duels" (từ `game_scores` filter `game_type LIKE 'arena%'`) khi mở chi tiết học viên.

**Kiểm thử sau khi triển khai**

1. Đăng nhập bằng tài khoản test, hoàn thành 1 bài Swedish Reading, 1 bài Startup, 1 duel Vocab Arena, tick 1 task Todo, đăng 1 post.
2. Query `select activity_type, count(*) from student_activity_log where user_id = <test> and created_at > now() - interval '1 hour' group by 1` để xác nhận 5 loại mới xuất hiện.
3. Reload Dashboard → thấy Swedish/Startup trong Skill Radar, Goal % update.
4. Reload Admin → thấy học viên test có bucket Swedish/Startup và Vocab Arena count.

### Ghi chú kỹ thuật

- Không đổi schema của `student_activity_log`; chỉ thêm activity_type mới (bảng dùng free-form text).
- Không đụng vào `get_admin_dashboard_snapshot` RPC — filter phía client đủ vì snapshot đã trả toàn bộ event NOT IN ('session_heartbeat','daily_login').
- Đảm bảo mọi log call đều `await` an toàn (không throw) và không chặn UI — `logStudentActivity` hiện đã có try/catch.
- `study_goals` / `study_tasks` RLS đã scope `auth.uid()`; Dashboard chỉ SELECT của chính user nên không cần migration mới.
- Không đổi bất kỳ text tiếng Việt / tiếng Anh nào ngoài 2 KPI mini mới (sẽ dùng `useLanguage.t()`).

Ước lượng: ~15 file frontend chỉnh sửa, 0 migration DB, không rủi ro security.
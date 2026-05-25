# Rà soát Admin Dashboard — Báo cáo & Đề xuất

## 1. Hiện trạng data thực tế (kiểm tra DB)

Tra cứu `student_activity_log` cho thấy **lý do thầy không thấy data Speaking/Writing**:


| activity_type         | Tổng   | Lần cuối                 |
| --------------------- | ------ | ------------------------ |
| session_heartbeat     | 12.798 | hôm nay                  |
| daily_login           | 306    | hôm nay                  |
| ielts_writing         | 85     | **18/05** (1 tuần trước) |
| conv_english          | 20     | 07/04                    |
| language_lesson_quiz  | 17     | 22/05                    |
| toeic_lecture_quiz    | 6      | 24/05                    |
| ielts_speaking        | **3**  | **13/04**                |
| python_pathway_lesson | 3      | 03/05                    |


→ Code log Speaking/Writing đã được thêm ở vòng trước, **nhưng hoặc không trigger, hoặc học sinh chưa tương tác lại từ lúc deploy**. Hoàn toàn không có log cho: `pte_speaking`, `pte_writing_essay/summary`, `speaking_coach_en/zh/fi/vi`, `cambridge_mock`, `sat_mock`, `national_exam`, `hsk_vocab`, `ielts_vocab`, `finnish_*`, `dictation_*`, `chatbot_chat`…

Page views: 3.243 row, 34 user, vẫn cập nhật → con số "1000" trước đây là do `fetchAllRows` chưa được dùng ở mọi nơi (giờ đã sửa). Cần verify lần cuối.

## 2. Lỗi & rủi ro cần fix

1. **Speaking/Writing không thực sự được log**
  - Verify lại các call `logStudentActivity` trong `SpeakingPractice.tsx`, `SpeakingCoachPage.tsx`, `PteSpeaking.tsx`, `PteWriting.tsx`, `IeltsWritingPractice.tsx` — kiểm tra điều kiện trigger (có phải chỉ chạy khi đạt điểm tối đa?). Mở `PteWriting` log ngay khi nộp bài, không đợi notebook save effect.
  - Thêm log frequency-only (không cần điểm) cho mọi lần submit Speaking/Writing để đếm tần suất.
2. **Mở rộng logging cho các module còn trống** (thêm `logStudentActivity` vào):
  - `IeltsVocabularyBank`, `HskVocabularyBank`, `FinnishVocabulary` — log khi master từ
  - `CambridgeMockExam`, `SatMockExam`, `NationalExamRoom` — log khi nộp bài
  - `IeltsReadingPractice`, `IeltsListeningPractice` — log khi hoàn thành
  - `DictationSystem` — log mỗi lần luyện
  - `IeltsMasterQuiz`, lectures với quiz cuối bài
  - Chatbot Compass AI, Mr. Hai: log số phiên/độ dài (đánh giá engagement)
3. **Realtime spam**: Hook hiện refetch TOÀN BỘ data mỗi khi có 1 INSERT (kể cả `session_heartbeat` cứ vài giây). Với 12k heartbeat, dashboard sẽ tự refresh liên tục → CPU cao. Filter event theo `activity_type ≠ session_heartbeat/daily_login` hoặc debounce 10s.
4. **Dedup học sinh theo tên có rủi ro**: hai học sinh trùng tên thật bị gộp. Nên dedup theo **email/`auth.users.email**` thay vì `full_name`; nếu phải dùng tên thì hiện badge "merged from N accounts" để giáo viên có thể tách thủ công.
5. **Hiệu năng**: `buildHeatmapData`, `buildWeeklyTrend`, `domainPieData`, `filteredStudents`, `interventionNeeded` đều tính lại mỗi render. Bọc `useMemo`. Với 13k+ row, render hiện tại chậm rõ rệt.
6. **CSV export** không escape dấu `"` trong cell → Excel parse lỗi với metadata JSON. Dùng helper escape chuẩn (`""`).
7. **Bug nhỏ**: ô tìm kiếm học sinh không bỏ dấu (Tiếng Việt "Hà" vs "ha"). Dùng `normalizeName` đã có.

## 3. Đề xuất tính năng mới (tăng giá trị admin)

### A. Tab "Engagement Heatmap" (mới)

- Bảng 7×24 (ngày trong tuần × giờ) hiển thị mật độ học sinh online → biết giờ vàng để mở lớp.
- DAU / WAU / MAU + tỷ lệ retention 7/30 ngày.

### B. Skill Frequency Card cho từng học sinh

Hiện đã có cột Speaking/Writing count → bổ sung:

- **Streak Speaking riêng & Streak Writing riêng** (không chung streak login)
- **Cảnh báo "X ngày chưa nói/viết"** highlight đỏ ở bảng Students nếu > 7 ngày
- Mini bar chart 30 ngày qua cho mỗi học sinh khi click expand row

### C. Cohort Analysis

Nhóm học sinh theo tuần đăng ký → biểu đồ retention curve. Giúp đánh giá nội dung onboarding.

### E. Quick Actions trên row học sinh

- Nút "Gửi nhắc nhở" (insert vào `teacher_contact_requests`)
- Nút "Tặng badge thủ công"
- Nút "Reset streak / Cộng XP"

### F. Compare Mode

Chọn 2-3 học sinh để so sánh radar skill side-by-side — hữu ích cho buổi tư vấn phụ huynh.

### G. Content Health Tab

- Bài học/quiz nào có **completion rate thấp nhất**
- Câu hỏi nào học sinh sai nhiều nhất (>70%) → flag review nội dung
- Top vocab khó nhất theo `user_vocab_mastered` reverse

### H. Revenue × Engagement

Tab Income đã có. Bổ sung: scatter plot "Hours studied vs months paid" → tìm học sinh chuẩn bị churn.

### I. Export PDF báo cáo phụ huynh

Một học sinh → PDF 1 trang gồm radar, streak, gợi ý RL, lời nhắn từ Mr. Hai (AI gen).

### J. Notification center

Bell icon: cảnh báo realtime (học sinh đang distress qua Compass AI, học sinh vừa đạt band 8.0, học sinh vắng ≥ 14 ngày).

## 4. Thứ tự thực hiện đề xuất (ưu tiên)

**P0 — Sửa data (tuần này):**

1. Audit & fix log Speaking/Writing (mục 2.1, 2.2)
2. Debounce realtime + filter heartbeat (2.3)
3. Memoize tính toán nặng (2.5)

**P1 — Insight cốt lõi:**
4. Cảnh báo "X ngày chưa nói/viết" + streak riêng (3.B)
5. Tab Content Health (3.G)
6. Engagement Heatmap + DAU/WAU (3.A)

**P2 — Mở rộng:**
7. Auto-insight AI (3.D)
8. Quick Actions + Notification center (3.E, 3.J)
9. Compare Mode + PDF báo cáo (3.F, 3.I)

## 5. Câu hỏi cho thầy trước khi build

- Thầy muốn fix toàn bộ **P0** trước (mất ~1 lượt prompt) rồi quyết P1 sau, hay muốn em gộp P0+P1 luôn?
- Có muốn em audit kỹ từng file Speaking/Writing để chỉ rõ chỗ nào không log không, hay tin tưởng em tự fix?  
  
ok hãy làm đi 
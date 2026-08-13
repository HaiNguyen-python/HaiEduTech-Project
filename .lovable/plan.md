# Learning DNA: đầy đủ dữ liệu + xuất PDF cho phụ huynh

## Mục tiêu
1. Mọi hoạt động học của học sinh trên web đều được ghi lại, để radar Learning DNA và các chỉ số không bị thiếu.
2. Nút "Xuất PDF" trong panel Learning DNA tạo báo cáo 1-3 trang, trình bày đẹp theo thương hiệu HaiEduTech, gửi được cho phụ huynh hoặc học sinh.

## Phần 1 - Bịt các lỗ hổng ghi dữ liệu

Toàn bộ dữ liệu Learning DNA đến từ `student_activity_log` qua `logStudentActivity()`. Kiểm tra hiện tại: 35 module đã ghi log, nhưng các phần sau **chưa ghi** nên học sinh học xong vẫn bị coi như không hoạt động:

| Module | Điểm ghi log sẽ thêm | activity_type |
|---|---|---|
| Programming Lesson (quiz cuối bài) | lúc submit quiz | `programming_lesson_quiz` |
| AI Academy (track quiz) | lúc hoàn thành track | `ai_academy_track` |
| Swedish Tier View (YKI A2/B1 submodule) | lúc submit bài tập | `swedish_yki_quiz` |
| Swedish Skills Lab | lúc chấm điểm | `swedish_skills_lab` |
| VFF Placement Test | lúc ra kết quả | `vff_placement` |
| SAT Exercises / Daily Warm-up | lúc submit | `sat_exercise`, `sat_warmup` |
| IELTS Skills Practice | lúc submit | `ielts_skills_practice` |
| HSK Grammar | lúc submit quiz bài | `hsk_grammar_quiz` |
| Japanese hub (quiz/flashcard) | lúc submit | `japanese_quiz` |
| Cambridge YLE Vocabulary & Games | lúc kết thúc vòng | `cambridge_yle_game` |

Quy tắc áp dụng cho mỗi chỗ: điểm số thật (`score`/`maxScore`), `timeSpentSeconds`, `metadata` (level, chủ đề), và guard bằng `useRef` để chỉ ghi 1 lần. Không dùng 10/10 làm "ping hoàn thành".

Đồng thời cập nhật `inferDomain()` trong `src/hooks/useActivityLogger.ts` để các activity_type mới về đúng domain (Swedish/Japanese/Vietnamese hiện gộp vào `english`, giữ nguyên để chart không mất dữ liệu; `programming_lesson_quiz` và `ai_academy_track` → `programming`).

Bổ sung `SPEAKING_ACTIVITY_TYPES` / `WRITING_ACTIVITY_TYPES` trong `src/lib/adminData.ts` cho các loại speaking/writing mới (Cambridge speaking, Swedish writing, Startup pitch) để ô "Speaking attempts / Writing attempts" đếm đúng.

## Phần 2 - Báo cáo PDF Learning DNA

Thêm nút "Xuất PDF báo cáo" trong panel Learning DNA (chỉ hiện khi đã chọn học sinh) và chọn kỳ báo cáo: 30 ngày / 90 ngày / toàn bộ.

Nội dung báo cáo (song ngữ Việt - Anh, để phụ huynh và học sinh đều đọc được):

- **Trang 1 - Tổng quan**: header thương hiệu HaiEduTech (logo, gradient xanh - lục), tên học sinh, kỳ báo cáo, ngày xuất. Thẻ chỉ số: tổng hoạt động, điểm trung bình, xu hướng, thời gian học, số ngày hoạt động, streak.
- **Trang 1-2 - Biểu đồ**: radar Learning DNA, thanh hiệu suất theo lĩnh vực (English / Chinese / Programming), và biểu đồ điểm theo thời gian.
- **Trang 2 - Chi tiết kỹ năng**: bảng từng kỹ năng (số lần luyện, điểm TB), khối IELTS Band ước tính (Speaking/Writing), danh sách điểm mạnh và điểm cần cải thiện.
- **Trang 3 - Nhận xét & gợi ý**: 3-5 gạch đầu dòng tự sinh từ dữ liệu (ví dụ: "Chưa luyện Writing 24 ngày - nên đặt mục tiêu 2 bài/tuần"), footer bản quyền HaiEduTech + ghi chú số liệu lấy từ nhật ký học tập thực tế.

Không có số liệu bịa: mọi con số lấy trực tiếp từ `student_activity_log`, `writing_attempts`, `game_scores`. Chỗ nào thiếu dữ liệu thì ghi "Chưa có dữ liệu".

## Chi tiết kỹ thuật

- File mới `src/lib/learningDnaReport.ts`: gom dữ liệu (query bổ sung theo `user_id` + khoảng thời gian) và vẽ PDF bằng `jsPDF` (đã có trong project) - vẽ trực tiếp bằng API vector, không dùng `html2canvas`, để chữ nét và file nhẹ. Biểu đồ radar/bar/line vẽ bằng lệnh line/rect của jsPDF từ số liệu.
- Font: nhúng font Unicode (Noto Sans) để dấu tiếng Việt không bị lỗi - jsPDF font mặc định không hỗ trợ tiếng Việt.
- File mới `src/components/admin/LearningDnaExportButton.tsx`: nút + chọn kỳ + trạng thái đang tạo + toast.
- Sửa `src/pages/AdminDashboard.tsx`: gắn nút vào header panel Learning DNA, truyền `selectedStudent`.
- Màu sắc dùng token thương hiệu: Royal Blue `#3B82F6` → Soft Emerald `#10B981`.
- Sau khi làm xong sẽ tự kiểm tra: render PDF mẫu, đổi từng trang thành ảnh và soi lỗi tràn chữ/lệch bảng/font hỏng rồi mới bàn giao.
- Toàn bộ comment trong code viết bằng tiếng Anh; không dùng dấu gạch ngang dài trong nội dung.

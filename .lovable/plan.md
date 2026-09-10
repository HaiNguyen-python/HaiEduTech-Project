# Lifestyle Academy: pop-up rộng hơn, nội dung dày hơn, biểu đồ chỉ tính bài đã đạt

## 1. Pop-up bài học không còn tràn lên viền trên

Hiện ảnh minh hoạ nằm ngoài vùng cuộn: chiều cao pop-up = ảnh + 70% chiều cao màn hình, nên khi bài dài phần ảnh bị đẩy lên khỏi mép trên màn hình (đúng như ảnh bạn gửi).

- Đưa ảnh vào trong vùng cuộn, giới hạn tổng chiều cao pop-up ở khoảng 90% màn hình, nên pop-up luôn nằm gọn trong khung nhìn.
- Mở rộng pop-up ra hai bên: rộng hơn hiện tại (từ ~768px lên ~1100px trên máy tính), lề trong thoáng hơn, khổ chữ đọc dễ.
- Trên điện thoại pop-up gần full chiều ngang, chữ tối thiểu 16px.
- Nút đóng X luôn thấy được ở góc trên phải, Esc vẫn đóng.

## 2. Biểu đồ chỉ tính bài đã trả lời đúng ít nhất 75%

Hiện biểu đồ cộng điểm cho mọi lần làm quiz, kể cả khi chỉ đúng 1/4. Sẽ sửa:

- Chỉ bài **đạt từ 3/4 câu (75%) trở lên** mới được tính vào biểu đồ và vào phần trăm từng nhóm.
- Mỗi trục = phần trăm bài đã đạt trong nhóm đó (ví dụ Tài chính 5 bài đạt / 18 bài = 28%).
- "Điểm quiz trung bình" chỉ tính trên các bài đã đạt; "Nhóm nên học tiếp" là nhóm có tỉ lệ đạt thấp nhất.
- Bài làm dưới 75% vẫn lưu điểm để học sinh biết đã thử, nhưng thẻ bài **không** hiện "Hoàn thành" và không lên biểu đồ; hiện gợi ý "Làm lại để đạt 3/4".
- Số liệu cũ đã lưu dưới 75% sẽ được lọc lại theo quy tắc mới ngay khi mở trang.

## 3. Rà soát và mở rộng nội dung còn khô

Kiểm tra 102 bài: 94 bài phần "Đào sâu" chỉ có 3 đoạn, phần lớn dưới 700 ký tự - đọc rất khô và thiếu ví dụ.

- Viết lại phần Đào sâu cho các bài này: 4-5 đoạn, mỗi bài có tình huống thật của học sinh, con số cụ thể, một ví dụ đối chiếu "cách sai / cách đúng".
- Làm rõ các câu trừu tượng ở "Vì sao quan trọng", "Khung tư duy" và "Điểm cốt lõi": thay câu chung chung bằng câu có hành động đo được.
- Bản Việt và bản Anh cùng số đoạn, cùng nội dung, không dùng gạch ngang dài.
- Giữ nguyên ID bài, ảnh, tiến trình đã lưu, routes.
- Làm theo từng trụ cột (Tài chính 18, Ứng xử 18, Khí chất 18, Thân thể 18, Tự học 15, Sự kiện 15) để dễ kiểm soát chất lượng.

## Chi tiết kỹ thuật

- `src/components/lifestyle/LessonDialog.tsx`: `DialogContent` đổi sang `max-w-5xl max-h-[90vh] flex flex-col p-0`; ảnh cover + nội dung nằm trong cùng một `div` cuộn `flex-1 overflow-y-auto`; bỏ `max-h-[70vh]` cố định; padding `px-6 sm:px-10 py-7`.
- `src/hooks/useLifestyleProgress.ts`:
  - `pillarScores`: `value = round(passedCount / lessons.length * 100)` với `passed = r.completed && r.score / r.maxScore >= LIFESTYLE_QUIZ_PASS_RATIO`.
  - `stats.accuracy` tính trên tập bài đạt; thêm `attempted` (mọi lần làm) và `completed` (chỉ bài đạt).
  - Khi đọc localStorage/backend, chuẩn hoá lại `completed` theo ngưỡng 0.75 để dữ liệu cũ không lọt.
  - `saveResult` vẫn giữ điểm cao nhất, `completed` chỉ true khi tỉ lệ >= 0.75.
- `src/components/lifestyle/SoftSkillsRadar.tsx`: nhãn "Nhóm nên học tiếp" xếp theo `value` (tỉ lệ đạt); chú thích rõ "chỉ tính bài đạt >= 75%".
- `src/pages/LifestyleAcademy.tsx`: thẻ bài chỉ hiện badge "Hoàn thành" khi đạt; bài chưa đạt hiện chip "Chưa đạt - làm lại".
- Dữ liệu nội dung: `src/data/lifestyleAcademyLessons.ts`, `lifestyleAcademyExpansion*.ts`, `lifestyleSelfStudyLessons.ts`, `lifestylePartyingLessons.ts`.
- `scripts/audit_lifestyle.ts`: thêm kiểm tra Đào sâu >= 4 đoạn và >= 1000 ký tự mỗi bản ngữ, cân đối số đoạn VI/EN, giữ mốc 102 bài / 6 trụ cột, quiz 4 câu, 0 lỗi.

## Kiểm tra trước khi báo xong

`bunx tsgo --noEmit`, `bunx tsx scripts/audit_lifestyle.ts` 0 lỗi, và mở thật trên máy tính + điện thoại: pop-up không tràn mép trên, làm quiz 2/4 thì biểu đồ không tăng, 3/4 thì tăng đúng nhóm.

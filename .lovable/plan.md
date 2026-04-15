

## Plan: Bảng tổng kết "Buổi học trước" khi đăng nhập

### Ý tưởng

Khi học viên đăng nhập, hiển thị một Dialog/Modal tổng kết những gì đã học trong phiên trước (lần cuối hoạt động), bao gồm:
- Từ vựng đã luyện
- Bài học/bài giảng đã hoàn thành
- Bài tập/quiz đã làm (kèm điểm)
- Ghi chú gần nhất

Modal chỉ hiển thị 1 lần mỗi phiên đăng nhập.

### Cách hoạt động

1. Khi user đăng nhập (auth state change → `SIGNED_IN`), lưu timestamp `lastSessionRecapShown` vào `sessionStorage`
2. Nếu chưa có `lastSessionRecapShown` trong session hiện tại → fetch dữ liệu và hiển thị modal
3. Fetch dữ liệu từ 4 nguồn:
   - `student_activity_log` — 10 hoạt động gần nhất (quiz, bài tập, vocab)
   - `writing_attempts` — 3 bài viết gần nhất
   - `student_notebooks` — 3 ghi chú gần nhất
   - `ielts_lecture_progress` + `toeic_lecture_progress` — bài giảng đã hoàn thành gần nhất
4. Hiển thị trong Dialog đẹp với các tab/section: Bài học, Bài tập, Từ vựng, Ghi chú

### Files cần tạo/sửa

| File | Thay đổi |
|------|----------|
| `src/components/LastSessionRecap.tsx` | **Tạo mới** — Component modal tổng kết phiên trước |
| `src/App.tsx` | Thêm `<LastSessionRecap />` vào layout chính (cạnh ChatBot, FloatingNotebook) |

### Chi tiết kỹ thuật

**LastSessionRecap component:**
- Lắng nghe `onAuthStateChange` → khi `SIGNED_IN`, kiểm tra `sessionStorage.getItem('recap_shown')`
- Nếu chưa shown → query 4 bảng song song → hiển thị Dialog
- Khi đóng dialog → set `sessionStorage.setItem('recap_shown', 'true')`
- UI: Dialog với các section có icon, mỗi item hiển thị tiêu đề, điểm (nếu có), thời gian
- Nút "Bắt đầu học!" để đóng modal

**Dữ liệu hiển thị:**
- Activities: activity_type, score/maxScore, domain, created_at
- Writing: prompt (trích ngắn), overall_score, created_at
- Notebooks: title, subject, updated_at (trích 1 dòng content)
- Lectures: lecture_id, completed_at


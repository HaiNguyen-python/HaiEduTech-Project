

## Plan: Thêm đề thi mẫu Cambridge (Starters → PET)

### Hiện trạng
- Hệ thống Cambridge hiện có **70 bài giảng** (lectures) với nội dung lý thuyết, vocabulary, practice, quiz
- **Chưa có** mục đề thi mẫu (mock test/sample exam) dạng thi thử hoàn chỉnh cho Cambridge
- Hệ thống đã có mô hình đề thi mẫu cho THPT (`thptExamData.ts`) và YKI Finnish (`mockExamData.ts`) có thể tham khảo

### Kế hoạch

#### 1. Tạo dữ liệu đề thi mẫu Cambridge
**File mới:** `src/data/cambridgeMockExamData.ts`

- Định nghĩa interface `CambridgeMockExam` với các field: id, title, level, duration, totalQuestions, sections (Listening, Reading & Writing, Speaking), passages, questions với đáp án + giải thích
- Tạo **10 đề thi mẫu** (2 đề/cấp độ):
  - Starters: 2 đề (25 câu, 20 phút)
  - Movers: 2 đề (30 câu, 25 phút)
  - Flyers: 2 đề (35 câu, 30 phút)
  - KET: 2 đề (40 câu, 40 phút)
  - PET: 2 đề (45 câu, 50 phút)

#### 2. Tạo trang thi thử Cambridge
**File mới:** `src/pages/CambridgeMockExam.tsx`

- Giao diện phòng thi tương tự `NationalExamRoom.tsx`: đếm ngược thời gian, chọn đáp án, nộp bài, xem kết quả, review đáp án
- Dùng Vibrant Dark Theme nhất quán với Cambridge Lectures
- Hiển thị điểm theo từng section (Listening, Reading & Writing)

#### 3. Thêm mục Test Prep vào trang Cambridge Lectures
**File sửa:** `src/pages/CambridgeLectures.tsx`

- Thêm section "Cambridge Test Prep" phía trên hoặc bên dưới danh sách lectures
- Hiển thị grid các đề thi mẫu, filter theo level (Starters → PET)
- Mỗi card hiện: tên đề, level, số câu, thời gian, trạng thái (chưa làm / đã làm / điểm cao nhất)

#### 4. Thêm route mới
**File sửa:** `src/App.tsx`

- Thêm route `/cambridge-mock-exam/:examId` → `CambridgeMockExam`

### Files thay đổi
- `src/data/cambridgeMockExamData.ts` — **mới** (10 đề thi mẫu)
- `src/pages/CambridgeMockExam.tsx` — **mới** (phòng thi)
- `src/pages/CambridgeLectures.tsx` — thêm section Test Prep
- `src/App.tsx` — thêm route


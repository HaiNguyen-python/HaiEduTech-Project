## Thêm 2 bài học mới vào AI Academy

Bổ sung **Data → ML** vào curriculum, chèn sau bài Neural Networks (lesson 5) và trước Generative AI, để học sinh có lộ trình hoàn chỉnh: Data → ML cổ điển → Deep Learning → GenAI.

---

### Bài mới #1: "Thám tử dữ liệu" 🕵️ (Data Detective)

**Mục tiêu:** Hiểu AI "ăn" dữ liệu thế nào, dữ liệu sạch vs bẩn, và bias.

**Nội dung:**
- **3 story cards** (giữ format hiện tại):
  1. "AI là đầu bếp, dữ liệu là nguyên liệu" — rác vào = rác ra
  2. Dữ liệu có cấu trúc (bảng Excel) vs phi cấu trúc (ảnh, video, tin nhắn)
  3. Bias thực tế: FaceID nhận diện kém học sinh Việt vì train chủ yếu trên data người phương Tây
- **Vietnam case:** VinAI thu thập 1 triệu ảnh người Việt để fix bias FaceID
- **Golden tip của thầy Hải:** "Trước khi train AI, hãy nhìn data như thám tử — thiếu gì? lệch gì? bẩn chỗ nào?"
- **Glossary:** dataset, feature, label, bias, outlier, structured/unstructured
- **Sandbox "Làm sạch dữ liệu":**
  - Bảng 8 dòng học sinh có lỗi (tuổi = -5, tên trống, chiều cao = 999cm)
  - Click vào ô bẩn để "xóa/sửa" → biểu đồ cột bên cạnh tự cập nhật real-time
  - Hiển thị "Độ sạch dữ liệu: 60% → 100%"
- **Quiz drag-drop:** Kéo 6 ví dụ vào 2 cột Structured / Unstructured (bảng điểm, ảnh selfie, file Excel, video TikTok, tin nhắn Zalo, danh bạ)
- **Quiz multiple-choice + scenario:** 4 câu về bias, outlier, garbage-in-garbage-out

**Ảnh minh họa:** `src/assets/ai-academy/data-detective.jpg` (chibi thám tử cầm kính lúp soi bảng dữ liệu, gradient xanh dương)

---

### Bài mới #2: "Học máy siêu đơn giản" 🎩 (ML Magic)

**Mục tiêu:** Phân biệt Supervised vs Unsupervised qua 2 thuật toán trực quan: Decision Tree và K-Means.

**Nội dung:**
- **3 story cards:**
  1. Decision Tree = chơi "20 câu hỏi" với AI ("Có lông không?" → "Biết bay không?" → Chim!)
  2. K-Means = AI tự gom nhóm bạn cùng sở thích mà không cần ai dạy nhãn
  3. Supervised (có thầy giáo chấm điểm) vs Unsupervised (tự khám phá)
- **Vietnam case:** Shopee dùng K-Means gom khách hàng theo hành vi mua sắm để gợi ý sản phẩm
- **Golden tip:** "Có nhãn → Supervised. Không nhãn → Unsupervised. Đơn giản vậy thôi!"
- **Glossary:** supervised, unsupervised, decision tree, cluster, K-Means, classification
- **Sandbox kép:**
  - **Tab 1 — Cây quyết định trái cây:** Click vào branch ("Vỏ trơn?" → Yes/No) → cây phát triển dần → đoán Táo/Cam/Chuối
  - **Tab 2 — K-Means clustering:** 20 chấm màu rải trên canvas, slider K=2/3/4 → AI gom nhóm bằng màu khác nhau với animation
- **Quiz drag-drop:** Kéo 6 bài toán vào Supervised / Unsupervised (lọc spam, gom khách hàng, đoán giá nhà, phát hiện gian lận lạ, dịch tiếng Anh, nhóm bài hát giống nhau)
- **Quiz multiple-choice:** 4 câu về cây quyết định, clustering, khi nào dùng cái nào

**Ảnh minh họa:** `src/assets/ai-academy/ml-magic.jpg` (chibi pháp sư với mũ phù thủy, cây quyết định + chấm cluster lơ lửng, gradient tím-vàng)

---

### Chi tiết kỹ thuật

**Files thay đổi:**
- `src/pages/AIAcademy.tsx` — thêm 2 lesson objects vào array `LESSONS`, chèn vào vị trí index 5 và 6 (sau Neural Networks). Cập nhật badge logic nếu cần (tổng 18 bài thay vì 16).
- `src/assets/ai-academy/data-detective.jpg` — generate bằng imagegen (style chibi nhất quán với 16 ảnh hiện có)
- `src/assets/ai-academy/ml-magic.jpg` — generate bằng imagegen

**Tái sử dụng các component sandbox hiện có** (drag-drop quiz, multiple-choice, glossary card, story card) — không tạo component mới trừ khi cần.

**Sandbox Data Cleaning** và **K-Means** sẽ là 2 component nhỏ inline trong AIAcademy.tsx (giữ nguyên pattern hiện tại của các sandbox khác), dùng state local + Framer Motion cho animation. Không cần backend, không cần migration DB.

**XP integration:** 2 bài mới tự động hoạt động với `useAIAcademyXP` hook đã có — không cần sửa.

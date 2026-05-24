## Bối cảnh phát hiện

- Hiện AI Academy có **16 tracks** (15 bài + Graduation). Header vẫn ghi cứng `"9 chặng phiêu lưu trực quan"` (line 1172) và footer ghi `"Hoàn thành 12 bài học"` (line 1296) → **lệch số liệu**. Strip Sao/Huy hiệu thì đã dùng `TRACKS.length` nên đúng (0/48, 0/16).
- 8 sandbox có dung lượng nhỏ → còn dư khoảng trống cần lấp activity:
  StudySmart (96 dòng), CareersMap (117), DigitalSafety (119), Ethics (129), FactCheck (136), Graduation (139), AgentWorkflow (151), NeuralNet (154).
- Card track hiện chỉ có border tĩnh — chưa có cảm giác "công nghệ chạy điện".

---

## A. Sửa nội dung header & footer (chỉnh số liệu động)

- Đổi tagline thành dynamic: `"{TRACKS.length - 1} chặng phiêu lưu trực quan — chạm, kéo, thả, dạy bot, vẽ neuron..."` (trừ Graduation).
- Footer Certificate: `"Hoàn thành {TRACKS.length - 1} bài học và đạt {maxStars}/{maxStars} sao..."`.
- Thêm i18n EN tự động qua `AutoTranslateBoundary` đã có.

---

## B. Bổ sung activity cho 8 sandbox còn dư chỗ

Mỗi sandbox sẽ được thêm **1–2 mini-activity** dùng các component có sẵn (DragDropQuiz, MultipleChoiceQuiz, ScenarioQuiz, SandboxMiniActivity) để giữ nhất quán UI và không sinh code mới.

| Sandbox | Activity thêm vào |
|---|---|
| StudySmartSandbox | (1) Prompt Builder kéo-thả: "Vai trò + Ngữ cảnh + Yêu cầu + Định dạng" → so với prompt yếu. (2) Quiz: chọn prompt tốt nhất để học IELTS. |
| CareersMapSandbox | (1) Ghép sở thích → nghề AI tại VN (VinAI, FPT.AI, Zalo AI, MoMo, VNG). (2) Timeline kéo-thả: lộ trình từ lớp 9 → ĐH → việc đầu tiên. |
| DigitalSafetySandbox | (1) Spot-the-Deepfake: 4 ảnh/video, chọn cái giả. (2) Tin nhắn lừa đảo: phân loại "An toàn / Nghi ngờ / Lừa đảo". |
| EthicsSandbox | (1) Trolley-style cho xe tự lái (5 tình huống). (2) Bias detector: 4 dataset mẫu, chọn cái có bias giới/sắc tộc. |
| FactCheckSandbox | (1) Hallucination Hunt: 6 câu AI trả lời, đánh dấu phần sai. (2) "Triangulate": ghép tuyên bố với nguồn tin cậy. |
| AgentWorkflowSandbox | (1) Tool-picker: agent chọn đúng tool (search/code/calendar) cho từng task. (2) Plan-then-act: sắp xếp 6 bước cho agent đặt vé máy bay. |
| NeuralNetSandbox | (1) Activation playground: chọn ReLU/Sigmoid/Tanh để khớp đồ thị. (2) "Bao nhiêu lớp là đủ?" — slider số layer, dự đoán overfit/underfit. |
| GraduationSandbox | (1) Recap quiz tổng hợp 10 câu từ tất cả tracks. (2) "Đặt tên cho AI của em" — input + preview chứng chỉ với tên đó. |

Tất cả sẽ cộng sao như mini-activity hiện tại (tận dụng cơ chế `awardStar` đã có).

---

## C. Hiệu ứng viền "điện chạy" cho card bài học

Thêm class utility mới `electric-border` vào `index.css` + Tailwind:

- **Lớp gradient quay**: pseudo-element `::before` chứa conic-gradient (Royal Blue → Cyan → Emerald → Violet → Blue), animate `rotate 6s linear infinite`.
- **Lớp mask**: dùng `padding: 2px` + nội dung con có `border-radius` + `background: hsl(var(--card))` để chỉ thấy viền sáng.
- **Glow pulse**: `box-shadow: 0 0 24px hsl(var(--primary)/.35)` animate độ mờ.
- Tôn trọng `prefers-reduced-motion`: tắt animation nếu user yêu cầu.
- Áp dụng cho mỗi `<motion.button>` track card trong AIAcademy.tsx (line ~1200) và bật mạnh hơn khi `stars >= 3` (hoàn thành).

Không dùng JS — pure CSS để giữ hiệu năng. Đồng nhất với palette HaiEduTech.

```text
┌──────────── Electric border ───────────┐
│  ╔═════════════════════════════════╗   │   <- conic gradient rotate
│  ║       Card content (bg-card)    ║   │
│  ╚═════════════════════════════════╝   │
└────────────────────────────────────────┘
```

---

## D. Rà soát đủ cho G6–G12 — gợi ý mở rộng

Hiện 15 bài đã bao phủ tốt: nhận thức AI (Vision/NLP/NN), sáng tạo (GenAI/Deepfake), hệ thống (RL/Agent/AIoT/Recsys), đạo đức & an toàn (Ethics/Safety/FactCheck), định hướng (Study/Careers), thực hành (Capstone). **Còn thiếu mảng** cho học sinh G9–G12 muốn thi/khởi nghiệp:

Tôi đề xuất chọn thêm **3–6 bài** sau (ưu tiên đậm):

1. **🧮 AI & Toán học trực quan** — xác suất, hồi quy tuyến tính, gradient descent dạng game kéo đường thẳng. *(rất cần cho G9–12)*
2. **🛠️ Prompt Engineering Lab** — tách riêng khỏi StudySmart: 5 patterns (CoT, Few-shot, Role, ReAct, Self-critique) với playground.
3. **🚀 AI Khởi nghiệp Việt** — case VinAI/Got It/Misa, từ ý tưởng → MVP → pitch deck mẫu. *(G11–12)*
4. **🧬 AI trong Khoa học** — AlphaFold, dự báo bão, phát hiện ung thư — story-driven, ít tương tác hơn.
5. **🎼 AI Sáng tạo Nghệ thuật** — Suno/MusicLM, Midjourney prompt, kết hợp nhạc + ảnh + thơ.
6. **🤖 Robotics & Embodied AI** — Boston Dynamics, ROS cơ bản, mini simulator xếp khối.

Tôi sẽ chờ bạn chốt số lượng trước khi build (mặc định khuyến nghị 3 bài: **Toán AI + Prompt Lab + Khởi nghiệp VN**).

---

## Phạm vi kỹ thuật (cho dev)

- **Files sửa**: `src/pages/AIAcademy.tsx` (header text + class card + Progress type nếu thêm tracks), `src/index.css` (keyframes + `.electric-border`), 8 file `*Sandbox.tsx` (thêm activity).
- **Files mới** (chỉ nếu user duyệt phần D): 3–6 file `*Sandbox.tsx` mới + entry trong `TRACKS` + content trong `aiAcademyContent.ts`.
- **Không động** vào `IELTSChart.tsx` / data IELTS đã sửa ở turn trước.

---

## Câu hỏi cần chốt trước khi build

1. **Phần D mở rộng**: build 0 / 3 (đề xuất) / 6 bài thêm?
2. **Electric border**: áp dụng cho **tất cả card** hay chỉ card **đã đạt 3 sao** (kiểu reward unlock)?
3. **Graduation recap quiz**: 10 câu auto-sample từ quiz có sẵn của các tracks, hay viết riêng 10 câu tổng hợp mới?

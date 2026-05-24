# Rà soát nội dung AI Academy & đề xuất bổ sung

## 1. Hiện trạng (tổng kết nhanh)

12 bài hiện có cấu trúc đồng nhất:
- **Story (pane trái):** 3 thẻ × ~50–80 từ (heading emoji + body) → ~210 từ/bài
- **Sandbox (pane phải):** 1 mini-game tương tác (Bài 1 đã viết lại theo spec mới; Bài 2–12 vẫn ở phiên bản cũ)
- **Quiz:** 3 câu drag-drop vào 2 bucket
- **Phần thưởng:** sao + huy hiệu + confetti + log Supabase

## 2. Phát hiện thiếu sót lớn

| # | Vấn đề | Mức độ |
|---|--------|--------|
| A | Nội dung story quá ngắn (~210 từ) so với chuẩn long-read 300–500 từ của HaiEduTech | **Cao** |
| B | Thiếu case study Việt Nam (VinAI, FPT.AI, Zalo AI, VinFast tự lái, vụ deepfake VTV) — chỉ Bài 6 có Amazon 2018 | **Cao** |
| C | Chỉ 1 dạng quiz duy nhất (drag-drop). Học sinh chơi 12 bài → nhàm | **Cao** |
| D | Thiếu **"Mẹo vàng của thầy Hải"** — pattern đặc trưng của các lecture khác trên hệ thống | **Trung bình** |
| E | Không có glossary / thuật ngữ (tokenization, bounding box, cosine similarity…) để tra cứu nhanh | **Trung bình** |
| F | Không có gợi ý nghề nghiệp cho từng bài (chỉ Bài 12 có) | **Trung bình** |
| G | Không có bài tập về nhà / dự án mini sau mỗi bài | **Trung bình** |
| H | Không link tới demo thật ngoài đời (Teachable Machine, HuggingFace Spaces, Scratch ML4Kids, Quick Draw) | **Trung bình** |
| I | Không có video YouTube nhúng minh hoạ | **Thấp** |
| J | Bài 9 (Capstone) và Bài 12 (Graduation) chồng lấp khái niệm "kết thúc" — cần phân vai rõ | **Thấp** |
| K | Bài 6 (Ethics) & Bài 10 (Deepfake) chưa có cảnh báo an toàn cho phụ huynh / hotline báo cáo VN | **Trung bình** |
| L | Không có reflection prompt ("Em hiểu gì sau bài này?") | **Thấp** |
| M | Sandbox Bài 2–12 chưa khớp spec gameplay mới (đã thảo luận turn trước) | **Cao** |
| N | Không có map tiên quyết / thứ tự học gợi ý (Bài 4 nên sau Bài 3?) | **Thấp** |
| O | Không có cheat sheet / mindmap in được sau khi tốt nghiệp | **Thấp** |

## 3. Đề xuất bổ sung — chia 3 đợt

### Đợt 1 — Nội dung cốt lõi (ưu tiên cao, ~3–4 turn)

Mở rộng schema `Track` thêm các trường:

```ts
type Track = {
  // ...giữ nguyên các trường cũ
  story: { heading: string; body: string }[];   // nâng từ 3 → 4–5 thẻ, mỗi thẻ 80–120 từ
  vietnamCase?: { title: string; body: string }; // case study VN
  goldenTip?: string;                            // "Mẹo vàng của thầy Hải"
  glossary?: { term: string; def: string }[];    // 4–6 thuật ngữ/bài
  careers?: string[];                            // 3–5 nghề liên quan
  homework?: string;                             // 1 dự án mini
  externalDemo?: { label: string; url: string }[]; // 2–3 link tools thật
};
```

UI: Render thêm 4 section dưới Story:
1. 🇻🇳 **Câu chuyện Việt Nam**
2. 💡 **Mẹo vàng của thầy Hải** (highlight vàng)
3. 📖 **Từ điển AI** (accordion expand)
4. 🎯 **Thử sức ở nhà** + 🔗 **Chơi với AI thật**

### Đợt 2 — Đa dạng hoá quiz (ưu tiên cao, ~2 turn)

Thêm 2 component quiz mới ngoài drag-drop:
- `MultipleChoiceQuiz.tsx` — 1 câu hỏi, 4 đáp án, có giải thích sau khi chọn
- `ScenarioQuiz.tsx` — kể 1 tình huống đời thực, học sinh chọn hành động đúng

Mỗi track có thể trộn 2–3 loại quiz khác nhau thay vì chỉ drag-drop. Mở rộng `quiz` field:

```ts
quiz: (DDQuestion | MCQuestion | ScenarioQuestion)[]
```

### Đợt 3 — Hoàn thiện sandbox theo spec (ưu tiên cao, ~6–8 turn)

Viết lại 11 sandbox còn lại (Bài 2–12) theo spec gameplay đã chốt ở turn trước, dùng `aiAcademyFx.ts` đã có sẵn (bounce / shake / sound). Mỗi sandbox 1 turn riêng để kiểm soát chất lượng.

### Đợt 4 — Phụ kiện thưởng thêm (tuỳ chọn, ~2 turn)

- **Bài 6 & Bài 10:** Thêm khung ⚠️ "Khi gặp tình huống thật" + hotline 113 / Cục An toàn TT (0339.829.929) / form báo cáo
- **Tổng quan:** "Bản đồ học tập" SVG hiển thị thứ tự gợi ý 12 bài (graph có mũi tên)
- **Cuối Bài 12:** Nút "Tải mindmap PDF" tổng hợp 12 bài

## 4. Đề xuất tách Bài 9 vs Bài 12

| | Bài 9 — Capstone | Bài 12 — Graduation |
|---|---|---|
| Hiện tại | Lắp Robot từ huy hiệu | Generate certificate |
| **Đề xuất** | **BUILD** — đóng vai kỹ sư, ráp module thật | **PRESENT** — đóng vai diễn giả, pitch sản phẩm |
| Story nên về | Quy trình kỹ thuật MLOps | Storytelling, public speaking, career |
| Sandbox | Giữ Robot assembly | Giữ certificate, thêm "viết pitch 60s" |

## 5. Phần kỹ thuật

- Toàn bộ comment trong code bằng tiếng Anh (theo rule)
- Sanitize HTML body bằng DOMPurify nếu cho phép `<b>` (đã có sẵn pattern trên hệ thống)
- Giữ localStorage key `haiedu_ai_academy_progress`, không break dữ liệu cũ
- Mỗi quiz type mới phải có biến thể mobile-friendly (button ≥44px)
- Glossary và career list lưu trong cùng object TRACKS để dễ bảo trì

## 6. Đề xuất thứ tự thực thi nếu bạn đồng ý

1. **Turn tiếp theo:** Mở rộng story + thêm vietnamCase + goldenTip + glossary + careers + homework cho cả 12 bài (1 file lớn `AIAcademy.tsx` — chỉ sửa mảng TRACKS + JSX render section mới)
2. **Sau đó:** Thêm 2 loại quiz mới (MC + Scenario) + viết lại quiz array cho 12 bài
3. **Cuối:** Viết lại tuần tự sandbox Bài 2–12 (1 bài/turn)

Bạn muốn mình chốt theo phương án này, hay chỉ chọn một số mục cụ thể trong bảng phát hiện ở mục 2 để làm trước?
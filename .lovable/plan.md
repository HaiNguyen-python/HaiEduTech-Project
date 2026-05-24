## Mục tiêu

1. Bổ sung **1–2 hoạt động tương tác mới** vào các sandbox còn nhiều khoảng trống để tăng độ thực hành.
2. Rà soát và **sửa lỗi ngắt dòng phi logic** trong nội dung 12 bài học (Vietnam Case, Golden Tip, Story, Glossary…).

---

## Phần 1 — Nguồn gốc lỗi "ngắt dòng không hợp logic"

Khi kiểm tra `SmartText` (`src/pages/AIAcademy.tsx` dòng 51–82), bộ tách câu hiện đang split text theo:

```
.split(/(?<=[.!?])\s+/)            // OK — ngắt theo dấu chấm câu
.flatMap((s) => s.split(/\s+—\s+/)) // ⚠️ ngắt thêm theo em-dash " — "
```

Trong nội dung 12 bài có **86 chỗ** dùng em-dash " — " làm dấu phẩy / giải thích **bên trong cùng một câu**, ví dụ:

> "Kiki là trợ lý ảo thuần Việt do Zalo phát triển — hiểu tiếng Việt giọng 3 miền, xử lý teen-code..."

Hiện đang bị tách thành 2 bullet rời rạc, mất ngữ nghĩa. Đây là nguyên nhân chính của các "ngắt dòng không hợp logic" mà Thầy đang thấy.

### Cách xử lý

- **Bỏ rule `split(/\s+—\s+/)`** — chỉ tách theo dấu chấm/!/? thực sự.
- **Nâng ngưỡng bulletize** từ 3 lên 2 câu cho nội dung ngắn để tránh tách lẻ.
- **Thêm guard** không tách sau các viết tắt phổ biến tiếng Việt (`TP.`, `GS.`, `TS.`, `Th.S`, `Ph.D`, `Mr.`, `St.`, `vs.`).
- Rà soát thủ công 12 bài (vision, nlp, nn, genai, rl, ethics, recsys, aiot, capstone, deepfake, agent, graduation) trong `aiAcademyContent.ts` + story body trong `AIAcademy.tsx` — chỗ nào ý vẫn dính nhau thì thay dấu câu (`. ` → `, `) hoặc bỏ em-dash thừa.

---

## Phần 2 — Bổ sung hoạt động cho sandbox còn trống

Hiện cấu trúc mỗi sandbox = **1 simulator chính + 2 bonus games** (True/False + Match Pairs).

Các sandbox **simulator ngắn / còn nhiều khoảng trắng** sẽ nhận thêm **1 mini-activity**:

| Sandbox | Hoạt động bổ sung đề xuất |
|---|---|
| **Ethics** | "Tỉa CV thiên vị" — kéo bỏ các từ gây bias (`women's chess club`, `nam giới ưu tiên`…) khỏi mô tả tuyển dụng, xem điểm fairness tăng. |
| **NeuralNet** | "Bộ Predictor cảm xúc" — 3 slider (vui/buồn/bất ngờ) → mạng neuron mini đoán emoji output. |
| **Recsys** | "Trộn vector sở thích" — chọn 3 video đã xem, hệ thống tính `cosine similarity` và highlight top-3 gợi ý. |
| **AIoT** | "Tủ lạnh thông minh" — toggle cảm biến (cửa mở, nhiệt độ, hết sữa) → hiển thị action AI nên gửi đến điện thoại. |
| **GenAI** | "Đoán Prompt từ ảnh" — show 4 ảnh emoji, học sinh ghép với 1 trong 4 prompt phù hợp nhất. |
| **NLP** (đã dài nhưng còn chỗ ở phần cuối) | Bỏ qua — đã đủ. |
| Các sandbox khác (Vision / Deepfake / Agent / Capstone / Graduation / RL) | Đã có nhiều khu vực — chỉ giữ nguyên. |

### Cách triển khai

- Tạo **1 helper component dùng chung** `SandboxMiniActivity.tsx` chứa 2 dạng tái sử dụng:
  1. `ChipFilter` — học sinh bật/tắt các "yếu tố" → 1 thanh metric thay đổi realtime.
  2. `BestMatchPick` — show 4 input → ghép với 1 trong 4 output, có chấm đúng/sai và animation.
- Mỗi sandbox đích chỉ cần `import` và truyền config (label, options, target metric) → giữ code gọn.

---

## Phần 3 — Phạm vi file thay đổi (dự kiến)

- `src/pages/AIAcademy.tsx` — sửa `SmartText` (split rules + abbreviation guard).
- `src/data/aiAcademyContent.ts` — chỉnh nhẹ em-dash / dấu câu ở các đoạn còn dính ý sau khi đổi split.
- `src/components/ai-academy/SandboxMiniActivity.tsx` — **mới**, helper dùng chung.
- 5 sandbox: `EthicsSandbox.tsx`, `NeuralNetSandbox.tsx`, `RecsysSandbox.tsx`, `AIoTSandbox.tsx`, `GenAISandbox.tsx` — thêm 1 mini-activity / file.

---

## Phần 4 — Kiểm thử sau khi build

- Mở từng tab trong 12 bài tại `/programming/ai-academy`, đảm bảo:
  - Các bullet không còn bị ngắt giữa câu khi có em-dash.
  - 5 sandbox được bổ sung có hoạt động mới chạy mượt, có animation + chấm điểm.
  - Layout vẫn cân (border-t-2 dividers giữ nguyên).

Thầy duyệt plan để em chuyển sang **Build mode** và thực hiện ạ.
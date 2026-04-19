

## Vấn đề
Học viên đang ở `/programming/ml-linear-reg` thấy bài Theory dài, toàn chữ + bảng, **không có icon hay hình minh hoạ** → cảm giác đơn điệu, khó nuốt. Vấn đề lặp lại trên toàn bộ 80+ lessons trong `Learn Programming`.

## Chiến lược: Tăng "visual layer" ở component render, KHÔNG sửa từng bài
Sửa data 80 bài → mất nhiều vòng + dễ vỡ. Thay vào đó **nâng cấp `TheorySections.tsx`** để **tự động** thêm yếu tố trực quan dựa trên cấu trúc markdown đã có (vì cấu trúc đã chuẩn: H2 đánh số "1.", "2.", có emoji, có blockquote, có bảng, có code block).

### Cấp độ 1 — Tự động hoá toàn cục (áp dụng tất cả 80 bài, 0 đụng data)

**a) H2 với số thứ tự thành "step badge" tròn có gradient**
- Detect regex `^(\d+)\.\s+(.+)` trong tiêu đề H2 → tách số ra thành **badge tròn 36×36 gradient brand** (royal blue → emerald) đứng cạnh tiêu đề.
- Auto-pick **lucide icon** theo từ khoá trong tiêu đề: "vấn đề/problem" → `Lightbulb`, "công thức/syntax/cú pháp" → `Code2`, "ví dụ/example" → `FileCode`, "bẫy/lỗi/mistake/trap" → `AlertTriangle`, "tổng kết/summary/checklist" → `ListChecks`, "khi nào/when" → `HelpCircle`, "hiệu năng/performance" → `Zap`, "so sánh/vs" → `GitCompare`, "thực hành/practice" → `Dumbbell`, "ghi chú nâng cao/advanced" → `Sparkles`. Fallback: `BookOpen`.

**b) Blockquote (`>`) thành "callout card" có icon**
- Detect dòng đầu blockquote: nếu bắt đầu bằng "Mẹo/Tip/💡" → callout vàng + `Lightbulb`; "Cảnh báo/Warning/⚠️" → đỏ + `AlertTriangle`; "Lưu ý/Note/📝" → xanh dương + `Info`; mặc định → tím + `Quote`. Card có border-left 4px, background nhạt 8% màu chủ đạo.

**c) Bảng (`<table>`) đẹp hơn**
- Header row gradient brand nhẹ, zebra rows, rounded corners, icon `Table` nhỏ phía trên-trái khi bảng > 3 cột.

**d) "Pro tip" inline cho code block**
- Mỗi `<CodeBlock>` đã có sẵn nút copy; thêm icon ngôn ngữ nhỏ ở góc trên-trái (Python `🐍`, SQL `🗄️`, JS `📜`…) — dùng emoji có sẵn để khỏi đụng `CodeBlock.tsx` quá sâu.

**e) Section divider có hoa văn nhẹ** giữa các H2 (đường gạch ngang gradient mờ → ngắt nhịp thị giác).

**f) Animated entrance**: mỗi section fade-in + slide-up 200ms khi cuộn vào view (Framer Motion + IntersectionObserver) → cảm giác sống động, không nặng.

### Cấp độ 2 — Hình minh hoạ SVG cho 3 concepts khó nhất (chỉ 3 bài "flagship")

Chèn vào data bằng **markdown component custom** (cú pháp `:::diagram type="..."`) cho 3 bài học viên chạm sớm và khó nhất:

1. **`ml-lr-1` Linear Regression** → SVG scatter plot có đường thẳng best-fit + nhãn `y = wx + b`, axis labels Việt ("Diện tích", "Giá").
2. **`sql-join-1` JOINs** → SVG Venn diagram 2 vòng tròn (INNER, LEFT, RIGHT, FULL) cạnh nhau, có nhãn.
3. **`sql-sub-1` Subqueries** → SVG sơ đồ truy vấn lồng nhau (outer query → inner query → result).

Mỗi diagram là 1 React component nhỏ trong `src/components/lesson-visuals/` (~50 dòng SVG mỗi cái).

### Files thay đổi
- ✏️ `src/components/TheorySections.tsx` — thêm icon mapper, callout parser, animated entrance, custom H2 với step badge.
- ➕ `src/components/lesson-visuals/StepBadge.tsx` — badge số tròn gradient.
- ➕ `src/components/lesson-visuals/Callout.tsx` — 4 variants tip/warning/note/quote.
- ➕ `src/components/lesson-visuals/LinearRegressionDiagram.tsx` — SVG scatter + best fit.
- ➕ `src/components/lesson-visuals/JoinVennDiagram.tsx` — SVG Venn 4 loại JOIN.
- ➕ `src/components/lesson-visuals/SubqueryDiagram.tsx` — SVG sơ đồ subquery.
- ✏️ `src/data/curriculum/mlLessons.ts` — chèn `:::diagram type="linear-regression":::` vào `ml-lr-1`.
- ✏️ `src/data/curriculum/sqlLessons.ts` — chèn `:::diagram type="join-venn":::` vào `sql-join-1`, `:::diagram type="subquery":::` vào `sql-sub-1`.
- ✏️ `src/index.css` — thêm style cho `.theory-callout`, `.theory-step-badge`, table polish.

### Không đụng tới
- `CodeBlock.tsx` (đã ổn).
- `ProgrammingLesson.tsx` (chỉ là wrapper).
- Schema DB, Supabase types.
- 77 lessons còn lại — toàn bộ tự động hưởng cấp độ 1 mà không cần sửa data.

### Kết quả mong đợi
- Mọi bài học đều có **step badge số gradient + icon ngữ nghĩa** ở mỗi mục H2.
- Blockquote thành callout màu sắc với icon → mắt dễ scan.
- 3 bài flagship có **diagram SVG riêng** minh hoạ trực quan khái niệm khó.
- Không bài nào cần viết lại data → an toàn, nhanh.


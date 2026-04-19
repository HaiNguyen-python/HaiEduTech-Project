

## Vấn đề
Người dùng đang ở `/programming/sql-subqueries` (Basic Subqueries). Nội dung lý thuyết hiện tại có các vấn đề:

1. **Toàn bộ tiếng Anh, dày đặc thuật ngữ**: "non-correlated", "scalar", "derived table", "Cartesian product"… không kèm giải thích tiếng Việt rõ ràng.
2. **Nhảy thẳng vào case study cao cấp** (vụ "30× slowdown", "NOT IN nightmare") trước khi học viên kịp hiểu cú pháp cơ bản.
3. **Bảng so sánh dày đặc** (Subquery vs JOIN vs CTE) xuất hiện quá sớm — học viên chưa biết JOIN/CTE đã phải so sánh.
4. **Ví dụ code rời rạc**, không có ngữ cảnh "trước–sau" để học viên thấy: "À, không có subquery thì phải viết như thế nào, có subquery thì viết gọn ra sao."
5. Câu giới thiệu mang phong cách marketing ("paint on the walls", "30× slowdown that wasn't") gây nhiễu.

Lesson **Basic Subqueries** mà người dùng đang xem là điển hình. Các bài lân cận trong cùng module SQL (CTEs, JOINs, Window Functions…) cũng theo cùng phong cách "dense English + jargon-first" → cần áp dụng cùng một chuẩn diễn đạt mới cho cả module.

## Mục tiêu viết lại
Giữ nguyên độ phủ kiến thức (các H2 sections vẫn ≥6 để `TheorySections.tsx` chấm "Mark read"), nhưng:

- **Mở đầu bằng câu hỏi đời thường** ("Làm sao tìm học viên có điểm cao hơn điểm trung bình của lớp?") trước khi đưa ra thuật ngữ.
- **Mỗi thuật ngữ tiếng Anh xuất hiện lần đầu phải kèm giải nghĩa tiếng Việt ngắn trong ngoặc**: ví dụ *correlated subquery (truy vấn con phụ thuộc — chạy lại cho mỗi dòng của bảng ngoài)*.
- **Nguyên tắc 3 bước cho mỗi khái niệm khó**: (1) Vấn đề thực tế, (2) Code minh họa cực ngắn (3–5 dòng), (3) Giải thích từng dòng.
- **Loại bỏ case study quá cao cấp** ở đầu bài; dời xuống mục "Ghi chú nâng cao" cuối bài hoặc cắt bớt.
- **Bảng so sánh chỉ giữ những gì học viên đã học** — không so với CTE/Window khi chưa học.
- Giữ nguyên giọng song ngữ: phần `theory` (long form) viết **chủ yếu tiếng Việt + thuật ngữ tiếng Anh giữ nguyên**; phần `theoryEn` (short form) giữ tiếng Anh ngắn gọn.

## Phạm vi cụ thể

### 1. Viết lại bài đang gây hiểu lầm — `sql-sub-1` "Basic Subqueries" (file `src/data/curriculum/sqlLessons.ts`, dòng ~917–1106)

Cấu trúc H2 mới (8 sections, đáp ứng ràng buộc ≥6):

1. **Subquery là gì? (Câu chuyện 30 giây)** — Tình huống: "Tìm học viên có điểm cao hơn điểm trung bình lớp." Cho thấy không có subquery thì phải chạy 2 truy vấn riêng → tốn công. Subquery gộp lại 1 câu.
2. **Cú pháp tối thiểu (xem 1 lần là nhớ)** — 1 ví dụ cực ngắn duy nhất, kèm chú thích từng dòng bằng tiếng Việt.
3. **3 vị trí đặt subquery** — Bảng đơn giản: WHERE (lọc), FROM (làm bảng tạm), SELECT (lấy 1 giá trị). Mỗi dòng kèm 1 ví dụ thực tế ngắn.
4. **Subquery trả về gì? (1 giá trị, 1 cột, hay cả bảng)** — Giải thích "scalar / multi-row / multi-column" bằng tiếng Việt: "trả 1 ô — dùng với `=`, `>`; trả 1 cột nhiều dòng — dùng với `IN`; trả cả bảng — đặt trong FROM." Mỗi loại 1 ví dụ.
5. **`IN` vs `EXISTS` — chọn cái nào?** — Giải thích bằng phép so sánh đời thường ("EXISTS giống như hỏi 'có ai trong phòng không?' — thấy 1 người là dừng. IN giống như đếm hết tất cả mọi người rồi mới trả lời"). Bảng so sánh 3 dòng.
6. **Bẫy `NOT IN` với NULL** — Giải thích bằng 1 ví dụ data thực: bảng churn có 1 dòng NULL → `NOT IN` trả 0 dòng. Quy tắc vàng: "Có NULL → dùng `NOT EXISTS`."
7. **Correlated subquery — khi subquery 'nhìn ra ngoài'** — Giải thích bằng tiếng Việt: "Subquery thông thường chạy 1 lần. Correlated chạy lại cho TỪNG dòng của truy vấn ngoài → chậm hơn rất nhiều khi dữ liệu lớn." Kèm cảnh báo hiệu năng (không kể case 30× slowdown nữa).
8. **Tổng kết & checklist khi viết subquery** — Bullet list 5 dòng dễ nhớ.

Cập nhật:
- `theory` (long, tiếng Việt là chính + thuật ngữ Anh giữ nguyên).
- `theoryEn` (short, tiếng Anh ngắn — viết lại theo cùng cấu trúc).
- `code`: thêm comment tiếng Việt vào từng block để khớp với explanation.
- `exercise` / `exerciseEn`: viết lại đề bài cụ thể hơn ("Tìm học viên có tổng giá trị đơn hàng lớn hơn trung bình toàn lớp — gợi ý: dùng GROUP BY ở subquery").
- `quiz`: giữ 5 câu, viết lại các câu hỏi/giải thích bằng cấu trúc dễ hiểu hơn (vẫn `answer` 0–3, có `explanation`).

### 2. Áp dụng cùng chuẩn diễn đạt cho các bài còn lại trong module Subqueries & các module SQL kế cận có cùng vấn đề
Sau khi mở bài `sql-sub-1`, mình sẽ rà lại các bài có theory > 800 chữ toàn tiếng Anh trong cùng file và tinh chỉnh tương tự (ưu tiên các bài người học mới sẽ chạm sớm: `sql-cte-1`, `sql-joins`, `sql-aggregate-1`). Nếu phạm vi rộng quá, sẽ chỉ làm bài `sql-sub-1` ở vòng này và liệt kê rõ bài nào còn lại để xử lý ở vòng sau — tránh viết file quá dài 1 lần.

**Phạm vi cam kết vòng này:**
- ✅ Viết lại trọn vẹn `sql-sub-1` (theory + theoryEn + code + exercise + quiz).
- ✅ Viết lại `sql-cte-1` "Basic WITH & CTE" theo cùng nguyên tắc (vì lesson kế tiếp, cùng cảm giác khó).

Các bài SQL khác (Joins, Aggregate, Window…) sẽ giữ nguyên ở vòng này; nếu user muốn tiếp, sẽ làm vòng sau.

## Quy tắc giữ nguyên
- Số H2 sections ≥ 6 cho mỗi `theory` (yêu cầu của `TheorySections.tsx`).
- `quiz`: index `answer` 0–3, có `explanation`.
- Không đổi `id` lesson/module → không phá link đang chạy `/programming/sql-subqueries`.
- Không đụng vào schema, components, file types.

## Files thay đổi
- ✏️ `src/data/curriculum/sqlLessons.ts` — viết lại 2 lessons: `sql-sub-1` và `sql-cte-1` (theory, theoryEn, code, exercise, exerciseEn, quiz).

## Không đụng tới
- `TheorySections.tsx`, `CodeBlock.tsx`, `ProgrammingLesson.tsx`, schema DB, types Supabase, các module SQL khác trong cùng file.


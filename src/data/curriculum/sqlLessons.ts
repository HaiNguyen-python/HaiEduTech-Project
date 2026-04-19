// CONTENT STANDARD: every `theory` block MUST contain ≥6 `## H2` sections so TheorySections.tsx can render the per-section "Mark read" UX.
// SQL & Database curriculum — 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const sqlModules: ExtendedProgrammingModule[] = [
  {
    id: "sql-select-basics",
    title: "SELECT cơ bản",
    titleEn: "SELECT Basics",
    icon: "📋",
    color: "from-violet-500 to-purple-600",
    description: "Truy vấn dữ liệu cơ bản với SELECT, FROM, LIMIT",
    descriptionEn: "Basic data retrieval with SELECT, FROM, LIMIT",
    course: "sql",
    lessons: [
      {
        id: "sql-select-1",
        title: "SELECT & FROM",
        titleEn: "SELECT & FROM",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bạn có một bảng \`students\` (học viên) chứa 1000 dòng. Sếp nhắn: *"Cho tôi xem 10 học viên có điểm cao nhất."* Làm sao? Đó chính là việc của câu lệnh **SELECT** — cách bạn "hỏi" database để lấy dữ liệu ra.

Mỗi câu hỏi với database đều bắt đầu bằng SELECT: từ dashboard công ty, báo cáo doanh thu, cho tới feature cho machine learning.

## 2. Cú pháp tối thiểu (xem 1 lần là nhớ)

\`\`\`sql
SELECT name, score        -- Lấy cột nào? → cột "name" và "score"
FROM   students           -- Từ bảng nào? → bảng "students"
ORDER BY score DESC       -- Sắp xếp theo điểm giảm dần (DESC = descending)
LIMIT 10;                 -- Lấy bao nhiêu dòng? → 10 dòng đầu tiên
\`\`\`

Mỗi dòng trả lời 1 câu hỏi: **Lấy gì? Từ đâu? Sắp xếp ra sao? Bao nhiêu dòng?**

## 3. \`SELECT *\` vs liệt kê cột cụ thể

- \`SELECT * FROM students;\` → lấy **tất cả các cột**. Tiện khi khám phá dữ liệu lần đầu.
- \`SELECT name, age FROM students;\` → chỉ lấy cột bạn cần. **Luôn dùng cách này khi đưa code lên production** (môi trường thật).

Lý do: bảng thật có thể có 50 cột, mỗi dòng nặng vài KB. \`SELECT *\` kéo về cả MB dữ liệu thừa, tốn băng thông và RAM.

## 4. \`DISTINCT\` — loại bỏ trùng lặp

Bảng \`students\` có 1000 học viên ở khắp Việt Nam. Bạn muốn biết có bao nhiêu **thành phố** khác nhau xuất hiện?

\`\`\`sql
SELECT DISTINCT city FROM students;   -- Mỗi thành phố chỉ hiện 1 lần
\`\`\`

\`DISTINCT\` (riêng biệt) loại bỏ giá trị trùng lặp. Khi liệt kê nhiều cột (\`DISTINCT city, age\`), database xét tính duy nhất theo **cả tổ hợp** — chỉ trùng nếu cả city lẫn age đều giống.

## 5. \`LIMIT\` & \`OFFSET\` — chỉ lấy 1 phần kết quả

\`\`\`sql
SELECT name FROM students
LIMIT 10 OFFSET 20;   -- Bỏ qua 20 dòng đầu, sau đó lấy 10 dòng tiếp theo
\`\`\`

- \`LIMIT 10\` — chỉ lấy **10 dòng**.
- \`OFFSET 20\` — **bỏ qua 20 dòng đầu** rồi mới đếm.

Dùng khi phân trang (pagination): trang 1 = OFFSET 0, trang 2 = OFFSET 10, trang 3 = OFFSET 20…

## 6. \`ORDER BY\` — sắp xếp kết quả

\`\`\`sql
SELECT name, age FROM students
ORDER BY age DESC;        -- DESC = giảm dần. ASC = tăng dần (mặc định).
\`\`\`

**Mẹo nhỏ**: nếu nhiều học viên cùng tuổi, thứ tự giữa họ là *ngẫu nhiên*. Khi dùng kèm \`LIMIT\`, hãy thêm 1 cột phụ để sắp xếp ổn định:

\`\`\`sql
ORDER BY age DESC, id ASC;   -- Cùng tuổi → sắp theo id tăng dần
\`\`\`

## 7. Thứ tự thực thi (execution order) — mẹo vàng để hiểu SQL

Bạn **viết** SQL theo thứ tự: \`SELECT … FROM … WHERE … ORDER BY … LIMIT\`.
Nhưng database **chạy** theo thứ tự khác:

\`\`\`
1. FROM      → mở bảng
2. WHERE     → lọc dòng
3. GROUP BY  → gom nhóm
4. SELECT    → tính cột kết quả
5. ORDER BY  → sắp xếp
6. LIMIT     → cắt số dòng
\`\`\`

Vì vậy, một alias (tên đặt tạm) trong SELECT *không* dùng được trong WHERE — vì WHERE đã chạy xong trước SELECT. Nhớ điều này, sau này gặp lỗi sẽ hiểu ngay.

## 8. Tổng kết — checklist khi viết SELECT

- ✅ Trên production: liệt kê cột cụ thể, **tránh** \`SELECT *\`.
- ✅ Khi dùng \`LIMIT\`, **luôn** kèm \`ORDER BY\` (kèm cột phụ để ổn định).
- ✅ \`DISTINCT\` chỉ dùng khi thật cần — nếu dữ liệu bị trùng, sửa từ nguồn.
- ✅ Nhớ thứ tự thực thi: **FROM → WHERE → SELECT → ORDER BY → LIMIT**.
- ✅ Bài tiếp theo: **AS / Alias** — đặt tên ngắn gọn cho cột & bảng để query dễ đọc.`,
        theoryEn: `## 1. Real-world problem

You have a \`students\` table with 1000 rows. The boss asks: "Show me the top 10 by score." That's exactly what **SELECT** does — ask the database for data.

## 2. Minimal syntax

\`\`\`sql
SELECT name, score    -- which columns?
FROM   students       -- from which table?
ORDER BY score DESC   -- sort how?
LIMIT 10;             -- how many rows?
\`\`\`

## 3. \`*\` vs explicit columns

\`SELECT *\` is fine for exploration, dangerous in production (wasted bytes, schema breaks). Always list columns in shipped code.

## 4. DISTINCT

\`SELECT DISTINCT city FROM students;\` — each value once. With multiple columns, uniqueness is over the combination.

## 5. LIMIT / OFFSET

\`LIMIT 10 OFFSET 20\` skips 20 rows, returns the next 10. Used for pagination.

## 6. ORDER BY

\`ORDER BY age DESC\` is non-deterministic on ties. With LIMIT, always add a tiebreaker: \`ORDER BY age DESC, id ASC\`.

## 7. Execution order

You write \`SELECT … FROM … WHERE … ORDER BY\` but it runs:
\`FROM → WHERE → GROUP BY → SELECT → ORDER BY → LIMIT\`. That's why aliases work in ORDER BY but not WHERE.

## 8. Checklist

- Avoid \`SELECT *\` in production
- Always pair LIMIT with a stable ORDER BY
- Use DISTINCT sparingly
- Remember execution order
- Next lesson: **AS / Aliases**`,
        code: `-- Lấy tất cả các cột (chỉ dùng khi khám phá)
SELECT * FROM students;

-- Chỉ lấy cột cần thiết (cách dùng chuẩn)
SELECT name, age FROM students;

-- Lấy danh sách độ tuổi không trùng
SELECT DISTINCT age FROM students;

-- Chỉ lấy 3 dòng đầu
SELECT name FROM students LIMIT 3;

-- Sắp xếp theo điểm giảm dần, lấy trang 2 (5 dòng/trang)
SELECT name, score FROM students
ORDER BY score DESC, id ASC   -- thêm id ASC để thứ tự ổn định
LIMIT 5 OFFSET 5;`,
        codeLanguage: "sql",
        exercise: "Viết câu lệnh lấy tên (name) và email của 5 học viên đầu tiên trong bảng students, sắp xếp theo tên A→Z. Gợi ý: dùng ORDER BY name ASC kèm LIMIT 5.",
        exerciseEn: "Write a query to get name and email of the first 5 students, sorted alphabetically by name (A→Z). Hint: ORDER BY name ASC + LIMIT 5.",
        testCases: [
          { input: "SELECT name, email FROM students ORDER BY name LIMIT 5;", expectedOutput: "5 rows", description: "Trả về 5 dòng với 2 cột name và email" }
        ],
        solutionExplanation: "SELECT chọn 2 cột (name, email), FROM chỉ định bảng (students), ORDER BY name sắp theo thứ tự A→Z (ASC mặc định), LIMIT 5 chỉ lấy 5 dòng đầu.",
        quiz: [
          { question: "Câu lệnh `SELECT * FROM students;` trả về cái gì?", options: ["Chỉ cột đầu tiên", "Tất cả cột và tất cả dòng của bảng", "Chỉ 10 dòng", "Báo lỗi"], answer: 1, explanation: "Dấu * có nghĩa là 'tất cả các cột'. Không có WHERE hay LIMIT thì lấy hết mọi dòng." },
          { question: "`DISTINCT` được dùng để làm gì?", options: ["Sắp xếp dữ liệu", "Loại bỏ giá trị trùng lặp", "Giới hạn số dòng", "Đếm số dòng"], answer: 1, explanation: "DISTINCT (riêng biệt) loại bỏ các dòng có giá trị giống nhau, mỗi giá trị chỉ xuất hiện 1 lần." },
          { question: "`LIMIT 10 OFFSET 20` nghĩa là gì?", options: ["Lấy dòng 1–10", "Lấy dòng 11–20", "Bỏ qua 20 dòng rồi lấy 10 dòng tiếp", "Lấy 20 dòng"], answer: 2, explanation: "OFFSET 20 bỏ qua 20 dòng đầu, sau đó LIMIT 10 lấy 10 dòng kế tiếp (tức dòng thứ 21–30)." },
          { question: "Trong thứ tự thực thi của SQL, lệnh nào chạy ĐẦU TIÊN?", options: ["SELECT", "FROM", "ORDER BY", "LIMIT"], answer: 1, explanation: "FROM chạy trước — database phải biết đọc bảng nào trước khi làm bất cứ việc gì khác." },
          { question: "Vì sao `SELECT *` không nên dùng trên môi trường production?", options: ["Gây lỗi cú pháp", "Lấy về cả những cột không cần, lãng phí băng thông và RAM", "Chỉ chạy được trên MySQL", "Bỏ qua giá trị NULL"], answer: 1, explanation: "SELECT * lấy về cả những cột không dùng đến, tốn băng thông mạng và bộ nhớ; ngoài ra nếu schema bảng thay đổi thì code dễ vỡ." }
        ]
      },
      {
        id: "sql-select-2",
        title: "AS & Alias",
        titleEn: "AS & Column Aliases",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bạn viết câu lệnh:

\`\`\`sql
SELECT full_name, total_amount FROM orders;
\`\`\`

Người xem báo cáo nhìn vào sẽ thấy 2 cột tên là \`full_name\` và \`total_amount\` — kỹ thuật, khô khan. Sếp muốn báo cáo hiện ra **"Khách hàng"** và **"Doanh thu"**. Đó là việc của **alias** (tên gọi tạm — đặt lại tên cho cột hoặc bảng *trong câu query*, không đổi tên thật trong database).

## 2. Cú pháp tối thiểu — alias cho cột

\`\`\`sql
SELECT
  full_name    AS customer,    -- Đặt tên hiển thị là "customer"
  total_amount AS revenue      -- Đặt tên hiển thị là "revenue"
FROM orders;
\`\`\`

- \`AS\` (đọc là "as") = "đổi tên thành".
- \`AS\` có thể bỏ (\`full_name customer\` cũng chạy), nhưng **luôn nên viết** \`AS\` để code rõ ràng và tránh lỗi gõ thiếu dấu phẩy.

## 3. Alias cho cột tính toán

Khi cột là kết quả tính toán, alias là **bắt buộc** — nếu không, cột không có tên rõ ràng:

\`\`\`sql
SELECT
  name,
  age,
  age + 5 AS age_in_5_years    -- Cột tính toán phải có tên
FROM students;
\`\`\`

Hoặc nối chuỗi để tạo cột "hồ sơ":

\`\`\`sql
SELECT name || ' (Tuổi: ' || age || ')' AS profile
FROM students;
\`\`\`

## 4. Alias cho bảng — viết tắt khi JOIN

Khi câu query có nhiều bảng (sẽ học ở bài JOIN), gõ tên bảng dài lặp đi lặp lại rất mệt. Alias bảng giải quyết việc này:

\`\`\`sql
SELECT o.id, c.name              -- o = orders, c = customers
FROM orders     AS o
JOIN customers  AS c ON c.id = o.customer_id;
\`\`\`

**Quy ước nên theo**:
- Dùng 1–3 ký tự đầu của tên bảng: \`orders\` → \`o\`, \`customers\` → \`c\`, \`products\` → \`p\`.
- **Không** dùng chữ cái ngẫu nhiên như \`a\`, \`b\`, \`c\` không liên quan tới tên bảng — sau này đọc lại sẽ rất khó hiểu.

## 5. Cái BẪY: alias không dùng được trong WHERE

Đây là lỗi rất nhiều người mới mắc:

\`\`\`sql
-- ❌ BÁO LỖI
SELECT amount * 1.1 AS gross
FROM orders
WHERE gross > 100;       -- gross chưa tồn tại lúc WHERE chạy!

-- ✅ ĐÚNG (dùng alias trong ORDER BY thì OK)
SELECT amount * 1.1 AS gross
FROM orders
ORDER BY gross DESC;
\`\`\`

**Vì sao?** Nhớ lại bài trước: SQL chạy theo thứ tự **WHERE → SELECT → ORDER BY**. Lúc WHERE chạy thì SELECT chưa chạy → alias \`gross\` chưa tồn tại. Cách khắc phục: lặp lại biểu thức trong WHERE, hoặc bọc trong subquery (sẽ học sau).

## 6. Khi nào alias là bắt buộc

- **Subquery trong FROM**: \`FROM (SELECT … FROM orders) AS sub\` — phải đặt tên cho bảng tạm.
- **Cột tính toán** cần tên: \`COUNT(*) AS order_count\`.
- **Self-join** (join 1 bảng với chính nó): mỗi "phiên bản" cần alias riêng (\`emp\` và \`mgr\`).

## 7. Quy tắc đặt tên gọn — tránh phải bọc dấu

Tên cột tốt nhất nên dùng \`lowercase_snake_case\` (chữ thường, nối bằng dấu gạch dưới): \`customer_name\`, \`order_total\`. Tránh khoảng trắng và ký tự đặc biệt — nếu không sẽ phải bọc dấu (\`"Customer Name"\`) mỗi lần dùng, rất phiền.

## 8. Tổng kết — checklist alias

- ✅ Luôn viết \`AS\` rõ ràng để code dễ đọc.
- ✅ Alias bảng: dùng chữ cái đầu của tên bảng (\`orders\` → \`o\`).
- ✅ Cột tính toán **bắt buộc** có alias.
- ✅ Nhớ: **không** dùng alias trong WHERE — chỉ dùng được trong ORDER BY/GROUP BY (chạy sau SELECT).
- ✅ Bài tiếp theo: **WHERE & lọc dữ liệu** — chỉ lấy đúng các dòng bạn cần.`,
        theoryEn: `## 1. Real-world problem

\`SELECT full_name, total_amount FROM orders;\` — works, but the column headers look raw. **Alias** lets you rename them on the fly to "customer" and "revenue".

## 2. Column alias

\`\`\`sql
SELECT full_name AS customer, total_amount AS revenue FROM orders;
\`\`\`

\`AS\` is optional, but **always write it** — clearer intent and prevents missing-comma bugs.

## 3. Computed columns

Aliases are **required** for computed columns: \`SELECT age + 5 AS age_in_5_years\`.

## 4. Table aliases for JOIN

\`FROM orders AS o JOIN customers AS c ON c.id = o.customer_id\`. Use 1–3 letters from the table name (\`orders\` → \`o\`); never random letters.

## 5. The trap: alias not allowed in WHERE

\`\`\`sql
SELECT amount * 1.1 AS gross FROM orders WHERE gross > 100;  -- ❌ ERROR
\`\`\`

WHERE runs before SELECT, so \`gross\` doesn't exist yet. Works in ORDER BY (which runs after).

## 6. Mandatory cases

Subqueries in FROM, computed columns, self-joins.

## 7. Naming convention

Stick to \`lowercase_snake_case\` to avoid quoting hassles.

## 8. Checklist

- Always write \`AS\` explicitly
- Table alias = first letters of the table name
- Computed columns must be aliased
- No alias in WHERE
- Next: **WHERE & filtering**`,
        code: `-- Alias cho cột (đổi tên hiển thị trong kết quả)
SELECT name AS student_name, age AS student_age
FROM students;

-- Cột tính toán BẮT BUỘC có alias
SELECT name, age, age + 5 AS age_in_5_years
FROM students;

-- Nối chuỗi tạo cột "profile"
SELECT name || ' (Tuổi: ' || age || ')' AS profile
FROM students;

-- Alias cho bảng (rất hữu ích khi có nhiều bảng JOIN)
SELECT s.name, s.age
FROM students AS s
WHERE s.age > 20;`,
        codeLanguage: "sql",
        exercise: "Viết query hiển thị tên học viên (cột 'name') và tuổi của họ sau 10 năm (cột tính toán đặt tên là 'future_age'). Gợi ý: dùng age + 10 AS future_age.",
        exerciseEn: "Write a query showing student names and their age in 10 years (computed column named 'future_age'). Hint: age + 10 AS future_age.",
        quiz: [
          { question: "Từ khóa `AS` dùng để làm gì?", options: ["Lọc dữ liệu", "Đặt tên gọi tạm (alias) cho cột hoặc bảng", "Sắp xếp", "Gom nhóm dữ liệu"], answer: 1, explanation: "AS đặt tên gọi tạm — một tên hiển thị thay thế cho cột hoặc bảng trong kết quả query." },
          { question: "Có thể dùng alias của cột trong mệnh đề WHERE không?", options: ["Có, lúc nào cũng được", "Không, vì WHERE chạy trước SELECT", "Chỉ dùng được trên MySQL", "Chỉ dùng được với số"], answer: 1, explanation: "Theo thứ tự thực thi của SQL, WHERE chạy trước SELECT, nên alias định nghĩa ở SELECT chưa tồn tại lúc WHERE chạy." },
          { question: "Câu `SELECT price * quantity AS total FROM orders;` cho ra cái gì?", options: ["Báo lỗi", "Cột mới tên 'total' chứa tích của price × quantity", "Cập nhật bảng", "Tạo bảng mới"], answer: 1, explanation: "Câu này tính price × quantity cho mỗi dòng và hiển thị kết quả trong cột tên 'total'. Không thay đổi dữ liệu gốc." },
          { question: "Vì sao alias cho bảng lại quan trọng?", options: ["Giúp query chạy nhanh hơn", "Rút gọn tên bảng và tránh nhập nhằng cột khi JOIN", "SQL bắt buộc phải có", "Tạo bảng mới"], answer: 1, explanation: "Khi JOIN nhiều bảng có cùng tên cột (ví dụ cả 2 bảng đều có cột 'id'), alias bảng giúp phân biệt rõ và làm query ngắn gọn." },
          { question: "Sự khác biệt giữa `SELECT name student_name` và `SELECT name AS student_name` là gì?", options: ["Cho kết quả khác nhau", "Giống hệt nhau — AS có thể bỏ", "Cách 1 báo lỗi", "AS bắt buộc trên PostgreSQL"], answer: 1, explanation: "Cả hai đều hợp lệ và cho kết quả giống nhau. AS chỉ là tùy chọn nhưng nên viết để code rõ ràng." }
        ]
      }
    ]
  },
  {
    id: "sql-where-filter",
    title: "WHERE & Lọc dữ liệu",
    titleEn: "WHERE & Filtering",
    icon: "🔍",
    color: "from-violet-500 to-purple-600",
    description: "Lọc dữ liệu với WHERE, AND, OR, IN, BETWEEN, LIKE",
    descriptionEn: "Filter data with WHERE, AND, OR, IN, BETWEEN, LIKE",
    course: "sql",
    lessons: [
      {
        id: "sql-where-1",
        title: "WHERE cơ bản",
        titleEn: "Basic WHERE Clause",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bảng \`students\` có 1000 học viên. Sếp hỏi: *"Liệt kê các học viên trên 18 tuổi ở Hà Nội."* Bạn không thể lấy hết 1000 dòng rồi tự lọc bằng tay — đó là việc của **WHERE** (lọc).

WHERE giống như một bộ lọc cà phê: bạn đổ tất cả dòng dữ liệu vào, chỉ những dòng thoả mãn điều kiện mới chảy xuống dưới.

## 2. Cú pháp tối thiểu

\`\`\`sql
SELECT name, age, city
FROM   students
WHERE  age > 18              -- Chỉ giữ dòng thoả điều kiện này
   AND city = 'Hà Nội';      -- VÀ thoả thêm điều kiện này
\`\`\`

Mỗi dòng được kiểm tra với điều kiện. **Đúng → giữ lại. Sai → loại bỏ.**

## 3. Các phép so sánh thường gặp

| Phép | Ý nghĩa | Ví dụ |
|---|---|---|
| \`=\` | bằng | \`age = 20\` |
| \`<>\` hoặc \`!=\` | khác | \`status <> 'paid'\` |
| \`<\`, \`<=\`, \`>\`, \`>=\` | nhỏ hơn / lớn hơn (hoặc bằng) | \`amount >= 100\` |

## 4. Kết hợp nhiều điều kiện: \`AND\`, \`OR\`, \`NOT\`

- \`AND\` (và): cả hai điều kiện đều phải đúng.
- \`OR\` (hoặc): chỉ cần 1 điều kiện đúng.
- \`NOT\` (không): đảo ngược điều kiện.

\`\`\`sql
SELECT * FROM orders
WHERE status = 'paid'
  AND amount > 100
  AND (region = 'EU' OR region = 'US');   -- Bọc dấu ngoặc khi trộn AND/OR
\`\`\`

**Mẹo vàng**: khi trộn AND và OR, **luôn dùng dấu ngoặc** \`()\` để câu lệnh rõ ràng. Đừng dựa vào "thứ tự ưu tiên ngầm" — rất dễ sai.

## 5. \`IN\`, \`BETWEEN\`, \`LIKE\` — 3 phép lọc cực hữu ích

| Phép | Khi nào dùng | Ví dụ |
|---|---|---|
| \`IN (...)\` | thuộc danh sách rời rạc | \`region IN ('EU', 'US', 'APAC')\` |
| \`BETWEEN a AND b\` | nằm trong khoảng (bao gồm 2 đầu) | \`amount BETWEEN 100 AND 500\` |
| \`LIKE 'mẫu'\` | khớp mẫu chuỗi | \`email LIKE '%@gmail.com'\` |

**Quy tắc \`LIKE\`**:
- \`%\` = chuỗi bất kỳ (không hoặc nhiều ký tự).
- \`_\` (gạch dưới) = đúng 1 ký tự.
- \`'An%'\` = bắt đầu bằng "An". \`'%@gmail.com'\` = kết thúc bằng "@gmail.com".

⚠️ \`BETWEEN 1 AND 10\` **bao gồm cả 1 và 10** (không phải "lớn hơn 1, nhỏ hơn 10").

## 6. Cái BẪY lớn nhất: \`NULL\` (giá trị "không biết")

\`NULL\` không phải là 0, cũng không phải chuỗi rỗng — nó nghĩa là *"không có thông tin"*. Vì vậy:

\`\`\`sql
WHERE age = NULL    -- ❌ Không bao giờ khớp! Vì "không biết" không "bằng" cái gì cả.
WHERE age IS NULL   -- ✅ Đúng cú pháp để kiểm tra rỗng.
WHERE age <> 30     -- ❌ Loại luôn các dòng có age = NULL!
WHERE age <> 30 OR age IS NULL    -- ✅ Nếu muốn giữ cả NULL.
\`\`\`

**Quy tắc vàng**: cột nào có thể NULL → luôn xử lý NULL bằng \`IS NULL\` / \`IS NOT NULL\`.

## 7. Hiệu năng — đừng "bọc" cột bằng hàm

Khi cột đã có index (chỉ mục — giúp tìm nhanh), **đừng** bọc cột trong hàm — sẽ phá tác dụng của index:

\`\`\`sql
-- ❌ Chậm — hàm DATE() làm hỏng index
WHERE DATE(created_at) = '2024-01-15'

-- ✅ Nhanh — so sánh trực tiếp với khoảng thời gian
WHERE created_at >= '2024-01-15'
  AND created_at <  '2024-01-16'
\`\`\`

Trên bảng 100 triệu dòng, khác biệt là *vài phút vs vài mili-giây*.

## 8. Tổng kết — checklist khi viết WHERE

- ✅ Trộn AND/OR → **luôn dùng \`()\`** để rõ ràng.
- ✅ \`BETWEEN\` bao gồm cả 2 đầu.
- ✅ Cột có thể NULL → kiểm tra bằng \`IS NULL\` / \`IS NOT NULL\`.
- ✅ Đừng bọc cột bằng hàm khi cột đã có index.
- ✅ Bài tiếp theo: **GROUP BY & các hàm tổng hợp** — đếm, tính trung bình, tổng cộng theo nhóm.`,
        theoryEn: `## 1. Real-world problem

\`students\` table has 1000 rows. Boss asks: "List students over 18 in Hanoi." That's **WHERE** — keep only rows that match.

## 2. Minimal syntax

\`\`\`sql
SELECT name FROM students
WHERE age > 18 AND city = 'Hanoi';
\`\`\`

## 3. Comparison operators

\`=, <>, <, <=, >, >=\`. \`<>\` is the ANSI "not equal".

## 4. AND / OR / NOT

Always parenthesize when mixing AND with OR — don't rely on implicit precedence.

## 5. IN, BETWEEN, LIKE

| Operator | Use |
|---|---|
| IN | discrete values |
| BETWEEN | inclusive range |
| LIKE | pattern (\`%\`, \`_\`) |

## 6. NULL trap

\`= NULL\` never matches; use \`IS NULL\`. \`<> 30\` also excludes NULL rows.

## 7. Sargable predicates

Don't wrap indexed columns in functions:
- ❌ \`DATE(created_at) = '2024-01-15'\`
- ✅ \`created_at >= '2024-01-15' AND created_at < '2024-01-16'\`

## 8. Checklist

- Parenthesize AND/OR mixes
- BETWEEN is inclusive on both ends
- Handle NULL explicitly
- Keep functions off indexed columns
- Next: **Aggregate functions & GROUP BY**`,
        code: `-- Lọc cơ bản
SELECT * FROM students WHERE age > 20;

-- Nhiều điều kiện kết hợp bằng AND
SELECT * FROM students
WHERE age >= 18 AND age <= 25;

-- IN: thuộc danh sách
SELECT * FROM students
WHERE name IN ('An', 'Bình', 'Chi');

-- LIKE: khớp mẫu chuỗi (bắt đầu bằng "N")
SELECT * FROM students WHERE name LIKE 'N%';

-- Kiểm tra NULL đúng cách
SELECT * FROM orders WHERE email IS NOT NULL;

-- Trộn AND/OR — LUÔN dùng dấu ngoặc
SELECT * FROM students
WHERE (city = 'Hà Nội' OR city = 'TP HCM')
  AND age > 20;`,
        codeLanguage: "sql",
        exercise: "Lọc các học viên có tuổi từ 18 đến 22 (bao gồm cả 18 và 22) VÀ tên bắt đầu bằng chữ 'T'. Gợi ý: dùng BETWEEN kết hợp LIKE 'T%'.",
        exerciseEn: "Filter students aged 18-22 (inclusive) AND whose names start with 'T'. Hint: BETWEEN combined with LIKE 'T%'.",
        testCases: [
          { input: "SELECT * FROM students WHERE age BETWEEN 18 AND 22 AND name LIKE 'T%';", expectedOutput: "filtered rows", description: "Kết hợp BETWEEN và LIKE" }
        ],
        quiz: [
          { question: "`LIKE 'A%'` khớp với chuỗi nào?", options: ["Có chứa chữ A", "Bắt đầu bằng chữ A", "Kết thúc bằng chữ A", "Đúng bằng chữ A"], answer: 1, explanation: "Dấu % nghĩa là 'chuỗi bất kỳ'. 'A%' nghĩa là bắt đầu bằng A, theo sau là gì cũng được." },
          { question: "Vì sao `WHERE email = NULL` không hoạt động?", options: ["Lỗi cú pháp", "NULL nghĩa là 'không biết' nên = luôn cho kết quả không xác định, không khớp dòng nào", "Vẫn chạy bình thường", "NULL bằng 0"], answer: 1, explanation: "NULL là 'không biết'. Mọi so sánh với = đều cho kết quả NULL (không phải TRUE), nên không dòng nào khớp. Phải dùng IS NULL." },
          { question: "`BETWEEN 10 AND 20` bao gồm những giá trị nào?", options: ["Loại cả 10 và 20", "Bao gồm cả 10 và 20", "Chỉ bao gồm 10", "Chỉ bao gồm 20"], answer: 1, explanation: "BETWEEN bao gồm cả 2 đầu — tương đương với >= 10 AND <= 20." },
          { question: "`WHERE age > 18 OR city = 'HN' AND active = true` thực sự được hiểu là gì?", options: ["(age > 18 OR city = 'HN') AND active = true", "age > 18 OR (city = 'HN' AND active = true)", "Lỗi cú pháp", "Giống như có ngoặc"], answer: 1, explanation: "AND có độ ưu tiên cao hơn OR, nên AND được nhóm trước: age > 18 OR (city = 'HN' AND active = true). Đây chính là lý do nên LUÔN dùng dấu ngoặc khi trộn AND/OR." },
          { question: "Trong LIKE, dấu gạch dưới `_` khớp với cái gì?", options: ["Chuỗi bất kỳ", "Đúng 1 ký tự bất kỳ", "Dấu gạch dưới thật sự", "0 hoặc 1 ký tự"], answer: 1, explanation: "Dấu _ khớp với đúng 1 ký tự bất kỳ. Ví dụ 'J__n' (4 ký tự) khớp với 'John', 'Joan'." }
        ]
      }
    ]
  },
  {
    id: "sql-aggregate",
    title: "Hàm Aggregate",
    titleEn: "Aggregate Functions",
    icon: "📊",
    color: "from-violet-500 to-purple-600",
    description: "COUNT, SUM, AVG, MIN, MAX và GROUP BY",
    descriptionEn: "COUNT, SUM, AVG, MIN, MAX with GROUP BY",
    course: "sql",
    lessons: [
      {
        id: "sql-agg-1",
        title: "COUNT, SUM, AVG",
        titleEn: "COUNT, SUM, AVG",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bảng \`orders\` (đơn hàng) có 10.000 dòng. Sếp hỏi: *"Lớp mình bán được bao nhiêu đơn? Doanh thu mỗi vùng miền? Đơn trung bình bao nhiêu tiền?"*

Bạn không thể trả lời từng dòng — phải **gộp nhiều dòng lại thành 1 con số**. Đó là việc của **aggregate function** (hàm tổng hợp — gom nhiều dòng thành 1 giá trị).

## 2. 5 hàm tổng hợp cốt lõi

| Hàm | Trả về | Bỏ qua NULL? |
|---|---|---|
| \`COUNT(*)\` | Đếm **tất cả** các dòng (kể cả dòng toàn NULL) | Không |
| \`COUNT(col)\` | Đếm các dòng có giá trị (NOT NULL) ở cột đó | **Có** |
| \`SUM(col)\` | Tổng cộng giá trị cột | Có |
| \`AVG(col)\` | Trung bình cộng | Có |
| \`MIN(col)\` / \`MAX(col)\` | Giá trị nhỏ nhất / lớn nhất | Có |

⚠️ **Lưu ý cực quan trọng**: \`AVG(rating)\` chỉ tính trung bình trên các dòng có rating — **bỏ qua dòng NULL**. Nếu bạn muốn coi NULL là 0, phải dùng \`AVG(COALESCE(rating, 0))\` (COALESCE = "nếu NULL thì thay bằng…").

## 3. Cú pháp tối thiểu

\`\`\`sql
SELECT COUNT(*)   AS so_don,        -- Đếm tổng số đơn
       SUM(amount) AS doanh_thu,    -- Tổng doanh thu
       AVG(amount) AS don_tb        -- Đơn trung bình
FROM   orders;
\`\`\`

Câu này trả về **đúng 1 dòng** với 3 con số.

## 4. \`GROUP BY\` — gộp theo nhóm

Nếu muốn xem doanh thu **theo từng vùng**, dùng \`GROUP BY\`:

\`\`\`sql
SELECT region,
       COUNT(*)   AS so_don,
       SUM(amount) AS doanh_thu
FROM   orders
GROUP BY region;     -- "Gộp các dòng cùng region lại thành 1 nhóm"
\`\`\`

Mỗi giá trị \`region\` thành 1 dòng kết quả. Database tính số đếm và tổng *trong từng nhóm*.

## 5. Quy tắc VÀNG của GROUP BY

> Mọi cột trong SELECT **phải** hoặc là (a) nằm trong hàm tổng hợp, hoặc (b) liệt kê trong GROUP BY.

\`\`\`sql
-- ❌ SAI: city không có trong GROUP BY và cũng không bị tổng hợp
SELECT region, city, SUM(amount) FROM orders GROUP BY region;

-- ✅ ĐÚNG: thêm city vào GROUP BY
SELECT region, city, SUM(amount) FROM orders GROUP BY region, city;
\`\`\`

Lý do: nếu 1 nhóm \`region = 'Bắc'\` có nhiều city (Hà Nội, Hải Phòng, …), database không biết hiển thị city nào. PostgreSQL báo lỗi; MySQL cũ thì lặng lẽ chọn 1 cái ngẫu nhiên (rất nguy hiểm).

## 6. \`HAVING\` — lọc trên *nhóm* đã gộp

WHERE lọc *trước* khi gộp (lọc trên dòng). HAVING lọc *sau* khi gộp (lọc trên nhóm):

\`\`\`sql
SELECT region, SUM(amount) AS doanh_thu
FROM   orders
GROUP BY region
HAVING SUM(amount) > 100000;    -- Chỉ giữ các vùng có tổng > 100k
\`\`\`

| Mệnh đề | Lọc trên gì? | Có dùng được hàm tổng hợp? |
|---|---|---|
| \`WHERE\` | Từng dòng | ❌ Không |
| \`HAVING\` | Từng nhóm (sau GROUP BY) | ✅ Có |

**Mẹo**: Lọc được bằng WHERE thì **luôn ưu tiên WHERE** — nhanh hơn nhiều vì lọc trước, nhóm sau.

## 7. \`COUNT(DISTINCT)\` — đếm giá trị riêng biệt

\`\`\`sql
SELECT COUNT(DISTINCT customer_id) AS so_khach_hang
FROM   orders;
\`\`\`

Dùng khi 1 khách có nhiều đơn nhưng bạn chỉ muốn đếm số khách *duy nhất*. Lưu ý: trên bảng vài tỷ dòng, \`COUNT(DISTINCT)\` rất tốn RAM — khi đó có thể dùng \`APPROX_COUNT_DISTINCT\` (có sẵn trên BigQuery, Snowflake) chấp nhận sai số ~1% để đổi lấy tốc độ.

## 8. Tổng kết — checklist khi viết aggregate

- ✅ Phân biệt \`COUNT(*)\` (đếm dòng) vs \`COUNT(col)\` (đếm dòng có giá trị).
- ✅ \`SUM\`, \`AVG\` **bỏ qua NULL** — luôn nói rõ "trung bình của ai" khi báo cáo.
- ✅ Mọi cột không bị tổng hợp **phải** xuất hiện trong \`GROUP BY\`.
- ✅ Lọc dòng → \`WHERE\`. Lọc nhóm → \`HAVING\`.
- ✅ Bài tiếp theo: **JOIN** — kết nối bảng để có thể GROUP BY theo tên sản phẩm, tên khách hàng…`,
        theoryEn: `## 1. Real-world problem

\`orders\` has 10,000 rows. Boss asks: how many orders? revenue per region? average order? You can't answer row-by-row — collapse rows into a single value with **aggregate functions**.

## 2. Five core aggregates

| Function | Returns | Ignores NULL? |
|---|---|---|
| COUNT(*) | All rows | No |
| COUNT(col) | Non-NULL rows | Yes |
| SUM, AVG | Non-NULL only | Yes |
| MIN, MAX | Non-NULL only | Yes |

\`AVG(rating)\` excludes NULLs — you average responders only.

## 3. Minimal syntax

\`SELECT COUNT(*), SUM(amount), AVG(amount) FROM orders;\` → returns one row.

## 4. GROUP BY

\`SELECT region, SUM(amount) FROM orders GROUP BY region;\` → one row per region.

## 5. Golden rule

Every SELECT column must be aggregated OR listed in GROUP BY. ANSI/Postgres enforces; legacy MySQL was lenient.

## 6. HAVING vs WHERE

| Clause | Filters | Aggregates? |
|---|---|---|
| WHERE | rows | No |
| HAVING | groups | Yes |

Always push filters into WHERE when possible.

## 7. COUNT(DISTINCT)

Counts unique values; expensive at scale → use \`APPROX_COUNT_DISTINCT\` for billion-row tables (~1% error, constant memory).

## 8. Checklist

- COUNT(*) vs COUNT(col)
- SUM/AVG ignore NULL — state denominator
- All non-aggregated columns in GROUP BY
- Filter rows in WHERE, groups in HAVING
- Next: **JOIN operations**`,
        code: `-- Đếm tổng số học viên
SELECT COUNT(*) AS so_hoc_vien FROM students;

-- Tuổi trung bình (NULL bị bỏ qua tự động)
SELECT AVG(age) AS tuoi_tb FROM students;

-- Đếm số học viên theo từng tuổi (gộp nhóm)
SELECT age, COUNT(*) AS so_luong
FROM   students
GROUP BY age
ORDER BY so_luong DESC;

-- Chỉ giữ các nhóm tuổi có >= 2 học viên (lọc nhóm bằng HAVING)
SELECT age, COUNT(*) AS so_luong
FROM   students
GROUP BY age
HAVING COUNT(*) >= 2;

-- Đếm số tuổi khác nhau
SELECT COUNT(DISTINCT age) AS so_tuoi_khac_nhau FROM students;`,
        codeLanguage: "sql",
        exercise: "Đếm số đơn hàng theo từng customer_id trong bảng orders, sau đó chỉ hiển thị các khách có >= 3 đơn. Gợi ý: GROUP BY customer_id, lọc bằng HAVING COUNT(*) >= 3.",
        exerciseEn: "Count orders per customer_id, then show only customers with >= 3 orders. Hint: GROUP BY customer_id, HAVING COUNT(*) >= 3.",
        quiz: [
          { question: "Khác nhau giữa HAVING và WHERE là gì?", options: ["Không khác gì", "HAVING lọc SAU khi GROUP BY (lọc nhóm), WHERE lọc TRƯỚC (lọc dòng)", "HAVING nhanh hơn", "WHERE dùng với hàm tổng hợp"], answer: 1, explanation: "WHERE lọc từng dòng trước khi gộp nhóm. HAVING lọc các nhóm sau khi đã gộp — nên có thể dùng hàm tổng hợp như SUM(), COUNT()." },
          { question: "Khác biệt giữa `COUNT(*)` và `COUNT(column)` là gì?", options: ["Giống hệt nhau", "COUNT(*) đếm mọi dòng kể cả NULL, COUNT(column) chỉ đếm dòng có giá trị (NOT NULL) ở cột đó", "COUNT(column) nhanh hơn", "COUNT(*) chỉ đếm NULL"], answer: 1, explanation: "COUNT(*) đếm mọi dòng. COUNT(column) chỉ đếm các dòng có giá trị thực ở cột đó — bỏ qua NULL." },
          { question: "Vì sao `WHERE COUNT(*) > 5` báo lỗi?", options: ["COUNT không phải hàm", "WHERE chạy TRƯỚC GROUP BY nên hàm tổng hợp chưa tồn tại — phải dùng HAVING", "Phải có dấu ngoặc", "Hợp lệ trên MySQL"], answer: 1, explanation: "WHERE lọc dòng TRƯỚC khi gộp nhóm, lúc đó kết quả của COUNT chưa có. Để lọc theo kết quả tổng hợp, phải dùng HAVING." },
          { question: "`AVG` xử lý giá trị NULL như thế nào?", options: ["Coi NULL = 0", "Bỏ qua hoàn toàn (chỉ tính trung bình trên các giá trị NOT NULL)", "Trả về NULL", "Báo lỗi"], answer: 1, explanation: "AVG bỏ qua NULL hoàn toàn — cộng các giá trị NOT NULL rồi chia cho SỐ DÒNG NOT NULL. Đây là nguồn gốc nhiều báo cáo sai." },
          { question: "Nếu viết `SELECT city, COUNT(*) FROM students` mà KHÔNG có GROUP BY thì sao?", options: ["Trả về tất cả thành phố kèm số đếm", "Báo lỗi: city phải nằm trong GROUP BY hoặc trong hàm tổng hợp", "Trả về thành phố đầu tiên", "Trả về NULL"], answer: 1, explanation: "Cột không bị tổng hợp (như city) bắt buộc phải có trong GROUP BY khi câu lệnh có hàm tổng hợp — nếu không hầu hết database sẽ báo lỗi." }
        ]
      }
    ]
  },
  {
    id: "sql-joins",
    title: "JOINs",
    titleEn: "JOIN Operations",
    icon: "🔗",
    color: "from-violet-500 to-purple-600",
    description: "INNER, LEFT, RIGHT, FULL JOIN và CROSS JOIN",
    descriptionEn: "INNER, LEFT, RIGHT, FULL JOIN and CROSS JOIN",
    course: "sql",
    lessons: [
      {
        id: "sql-join-1",
        title: "INNER & LEFT JOIN",
        titleEn: "INNER & LEFT JOIN",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. Vấn đề đời thường

Bạn có 2 bảng:
- \`students\` — thông tin học viên (id, name, email).
- \`orders\` — đơn hàng đã đặt (id, student_id, amount).

Sếp hỏi: *"Cho tôi xem từng học viên đã đặt bao nhiêu tiền."* Để trả lời, bạn cần **gắn (ghép)** 2 bảng lại với nhau theo một "khóa nối" — ở đây là \`student_id\`. Đó chính là **JOIN**.

JOIN giống như ghép 2 mảnh ghép lego: bảng nào cũng có 1 cột "khớp" với bảng kia (\`students.id\` ↔ \`orders.student_id\`).

## 2. Cú pháp tối thiểu

\`\`\`sql
SELECT s.name, o.amount
FROM   students s                        -- Bảng "trái"
INNER JOIN orders o                      -- Bảng "phải", nối vào trái
       ON o.student_id = s.id;           -- Điều kiện nối: 2 cột phải bằng nhau
\`\`\`

- \`s\` và \`o\` là **alias bảng** (đã học bài AS).
- \`ON o.student_id = s.id\` là **điều kiện nối** — quy tắc ghép 2 dòng lại.

## 3. INNER JOIN — chỉ giữ dòng KHỚP cả 2 bên

Đây là loại JOIN mặc định, hay dùng nhất. Quy tắc: **chỉ trả về dòng có khớp ở CẢ 2 bảng**.

- Học viên không có đơn nào → biến mất khỏi kết quả.
- Đơn hàng có \`student_id\` không tồn tại trong \`students\` → cũng biến mất.

⚠️ Đây chính là cái bẫy: INNER JOIN **âm thầm bỏ qua** các dòng không khớp. Luôn kiểm tra số dòng trước/sau JOIN.

## 4. LEFT JOIN — giữ TẤT CẢ dòng của bảng trái

Vấn đề: muốn liệt kê **mọi học viên**, kể cả người chưa đặt đơn nào (số đơn = 0). INNER JOIN không làm được. → Dùng LEFT JOIN.

\`\`\`sql
SELECT s.name, COUNT(o.id) AS so_don
FROM   students s
LEFT JOIN orders o ON o.student_id = s.id     -- Giữ HẾT students, kể cả không khớp
GROUP BY s.name;
\`\`\`

- Học viên có đơn → đếm số đơn bình thường.
- Học viên không có đơn → \`o.id\` là **NULL** → \`COUNT(o.id)\` = **0**.

⚠️ Mẹo: dùng \`COUNT(o.id)\`, **không** dùng \`COUNT(*)\`. Vì \`COUNT(*)\` đếm cả dòng "trống" sinh ra do LEFT JOIN, sẽ cho ra 1 thay vì 0.

## 5. So sánh các loại JOIN (chỉ cần nhớ 3)

| JOIN | Trả về dòng nào? | Khi nào dùng? |
|---|---|---|
| **INNER JOIN** | Chỉ dòng khớp cả 2 bên | Câu hỏi: "Học viên *có đơn* và đơn của họ" |
| **LEFT JOIN** | Tất cả dòng bảng trái + dòng khớp bên phải (nếu có) | Câu hỏi: "*Mọi học viên*, kèm đơn nếu có" |
| **CROSS JOIN** | Mọi cặp tổ hợp (Cartesian) | Hiếm dùng — sinh lịch, sinh tổ hợp test |

(Có thêm RIGHT JOIN và FULL OUTER JOIN nhưng ít gặp — RIGHT chỉ là LEFT đảo bảng.)

## 6. Mẹo: tìm "mồ côi" — dòng KHÔNG có khớp

Câu hỏi cực hay gặp: *"Học viên nào CHƯA đặt đơn nào?"*

\`\`\`sql
SELECT s.name
FROM   students s
LEFT JOIN orders o ON o.student_id = s.id
WHERE  o.id IS NULL;        -- "Không tìm thấy đơn nào ghép được"
\`\`\`

Mẫu **LEFT JOIN + IS NULL** là cách kinh điển để tìm dòng "mồ côi" (orphan — dòng không có quan hệ ở bảng kia).

## 7. Cái BẪY "fan-out" (nhân bản dòng) — phải biết

Nếu 1 \`order\` có nhiều \`order_items\` (1 đơn nhiều món), khi JOIN \`orders\` với \`order_items\`, **mỗi đơn bị lặp 1 lần cho mỗi món**. Khi đó \`SUM(orders.amount)\` sẽ bị **đếm gấp 2, gấp 3 lần**!

Triệu chứng: doanh thu báo cáo cao bất thường (3× thực tế).
**Cách chữa**: tổng hợp bảng "phía nhiều" trước (bằng GROUP BY hoặc subquery), rồi mới JOIN.

## 8. Tổng kết — checklist khi viết JOIN

- ✅ Trước khi JOIN, hỏi: *"1 dòng bảng A khớp với mấy dòng bảng B?"* (1-1, 1-N, hay N-N).
- ✅ INNER → chỉ dòng khớp. LEFT → giữ hết bảng trái.
- ✅ Sau khi thêm JOIN, **đếm lại số dòng** — nếu tăng bất thường có thể là fan-out.
- ✅ Tìm "mồ côi" → \`LEFT JOIN + WHERE … IS NULL\`.
- ✅ Bài tiếp theo: **Subquery** — đặt 1 query bên trong query khác.`,
        theoryEn: `## 1. Real-world problem

\`students\` and \`orders\` are 2 separate tables. To "show each student's total spend", connect them by a key (\`student_id\`). That's a **JOIN**.

## 2. Minimal syntax

\`\`\`sql
SELECT s.name, o.amount
FROM students s
INNER JOIN orders o ON o.student_id = s.id;
\`\`\`

## 3. INNER JOIN

Returns only rows matching on BOTH sides. Silent drop is the biggest gotcha — sanity-check row counts.

## 4. LEFT JOIN

Keep ALL rows from left table; right-side columns become NULL when no match. Use \`COUNT(o.id)\` (not \`*\`) so unmatched students show 0 orders.

## 5. JOIN comparison

| JOIN | Returns | Use case |
|---|---|---|
| INNER | matched rows on both | "students with orders" |
| LEFT | all left + matched right | "all students, with orders if any" |
| CROSS | Cartesian product | calendar/test combos |

## 6. Find orphans

\`LEFT JOIN x ON … WHERE x.id IS NULL\` finds rows in left with no match in right.

## 7. Fan-out trap

orders 1→N items: \`SUM(orders.amount)\` triple-counts. Pre-aggregate the many-side before joining.

## 8. Checklist

- Know cardinality (1-1, 1-N, N-N) before joining
- Sanity-check row counts after JOIN
- LEFT + IS NULL = orphan finder
- Watch for fan-out when summing
- Next: **Subqueries**`,
        code: `-- INNER JOIN: chỉ học viên ĐÃ đặt đơn
SELECT s.name, o.amount
FROM   students s
INNER JOIN orders o ON s.id = o.student_id;

-- LEFT JOIN: TẤT CẢ học viên, ai chưa đặt thì amount = 0
SELECT s.name,
       COALESCE(o.amount, 0) AS amount   -- COALESCE: NULL → 0
FROM   students s
LEFT JOIN orders o ON s.id = o.student_id;

-- Tìm học viên CHƯA đặt đơn nào (mẫu LEFT JOIN + IS NULL)
SELECT s.name
FROM   students s
LEFT JOIN orders o ON s.id = o.student_id
WHERE  o.id IS NULL;`,
        codeLanguage: "sql",
        exercise: "Viết 1 câu LEFT JOIN hiển thị tên TẤT CẢ học viên kèm tổng giá trị đơn của họ (SUM amount). Học viên chưa đặt đơn nào thì hiển thị 0. Gợi ý: dùng COALESCE(SUM(o.amount), 0) và GROUP BY s.name.",
        exerciseEn: "Write a LEFT JOIN query showing every student's name + their total order amount (SUM). Students with no orders show 0. Hint: COALESCE(SUM(o.amount), 0) + GROUP BY s.name.",
        quiz: [
          { question: "LEFT JOIN trả về cái gì khi không có dòng khớp ở bảng phải?", options: ["Bỏ qua dòng đó", "Trả về NULL cho các cột của bảng phải", "Báo lỗi", "Trả về 0 cho tất cả các cột"], answer: 1, explanation: "LEFT JOIN giữ TẤT CẢ dòng của bảng trái. Khi không tìm thấy dòng khớp ở bảng phải, các cột bên phải sẽ là NULL." },
          { question: "Làm sao tìm các dòng KHÔNG có khớp khi dùng LEFT JOIN?", options: ["WHERE right.id = 0", "WHERE right.id IS NULL (mẫu kinh điển tìm 'mồ côi')", "HAVING count = 0", "Không thể làm được"], answer: 1, explanation: "Mẫu LEFT JOIN + WHERE right_table.id IS NULL là cách kinh điển tìm các dòng chỉ tồn tại ở bảng trái — gọi là dòng 'mồ côi' (orphan)." },
          { question: "Bảng A có 10 dòng, bảng B có 5 dòng. CROSS JOIN tạo ra bao nhiêu dòng?", options: ["15", "10", "50", "5"], answer: 2, explanation: "CROSS JOIN tạo tích Đề-các (Cartesian): mọi dòng A × mọi dòng B = 10 × 5 = 50 dòng. Vì vậy hiếm khi dùng — rất dễ 'nổ' số dòng." },
          { question: "Khác nhau giữa INNER JOIN và LEFT JOIN là gì?", options: ["Không khác gì", "INNER chỉ trả về dòng khớp cả 2 bên; LEFT trả về tất cả dòng bảng trái (kể cả không khớp)", "LEFT nhanh hơn", "INNER trả về nhiều dòng hơn"], answer: 1, explanation: "INNER JOIN chỉ giữ các dòng có khớp ở CẢ 2 bảng. LEFT JOIN giữ tất cả dòng bảng trái, kể cả khi không tìm được khớp ở bảng phải." },
          { question: "Vì sao đa số lập trình viên ưu tiên LEFT JOIN hơn RIGHT JOIN?", options: ["LEFT JOIN nhanh hơn", "RIGHT JOIN luôn có thể viết lại bằng LEFT JOIN bằng cách đảo 2 bảng — giữ phong cách code đồng nhất", "RIGHT JOIN bị bỏ", "Cho kết quả khác nhau"], answer: 1, explanation: "RIGHT JOIN A,B = LEFT JOIN B,A — kết quả y hệt. Dùng LEFT JOIN nhất quán giúp code dễ đọc, không phải nhảy não giữa 2 chiều." }
        ]
      }
    ]
  },
  {
    id: "sql-subqueries",
    title: "Subqueries",
    titleEn: "Subqueries",
    icon: "🔄",
    color: "from-violet-500 to-purple-600",
    description: "Truy vấn con trong WHERE, FROM và SELECT",
    descriptionEn: "Subqueries in WHERE, FROM and SELECT",
    course: "sql",
    lessons: [
      {
        id: "sql-sub-1",
        title: "Subquery cơ bản",
        titleEn: "Basic Subqueries",
        level: 3,
        difficulty: "intermediate",
        theory: `**Subquery** (truy vấn con) đơn giản là **một câu SELECT đặt bên trong một câu SELECT khác**. Bài này mình sẽ học theo cách dễ nhất: bắt đầu từ một câu hỏi đời thường, rồi từ từ thêm chi tiết.

## 1. Subquery là gì? (Câu chuyện 30 giây)

Giả sử thầy Hải hỏi: *"Tìm những học viên có điểm cao hơn **điểm trung bình của lớp**."*

Nếu **không có subquery**, bạn phải làm 2 bước riêng:

\`\`\`sql
-- Bước 1: Chạy câu này, ghi nhớ kết quả (giả sử là 7.5)
SELECT AVG(score) FROM students;

-- Bước 2: Gõ lại con số 7.5 vào câu thứ hai
SELECT name FROM students WHERE score > 7.5;
\`\`\`

→ Tốn công, dễ sai khi điểm trung bình thay đổi.

Với **subquery**, bạn nhét luôn câu 1 vào trong câu 2:

\`\`\`sql
SELECT name FROM students
WHERE score > (SELECT AVG(score) FROM students);
\`\`\`

Database tự chạy phần trong ngoặc trước, lấy kết quả (7.5), rồi mới chạy phần ngoài. Một câu, một lần Enter, luôn đúng.

## 2. Cú pháp tối thiểu (xem 1 lần là nhớ)

\`\`\`sql
SELECT name                                    -- ① Chọn cột muốn xem
FROM students                                  -- ② Từ bảng students
WHERE score > (                                -- ③ Lọc: điểm lớn hơn...
  SELECT AVG(score) FROM students              -- ④ ...kết quả của câu CON này
);                                             -- ⑤ Đóng ngoặc đơn của subquery
\`\`\`

Quy tắc duy nhất cần nhớ: **subquery luôn nằm trong cặp ngoặc đơn \`( ... )\`**.

## 3. Ba vị trí đặt subquery

| Vị trí | Tác dụng | Ví dụ ngắn |
|---|---|---|
| **Trong WHERE** | Lọc theo một giá trị tính ra được | \`WHERE age > (SELECT AVG(age) FROM students)\` |
| **Trong FROM** | Coi subquery như một **bảng tạm** | \`FROM (SELECT city, COUNT(*) AS n FROM students GROUP BY city) AS t\` |
| **Trong SELECT** | Lấy **1 giá trị** kèm theo từng dòng | \`SELECT name, (SELECT COUNT(*) FROM orders WHERE student_id = s.id) AS so_don FROM students s\` |

⚠️ Khi đặt trong FROM, bắt buộc phải đặt **alias** (tên bí danh) cho bảng tạm — ví dụ \`AS t\`. Quên alias là Postgres / MySQL báo lỗi ngay.

## 4. Subquery trả về gì? (1 ô, 1 cột, hay cả bảng)

Tùy subquery trả ra bao nhiêu dòng/cột mà cách dùng khác nhau:

**(a) Trả về 1 ô** (1 dòng, 1 cột) — gọi là *scalar*. Dùng được với \`=\`, \`>\`, \`<\`:

\`\`\`sql
SELECT name FROM students
WHERE score > (SELECT AVG(score) FROM students);  -- AVG trả 1 ô
\`\`\`

**(b) Trả về 1 cột nhiều dòng** — dùng với \`IN\`:

\`\`\`sql
SELECT name FROM students
WHERE id IN (SELECT student_id FROM orders);      -- Danh sách id đã đặt hàng
\`\`\`

**(c) Trả về cả bảng** (nhiều cột, nhiều dòng) — đặt trong FROM:

\`\`\`sql
SELECT t.city, t.so_hoc_vien
FROM (
  SELECT city, COUNT(*) AS so_hoc_vien
  FROM students GROUP BY city
) AS t
WHERE t.so_hoc_vien > 10;
\`\`\`

💡 Nếu một subquery scalar (mong chờ 1 ô) lỡ trả về 2 dòng → database báo lỗi runtime. Cách phòng tránh: dùng \`MAX\`, \`MIN\`, \`AVG\` hoặc thêm \`LIMIT 1\`.

## 5. \`IN\` vs \`EXISTS\` — chọn cái nào?

Hai câu dưới đây cho **kết quả giống hệt nhau**: "Lấy danh sách học viên đã từng đặt đơn hàng".

\`\`\`sql
-- Cách 1: dùng IN
SELECT name FROM students
WHERE id IN (SELECT student_id FROM orders);

-- Cách 2: dùng EXISTS
SELECT name FROM students s
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);
\`\`\`

So sánh đời thường: **EXISTS** giống như mở cửa phòng hỏi *"có ai trong đây không?"* — thấy 1 người là đóng cửa, đi tiếp. **IN** giống như đếm hết tất cả mọi người trong phòng rồi mới trả lời.

| Tiêu chí | EXISTS | IN |
|---|---|---|
| Thấy 1 dòng khớp là dừng | ✅ Có | ❌ Không, phải duyệt hết |
| An toàn khi có NULL | ✅ Có | ⚠️ Bẫy NULL với \`NOT IN\` |
| Khi danh sách lớn | Thường nhanh hơn | Có thể rất chậm |

## 6. Bẫy \`NOT IN\` với NULL (cực kỳ quan trọng)

Tình huống thực tế: bảng \`churn_list\` lưu các học viên đã nghỉ học. Bạn muốn lấy *học viên còn đang học*:

\`\`\`sql
SELECT name FROM students
WHERE id NOT IN (SELECT student_id FROM churn_list);
\`\`\`

Hôm trước chạy ra **500 học viên** — đúng. Hôm nay sau khi cập nhật dữ liệu, có **1 dòng** trong \`churn_list\` bị NULL ở cột \`student_id\`. Câu trên đột nhiên trả về **0 dòng** — báo cáo trống trơn!

**Lý do:** trong SQL, \`x <> NULL\` không phải là \`true\` mà là *unknown* (không biết). Một khi danh sách có NULL, \`NOT IN\` luôn coi là *unknown* nên loại hết.

✅ **Quy tắc vàng:** Nếu cột trong subquery có thể chứa NULL → **dùng \`NOT EXISTS\`** thay vì \`NOT IN\`:

\`\`\`sql
SELECT name FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM churn_list c WHERE c.student_id = s.id
);
\`\`\`

## 7. Correlated subquery — khi subquery "nhìn ra ngoài"

Bình thường subquery chạy **1 lần duy nhất** (gọi là *non-correlated* — độc lập):

\`\`\`sql
SELECT name FROM students
WHERE score > (SELECT AVG(score) FROM students);  -- chạy 1 lần
\`\`\`

Nhưng nếu subquery **tham chiếu cột của bảng ngoài**, nó trở thành *correlated* (truy vấn con phụ thuộc) — và database phải **chạy lại cho TỪNG dòng** của bảng ngoài:

\`\`\`sql
SELECT s.name FROM students s
WHERE s.score > (
  SELECT AVG(score) FROM students s2
  WHERE s2.class_id = s.class_id   -- ← nhìn ra ngoài (s.class_id)
);
\`\`\`

Câu này nghĩa là *"học viên có điểm cao hơn trung bình của **lớp mình**"*. Với 100 học viên thì subquery chạy 100 lần, với 1 triệu dòng thì chạy 1 triệu lần → **rất chậm**.

⚠️ Khi nào nghi ngờ chậm: chạy \`EXPLAIN ANALYZE\` để xem kế hoạch thực thi. Phần nhiều trường hợp nên thay bằng **window function** (sẽ học sau) hoặc **JOIN + GROUP BY**.

## 8. Tổng kết & checklist khi viết subquery

- 🔹 Subquery **luôn nằm trong \`( ... )\`** — nhớ ngoặc đơn.
- 🔹 Subquery trong **FROM** phải có **alias** (\`AS t\`).
- 🔹 Mong chờ 1 ô → đảm bảo subquery dùng \`MAX/MIN/AVG\` hoặc \`LIMIT 1\`.
- 🔹 "Có tồn tại / không tồn tại" → ưu tiên **\`EXISTS\` / \`NOT EXISTS\`**, đừng dùng \`IN/NOT IN\` khi cột có thể NULL.
- 🔹 Subquery tham chiếu bảng ngoài (correlated) → cẩn thận hiệu năng với dữ liệu lớn.

Bài tiếp theo: **CTE (\`WITH ... AS\`)** — cách viết subquery dài thành các bước có tên, dễ đọc hơn nhiều.`,
        theoryEn: `A **subquery** is a SELECT inside another SELECT. Best learned from a real question, not a textbook definition.

## 1. The 30-second story

Question: *"Find students whose score is above the class average."* Without a subquery you'd run two queries and copy a number between them. With a subquery, you nest them:

\`\`\`sql
SELECT name FROM students
WHERE score > (SELECT AVG(score) FROM students);
\`\`\`

The DB runs the inner SELECT first, then plugs the result into the outer one.

## 2. Minimum syntax

A subquery is **always wrapped in \`( ... )\`**. That's the only hard rule.

## 3. Three placements

| Placement | Purpose | Mini example |
|---|---|---|
| WHERE | Filter by a computed value | \`WHERE age > (SELECT AVG(age) ...)\` |
| FROM (derived table) | Use as a temporary table — **must be aliased** | \`FROM (SELECT ...) AS t\` |
| SELECT (scalar) | Attach one value per outer row | \`SELECT name, (SELECT COUNT(*) FROM ...) AS n\` |

## 4. What does the subquery return?

- **Scalar** (1 row, 1 col) → use with \`=\`, \`>\`, \`<\`. If it accidentally returns >1 row, runtime error.
- **One column, many rows** → use with \`IN\`.
- **Multiple cols/rows (a table)** → only valid in FROM.

## 5. IN vs EXISTS

EXISTS short-circuits at the first match (like asking *"is anyone in the room?"*). IN must collect every value first.

| | EXISTS | IN |
|---|---|---|
| Stops at first match | ✅ | ❌ |
| NULL-safe | ✅ | ⚠️ \`NOT IN\` is dangerous |

## 6. The \`NOT IN\` + NULL trap

If the inner result contains a single NULL, \`NOT IN\` returns **zero rows** because \`x <> NULL\` is *unknown*, not *true*. **Rule:** if the column may be NULL, use \`NOT EXISTS\`.

## 7. Correlated subqueries

A non-correlated subquery runs **once**. A *correlated* subquery references a column from the outer query and runs **once per outer row** — fine on small data, deadly on large data. Often rewritable as a JOIN + GROUP BY or a window function.

## 8. Checklist

- Always wrap in \`( ... )\`
- Alias FROM-subqueries
- Guarantee a single value for scalar subqueries (\`MAX\`, \`LIMIT 1\`)
- Prefer \`EXISTS\` / \`NOT EXISTS\` over \`IN\` / \`NOT IN\` when NULLs are possible
- Watch performance on correlated subqueries

Next: **CTEs (\`WITH\`)** — the readable cousin of subqueries.`,
        code: `-- VÍ DỤ 1: Tìm học viên có điểm cao hơn trung bình lớp
-- (subquery scalar trong WHERE — chạy 1 lần)
SELECT name, score
FROM students
WHERE score > (SELECT AVG(score) FROM students);

-- VÍ DỤ 2: Lấy tên học viên đã từng đặt đơn hàng
-- (subquery trả 1 cột nhiều dòng → dùng IN)
SELECT name
FROM students
WHERE id IN (SELECT student_id FROM orders);

-- VÍ DỤ 3: Cách an toàn cho "chưa từng đặt đơn"
-- (dùng NOT EXISTS để tránh bẫy NULL)
SELECT s.name
FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);

-- VÍ DỤ 4: Subquery trong FROM (bảng tạm)
-- Đếm số học viên theo thành phố, lọc thành phố > 5 người
SELECT t.city, t.so_hoc_vien
FROM (
  SELECT city, COUNT(*) AS so_hoc_vien
  FROM students
  GROUP BY city
) AS t
WHERE t.so_hoc_vien > 5;`,
        codeLanguage: "sql",
        exercise: "Tìm những học viên có **tổng giá trị đơn hàng** lớn hơn **trung bình tổng giá trị đơn hàng của tất cả học viên**. Gợi ý: dùng GROUP BY trong subquery để tính tổng theo từng học viên, rồi so sánh với AVG của các tổng đó.",
        exerciseEn: "Find students whose **total order amount** is greater than the **average of all students' total order amounts**. Hint: use GROUP BY inside a subquery to compute totals per student, then compare with the AVG of those totals.",
        quiz: [
          { question: "Câu hỏi: \"Subquery thông thường\" và \"correlated subquery\" khác nhau ở điểm gì?", options: ["Correlated chạy nhanh hơn", "Correlated tham chiếu cột của bảng ngoài và chạy lại cho từng dòng của bảng ngoài", "Correlated chỉ dùng trong SELECT", "Không khác gì cả"], answer: 1, explanation: "Correlated subquery có một cột trong subquery trỏ ra bảng ngoài, vì vậy nó chạy 1 lần cho MỖI dòng của bảng ngoài — chậm hơn rất nhiều khi dữ liệu lớn." },
          { question: "Khi nào nên dùng EXISTS thay vì IN?", options: ["Lúc nào cũng nên dùng", "Khi subquery có thể trả về nhiều dòng / có thể chứa NULL", "Không bao giờ", "Chỉ khi không có NULL"], answer: 1, explanation: "EXISTS dừng ngay khi tìm thấy 1 dòng khớp và xử lý NULL an toàn. IN phải thu thập toàn bộ danh sách và bị bẫy NULL với NOT IN." },
          { question: "Một subquery scalar trả về cái gì?", options: ["Nhiều dòng", "Đúng 1 ô (1 dòng, 1 cột)", "Cả 1 bảng", "Không trả về gì"], answer: 1, explanation: "Subquery scalar trả về đúng 1 ô — vì vậy mới dùng được với các phép so sánh =, >, <. Nếu nó lỡ trả 2 dòng → database báo lỗi runtime." },
          { question: "Vì sao subquery trong FROM bắt buộc phải có alias (ví dụ \`AS t\`)?", options: ["Để chạy nhanh hơn", "Vì câu SQL bên ngoài cần một cái tên để tham chiếu cột của bảng tạm", "Đó là tùy chọn", "Chỉ PostgreSQL bắt buộc"], answer: 1, explanation: "Bảng tạm sinh ra từ subquery cần một cái tên để câu SELECT bên ngoài có thể gọi cột (ví dụ t.city). Postgres / MySQL đều báo lỗi nếu thiếu alias." },
          { question: "Vì sao nên ưu tiên \`NOT EXISTS\` thay cho \`NOT IN\`?", options: ["NOT EXISTS chạy nhanh hơn luôn luôn", "Nếu danh sách trong subquery có 1 giá trị NULL, NOT IN sẽ trả về 0 dòng — lỗi nguy hiểm thầm lặng", "NOT IN không tồn tại trong SQL", "Không có lý do"], answer: 1, explanation: "Trong SQL, x <> NULL không phải true mà là unknown. Vì vậy chỉ cần 1 NULL trong danh sách là NOT IN trả 0 dòng. NOT EXISTS xử lý NULL an toàn." }
        ]
      }
    ]
  },
  {
    id: "sql-ctes",
    title: "CTEs (Common Table Expressions)",
    titleEn: "CTEs (Common Table Expressions)",
    icon: "📦",
    color: "from-violet-500 to-purple-600",
    description: "WITH clause, recursive CTEs, modular queries",
    descriptionEn: "WITH clause, recursive CTEs, modular queries",
    course: "sql",
    lessons: [
      {
        id: "sql-cte-1",
        title: "WITH & CTE cơ bản",
        titleEn: "Basic WITH & CTE",
        level: 3,
        difficulty: "intermediate",
        theory: `**CTE** (Common Table Expression — *biểu thức bảng tạm có tên*) là cách viết một câu SELECT phức tạp thành **các bước nhỏ, mỗi bước có một cái tên dễ hiểu**. Cú pháp bắt đầu bằng từ khóa \`WITH\`. Bài này mình sẽ học theo cách dễ nhất: thấy vấn đề trước, rồi mới thấy giải pháp.

## 1. CTE là gì? (Câu chuyện 30 giây)

Giả sử bạn cần báo cáo: *"Tên học viên + tổng tiền đơn hàng + xếp hạng theo tổng tiền."*

Nếu **không có CTE**, bạn phải viết subquery lồng nhau, đọc rất rối:

\`\`\`sql
SELECT s.name, t.total
FROM students s
JOIN (
  SELECT student_id, SUM(amount) AS total
  FROM orders GROUP BY student_id
) t ON t.student_id = s.id
ORDER BY t.total DESC;
\`\`\`

Cùng câu đó viết bằng **CTE** — đặt tên cho bảng tạm là \`student_totals\`:

\`\`\`sql
WITH student_totals AS (
  SELECT student_id, SUM(amount) AS total
  FROM orders
  GROUP BY student_id
)
SELECT s.name, st.total
FROM students s
JOIN student_totals st ON st.student_id = s.id
ORDER BY st.total DESC;
\`\`\`

Bạn đọc từ trên xuống: *"Đầu tiên tính \`student_totals\`. Sau đó dùng nó để JOIN với students."* — rất tự nhiên, giống như đọc các bước nấu ăn trong công thức.

## 2. Cú pháp tối thiểu (xem 1 lần là nhớ)

\`\`\`sql
WITH ten_buoc_1 AS (              -- ① Khai báo bảng tạm
  SELECT ... FROM ...             -- ② Câu SELECT của bước 1
)                                 -- ③ Đóng ngoặc
SELECT ...                        -- ④ Câu SELECT chính, dùng ten_buoc_1
FROM ten_buoc_1;
\`\`\`

Cần nhớ:
- Bắt đầu bằng \`WITH\`.
- Mỗi CTE: **\`tên AS ( SELECT ... )\`**.
- Sau dấu \`)\` cuối cùng phải có một câu SELECT chính (không có nó là báo lỗi).

## 3. Nhiều CTE nối tiếp — cách viết bài bản

Bạn có thể viết **nhiều CTE liên tiếp**, ngăn cách bằng dấu phẩy. CTE sau có thể dùng kết quả của CTE trước:

\`\`\`sql
WITH
active_students AS (                                 -- Bước 1: lọc học viên đang học
  SELECT id, name FROM students WHERE status = 'active'
),
recent_orders AS (                                   -- Bước 2: đơn hàng 30 ngày gần đây
  SELECT * FROM orders WHERE created_at >= current_date - 30
),
final_report AS (                                    -- Bước 3: ghép 2 cái trên lại
  SELECT a.name, COUNT(r.id) AS so_don
  FROM active_students a
  JOIN recent_orders r ON r.student_id = a.id
  GROUP BY a.name
)
SELECT * FROM final_report ORDER BY so_don DESC;     -- Câu chính
\`\`\`

→ Đọc tên 3 bước là hiểu logic ngay: *học viên đang học → đơn 30 ngày gần đây → đếm đơn cho từng người.*

## 4. CTE so với subquery — khi nào dùng cái nào?

| Tiêu chí | CTE (\`WITH\`) | Subquery |
|---|---|---|
| Đọc dễ | ✅ Có tên, đọc từ trên xuống | ❌ Lồng sâu là rối |
| Dùng lại 1 bảng tạm nhiều lần trong cùng câu | ✅ Có | ❌ Phải copy lại |
| Hiệu năng | Bằng nhau (engine hiện đại tự inline) | Bằng nhau |

✅ **Quy tắc đơn giản:** câu nào dài hơn ~10 dòng hoặc có >1 bước trung gian → **dùng CTE** cho dễ đọc. Câu 1 dòng đơn giản → subquery vẫn ổn.

## 5. CTE đệ quy — đi qua cây phân cấp

Đôi khi dữ liệu có cấu trúc cha-con (sơ đồ tổ chức, danh mục cha-con, cây thư mục). CTE bình thường không đi xuống cây được. **Recursive CTE** (CTE đệ quy) thì làm được.

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Phần ANCHOR: bắt đầu từ sếp tổng (không có sếp)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Phần RECURSIVE: thêm 1 tầng cấp dưới mỗi vòng
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
  WHERE oc.level < 10                  -- ⚠️ chặn không cho chạy quá 10 tầng
)
SELECT * FROM org_chart;
\`\`\`

⚠️ **Bắt buộc** phải có điều kiện dừng (ví dụ \`level < 10\`). Nếu dữ liệu lỡ có vòng tròn (A là sếp của B, B là sếp của A) thì câu lệnh sẽ chạy mãi không dừng → database treo.

## 6. Sai lầm thường gặp

- ❌ **Quên câu SELECT chính sau cùng.** \`WITH a AS (...);\` — chạy xong báo lỗi vì thiếu câu chính.
- ❌ **CTE sau dùng CTE trước nhưng viết sai thứ tự.** Bạn không thể tham chiếu một CTE chưa được khai báo phía trên.
- ❌ **Dùng CTE đệ quy mà quên điều kiện dừng** → câu lệnh chạy vô hạn.
- ❌ **Tách CTE quá nhỏ** (mỗi CTE chỉ \`SELECT * FROM bang\`) → đọc còn rối hơn không có CTE.

## 7. Tổng kết & checklist khi viết CTE

- 🔹 Bắt đầu bằng \`WITH\`, kết thúc bằng **một câu SELECT chính**.
- 🔹 Mỗi CTE viết theo dạng \`ten AS ( ... )\`, ngăn cách bằng dấu phẩy.
- 🔹 Đặt tên CTE theo **danh từ có nghĩa** (\`active_students\`, \`monthly_revenue\`) — đừng đặt \`step1\`, \`tmp\`.
- 🔹 Mỗi CTE chỉ làm **một việc**. Làm 2 việc → tách thành 2 CTE.
- 🔹 Recursive CTE → **luôn có \`WHERE level < N\`** để tránh chạy vô hạn.

Bài tiếp theo: **Window Functions** — hàm cửa sổ giúp tính tổng / trung bình / xếp hạng *trên từng nhóm dữ liệu* mà **không gộp dòng** lại như GROUP BY.`,
        theoryEn: `A **CTE** (Common Table Expression, written with \`WITH\`) is a *named* temporary result set used inside one query. Best learned from the problem it solves.

## 1. The 30-second story

Need to compute "student name + total order amount + ranking"? Without a CTE you nest a subquery in FROM. With a CTE you give that intermediate step a name (\`student_totals\`) and the query reads top-to-bottom like a recipe.

## 2. Minimum syntax

\`\`\`sql
WITH step_name AS ( SELECT ... )
SELECT ... FROM step_name;
\`\`\`

Always end with a final SELECT — without it, error.

## 3. Chaining multiple CTEs

Separate with commas; each later CTE can use earlier ones:

\`\`\`sql
WITH a AS (...), b AS (SELECT ... FROM a), c AS (SELECT ... FROM b)
SELECT * FROM c;
\`\`\`

Reads like a numbered step list.

## 4. CTE vs subquery — when to pick which?

| | CTE | Subquery |
|---|---|---|
| Readability | ✅ Named, top-down | ❌ Nested = noisy |
| Reuse same temp set | ✅ Yes | ❌ Re-write |
| Performance | Same plan in modern engines | Same |

Rule of thumb: query > ~10 lines or has >1 intermediate step → use CTE.

## 5. Recursive CTEs

\`WITH RECURSIVE\` walks hierarchies (org chart, BOM, graph paths). Two parts: an **anchor** (starting rows) + a **recursive** part that joins back to the CTE itself. **Always** add a depth guard (\`WHERE level < 10\`) — without it, cyclic data causes infinite loops.

## 6. Common mistakes

- Forgetting the final SELECT after \`WITH ...\`
- Referencing a CTE before declaring it
- Recursive CTE without a stopping condition
- Over-splitting (one-line CTEs add noise, not clarity)

## 7. Checklist

- Start with \`WITH\`, end with a final SELECT
- One job per CTE; name them after nouns (\`active_users\`)
- Cap recursion depth explicitly
- Don't over-CTE trivial selects

Next: **Window functions** — aggregates per group **without collapsing rows**.`,
        code: `-- VÍ DỤ 1: Tổng tiền đơn hàng theo từng học viên (1 CTE)
WITH student_totals AS (
  SELECT student_id, SUM(amount) AS total
  FROM orders
  GROUP BY student_id
)
SELECT s.name, st.total
FROM students s
JOIN student_totals st ON st.student_id = s.id
ORDER BY st.total DESC;

-- VÍ DỤ 2: Nhiều CTE nối tiếp — đọc như các bước
WITH
active_students AS (                                  -- Bước 1
  SELECT id, name FROM students WHERE age < 25
),
big_orders AS (                                       -- Bước 2
  SELECT * FROM orders WHERE amount > 50
)
SELECT a.name, b.amount                               -- Câu chính
FROM active_students a
JOIN big_orders b ON b.student_id = a.id;

-- VÍ DỤ 3: Recursive CTE — đi xuống sơ đồ tổ chức
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS level             -- Anchor
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.level + 1      -- Recursive
  FROM employees e JOIN org o ON e.manager_id = o.id
  WHERE o.level < 10                                  -- Chặn vô hạn
)
SELECT * FROM org ORDER BY level;`,
        codeLanguage: "sql",
        exercise: "Dùng CTE đặt tên \`high_spenders\` để chứa các học viên có tổng tiền đơn hàng > 100 (gồm 2 cột: student_id, total). Sau đó JOIN với bảng \`students\` để hiển thị tên kèm tổng tiền, sắp xếp giảm dần.",
        exerciseEn: "Create a CTE named \`high_spenders\` containing students whose total order amount > 100 (columns: student_id, total). Then JOIN with \`students\` to show name + total, sorted descending.",
        quiz: [
          { question: "CTE có tồn tại sau khi câu lệnh chạy xong không?", options: ["Có, lưu vĩnh viễn trong database", "Không — CTE chỉ tồn tại trong câu lệnh đang chạy, xong là biến mất", "Có, nếu dùng PERSIST", "Tùy database"], answer: 1, explanation: "CTE là bảng tạm chỉ sống trong phạm vi câu lệnh đang chạy. Câu lệnh kết thúc, CTE biến mất hoàn toàn." },
          { question: "Trong khối WITH có nhiều CTE, một CTE phía sau có dùng được kết quả của CTE phía trước không?", options: ["Không, các CTE độc lập", "Có — CTE phía sau có thể tham chiếu mọi CTE đã khai báo trước nó", "Chỉ với cú pháp đặc biệt", "Chỉ có ở PostgreSQL"], answer: 1, explanation: "Trong cùng một WITH, CTE sau hoàn toàn dùng được CTE trước, giống như mỗi bước trong công thức nấu ăn dùng nguyên liệu của bước trước." },
          { question: "Ưu điểm chính của CTE so với subquery đặt trong FROM là gì?", options: ["CTE chạy nhanh hơn", "CTE có tên rõ ràng, dễ đọc và có thể tham chiếu lại nhiều lần trong cùng câu lệnh", "Subquery không dùng được trong FROM", "CTE tạo bảng vĩnh viễn"], answer: 1, explanation: "Engine hiện đại chạy CTE và subquery với tốc độ tương đương. Lý do chính chọn CTE là để câu lệnh dễ đọc và có thể tái sử dụng bảng tạm trong cùng truy vấn." },
          { question: "Các database hiện đại có 'materialize' (hiện thực hóa) CTE mặc định không?", options: ["Có, luôn luôn", "Không — phần lớn engine hiện đại tự inline CTE giống như subquery", "Chỉ MySQL", "Có, nhưng chỉ với kết quả lớn"], answer: 1, explanation: "PostgreSQL 12+, Snowflake, BigQuery đều inline CTE thành subquery khi tối ưu. PostgreSQL có hint MATERIALIZED nếu bạn muốn ép buộc lưu kết quả." },
          { question: "Khi viết Recursive CTE, điều bắt buộc cần có để tránh chạy vô hạn là gì?", options: ["Đặt tên CTE thật ngắn", "Có điều kiện dừng — ví dụ thêm cột level và WHERE level < N", "Dùng UNION thay vì UNION ALL", "Không có gì bắt buộc"], answer: 1, explanation: "Recursive CTE sẽ tự lặp đến khi không còn dòng mới. Nếu dữ liệu có vòng tròn (A → B → A) mà không có WHERE level < N thì câu lệnh chạy mãi không dừng — treo database." }
        ]
      }
    ]
  },
  {
    id: "sql-window-func",
    title: "Window Functions",
    titleEn: "Window Functions",
    icon: "🪟",
    color: "from-violet-500 to-purple-600",
    description: "ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY",
    descriptionEn: "ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY",
    course: "sql",
    lessons: [
      {
        id: "sql-win-1",
        title: "ROW_NUMBER & RANK",
        titleEn: "ROW_NUMBER & RANK",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. Vấn đề đời thường

Bảng \`orders\` (đơn hàng) có cột \`customer_id\` và \`amount\` (số tiền). Sếp hỏi:
> *"Với mỗi khách, tìm đơn lớn nhất và đứng thứ mấy."*

Với \`GROUP BY\`, bạn tính được max của mỗi khách — nhưng **mất hết các dòng chi tiết**. Ai cũng chỉ còn 1 dòng tổng kết.

→ Cần một công cụ tính theo nhóm **mà KHÔNG nén dòng** lại. Đó là **window function** (hàm cửa sổ — tính toán theo "cửa sổ" các dòng xung quanh, mỗi dòng vẫn giữ nguyên).

## 2. Cú pháp tối thiểu — \`OVER (...)\`

\`\`\`sql
SELECT customer_id,
       amount,
       RANK() OVER (
         PARTITION BY customer_id      -- Chia theo từng khách
         ORDER BY amount DESC          -- Sắp đơn theo số tiền giảm dần
       ) AS hang
FROM   orders;
\`\`\`

- \`OVER (...)\` định nghĩa **cửa sổ** — phạm vi mà hàm "nhìn thấy".
- \`PARTITION BY customer_id\` — chia dữ liệu thành các nhóm riêng cho từng khách (nhưng *không* gộp dòng như GROUP BY).
- \`ORDER BY amount DESC\` — trong mỗi nhóm, sắp xếp theo số tiền.

Kết quả: mỗi đơn vẫn còn nguyên, kèm thêm cột \`hang\` cho biết "đơn này đứng thứ mấy *trong khách hàng đó*".

## 3. \`ROW_NUMBER\` vs \`RANK\` vs \`DENSE_RANK\` — chọn cái nào?

3 đơn có cùng \`amount = 100\`. Mỗi hàm xử lý "hòa" khác nhau:

| amount | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 200 | 1 | 1 | 1 |
| 100 | 2 | 2 | 2 |
| 100 | 3 | **2** | **2** |
| 100 | 4 | **2** | **2** |
| 50  | 5 | **5** | **3** |

- **\`ROW_NUMBER\`** — luôn duy nhất 1, 2, 3… kể cả khi hòa (chọn ngẫu nhiên).
- **\`RANK\`** — dòng hòa cùng số. Dòng tiếp theo **nhảy** (3 dòng hòa hạng 2 → tiếp theo là hạng 5).
- **\`DENSE_RANK\`** — dòng hòa cùng số, dòng tiếp theo *liền kề* (không nhảy).

**Mẹo chọn**:
- Cần **đúng 1 dòng** mỗi nhóm (ví dụ "đơn mới nhất của mỗi khách") → \`ROW_NUMBER\`.
- Cho thi đấu, "Top 3" có thể có nhiều người cùng hạng 1 → \`RANK\` hoặc \`DENSE_RANK\`.

## 4. Mẫu kinh điển: lấy "1 dòng đại diện" cho mỗi nhóm

Bài toán cực hay gặp: *"Lấy đơn mới nhất của mỗi khách hàng."*

\`\`\`sql
WITH t AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY created_at DESC, id DESC    -- Mới nhất trước; id để hòa thì ổn định
    ) AS rn
  FROM orders
)
SELECT * FROM t WHERE rn = 1;     -- Chỉ giữ "đơn mới nhất" của mỗi khách
\`\`\`

Đây cũng là **mẫu khử trùng lặp** (deduplication) — mọi data warehouse production đều có dùng.

## 5. \`LAG\` & \`LEAD\` — so sánh với dòng TRƯỚC / SAU

Vấn đề: bảng \`daily_revenue\` (doanh thu mỗi ngày). Muốn biết *"hôm nay tăng/giảm bao nhiêu so với hôm qua?"*

\`\`\`sql
SELECT date,
       revenue,
       LAG(revenue) OVER (ORDER BY date)        AS hom_qua,    -- Lùi 1 dòng
       revenue - LAG(revenue) OVER (ORDER BY date) AS chenh_lech
FROM   daily_revenue;
\`\`\`

- \`LAG(col)\` = **lùi** 1 dòng (lấy dòng trước).
- \`LEAD(col)\` = **tiến** 1 dòng (lấy dòng sau).
- Dòng đầu tiên không có dòng trước → \`LAG\` trả về NULL.

## 6. Tổng cộng dồn (running total) — \`SUM() OVER\`

Vấn đề: muốn xem **doanh thu cộng dồn** từ đầu năm tới mỗi ngày.

\`\`\`sql
SELECT date,
       revenue,
       SUM(revenue) OVER (
         ORDER BY date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cong_don
FROM   daily_revenue;
\`\`\`

Đoạn \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` (frame — khung) nghĩa là: *"cộng từ dòng đầu tiên đến dòng hiện tại"*. Đổi thành \`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` → bạn có **trung bình trượt 7 ngày**.

## 7. So sánh: window function vs GROUP BY

| Cần gì? | Dùng |
|---|---|
| Gộp tất cả dòng trong nhóm thành 1 dòng tổng | **GROUP BY** |
| Giữ nguyên các dòng + thêm 1 cột tính theo nhóm | **Window function** |
| Cộng dồn / trung bình trượt | Window function với frame |
| Top-N của mỗi nhóm | \`ROW_NUMBER()\` window |

## 8. Tổng kết — checklist khi viết window

- ✅ Luôn có \`ORDER BY\` trong \`OVER()\` cho hàm xếp hạng (nếu không kết quả không xác định).
- ✅ \`ROW_NUMBER\` → 1 dòng duy nhất mỗi nhóm. \`RANK/DENSE_RANK\` → cho phép hòa.
- ✅ Khi sắp xếp có khả năng hòa, thêm cột phụ trong ORDER BY (ví dụ \`, id DESC\`) để ổn định.
- ✅ Cộng dồn / trung bình trượt → ghi rõ \`ROWS BETWEEN ... AND ...\`.
- ✅ Bài tiếp theo: **Indexing** — sau khi viết query đúng, làm sao cho nó CHẠY NHANH?`,
        theoryEn: `## 1. Real-world problem

\`orders\` table — for each customer, find their largest order and its rank. \`GROUP BY\` collapses rows; you need a per-row calc that still sees the group → **window function**.

## 2. Minimal syntax

\`\`\`sql
SELECT customer_id, amount,
  RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rnk
FROM orders;
\`\`\`

\`OVER()\` defines the window — \`PARTITION BY\` splits without collapsing, \`ORDER BY\` sorts within.

## 3. ROW_NUMBER vs RANK vs DENSE_RANK

| amount | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 200 | 1 | 1 | 1 |
| 100 | 2 | 2 | 2 |
| 100 | 3 | 2 | 2 |
| 50  | 4 | 4 | 3 |

ROW_NUMBER unique; RANK skips after ties; DENSE_RANK doesn't.

## 4. "One row per group" pattern

\`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) → WHERE rn = 1\`. Used in every dbt project for dedup / latest-per-group.

## 5. LAG / LEAD

Compare to previous (LAG) or next (LEAD) row. First row has no previous → NULL.

## 6. Running totals

\`SUM(x) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)\`. For 7-day rolling avg: \`6 PRECEDING\`.

## 7. Window vs GROUP BY

| Need | Use |
|---|---|
| Collapse rows | GROUP BY |
| Per-row + per-group calc | Window |
| Running total | Window + frame |
| Top-N per group | ROW_NUMBER |

## 8. Checklist

- Always ORDER BY inside OVER for ranking
- ROW_NUMBER for unique-per-group; RANK for ties
- Tiebreaker in ORDER BY for stability
- Explicit frame for running totals
- Next: **Indexing**`,
        code: `-- Xếp hạng học viên theo tuổi (3 cách khác nhau)
SELECT name, age,
  ROW_NUMBER() OVER (ORDER BY age DESC) AS row_num,    -- Luôn 1,2,3...
  RANK()       OVER (ORDER BY age DESC) AS rank_,      -- Hòa cùng hạng, nhảy
  DENSE_RANK() OVER (ORDER BY age DESC) AS dense_rank  -- Hòa cùng hạng, không nhảy
FROM students;

-- Tổng cộng dồn đơn hàng theo từng học viên
SELECT student_id, amount,
  SUM(amount) OVER (
    PARTITION BY student_id      -- Cộng dồn riêng cho từng học viên
    ORDER BY id
  ) AS cong_don
FROM orders;

-- So sánh đơn hiện tại với đơn TRƯỚC ĐÓ của cùng 1 học viên
SELECT student_id, amount,
  LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS don_truoc,
  amount - LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS chenh_lech
FROM orders;`,
        codeLanguage: "sql",
        exercise: "Xếp hạng các học viên theo TỔNG số tiền họ đã chi (SUM(amount) trên bảng orders) bằng DENSE_RANK. Gợi ý: cần GROUP BY + window function trên kết quả tổng hợp (có thể dùng CTE).",
        exerciseEn: "Rank students by their TOTAL spending (SUM amount across orders) using DENSE_RANK. Hint: GROUP BY + window over the aggregated result (use a CTE).",
        quiz: [
          { question: "Khác nhau giữa `RANK()` và `DENSE_RANK()` là gì?", options: ["Không khác gì", "RANK nhảy số sau khi có hòa, DENSE_RANK không nhảy", "DENSE_RANK chậm hơn", "RANK chỉ dùng với số"], answer: 1, explanation: "Nếu có 2 dòng cùng hạng 2, RANK cho dòng tiếp theo hạng 4 (nhảy 3); DENSE_RANK cho hạng 3 (liền kề)." },
          { question: "`PARTITION BY` trong window function dùng để làm gì?", options: ["Lọc dòng", "Chia dòng thành các nhóm riêng MÀ KHÔNG nén lại (khác với GROUP BY)", "Sắp xếp kết quả", "Giới hạn output"], answer: 1, explanation: "PARTITION BY tạo nhóm giống GROUP BY, NHƯNG vẫn giữ nguyên từng dòng — window function tính toán riêng trong mỗi nhóm." },
          { question: "`LAG(amount, 1)` trả về gì cho dòng ĐẦU TIÊN?", options: ["0", "NULL (vì không có dòng trước)", "Giá trị của chính dòng đó", "Báo lỗi"], answer: 1, explanation: "Dòng đầu tiên không có dòng trước → LAG trả về NULL theo mặc định. Có thể chỉ định giá trị mặc định bằng tham số thứ 3: LAG(amount, 1, 0)." },
          { question: "Làm sao tính trung bình trượt 7 ngày của doanh thu?", options: ["AVG(col) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)", "AVG(col) GROUP BY week", "AVG(col) WHERE date > now() - 7", "AVG(col) OVER ()"], answer: 0, explanation: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW tạo cửa sổ trượt 7 dòng (dòng hiện tại + 6 dòng trước đó)." },
          { question: "Mẫu thường dùng nào kết hợp `ROW_NUMBER() + PARTITION BY`?", options: ["Đếm tổng số dòng", "Tìm Top-N của mỗi nhóm", "Khử trùng lặp (giữ rn = 1)", "Cả B và C"], answer: 3, explanation: "ROW_NUMBER + PARTITION BY là nền tảng cho cả Top-N của mỗi nhóm và khử trùng lặp (giữ dòng có rn = 1, bỏ phần còn lại)." }
        ]
      }
    ]
  },
  {
    id: "sql-indexing",
    title: "Indexing & Performance",
    titleEn: "Indexing & Performance",
    icon: "⚡",
    color: "from-violet-500 to-purple-600",
    description: "B-Tree, Hash Index, EXPLAIN ANALYZE",
    descriptionEn: "B-Tree, Hash Index, EXPLAIN ANALYZE",
    course: "sql",
    lessons: [
      {
        id: "sql-idx-1",
        title: "Index và EXPLAIN",
        titleEn: "Indexes & EXPLAIN",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. Vấn đề đời thường

Bảng \`students\` có 1 triệu dòng. Bạn chạy:

\`\`\`sql
SELECT * FROM students WHERE email = 'an@gmail.com';
\`\`\`

Không có **index** (chỉ mục), database phải đọc **lần lượt từng dòng** trong số 1 triệu để tìm — mất vài giây. Có index, nó tìm trong ~20 phép so sánh — vài mili-giây.

Index giống như **mục lục cuối quyển sách**: thay vì lật từng trang, bạn tra mục lục và nhảy thẳng tới trang cần.

## 2. Tạo index — cú pháp tối thiểu

\`\`\`sql
-- Tạo index trên cột email
CREATE INDEX idx_students_email ON students(email);

-- Index "duy nhất" — vừa làm chỉ mục vừa chống trùng giá trị
CREATE UNIQUE INDEX uniq_students_email ON students(email);
\`\`\`

Sau khi tạo, các câu \`WHERE email = ...\` sẽ **tự động** dùng index — bạn không cần đổi câu query.

## 3. Index hoạt động như thế nào (B-tree, đơn giản hóa)

Loại index mặc định ở mọi database (Postgres, MySQL, SQL Server) là **B-tree** (cây nhị phân cân bằng) — một cấu trúc cây giữ các giá trị **đã được sắp xếp**.

- Tra cứu giống như tra từ điển: chia đôi liên tục → \`O(log N)\` (rất nhanh).
- Vì giá trị đã sắp xếp, các phép \`>\`, \`<\`, \`BETWEEN\` đều dùng được.

## 4. Khi nào index GIÚP, khi nào KHÔNG

| Câu WHERE | Dùng được index? |
|---|---|
| \`WHERE id = 42\` (so sánh bằng) | ✅ Có |
| \`WHERE created_at > '2024-01-01'\` (khoảng) | ✅ Có |
| \`WHERE name LIKE 'an%'\` (đầu chuỗi) | ✅ Có |
| \`WHERE name LIKE '%an'\` (đuôi chuỗi) | ❌ Không |
| \`WHERE UPPER(email) = 'X'\` (bọc cột bằng hàm) | ❌ Không |
| \`WHERE age + 5 > 30\` (biểu thức trên cột) | ❌ Không |
| Lọc ra > 10% bảng | ❌ Thường full-scan nhanh hơn |

**Quy tắc vàng**: đã có index trên cột nào thì **đừng bọc cột đó bằng hàm** — sẽ phá tác dụng. Hãy đẩy hàm sang phía bên phải:

\`\`\`sql
-- ❌ Phá index
WHERE DATE(created_at) = '2024-01-15'

-- ✅ Giữ index hoạt động
WHERE created_at >= '2024-01-15' AND created_at < '2024-01-16'
\`\`\`

## 5. Composite index (chỉ mục nhiều cột) — thứ tự CỘT cực quan trọng

\`\`\`sql
CREATE INDEX idx_orders_cust_date ON orders(customer_id, created_at);
\`\`\`

Index này hỗ trợ:
- \`WHERE customer_id = 42\` ✅
- \`WHERE customer_id = 42 AND created_at > '2024-01-01'\` ✅✅
- \`WHERE created_at > '2024-01-01'\` ❌ (bỏ qua cột đầu — không dùng được)

**Quy tắc "leftmost prefix"**: index \`(A, B, C)\` dùng được khi WHERE có A, hoặc A+B, hoặc A+B+C — không dùng được khi *chỉ* có B, hoặc *chỉ* có C.

→ Đặt cột **luôn xuất hiện trong WHERE** lên đầu.

## 6. \`EXPLAIN\` — cách DUY NHẤT để biết query có dùng index không

Đừng đoán — chạy \`EXPLAIN ANALYZE\` để xem **kế hoạch thực thi** thật:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
\`\`\`

Đọc kết quả:
- **\`Seq Scan\`** trên bảng lớn = **xấu** (đang đọc toàn bảng — thiếu index).
- **\`Index Scan\`** / **\`Index Only Scan\`** = **tốt** (đang dùng index).
- **\`Rows Removed by Filter\`** quá nhiều = đã đọc nhiều dòng rồi mới lọc → cân nhắc thêm index.

## 7. Cái GIÁ phải trả: index không miễn phí

Mỗi index là một bản sao có sắp xếp của cột — chiếm dung lượng và **làm chậm INSERT/UPDATE/DELETE** (vì phải cập nhật cả index).

| Tình huống | Có nên thêm index? |
|---|---|
| Cột thường xuất hiện trong WHERE / JOIN | ✅ Có |
| Cột có nhiều giá trị khác nhau (cardinality cao) | ✅ Có |
| Bảng ghi rất nhiều, đọc ít | ⚠️ Cẩn trọng |
| Cột hiếm khi lọc theo | ❌ Không |

**Câu chuyện thật**: 1 team thêm index "phòng hờ" lên mọi cột → tốc độ INSERT giảm 60% (mỗi insert phải cập nhật 14 indexes). Bài học: **mỗi index là 1 thuế ghi**.

## 8. Tổng kết — checklist khi tối ưu index

- ✅ Index các cột xuất hiện thường xuyên trong WHERE / JOIN / ORDER BY.
- ✅ Composite index: cột "luôn có trong WHERE" đặt **đầu tiên**.
- ✅ Đừng bọc cột bằng hàm (\`UPPER(col)\`, \`DATE(col)\`) — phá index.
- ✅ Trước & sau khi thêm index, **chạy \`EXPLAIN ANALYZE\`** để đo.
- ✅ Bài tiếp theo: **Thiết kế Database & Normalization** — nếu thiết kế tốt, bạn sẽ đỡ phải tạo nhiều index về sau.`,
        theoryEn: `## 1. Real-world problem

\`students\` has 1M rows. \`WHERE email='x'\` without index → reads all 1M rows. With index → ~20 comparisons. Index = book's table of contents.

## 2. Create an index

\`\`\`sql
CREATE INDEX idx_students_email ON students(email);
CREATE UNIQUE INDEX uniq_students_email ON students(email);
\`\`\`

Queries auto-use it — no rewrite needed.

## 3. How B-tree works

Balanced sorted tree, \`O(log N)\` lookup. Range queries efficient.

## 4. When indexes help

| Predicate | Uses index? |
|---|---|
| Equality / range | ✅ |
| Prefix LIKE \`'an%'\` | ✅ |
| Leading-wildcard \`'%an'\` | ❌ |
| Function on column | ❌ |
| Returning >10% of table | Usually no |

## 5. Composite indexes — order matters

Index \`(A, B)\` helps WHERE A, or WHERE A AND B — but **not** WHERE B alone (leftmost-prefix rule).

## 6. EXPLAIN ANALYZE

Look for: \`Seq Scan\` on big table = bad; \`Index Scan\` = good; \`Rows Removed by Filter\` = predicate not pushed.

## 7. The cost

Every index slows writes (INSERT/UPDATE/DELETE). One team's "just-in-case" indexes → -60% write throughput. Indexes are a write tax.

## 8. Checklist

- Index frequent WHERE/JOIN columns
- Composite: most-present column first
- Don't wrap indexed cols in functions
- Always EXPLAIN ANALYZE before/after
- Next: **Database design & normalization**`,
        code: `-- Tạo index đơn giản trên 1 cột
CREATE INDEX idx_students_age ON students(age);

-- Composite index trên 2 cột (thứ tự QUAN TRỌNG)
CREATE INDEX idx_orders_student_amount
ON orders(student_id, amount);

-- Xem kế hoạch thực thi để kiểm tra index có được dùng không
EXPLAIN ANALYZE
SELECT * FROM students WHERE age > 20;

-- Unique index: vừa làm chỉ mục vừa chống trùng email
CREATE UNIQUE INDEX idx_students_email
ON students(email);

-- Partial index: chỉ index các dòng thoả điều kiện (tiết kiệm dung lượng)
CREATE INDEX idx_active ON users(email)
WHERE active = true;

-- Xoá index khi không cần
DROP INDEX idx_students_age;`,
        codeLanguage: "sql",
        exercise: "Đề xuất 1 composite index phù hợp cho câu: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC; Gợi ý: cột nào dùng so sánh '=' nên đặt trước, cột range/order đặt sau.",
        exerciseEn: "Propose a composite index for: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC; Hint: equality column first, then the range/order column.",
        quiz: [
          { question: "Loại index nào tốt nhất cho các truy vấn dạng khoảng (BETWEEN, <, >)?", options: ["Hash", "B-Tree", "GIN", "BRIN"], answer: 1, explanation: "B-Tree giữ giá trị đã sắp xếp nên rất hiệu quả với truy vấn khoảng. Hash chỉ hỗ trợ so sánh bằng (=)." },
          { question: "Composite index trên (A, B) có dùng được khi câu WHERE chỉ lọc trên B không?", options: ["Có", "Không — quy tắc 'leftmost prefix' yêu cầu cột đầu (A) phải có mặt", "Chỉ trên MySQL", "Có nhưng chậm hơn"], answer: 1, explanation: "Quy tắc leftmost prefix: index (A,B) dùng được cho WHERE A, hoặc WHERE A AND B — KHÔNG dùng được khi chỉ có B." },
          { question: "Trong EXPLAIN, 'Seq Scan' nghĩa là gì?", options: ["Quét tối ưu", "Đọc TOÀN BỘ bảng, không dùng index nào", "Quét index tuần tự", "Báo lỗi"], answer: 1, explanation: "Seq Scan = đọc lần lượt từng dòng trong bảng — chậm nhất. Trên bảng lớn, đây thường là dấu hiệu thiếu index." },
          { question: "Partial index là gì?", options: ["Index dở dang", "Index chỉ bao phủ các dòng thoả 1 điều kiện WHERE (ví dụ WHERE active = true)", "Index xây nửa chừng", "Index chỉ trên nửa số cột"], answer: 1, explanation: "Partial index chỉ index các dòng thoả điều kiện cho trước — tiết kiệm dung lượng và tăng tốc các query có cùng điều kiện đó." },
          { question: "Hậu quả của việc tạo quá nhiều index là gì?", options: ["Query trở nên chậm hơn", "Các thao tác INSERT/UPDATE/DELETE bị chậm vì phải cập nhật mọi index", "Database sập", "Không có hậu quả gì"], answer: 1, explanation: "Mỗi lần ghi (INSERT/UPDATE/DELETE), database phải cập nhật mọi index liên quan → quá nhiều index = ghi chậm + tốn dung lượng." }
        ]
      }
    ]
  },
  {
    id: "sql-db-design",
    title: "Thiết kế Database",
    titleEn: "Database Design",
    icon: "🏗️",
    color: "from-violet-500 to-purple-600",
    description: "Normalization, ERD, Primary/Foreign Keys",
    descriptionEn: "Normalization, ERD, Primary/Foreign Keys",
    course: "sql",
    lessons: [
      {
        id: "sql-design-1",
        title: "Normalization & Keys",
        titleEn: "Normalization & Keys",
        level: 3,
        difficulty: "intermediate",
        theory: `Database design — choosing tables, keys, and relationships — is the most consequential decision in a system's life. A well-designed schema makes new features fast and bugs rare. A poorly-designed one becomes the bottleneck every team complains about for years and that no amount of indexing can save.

## Why this matters

You can refactor an API endpoint in a sprint. Refactoring a 500-million-row schema with 30 dependent services takes a year and a half-dozen incidents. *Design decisions you make in week one survive longer than any individual on the team.*

## Normalization — the foundation

**Normalization** is the process of organizing data to eliminate redundancy and update anomalies. The standard normal forms:

| Form | Rule | Eliminates |
|---|---|---|
| **1NF** | Atomic values (no lists in cells) | Repeating groups |
| **2NF** | All non-key columns depend on the *whole* key | Partial dependencies |
| **3NF** | No transitive dependencies (non-key → non-key) | Derived data |
| **BCNF** | Stronger 3NF for edge cases | Subtle anomalies |

90% of OLTP databases target **3NF**. Anything beyond is academic for most apps.

Example of **not** 3NF:

\`\`\`
orders(id, customer_id, customer_email, customer_city)
\`\`\`

\`customer_email\` and \`customer_city\` depend on \`customer_id\`, not on \`id\`. If a customer changes city, you must update every order — 10,000 rows for one fact change. The fix: a separate \`customers\` table.

## Keys — the contracts of your data

| Key | Purpose |
|---|---|
| **Primary key (PK)** | Uniquely identifies a row; non-NULL; one per table |
| **Foreign key (FK)** | References a PK in another table; enforces referential integrity |
| **Surrogate key** | Auto-generated integer or UUID with no business meaning |
| **Natural key** | Real-world identifier (SSN, email, ISBN) |
| **Composite key** | PK made of multiple columns (e.g., \`(order_id, line_no)\`) |

**Surrogate vs natural** is one of the great recurring debates. Surrogate (auto-generated integer or UUID) is the modern default because:

- Natural keys change (people change emails, companies rename SKUs).
- Joining on integers is faster than joining on long strings.
- Surrogate keys make SCD Type 2 (history-tracking dimensions) possible.

Use a natural key only when it's truly immutable *and* short.

## Relationships — the four kinds

| Cardinality | Modeled as |
|---|---|
| **One-to-one** | Either one table, or a FK with UNIQUE constraint |
| **One-to-many** | FK on the "many" side |
| **Many-to-many** | A junction (link) table with two FKs |
| **Self-referential** | FK pointing back to the same table (org chart) |

Many-to-many always needs a junction table — there is no "many-to-many column."

\`\`\`
students --< enrollments >-- courses
\`\`\`

The \`enrollments\` table holds \`(student_id, course_id, grade, enrolled_at)\` — and is also a great place for relationship attributes.

## OLTP vs OLAP design — opposite goals

| Goal | OLTP (apps) | OLAP (warehouses) |
|---|---|---|
| Normalization | High (3NF) | Low (star schema) |
| Optimized for | Many small writes | Few large reads |
| JOINs | Frequent, small | Rare, with denormalized dims |
| Schema changes | Expensive (online migrations) | Cheap (rebuild downstream models) |

The classic mistake: applying OLTP normalization to an analytical warehouse. Result: dashboards joining 12 tables, taking 30 seconds, and breaking on every schema change.

## Design checklist for a new table

1. **What is the grain?** "One row = one ___."
2. **What is the primary key?** Surrogate auto-increment or UUID, almost always.
3. **What are the FKs?** With \`ON DELETE\` policy chosen explicitly (\`CASCADE / RESTRICT / SET NULL\`).
4. **Which columns are NOT NULL?** Default to NOT NULL; add NULL only with a reason.
5. **Which columns need indexes?** WHERE, JOIN, ORDER BY columns.
6. **Audit columns**: \`created_at\`, \`updated_at\` — always include them.
7. **Soft delete vs hard delete?** Compliance often forces soft delete (\`deleted_at TIMESTAMP NULL\`).

## Case study — the GitHub issues table

GitHub publicly described their early schema choice for the \`issues\` table: integer surrogate PK, FK to \`repository_id\`, polymorphic association to assignees and labels via junction tables. Twelve years and billions of issues later, the schema is largely unchanged — proof that boring, normalized OLTP design ages exceptionally well.

## Case study — the JSON-everything anti-pattern

A startup decided to "stay flexible" by storing each entity as one row with a single \`data JSONB\` column. For two months velocity felt great. Then they needed to query "users in California with > 5 orders." There was no way to index inside the JSONB efficiently for that combination. Every query full-scanned and parsed JSON. They spent a quarter migrating to a normalized schema and the problem disappeared. **Schema-on-read sounds liberating until you have to read the schema.**

## Best practices

- Default to **3NF for OLTP**, **star schema for analytical** — and never confuse the two.
- **Surrogate PKs** unless you have a strong reason for natural.
- **NOT NULL by default**; nullable is a deliberate choice.
- **Always include \`created_at\` and \`updated_at\`** with database-side defaults.
- **Choose ON DELETE policy explicitly** for every FK.
- **Naming convention**: lowercase snake_case, plural table names (\`users\`), singular column names (\`user_id\`). Pick one and enforce.
- **Prefer narrow tables**; if a table grows past 50 columns, ask if it should split.

## Anti-patterns & next lesson

Avoid: storing comma-separated lists in a single column (violates 1NF); using natural keys that can change; "EAV" (entity-attribute-value) tables that try to be a database within a database; JSONB for data you'll always query structurally; nullable everything.

Next: **Stored procedures, functions & triggers** — the database-side logic that, when used carefully, can save thousands of round-trips and prevent entire classes of bugs.`,
        theoryEn: `Schema design is the most consequential decision in a system. Bad design is the bottleneck no index can fix.

## Why this matters

Refactoring a 500M-row schema with 30 dependent services = 1.5 years. Design decisions outlive everyone on the team.

## Normalization

| Form | Rule |
|---|---|
| 1NF | Atomic values |
| 2NF | Non-key cols depend on whole key |
| 3NF | No transitive dependencies |
| BCNF | Stronger 3NF |

OLTP targets 3NF. \`orders(customer_email)\` violates 3NF — fix with separate \`customers\` table.

## Keys

PK / FK / surrogate / natural / composite. Default to **surrogate PKs** — natural keys change, integers join faster, surrogate enables SCD Type 2.

## Relationships

One-to-one, one-to-many (FK on many side), many-to-many (junction table), self-referential (FK to same table). M:N **always** needs a junction.

## OLTP vs OLAP design

| Goal | OLTP | OLAP |
|---|---|---|
| Normalization | 3NF | Star schema |
| Optimized for | Small writes | Large reads |
| Schema change | Expensive | Cheap |

Don't apply OLTP normalization to a warehouse — 12-table joins, 30-second dashboards.

## New-table checklist

Grain → PK → FKs (with ON DELETE) → NOT NULLs → indexes → \`created_at/updated_at\` → soft vs hard delete.

## Case study — GitHub issues

12 years, billions of rows, schema unchanged: integer PK, FK to repo, polymorphic via junction tables. Boring normalized design ages well.

## Case study — JSON everything

Startup stored everything as \`data JSONB\` for "flexibility." Couldn't index "California users with >5 orders." Quarter-long migration to normalized schema fixed it.

## Best practices

3NF for OLTP / star for analytical; surrogate PKs; NOT NULL default; \`created_at/updated_at\` everywhere; explicit ON DELETE; consistent naming convention.

## Anti-patterns & next

Avoid CSV-in-column, mutable natural keys, EAV tables, JSONB for structured queries, nullable-everything. Next: **Stored procedures, functions & triggers**.`,
        code: `-- Create normalized tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  dept_id INTEGER REFERENCES departments(id),
  salary DECIMAL(10, 2) DEFAULT 0
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  deadline DATE
);

-- Many-to-many: employee <-> project
CREATE TABLE employee_projects (
  employee_id INTEGER REFERENCES employees(id),
  project_id INTEGER REFERENCES projects(id),
  role VARCHAR(50),
  PRIMARY KEY (employee_id, project_id)
);`,
        codeLanguage: "sql",
        exercise: "Design a schema for a library system: books, authors, members, borrowings (many-to-many between books and authors).",
        exerciseEn: "Design a schema for a library system: books, authors, members, borrowings (many-to-many between books and authors).",
        quiz: [
          { question: "What does 3NF eliminate compared to 2NF?", options: ["NULL values", "Transitive dependencies", "Row duplication", "Foreign keys"], answer: 1, explanation: "3NF removes transitive dependencies — when column A depends on column B which is not a primary key." },
          { question: "How do you model a many-to-many relationship?", options: ["Add a column to both tables", "Use a junction table with FKs to both tables", "Use a FOREIGN KEY array", "It's not possible"], answer: 1, explanation: "A junction/pivot table contains foreign keys to both tables and typically a composite primary key." },
          { question: "What is a surrogate key?", options: ["A real-world identifier like SSN", "An auto-generated ID with no business meaning", "A foreign key", "A composite key"], answer: 1, explanation: "Surrogate keys are system-generated (SERIAL, UUID) and have no real-world meaning, unlike natural keys." },
          { question: "When is denormalization acceptable?", options: ["Never", "In read-heavy systems like data warehouses for performance", "Always", "Only in small databases"], answer: 1, explanation: "Denormalization trades write complexity for read speed — appropriate in analytics/warehouse scenarios." },
          { question: "What does a FOREIGN KEY constraint enforce?", options: ["Column uniqueness", "Referential integrity — the referenced row must exist", "Non-NULL values", "Data type matching"], answer: 1, explanation: "A FOREIGN KEY ensures the value exists in the referenced table's primary key, preventing orphan records." }
        ]
      }
    ]
  },
  {
    id: "sql-stored-proc",
    title: "Stored Procedures & Functions",
    titleEn: "Stored Procedures & Functions",
    icon: "⚙️",
    color: "from-violet-500 to-purple-600",
    description: "Functions, Triggers, Transactions",
    descriptionEn: "Functions, Triggers, Transactions",
    course: "sql",
    lessons: [
      {
        id: "sql-proc-1",
        title: "Functions & Triggers",
        titleEn: "Functions & Triggers",
        level: 4,
        difficulty: "advanced",
        theory: `**Stored procedures, functions, and triggers** push logic into the database itself. Used wisely, they prevent entire classes of bugs (e.g., "we forgot to update the audit log"), eliminate round-trips, and enforce invariants atomically. Used unwisely, they hide business logic where no application engineer can find it.

## Why this matters

Every senior data engineer encounters legacy systems where 500 lines of SQL Server stored procedures contain the *real* business rules — and the application code is just a UI on top. Knowing when to embrace database logic and when to push it back into the app is a judgment call that defines the architecture for years.

## Functions vs procedures

| Aspect | Function | Procedure |
|---|---|---|
| Returns a value | ✅ Yes | ⚠️ Out parameters / result sets |
| Usable inside SELECT | ✅ Yes | ❌ No |
| Side effects (modify data) | Usually ❌ | ✅ Yes |
| Called via | Embed in SQL | \`CALL proc(...)\` |

Postgres example:

\`\`\`sql
CREATE OR REPLACE FUNCTION discount_price(price NUMERIC, pct NUMERIC)
RETURNS NUMERIC LANGUAGE SQL IMMUTABLE
AS $$
  SELECT price * (1 - pct / 100);
$$;

SELECT name, discount_price(price, 10) AS sale_price FROM products;
\`\`\`

\`IMMUTABLE\` tells the planner the function always returns the same output for the same input — enabling caching and index use.

## Triggers — automatic actions

A trigger fires automatically on INSERT / UPDATE / DELETE.

\`\`\`sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_updated
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
\`\`\`

Common, well-loved trigger uses:

- \`updated_at\` maintenance.
- Audit logging — write every change to an audit table.
- Soft-delete enforcement.
- Maintaining derived columns (e.g., search vectors).

## Transactions — ACID, briefly

Triggers and procedures run inside transactions. The four ACID properties:

| Property | Meaning |
|---|---|
| **Atomicity** | All-or-nothing commit |
| **Consistency** | Constraints always satisfied at commit |
| **Isolation** | Concurrent transactions don't see each other's partial state |
| **Durability** | Once committed, survives crashes |

A multi-statement transaction:

\`\`\`sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  INSERT INTO ledger(...) VALUES (...);
COMMIT;
\`\`\`

If anything fails, \`ROLLBACK\` undoes all three changes — *the* canonical reason banks use relational databases.

## Comparison — where should logic live?

| Logic type | Best home | Why |
|---|---|---|
| Auth, business workflows | Application | Versioning, testing, code review |
| Audit / change tracking | Trigger | Cannot be forgotten |
| Constraints (uniqueness, FK) | Database | Enforced regardless of which app |
| Bulk transformations | Stored procedure or dbt | Avoid million-row round-trips |
| Reporting derivations | Views / materialized views | Easy to refresh |
| Real-time enrichment | Application service | Database isn't a service bus |

## Case study — the auditing trigger that saved an audit

A fintech was preparing for a SOX audit. Auditors asked: "Prove no one has modified \`fact_transactions\` outside of the pipeline." Because every UPDATE / DELETE on the table fired an audit-log trigger inserting into an append-only \`audit_transactions\` table, they could prove it in 5 minutes with a single query. A different team in the same company had decided to "do auditing in app code." After two app deploys, ~2% of changes were missing from their audit log. They failed the audit and spent 6 months rebuilding the trail. **Triggers are forgettable; app code is forgetful.**

## Case study — the procedure-soup nightmare

A mid-size insurance company had ~1,200 stored procedures totaling 60,000 lines. Each call site in the app passed dozens of parameters; the procedures called each other 4–5 levels deep. There were no tests, no version control, and the only person who fully understood it had retired. Adding any new feature took weeks. Eventually the team froze the procedures, built a new microservice that wrapped them, and migrated logic out one piece at a time over 2 years. **Database logic without engineering rigor becomes its own kind of legacy hell.**

## Best practices

- **Use triggers for invariants the database must enforce** — \`updated_at\`, audit, soft-delete protection.
- **Keep stored procedures small** — if it's > 200 lines, it probably belongs in app code or dbt.
- **Version-control all DB code** in the same repo as the app; treat DDL like source.
- **Write tests** — pgTAP, tSQLt, dbt tests for SQL transformations.
- **Document the boundaries**: which logic lives in app vs DB. Stick to the rule.
- **Use transactions for any multi-statement state change** that must be all-or-nothing.
- **Beware trigger performance**: they fire on every row — a slow trigger can cripple INSERT throughput.

## Anti-patterns & next lesson

Avoid: cascades of triggers that fire each other (debugging nightmare); business logic in 1,000-line procedures with no tests; long-running transactions that hold locks; \`AUTOCOMMIT\` confusion across drivers; using triggers to call out to external services (network = unreliable inside a transaction).

Next: **Query optimization** — once your design and indexes are right, how do you tune the queries themselves to scale to billions of rows?`,
        theoryEn: `**Procedures, functions, triggers** push logic into the DB. Prevent classes of bugs; can also become legacy hell.

## Why this matters

Senior engineers regularly find legacy systems where the *real* business rules live in 500 lines of stored procedures. Knowing when to embrace vs push back is architectural.

## Functions vs procedures

| Aspect | Function | Procedure |
|---|---|---|
| Returns value | Yes | Out params |
| Use in SELECT | Yes | No |
| Side effects | Usually no | Yes |

\`IMMUTABLE\` functions enable caching + index usage.

## Triggers

Fire on INSERT/UPDATE/DELETE. Common: \`updated_at\`, audit log, soft-delete enforcement.

## Transactions — ACID

Atomicity (all-or-nothing), Consistency, Isolation, Durability. Wrap multi-step state changes in BEGIN…COMMIT/ROLLBACK.

## Where should logic live?

| Logic | Home | Why |
|---|---|---|
| Workflows | App | Versioning, tests |
| Audit | Trigger | Can't be forgotten |
| Constraints | DB | App-agnostic |
| Bulk transforms | Procedure or dbt | Avoid round-trips |
| Reports | Views | Easy refresh |

## Case study — auditing trigger saved a SOX audit

Fintech proved no out-of-pipeline edits in 5 min via trigger-driven audit table. Sister team did app-side auditing → 2% of changes missing → failed audit + 6-month rebuild.

## Case study — procedure soup

1,200 procedures, 60k lines, 4-deep call chains, no tests, retired sole expert. 2-year rescue via wrapping microservice.

## Best practices

Triggers for invariants; procedures small (<200 lines); version control DDL; pgTAP/tSQLt tests; clear app-vs-DB boundary; transactions for atomic groups; mind trigger row-by-row cost.

## Anti-patterns & next

Avoid trigger cascades, untested 1,000-line procedures, long transactions, network calls in triggers. Next: **Query optimization**.`,
        code: `-- Create a function
CREATE OR REPLACE FUNCTION get_student_grade(score INT)
RETURNS VARCHAR AS $$
BEGIN
  IF score >= 90 THEN RETURN 'A';
  ELSIF score >= 80 THEN RETURN 'B';
  ELSIF score >= 70 THEN RETURN 'C';
  ELSIF score >= 60 THEN RETURN 'D';
  ELSE RETURN 'F';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Use the function
SELECT name, get_student_grade(85) AS grade
FROM students;

-- Transaction example
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
        codeLanguage: "sql",
        exercise: "Write a function to calculate total orders for a student_id. Use it in a SELECT query.",
        exerciseEn: "Write a function to calculate total orders for a student_id. Use it in a SELECT query.",
        quiz: [
          { question: "How is a trigger different from a function?", options: ["Triggers are faster", "Triggers fire automatically on DB events, functions must be called manually", "Functions cannot RETURN values", "No difference"], answer: 1, explanation: "Triggers are invoked automatically by database events (INSERT/UPDATE/DELETE), not called manually." },
          { question: "What does the ACID 'A' (Atomicity) guarantee?", options: ["Accuracy", "All operations in a transaction succeed or all are rolled back", "Automatic indexing", "Authentication"], answer: 1, explanation: "Atomicity means a transaction is indivisible — either everything commits or everything rolls back." },
          { question: "What does the NEW variable contain in a trigger?", options: ["The table name", "The new row data after INSERT or UPDATE", "The trigger name", "NULL"], answer: 1, explanation: "NEW contains the new version of the row — the data being inserted or the updated values." },
          { question: "When should you use a BEFORE trigger vs AFTER trigger?", options: ["BEFORE to modify data, AFTER for logging/side-effects", "They are the same", "BEFORE is faster", "AFTER can modify data"], answer: 0, explanation: "BEFORE triggers can modify the row before it is written; AFTER triggers are for side-effects like logging or notifications." },
          { question: "What is the difference between a function and a procedure in PostgreSQL?", options: ["No difference", "Functions return values and work in SELECT; procedures support COMMIT/ROLLBACK", "Procedures are faster", "Functions cannot take parameters"], answer: 1, explanation: "Functions return values and can be used in queries. Procedures can control transactions (COMMIT/ROLLBACK inside)." }
        ]
      }
    ]
  },
  {
    id: "sql-query-opt",
    title: "Query Optimization",
    titleEn: "Query Optimization",
    icon: "🚀",
    color: "from-violet-500 to-purple-600",
    description: "Tối ưu hiệu năng truy vấn, anti-patterns",
    descriptionEn: "Query performance tuning, anti-patterns",
    course: "sql",
    lessons: [
      {
        id: "sql-opt-1",
        title: "Tối ưu truy vấn",
        titleEn: "Query Tuning",
        level: 5,
        difficulty: "advanced",
        theory: `**Query optimization** is the discipline of making queries fast — not by adding hardware, but by understanding how the database thinks. The same query can run in 30 ms or 30 minutes depending on join order, index choice, and predicate pushdown. The optimizer makes most of these decisions for you, but it makes them based on how *you* write the query.

## Why this matters

A staff data engineer is often paged not because a query is broken, but because it's *too slow*. The first 80% of speed comes from schema and indexes; the next 15% from query rewriting; the last 5% from configuration tweaks. This lesson covers the rewriting layer, where a small change in SQL can deliver 10–1000× speedups.

## EXPLAIN — the only honest answer

Every database has an \`EXPLAIN\` (or \`EXPLAIN ANALYZE\`, or \`EXPLAIN PLAN\`) command. **Reading the plan is not optional** — it is the difference between guessing and knowing.

\`\`\`sql
EXPLAIN ANALYZE
SELECT c.name, COUNT(o.id)
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.signup_date > '2024-01-01'
GROUP BY c.name;
\`\`\`

What to scan for first:

1. **Scan type**: \`Index Scan\` ✅, \`Seq Scan\` on big tables ❌
2. **Estimated vs actual rows**: order-of-magnitude mismatch = stale stats → \`ANALYZE\`
3. **Join algorithm**: \`Hash Join\` ✅ for big-big, \`Nested Loop\` ❌ if outer is huge
4. **Sort / Aggregate spilling to disk**: \`Sort Method: external merge\` = need more \`work_mem\`

## The five highest-leverage rewrites

**1. Push filters down.** Filter rows *before* they enter joins or aggregates:

\`\`\`sql
-- ❌ Slow: filter after join
SELECT *
FROM orders o JOIN customers c ON c.id = o.customer_id
WHERE c.country = 'VN';

-- ✅ Faster: explicit subquery (or trust the optimizer)
SELECT *
FROM orders o
JOIN (SELECT * FROM customers WHERE country = 'VN') c ON c.id = o.customer_id;
\`\`\`

Modern optimizers do this for you, but legacy MySQL and complex CTEs sometimes don't.

**2. Replace correlated subqueries with windows.** A 30× speedup is common (covered in window-functions lesson).

**3. Use EXISTS instead of IN** for "is there any match" — short-circuits at first hit.

**4. Pre-aggregate before joining** to fix fan-out:

\`\`\`sql
WITH item_count AS (
  SELECT order_id, COUNT(*) AS items
  FROM order_items GROUP BY order_id
)
SELECT o.*, ic.items
FROM orders o LEFT JOIN item_count ic USING (order_id);
\`\`\`

**5. Avoid SELECT \\*** — fetching unused columns wastes I/O and can prevent index-only scans.

## Common anti-patterns and their fixes

| Anti-pattern | Fix |
|---|---|
| \`WHERE func(col) = X\` | \`WHERE col = func⁻¹(X)\` to allow index use |
| \`OR\` across columns | Split into UNION ALL of two indexed queries |
| \`IN\` with thousands of values | Insert into a temp table, JOIN |
| \`NOT IN (subquery with NULL)\` | \`NOT EXISTS\` |
| Big \`OFFSET\` | Keyset pagination (\`WHERE id > last_id\`) |
| Many small INSERTs | Batch into one multi-row INSERT |
| \`SELECT DISTINCT\` after a JOIN | Pre-aggregate the many side |
| Implicit type cast in WHERE (\`id = '42'\`) | Match types so index is used |

## Statistics — the brain of the optimizer

The planner uses **table statistics** (row counts, value distributions, NULL fractions) to decide between Seq Scan / Index Scan and Nested Loop / Hash Join. If stats are stale, the planner picks badly.

- Postgres: \`ANALYZE table;\` (also runs automatically via autovacuum).
- After a big bulk load, **always run ANALYZE manually** — autovacuum may be hours behind.
- Long-tail / skewed distributions need \`ALTER TABLE … SET STATISTICS 1000\` for finer histograms.

## Materialized views — pre-compute the expensive bits

A regular VIEW is just a saved query. A **materialized view** stores the *result* on disk and is refreshed on demand or on schedule.

\`\`\`sql
CREATE MATERIALIZED VIEW mv_daily_revenue AS
SELECT date_trunc('day', created_at) AS day, SUM(amount) AS rev
FROM orders GROUP BY 1;

REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_revenue;
\`\`\`

For a dashboard query that runs 5,000 times a day on the same aggregate, materializing once and refreshing hourly can drop database load by 99%.

## Comparison — when to reach for what

| Symptom | Likely fix |
|---|---|
| Seq Scan on big table | Add index |
| Nested Loop with millions of inner rows | Force Hash Join (rewrite, or set \`enable_nestloop = off\` for the query) |
| Sort spilling to disk | \`SET work_mem\`, or pre-sort via index |
| Stats off by 100× | \`ANALYZE\` |
| Query slow only sometimes | Plan flipping → consider hints / \`pg_hint_plan\` |
| Repeated identical aggregate | Materialized view |

## Case study — the OFFSET 1,000,000 disaster

A pagination API used \`LIMIT 20 OFFSET 1000000\`. The DB scanned 1,000,020 rows and threw away 1,000,000 — every page-1000 request took 12 seconds. Switched to keyset pagination (\`WHERE id > :last_id ORDER BY id LIMIT 20\`). New latency: **3 ms**. The change touched 6 lines of code and made the team stop apologizing in standup.

## Case study — the materialized view that saved $40k/month

A reporting query joining 4 tables and aggregating daily revenue ran in 8 seconds — fine in isolation. But it ran from 90 different dashboards, refreshing every 5 minutes. The Snowflake bill blew past $40k/month. Solution: one materialized view, refreshed hourly. Dashboard latency dropped to 80 ms; warehouse compute dropped 95%.

## Best practices

- **Always start with EXPLAIN ANALYZE** — never optimize blind.
- **Keep statistics fresh** — \`ANALYZE\` after bulk loads.
- **Prefer keyset pagination** over OFFSET on large tables.
- **Materialize repeated expensive aggregates**.
- **Batch writes**, never one-row-per-call in a tight loop.
- **Profile in production-shaped data**, not toy datasets.
- **Tag every long-running query** with a comment so you can find it in slow-query logs.

## Anti-patterns & next lesson

Avoid: optimizing without measuring; relying on the optimizer to magically rewrite a poorly-written query; over-using hints (they ossify the plan); building a wall of indexes instead of fixing the query; refreshing materialized views non-concurrently in production (locks readers).

Next: **Advanced SQL patterns** — recursive CTEs, JSON operations, and PIVOT — the patterns you'll reach for once the fundamentals are second nature.`,
        theoryEn: `**Query optimization** = make queries fast by understanding how the DB thinks. Same query can run 30ms or 30min.

## Why this matters

Staff engineers get paged for slow queries. Schema + indexes give 80%, rewrites give next 15%.

## EXPLAIN — non-optional

Look for: scan type (Index Scan ✅, Seq Scan on big tables ❌), estimated vs actual rows (order-of-magnitude → run ANALYZE), join algorithm (Hash Join good for big-big, Nested Loop bad if outer is huge), spill to disk.

## Five highest-leverage rewrites

1. Push filters down (modern optimizers do this; legacy doesn't).
2. Replace correlated subqueries with **window functions**.
3. \`EXISTS\` over \`IN\`.
4. Pre-aggregate before joining (fix fan-out).
5. Avoid \`SELECT *\` — enables index-only scans.

## Anti-patterns & fixes

| Anti-pattern | Fix |
|---|---|
| \`func(col) = X\` | \`col = func⁻¹(X)\` |
| \`OR\` across columns | UNION ALL of two queries |
| Huge \`IN\` list | Temp table + JOIN |
| \`NOT IN\` w/ NULL | \`NOT EXISTS\` |
| Big OFFSET | Keyset pagination |
| Many small INSERTs | Batch |
| Implicit cast | Match types |

## Statistics

Stale stats = bad plans. \`ANALYZE\` after bulk loads. Long-tail distributions need higher \`SET STATISTICS\`.

## Materialized views

Store query *result* on disk; refresh on schedule. Dashboards hitting same aggregate 5,000×/day → 99% load reduction.

## Symptom → fix table

| Symptom | Fix |
|---|---|
| Seq Scan big table | Add index |
| Nested Loop with M inner rows | Force Hash Join |
| Sort spilling | \`work_mem\`, pre-sort |
| Stats 100× off | ANALYZE |
| Repeated aggregate | MV |

## Case study — OFFSET 1M

Pagination at OFFSET 1,000,000 = 12 sec. Switched to keyset (\`WHERE id > :last\`) → 3 ms. 6-line diff.

## Case study — MV saved $40k/month

8-sec aggregate × 90 dashboards × 12/hour = $40k/month Snowflake. One hourly MV → 95% compute drop, 80 ms latency.

## Best practices

EXPLAIN ANALYZE first; fresh stats; keyset pagination; materialize repeated aggregates; batch writes; profile prod-shaped data; tag long queries.

## Anti-patterns & next

Avoid blind optimization, over-hinting, refreshing MVs non-concurrently. Next: **Advanced SQL patterns**.`,
        code: `-- Bad: SELECT *
SELECT * FROM orders;

-- Good: specific columns
SELECT student_id, amount FROM orders;

-- Bad: function in WHERE
SELECT * FROM students WHERE LOWER(name) = 'an';

-- Good: expression index
CREATE INDEX idx_lower_name ON students(LOWER(name));

-- Bad: NOT IN with subquery
SELECT * FROM students
WHERE id NOT IN (SELECT student_id FROM orders);

-- Good: NOT EXISTS
SELECT s.* FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);

-- Materialized View
CREATE MATERIALIZED VIEW student_report AS
SELECT s.name, COUNT(o.id) AS orders, SUM(o.amount) AS total
FROM students s
LEFT JOIN orders o ON s.id = o.student_id
GROUP BY s.name;

REFRESH MATERIALIZED VIEW student_report;`,
        codeLanguage: "sql",
        exercise: "Optimize: SELECT * FROM orders WHERE YEAR(created_at) = 2024 AND student_id IN (SELECT id FROM students WHERE name LIKE '%An%');",
        exerciseEn: "Optimize: SELECT * FROM orders WHERE YEAR(created_at) = 2024 AND student_id IN (SELECT id FROM students WHERE name LIKE '%An%');",
        quiz: [
          { question: "Why does WHERE YEAR(col) = 2024 cause slow performance?", options: ["YEAR() uses too much RAM", "Applying a function to a column prevents index usage", "2024 is too large a number", "WHERE is slower than HAVING"], answer: 1, explanation: "Applying a function to an indexed column forces a full table scan because the index stores the raw values, not the function output." },
          { question: "What is the N+1 query problem?", options: ["Running N+1 JOINs", "Running 1 query for a list then N queries for each item's details", "Having N+1 tables", "Using N+1 indexes"], answer: 1, explanation: "N+1 means 1 query to get a list + N individual queries to get details for each item. Solution: use JOINs or batch queries." },
          { question: "What is a Materialized View?", options: ["A virtual table", "A pre-computed and stored query result that can be refreshed", "A temporary table", "A view with indexes"], answer: 1, explanation: "Materialized Views store query results physically. They are fast to read but must be refreshed periodically." },
          { question: "Why is NOT IN dangerous with subqueries that might return NULL?", options: ["Syntax error", "If any value in the subquery is NULL, NOT IN returns no rows at all", "It's slower", "No issue"], answer: 1, explanation: "NOT IN returns NULL (not true) if any value in the list is NULL, effectively filtering out ALL rows. Use NOT EXISTS instead." },
          { question: "What is connection pooling and why is it important?", options: ["Caching query results", "Reusing database connections instead of creating new ones for each request", "Pooling data across tables", "A type of index"], answer: 1, explanation: "Creating a DB connection costs ~50ms. Pooling reuses connections, dramatically reducing overhead in high-traffic applications." }
        ]
      }
    ]
  },
  {
    id: "sql-advanced-patterns",
    title: "Advanced SQL Patterns",
    titleEn: "Advanced SQL Patterns",
    icon: "🎯",
    color: "from-violet-500 to-purple-600",
    description: "Recursive CTE, Pivot, JSON operations",
    descriptionEn: "Recursive CTE, Pivot, JSON operations",
    course: "sql",
    lessons: [
      {
        id: "sql-adv-1",
        title: "Recursive CTE & JSON",
        titleEn: "Recursive CTE & JSON",
        level: 5,
        difficulty: "advanced",
        theory: `Once you've mastered SELECT, JOINs, CTEs, and windows, three more patterns appear in every advanced SQL interview and every mature production codebase: **recursive CTEs, JSON operations, and PIVOT**. They handle problems the previous tools simply can't.

## Why this matters

Modern OLTP and analytical workloads include semi-structured data (JSON from APIs and webhooks), hierarchical data (org charts, comment threads, BOMs), and reporting layouts that require pivoting rows into columns. A senior data engineer reaches for these on a weekly basis.

## Recursive CTEs — walking hierarchies

\`WITH RECURSIVE\` lets a CTE reference itself. The structure is always the same:

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- 1. Anchor: the starting set
  SELECT … FROM table WHERE base_condition

  UNION ALL

  -- 2. Recursive: the step that builds on the previous
  SELECT … FROM table JOIN cte_name ON …
)
SELECT * FROM cte_name;
\`\`\`

Use cases:

- **Org chart traversal** — find every employee under a given manager.
- **Bill of materials** — what parts make up this product, recursively?
- **Generate date series** — every Monday for a year.
- **Graph paths** — shortest path / connected components.

Always **cap recursion depth** with a level column to defend against cyclic data:

\`\`\`sql
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS lvl FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.lvl + 1
  FROM employees e JOIN org o ON e.manager_id = o.id
  WHERE o.lvl < 10        -- safety guard
)
SELECT * FROM org;
\`\`\`

## JSON operations — semi-structured at scale

Every modern database supports a JSON type: Postgres has \`JSON\` and the indexable \`JSONB\`; MySQL has \`JSON\`; Snowflake has \`VARIANT\`; BigQuery has \`JSON\`. The operators differ slightly but the ideas are universal.

| Operation | Postgres JSONB | Snowflake | BigQuery |
|---|---|---|---|
| Get field | \`data->'name'\` | \`data:name\` | \`JSON_VALUE(data, '$.name')\` |
| Get text | \`data->>'name'\` | \`data:name::string\` | same |
| Path navigate | \`data#>'{a,b,c}'\` | \`data:a.b.c\` | \`JSON_QUERY(...)\` |
| Contains | \`data @> '{"x":1}'\` | \`data:x = 1\` | \`JSON_VALUE(...) = "1"\` |
| Index | GIN | Auto (micro-partitions) | Auto |

Postgres example:

\`\`\`sql
SELECT
  id,
  data->>'name' AS name,
  (data->'address'->>'city') AS city
FROM customers
WHERE data @> '{"plan":"pro"}';

CREATE INDEX idx_cust_jsonb ON customers USING GIN (data jsonb_path_ops);
\`\`\`

The GIN index transforms "find all rows where data contains \`{plan:pro}\`" from a full scan into a millisecond lookup.

## PIVOT — rows into columns

Reports often want this layout:

\`\`\`
region | jan | feb | mar | apr
EU     | 100 | 120 | 130 | 140
US     | 200 | 210 | 220 | 230
\`\`\`

But the source is rows: \`(region, month, revenue)\`. Two ways to pivot:

**1. Conditional aggregation (works everywhere):**

\`\`\`sql
SELECT region,
  SUM(CASE WHEN month = 1 THEN revenue END) AS jan,
  SUM(CASE WHEN month = 2 THEN revenue END) AS feb,
  SUM(CASE WHEN month = 3 THEN revenue END) AS mar
FROM monthly_revenue
GROUP BY region;
\`\`\`

**2. Native PIVOT (SQL Server, Snowflake, Oracle):**

\`\`\`sql
SELECT *
FROM monthly_revenue
PIVOT (SUM(revenue) FOR month IN (1 AS jan, 2 AS feb, 3 AS mar)) AS p;
\`\`\`

The conditional-aggregation form is more portable and more flexible (supports multiple aggregates per pivot column).

**UNPIVOT** is the inverse — turn columns back into rows. Useful when a source table has \`(name, q1, q2, q3, q4)\` and you want \`(name, quarter, value)\`.

## Comparison — which advanced tool, when

| Problem | Tool |
|---|---|
| Walk a parent-child hierarchy | Recursive CTE |
| Generate a sequence (dates, numbers) | Recursive CTE or \`generate_series\` |
| Query semi-structured webhook payloads | JSON operators + GIN index |
| Schema-on-read for early experimentation | JSON column |
| Dashboard layout: months → columns | PIVOT (conditional aggregation) |
| Long-form data for ML/Tableau | UNPIVOT / UNION ALL |

## Case study — webhooks at Stripe-scale

Many companies store inbound webhook payloads in a single JSONB column and selectively extract structured columns later. A real e-commerce stored \`stripe_event(id, type, payload JSONB, received_at)\` for *all* incoming events. With a GIN index on \`payload\` they could answer ad-hoc questions like "which events from customer X had a refund > $100" in milliseconds — without ever changing the schema. Three years in, they extracted only the 6 most-queried fields into proper columns. The hybrid pattern is now standard for event-driven systems.

## Case study — the recursive CTE that saved a 1990s ETL

A logistics company had an ancient COBOL ETL that walked a 7-level deep package-routing hierarchy in nightly batch — 6 hours of runtime. Replaced by a single recursive CTE in Postgres: 14 minutes. The team retired 8,000 lines of COBOL with 30 lines of SQL and went home early on a Friday for the first time in a decade.

## Best practices

- **Always cap recursive CTE depth** with a level column + WHERE clause.
- **Use JSONB (Postgres) over JSON** unless you specifically need to preserve key order/whitespace.
- **Add a GIN index on JSONB** columns you'll filter on.
- **Extract hot fields into real columns** once they stabilize (hybrid schema).
- **Conditional aggregation > native PIVOT** for portability.
- **For UNPIVOT, prefer \`UNION ALL\`** in any engine that doesn't support it natively.
- **Limit JSON depth** — schemas more than 4 levels deep are usually a modeling smell.

## Anti-patterns & where to go next

Avoid: recursive CTEs without termination guards (infinite loops + temp-disk explosion); storing structured, queryable fields inside JSON forever (extract them); native PIVOT in cross-engine codebases (portability nightmare); querying JSON without an index (full scans every time).

Where to go next: this concludes the SQL track. From here, the next layer is **dbt** (modular SQL transformation), **query engines** (Trino, DuckDB), and **data modeling** at warehouse scale (which we covered in the Data Engineering track). The patterns you've learned here are exactly the language those higher-level tools speak — every dbt model, every Trino query, every warehouse view is built on the same SELECT + JOIN + CTE + window foundation.`,
        theoryEn: `Three patterns appear in every advanced SQL interview: **recursive CTEs, JSON operations, PIVOT**.

## Why this matters

Modern workloads include hierarchical data, JSON from APIs, and reports that pivot rows into columns. Senior engineers use these weekly.

## Recursive CTEs

\`WITH RECURSIVE\` = anchor + recursive step joined back to the CTE. Use for org charts, BOM, date series, graph paths. **Always cap depth** with \`WHERE level < N\`.

## JSON operations

| Op | Postgres JSONB | Snowflake | BigQuery |
|---|---|---|---|
| Get field | \`data->'name'\` | \`data:name\` | \`JSON_VALUE\` |
| Contains | \`@>\` | \`data:x = 1\` | \`JSON_VALUE = …\` |
| Index | GIN | Auto | Auto |

GIN index turns \`@>\` lookups from full scans into millisecond hits.

## PIVOT — rows to columns

**Conditional aggregation** (portable):

\`\`\`sql
SUM(CASE WHEN month=1 THEN revenue END) AS jan
\`\`\`

**Native PIVOT** (SQL Server, Snowflake, Oracle): \`PIVOT (SUM(rev) FOR month IN (...))\`. UNPIVOT is the inverse.

## Decision matrix

| Problem | Tool |
|---|---|
| Hierarchy walk | Recursive CTE |
| Date series | Recursive CTE / \`generate_series\` |
| Semi-structured | JSON + GIN |
| Months → columns | PIVOT |
| Columns → rows | UNPIVOT / UNION ALL |

## Case study — webhooks at scale

E-commerce stored every webhook in \`payload JSONB\` + GIN. Could answer "events from customer X with refund > $100" in ms without schema changes. Extracted hot fields into real columns 3 years in. Standard hybrid pattern.

## Case study — recursive CTE replaces COBOL

7-level package routing in COBOL: 6-hour batch. 30-line recursive CTE in Postgres: 14 min. Retired 8,000 lines of legacy.

## Best practices

Cap recursion; JSONB over JSON; GIN on filtered JSONB; extract hot fields into columns; conditional aggregation for portability; \`UNION ALL\` for UNPIVOT; limit JSON nesting.

## Anti-patterns & where next

Avoid uncapped recursion, JSON for structured-forever fields, native PIVOT in cross-engine code, unindexed JSON queries. Next: **dbt** + query engines (Trino/DuckDB) — they all speak the SQL you've learned here.`,
        code: `-- Recursive CTE: Employee hierarchy
WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, 1 AS depth,
         name AS path
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  SELECT e.id, e.name, e.manager_id, oc.depth + 1,
         oc.path || ' > ' || e.name
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT depth, path FROM org_chart
ORDER BY path;

-- Generate a number series
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT n, n * n AS square FROM numbers;

-- Pivot with CASE
SELECT student_id,
  SUM(CASE WHEN subject='Math' THEN score END) AS math,
  SUM(CASE WHEN subject='English' THEN score END) AS english
FROM grades GROUP BY student_id;`,
        codeLanguage: "sql",
        exercise: "Write a Recursive CTE to generate Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) up to the 15th number.",
        exerciseEn: "Write a Recursive CTE to generate Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) up to the 15th number.",
        quiz: [
          { question: "What stops a Recursive CTE from running forever?", options: ["LIMIT clause", "A WHERE condition in the recursive case that eventually returns no rows", "BREAK statement", "It stops after 100 iterations automatically"], answer: 1, explanation: "The recursive case needs a WHERE condition that eventually produces no new rows, stopping the recursion." },
          { question: "What is the difference between -> and ->> in PostgreSQL JSON?", options: ["No difference", "-> returns JSON type, ->> returns text type", "-> is for arrays, ->> is for objects", "->> is deprecated"], answer: 1, explanation: "-> returns the result as a JSON value; ->> returns it as a plain text string. Use ->> when you need to compare or display." },
          { question: "What index type should you use for JSONB containment queries (@>)?", options: ["B-Tree", "Hash", "GIN", "BRIN"], answer: 2, explanation: "GIN (Generalized Inverted Index) is designed for complex data types like JSONB, arrays, and full-text search." },
          { question: "How do you PIVOT rows into columns in standard SQL?", options: ["Use the PIVOT keyword", "Use CASE WHEN inside aggregate functions", "Use TRANSPOSE()", "It's not possible"], answer: 1, explanation: "Standard SQL uses conditional aggregation: SUM(CASE WHEN category = 'X' THEN value END) AS x." },
          { question: "What are the two parts of a Recursive CTE?", options: ["SELECT and FROM", "Base case (anchor) and recursive case connected by UNION ALL", "INSERT and SELECT", "LOOP and END LOOP"], answer: 1, explanation: "A recursive CTE has a base case (starting rows) and a recursive case (joins back to itself), connected by UNION ALL." }
        ]
      }
    ]
  }
];

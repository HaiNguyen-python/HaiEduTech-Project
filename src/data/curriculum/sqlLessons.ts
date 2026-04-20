// CONTENT STANDARD: every `theory` block MUST contain ≥6 `## H2` sections so TheorySections.tsx can render the per-section "Mark read" UX.
// SQL & Database curriculum — 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const sqlModules: ExtendedProgrammingModule[] = [
  {
    id: "sql-select-basics",
    title: "Basic SELECT",
    titleEn: "SELECT Basics",
    icon: "📋",
    color: "from-violet-500 to-purple-600",
    description: "Basic data query with SELECT, FROM, LIMIT",
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

-- Get only the columns needed (standard usage)
SELECT name, age FROM students;

-- Get a list of different ages
SELECT DISTINCT age FROM students;

-- Take only the first 3 lines
SELECT name FROM students LIMIT 3;

-- Sort by descending score, take page 2 (5 lines/page)
SELECT name, score FROM students
ORDER BY score DESC, id ASC   -- thêm id ASC để thứ tự ổn định
LIMIT 5 OFFSET 5;`,
        codeLanguage: "sql",
        exercise: "Write a command to get the names and emails of the first 5 students in the students table, sorted by name A→Z. Suggestion: use ORDER BY name ASC with LIMIT 5.",
        exerciseEn: "Write a query to get name and email of the first 5 students, sorted alphabetically by name (A→Z). Hint: ORDER BY name ASC + LIMIT 5.",
        testCases: [
          { input: "SELECT name, email FROM students ORDER BY name LIMIT 5;", expectedOutput: "5 rows", description: "Returns 5 rows with 2 columns name and email" }
        ],
        solutionExplanation: "SELECT selects 2 columns (name, email), FROM specifies the table (students), ORDER BY name is ordered A→Z (default ASC), LIMIT 5 only takes the first 5 rows.",
        quiz: [
          { question: "What does `SELECT * FROM students;` return?", options: ["Only the first column", "All columns and all rows of the table", "Only 10 rows", "An error"], answer: 1, explanation: "The `*` means 'all columns'. Without WHERE or LIMIT, it returns every row." },
          { question: "What is `DISTINCT` used for?", options: ["Sorting data", "Removing duplicate values", "Limiting the number of rows", "Counting rows"], answer: 1, explanation: "DISTINCT removes duplicate rows so each value appears only once." },
          { question: "What does `LIMIT 10 OFFSET 20` mean?", options: ["Rows 1–10", "Rows 11–20", "Skip 20 rows, then take the next 10", "Take 20 rows"], answer: 2, explanation: "OFFSET 20 skips the first 20 rows, then LIMIT 10 returns the next 10 (rows 21–30)." },
          { question: "In SQL's execution order, which clause runs FIRST?", options: ["SELECT", "FROM", "ORDER BY", "LIMIT"], answer: 1, explanation: "FROM runs first — the database must know which table to read before doing anything else." },
          { question: "Why should you avoid `SELECT *` in production?", options: ["Causes a syntax error", "Returns unneeded columns, wasting bandwidth and RAM", "Only runs on MySQL", "Skips NULL values"], answer: 1, explanation: "SELECT * fetches columns you don't need, wasting network bandwidth and memory; it also makes code fragile when the schema changes." }
        ]
      },
      {
        id: "sql-select-2",
        title: "AS & Alias",
        titleEn: "AS & Column Aliases",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bảng \`students\` có 50 cột nhưng bạn chỉ cần \`name\` và \`score\`. Nếu dùng \`SELECT *\` thì phí băng thông + phí cloud. **\`SELECT cột1, cột2\`** = lấy đúng món mình cần ở quán buffet, không tham lam.

> 💡 **Mẹo của thầy Hải:** \`SELECT *\` chỉ dùng khi explore data lần đầu. Production = liệt kê cột rõ ràng.

## 2. 💡 Khái niệm chính

- \`SELECT cột\` — chọn cột.
- \`AS\` — đổi tên hiển thị (alias).
- \`DISTINCT\` — bỏ trùng.
- \`LIMIT n\` — lấy n dòng đầu.

## 3. 🧰 Cú pháp

\`\`\`sql
SELECT name AS student_name, score
FROM students
LIMIT 10;

SELECT DISTINCT class FROM students;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
SELECT name, score
FROM students
WHERE score >= 8
LIMIT 5;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`SELECT *\` trên bảng triệu dòng → query 30 giây thay vì 0.3 giây. Lúc nào cũng nghĩ "cột nào tôi cần?".

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Đặt alias rõ ràng (\`SELECT u.name AS user_name\`) khi join nhiều bảng — tránh lẫn cột trùng tên.

## 7. 🤔 Khi nào dùng

- ✅ Mọi query đọc data.
- ❌ INSERT/UPDATE/DELETE → cú pháp khác.

## 8. 📌 Tóm tắt 30 giây

\`SELECT cột FROM bảng [WHERE …] [LIMIT n]\`. Tránh \`SELECT *\` trong production. \`DISTINCT\` để bỏ trùng, \`AS\` để đổi tên.
`,
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

-- Calculated columns MUST have an alias
SELECT name, age, age + 5 AS age_in_5_years
FROM students;

-- Concatenate string to create column "profile"
SELECT name || ' (Tuổi: ' || age || ')' AS profile
FROM students;

-- Alias ​​for the table (very useful when there are multiple JOIN tables)
SELECT s.name, s.age
FROM students AS s
WHERE s.age > 20;`,
        codeLanguage: "sql",
        exercise: "Write a query that displays the student's name (column 'name') and their age in 10 years (column named 'future_age'). Suggestion: use age + 10 AS future_age.",
        exerciseEn: "Write a query showing student names and their age in 10 years (computed column named 'future_age'). Hint: age + 10 AS future_age.",
        quiz: [
          { question: "What is the `AS` keyword used for?", options: ["Filtering data", "Giving a temporary alias to a column or table", "Sorting", "Grouping data"], answer: 1, explanation: "AS assigns a temporary alias — a display name for a column or table in the query result." },
          { question: "Can you use a column alias inside the WHERE clause?", options: ["Yes, always", "No, because WHERE runs before SELECT", "Only on MySQL", "Only with numbers"], answer: 1, explanation: "Per SQL's execution order, WHERE runs before SELECT, so an alias defined in SELECT doesn't exist yet when WHERE executes." },
          { question: "What does `SELECT price * quantity AS total FROM orders;` produce?", options: ["An error", "A new column named 'total' holding price × quantity", "Updates the table", "Creates a new table"], answer: 1, explanation: "It computes price × quantity for each row and displays the result in a column named 'total'. The original data is unchanged." },
          { question: "Why are table aliases important?", options: ["They make queries faster", "They shorten table names and avoid column ambiguity in JOINs", "SQL requires them", "They create new tables"], answer: 1, explanation: "When joining tables that share column names (e.g. both have 'id'), table aliases disambiguate references and keep queries concise." },
          { question: "What's the difference between `SELECT name student_name` and `SELECT name AS student_name`?", options: ["Different results", "Identical — AS is optional", "The first errors out", "AS is required on PostgreSQL"], answer: 1, explanation: "Both are valid and produce the same result. AS is optional but recommended for readability." }
        ]
      }
    ]
  },
  {
    id: "sql-where-filter",
    title: "WHERE & Filter data",
    titleEn: "WHERE & Filtering",
    icon: "🔍",
    color: "from-violet-500 to-purple-600",
    description: "Filter data with WHERE, AND, OR, IN, BETWEEN, LIKE",
    descriptionEn: "Filter data with WHERE, AND, OR, IN, BETWEEN, LIKE",
    course: "sql",
    lessons: [
      {
        id: "sql-where-1",
        title: "Basic WHERE",
        titleEn: "Basic WHERE Clause",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn vào kho 10.000 sản phẩm, sếp hỏi "lọc cho tôi mấy món Samsung dưới 5 triệu". Không có **WHERE** thì phải kéo từng dòng — chết tươi. WHERE = "đứng ngoài cửa, chỉ cho ai đáp ứng điều kiện vào".

> 💡 **Mẹo của thầy Hải:** WHERE chạy **trước** SELECT trong engine — index trên cột WHERE = tăng tốc 100 lần.

## 2. 💡 Toán tử thường dùng

| Toán tử | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| \`=\` \`<>\` | Bằng / khác | \`age = 20\` |
| \`> >= < <=\` | So sánh | \`score >= 8\` |
| \`BETWEEN\` | Trong khoảng | \`age BETWEEN 18 AND 25\` |
| \`IN\` | Thuộc danh sách | \`city IN ('HN','HCM')\` |
| \`LIKE\` | Pattern | \`name LIKE 'Nguyen%'\` |
| \`IS NULL\` | Rỗng | \`email IS NULL\` |
| \`AND OR NOT\` | Logic | \`a AND b\` |

## 3. 🧰 Ví dụ tổ hợp

\`\`\`sql
SELECT * FROM products
WHERE brand = 'Samsung'
  AND price < 5000000
  AND stock > 0;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
SELECT name, email FROM students
WHERE class IN ('10A','10B') AND score BETWEEN 7 AND 9;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`WHERE col = NULL\` luôn FALSE! Phải dùng \`WHERE col IS NULL\`. NULL không bằng cái gì, kể cả chính nó.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Đặt điều kiện hay loại bỏ nhiều dòng nhất lên đầu (selectivity cao) — engine xử lý nhanh hơn.

## 7. 🤔 Khi nào dùng

- ✅ Mọi query có lọc.
- ❌ Cần aggregate trước rồi lọc → dùng \`HAVING\`.

## 8. 📌 Tóm tắt 30 giây

WHERE = lọc trước GROUP. Toán tử: \`=\`, \`IN\`, \`BETWEEN\`, \`LIKE\`, \`IS NULL\`. NULL phải dùng \`IS NULL\`. Index trên cột WHERE là chìa khóa tốc độ.
`,
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

-- Multiple conditions combined using AND
SELECT * FROM students
WHERE age >= 18 AND age <= 25;

-- IN: belongs to the list
SELECT * FROM students
WHERE name IN ('An', 'Bình', 'Chi');

-- LIKE: matches string pattern (starts with "N")
SELECT * FROM students WHERE name LIKE 'N%';

-- Check for NULL properly
SELECT * FROM orders WHERE email IS NOT NULL;

-- Mixing AND/OR — ALWAYS use parentheses
SELECT * FROM students
WHERE (city = 'Hà Nội' OR city = 'TP HCM')
  AND age > 20;`,
        codeLanguage: "sql",
        exercise: "Filter for students whose ages are between 18 and 22 (including 18 and 22) AND whose name begins with the letter 'T'. Suggestion: use BETWEEN combined with LIKE 'T%'.",
        exerciseEn: "Filter students aged 18-22 (inclusive) AND whose names start with 'T'. Hint: BETWEEN combined with LIKE 'T%'.",
        testCases: [
          { input: "SELECT * FROM students WHERE age BETWEEN 18 AND 22 AND name LIKE 'T%';", expectedOutput: "filtered rows", description: "Combine BETWEEN and LIKE" }
        ],
        quiz: [
          { question: "Which strings match `LIKE 'A%'`?", options: ["Contain the letter A", "Start with the letter A", "End with the letter A", "Equal exactly 'A'"], answer: 1, explanation: "% means 'any sequence of characters'. 'A%' means starts with A, followed by anything." },
          { question: "Why doesn't `WHERE email = NULL` work?", options: ["Syntax error", "NULL means 'unknown', so `= NULL` is always undefined and matches no rows", "It works fine", "NULL equals 0"], answer: 1, explanation: "NULL means 'unknown'. Any comparison with `=` returns NULL (not TRUE), so no rows match. You must use IS NULL." },
          { question: "What values does `BETWEEN 10 AND 20` include?", options: ["Excludes both 10 and 20", "Includes both 10 and 20", "Only 10", "Only 20"], answer: 1, explanation: "BETWEEN is inclusive on both ends — equivalent to `>= 10 AND <= 20`." },
          { question: "How is `WHERE age > 18 OR city = 'HN' AND active = true` actually interpreted?", options: ["(age > 18 OR city = 'HN') AND active = true", "age > 18 OR (city = 'HN' AND active = true)", "Syntax error", "Same as if parenthesized either way"], answer: 1, explanation: "AND has higher precedence than OR, so AND is grouped first: `age > 18 OR (city = 'HN' AND active = true)`. This is why you should ALWAYS use parentheses when mixing AND/OR." },
          { question: "In LIKE, what does the underscore `_` match?", options: ["Any string", "Exactly one character", "A literal underscore", "Zero or one character"], answer: 1, explanation: "`_` matches exactly one character. For example 'J__n' (4 chars) matches 'John', 'Joan'." }
        ]
      }
    ]
  },
  {
    id: "sql-aggregate",
    title: "Aggregate function",
    titleEn: "Aggregate Functions",
    icon: "📊",
    color: "from-violet-500 to-purple-600",
    description: "COUNT, SUM, AVG, MIN, MAX and GROUP BY",
    descriptionEn: "COUNT, SUM, AVG, MIN, MAX with GROUP BY",
    course: "sql",
    lessons: [
      {
        id: "sql-agg-1",
        title: "COUNT, SUM, AVG",
        titleEn: "COUNT, SUM, AVG",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Sếp hỏi: "Doanh thu từng tháng năm nay?". Bạn không thể nhìn 100.000 đơn hàng rồi cộng tay. **Aggregate functions** + **GROUP BY** = "tự động gộp từng nhóm và tính tổng".

> 💡 **Mẹo của thầy Hải:** GROUP BY = sắp xếp đơn hàng vào các "rổ" theo khoá; aggregate function tính cho từng rổ.

## 2. 💡 Hàm aggregate cơ bản

| Hàm | Ý nghĩa |
|-----|---------|
| \`COUNT(*)\` | Đếm dòng |
| \`SUM(col)\` | Tổng |
| \`AVG(col)\` | Trung bình |
| \`MIN/MAX(col)\` | Min/Max |

## 3. 🧰 Cú pháp

\`\`\`sql
SELECT month, SUM(amount) AS revenue
FROM orders
WHERE year = 2025
GROUP BY month
HAVING SUM(amount) > 100000000
ORDER BY revenue DESC;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
SELECT class, AVG(score) AS avg_score, COUNT(*) AS n_students
FROM students
GROUP BY class
ORDER BY avg_score DESC;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Cột nào trong \`SELECT\` mà KHÔNG nằm trong aggregate → phải có trong \`GROUP BY\`. Quên là lỗi cú pháp ngay.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Lọc **trước** GROUP dùng \`WHERE\`, lọc **sau** GROUP dùng \`HAVING\`. Đừng nhầm — \`WHERE SUM()\` sẽ lỗi.

## 7. 🤔 Khi nào dùng

- ✅ Báo cáo, dashboard, KPI.
- ❌ Lấy chi tiết từng dòng → bỏ GROUP BY.

## 8. 📌 Tóm tắt 30 giây

\`GROUP BY\` chia rổ, aggregate tính trong rổ. WHERE lọc trước, HAVING lọc sau. Cột không aggregate phải GROUP BY.
`,
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

-- Average age (NULL automatically omitted)
SELECT AVG(age) AS tuoi_tb FROM students;

-- Count the number of students by age (grouped together)
SELECT age, COUNT(*) AS so_luong
FROM   students
GROUP BY age
ORDER BY so_luong DESC;

-- Only keep age groups with >= 2 students (filter groups using HAVING)
SELECT age, COUNT(*) AS so_luong
FROM   students
GROUP BY age
HAVING COUNT(*) >= 2;

-- Count different ages
SELECT COUNT(DISTINCT age) AS so_tuoi_khac_nhau FROM students;`,
        codeLanguage: "sql",
        exercise: "Count the number of orders by each customer_id in the orders table, then only display customers with >= 3 orders. Suggestion: GROUP BY customer_id, filter by HAVING COUNT(*) >= 3.",
        exerciseEn: "Count orders per customer_id, then show only customers with >= 3 orders. Hint: GROUP BY customer_id, HAVING COUNT(*) >= 3.",
        quiz: [
          { question: "What's the difference between HAVING and WHERE?", options: ["No difference", "HAVING filters AFTER GROUP BY (filters groups); WHERE filters BEFORE (filters rows)", "HAVING is faster", "WHERE is used with aggregate functions"], answer: 1, explanation: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation — so it can use aggregates like SUM(), COUNT()." },
          { question: "What's the difference between `COUNT(*)` and `COUNT(column)`?", options: ["They're identical", "COUNT(*) counts every row including NULLs; COUNT(column) only counts rows where that column is NOT NULL", "COUNT(column) is faster", "COUNT(*) only counts NULLs"], answer: 1, explanation: "COUNT(*) counts every row. COUNT(column) only counts rows that have a non-NULL value in that column." },
          { question: "Why does `WHERE COUNT(*) > 5` raise an error?", options: ["COUNT isn't a function", "WHERE runs BEFORE GROUP BY, so aggregates don't exist yet — you must use HAVING", "Missing parentheses", "It's valid on MySQL"], answer: 1, explanation: "WHERE filters rows BEFORE grouping; the aggregate result doesn't exist at that stage. To filter on aggregates, use HAVING." },
          { question: "How does `AVG` handle NULL values?", options: ["Treats NULL as 0", "Ignores NULLs entirely (averages only non-NULL values)", "Returns NULL", "Throws an error"], answer: 1, explanation: "AVG ignores NULLs completely — sums non-NULL values and divides by the COUNT of non-NULL rows. This causes many subtle reporting bugs." },
          { question: "What happens if you write `SELECT city, COUNT(*) FROM students` WITHOUT GROUP BY?", options: ["Returns all cities with their counts", "Error: city must appear in GROUP BY or inside an aggregate", "Returns the first city", "Returns NULL"], answer: 1, explanation: "Non-aggregated columns (like city) must appear in GROUP BY when the query uses an aggregate — otherwise most databases throw an error." }
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
    description: "INNER, LEFT, RIGHT, FULL JOIN and CROSS JOIN",
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

:::diagram type="join-venn":::

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

-- LEFT JOIN: ALL students, those who have not placed yet, amount = 0
SELECT s.name,
       COALESCE(o.amount, 0) AS amount   -- COALESCE: NULL → 0
FROM   students s
LEFT JOIN orders o ON s.id = o.student_id;

-- Find students who have NOT placed any orders yet (form LEFT JOIN + IS NULL)
SELECT s.name
FROM   students s
LEFT JOIN orders o ON s.id = o.student_id
WHERE  o.id IS NULL;`,
        codeLanguage: "sql",
        exercise: "Write a LEFT JOIN sentence that displays the names of ALL students along with their total order value (SUM amount). Students who have not placed any orders will display 0. Suggestion: use COALESCE(SUM(o.amount), 0) and GROUP BY s.name.",
        exerciseEn: "Write a LEFT JOIN query showing every student's name + their total order amount (SUM). Students with no orders show 0. Hint: COALESCE(SUM(o.amount), 0) + GROUP BY s.name.",
        quiz: [
          { question: "What does LEFT JOIN return when no row matches on the right table?", options: ["Skips that row", "Returns NULL for all right-table columns", "Throws an error", "Returns 0 for all columns"], answer: 1, explanation: "LEFT JOIN keeps ALL rows from the left table. When no match exists on the right side, the right-table columns are filled with NULL." },
          { question: "How do you find rows with NO match using LEFT JOIN?", options: ["WHERE right.id = 0", "WHERE right.id IS NULL (the classic 'orphan' pattern)", "HAVING count = 0", "It's not possible"], answer: 1, explanation: "LEFT JOIN + WHERE right_table.id IS NULL is the classic pattern for finding rows that exist only on the left — known as 'orphan' rows." },
          { question: "Table A has 10 rows, table B has 5 rows. How many rows does CROSS JOIN produce?", options: ["15", "10", "50", "5"], answer: 2, explanation: "CROSS JOIN produces the Cartesian product: every row of A × every row of B = 10 × 5 = 50 rows. Rarely useful — easy to blow up row counts." },
          { question: "What's the difference between INNER JOIN and LEFT JOIN?", options: ["No difference", "INNER returns only matching rows from both tables; LEFT returns all left rows (even unmatched)", "LEFT is faster", "INNER returns more rows"], answer: 1, explanation: "INNER JOIN keeps only rows with matches in BOTH tables. LEFT JOIN keeps all left-table rows, even when there's no right-side match." },
          { question: "Why do most developers prefer LEFT JOIN over RIGHT JOIN?", options: ["LEFT JOIN is faster", "Any RIGHT JOIN can be rewritten as LEFT JOIN by swapping tables — keeping code style consistent", "RIGHT JOIN is deprecated", "They produce different results"], answer: 1, explanation: "RIGHT JOIN A,B is equivalent to LEFT JOIN B,A. Sticking to LEFT JOIN consistently makes code easier to read without mentally switching directions." }
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
    description: "Subqueries in WHERE, FROM and SELECT",
    descriptionEn: "Subqueries in WHERE, FROM and SELECT",
    course: "sql",
    lessons: [
      {
        id: "sql-sub-1",
        title: "Basic subquery",
        titleEn: "Basic Subqueries",
        level: 3,
        difficulty: "intermediate",
        theory: `**Subquery** (truy vấn con) đơn giản là **một câu SELECT đặt bên trong một câu SELECT khác**. Bài này mình sẽ học theo cách dễ nhất: bắt đầu từ một câu hỏi đời thường, rồi từ từ thêm chi tiết.

:::diagram type="subquery":::

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
-- (scalar subquery in WHERE — runs once)
SELECT name, score
FROM students
WHERE score > (SELECT AVG(score) FROM students);

-- EXAMPLE 2: Get the name of a student who has placed an order
-- (subquery returns 1 column with multiple lines → use IN)
SELECT name
FROM students
WHERE id IN (SELECT student_id FROM orders);

-- EXAMPLE 3: Safe way for "never placed an order"
-- (use NOT EXISTS to avoid NULL traps)
SELECT s.name
FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);

-- EXAMPLE 4: Subquery in FROM (clipboard)
-- Count the number of students by city, filter cities > 5 people
SELECT t.city, t.so_hoc_vien
FROM (
  SELECT city, COUNT(*) AS so_hoc_vien
  FROM students
  GROUP BY city
) AS t
WHERE t.so_hoc_vien > 5;`,
        codeLanguage: "sql",
        exercise: "Find students whose **total order value** is greater than the **average total order value of all students**. Suggestion: use GROUP BY in the subquery to calculate the total for each student, then compare with the AVG of those totals.",
        exerciseEn: "Find students whose **total order amount** is greater than the **average of all students' total order amounts**. Hint: use GROUP BY inside a subquery to compute totals per student, then compare with the AVG of those totals.",
        quiz: [
          { question: "How do a regular subquery and a correlated subquery differ?", options: ["Correlated runs faster", "A correlated subquery references columns from the outer query and re-runs once for each outer row", "Correlated only works in SELECT", "No difference"], answer: 1, explanation: "A correlated subquery references the outer table, so it runs once per outer row — much slower on large data." },
          { question: "When should you prefer EXISTS over IN?", options: ["Always", "When the subquery may return many rows or contain NULLs", "Never", "Only when no NULLs are present"], answer: 1, explanation: "EXISTS short-circuits on the first match and handles NULLs safely. IN must materialize the full list and is NULL-unsafe with NOT IN." },
          { question: "What does a scalar subquery return?", options: ["Many rows", "Exactly one cell (one row, one column)", "An entire table", "Nothing"], answer: 1, explanation: "A scalar subquery returns a single cell — that's why it can be used with comparisons like =, >, <. If it accidentally returns 2 rows, the database raises a runtime error." },
          { question: "Why does a subquery in FROM require an alias (e.g. `AS t`)?", options: ["To run faster", "The outer query needs a name to reference columns of the derived table", "It's optional", "Only PostgreSQL requires it"], answer: 1, explanation: "The derived table from a subquery needs a name so the outer SELECT can reference its columns (e.g. t.city). Postgres and MySQL both error without an alias." },
          { question: "Why prefer `NOT EXISTS` over `NOT IN`?", options: ["NOT EXISTS is always faster", "If the subquery list contains a single NULL, NOT IN returns 0 rows — a silent dangerous bug", "NOT IN doesn't exist in SQL", "No reason"], answer: 1, explanation: "In SQL, `x <> NULL` is unknown, not true. A single NULL in the list makes NOT IN return zero rows. NOT EXISTS handles NULLs safely." }
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
        title: "WITH & CTE basic",
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

-- EXAMPLE 2: Multiple CTEs in series — read like steps
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

-- EXAMPLE 3: Recursive CTE — go down the organizational chart
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
        exercise: "Use a CTE named \`high_spenders\` to contain students with total order amount > 100 (including 2 columns: student_id, total). Then JOIN with table \`students\` to display names with total amount, sorted in descending order.",
        exerciseEn: "Create a CTE named \`high_spenders\` containing students whose total order amount > 100 (columns: student_id, total). Then JOIN with \`students\` to show name + total, sorted descending.",
        quiz: [
          { question: "Does a CTE persist after the statement finishes?", options: ["Yes, stored permanently in the database", "No — a CTE only exists within the executing statement and disappears afterwards", "Yes, if you use PERSIST", "Depends on the database"], answer: 1, explanation: "A CTE is a temporary table scoped to the running statement. Once the statement ends, the CTE is gone." },
          { question: "Inside a WITH block with multiple CTEs, can a later CTE use the result of an earlier one?", options: ["No, CTEs are independent", "Yes — a later CTE can reference any CTE declared before it", "Only with special syntax", "Only in PostgreSQL"], answer: 1, explanation: "Within the same WITH, later CTEs can use earlier ones — like steps in a recipe building on previous ingredients." },
          { question: "What is the main advantage of a CTE over a subquery in FROM?", options: ["CTEs run faster", "CTEs have a clear name, are easier to read, and can be referenced multiple times in the same statement", "You can't use subqueries in FROM", "CTEs create permanent tables"], answer: 1, explanation: "Modern engines run CTEs and subqueries at similar speeds. The main reason to choose CTEs is readability and the ability to reuse the derived table within the same query." },
          { question: "Do modern databases materialize CTEs by default?", options: ["Yes, always", "No — most modern engines inline CTEs like subqueries", "Only MySQL", "Yes, but only for large results"], answer: 1, explanation: "PostgreSQL 12+, Snowflake, and BigQuery inline CTEs as subqueries during optimization. PostgreSQL offers the MATERIALIZED hint if you want to force materialization." },
          { question: "When writing a recursive CTE, what is essential to avoid infinite loops?", options: ["A very short CTE name", "A termination condition — e.g. add a `level` column and `WHERE level < N`", "Use UNION instead of UNION ALL", "Nothing is required"], answer: 1, explanation: "A recursive CTE keeps iterating until no new rows are produced. With cyclic data (A → B → A) and no `WHERE level < N`, it loops forever and hangs the database." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Sếp hỏi: "Bảng xếp hạng nhân viên theo phòng ban, mỗi phòng ai cao nhất?". \`GROUP BY\` trả 1 dòng/phòng — mất chi tiết. **Window function** = "vừa giữ chi tiết từng dòng, vừa tính toán theo nhóm".

> 💡 **Mẹo của thầy Hải:** \`OVER()\` = "mở cửa sổ nhìn các dòng xung quanh mà không gộp lại".

## 2. 💡 Hàm window phổ biến

| Hàm | Ý nghĩa |
|-----|---------|
| \`ROW_NUMBER()\` | Số thứ tự (không trùng) |
| \`RANK()\` | Hạng (đồng hạng nhảy số) |
| \`DENSE_RANK()\` | Hạng (đồng hạng không nhảy) |
| \`LAG/LEAD\` | Lấy giá trị dòng trước/sau |
| \`SUM/AVG OVER\` | Tích lũy, moving average |

## 3. 🧰 Cú pháp

\`\`\`sql
SELECT name, dept, salary,
  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk
FROM employees;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Top 1 mỗi phòng:

\`\`\`sql
WITH r AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM r WHERE rn = 1;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Window function chạy **sau** WHERE/GROUP BY. Muốn lọc theo \`rnk\` phải bọc CTE hoặc subquery.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Moving average dùng \`AVG(x) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` cho 7-day MA.

## 7. 🤔 Khi nào dùng

- ✅ Ranking, running total, moving average, so sánh kỳ trước.
- ❌ Chỉ cần tổng hợp đơn giản → \`GROUP BY\` đủ.

## 8. 📌 Tóm tắt 30 giây

\`OVER(PARTITION BY … ORDER BY …)\` = nhóm cửa sổ + sắp xếp. Lọc theo kết quả window phải bọc CTE. Cực mạnh cho BI.
`,
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

-- Cumulative total of orders for each student
SELECT student_id, amount,
  SUM(amount) OVER (
    PARTITION BY student_id      -- Cộng dồn riêng cho từng học viên
    ORDER BY id
  ) AS cong_don
FROM orders;

-- Compare current application with PREVIOUS application of the same student
SELECT student_id, amount,
  LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS don_truoc,
  amount - LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS chenh_lech
FROM orders;`,
        codeLanguage: "sql",
        exercise: "Rank students by the TOTAL amount they spent (SUM(amount) on the orders table) using DENSE_RANK. Suggestion: need GROUP BY + window function on aggregate results (can use CTE).",
        exerciseEn: "Rank students by their TOTAL spending (SUM amount across orders) using DENSE_RANK. Hint: GROUP BY + window over the aggregated result (use a CTE).",
        quiz: [
          { question: "What's the difference between `RANK()` and `DENSE_RANK()`?", options: ["No difference", "RANK skips numbers after ties; DENSE_RANK does not skip", "DENSE_RANK is slower", "RANK only works with numbers"], answer: 1, explanation: "If two rows tie at rank 2, RANK gives the next row rank 4 (skipping 3); DENSE_RANK gives rank 3 (no gap)." },
          { question: "What does `PARTITION BY` do in a window function?", options: ["Filters rows", "Splits rows into separate groups WITHOUT collapsing them (unlike GROUP BY)", "Sorts results", "Limits output"], answer: 1, explanation: "PARTITION BY creates groups like GROUP BY but keeps every individual row — the window function computes within each partition." },
          { question: "What does `LAG(amount, 1)` return for the FIRST row?", options: ["0", "NULL (no previous row exists)", "The current row's value", "Error"], answer: 1, explanation: "The first row has no previous row → LAG returns NULL by default. You can supply a default via the third argument: LAG(amount, 1, 0)." },
          { question: "How do you compute a 7-day rolling average of revenue?", options: ["AVG(col) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)", "AVG(col) GROUP BY week", "AVG(col) WHERE date > now() - 7", "AVG(col) OVER ()"], answer: 0, explanation: "`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` creates a 7-row sliding window (current row + 6 previous)." },
          { question: "Which pattern commonly combines `ROW_NUMBER() + PARTITION BY`?", options: ["Counting total rows", "Finding Top-N per group", "Deduplicating (keep rn = 1)", "Both B and C"], answer: 3, explanation: "ROW_NUMBER + PARTITION BY is the foundation for both Top-N per group and deduplication (keep rn = 1, discard the rest)." }
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
        title: "Index and EXPLAIN",
        titleEn: "Indexes & EXPLAIN",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Bảng \`orders\` có 1 triệu dòng. Mỗi lần tìm đơn hàng theo \`customer_id\` mất 8 giây — như lục từng cuốn sách trong thư viện không có mục lục. **Index** = mục lục. Có nó, tìm 1 cuốn chỉ tốn 0.01 giây.

> 💡 **Mẹo của thầy Hải:** Index = "trade-off". Đọc nhanh hơn nhưng ghi (INSERT/UPDATE) chậm hơn vì phải cập nhật mục lục.

## 2. 💡 Khái niệm chính

- **Primary index**: tự động trên primary key.
- **Secondary index**: bạn tự tạo trên cột hay query.
- **Composite index**: nhiều cột — thứ tự cột cực quan trọng.
- **B-tree** (mặc định): tốt cho \`=\`, \`<\`, \`>\`, \`BETWEEN\`. **Hash**: chỉ \`=\`. **GIN**: full-text search.

## 3. 🧰 Cú pháp

\`\`\`sql
CREATE INDEX idx_customer ON orders(customer_id);
CREATE INDEX idx_date_status ON orders(order_date, status);
DROP INDEX idx_customer;
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 100 AND order_date > '2025-01-01';
-- Rồi tạo index:
CREATE INDEX idx_cust_date ON orders(customer_id, order_date);
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quá nhiều index → INSERT chậm thê thảm. Audit định kỳ, drop index không dùng.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Composite index \`(A, B)\` chỉ tăng tốc query lọc theo \`A\` hoặc \`(A, B)\`, KHÔNG tăng tốc query chỉ lọc \`B\`.

## 7. 🤔 Khi nào dùng

- ✅ Cột hay xuất hiện trong WHERE/JOIN/ORDER BY.
- ❌ Cột có ít giá trị unique (gender, boolean) — index gần như vô dụng.

## 8. 📌 Tóm tắt 30 giây

Index = mục lục → đọc nhanh, ghi chậm. B-tree là default. Composite có thứ tự. Dùng \`EXPLAIN\` để kiểm tra index có được dùng không.
`,
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

-- Composite index on 2 columns (order IMPORTANT)
CREATE INDEX idx_orders_student_amount
ON orders(student_id, amount);

-- View the execution plan to check if the index is used
EXPLAIN ANALYZE
SELECT * FROM students WHERE age > 20;

-- Unique index: both indexes and anti-duplicate emails
CREATE UNIQUE INDEX idx_students_email
ON students(email);

-- Partial index: only index rows that meet the condition (saves space)
CREATE INDEX idx_active ON users(email)
WHERE active = true;

-- Delete index when not needed
DROP INDEX idx_students_age;`,
        codeLanguage: "sql",
        exercise: "Suggest a suitable composite index for the sentence: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC; Suggestion: the column that uses '=' comparison should be placed first, the range/order column should be placed last.",
        exerciseEn: "Propose a composite index for: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC; Hint: equality column first, then the range/order column.",
        quiz: [
          { question: "Which index type is best for range queries (BETWEEN, <, >)?", options: ["Hash", "B-Tree", "GIN", "BRIN"], answer: 1, explanation: "B-Tree stores values sorted, making it very efficient for range queries. Hash only supports equality (=)." },
          { question: "Can a composite index on (A, B) be used when WHERE filters only on B?", options: ["Yes", "No — the 'leftmost prefix' rule requires the leading column (A) to be present", "Only on MySQL", "Yes, but slower"], answer: 1, explanation: "Leftmost prefix rule: index (A,B) is usable for WHERE A or WHERE A AND B — but NOT for B alone." },
          { question: "What does 'Seq Scan' mean in EXPLAIN output?", options: ["An optimal scan", "Reads the ENTIRE table without using any index", "A sequential index scan", "An error"], answer: 1, explanation: "Seq Scan = reading every row in the table — the slowest option. On large tables it usually signals a missing index." },
          { question: "What is a partial index?", options: ["An incomplete index", "An index that covers only rows matching a WHERE condition (e.g. WHERE active = true)", "A half-built index", "An index on only some of the columns"], answer: 1, explanation: "A partial index only indexes rows matching the given predicate — saving space and speeding up queries that share the same predicate." },
          { question: "What's the consequence of creating too many indexes?", options: ["Queries become slower", "INSERT/UPDATE/DELETE operations slow down because every index must be updated", "The database crashes", "No consequence"], answer: 1, explanation: "Every write must update every related index → too many indexes = slower writes and wasted disk space." }
        ]
      }
    ]
  },
  {
    id: "sql-db-design",
    title: "Database Design",
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
        theory: `## 1. 🚦 Vấn đề đời thường

Khởi nghiệp bán đồ ăn online. Chỉ với 1 bảng \`everything(name, address, food, price, qty)\` → khách đổi địa chỉ phải sửa 100 dòng. **Database design** chuẩn = chia bảng theo nghiệp vụ, dùng khoá ngoại để liên kết.

> 💡 **Mẹo của thầy Hải:** 3 ý niệm gối đầu giường — **Entity, Relationship, Normalization** (1NF/2NF/3NF).

## 2. 💡 Khái niệm chính

- **Entity**: thực thể (User, Order, Product).
- **Primary key**: khoá chính (duy nhất).
- **Foreign key**: tham chiếu sang bảng khác.
- **1NF**: cell chứa giá trị nguyên tử.
- **2NF**: bỏ phụ thuộc một phần PK.
- **3NF**: bỏ phụ thuộc bắc cầu.

## 3. 🧰 Schema mẫu

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100)
);
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
SELECT u.name, COUNT(o.id) AS n_orders, SUM(o.total) AS spent
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Lưu danh sách (vd \`'1,2,3'\` trong cột \`tags\`) là vi phạm 1NF — query rất khổ. Tách bảng \`entity_tag\` riêng.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Đặt tên: bảng số nhiều (\`users\`), khoá ngoại \`<entity>_id\` (\`user_id\`). Luôn có \`created_at\`, \`updated_at\`.

## 7. 🤔 Khi nào áp dụng

- ✅ OLTP (giao dịch) → chuẩn 3NF.
- ❌ Warehouse/BI → denormalize (Star schema) cho query nhanh.

## 8. 📌 Tóm tắt 30 giây

Chia bảng theo entity, liên kết bằng FK. 1NF–3NF tránh dư thừa. OLTP dùng 3NF, OLAP dùng Star. Đặt tên nhất quán.
`,
        theoryEn: `Schema design is the most consequential decision in a system. Bad design is a bottleneck no index can fix.

## 1. The everyday problem

An \`orders\` table storing customer email/city in every row → updating one customer means updating 1000 rows. Fix: split out a \`customers\` table (normalization).

## 2. Normalization — 3 forms you actually use

| Form | Plain rule |
|---|---|
| 1NF | Each cell holds one value (no lists) |
| 2NF | Non-key columns depend on the *whole* PK |
| 3NF | No non-key → non-key dependency |

90% of OLTP apps target **3NF**. Beyond that is mostly academic.

## 3. Keys

| Key | Role |
|---|---|
| Primary (PK) | Unique row identifier |
| Foreign (FK) | Points to PK in another table |
| Surrogate | Auto int / UUID, no business meaning |
| Natural | Real-world ID (email, SSN) |
| Composite | PK across multiple columns |

**Default to surrogate PKs** — natural keys change, integers join faster, surrogate enables change tracking.

## 4. The 4 relationships

| Cardinality | How to model |
|---|---|
| 1-1 | FK with UNIQUE |
| 1-N | FK on the "many" side |
| N-N | **Junction table** with two FKs |
| Self-ref | FK pointing back to same table |

N-N **always** needs a junction table — no "many-to-many column" exists.

## 5. OLTP vs OLAP — opposite goals

| Aspect | OLTP (apps) | OLAP (warehouse) |
|---|---|---|
| Normalization | High (3NF) | Low (star schema) |
| Optimized for | Many small writes | Few large reads |
| Schema change | Expensive | Cheap (rebuild models) |

Don't apply OLTP normalization to a warehouse — 12-table joins, 30s dashboards.

## 6. New-table 7-step checklist

Grain → PK → FKs (with ON DELETE) → NOT NULLs → indexes → \`created_at/updated_at\` → soft vs hard delete.

## 7. Worked example — library schema

\`authors\` ← \`book_authors\` (junction) → \`books\`. Each FK has explicit \`ON DELETE\`. Audit columns everywhere.

## 8. Best practices & anti-patterns

✅ 3NF for OLTP / star for OLAP, surrogate PKs, NOT NULL default, always audit cols, snake_case naming.
❌ Comma-separated lists in cells, mutable natural keys, EAV tables, JSONB for structured queries.

## Advanced notes

**GitHub issues**: integer PK + FK to repo + junction tables. Unchanged for 12+ years and billions of rows.

**JSON-everything anti-pattern**: a startup stored everything as \`JSONB\` for "flexibility" — couldn't index "California users with >5 orders". Spent a quarter migrating back to a normalized schema.

## Next

**Stored procedures, functions & triggers** — database-side logic that, used wisely, prevents whole bug classes.`,
        code: `-- Bảng phòng ban (parent của employees)
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,                  -- Surrogate PK tự tăng
  name VARCHAR(100) NOT NULL              -- Tên phòng bắt buộc có
);

-- Employee table: 1 employee belongs to 1 department (1-N relationship)
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,              -- Mỗi email chỉ xuất hiện 1 lần
  dept_id INTEGER REFERENCES departments(id),  -- FK trỏ về phòng ban
  salary DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()      -- Cột audit (theo checklist 6)
);

-- Project board
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  deadline DATE
);

-- N-N relationship: 1 employee works on many projects, 1 project has many employees
-- → MANDATORY use of junction table (junction table)
CREATE TABLE employee_projects (
  employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  role VARCHAR(50),                       -- Vai trò trong dự án (lead, member...)
  PRIMARY KEY (employee_id, project_id)   -- Composite PK: 1 cặp (nv, dự án) duy nhất
);`,
        codeLanguage: "sql",
        exercise: "Schema design for the library system includes: books, authors, members, borrowings. Note: 1 book can have many authors (N-N) → requires an intermediate table. Each table must have an explicit PK, FK with appropriate ON DELETE, and created_at column.",
        exerciseEn: "Design a schema for a library system: books, authors, members, borrowings. Note: a book can have many authors (N-N) → junction table needed. Each table must have explicit PK, FK with ON DELETE policy, and a created_at column.",
        quiz: [
          { question: "Which normal form does `orders(id, customer_id, customer_email, customer_city)` violate?", options: ["1NF", "2NF", "3NF", "No violation"], answer: 2, explanation: "It violates 3NF because `customer_email` and `customer_city` depend on `customer_id` (a non-key column), not directly on `id`. Fix: extract a separate `customers` table." },
          { question: "How is an N-N (many-to-many) relationship between students and courses modeled?", options: ["Add a `course_id` column to students", "Add an array of FOREIGN KEYs", "Create a junction table `enrollments` containing both FKs", "It can't be modeled in SQL"], answer: 2, explanation: "N-N always requires a junction table holding FKs to both sides. SQL has no native 'many-to-many column' concept." },
          { question: "Why prefer a surrogate key (auto-increment / UUID) over a natural key (email, ID number) by default?", options: ["Surrogates are shorter", "Natural keys can change (people update emails, SKUs get renamed); integer joins are faster than string joins", "SQL requires integers", "Natural keys violate normalization"], answer: 1, explanation: "Natural keys can change over time, triggering cascading updates across every FK table. Integers also join faster than long strings." },
          { question: "When is denormalization (deliberately breaking 3NF to store redundant data) acceptable?", options: ["Never", "In data warehouses / reporting (OLAP) — read-heavy, write-light", "Always", "Only on small databases"], answer: 1, explanation: "OLAP (warehouses, BI) prioritizes fast reads over fast writes → denormalization (star schema) avoids 12-table JOINs in dashboards. OLTP (apps) is the opposite — keep it normalized." },
          { question: "What does a FOREIGN KEY enforce?", options: ["Uniqueness of a column", "Referential integrity — the value must exist in the referenced table", "No NULLs allowed", "Matching data types"], answer: 1, explanation: "FK enforces referential integrity: you can't insert `dept_id = 99` into `employees` unless department id=99 exists in `departments`. This prevents orphan records." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Nhân viên kế toán hằng ngày phải chạy lại đúng 5 câu SQL: tính lương → trừ thuế → ghi log → email báo. Copy-paste hoài dễ sai. **Stored Procedure** = "macro Excel cho database" — gói nguyên quy trình, gọi 1 lệnh là chạy.

> 💡 **Mẹo của thầy Hải:** Stored Procedure chạy **trong database** → ít round-trip mạng → nhanh hơn code app gọi từng query.

## 2. 💡 Khái niệm chính

- **Procedure**: thực hiện logic, không trả kết quả (hoặc trả qua OUT param).
- **Function**: trả về 1 giá trị (dùng được trong SELECT).
- **Trigger**: tự chạy khi có INSERT/UPDATE/DELETE.

## 3. 🧰 Cú pháp PostgreSQL

\`\`\`sql
CREATE OR REPLACE PROCEDURE add_bonus(emp_id INT, amount DECIMAL)
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE employees SET salary = salary + amount WHERE id = emp_id;
  INSERT INTO bonus_log(emp_id, amount, at) VALUES (emp_id, amount, NOW());
END;
$$;

CALL add_bonus(101, 500000);
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`sql
CREATE FUNCTION total_orders(uid INT) RETURNS INT
LANGUAGE sql AS $$
  SELECT COUNT(*) FROM orders WHERE user_id = uid;
$$;

SELECT name, total_orders(id) FROM users;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Lạm dụng stored procedure → logic business "ẩn" trong DB, khó test/version. Code Python/Node test dễ hơn.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Dùng SP cho: bulk operation, transaction phức tạp, audit log. Đừng dùng cho business logic chính.

## 7. 🤔 Khi nào dùng

- ✅ Job nightly batch, audit, data migration.
- ❌ CRUD app — nên ở tầng backend.

## 8. 📌 Tóm tắt 30 giây

Procedure = gói lệnh trong DB. Function = trả về giá trị. Trigger = tự kích hoạt. Mạnh nhưng phải dùng đúng chỗ — đừng nhồi business logic vào.
`,
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
    description: "Optimize query performance, anti-patterns",
    descriptionEn: "Query performance tuning, anti-patterns",
    course: "sql",
    lessons: [
      {
        id: "sql-opt-1",
        title: "Query optimization",
        titleEn: "Query Tuning",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Query \`SELECT * FROM orders JOIN products JOIN users WHERE …\` chạy 45 giây — sếp doạ đuổi việc. **Query optimization** = đọc kế hoạch thực thi (\`EXPLAIN\`), tìm điểm nghẽn, rồi sửa từng bước.

> 💡 **Mẹo của thầy Hải:** 80% query chậm là do thiếu index hoặc dùng \`SELECT *\`. Sửa 2 thứ này thường giải quyết được.

## 2. 💡 Quy trình tối ưu

1. Chạy \`EXPLAIN ANALYZE\` → đọc kế hoạch.
2. Tìm \`Seq Scan\` trên bảng to → cần index.
3. Tìm \`Nested Loop\` với rows quá lớn → cân nhắc \`HASH JOIN\`.
4. Giảm cột (\`SELECT *\` → liệt kê).
5. Lọc sớm bằng WHERE/JOIN ON đúng cột index.

## 3. 🧰 Lệnh đọc kế hoạch

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.name, SUM(o.total)
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.created_at > '2025-01-01'
GROUP BY u.name;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Thấy \`Seq Scan on orders (cost=… rows=1000000)\` → tạo index:

\`\`\`sql
CREATE INDEX idx_orders_created_user ON orders(created_at, user_id);
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Hàm bao quanh cột (\`WHERE DATE(created_at) = '2025-01-01'\`) làm index vô hiệu. Viết lại: \`WHERE created_at >= '2025-01-01' AND created_at < '2025-01-02'\`.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** \`LIMIT\` + \`ORDER BY indexed_col\` siêu nhanh. Pagination dùng cursor (\`WHERE id > last_id\`) thay vì \`OFFSET\` lớn.

## 7. 🤔 Khi nào tối ưu

- ✅ Query > 1s, hoặc chạy nhiều lần / phút.
- ❌ Ad-hoc 1 lần → không cần.

## 8. 📌 Tóm tắt 30 giây

\`EXPLAIN ANALYZE\` → tìm Seq Scan trên bảng to → tạo index. Tránh hàm trên cột WHERE. Cursor pagination thay OFFSET.
`,
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
        theory: `## 1. 🚦 Vấn đề đời thường

Sếp hỏi 3 thứ cùng lúc: "top 3 sản phẩm mỗi danh mục, tỉ lệ doanh thu so với tháng trước, khách hàng VIP 6 tháng liên tiếp". Query thường viết lằng nhằng cả trang. **Pattern nâng cao** = công thức gọn gàng cho các bài toán "khó" này.

> 💡 **Mẹo của thầy Hải:** Top-N per group, pivot, gap-and-island, recursive — 4 pattern senior SQL phải thuộc.

## 2. 💡 Pattern thường gặp

| Pattern | Tool SQL |
|---------|----------|
| Top-N per group | \`ROW_NUMBER() OVER(PARTITION BY g ORDER BY x)\` |
| So sánh tháng trước | \`LAG(amount) OVER(ORDER BY month)\` |
| Gap & Island | \`ROW_NUMBER\` + \`DATE - row_number\` |
| Pivot | \`CASE WHEN … END\` + \`SUM\` |

## 3. 🧰 Top-3 sản phẩm theo danh mục

\`\`\`sql
WITH ranked AS (
  SELECT category, name, sales,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

So sánh doanh thu tháng này với tháng trước:

\`\`\`sql
SELECT month, revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS diff
FROM monthly_sales;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`RANK()\` và \`DENSE_RANK()\` xử lý "đồng hạng" khác \`ROW_NUMBER()\`. Cần top-N không trùng → \`ROW_NUMBER\`.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Dùng CTE (\`WITH\`) chia query thành nhiều bước rõ ràng, dễ debug, dễ tái sử dụng.

## 7. 🤔 Khi nào dùng

- ✅ BI dashboard nâng cao, phân tích cohort.
- ❌ Query đơn giản — đừng quá engineer.

## 8. 📌 Tóm tắt 30 giây

Top-N: \`ROW_NUMBER\`. So sánh: \`LAG/LEAD\`. Pivot: \`CASE WHEN\`. Gap-island: \`DATE - ROW_NUMBER\`. CTE để code rõ ràng.
`,
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

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
        theory: "**SELECT** là câu lệnh cơ bản nhất trong SQL, dùng để truy vấn dữ liệu từ bảng.\n\n**Cú pháp:**\n- `SELECT column1, column2 FROM table_name;`\n- `SELECT *` lấy tất cả cột\n- `SELECT DISTINCT` loại bỏ trùng lặp\n\n**LIMIT** giới hạn số dòng trả về:\n- `SELECT * FROM students LIMIT 5;`",
        theoryEn: "**SELECT** is the most basic SQL statement for querying data.\n\n**Syntax:**\n- `SELECT column1, column2 FROM table_name;`\n- `SELECT *` retrieves all columns\n- `SELECT DISTINCT` removes duplicates\n\n**LIMIT** restricts rows returned:\n- `SELECT * FROM students LIMIT 5;`",
        code: `-- Retrieve all students
SELECT * FROM students;

-- Select specific columns
SELECT name, age FROM students;

-- Get unique values
SELECT DISTINCT age FROM students;

-- Limit results
SELECT * FROM students LIMIT 3;`,
        codeLanguage: "sql",
        exercise: "Viết truy vấn lấy tên và email của 5 sinh viên đầu tiên.",
        exerciseEn: "Write a query to get names and emails of the first 5 students.",
        testCases: [
          { input: "SELECT name, email FROM students LIMIT 5;", expectedOutput: "5 rows", description: "Should return 5 rows with name and email columns" }
        ],
        solutionExplanation: "Use SELECT to pick columns (name, email), FROM to specify the table, and LIMIT 5 to restrict output to 5 rows.",
        quiz: [
          { question: "SELECT * FROM students; trả về gì?", options: ["Chỉ cột đầu", "Tất cả cột và dòng", "Chỉ 10 dòng", "Lỗi"], answer: 1, explanation: "Dấu * nghĩa là tất cả cột, không có WHERE hay LIMIT nên trả về tất cả dòng." },
          { question: "DISTINCT dùng để làm gì?", options: ["Sắp xếp dữ liệu", "Loại bỏ giá trị trùng lặp", "Giới hạn dòng", "Đếm dòng"], answer: 1, explanation: "DISTINCT loại bỏ các dòng có giá trị trùng lặp trong kết quả." }
        ]
      },
      {
        id: "sql-select-2",
        title: "AS & Alias",
        titleEn: "AS & Column Aliases",
        level: 1,
        difficulty: "beginner",
        theory: "**Alias** cho phép đổi tên cột hoặc bảng trong kết quả truy vấn.\n\n**Column Alias:**\n- `SELECT name AS student_name FROM students;`\n\n**Table Alias:**\n- `SELECT s.name FROM students s;`\n\n**Biểu thức tính toán:**\n- `SELECT price * quantity AS total FROM orders;`",
        theoryEn: "**Aliases** let you rename columns or tables in query results.\n\n**Column Alias:**\n- `SELECT name AS student_name FROM students;`\n\n**Table Alias:**\n- `SELECT s.name FROM students s;`\n\n**Calculated expressions:**\n- `SELECT price * quantity AS total FROM orders;`",
        code: `-- Column alias
SELECT name AS student_name, age AS student_age
FROM students;

-- Calculated column
SELECT name, age, age + 5 AS age_in_5_years
FROM students;

-- String concatenation
SELECT name || ' (Age: ' || age || ')' AS profile
FROM students;`,
        codeLanguage: "sql",
        exercise: "Tạo truy vấn hiển thị tên sinh viên và tuổi sau 10 năm (cột 'future_age').",
        exerciseEn: "Create a query showing student names and their age in 10 years (column 'future_age').",
        quiz: [
          { question: "AS dùng để làm gì?", options: ["Lọc dữ liệu", "Đặt tên alias cho cột/bảng", "Sắp xếp", "Nhóm dữ liệu"], answer: 1, explanation: "AS tạo alias (tên thay thế) cho cột hoặc bảng trong kết quả truy vấn." }
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
        theory: "**WHERE** lọc dữ liệu theo điều kiện.\n\n**Toán tử so sánh:** =, <>, <, >, <=, >=\n**Toán tử logic:** AND, OR, NOT\n**Toán tử đặc biệt:**\n- `IN (value1, value2)` — kiểm tra thuộc danh sách\n- `BETWEEN x AND y` — trong khoảng\n- `LIKE '%pattern%'` — khớp mẫu\n- `IS NULL` — kiểm tra NULL",
        theoryEn: "**WHERE** filters data by conditions.\n\n**Comparison operators:** =, <>, <, >, <=, >=\n**Logical operators:** AND, OR, NOT\n**Special operators:**\n- `IN (value1, value2)` — check membership\n- `BETWEEN x AND y` — range check\n- `LIKE '%pattern%'` — pattern matching\n- `IS NULL` — null check",
        code: `-- Basic filtering
SELECT * FROM students WHERE age > 20;

-- Multiple conditions
SELECT * FROM students
WHERE age >= 18 AND age <= 25;

-- IN operator
SELECT * FROM students
WHERE name IN ('An', 'Binh', 'Chi');

-- LIKE pattern matching
SELECT * FROM students WHERE name LIKE 'N%';

-- NULL check
SELECT * FROM orders WHERE email IS NOT NULL;`,
        codeLanguage: "sql",
        exercise: "Lọc sinh viên có tuổi từ 18-22 và tên bắt đầu bằng chữ 'T'.",
        exerciseEn: "Filter students aged 18-22 whose names start with 'T'.",
        testCases: [
          { input: "SELECT * FROM students WHERE age BETWEEN 18 AND 22 AND name LIKE 'T%';", expectedOutput: "filtered rows", description: "Combined BETWEEN and LIKE" }
        ],
        quiz: [
          { question: "LIKE 'A%' khớp với gì?", options: ["Chứa chữ A", "Bắt đầu bằng A", "Kết thúc bằng A", "Chỉ chữ A"], answer: 1, explanation: "% là wildcard khớp bất kỳ chuỗi nào. 'A%' nghĩa là bắt đầu bằng A." },
          { question: "IS NULL khác gì = NULL?", options: ["Giống nhau", "IS NULL đúng cú pháp, = NULL luôn false", "= NULL nhanh hơn", "Không khác"], answer: 1, explanation: "NULL không phải giá trị nên = NULL luôn trả về false. Phải dùng IS NULL." }
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
        theory: "**Aggregate Functions** tính toán trên tập dữ liệu:\n\n- `COUNT(*)` — đếm số dòng\n- `COUNT(column)` — đếm giá trị không NULL\n- `SUM(column)` — tổng\n- `AVG(column)` — trung bình\n- `MIN(column)` — giá trị nhỏ nhất\n- `MAX(column)` — giá trị lớn nhất\n\n**GROUP BY** nhóm dữ liệu trước khi tính:\n- `SELECT dept, COUNT(*) FROM employees GROUP BY dept;`\n\n**HAVING** lọc sau khi nhóm:\n- `... GROUP BY dept HAVING COUNT(*) > 5;`",
        theoryEn: "**Aggregate Functions** compute over datasets:\n\n- `COUNT(*)` — count rows\n- `COUNT(column)` — count non-NULL values\n- `SUM(column)` — total\n- `AVG(column)` — average\n- `MIN(column)` — minimum\n- `MAX(column)` — maximum\n\n**GROUP BY** groups before calculating:\n- `SELECT dept, COUNT(*) FROM employees GROUP BY dept;`\n\n**HAVING** filters after grouping:\n- `... GROUP BY dept HAVING COUNT(*) > 5;`",
        code: `-- Count all students
SELECT COUNT(*) AS total_students FROM students;

-- Average age
SELECT AVG(age) AS avg_age FROM students;

-- Group by with aggregates
SELECT age, COUNT(*) AS count
FROM students
GROUP BY age
ORDER BY count DESC;

-- HAVING clause
SELECT age, COUNT(*) AS count
FROM students
GROUP BY age
HAVING COUNT(*) >= 2;`,
        codeLanguage: "sql",
        exercise: "Đếm số đơn hàng theo customer_id, chỉ hiển thị khách có >= 3 đơn.",
        exerciseEn: "Count orders per customer_id, show only customers with >= 3 orders.",
        quiz: [
          { question: "HAVING khác WHERE ở điểm nào?", options: ["Không khác", "HAVING lọc sau GROUP BY, WHERE lọc trước", "HAVING nhanh hơn", "WHERE dùng cho aggregate"], answer: 1, explanation: "WHERE lọc dòng trước khi nhóm, HAVING lọc nhóm sau khi tính aggregate." },
          { question: "COUNT(*) vs COUNT(column)?", options: ["Giống nhau", "COUNT(*) đếm tất cả dòng, COUNT(column) bỏ NULL", "COUNT(column) nhanh hơn", "COUNT(*) chỉ đếm NULL"], answer: 1, explanation: "COUNT(*) đếm mọi dòng kể cả NULL. COUNT(column) chỉ đếm giá trị non-NULL." }
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
        theory: "**JOIN** kết nối dữ liệu từ nhiều bảng.\n\n**INNER JOIN:** Chỉ lấy dòng khớp ở cả 2 bảng\n- `SELECT * FROM A INNER JOIN B ON A.id = B.a_id;`\n\n**LEFT JOIN:** Lấy tất cả dòng bảng trái + dòng khớp bảng phải\n- Dòng không khớp → NULL ở cột bảng phải\n\n**RIGHT JOIN:** Ngược lại LEFT JOIN\n\n**FULL OUTER JOIN:** Lấy tất cả từ cả 2 bảng",
        theoryEn: "**JOIN** connects data from multiple tables.\n\n**INNER JOIN:** Only matching rows from both tables\n- `SELECT * FROM A INNER JOIN B ON A.id = B.a_id;`\n\n**LEFT JOIN:** All rows from left + matching from right\n- Non-matching → NULL for right table columns\n\n**RIGHT JOIN:** Opposite of LEFT JOIN\n\n**FULL OUTER JOIN:** All rows from both tables",
        code: `-- INNER JOIN: students with orders
SELECT s.name, o.amount
FROM students s
INNER JOIN orders o ON s.id = o.student_id;

-- LEFT JOIN: all students, even without orders
SELECT s.name, COALESCE(o.amount, 0) AS amount
FROM students s
LEFT JOIN orders o ON s.id = o.student_id;

-- Find students WITHOUT orders
SELECT s.name
FROM students s
LEFT JOIN orders o ON s.id = o.student_id
WHERE o.id IS NULL;`,
        codeLanguage: "sql",
        exercise: "Viết truy vấn LEFT JOIN hiển thị tất cả sinh viên và tổng tiền đơn hàng (SUM). Sinh viên chưa có đơn hiển thị 0.",
        exerciseEn: "Write a LEFT JOIN query showing all students and their total order amount (SUM). Students without orders show 0.",
        quiz: [
          { question: "LEFT JOIN trả về gì khi không có dòng khớp?", options: ["Bỏ qua dòng đó", "NULL ở cột bảng phải", "Lỗi", "0 ở tất cả cột"], answer: 1, explanation: "LEFT JOIN giữ tất cả dòng bảng trái. Khi không khớp, các cột bảng phải nhận giá trị NULL." },
          { question: "Cách tìm dòng KHÔNG khớp dùng LEFT JOIN?", options: ["WHERE right.id = 0", "WHERE right.id IS NULL", "HAVING count = 0", "Không thể"], answer: 1, explanation: "Dùng LEFT JOIN + WHERE right_table.id IS NULL để tìm dòng chỉ có ở bảng trái." }
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
        theory: "**Subquery** là truy vấn lồng bên trong truy vấn khác.\n\n**Trong WHERE:**\n- `SELECT * FROM students WHERE age > (SELECT AVG(age) FROM students);`\n\n**Trong FROM (Derived Table):**\n- `SELECT * FROM (SELECT name, age FROM students) AS sub;`\n\n**Correlated Subquery:**\n- Tham chiếu đến bảng ngoài, chạy cho mỗi dòng\n\n**EXISTS / NOT EXISTS:**\n- Kiểm tra subquery có trả về dòng nào không",
        theoryEn: "**Subquery** is a query nested inside another query.\n\n**In WHERE:**\n- `SELECT * FROM students WHERE age > (SELECT AVG(age) FROM students);`\n\n**In FROM (Derived Table):**\n- `SELECT * FROM (SELECT name, age FROM students) AS sub;`\n\n**Correlated Subquery:**\n- References outer table, runs for each row\n\n**EXISTS / NOT EXISTS:**\n- Checks if subquery returns any rows",
        code: `-- Students older than average
SELECT name, age FROM students
WHERE age > (SELECT AVG(age) FROM students);

-- Students with highest order
SELECT name FROM students
WHERE id = (
  SELECT student_id FROM orders
  ORDER BY amount DESC LIMIT 1
);

-- EXISTS: students who placed orders
SELECT s.name FROM students s
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.student_id = s.id
);`,
        codeLanguage: "sql",
        exercise: "Tìm sinh viên có tổng đơn hàng cao hơn trung bình tổng đơn hàng của tất cả sinh viên.",
        exerciseEn: "Find students whose total order amount is above the average total order amount across all students.",
        quiz: [
          { question: "Correlated subquery khác subquery thường ở điểm nào?", options: ["Nhanh hơn", "Tham chiếu bảng ngoài, chạy mỗi dòng", "Chỉ dùng trong SELECT", "Không khác"], answer: 1, explanation: "Correlated subquery tham chiếu cột từ query bên ngoài và được thực thi cho mỗi dòng của query ngoài." }
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
        theory: "**CTE (Common Table Expression)** tạo bảng tạm trong truy vấn.\n\n**Ưu điểm so với Subquery:**\n- Dễ đọc hơn\n- Có thể tái sử dụng trong cùng truy vấn\n- Hỗ trợ đệ quy\n\n**Cú pháp:**\n```sql\nWITH cte_name AS (\n  SELECT ...\n)\nSELECT * FROM cte_name;\n```\n\n**Multiple CTEs:** Dùng dấu phẩy phân cách",
        theoryEn: "**CTE (Common Table Expression)** creates temporary tables within a query.\n\n**Advantages over Subqueries:**\n- More readable\n- Reusable within the same query\n- Supports recursion\n\n**Syntax:**\n```sql\nWITH cte_name AS (\n  SELECT ...\n)\nSELECT * FROM cte_name;\n```\n\n**Multiple CTEs:** Separate with commas",
        code: `-- Basic CTE
WITH student_stats AS (
  SELECT student_id, COUNT(*) AS order_count, SUM(amount) AS total
  FROM orders
  GROUP BY student_id
)
SELECT s.name, ss.order_count, ss.total
FROM students s
JOIN student_stats ss ON s.id = ss.student_id
ORDER BY ss.total DESC;

-- Multiple CTEs
WITH
  top_students AS (
    SELECT * FROM students WHERE age < 25
  ),
  recent_orders AS (
    SELECT * FROM orders WHERE amount > 50
  )
SELECT t.name, r.amount
FROM top_students t
JOIN recent_orders r ON t.id = r.student_id;`,
        codeLanguage: "sql",
        exercise: "Dùng CTE tạo bảng tạm 'high_spenders' (sinh viên có tổng đơn > 100), rồi JOIN với bảng students để lấy tên.",
        exerciseEn: "Use a CTE to create 'high_spenders' (students with total orders > 100), then JOIN with students to get names.",
        quiz: [
          { question: "CTE có tồn tại sau khi truy vấn kết thúc không?", options: ["Có, lưu vĩnh viễn", "Không, chỉ tồn tại trong truy vấn", "Có, nếu dùng PERSIST", "Tùy database"], answer: 1, explanation: "CTE chỉ tồn tại trong phạm vi truy vấn chứa nó. Sau khi truy vấn chạy xong, CTE biến mất." }
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
        theory: "**Window Functions** tính toán trên tập dòng liên quan mà không gộp dữ liệu.\n\n**Cú pháp:** `function() OVER (PARTITION BY col ORDER BY col)`\n\n**Ranking Functions:**\n- `ROW_NUMBER()` — số thứ tự duy nhất\n- `RANK()` — cho phép trùng hạng, bỏ qua số\n- `DENSE_RANK()` — trùng hạng, không bỏ số\n\n**Analytic Functions:**\n- `LAG(col, n)` — giá trị n dòng trước\n- `LEAD(col, n)` — giá trị n dòng sau\n- `SUM() OVER(...)` — tổng tích lũy",
        theoryEn: "**Window Functions** compute across related rows without collapsing data.\n\n**Syntax:** `function() OVER (PARTITION BY col ORDER BY col)`\n\n**Ranking Functions:**\n- `ROW_NUMBER()` — unique sequential number\n- `RANK()` — allows ties, skips numbers\n- `DENSE_RANK()` — ties without skipping\n\n**Analytic Functions:**\n- `LAG(col, n)` — value n rows before\n- `LEAD(col, n)` — value n rows after\n- `SUM() OVER(...)` — running total",
        code: `-- Rank students by age
SELECT name, age,
  ROW_NUMBER() OVER (ORDER BY age DESC) AS row_num,
  RANK() OVER (ORDER BY age DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY age DESC) AS dense_rank
FROM students;

-- Running total of orders
SELECT student_id, amount,
  SUM(amount) OVER (
    PARTITION BY student_id
    ORDER BY id
  ) AS running_total
FROM orders;

-- Compare with previous order
SELECT student_id, amount,
  LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS prev_amount,
  amount - LAG(amount, 1) OVER (
    PARTITION BY student_id ORDER BY id
  ) AS diff
FROM orders;`,
        codeLanguage: "sql",
        exercise: "Xếp hạng sinh viên theo tổng chi tiêu (SUM amount) sử dụng DENSE_RANK, PARTITION BY không cần.",
        exerciseEn: "Rank students by total spending (SUM amount) using DENSE_RANK, no PARTITION BY needed.",
        quiz: [
          { question: "RANK() và DENSE_RANK() khác nhau ở đâu?", options: ["Không khác", "RANK bỏ qua số khi trùng, DENSE_RANK không", "DENSE_RANK chậm hơn", "RANK chỉ dùng với số"], answer: 1, explanation: "Nếu 2 dòng cùng rank 2, RANK() tiếp theo là 4 (bỏ 3), DENSE_RANK() tiếp theo là 3." },
          { question: "PARTITION BY trong Window Function giống gì?", options: ["WHERE", "GROUP BY nhưng không gộp dòng", "ORDER BY", "LIMIT"], answer: 1, explanation: "PARTITION BY chia dữ liệu thành nhóm như GROUP BY nhưng giữ nguyên từng dòng thay vì gộp." }
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
        theory: "**Index** tăng tốc truy vấn bằng cách tạo cấu trúc tìm kiếm nhanh.\n\n**Loại Index:**\n- B-Tree (mặc định): tốt cho =, <, >, BETWEEN\n- Hash: tốt cho = (exact match)\n- GIN/GiST: cho full-text search, JSON\n\n**Khi nào dùng Index:**\n- Cột thường xuyên xuất hiện trong WHERE\n- Cột dùng trong JOIN\n- Cột dùng trong ORDER BY\n\n**Trade-off:** Index tăng tốc đọc nhưng chậm ghi (INSERT/UPDATE).\n\n**EXPLAIN ANALYZE:** Xem kế hoạch thực thi truy vấn.",
        theoryEn: "**Index** speeds up queries by creating fast lookup structures.\n\n**Index Types:**\n- B-Tree (default): good for =, <, >, BETWEEN\n- Hash: good for = (exact match)\n- GIN/GiST: for full-text search, JSON\n\n**When to use Index:**\n- Columns frequently in WHERE\n- Columns used in JOIN\n- Columns used in ORDER BY\n\n**Trade-off:** Index speeds up reads but slows writes.\n\n**EXPLAIN ANALYZE:** View query execution plan.",
        code: `-- Create an index
CREATE INDEX idx_students_age ON students(age);

-- Composite index
CREATE INDEX idx_orders_student_amount
ON orders(student_id, amount);

-- View query plan
EXPLAIN ANALYZE
SELECT * FROM students WHERE age > 20;

-- Unique index
CREATE UNIQUE INDEX idx_students_email
ON students(email);

-- Drop index
DROP INDEX idx_students_age;`,
        codeLanguage: "sql",
        exercise: "Tạo index phù hợp cho truy vấn: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC;",
        exerciseEn: "Create an appropriate index for: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC;",
        quiz: [
          { question: "Index B-Tree phù hợp với truy vấn nào?", options: ["LIKE '%abc'", "age BETWEEN 18 AND 25", "JSON containment", "Full-text search"], answer: 1, explanation: "B-Tree hỗ trợ range queries (BETWEEN, <, >) rất tốt. LIKE '%abc' không dùng được B-Tree vì wildcard ở đầu." }
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
        theory: "**Normalization** giảm dư thừa dữ liệu:\n\n**1NF:** Mỗi ô chứa 1 giá trị duy nhất\n**2NF:** 1NF + mỗi cột phụ thuộc toàn bộ Primary Key\n**3NF:** 2NF + không có phụ thuộc bắc cầu\n\n**Keys:**\n- PRIMARY KEY: Định danh duy nhất mỗi dòng\n- FOREIGN KEY: Liên kết bảng\n- UNIQUE: Đảm bảo không trùng lặp\n\n**Denormalization:** Đôi khi cố ý dư thừa để tăng tốc đọc (Data Warehouse).",
        theoryEn: "**Normalization** reduces data redundancy:\n\n**1NF:** Each cell has a single atomic value\n**2NF:** 1NF + every column depends on full Primary Key\n**3NF:** 2NF + no transitive dependencies\n\n**Keys:**\n- PRIMARY KEY: Uniquely identifies each row\n- FOREIGN KEY: Links tables\n- UNIQUE: Ensures no duplicates\n\n**Denormalization:** Sometimes intentionally add redundancy for read speed (Data Warehouse).",
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
        exercise: "Thiết kế schema cho hệ thống thư viện: books, authors, members, borrowings (many-to-many giữa books và authors).",
        exerciseEn: "Design a schema for a library system: books, authors, members, borrowings (many-to-many between books and authors).",
        quiz: [
          { question: "3NF loại bỏ gì so với 2NF?", options: ["Giá trị NULL", "Phụ thuộc bắc cầu (transitive)", "Trùng lặp dòng", "Foreign key"], answer: 1, explanation: "3NF loại bỏ transitive dependency — khi cột A phụ thuộc cột B mà B không phải PK." }
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
        theory: "**Functions** đóng gói logic SQL tái sử dụng.\n\n**Stored Function (PostgreSQL):**\n```sql\nCREATE FUNCTION func_name(param type)\nRETURNS type AS $$\nBEGIN\n  RETURN value;\nEND;\n$$ LANGUAGE plpgsql;\n```\n\n**Triggers:** Tự động chạy khi INSERT/UPDATE/DELETE\n\n**Transactions:** Đảm bảo ACID\n- `BEGIN; ... COMMIT;` hoặc `ROLLBACK;`",
        theoryEn: "**Functions** encapsulate reusable SQL logic.\n\n**Stored Function (PostgreSQL):**\n```sql\nCREATE FUNCTION func_name(param type)\nRETURNS type AS $$\nBEGIN\n  RETURN value;\nEND;\n$$ LANGUAGE plpgsql;\n```\n\n**Triggers:** Auto-execute on INSERT/UPDATE/DELETE\n\n**Transactions:** Ensure ACID\n- `BEGIN; ... COMMIT;` or `ROLLBACK;`",
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
        exercise: "Viết function tính tổng đơn hàng của một student_id. Dùng function đó trong truy vấn SELECT.",
        exerciseEn: "Write a function to calculate total orders for a student_id. Use it in a SELECT query.",
        quiz: [
          { question: "Trigger khác Function ở điểm nào?", options: ["Trigger nhanh hơn", "Trigger tự động chạy khi có sự kiện DB", "Function không thể RETURN", "Không khác"], answer: 1, explanation: "Trigger được tự động gọi bởi database events (INSERT/UPDATE/DELETE), không cần gọi thủ công." }
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
        theory: "**Anti-patterns cần tránh:**\n- `SELECT *` — chỉ lấy cột cần thiết\n- `WHERE function(column) = value` — không dùng được index\n- `NOT IN` với subquery — dùng NOT EXISTS thay thế\n- `LIKE '%text%'` — dùng Full-Text Search\n\n**Best Practices:**\n- Dùng EXPLAIN ANALYZE kiểm tra kế hoạch\n- Index cho cột WHERE, JOIN, ORDER BY\n- Batch INSERT thay vì từng dòng\n- Connection pooling\n- Materialized Views cho query phức tạp\n\n**Monitoring:**\n- pg_stat_statements: thống kê query\n- slow_query_log: phát hiện query chậm",
        theoryEn: "**Anti-patterns to avoid:**\n- `SELECT *` — only fetch needed columns\n- `WHERE function(column) = value` — breaks index usage\n- `NOT IN` with subquery — use NOT EXISTS instead\n- `LIKE '%text%'` — use Full-Text Search\n\n**Best Practices:**\n- Use EXPLAIN ANALYZE to check plans\n- Index WHERE, JOIN, ORDER BY columns\n- Batch INSERT instead of row-by-row\n- Connection pooling\n- Materialized Views for complex queries\n\n**Monitoring:**\n- pg_stat_statements: query statistics\n- slow_query_log: detect slow queries",
        code: `-- Bad: SELECT *
SELECT * FROM orders; -- fetches all columns

-- Good: specific columns
SELECT student_id, amount FROM orders;

-- Bad: function in WHERE (no index usage)
SELECT * FROM students WHERE LOWER(name) = 'an';

-- Good: functional index or store normalized
CREATE INDEX idx_lower_name ON students(LOWER(name));

-- Bad: NOT IN with subquery
SELECT * FROM students
WHERE id NOT IN (SELECT student_id FROM orders);

-- Good: NOT EXISTS
SELECT s.* FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);

-- Materialized View for complex reports
CREATE MATERIALIZED VIEW student_report AS
SELECT s.name, COUNT(o.id) AS orders, SUM(o.amount) AS total
FROM students s
LEFT JOIN orders o ON s.id = o.student_id
GROUP BY s.name;

-- Refresh when needed
REFRESH MATERIALIZED VIEW student_report;`,
        codeLanguage: "sql",
        exercise: "Viết lại truy vấn sau cho tối ưu: SELECT * FROM orders WHERE YEAR(created_at) = 2024 AND student_id IN (SELECT id FROM students WHERE name LIKE '%An%');",
        exerciseEn: "Optimize this query: SELECT * FROM orders WHERE YEAR(created_at) = 2024 AND student_id IN (SELECT id FROM students WHERE name LIKE '%An%');",
        quiz: [
          { question: "Tại sao WHERE YEAR(col) = 2024 chậm?", options: ["YEAR() tốn RAM", "Hàm trên cột khiến index không dùng được", "2024 quá lớn", "WHERE chậm hơn HAVING"], answer: 1, explanation: "Áp dụng function lên cột khiến DB phải scan toàn bộ bảng vì không dùng được index. Thay bằng col >= '2024-01-01' AND col < '2025-01-01'." }
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
        theory: "**Recursive CTE:** Duyệt cấu trúc cây/đồ thị\n\n```sql\nWITH RECURSIVE cte AS (\n  -- Base case\n  SELECT id, name, manager_id, 1 AS level\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  -- Recursive step\n  SELECT e.id, e.name, e.manager_id, c.level + 1\n  FROM employees e\n  JOIN cte c ON e.manager_id = c.id\n)\nSELECT * FROM cte;\n```\n\n**JSON in PostgreSQL:**\n- `data->>'key'` — trích xuất text\n- `jsonb_array_elements()` — mở mảng JSON\n- `jsonb_agg()` — gom thành JSON array",
        theoryEn: "**Recursive CTE:** Traverse tree/graph structures\n\n**JSON in PostgreSQL:**\n- `data->>'key'` — extract text\n- `jsonb_array_elements()` — expand JSON array\n- `jsonb_agg()` — aggregate into JSON array",
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
SELECT n, n * n AS square FROM numbers;`,
        codeLanguage: "sql",
        exercise: "Viết Recursive CTE tạo dãy Fibonacci (1, 1, 2, 3, 5, 8, 13...) đến số thứ 15.",
        exerciseEn: "Write a Recursive CTE to generate Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) up to the 15th number.",
        quiz: [
          { question: "Recursive CTE cần gì để dừng?", options: ["LIMIT", "Điều kiện WHERE trong phần đệ quy", "BREAK statement", "Tự dừng sau 100 lần"], answer: 1, explanation: "Phần đệ quy cần điều kiện WHERE để dừng, nếu không sẽ lặp vô hạn (DB thường có giới hạn mặc định)." }
        ]
      }
    ]
  }
];

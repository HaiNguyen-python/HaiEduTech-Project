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
        theory: `**SELECT** is the most fundamental SQL statement — it is how you ask the database to return data. Every query you write will start with SELECT.

**Basic Syntax:**
\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

Think of it like ordering food at a restaurant: SELECT is *what you want* and FROM is *which menu (table)* you are reading from.

**Selecting All Columns:**
- \`SELECT * FROM students;\` — the asterisk (*) means "give me everything." While convenient for exploration, it is generally **bad practice in production** because it fetches unnecessary data and slows down performance.

**Selecting Specific Columns:**
- \`SELECT name, age FROM students;\` — only retrieves the columns you need. This is **best practice** because it reduces network transfer and makes your intent clear.

**Removing Duplicates with DISTINCT:**
- \`SELECT DISTINCT city FROM students;\` — returns only unique values. For example, if 10 students are from "Hanoi," it appears only once.
- \`SELECT DISTINCT city, age FROM students;\` — uniqueness is evaluated across **all listed columns** (combinations of city+age).

**Limiting Results with LIMIT:**
- \`SELECT * FROM students LIMIT 5;\` — returns only the first 5 rows. Essential for previewing large tables without loading millions of rows.
- In SQL Server, use \`TOP\` instead: \`SELECT TOP 5 * FROM students;\`
- In Oracle, use \`FETCH FIRST 5 ROWS ONLY\` or \`ROWNUM <= 5\`.

**Ordering Results with ORDER BY:**
- \`SELECT name, age FROM students ORDER BY age ASC;\` — ascending (smallest first, default).
- \`ORDER BY age DESC\` — descending (largest first).
- You can sort by multiple columns: \`ORDER BY city ASC, age DESC;\`

**OFFSET for Pagination:**
- \`SELECT * FROM students LIMIT 10 OFFSET 20;\` — skips the first 20 rows, then returns the next 10. This is how pagination works in web applications.

**Execution Order (important!):**
SQL does **not** execute in the order you write it. The actual execution order is:
1. FROM → 2. WHERE → 3. GROUP BY → 4. HAVING → 5. SELECT → 6. ORDER BY → 7. LIMIT

Understanding this order helps you debug queries and predict behavior.`,
        theoryEn: `**SELECT** is the most fundamental SQL statement — it is how you ask the database to return data. Every query you write will start with SELECT.

**Basic Syntax:**
\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

Think of it like ordering food at a restaurant: SELECT is *what you want* and FROM is *which menu (table)* you are reading from.

**Selecting All Columns:**
- \`SELECT * FROM students;\` — the asterisk (*) means "give me everything." While convenient for exploration, it is generally **bad practice in production** because it fetches unnecessary data and slows down performance.

**Selecting Specific Columns:**
- \`SELECT name, age FROM students;\` — only retrieves the columns you need. This is **best practice** because it reduces network transfer and makes your intent clear.

**Removing Duplicates with DISTINCT:**
- \`SELECT DISTINCT city FROM students;\` — returns only unique values. For example, if 10 students are from "Hanoi," it appears only once.
- \`SELECT DISTINCT city, age FROM students;\` — uniqueness is evaluated across **all listed columns** (combinations of city+age).

**Limiting Results with LIMIT:**
- \`SELECT * FROM students LIMIT 5;\` — returns only the first 5 rows. Essential for previewing large tables without loading millions of rows.
- In SQL Server, use \`TOP\` instead: \`SELECT TOP 5 * FROM students;\`
- In Oracle, use \`FETCH FIRST 5 ROWS ONLY\`.

**Ordering Results with ORDER BY:**
- \`SELECT name, age FROM students ORDER BY age ASC;\` — ascending (smallest first, default).
- \`ORDER BY age DESC\` — descending (largest first).

**OFFSET for Pagination:**
- \`SELECT * FROM students LIMIT 10 OFFSET 20;\` — skips 20 rows, returns next 10. This is how web pagination works.

**Execution Order:**
SQL does NOT execute in the order you write. Actual order:
1. FROM → 2. WHERE → 3. GROUP BY → 4. HAVING → 5. SELECT → 6. ORDER BY → 7. LIMIT`,
        code: `-- Retrieve all students
SELECT * FROM students;

-- Select specific columns
SELECT name, age FROM students;

-- Get unique values
SELECT DISTINCT age FROM students;

-- Limit results
SELECT * FROM students LIMIT 3;

-- Order and paginate
SELECT name, age FROM students
ORDER BY age DESC
LIMIT 5 OFFSET 10;`,
        codeLanguage: "sql",
        exercise: "Write a query to get names and emails of the first 5 students, sorted by name alphabetically.",
        exerciseEn: "Write a query to get names and emails of the first 5 students, sorted by name alphabetically.",
        testCases: [
          { input: "SELECT name, email FROM students ORDER BY name LIMIT 5;", expectedOutput: "5 rows", description: "Should return 5 rows with name and email columns" }
        ],
        solutionExplanation: "Use SELECT to pick columns (name, email), FROM to specify the table, ORDER BY name for alphabetical sorting, and LIMIT 5 to restrict output.",
        quiz: [
          { question: "What does SELECT * FROM students; return?", options: ["Only the first column", "All columns and all rows", "Only 10 rows", "An error"], answer: 1, explanation: "The * wildcard means all columns. Without WHERE or LIMIT, it returns every row in the table." },
          { question: "What is DISTINCT used for?", options: ["Sorting data", "Removing duplicate values", "Limiting rows", "Counting rows"], answer: 1, explanation: "DISTINCT removes rows with duplicate values from the result set." },
          { question: "What does LIMIT 10 OFFSET 20 do?", options: ["Returns rows 1-10", "Returns rows 11-20", "Skips 20 rows then returns 10", "Returns 20 rows"], answer: 2, explanation: "OFFSET 20 skips the first 20 rows, then LIMIT 10 returns the next 10 rows (rows 21-30)." },
          { question: "In SQL execution order, which runs first?", options: ["SELECT", "FROM", "ORDER BY", "LIMIT"], answer: 1, explanation: "FROM executes first — the database needs to know which table to read before it can do anything else." },
          { question: "Why is SELECT * considered bad practice in production?", options: ["It causes syntax errors", "It fetches unnecessary data and hurts performance", "It only works in MySQL", "It skips NULL values"], answer: 1, explanation: "SELECT * fetches all columns including ones you don't need, increasing network transfer and memory usage." }
        ]
      },
      {
        id: "sql-select-2",
        title: "AS & Alias",
        titleEn: "AS & Column Aliases",
        level: 1,
        difficulty: "beginner",
        theory: `**Aliases** let you rename columns or tables in your query results. They make output more readable and are essential for complex queries.

**Column Aliases — Renaming Output Columns:**
\`\`\`sql
SELECT name AS student_name, age AS student_age FROM students;
\`\`\`
The result headers will show "student_name" and "student_age" instead of "name" and "age." The keyword \`AS\` is optional — \`SELECT name student_name\` works too — but using \`AS\` is **best practice** for clarity.

**Why Use Aliases?**
1. **Readability:** \`total_revenue\` is clearer than \`SUM(price * quantity)\`
2. **Avoiding conflicts:** When JOINing tables that share column names
3. **Calculated columns:** Give meaningful names to expressions
4. **Requirement:** Some SQL dialects require aliases for subqueries in FROM

**Calculated Expressions:**
You can perform arithmetic directly in SELECT and alias the result:
\`\`\`sql
SELECT name, price, quantity, price * quantity AS total_cost FROM orders;
\`\`\`
Supported operators: \`+\` (add), \`-\` (subtract), \`*\` (multiply), \`/\` (divide), \`%\` (modulo).

**String Concatenation:**
Combine text values into a single column:
- PostgreSQL: \`SELECT first_name || ' ' || last_name AS full_name\`
- MySQL: \`SELECT CONCAT(first_name, ' ', last_name) AS full_name\`

**Table Aliases — Shortening Table Names:**
\`\`\`sql
SELECT s.name, s.age FROM students s;
-- or
SELECT s.name, s.age FROM students AS s;
\`\`\`
Table aliases are crucial when joining multiple tables — without them, queries become unreadable.

**Important Gotcha:** You **cannot** use a column alias in the WHERE clause of the same query because WHERE executes before SELECT. Use a subquery or CTE instead.`,
        theoryEn: `**Aliases** let you rename columns or tables in your query results. They make output more readable and are essential for complex queries.

**Column Aliases:** \`SELECT name AS student_name FROM students;\`
**Why?** Readability, avoiding conflicts, naming calculated columns.
**Calculated Expressions:** \`SELECT price * quantity AS total_cost FROM orders;\`
**String Concatenation:** \`SELECT first_name || ' ' || last_name AS full_name\`
**Table Aliases:** \`SELECT s.name FROM students s;\` — crucial for JOINs.
**Gotcha:** Cannot use column alias in WHERE (use subquery/CTE instead).`,
        code: `-- Column alias
SELECT name AS student_name, age AS student_age
FROM students;

-- Calculated column
SELECT name, age, age + 5 AS age_in_5_years
FROM students;

-- String concatenation
SELECT name || ' (Age: ' || age || ')' AS profile
FROM students;

-- Table alias (useful in JOINs)
SELECT s.name, s.age
FROM students s
WHERE s.age > 20;`,
        codeLanguage: "sql",
        exercise: "Create a query showing student names and their age in 10 years (column 'future_age').",
        exerciseEn: "Create a query showing student names and their age in 10 years (column 'future_age').",
        quiz: [
          { question: "What is the AS keyword used for?", options: ["Filtering data", "Creating an alias for a column or table", "Sorting", "Grouping data"], answer: 1, explanation: "AS creates an alias — an alternate name for a column or table in query results." },
          { question: "Can you use a column alias in the WHERE clause?", options: ["Yes, always", "No, because WHERE executes before SELECT", "Only in MySQL", "Only with numbers"], answer: 1, explanation: "WHERE executes before SELECT in SQL's execution order, so aliases defined in SELECT are not yet available." },
          { question: "What does SELECT price * quantity AS total FROM orders; produce?", options: ["An error", "A new column 'total' with the product of price and quantity", "It updates the table", "It creates a new table"], answer: 1, explanation: "It calculates price × quantity for each row and displays the result in a column named 'total'." },
          { question: "Why are table aliases important?", options: ["They make queries faster", "They shorten table names and avoid ambiguity in JOINs", "They are required by SQL", "They create new tables"], answer: 1, explanation: "Table aliases make JOINed queries readable and disambiguate columns that share names across tables." },
          { question: "What is the difference between 'SELECT name student_name' and 'SELECT name AS student_name'?", options: ["They produce different results", "They are identical — AS is optional", "The first one causes an error", "AS is required in PostgreSQL"], answer: 1, explanation: "Both are valid and produce the same result. AS is optional but recommended for clarity." }
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
        theory: `**WHERE** is how you filter rows in SQL — it is like a gatekeeper that only lets through rows meeting your conditions.

**Comparison Operators:**
| Operator | Meaning | Example |
|----------|---------|---------|
| = | Equal to | \`WHERE age = 20\` |
| <> or != | Not equal | \`WHERE status <> 'active'\` |
| < | Less than | \`WHERE price < 100\` |
| > | Greater than | \`WHERE score > 80\` |
| <= | Less than or equal | \`WHERE age <= 25\` |
| >= | Greater than or equal | \`WHERE rating >= 4.5\` |

**Logical Operators — Combining Conditions:**
- **AND:** Both conditions must be true → \`WHERE age > 18 AND city = 'Hanoi'\`
- **OR:** At least one must be true → \`WHERE city = 'Hanoi' OR city = 'HCMC'\`
- **NOT:** Negates a condition → \`WHERE NOT status = 'banned'\`
- **Operator Precedence:** AND binds tighter than OR. Use parentheses to be explicit: \`WHERE (age > 18 OR vip = true) AND active = true\`

**Special Operators:**

**IN** — checks if a value is in a list (replaces multiple OR):
\`\`\`sql
SELECT * FROM students WHERE city IN ('Hanoi', 'HCMC', 'Da Nang');
-- Equivalent to: city = 'Hanoi' OR city = 'HCMC' OR city = 'Da Nang'
\`\`\`

**BETWEEN** — inclusive range check:
\`\`\`sql
SELECT * FROM students WHERE age BETWEEN 18 AND 25;
-- Equivalent to: age >= 18 AND age <= 25
\`\`\`

**LIKE** — pattern matching with wildcards:
- \`%\` matches any sequence of characters (including empty)
- \`_\` matches exactly one character
| Pattern | Matches |
|---------|---------|
| \`'A%'\` | Starts with A: An, Alice, Abc |
| \`'%son'\` | Ends with son: Johnson, Wilson |
| \`'%an%'\` | Contains an: Daniel, Nancy, blank |
| \`'_an'\` | 3 chars ending in an: Dan, Van |
| \`'J__n'\` | 4 chars starting J ending n: John, Joan |

**IS NULL / IS NOT NULL:**
NULL is a special value meaning "unknown" or "missing." You **cannot** compare NULL with = because NULL is not a value — it represents absence.
- ❌ \`WHERE email = NULL\` — always returns false (even for NULL rows!)
- ✅ \`WHERE email IS NULL\` — correct way to check for NULL
- ✅ \`WHERE email IS NOT NULL\` — find rows that have a value`,
        theoryEn: `**WHERE** filters rows — it is like a gatekeeper that only lets through rows meeting your conditions.

**Comparison Operators:** =, <>, <, >, <=, >=
**Logical Operators:** AND (both true), OR (at least one), NOT (negates)
**Precedence:** AND binds tighter than OR — use parentheses.

**IN** — checks membership in a list (replaces multiple OR).
**BETWEEN** — inclusive range check (equivalent to >= AND <=).
**LIKE** — pattern matching: % = any chars, _ = one char.
**IS NULL** — correct way to check for NULL. Never use = NULL.`,
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
SELECT * FROM orders WHERE email IS NOT NULL;

-- Combining AND, OR with parentheses
SELECT * FROM students
WHERE (city = 'Hanoi' OR city = 'HCMC') AND age > 20;`,
        codeLanguage: "sql",
        exercise: "Filter students aged 18-22 whose names start with 'T'.",
        exerciseEn: "Filter students aged 18-22 whose names start with 'T'.",
        testCases: [
          { input: "SELECT * FROM students WHERE age BETWEEN 18 AND 22 AND name LIKE 'T%';", expectedOutput: "filtered rows", description: "Combined BETWEEN and LIKE" }
        ],
        quiz: [
          { question: "What does LIKE 'A%' match?", options: ["Contains the letter A", "Starts with A", "Ends with A", "Exactly the letter A"], answer: 1, explanation: "% is a wildcard matching any sequence. 'A%' means starts with A followed by anything." },
          { question: "Why does WHERE email = NULL not work?", options: ["Syntax error", "NULL is not a value so = always returns false", "It works fine", "NULL equals zero"], answer: 1, explanation: "NULL represents unknown. Any comparison with = returns NULL (not true), so no rows match. Use IS NULL instead." },
          { question: "What does BETWEEN 10 AND 20 include?", options: ["10 and 20 are excluded", "10 and 20 are both included", "Only 10 is included", "Only 20 is included"], answer: 1, explanation: "BETWEEN is inclusive on both ends — equivalent to >= 10 AND <= 20." },
          { question: "What is the result of: WHERE age > 18 OR city = 'HN' AND active = true?", options: ["(age > 18 OR city = 'HN') AND active = true", "age > 18 OR (city = 'HN' AND active = true)", "Syntax error", "Same as using parentheses"], answer: 1, explanation: "AND has higher precedence than OR, so it binds first: age > 18 OR (city = 'HN' AND active = true)." },
          { question: "What does the underscore _ match in LIKE?", options: ["Any number of characters", "Exactly one character", "A literal underscore", "Zero or one character"], answer: 1, explanation: "_ matches exactly one character. 'J__n' matches John, Joan (4 chars total)." }
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
        theory: `**Aggregate Functions** collapse many rows into a single summary value. They are the backbone of data analysis in SQL.

**The Five Core Aggregates:**

| Function | Purpose | Example |
|----------|---------|---------|
| COUNT(*) | Count all rows (including NULLs) | \`SELECT COUNT(*) FROM orders;\` |
| COUNT(column) | Count non-NULL values in a column | \`SELECT COUNT(email) FROM students;\` |
| SUM(column) | Total of numeric values | \`SELECT SUM(amount) FROM orders;\` |
| AVG(column) | Average of numeric values | \`SELECT AVG(score) FROM students;\` |
| MIN(column) | Smallest value | \`SELECT MIN(price) FROM products;\` |
| MAX(column) | Largest value | \`SELECT MAX(created_at) FROM orders;\` |

**Important:** AVG, SUM, MIN, MAX all **ignore NULL values**. COUNT(*) counts NULLs, but COUNT(column) does not.

**GROUP BY — Aggregating by Categories:**
GROUP BY divides rows into groups and applies the aggregate to each group separately. Think of it as "for each ___."

\`\`\`sql
SELECT city, COUNT(*) AS student_count, AVG(score) AS avg_score
FROM students
GROUP BY city;
\`\`\`
This gives you the count and average score **for each city**.

**Rule:** Every column in SELECT must either be inside an aggregate function or listed in GROUP BY. Otherwise, the database doesn't know which value to show for that column.

**HAVING — Filtering After Grouping:**
WHERE filters individual rows **before** grouping. HAVING filters groups **after** aggregation.

\`\`\`sql
SELECT city, COUNT(*) AS cnt
FROM students
GROUP BY city
HAVING COUNT(*) >= 3;
-- Only shows cities with 3 or more students
\`\`\`

**Common Mistake:** Using WHERE with aggregates → ❌ \`WHERE COUNT(*) > 5\` — this is invalid because WHERE runs before GROUP BY. Use HAVING instead.

**Combining WHERE and HAVING:**
\`\`\`sql
SELECT city, AVG(score) AS avg_score
FROM students
WHERE age >= 18          -- filter rows FIRST
GROUP BY city            -- then group
HAVING AVG(score) > 80;  -- then filter groups
\`\`\`

**DISTINCT Inside Aggregates:**
\`\`\`sql
SELECT COUNT(DISTINCT city) AS unique_cities FROM students;
-- Counts unique cities, not total rows
\`\`\``,
        theoryEn: `**Aggregate Functions** collapse many rows into one summary value.

**Core Functions:** COUNT, SUM, AVG, MIN, MAX. All ignore NULLs except COUNT(*).

**GROUP BY** divides rows into groups and applies aggregates per group. Every non-aggregated column in SELECT must be in GROUP BY.

**HAVING** filters groups after aggregation (WHERE filters rows before).

**Common Mistake:** Using WHERE with aggregates is invalid — use HAVING.
**DISTINCT in Aggregates:** \`COUNT(DISTINCT city)\` counts unique values.`,
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
HAVING COUNT(*) >= 2;

-- COUNT DISTINCT
SELECT COUNT(DISTINCT age) AS unique_ages FROM students;`,
        codeLanguage: "sql",
        exercise: "Count orders per customer_id, show only customers with >= 3 orders.",
        exerciseEn: "Count orders per customer_id, show only customers with >= 3 orders.",
        quiz: [
          { question: "What is the difference between HAVING and WHERE?", options: ["No difference", "HAVING filters after GROUP BY, WHERE filters before", "HAVING is faster", "WHERE is used for aggregates"], answer: 1, explanation: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation." },
          { question: "What is the difference between COUNT(*) and COUNT(column)?", options: ["They are identical", "COUNT(*) counts all rows including NULLs, COUNT(column) skips NULLs", "COUNT(column) is faster", "COUNT(*) only counts NULLs"], answer: 1, explanation: "COUNT(*) counts every row regardless of NULLs. COUNT(column) only counts rows where that column is not NULL." },
          { question: "Why is 'WHERE COUNT(*) > 5' invalid?", options: ["COUNT is not a function", "WHERE runs before GROUP BY so aggregates don't exist yet", "You need parentheses", "It's valid in MySQL"], answer: 1, explanation: "WHERE filters rows before grouping happens, so aggregate results are not yet available. Use HAVING instead." },
          { question: "What does AVG do with NULL values?", options: ["Treats them as 0", "Ignores them entirely", "Returns NULL", "Causes an error"], answer: 1, explanation: "AVG ignores NULLs — it sums non-NULL values and divides by the count of non-NULL values." },
          { question: "If you SELECT city, COUNT(*) FROM students without GROUP BY, what happens?", options: ["Returns all cities with counts", "Error: city must be in GROUP BY or aggregate", "Returns the first city", "Returns NULL"], answer: 1, explanation: "Non-aggregated columns (city) must appear in GROUP BY when using aggregate functions, otherwise most databases raise an error." }
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
        theory: `**JOINs** are the heart of relational databases — they let you combine data from multiple tables based on a related column.

**Why JOINs Matter:**
Instead of storing everything in one giant table (which leads to data duplication and inconsistency), relational databases split data into normalized tables. JOINs reconnect them at query time.

**INNER JOIN — The Intersection:**
Returns **only** rows that have matching values in **both** tables. If a student has no orders, that student does not appear. If an order has no matching student, that order does not appear.

\`\`\`sql
SELECT s.name, o.amount
FROM students s
INNER JOIN orders o ON s.id = o.student_id;
\`\`\`
The ON clause specifies the relationship. It is almost always a foreign key = primary key match.

**LEFT JOIN (LEFT OUTER JOIN) — All Left + Matching Right:**
Returns **all** rows from the left table, plus matching rows from the right table. When there is no match, right-side columns are filled with NULL.

\`\`\`sql
SELECT s.name, o.amount
FROM students s
LEFT JOIN orders o ON s.id = o.student_id;
\`\`\`
Students without orders will appear with NULL for o.amount.

**Common Pattern — Finding "Missing" Records:**
LEFT JOIN + WHERE right.id IS NULL finds rows that exist in the left table but NOT in the right table:
\`\`\`sql
SELECT s.name FROM students s
LEFT JOIN orders o ON s.id = o.student_id
WHERE o.id IS NULL;
-- Students who have never placed an order
\`\`\`

**RIGHT JOIN — Mirror of LEFT JOIN:**
Returns all rows from the **right** table plus matching from the left. In practice, you can always rewrite a RIGHT JOIN as a LEFT JOIN by swapping table order, so most developers prefer LEFT JOIN for consistency.

**FULL OUTER JOIN — Everything:**
Returns all rows from **both** tables. Non-matching rows get NULLs on the "other side."

**CROSS JOIN — Cartesian Product:**
Combines **every** row from table A with **every** row from table B. If A has 100 rows and B has 50, the result has 5,000 rows. Use carefully!
\`\`\`sql
SELECT s.name, c.course_name
FROM students s CROSS JOIN courses c;
\`\`\`

**Performance Tip:** Always JOIN on indexed columns. A JOIN on non-indexed columns forces the database to do a full table scan, which is extremely slow on large datasets.`,
        theoryEn: `**JOINs** combine data from multiple tables based on related columns.

**INNER JOIN:** Only matching rows from both tables.
**LEFT JOIN:** All left rows + matching right (NULLs for no match).
**RIGHT JOIN:** All right rows + matching left.
**FULL OUTER JOIN:** All rows from both tables.
**CROSS JOIN:** Every combination (Cartesian product).

**Finding missing records:** LEFT JOIN + WHERE right.id IS NULL.
**Performance:** Always JOIN on indexed columns.`,
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
        exercise: "Write a LEFT JOIN query showing all students and their total order amount (SUM). Students without orders show 0.",
        exerciseEn: "Write a LEFT JOIN query showing all students and their total order amount (SUM). Students without orders show 0.",
        quiz: [
          { question: "What does LEFT JOIN return when there is no matching row?", options: ["Skips that row", "NULL for right table columns", "An error", "0 for all columns"], answer: 1, explanation: "LEFT JOIN keeps all left table rows. When no match exists, right-side columns are filled with NULL." },
          { question: "How do you find rows with NO match using LEFT JOIN?", options: ["WHERE right.id = 0", "WHERE right.id IS NULL", "HAVING count = 0", "Not possible"], answer: 1, explanation: "LEFT JOIN + WHERE right_table.id IS NULL finds rows only in the left table." },
          { question: "If table A has 10 rows and table B has 5, how many rows does CROSS JOIN produce?", options: ["15", "10", "50", "5"], answer: 2, explanation: "CROSS JOIN produces the Cartesian product: every row of A × every row of B = 10 × 5 = 50 rows." },
          { question: "What is the difference between INNER JOIN and LEFT JOIN?", options: ["No difference", "INNER only returns matching rows; LEFT returns all from left table", "LEFT is faster", "INNER returns more rows"], answer: 1, explanation: "INNER JOIN only includes rows with matches in both tables. LEFT JOIN includes all left-table rows even without matches." },
          { question: "Why do most developers prefer LEFT JOIN over RIGHT JOIN?", options: ["LEFT JOIN is faster", "You can always rewrite RIGHT as LEFT by swapping tables, keeping consistent style", "RIGHT JOIN is deprecated", "They produce different results"], answer: 1, explanation: "A RIGHT JOIN on A,B is identical to a LEFT JOIN on B,A. Using LEFT JOIN consistently improves code readability." }
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
        theory: `**A Subquery** is a query nested inside another query. It is like asking a question to answer a bigger question. For example: "Find students older than the average" — you first need to calculate the average (subquery), then compare each student.

**Three Places to Use Subqueries:**

**1. In WHERE (most common):**
\`\`\`sql
SELECT * FROM students
WHERE age > (SELECT AVG(age) FROM students);
\`\`\`
The inner query returns a single value (the average), and the outer query uses it for comparison.

**Scalar Subquery:** Returns a single value (one row, one column). Used with =, >, <, etc.
**Multi-row Subquery:** Returns multiple values. Used with IN, ANY, ALL.
\`\`\`sql
SELECT * FROM students
WHERE id IN (SELECT student_id FROM orders WHERE amount > 100);
\`\`\`

**2. In FROM (Derived Table):**
The subquery acts as a temporary table:
\`\`\`sql
SELECT avg_by_city.city, avg_by_city.avg_score
FROM (
  SELECT city, AVG(score) AS avg_score
  FROM students GROUP BY city
) AS avg_by_city
WHERE avg_by_city.avg_score > 80;
\`\`\`
**Important:** Derived tables **must** have an alias (the AS avg_by_city part).

**3. In SELECT (Scalar Subquery):**
\`\`\`sql
SELECT name, score,
  (SELECT AVG(score) FROM students) AS class_avg,
  score - (SELECT AVG(score) FROM students) AS diff_from_avg
FROM students;
\`\`\`
Each row gets the same class average value appended as a column.

**Correlated Subquery — The Dependent Query:**
A correlated subquery references columns from the outer query. It runs **once per row** of the outer query, making it potentially slow.
\`\`\`sql
SELECT s.name, s.score
FROM students s
WHERE s.score > (
  SELECT AVG(s2.score) FROM students s2
  WHERE s2.city = s.city  -- references outer query's city
);
-- "Find students scoring above THEIR city's average"
\`\`\`

**EXISTS / NOT EXISTS:**
Tests whether a subquery returns **any rows at all** (doesn't care about the actual values):
\`\`\`sql
SELECT s.name FROM students s
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.student_id = s.id
);
-- "Find students who have placed at least one order"
\`\`\`
EXISTS is often **faster than IN** for large datasets because it stops as soon as it finds the first match.`,
        theoryEn: `**Subquery** — a query nested inside another query.

**In WHERE:** Scalar (single value) with =, >, <. Multi-row with IN, ANY, ALL.
**In FROM:** Derived table (must have alias).
**In SELECT:** Scalar subquery appended as a column.
**Correlated:** References outer query, runs per row — can be slow.
**EXISTS:** Tests if subquery returns any rows — faster than IN for large data.`,
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
);

-- Derived table
SELECT city_stats.city, city_stats.avg_age
FROM (
  SELECT age, COUNT(*) as cnt FROM students GROUP BY age
) AS city_stats;`,
        codeLanguage: "sql",
        exercise: "Find students whose total order amount is above the average total order amount across all students.",
        exerciseEn: "Find students whose total order amount is above the average total order amount across all students.",
        quiz: [
          { question: "How is a correlated subquery different from a regular subquery?", options: ["It is faster", "It references the outer query and runs per row", "It can only be used in SELECT", "No difference"], answer: 1, explanation: "A correlated subquery references columns from the outer query and executes once for each row of the outer query." },
          { question: "When is EXISTS better than IN?", options: ["Always", "When the subquery returns a large result set", "Never", "Only with NULLs"], answer: 1, explanation: "EXISTS stops at the first match and doesn't need to build the full result set, making it faster for large subqueries." },
          { question: "What does a scalar subquery return?", options: ["Multiple rows", "A single value (one row, one column)", "A table", "Nothing"], answer: 1, explanation: "A scalar subquery returns exactly one value — one row and one column. Used with =, >, <, etc." },
          { question: "Why must derived tables have an alias?", options: ["For performance", "SQL syntax requires a name to reference the temporary result", "It's optional", "Only in PostgreSQL"], answer: 1, explanation: "SQL requires an alias for derived tables so you can reference their columns in the outer query." },
          { question: "What is the risk of correlated subqueries?", options: ["They return wrong results", "They execute per row of the outer query, causing O(n²) performance", "They lock the database", "No risk"], answer: 1, explanation: "Correlated subqueries run once per outer row. With 1M rows, that is 1M sub-executions — very slow without optimization." }
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
        theory: `**CTE (Common Table Expression)** creates a named temporary result set that exists only within the scope of a single query. Think of it as giving a nickname to a subquery so you can reference it cleanly — sometimes multiple times.

**Basic Syntax:**
\`\`\`sql
WITH cte_name AS (
  SELECT ... -- your subquery
)
SELECT * FROM cte_name;
\`\`\`

**Why CTEs Are Better Than Subqueries:**
1. **Readability:** Complex queries become modular and top-down readable
2. **Reusability:** Reference the same CTE multiple times without repeating code
3. **Debugging:** Test each CTE independently by running it alone
4. **Recursion:** CTEs support recursive queries (subqueries do not)

**Multiple CTEs — Building Blocks:**
You can chain multiple CTEs separated by commas, and later CTEs can reference earlier ones:
\`\`\`sql
WITH
  step1 AS (
    SELECT student_id, SUM(amount) AS total
    FROM orders GROUP BY student_id
  ),
  step2 AS (
    SELECT s.name, s.city, step1.total
    FROM students s JOIN step1 ON s.id = step1.student_id
  ),
  step3 AS (
    SELECT city, AVG(total) AS avg_spend
    FROM step2 GROUP BY city
  )
SELECT * FROM step3 ORDER BY avg_spend DESC;
\`\`\`
Each step is a building block. You can read the query top-to-bottom like a recipe.

**CTE vs Temporary Table:**
| Feature | CTE | Temp Table |
|---------|-----|-----------|
| Scope | Single query only | Entire session |
| Storage | In-memory (usually) | On disk |
| Indexed | No | Yes |
| Best for | Readability, recursion | Large intermediate results reused across queries |

**CTE vs Subquery — When to Choose:**
- **Use CTE** when: the query is complex, you need to reference it multiple times, or you want recursion.
- **Use Subquery** when: the logic is simple and used only once.

**Performance Note:** In most databases, CTEs are **not materialized** — the database replaces them with inline subqueries during optimization. PostgreSQL 12+ allows \`MATERIALIZED\` / \`NOT MATERIALIZED\` hints.`,
        theoryEn: `**CTE (Common Table Expression)** — a named temporary result set within a single query.

**Advantages over Subqueries:** Readable, reusable, debuggable, supports recursion.
**Multiple CTEs:** Chain with commas; later CTEs can reference earlier ones.
**CTE vs Temp Table:** CTE is query-scoped and in-memory; temp tables persist across queries and can be indexed.
**Performance:** CTEs are usually not materialized (inlined as subqueries by the optimizer).`,
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
        exercise: "Use a CTE to create 'high_spenders' (students with total orders > 100), then JOIN with students to get names.",
        exerciseEn: "Use a CTE to create 'high_spenders' (students with total orders > 100), then JOIN with students to get names.",
        quiz: [
          { question: "Does a CTE persist after the query finishes?", options: ["Yes, stored permanently", "No, it only exists within the query", "Yes, if you use PERSIST", "Depends on the database"], answer: 1, explanation: "A CTE only exists for the duration of the query it is defined in. After execution, it disappears." },
          { question: "Can a CTE reference another CTE defined before it?", options: ["No, CTEs are independent", "Yes, later CTEs can reference earlier ones", "Only with special syntax", "Only in PostgreSQL"], answer: 1, explanation: "In a WITH clause with multiple CTEs, each subsequent CTE can reference any previously defined CTE." },
          { question: "What is the main advantage of CTE over a subquery in FROM?", options: ["CTEs are faster", "CTEs improve readability and can be referenced multiple times", "Subqueries cannot be used in FROM", "CTEs create permanent tables"], answer: 1, explanation: "CTEs make complex queries readable and allow you to reference the same result set multiple times without repeating code." },
          { question: "Are CTEs materialized by default in most databases?", options: ["Yes, always", "No, they are usually inlined as subqueries", "Only in MySQL", "Yes, but only for large results"], answer: 1, explanation: "Most databases inline CTEs as subqueries during optimization. PostgreSQL 12+ offers explicit MATERIALIZED hints." },
          { question: "When should you use a temporary table instead of a CTE?", options: ["Always", "When the intermediate result is large and reused across multiple queries", "Never", "When the query is simple"], answer: 1, explanation: "Temp tables persist across queries, can be indexed, and are better for large intermediate results reused multiple times." }
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
        theory: `**Window Functions** perform calculations across a set of rows that are related to the current row — **without collapsing them** like GROUP BY does. This is what makes them powerful: you get the detail AND the aggregate in the same result.

**Basic Syntax:**
\`\`\`sql
function_name() OVER (
  PARTITION BY column   -- optional: divide rows into groups
  ORDER BY column       -- optional: define order within groups
)
\`\`\`

**PARTITION BY vs GROUP BY:**
- GROUP BY collapses rows → 1 row per group
- PARTITION BY keeps all rows → adds a computed column
Think of PARTITION BY as "calculate separately for each group, but keep every row."

**Ranking Functions:**

| Function | Behavior for ties | Example: scores 95, 90, 90, 85 |
|----------|-------------------|--------------------------------|
| ROW_NUMBER() | Unique number, no ties | 1, 2, 3, 4 |
| RANK() | Same rank for ties, skips next | 1, 2, 2, 4 |
| DENSE_RANK() | Same rank for ties, no skip | 1, 2, 2, 3 |
| NTILE(n) | Divides into n equal groups | NTILE(2) → 1,1,2,2 |

**Analytic Functions:**

**LAG(column, n, default)** — looks back n rows:
\`\`\`sql
SELECT date, revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY date) AS prev_revenue,
  revenue - LAG(revenue, 1, 0) OVER (ORDER BY date) AS growth
FROM daily_sales;
\`\`\`

**LEAD(column, n, default)** — looks forward n rows.

**Running Totals / Moving Averages:**
\`\`\`sql
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) AS running_total,
  AVG(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS weekly_avg
FROM daily_sales;
\`\`\`

**Frame Specification (ROWS BETWEEN):**
Controls exactly which rows the window function considers:
- \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — from start to current (default for ORDER BY)
- \`ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING\` — 7-row sliding window
- \`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\` — all rows in partition

**Real-World Use Cases:**
1. **Top-N per group:** Find the top 3 products per category using ROW_NUMBER + PARTITION BY
2. **Year-over-year comparison:** Use LAG to compare this month vs same month last year
3. **Running totals:** Cumulative revenue by date
4. **Percentiles:** PERCENT_RANK() and CUME_DIST() for statistical analysis`,
        theoryEn: `**Window Functions** compute across related rows without collapsing them (unlike GROUP BY).

**Syntax:** \`function() OVER (PARTITION BY col ORDER BY col)\`
**PARTITION BY** divides into groups but keeps all rows.

**Ranking:** ROW_NUMBER (unique), RANK (ties skip), DENSE_RANK (ties no skip), NTILE.
**Analytic:** LAG (look back), LEAD (look forward).
**Frames:** ROWS BETWEEN controls which rows the function considers.
**Use cases:** Top-N per group, YoY comparison, running totals, percentiles.`,
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
        exercise: "Rank students by total spending (SUM amount) using DENSE_RANK.",
        exerciseEn: "Rank students by total spending (SUM amount) using DENSE_RANK.",
        quiz: [
          { question: "How do RANK() and DENSE_RANK() differ?", options: ["No difference", "RANK skips numbers after ties, DENSE_RANK does not", "DENSE_RANK is slower", "RANK only works with numbers"], answer: 1, explanation: "If two rows tie at rank 2, RANK gives the next row rank 4 (skips 3), DENSE_RANK gives it rank 3." },
          { question: "What does PARTITION BY do in a window function?", options: ["Filters rows", "Divides rows into groups without collapsing them", "Sorts results", "Limits output"], answer: 1, explanation: "PARTITION BY creates groups like GROUP BY but keeps all individual rows — the window function computes within each partition." },
          { question: "What does LAG(amount, 1) return for the first row?", options: ["0", "NULL (no previous row exists)", "The current row's value", "An error"], answer: 1, explanation: "For the first row there is no previous row, so LAG returns NULL by default. Use the third parameter for a default value." },
          { question: "How do you calculate a 7-day moving average?", options: ["AVG(col) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)", "AVG(col) GROUP BY week", "AVG(col) WHERE date > now() - 7", "AVG(col) OVER ()"], answer: 0, explanation: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW creates a sliding window of 7 rows (current + 6 previous)." },
          { question: "What is a common use case for ROW_NUMBER() + PARTITION BY?", options: ["Counting total rows", "Finding the top-N items per category", "Deleting duplicates", "Both B and C"], answer: 3, explanation: "ROW_NUMBER + PARTITION BY is used for top-N per group queries and deduplication (keep row_number = 1, delete the rest)." }
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
        theory: `**Indexes** are data structures that speed up data retrieval — like the index at the back of a textbook that tells you which page to turn to instead of reading every page.

**Without an Index:** The database performs a **Sequential Scan** (Seq Scan) — reading every single row in the table to find matches. For a table with 10 million rows, that means reading 10 million rows even if only 5 match.

**With an Index:** The database performs an **Index Scan** — jumping directly to the matching rows using the index structure. This is orders of magnitude faster.

**Types of Indexes:**

| Type | Best For | How It Works |
|------|----------|-------------|
| B-Tree (default) | =, <, >, <=, >=, BETWEEN, ORDER BY | Balanced tree; O(log n) lookup |
| Hash | = (exact match only) | Hash table; O(1) lookup but no range queries |
| GIN | Full-text search, arrays, JSONB | Inverted index; maps values to row IDs |
| GiST | Geometric data, full-text, range types | Generalized search tree |
| BRIN | Large tables with naturally ordered data | Block range; very small index size |

**Creating Indexes:**
\`\`\`sql
-- Single column index
CREATE INDEX idx_students_age ON students(age);

-- Composite index (column order matters!)
CREATE INDEX idx_orders_student_amount ON orders(student_id, amount);

-- Unique index (also enforces uniqueness)
CREATE UNIQUE INDEX idx_students_email ON students(email);

-- Partial index (only index active records)
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Expression index
CREATE INDEX idx_lower_name ON students(LOWER(name));
\`\`\`

**Composite Index — Column Order Matters:**
An index on (A, B, C) can be used for queries filtering on:
- A alone ✅
- A and B ✅
- A, B, and C ✅
- B alone ❌ (leftmost column must be present)
- C alone ❌

This is called the **leftmost prefix rule**.

**EXPLAIN ANALYZE — Your X-Ray Vision:**
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM students WHERE age > 20;
\`\`\`
Shows the query execution plan: which indexes are used, how many rows are scanned, and actual execution time. Key things to look for:
- **Seq Scan** → table scan, no index used (often slow)
- **Index Scan** → index is being used (fast)
- **Bitmap Index Scan** → combines multiple indexes
- **actual time** → real execution time in milliseconds
- **rows** → number of rows processed vs returned

**Trade-offs of Indexes:**
- ✅ Dramatically speed up SELECT queries
- ❌ Slow down INSERT, UPDATE, DELETE (index must be updated)
- ❌ Consume additional disk space
- **Rule of thumb:** Index columns that appear in WHERE, JOIN ON, and ORDER BY. Don't index columns that are rarely queried or frequently updated.`,
        theoryEn: `**Indexes** speed up queries like a textbook index speeds up finding pages.

**Types:** B-Tree (default, range queries), Hash (exact match), GIN (full-text/JSON), GiST (geometric), BRIN (large ordered tables).
**Composite indexes:** Column order follows the leftmost prefix rule.
**Partial indexes:** Only index rows matching a condition.
**EXPLAIN ANALYZE:** Shows query plan — look for Seq Scan (slow) vs Index Scan (fast).
**Trade-offs:** Faster reads, slower writes, more disk space.`,
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

-- Partial index
CREATE INDEX idx_active ON users(email)
WHERE active = true;

-- Drop index
DROP INDEX idx_students_age;`,
        codeLanguage: "sql",
        exercise: "Create an appropriate index for: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC;",
        exerciseEn: "Create an appropriate index for: SELECT * FROM orders WHERE student_id = 1 AND amount > 50 ORDER BY amount DESC;",
        quiz: [
          { question: "Which index type is best for range queries (BETWEEN, <, >)?", options: ["Hash", "B-Tree", "GIN", "BRIN"], answer: 1, explanation: "B-Tree indexes support range queries efficiently. Hash indexes only support exact equality (=)." },
          { question: "Can a composite index on (A, B) be used for a query filtering only on B?", options: ["Yes", "No, the leftmost column (A) must be present", "Only in MySQL", "Yes, but slower"], answer: 1, explanation: "The leftmost prefix rule requires the first column to be present. Index (A,B) works for A, or A+B, but not B alone." },
          { question: "What does 'Seq Scan' in EXPLAIN output mean?", options: ["An optimized scan", "A full table scan without using any index", "A sequential index scan", "An error"], answer: 1, explanation: "Seq Scan means the database reads every row in the table — the slowest scan type. Usually indicates a missing index." },
          { question: "What is a partial index?", options: ["An incomplete index", "An index that only covers rows matching a WHERE condition", "A half-built index", "An index on half the columns"], answer: 1, explanation: "A partial index only indexes rows that satisfy a condition (e.g., WHERE active = true), saving space and speeding up targeted queries." },
          { question: "What is the downside of having too many indexes?", options: ["Queries become slower", "INSERT/UPDATE/DELETE operations slow down", "The database crashes", "No downside"], answer: 1, explanation: "Every index must be updated on writes (INSERT/UPDATE/DELETE), so too many indexes degrade write performance and consume disk space." }
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
        theory: `**Database Design** is the art of structuring your data to minimize redundancy, ensure consistency, and optimize performance. A well-designed database saves you from endless bugs and maintenance headaches.

**Entity-Relationship Diagram (ERD):**
Before writing any SQL, you should sketch an ERD showing:
- **Entities** (tables): Students, Courses, Enrollments
- **Attributes** (columns): name, email, age
- **Relationships**: one-to-many, many-to-many

**Types of Keys:**

| Key Type | Purpose | Example |
|----------|---------|---------|
| PRIMARY KEY | Uniquely identifies each row | student_id |
| FOREIGN KEY | References a PK in another table | course_id → courses.id |
| UNIQUE | Ensures no duplicates in a column | email |
| COMPOSITE KEY | PK made of multiple columns | (student_id, course_id) |
| SURROGATE KEY | Auto-generated ID (no business meaning) | SERIAL, UUID |
| NATURAL KEY | Real-world identifier | SSN, ISBN |

**Normalization — Reducing Redundancy:**

**1NF (First Normal Form):**
- Each cell contains a single atomic value (no lists, no sets)
- ❌ hobbies: "reading, gaming, cooking"
- ✅ Separate hobbies table with one hobby per row

**2NF (Second Normal Form):**
- Must be in 1NF
- Every non-key column depends on the **entire** primary key (not just part of it)
- Only relevant for composite keys
- ❌ Table (student_id, course_id, student_name) → student_name depends only on student_id

**3NF (Third Normal Form):**
- Must be in 2NF
- No **transitive dependencies** — non-key columns should not depend on other non-key columns
- ❌ Table (id, city, zip_code, state) → state depends on zip_code, not on id
- ✅ Move zip_code → state to a separate table

**BCNF (Boyce-Codd Normal Form):**
- Stricter version of 3NF: every determinant must be a candidate key.

**Relationship Types:**
- **One-to-One:** User ↔ Profile (FK with UNIQUE constraint)
- **One-to-Many:** Department → Employees (FK on the "many" side)
- **Many-to-Many:** Students ↔ Courses (requires a junction/pivot table)

\`\`\`sql
-- Junction table for many-to-many
CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (student_id, course_id)
);
\`\`\`

**Denormalization — When to Break the Rules:**
In Data Warehouses and read-heavy systems, intentional redundancy can dramatically speed up queries. Examples: storing a user's name in the orders table to avoid JOINs, pre-computed aggregate columns, materialized views.

**Design Checklist:**
1. Every table has a clear PRIMARY KEY
2. No data duplication (same info in multiple places)
3. Foreign keys enforce referential integrity
4. Column types are appropriate (don't store dates as strings)
5. NULL vs NOT NULL is intentional for each column`,
        theoryEn: `**Database Design** structures data to minimize redundancy and ensure consistency.

**Keys:** PRIMARY (unique ID), FOREIGN (references), UNIQUE, COMPOSITE, SURROGATE, NATURAL.
**Normalization:** 1NF (atomic values), 2NF (full key dependency), 3NF (no transitive deps), BCNF.
**Relationships:** One-to-One, One-to-Many (FK on many side), Many-to-Many (junction table).
**Denormalization:** Intentional redundancy for read performance in warehouses.`,
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
        theory: `**Stored Functions** encapsulate reusable SQL logic on the database server. Instead of writing the same complex calculation in every query, you define it once and call it by name.

**Why Use Functions?**
1. **Code Reuse:** Define once, use everywhere
2. **Consistency:** All applications use the same logic
3. **Performance:** Reduce network round-trips (logic runs on DB server)
4. **Security:** Users call the function without needing access to underlying tables

**Creating a Function (PostgreSQL):**
\`\`\`sql
CREATE OR REPLACE FUNCTION get_grade(score INT)
RETURNS VARCHAR AS $$
BEGIN
  IF score >= 90 THEN RETURN 'A';
  ELSIF score >= 80 THEN RETURN 'B';
  ELSIF score >= 70 THEN RETURN 'C';
  ELSE RETURN 'F';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT name, get_grade(score) FROM students;
\`\`\`

**Function vs Procedure:**
| Feature | Function | Procedure |
|---------|----------|-----------|
| Returns a value | Yes (RETURNS type) | No (uses OUT params) |
| Use in SELECT | Yes | No |
| Transaction control | No | Yes (COMMIT/ROLLBACK inside) |
| Call syntax | SELECT func() | CALL proc() |

**Triggers — Automatic Event Handlers:**
A trigger fires automatically when a specific event occurs (INSERT, UPDATE, DELETE). You do NOT call triggers manually.

\`\`\`sql
-- Step 1: Create the trigger function
CREATE FUNCTION log_student_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log(table_name, action, old_data, new_data, changed_at)
  VALUES ('students', TG_OP, row_to_json(OLD), row_to_json(NEW), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Attach it to a table
CREATE TRIGGER trg_student_audit
AFTER UPDATE ON students
FOR EACH ROW EXECUTE FUNCTION log_student_changes();
\`\`\`

**Trigger Timing:**
- \`BEFORE\` — runs before the operation (can modify data)
- \`AFTER\` — runs after the operation (for logging, notifications)
- \`INSTEAD OF\` — replaces the operation (used on views)

**Special Variables in Triggers:**
- \`NEW\` — the new row (INSERT/UPDATE)
- \`OLD\` — the old row (UPDATE/DELETE)
- \`TG_OP\` — the operation type ('INSERT', 'UPDATE', 'DELETE')

**Transactions — All or Nothing:**
A transaction groups multiple operations into one atomic unit. Either ALL succeed, or ALL are rolled back.

\`\`\`sql
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- Both succeed
-- If any fails → ROLLBACK undoes everything
\`\`\`

**ACID Properties:**
- **Atomicity:** All or nothing
- **Consistency:** Database moves from one valid state to another
- **Isolation:** Concurrent transactions don't interfere
- **Durability:** Committed data survives crashes`,
        theoryEn: `**Functions** encapsulate reusable logic on the database server.
**Functions vs Procedures:** Functions return values and work in SELECT; procedures support transaction control.

**Triggers** fire automatically on INSERT/UPDATE/DELETE. Use BEFORE (modify data), AFTER (logging), or INSTEAD OF (views).
**Special vars:** NEW, OLD, TG_OP.

**Transactions** group operations atomically (all succeed or all rollback).
**ACID:** Atomicity, Consistency, Isolation, Durability.`,
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
        theory: `**Query Optimization** is the process of making your SQL queries run faster and use fewer resources. A poorly written query on a million-row table can take minutes; an optimized version can take milliseconds.

**The Optimization Process:**
1. **Identify** slow queries (pg_stat_statements, slow_query_log)
2. **Analyze** with EXPLAIN ANALYZE
3. **Optimize** (add indexes, rewrite query, restructure)
4. **Measure** to confirm improvement

**Common Anti-Patterns (and Fixes):**

**❌ SELECT * — Fetching everything:**
\`\`\`sql
-- Bad: fetches all columns
SELECT * FROM orders;
-- Good: only what you need
SELECT order_id, customer_id, amount FROM orders;
\`\`\`
Why it matters: A table might have 50 columns with BLOBs, but you only need 3.

**❌ Function on indexed column — Kills index usage:**
\`\`\`sql
-- Bad: database scans every row
SELECT * FROM students WHERE LOWER(name) = 'john';
-- Good: use expression index
CREATE INDEX idx_lower_name ON students(LOWER(name));
-- Or: store normalized data
SELECT * FROM students WHERE name_lower = 'john';

-- Bad: function on date
WHERE YEAR(created_at) = 2024
-- Good: range comparison
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'
\`\`\`

**❌ NOT IN with NULLs — Silent data loss:**
\`\`\`sql
-- Bad: returns no rows if subquery contains NULL!
SELECT * FROM students WHERE id NOT IN (SELECT student_id FROM orders);
-- Good: NULL-safe alternative
SELECT s.* FROM students s
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.student_id = s.id);
\`\`\`

**❌ N+1 Query Problem:**
Running a query in a loop (1 query for the list + N queries for details). Solution: use JOINs or batch queries.

**Performance Tools:**

**Materialized Views** — Pre-computed query results:
\`\`\`sql
CREATE MATERIALIZED VIEW monthly_report AS
SELECT date_trunc('month', created_at) AS month, SUM(amount)
FROM orders GROUP BY 1;
-- Refresh periodically
REFRESH MATERIALIZED VIEW monthly_report;
\`\`\`

**Connection Pooling:** Tools like PgBouncer manage a pool of reusable database connections instead of creating a new connection per request (expensive: ~50ms per connection).

**Batch Operations:**
\`\`\`sql
-- Bad: 1000 individual INSERTs (1000 round-trips)
INSERT INTO logs VALUES (1, 'a');
INSERT INTO logs VALUES (2, 'b');
...
-- Good: single multi-row INSERT (1 round-trip)
INSERT INTO logs VALUES (1, 'a'), (2, 'b'), ..., (1000, 'zzz');
\`\`\`

**Monitoring Key Metrics:**
- **pg_stat_statements**: tracks query execution statistics (total time, calls, rows)
- **pg_stat_user_tables**: table-level stats (seq scans, index scans, dead tuples)
- **Cache hit ratio**: should be > 99% → \`SELECT sum(heap_blks_hit) / sum(heap_blks_hit + heap_blks_read) FROM pg_statio_user_tables;\``,
        theoryEn: `**Query Optimization** makes queries faster with fewer resources.

**Anti-patterns:** SELECT *, functions on indexed columns, NOT IN with NULLs, N+1 queries.
**Tools:** EXPLAIN ANALYZE, Materialized Views, Connection Pooling, Batch operations.
**Monitoring:** pg_stat_statements, cache hit ratio, slow query log.`,
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
        theory: `**Recursive CTEs** allow you to traverse hierarchical or graph-like data structures — things like organizational charts, category trees, bill-of-materials, and network paths.

**Structure of a Recursive CTE:**
\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- Base Case (anchor): starting point
  SELECT id, name, manager_id, 1 AS depth
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive Case: joins back to the CTE itself
  SELECT e.id, e.name, e.manager_id, cte.depth + 1
  FROM employees e
  JOIN cte_name cte ON e.manager_id = cte.id
)
SELECT * FROM cte_name;
\`\`\`

**How It Works (step by step):**
1. Execute the **base case** → produces initial rows (e.g., the CEO)
2. Execute the **recursive case** using the previous iteration's rows → finds direct reports
3. Repeat step 2 until no new rows are produced
4. Combine all iterations into the final result

**Safety:** Most databases have a recursion limit (default ~100-1000 iterations) to prevent infinite loops. PostgreSQL: set \`max_recursion_depth\`.

**Use Cases for Recursive CTEs:**
- **Organizational hierarchy:** Find all reports under a manager
- **Category trees:** E-commerce product categories
- **Graph traversal:** Find shortest path, connected components
- **Number generation:** Generate sequences without a dedicated table
- **Bill of Materials:** Manufacturing component trees

**Building a Path:**
\`\`\`sql
WITH RECURSIVE org AS (
  SELECT id, name, name::TEXT AS path, 1 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, org.path || ' → ' || e.name, org.depth + 1
  FROM employees e JOIN org ON e.manager_id = org.id
)
SELECT depth, path FROM org ORDER BY path;
-- Output: CEO → VP Sales → Regional Manager → Sales Rep
\`\`\`

**JSON Operations in PostgreSQL:**
Modern applications store semi-structured data as JSON. PostgreSQL has first-class JSON support:

**Operators:**
| Operator | Description | Example |
|----------|-------------|---------|
| \`->\` | Get JSON element (as JSON) | \`data->'name'\` |
| \`->>\` | Get JSON element (as text) | \`data->>'name'\` |
| \`#>\` | Get nested element (path) | \`data#>'{address,city}'\` |
| \`@>\` | Contains (for indexing) | \`data @> '{"role":"admin"}'\` |

**Functions:**
- \`jsonb_array_elements()\` — expand a JSON array into rows
- \`jsonb_agg()\` — aggregate rows into a JSON array
- \`jsonb_build_object()\` — construct JSON from key-value pairs
- \`jsonb_set()\` — update a value within a JSON document

**Indexing JSON:** Use GIN indexes for fast JSON containment queries:
\`\`\`sql
CREATE INDEX idx_data ON events USING GIN (data);
SELECT * FROM events WHERE data @> '{"type": "click"}';
\`\`\`

**PIVOT / CROSSTAB:**
Transform rows into columns (useful for reports):
\`\`\`sql
-- Using conditional aggregation (works everywhere)
SELECT student_id,
  SUM(CASE WHEN subject = 'Math' THEN score END) AS math,
  SUM(CASE WHEN subject = 'English' THEN score END) AS english,
  SUM(CASE WHEN subject = 'Science' THEN score END) AS science
FROM grades GROUP BY student_id;
\`\`\``,
        theoryEn: `**Recursive CTEs** traverse hierarchies: base case + recursive case + UNION ALL.
**Use cases:** Org charts, category trees, graph traversal, number generation.
**Safety:** Recursion limits prevent infinite loops.

**JSON in PostgreSQL:** -> (as JSON), ->> (as text), @> (contains). GIN indexes for fast queries.
**Pivot:** Use conditional aggregation (CASE WHEN) to transform rows into columns.`,
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

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
        theory: `**SELECT** is the most fundamental SQL statement — it is how you ask the database to return data. Every analytical query, every dashboard, every ML feature pipeline starts here. Mastering the semantics of SELECT pays off for the rest of your career.

## Why this matters

Even staff-level data engineers write SELECT every day. The difference between a beginner and a senior is *not* the keyword — it is knowing when \`SELECT *\` is a $700 mistake (covered later) and when \`DISTINCT\` silently hides a data-quality issue. Get the foundations right and the rest of SQL is paint on the walls.

## Basic syntax

\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

Mental model: SELECT = *what you want*, FROM = *where to read it from*. Like ordering food: "give me the soup and salad (SELECT) from the lunch menu (FROM)."

## Selecting columns — \`*\` vs explicit

- \`SELECT * FROM students;\` — every column. Convenient for exploration, **dangerous in production**: schema changes silently break downstream code, and on a wide table you fetch megabytes you don't use.
- \`SELECT name, age FROM students;\` — only what you need. **Always preferred** in shipped code.

## DISTINCT — careful with it

\`SELECT DISTINCT city FROM students;\` returns each city once. \`SELECT DISTINCT city, age FROM students;\` evaluates uniqueness across the *combination*. Use sparingly — DISTINCT often masks a deduplication problem you should fix at the source instead.

## LIMIT, OFFSET, and pagination

| Dialect | Syntax |
|---|---|
| Postgres / MySQL / SQLite | \`LIMIT 10 OFFSET 20\` |
| SQL Server | \`OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY\` (or \`TOP 10\`) |
| Oracle | \`FETCH FIRST 10 ROWS ONLY\` |

OFFSET-based pagination is fine for small datasets but becomes slow on big tables (the database must scan all skipped rows). Production APIs usually switch to **keyset pagination** (\`WHERE id > last_seen_id ORDER BY id LIMIT 10\`).

## ORDER BY — and the always-needs-a-tiebreaker rule

\`ORDER BY age DESC\` works, but if multiple rows share the same age, the order *between them* is undefined. For deterministic results — especially with LIMIT — always include a tiebreaker: \`ORDER BY age DESC, id ASC\`.

## Logical execution order — the most useful trick

You write SQL in this order: \`SELECT … FROM … WHERE … GROUP BY … ORDER BY … LIMIT\`.
SQL *runs* it in this order:

\`\`\`
1. FROM      (which table)
2. WHERE     (filter rows)
3. GROUP BY  (collapse into groups)
4. HAVING    (filter groups)
5. SELECT    (compute output columns)
6. ORDER BY  (sort)
7. LIMIT     (cut)
\`\`\`

This is why you cannot reference a SELECT alias in WHERE (SELECT runs *after* WHERE) but you *can* reference it in ORDER BY (which runs after).

## Case study & best practices

The famous BigQuery \`SELECT *\` story: a junior analyst at a startup ran \`SELECT *\` against a 70 TB partitioned table without a partition filter. BigQuery scanned the whole table at $5/TB. Two runs cost $700. Modern teams now block unfiltered \`SELECT *\` at the warehouse level.

**Best practices**: prefer explicit columns; always pair \`ORDER BY\` with a tiebreaker when using \`LIMIT\`; never use \`SELECT *\` in shipped views; understand logical execution order before debugging anything else.

## Bridge to next lesson

Now that you can shape *what* and *how many* rows come back, the next step is **AS / Aliases** — making your output and joins readable when queries grow beyond a single table.`,
        theoryEn: `**SELECT** is the foundation of every SQL query. Mastery here pays off for life.

## Why this matters

Senior engineers still write SELECT every day. The difference is judgment: when \`*\` is a $700 mistake, when \`DISTINCT\` masks a real bug.

## Basic syntax

\`SELECT cols FROM table;\` — what you want, where to read it.

## \`*\` vs explicit columns

\`SELECT *\` is fine for exploration, dangerous in production (schema breaks, wasted bytes). Always prefer explicit columns in shipped code.

## DISTINCT

Use sparingly. Often hides a duplicate-data bug that should be fixed at the source.

## LIMIT / OFFSET / pagination

| Dialect | Syntax |
|---|---|
| Postgres/MySQL | \`LIMIT 10 OFFSET 20\` |
| SQL Server | \`OFFSET … FETCH NEXT …\` / \`TOP\` |
| Oracle | \`FETCH FIRST … ROWS ONLY\` |

OFFSET is slow on big tables → switch to keyset pagination.

## ORDER BY needs a tiebreaker

\`ORDER BY age DESC\` is non-deterministic on ties. Always add \`, id ASC\` when using LIMIT.

## Logical execution order

\`FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT\`.

This is why aliases work in ORDER BY but not WHERE.

## Case study & best practices

BigQuery \`SELECT *\` on 70 TB → $700. Block unfiltered \`*\` at warehouse level. Always: explicit columns, tiebreakers, no \`SELECT *\` in views.

## Bridge

Next: **AS / Aliases** — keeping output and joins readable.`,
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
        theory: `An **alias** renames a column or table inside a query. Two characters of syntax, but they are the difference between a query a teammate can read in 5 seconds and one that takes 5 minutes to understand.

## Why this matters

In production warehouses with 80-column wide tables and 6-table joins, *readability is not a nice-to-have — it is how you avoid bugs*. Every senior reviewer rejects PRs whose SELECT lists look like \`f.amount, c.name, p.title, s.region\`. Good aliases turn that into prose: \`o.total_amount AS revenue, cust.full_name AS customer\`.

## Column aliases

\`\`\`sql
SELECT
  full_name AS customer,
  total_amount AS revenue
FROM orders;
\`\`\`

The \`AS\` keyword is optional in most dialects — \`full_name customer\` works — but **always write \`AS\` explicitly**. It signals intent and prevents typos like \`SELECT name email FROM users\` (which silently aliases \`name\` to \`email\`!).

Aliases with spaces or reserved words need quoting:

- ANSI / Postgres / Snowflake: \`"Customer Name"\`
- MySQL: \`\\\`Customer Name\\\`\`
- SQL Server: \`[Customer Name]\`

## Table aliases

\`\`\`sql
SELECT o.id, c.name
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
\`\`\`

Conventions that scale:

- 1–3 letter aliases for joined tables (\`o\`, \`c\`, \`p\`).
- Use the *initial* of the table — \`orders\` → \`o\`, never \`x\`.
- For self-joins use \`a\` / \`b\` or \`mgr\` / \`emp\`.

## Aliases & execution order — the SELECT trap

You **cannot** use a column alias in WHERE because SELECT runs *after* WHERE:

\`\`\`sql
-- ❌ ERROR
SELECT amount * 1.1 AS gross
FROM orders
WHERE gross > 100;

-- ✅ Works (alias allowed in ORDER BY)
SELECT amount * 1.1 AS gross
FROM orders
ORDER BY gross DESC;
\`\`\`

Workarounds: repeat the expression in WHERE, or wrap in a subquery / CTE.

## Comparison — quoting rules across dialects

| Need | Postgres / Snowflake | MySQL | SQL Server |
|---|---|---|---|
| Reserved word as alias | \`"order"\` | \`\\\`order\\\`\` | \`[order]\` |
| Case-sensitive identifier | \`"Name"\` (case-sensitive!) | depends on collation | depends on collation |
| Standard "I just want a label" | \`AS revenue\` | \`AS revenue\` | \`AS revenue\` |

Postgres treating \`"Name"\` as case-sensitive but \`Name\` as lowercase has caused millions of dollars in confusion. **Stick to lowercase snake_case identifiers** and you avoid every quoting headache.

## When aliases are mandatory

- **Subqueries in FROM** — Postgres and MySQL require it: \`FROM (SELECT …) AS sub\`.
- **Computed columns** that need a name (\`COUNT(*) AS order_count\`).
- **Self-joins** — both copies of the table need distinct aliases.
- **CTEs** — the CTE name itself acts as a table alias.

## Case study — the "f, c, p, s" code review

A real PR (told on the dbt Slack) had a 40-line SELECT joining 7 tables, all aliased \`a\` through \`g\`. Reviewers spent an hour decoding which alphabet letter was which entity. The author rewrote it with descriptive 3-letter aliases (\`ord\`, \`cust\`, \`prd\`, \`stg\`) — review took 3 minutes. The diff was identical in execution; the difference was purely human.

## Best practices

- Always use \`AS\` explicitly for column aliases.
- Use lowercase snake_case identifiers and avoid quoting altogether.
- Pick aliases from the table name's initials, not random letters.
- One alias = one entity, used consistently for the entire file.
- In dbt models, alias the SELECT list to *exactly* the names downstream consumers should see.

## Anti-patterns & next lesson

Avoid: \`SELECT a.*, b.*, c.*\` from joined tables (column collisions); single-letter aliases unrelated to table names; mixing case styles (\`customerName\` and \`customer_name\` in the same file).

Next: **WHERE & filtering** — narrowing down rows before they ever reach SELECT.`,
        theoryEn: `An **alias** renames a column or table. Two-character syntax, huge readability win.

## Why this matters

In wide tables with 6-way joins, readability is a bug-prevention tool, not a luxury.

## Column aliases

\`SELECT full_name AS customer FROM orders;\` — always write \`AS\` explicitly to signal intent and avoid silent-alias bugs.

## Table aliases

\`FROM orders AS o JOIN customers AS c …\`. Use 1–3 letter initials of the table name; never random letters.

## Alias & execution order

You **cannot** use an alias in WHERE (SELECT runs after WHERE). You **can** in ORDER BY.

## Quoting across dialects

| Dialect | Reserved word alias |
|---|---|
| Postgres/Snowflake | \`"order"\` (case-sensitive!) |
| MySQL | \`\\\`order\\\`\` |
| SQL Server | \`[order]\` |

Stick to lowercase snake_case → no quoting headaches.

## Mandatory cases

Subqueries in FROM, computed columns, self-joins, CTEs.

## Case study — alphabet aliases

A 7-table join aliased \`a\`–\`g\` took an hour to review. Renamed to descriptive 3-letter aliases → 3 minutes. Same execution, different humans.

## Best practices

Explicit \`AS\`; lowercase snake_case; initials of table; one alias per entity; in dbt, alias to consumer-facing names.

## Anti-patterns & next

Avoid \`SELECT a.*, b.*\` from joins, single-letter aliases unrelated to tables. Next: **WHERE & filtering**.`,
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
        theory: `**WHERE** is how you go from "all the data" to "the data I actually care about." It runs *before* SELECT, *before* GROUP BY — so it is also the single biggest lever you have on query performance.

## Why this matters

A bad WHERE clause is the #1 source of slow queries in production warehouses. Forgetting a partition filter on a 10 TB table can turn a 3-second query into a 30-minute one (and a $50 BigQuery bill into a $50 one). Mastering WHERE is mastering performance.

## Comparison operators

\`=\`, \`!=\` (\`<>\`), \`<\`, \`<=\`, \`>\`, \`>=\`. Standard across all dialects. The subtle one: \`<>\` is the ANSI-standard "not equal" — both work, prefer one consistently.

## Combining with AND, OR, NOT

\`\`\`sql
SELECT * FROM orders
WHERE status = 'paid'
  AND amount > 100
  AND (region = 'EU' OR region = 'US');
\`\`\`

**Operator precedence**: \`NOT > AND > OR\`. When mixing AND and OR, **always parenthesize** — relying on precedence is a recipe for subtle bugs that pass review and break in prod.

## IN, BETWEEN, LIKE — the workhorses

| Operator | Use case | Example |
|---|---|---|
| \`IN\` | Multiple discrete values | \`region IN ('EU','US','APAC')\` |
| \`BETWEEN\` | Inclusive range | \`amount BETWEEN 100 AND 500\` |
| \`LIKE\` | Pattern match | \`email LIKE '%@gmail.com'\` |
| \`ILIKE\` (Postgres) | Case-insensitive LIKE | \`name ILIKE 'an%'\` |

\`BETWEEN\` is **inclusive on both ends** — \`BETWEEN 1 AND 10\` includes 1 and 10. Forgetting this off-by-one has caused real revenue-attribution bugs.

\`LIKE\` wildcards: \`%\` = any sequence, \`_\` = exactly one character. Anchored prefix patterns (\`'an%'\`) can use indexes; leading-wildcard patterns (\`'%an'\`) cannot — they always full-scan.

## NULL — the silent killer

\`NULL\` means "unknown," not "empty." This breaks intuition:

\`\`\`sql
WHERE age = NULL    -- ❌ never matches anything
WHERE age IS NULL   -- ✅ correct
WHERE age <> 30     -- ❌ excludes NULLs too! (because NULL <> 30 is "unknown")
\`\`\`

The 3-valued logic (\`TRUE / FALSE / UNKNOWN\`) is the single most surprising thing in SQL for beginners. The fix is mechanical: any time a column is nullable, explicitly handle NULL with \`IS NULL\` / \`IS NOT NULL\` / \`COALESCE\`.

## Comparison: WHERE vs HAVING

| Aspect | WHERE | HAVING |
|---|---|---|
| Runs | Before GROUP BY | After GROUP BY |
| Operates on | Individual rows | Aggregated groups |
| Can use aggregate? | ❌ No | ✅ Yes |
| Performance | Faster (fewer rows enter group) | Slower |

Rule of thumb: **filter as early as possible** — push every condition you can into WHERE, leave only group-level conditions for HAVING.

## Performance — sargable predicates

A predicate is **sargable** ("Search ARGument-able") if the database can use an index for it. The big rule: **don't wrap the indexed column in a function**.

\`\`\`sql
-- ❌ Not sargable — function on indexed column
WHERE DATE(created_at) = '2024-01-15'

-- ✅ Sargable — function on the literal instead
WHERE created_at >= '2024-01-15' AND created_at < '2024-01-16'
\`\`\`

The first version full-scans every row to compute \`DATE(created_at)\`; the second uses the index on \`created_at\`. On a 100 M-row table the difference is *minutes vs milliseconds*.

## Case study — the "missing partition filter" incident

A real story from a Snowflake-using e-commerce: an analyst wrote \`WHERE event_type = 'purchase'\` on the events table — *but forgot to add a date filter*. The table was partitioned by date but had 4 years of history. Each query scanned 4 years (~8 TB), at $40/TB. The dashboard ran every 15 minutes from a BI tool. The team noticed when the warehouse bill jumped $12,000 in three days. Fix: a single line — \`AND event_date >= current_date - 30\`.

## Best practices

- **Always include a partition filter** on partitioned tables — make it part of your code-review checklist.
- **Parenthesize AND/OR mixes** explicitly.
- **Treat NULL as a third state** every time the column is nullable.
- **Keep predicates sargable** — function on the literal, never on the column.
- **Filter early** — push down into WHERE rather than HAVING when possible.
- **Use \`= ANY(array)\` over long IN lists** in Postgres for cleaner planning.

## Anti-patterns & next lesson

Avoid: \`column = NULL\`; mixing AND/OR without parens; \`UPPER(email) = 'X'\` on indexed columns; relying on implicit type casts in WHERE (\`WHERE id = '42'\` when id is INTEGER).

Next: **Aggregate functions** — once you have the right rows, how do you summarize them?`,
        theoryEn: `**WHERE** filters rows before SELECT runs. The biggest lever on performance.

## Why this matters

Bad WHERE is the #1 source of slow queries. Missing a partition filter on a 10 TB table = 30 minutes + $50 instead of 3 seconds + cents.

## Operators

\`=, <>, <, <=, >, >=\` standard everywhere. \`<>\` is ANSI for "not equal."

## AND / OR / NOT

Precedence: \`NOT > AND > OR\`. Always parenthesize mixes.

## IN / BETWEEN / LIKE

| Operator | Use |
|---|---|
| IN | discrete values |
| BETWEEN | inclusive range |
| LIKE | pattern (\`%\`, \`_\`) |
| ILIKE | case-insensitive (Postgres) |

\`BETWEEN\` is inclusive on both ends. Leading-wildcard LIKE can't use indexes.

## NULL — three-valued logic

\`= NULL\` never matches; use \`IS NULL\`. \`<> 30\` *excludes* NULLs too. Always handle nullable columns with \`IS NULL\` / \`COALESCE\`.

## WHERE vs HAVING

| Aspect | WHERE | HAVING |
|---|---|---|
| Runs | Before GROUP BY | After |
| On | Rows | Groups |
| Aggregates? | No | Yes |

Filter as early as possible.

## Sargable predicates

Don't wrap indexed columns in functions:

- ❌ \`DATE(created_at) = '2024-01-15'\`
- ✅ \`created_at >= '2024-01-15' AND created_at < '2024-01-16'\`

## Case study — missing partition filter

Snowflake events table, 4 years of history, no date filter, BI dashboard polling every 15 min → +$12k in 3 days. Fix: one line.

## Best practices

Always partition filter; parenthesize AND/OR; treat NULL as third state; sargable predicates; filter early.

## Anti-patterns & next

Avoid \`= NULL\`, missing parens, function-on-column, implicit casts. Next: **Aggregate functions**.`,
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
        theory: `**Aggregate functions** collapse many rows into a single value: a count, a sum, an average. They are how raw event data becomes business metrics. Every dashboard you've ever seen is, ultimately, a series of aggregate queries dressed up with charts.

## Why this matters

A staggering share of analytical bugs come from aggregate-function misunderstandings: COUNT including NULLs, AVG silently dividing by the wrong denominator, GROUP BY missing a column. Getting the aggregation rules right is the difference between trustworthy and "we'll need to recompute that."

## The five core aggregates

| Function | Returns | Ignores NULL? |
|---|---|---|
| \`COUNT(*)\` | All rows including NULL-only rows | No |
| \`COUNT(col)\` | Rows where col IS NOT NULL | **Yes** |
| \`COUNT(DISTINCT col)\` | Distinct non-NULL values | Yes |
| \`SUM(col)\` | Sum of non-NULL values | Yes |
| \`AVG(col)\` | Sum / count of non-NULL | Yes |
| \`MIN(col)\`, \`MAX(col)\` | Smallest / largest non-NULL | Yes |

The most common bug: writing \`AVG(rating)\` and forgetting that NULLs are excluded — you average over the *responders only*, not all customers. If you wanted "average rating including unanswered as zero," you must \`COALESCE(rating, 0)\` first.

## GROUP BY — the partner

\`\`\`sql
SELECT region, COUNT(*) AS orders, SUM(amount) AS revenue
FROM fact_sales
GROUP BY region;
\`\`\`

Rule: every column in SELECT must either be (a) inside an aggregate, or (b) listed in GROUP BY. Postgres / ANSI enforces this; older MySQL silently picked an arbitrary value, which caused decades of bugs (now fixed by default).

GROUP BY can take expressions: \`GROUP BY date_trunc('month', created_at)\`.

## HAVING — filtering on aggregates

\`HAVING\` runs *after* GROUP BY, so it can reference aggregate functions.

\`\`\`sql
SELECT region, SUM(amount) AS revenue
FROM fact_sales
GROUP BY region
HAVING SUM(amount) > 100000;
\`\`\`

Mental model: WHERE filters rows, HAVING filters *groups*.

## Comparison — WHERE, GROUP BY, HAVING

| Stage | Operates on | Can reference |
|---|---|---|
| WHERE | Individual rows | Columns only |
| GROUP BY | Rows → groups | Columns or expressions |
| HAVING | Groups | Aggregates + grouped columns |

Always push filters as early as possible: \`WHERE region = 'EU'\` before grouping is much faster than \`HAVING region = 'EU'\` after.

## Distinct counting — beware the cost

\`COUNT(DISTINCT user_id)\` is **expensive** at scale because the engine must keep every distinct value in memory. On a billion-row table, this can blow up RAM. Modern warehouses offer **approximate** versions:

- BigQuery: \`APPROX_COUNT_DISTINCT(user_id)\`
- Snowflake: \`APPROX_COUNT_DISTINCT(user_id)\`
- Postgres: \`hll_count_distinct(...)\` (HyperLogLog extension)

Approximate is ~1% off but uses constant memory. For dashboards that don't need to-the-exact-user precision, it is the right default.

## Case study — the "average that lied"

A SaaS company published an "average customer rating" of 4.6/5 in their pitch deck. The number came from \`AVG(rating) FROM reviews\`. What it *actually* measured: the average among customers who had bothered to leave a review (~5% of users). When an investor asked for "average rating across all paying customers" (with non-responders treated as missing), the real number — using a churn-weighted estimate — was 3.2/5. The lesson: **always state your denominator** explicitly when reporting an average.

## Case study — the GROUP BY ambiguity outage

A team migrated from MySQL (lenient mode) to Postgres. A query like \`SELECT user_id, name, SUM(amount) FROM orders GROUP BY user_id\` had silently worked in MySQL by picking an arbitrary \`name\`. Postgres rejected it. The migration script ran for a year before someone realized that during the dual-write phase, MySQL had been quietly returning *different* names for the same user across runs. Lesson: ANSI-strict GROUP BY is a feature, not a bug.

## Best practices

- **State your denominator** when reporting averages — show the count alongside.
- Use \`COUNT(*)\` when you want "all rows including NULL-only."
- Use \`COUNT(col)\` when you want "rows that have a value here."
- Reach for **approximate distinct** on billion-row tables unless exactness is regulatory.
- **Group by the surrogate key**, not the descriptive name, when both are present (faster + safer).
- **Filter in WHERE, not HAVING**, whenever the column is not aggregated.

## Anti-patterns & next lesson

Avoid: assuming NULLs count in averages; selecting non-grouped, non-aggregated columns (works in legacy MySQL only); \`COUNT(DISTINCT)\` on billions of rows without considering APPROX; reporting an average without its sample size.

Next: **JOIN operations** — bringing facts and dimensions together to make those aggregates meaningful by region, product, or customer segment.`,
        theoryEn: `**Aggregates** collapse rows into a single value. Every dashboard is a series of aggregates dressed up.

## Why this matters

Most analytical bugs come from aggregate mis-use: NULL handling, wrong denominators, missing GROUP BY columns.

## Five core aggregates

| Function | Behavior | Ignores NULL? |
|---|---|---|
| COUNT(*) | All rows | No |
| COUNT(col) | Non-NULL rows | Yes |
| COUNT(DISTINCT) | Distinct non-NULL | Yes |
| SUM, AVG | Non-NULL only | Yes |
| MIN, MAX | Non-NULL only | Yes |

\`AVG(rating)\` excludes NULLs — you average responders only.

## GROUP BY

Every SELECT column must be aggregated or grouped. ANSI/Postgres enforces this; MySQL historically didn't.

## HAVING

Filters *groups* (after GROUP BY), can reference aggregates. WHERE filters rows.

## Comparison

| Stage | Operates on | Refs |
|---|---|---|
| WHERE | rows | cols |
| GROUP BY | rows→groups | cols/expr |
| HAVING | groups | aggregates |

Push filters into WHERE when possible.

## DISTINCT counting cost

\`COUNT(DISTINCT)\` keeps every value in memory. Use \`APPROX_COUNT_DISTINCT\` (BigQuery/Snowflake) for ~1% error + constant memory.

## Case study — the lying average

A pitch deck claimed "4.6/5 average rating" — really only 5% of users responded. True churn-weighted: 3.2/5. Always state the denominator.

## Case study — MySQL→Postgres GROUP BY

Lenient MySQL silently picked arbitrary non-grouped values; Postgres rejected the query. Discovered after a year of inconsistency. ANSI-strict GROUP BY is a feature.

## Best practices

State denominators; choose COUNT(*) vs COUNT(col) deliberately; APPROX for billion-row distinct; group by surrogate keys; filter in WHERE.

## Anti-patterns & next

Avoid NULL-ignorant averages, ungrouped columns, COUNT(DISTINCT) on billions without approx. Next: **JOIN operations**.`,
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
        theory: `A **JOIN** combines rows from two tables based on a relationship. It is the operation that turns a normalized database into business answers — orders joined with customers, sales joined with products, events joined with users. If WHERE is the most-used SQL clause, JOIN is the one that most distinguishes a junior from a senior.

## Why this matters

Every "the dashboard double-counted revenue" Slack thread is, 90% of the time, a JOIN bug — typically a missing or wrong key, a many-to-many relationship treated as one-to-many, or a silent fan-out that triples row counts. Understanding the *math* of JOINs (not just the syntax) is the antidote.

## The four canonical JOIN types

\`\`\`sql
SELECT *
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id;
\`\`\`

| JOIN | Returns |
|---|---|
| **INNER** | Only matching rows from both sides |
| **LEFT (OUTER)** | All from left + matched from right; NULL where no match |
| **RIGHT (OUTER)** | All from right + matched from left (rarely used — flip and use LEFT) |
| **FULL (OUTER)** | All from both sides; NULL where no match |
| **CROSS** | Cartesian product (every left × every right) |

Visualization (Venn-style):

\`\`\`
INNER:   A ∩ B
LEFT:    A (with B-data where it matches)
RIGHT:   B (with A-data where it matches)
FULL:    A ∪ B
CROSS:   A × B
\`\`\`

## INNER JOIN — the default

\`\`\`sql
SELECT o.id, o.amount, c.name
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id;
\`\`\`

If a customer has no orders, they don't appear. If an order has a NULL or invalid customer_id, *it doesn't appear either*. This silent dropping is the single biggest INNER-JOIN gotcha — always sanity-check row counts before vs after.

## LEFT JOIN — keep all from left

\`\`\`sql
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;
\`\`\`

This returns every customer, even those with zero orders (\`order_count = 0\`). Notice we count \`o.id\` (not \`*\`) — \`COUNT(*)\` would return 1 for unmatched rows because the left side still exists.

## Comparison & decision flow

| Question | Use |
|---|---|
| "Only matched rows from both sides" | INNER |
| "Every row from this table, with optional matches from the other" | LEFT (put the must-keep table on the left) |
| "Find rows in A that have no match in B" | LEFT JOIN + \`WHERE b.id IS NULL\` |
| "Combine two lists allowing missing on either side" | FULL OUTER |
| "Cross every row of A with every row of B" | CROSS (rare — calendar generation, test combos) |

## The fan-out problem

If \`orders\` joins to \`order_items\` (one order has many items), \`SELECT SUM(o.amount)\` *triples-counts* the order amount once per item. Symptoms: revenue numbers that look 3× too high.

Fixes:

- Aggregate the many-side first (\`SELECT order_id, COUNT(*) AS items FROM order_items GROUP BY order_id\`), then join.
- Or use \`SUM(DISTINCT o.amount)\` — possible but fragile.
- Use a CTE / subquery to pre-aggregate.

## Case study — the "double-revenue" incident

A growth-stage startup launched a "sales by category" dashboard. Revenue suddenly looked **2.4× higher** than the finance team's monthly close. Root cause: the new model joined \`orders\` to \`order_items\` to attribute category, then summed \`o.amount\` (the order total, repeated per item). The fix took one CTE: pre-aggregate items per order, then join. Three days of misreported revenue had to be explained to the CEO. The lesson made it into the team's onboarding doc.

## Case study — the silent INNER drop

An analyst reported "we have 47,000 active subscribers." Finance reported 49,200. The difference was an INNER JOIN to \`dim_plan\` — and ~2,200 grandfathered subscribers had a \`plan_id\` that no longer existed in \`dim_plan\` after a migration. INNER silently dropped them. A LEFT JOIN with a NULL-check made the orphans visible immediately.

## Best practices

- **Always know the cardinality** of every JOIN (one-to-one / one-to-many / many-to-many) *before* you write it.
- **Sanity-check row counts** before and after adding a JOIN — if it changes unexpectedly, you have a fan-out.
- **LEFT JOIN to detect missing data**: \`LEFT JOIN x ON … WHERE x.id IS NULL\` is the canonical orphan-finder.
- **Always alias both tables** in joined queries (covered in lesson 2).
- **Put the join condition in ON, not WHERE** — they behave differently for OUTER joins.
- **Avoid CROSS JOIN by accident** (missing JOIN condition → silent Cartesian explosion).

## Anti-patterns & next lesson

Avoid: joining without checking cardinality; mixing JOIN conditions in WHERE on OUTER joins; silently dropping rows with INNER JOIN to a stale dim table; SELECT \\* on joined tables (column collisions).

Next: **Subqueries** — when a JOIN is awkward and a "query inside a query" is cleaner, faster, or simply the only way.`,
        theoryEn: `A **JOIN** combines rows from two tables. The operation that turns normalized data into business answers.

## Why this matters

90% of "double-counted revenue" Slack threads are JOIN bugs — wrong key, missing cardinality check, silent fan-out.

## Four canonical types

| JOIN | Returns |
|---|---|
| INNER | Matched rows on both sides |
| LEFT | All left + matches; NULL otherwise |
| RIGHT | All right + matches (rarely used) |
| FULL OUTER | Both sides; NULL where no match |
| CROSS | Cartesian product |

## INNER — the default

Drops rows missing on either side. Single biggest gotcha — sanity-check row counts.

## LEFT — keep all left

Returns customers even with 0 orders. Use \`COUNT(o.id)\` (not \`*\`) so unmatched = 0.

## Decision matrix

| Need | JOIN |
|---|---|
| Matched-only | INNER |
| Keep all from one side | LEFT |
| Find orphans | LEFT + IS NULL |
| Combine with both-side missing | FULL OUTER |

## Fan-out problem

\`orders\` 1→N \`order_items\`: \`SUM(o.amount)\` triples. Fix: pre-aggregate the many-side, then join.

## Case study — double revenue

Joined orders → items, summed order amount → 2.4× revenue. CTE pre-aggregation fixed it after 3 days of misreporting.

## Case study — silent INNER drop

INNER JOIN to stale \`dim_plan\` silently lost ~2,200 grandfathered subscribers. LEFT JOIN + NULL check exposed orphans.

## Best practices

Know cardinality first; sanity-check row counts; LEFT for orphan detection; alias both tables; conditions in ON not WHERE for OUTER; never accidentally CROSS.

## Anti-patterns & next

Avoid unknown cardinality, OUTER conditions in WHERE, stale-dim INNER joins, \`SELECT *\` on joins. Next: **Subqueries**.`,
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
        theory: `A **subquery** is a query embedded inside another query. Used well, it expresses logic that is awkward or impossible with JOINs alone. Used poorly, it is the cause of mysterious 30× slowdowns. The senior-engineer skill is knowing when to use a subquery, when to convert it to a JOIN, and when to refactor it into a CTE.

## Why this matters

Subqueries crop up the moment you need to filter by an aggregate ("orders larger than the average") or check existence ("customers who have never ordered"). They are also one of the most-asked SQL interview topics — every senior data engineer should be able to write *and* explain the four flavors below in their sleep.

## Three placement patterns

| Where | Behavior | Example |
|---|---|---|
| **In WHERE** | Filter using a derived value/list | \`WHERE amount > (SELECT AVG(amount) FROM orders)\` |
| **In FROM** (a.k.a. derived table) | Treat the subquery as a temporary table | \`FROM (SELECT … ) AS sub\` |
| **In SELECT** (scalar) | One value per outer row | \`SELECT id, (SELECT name FROM …) AS x FROM orders\` |

A FROM-subquery **must be aliased** in Postgres / MySQL (\`… ) AS sub\`).

## Scalar vs multi-row vs multi-column

- **Scalar**: returns one row, one column. Usable anywhere a single value is. \`amount > (SELECT AVG(amount) …)\`
- **Multi-row, one column**: usable with \`IN\`, \`ANY\`, \`ALL\`. \`WHERE id IN (SELECT order_id FROM …)\`
- **Multi-row, multi-column**: usable in FROM as a derived table.

If a "scalar" subquery accidentally returns more than one row, the database raises an error at runtime — be defensive: aggregate or LIMIT to guarantee one.

## Correlated vs non-correlated

A **non-correlated** subquery runs **once**:

\`\`\`sql
SELECT * FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);
\`\`\`

A **correlated** subquery references a column from the outer query and runs **once per outer row**:

\`\`\`sql
SELECT o.*
FROM orders o
WHERE amount > (
  SELECT AVG(amount) FROM orders o2 WHERE o2.customer_id = o.customer_id
);
\`\`\`

Correlated subqueries are powerful but can be devastating for performance — they are essentially nested loops. Modern optimizers (Postgres ≥ 13, Snowflake, BigQuery) often rewrite simple correlated forms into JOIN+GROUP BY automatically, but **don't rely on it for complex cases**.

## EXISTS vs IN — pick the right one

\`\`\`sql
-- "Customers who have ever ordered"
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Same intent
SELECT * FROM customers c
WHERE c.id IN (SELECT customer_id FROM orders);
\`\`\`

| Aspect | EXISTS | IN |
|---|---|---|
| Stops at first match? | ✅ Yes | ❌ Builds full list |
| NULL handling | Safe | Tricky — \`NOT IN (… NULL …)\` returns nothing! |
| Performance on large lists | Often better | Can blow up |

The infamous **\`NOT IN\` with NULL** trap: if the subquery returns even one NULL, \`NOT IN\` returns *no* rows at all (because \`x <> NULL\` is "unknown"). **Always prefer \`NOT EXISTS\`** for "find rows that don't have a match."

## Comparison: subquery vs JOIN vs CTE

| Need | Best fit |
|---|---|
| Filter by an aggregate of the same table | Subquery in WHERE |
| Find existence in another table | EXISTS |
| Find orphans | LEFT JOIN + IS NULL or NOT EXISTS |
| Re-use the same derived set multiple times | **CTE** (next lesson) |
| Read complex multi-step logic | **CTE** |

The 2024 rule of thumb: prefer **CTEs over deeply-nested subqueries** for readability. They compile to the same plan in modern engines.

## Case study — the 30× slowdown that wasn't

A junior wrote a "find customers above their region's average order" query as a correlated scalar subquery. On 5 M rows it took 4 minutes. Senior reviewer rewrote it as a window function: \`AVG(amount) OVER (PARTITION BY region)\`. New runtime: 8 seconds (30× faster). Both queries are correct; the rewrite let the engine use a single hash aggregate instead of nested loops. **Knowing when to escape a subquery is half the skill.**

## Case study — the NOT IN nightmare

A reporting query said "give me customers not in our churn list." Worked perfectly in dev (no NULLs in the churn list). After a data refresh, one row in the churn list had a NULL customer_id. \`NOT IN\` started returning **zero customers**. The "we lost all our active accounts" alarm went off. Fix: replaced \`NOT IN\` with \`NOT EXISTS\`, which handles NULL cleanly. Now in the team's lint rules.

## Best practices

- **Default to CTEs** for multi-step logic; reserve subqueries for one-line filters.
- Use **EXISTS, not IN**, for "is there any match" patterns.
- Use **NOT EXISTS, not NOT IN**, when nullable columns are involved.
- For "compare each row to the group's aggregate," prefer **window functions** over correlated subqueries.
- Always **alias derived tables** explicitly (Postgres demands it).
- Run \`EXPLAIN ANALYZE\` whenever a subquery feels slow — the plan will tell you whether the optimizer was able to flatten it.

## Anti-patterns & next lesson

Avoid: \`NOT IN\` on nullable subqueries; correlated scalar subqueries in SELECT lists when a window function would do; deeply nested 4+ level subqueries (refactor to CTEs); putting business logic in scalar subqueries that hides it from review.

Next: **Common Table Expressions (CTEs)** — the modern, readable way to express what most subqueries try to do.`,
        theoryEn: `A **subquery** is a query inside another. Used well, expresses logic JOINs can't. Used poorly, causes 30× slowdowns.

## Why this matters

You'll need them for "filter by aggregate," "find non-existence," and they're a top SQL interview topic.

## Three placements

| Where | Example |
|---|---|
| WHERE | \`WHERE amount > (SELECT AVG…)\` |
| FROM (derived table) | \`FROM (SELECT … ) AS sub\` (must alias) |
| SELECT (scalar) | One value per outer row |

## Scalar / multi-row / multi-column

Scalar must return exactly one row + col, or runtime error. Multi-row → \`IN\` / \`ANY\` / \`ALL\`. Multi-row+col → derived table.

## Correlated vs non-correlated

Non-correlated runs once. Correlated references the outer row → runs per outer row → potential disaster. Modern optimizers flatten simple cases.

## EXISTS vs IN

| Aspect | EXISTS | IN |
|---|---|---|
| Short-circuit | Yes | No |
| NULL safety | Safe | \`NOT IN\` with NULL → 0 rows! |
| Large lists | Often better | Can blow up |

Always prefer \`NOT EXISTS\` over \`NOT IN\`.

## Subquery vs JOIN vs CTE

Reuse → CTE; existence → EXISTS; orphan → LEFT+NULL or NOT EXISTS; multi-step → CTE.

## Case study — 30× slowdown

Correlated subquery on 5M rows → 4 minutes. Rewrote as \`AVG(...) OVER (PARTITION BY region)\` → 8 seconds.

## Case study — \`NOT IN\` NULL nightmare

A NULL in the churn list made \`NOT IN\` return zero customers. Switched to \`NOT EXISTS\` → fixed + linted.

## Best practices

Default to CTEs; EXISTS over IN; NOT EXISTS over NOT IN; window functions over correlated; alias derived tables; \`EXPLAIN ANALYZE\` when slow.

## Anti-patterns & next

Avoid \`NOT IN\` on nullables, deep nesting, hidden business logic in scalars. Next: **CTEs**.`,
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
        theory: `A **Common Table Expression (CTE)** — written with the \`WITH\` keyword — is a named temporary result set you can reference within a single query. CTEs are the readability super-power of modern SQL: they turn a 200-line nested mess into 5 named, reviewable steps.

## Why this matters

When dbt swept the data world (2020–2024), one of its core stylistic rules became "every model is a series of CTEs ending in a final SELECT." The reason is human, not technical: pipelines built from named CTEs are *reviewable*. A reviewer reads the CTE names top-to-bottom and understands the model's intent in 30 seconds.

## Basic syntax

\`\`\`sql
WITH active_customers AS (
  SELECT id FROM customers WHERE status = 'active'
),
recent_orders AS (
  SELECT *
  FROM orders
  WHERE created_at >= current_date - 30
)
SELECT ac.id, COUNT(*) AS orders_30d
FROM active_customers ac
JOIN recent_orders ro ON ro.customer_id = ac.id
GROUP BY ac.id;
\`\`\`

You can chain as many CTEs as you want, separated by commas. The final SELECT consumes them.

## CTE vs subquery vs view

| Aspect | CTE | Subquery | View |
|---|---|---|---|
| Scope | Single query | Single query | Permanent / DB-wide |
| Reusable in same query | ✅ Yes (multiple references) | ❌ Must rewrite | ✅ |
| Self-reference (recursion) | ✅ \`WITH RECURSIVE\` | ❌ | ❌ |
| Readability | Excellent | Degrades with depth | Excellent |
| Performance | Same plan as inlined subquery (modern engines) | Same | Materialized view = stored result |

For one-off queries CTEs and subqueries compile to the same plan in Postgres ≥12, Snowflake, BigQuery, and dbt-style warehouses. Pick CTEs for human readability.

## The dbt convention

Modern dbt models follow this template:

\`\`\`sql
with

source as (
    select * from {{ ref('raw_orders') }}
),

filtered as (
    select * from source where status != 'cancelled'
),

aggregated as (
    select customer_id, sum(amount) as ltv
    from filtered
    group by 1
)

select * from aggregated
\`\`\`

Every CTE has a clear, single responsibility. New engineers can join the project and read any model in a minute. This pattern is now the unofficial industry standard.

## Recursive CTEs

A \`WITH RECURSIVE\` CTE references itself. The classic use case: walking a hierarchy.

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Anchor: top-level managers
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: each step adds one level down
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart;
\`\`\`

Other use cases: bill-of-materials traversal, graph paths, generating date series.

## Performance — the "materialization" footnote

Some engines (Postgres < 12) treated CTEs as **optimization fences** — they always materialized the CTE result, blocking the planner from pushing predicates down. Postgres 12+ inlines them by default unless you write \`WITH … AS MATERIALIZED\`. Snowflake and BigQuery have always inlined.

If you're on a legacy Postgres (< 12), be aware that wrapping a slow query in a CTE can sometimes make it slower. \`EXPLAIN ANALYZE\` will tell you.

## Case study — a 200-line model becomes 40 lines of named steps

A team's "monthly revenue per region" model started as a 200-line query with 6-deep nested subqueries. Code review took an hour and almost no one understood it. A staff engineer rewrote it as 7 named CTEs (\`raw_orders\`, \`paid_orders\`, \`with_region\`, \`monthly\`, \`with_targets\`, \`with_pct\`, \`final\`), each ~5 lines. The query plan was identical (Snowflake inlined them). Review time dropped from 1 hour to 5 minutes. Three months later, when the metric definition changed, the diff touched a single CTE.

## Case study — the recursive query that ran forever

A junior wrote a recursive CTE to walk an org chart but **forgot a termination condition**. The CTE's anchor returned 50 rows; the recursive step joined back without filtering already-visited employees. Two cycles in the data created an infinite loop — Postgres killed the query after 30 minutes and 50 GB of temp disk. Lesson: every recursive CTE needs an explicit \`level < N\` guard and, if cycles are possible, a "visited set" tracked through the recursion.

## Best practices

- **Adopt the dbt CTE-per-step style** even outside dbt — it ages well.
- **Name CTEs after the noun they produce** (\`active_customers\`, not \`step1\`).
- **Keep each CTE single-purpose** — if it does two things, split it.
- **Cap recursion depth** explicitly with a \`level\` column and \`WHERE level < 10\`.
- On legacy Postgres, run \`EXPLAIN ANALYZE\` to confirm CTEs aren't blocking optimization.
- **Don't over-CTE** — wrapping a single \`SELECT a FROM b\` in a CTE is cargo cult, not clarity.

## Anti-patterns & next lesson

Avoid: deeply-nested subqueries when a CTE would clarify; recursive CTEs without a depth cap; abusing CTEs as "fake views" that should actually be a real view; renaming the same column three times across CTEs.

Next: **Window functions** — the closest cousin to aggregates, but without collapsing rows. Together with CTEs, they are how senior engineers express most analytical SQL.`,
        theoryEn: `A **CTE** (Common Table Expression, \`WITH …\`) is a named temporary result set inside a query. The readability super-power of modern SQL.

## Why this matters

dbt's industry-standard style is "every model = a series of CTEs ending in a final SELECT." Reviewers can scan CTE names and grasp a model in 30 seconds.

## Basic syntax

\`\`\`sql
WITH a AS (...), b AS (SELECT … FROM a)
SELECT * FROM b;
\`\`\`

Chain as many as you want; final SELECT consumes them.

## CTE vs subquery vs view

| Aspect | CTE | Subquery | View |
|---|---|---|---|
| Reusable same query | Yes | No | Yes |
| Recursion | Yes | No | No |
| Readability | Excellent | Degrades w/ depth | Excellent |

Modern engines compile CTEs and subqueries to the same plan.

## dbt convention

\`source → filtered → aggregated → final SELECT\`. Each CTE has one job.

## Recursive CTEs

\`WITH RECURSIVE\` references itself — anchor + recursive part. Classic use: org chart, BOM, graph paths.

## Performance footnote

Postgres < 12 materialized CTEs (could be slower). Postgres 12+, Snowflake, BigQuery inline by default.

## Case study — 200 lines → 40

A 200-line nested query became 7 named CTEs. Same plan, 1-hour review → 5 minutes. Later metric change touched one CTE.

## Case study — infinite recursion

Org-chart CTE without a depth cap looped on cyclic data → killed after 30 min + 50 GB temp. Always cap with \`WHERE level < N\`.

## Best practices

dbt CTE-per-step style; noun-named CTEs; one job per CTE; cap recursion; \`EXPLAIN ANALYZE\` on legacy Postgres; don't over-CTE.

## Anti-patterns & next

Avoid deep nesting, uncapped recursion, fake-views as CTEs. Next: **Window functions**.`,
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
        theory: `**Window functions** are the most powerful family of operations in modern SQL. Unlike aggregates, they compute a result *per row* while still seeing the rest of the data. "Rank each order within its customer," "running 7-day average," "previous order's amount" — all are one-liners with windows, and ugly nightmares without them.

## Why this matters

Window functions are the dividing line between "I know SQL" and "I know analytical SQL." Every senior data engineer / analytics engineer interview asks at least one. Equally important: most expensive correlated subqueries in production can be rewritten as windows for 10–100× speedups.

## Anatomy of a window function

\`\`\`sql
SELECT
  customer_id,
  amount,
  RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rnk
FROM orders;
\`\`\`

The \`OVER (...)\` clause defines the **window**:

- \`PARTITION BY\` — split rows into groups (like GROUP BY but rows are *not* collapsed).
- \`ORDER BY\` — order within each partition (required for ranking and offset functions).
- \`ROWS / RANGE\` — frame: which rows around the current one are visible (for running totals).

Without a window function, computing "rank within customer" requires a correlated subquery or a self-join — both slow.

## The four function families

| Family | Functions | Use case |
|---|---|---|
| **Ranking** | \`ROW_NUMBER()\`, \`RANK()\`, \`DENSE_RANK()\`, \`NTILE(n)\` | Top-N per group, percentiles |
| **Offset** | \`LAG()\`, \`LEAD()\`, \`FIRST_VALUE()\`, \`LAST_VALUE()\` | Prev/next row comparison |
| **Aggregate-as-window** | \`SUM() OVER\`, \`AVG() OVER\`, \`COUNT() OVER\` | Running totals, moving averages |
| **Statistical** | \`PERCENT_RANK()\`, \`CUME_DIST()\` | Distribution analysis |

## Ranking — ROW_NUMBER vs RANK vs DENSE_RANK

Three rows tied at amount = 100 (rest are unique):

| amount | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 200 | 1 | 1 | 1 |
| 100 | 2 | 2 | 2 |
| 100 | 3 | 2 | 2 |
| 100 | 4 | 2 | 2 |
| 50 | 5 | 5 | 3 |

- \`ROW_NUMBER\` — always unique 1..N, ties broken arbitrarily (use a tiebreaker in ORDER BY).
- \`RANK\` — ties get the same number; *next number skips*.
- \`DENSE_RANK\` — ties same number; *no gap*.

For "give me one row per customer (their latest order)," use \`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC, id DESC)\` and filter \`= 1\`.

## LAG / LEAD — comparing across rows

\`\`\`sql
SELECT
  date,
  revenue,
  LAG(revenue) OVER (ORDER BY date) AS prev_day,
  revenue - LAG(revenue) OVER (ORDER BY date) AS delta
FROM daily_revenue;
\`\`\`

\`LAG(col, n)\` looks N rows back; \`LEAD\` looks forward. Default offset is 1. Optional 3rd argument is a default value when out-of-range.

## Frames — running totals & moving averages

\`\`\`sql
SELECT
  date,
  revenue,
  SUM(revenue) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
  AVG(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d_avg
FROM daily_revenue;
\`\`\`

The frame clause is **mandatory** for most production rolling-window work — the implicit default (\`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`) can give surprising results with duplicate ORDER BY values.

## Comparison: window vs GROUP BY

| Need | Use |
|---|---|
| Collapse rows into one summary per group | GROUP BY |
| Keep every row but add a per-group calc | Window function |
| Running total / moving average | Window function with frame |
| Top-N per group | \`ROW_NUMBER\` window |

## Case study — the 30-minute → 4-second rewrite

A retention dashboard computed "days between user's first and most recent purchase" with a self-join (\`MIN\` and \`MAX\` subqueries joined back). On 200 M rows it took 30 minutes. A senior rewrote it with two windows in one pass: \`MIN(date) OVER (PARTITION BY user_id)\` and \`MAX(date) OVER (PARTITION BY user_id)\`. Runtime: **4 seconds** (450× faster). The query also became 3 lines instead of 30.

## Case study — the deduplication pattern

Every production warehouse needs to handle late-arriving duplicate events. The canonical fix is one window:

\`\`\`sql
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY received_at DESC) AS rn
  FROM raw_events
)
SELECT * FROM ranked WHERE rn = 1;
\`\`\`

This pattern appears in *every* dbt project at scale. Memorize it.

## Best practices

- **Always include a tiebreaker** in window ORDER BY when uniqueness matters (\`ORDER BY ts DESC, id DESC\`).
- Use **ROW_NUMBER** when you want exactly one row per group; **RANK / DENSE_RANK** for ties.
- **Specify the frame** explicitly for running totals — never rely on the default.
- For "compare to group average," prefer \`AVG() OVER\` over a correlated subquery (10–100× faster).
- Combine windows with **CTEs**: compute the window in a CTE, filter in the outer query.
- Beware of windows + DISTINCT — they don't compose intuitively; aggregate first.

## Anti-patterns & next lesson

Avoid: windows without ORDER BY for ranking functions (results undefined); huge unbounded windows over billions of rows (memory pressure); using window in WHERE (not allowed — use a CTE wrapper); ignoring the difference between \`RANGE\` and \`ROWS\` frames.

Next: **Indexing & EXPLAIN** — once your queries are correct, how do you make them fast?`,
        theoryEn: `**Window functions** compute per-row results while seeing the rest of the data. The dividing line between "I know SQL" and "I know analytical SQL."

## Why this matters

Top interview topic + most slow correlated subqueries become 10–100× faster as windows.

## Anatomy

\`func() OVER (PARTITION BY … ORDER BY … ROWS …)\` — partition splits rows into groups (without collapsing), ORDER BY sorts within, frame defines visible neighbors.

## Four families

| Family | Functions |
|---|---|
| Ranking | \`ROW_NUMBER, RANK, DENSE_RANK, NTILE\` |
| Offset | \`LAG, LEAD, FIRST_VALUE\` |
| Aggregate-as-window | \`SUM, AVG, COUNT OVER\` |
| Statistical | \`PERCENT_RANK, CUME_DIST\` |

## Ranking differences

| amount | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|
| 200 | 1 | 1 | 1 |
| 100 | 2 | 2 | 2 |
| 100 | 3 | 2 | 2 |
| 50 | 4 | 4 | 3 |

ROW_NUMBER unique; RANK skips after ties; DENSE_RANK doesn't.

## LAG / LEAD

Compare to N-prev / N-next row. Use for day-over-day deltas, sequence checks.

## Frames

\`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` for 7-day moving avg. Always specify explicitly.

## Window vs GROUP BY

| Need | Use |
|---|---|
| Collapse | GROUP BY |
| Per-row + per-group calc | Window |
| Running total | Window + frame |
| Top-N per group | ROW_NUMBER window |

## Case study — 30 min → 4 sec

Self-join with MIN/MAX subqueries on 200M rows = 30 min. Two windows in one pass = 4 sec. 450× speedup.

## Case study — dedup pattern

\`ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY received_at DESC) → WHERE rn=1\`. Every dbt project at scale uses it.

## Best practices

Tiebreaker in ORDER BY; ROW_NUMBER for unique top-1; explicit frame; windows over correlated subqueries; combine with CTEs.

## Anti-patterns & next

Avoid ranking without ORDER BY, huge unbounded windows, windows in WHERE. Next: **Indexing & EXPLAIN**.`,
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
        theory: `An **index** is a data structure that lets the database find rows without scanning the whole table. Indexes are the difference between a 10 ms query and a 10-second query — but every index also slows down writes and uses storage. Knowing which to add, and which *not* to add, is one of the most ROI-positive skills a data engineer can develop.

## Why this matters

A correctly-indexed query on a 1-billion-row table can return in milliseconds. The same query without an index full-scans the table — minutes, sometimes hours. Multiply that by every query a dashboard fires and the user-experience difference is *order of magnitude*. On the flip side, over-indexing is the silent killer of OLTP write throughput.

## How a B-tree index actually works

The default index in every major OLTP database (Postgres, MySQL, SQL Server, Oracle) is a **B-tree** — a balanced tree where each node holds sorted keys.

- Lookup cost: \`O(log N)\`. On a billion rows, ~30 comparisons instead of a billion.
- Range queries (\`BETWEEN\`, \`>\`, \`<\`) work great because keys are sorted.
- Equality and prefix-match \`LIKE 'an%'\` work; \`LIKE '%an'\` does not.

## When indexes help (and when they don't)

| Predicate | Uses index? |
|---|---|
| \`WHERE id = 42\` (equality) | ✅ Yes |
| \`WHERE created_at > '2024-01-01'\` (range) | ✅ Yes |
| \`WHERE name LIKE 'an%'\` | ✅ Yes |
| \`WHERE name LIKE '%an'\` (leading wildcard) | ❌ No |
| \`WHERE UPPER(email) = 'X'\` (function on column) | ❌ No (unless functional index) |
| \`WHERE age + 5 > 30\` (expression on column) | ❌ No |
| Selecting \`> ~10%\` of the table | Often a full scan is faster |

The 10% rule: if a query returns more than ~10% of a table, the planner often *correctly* chooses a full scan over an index — random index lookups become slower than sequential reads.

## Index types beyond B-tree

| Type | Best for | Available in |
|---|---|---|
| **B-tree** | Equality + range, default | All major DBs |
| **Hash** | Pure equality, slightly faster | Postgres, MySQL (memory) |
| **GIN** (generalized inverted) | Arrays, JSONB, full-text | Postgres |
| **GiST** | Geographic, range types | Postgres |
| **BRIN** (block-range) | Huge naturally-ordered tables | Postgres |
| **Bitmap** | Low-cardinality columns | Oracle, columnar DBs |
| **Columnstore** | Analytical workloads | SQL Server, MySQL HeatWave |

For a JSON column you query with \`@>\` containment, a GIN index can be 1000× faster than no index.

## Composite indexes — the order matters

\`\`\`sql
CREATE INDEX idx_orders_cust_date ON orders(customer_id, created_at);
\`\`\`

This index helps:

- \`WHERE customer_id = 42\` ✅
- \`WHERE customer_id = 42 AND created_at > '2024-01-01'\` ✅✅
- \`WHERE created_at > '2024-01-01'\` ❌ (skipped the leading column)

Rule: put the **most selective** column first, *or* the column always present in WHERE.

## EXPLAIN — the only way to know

Never guess at performance — \`EXPLAIN ANALYZE\` runs the query and shows the actual plan:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;
\`\`\`

What to look for:

- **Seq Scan** on a big table = bad. **Index Scan** / **Index Only Scan** = good.
- **Rows Removed by Filter** = predicate not pushed into the index.
- **Nested Loop** with millions of inner rows = catastrophe. **Hash Join** scales much better.
- **Buffers: shared hit / read** = how much I/O happened (Postgres).

## Comparison — when to add an index

| Situation | Add index? |
|---|---|
| Column appears in WHERE / JOIN frequently | ✅ Yes |
| Column has high cardinality (many distinct values) | ✅ Yes |
| OLAP warehouse with columnar storage | ❌ Usually no — already optimized |
| Table has heavy writes, low reads | ⚠️ Add sparingly |
| Column is rarely filtered | ❌ No |

Note: **modern cloud warehouses** (Snowflake, BigQuery, Redshift) generally do *not* use B-tree indexes. They use columnar storage + clustering + partitioning to achieve the same goal. The lessons here apply mostly to OLTP / Postgres / MySQL.

## Case study — the missing index that cost $50k/month

A SaaS company's API had a \`GET /orders?status=paid&user_id=X\` endpoint. P99 latency was 2 seconds. The DBA noticed every call ran \`Seq Scan on orders\` because no index existed on \`(user_id, status)\`. Adding a single composite index dropped p99 to **8 ms**. Database CPU dropped from 70% to 8%, allowing them to downsize from \`db.r5.4xlarge\` to \`db.r5.xlarge\` — saving ~$3,500/month. Multiply by their fleet, ~$50k/year recovered.

## Case study — the over-indexed write disaster

A different team responded to slow reports by adding indexes "just in case" on every column. The reporting team was happy; the OLTP write throughput collapsed by 60%. Every INSERT had to update 14 indexes. They eventually dropped half of them and moved reporting workloads to a read replica (and later to a warehouse). **Indexes are not free — every one is a write tax.**

## Best practices

- **Index columns used in WHERE, JOIN, ORDER BY** — not every column.
- **Composite index column order**: equality columns first, then range.
- **Use \`EXPLAIN ANALYZE\`** before and after every index change.
- For Postgres on JSON, **use GIN with the \`jsonb_path_ops\` operator class**.
- **Drop unused indexes** — Postgres exposes \`pg_stat_user_indexes\` showing zero-use indexes.
- For warehouses, **use partitioning + clustering** instead of indexes.
- Keep an eye on **index bloat** in Postgres — periodic \`REINDEX CONCURRENTLY\`.

## Anti-patterns & next lesson

Avoid: indexing every column "for safety"; functional predicates on indexed columns; ignoring EXPLAIN; adding indexes to a write-heavy OLTP table without measuring write impact; expecting B-tree indexes to help in Snowflake/BigQuery (they don't exist there).

Next: **Database design & normalization** — the upstream decisions that determine whether you'll *need* a forest of indexes in the first place.`,
        theoryEn: `An **index** lets the DB find rows without scanning the whole table. The difference between 10 ms and 10 sec.

## Why this matters

Right index = milliseconds at billion-row scale. Over-indexing kills write throughput.

## How B-tree works

Balanced tree, sorted keys, \`O(log N)\` lookup. ~30 comparisons on a billion rows. Range queries efficient.

## When indexes help

| Predicate | Uses index? |
|---|---|
| Equality | ✅ |
| Range | ✅ |
| Prefix LIKE | ✅ |
| Leading-wildcard LIKE | ❌ |
| Function on column | ❌ |
| Returning >10% of table | Often no |

## Index types

B-tree (default), Hash (equality), GIN (JSON/full-text), GiST (geo), BRIN (huge ordered tables), Bitmap (low-cardinality), Columnstore (analytical).

## Composite indexes

\`(a, b)\` helps \`WHERE a=…\` and \`WHERE a=… AND b…\`, but **not** \`WHERE b=…\` alone. Most selective / always-present column first.

## EXPLAIN ANALYZE

Look for: Seq Scan (bad on big tables), Index Scan (good), Rows Removed by Filter (predicate not pushed), Nested Loop with millions (disaster).

## When to add

High-frequency WHERE/JOIN, high-cardinality, low-write tables. **Cloud warehouses don't use B-tree** — they use partitioning + clustering.

## Case study — missing index

Composite \`(user_id, status)\` dropped p99 from 2s → 8ms; DB CPU 70%→8%; saved ~$50k/year.

## Case study — over-indexed disaster

"Just in case" indexes on every column → write throughput −60% (14 indexes per INSERT). Lesson: every index is a write tax.

## Best practices

Index used columns; equality before range; \`EXPLAIN ANALYZE\` before/after; GIN for JSONB; drop unused (\`pg_stat_user_indexes\`); warehouses → partition + cluster.

## Anti-patterns & next

Avoid blanket indexing, function predicates, ignoring EXPLAIN, B-tree expectations on Snowflake. Next: **Database design & normalization**.`,
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

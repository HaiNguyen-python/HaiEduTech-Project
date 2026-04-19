import type { ExtendedProgrammingModule } from "./types";

export const programmingExpansionModules: ExtendedProgrammingModule[] = [
  {
    id: "py-oop-adv",
    title: "Python OOP Nâng cao",
    titleEn: "Advanced Python OOP",
    icon: "🏗️",
    color: "from-yellow-500 to-yellow-700",
    description: "Kế thừa, đa hình, abstract class",
    descriptionEn: "Inheritance, polymorphism, abstract classes",
    course: "python",
    lessons: [
      {
        id: "py-oop-adv-1",
        title: "Kế thừa & Đa hình",
        titleEn: "Inheritance & Polymorphism",
        theory: `**Kế thừa (Inheritance)** và **Đa hình (Polymorphism)** là hai trong bốn trụ cột của OOP (cùng với Encapsulation và Abstraction). Chúng giúp tái sử dụng code, mở rộng hệ thống mà không phá vỡ code cũ — nguyên tắc Open/Closed của SOLID.

## Vì sao cần Inheritance?

Hãy tưởng tượng bạn xây hệ thống quản lý nhân viên cho một công ty lớn:
- Tất cả nhân viên đều có \`name\`, \`salary\`, \`work()\`
- Lập trình viên có thêm \`programming_languages\`
- Quản lý có thêm \`team_size\`, \`approve_leave()\`
- Sales có \`commission_rate\`, \`close_deal()\`

Nếu không có inheritance, bạn phải copy-paste \`name\`, \`salary\` vào mỗi class → vi phạm DRY (Don't Repeat Yourself), khó maintain. Inheritance giải quyết: viết code chung trong \`Employee\` (parent), các class con chỉ thêm phần riêng.

## Cú pháp & Cơ chế hoạt động

\`\`\`python
class Employee:                    # Parent / Base / Superclass
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
    def work(self):
        return f"{self.name} is working"

class Developer(Employee):         # Child / Derived / Subclass
    def __init__(self, name, salary, languages):
        super().__init__(name, salary)   # gọi parent constructor
        self.languages = languages
    def work(self):                # Override method
        return f"{self.name} is coding in {self.languages}"
\`\`\`

**MRO (Method Resolution Order):** Python dùng thuật toán C3 Linearization để xác định thứ tự tìm method khi có multi-inheritance. Kiểm tra qua \`ClassName.__mro__\`.

## 4 loại Inheritance

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Single** | 1 parent → 1 child | Dog → Animal |
| **Multilevel** | A → B → C | Manager → Employee → Person |
| **Multiple** | Nhiều parent | class C(A, B) |
| **Hierarchical** | 1 parent → nhiều child | Dog, Cat, Bird đều kế thừa Animal |

Python hỗ trợ **multiple inheritance** (khác Java) nhưng dễ gây "diamond problem" — dùng cẩn thận, ưu tiên composition.

## Polymorphism — Cùng giao diện, khác hành vi

Polymorphism cho phép dùng object như parent type nhưng gọi method của child:
\`\`\`python
def make_them_work(employees: list[Employee]):
    for emp in employees:
        print(emp.work())   # Tự động gọi đúng version

team = [Developer("An", 30, "Python"), Manager("Bình", 50, 5)]
make_them_work(team)
\`\`\`

**Duck Typing** (đặc trưng Python): "If it walks like a duck and quacks like a duck, it's a duck." Không cần kế thừa — chỉ cần có method cùng tên là dùng được.

## Abstract Class & Interface

Khi muốn ép buộc class con phải implement một số method nhất định:
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14 * self.r ** 2

# Shape() → TypeError vì không thể khởi tạo abstract class
\`\`\`

## So sánh Inheritance vs Composition

| Aspect | Inheritance ("is-a") | Composition ("has-a") |
|--------|---------------------|----------------------|
| Quan hệ | Dog **is-a** Animal | Car **has-a** Engine |
| Linh hoạt | Cứng nhắc, khó đổi | Linh hoạt, swap dễ |
| Coupling | Chặt (tight) | Lỏng (loose) |
| Khuyến nghị | Dùng khi quan hệ rõ ràng | Mặc định ưu tiên |

> **Composition over Inheritance** — nguyên tắc nổi tiếng từ "Design Patterns" (GoF). Dùng inheritance khi có "is-a" thực sự, dùng composition cho "has-a".

## Case study thực tế: Django ORM Models

Django ORM dùng inheritance triệt để. Khi bạn viết:
\`\`\`python
class User(models.Model):
    name = models.CharField(max_length=100)
\`\`\`
Class \`User\` kế thừa \`Model\` → tự động có \`save()\`, \`delete()\`, \`objects.filter()\`. Đây là cách Django giúp developer viết ít code mà có nhiều tính năng.

**Instagram, Pinterest, Disqus** đều xây trên Django, sử dụng pattern này quản lý hàng tỉ records.

## Best Practices ✅

- ✅ Dùng \`super().__init__()\` để gọi parent constructor
- ✅ Override method khi child cần hành vi khác
- ✅ Dùng \`isinstance()\` để check type, không dùng \`type() ==\`
- ✅ Tài liệu hóa rõ method nào được override
- ✅ Giữ class hierarchy dưới 3-4 cấp — sâu hơn rất khó debug

## Anti-patterns ❌

- ❌ Inheritance chỉ để tái sử dụng code (không có "is-a" thực sự) → dùng composition
- ❌ Override method nhưng không gọi \`super()\` khi cần (ví dụ \`__init__\`)
- ❌ Multiple inheritance phức tạp với nhiều parent có method cùng tên → diamond problem
- ❌ Class cha biết chi tiết class con (vi phạm Liskov Substitution Principle)

## Khi nào nên dùng Inheritance?

✅ **Nên:** Khi có quan hệ "is-a" rõ ràng (Dog is an Animal), khi muốn tận dụng polymorphism, khi nhiều class chia sẻ logic chung.

❌ **Không nên:** Khi chỉ muốn tái sử dụng code (dùng helper function/composition), khi quan hệ là "has-a" (dùng composition), khi class con thay đổi quá nhiều behavior của parent.

## Bridge: Bài tiếp theo

Sau khi nắm vững Inheritance + Polymorphism, bạn sẽ học **Decorators & Generators** — hai công cụ Python cấp cao giúp viết code thanh lịch, hiệu năng cao mà OOP truyền thống khó đạt được.`,
        theoryEn: `**Inheritance** and **Polymorphism** are two of OOP's four pillars (with Encapsulation and Abstraction). They enable code reuse and system extensibility without breaking existing code — the Open/Closed principle of SOLID.

## Why Inheritance?

Imagine modeling employees: all share \`name\`, \`salary\`, \`work()\`. Developers add \`languages\`, Managers add \`team_size\`. Without inheritance, you copy-paste shared fields → DRY violation. Inheritance: shared logic in parent \`Employee\`, children add specifics.

## Syntax & Mechanism

\`\`\`python
class Employee:                       # Parent / Base / Superclass
    def __init__(self, name, salary):
        self.name = name; self.salary = salary
    def work(self):
        return f"{self.name} is working"

class Developer(Employee):            # Child / Subclass
    def __init__(self, name, salary, languages):
        super().__init__(name, salary)
        self.languages = languages
    def work(self):                   # Override
        return f"{self.name} codes in {self.languages}"
\`\`\`

**MRO (Method Resolution Order):** Python uses C3 Linearization for multi-inheritance. Inspect with \`ClassName.__mro__\`.

## 4 Types of Inheritance

| Type | Description |
|------|-------------|
| **Single** | One parent → one child |
| **Multilevel** | A → B → C chain |
| **Multiple** | class C(A, B) |
| **Hierarchical** | One parent, many children |

Python supports multiple inheritance (unlike Java) but watch for the **diamond problem**.

## Polymorphism — Same interface, different behavior

\`\`\`python
def make_them_work(employees: list[Employee]):
    for emp in employees:
        print(emp.work())   # Calls correct version automatically
\`\`\`

**Duck Typing** (Pythonic): "If it walks like a duck..." — no inheritance required, just matching methods.

## Abstract Classes

\`\`\`python
from abc import ABC, abstractmethod
class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...
\`\`\`

Forces children to implement specified methods.

## Inheritance vs Composition

| Aspect | Inheritance ("is-a") | Composition ("has-a") |
|--------|---------------------|----------------------|
| Flexibility | Rigid | Flexible, swappable |
| Coupling | Tight | Loose |
| Recommendation | When relationship is clear | Default preference |

> **Composition over Inheritance** — GoF Design Patterns principle.

## Real-world: Django ORM

Django models inherit from \`models.Model\` → gain \`save()\`, \`delete()\`, query API. Instagram, Pinterest, Disqus all leverage this pattern at billion-record scale.

## Best Practices ✅

- Use \`super().__init__()\` to call parent
- Use \`isinstance()\` not \`type() ==\`
- Document overrides clearly
- Keep hierarchy ≤ 3-4 levels deep

## Anti-patterns ❌

- Inheritance just for code reuse (no real "is-a")
- Forgetting \`super()\` calls
- Complex multiple inheritance → diamond problem
- Parent knowing about children (violates Liskov)

## When to Use

✅ Clear "is-a", need polymorphism, shared logic across many classes
❌ Just for reuse (use helpers/composition), "has-a" relationships, child overrides too much

## Bridge

Next: **Decorators & Generators** — high-level Python tools for elegant, performant code beyond traditional OOP.`,
        code: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism in action
animals = [Dog("Rex"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())`,
        codeLanguage: "python",
        exercise: "Tạo class Bird kế thừa từ Animal với method speak() trả về 'Tweet!'",
        exerciseEn: "Create a Bird class inheriting from Animal with speak() returning 'Tweet!'",
        quiz: [
          { question: "Kế thừa (inheritance) cho phép:", options: ["Xóa class cha", "Class con dùng lại code từ class cha", "Tạo biến toàn cục", "Import thư viện"], answer: 1, explanation: "Kế thừa cho phép class con kế thừa thuộc tính và phương thức từ class cha." },
          { question: "Đa hình (polymorphism) nghĩa là:", options: ["Nhiều class, cùng tên method, hành vi khác", "Một class có nhiều tên", "Xóa class cũ", "Tạo biến mới"], answer: 0, explanation: "Đa hình cho phép các class khác nhau có cùng tên method nhưng hành vi khác nhau." },
        ],
      },
    ],
  },
  {
    id: "py-decorators",
    title: "Decorators & Generators",
    titleEn: "Decorators & Generators",
    icon: "🎭",
    color: "from-purple-500 to-purple-700",
    description: "Decorator, generator, yield trong Python",
    descriptionEn: "Decorators, generators, and yield in Python",
    course: "python",
    lessons: [
      {
        id: "py-dec-1",
        title: "Decorators",
        titleEn: "Decorators",
        theory: `# Decorators

## Decorator là gì?
Decorator là một hàm bao bọc (wrap) hàm khác để thêm chức năng mà không sửa code gốc.

## Cú pháp
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function")
        result = func(*args, **kwargs)
        print("After function")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")
\`\`\`

## Ứng dụng thực tế
- Logging (ghi log)
- Đo thời gian chạy (timing)
- Kiểm tra quyền truy cập (authentication)
- Caching (lưu cache)`,
        theoryEn: `# Decorators
A decorator wraps a function to add functionality without modifying the original code. Common uses: logging, timing, authentication, caching.`,
        code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    total = sum(range(1000000))
    return total

result = slow_function()
print(f"Result: {result}")`,
        codeLanguage: "python",
        exercise: "Viết decorator 'count_calls' đếm số lần hàm được gọi",
        exerciseEn: "Write a 'count_calls' decorator that counts how many times a function is called",
        quiz: [
          { question: "Decorator dùng để:", options: ["Xóa hàm", "Thêm chức năng cho hàm mà không sửa code gốc", "Tạo class mới", "Import module"], answer: 1, explanation: "Decorator bao bọc hàm để thêm chức năng mà không thay đổi code bên trong hàm gốc." },
          { question: "Ký hiệu @ trước hàm nghĩa là:", options: ["Comment", "Áp dụng decorator", "Xóa hàm", "Import"], answer: 1, explanation: "@decorator_name là cú pháp ngắn gọn để áp dụng decorator." },
        ],
      },
      {
        id: "py-gen-1",
        title: "Generators & Yield",
        titleEn: "Generators & Yield",
        theory: `# Generators & Yield

## Generator là gì?
Generator là hàm đặc biệt dùng \`yield\` thay vì \`return\`. Nó tạo ra giá trị từng cái một (lazy evaluation).

## Tại sao dùng generator?
- Tiết kiệm bộ nhớ (không load toàn bộ dữ liệu)
- Xử lý dữ liệu lớn
- Tạo chuỗi vô hạn

## Ví dụ
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Lấy 10 số Fibonacci đầu tiên
fib = fibonacci()
for _ in range(10):
    print(next(fib))
\`\`\``,
        theoryEn: `# Generators & Yield
Generators use \`yield\` instead of \`return\` to produce values lazily, one at a time. Great for large datasets and infinite sequences.`,
        code: `def count_up(start=0):
    """Generator đếm lên vô hạn"""
    n = start
    while True:
        yield n
        n += 1

# Sử dụng generator
counter = count_up(1)
for _ in range(5):
    print(next(counter))

# Generator expression (tương tự list comprehension)
squares = (x**2 for x in range(10))
print(list(squares))`,
        codeLanguage: "python",
        exercise: "Viết generator 'even_numbers(n)' yield n số chẵn đầu tiên",
        exerciseEn: "Write a generator 'even_numbers(n)' that yields the first n even numbers",
        quiz: [
          { question: "Generator dùng keyword nào thay cho return?", options: ["give", "send", "yield", "produce"], answer: 2, explanation: "'yield' tạm dừng hàm và trả về giá trị, lần gọi tiếp sẽ chạy tiếp từ đó." },
          { question: "Ưu điểm chính của generator là:", options: ["Chạy nhanh hơn", "Tiết kiệm bộ nhớ", "Code ngắn hơn", "Dễ debug hơn"], answer: 1, explanation: "Generator không load toàn bộ dữ liệu vào bộ nhớ, giúp tiết kiệm RAM." },
        ],
      },
    ],
  },
  {
    id: "py-fileio",
    title: "File I/O",
    titleEn: "File I/O",
    icon: "📁",
    color: "from-green-500 to-green-700",
    description: "Đọc/ghi file, CSV, JSON trong Python",
    descriptionEn: "Reading/writing files, CSV, JSON in Python",
    course: "python",
    lessons: [
      {
        id: "py-fileio-1",
        title: "Đọc & Ghi File",
        titleEn: "Reading & Writing Files",
        theory: `# File I/O trong Python

## Đọc file
\`\`\`python
with open('data.txt', 'r') as f:
    content = f.read()       # Đọc toàn bộ
    lines = f.readlines()    # Đọc từng dòng
\`\`\`

## Ghi file
\`\`\`python
with open('output.txt', 'w') as f:
    f.write("Hello World\\n")

# Append (thêm vào cuối)
with open('log.txt', 'a') as f:
    f.write("New log entry\\n")
\`\`\`

## Modes
- 'r': read (mặc định)
- 'w': write (ghi đè)
- 'a': append (thêm vào cuối)
- 'b': binary mode

## CSV
\`\`\`python
import csv
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)
\`\`\`

## JSON
\`\`\`python
import json
with open('data.json', 'r') as f:
    data = json.load(f)
\`\`\``,
        theoryEn: `# File I/O in Python
Read/write text files with open(). Modes: 'r' (read), 'w' (write), 'a' (append). Use csv and json modules for structured data.`,
        code: `import json
import csv
from io import StringIO

# JSON example
data = {
    "students": [
        {"name": "An", "score": 85},
        {"name": "Binh", "score": 92}
    ]
}
json_str = json.dumps(data, indent=2, ensure_ascii=False)
print("JSON output:")
print(json_str)

# CSV example  
csv_data = "Name,Score\\nAn,85\\nBinh,92"
reader = csv.DictReader(StringIO(csv_data))
print("\\nCSV rows:")
for row in reader:
    print(f"  {row['Name']}: {row['Score']}")`,
        codeLanguage: "python",
        exercise: "Viết hàm đọc file JSON chứa danh sách sinh viên và tính điểm trung bình",
        exerciseEn: "Write a function to read a JSON file of students and calculate the average score",
        quiz: [
          { question: "Mode 'a' trong open() nghĩa là:", options: ["Read", "Write (ghi đè)", "Append (thêm vào cuối)", "Binary"], answer: 2, explanation: "'a' (append) thêm nội dung vào cuối file mà không xóa nội dung cũ." },
          { question: "'with open()' tự động làm gì?", options: ["Xóa file", "Đóng file khi xong", "Tạo backup", "Mã hóa file"], answer: 1, explanation: "'with' statement tự động đóng file khi thoát khỏi block, ngay cả khi có lỗi." },
        ],
      },
    ],
  },
  {
    id: "sql-adv-window",
    title: "SQL Window Functions Nâng cao",
    titleEn: "Advanced SQL Window Functions",
    icon: "🪟",
    color: "from-blue-500 to-blue-700",
    description: "NTILE, PERCENT_RANK, CUME_DIST, frame specification",
    descriptionEn: "Advanced window functions and frame specifications",
    course: "sql",
    lessons: [
      {
        id: "sql-adv-win-1",
        title: "Window Frame & Advanced Functions",
        titleEn: "Window Frame & Advanced Functions",
        theory: `# Advanced Window Functions

## NTILE(n) — Chia thành n nhóm đều
\`\`\`sql
SELECT name, score,
  NTILE(4) OVER (ORDER BY score DESC) AS quartile
FROM students;
\`\`\`

## PERCENT_RANK — Phần trăm xếp hạng
\`\`\`sql
SELECT name, score,
  PERCENT_RANK() OVER (ORDER BY score) AS pct_rank
FROM students;
\`\`\`

## CUME_DIST — Phân phối tích lũy
\`\`\`sql
SELECT name, score,
  CUME_DIST() OVER (ORDER BY score) AS cume
FROM students;
\`\`\`

## Window Frame Specification
\`\`\`sql
-- Running total (tổng tích lũy)
SUM(amount) OVER (
  ORDER BY date
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- Moving average 3 ngày
AVG(price) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
\`\`\``,
        theoryEn: `# Advanced Window Functions
NTILE(n): divide into n groups. PERCENT_RANK: percentile ranking. Frame specs: ROWS BETWEEN for running totals and moving averages.`,
        code: `-- Advanced window functions demo
SELECT 
  employee_name,
  department,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile,
  PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
  SUM(salary) OVER (
    ORDER BY salary 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  AVG(salary) OVER (
    ORDER BY salary 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS moving_avg_3
FROM employees
ORDER BY salary DESC;`,
        codeLanguage: "sql",
        exercise: "Viết query chia sinh viên thành 3 nhóm theo điểm và tính running average",
        exerciseEn: "Write a query to divide students into 3 groups by score and calculate running average",
        quiz: [
          { question: "NTILE(4) chia dữ liệu thành:", options: ["2 nhóm", "3 nhóm", "4 nhóm", "Tùy ý"], answer: 2, explanation: "NTILE(4) chia dữ liệu thành 4 nhóm (quartiles) đều nhau." },
          { question: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW tính:", options: ["Tất cả dòng", "3 dòng gần nhất", "2 dòng trước", "Dòng hiện tại"], answer: 1, explanation: "Nó tính từ 2 dòng trước đến dòng hiện tại = 3 dòng." },
        ],
      },
    ],
  },
  {
    id: "sql-recursive",
    title: "Recursive Queries",
    titleEn: "Recursive Queries",
    icon: "🔄",
    color: "from-indigo-500 to-indigo-700",
    description: "WITH RECURSIVE cho cây phân cấp và đồ thị",
    descriptionEn: "WITH RECURSIVE for hierarchical and graph data",
    course: "sql",
    lessons: [
      {
        id: "sql-recursive-1",
        title: "WITH RECURSIVE",
        titleEn: "WITH RECURSIVE",
        theory: `# Recursive CTE (WITH RECURSIVE)

## Cấu trúc
\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- Base case (anchor)
  SELECT ... 
  UNION ALL
  -- Recursive case
  SELECT ... FROM cte_name WHERE ...
)
SELECT * FROM cte_name;
\`\`\`

## Ví dụ 1: Cây tổ chức
\`\`\`sql
WITH RECURSIVE org_tree AS (
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, t.level + 1
  FROM employees e JOIN org_tree t ON e.manager_id = t.id
)
SELECT * FROM org_tree ORDER BY level;
\`\`\`

## Ví dụ 2: Dãy số
\`\`\`sql
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 10
)
SELECT n FROM nums;
\`\`\``,
        theoryEn: `# Recursive CTE
Structure: base case (anchor) UNION ALL recursive case. Used for hierarchical data (org trees, categories) and sequences.`,
        code: `-- Recursive CTE: Generate a number series
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 20
)
SELECT n, n * n AS square FROM numbers;

-- Hierarchical query: Category tree
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 0 AS depth,
         name AS path
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id, ct.depth + 1,
         ct.path || ' > ' || c.name
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT depth, path FROM category_tree ORDER BY path;`,
        codeLanguage: "sql",
        exercise: "Viết recursive CTE để hiển thị cây menu 3 cấp với indentation",
        exerciseEn: "Write a recursive CTE to display a 3-level menu tree with indentation",
        quiz: [
          { question: "Trong recursive CTE, 'anchor' là:", options: ["Phần lặp lại", "Điều kiện kết thúc", "Trường hợp cơ sở (base case)", "Kết quả cuối"], answer: 2, explanation: "Anchor (base case) là điểm bắt đầu, không đệ quy. Phần recursive sẽ tham chiếu lại CTE." },
          { question: "Recursive CTE thường dùng cho:", options: ["Dữ liệu phẳng", "Dữ liệu phân cấp (cây)", "Chỉ số", "Backup dữ liệu"], answer: 1, explanation: "Recursive CTE rất hữu ích cho dữ liệu phân cấp như cây tổ chức, danh mục lồng nhau." },
        ],
      },
    ],
  },
  {
    id: "data-spark-basics",
    title: "Apache Spark Cơ bản",
    titleEn: "Apache Spark Basics",
    icon: "⚡",
    color: "from-orange-500 to-orange-700",
    description: "Giới thiệu Spark, RDD, DataFrame API",
    descriptionEn: "Introduction to Spark, RDD, DataFrame API",
    course: "data-eng",
    lessons: [
      {
        id: "spark-basics-1",
        title: "Giới thiệu Apache Spark",
        titleEn: "Introduction to Apache Spark",
        theory: `# Apache Spark

## Spark là gì?
Apache Spark là framework xử lý dữ liệu phân tán, nhanh hơn MapReduce 100x nhờ xử lý in-memory.

## Kiến trúc
- **Driver**: Điều phối
- **Executor**: Thực thi trên worker nodes
- **Cluster Manager**: Quản lý tài nguyên (YARN, Mesos, K8s)

## Các API chính
1. **RDD** (Resilient Distributed Dataset): API cấp thấp
2. **DataFrame**: API cấp cao, tối ưu tự động
3. **Dataset**: Type-safe (Scala/Java)
4. **Spark SQL**: Truy vấn SQL trên DataFrame

## Ví dụ PySpark
\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("MyApp").getOrCreate()

# Đọc CSV
df = spark.read.csv("data.csv", header=True, inferSchema=True)

# Transformation
result = df.filter(df.age > 25) \\
           .groupBy("department") \\
           .agg({"salary": "avg"})

result.show()
\`\`\`

## Lazy Evaluation
Spark không thực thi ngay — chỉ tạo execution plan.
Chỉ khi gọi action (show, collect, write) mới thực sự chạy.`,
        theoryEn: `# Apache Spark
Distributed data processing framework, 100x faster than MapReduce. Key APIs: RDD (low-level), DataFrame (high-level), Spark SQL. Uses lazy evaluation.`,
        code: `# PySpark DataFrame example (conceptual)
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder \\
    .appName("SalesAnalysis") \\
    .getOrCreate()

# Read data
sales = spark.read.csv("sales.csv", header=True, inferSchema=True)

# Transformations (lazy)
monthly_sales = sales \\
    .withColumn("month", F.month("date")) \\
    .groupBy("month", "category") \\
    .agg(
        F.sum("amount").alias("total_sales"),
        F.count("*").alias("num_transactions"),
        F.avg("amount").alias("avg_sale")
    ) \\
    .orderBy("month")

# Action (triggers execution)
monthly_sales.show()

# Write result
monthly_sales.write.parquet("output/monthly_sales")`,
        codeLanguage: "python",
        exercise: "Viết PySpark pipeline đọc file JSON, lọc theo điều kiện, group by và ghi ra Parquet",
        exerciseEn: "Write a PySpark pipeline to read JSON, filter, group by, and write to Parquet",
        quiz: [
          { question: "Spark nhanh hơn MapReduce chủ yếu nhờ:", options: ["Ít code hơn", "Xử lý in-memory", "Dùng Python", "Có GUI"], answer: 1, explanation: "Spark xử lý dữ liệu trong bộ nhớ (in-memory) thay vì đọc/ghi đĩa như MapReduce." },
          { question: "Lazy evaluation nghĩa là:", options: ["Chạy ngay khi gọi", "Chỉ tạo plan, chạy khi gọi action", "Chạy chậm", "Không tối ưu"], answer: 1, explanation: "Lazy evaluation: Spark chỉ tạo execution plan, chỉ thực thi khi gọi action như show(), collect()." },
        ],
      },
    ],
  },
];

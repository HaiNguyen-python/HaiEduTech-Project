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
        theory: `**Decorator** là một trong những tính năng mạnh mẽ và "Pythonic" nhất. Nó cho phép bạn **thêm chức năng cho function/class mà không sửa code gốc** — hiện thân của nguyên tắc Open/Closed (mở để mở rộng, đóng để sửa đổi).

## Vì sao cần Decorator?

Hãy tưởng tượng bạn có 50 API endpoints và muốn:
- Log mỗi lần được gọi (ai, khi nào, mất bao lâu)
- Kiểm tra authentication
- Cache kết quả 60 giây
- Đo performance

Cách "ngu ngốc": copy-paste code log/auth/cache vào 50 endpoint → 50 lần sửa khi đổi logic. Cách Pythonic: viết 1 decorator, dùng \`@auth\`, \`@log\`, \`@cache\` — sạch và DRY.

## Cơ chế: Function là First-class Citizen

Trong Python, function là object — có thể gán vào biến, truyền làm tham số, return từ function khác:
\`\`\`python
def greet(name):
    return f"Hello {name}"

say_hi = greet           # function gán vào biến
print(say_hi("An"))      # Hello An
\`\`\`

Decorator tận dụng đặc tính này: nhận function, return function mới (đã wrap thêm logic).

## Cú pháp & Cấu trúc đầy đủ

\`\`\`python
import functools

def log_calls(func):
    @functools.wraps(func)             # giữ metadata gốc
    def wrapper(*args, **kwargs):
        print(f"→ Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"← {func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b
# add(2, 3) tương đương add = log_calls(add); add(2, 3)
\`\`\`

\`@functools.wraps\` rất quan trọng — không có nó, \`add.__name__\` sẽ thành \`"wrapper"\`, làm hỏng debugging và introspection.

## Decorator có tham số

\`\`\`python
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=5, delay=2)
def call_api(url): ...
\`\`\`

3 tầng lồng: outer (nhận tham số) → middle (nhận func) → inner (thực thi).

## Decorator trong các framework lớn

| Framework | Decorator | Công dụng |
|-----------|-----------|-----------|
| **Flask** | \`@app.route("/users")\` | Đăng ký URL routing |
| **FastAPI** | \`@app.get("/api/items")\` | Endpoint + validation |
| **Django** | \`@login_required\` | Bảo vệ view |
| **Pytest** | \`@pytest.fixture\` | Inject test dependencies |
| **Celery** | \`@task\` | Async task queue |
| **Click** | \`@click.command()\` | CLI commands |
| **Numba** | \`@jit\` | Compile thành machine code |

Hiểu decorator = hiểu cách 90% framework Python hoạt động bên dưới.

## Built-in decorators quan trọng

| Decorator | Mục đích |
|-----------|----------|
| \`@staticmethod\` | Method không cần \`self\` |
| \`@classmethod\` | Method nhận \`cls\` thay vì \`self\` |
| \`@property\` | Biến getter thành "fake attribute" |
| \`@functools.cache\` | Memoization tự động (Python 3.9+) |
| \`@functools.lru_cache(maxsize=128)\` | Cache với giới hạn |
| \`@dataclass\` | Auto-gen \`__init__\`, \`__repr__\` |

## Case study: Cache giảm 95% latency

Một startup fintech dùng \`@functools.lru_cache\` cho hàm \`get_exchange_rate(from, to)\` gọi API Forex (mất 200ms/call). Sau khi thêm cache:
- Trước: 1000 req/s × 200ms = quá tải
- Sau: 99% hit cache, p99 latency từ 200ms → 8ms
- Tiết kiệm $4000/tháng tiền API + giảm tải hệ thống

Một dòng \`@lru_cache(maxsize=10000)\` đem lại impact khổng lồ.

## Best Practices ✅

- ✅ Luôn dùng \`@functools.wraps(func)\` để giữ metadata
- ✅ Decorator phải transparent — không thay đổi behavior cốt lõi
- ✅ Tài liệu hóa rõ side effects (log, cache, retry)
- ✅ Đặt tên động từ: \`@cache\`, \`@retry\`, \`@validate\`
- ✅ Test riêng decorator với function dummy

## Anti-patterns ❌

- ❌ Quên \`@functools.wraps\` → debugging trở nên ác mộng
- ❌ Quá nhiều decorator chồng lên (\`@a @b @c @d def f()\`) → khó hiểu thứ tự
- ❌ Decorator có state mutation chia sẻ giữa các call → race condition
- ❌ Dùng decorator thay vì utility function khi không cần wrap

## Khi nào dùng?

✅ **Nên:** Cross-cutting concerns (logging, auth, cache, retry, timing), framework hooks (route, fixture), code lặp lại trên nhiều function.

❌ **Không nên:** Logic phức tạp riêng cho 1 function, khi cần debug step-by-step (decorator làm stack trace dài hơn), khi composition function rõ ràng hơn.

## Bridge: Bài tiếp theo

**Generators** — kỹ thuật Python xử lý dữ liệu lớn mà không cần load vào RAM. Khi kết hợp với decorator, bạn có thể xây pipeline xử lý hàng tỉ records trên laptop cá nhân.`,
        theoryEn: `**Decorator** is one of Python's most powerful features — it adds functionality to functions/classes **without modifying source** (Open/Closed principle).

## Why Decorators?

50 API endpoints needing logging, auth, caching? Without decorators: copy-paste 50 times. With decorators: \`@auth\`, \`@log\`, \`@cache\` — clean and DRY.

## Mechanism: Functions are First-class

\`\`\`python
def greet(name): return f"Hi {name}"
say_hi = greet           # functions can be assigned
\`\`\`

Decorators leverage this: take a function, return a wrapped one.

## Full Syntax

\`\`\`python
import functools

def log_calls(func):
    @functools.wraps(func)              # preserve metadata!
    def wrapper(*args, **kwargs):
        print(f"→ {func.__name__}({args})")
        result = func(*args, **kwargs)
        print(f"← returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b): return a + b
\`\`\`

Without \`@functools.wraps\`, \`add.__name__\` becomes \`"wrapper"\` — breaks debugging.

## Parametrized Decorators

\`\`\`python
def retry(max_attempts=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            for i in range(max_attempts):
                try: return func(*args, **kw)
                except: 
                    if i == max_attempts - 1: raise
        return wrapper
    return decorator
\`\`\`

3 layers: outer (params) → middle (func) → inner (execution).

## Decorators in Major Frameworks

| Framework | Decorator | Purpose |
|-----------|-----------|---------|
| **Flask/FastAPI** | \`@app.route\` | URL routing |
| **Django** | \`@login_required\` | Auth protection |
| **Pytest** | \`@pytest.fixture\` | Test deps |
| **Celery** | \`@task\` | Async queue |
| **Numba** | \`@jit\` | Native compilation |

## Built-ins You Must Know

\`@staticmethod\`, \`@classmethod\`, \`@property\`, \`@functools.cache\`, \`@functools.lru_cache\`, \`@dataclass\`.

## Case study: 95% latency reduction

A fintech startup added \`@lru_cache(maxsize=10000)\` to \`get_exchange_rate()\`. p99 dropped from 200ms → 8ms, saving $4000/month in API costs.

## Best Practices ✅

- Always use \`@functools.wraps(func)\`
- Decorators should be transparent
- Document side effects clearly
- Verb-form names: \`@cache\`, \`@retry\`

## Anti-patterns ❌

- Forgetting \`@wraps\` → debugging hell
- Stacking too many decorators
- Mutable shared state in decorators → race conditions

## When to Use

✅ Cross-cutting concerns (log, auth, cache, retry), framework hooks
❌ Function-specific complex logic, when composition is clearer

## Bridge

Next: **Generators** — process huge datasets without loading into RAM.`,
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
        theory: `**Generator** là một loại function đặc biệt dùng \`yield\` thay vì \`return\`, sản sinh giá trị **lười (lazy)** — chỉ tính khi cần. Đây là chìa khóa xử lý dữ liệu lớn (hàng tỉ records) trên RAM hạn chế.

## Vấn đề mà Generator giải quyết

Bạn cần đọc file log 50GB để đếm số lỗi 500. Cách thông thường:
\`\`\`python
lines = open("server.log").readlines()   # Load 50GB vào RAM → CRASH!
\`\`\`

Cách Generator:
\`\`\`python
def read_log(path):
    with open(path) as f:
        for line in f:        # Đọc từng dòng, RAM chỉ giữ 1 dòng
            yield line

count = sum(1 for line in read_log("server.log") if "500" in line)
\`\`\`

Chạy mượt với laptop 8GB RAM. Đây là sức mạnh của lazy evaluation.

## Cơ chế hoạt động: Trạng thái được "đóng băng"

Khác với function thường (chạy 1 lần rồi xong), generator **dừng tại \`yield\`, giữ nguyên trạng thái local variables**, sẽ tiếp tục từ đó khi gọi \`next()\`.

\`\`\`python
def counter():
    print("Start")
    yield 1
    print("After yield 1")
    yield 2
    print("After yield 2")
    yield 3

g = counter()
print(next(g))  # "Start" → 1
print(next(g))  # "After yield 1" → 2
print(next(g))  # "After yield 2" → 3
print(next(g))  # StopIteration exception
\`\`\`

Mỗi \`next()\` chạy đến \`yield\` tiếp theo rồi dừng — như "tạm dừng thời gian".

## Generator Expression — One-liner

\`\`\`python
# List comprehension (tạo full list ngay)
squares_list = [x**2 for x in range(1_000_000)]   # Tốn ~32MB RAM

# Generator expression (lazy)
squares_gen = (x**2 for x in range(1_000_000))    # Tốn ~200 bytes!
\`\`\`

Chỉ khác dấu \`[]\` → \`()\`, nhưng tiết kiệm RAM hàng nghìn lần.

## So sánh Generator vs List

| Aspect | List \`[]\` | Generator \`()\` |
|--------|-----------|----------------|
| Bộ nhớ | Full data trong RAM | Chỉ 1 phần tử tại 1 thời điểm |
| Tốc độ tạo | Chậm (tính tất cả) | Nhanh (chưa tính gì) |
| Truy cập ngẫu nhiên | \`l[5]\` OK | Không hỗ trợ |
| Lặp lại nhiều lần | OK | Chỉ duyệt được 1 lần |
| Dữ liệu vô hạn | ❌ Crash | ✅ OK |
| len() | ✅ | ❌ |
| Khi nào dùng | Cần truy cập ngẫu nhiên, dữ liệu nhỏ | Stream dữ liệu lớn, pipeline |

## Generator Pipeline — Composable

\`\`\`python
def read_lines(path):
    with open(path) as f:
        for line in f: yield line

def parse_json(lines):
    for line in lines: yield json.loads(line)

def filter_errors(records):
    for r in records:
        if r["status"] >= 500: yield r

# Compose pipeline — không tốn thêm RAM!
errors = filter_errors(parse_json(read_lines("logs.jsonl")))
for e in errors:
    print(e["message"])
\`\`\`

Đây là pattern Spark, Kafka Streams, RxJS đều dùng — generator là nền tảng functional reactive programming.

## yield from — Delegating

\`\`\`python
def sub_gen():
    yield 1; yield 2; yield 3

def main_gen():
    yield 'start'
    yield from sub_gen()    # Delegate to sub
    yield 'end'
\`\`\`

\`yield from\` cho phép một generator "uỷ thác" cho generator khác, dùng nhiều trong asyncio (\`async def\`).

## Case study thực tế

**Apache Beam / Google Dataflow** xử lý hàng petabyte dữ liệu mỗi ngày. Core của nó là PCollection — về bản chất là generator pipeline phân tán.

**Pandas \`read_csv(chunksize=10000)\`** trả generator các DataFrame nhỏ — cách standard để xử lý CSV >100GB trên 1 máy.

**Twitter** dùng generator pattern xử lý 500M tweets/ngày qua streaming pipeline.

## Best Practices ✅

- ✅ Dùng \`()\` thay \`[]\` khi không cần lưu kết quả
- ✅ Đặt tên động từ: \`read_lines\`, \`stream_records\`
- ✅ Dùng \`itertools\` cho generator helpers (\`chain\`, \`islice\`, \`groupby\`)
- ✅ Đóng resources với \`try/finally\` hoặc \`contextmanager\`

## Anti-patterns ❌

- ❌ Convert generator thành list ngay (\`list(gen)\`) — mất hết lợi ích
- ❌ Duyệt lại generator nhiều lần (chỉ chạy được 1 lần) → confusing bugs
- ❌ Dùng generator khi cần truy cập ngẫu nhiên hoặc \`len()\`
- ❌ Generator vô hạn không có break → loop forever

## Khi nào dùng?

✅ **Nên:** Stream dữ liệu lớn, dãy vô hạn (Fibonacci, IDs), pipeline xử lý, đọc/ghi file lớn, API trả về cursor/page.

❌ **Không nên:** Dữ liệu nhỏ (<1000 items), cần lặp nhiều lần, cần \`len()\`/\`indexing\`, cần debug từng phần tử dễ dàng.

## Bridge: Bài tiếp theo

**File I/O** — kết hợp với generator, bạn có thể xây dựng pipeline đọc/xử lý file CSV/JSON khổng lồ với memory footprint tối thiểu.`,
        theoryEn: `**Generators** use \`yield\` instead of \`return\` to produce values **lazily** — only computed when needed. The key to processing massive datasets on limited RAM.

## The Problem They Solve

Reading a 50GB log file with \`readlines()\` → CRASH. With generator:
\`\`\`python
def read_log(path):
    with open(path) as f:
        for line in f: yield line   # 1 line in RAM at a time
\`\`\`

Runs smoothly on 8GB laptop.

## How It Works: Frozen State

Generators **pause at yield**, preserving locals, resume on next \`next()\`:
\`\`\`python
def counter():
    yield 1; yield 2; yield 3
g = counter()
next(g)  # 1
next(g)  # 2 (resumes after yield 1)
\`\`\`

## Generator Expression

\`\`\`python
squares = (x**2 for x in range(1_000_000))   # ~200 bytes
# vs [x**2 for x in range(1_000_000)] — ~32MB
\`\`\`

## Generator vs List

| Aspect | List | Generator |
|--------|------|-----------|
| Memory | Full in RAM | One item at a time |
| Random access | Yes | No |
| Re-iterate | Yes | Single-pass |
| Infinite data | ❌ | ✅ |
| len() | ✅ | ❌ |

## Pipeline Composition

\`\`\`python
errors = filter_errors(parse_json(read_lines("logs.jsonl")))
\`\`\`

Composable, memory-efficient — same pattern as Spark, Kafka Streams.

## yield from — Delegation

\`\`\`python
def main_gen():
    yield from sub_gen()    # delegates
\`\`\`

Used heavily in asyncio.

## Real-world

- **Apache Beam**: petabytes/day via PCollection (generator-based)
- **Pandas \`chunksize\`**: yields DataFrames for >100GB CSV
- **Twitter**: 500M tweets/day via streaming pipelines

## Best Practices ✅

- Use \`()\` over \`[]\` when results aren't stored
- Use \`itertools\` (chain, islice, groupby)
- Close resources with \`try/finally\`

## Anti-patterns ❌

- Immediately \`list(gen)\` — defeats purpose
- Re-iterating consumed generators
- Using generators when random access needed

## When to Use

✅ Streaming, infinite sequences, pipelines, large file I/O
❌ Small data, multi-pass iteration, need len()/indexing

## Bridge

Next: **File I/O** — combined with generators, build pipelines for huge CSV/JSON files with minimal memory.`,
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
        theory: `**File I/O** là kỹ năng nền tảng — mọi ứng dụng đều cần đọc/ghi file (config, log, dữ liệu, export). Python cung cấp API đơn giản nhưng có nhiều "ổ gà" về encoding, performance và resource leak nếu không cẩn thận.

## Vì sao File I/O quan trọng?

Trong production:
- **Log files**: app ghi hàng GB log/ngày để debug
- **Config**: \`.env\`, \`yaml\`, \`json\` lưu cấu hình
- **Data exchange**: CSV/Parquet trao đổi giữa hệ thống
- **State persistence**: lưu user data, cache, session

Hiểu rõ I/O = code mạnh mẽ, không bị "file not found" ở 3 giờ sáng.

## Mở file đúng cách: \`with\` statement

\`\`\`python
# ❌ Sai — không đóng file, leak resource
f = open("data.txt")
data = f.read()
# Quên f.close() → file handle leak

# ✅ Đúng — context manager tự đóng
with open("data.txt", "r", encoding="utf-8") as f:
    data = f.read()
# File tự động đóng kể cả khi có exception
\`\`\`

\`with\` đảm bảo \`__exit__\` chạy → file luôn đóng. Trên Linux mỗi process giới hạn ~1024 file handles — leak là disaster.

## File Modes — Bảng đầy đủ

| Mode | Ý nghĩa | Tạo file mới? | Xóa nội dung cũ? |
|------|---------|---------------|------------------|
| \`r\` | Read (mặc định) | ❌ (FileNotFoundError) | ❌ |
| \`w\` | Write | ✅ | ✅ Xóa hết |
| \`a\` | Append | ✅ | ❌ Thêm cuối |
| \`x\` | Exclusive write | ✅ (FileExistsError nếu có) | — |
| \`r+\` | Read + write | ❌ | ❌ |
| \`b\` | Binary (ghép: \`rb\`, \`wb\`) | — | — |
| \`t\` | Text (mặc định) | — | — |

> Mẹo: dùng \`x\` thay \`w\` khi không muốn đè file cũ — an toàn hơn.

## Encoding: Cạm bẫy lớn nhất

\`\`\`python
# ❌ Mặc định Windows = cp1252, Linux = utf-8 → chạy 1 nơi, lỗi nơi khác
open("vi.txt").read()    # UnicodeDecodeError với 'ư', 'ơ'

# ✅ Luôn explicit
open("vi.txt", encoding="utf-8").read()
\`\`\`

**Quy tắc vàng:** *Luôn* truyền \`encoding="utf-8"\` cho text file. UTF-8 = chuẩn web, hỗ trợ mọi ngôn ngữ.

## Đọc file lớn: KHÔNG dùng \`read()\` hay \`readlines()\`

\`\`\`python
# ❌ Crash với file 10GB
content = open("huge.log").read()   # Load 10GB vào RAM

# ✅ Iteration tự nhiên — đọc từng dòng
with open("huge.log", encoding="utf-8") as f:
    for line in f:                   # Generator, RAM friendly
        process(line)
\`\`\`

File object trong Python **chính là một iterator** — duyệt \`for line in f\` là cách Pythonic và hiệu quả nhất.

## CSV: Dùng \`csv.DictReader\`

\`\`\`python
import csv
with open("students.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)       # Header → dict keys
    for row in reader:
        print(row["name"], row["score"])
\`\`\`

**Tránh tự split bằng \`,\`** — gặp dữ liệu \`"Hà Nội, VN"\` sẽ break. \`csv\` module xử lý quoting, escaping đúng chuẩn RFC 4180.

Với data lớn (>100MB CSV), dùng **Pandas** \`pd.read_csv("file", chunksize=10000)\`.

## JSON: Phân biệt \`load\` vs \`loads\`

| Function | Input | Output |
|----------|-------|--------|
| \`json.load(file)\` | File object | Python object |
| \`json.loads(string)\` | String | Python object |
| \`json.dump(obj, file)\` | Object → File | None |
| \`json.dumps(obj)\` | Object → String | str |

\`\`\`python
# Lưu data (đẹp + Unicode)
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
#                                  ^^^^^^^^^^^^^^^^^^
#                                  Quan trọng cho tiếng Việt!
\`\`\`

\`ensure_ascii=False\` → giữ nguyên \`"Hà Nội"\` thay vì escape thành \`"H\\u00e0 N\\u1ed9i"\`.

## Format khác cho Production

| Format | Khi nào dùng | Tool |
|--------|--------------|------|
| **CSV** | Excel-compatible, nhỏ | csv, pandas |
| **JSON** | Web API, config | json, orjson (nhanh hơn 5x) |
| **YAML** | Config dễ đọc | PyYAML |
| **TOML** | pyproject.toml, config | tomllib (Python 3.11+) |
| **Parquet** | Big data, columnar | pyarrow, pandas |
| **Pickle** | Object Python (không cross-language) | pickle |
| **HDF5** | Scientific, mảng số lớn | h5py |

## Case study: Dropbox và Atomic Write

Dropbox sync hàng tỉ file. Họ dùng pattern **atomic write** để tránh corrupt:
\`\`\`python
import os, tempfile
def atomic_write(path, data):
    dir_ = os.path.dirname(path) or "."
    fd, tmp = tempfile.mkstemp(dir=dir_)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(data)
        os.replace(tmp, path)        # Atomic on POSIX
    except:
        os.unlink(tmp)
        raise
\`\`\`

\`os.replace\` là atomic → file đích hoặc là bản cũ, hoặc là bản mới — không bao giờ là "nửa nạc nửa mỡ" khi có crash giữa chừng.

## Best Practices ✅

- ✅ Luôn dùng \`with open(...)\`
- ✅ Luôn truyền \`encoding="utf-8"\` cho text file
- ✅ Iterate file lớn từng dòng, không \`read()\` hết
- ✅ \`pathlib.Path\` thay \`os.path\` (Python 3.6+, OOP, cross-platform)
- ✅ Atomic write cho file quan trọng (config, state)
- ✅ Validate input file trước khi xử lý

## Anti-patterns ❌

- ❌ Quên \`encoding\` → dev trên Mac/Linux, prod Windows lỗi tiếng Việt
- ❌ \`open()\` không có \`with\` → leak file handle
- ❌ \`readlines()\` cho file 10GB → out of memory
- ❌ Tự split CSV bằng \`,\` → break với data có dấu phẩy trong field
- ❌ \`pickle\` data từ source không tin cậy → arbitrary code execution risk
- ❌ Hardcode đường dẫn \`"C:\\\\Users\\\\..."\` → không cross-platform

## Khi nào dùng?

✅ Lưu config, log, export data, exchange giữa hệ thống.
❌ Dữ liệu cần query phức tạp (dùng SQLite/Postgres), dữ liệu rất lớn cần phân tán (dùng cloud storage).

## Bridge: Bài tiếp theo

Phần tiếp theo: **Advanced SQL Window Functions** — khi data đã đọc vào database, làm sao xếp hạng, tính running total, moving average hiệu quả? Đáp án: window functions.`,
        theoryEn: `**File I/O** is foundational — every app reads/writes files (config, logs, data, exports). Python's API is simple but has pitfalls around encoding, performance, and resource leaks.

## Why File I/O Matters

In production: gigabytes of logs daily, config files, CSV/Parquet data exchange, state persistence. Robust I/O = no 3am "file not found" pages.

## Open Properly: \`with\` Statement

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    data = f.read()
# Auto-closed even on exception
\`\`\`

Linux limits ~1024 file handles per process — leaks are disaster.

## File Modes

| Mode | Meaning | Creates? | Truncates? |
|------|---------|----------|------------|
| \`r\` | Read (default) | ❌ | ❌ |
| \`w\` | Write | ✅ | ✅ |
| \`a\` | Append | ✅ | ❌ |
| \`x\` | Exclusive write | ✅ (errors if exists) | — |
| \`b\` | Binary | — | — |

Use \`x\` over \`w\` to avoid overwriting.

## Encoding: Biggest Pitfall

\`\`\`python
# ❌ Default differs Windows/Linux
open("vi.txt").read()              # UnicodeDecodeError

# ✅ Explicit
open("vi.txt", encoding="utf-8").read()
\`\`\`

**Golden rule:** *Always* pass \`encoding="utf-8"\` for text files.

## Large Files: Iterate, Don't Read All

\`\`\`python
# ❌ Crashes on 10GB file
content = open("huge.log").read()

# ✅ Iterate (file is a generator!)
with open("huge.log", encoding="utf-8") as f:
    for line in f:
        process(line)
\`\`\`

## CSV: Use \`csv.DictReader\`

\`\`\`python
import csv
with open("data.csv", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"])
\`\`\`

Don't manually split on \`,\` — fails with quoted commas. For >100MB, use \`pd.read_csv(chunksize=)\`.

## JSON: load vs loads

| Function | Input | Output |
|----------|-------|--------|
| \`json.load(file)\` | File | Object |
| \`json.loads(str)\` | String | Object |
| \`json.dump(obj, file)\` | Save to file | — |
| \`json.dumps(obj)\` | Object → str | str |

\`\`\`python
json.dump(data, f, indent=2, ensure_ascii=False)
#                            ^ keeps "Hà Nội" readable
\`\`\`

## Production Formats

| Format | Use Case | Tool |
|--------|----------|------|
| **CSV** | Excel-compat | csv, pandas |
| **JSON** | Web/config | json, orjson |
| **YAML** | Human config | PyYAML |
| **TOML** | pyproject.toml | tomllib |
| **Parquet** | Big data | pyarrow |
| **Pickle** | Python objects | pickle (unsafe!) |

## Case Study: Dropbox Atomic Write

\`\`\`python
def atomic_write(path, data):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path) or ".")
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(data)
    os.replace(tmp, path)        # atomic on POSIX
\`\`\`

Either old or new file — never half-written.

## Best Practices ✅

- Always use \`with open(...)\`
- Always pass \`encoding="utf-8"\`
- Iterate large files line-by-line
- Use \`pathlib.Path\` (modern, cross-platform)
- Atomic writes for critical files

## Anti-patterns ❌

- Forgetting encoding → Vietnamese text breaks
- \`open()\` without \`with\` → handle leaks
- \`readlines()\` on huge files → OOM
- Manual CSV splitting on \`,\`
- \`pickle\` from untrusted sources → RCE

## When to Use

✅ Config, logs, data export/import
❌ Complex queries (use DB), distributed scale (use cloud storage)

## Bridge

Next: **Advanced SQL Window Functions** — once data is in DB, how to rank, compute running totals, moving averages efficiently.`,
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
        theory: `**Window Functions** là một trong những tính năng mạnh mẽ nhất của SQL hiện đại — cho phép tính toán **trên một tập hợp các hàng liên quan đến hàng hiện tại** mà không gộp chúng lại (như GROUP BY). Đây là kỹ năng "must-have" cho data analyst, BI developer.

## Vì sao Window Functions thay đổi cuộc chơi?

Trước khi có window functions (chuẩn SQL:2003), để tính "running total", "rank within group", "month-over-month growth" cần subquery phức tạp hoặc self-join — vừa khó viết, vừa chậm. Window functions giải quyết trong 1 dòng, chạy nhanh hơn 10-100 lần nhờ optimizer hiểu intent.

Hiện được hỗ trợ bởi: PostgreSQL, MySQL 8+, SQL Server, Oracle, BigQuery, Snowflake, Redshift, DuckDB.

## Cú pháp tổng quát

\`\`\`sql
function() OVER (
  PARTITION BY col1, col2     -- Chia thành nhóm (tương tự GROUP BY)
  ORDER BY col3 [ASC|DESC]    -- Sắp xếp trong mỗi nhóm
  ROWS|RANGE BETWEEN ... AND ... -- Frame: phạm vi hàng
)
\`\`\`

3 mệnh đề chính: **PARTITION BY** (nhóm), **ORDER BY** (sắp xếp trong nhóm), **frame clause** (phạm vi rows tham gia tính toán).

## Phân loại Window Functions

| Nhóm | Function | Mô tả |
|------|----------|-------|
| **Ranking** | \`ROW_NUMBER()\` | Số thứ tự duy nhất 1, 2, 3... |
|  | \`RANK()\` | Hạng, gap khi tie (1, 2, 2, 4) |
|  | \`DENSE_RANK()\` | Hạng không gap (1, 2, 2, 3) |
|  | \`NTILE(n)\` | Chia thành n nhóm đều |
|  | \`PERCENT_RANK()\` | Phần trăm hạng (0..1) |
|  | \`CUME_DIST()\` | Cumulative distribution |
| **Aggregate** | \`SUM/AVG/COUNT/MIN/MAX OVER()\` | Tổng/TB/đếm theo cửa sổ |
| **Value (Offset)** | \`LAG(col, n)\` | Giá trị n hàng trước |
|  | \`LEAD(col, n)\` | Giá trị n hàng sau |
|  | \`FIRST_VALUE/LAST_VALUE\` | Đầu/cuối cửa sổ |
|  | \`NTH_VALUE(col, n)\` | Giá trị thứ n |

## Frame Clause — Trái tim của Window Function

Frame xác định **những hàng nào** tham gia tính toán cho hàng hiện tại:

\`\`\`sql
ROWS BETWEEN <start> AND <end>

-- Các tùy chọn:
UNBOUNDED PRECEDING    -- Từ đầu partition
n PRECEDING            -- n hàng trước
CURRENT ROW            -- Hàng hiện tại
n FOLLOWING            -- n hàng sau
UNBOUNDED FOLLOWING    -- Đến cuối partition
\`\`\`

**3 frame patterns kinh điển:**

\`\`\`sql
-- 1. Running total (tổng tích luỹ)
SUM(amount) OVER (ORDER BY date 
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- 2. Moving average 7 ngày (3 trước + hiện tại + 3 sau)
AVG(price) OVER (ORDER BY date 
  ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING)

-- 3. Centered moving average / smoothing
AVG(value) OVER (ORDER BY ts 
  ROWS BETWEEN 5 PRECEDING AND 5 FOLLOWING)
\`\`\`

**ROWS vs RANGE:** \`ROWS\` đếm theo số hàng vật lý. \`RANGE\` đếm theo giá trị (ví dụ "trong vòng 7 ngày" — kể cả có nhiều hàng cùng ngày).

## Pattern thực tế #1: Top-N per Group

"Lấy 3 sản phẩm bán chạy nhất mỗi danh mục":
\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY category ORDER BY revenue DESC
  ) AS rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\`

## Pattern #2: Period-over-Period Growth

"Tăng trưởng doanh thu so với tháng trước":
\`\`\`sql
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month,
  ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month)) 
        / LAG(revenue) OVER (ORDER BY month), 2) AS growth_pct
FROM monthly_sales;
\`\`\`

## Pattern #3: Sessionization

"Gom các event của user thành session, mỗi session cách nhau >30 phút":
\`\`\`sql
WITH gaps AS (
  SELECT user_id, event_time,
    EXTRACT(EPOCH FROM event_time 
      - LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time)) / 60 AS gap_min
  FROM events
)
SELECT *, SUM(CASE WHEN gap_min > 30 OR gap_min IS NULL THEN 1 ELSE 0 END) 
  OVER (PARTITION BY user_id ORDER BY event_time) AS session_id
FROM gaps;
\`\`\`

Đây là cách Google Analytics, Mixpanel sessionize hàng tỉ events.

## Pattern #4: Quartile / Percentile Cohorts

"Chia học sinh thành 4 nhóm theo điểm cho phân tích cohort":
\`\`\`sql
SELECT name, score, NTILE(4) OVER (ORDER BY score DESC) AS quartile
FROM students;
\`\`\`

## So sánh: Window Function vs GROUP BY

| Khía cạnh | GROUP BY | Window Function |
|-----------|----------|-----------------|
| Số hàng output | Giảm (1 hàng/group) | Giữ nguyên |
| Truy cập detail | Mất | Vẫn còn |
| Tính trên group | ✅ | ✅ |
| So sánh với detail | ❌ Cần subquery | ✅ Trực tiếp |
| Performance | Nhanh | Hơi chậm hơn (cần sort) |

> Quy tắc: cần giữ chi tiết + tính group → window. Cần aggregate giảm hàng → GROUP BY.

## Case study: Stripe Revenue Analytics

Stripe dùng window functions cực mạnh trong analytics dashboard:
- **MRR running total**: \`SUM(mrr) OVER (ORDER BY month)\`
- **Churn rate per cohort**: \`NTILE\` chia user theo signup month
- **Cohort retention curves**: \`LAG/LEAD\` so sánh activity qua tháng
- **Anomaly detection**: \`AVG/STDDEV OVER\` để tìm outlier

Một query window function thay thế cho 5-10 query phụ + Python join — giảm latency dashboard từ 30s xuống 2s.

## Best Practices ✅

- ✅ Luôn có \`ORDER BY\` trong window khi dùng frame
- ✅ Tận dụng CTE để window function dễ đọc
- ✅ Index trên cột \`PARTITION BY\` + \`ORDER BY\` để tăng tốc
- ✅ Test với \`EXPLAIN ANALYZE\` để check sort cost
- ✅ Dùng \`ROWS\` cho clarity, \`RANGE\` chỉ khi thực sự cần ngữ nghĩa giá trị

## Anti-patterns ❌

- ❌ Quên \`ORDER BY\` khi cần thứ tự (LAG/LEAD/running total) → kết quả không deterministic
- ❌ Lạm dụng window khi GROUP BY đủ → tốn memory cho sort không cần thiết
- ❌ Default frame của \`AVG\` khi có \`ORDER BY\` là \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` → không phải ai cũng biết
- ❌ Window function trong \`WHERE\` → không hợp lệ, phải bọc CTE/subquery

## Khi nào dùng?

✅ Ranking, running total, moving average, period-over-period, sessionization, percentile, top-N per group, cumulative metrics.

❌ Aggregate đơn giản (SUM/COUNT toàn bảng) — GROUP BY đủ.

## Bridge: Bài tiếp theo

**Recursive CTE** — khi dữ liệu của bạn là cây/đồ thị (org chart, danh mục lồng nhau, friend graph), window function không đủ. Bạn cần \`WITH RECURSIVE\`.`,
        theoryEn: `**Window Functions** are SQL's most powerful modern feature — compute over **a window of related rows** without collapsing them (unlike GROUP BY). Must-have skill for data analysts and BI devs.

## Why They Matter

Pre-window (SQL:2003), running totals, ranking, period-over-period required complex subqueries/self-joins. Window functions: one line, 10-100× faster. Supported by PostgreSQL, MySQL 8+, BigQuery, Snowflake, Redshift, DuckDB.

## Syntax

\`\`\`sql
function() OVER (
  PARTITION BY col1
  ORDER BY col2
  ROWS BETWEEN ... AND ...
)
\`\`\`

## Categories

| Group | Functions |
|-------|-----------|
| **Ranking** | ROW_NUMBER, RANK, DENSE_RANK, NTILE, PERCENT_RANK, CUME_DIST |
| **Aggregate** | SUM/AVG/COUNT/MIN/MAX OVER() |
| **Value/Offset** | LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE |

## Frame Clause — The Heart

\`\`\`sql
ROWS BETWEEN <start> AND <end>
-- options: UNBOUNDED PRECEDING, n PRECEDING, CURRENT ROW, n FOLLOWING, UNBOUNDED FOLLOWING
\`\`\`

3 classic patterns:
\`\`\`sql
-- Running total
SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)

-- 7-day moving average (centered)
AVG(price) OVER (ORDER BY date ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING)
\`\`\`

**ROWS vs RANGE:** ROWS counts physical rows. RANGE counts by value (e.g., "within 7 days").

## Pattern: Top-N per Group

\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\`

## Pattern: Period-over-Period

\`\`\`sql
SELECT month, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month
FROM monthly_sales;
\`\`\`

## Pattern: Sessionization (Google Analytics style)

Group events into sessions when gap > 30 min using \`LAG\` + cumulative \`SUM\`.

## Window vs GROUP BY

| Aspect | GROUP BY | Window |
|--------|----------|--------|
| Output rows | Reduced | Same |
| Detail access | Lost | Preserved |
| Compare to detail | ❌ Subquery | ✅ Direct |

## Case Study: Stripe Analytics

Stripe uses window functions heavily: MRR running totals, cohort retention via \`LAG/LEAD\`, anomaly detection with \`STDDEV OVER\`. Replaces 5-10 subqueries → dashboard latency 30s → 2s.

## Best Practices ✅

- Always include \`ORDER BY\` when using frames
- Use CTEs for readability
- Index \`PARTITION BY\` + \`ORDER BY\` columns
- Test with EXPLAIN ANALYZE

## Anti-patterns ❌

- Missing \`ORDER BY\` for LAG/LEAD → non-deterministic
- Default RANGE frame surprises (when ORDER BY present)
- Window in \`WHERE\` clause (illegal — wrap in CTE)

## When to Use

✅ Ranking, running totals, moving averages, period comparisons, sessionization, top-N per group
❌ Simple aggregates (use GROUP BY)

## Bridge

Next: **Recursive CTE** — for tree/graph data (org charts, nested categories), window functions aren't enough.`,
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
        theory: `**Recursive CTE** (Common Table Expression đệ quy) là vũ khí bí mật của SQL để xử lý dữ liệu **phân cấp (hierarchical)** và **đồ thị (graph)** — những thứ mà SQL truyền thống cực kỳ khó. Nó cho phép một CTE tham chiếu chính nó.

## Vì sao cần Recursive CTE?

Hãy thử trả lời các câu hỏi sau bằng SQL thường:
- "Liệt kê tất cả nhân viên dưới quyền CEO (bất kỳ cấp nào)"
- "Hiển thị cây danh mục e-commerce (cha → con → cháu)"
- "Tìm đường ngắn nhất giữa 2 thành phố trong bảng routes"
- "Tạo dãy 100 ngày liên tiếp từ một ngày bắt đầu"

Tất cả đều cần **lặp đi lặp lại** đến khi điều kiện dừng — đó là đệ quy. Recursive CTE giải quyết tất cả trong 1 query duy nhất.

## Cú pháp & 2 phần bắt buộc

\`\`\`sql
WITH RECURSIVE cte_name (col1, col2, ...) AS (
  -- 1️⃣ ANCHOR (base case) — chạy 1 lần đầu
  SELECT initial_values FROM table WHERE start_condition

  UNION ALL                       -- bắt buộc UNION ALL, không phải UNION

  -- 2️⃣ RECURSIVE — chạy lặp, tham chiếu chính cte_name
  SELECT new_values 
  FROM table JOIN cte_name ON ...
  WHERE termination_condition     -- BẮT BUỘC có điều kiện dừng
)
SELECT * FROM cte_name;
\`\`\`

> Quên \`UNION ALL\` hoặc điều kiện dừng → infinite loop → query crash.

## Cách thực thi (mental model)

\`\`\`
Bước 0: Anchor → Result_0
Bước 1: Recursive trên Result_0 → Result_1
Bước 2: Recursive trên Result_1 → Result_2
...
Bước N: Result_N rỗng → Dừng
Cuối cùng: UNION tất cả Result_0 + Result_1 + ... + Result_N
\`\`\`

PostgreSQL/SQL Server có \`MAX_RECURSION\` (mặc định 100-1000) để tránh runaway.

## Ví dụ #1: Sinh dãy số / dãy ngày

\`\`\`sql
-- Tạo 30 ngày liên tiếp từ 2024-01-01
WITH RECURSIVE dates AS (
  SELECT DATE '2024-01-01' AS d
  UNION ALL
  SELECT d + 1 FROM dates WHERE d < DATE '2024-01-30'
)
SELECT * FROM dates;
\`\`\`

Cực hữu ích cho **date dimension table**, fill missing dates trong time series.

## Ví dụ #2: Cây tổ chức (Org Chart)

\`\`\`sql
-- employees(id, name, manager_id)
WITH RECURSIVE org AS (
  -- Anchor: CEO (manager_id IS NULL)
  SELECT id, name, manager_id, 1 AS level, name::text AS path
  FROM employees WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive: đi xuống mỗi cấp
  SELECT e.id, e.name, e.manager_id, o.level + 1, 
         o.path || ' > ' || e.name
  FROM employees e
  JOIN org o ON e.manager_id = o.id
)
SELECT level, path FROM org ORDER BY path;
\`\`\`

Output:
\`\`\`
1 | CEO Linh
2 | CEO Linh > VP Hùng
3 | CEO Linh > VP Hùng > Manager An
4 | CEO Linh > VP Hùng > Manager An > Dev Bình
\`\`\`

## Ví dụ #3: Bill of Materials (BOM)

Một sản phẩm gồm nhiều bộ phận, mỗi bộ phận lại gồm các bộ phận con. Tính tổng cost:
\`\`\`sql
WITH RECURSIVE bom AS (
  SELECT part_id, parent_id, qty, cost FROM parts WHERE part_id = 'CAR'
  UNION ALL
  SELECT p.part_id, p.parent_id, p.qty * b.qty, p.cost
  FROM parts p JOIN bom b ON p.parent_id = b.part_id
)
SELECT SUM(qty * cost) FROM bom;
\`\`\`

Toyota, Boeing dùng pattern này quản lý hàng triệu linh kiện.

## Ví dụ #4: Graph Traversal — Friends of Friends

\`\`\`sql
WITH RECURSIVE network AS (
  SELECT friend_id, 1 AS hops 
  FROM friendships WHERE user_id = 100
  UNION
  SELECT f.friend_id, n.hops + 1
  FROM friendships f JOIN network n ON f.user_id = n.friend_id
  WHERE n.hops < 3                 -- giới hạn 3 hops
)
SELECT DISTINCT friend_id, MIN(hops) FROM network GROUP BY friend_id;
\`\`\`

Lưu ý dùng \`UNION\` (không ALL) để tránh duplicate khi có cycle.

## So sánh: Recursive CTE vs các giải pháp khác

| Giải pháp | Ưu điểm | Nhược điểm |
|-----------|---------|------------|
| **Recursive CTE** | Standard SQL, không cần app code | Có thể chậm với cây sâu |
| **Adjacency List + Loop trong app** | Linh hoạt | N+1 query, slow |
| **Nested Sets (LFT/RGT)** | Read cực nhanh | Insert/update phức tạp |
| **Materialized Path** | Read nhanh, dễ hiểu | Update khó, hạn chế length |
| **Closure Table** | Read/write balanced | Tốn storage |
| **Graph DB (Neo4j)** | Tối ưu cho graph | Thêm tech stack |

> Quy tắc: dữ liệu nhỏ-vừa (<100k node) → Recursive CTE. Dữ liệu lớn, traversal nhiều → Closure Table hoặc Neo4j.

## Case study: GitLab và quyền truy cập group

GitLab có **nested groups** (group lồng group). Để check user có quyền ở project, cần đi từ project → parent group → grandparent group → ... đến top. GitLab dùng recursive CTE trên PostgreSQL — đơn giản, hiệu quả, không cần thêm graph DB.

## Best Practices ✅

- ✅ **Luôn có điều kiện dừng** rõ ràng (WHERE level < N hoặc tương tự)
- ✅ Dùng \`UNION ALL\` cho performance, \`UNION\` chỉ khi có cycle
- ✅ Index trên cột JOIN (parent_id) để tăng tốc
- ✅ Track \`level\` hoặc \`path\` để debug
- ✅ Test với dữ liệu nhỏ trước khi chạy production
- ✅ Set \`MAX_RECURSION\` thấp khi prototype

## Anti-patterns ❌

- ❌ Không có điều kiện dừng → infinite loop, server hang
- ❌ \`UNION\` thay vì \`UNION ALL\` khi không có cycle → sort tốn kém
- ❌ JOIN nhiều bảng trong recursive part → exponential blowup
- ❌ Recursive CTE cho dữ liệu nông (1-2 cấp) → JOIN thường nhanh hơn
- ❌ Cycle trong dữ liệu mà không xử lý → infinite loop

## Khi nào dùng?

✅ **Nên:** Org chart, category tree, BOM, comment threads, file system, route finding, sinh date series, hierarchical aggregation.

❌ **Không nên:** Cây cực sâu (>100 cấp), graph cực lớn (millions of nodes) — dùng Neo4j/JanusGraph. Khi cấu trúc cây fixed (luôn 2-3 cấp) — dùng JOIN thường.

## Bridge: Bài tiếp theo

**Apache Spark** — khi data quá lớn cho 1 database (>1TB), bạn cần phân tán xử lý ra cluster. Spark là framework #1 cho big data trong industry.`,
        theoryEn: `**Recursive CTE** is SQL's secret weapon for **hierarchical** and **graph** data — things normal SQL struggles with. It lets a CTE reference itself.

## Why Recursive CTE?

Try answering with regular SQL:
- "All employees under the CEO at any level"
- "E-commerce category tree (parent → child → grandchild)"
- "Shortest path between two cities"
- "Generate 100 consecutive dates"

All require iteration until termination — recursion. Recursive CTE solves all in one query.

## Syntax & Two Required Parts

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- 1️⃣ ANCHOR (base case) — runs once
  SELECT initial_values WHERE start_condition

  UNION ALL                  -- must be UNION ALL, not UNION

  -- 2️⃣ RECURSIVE — references cte_name
  SELECT new_values FROM table JOIN cte_name ON ...
  WHERE termination_condition  -- REQUIRED termination
)
SELECT * FROM cte_name;
\`\`\`

> Missing UNION ALL or termination → infinite loop → crash.

## Execution Mental Model

Anchor → Result_0; Recursive on R0 → R1; on R1 → R2; ... until empty. Final: UNION all results. PostgreSQL has \`MAX_RECURSION\` safety.

## Example #1: Date Series

\`\`\`sql
WITH RECURSIVE dates AS (
  SELECT DATE '2024-01-01' AS d
  UNION ALL
  SELECT d + 1 FROM dates WHERE d < DATE '2024-01-30'
)
SELECT * FROM dates;
\`\`\`

Great for date dimensions, filling time series gaps.

## Example #2: Org Chart

\`\`\`sql
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS level, name::text AS path
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.level + 1, o.path || ' > ' || e.name
  FROM employees e JOIN org o ON e.manager_id = o.id
)
SELECT level, path FROM org;
\`\`\`

## Example #3: Bill of Materials (Toyota, Boeing)

Roll up costs of nested parts.

## Example #4: Friends of Friends (3-hop graph)

Use \`UNION\` (not ALL) to dedupe in cycles.

## Comparison

| Solution | Pros | Cons |
|----------|------|------|
| **Recursive CTE** | Standard SQL | Slower for deep trees |
| **Adjacency + App loop** | Flexible | N+1 query |
| **Nested Sets** | Fast reads | Hard updates |
| **Materialized Path** | Simple reads | Length limits |
| **Closure Table** | Balanced | Storage cost |
| **Graph DB (Neo4j)** | Optimal for graphs | Extra stack |

## Case Study: GitLab Nested Groups

GitLab uses recursive CTE on PostgreSQL to check access through nested group hierarchies — no separate graph DB needed.

## Best Practices ✅

- Always include termination condition
- Use UNION ALL for performance (UNION only for cycles)
- Index parent_id columns
- Track level/path for debugging
- Test on small data first

## Anti-patterns ❌

- No termination → infinite loop
- UNION instead of UNION ALL when no cycle → costly sort
- Many JOINs in recursive part → exponential blowup
- Cycles without handling → infinite loop

## When to Use

✅ Org charts, category trees, BOM, comment threads, file systems, date series
❌ Very deep trees (>100 levels), millions of nodes (use Neo4j), fixed shallow structure (use JOIN)

## Bridge

Next: **Apache Spark** — when data exceeds single DB (>1TB), distribute across a cluster. Spark is the industry #1 big data framework.`,
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
        theory: `**Apache Spark** là framework #1 cho **xử lý dữ liệu phân tán** trong industry — Netflix, Uber, Airbnb, Shopify, Pinterest dùng để xử lý petabytes/ngày.

## Vì sao Spark thay thế Hadoop MapReduce?

MapReduce ghi ra HDFS giữa mỗi stage → cực chậm. Spark giữ data **trong RAM** → nhanh hơn 10-100×, đặc biệt với iterative workload (ML, graph).

## Kiến trúc

\`\`\`
Driver (coordinator) → schedule tasks
   ↓
Executors (workers) → chạy tasks song song, cache data trong RAM
   ↑
Cluster Manager (YARN/K8s/Mesos) → cấp resource
\`\`\`

## 3 API levels

| API | Performance | Khi nào dùng |
|-----|-------------|--------------|
| **RDD** | Chậm hơn | Custom logic phức tạp |
| **DataFrame** | Nhanh (Catalyst) | **Mặc định 95% case** |
| **Dataset** | Nhanh, type-safe | Scala/Java |
| **Spark SQL** | Nhanh | Analyst dùng SQL |

> Luôn ưu tiên DataFrame/SQL.

## Lazy Evaluation & DAG Optimizer

Spark **không chạy** transformation — chỉ build DAG. Action mới trigger:

\`\`\`python
df = spark.read.csv("sales.csv")        # lazy
filtered = df.filter(df.amount > 100)   # lazy
filtered.show()                         # ACTION — chạy bây giờ
\`\`\`

**Catalyst Optimizer** rewrites DAG: predicate pushdown, column pruning, join reordering.

| Loại | Ví dụ |
|------|-------|
| Transformations (lazy) | filter, select, groupBy, join, withColumn |
| Actions (trigger) | show, collect, count, write, take |

## Narrow vs Wide Transformations

- **Narrow** (filter, select): không shuffle → nhanh
- **Wide** (groupBy, join, distinct): cần shuffle dữ liệu giữa nodes → chậm + tốn network

Tối ưu Spark = giảm shuffle.

## Ví dụ PySpark đầy đủ

\`\`\`python
from pyspark.sql import SparkSession, functions as F
spark = SparkSession.builder.appName("SalesETL").getOrCreate()

result = (spark.read.parquet("s3://bucket/sales/")
    .filter(F.col("date") >= "2024-01-01")
    .withColumn("revenue", F.col("price") * F.col("quantity"))
    .groupBy("region", "category")
    .agg(F.sum("revenue").alias("total_revenue"))
    .orderBy(F.desc("total_revenue")))

result.write.mode("overwrite").parquet("s3://bucket/output/")
\`\`\`

## File formats: Parquet > CSV

| Format | Read speed | Storage | Pushdown |
|--------|-----------|---------|----------|
| CSV | Chậm | Lớn | Không |
| **Parquet** | **Nhanh** | **Nhỏ (10x)** | **Có** |
| Delta Lake | Parquet + ACID | + log | Có |

> Big data production luôn dùng **Parquet** (columnar) — nhanh hơn CSV 10-100×.

## Case study: Netflix — 1 EB/ngày

Netflix xử lý **1 exabyte/ngày** trên Spark + S3 + Iceberg cho personalization (250M users), A/B testing, billing. Hàng nghìn nodes, dùng AQE (Adaptive Query Execution) tự động re-optimize.

## Case study: Uber — 15T messages/ngày

Uber dùng Spark Structured Streaming + Kafka cho surge pricing, driver matching, fraud detection. Latency end-to-end <1 giây.

## Khi nào dùng?

✅ **Nên:** Data >100GB, ETL phức tạp nhiều stage, streaming từ Kafka, ML training trên dataset lớn.

❌ **Không nên:** Data <10GB (Pandas/DuckDB nhanh hơn), latency <100ms cho từng query (dùng DB), prototype đơn giản.

## Best Practices ✅

- ✅ Luôn dùng **Parquet** thay CSV
- ✅ **Cache** DataFrame được reuse nhiều lần (\`df.cache()\`)
- ✅ **Broadcast join** khi 1 bảng nhỏ (<100MB): \`F.broadcast(small_df)\`
- ✅ Partition theo cột query thường xuyên
- ✅ Tránh \`collect()\` trên data lớn → driver OOM
- ✅ Monitor qua Spark UI (port 4040)
- ✅ Bật **AQE** từ Spark 3+

## Anti-patterns ❌

- ❌ \`collect()\` 1TB về driver → crash
- ❌ \`.toPandas()\` trên big data → OOM
- ❌ Python UDF khi có function built-in (chậm 10-100×)
- ❌ Data skew (1 key chiếm 90% data) → 1 task chạy mãi
- ❌ Quá nhiều small files (<128MB) → overhead lớn
- ❌ Dùng RDD cho structured data → mất Catalyst

## Hành trình tiếp theo

Nắm vững Spark là bước cuối hoàn thiện foundation Data Engineering. Tiếp theo: **Spark Streaming** (real-time), **Delta Lake** (ACID trên data lake), **Spark MLlib** (ML phân tán), hoặc **Databricks** (managed Spark được Netflix, Shell, Comcast dùng).`,
        theoryEn: `**Apache Spark** is the industry's #1 distributed data processing framework — used by Netflix, Uber, Airbnb to process petabytes daily.

## Why Spark Replaced MapReduce

MapReduce writes to HDFS between stages → slow. Spark keeps data **in RAM** → 10-100× faster. Critical for iterative workloads (ML, graphs).

## Architecture

Driver coordinates → Executors run tasks in parallel, cache in RAM → Cluster Manager (YARN/K8s) allocates resources.

## 3 API Levels

| API | Performance | When |
|-----|-------------|------|
| RDD | Slower | Custom complex logic |
| **DataFrame** | Fast (Catalyst) | **Default 95%** |
| Dataset | Fast, type-safe | Scala/Java |
| Spark SQL | Fast | Analyst SQL |

## Lazy Evaluation & DAG

Spark builds a DAG; only **actions** trigger execution. Catalyst Optimizer rewrites: predicate pushdown, column pruning, join reordering.

| Type | Examples |
|------|----------|
| Transformations (lazy) | filter, select, groupBy, join |
| Actions (trigger) | show, collect, count, write |

## Narrow vs Wide

- **Narrow** (filter, select): no shuffle → fast
- **Wide** (groupBy, join): shuffle → slow + network-heavy

Optimize = minimize shuffle.

## PySpark Example

\`\`\`python
result = (spark.read.parquet("s3://bucket/sales/")
    .filter(F.col("date") >= "2024-01-01")
    .groupBy("region")
    .agg(F.sum("revenue").alias("total"))
    .orderBy(F.desc("total")))
result.write.mode("overwrite").parquet("s3://bucket/out/")
\`\`\`

## File Formats

| Format | Speed | Storage | Pushdown |
|--------|-------|---------|----------|
| CSV | Slow | Large | No |
| **Parquet** | **Fast** | **10× smaller** | **Yes** |
| Delta Lake | Parquet + ACID | + log | Yes |

> Always use **Parquet** in production.

## Case Study: Netflix — 1 EB/day

Netflix processes **1 exabyte/day** on Spark + S3 + Iceberg for personalization (250M users), A/B testing, billing. Thousands of nodes with AQE.

## Case Study: Uber — 15T messages/day

Uber uses Spark Structured Streaming with Kafka for surge pricing, driver matching, fraud detection. Sub-second end-to-end latency.

## When to Use

✅ Data >100GB, complex ETL, streaming, distributed ML
❌ Data <10GB (use Pandas/DuckDB), <100ms latency (use DB), simple scripts

## Best Practices ✅

- Use **Parquet** over CSV
- **Cache** reused DataFrames
- **Broadcast join** small tables (<100MB)
- Partition by frequent filter columns
- Avoid \`collect()\` on large data
- Monitor Spark UI (port 4040)
- Enable **AQE** in Spark 3+

## Anti-patterns ❌

- \`collect()\` on 1TB → driver OOM
- \`.toPandas()\` on big data → OOM
- Python UDF when built-in exists (10-100× slower)
- Data skew → one task hangs forever
- Too many small files (<128MB)
- RDD for structured data (loses Catalyst)

## Next Journey

Master Spark = Data Engineering foundation complete. Next: **Spark Streaming**, **Delta Lake**, **Spark MLlib**, or **Databricks** (managed Spark used by Netflix, Shell, Comcast).`,
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

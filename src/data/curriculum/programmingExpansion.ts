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

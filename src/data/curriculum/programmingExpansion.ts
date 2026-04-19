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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn quản lý nhân viên: **Nhân viên** có lương, **Quản lý** cũng là nhân viên nhưng có thêm cấp dưới, **Sếp tổng** cũng là quản lý nhưng có thêm cổ phần. Viết 3 class riêng → trùng code. Dùng **kế thừa (inheritance)** → class con tự thừa hưởng + mở rộng.

OOP nâng cao là vũ khí giúp code Python **không lặp lại**, **dễ mở rộng** khi dự án lớn.

## 2. 💡 4 trụ cột OOP

| Trụ cột | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| **Encapsulation** | Giấu chi tiết bên trong | \`_private\`, \`__name_mangled\` |
| **Inheritance** | Class con thừa hưởng cha | \`Manager(Employee)\` |
| **Polymorphism** | Cùng tên, khác hành vi | \`area()\` cho Circle/Square |
| **Abstraction** | Định nghĩa "phải có gì" | \`ABC\`, \`@abstractmethod\` |

## 3. 🧰 Magic methods (dunder) hay dùng

- \`__init__\`: khởi tạo.
- \`__str__\` / \`__repr__\`: in ra dễ đọc.
- \`__eq__\` / \`__lt__\`: so sánh.
- \`__len__\`: hỗ trợ \`len()\`.
- \`__enter__\` / \`__exit__\`: hỗ trợ \`with\` block.

## 4. 🎯 Ví dụ kế thừa + polymorphism

\`\`\`python
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, name: str, base: float):
        self.name = name
        self._base = base

    @abstractmethod
    def salary(self) -> float: ...

    def __repr__(self):
        return f"<{type(self).__name__} {self.name}: {self.salary():,.0f}>"

class Staff(Employee):
    def salary(self): return self._base

class Manager(Employee):
    def __init__(self, name, base, bonus):
        super().__init__(name, base)
        self.bonus = bonus
    def salary(self): return self._base + self.bonus

team = [Staff("An", 10_000_000), Manager("Bình", 20_000_000, 5_000_000)]
for e in team: print(e)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên gọi \`super().__init__()\` trong class con → thuộc tính của cha không được khởi tạo → AttributeError lúc chạy.

- Kế thừa **5–6 tầng** → debug ác mộng. Quy tắc: tối đa 2–3 tầng.
- Dùng **multiple inheritance** lung tung → MRO (Method Resolution Order) khó đoán.
- Đặt mọi attribute là \`__private\` → code khó test, khó mock.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** **Composition > Inheritance**. Thay vì \`Car(Engine)\` (kế thừa), hãy \`Car có Engine\` (composition). Linh hoạt hơn, ít coupling hơn.

- Dùng \`@dataclass\` cho class chỉ chứa data → tự sinh \`__init__\`, \`__repr__\`, \`__eq__\`.
- Dùng \`Protocol\` (Python 3.8+) cho duck typing có type hint.
- Tận dụng \`@property\` thay vì \`get_xxx()\` / \`set_xxx()\` kiểu Java.

## 7. 🤔 Khi nào dùng / không dùng OOP

- ✅ Dự án có **nhiều thực thể có hành vi**: game, ORM, framework.
- ✅ Cần **mở rộng nhiều phiên bản** (PaymentGateway → Stripe/Paddle/MoMo).
- ❌ Script ETL ngắn 100 dòng — function thường là đủ.
- ❌ Data processing — \`pandas\`/\`polars\` đã đủ, đừng wrap class vô nghĩa.

## 8. 📌 Tóm tắt 30 giây

OOP nâng cao = **encapsulation + inheritance + polymorphism + abstraction** + magic methods. Ưu tiên **composition**, dùng \`@dataclass\` cho data class, \`Protocol\` cho duck typing có hint. Đừng kế thừa quá 3 tầng. OOP đúng chỗ là vũ khí — sai chỗ là gánh nặng.
`,
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
        theory: `**Decorator** giống như **giấy gói quà sinh nhật** — bạn không sửa món quà bên trong, chỉ thêm lớp giấy đẹp ở ngoài. Trong Python, decorator cho phép bạn **thêm chức năng cho function mà không sửa code gốc** — hiện thân của nguyên tắc Open/Closed (mở để mở rộng, đóng để sửa đổi).

## 1. 🚦 Vấn đề đời thường

Bạn có 50 API endpoint trong project FastAPI. Mỗi endpoint cần:
- Log mỗi lần gọi (ai, lúc nào, mất bao lâu).
- Kiểm tra authentication.
- Cache kết quả 60 giây.
- Đo performance.

Cách "ngu ngốc": copy-paste code log/auth/cache vào **50 chỗ** → 50 lần sửa khi đổi logic. 💀

Cách Pythonic: viết **1 decorator**, dùng \\\`@auth\\\`, \\\`@log\\\`, \\\`@cache\\\` — sạch và DRY.

## 2. 💡 Cơ chế: Function là "first-class citizen"

Trong Python, function là **object** — gán vào biến, truyền làm tham số, return từ function khác:

\\\`\\\`\\\`python
def greet(name):
    return f"Hello {name}"

say_hi = greet           # function gán vào biến
print(say_hi("An"))      # Hello An
\\\`\\\`\\\`

Decorator tận dụng đặc tính này: **nhận function, return function mới** (đã wrap thêm logic).

## 3. ⚙️ Cú pháp đầy đủ

\\\`\\\`\\\`python
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
\\\`\\\`\\\`

\\\`@functools.wraps\\\` **rất quan trọng** — không có nó, \\\`add.__name__\\\` sẽ thành \\\`"wrapper"\\\`, làm hỏng debugging và introspection.

## 4. 🎁 Decorator có tham số

\\\`\\\`\\\`python
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
def call_api():
    return requests.get("https://api.example.com").json()
\\\`\\\`\\\`

3 tầng function: **factory → decorator → wrapper**. Khó nhớ lúc đầu — đọc 5 lần là quen.

## 5. 🛠️ 5 use case thường gặp

1. **Logging** — log mỗi function call.
2. **Authentication** — check token trước khi chạy endpoint.
3. **Caching** — \\\`@functools.lru_cache(maxsize=128)\\\` cho function pure.
4. **Timing / profiling** — đo thời gian chạy.
5. **Validation** — check input trước khi chạy.

Một số decorator built-in **PHẢI biết**:
- \\\`@property\\\` — biến method thành attribute.
- \\\`@classmethod\\\` / \\\`@staticmethod\\\` — method không cần self.
- \\\`@functools.lru_cache\\\` — memoize function pure.
- \\\`@dataclass\\\` — auto generate \\\`__init__\\\`, \\\`__repr__\\\`, \\\`__eq__\\\`.

## 6. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Bẫy số 1: **quên \\\`@functools.wraps\\\`**. Khi đó \\\`func.__name__\\\`, \\\`func.__doc__\\\` mất → \\\`help(func)\\\` ra bậy, debugging khổ sở. **Mọi decorator PHẢI có \\\`@functools.wraps\\\`.**

Bẫy khác:
- Decorator **mutate state global** → khó test, race condition.
- Stack quá nhiều decorator (\\\`@a @b @c @d @e def f()\\\`) → khó debug khi lỗi.
- Decorator có side effect lúc define (chạy ngay khi import) → app khó load.

## 7. 🎯 Best practice của thầy Hải

1. **LUÔN \\\`@functools.wraps\\\`** — không có ngoại lệ.
2. Decorator **làm 1 việc duy nhất** (Single Responsibility) — log riêng, cache riêng, auth riêng.
3. Stateless > stateful — tránh global mutation.
4. Nếu cần param → cấu trúc 3 tầng (factory → decorator → wrapper).
5. Test decorator **độc lập** — viết unit test cho riêng nó.
6. Document rõ: tham số, side effect, exception có thể raise.

> 💡 **Mẹo của thầy Hải:** Trước khi tự viết decorator, check \\\`functools\\\` và \\\`itertools\\\` — Python đã build-in 80% case bạn cần (\\\`lru_cache\\\`, \\\`partial\\\`, \\\`reduce\\\`, \\\`wraps\\\`).

## 8. ✅ Tóm tắt 30 giây

- Decorator = **lớp giấy gói quà** — thêm chức năng mà không sửa function gốc.
- Cơ chế: **nhận function, return function mới**.
- Pattern chuẩn: \\\`functools.wraps\\\` + \\\`*args, **kwargs\\\` trong wrapper.
- 3 tầng cho decorator có param.
- Use case: log, auth, cache, timing, validation.
- Single Responsibility — mỗi decorator 1 việc.
`,
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
        theory: `**Generator** giống như **máy ATM** — bạn rút **từng tờ tiền khi cần**, chứ không phải đem về cả két 1 tỷ rồi mới đếm. Đây là chìa khoá xử lý dữ liệu lớn (hàng tỷ record) trên RAM hạn chế.

## 1. 🚦 Vấn đề đời thường

Bạn cần đọc file log **50GB** để đếm số lỗi 500. Cách thông thường:

\\\`\\\`\\\`python
lines = open("server.log").readlines()   # Load 50GB vào RAM → CRASH!
\\\`\\\`\\\`

Cách Generator:

\\\`\\\`\\\`python
def read_log(path):
    with open(path) as f:
        for line in f:        # Đọc từng dòng, RAM giữ 1 dòng
            yield line

count = sum(1 for line in read_log("server.log") if "500" in line)
\\\`\\\`\\\`

→ Chạy mượt với laptop 8GB RAM. Đó là sức mạnh của **lazy evaluation**.

## 2. 💡 Cơ chế: Trạng thái được "đóng băng"

Khác function thường (chạy 1 lần rồi xong), generator **dừng tại \\\`yield\\\`, giữ nguyên local variables**, sẽ tiếp tục từ đó khi gọi \\\`next()\\\`.

\\\`\\\`\\\`python
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
\\\`\\\`\\\`

Mỗi \\\`next()\\\` chạy đến \\\`yield\\\` tiếp theo rồi **dừng** — như "tạm dừng thời gian". Cực kỳ tiết kiệm RAM.

## 3. ⚡ Generator Expression — One-liner

\\\`\\\`\\\`python
# List comprehension (tạo full list ngay)
squares_list = [x**2 for x in range(1_000_000)]   # ~32MB RAM

# Generator expression (lazy)
squares_gen = (x**2 for x in range(1_000_000))    # ~200 bytes!
\\\`\\\`\\\`

Chỉ khác \\\`[]\\\` → \\\`()\\\` — nhưng tiết kiệm RAM **hàng nghìn lần**.

## 4. ⚖️ Generator vs List

| Aspect | List \\\`[]\\\` | Generator \\\`()\\\` |
|--------|-----------|----------------|
| RAM | Cao (lưu hết) | Thấp (1 phần tử) |
| Tốc độ tạo | Chậm (tạo full ngay) | Nhanh (lazy) |
| Lặp lại | Lặp nhiều lần OK | **Chỉ lặp được 1 lần** |
| Index \\\`a[5]\\\` | OK | Không hỗ trợ |
| \\\`len()\\\` | OK | Không hỗ trợ |
| Hợp với | Data nhỏ, cần truy cập ngẫu nhiên | Data lớn, lặp tuần tự |

> 💡 **Mẹo của thầy Hải:** Mặc định **dùng generator** cho mọi pipeline xử lý data. Chỉ chuyển sang list khi **cần index, len, hoặc lặp nhiều lần**.

## 5. 🔗 \\\`yield from\\\` — Delegate generator

\\\`\\\`\\\`python
def small_gen():
    yield 1
    yield 2
    yield 3

def big_gen():
    yield from small_gen()   # tương đương 3 yield
    yield from small_gen()
    yield 99

list(big_gen())  # [1, 2, 3, 1, 2, 3, 99]
\\\`\\\`\\\`

Gộp nhiều generator thành 1 — sạch hơn nested for loop.

## 6. 🛠️ 5 use case kinh điển

1. **Đọc file lớn** — log, CSV nhiều GB.
2. **Stream từ API** với pagination — \\\`yield\\\` từng trang.
3. **Pipeline ETL** — chain nhiều generator: extract → transform → load.
4. **Infinite sequence** — Fibonacci, prime number.
5. **Memory-efficient batch** trong ML — feed batch cho neural network.

\\\`\\\`\\\`python
def etl_pipeline(filepath):
    rows = (line.strip().split(",") for line in open(filepath))    # Extract
    cleaned = (r for r in rows if len(r) == 5 and r[0])             # Transform
    parsed = ({"id": r[0], "amount": float(r[3])} for r in cleaned) # Transform
    return parsed                                                    # Load on demand

for record in etl_pipeline("orders.csv"):
    db.insert(record)
\\\`\\\`\\\`

→ Pipeline xử lý 10GB CSV với RAM chỉ vài KB. ✨

## 7. ⚠️ Bẫy thường gặp & 🎯 Best practice

> ⚠️ **Cảnh báo:** Bẫy số 1: **dùng generator 2 lần**. Generator **chỉ chạy được 1 lần** — lần 2 trả về rỗng. Nếu cần lặp 2 lần → \\\`list()\\\` nó hoặc gọi function tạo generator mới.

\\\`\\\`\\\`python
gen = (x for x in range(5))
list(gen)   # [0, 1, 2, 3, 4]
list(gen)   # [] ← rỗng vì đã tiêu thụ!
\\\`\\\`\\\`

Bẫy khác:
- Quên \\\`yield\\\` trong nested function → trả về \\\`None\\\`, debug 1 tiếng.
- Generator giữ reference đến file/connection → quên đóng → resource leak.
- \\\`for x in gen: ...\\\` rồi \\\`if not gen: ...\\\` → \\\`if\\\` luôn falsy vì gen đã hết.

Best practice của thầy Hải:
1. **Default dùng generator** cho data pipeline.
2. **\\\`with open()\\\`** + \\\`yield\\\` để tự đóng file.
3. Tên rõ ràng: \\\`read_log()\\\` thay vì \\\`get_log()\\\` để báo "lazy".
4. **Type hint**: \\\`Iterator[str]\\\` hoặc \\\`Generator[str, None, None]\\\`.
5. Nếu cần count + iterate → tách 2 generator (đừng chia sẻ 1 cái).

## 8. ✅ Tóm tắt 30 giây

- Generator = **máy ATM**, sản sinh giá trị **từng cái khi cần** (lazy).
- Cơ chế: \\\`yield\\\` đóng băng trạng thái, \\\`next()\\\` mở băng.
- Tiết kiệm RAM **hàng nghìn lần** so với list.
- **Chỉ tiêu thụ được 1 lần** — đây là bẫy phổ biến nhất.
- Default cho data pipeline; convert sang list chỉ khi cần index/len/lặp lại.
`,
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn xuất báo cáo tháng cho sếp: lương 1.000 nhân viên ra Excel, log hệ thống ra CSV, cấu hình ra JSON, danh sách khách hàng ra TXT. Mỗi định dạng có "cách mở" riêng. Python File I/O = **bộ chìa khoá vạn năng** mở mọi loại file an toàn.

## 2. 💡 Mở file đúng cách: \`with open(...)\`

Quy tắc vàng: **luôn dùng \`with\`** để Python tự đóng file kể cả khi lỗi.

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
# file tự đóng ở đây — dù có exception bên trên
\`\`\`

## 3. 🧰 7 mode phải nhớ

| Mode | Ý nghĩa | Cảnh báo |
|------|---------|----------|
| \`"r"\` | Đọc (mặc định) | File phải tồn tại |
| \`"w"\` | Ghi đè | **Xoá sạch nội dung cũ** |
| \`"a"\` | Thêm vào cuối | An toàn hơn \`"w"\` |
| \`"x"\` | Tạo mới | Lỗi nếu file đã có |
| \`"r+"\` | Đọc + ghi | Cần biết offset |
| \`"rb"\` / \`"wb"\` | Binary | Cho ảnh, video, pickle |

## 4. 🎯 Ví dụ với 4 định dạng phổ biến

\`\`\`python
import json, csv

# TXT
with open("note.txt", "a", encoding="utf-8") as f:
    f.write("Học Python ngày 1\\n")

# JSON
data = {"name": "An", "score": 9.5}
with open("user.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# CSV
with open("rows.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["name", "score"])
    w.writerow(["An", 9.5])

# Đọc file lớn từng dòng (không OOM)
with open("big.log", "r", encoding="utf-8") as f:
    for line in f:
        process(line)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên \`encoding="utf-8"\` → tiếng Việt biến thành **mojibake** (\`Tiáº¿ng Viá»‡t\`). Đây là lỗi #1 của developer Việt Nam.

- Dùng \`"w"\` thay vì \`"a"\` → ghi đè log cũ → mất data lịch sử.
- \`f.read()\` cho file 5 GB → OOM. Phải đọc từng dòng hoặc từng chunk.
- Quên \`newline=""\` khi mở CSV trên Windows → mỗi dòng có thêm dòng trắng.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** Dùng **\`pathlib.Path\`** thay vì \`os.path\` — code sạch hơn, cross-platform.
> 
> \`\`\`python
> from pathlib import Path
> Path("logs/app.log").write_text("hello", encoding="utf-8")
> \`\`\`

- File JSON cấu hình → dùng \`pydantic\` để **validate schema** lúc đọc.
- File CSV/Excel lớn → dùng \`pandas.read_csv(chunksize=10000)\` xử lý từng chunk.
- File quan trọng → ghi tạm vào \`data.tmp\` rồi \`os.replace("data.tmp", "data.json")\` → atomic, không sợ ghi nửa chừng.

## 7. 🤔 Khi nào dùng định dạng nào

- **TXT**: log đơn giản, README.
- **JSON**: cấu hình, API, dữ liệu lồng nhau.
- **CSV**: bảng tính phẳng, import vào Excel/DB.
- **Parquet**: data lớn (> 100 MB), cần nén và đọc nhanh.
- **Pickle**: chỉ dùng nội bộ — **không bao giờ unpickle file lạ** (RCE!).

## 8. 📌 Tóm tắt 30 giây

\`with open(..., encoding="utf-8")\` là quy tắc vàng. Chọn đúng mode (\`r/w/a/x\`), luôn ghi atomic cho file quan trọng, đọc từng dòng cho file lớn. Dùng \`pathlib\` thay \`os.path\`. Nắm 5 dòng code này là xử lý được 90% bài toán file trong Python.
`,
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
        theory: `## 1. 🚦 Vấn đề đời thường

Cây gia phả: ông → bố → bạn → con → cháu. Bạn không biết "tổ tiên có bao nhiêu thế hệ". Query thông thường chịu thua. **Recursive CTE** = câu lệnh SQL biết "tự gọi chính nó" cho đến khi không còn tổ tiên nữa.

> 💡 **Mẹo của thầy Hải:** Dùng cho cấu trúc cây/đồ thị: org chart, danh mục con, đường đi mạng xã hội.

## 2. 💡 Cấu trúc

\`\`\`sql
WITH RECURSIVE cte AS (
  -- 1. Anchor: dòng khởi đầu
  SELECT id, parent_id, name, 1 AS lvl FROM employees WHERE id = 1
  UNION ALL
  -- 2. Recursive: dòng kế tiếp dựa trên cte
  SELECT e.id, e.parent_id, e.name, c.lvl + 1
  FROM employees e JOIN cte c ON e.parent_id = c.id
)
SELECT * FROM cte;
\`\`\`

## 3. 🧰 Ví dụ org chart

\`\`\`sql
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS depth FROM emp WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, o.depth + 1
  FROM emp e JOIN org o ON e.manager_id = o.id
)
SELECT REPEAT('  ', depth-1) || name AS tree FROM org;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Đếm số cấp dưới của 1 manager:

\`\`\`sql
WITH RECURSIVE sub AS (
  SELECT id FROM emp WHERE manager_id = 5
  UNION ALL
  SELECT e.id FROM emp e JOIN sub s ON e.manager_id = s.id
)
SELECT COUNT(*) FROM sub;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên điều kiện dừng → vòng lặp vô hạn (cycle), DB nổ. Luôn đảm bảo dữ liệu không có vòng tròn parent.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Thêm cột \`depth\` để giới hạn (\`WHERE depth < 50\`) — phòng ngừa lặp vô tận.

## 7. 🤔 Khi nào dùng

- ✅ Org chart, danh mục đa cấp, friend-of-friend.
- ❌ Dữ liệu phẳng → JOIN thường nhanh hơn.

## 8. 📌 Tóm tắt 30 giây

\`WITH RECURSIVE\` = anchor + UNION ALL + recursive. Dùng cho cây/đồ thị. Nhớ đặt giới hạn depth tránh loop vô hạn.
`,
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
        theory: `## 1. 🚦 Vấn đề đời thường

Pandas xử lý 10 triệu dòng còn ổn — đến 1 tỷ dòng thì laptop cháy. **Apache Spark** = pandas chạy phân tán trên 100 máy, xử lý petabyte trong vài phút. Netflix, Uber, Shopee đều dùng.

> 💡 **Mẹo của thầy Hải:** Spark = "pandas cho big data". Cú pháp PySpark gần như Pandas, nhưng chạy phân tán.

## 2. 💡 Khái niệm chính

- **DataFrame**: bảng phân tán, lazy.
- **Transformation** (map, filter, join): chỉ ghi nhớ kế hoạch, không chạy.
- **Action** (count, show, write): mới thực sự kích hoạt tính toán.
- **Cluster**: 1 driver + nhiều executor.

## 3. 🧰 Cú pháp PySpark

\`\`\`python
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("demo").getOrCreate()
df = spark.read.parquet("s3://my-bucket/sales/")
result = (df.filter(df.amount > 100)
            .groupBy("region").sum("amount"))
result.show()
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
df = spark.read.csv("orders.csv", header=True, inferSchema=True)
df.printSchema()
df.groupBy("status").count().show()
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`collect()\` kéo toàn bộ data về driver → nổ memory nếu data to. Dùng \`show(20)\` hoặc \`take(100)\` để xem mẫu.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Lưu format **Parquet** (cột nén) thay CSV — nhỏ hơn 10 lần, nhanh hơn 100 lần khi đọc cột chọn lọc.

## 7. 🤔 Khi nào dùng

- ✅ Dữ liệu > 50GB, cần phân tán.
- ❌ Dữ liệu < 10GB → Pandas / Polars đủ và đơn giản hơn.

## 8. 📌 Tóm tắt 30 giây

Spark = pandas phân tán. Lazy evaluation. Action mới chạy thật. Tránh \`collect()\`. Parquet > CSV. Cú pháp DataFrame quen Pandas là dùng được.
`,
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

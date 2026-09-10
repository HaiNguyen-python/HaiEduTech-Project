import type { ExtendedProgrammingModule } from "./types";

export const programmingExpansionModules: ExtendedProgrammingModule[] = [
  {
    id: "py-oop-adv",
    title: "Advanced Python OOP",
    titleEn: "Advanced Python OOP",
    icon: "🏗️",
    color: "from-yellow-500 to-yellow-700",
    description: "Inheritance, polymorphism, abstract class",
    descriptionEn: "Inheritance, polymorphism, abstract classes",
    course: "python",
    lessons: [
      {
        id: "py-oop-adv-1",
        title: "Inheritance & Polymorphism",
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

## 6. ✅ Best practice

> 💡 **Mẹo:** **Composition > Inheritance**. Thay vì \`Car(Engine)\` (kế thừa), hãy \`Car có Engine\` (composition). Linh hoạt hơn, ít coupling hơn.

- Dùng \`@dataclass\` cho class chỉ chứa data → tự sinh \`__init__\`, \`__repr__\`, \`__eq__\`.
- Dùng \`Protocol\` (Python 3.8+) cho duck typing có type hint.
- Tận dụng \`@property\` thay vì \`get_xxx()\` / \`set_xxx()\` kiểu Java.

## 7. 🤔 Khi nào dùng / không dùng OOP

- ✅ Dự án có **nhiều thực thể có hành vi**: game, ORM, framework.
- ✅ Cần **mở rộng nhiều phiên bản** (PaymentGateway → Stripe/Paddle/MoMo).
- ❌ Script ETL ngắn 100 dòng - function thường là đủ.
- ❌ Data processing - \`pandas\`/\`polars\` đã đủ, đừng wrap class vô nghĩa.

## 8. 📌 Tóm tắt 30 giây

OOP nâng cao = **encapsulation + inheritance + polymorphism + abstraction** + magic methods. Ưu tiên **composition**, dùng \`@dataclass\` cho data class, \`Protocol\` cho duck typing có hint. Đừng kế thừa quá 3 tầng. OOP đúng chỗ là vũ khí - sai chỗ là gánh nặng.
`,
        theoryEn: `**Inheritance** and **Polymorphism** are two of OOP's four pillars (with Encapsulation and Abstraction). They enable code reuse and system extensibility without breaking existing code - the Open/Closed principle of SOLID.

## Why Inheritance?

Imagine modeling employees: all share \`name\`, \`salary\`, \`work()\`. Developers add \`languages\`, Managers add \`team_size\`. Without inheritance, you copy-paste shared fields → DRY violation. Inheritance: shared logic in parent \`Employee\`, children add specifics.

## Syntax & Mechanism

\`\`\`python
# Định nghĩa lớp cơ sở (lớp cha) tên là Employee.
# Lớp này đại diện cho một nhân viên chung.
class Employee:                       # Parent / Base / Superclass
    # Phương thức khởi tạo (constructor) của lớp Employee.
    # Được gọi khi tạo một đối tượng Employee mới.
    # Đầu vào: name (tên nhân viên), salary (lương nhân viên).
    # Đầu ra: Một đối tượng Employee với các thuộc tính name và salary được thiết lập.
    def __init__(self, name, salary):
        self.name = name; self.salary = salary
    # Phương thức work (làm việc) của lớp Employee.
    # Đầu vào: Không có (sử dụng thuộc tính của đối tượng).
    # Đầu ra: Một chuỗi mô tả công việc của nhân viên.
    def work(self):
        return f"{self.name} is working"

# Định nghĩa lớp con (lớp dẫn xuất) tên là Developer, kế thừa từ lớp Employee.
# Lớp này đại diện cho một nhà phát triển (developer).
class Developer(Employee):            # Child / Subclass
    # Phương thức khởi tạo của lớp Developer.
    # Được gọi khi tạo một đối tượng Developer mới.
    # Đầu vào: name (tên developer), salary (lương developer), languages (ngôn ngữ lập trình).
    # Đầu ra: Một đối tượng Developer với các thuộc tính name, salary (từ lớp cha) và languages.
    def __init__(self, name, salary, languages):
        # Gọi phương thức khởi tạo của lớp cha (Employee) để xử lý name và salary.
        super().__init__(name, salary)
        # Gán thuộc tính languages riêng cho lớp Developer.
        self.languages = languages
    # Ghi đè (override) phương thức work từ lớp cha (Employee).
    # Phương thức này sẽ được gọi khi đối tượng Developer thực hiện công việc.
    # Đầu vào: Không có.
    # Đầu ra: Một chuỗi mô tả công việc lập trình của developer, bao gồm các ngôn ngữ họ sử dụng.
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

## Polymorphism - Same interface, different behavior

\`\`\`python
def make_them_work(employees: list[Employee]):
    for emp in employees:
        print(emp.work())   # Calls correct version automatically
\`\`\`

**Duck Typing** (Pythonic): "If it walks like a duck..." - no inheritance required, just matching methods.

## Abstract Classes

\`\`\`python
# Nhập khẩu các lớp cần thiết từ module 'abc' (Abstract Base Classes).
# ABC dùng để định nghĩa một lớp trừu tượng.
# abstractmethod dùng để đánh dấu một phương thức là trừu tượng.
from abc import ABC, abstractmethod

# Định nghĩa lớp trừu tượng 'Shape' (Hình dạng).
# Lớp này kế thừa từ ABC, nghĩa là nó không thể được khởi tạo trực tiếp.
# Mục đích của nó là định nghĩa một giao diện chung cho các hình dạng cụ thể.
class Shape(ABC):
    # Định nghĩa một phương thức trừu tượng 'area' (diện tích).
    # Mọi lớp con kế thừa từ 'Shape' BẮT BUỘC phải triển khai phương thức này.
    # Phương thức này không có thân (chỉ có '...'), vì nó là trừu tượng.
    # Nó nhận vào 'self' (đối tượng của lớp) và được kỳ vọng trả về một số thực (float).
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

> **Composition over Inheritance** - GoF Design Patterns principle.

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

Next: **Decorators & Generators** - high-level Python tools for elegant, performant code beyond traditional OOP.`,
        code: `# Define a base class named Animal.
# This class will be the foundation for other animal types.
class Animal:
    # Constructor of the Animal class.
    # Called when a new Animal object is created.
    # Input: name (the animal's name).
    def __init__(self, name):
        # Assign the 'name' parameter to the object's 'name' attribute.
        self.name = name

    # Define a 'speak' method for the Animal class.
    # This method will be overridden by subclasses.
    # Output: A default string "..."
    def speak(self):
        return "..."

# Define a subclass named Dog, inheriting from Animal.
# This means Dog will have all attributes and methods of Animal.
class Dog(Animal):
    # Override the 'speak' method from the parent class (Animal).
    # This method provides the dog's own way of speaking.
    # Output: A string with the dog's name and its bark.
    def speak(self):
        return f"{self.name} says Woof!"

# Define a subclass named Cat, inheriting from Animal.
# This means Cat will have all attributes and methods of Animal.
class Cat(Animal):
    # Override the 'speak' method from the parent class (Animal).
    # This method provides the cat's own way of speaking.
    # Output: A string with the cat's name and its meow.
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism in action
# Create a list containing objects of different classes (Dog and Cat).
# This is an example of polymorphism, where different objects can be handled through a common interface (the speak method).
# Input: Two objects, a Dog named "Rex" and a Cat named "Whiskers".
animals = [Dog("Rex"), Cat("Whiskers")]
# Loop through each object in the 'animals' list.
for animal in animals:
    # Call the 'speak()' method for each object.
    # Python automatically calls the 'speak' method matching each object's type (Dog.speak() or Cat.speak()).
    # Expected output:
    # "Rex says Woof!"
    # "Whiskers says Meow!"
    print(animal.speak())`,
        codeLanguage: "python",
        exercise: "Create a Bird class that inherits from Animal with a speak() method that returns 'Tweet!'",
        exerciseEn: "Create a Bird class inheriting from Animal with speak() returning 'Tweet!'",
        quiz: [
          { question: "Inheritance allows:", options: ["Deleting the parent class", "A subclass to reuse code from the parent class", "Creating global variables", "Importing libraries"], answer: 1, explanation: "Inheritance lets a subclass reuse attributes and methods from its parent class." },
          { question: "Polymorphism means:", options: ["Multiple classes share a method name with different behavior", "One class has many names", "Deleting old classes", "Creating new variables"], answer: 0, explanation: "Polymorphism lets different classes share the same method name while implementing different behaviors." },
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
        theory: `**Decorator** giống như **giấy gói quà sinh nhật** - bạn không sửa món quà bên trong, chỉ thêm lớp giấy đẹp ở ngoài. Trong Python, decorator cho phép bạn **thêm chức năng cho function mà không sửa code gốc** - hiện thân của nguyên tắc Open/Closed (mở để mở rộng, đóng để sửa đổi).

## 1. 🚦 Vấn đề đời thường

Bạn có 50 API endpoint trong project FastAPI. Mỗi endpoint cần:
- Log mỗi lần gọi (ai, lúc nào, mất bao lâu).
- Kiểm tra authentication.
- Cache kết quả 60 giây.
- Đo performance.

Cách "ngu ngốc": copy-paste code log/auth/cache vào **50 chỗ** → 50 lần sửa khi đổi logic. 💀

Cách Pythonic: viết **1 decorator**, dùng \\\`@auth\\\`, \\\`@log\\\`, \\\`@cache\\\` - sạch và DRY.

## 2. 💡 Cơ chế: Function là "first-class citizen"

Trong Python, function là **object** - gán vào biến, truyền làm tham số, return từ function khác:

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

\\\`@functools.wraps\\\` **rất quan trọng** - không có nó, \\\`add.__name__\\\` sẽ thành \\\`"wrapper"\\\`, làm hỏng debugging và introspection.

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

3 tầng function: **factory → decorator → wrapper**. Khó nhớ lúc đầu - đọc 5 lần là quen.

## 5. 🛠️ 5 use case thường gặp

1. **Logging** - log mỗi function call.
2. **Authentication** - check token trước khi chạy endpoint.
3. **Caching** - \\\`@functools.lru_cache(maxsize=128)\\\` cho function pure.
4. **Timing / profiling** - đo thời gian chạy.
5. **Validation** - check input trước khi chạy.

Một số decorator built-in **PHẢI biết**:
- \\\`@property\\\` - biến method thành attribute.
- \\\`@classmethod\\\` / \\\`@staticmethod\\\` - method không cần self.
- \\\`@functools.lru_cache\\\` - memoize function pure.
- \\\`@dataclass\\\` - auto generate \\\`__init__\\\`, \\\`__repr__\\\`, \\\`__eq__\\\`.

## 6. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Bẫy số 1: **quên \\\`@functools.wraps\\\`**. Khi đó \\\`func.__name__\\\`, \\\`func.__doc__\\\` mất → \\\`help(func)\\\` ra bậy, debugging khổ sở. **Mọi decorator PHẢI có \\\`@functools.wraps\\\`.**

Bẫy khác:
- Decorator **mutate state global** → khó test, race condition.
- Stack quá nhiều decorator (\\\`@a @b @c @d @e def f()\\\`) → khó debug khi lỗi.
- Decorator có side effect lúc define (chạy ngay khi import) → app khó load.

## 7. 🎯 Best practice

1. **LUÔN \\\`@functools.wraps\\\`** - không có ngoại lệ.
2. Decorator **làm 1 việc duy nhất** (Single Responsibility) - log riêng, cache riêng, auth riêng.
3. Stateless > stateful - tránh global mutation.
4. Nếu cần param → cấu trúc 3 tầng (factory → decorator → wrapper).
5. Test decorator **độc lập** - viết unit test cho riêng nó.
6. Document rõ: tham số, side effect, exception có thể raise.

> 💡 **Mẹo:** Trước khi tự viết decorator, check \\\`functools\\\` và \\\`itertools\\\` - Python đã build-in 80% case bạn cần (\\\`lru_cache\\\`, \\\`partial\\\`, \\\`reduce\\\`, \\\`wraps\\\`).

## 8. ✅ Tóm tắt 30 giây

- Decorator = **lớp giấy gói quà** - thêm chức năng mà không sửa function gốc.
- Cơ chế: **nhận function, return function mới**.
- Pattern chuẩn: \\\`functools.wraps\\\` + \\\`*args, **kwargs\\\` trong wrapper.
- 3 tầng cho decorator có param.
- Use case: log, auth, cache, timing, validation.
- Single Responsibility - mỗi decorator 1 việc.
`,
        theoryEn: `**Decorator** is one of Python's most powerful features - it adds functionality to functions/classes **without modifying source** (Open/Closed principle).

## Why Decorators?

50 API endpoints needing logging, auth, caching? Without decorators: copy-paste 50 times. With decorators: \`@auth\`, \`@log\`, \`@cache\` - clean and DRY.

## Mechanism: Functions are First-class

\`\`\`python
def greet(name): return f"Hi {name}"
say_hi = greet           # functions can be assigned
\`\`\`

Decorators leverage this: take a function, return a wrapped one.

## Full Syntax

\`\`\`python
# Nhập module \`functools\` để sử dụng các công cụ hỗ trợ cho hàm (như \`wraps\`).
import functools

# Định nghĩa một decorator tên là \`log_calls\`.
# Decorator này sẽ ghi lại thông tin khi một hàm được gọi và khi nó trả về kết quả.
def log_calls(func):
    # \`@functools.wraps(func)\` là một decorator khác.
    # Nó giúp giữ lại các thông tin quan trọng của hàm gốc \`func\` (như tên hàm, docstring)
    # cho hàm \`wrapper\` này, thay vì hiển thị thông tin của \`wrapper\`.
    @functools.wraps(func)              # preserve metadata!
    # Định nghĩa hàm \`wrapper\` bên trong \`log_calls\`.
    # Hàm này sẽ thay thế hàm gốc khi được gọi.
    # \`*args\` và \`**kwargs\` cho phép \`wrapper\` nhận mọi đối số vị trí và từ khóa
    # mà hàm gốc \`func\` có thể nhận.
    def wrapper(*args, **kwargs):
        # In ra thông báo khi hàm được gọi.
        # Đầu vào: Tên hàm (\`func.__name__\`) và các đối số (\`args\`).
        print(f"→ {func.__name__}({args})")
        # Gọi hàm gốc \`func\` với các đối số đã nhận.
        # Đầu vào: Các đối số \`*args\` và \`**kwargs\` truyền vào \`wrapper\`.
        # Đầu ra: Kết quả thực thi của hàm \`func\`.
        result = func(*args, **kwargs)
        # In ra thông báo khi hàm trả về kết quả.
        # Đầu vào: Kết quả (\`result\`) từ hàm \`func\`.
        print(f"← returned {result}")
        # Trả về kết quả của hàm gốc.
        # Đầu ra: Kết quả của hàm \`func\`.
        return result
    # Trả về hàm \`wrapper\` đã được định nghĩa.
    # Hàm \`wrapper\` này sẽ thay thế hàm gốc \`func\`.
    return wrapper

# Áp dụng decorator \`log_calls\` cho hàm \`add\`.
# Điều này tương đương với \`add = log_calls(add)\`.
@log_calls
# Định nghĩa hàm \`add\` đơn giản, nhận hai số và trả về tổng của chúng.
def add(a, b): return a + b

# Khi gọi \`add(1, 2)\`, output mong đợi sẽ là:
# → add((1, 2))
# ← returned 3
# 3

\`\`\`

Without \`@functools.wraps\`, \`add.__name__\` becomes \`"wrapper"\` - breaks debugging.

## Parametrized Decorators

\`\`\`python
# Định nghĩa decorator retry để thử lại khi hàm gặp lỗi
def retry(max_attempts=3):
    # Tạo decorator nhận hàm cần bọc
    def decorator(func):
        @functools.wraps(func)
        # Wrapper gọi hàm và xử lý retry
        def wrapper(*args, **kw):
            # Lặp tối đa max_attempts lần để thử lại
            for i in range(max_attempts):
                # Thử gọi hàm, nếu thành công thì trả về kết quả
                try: return func(*args, **kw)
                except: 
                    # Nếu là lần thử cuối cùng thì ném lại ngoại lệ
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

Next: **Generators** - process huge datasets without loading into RAM.`,
        code: `# Import the \`time\` module to measure execution time.
import time

# Define a \`timer\` function that takes another function (\`func\`) as an argument.
# This function acts as a decorator.
def timer(func):
    # Define the \`wrapper\` function inside \`timer\`.
    # This \`wrapper\` function will be called instead of the original \`func\`.
    # It accepts any arguments (*args, **kwargs) that the original \`func\` can take.
    def wrapper(*args, **kwargs):
        # Record the start time of function execution.
        start = time.time()
        # Call the original function (\`func\`) with the received arguments.
        # Store the returned result of the original function.
        result = func(*args, **kwargs)
        # Record the end time of function execution.
        end = time.time()
        # Print the time the original function took to execute.
        # \`func.__name__\` gets the name of the original function.
        # \`end-start:.4f\` formats the time as a decimal with 4 digits after the decimal point.
        print(f"{func.__name__} took {end-start:.4f}s")
        # Return the result of the original function.
        return result
    # Return the \`wrapper\` function. When \`timer\` is used as a decorator,
    # it replaces the original function with this \`wrapper\` function.
    return wrapper

# Use the \`@timer\` decorator to "wrap" the \`slow_function\`.
# This means every time \`slow_function\` is called,
# the \`wrapper\` function inside \`timer\` will run before and after \`slow_function\`.
@timer
# Define a function named \`slow_function\` simulating a time-consuming task.
def slow_function():
    # Sum the numbers from 0 to 999,999. This is a time-consuming computation.
    total = sum(range(1000000))
    # Return the computed total.
    return total

# Call \`slow_function\`.
# Since \`slow_function\` has been decorated by \`@timer\`,
# its execution time will be printed to the console.
# The return value of \`slow_function\` (the sum) will be stored in the \`result\` variable.
# Expected output: A line printing the execution time of \`slow_function\`, followed by "Result: 499999500000".
result = slow_function()
# Print the final result of \`slow_function\`.
print(f"Result: {result}")`,
        codeLanguage: "python",
        exercise: "Write a 'count_calls' decorator that counts the number of times the function is called",
        exerciseEn: "Write a 'count_calls' decorator that counts how many times a function is called",
        quiz: [
          { question: "A decorator is used to:", options: ["Delete a function", "Add functionality to a function without modifying its source code", "Create a new class", "Import a module"], answer: 1, explanation: "A decorator wraps a function to add behavior without changing the original function's code." },
          { question: "The `@` symbol before a function means:", options: ["A comment", "Apply a decorator", "Delete the function", "Import"], answer: 1, explanation: "`@decorator_name` is shorthand syntax for applying a decorator." },
        ],
      },
      {
        id: "py-gen-1",
        title: "Generators & Yield",
        titleEn: "Generators & Yield",
        theory: `**Generator** giống như **máy ATM** - bạn rút **từng tờ tiền khi cần**, chứ không phải đem về cả két 1 tỷ rồi mới đếm. Đây là chìa khoá xử lý dữ liệu lớn (hàng tỷ record) trên RAM hạn chế.

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

Mỗi \\\`next()\\\` chạy đến \\\`yield\\\` tiếp theo rồi **dừng** - như "tạm dừng thời gian". Cực kỳ tiết kiệm RAM.

## 3. ⚡ Generator Expression - One-liner

\\\`\\\`\\\`python
# List comprehension (tạo full list ngay)
squares_list = [x**2 for x in range(1_000_000)]   # ~32MB RAM

# Generator expression (lazy)
squares_gen = (x**2 for x in range(1_000_000))    # ~200 bytes!
\\\`\\\`\\\`

Chỉ khác \\\`[]\\\` → \\\`()\\\` - nhưng tiết kiệm RAM **hàng nghìn lần**.

## 4. ⚖️ Generator vs List

| Aspect | List \\\`[]\\\` | Generator \\\`()\\\` |
|--------|-----------|----------------|
| RAM | Cao (lưu hết) | Thấp (1 phần tử) |
| Tốc độ tạo | Chậm (tạo full ngay) | Nhanh (lazy) |
| Lặp lại | Lặp nhiều lần OK | **Chỉ lặp được 1 lần** |
| Index \\\`a[5]\\\` | OK | Không hỗ trợ |
| \\\`len()\\\` | OK | Không hỗ trợ |
| Hợp với | Data nhỏ, cần truy cập ngẫu nhiên | Data lớn, lặp tuần tự |

> 💡 **Mẹo:** Mặc định **dùng generator** cho mọi pipeline xử lý data. Chỉ chuyển sang list khi **cần index, len, hoặc lặp nhiều lần**.

## 5. 🔗 \\\`yield from\\\` - Delegate generator

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

Gộp nhiều generator thành 1 - sạch hơn nested for loop.

## 6. 🛠️ 5 use case kinh điển

1. **Đọc file lớn** - log, CSV nhiều GB.
2. **Stream từ API** với pagination - \\\`yield\\\` từng trang.
3. **Pipeline ETL** - chain nhiều generator: extract → transform → load.
4. **Infinite sequence** - Fibonacci, prime number.
5. **Memory-efficient batch** trong ML - feed batch cho neural network.

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

> ⚠️ **Cảnh báo:** Bẫy số 1: **dùng generator 2 lần**. Generator **chỉ chạy được 1 lần** - lần 2 trả về rỗng. Nếu cần lặp 2 lần → \\\`list()\\\` nó hoặc gọi function tạo generator mới.

\\\`\\\`\\\`python
gen = (x for x in range(5))
list(gen)   # [0, 1, 2, 3, 4]
list(gen)   # [] ← rỗng vì đã tiêu thụ!
\\\`\\\`\\\`

Bẫy khác:
- Quên \\\`yield\\\` trong nested function → trả về \\\`None\\\`, debug 1 tiếng.
- Generator giữ reference đến file/connection → quên đóng → resource leak.
- \\\`for x in gen: ...\\\` rồi \\\`if not gen: ...\\\` → \\\`if\\\` luôn falsy vì gen đã hết.

Best practice:
1. **Default dùng generator** cho data pipeline.
2. **\\\`with open()\\\`** + \\\`yield\\\` để tự đóng file.
3. Tên rõ ràng: \\\`read_log()\\\` thay vì \\\`get_log()\\\` để báo "lazy".
4. **Type hint**: \\\`Iterator[str]\\\` hoặc \\\`Generator[str, None, None]\\\`.
5. Nếu cần count + iterate → tách 2 generator (đừng chia sẻ 1 cái).

## 8. ✅ Tóm tắt 30 giây

- Generator = **máy ATM**, sản sinh giá trị **từng cái khi cần** (lazy).
- Cơ chế: \\\`yield\\\` đóng băng trạng thái, \\\`next()\\\` mở băng.
- Tiết kiệm RAM **hàng nghìn lần** so với list.
- **Chỉ tiêu thụ được 1 lần** - đây là bẫy phổ biến nhất.
- Default cho data pipeline; convert sang list chỉ khi cần index/len/lặp lại.
`,
        theoryEn: `**Generators** use \`yield\` instead of \`return\` to produce values **lazily** - only computed when needed. The key to processing massive datasets on limited RAM.

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
# Định nghĩa một hàm tạo (generator function) có tên 'counter'.
# Hàm tạo này sẽ tạo ra một chuỗi các giá trị theo yêu cầu.
def counter():
    # Khi hàm được gọi lần đầu, nó sẽ trả về (yield) giá trị 1.
    # Khi được gọi lại, nó sẽ tiếp tục từ đây và trả về 2.
    # Và cứ thế, trả về 3.
    yield 1; yield 2; yield 3

# Tạo một đối tượng generator từ hàm counter().
# Đối tượng này chưa thực thi code bên trong hàm counter() mà chỉ sẵn sàng để tạo ra giá trị.
g = counter()

# Lấy giá trị tiếp theo từ generator 'g'.
# Lần gọi này sẽ thực thi phần code đầu tiên trong counter() cho đến khi gặp 'yield 1', và trả về 1.
# Kết quả mong đợi: 1
next(g)  # 1

# Lấy giá trị tiếp theo từ generator 'g'.
# Lần gọi này sẽ tiếp tục thực thi từ vị trí dừng trước đó (sau 'yield 1') cho đến khi gặp 'yield 2', và trả về 2.
# Kết quả mong đợi: 2
next(g)  # 2 (resumes after yield 1)
\`\`\`

## Generator Expression

\`\`\`python
squares = (x**2 for x in range(1_000_000))   # ~200 bytes
# vs [x**2 for x in range(1_000_000)] - ~32MB
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

Composable, memory-efficient - same pattern as Spark, Kafka Streams.

## yield from - Delegation

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

- Immediately \`list(gen)\` - defeats purpose
- Re-iterating consumed generators
- Using generators when random access needed

## When to Use

✅ Streaming, infinite sequences, pipelines, large file I/O
❌ Small data, multi-pass iteration, need len()/indexing

## Bridge

Next: **File I/O** - combined with generators, build pipelines for huge CSV/JSON files with minimal memory.`,
        code: `# Define a generator function named 'count_up'.
# This function counts up infinitely, starting from 'start' (default 0).
def count_up(start=0):
    """Generator counts up infinitely"""
    # Initialize the 'n' variable with the starting value.
    n = start
    # Infinite loop to keep producing numbers.
    while True:
        # 'yield' turns 'n' into a generator value.
        # When 'yield' is called, the function pauses and returns the value 'n'.
        # The next time the generator is called, it resumes execution from here.
        yield n
        # Increment 'n' by 1 for the next call.
        n += 1

# Using the generator.

# Create a 'counter' generator starting to count from 1.
# Input: 1 (starting value).
# Output: A generator object.
counter = count_up(1)
# Loop 5 times to get the first 5 values from the generator.
for _ in range(5):
    # Get the next value from the 'counter' generator and print it.
    # Input: the 'counter' generator.
    # Output: the next integer value from the generator.
    print(next(counter))
# Expected output:
# 1
# 2
# 3
# 4
# 5

# Generator expression (similar to a list comprehension but produces a generator instead of a list).

# Create a generator expression to compute squares of numbers from 0 to 9.
# Input: range(10) (numbers from 0 to 9).
# Output: A generator object producing squares.
squares = (x**2 for x in range(10))
# Convert the 'squares' generator into a list and print it.
# Input: the 'squares' generator.
# Output: A list containing the squared values.
print(list(squares))
# Expected output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`,
        codeLanguage: "python",
        exercise: "Write generator 'even_numbers(n)' yielding first n even numbers",
        exerciseEn: "Write a generator 'even_numbers(n)' that yields the first n even numbers",
        quiz: [
          { question: "Which keyword does a generator use instead of return?", options: ["give", "send", "yield", "produce"], answer: 2, explanation: "`yield` pauses the function and returns a value; the next call resumes from that point." },
          { question: "The main advantage of a generator is:", options: ["Faster execution", "Memory efficiency", "Shorter code", "Easier debugging"], answer: 1, explanation: "Generators don't load all data into memory at once, saving RAM." },
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
    description: "Read/write files, CSV, JSON in Python",
    descriptionEn: "Reading/writing files, CSV, JSON in Python",
    course: "python",
    lessons: [
      {
        id: "py-fileio-1",
        title: "Read & Write Files",
        titleEn: "Reading & Writing Files",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn xuất báo cáo tháng cho sếp: lương 1.000 nhân viên ra Excel, log hệ thống ra CSV, cấu hình ra JSON, danh sách khách hàng ra TXT. Mỗi định dạng có "cách mở" riêng. Python File I/O = **bộ chìa khoá vạn năng** mở mọi loại file an toàn.

## 2. 💡 Mở file đúng cách: \`with open(...)\`

Quy tắc vàng: **luôn dùng \`with\`** để Python tự đóng file kể cả khi lỗi.

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
# file tự đóng ở đây - dù có exception bên trên
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

## 6. ✅ Best practice

> 💡 **Mẹo:** Dùng **\`pathlib.Path\`** thay vì \`os.path\` - code sạch hơn, cross-platform.
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
- **Pickle**: chỉ dùng nội bộ - **không bao giờ unpickle file lạ** (RCE!).

## 8. 📌 Tóm tắt 30 giây

\`with open(..., encoding="utf-8")\` là quy tắc vàng. Chọn đúng mode (\`r/w/a/x\`), luôn ghi atomic cho file quan trọng, đọc từng dòng cho file lớn. Dùng \`pathlib\` thay \`os.path\`. Nắm 5 dòng code này là xử lý được 90% bài toán file trong Python.
`,
        theoryEn: `**File I/O** is foundational - every app reads/writes files (config, logs, data, exports). Python's API is simple but has pitfalls around encoding, performance, and resource leaks.

## Why File I/O Matters

In production: gigabytes of logs daily, config files, CSV/Parquet data exchange, state persistence. Robust I/O = no 3am "file not found" pages.

## Open Properly: \`with\` Statement

\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    data = f.read()
# Auto-closed even on exception
\`\`\`

Linux limits ~1024 file handles per process - leaks are disaster.

## File Modes

| Mode | Meaning | Creates? | Truncates? |
|------|---------|----------|------------|
| \`r\` | Read (default) | ❌ | ❌ |
| \`w\` | Write | ✅ | ✅ |
| \`a\` | Append | ✅ | ❌ |
| \`x\` | Exclusive write | ✅ (errors if exists) | - |
| \`b\` | Binary | - | - |

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
# Nhập thư viện 'csv' để làm việc với các tệp CSV.
import csv

# Mở tệp "data.csv" để đọc.
# 'encoding="utf-8"' đảm bảo đọc đúng các ký tự tiếng Việt hoặc các ký tự đặc biệt khác.
# 'as f' gán đối tượng tệp đã mở cho biến 'f', đảm bảo tệp sẽ tự động đóng khi thoát khỏi khối 'with'.
with open("data.csv", encoding="utf-8") as f:
    # Duyệt qua từng hàng trong tệp CSV.
    # 'csv.DictReader(f)' đọc dữ liệu CSV dưới dạng từ điển,
    # trong đó khóa là tên cột (từ hàng tiêu đề) và giá trị là dữ liệu của hàng đó.
    for row in csv.DictReader(f):
        # In ra giá trị của cột "name" cho mỗi hàng.
        # 'row["name"]' truy cập giá trị của cột có tên "name" trong từ điển 'row' hiện tại.
        print(row["name"])
# Kết quả mong đợi: In ra tên của tất cả các dòng trong cột 'name' của file data.csv.
\`\`\`

Don't manually split on \`,\` - fails with quoted commas. For >100MB, use \`pd.read_csv(chunksize=)\`.

## JSON: load vs loads

| Function | Input | Output |
|----------|-------|--------|
| \`json.load(file)\` | File | Object |
| \`json.loads(str)\` | String | Object |
| \`json.dump(obj, file)\` | Save to file | - |
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
# Hàm ghi file một cách nguyên tử: đảm bảo hoặc ghi toàn bộ hoặc không thay đổi file
def atomic_write(path, data):
    # Tạo file tạm trong cùng thư mục với file đích
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path) or ".")
    # Mở file tạm để ghi văn bản với mã hóa UTF-8
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        # Ghi dữ liệu vào file tạm
        f.write(data)
    # Thay file đích bằng file tạm để đảm bảo tính nguyên tử
    os.replace(tmp, path)        # nguyên tử trên POSIX
\`\`\`

Either old or new file - never half-written.

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

Next: **Advanced SQL Window Functions** - once data is in DB, how to rank, compute running totals, moving averages efficiently.`,
        code: `# Import the 'json' library to work with JSON data.
import json
# Import the 'csv' library to work with CSV data.
import csv
# Import 'StringIO' from the 'io' module to treat a string like a file.
from io import StringIO

# Example of working with JSON.

# Python dictionary data to convert into JSON.
data = {
    "students": [
        {"name": "An", "score": 85},
        {"name": "Binh", "score": 92}
    ]
}
# Convert the 'data' dictionary into a JSON string.
# 'indent=2' makes the JSON more readable with 2-space indentation.
# 'ensure_ascii=False' allows non-ASCII characters to display without being escaped.
# Input: the 'data' dictionary.
# Output: the JSON string 'json_str'.
json_str = json.dumps(data, indent=2, ensure_ascii=False)
# Print the header for the JSON output section.
print("JSON output:")
# Print the formatted JSON string.
# Expected output: a JSON string with the student data.
print(json_str)

# Example of working with CSV.

# CSV data as a string. '\\\\n' is used to indicate a newline.
csv_data = "Name,Score\\\\nAn,85\\\\nBinh,92"
# Create a StringIO object from the CSV string so 'csv.DictReader' can read it like a file.
# Input: the 'csv_data' string.
# Output: a file-like object containing the CSV data.
# Create a 'DictReader' to read the CSV data.
# 'DictReader' reads each row into a dictionary, with keys taken from the header.
# Input: the file-like object from StringIO.
# Output: a 'reader' object that can iterate over each CSV row as a dictionary.
reader = csv.DictReader(StringIO(csv_data))
# Print the header for the CSV output section.
print("\\\\nCSV rows:")
# Loop through each row read by 'csv.DictReader'.
# Each 'row' is a dictionary, e.g. {'Name': 'An', 'Score': '85'}.
for row in reader:
    # Print the name and score of each student from the 'row' dictionary.
    # Input: the 'row' dictionary (e.g. {'Name': 'An', 'Score': '85'}).
    # Output: prints a formatted string "  Name: Score".
    # Expected output: prints each parsed CSV row.
    print(f"  {row['Name']}: {row['Score']}")`,
        codeLanguage: "python",
        exercise: "Write a function to read a JSON file containing a list of students and calculate the average score",
        exerciseEn: "Write a function to read a JSON file of students and calculate the average score",
        quiz: [
          { question: "What does mode `'a'` in open() mean?", options: ["Read", "Write (overwrite)", "Append (add to the end)", "Binary"], answer: 2, explanation: "`'a'` (append) adds content to the end of the file without erasing existing content." },
          { question: "What does `with open()` do automatically?", options: ["Deletes the file", "Closes the file when done", "Creates a backup", "Encrypts the file"], answer: 1, explanation: "The `with` statement automatically closes the file when leaving the block, even if an exception occurs." },
        ],
      },
    ],
  },
  {
    id: "sql-adv-window",
    title: "Advanced SQL Window Functions",
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

Sếp hỏi: "Bảng xếp hạng nhân viên theo phòng ban, mỗi phòng ai cao nhất?". \`GROUP BY\` trả 1 dòng/phòng - mất chi tiết. **Window function** = "vừa giữ chi tiết từng dòng, vừa tính toán theo nhóm".

> 💡 **Mẹo:** \`OVER()\` = "mở cửa sổ nhìn các dòng xung quanh mà không gộp lại".

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
-- CTE: đánh dấu thứ tự theo lương trong mỗi phòng ban
WITH r AS (
-- Bên trong CTE: thêm cột rn là số thứ tự theo salary giảm dần trong mỗi dept
  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
-- Chọn từ bảng employees trong CTE
  FROM employees
)
-- Chọn các hàng có rn = 1, tức lương cao nhất mỗi phòng ban
SELECT * FROM r WHERE rn = 1;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Window function chạy **sau** WHERE/GROUP BY. Muốn lọc theo \`rnk\` phải bọc CTE hoặc subquery.

## 6. ✅ Best practice

> 💡 **Mẹo:** Moving average dùng \`AVG(x) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` cho 7-day MA.

## 7. 🤔 Khi nào dùng

- ✅ Ranking, running total, moving average, so sánh kỳ trước.
- ❌ Chỉ cần tổng hợp đơn giản → \`GROUP BY\` đủ.

## 8. 📌 Tóm tắt 30 giây

\`OVER(PARTITION BY … ORDER BY …)\` = nhóm cửa sổ + sắp xếp. Lọc theo kết quả window phải bọc CTE. Cực mạnh cho BI.
`,
        theoryEn: `**Window Functions** are SQL's most powerful modern feature - compute over **a window of related rows** without collapsing them (unlike GROUP BY). Must-have skill for data analysts and BI devs.

## Why They Matter

Pre-window (SQL:2003), running totals, ranking, period-over-period required complex subqueries/self-joins. Window functions: one line, 10-100× faster. Supported by PostgreSQL, MySQL 8+, BigQuery, Snowflake, Redshift, DuckDB.

## Syntax

\`\`\`sql
-- Hàm cửa sổ (window function) được áp dụng cho từng nhóm dữ liệu.
-- PARTITION BY chia tập dữ liệu thành các nhóm (partitions) dựa trên giá trị của col1.
-- Hàm sẽ được tính toán độc lập trong mỗi nhóm này.
function() OVER (
  PARTITION BY col1
  -- ORDER BY sắp xếp các hàng trong mỗi nhóm (partition) theo giá trị của col2.
  -- Thứ tự này quan trọng cho các hàm cửa sổ phụ thuộc vào thứ tự như ROW_NUMBER(), LEAD(), LAG(), hoặc các phép tính tích lũy.
  ORDER BY col2
  -- ROWS BETWEEN ... AND ... định nghĩa "khung cửa sổ" (window frame) mà hàm sẽ tính toán trên đó.
  -- Khung này xác định các hàng nào sẽ được bao gồm trong phép tính cho hàng hiện tại.
  -- Ví dụ: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (từ đầu nhóm đến hàng hiện tại).
  ROWS BETWEEN ... AND ...
)
\`\`\`

## Categories

| Group | Functions |
|-------|-----------|
| **Ranking** | ROW_NUMBER, RANK, DENSE_RANK, NTILE, PERCENT_RANK, CUME_DIST |
| **Aggregate** | SUM/AVG/COUNT/MIN/MAX OVER() |
| **Value/Offset** | LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE |

## Frame Clause - The Heart

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
-- Bảng tạm (Common Table Expression - CTE) có tên 'ranked' được tạo ra.
WITH ranked AS (
  -- Chọn tất cả các cột từ bảng 'products'.
  -- Thêm một cột mới 'rn' (rank number) để đánh số thứ tự.
  -- Số thứ tự được đánh lại từ 1 cho mỗi 'category' (PARTITION BY category).
  -- Trong mỗi 'category', các sản phẩm được sắp xếp theo 'revenue' giảm dần (ORDER BY revenue DESC).
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC) rn
  FROM products
)
-- Chọn tất cả các cột từ bảng tạm 'ranked'.
-- Lọc ra những hàng mà số thứ tự 'rn' nhỏ hơn hoặc bằng 3.
-- Điều này có nghĩa là chúng ta sẽ lấy 3 sản phẩm có doanh thu cao nhất cho mỗi danh mục.
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
- Window in \`WHERE\` clause (illegal - wrap in CTE)

## When to Use

✅ Ranking, running totals, moving averages, period comparisons, sessionization, top-N per group
❌ Simple aggregates (use GROUP BY)

## Bridge

Next: **Recursive CTE** - for tree/graph data (org charts, nested categories), window functions aren't enough.`,
        code: `-- Demo of advanced window functions
-- Window functions let you compute values across a set of rows related to the current row.
SELECT 
  employee_name, -- Select employee name
  department, -- Select department
  salary, -- Select salary
  -- Split data into 4 groups (quartiles) based on descending salary.
  -- NTILE(4) assigns 1, 2, 3, or 4 to each row.
  NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile,
  -- Compute the percentile rank of the salary.
  -- Value from 0 to 1, indicating the proportion of values less than or equal to the current one.
  PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
  -- Compute the running total of salaries in ascending order.
  -- Starts from the first row (UNBOUNDED PRECEDING) up to the current row (CURRENT ROW).
  SUM(salary) OVER (
    ORDER BY salary 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  -- Compute the moving average of the 3 nearest rows (including current and the 2 previous) by salary order.
  AVG(salary) OVER (
    ORDER BY salary 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS moving_avg_3
FROM employees -- Get data from the 'employees' table
ORDER BY salary DESC; -- Sort results by salary descending
-- The result shows name, department, salary, salary quartile, percentile rank, running total, and 3-row moving average for each employee.`,
        codeLanguage: "sql",
        exercise: "Write a query to divide students into 3 groups according to scores and calculate running average",
        exerciseEn: "Write a query to divide students into 3 groups by score and calculate running average",
        quiz: [
          { question: "NTILE(4) splits the data into:", options: ["2 groups", "3 groups", "4 groups", "Arbitrary"], answer: 2, explanation: "NTILE(4) divides the data into 4 equal-sized groups (quartiles)." },
          { question: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW computes over:", options: ["All rows", "The 3 most recent rows", "The 2 previous rows only", "Just the current row"], answer: 1, explanation: "It spans from 2 rows before to the current row = 3 rows." },
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
    description: "WITH RECURSIVE for hierarchical trees and graphs",
    descriptionEn: "WITH RECURSIVE for hierarchical and graph data",
    course: "sql",
    lessons: [
      {
        id: "sql-recursive-1",
        title: "WITH RECURSIVE",
        titleEn: "WITH RECURSIVE",
        theory: `## 1. 🚦 Vấn đề đời thường

Cây gia phả: ông → bố → bạn → con → cháu. Bạn không biết "tổ tiên có bao nhiêu thế hệ". Query thông thường chịu thua. **Recursive CTE** = câu lệnh SQL biết "tự gọi chính nó" cho đến khi không còn tổ tiên nữa.

> 💡 **Mẹo:** Dùng cho cấu trúc cây/đồ thị: org chart, danh mục con, đường đi mạng xã hội.

## 2. 💡 Cấu trúc

\`\`\`sql
WITH RECURSIVE cte AS (
  -- 1. Anchor: starting row
  SELECT id, parent_id, name, 1 AS lvl FROM employees WHERE id = 1
  UNION ALL
  -- 2. Recursive: next rows derived from cte
  SELECT e.id, e.parent_id, e.name, c.lvl + 1
  FROM employees e JOIN cte c ON e.parent_id = c.id
)
SELECT * FROM cte;
\`\`\`

## 3. 🧰 Ví dụ org chart

\`\`\`sql
-- Định nghĩa một Common Table Expression (CTE) đệ quy có tên 'org'.
-- CTE này sẽ xây dựng cấu trúc cây tổ chức từ bảng 'emp'.
WITH RECURSIVE org AS (
  -- Phần neo (anchor member): Chọn tất cả nhân viên không có quản lý (là cấp cao nhất).
  -- Đây là điểm bắt đầu của cây.
  SELECT id, name, manager_id, 1 AS depth FROM emp WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Phần đệ quy (recursive member): Lặp lại để tìm nhân viên cấp dưới.
  -- Nối bảng 'emp' (e) với CTE 'org' (o) để tìm nhân viên có manager_id trùng với id của nhân viên đã có trong 'org'.
  -- Tăng độ sâu (depth) lên 1 cho mỗi cấp.
  SELECT e.id, e.name, e.manager_id, o.depth + 1
  FROM emp e JOIN org o ON e.manager_id = o.id
)
-- Chọn kết quả cuối cùng từ CTE 'org'.
-- Sử dụng hàm REPEAT để tạo thụt lề (dấu cách) dựa trên độ sâu (depth),
-- giúp hiển thị cấu trúc cây một cách trực quan.
-- Kết quả là tên nhân viên được thụt lề để thể hiện cấp bậc trong cây tổ chức.
SELECT REPEAT('  ', depth-1) || name AS tree FROM org;
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Đếm số cấp dưới của 1 manager:

\`\`\`sql
-- Định nghĩa một CTE (Common Table Expression) đệ quy tên là 'sub'
-- CTE này sẽ tìm tất cả các nhân viên cấp dưới (trực tiếp và gián tiếp) của một quản lý cụ thể.
WITH RECURSIVE sub AS (
  -- Phần neo (anchor member): Chọn tất cả các nhân viên mà quản lý trực tiếp của họ có ID là 5.
  -- Đây là điểm bắt đầu của quá trình đệ quy.
  SELECT id FROM emp WHERE manager_id = 5
  
  UNION ALL
  
  -- Phần đệ quy (recursive member):
  -- Lặp lại việc chọn các nhân viên mà quản lý của họ nằm trong tập hợp 'sub' đã được tìm thấy ở bước trước.
  -- Điều này tiếp tục cho đến khi không còn nhân viên cấp dưới mới nào được tìm thấy.
  -- Đầu vào: Bảng 'emp' (tất cả nhân viên) và tập hợp 'sub' từ bước trước.
  -- Đầu ra: ID của các nhân viên cấp dưới mới.
  SELECT e.id FROM emp e JOIN sub s ON e.manager_id = s.id
)
-- Cuối cùng, đếm tổng số lượng nhân viên được tìm thấy trong CTE 'sub'.
-- Kết quả: Tổng số nhân viên cấp dưới (trực tiếp và gián tiếp) của quản lý có ID là 5.
SELECT COUNT(*) FROM sub;
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên điều kiện dừng → vòng lặp vô hạn (cycle), DB nổ. Luôn đảm bảo dữ liệu không có vòng tròn parent.

## 6. ✅ Best practice

> 💡 **Mẹo:** Thêm cột \`depth\` để giới hạn (\`WHERE depth < 50\`) - phòng ngừa lặp vô tận.

## 7. 🤔 Khi nào dùng

- ✅ Org chart, danh mục đa cấp, friend-of-friend.
- ❌ Dữ liệu phẳng → JOIN thường nhanh hơn.

## 8. 📌 Tóm tắt 30 giây

\`WITH RECURSIVE\` = anchor + UNION ALL + recursive. Dùng cho cây/đồ thị. Nhớ đặt giới hạn depth tránh loop vô hạn.
`,
        theoryEn: `**Recursive CTE** is SQL's secret weapon for **hierarchical** and **graph** data - things normal SQL struggles with. It lets a CTE reference itself.

## Why Recursive CTE?

Try answering with regular SQL:
- "All employees under the CEO at any level"
- "E-commerce category tree (parent → child → grandchild)"
- "Shortest path between two cities"
- "Generate 100 consecutive dates"

All require iteration until termination - recursion. Recursive CTE solves all in one query.

## Syntax & Two Required Parts

\`\`\`sql
-- Định nghĩa một CTE (Common Table Expression) đệ quy có tên là 'cte_name'.
-- CTE đệ quy cho phép một truy vấn tham chiếu chính nó.
WITH RECURSIVE cte_name AS (
  -- 1️⃣ PHẦN NEO (ANCHOR) - Đây là trường hợp cơ sở, chạy một lần duy nhất.
  -- Nó cung cấp các giá trị khởi tạo cho CTE.
  SELECT initial_values WHERE start_condition

  -- Kết hợp kết quả của phần neo và phần đệ quy.
  -- BẮT BUỘC phải dùng UNION ALL (không được dùng UNION vì UNION loại bỏ các hàng trùng lặp, có thể làm sai lệch logic đệ quy).
  UNION ALL

  -- 2️⃣ PHẦN ĐỆ QUY (RECURSIVE) - Phần này tham chiếu đến chính 'cte_name'.
  -- Nó sẽ chạy lặp đi lặp lại cho đến khi điều kiện dừng được đáp ứng.
  SELECT new_values FROM table JOIN cte_name ON ...
  -- Điều kiện dừng BẮT BUỘC phải có để tránh vòng lặp vô hạn.
  WHERE termination_condition
)
-- Cuối cùng, chọn tất cả các hàng từ CTE 'cte_name' sau khi quá trình đệ quy hoàn tất.
-- Kết quả sẽ là tập hợp tất cả các hàng được tạo ra bởi phần neo và các lần lặp đệ quy.
SELECT * FROM cte_name;
\`\`\`

> Missing UNION ALL or termination → infinite loop → crash.

## Execution Mental Model

Anchor → Result_0; Recursive on R0 → R1; on R1 → R2; ... until empty. Final: UNION all results. PostgreSQL has \`MAX_RECURSION\` safety.

## Example #1: Date Series

\`\`\`sql
-- Định nghĩa một Common Table Expression (CTE) đệ quy tên là 'dates'.
-- CTE đệ quy cho phép một truy vấn tham chiếu chính nó.
WITH RECURSIVE dates AS (
  -- Phần neo (anchor member): Khởi tạo tập hợp kết quả.
  -- Chọn ngày '2024-01-01' làm ngày bắt đầu và đặt tên cột là 'd'.
  SELECT DATE '2024-01-01' AS d
  
  -- Kết hợp kết quả của phần neo với phần đệ quy.
  UNION ALL
  
  -- Phần đệ quy (recursive member): Tạo các hàng tiếp theo.
  -- Chọn ngày tiếp theo (d + 1) từ tập hợp 'dates' hiện tại.
  -- Điều kiện dừng: Tiếp tục thêm ngày cho đến khi 'd' nhỏ hơn ngày '2024-01-30'.
  SELECT d + 1 FROM dates WHERE d < DATE '2024-01-30'
)
-- Truy vấn cuối cùng: Chọn tất cả các cột từ CTE 'dates'.
-- Kết quả sẽ là một danh sách các ngày từ '2024-01-01' đến '2024-01-30'.
SELECT * FROM dates;
\`\`\`

Great for date dimensions, filling time series gaps.

## Example #2: Org Chart

\`\`\`sql
-- CTE đệ quy tạo cây tổ chức từ bảng employees
WITH RECURSIVE org AS (
  -- Nhánh gốc: lấy nhân viên không có manager (gốc của cây)
  SELECT id, name, manager_id, 1 AS level, name::text AS path
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  -- Nhánh đệ quy: nối từng nhân viên với quản lý để tăng cấp và nối đường dẫn
  SELECT e.id, e.name, e.manager_id, o.level + 1, o.path || ' > ' || e.name
  FROM employees e JOIN org o ON e.manager_id = o.id
)
-- Lấy kết quả cuối cùng: cấp độ và đường dẫn của mỗi nhân viên trong cây
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

GitLab uses recursive CTE on PostgreSQL to check access through nested group hierarchies - no separate graph DB needed.

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

Next: **Apache Spark** - when data exceeds single DB (>1TB), distribute across a cluster. Spark is the industry #1 big data framework.`,
        code: `-- Recursive CTE: Generate a number series
-- CTE đệ quy: Tạo một chuỗi số
WITH RECURSIVE numbers AS (
  -- Phần neo (anchor member): Bắt đầu chuỗi với số 1
  SELECT 1 AS n
  UNION ALL
  -- Phần đệ quy (recursive member): Cộng thêm 1 vào số trước đó
  -- Tiếp tục cho đến khi n đạt 20
  SELECT n + 1 FROM numbers WHERE n < 20
)
-- Chọn số và bình phương của nó từ chuỗi đã tạo
-- Đầu ra: Một danh sách các số từ 1 đến 20 và bình phương của chúng
SELECT n, n * n AS square FROM numbers;

-- Hierarchical query: Category tree
-- Truy vấn phân cấp: Cây danh mục
WITH RECURSIVE category_tree AS (
  -- Phần neo (anchor member): Chọn các danh mục gốc (không có parent_id)
  -- Khởi tạo độ sâu là 0 và đường dẫn là tên danh mục
  -- Đầu vào: Bảng 'categories'
  SELECT id, name, parent_id, 0 AS depth,
         name AS path
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  -- Phần đệ quy (recursive member): Nối các danh mục con vào danh mục cha
  -- Tăng độ sâu lên 1 và nối tên danh mục vào đường dẫn
  -- Đầu vào: Bảng 'categories' và CTE 'category_tree'
  SELECT c.id, c.name, c.parent_id, ct.depth + 1,
         ct.path || ' > ' || c.name
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
-- Chọn độ sâu và đường dẫn của từng danh mục từ cây đã tạo
-- Sắp xếp theo đường dẫn để dễ đọc
-- Đầu ra: Cây danh mục với độ sâu và đường dẫn đầy đủ
SELECT depth, path FROM category_tree ORDER BY path;`,
        codeLanguage: "sql",
        exercise: "Write a recursive CTE to display a 3-level menu tree with indentation",
        exerciseEn: "Write a recursive CTE to display a 3-level menu tree with indentation",
        quiz: [
          { question: "In a recursive CTE, the 'anchor' is:", options: ["The recursive part", "The termination condition", "The base case (non-recursive starting point)", "The final result"], answer: 2, explanation: "The anchor (base case) is the starting point and is not recursive. The recursive part references the CTE itself." },
          { question: "Recursive CTEs are commonly used for:", options: ["Flat data", "Hierarchical data (trees)", "Indexes", "Backups"], answer: 1, explanation: "Recursive CTEs are great for hierarchical data such as org charts or nested categories." },
        ],
      },
    ],
  },
  {
    id: "data-spark-basics",
    title: "Apache Spark Basic",
    titleEn: "Apache Spark Basics",
    icon: "⚡",
    color: "from-orange-500 to-orange-700",
    description: "Introducing Spark, RDD, DataFrame API",
    descriptionEn: "Introduction to Spark, RDD, DataFrame API",
    course: "data-eng",
    lessons: [
      {
        id: "spark-basics-1",
        title: "Introducing Apache Spark",
        titleEn: "Introduction to Apache Spark",
        theory: `## 1. 🚦 Vấn đề đời thường

Pandas xử lý 10 triệu dòng còn ổn - đến 1 tỷ dòng thì laptop cháy. **Apache Spark** = pandas chạy phân tán trên 100 máy, xử lý petabyte trong vài phút. Netflix, Uber, Shopee đều dùng.

> 💡 **Mẹo:** Spark = "pandas cho big data". Cú pháp PySpark gần như Pandas, nhưng chạy phân tán.

## 2. 💡 Khái niệm chính

- **DataFrame**: bảng phân tán, lazy.
- **Transformation** (map, filter, join): chỉ ghi nhớ kế hoạch, không chạy.
- **Action** (count, show, write): mới thực sự kích hoạt tính toán.
- **Cluster**: 1 driver + nhiều executor.

## 3. 🧰 Cú pháp PySpark

\`\`\`python
# Nhập thư viện SparkSession từ pyspark.sql để làm việc với Spark SQL.
from pyspark.sql import SparkSession

# Khởi tạo SparkSession, đây là điểm vào chính để lập trình với Spark.
# appName("demo") đặt tên cho ứng dụng Spark của chúng ta là "demo".
# getOrCreate() sẽ tạo một SparkSession mới nếu chưa có, hoặc trả về cái hiện có.
spark = SparkSession.builder.appName("demo").getOrCreate()

# Đọc dữ liệu từ các tệp Parquet được lưu trữ trên S3.
# "s3://my-bucket/sales/" là đường dẫn đến thư mục chứa các tệp Parquet.
# Kết quả đọc được sẽ là một DataFrame (bảng dữ liệu phân tán).
df = spark.read.parquet("s3://my-bucket/sales/")

# Bắt đầu chuỗi các phép biến đổi trên DataFrame.
# 1. Lọc các hàng mà cột 'amount' có giá trị lớn hơn 100.
# 2. Nhóm các hàng còn lại theo cột 'region'.
# 3. Tính tổng của cột 'amount' cho mỗi nhóm 'region'.
# Kết quả là một DataFrame mới chứa tổng 'amount' theo từng 'region'.
result = (df.filter(df.amount > 100)
            .groupBy("region").sum("amount"))

# Hiển thị 20 hàng đầu tiên của DataFrame 'result' lên console.
# Đây là hành động cuối cùng để xem kết quả của các phép biến đổi.
# Kết quả mong đợi: Một bảng với hai cột (region và sum(amount)), hiển thị tổng doanh thu cho các giao dịch lớn hơn 100 theo từng khu vực.
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

> 💡 **Mẹo:** Lưu format **Parquet** (cột nén) thay CSV - nhỏ hơn 10 lần, nhanh hơn 100 lần khi đọc cột chọn lọc.

## 7. 🤔 Khi nào dùng

- ✅ Dữ liệu > 50GB, cần phân tán.
- ❌ Dữ liệu < 10GB → Pandas / Polars đủ và đơn giản hơn.

## 8. 📌 Tóm tắt 30 giây

Spark = pandas phân tán. Lazy evaluation. Action mới chạy thật. Tránh \`collect()\`. Parquet > CSV. Cú pháp DataFrame quen Pandas là dùng được.
`,
        theoryEn: `**Apache Spark** is the industry's #1 distributed data processing framework - used by Netflix, Uber, Airbnb to process petabytes daily.

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
# Đọc dữ liệu từ các tệp Parquet trong thư mục S3.
# Đầu vào: Đường dẫn S3 đến các tệp Parquet chứa dữ liệu bán hàng.
result = (spark.read.parquet("s3://bucket/sales/")
    # Lọc các bản ghi mà cột 'date' lớn hơn hoặc bằng ngày '2024-01-01'.
    # Đầu vào: DataFrame ban đầu.
    # Đầu ra: DataFrame chỉ chứa dữ liệu từ ngày 2024-01-01 trở đi.
    .filter(F.col("date") >= "2024-01-01")
    # Nhóm dữ liệu theo cột 'region' (khu vực).
    # Đầu vào: DataFrame đã lọc.
    # Đầu ra: DataFrame được nhóm theo khu vực.
    .groupBy("region")
    # Tính tổng cột 'revenue' (doanh thu) cho mỗi nhóm và đặt tên cột kết quả là 'total'.
    # Đầu vào: DataFrame đã nhóm.
    # Đầu ra: DataFrame với các cột 'region' và 'total'.
    .agg(F.sum("revenue").alias("total"))
    # Sắp xếp kết quả theo cột 'total' theo thứ tự giảm dần (từ cao xuống thấp).
    # Đầu vào: DataFrame với 'region' và 'total'.
    # Đầu ra: DataFrame đã sắp xếp.
    .orderBy(F.desc("total")))
# Ghi kết quả cuối cùng ra các tệp Parquet trong thư mục S3 khác.
# Chế độ "overwrite" sẽ ghi đè nếu thư mục đích đã tồn tại.
# Đầu vào: DataFrame 'result' đã được xử lý.
# Đầu ra: Các tệp Parquet được lưu tại "s3://bucket/out/".
result.write.mode("overwrite").parquet("s3://bucket/out/")
\`\`\`

## File Formats

| Format | Speed | Storage | Pushdown |
|--------|-------|---------|----------|
| CSV | Slow | Large | No |
| **Parquet** | **Fast** | **10× smaller** | **Yes** |
| Delta Lake | Parquet + ACID | + log | Yes |

> Always use **Parquet** in production.

## Case Study: Netflix - 1 EB/day

Netflix processes **1 exabyte/day** on Spark + S3 + Iceberg for personalization (250M users), A/B testing, billing. Thousands of nodes with AQE.

## Case Study: Uber - 15T messages/day

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
        code: `# Ví dụ DataFrame PySpark (khái niệm)
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder \\\\
    .appName("SalesAnalysis") \\\\
    .getOrCreate()

# Đọc dữ liệu
sales = spark.read.csv("sales.csv", header=True, inferSchema=True)

# Các biến đổi (lazy, chưa thực thi)
monthly_sales = sales \\\\
    .withColumn("month", F.month("date")) \\\\
    .groupBy("month", "category") \\\\
    .agg(
        F.sum("amount").alias("total_sales"),
        F.count("*").alias("num_transactions"),
        F.avg("amount").alias("avg_sale")
    ) \\\\
    .orderBy("month")

# Hành động (kích hoạt thực thi)
monthly_sales.show()

# Ghi kết quả
monthly_sales.write.parquet("output/monthly_sales")`,
        codeLanguage: "python",
        exercise: "Write PySpark pipeline to read JSON file, filter by condition, group by and write to Parquet",
        exerciseEn: "Write a PySpark pipeline to read JSON, filter, group by, and write to Parquet",
        quiz: [
          { question: "Spark is faster than MapReduce mainly because:", options: ["Less code", "In-memory processing", "It uses Python", "It has a GUI"], answer: 1, explanation: "Spark processes data in memory instead of repeatedly reading/writing to disk like MapReduce." },
          { question: "Lazy evaluation means:", options: ["Runs immediately when called", "Builds an execution plan and only runs when an action is called", "Runs slowly", "Not optimized"], answer: 1, explanation: "Lazy evaluation: Spark only constructs an execution plan and defers execution until an action like show() or collect() is called." },
        ],
      },
    ],
  },
];

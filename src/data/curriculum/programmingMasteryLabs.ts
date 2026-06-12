import type { ExtendedProgrammingModule } from "./types";

/**
 * Programming Mastery Labs (2026 expansion)
 * -------------------------------------------------------------
 * A new pillar-spanning module that adds depth to the Programming
 * track with topics learners frequently request:
 *   1) Algorithms: recursion + memoization with a Fibonacci speed test.
 *   2) Functional Python: comprehensions vs map/filter vs loops.
 *   3) Sorting Visualizer: bubble, selection, merge sort step traces.
 *   4) REST APIs: hitting a public weather API with `requests` + JSON.
 *   5) Async Python: asyncio for concurrent network calls.
 *
 * Bilingual (VI/EN). Quizzes auto-grade via the i18n lookup.
 * ASCII visuals only - keeps the mobile markdown renderer crisp.
 */
export const programmingMasteryLabsModules: ExtendedProgrammingModule[] = [
  {
    id: "prog-mastery-labs",
    title: "Mastery Labs - Phòng thí nghiệm chuyên sâu",
    titleEn: "Mastery Labs - Deep-Dive Workshops",
    icon: "🧪",
    color: "from-violet-500 to-fuchsia-600",
    description:
      "5 lab nâng cao: thuật toán đệ quy, lập trình hàm, trực quan hoá sắp xếp, gọi REST API thật và async/await.",
    descriptionEn:
      "5 advanced labs: recursion + memoization, functional Python, sorting visualisation, real REST API calls, and async/await.",
    course: "python",
    lessons: [
      // ===== Lesson 1: Recursion + Memoization =====
      {
        id: "pml-1",
        title: "Đệ quy & Memoization - Tăng tốc Fibonacci 1000 lần",
        titleEn: "Recursion & Memoization - 1000× Faster Fibonacci",
        level: 3,
        difficulty: "intermediate",
        theory: `## 🔁 Đệ quy là gì?

Đệ quy (recursion) là khi một hàm **tự gọi lại chính nó** trên một bài toán **nhỏ hơn**, cho tới khi gặp **base case** (điều kiện dừng).

Hãy tưởng tượng bạn cần đếm số bậc của một cầu thang trong bóng tối: bạn bước lên 1 bậc, rồi nhờ "phiên bản nhỏ hơn của chính mình" đếm phần còn lại. Đó chính là tinh thần đệ quy.

\`\`\`python
def factorial(n):
    if n <= 1:        # 🛑 base case - phải có, nếu không sẽ lặp vô tận
        return 1
    return n * factorial(n - 1)   # ⤵️ gọi lại với bài toán nhỏ hơn
\`\`\`

**2 thành phần bắt buộc:**
1. **Base case** - điều kiện dừng (n ≤ 1 ⇒ trả về 1).
2. **Recursive case** - gọi lại chính nó với input nhỏ dần (factorial(n-1)).

Quên base case ⇒ \`RecursionError: maximum recursion depth exceeded\` (Python mặc định giới hạn ~1000 cấp).

## 💥 Vấn đề của đệ quy "ngây thơ" - Fibonacci

Dãy Fibonacci: \`F(n) = F(n-1) + F(n-2)\`. Viết thẳng theo công thức:

\`\`\`
fib(5)
 ├── fib(4)
 │    ├── fib(3) ── fib(2), fib(1)
 │    └── fib(2) ── fib(1), fib(0)
 └── fib(3)                ← tính lại từ đầu!
      ├── fib(2)           ← tính lại!
      └── fib(1)
\`\`\`

\`fib(2)\` bị tính đi tính lại **hàng triệu lần** khi n lớn. Độ phức tạp: **O(2ⁿ)** - số phép tính nhân đôi mỗi khi n tăng 1.

## ⚡ Memoization = "nhớ kết quả đã tính"

Ý tưởng cực đơn giản: lưu kết quả vào một dict, lần sau gặp lại thì lấy ngay (**O(1)**).

\`\`\`python
cache = {}
def fib(n):
    if n in cache: return cache[n]   # ✅ đã tính rồi → trả ngay
    if n < 2: return n
    cache[n] = fib(n-1) + fib(n-2)
    return cache[n]
\`\`\`

Độ phức tạp giảm từ **O(2ⁿ) → O(n)**. Mỗi \`fib(k)\` chỉ chạy đúng 1 lần.

\`\`\`
fib(40) không memo:   ≈ 1.5 giây
fib(40) có memo:      < 0.0001 giây   (~15 000× nhanh hơn)
fib(100) không memo:  vũ trụ kết thúc trước khi xong 😅
fib(100) có memo:     < 0.001 giây
\`\`\`

## 🎁 \`functools.lru_cache\` - memoization miễn phí

Python tặng sẵn decorator \`@lru_cache\` làm tất cả việc trên cho bạn - không cần viết dict thủ công.

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)   # cache không giới hạn
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
\`\`\`

\`maxsize=None\` = không giới hạn. \`maxsize=128\` = chỉ giữ 128 kết quả gần nhất (LRU = Least Recently Used).

## 🧭 Khi nào nên dùng đệ quy?

✅ Cấu trúc **tự lặp** tự nhiên: cây thư mục, JSON lồng nhau, parse biểu thức toán, duyệt cây/đồ thị.
✅ Bài "chia để trị" (merge sort, quicksort, binary search).
❌ Vòng lặp đơn giản (đếm 1→100): dùng \`for\` cho gọn.
❌ Đệ quy quá sâu (>1000 cấp): chuyển sang vòng lặp + stack thủ công.`,
        theoryEn: `## 🔁 What is recursion?

Recursion is when a function **calls itself** on a **smaller** version of the problem until it hits a **base case** (the stopping condition).

Picture counting stairs in the dark: you climb one step, then ask "a smaller version of you" to count the rest. That's recursion in spirit.

\`\`\`python
def factorial(n):
    if n <= 1:        # 🛑 base case - mandatory, otherwise infinite recursion
        return 1
    return n * factorial(n - 1)   # ⤵️ call self on a smaller input
\`\`\`

**2 mandatory parts:**
1. **Base case** - when to stop (n ≤ 1 ⇒ return 1).
2. **Recursive case** - call self on a shrinking input.

Forget the base case ⇒ \`RecursionError: maximum recursion depth exceeded\` (Python's default cap is ~1000).

## 💥 The naïve-recursion trap - Fibonacci

Fibonacci: \`F(n) = F(n-1) + F(n-2)\`. Written directly from the formula:

\`\`\`
fib(5)
 ├── fib(4)
 │    ├── fib(3) ── fib(2), fib(1)
 │    └── fib(2) ── fib(1), fib(0)
 └── fib(3)                ← recomputed from scratch!
      ├── fib(2)           ← recomputed!
      └── fib(1)
\`\`\`

\`fib(2)\` is recomputed **millions of times** for large n. Complexity: **O(2ⁿ)** - work doubles with every +1 to n.

## ⚡ Memoization = "remember what we already computed"

Dead-simple idea: store results in a dict, return instantly next time (**O(1)**).

\`\`\`python
cache = {}
def fib(n):
    if n in cache: return cache[n]   # ✅ already computed → return
    if n < 2: return n
    cache[n] = fib(n-1) + fib(n-2)
    return cache[n]
\`\`\`

Complexity collapses from **O(2ⁿ) → O(n)**. Each \`fib(k)\` runs exactly once.

\`\`\`
fib(40) no memo:   ≈ 1.5 s
fib(40) memo:      < 0.0001 s   (~15,000× faster)
fib(100) no memo:  the universe ends first 😅
fib(100) memo:     < 0.001 s
\`\`\`

## 🎁 \`functools.lru_cache\` - free memoization

Python ships a decorator \`@lru_cache\` that does the dict bookkeeping for you.

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)   # unbounded cache
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
\`\`\`

\`maxsize=None\` = unlimited. \`maxsize=128\` = keep the 128 most-recently-used results (LRU).

## 🧭 When should you reach for recursion?

✅ Naturally **self-similar** structures: directory trees, nested JSON, expression parsing, graph/tree traversal.
✅ Divide-and-conquer (merge sort, quicksort, binary search).
❌ Simple counting loops: use \`for\` - it's clearer.
❌ Recursion depths > ~1000: convert to a loop with an explicit stack.`,

        code: `# Memoization with functools.lru_cache - cache results to skip repeat work
from functools import lru_cache
import time

# Naive recursive Fibonacci - recomputes the same calls many times → exponential
def fib_slow(n):
    if n < 2: return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Same logic, but lru_cache stores results → each fib(k) runs only once
@lru_cache(maxsize=None)
def fib_fast(n):
    if n < 2: return n
    return fib_fast(n - 1) + fib_fast(n - 2)

# Benchmark both versions to see the cache pay off
for fn in (fib_slow, fib_fast):
    t = time.perf_counter()
    print(fn.__name__, "fib(32) =", fn(32),
          f"-- {time.perf_counter()-t:.4f}s")`,
        codeLanguage: "python",
        exercise:
          "Viết hàm `count_ways(n)` đếm số cách leo cầu thang `n` bậc nếu mỗi bước có thể bước 1 hoặc 2 bậc. Dùng `@lru_cache` để chạy `count_ways(50)` trong < 1ms.",
        exerciseEn:
          "Write `count_ways(n)` that counts the ways to climb `n` stairs taking 1 or 2 steps at a time. Use `@lru_cache` so `count_ways(50)` runs in < 1 ms.",
        quiz: [
          {
            question: "Base case trong hàm đệ quy có vai trò gì?",
            options: [
              "Tăng tốc độ thực thi",
              "Đảm bảo đệ quy dừng lại",
              "Giảm bộ nhớ",
              "Là tham số bắt buộc",
            ],
            answer: 1,
            explanation:
              "Không có base case, hàm tự gọi mãi → RecursionError / stack overflow.",
          },
          {
            question: "Độ phức tạp của `fib(n)` không memoize?",
            options: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(n²)"],
            answer: 2,
            explanation:
              "Cây gọi có chiều cao n và phân nhánh ≈ 2 ⇒ ≈ 2ⁿ nút.",
          },
          {
            question: "`@lru_cache` lưu kết quả ở đâu?",
            options: ["Đĩa cứng", "Trong RAM (dict ẩn)", "Trên server", "Không lưu, chỉ đo thời gian"],
            answer: 1,
            explanation:
              "`functools.lru_cache` giữ map (args → kết quả) trong bộ nhớ tiến trình.",
          },
        ],
      },

      // ===== Lesson 2: Functional Python =====
      {
        id: "pml-2",
        title: "Lập trình hàm - Comprehension vs map/filter vs vòng lặp",
        titleEn: "Functional Python - Comprehensions vs map/filter vs Loops",
        level: 2,
        difficulty: "intermediate",
        theory: `## 🎯 Lập trình hàm là gì?

"Lập trình hàm" (functional programming) là phong cách viết code mà bạn **biến đổi dữ liệu qua các hàm nhỏ**, không thay đổi (mutate) biến gốc, không có hiệu ứng phụ (side effects).

Python không phải ngôn ngữ hàm thuần (như Haskell) nhưng tặng rất nhiều công cụ "phong cách hàm" giúp code **ngắn hơn 3-5 lần** và **dễ đọc hơn rất nhiều**.

## 🛠️ 3 cách viết cùng một việc

Bài toán: tính bình phương các số chẵn trong \`[1..10]\`.

\`\`\`python
# 1) Vòng lặp truyền thống - dài, dễ sai chỉ số
out = []
for n in range(1, 11):
    if n % 2 == 0:
        out.append(n * n)

# 2) map + filter (hàm bậc cao) - khó đọc vì viết ngược
out = list(map(lambda n: n*n,
               filter(lambda n: n % 2 == 0, range(1, 11))))

# 3) List comprehension (Pythonic) - đọc như tiếng Anh
out = [n*n for n in range(1, 11) if n % 2 == 0]
\`\`\`

Đọc cách 3: "lấy n*n, cho mỗi n trong 1..10, nếu n chẵn". Cực rõ ràng.

| Cách | Pythonic? | Tốc độ | Đọc dễ | Khi nào dùng |
|------|-----------|--------|--------|--------------|
| Loop | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | Logic phức tạp, cần nhiều dòng |
| map/filter | ⭐ | ⭐⭐⭐ | ⭐⭐ | Khi đã có sẵn hàm đặt tên |
| Comprehension | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **Mặc định cho 90% trường hợp** |

## 🧪 4 dạng comprehension trong Python

\`\`\`python
[x*2 for x in nums]              # list comprehension
{x*2 for x in nums}              # set comprehension (loại trùng lặp)
{k: v*2 for k, v in d.items()}   # dict comprehension
(x*2 for x in nums)              # generator expression (lazy, tiết kiệm RAM)
\`\`\`

Mẹo: nếu chỉ duyệt một lần (vd. \`sum(x*x for x in nums)\`), dùng generator \`( )\` thay vì \`[ ]\` để **không tốn bộ nhớ** tạo list trung gian.

## 🧰 \`reduce\` - "gom" list về một giá trị

Khi cần **fold** một danh sách thành 1 giá trị (sum, product, max), dùng \`functools.reduce\`:

\`\`\`python
from functools import reduce
reduce(lambda a, b: a * b, [1, 2, 3, 4])      # = 24 (1*2*3*4)
reduce(lambda a, b: a + b, [1, 2, 3, 4], 100) # = 110 (giá trị khởi tạo 100)
\`\`\`

Trong Python, thường \`sum\`, \`max\`, \`min\` đã có sẵn - chỉ dùng \`reduce\` khi phép gộp **không có hàm built-in**.

## ⚠️ Lambda - khi nào dùng, khi nào không?

\`lambda\` là hàm **một dòng, không đặt tên**:

\`\`\`python
double = lambda x: x * 2     # ≈ def double(x): return x*2
\`\`\`

**Nên dùng** khi truyền hàm ngắn vào \`sorted\`, \`map\`, \`filter\`:
\`\`\`python
sorted(users, key=lambda u: u["age"])
\`\`\`

**Không nên dùng** nếu logic dài >1 dòng - \`def\` đặt tên sẽ rõ ràng và dễ debug hơn. PEP-8 (chuẩn code Python) cũng khuyên như vậy.`,
        theoryEn: `## 🎯 What is functional programming?

Functional programming is a style where you **transform data through small functions**, never mutating the original, and avoiding side effects.

Python is not a pure functional language (like Haskell), but it ships plenty of functional-flavoured tools that make code **3-5× shorter** and **far easier to read**.

## 🛠️ 3 ways to write the same thing

Task: square the even numbers from \`[1..10]\`.

\`\`\`python
# 1) Classic loop - long, easy to mis-index
out = []
for n in range(1, 11):
    if n % 2 == 0:
        out.append(n * n)

# 2) map + filter (higher-order) - reads backwards, harder
out = list(map(lambda n: n*n,
               filter(lambda n: n % 2 == 0, range(1, 11))))

# 3) List comprehension (Pythonic) - reads like English
out = [n*n for n in range(1, 11) if n % 2 == 0]
\`\`\`

Read #3 out loud: "take n*n, for each n in 1..10, if n is even." Crystal clear.

| Style | Pythonic? | Speed | Readability | When to pick |
|-------|-----------|-------|-------------|--------------|
| Loop | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | Complex logic, many lines |
| map/filter | ⭐ | ⭐⭐⭐ | ⭐⭐ | When you already have named funcs |
| Comprehension | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | **Default for 90 % of cases** |

## 🧪 4 comprehension flavours in Python

\`\`\`python
[x*2 for x in nums]              # list comprehension
{x*2 for x in nums}              # set comprehension (dedupes)
{k: v*2 for k, v in d.items()}   # dict comprehension
(x*2 for x in nums)              # generator expression (lazy, RAM-friendly)
\`\`\`

Tip: if you iterate once (\`sum(x*x for x in nums)\`), prefer the \`( )\` generator over \`[ ]\` - **no intermediate list allocated**.

## 🧰 \`reduce\` - fold a list into one value

When you need to **fold** a list into a single value (sum, product, max), reach for \`functools.reduce\`:

\`\`\`python
from functools import reduce
reduce(lambda a, b: a * b, [1, 2, 3, 4])      # = 24 (1*2*3*4)
reduce(lambda a, b: a + b, [1, 2, 3, 4], 100) # = 110 (initial value 100)
\`\`\`

Python already has \`sum\`, \`max\`, \`min\` built-in - use \`reduce\` only when the fold has **no built-in**.

## ⚠️ Lambda - when to use, when not

\`lambda\` is a **one-line, anonymous** function:

\`\`\`python
double = lambda x: x * 2     # ≈ def double(x): return x*2
\`\`\`

**Use** when passing tiny functions to \`sorted\`, \`map\`, \`filter\`:
\`\`\`python
sorted(users, key=lambda u: u["age"])
\`\`\`

**Avoid** when logic spans more than one line - a named \`def\` is clearer and debuggable. PEP-8 (Python's style guide) agrees.`,

        code: `# Functional toolkit: list comprehension + reduce (fold)
from functools import reduce

nums = [3, 8, 12, 5, 21, 7, 16]

# 1) Comprehension: keep even numbers and square them in a single pass
squares_even = [n * n for n in nums if n % 2 == 0]
# 2) reduce: fold the list down to a single value (sum, max, ...)
total        = reduce(lambda a, b: a + b, squares_even, 0)            # sum
maxx         = reduce(lambda a, b: a if a > b else b, nums)           # max

print("squares_even:", squares_even)
print("sum:", total, "max:", maxx)`,
        codeLanguage: "python",
        exercise:
          "Cho danh sách điểm `[7.5, 4.0, 9.2, 6.1, 8.8, 5.5, 3.2]`. Dùng comprehension lấy chỉ điểm ≥ 5, sau đó dùng `reduce` tính trung bình. In kết quả với 2 chữ số thập phân.",
        exerciseEn:
          "Given scores `[7.5, 4.0, 9.2, 6.1, 8.8, 5.5, 3.2]`, use a comprehension to keep only scores ≥ 5, then use `reduce` to compute the mean. Print the result with 2 decimals.",
        quiz: [
          {
            question: "List comprehension `[x*2 for x in nums if x > 0]` tương đương với?",
            options: [
              "map(lambda x: x*2, nums)",
              "filter(lambda x: x>0, map(lambda x: x*2, nums))",
              "map(lambda x: x*2, filter(lambda x: x>0, nums))",
              "reduce(lambda a,b: a+b*2, nums)",
            ],
            answer: 2,
            explanation:
              "Filter rồi mới map, đúng thứ tự của comprehension: lọc x>0 trước, nhân 2 sau.",
          },
          {
            question: "`reduce(lambda a,b:a+b, [1,2,3,4], 10)` cho kết quả?",
            options: ["10", "20", "100", "Báo lỗi"],
            answer: 1,
            explanation:
              "Khởi tạo 10, cộng 1+2+3+4 → 10 + 10 = 20.",
          },
          {
            question: "Trong Python hiện đại, lambda thường được khuyến nghị?",
            options: [
              "Luôn dùng để code ngắn",
              "Chỉ dùng cho biểu thức rất ngắn; nếu phức tạp hãy def function",
              "Không bao giờ dùng",
              "Chỉ dùng trong class",
            ],
            answer: 1,
            explanation:
              "PEP-8 khuyên dùng `def` đặt tên nếu logic phức tạp - đọc dễ và debug được.",
          },
        ],
      },

      // ===== Lesson 3: Sorting Visualizer =====
      {
        id: "pml-3",
        title: "Sorting Visualizer - 3 thuật toán sắp xếp dưới kính hiển vi",
        titleEn: "Sorting Visualizer - 3 Algorithms Under the Microscope",
        level: 3,
        difficulty: "intermediate",
        theory: `## 🧮 Vì sao phải học sắp xếp?

Sắp xếp là cách trực quan nhất để **cảm nhận độ phức tạp (Big-O)**. Cùng một bài toán "sắp xếp 10 000 số", thuật toán tốt có thể nhanh **gấp 1000 lần** thuật toán xấu. Hiểu sắp xếp = hiểu cách suy nghĩ về hiệu năng.

## 🔁 Bubble Sort - O(n²) - "Bong bóng nổi lên"

Quét qua mảng, so sánh **cặp kề nhau**, đổi chỗ nếu sai thứ tự. Lặp lại tới khi không còn cặp nào cần đổi. Số lớn "nổi" dần lên cuối mảng như bong bóng.

\`\`\`
[5, 3, 8, 1]  →  so (5,3) → đổi  → [3, 5, 8, 1]
              →  so (5,8) → ok    → [3, 5, 8, 1]
              →  so (8,1) → đổi  → [3, 5, 1, 8]
... lặp tiếp pass thứ 2, 3 ...
\`\`\`

✅ Code 5 dòng, dễ viết. ❌ Cực chậm với mảng lớn (10k phần tử = ~100 triệu so sánh).

## 🎯 Selection Sort - O(n²) - "Chọn nhỏ nhất"

Mỗi vòng, **quét tìm phần tử nhỏ nhất** còn lại và đưa lên đầu. Đơn giản, ít swap hơn Bubble (tốt khi ghi đĩa đắt) nhưng vẫn O(n²).

\`\`\`
[5, 3, 8, 1]  →  min = 1, đổi với 5 → [1, 3, 8, 5]
[_, 3, 8, 5]  →  min = 3, đã đúng    → [1, 3, 8, 5]
[_, _, 8, 5]  →  min = 5, đổi với 8  → [1, 3, 5, 8]
\`\`\`

## ⚡ Merge Sort - O(n log n) - "Chia để trị"

Ý tưởng đệ quy: **chia đôi mảng → sắp xếp 2 nửa → trộn (merge) lại**. Trộn 2 nửa đã sắp xếp chỉ tốn O(n) - nhờ vậy tổng cộng O(n log n), khoẻ với mảng cực lớn.

\`\`\`
[5,3,8,1,9,2,7,4]
   ↙              ↘
[5,3,8,1]      [9,2,7,4]
  ↙ ↘             ↙ ↘
[5,3] [8,1]   [9,2] [7,4]   ← chia tới khi còn 1 phần tử
  ↓     ↓       ↓     ↓
[3,5] [1,8]   [2,9] [4,7]   ← merge từng cặp
   ↘    ↙       ↘    ↙
  [1,3,5,8]   [2,4,7,9]
        ↘       ↙
     [1,2,3,4,5,7,8,9]      ← merge cuối
\`\`\`

## 📊 Bảng so sánh

| Thuật toán | Best | Average | Worst | Bộ nhớ | Stable? |
|------------|------|---------|-------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Python \`sorted\` | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Timsort |

**Stable** = giữ nguyên thứ tự tương đối của các phần tử bằng nhau. Quan trọng khi sort theo nhiều khoá (vd. sort sinh viên theo điểm rồi theo tên).

## 🏆 Trong thực tế dùng cái nào?

99% trường hợp: dùng **\`sorted()\` hoặc \`list.sort()\` của Python**. Nội bộ là **Timsort** (kết hợp Merge + Insertion Sort), được tối ưu cao và chạy bằng C - nhanh hơn bất cứ thứ gì bạn tự viết bằng Python thuần.

Học Bubble/Merge chỉ để **hiểu cơ chế** và **luyện tư duy thuật toán** cho phỏng vấn.`,
        theoryEn: `## 🧮 Why study sorting?

Sorting is the cleanest way to **feel Big-O complexity**. On 10,000 items a great algorithm can beat a bad one by **1000×**. Master sorting and you master performance thinking.

## 🔁 Bubble Sort - O(n²) - "Bubbles rise"

Scan the array, compare **adjacent pairs**, swap if out of order. Repeat until no swaps. Large values "bubble" toward the end like, well, bubbles.

\`\`\`
[5, 3, 8, 1]  →  cmp (5,3) → swap → [3, 5, 8, 1]
              →  cmp (5,8) → ok    → [3, 5, 8, 1]
              →  cmp (8,1) → swap → [3, 5, 1, 8]
... pass 2, 3, ... continue ...
\`\`\`

✅ 5-line implementation, easy. ❌ Brutal on large arrays (10k items = ~100M comparisons).

## 🎯 Selection Sort - O(n²) - "Pick the minimum"

Each pass **scans for the smallest remaining element** and places it at the front. Fewer swaps than Bubble (great when writes are expensive) but still O(n²).

\`\`\`
[5, 3, 8, 1]  →  min = 1, swap with 5 → [1, 3, 8, 5]
[_, 3, 8, 5]  →  min = 3, already ok   → [1, 3, 8, 5]
[_, _, 8, 5]  →  min = 5, swap with 8  → [1, 3, 5, 8]
\`\`\`

## ⚡ Merge Sort - O(n log n) - "Divide & conquer"

Recursive idea: **split the array in half → sort each half → merge them back**. Merging two sorted halves costs O(n) - so total is O(n log n), great on huge arrays.

\`\`\`
[5,3,8,1,9,2,7,4]
   ↙              ↘
[5,3,8,1]      [9,2,7,4]
  ↙ ↘             ↙ ↘
[5,3] [8,1]   [9,2] [7,4]   ← split until size 1
  ↓     ↓       ↓     ↓
[3,5] [1,8]   [2,9] [4,7]   ← merge pairwise
   ↘    ↙       ↘    ↙
  [1,3,5,8]   [2,4,7,9]
        ↘       ↙
     [1,2,3,4,5,7,8,9]      ← final merge
\`\`\`

## 📊 Comparison table

| Algorithm | Best | Average | Worst | Memory | Stable? |
|-----------|------|---------|-------|--------|---------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Merge | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Python \`sorted\` | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Timsort |

**Stable** = equal elements keep their relative order. Crucial for multi-key sorts (e.g. sort students by score then by name).

## 🏆 Which one in real life?

99 % of the time: **\`sorted()\` or \`list.sort()\`**. Under the hood it's **Timsort** (Merge + Insertion), heavily tuned and implemented in C - faster than anything you can write in pure Python.

Bubble/Merge are studied to **understand the mechanics** and to **train algorithmic thinking** for interviews.`,

        code: `# Two classic sorts vs Python's built-in Timsort

# Bubble sort - O(n²). Early-exit when no swap happens in a full pass.
def bubble_sort(a):
    a = list(a); n = len(a)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]  # swap neighbours
                swapped = True
        if not swapped: break                # already sorted → stop
    return a

# Merge sort - O(n log n). Divide the list, sort each half, then merge.
def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    # Merge the two sorted halves by always taking the smaller front element
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: out.append(L[i]); i += 1
        else:            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]               # append leftovers

# Compare results - all three must return the same sorted list
data = [5, 3, 8, 1, 9, 2, 7]
print("bubble:", bubble_sort(data))
print("merge :", merge_sort(data))
print("python:", sorted(data))               # built-in Timsort`,
        codeLanguage: "python",
        exercise:
          "Đo thời gian sắp xếp 5 000 số ngẫu nhiên bằng `time.perf_counter()` cho cả 3 thuật toán (bubble, merge, `sorted`). In ra bảng so sánh tỉ lệ tốc độ.",
        exerciseEn:
          "Time 3 sorts (bubble, merge, built-in `sorted`) on 5,000 random numbers using `time.perf_counter()` and print a speed-ratio table.",
        quiz: [
          {
            question: "Big-O trung bình của merge sort là?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 1,
            explanation:
              "Chia đôi (log n cấp) × trộn (n) ⇒ n log n.",
          },
          {
            question: "Thuật toán nào ổn định (stable)?",
            options: ["Bubble & Merge", "Selection", "Chỉ Merge", "Không cái nào"],
            answer: 0,
            explanation:
              "Stable = các phần tử bằng nhau giữ nguyên thứ tự tương đối. Bubble và Merge đạt; Selection thì không.",
          },
          {
            question: "Python built-in `sorted` dùng thuật toán?",
            options: ["Quick sort", "Heap sort", "Timsort", "Radix sort"],
            answer: 2,
            explanation:
              "Từ Python 2.3, mặc định là Timsort (kết hợp Merge và Insertion).",
          },
        ],
      },

      // ===== Lesson 4: REST API with requests =====
      {
        id: "pml-4",
        title: "Gọi REST API thật - Lấy thời tiết bằng Python",
        titleEn: "Calling a Real REST API - Live Weather with Python",
        level: 2,
        difficulty: "intermediate",
        theory: `## 🌐 REST API là gì?

REST API là một **địa chỉ HTTP** mà khi bạn "gõ vào" sẽ trả về dữ liệu - thường là **JSON** (một dictionary). Đây là cách hầu hết các app hiện đại nói chuyện với server: Facebook, Google Maps, ngân hàng, dự báo thời tiết... đều dùng REST.

Ví dụ thật, không cần đăng ký, không cần API key:
\`\`\`
https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105&current_weather=true
\`\`\`

Mở link trong trình duyệt - bạn sẽ thấy JSON với nhiệt độ, gió, giờ địa phương. **Đó chính là REST API trong 10 giây.**

## 🔤 4 động từ HTTP cơ bản

| Verb | Việc |
|------|------|
| **GET** | Lấy dữ liệu (đọc) - không thay đổi gì trên server |
| **POST** | Tạo mới (đăng ký, gửi form) |
| **PUT / PATCH** | Cập nhật bản ghi đã có |
| **DELETE** | Xoá bản ghi |

99 % việc bạn làm khi học sẽ là **GET**.

## 📦 \`requests\` - thư viện HTTP thân thiện nhất

Cài: \`pip install requests\`. Cú pháp 3 dòng:

\`\`\`python
import requests
r = requests.get(URL, params={"city": "Hanoi"}, timeout=10)
r.raise_for_status()    # ném lỗi nếu HTTP 4xx/5xx
data = r.json()         # parse JSON → dict Python
\`\`\`

- \`params={...}\` ⇒ tự thêm \`?city=Hanoi\` vào URL (không cần ghép tay).
- \`timeout=10\` ⇒ chờ tối đa 10 giây, sau đó \`requests.Timeout\`.
- \`r.json()\` ⇒ chuyển chuỗi JSON thành dict để xử lý như Python.

## 🔢 Hiểu HTTP status code

| Mã | Ý nghĩa |
|----|---------|
| 200 | OK, mọi thứ ổn |
| 301 / 302 | Chuyển hướng (redirect) |
| 400 | Lỗi yêu cầu (sai tham số) |
| 401 / 403 | Chưa đăng nhập / không có quyền |
| 404 | Không tìm thấy |
| 429 | Quá nhiều request (rate limit) |
| 500+ | Lỗi từ phía server |

\`r.raise_for_status()\` sẽ tự ném ngoại lệ nếu mã ≥ 400 - giúp bạn phát hiện lỗi ngay thay vì xử lý nhầm dữ liệu rác.

## ✅ Checklist gọi API an toàn

1. **Luôn đặt \`timeout\`** - đừng để app treo nếu server "ngủ quên".
2. **\`raise_for_status()\`** ngay sau khi gọi - fail nhanh và rõ ràng.
3. **\`try/except requests.RequestException\`** - bắt cả lỗi mạng, timeout, DNS.
4. **Đừng hardcode API key trong code** - dùng biến môi trường (\`os.environ["API_KEY"]\`), thêm \`.env\` vào \`.gitignore\`. Lovable Cloud có sẵn secrets store.
5. **Tôn trọng rate limit** - đọc docs API. Free tier thường giới hạn ~60 req/phút.

## 🚀 Bước tiếp theo

Khi quen \`requests\`, bạn có thể nâng cấp lên:
- **\`httpx\`** - API y hệt \`requests\` nhưng hỗ trợ async (bài 5 sẽ học).
- **FastAPI** - viết REST API server của riêng bạn bằng Python, đẹp và nhanh.`,
        theoryEn: `## 🌐 What is a REST API?

A REST API is an **HTTP URL** that returns data - usually **JSON** (a dictionary). It's how modern apps talk to servers: Facebook, Google Maps, banks, weather services… all use REST.

A real, no-signup, no-key example:
\`\`\`
https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105&current_weather=true
\`\`\`

Open it in a browser - you'll see JSON with temperature, wind, local time. **That's a REST API in 10 seconds.**

## 🔤 The 4 core HTTP verbs

| Verb | What it does |
|------|--------------|
| **GET** | Read data - never changes anything |
| **POST** | Create new (sign-up, submit form) |
| **PUT / PATCH** | Update an existing record |
| **DELETE** | Delete a record |

99 % of beginner work uses **GET**.

## 📦 \`requests\` - the friendliest HTTP library

Install: \`pip install requests\`. 3-line syntax:

\`\`\`python
import requests
r = requests.get(URL, params={"city": "Hanoi"}, timeout=10)
r.raise_for_status()    # raise on HTTP 4xx/5xx
data = r.json()         # parse JSON → Python dict
\`\`\`

- \`params={...}\` ⇒ auto-appends \`?city=Hanoi\` (no manual string concat).
- \`timeout=10\` ⇒ waits max 10 s, then \`requests.Timeout\`.
- \`r.json()\` ⇒ turns JSON text into a Python dict.

## 🔢 Understand HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | OK, all good |
| 301 / 302 | Redirect |
| 400 | Bad request (wrong params) |
| 401 / 403 | Unauthenticated / forbidden |
| 404 | Not found |
| 429 | Too many requests (rate limit) |
| 500+ | Server error |

\`r.raise_for_status()\` throws automatically on ≥ 400 - fail fast instead of silently processing garbage.

## ✅ Safe-call checklist

1. **Always set \`timeout\`** - never let your app hang on a sleeping server.
2. **\`raise_for_status()\`** right after the call - fail fast and loud.
3. **\`try/except requests.RequestException\`** - catches network, timeout, DNS errors.
4. **Never hardcode API keys** - use env vars (\`os.environ["API_KEY"]\`), add \`.env\` to \`.gitignore\`. Lovable Cloud has a built-in secrets store.
5. **Respect rate limits** - read the API docs. Free tiers typically cap ~60 req/min.

## 🚀 Next steps

Once \`requests\` feels easy, level up to:
- **\`httpx\`** - same API as \`requests\` but supports async (covered in lesson 5).
- **FastAPI** - build your own REST API in Python, clean and fast.`,

        code: `# Calling a public REST API with the requests library (Open-Meteo, no key)
import requests

def get_weather(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    try:
        # Send GET with query params and a hard timeout - never hang forever
        r = requests.get(url, params={
            "latitude": lat, "longitude": lon,
            "current_weather": "true"
        }, timeout=10)
        r.raise_for_status()                  # raise on HTTP 4xx / 5xx
        cw = r.json()["current_weather"]      # parse JSON body
        return f"{cw['temperature']}°C, wind {cw['windspeed']} km/h"
    except requests.RequestException as e:    # network / timeout / HTTP errors
        return f"Lookup failed: {e}"

# Try three cities - same function, just different coordinates
print("Hanoi :", get_weather(21.03, 105.85))
print("Tokyo :", get_weather(35.68, 139.76))
print("Sydney:", get_weather(-33.87, 151.21))`,
        codeLanguage: "python",
        exercise:
          "Mở rộng `get_weather` để trả về dict {city, temperature, windspeed, time}. Đọc danh sách 5 thành phố từ list và in bảng kết quả bằng `pandas.DataFrame`.",
        exerciseEn:
          "Extend `get_weather` to return a dict {city, temperature, windspeed, time}. Loop over a list of 5 cities and print results as a `pandas.DataFrame`.",
        quiz: [
          {
            question: "Tham số `timeout=10` trong `requests.get` nghĩa là?",
            options: [
              "Lặp lại 10 lần nếu lỗi",
              "Bỏ cuộc sau 10 giây nếu server không phản hồi",
              "Cache 10 giây",
              "Giới hạn 10 request/giây",
            ],
            answer: 1,
            explanation:
              "Tham số timeout = số giây tối đa chờ server. Quá thời gian → `requests.Timeout`.",
          },
          {
            question: "`r.raise_for_status()` có tác dụng gì?",
            options: [
              "In status code",
              "Ném ngoại lệ nếu mã trả về là 4xx/5xx",
              "Đổi response sang JSON",
              "Đếm số byte tải về",
            ],
            answer: 1,
            explanation:
              "Trả về None nếu OK, raise `HTTPError` nếu mã 400+.",
          },
          {
            question: "Cách an toàn nhất để lưu API key trong dự án?",
            options: [
              "Hardcode trong file .py",
              "Đẩy lên GitHub public",
              "Đặt trong biến môi trường (.env, secrets)",
              "Để trong README",
            ],
            answer: 2,
            explanation:
              "Env variable + .gitignore tránh rò rỉ key. Lovable Cloud cũng hỗ trợ secrets store.",
          },
        ],
      },

      // ===== Lesson 5: Async Python =====
      {
        id: "pml-5",
        title: "asyncio - Gọi 50 API cùng lúc trong 1 giây",
        titleEn: "asyncio - Fire 50 API Calls in 1 Second",
        level: 4,
        difficulty: "advanced",
        theory: `## 🚦 Sync vs Async - vì sao quan trọng?

Khi viết code gọi nhiều API (hoặc đọc nhiều file, query nhiều DB), CPU của bạn dành **hầu hết thời gian đứng chờ** mạng/đĩa, không hề tính toán gì. Nếu chờ tuần tự, bạn lãng phí ~99 % thời gian.

\`\`\`
Sync (tuần tự):  ●━━━━━●━━━━━●━━━━━●━━━━━●    50 × 300 ms = 15 s
Async (đồng thời): ●─┐ ●─┐ ●─┐ ●─┐ ●─┐
                       └──┘ └──┘ └──┘ ...     ≈ 0.5 s (nhanh 30×!)
\`\`\`

Async cho phép trong lúc 1 request đang chờ, Python **chuyển sang phát yêu cầu tiếp theo** - tất cả "chạy song song" trên cùng 1 thread.

## 🪄 3 từ khoá vàng của asyncio

\`\`\`python
import asyncio

async def fetch(url):          # 🟢 'async def' = coroutine, không chạy ngay
    print(f"start {url}")
    await asyncio.sleep(1)     # 🟡 'await' = nhường CPU cho task khác
    print(f"done {url}")
    return url

async def main():
    results = await asyncio.gather(  # 🔵 chạy đồng thời, đợi tất cả xong
        fetch("a"), fetch("b"), fetch("c")
    )
    return results

asyncio.run(main())    # 🔧 entry point, tạo và chạy event loop
\`\`\`

- \`async def\` → định nghĩa **coroutine** (hàm có thể tạm dừng).
- \`await\` → "tôi sẽ chờ kết quả, trong lúc đó ai cần CPU thì cứ dùng".
- \`asyncio.gather(*tasks)\` → chạy nhiều coroutine cùng lúc, trả về list kết quả khi **tất cả** xong.
- \`asyncio.run(main())\` → cách chuẩn để khởi động event loop từ code đồng bộ.

## 🧠 Event loop hoạt động ra sao?

Hình dung **1 đầu bếp** (single thread) nấu 5 món:
- Sync: nấu xong món 1 mới bắt đầu món 2 → 5h.
- Async: bật bếp món 1, trong khi chờ sôi, bật bếp món 2, 3, 4, 5 → 1h.

Event loop = bộ điều phối, ghi nhớ "ai đang chờ gì" và đánh thức khi I/O sẵn sàng.

## ⚠️ Khi nào KHÔNG nên dùng async?

❌ **Bài toán CPU-bound** (xử lý số nặng, mã hoá, image processing). Async không giúp gì vì không có lúc nào "đứng chờ I/O" để chuyển task. Hãy dùng \`multiprocessing\` (chạy thật trên nhiều CPU core).

❌ **Thư viện sync-only**: \`requests\`, \`time.sleep\`, \`open()\`, hầu hết DB driver cũ. Gọi chúng bên trong \`async def\` sẽ **chặn cả event loop** - mất hết lợi ích.

✅ Thay thế bằng phiên bản async tương đương:
| Sync | Async |
|------|-------|
| \`requests\` | \`httpx\`, \`aiohttp\` |
| \`time.sleep(1)\` | \`await asyncio.sleep(1)\` |
| \`open()\` đọc file | \`aiofiles\` |
| \`psycopg2\` | \`asyncpg\`, \`databases\` |

## 🎯 Quy tắc vàng

> **Async = I/O-bound. Multiprocessing = CPU-bound. Threading = ít khi dùng trong Python (do GIL).**

Khi bạn cần gọi 10+ API, scrape nhiều trang web, hoặc xử lý nhiều WebSocket connection cùng lúc → async là vũ khí số 1.`,
        theoryEn: `## 🚦 Sync vs Async - why it matters

When your code calls many APIs (or reads many files, queries many DBs), the CPU **mostly waits** for the network/disk - it computes almost nothing. Waiting sequentially wastes ~99 % of the time.

\`\`\`
Sync:   ●━━━━━●━━━━━●━━━━━●━━━━━●    50 × 300 ms = 15 s
Async:  ●─┐ ●─┐ ●─┐ ●─┐ ●─┐
            └──┘ └──┘ └──┘ ...        ≈ 0.5 s  (30× faster!)
\`\`\`

Async lets Python **launch the next request** while the previous one waits - all "in parallel" on a single thread.

## 🪄 The 3 golden asyncio keywords

\`\`\`python
import asyncio

async def fetch(url):          # 🟢 'async def' = coroutine, doesn't run yet
    print(f"start {url}")
    await asyncio.sleep(1)     # 🟡 'await' = yield CPU to other tasks
    print(f"done {url}")
    return url

async def main():
    results = await asyncio.gather(  # 🔵 run concurrently, wait for all
        fetch("a"), fetch("b"), fetch("c")
    )
    return results

asyncio.run(main())    # 🔧 entry point - creates and runs the event loop
\`\`\`

- \`async def\` → defines a **coroutine** (a function that can pause).
- \`await\` → "I'll wait for this result; meanwhile anyone can use the CPU".
- \`asyncio.gather(*tasks)\` → run multiple coroutines together, return all results when **all** are done.
- \`asyncio.run(main())\` → the canonical way to start the event loop from sync code.

## 🧠 How the event loop works

Picture **one chef** (single thread) cooking 5 dishes:
- Sync: finish dish 1, then start dish 2 → 5h.
- Async: start dish 1, while it boils start 2, 3, 4, 5 → 1h.

The event loop is the scheduler - it remembers "who is waiting for what" and wakes tasks up when I/O is ready.

## ⚠️ When NOT to use async

❌ **CPU-bound work** (heavy math, encryption, image processing). Async helps nothing - no I/O to wait on. Reach for \`multiprocessing\` (real multi-core parallelism).

❌ **Sync-only libraries**: \`requests\`, \`time.sleep\`, \`open()\`, most old DB drivers. Calling them inside \`async def\` **blocks the entire event loop** - you lose every benefit.

✅ Swap them for async equivalents:
| Sync | Async |
|------|-------|
| \`requests\` | \`httpx\`, \`aiohttp\` |
| \`time.sleep(1)\` | \`await asyncio.sleep(1)\` |
| \`open()\` file read | \`aiofiles\` |
| \`psycopg2\` | \`asyncpg\`, \`databases\` |

## 🎯 Golden rule

> **Async = I/O-bound. Multiprocessing = CPU-bound. Threading = rarely useful in Python (because of the GIL).**

Whenever you must hit 10+ APIs, scrape many pages, or juggle many WebSocket connections → async is your number-one weapon.`,

        code: `# Async HTTP: fetch 10 slow URLs concurrently instead of one-by-one
import asyncio, httpx, time

# Each URL deliberately takes ~1s on the server side
URLS = [f"https://httpbin.org/delay/1?id={i}" for i in range(10)]

# A single async request - returns the HTTP status code
async def fetch(client, url):
    r = await client.get(url, timeout=5)
    return r.status_code

# Spin up one shared client and run all fetches in parallel via gather()
async def main():
    async with httpx.AsyncClient() as client:
        tasks = [fetch(client, u) for u in URLS]
        return await asyncio.gather(*tasks)   # wait for all at once

# Drive the event loop and time the whole batch
t0 = time.perf_counter()
codes = asyncio.run(main())
print("statuses:", codes)
print(f"finished in {time.perf_counter()-t0:.2f}s "
      f"(would take ~{len(URLS)}s sync)")`,
        codeLanguage: "python",
        exercise:
          "So sánh chính xác: viết phiên bản sync dùng `httpx.Client()` for-loop, async dùng `asyncio.gather`. In tỉ lệ tăng tốc trên 20 URL.",
        exerciseEn:
          "Benchmark precisely: build a sync version with `httpx.Client()` in a for-loop and an async version using `asyncio.gather`. Print the speedup ratio on 20 URLs.",
        quiz: [
          {
            question: "`asyncio.gather(*tasks)` làm gì?",
            options: [
              "Chạy lần lượt từng task",
              "Chạy đồng thời nhiều coroutine và trả về list kết quả khi tất cả xong",
              "Hủy task hiện tại",
              "Tạo thread mới",
            ],
            answer: 1,
            explanation:
              "Đây là idiom cốt lõi để concurrent I/O trong asyncio.",
          },
          {
            question: "`await` được phép xuất hiện ở đâu?",
            options: [
              "Bất kỳ hàm nào",
              "Chỉ trong hàm `async def`",
              "Trong class method",
              "Trong block `try`",
            ],
            answer: 1,
            explanation:
              "`await` chỉ hợp lệ bên trong coroutine. Sai chỗ ⇒ SyntaxError.",
          },
          {
            question: "Bài toán nào KHÔNG nên dùng asyncio?",
            options: [
              "Tải 100 file ảnh",
              "Gọi 50 REST API",
              "Tính số nguyên tố tới 10 triệu",
              "Đọc 200 dòng từ database async",
            ],
            answer: 2,
            explanation:
              "CPU-bound (xử lý số nặng) cần multi-process. Asyncio chỉ thắng khi I/O-bound.",
          },
        ],
      },
    ],
  },
];

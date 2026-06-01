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
 * ASCII visuals only — keeps the mobile markdown renderer crisp.
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

Một hàm **tự gọi chính nó** trên bài toán nhỏ hơn cho tới khi gặp **base case**.

\`\`\`
fib(5)
 ├── fib(4)
 │    ├── fib(3) ── fib(2) ── ...
 │    └── fib(2) ── ...
 └── fib(3) ── ...
\`\`\`

Vấn đề: \`fib(35)\` gọi lại \`fib(2)\` hàng triệu lần ⇒ chậm khủng khiếp.

## ⚡ Memoization = nhớ kết quả

Lưu kết quả đã tính vào dict; lần sau gặp lại thì trả ngay (O(1)).
Độ phức tạp giảm từ **O(2ⁿ) → O(n)**.

\`\`\`
without memo:  fib(40) ≈ 1.5 giây
with memo:     fib(40) < 0.0001 giây   (≈ 15 000× nhanh hơn)
\`\`\`

\`functools.lru_cache\` làm việc này tự động.`,
        theoryEn: `## 🔁 What is recursion?

A function that **calls itself** on a smaller subproblem until it hits the **base case**.

\`\`\`
fib(5)
 ├── fib(4)
 │    ├── fib(3) ── fib(2) ── ...
 │    └── fib(2) ── ...
 └── fib(3) ── ...
\`\`\`

The problem: naïve \`fib(35)\` re-computes \`fib(2)\` millions of times → painfully slow.

## ⚡ Memoization = remember results

Cache results in a dict; subsequent calls return in O(1).
Complexity drops from **O(2ⁿ) → O(n)**.

\`\`\`
without memo:  fib(40) ≈ 1.5 s
with memo:     fib(40) < 0.0001 s   (~15,000× faster)
\`\`\`

\`functools.lru_cache\` does this automatically.`,
        code: `from functools import lru_cache
import time

def fib_slow(n):
    if n < 2: return n
    return fib_slow(n - 1) + fib_slow(n - 2)

@lru_cache(maxsize=None)
def fib_fast(n):
    if n < 2: return n
    return fib_fast(n - 1) + fib_fast(n - 2)

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
        theory: `## 🎯 3 cách viết cùng một việc

Tính bình phương các số chẵn trong \`[1..10]\`:

\`\`\`python
# 1) Vòng lặp truyền thống
out = []
for n in range(1, 11):
    if n % 2 == 0:
        out.append(n * n)

# 2) map + filter (hàm bậc cao)
out = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, range(1, 11))))

# 3) List comprehension (Pythonic)
out = [n * n for n in range(1, 11) if n % 2 == 0]
\`\`\`

| Cách | Pythonic? | Tốc độ | Đọc dễ |
|------|-----------|--------|--------|
| Loop | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| map/filter | ⭐ | ⭐⭐⭐ | ⭐⭐ |
| Comprehension | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 🧰 Khi nào dùng \`reduce\`?

Khi cần **gom** một list về một giá trị (sum, product, max).
\`functools.reduce(lambda acc, n: acc * n, [1,2,3,4])\` ⇒ \`24\`.`,
        theoryEn: `## 🎯 3 ways to write the same thing

Square the even numbers from \`[1..10]\`:

\`\`\`python
# 1) Classic loop
out = []
for n in range(1, 11):
    if n % 2 == 0:
        out.append(n * n)

# 2) map + filter (higher-order functions)
out = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, range(1, 11))))

# 3) List comprehension (Pythonic)
out = [n * n for n in range(1, 11) if n % 2 == 0]
\`\`\`

| Style | Pythonic? | Speed | Readability |
|-------|-----------|-------|-------------|
| Loop | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| map/filter | ⭐ | ⭐⭐⭐ | ⭐⭐ |
| Comprehension | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 🧰 When to use \`reduce\`?

Whenever you must **fold** a list into one value (sum, product, max).
\`functools.reduce(lambda acc, n: acc * n, [1,2,3,4])\` ⇒ \`24\`.`,
        code: `from functools import reduce

nums = [3, 8, 12, 5, 21, 7, 16]

squares_even = [n * n for n in nums if n % 2 == 0]
total        = reduce(lambda a, b: a + b, squares_even, 0)
maxx         = reduce(lambda a, b: a if a > b else b, nums)

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
        theory: `## 🧮 Vì sao học sắp xếp?

Vì đây là cách tốt nhất để hiểu **độ phức tạp**: cùng một bài toán, thuật toán tốt nhanh gấp 1000 lần thuật toán xấu trên 10 000 phần tử.

## 🔁 Bubble Sort - O(n²)

So sánh cặp kề nhau, đổi nếu sai thứ tự. Lặp lại tới khi không còn đổi.

\`\`\`
[5, 3, 8, 1]    swap (5,3)
[3, 5, 8, 1]    ok
[3, 5, 1, 8]    swap (8,1)
...
\`\`\`

## 🎯 Selection Sort - O(n²)

Mỗi vòng chọn phần tử **nhỏ nhất còn lại** và đưa lên đầu.

## ⚡ Merge Sort - O(n log n)

Chia đôi → sắp xếp 2 nửa → trộn (merge). Đệ quy. Khoẻ với list lớn.

| Thuật toán | Best | Average | Worst | Stable? |
|------------|------|---------|-------|---------|
| Bubble | O(n) | O(n²) | O(n²) | ✅ |
| Selection | O(n²) | O(n²) | O(n²) | ❌ |
| Merge | O(n log n) | O(n log n) | O(n log n) | ✅ |
| Python sorted | O(n log n) | O(n log n) | O(n log n) | ✅ (Timsort) |`,
        theoryEn: `## 🧮 Why study sorting?

Because it is the cleanest way to *feel* **complexity**: on 10,000 items a good algorithm beats a bad one by 1000×.

## 🔁 Bubble Sort - O(n²)

Compare adjacent pairs and swap if out of order. Repeat until no swaps.

## 🎯 Selection Sort - O(n²)

Each pass picks the **smallest remaining** element and places it at the front.

## ⚡ Merge Sort - O(n log n)

Split in half → sort each half → merge. Recursive. Scales well.

| Algorithm | Best | Average | Worst | Stable? |
|-----------|------|---------|-------|---------|
| Bubble | O(n) | O(n²) | O(n²) | ✅ |
| Selection | O(n²) | O(n²) | O(n²) | ❌ |
| Merge | O(n log n) | O(n log n) | O(n log n) | ✅ |
| Python sorted | O(n log n) | O(n log n) | O(n log n) | ✅ (Timsort) |`,
        code: `def bubble_sort(a):
    a = list(a); n = len(a)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                swapped = True
        if not swapped: break
    return a

def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    L, R = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: out.append(L[i]); i += 1
        else:            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]

data = [5, 3, 8, 1, 9, 2, 7]
print("bubble:", bubble_sort(data))
print("merge :", merge_sort(data))
print("python:", sorted(data))`,
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

Một địa chỉ HTTP trả về **JSON** (dictionary). Ví dụ:
\`https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105&current_weather=true\`

## 📦 \`requests\` - thư viện HTTP thân thiện nhất

\`\`\`python
import requests
r = requests.get(URL, params={"city": "Hanoi"}, timeout=10)
r.raise_for_status()    # ném lỗi nếu HTTP 4xx/5xx
data = r.json()         # parse JSON → dict
\`\`\`

## ✅ Checklist gọi API an toàn

1. **timeout** - đừng để treo mãi.
2. **raise_for_status** - phát hiện lỗi sớm.
3. **try/except** cho \`requests.RequestException\` (mạng yếu).
4. **Không hardcode API key** - dùng env variable.`,
        theoryEn: `## 🌐 What is a REST API?

An HTTP URL that returns **JSON** (a dictionary). Example:
\`https://api.open-meteo.com/v1/forecast?latitude=21&longitude=105&current_weather=true\`

## 📦 \`requests\` - the friendliest HTTP library

\`\`\`python
import requests
r = requests.get(URL, params={"city": "Hanoi"}, timeout=10)
r.raise_for_status()    # throws on HTTP 4xx/5xx
data = r.json()         # parse JSON → dict
\`\`\`

## ✅ Safe-call checklist

1. **timeout** so it can't hang forever.
2. **raise_for_status** so errors surface early.
3. **try/except** \`requests.RequestException\` for flaky networks.
4. **Never hardcode API keys** - use environment variables.`,
        code: `import requests

def get_weather(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    try:
        r = requests.get(url, params={
            "latitude": lat, "longitude": lon,
            "current_weather": "true"
        }, timeout=10)
        r.raise_for_status()
        cw = r.json()["current_weather"]
        return f"{cw['temperature']}°C, wind {cw['windspeed']} km/h"
    except requests.RequestException as e:
        return f"Lookup failed: {e}"

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
        theory: `## 🚦 Sync vs Async

**Sync**: gọi 50 URL tuần tự → 50 × 0.3s = **15 s**.
**Async**: gọi đồng thời (concurrent), tổng ≈ **0.5 s**.

## 🪄 3 từ khoá vàng

- \`async def\` → định nghĩa coroutine.
- \`await\` → tạm dừng đợi I/O.
- \`asyncio.gather(*tasks)\` → chạy đồng thời, gom kết quả.

\`\`\`
[sync]   ●━━━━━●━━━━━●━━━━━●━━━━━●   ~50 × 300ms
[async]  ●─┐ ●─┐ ●─┐ ●─┐ ●─┐
            └──┘ └──┘ └──┘ ...        gần như song song
\`\`\`

## ⚠️ Khi nào KHÔNG dùng async?

- Bài toán **CPU-bound** (xử lý số nặng). Hãy dùng \`multiprocessing\` thay vào.
- Khi thư viện bạn dùng là **sync-only** (ví dụ \`requests\` cổ điển — thay bằng \`httpx\` hoặc \`aiohttp\`).`,
        theoryEn: `## 🚦 Sync vs Async

**Sync**: hit 50 URLs sequentially → 50 × 0.3s = **15 s**.
**Async**: launch them concurrently → total ≈ **0.5 s**.

## 🪄 The 3 golden keywords

- \`async def\` → define a coroutine.
- \`await\` → pause for I/O.
- \`asyncio.gather(*tasks)\` → run them in parallel, collect results.

\`\`\`
[sync]   ●━━━━━●━━━━━●━━━━━●━━━━━●   ~50 × 300ms
[async]  ●─┐ ●─┐ ●─┐ ●─┐ ●─┐
            └──┘ └──┘ └──┘ ...        nearly parallel
\`\`\`

## ⚠️ When NOT to use async

- **CPU-bound** work (heavy math). Reach for \`multiprocessing\` instead.
- Libraries that are **sync-only** (e.g. classic \`requests\` — swap to \`httpx\` or \`aiohttp\`).`,
        code: `import asyncio, httpx, time

URLS = [f"https://httpbin.org/delay/1?id={i}" for i in range(10)]

async def fetch(client, url):
    r = await client.get(url, timeout=5)
    return r.status_code

async def main():
    async with httpx.AsyncClient() as client:
        tasks = [fetch(client, u) for u in URLS]
        return await asyncio.gather(*tasks)

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

import type { ExtendedProgrammingModule } from "./types";

/**
 * Programming Interactive Labs (2026)
 * -------------------------------------------------------------
 * Two new pillar-spanning modules designed to make Programming
 * lessons more engaging:
 *   1) Python Power-Ups - bite-sized hands-on labs (debugging puzzles,
 *      mini-games, real-world automations) that reinforce core Python.
 *   2) Real-World Data Projects - end-to-end project briefs combining
 *      SQL, pandas, and visualisation around relatable datasets.
 *
 * All content is bilingual (VI/EN), with quizzes that grade in both
 * languages via the existing i18n lookup table. ASCII visuals only
 * so the markdown renderer stays mobile-friendly.
 */
export const programmingInteractiveLabsModules: ExtendedProgrammingModule[] = [
  // ============================================================
  // Module A: Python Power-Ups
  // ============================================================
  {
    id: "prog-python-powerups",
    title: "Python Power-Ups - Phòng thí nghiệm tương tác",
    titleEn: "Python Power-Ups - Interactive Labs",
    icon: "⚡",
    color: "from-yellow-500 to-orange-600",
    description:
      "5 bài lab Python ngắn, vui và thực tế: săn bug, mini-game, automation đời sống, tối ưu thuật toán.",
    descriptionEn:
      "5 bite-sized Python labs that are fun and practical: bug hunts, mini-games, life automations, algorithm tuning.",
    course: "python",
    lessons: [
      // -------- Lesson 1: Bug Hunter --------
      {
        id: "py-pu-1",
        title: "Bug Hunter - Săn lỗi trong 60 giây",
        titleEn: "Bug Hunter - Squash Bugs in 60 Seconds",
        level: 2,
        difficulty: "beginner",
        theory: `## 🐛 Tại sao đọc lỗi (traceback) là kỹ năng số 1?

Khi Python báo lỗi, nó kể cho bạn **câu chuyện ngược**: dòng cuối là *cái gì sai*, các dòng trên là *đường dẫn dẫn đến lỗi*.

\`\`\`
   Traceback (most recent call last):
     File "main.py", line 7, in <module>
       total = sum_list(numbers)
     File "main.py", line 3, in sum_list
       return total + n
   TypeError: unsupported operand type(s) for +: 'int' and 'str'
\`\`\`

Đọc từ dưới lên: \`int + str\` → có ai đó nhét string vào list số. Quay lại line 7 → kiểm tra \`numbers\`.

## 🎯 4 loại bug phổ biến

1. **SyntaxError** - sai cú pháp (thiếu dấu \`:\`, thiếu ngoặc).
2. **NameError** - dùng biến chưa khai báo (gõ sai tên).
3. **TypeError** - trộn kiểu dữ liệu (cộng \`int\` với \`str\`).
4. **IndexError / KeyError** - truy cập phần tử / khoá không tồn tại.

## ⏱️ Luật 60 giây

Khi gặp lỗi, dành đúng 60 giây làm 3 việc:
\`\`\`
   [0-20s]  Đọc dòng cuối traceback - loại lỗi gì?
   [20-40s] Nhảy đến file:line nó chỉ - copy dòng code
   [40-60s] Hỏi: kiểu dữ liệu / tên biến / index ổn không?
\`\`\`
Nếu chưa ra → mới gọi AI Debug.`,
        theoryEn: `## 🐛 Why reading tracebacks is the #1 skill

When Python raises an error it tells you a **story in reverse**: the last line is *what broke*, the lines above are *the path that led there*.

\`\`\`
   Traceback (most recent call last):
     File "main.py", line 7, in <module>
       total = sum_list(numbers)
     File "main.py", line 3, in sum_list
       return total + n
   TypeError: unsupported operand type(s) for +: 'int' and 'str'
\`\`\`

Read bottom-up: \`int + str\` → someone put a string in a number list. Jump to line 7 → check \`numbers\`.

## 🎯 The four most common bugs

1. **SyntaxError** - bad syntax (missing \`:\`, missing bracket).
2. **NameError** - used an undeclared variable (typo).
3. **TypeError** - mixed data types (int + str).
4. **IndexError / KeyError** - accessed a missing element / key.

## ⏱️ The 60-second rule

When an error appears, spend exactly 60 seconds doing 3 things:
\`\`\`
   [0-20s]  Read the LAST traceback line - what kind of error?
   [20-40s] Jump to file:line it points to - copy that line
   [40-60s] Ask: types / variable name / index - all valid?
\`\`\`
Only if still stuck → call AI Debug.`,
        code: `# 🐛 BUG HUNTER LAB - find and fix 3 bugs in 60 seconds

def average(numbers):
    total = 0
    for n in numbers:
        total = total + n
    return total / len(numbers)   # ← bug #1: empty list = ZeroDivisionError

scores = [85, 90, "78", 92]       # ← bug #2: a string snuck in
print("Avg:", average(scores))

# bug #3: typo on the next line
prnt("Done!")`,
        codeLanguage: "python",
        exercise:
          "Sửa cả 3 bug ở trên: (1) thêm guard cho list rỗng, (2) ép kiểu int khi đọc list, (3) sửa lỗi typo print. Mục tiêu: chạy được và in ra average + 'Done!'.",
        exerciseEn:
          "Fix all 3 bugs above: (1) guard against empty lists, (2) cast values to int when reading the list, (3) fix the typo on print. Goal: code runs and prints the average + 'Done!'.",
        quiz: [
          {
            question: "Dòng nào của traceback bạn nên đọc đầu tiên?",
            options: [
              "Dòng đầu tiên (Traceback most recent call last)",
              "Dòng cuối cùng - chứa loại lỗi và mô tả",
              "Dòng ở giữa, vì nó luôn là gốc rễ",
              "Không cần đọc, hỏi AI ngay",
            ],
            answer: 1,
            explanation:
              "Dòng cuối cùng là phần quan trọng nhất: nó cho biết loại exception (TypeError, NameError…) và thông điệp chi tiết.",
          },
          {
            question: "Cộng số 5 với chuỗi '3' trong Python sẽ gây lỗi gì?",
            options: ["SyntaxError", "NameError", "TypeError", "ValueError"],
            answer: 2,
            explanation:
              "Python không tự ép kiểu: 5 + '3' báo TypeError vì int và str không cộng được.",
          },
          {
            question: "Cách phòng \"ZeroDivisionError\" khi tính trung bình?",
            options: [
              "Dùng try/except quanh phép chia",
              "Kiểm tra len(numbers) > 0 trước khi chia",
              "Cả hai đều hợp lệ",
              "Không cần, Python tự xử lý",
            ],
            answer: 2,
            explanation:
              "Cả guard \`if len(numbers) == 0: return 0\` lẫn try/except đều tốt; chọn cách phù hợp ngữ cảnh.",
          },
        ],
      },
      // -------- Lesson 2: Mini-game --------
      {
        id: "py-pu-2",
        title: "Mini-game \"Guess the Number\" - vòng lặp + điều kiện",
        titleEn: "Mini-game \"Guess the Number\" - Loops + Conditions",
        level: 2,
        difficulty: "beginner",
        theory: `## 🎮 Vì sao mini-game là cách học vòng lặp tốt nhất?

Vì bạn buộc phải xài đủ 3 thứ cùng lúc:

\`\`\`
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │  input()   │ ─▶ │  if/elif   │ ─▶ │  while True│
   │ nhập đoán  │    │  so sánh   │    │  lặp đến   │
   │            │    │  cao/thấp  │    │  khi đúng  │
   └────────────┘    └────────────┘    └────────────┘
\`\`\`

## 🧠 Thuật toán bí mật: Binary Search

Số bí mật từ 1-100. Đoán 50 → "cao hơn" → còn 1-49 → đoán 25 → ... Mỗi lần loại nửa số → tối đa **log₂(100) ≈ 7 lượt** là chắc thắng.

\`\`\`
   1 ──── 25 ──── 50 ──── 75 ──── 100
                   ▲
                   đoán đầu tiên: ở giữa!
\`\`\`

## 🎯 Mở rộng: thêm gì để game vui hơn?

- ⏱️ Đếm lượt → cho điểm "perfect" nếu < 7 lượt.
- 🏆 Lưu high score ra file txt.
- 🌈 In emoji 🔥 (gần đúng) hoặc ❄️ (xa) thay vì "thấp/cao".

## 🧩 Mổ xẻ \`while True\` - vòng lặp vô hạn an toàn

Vòng lặp \`while True\` chạy mãi đến khi gặp \`break\`. Đây là **mẫu chuẩn** cho game/menu/CLI:

\`\`\`python
   while True:
       cmd = input("> ").strip().lower()
       if cmd == "quit":
           break                         # ← thoát chính
       elif cmd == "help":
           print("Lệnh: guess, hint, quit")
           continue                      # ← bỏ qua phần còn lại, lặp tiếp
       # xử lý lệnh bình thường...
\`\`\`

Quy tắc vàng: **luôn có ít nhất 1 đường thoát** (\`break\` hoặc điều kiện). Quên \`break\` = Ctrl+C vô tận.

## 🎲 Random trong Python - 4 hàm phải nhớ

| Hàm | Trả về | Ví dụ |
|---|---|---|
| \`random.randint(a, b)\` | Số nguyên \`[a, b]\` (bao cả 2 đầu) | \`randint(1, 6)\` = xúc xắc |
| \`random.choice(seq)\` | 1 phần tử trong list/tuple | \`choice(["a","b","c"])\` |
| \`random.shuffle(lst)\` | Xáo trộn list **tại chỗ** | bộ bài tây |
| \`random.sample(seq, k)\` | k phần tử **không lặp** | bốc 3 lá từ bộ bài |

Mẹo test: gọi \`random.seed(42)\` đầu file để mỗi lần chạy ra cùng kết quả - giúp debug game logic mà không bị "hên xui".

## 🎁 Bonus: thiết kế hệ thống điểm

Một công thức điểm gọn nhẹ kết hợp số lượt và độ khó:

\`\`\`
   score = max(0, 1000 - turns * 100 - hints_used * 50)
\`\`\`

- 1 lượt thắng → 900 điểm.
- Dùng hint trừ 50.
- Hết lượt → 0 (không âm nhờ \`max(0, ...)\`).

Thêm bảng xếp hạng top-3 in cuối game tạo cảm giác cạnh tranh, lưu vào \`scores.json\` bằng \`json.dump\`.`,
        theoryEn: `## 🎮 Why a mini-game is the best way to learn loops

Because you must use all 3 things at once:

\`\`\`
   ┌────────────┐    ┌────────────┐    ┌────────────┐
   │  input()   │ ─▶ │  if/elif   │ ─▶ │  while True│
   │ get guess  │    │ higher/    │    │ loop until │
   │            │    │ lower      │    │ correct    │
   └────────────┘    └────────────┘    └────────────┘
\`\`\`

## 🧠 The secret algorithm: Binary Search

Secret number 1-100. Guess 50 → "higher" → range 1-49 → guess 25 → ... Each guess halves the range → at most **log₂(100) ≈ 7 guesses** to win.

\`\`\`
   1 ──── 25 ──── 50 ──── 75 ──── 100
                   ▲
                   first guess: the middle!
\`\`\`

## 🎯 Stretch: how to make it more fun?

- ⏱️ Count turns → award "perfect" if < 7.
- 🏆 Save high score to a txt file.
- 🌈 Print 🔥 (close) or ❄️ (far) instead of "low/high".

## 🧩 Dissecting \`while True\` - the safe infinite loop

\`while True\` runs forever until it meets a \`break\`. It's the **canonical pattern** for games/menus/CLIs:

\`\`\`python
   while True:
       cmd = input("> ").strip().lower()
       if cmd == "quit":
           break                         # ← main exit
       elif cmd == "help":
           print("Commands: guess, hint, quit")
           continue                      # ← skip rest, loop again
       # normal handling...
\`\`\`

Golden rule: **always have at least one exit path** (\`break\` or condition). Forget \`break\` = endless Ctrl+C.

## 🎲 Random in Python - 4 functions to remember

| Function | Returns | Example |
|---|---|---|
| \`random.randint(a, b)\` | Integer in \`[a, b]\` (both inclusive) | \`randint(1, 6)\` = die roll |
| \`random.choice(seq)\` | One element from list/tuple | \`choice(["a","b","c"])\` |
| \`random.shuffle(lst)\` | Shuffles list **in place** | deck of cards |
| \`random.sample(seq, k)\` | k elements **without repeats** | draw 3 cards |

Testing tip: call \`random.seed(42)\` at the top so each run produces the same result - lets you debug game logic without "luck" interference.

## 🎁 Bonus: a scoring system design

A compact formula combining turns and difficulty:

\`\`\`
   score = max(0, 1000 - turns * 100 - hints_used * 50)
\`\`\`

- Win in 1 turn → 900 points.
- Each hint costs 50.
- Out of turns → 0 (never negative thanks to \`max(0, ...)\`).

Add a top-3 leaderboard at the end of the game to create competition - persist it to \`scores.json\` with \`json.dump\`.`,
        code: `# 🎮 Guess the Number - 7 turns to win
import random

secret = random.randint(1, 100)
turns = 0
print("I picked a number 1-100. You have 7 guesses!")

while turns < 7:
    guess = int(input(f"[{turns + 1}/7] Your guess: "))
    turns += 1
    if guess == secret:
        print(f"🏆 Correct in {turns} turns!")
        break
    elif guess < secret:
        print("🔥 Higher" if secret - guess <= 10 else "❄️ Higher")
    else:
        print("🔥 Lower" if guess - secret <= 10 else "❄️ Lower")
else:
    print(f"💀 Out of turns. Secret was {secret}.")`,
        codeLanguage: "python",
        exercise:
          "Mở rộng game: (1) lưu lại số lượt thắng tốt nhất vào biến \`best\`, (2) hỏi người chơi có muốn chơi lại không sau mỗi ván, (3) áp dụng binary search strategy khi máy đoán hộ.",
        exerciseEn:
          "Extend the game: (1) keep a \`best\` variable tracking the lowest turn count, (2) ask the player if they want to replay after each round, (3) apply binary search strategy when the computer guesses for the player.",
        quiz: [
          {
            question: "Tại sao binary search cần ≤ 7 lượt cho khoảng 1-100?",
            options: [
              "Vì 7 là số may mắn",
              "Vì log₂(100) ≈ 6.6, làm tròn lên = 7",
              "Vì Python chỉ cho phép tối đa 7 vòng lặp",
              "Hoàn toàn ngẫu nhiên, không có lý do",
            ],
            answer: 1,
            explanation:
              "Mỗi lượt đoán giữa loại nửa khả năng. log₂(100) ≈ 6.64 → cần tối đa 7 lượt để chắc thắng.",
          },
          {
            question: "Cấu trúc \`while ... else\` của Python chạy block else khi nào?",
            options: [
              "Khi điều kiện while là False ngay từ đầu",
              "Khi vòng lặp kết thúc tự nhiên (không gặp break)",
              "Khi gặp exception trong while",
              "Khi dùng continue",
            ],
            answer: 1,
            explanation:
              "else gắn với while chạy khi loop kết thúc mà KHÔNG bị break - rất hữu ích cho trường hợp \"hết lượt mà chưa thắng\".",
          },
          {
            question: "Lưu high score ra file thì dùng hàm nào phù hợp nhất?",
            options: [
              "print() vào terminal",
              "open(path, 'w') rồi f.write(str(score))",
              "input() ghi từ bàn phím",
              "random.write()",
            ],
            answer: 1,
            explanation:
              "Dùng \`with open(path, 'w') as f: f.write(str(score))\` là cách chuẩn để lưu dữ liệu xuống ổ đĩa.",
          },
        ],
      },
      // -------- Lesson 3: Life Automation --------
      {
        id: "py-pu-3",
        title: "Automation đời sống - đổi tên 100 file ảnh trong 5 dòng",
        titleEn: "Life Automation - Rename 100 Photos in 5 Lines",
        level: 3,
        difficulty: "intermediate",
        theory: `## 📂 Vì sao Python là "siêu năng lực" văn phòng?

Một việc tay mất 30 phút (đổi tên 100 ảnh từ \`IMG_8423.jpg\` thành \`2026-06-01-001.jpg\`), Python chạy trong 0.2 giây.

## 🧰 Bộ ba module bạn cần nhớ

\`\`\`
   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
   │   pathlib   │  │      os     │  │   shutil    │
   │ Path/glob   │  │ rename/walk │  │ copy/move   │
   └─────────────┘  └─────────────┘  └─────────────┘
\`\`\`

- **pathlib.Path** - đối tượng đường dẫn hiện đại, hỗ trợ glob/rglob.
- **os.rename(old, new)** - đổi tên / di chuyển.
- **shutil.copy / shutil.move** - sao chép / di chuyển an toàn cross-platform.

## 🎯 Mẫu pattern lặp đi lặp lại

\`\`\`python
   from pathlib import Path
   for i, f in enumerate(sorted(Path("photos").glob("*.jpg")), start=1):
       f.rename(f.with_name(f"2026-06-01-{i:03d}.jpg"))
\`\`\`

Đọc: với mỗi file \`.jpg\` trong thư mục \`photos\`, đánh số tăng dần và đổi tên theo định dạng ngày-thứ tự (zero-pad 3 chữ số).

## ⚠️ Quy tắc vàng

1. **Luôn backup** trước khi chạy script ghi đè.
2. **Test với \`print(new_name)\`** trước khi gọi \`rename\` thật.
3. Dùng \`{i:03d}\` để sort đúng (001 < 010 < 100).`,
        theoryEn: `## 📂 Why Python is your office superpower

A manual job that takes 30 minutes (renaming 100 photos from \`IMG_8423.jpg\` to \`2026-06-01-001.jpg\`) runs in 0.2 seconds with Python.

## 🧰 The trio of modules to memorize

\`\`\`
   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
   │   pathlib   │  │      os     │  │   shutil    │
   │ Path/glob   │  │ rename/walk │  │ copy/move   │
   └─────────────┘  └─────────────┘  └─────────────┘
\`\`\`

- **pathlib.Path** - modern path object with glob/rglob.
- **os.rename(old, new)** - rename / move.
- **shutil.copy / shutil.move** - safe cross-platform copy/move.

## 🎯 The recurring pattern

\`\`\`python
   from pathlib import Path
   for i, f in enumerate(sorted(Path("photos").glob("*.jpg")), start=1):
       f.rename(f.with_name(f"2026-06-01-{i:03d}.jpg"))
\`\`\`

Read: for each \`.jpg\` in the \`photos\` folder, number them sequentially and rename with date-index format (3-digit zero-pad).

## ⚠️ Golden rules

1. **Always back up** before running an overwriting script.
2. **Test with \`print(new_name)\`** before calling \`rename\` for real.
3. Use \`{i:03d}\` for correct sort order (001 < 010 < 100).`,
        code: `# 📂 Rename a folder of photos - DRY RUN first
from pathlib import Path

folder = Path("photos")     # change to your folder
prefix = "2026-06-01"

# Step 1: dry-run - print what WOULD happen
for i, f in enumerate(sorted(folder.glob("*.jpg")), start=1):
    new_name = f"{prefix}-{i:03d}.jpg"
    print(f"{f.name}  →  {new_name}")

# Step 2: when you're happy, uncomment to rename for real
# for i, f in enumerate(sorted(folder.glob("*.jpg")), start=1):
#     f.rename(f.with_name(f"{prefix}-{i:03d}.jpg"))`,
        codeLanguage: "python",
        exercise:
          "Viết một script đọc thư mục \`invoices/\` chứa nhiều PDF. Đổi tên theo định dạng \`{YYYY-MM}-INV-{số tăng dần}.pdf\` dựa trên ngày sửa đổi (\`f.stat().st_mtime\`). Luôn in preview trước.",
        exerciseEn:
          "Write a script that reads the \`invoices/\` folder of PDFs and renames them as \`{YYYY-MM}-INV-{seq}.pdf\` based on modification date (\`f.stat().st_mtime\`). Always print a preview first.",
        quiz: [
          {
            question: "Vì sao nên dùng \`{i:03d}\` thay vì chỉ \`{i}\` khi đánh số?",
            options: [
              "Vì nó chạy nhanh hơn",
              "Để sắp xếp đúng thứ tự khi xem theo tên (001 trước 010 trước 100)",
              "Để Python chấp nhận biến i",
              "Để tránh lỗi pathlib",
            ],
            answer: 1,
            explanation:
              "Zero-padding đảm bảo sort theo tên (ASCII) đúng thứ tự số: 001 < 010 < 100, chứ không phải 1 < 10 < 100 → 1, 10, 100, 2…",
          },
          {
            question: "Trước khi chạy script đổi tên hàng loạt, bạn nên làm gì?",
            options: [
              "Chạy luôn cho nhanh",
              "Sao lưu thư mục VÀ chạy dry-run bằng print() trước",
              "Tắt antivirus",
              "Đổi cuối cùng từng file bằng tay",
            ],
            answer: 1,
            explanation:
              "Backup + dry-run là 2 lá chắn quan trọng nhất tránh mất dữ liệu khi tự động hoá file system.",
          },
          {
            question: "\`Path('photos').glob('*.jpg')\` trả về gì?",
            options: [
              "Một list các string",
              "Một generator các đối tượng Path khớp mẫu",
              "Một dict với key là tên file",
              "Một số nguyên là tổng số file",
            ],
            answer: 1,
            explanation:
              "\`.glob()\` trả về generator lười (lazy) các Path khớp pattern - rất hiệu quả khi thư mục lớn.",
          },
        ],
      },
      // -------- Lesson 4: Performance --------
      {
        id: "py-pu-4",
        title: "Tăng tốc 100×: list comprehension vs vòng lặp",
        titleEn: "100× Faster: List Comprehensions vs For Loops",
        level: 3,
        difficulty: "intermediate",
        theory: `## ⚡ List comprehension là gì?

Là cách viết tạo list trong 1 dòng, **nhanh hơn ~30% so với for loop thông thường** vì được thực thi ở tầng C nội bộ.

\`\`\`
   # Cách dài
   squares = []
   for n in range(1_000_000):
       squares.append(n * n)

   # Cách ngắn (nhanh hơn ~30%)
   squares = [n * n for n in range(1_000_000)]
\`\`\`

## 🧪 Benchmark - đo bằng \`timeit\`

\`\`\`
   for-loop append      : 0.135 s
   list comprehension   : 0.095 s   ← 30% nhanh hơn
   numpy vectorised     : 0.005 s   ← 27× nhanh hơn
\`\`\`

## 🧠 Cú pháp mở rộng

\`\`\`python
   # Có if filter
   evens = [n for n in range(20) if n % 2 == 0]

   # Có if/else inline
   labels = ["even" if n % 2 == 0 else "odd" for n in range(5)]

   # Dict comprehension
   sq = {n: n * n for n in range(5)}

   # Set comprehension
   unique_words = {w.lower() for w in text.split()}
\`\`\`

## ⚠️ Khi nào KHÔNG nên dùng?

- Logic bên trong > 3 dòng → khó đọc, hãy dùng \`for\` rõ ràng.
- Có side-effect (print, ghi file) → dùng \`for\` để code rõ ý.

## 🧬 Generator expression - anh em "tiết kiệm RAM"

Chỉ thay \`[ ]\` bằng \`( )\` và bạn có **generator** - không tạo list trong bộ nhớ, lười sinh từng phần tử:

\`\`\`python
   total = sum(n * n for n in range(10_000_000))   # 0 MB list
   total = sum([n * n for n in range(10_000_000)])  # ~80 MB list
\`\`\`

Khi nào dùng generator: pipeline xử lý dữ liệu lớn, file khổng lồ, hoặc khi chỉ cần \`sum / max / any / all\` trên kết quả.

## 🚀 Tăng tốc cấp 3: NumPy vectorisation

NumPy đẩy phép tính xuống tầng C/Fortran chạy SIMD, không có Python loop nào trong vòng nóng:

\`\`\`python
   import numpy as np
   a = np.arange(10_000_000)
   sq = a * a                       # ~10 ms cho 10 triệu phần tử
\`\`\`

So sánh thực tế:

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| \`for\` + \`.append\` | 1.0× (chuẩn) | List Python |
| List comprehension | 0.7× | List Python |
| Generator expression | 0.7× | ~0 (lười) |
| NumPy vectorisation | 0.02-0.05× | Mảng C compact |

Quy tắc thầy Hải: **dữ liệu < 10k phần tử → list-comp; ≥ 100k phần tử → NumPy/pandas; pipeline streaming → generator**.

## 🧪 Cách đo chính xác

Đừng đoán - đo bằng \`timeit\`:

\`\`\`python
   import timeit
   t = timeit.timeit("sum(n*n for n in range(1000))", number=10_000)
   print(f"{t * 1000:.2f} ms / 10k lần chạy")
\`\`\`

Mẹo: chạy ≥ 3 lần và lấy \`min(times)\` để bỏ nhiễu từ OS/GC.`,
        theoryEn: `## ⚡ What is a list comprehension?

A one-line way to build a list, **about 30% faster than a regular for-loop** because the loop runs in the C layer.

\`\`\`
   # The long way
   squares = []
   for n in range(1_000_000):
       squares.append(n * n)

   # The short way (~30% faster)
   squares = [n * n for n in range(1_000_000)]
\`\`\`

## 🧪 Benchmark - measured with \`timeit\`

\`\`\`
   for-loop append      : 0.135 s
   list comprehension   : 0.095 s   ← 30% faster
   numpy vectorised     : 0.005 s   ← 27× faster
\`\`\`

## 🧠 Extended syntax

\`\`\`python
   # With filter
   evens = [n for n in range(20) if n % 2 == 0]

   # With inline if/else
   labels = ["even" if n % 2 == 0 else "odd" for n in range(5)]

   # Dict comprehension
   sq = {n: n * n for n in range(5)}

   # Set comprehension
   unique_words = {w.lower() for w in text.split()}
\`\`\`

## ⚠️ When NOT to use it

- Inner logic > 3 lines → hard to read, use a plain \`for\`.
- Has side-effects (print, file IO) → use \`for\` to keep intent clear.

## 🧬 Generator expression - the RAM-saving sibling

Replace \`[ ]\` with \`( )\` and you get a **generator** - no list built in memory, values produced lazily:

\`\`\`python
   total = sum(n * n for n in range(10_000_000))   # 0 MB list
   total = sum([n * n for n in range(10_000_000)])  # ~80 MB list
\`\`\`

When to use a generator: large data pipelines, huge files, or when you only need \`sum / max / any / all\` on the result.

## 🚀 Speed tier 3: NumPy vectorisation

NumPy drops computation down to C/Fortran with SIMD - zero Python loops in the hot path:

\`\`\`python
   import numpy as np
   a = np.arange(10_000_000)
   sq = a * a                       # ~10 ms for 10M elements
\`\`\`

Real-world comparison:

| Approach | Time | Memory |
|---|---|---|
| \`for\` + \`.append\` | 1.0× (baseline) | Python list |
| List comprehension | 0.7× | Python list |
| Generator expression | 0.7× | ~0 (lazy) |
| NumPy vectorisation | 0.02-0.05× | Compact C array |

Hai's rule: **< 10k items → list-comp; ≥ 100k items → NumPy/pandas; streaming pipeline → generator**.

## 🧪 How to measure properly

Don't guess - measure with \`timeit\`:

\`\`\`python
   import timeit
   t = timeit.timeit("sum(n*n for n in range(1000))", number=10_000)
   print(f"{t * 1000:.2f} ms / 10k runs")
\`\`\`

Tip: run ≥ 3 times and take \`min(times)\` to filter out OS/GC noise.`,
        code: `# ⚡ Benchmark list-comp vs for-loop
import timeit

def with_loop():
    out = []
    for n in range(100_000):
        if n % 3 == 0:
            out.append(n * n)
    return out

def with_comp():
    return [n * n for n in range(100_000) if n % 3 == 0]

t1 = timeit.timeit(with_loop, number=20)
t2 = timeit.timeit(with_comp, number=20)
print(f"for-loop      : {t1:.3f} s")
print(f"list-comp     : {t2:.3f} s")
print(f"speedup       : {t1 / t2:.2f}×")`,
        codeLanguage: "python",
        exercise:
          "Viết lại bằng list comprehension: (1) lấy bình phương các số chẵn từ 1-50, (2) chuyển list tên thành dict {name: len(name)}, (3) tạo set các nguyên âm có trong câu \"Hello world\".",
        exerciseEn:
          "Rewrite using list comprehensions: (1) squares of even numbers 1-50, (2) list of names → dict {name: len(name)}, (3) set of vowels present in \"Hello world\".",
        quiz: [
          {
            question: "List comprehension nhanh hơn for-loop chủ yếu vì?",
            options: [
              "Vì cú pháp ngắn hơn nên ít byte hơn",
              "Vì loop được thực thi tối ưu ở tầng C của CPython",
              "Vì comprehension chạy đa luồng",
              "Vì Python compile nó thành GPU code",
            ],
            answer: 1,
            explanation:
              "CPython tối ưu list-comp ở C-level, tránh overhead của \`.append\` Python-level.",
          },
          {
            question: "Khi nào nên TRÁNH dùng list comprehension?",
            options: [
              "Khi cần lọc dữ liệu",
              "Khi logic nội bộ phức tạp > 3 dòng hoặc có side-effect",
              "Khi viết Python 3",
              "Khi muốn tạo dict",
            ],
            answer: 1,
            explanation:
              "Logic dài hoặc có in/ghi file nên dùng for-loop bình thường để code dễ đọc hơn.",
          },
          {
            question: "Kết quả của \`[n * 2 for n in range(4) if n % 2]\`?",
            options: ["[0, 2, 4, 6]", "[2, 6]", "[0, 4]", "[1, 3]"],
            answer: 1,
            explanation:
              "\`if n % 2\` giữ lại n lẻ (1, 3); nhân 2 → [2, 6].",
          },
        ],
      },
      // -------- Lesson 5: Code Golf --------
      {
        id: "py-pu-5",
        title: "Code Golf - viết Pythonic trong 1 dòng",
        titleEn: "Code Golf - One-Line Pythonic Tricks",
        level: 4,
        difficulty: "advanced",
        theory: `## ⛳ Code Golf là gì?

Là môn chơi viết code **ngắn nhất có thể** mà vẫn đúng. Không phải lúc nào ngắn = tốt, nhưng học code golf giúp bạn:

1. Hiểu sâu thư viện chuẩn (\`itertools\`, \`functools\`, \`collections\`).
2. Viết code "Pythonic" - đẹp, ngắn, dễ đọc.
3. Tăng tốc độ giải các bài kiểu LeetCode "easy".

## 🏆 Hall of Fame - 6 one-liner kinh điển

\`\`\`python
   # 1. Đảo ngược chuỗi
   "hello"[::-1]                      # 'olleh'

   # 2. Đếm tần suất ký tự
   from collections import Counter
   Counter("mississippi")              # {'i': 4, 's': 4, 'p': 2, 'm': 1}

   # 3. Flatten list lồng nhau
   import itertools
   list(itertools.chain.from_iterable([[1,2],[3,4]]))   # [1,2,3,4]

   # 4. Fibonacci đệ quy có memo
   from functools import lru_cache
   @lru_cache
   def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)

   # 5. Đảo key-value của dict
   {v: k for k, v in d.items()}

   # 6. Kiểm tra anagram
   sorted("listen") == sorted("silent")    # True
\`\`\`

## 🧠 Quy tắc "đủ Pythonic"

- ✅ Một dòng nếu logic ≤ 1 ý tưởng.
- ✅ Đặt tên biến rõ → không cần comment.
- ❌ Không nhồi 3 \`lambda\` lồng nhau để tiết kiệm 2 ký tự.

## 🛠️ \`itertools\` - bộ công cụ vô địch

Thư viện chuẩn ít người dùng nhưng cực mạnh cho code golf và pipeline dữ liệu:

\`\`\`python
   from itertools import groupby, accumulate, product, combinations, takewhile

   # Nhóm liên tiếp cùng giá trị
   [list(g) for k, g in groupby("AAABBC")]       # [['A','A','A'], ['B','B'], ['C']]

   # Cộng dồn (running total)
   list(accumulate([1, 2, 3, 4]))                 # [1, 3, 6, 10]

   # Tích Descartes (lưới tham số)
   list(product([0, 1], repeat=3))                # 8 tổ hợp bit 3-bit

   # Tổ hợp chọn k phần tử
   list(combinations("ABCD", 2))                  # 6 cặp

   # Lấy đến khi điều kiện sai
   list(takewhile(lambda x: x < 5, [1, 3, 5, 7])) # [1, 3]
\`\`\`

## ⚡ Walrus operator \`:=\` (Python 3.8+)

Gán **và** dùng giá trị trong cùng biểu thức - cực lợi trong comprehension và \`while\`:

\`\`\`python
   # Đọc file theo dòng đến khi hết
   while (line := f.readline()):
       process(line)

   # Lọc + biến đổi không tính 2 lần
   results = [y for x in data if (y := expensive(x)) > 0]
\`\`\`

## 🎯 Match-case (Python 3.10+) - pattern matching đỉnh cao

Mạnh hơn \`if/elif\` chain rất nhiều - giải nén tuple, dict, dataclass trong 1 nhánh:

\`\`\`python
   def http_status(code):
       match code:
           case 200 | 201: return "OK"
           case 301 | 302: return "Redirect"
           case 400: return "Bad request"
           case 404: return "Not found"
           case n if 500 <= n < 600: return "Server error"
           case _: return "Unknown"
\`\`\`

Code golf đỉnh nhất là khi **người đọc khen "wow, đẹp quá"** chứ không phải "hả, đoạn này làm gì?".`,
        theoryEn: `## ⛳ What is Code Golf?

A game of writing the **shortest possible code** that still works. Shortest isn't always best, but practicing code golf helps you:

1. Master the standard library (\`itertools\`, \`functools\`, \`collections\`).
2. Write "Pythonic" code - elegant, short, readable.
3. Speed-solve LeetCode-easy problems.

## 🏆 Hall of Fame - 6 classic one-liners

\`\`\`python
   # 1. Reverse a string
   "hello"[::-1]                      # 'olleh'

   # 2. Char frequency
   from collections import Counter
   Counter("mississippi")              # {'i': 4, 's': 4, 'p': 2, 'm': 1}

   # 3. Flatten nested list
   import itertools
   list(itertools.chain.from_iterable([[1,2],[3,4]]))   # [1,2,3,4]

   # 4. Memoized Fibonacci
   from functools import lru_cache
   @lru_cache
   def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)

   # 5. Swap dict keys/values
   {v: k for k, v in d.items()}

   # 6. Anagram check
   sorted("listen") == sorted("silent")    # True
\`\`\`

## 🧠 The "Pythonic-enough" rule

- ✅ One line if the logic is ≤ 1 idea.
- ✅ Clear variable names → no comments needed.
- ❌ Don't cram 3 nested \`lambda\`s to save 2 chars.

## 🛠️ \`itertools\` - the unbeatable toolbox

An underused standard-library module that's incredibly powerful for code golf and data pipelines:

\`\`\`python
   from itertools import groupby, accumulate, product, combinations, takewhile

   # Group consecutive equal values
   [list(g) for k, g in groupby("AAABBC")]       # [['A','A','A'], ['B','B'], ['C']]

   # Running total
   list(accumulate([1, 2, 3, 4]))                 # [1, 3, 6, 10]

   # Cartesian product (parameter grid)
   list(product([0, 1], repeat=3))                # 8 3-bit tuples

   # Pick k elements
   list(combinations("ABCD", 2))                  # 6 pairs

   # Take while predicate is true
   list(takewhile(lambda x: x < 5, [1, 3, 5, 7])) # [1, 3]
\`\`\`

## ⚡ Walrus operator \`:=\` (Python 3.8+)

Assign **and** use a value in the same expression - perfect inside comprehensions and \`while\`:

\`\`\`python
   # Read file line-by-line until empty
   while (line := f.readline()):
       process(line)

   # Filter + transform without computing twice
   results = [y for x in data if (y := expensive(x)) > 0]
\`\`\`

## 🎯 Match-case (Python 3.10+) - top-tier pattern matching

Much stronger than \`if/elif\` chains - destructure tuples, dicts, dataclasses in one branch:

\`\`\`python
   def http_status(code):
       match code:
           case 200 | 201: return "OK"
           case 301 | 302: return "Redirect"
           case 400: return "Bad request"
           case 404: return "Not found"
           case n if 500 <= n < 600: return "Server error"
           case _: return "Unknown"
\`\`\`

Best code golf is when **readers say "wow, beautiful"** - not "uh, what does this do?".`,
        code: `# ⛳ One-liner challenge - try to beat these!
from collections import Counter
from functools import lru_cache
import itertools

# 1. Most common word
text = "the quick brown fox jumps over the lazy dog the"
print(Counter(text.split()).most_common(1))   # [('the', 3)]

# 2. Sum of squares of even numbers 1-10
print(sum(n*n for n in range(1, 11) if n % 2 == 0))   # 220

# 3. Group anagrams
words = ["bat", "tab", "cat", "act", "dog"]
groups = {}
for w in words:
    groups.setdefault("".join(sorted(w)), []).append(w)
print(list(groups.values()))   # [['bat','tab'], ['cat','act'], ['dog']]`,
        codeLanguage: "python",
        exercise:
          "Viết 1 dòng mỗi câu: (1) đếm số nguyên âm trong câu, (2) lấy giao của 2 list, (3) flatten dict lồng \`{'a': {'b': 1}}\` thành \`{'a.b': 1}\`.",
        exerciseEn:
          "Write 1 line each: (1) count vowels in a sentence, (2) intersect two lists, (3) flatten nested dict \`{'a': {'b': 1}}\` into \`{'a.b': 1}\`.",
        quiz: [
          {
            question: "\`sorted(\"listen\") == sorted(\"silent\")\` trả về gì?",
            options: ["True", "False", "Lỗi TypeError", "None"],
            answer: 0,
            explanation:
              "Hai chuỗi cùng tập ký tự khi sắp xếp sẽ trùng nhau → là anagram → True.",
          },
          {
            question: "\`Counter(\"mississippi\").most_common(2)\` trả về?",
            options: [
              "[('i', 4), ('s', 4)]",
              "['i', 's']",
              "{'i': 4, 's': 4}",
              "[('m', 1), ('p', 2)]",
            ],
            answer: 0,
            explanation:
              "\`.most_common(2)\` trả về list 2 tuple (ký tự, số lần) phổ biến nhất.",
          },
          {
            question: "Lợi ích chính của \`@lru_cache\` trên hàm đệ quy?",
            options: [
              "Tự xoá kết quả cũ sau 60 giây",
              "Cache kết quả mỗi tham số → tránh tính lại, giảm O(2^n) về O(n)",
              "In log mỗi lần gọi",
              "Giảm bộ nhớ sử dụng",
            ],
            answer: 1,
            explanation:
              "\`@lru_cache\` ghi nhớ kết quả theo tham số. Fib(40) từ vài giây xuống còn micro-giây.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // Module B: Real-World Data Projects
  // ============================================================
  {
    id: "prog-realworld-projects",
    title: "Dự án dữ liệu thực tế - SQL × pandas × biểu đồ",
    titleEn: "Real-World Data Projects - SQL × pandas × Charts",
    icon: "📊",
    color: "from-emerald-500 to-blue-600",
    description:
      "3 dự án ngắn end-to-end: phân tích doanh thu quán cafe, theo dõi điểm học sinh, dashboard nghe nhạc Spotify cá nhân.",
    descriptionEn:
      "3 short end-to-end projects: café revenue analysis, student score tracker, personal Spotify listening dashboard.",
    course: "data-eng",
    lessons: [
      // -------- Project 1: Cafe Revenue --------
      {
        id: "rwp-1",
        title: "Dự án 1: Phân tích doanh thu quán cafe (SQL + pandas)",
        titleEn: "Project 1: Café Revenue Analysis (SQL + pandas)",
        level: 3,
        difficulty: "intermediate",
        theory: `## ☕ Brief

Chị Mai có quán cafe nhỏ, lưu mỗi đơn vào Google Sheet rồi export CSV \`orders.csv\`:

\`\`\`
   order_id, date,        item,      qty, price
   1001,     2026-05-01,  Cappuccino, 2,  45000
   1002,     2026-05-01,  Latte,      1,  50000
   ...
\`\`\`

Chị muốn biết: **(1) Món nào bán chạy nhất tuần?  (2) Doanh thu theo ngày?  (3) Khung giờ nào đông khách?**

## 🧭 Roadmap 4 bước

\`\`\`
   1. LOAD       2. CLEAN       3. AGGREGATE      4. VISUALIZE
   pd.read_csv → drop NaN  →  groupby + sum  →   matplotlib
\`\`\`

## 💡 Cheatsheet pandas tối thiểu

\`\`\`python
   df = pd.read_csv("orders.csv", parse_dates=["date"])
   df["revenue"] = df["qty"] * df["price"]

   top_items = df.groupby("item")["revenue"].sum().sort_values(ascending=False).head(5)
   daily     = df.groupby(df["date"].dt.date)["revenue"].sum()
\`\`\`

## 📈 Kết quả mẫu

\`\`\`
   Top 5 doanh thu (VND)         Doanh thu theo ngày
   ─────────────────────         ───────────────────
   Latte           2,400,000     2026-05-01 ██████ 850k
   Cappuccino      2,100,000     2026-05-02 ████   600k
   Espresso        1,400,000     2026-05-03 ████████ 1.2M
   Matcha            900,000     2026-05-04 ███    480k
   Tea               500,000     2026-05-05 ██████ 880k
\`\`\``,
        theoryEn: `## ☕ Brief

Ms. Mai runs a small café. Every order is logged in a Google Sheet exported as \`orders.csv\`:

\`\`\`
   order_id, date,        item,      qty, price
   1001,     2026-05-01,  Cappuccino, 2,  45000
   1002,     2026-05-01,  Latte,      1,  50000
   ...
\`\`\`

She wants to know: **(1) best-selling item this week?  (2) revenue per day?  (3) busiest hours?**

## 🧭 4-step roadmap

\`\`\`
   1. LOAD       2. CLEAN       3. AGGREGATE      4. VISUALIZE
   pd.read_csv → drop NaN  →  groupby + sum  →   matplotlib
\`\`\`

## 💡 Minimal pandas cheatsheet

\`\`\`python
   df = pd.read_csv("orders.csv", parse_dates=["date"])
   df["revenue"] = df["qty"] * df["price"]

   top_items = df.groupby("item")["revenue"].sum().sort_values(ascending=False).head(5)
   daily     = df.groupby(df["date"].dt.date)["revenue"].sum()
\`\`\`

## 📈 Sample output

\`\`\`
   Top 5 revenue (VND)            Revenue per day
   ─────────────────────          ───────────────────
   Latte           2,400,000      2026-05-01 ██████ 850k
   Cappuccino      2,100,000      2026-05-02 ████   600k
   Espresso        1,400,000      2026-05-03 ████████ 1.2M
   Matcha            900,000      2026-05-04 ███    480k
   Tea               500,000      2026-05-05 ██████ 880k
\`\`\``,
        code: `# ☕ Cafe Revenue Analysis (mock data inline so Pyodide can run it)
import pandas as pd

data = {
    "order_id": range(1001, 1011),
    "date": pd.to_datetime([
        "2026-05-01","2026-05-01","2026-05-02","2026-05-02","2026-05-03",
        "2026-05-03","2026-05-03","2026-05-04","2026-05-05","2026-05-05",
    ]),
    "item":  ["Latte","Cappuccino","Latte","Espresso","Matcha",
              "Latte","Cappuccino","Tea","Latte","Espresso"],
    "qty":   [2, 1, 1, 3, 2, 2, 1, 4, 3, 2],
    "price": [50000, 45000, 50000, 35000, 55000, 50000, 45000, 25000, 50000, 35000],
}
df = pd.DataFrame(data)
df["revenue"] = df["qty"] * df["price"]

print("Top 3 by revenue:")
print(df.groupby("item")["revenue"].sum().sort_values(ascending=False).head(3))

print("\\nRevenue per day:")
print(df.groupby(df["date"].dt.date)["revenue"].sum())`,
        codeLanguage: "python",
        exercise:
          "Mở rộng: (1) thêm cột \`hour\` (random 7-21) và tìm khung giờ doanh thu cao nhất, (2) tính tỉ trọng % doanh thu mỗi món so với tổng, (3) vẽ biểu đồ cột bằng \`df.plot(kind='bar')\`.",
        exerciseEn:
          "Stretch: (1) add an \`hour\` column (random 7-21) and find the peak revenue hour, (2) compute each item's % share of total revenue, (3) plot a bar chart with \`df.plot(kind='bar')\`.",
        quiz: [
          {
            question: "Vì sao cần \`parse_dates=[\"date\"]\` khi đọc CSV?",
            options: [
              "Để pandas hiểu cột là datetime, dùng được \`.dt.date\`, \`.dt.hour\`...",
              "Để file CSV nhỏ hơn",
              "Để CSV có thêm cột mới",
              "Không cần thiết",
            ],
            answer: 0,
            explanation:
              "Mặc định pandas đọc ngày dưới dạng string. \`parse_dates\` ép kiểu datetime để dùng accessor \`.dt\`.",
          },
          {
            question: "\`df.groupby(\"item\")[\"revenue\"].sum()\` trả về gì?",
            options: [
              "Một DataFrame 2 cột",
              "Một Series có index là item, giá trị là tổng revenue",
              "Một số duy nhất",
              "Một dict",
            ],
            answer: 1,
            explanation:
              "Groupby + agg trên 1 cột số luôn trả về Series với index là nhóm.",
          },
          {
            question: "Để xem 5 dòng đầu sau khi load CSV?",
            options: ["df.first(5)", "df.head()", "df.peek()", "df[:5:1]"],
            answer: 1,
            explanation:
              "\`df.head()\` mặc định trả 5 dòng đầu - kỹ năng phải nhớ.",
          },
        ],
      },
      // -------- Project 2: Student Tracker --------
      {
        id: "rwp-2",
        title: "Dự án 2: Bảng theo dõi điểm học sinh + cảnh báo sớm",
        titleEn: "Project 2: Student Score Tracker + Early Warning",
        level: 3,
        difficulty: "intermediate",
        theory: `## 🎓 Brief

Thầy Hải có file điểm 30 học sinh × 6 môn. Cần:

1. Tính **GPA** mỗi em (thang 10).
2. Cảnh báo em nào điểm trung bình **< 5.0** (đỏ) hoặc **< 6.5** (vàng).
3. Tìm môn nào cả lớp yếu nhất → ưu tiên ôn tập.

## 🧠 Concept: Tô màu có điều kiện (conditional formatting)

\`\`\`
   GPA       Nhãn     Hành động
   ──────    ──────   ─────────────────────────
   < 5.0     🔴 Red    Gọi phụ huynh, kèm 1-1
   5.0-6.4   🟡 Yellow Nhắc nhở, theo dõi
   6.5-8.4   🟢 Green  Ổn định
   ≥ 8.5     🌟 Gold   Khuyến khích nâng cao
\`\`\`

## 💡 Pandas Styler API

\`\`\`python
   def color_gpa(v):
       if v < 5: return "background:#fecaca"
       if v < 6.5: return "background:#fef3c7"
       return "background:#bbf7d0"

   df.style.applymap(color_gpa, subset=["gpa"])
\`\`\`

## 📤 Xuất Excel cho phụ huynh

\`\`\`python
   df.to_excel("class_report.xlsx", index=False, engine="openpyxl")
\`\`\``,
        theoryEn: `## 🎓 Brief

Teacher Hai has a grade file: 30 students × 6 subjects. Goals:

1. Compute each student's **GPA** (0-10 scale).
2. Flag students with mean **< 5.0** (red) or **< 6.5** (yellow).
3. Find the subject the whole class is weakest at → prioritize review.

## 🧠 Concept: Conditional formatting

\`\`\`
   GPA       Label     Action
   ──────    ──────    ─────────────────────────
   < 5.0     🔴 Red    Call parents, 1-on-1 tutoring
   5.0-6.4   🟡 Yellow Warn, monitor
   6.5-8.4   🟢 Green  Stable
   ≥ 8.5     🌟 Gold   Encourage to advance
\`\`\`

## 💡 Pandas Styler API

\`\`\`python
   def color_gpa(v):
       if v < 5: return "background:#fecaca"
       if v < 6.5: return "background:#fef3c7"
       return "background:#bbf7d0"

   df.style.applymap(color_gpa, subset=["gpa"])
\`\`\`

## 📤 Export Excel for parents

\`\`\`python
   df.to_excel("class_report.xlsx", index=False, engine="openpyxl")
\`\`\``,
        code: `# 🎓 Student Score Tracker + early-warning
import pandas as pd

scores = pd.DataFrame({
    "name":    ["An","Bình","Cường","Dung","Em","Phương"],
    "math":    [4.5, 7.8, 5.2, 9.0, 3.5, 8.2],
    "english": [6.0, 8.5, 4.8, 9.2, 5.0, 7.0],
    "science": [5.5, 7.0, 5.0, 8.5, 4.2, 9.0],
})
scores["gpa"] = scores[["math","english","science"]].mean(axis=1).round(2)

def label(g):
    if g < 5:   return "🔴 Risk"
    if g < 6.5: return "🟡 Warn"
    if g < 8.5: return "🟢 OK"
    return "🌟 Top"

scores["status"] = scores["gpa"].apply(label)
print(scores)

print("\\nWeakest subject (class mean):")
print(scores[["math","english","science"]].mean().sort_values().head(1))`,
        codeLanguage: "python",
        exercise:
          "Mở rộng: (1) thêm cột \`trend\` so sánh GPA học kỳ này với học kỳ trước (giả lập), (2) lọc ra danh sách \"Risk\" và in lời nhắn động viên, (3) xuất ra Excel với conditional formatting.",
        exerciseEn:
          "Stretch: (1) add a \`trend\` column comparing this term's GPA with the previous one (mocked), (2) filter \"Risk\" students and print encouraging messages, (3) export to Excel with conditional formatting.",
        quiz: [
          {
            question: "\`df.mean(axis=1)\` tính trung bình theo trục nào?",
            options: [
              "Theo cột (mỗi cột 1 trung bình)",
              "Theo hàng (mỗi hàng 1 trung bình)",
              "Cả 2 - trả về 1 số duy nhất",
              "Không có axis=1 cho mean",
            ],
            answer: 1,
            explanation:
              "axis=0 là theo cột (chiều dọc), axis=1 là theo hàng (chiều ngang) - dùng tính GPA mỗi học sinh.",
          },
          {
            question: "Vì sao dùng \`apply\` thay vì for-loop khi đặt nhãn 🔴🟡🟢?",
            options: [
              "\`apply\` chạy vectorized và ngắn gọn hơn for-loop",
              "for-loop không hoạt động trong pandas",
              "\`apply\` không cần import pandas",
              "Không có khác biệt",
            ],
            answer: 0,
            explanation:
              "\`apply\` được tối ưu và đọc Pythonic hơn; for-loop hợp khi cần debug từng dòng.",
          },
          {
            question: "Engine nào pandas dùng để ghi file Excel \`.xlsx\`?",
            options: ["xlrd", "openpyxl", "csv", "pyarrow"],
            answer: 1,
            explanation:
              "\`openpyxl\` là engine khuyến nghị cho file .xlsx hiện đại.",
          },
        ],
      },
      // -------- Project 3: Spotify --------
      {
        id: "rwp-3",
        title: "Dự án 3: Dashboard Spotify cá nhân từ JSON history",
        titleEn: "Project 3: Personal Spotify Dashboard from JSON History",
        level: 4,
        difficulty: "advanced",
        theory: `## 🎵 Brief

Spotify cho phép tải lịch sử nghe (Settings → Privacy → Request data). Bạn nhận file \`StreamingHistory.json\` chứa hàng nghìn dòng:

\`\`\`json
   [
     {"endTime":"2026-05-01 08:14", "artistName":"Sơn Tùng", "trackName":"Chúng Ta Của Hiện Tại", "msPlayed":215000},
     {"endTime":"2026-05-01 08:18", "artistName":"BTS",      "trackName":"Spring Day",              "msPlayed":260000},
     ...
   ]
\`\`\`

## 🎯 Goals

1. Top 10 nghệ sĩ theo **tổng giờ nghe**.
2. Khung giờ "vàng" nghe nhạc trong ngày.
3. Heatmap **ngày × giờ** (tuần × giờ trong ngày).

## 🧰 Stack

\`\`\`
   json  →  pandas  →  matplotlib / seaborn (heatmap)
\`\`\`

## 💡 Trick xử lý thời gian

\`\`\`python
   df["endTime"] = pd.to_datetime(df["endTime"])
   df["hour"]    = df["endTime"].dt.hour          # 0-23
   df["weekday"] = df["endTime"].dt.day_name()    # Monday..Sunday
   df["hours"]   = df["msPlayed"] / 3_600_000     # ms → hours
\`\`\`

## 🔥 Heatmap ý tưởng

\`\`\`
              0  3  6  9  12 15 18 21
   Mon       ░░ ░░ ▒▒ ██ ██ ▒▒ ██ ▓▓
   Tue       ░░ ░░ ▒▒ ██ ▓▓ ▒▒ ██ ██
   ...
\`\`\`
Càng đậm = càng nghe nhiều giờ đó.`,
        theoryEn: `## 🎵 Brief

Spotify lets you download your listening history (Settings → Privacy → Request data). You get \`StreamingHistory.json\` with thousands of rows:

\`\`\`json
   [
     {"endTime":"2026-05-01 08:14", "artistName":"Sơn Tùng", "trackName":"Chúng Ta Của Hiện Tại", "msPlayed":215000},
     {"endTime":"2026-05-01 08:18", "artistName":"BTS",      "trackName":"Spring Day",              "msPlayed":260000},
     ...
   ]
\`\`\`

## 🎯 Goals

1. Top 10 artists by **total hours**.
2. Your "golden hour" listening time.
3. Heatmap of **weekday × hour**.

## 🧰 Stack

\`\`\`
   json  →  pandas  →  matplotlib / seaborn (heatmap)
\`\`\`

## 💡 Time-handling trick

\`\`\`python
   df["endTime"] = pd.to_datetime(df["endTime"])
   df["hour"]    = df["endTime"].dt.hour          # 0-23
   df["weekday"] = df["endTime"].dt.day_name()    # Monday..Sunday
   df["hours"]   = df["msPlayed"] / 3_600_000     # ms → hours
\`\`\`

## 🔥 Heatmap idea

\`\`\`
              0  3  6  9  12 15 18 21
   Mon       ░░ ░░ ▒▒ ██ ██ ▒▒ ██ ▓▓
   Tue       ░░ ░░ ▒▒ ██ ▓▓ ▒▒ ██ ██
   ...
\`\`\`
Darker = more hours listened in that slot.`,
        code: `# 🎵 Mini Spotify dashboard (mock JSON inline)
import pandas as pd

history = [
    {"endTime":"2026-05-01 08:14","artistName":"Son Tung","msPlayed":215000},
    {"endTime":"2026-05-01 18:42","artistName":"BTS","msPlayed":260000},
    {"endTime":"2026-05-02 09:05","artistName":"Son Tung","msPlayed":190000},
    {"endTime":"2026-05-02 22:30","artistName":"Adele","msPlayed":320000},
    {"endTime":"2026-05-03 07:50","artistName":"BTS","msPlayed":240000},
    {"endTime":"2026-05-03 19:20","artistName":"Son Tung","msPlayed":280000},
]

df = pd.DataFrame(history)
df["endTime"] = pd.to_datetime(df["endTime"])
df["hour"]    = df["endTime"].dt.hour
df["weekday"] = df["endTime"].dt.day_name()
df["hours"]   = df["msPlayed"] / 3_600_000

print("Top artists by hours:")
print(df.groupby("artistName")["hours"].sum().sort_values(ascending=False))

print("\\nListening by hour-of-day:")
print(df.groupby("hour")["hours"].sum().sort_values(ascending=False).head(3))`,
        codeLanguage: "python",
        exercise:
          "Mở rộng: (1) đọc file JSON thật bằng \`pd.read_json\`, (2) tạo pivot table weekday × hour với \`df.pivot_table(values=\"hours\", index=\"weekday\", columns=\"hour\", aggfunc=\"sum\", fill_value=0)\`, (3) lưu pivot ra CSV.",
        exerciseEn:
          "Stretch: (1) load a real JSON with \`pd.read_json\`, (2) build a weekday × hour pivot using \`df.pivot_table(values=\"hours\", index=\"weekday\", columns=\"hour\", aggfunc=\"sum\", fill_value=0)\`, (3) save the pivot to CSV.",
        quiz: [
          {
            question: "\`df[\"endTime\"].dt.day_name()\` trả về?",
            options: [
              "Số nguyên 0-6",
              "Tên thứ trong tuần dạng string (Monday, Tuesday…)",
              "Ngày dạng YYYY-MM-DD",
              "TimeDelta",
            ],
            answer: 1,
            explanation:
              "\`.dt.day_name()\` trả về tên thứ trong tuần dạng chuỗi - tiện làm pivot/heatmap.",
          },
          {
            question: "Để vẽ heatmap nhanh nhất từ DataFrame, thư viện nào tiện?",
            options: ["matplotlib", "seaborn", "tkinter", "requests"],
            answer: 1,
            explanation:
              "\`seaborn.heatmap(df_pivot, cmap=\"YlOrRd\")\` chỉ cần 1 dòng cho heatmap có annotation đẹp.",
          },
          {
            question: "Đổi mili-giây sang giờ thì chia cho?",
            options: ["3 600", "60 000", "3 600 000", "86 400 000"],
            answer: 2,
            explanation:
              "1 giờ = 60 phút × 60 giây × 1000 ms = 3 600 000 ms.",
          },
        ],
      },
    ],
  },
];

// Software Engineering - Beginner Primer (3 ultra-beginner lessons)
// Author: HaiEduTech · Đặt ở đầu module Software Engineering để người mới có nền tảng dễ hiểu
import type { ExtendedProgrammingLesson } from "./types";

export const softwareEngBeginnerPrimer: ExtendedProgrammingLesson[] = [
  {
    id: "se-primer-what-is-se",
    title: "Lập trình phần mềm là gì? (Bài cho người mới)",
    titleEn: "What is Software Engineering? (Beginner)",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "markdown",
    theory: `## 1. 🧠 Hình dung đơn giản

Hãy tưởng tượng bạn **viết công thức nấu phở** cho 1 chiếc máy. Máy đọc từng dòng và làm theo. Đó chính là **lập trình**. Còn **kỹ sư phần mềm** là người không chỉ viết công thức, mà còn:

- Hỏi: "Khách muốn phở bò hay phở gà?" (yêu cầu)
- Vẽ: "Bếp đặt đâu, nước dùng nấu trước hay thịt thái trước?" (thiết kế)
- Nấu thử & nếm (test)
- Mở quán & duy trì chất lượng (deploy + maintain)

> 💡 Lập trình = viết code. Kỹ sư phần mềm = giải bài toán bằng code + quy trình + cộng tác.

## 2. 🧱 3 khối kiến thức cốt lõi

| Khối | Bạn cần biết gì? | Ví dụ đời thường |
|---|---|---|
| **Code** | Biến, hàm, điều kiện, vòng lặp | Công thức nấu ăn |
| **Công cụ** | Git, Terminal, VS Code, GitHub | Bộ dụng cụ của thợ |
| **Quy trình** | SDLC, code review, testing | Quy trình bếp nhà hàng |

## 3. 🗺️ Lộ trình 6 tháng cho người mới

1. **Tháng 1-2:** Học 1 ngôn ngữ (Python hoặc JavaScript) - biến, hàm, list, điều kiện.
2. **Tháng 3:** Học Git + GitHub + Terminal cơ bản.
3. **Tháng 4:** Làm 1 project nhỏ (todo app, máy tính, blog tĩnh).
4. **Tháng 5:** Học SDLC, Agile, code review, testing cơ bản.
5. **Tháng 6:** Tham gia open-source hoặc thực tập.

## 4. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "Phải giỏi toán mới làm được lập trình" - sai. Toán chỉ cần thiết cho ML/đồ họa.
> - "Phải thuộc lòng cú pháp" - sai. Google + đọc tài liệu là kỹ năng quan trọng nhất.
> - "Học ngôn ngữ A rồi không thể chuyển ngôn ngữ B" - sai. Tư duy mới là gốc, cú pháp chỉ là vỏ.

## 5. ✅ Best practice cho người mới

> 💡 **Mẹo:**
> - Viết code mỗi ngày 30 phút còn tốt hơn 5 tiếng/tuần.
> - Đọc lỗi (error message) thật chậm - 80% câu trả lời nằm trong dòng đầu tiên.
> - Học bằng cách **xây**, không phải bằng cách **xem** video thụ động.
> - Hỏi AI (ChatGPT/Copilot) "tại sao", không hỏi "viết hộ tôi".
`,
    theoryEn: `## 1. 🧠 Simple analogy

Imagine you write a **pho recipe** for a machine. The machine reads each line and follows it. That is **programming**. A **software engineer** also asks the customer what they want, designs the kitchen, tastes the dish, and runs the restaurant long-term.

> 💡 Programming = writing code. Software engineering = solving problems with code + process + collaboration.

## 2. 🧱 Three core pillars

| Pillar | What to know | Real-life analogy |
|---|---|---|
| **Code** | Variables, functions, conditions, loops | Cooking recipe |
| **Tooling** | Git, Terminal, VS Code, GitHub | A craftsman's toolbox |
| **Process** | SDLC, code review, testing | Restaurant SOP |

## 3. 🗺️ 6-month beginner roadmap

1. Month 1-2: pick Python or JavaScript, master variables, functions, lists, conditions.
2. Month 3: Git + GitHub + basic terminal.
3. Month 4: ship 1 tiny project (todo app, calculator, static blog).
4. Month 5: SDLC, Agile, code review, testing basics.
5. Month 6: contribute to open-source or get an internship.

## 4. ⚠️ Common myths

> ⚠️ Heads up:
> - "You need to be a math genius" - false. Math is only crucial for ML/graphics.
> - "Memorise the syntax" - false. Googling and reading docs matter most.
> - "Switching languages is hard" - false. Mindset transfers; syntax is just a shell.

## 5. ✅ Best practice for beginners

> 💡 Tips:
> - 30 minutes of coding daily beats a 5-hour weekend binge.
> - Read errors slowly; 80 percent of the answer is in the first line.
> - Learn by **building**, not by passively watching videos.
> - Ask AI "why", not "do it for me".
`,
    code: `# Project đầu tiên cho người mới: máy tính tip 4 dòng
# First project for beginners: a 4-line tip calculator

bill = float(input("Hoá đơn (USD): "))
tip_percent = 15
tip = bill * tip_percent / 100
print(f"Tip: {tip:.2f} USD - Tổng: {bill + tip:.2f} USD")
`,
    exercise: "Viết một chương trình Python hỏi tên người dùng và in ra lời chào kèm độ dài tên (ví dụ: 'Xin chào Hải - tên bạn có 3 ký tự').",
    exerciseEn: "Write a Python program that asks for the user's name and prints a greeting with the name length, e.g. 'Hello Hai - your name has 3 characters'.",
    quiz: [
      {
        question: "Sự khác nhau cốt lõi giữa lập trình viên và kỹ sư phần mềm?",
        options: [
          "Kỹ sư phần mềm dùng nhiều ngôn ngữ hơn",
          "Kỹ sư phần mềm thêm quy trình, thiết kế và cộng tác để giải bài toán",
          "Lập trình viên không cần học Git",
          "Không có sự khác biệt"
        ],
        answer: 1,
        explanation: "Kỹ sư phần mềm = code + quy trình + cộng tác để giải bài toán thực tế, không chỉ viết code.",
        questionEn: "What is the core difference between a programmer and a software engineer?",
        optionsEn: [
          "Software engineers use more languages",
          "Software engineers add process, design and collaboration to solve problems",
          "Programmers don't need Git",
          "No difference"
        ],
        explanationEn: "A software engineer combines code with process and collaboration to solve real problems."
      },
      {
        question: "Lời khuyên nào tốt nhất cho người mới học?",
        options: [
          "Học thuộc toàn bộ cú pháp",
          "Xem video 5 tiếng cuối tuần",
          "Viết code 30 phút mỗi ngày và xây project nhỏ",
          "Bỏ qua error message"
        ],
        answer: 2,
        explanation: "Đều đặn mỗi ngày + thực hành xây project là cách hiệu quả nhất.",
        questionEn: "Best advice for a beginner?",
        optionsEn: [
          "Memorise all syntax",
          "Watch 5h of video on weekends",
          "Code 30 minutes daily and build small projects",
          "Ignore error messages"
        ],
        explanationEn: "Daily practice plus shipping small projects works best."
      },
      {
        question: "Khi gặp lỗi (error) bạn nên làm gì đầu tiên?",
        options: [
          "Xoá toàn bộ code và viết lại",
          "Đọc kỹ dòng đầu của error message",
          "Hỏi AI viết hộ ngay",
          "Restart máy tính"
        ],
        answer: 1,
        explanation: "Dòng đầu của error message thường chỉ ra chính xác vấn đề.",
        questionEn: "What should you do first when you hit an error?",
        optionsEn: [
          "Delete all code and rewrite",
          "Read the first line of the error carefully",
          "Ask AI to fix it for you",
          "Restart the computer"
        ],
        explanationEn: "The first line of an error usually pinpoints the issue."
      }
    ]
  },
  {
    id: "se-primer-thinking-like-engineer",
    title: "Tư duy như kỹ sư: chia nhỏ bài toán",
    titleEn: "Think Like an Engineer: Decompose Problems",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "python",
    theory: `## 1. 🧩 Vấn đề lớn = nhiều vấn đề nhỏ

Khi sếp nói: "Xây app đặt vé xem phim", người mới thường **bắt đầu code ngay** và rối. Kỹ sư giỏi sẽ **chia nhỏ**:

\`\`\`text
App đặt vé
├── Người dùng: đăng ký / đăng nhập
├── Phim: danh sách / chi tiết / lịch chiếu
├── Đặt vé: chọn ghế / thanh toán / vé điện tử
└── Sau bán: lịch sử / huỷ vé / khuyến mãi
\`\`\`

Sau khi chia, mỗi nhánh lại chia tiếp đến khi 1 nhiệm vụ làm xong trong **1-2 giờ**.

## 2. 🪜 4 bước giải mọi bài toán code

1. **Hiểu**: Viết lại đề bằng lời của bạn. Input là gì? Output là gì?
2. **Ví dụ**: Tự nghĩ 2-3 ví dụ + edge case (rỗng, 1 phần tử, âm).
3. **Pseudo-code**: Viết các bước bằng tiếng Việt trước khi code.
4. **Code & test**: Viết code, chạy với ví dụ đã nghĩ.

## 3. 🎯 Ví dụ: "Tìm số lớn nhất trong list"

- Input: \`[3, 7, 2, 9, 4]\` → Output: \`9\`
- Edge case: list rỗng? list 1 phần tử? số âm?
- Pseudo: gán biến \`max = phần tử đầu\`. Duyệt từng phần tử, nếu lớn hơn \`max\` → cập nhật.
- Code:

\`\`\`python
def find_max(nums):
    if not nums:
        return None
    biggest = nums[0]
    for n in nums[1:]:
        if n > biggest:
            biggest = n
    return biggest
\`\`\`

## 4. ⚠️ Bẫy phổ biến

> ⚠️ Cảnh báo:
> - Code trước khi hiểu đề → viết lại 5 lần.
> - Không nghĩ edge case → bug khi production.
> - Tối ưu sớm → code khó đọc mà không nhanh hơn.

## 5. ✅ Best practice

> 💡 Mẹo:
> - Nói thành tiếng (rubber duck): giải thích cho 1 chú vịt nhựa, bạn sẽ tự thấy chỗ sai.
> - Mỗi hàm chỉ làm **1 việc** và đặt tên rõ (\`find_max\`, không phải \`do_stuff\`).
> - Khi rối: in (print) giá trị từng bước - debug nhanh nhất với người mới.
`,
    theoryEn: `## 1. 🧩 A big problem = many small ones

When a boss says "build a movie booking app", beginners panic-code. Good engineers **decompose**:

\`\`\`text
Booking app
├── Users: signup / login
├── Movies: list / detail / showtimes
├── Booking: pick seats / pay / e-ticket
└── Post-sale: history / cancel / promo
\`\`\`

Keep splitting until each task can be finished in 1-2 hours.

## 2. 🪜 Four steps for any coding problem

1. Understand: rewrite the prompt in your own words. What's input? What's output?
2. Examples: invent 2-3 cases plus edge cases (empty, one item, negatives).
3. Pseudocode: write the steps in plain English before coding.
4. Code & test: run against your examples.

## 3. 🎯 Example: "Find the max in a list"

- Input \`[3,7,2,9,4]\` → output \`9\`. Edge cases: empty, single item, negatives.
- Pseudo: set \`max\` to first element, iterate; update when larger.

## 4. ⚠️ Common traps

> ⚠️ Coding before understanding = rewriting 5 times. Skipping edge cases = production bugs. Premature optimisation = unreadable code.

## 5. ✅ Best practice

> 💡 Rubber-duck explain out loud. One function = one job. When stuck, print intermediate values to debug fast.
`,
    code: `def find_max(nums):
    """Trả về phần tử lớn nhất trong list, hoặc None nếu rỗng."""
    if not nums:
        return None
    biggest = nums[0]
    for n in nums[1:]:
        if n > biggest:
            biggest = n
    return biggest

print(find_max([3, 7, 2, 9, 4]))  # 9
print(find_max([]))                # None
print(find_max([-5, -1, -8]))      # -1
`,
    exercise: "Áp dụng 4 bước (Hiểu → Ví dụ → Pseudo → Code) để viết hàm `count_vowels(text)` đếm số nguyên âm trong chuỗi tiếng Anh.",
    exerciseEn: "Use the 4-step method to write `count_vowels(text)` that counts English vowels in a string.",
    quiz: [
      {
        question: "Bước đầu tiên đúng khi nhận một bài toán mới?",
        options: ["Mở IDE và code ngay", "Viết lại đề bằng lời của mình + xác định input/output", "Đi hỏi sếp", "Tìm thư viện làm sẵn"],
        answer: 1,
        explanation: "Hiểu đề trước khi code giúp tránh viết lại nhiều lần.",
        questionEn: "First correct step on a new problem?",
        optionsEn: ["Open IDE and code", "Restate the problem and identify input/output", "Ask the boss", "Find a ready library"],
        explanationEn: "Understanding first prevents rework."
      },
      {
        question: "Edge case nào nên test khi viết hàm tìm số lớn nhất trong list?",
        options: ["List rỗng và list 1 phần tử", "Chỉ list nhiều phần tử", "Chỉ số dương", "Không cần test"],
        answer: 0,
        explanation: "Rỗng và 1 phần tử là edge case kinh điển dễ gây bug.",
        questionEn: "Which edge cases matter for find_max?",
        optionsEn: ["Empty list and single-item list", "Only multi-item lists", "Only positives", "No tests needed"],
        explanationEn: "Empty and single-item lists are classic edge cases."
      },
      {
        question: "Kỹ thuật 'rubber duck debugging' là gì?",
        options: ["Đặt vịt nhựa cạnh máy để may mắn", "Giải thích to thành tiếng vấn đề cho 1 vật/đồng nghiệp để tự nhận ra lỗi", "Tắt máy 5 phút", "Đánh máy nhanh hơn"],
        answer: 1,
        explanation: "Khi giải thích thành tiếng, não tự sắp xếp lại logic và lộ ra chỗ sai.",
        questionEn: "What is rubber duck debugging?",
        optionsEn: ["A toy for luck", "Explaining the problem aloud to an object/colleague until you spot the bug", "Turning off the PC", "Typing faster"],
        explanationEn: "Verbalising the logic reveals flaws automatically."
      }
    ]
  },
  {
    id: "se-primer-toolkit",
    title: "Bộ dụng cụ tối thiểu của 1 dev (2026)",
    titleEn: "The Minimum Dev Toolkit (2026)",
    level: 1,
    difficulty: "beginner",
    codeLanguage: "bash",
    theory: `## 1. 🛠️ 5 công cụ bắt buộc

| Công cụ | Vai trò | Thay thế |
|---|---|---|
| **VS Code** | Trình soạn thảo code | Cursor, Zed |
| **Terminal** | Gõ lệnh điều khiển máy | iTerm2, Warp |
| **Git + GitHub** | Lưu lịch sử & cộng tác | GitLab, Bitbucket |
| **Trình duyệt + DevTools** | Debug web | Chrome/Firefox |
| **AI Copilot** | Gợi ý code, giải thích | GitHub Copilot, Cursor |

## 2. ⌨️ 10 lệnh terminal phải thuộc

\`\`\`bash
pwd                # đang ở đâu
ls                 # liệt kê file
cd ten_thu_muc     # đi vào thư mục
cd ..              # lùi 1 cấp
mkdir my_app       # tạo thư mục
touch index.html   # tạo file rỗng
rm file.txt        # xoá file (cẩn thận)
cp a.txt b.txt     # copy
mv a.txt new.txt   # đổi tên / di chuyển
cat file.txt       # xem nội dung
\`\`\`

## 3. 🔁 Git 5 lệnh sống còn

\`\`\`bash
git init                       # tạo repo
git add .                      # đưa thay đổi vào "giỏ"
git commit -m "feat: add ..."  # chốt lại
git push                       # đẩy lên GitHub
git pull                       # kéo về máy
\`\`\`

> 💡 **Quy tắc commit message:** \`type: mô tả ngắn\`. Type phổ biến: \`feat\` (tính năng), \`fix\` (sửa lỗi), \`docs\` (tài liệu), \`refactor\` (sửa cấu trúc).

## 4. 🤖 Cách dùng AI Copilot đúng

> ⚠️ Cảnh báo:
> - Đừng copy-paste mù. Hỏi: "Hàm này làm gì?" và đọc giải thích.
> - Tạo prompt rõ: **bối cảnh + đầu vào + đầu ra mong đợi + ràng buộc**.
> - Luôn test code AI sinh ra với edge case.

## 5. ✅ Best practice

> 💡 Mẹo:
> - Commit nhỏ & thường xuyên (mỗi 30-60 phút).
> - Đặt tên branch dạng \`feature/login\`, \`fix/header-crash\`.
> - Mỗi project luôn có file \`README.md\` mô tả: cách chạy, dependencies, contact.
> - Backup = push lên GitHub. Máy hỏng vẫn còn code.
`,
    theoryEn: `## 1. 🛠️ Five must-have tools

VS Code, Terminal, Git + GitHub, Browser DevTools, AI Copilot.

## 2. ⌨️ Ten terminal commands

\`pwd ls cd mkdir touch rm cp mv cat\` plus \`cd ..\`.

## 3. 🔁 Five Git commands

\`init add commit push pull\`. Use commit prefixes: \`feat\`, \`fix\`, \`docs\`, \`refactor\`.

## 4. 🤖 Using AI Copilot well

Never paste blindly. Write clear prompts: context + input + desired output + constraints. Always test AI output with edge cases.

## 5. ✅ Best practice

Small commits every 30-60 minutes, branch names like \`feature/login\`, every project ships a \`README.md\`, push to GitHub as backup.
`,
    code: `# Workflow chuẩn cho một thay đổi nhỏ
git checkout -b feature/add-login
# ...sửa code...
git add .
git commit -m "feat: add login form with email + password"
git push -u origin feature/add-login
# Mở Pull Request trên GitHub → đợi review → merge
`,
    exercise: "Tạo 1 repo GitHub trống, clone về máy, thêm file `README.md` giới thiệu bản thân, commit và push lên.",
    exerciseEn: "Create an empty GitHub repo, clone it, add a `README.md` introducing yourself, commit and push.",
    quiz: [
      {
        question: "Lệnh nào hiển thị thư mục hiện tại trong terminal?",
        options: ["ls", "pwd", "cd", "cat"],
        answer: 1,
        explanation: "`pwd` = print working directory.",
        questionEn: "Which command prints the current directory?",
        optionsEn: ["ls", "pwd", "cd", "cat"],
        explanationEn: "`pwd` stands for print working directory."
      },
      {
        question: "Thứ tự đúng để đưa code lên GitHub?",
        options: [
          "push → commit → add",
          "add → commit → push",
          "commit → add → push",
          "pull → push → add"
        ],
        answer: 1,
        explanation: "Phải `add` để chọn file, `commit` để chốt, rồi `push` để đẩy lên.",
        questionEn: "Correct order to push code?",
        optionsEn: ["push→commit→add", "add→commit→push", "commit→add→push", "pull→push→add"],
        explanationEn: "Stage with add, snapshot with commit, then push."
      },
      {
        question: "Cách dùng AI Copilot tốt nhất?",
        options: [
          "Copy code AI vào và chạy thẳng production",
          "Yêu cầu AI 'viết hộ tôi toàn bộ app'",
          "Viết prompt rõ ràng, đọc giải thích, test edge case",
          "Tin tuyệt đối vì AI luôn đúng"
        ],
        answer: 2,
        explanation: "AI hữu ích khi bạn hiểu output và kiểm chứng nó.",
        questionEn: "Best way to use AI Copilot?",
        optionsEn: ["Paste straight to prod", "Ask it to write the whole app", "Clear prompts, read explanation, test edge cases", "Trust blindly"],
        explanationEn: "AI helps when you understand and verify the output."
      }
    ]
  }
];

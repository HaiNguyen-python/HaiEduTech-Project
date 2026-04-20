import { expandedModules } from "./curriculum";
import type { ExtendedProgrammingModule } from "./curriculum/types";

export interface ProgrammingModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  course: "kids" | "data-ai" | "python" | "sql" | "data-eng" | "ml" | "cloud" | "dl" | "rl";
  lessons: ProgrammingLesson[];
}

export interface ProgrammingLesson {
  id: string;
  title: string;
  titleEn: string;
  theory: string;
  theoryEn: string;
  code: string;
  codeLanguage: string;
  exercise: string;
  exerciseEn: string;
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
  level?: 1 | 2 | 3 | 4 | 5;
  difficulty?: "beginner" | "intermediate" | "advanced";
  testCases?: { input: string; expectedOutput: string; description: string }[];
  solutionExplanation?: string;
}

export type { ExtendedProgrammingModule };

// ============ KIDS TECH FOUNDATIONS ============

export const programmingModules: ProgrammingModule[] = [
  {
    id: "prog-scratch",
    title: "Scratch & Algorithmic Thinking",
    titleEn: "Scratch & Algorithmic Thinking",
    icon: "🧩",
    color: "from-orange-500/20 to-yellow-500/20",
    description: "Learn drag-and-drop programming and logical thinking through creative games",
    descriptionEn: "Learn drag-and-drop coding and logical thinking through creative games",
    course: "kids",
    lessons: [
      {
        id: "scratch-1",
        title: "Introducing Scratch & basic command blocks",
        titleEn: "Introduction to Scratch & Basic Blocks",
        theory: "Scratch là ngôn ngữ lập trình trực quan do MIT phát triển. Thay vì viết code, bạn kéo thả các khối lệnh (blocks) để tạo chương trình — giống như ghép LEGO vậy! 🧱\n\n**Tại sao học Scratch?**\nHãy tưởng tượng bạn là đạo diễn phim hoạt hình. Scratch cho phép bạn điều khiển nhân vật, tạo hiệu ứng, và xây dựng trò chơi mà không cần nhớ cú pháp phức tạp.\n\n**Các loại khối lệnh chính:**\n- 🟡 **Sự kiện (Events):** Giống nút 'Play' — bắt đầu mọi thứ. Ví dụ: 'Khi bấm cờ xanh' = khi phim bắt đầu chiếu.\n- 🔵 **Chuyển động (Motion):** Điều khiển nhân vật di chuyển. Ví dụ: 'Di chuyển 10 bước' = nhân vật bước 10 pixel. Hãy thử: nếu bạn đi 10 bước rồi xoay 90° và lặp lại 4 lần → bạn vẽ được hình vuông! 🟦\n- 🟣 **Ngoại hình (Looks):** Thay đổi diện mạo nhân vật. 'Nói Hello trong 2 giây' sẽ hiện bong bóng chat 💬 trên đầu nhân vật.\n- 🟢 **Âm thanh (Sound):** Phát nhạc, ghi âm. Ví dụ: mỗi lần nhân vật nhảy, phát tiếng 'boing!'.\n\n**Ví dụ thực tế:** Game 'Bắt bướm' 🦋\n1. Sự kiện: Khi bấm cờ xanh → bắt đầu game\n2. Chuyển động: Con bướm bay ngẫu nhiên trên màn hình\n3. Ngoại hình: Khi bắt được → bướm biến mất ✨\n4. Âm thanh: Phát tiếng 'ding!' khi ghi điểm",
        theoryEn: "Scratch is a visual programming language developed by MIT. Instead of writing code, you drag and drop blocks to create programs — like building with LEGO! 🧱\n\n**Why learn Scratch?**\nImagine you're a movie director. Scratch lets you control characters, create effects, and build games without memorizing complex syntax.\n\n**Main block categories:**\n- 🟡 **Events:** Like a 'Play' button — starts everything. Example: 'When green flag clicked' = when the movie starts playing.\n- 🔵 **Motion:** Control character movement. Example: 'Move 10 steps' = character walks 10 pixels. Try this: move 10 steps, turn 90°, repeat 4 times → you draw a square! 🟦\n- 🟣 **Looks:** Change character appearance. 'Say Hello for 2 seconds' shows a speech bubble 💬 above the character.\n- 🟢 **Sound:** Play music, record sounds. Example: each time the character jumps, play 'boing!'.\n\n**Real example:** Butterfly Catcher Game 🦋\n1. Events: When green flag clicked → start game\n2. Motion: Butterfly flies randomly on screen\n3. Looks: When caught → butterfly disappears ✨\n4. Sound: Play 'ding!' when scoring",
        code: `# Mô phỏng logic Scratch bằng Python
# When pressing the green flag → Move 10 steps → Say "Hello!"

sprite_x = 0
sprite_y = 0

# Move 10 steps to the right
sprite_x += 10
print(f"Location: ({sprite_x}, {sprite_y})")

# Sprite said
print("💬 Hello! I'm Scratch Cat!")

# Repeat 4 times: move + rotate (draw a square)
for i in range(4):
    sprite_x += 50
    print(f"Step {i+1}: move to ({sprite_x}, {sprite_y})")
    print(f"↪ Rotate 90 degrees")`,
        codeLanguage: "python",
        exercise: "Open Scratch (scratch.mit.edu) and create a program: When pressing the green flag, the character moves 100 steps, then says 'Hello World!' in 2 seconds.",
        exerciseEn: "Open Scratch (scratch.mit.edu) and create a program: When the green flag is clicked, the sprite moves 100 steps, then says 'Hello World!' for 2 seconds.",
        quiz: [
          { question: "Which organization developed Scratch?", options: ["Google", "MIT", "Microsoft", "Apple"], answer: 1, explanation: "Scratch was developed by the Lifelong Kindergarten group at MIT Media Lab." },
          { question: "What type of block is 'When green flag clicked'?", options: ["Motion", "Events", "Looks", "Sound"], answer: 1, explanation: "The 'When green flag clicked' block is an Event block, marking the program's starting point." },
          { question: "Which block category should be used for a character to speak a sentence?", options: ["Motion", "Sound", "Looks", "Events"], answer: 2, explanation: "The 'Say...' and 'Think...' blocks belong to the Looks category." },
          { question: "What are the dimensions (in pixels) of the Stage in Scratch?", options: ["320×240", "480×360", "640×480", "800×600"], answer: 1, explanation: "The Scratch Stage has a fixed size of 480x360 pixels, with the origin (0,0) at its center." },
          { question: "In Scratch, which block would you use for a character to move continuously?", options: ["Repeat 1 time", "Forever + Move", "Only use Motion blocks", "Use Sound blocks"], answer: 1, explanation: "To make a character move continuously, you need to place the Move block inside a Forever loop block." },
        ],
      },
      {
        id: "scratch-2",
        title: "Loops and conditions in Scratch",
        titleEn: "Loops and Conditions in Scratch",
        theory: "**Vòng lặp** giúp thực hiện một hành động nhiều lần mà không cần viết lại code. Hãy tưởng tượng bạn phải viết 'Di chuyển 10 bước, Xoay 90°' tổng cộng 100 lần — mệt lắm phải không? Vòng lặp giải quyết chuyện này! 🔄\n\n**Ví dụ đời thực:**\n- ⏰ Đồng hồ: Kim giây **lặp mãi mãi** (chạy → tick → chạy → tick...)\n- 🏃 Chạy bộ: Lặp lại 10 lần (chạy 1 vòng sân)\n- 🎵 Bài hát: Lặp chorus **cho đến khi** hết nhạc\n\n**Các loại vòng lặp trong Scratch:**\n- 🔄 **Lặp lại N lần:** Giống nói 'Làm việc này 5 lần rồi dừng'. Ví dụ: vẽ ngôi sao 5 cánh = lặp 5 lần (vẽ cạnh + xoay 144°) ⭐\n- 🔄 **Lặp mãi mãi:** Giống quả tim đập — không bao giờ dừng cho đến khi bạn tắt chương trình.\n- 🔄 **Lặp cho đến khi:** Giống chờ xe bus — đứng chờ **cho đến khi** xe đến. 🚌\n\n**Câu điều kiện — Ngã rẽ trong cuộc sống:**\n- 🌧️ **Nếu...thì:** 'Nếu trời mưa → mang ô'. Chỉ có 1 nhánh.\n- ☀️🌧️ **Nếu...thì...nếu không:** 'Nếu trời mưa → mang ô, KHÔNG THÌ → đội nón'. Có 2 nhánh.\n\n**Kết hợp cả hai:**\nLặp mãi mãi:\n  Nếu chạm tường → xoay 180° và bật lại\n→ Đây chính là logic của game Pong! 🏓",
        theoryEn: "**Loops** help repeat actions without rewriting code. Imagine writing 'Move 10 steps, Turn 90°' a total of 100 times — exhausting, right? Loops solve this! 🔄\n\n**Real-life examples:**\n- ⏰ Clock: Second hand **loops forever** (move → tick → move → tick...)\n- 🏃 Running: Repeat 10 times (run 1 lap)\n- 🎵 Song: Repeat chorus **until** music ends\n\n**Loop types in Scratch:**\n- 🔄 **Repeat N times:** Like saying 'Do this 5 times then stop'. Example: draw a 5-pointed star = repeat 5 times (draw edge + turn 144°) ⭐\n- 🔄 **Forever:** Like a heartbeat — never stops until you quit the program.\n- 🔄 **Repeat until:** Like waiting for a bus — wait **until** bus arrives. 🚌\n\n**Conditions — Crossroads in life:**\n- 🌧️ **If...then:** 'If raining → bring umbrella'. Only 1 branch.\n- ☀️🌧️ **If...then...else:** 'If raining → umbrella, ELSE → hat'. Has 2 branches.\n\n**Combining both:**\nForever loop:\n  If touching wall → turn 180° and bounce\n→ This is the logic behind Pong! 🏓",
        code: `# Vòng lặp: Vẽ hình đa giác
import turtle

# Draw a hexagon (6 sides)
so_canh = 6
do_dai = 60

for i in range(so_canh):
    turtle.forward(do_dai)  # Đi thẳng
    turtle.right(360 / so_canh)  # Xoay

# Conditional sentence
diem = 85
if diem >= 90:
    print("🌟 Excellent!")
elif diem >= 70:
    print("👍 Good!")
else:
    print("💪 Try harder!")`,
        codeLanguage: "python",
        exercise: "Write a program to check a number from 1-100: if it is divisible by 3, print 'Fizz', if it is divisible by 5, print 'Buzz', if it is divisible by both 3 and 5, print 'FizzBuzz'.",
        exerciseEn: "Write a program to check a number from 1-100: if divisible by 3 print 'Fizz', by 5 print 'Buzz', by both print 'FizzBuzz'.",
        quiz: [
          { question: "What Python command is equivalent to the 'Forever' loop?", options: ["for i in range()", "while True:", "repeat:", "loop:"], answer: 1, explanation: "while True: creates an infinite loop, similar to 'Forever' in Scratch." },
          { question: "Which statement checks a condition in Python?", options: ["for", "while", "if", "def"], answer: 2, explanation: "The if statement is used to check conditions, similar to the 'If...then' block in Scratch." },
          { question: "In Scratch, when does the 'Repeat until' loop stop?", options: ["After 10 times", "When the condition inside becomes TRUE", "When the Space key is pressed", "Never stops"], answer: 1, explanation: "The 'repeat until' loop will stop when its checked condition becomes True." },
          { question: "When is the elif statement used in Python?", options: ["Completely replaces if", "Checks an additional condition after if", "Ends the program", "Creates a loop"], answer: 1, explanation: "elif (else if) is used to check additional conditions when the initial if condition is false, allowing multiple branches." },
          { question: "What will the code: for i in range(3): print(i) print?", options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], answer: 1, explanation: "range(3) creates a sequence 0, 1, 2 (3 elements starting from 0). Python always counts from 0." },
        ],
      },
      {
        id: "scratch-3",
        title: "Variables and lists in Scratch",
        titleEn: "Variables and Lists in Scratch",
        theory: "**Biến (Variable)** là một ô nhớ chứa dữ liệu — hãy tưởng tượng nó như một **chiếc hộp có nhãn dán** 📦. Bạn đặt tên cho hộp (ví dụ: 'điểm_số') và bỏ thứ gì đó vào bên trong (ví dụ: số 0).\n\n**Ví dụ minh họa:**\n```\n📦 điểm_số = 0      → Hộp tên 'điểm_số', bên trong có số 0\n📦 điểm_số = điểm_số + 10  → Mở hộp, lấy 0 ra, cộng 10, bỏ 10 vào lại\n📦 tên = 'Minh'     → Hộp tên 'tên', bên trong có chữ 'Minh'\n```\n\n**Tại sao cần biến?** Giống như bạn chơi game — bạn cần nhớ điểm số, mạng sống, level hiện tại. Biến chính là bộ nhớ của chương trình! 🧠\n\n**Danh sách (List)** là tập hợp nhiều giá trị — giống **dãy tủ locker ở trường** 🗄️. Mỗi tủ có số thứ tự và chứa một vật phẩm.\n```\ntủ_0: ⭐ Sao     (vị trí 0)\ntủ_1: 💎 Kim cương (vị trí 1)\ntủ_2: 🍎 Táo     (vị trí 2)\n```\n\n**Thao tác với danh sách:**\n- 📥 **Thêm** (append): Mở tủ trống tiếp theo, bỏ vật phẩm vào\n- 🗑️ **Xóa** (remove): Lấy vật phẩm ra khỏi tủ\n- 🔍 **Tìm** (index): 'Vật phẩm X ở tủ số mấy?'\n\n**Trò chơi thu thập vật phẩm:**\nBạn đang viết game RPG. Nhân vật có:\n- Biến `mang_song = 3` (3 mạng)\n- Danh sách `tui_do = ['Kiếm', 'Khiên']` (túi đồ)\n- Nhặt đồ mới? → `tui_do.append('Thuốc')` → Túi có 3 vật phẩm!",
        theoryEn: "A **Variable** is a memory cell storing data — think of it as a **labeled box** 📦. You give the box a name (e.g., 'score') and put something inside (e.g., number 0).\n\n**Visual example:**\n```\n📦 score = 0         → Box named 'score', contains 0\n📦 score = score + 10 → Open box, take 0 out, add 10, put 10 back\n📦 name = 'Minh'     → Box named 'name', contains 'Minh'\n```\n\n**Why variables?** Like playing a game — you need to remember score, lives, current level. Variables are your program's memory! 🧠\n\nA **List** is a collection of values — like a **row of school lockers** 🗄️. Each locker has a number and stores an item.\n```\nlocker_0: ⭐ Star      (position 0)\nlocker_1: 💎 Diamond   (position 1)\nlocker_2: 🍎 Apple     (position 2)\n```\n\n**List operations:**\n- 📥 **Add** (append): Open next empty locker, put item in\n- 🗑️ **Remove**: Take item out of locker\n- 🔍 **Find** (index): 'Which locker has item X?'\n\n**Item collection game:**\nYou're writing an RPG. Character has:\n- Variable `lives = 3` (3 lives)\n- List `inventory = ['Sword', 'Shield']`\n- Pick up item? → `inventory.append('Potion')` → Bag now has 3 items!",
        code: `# Biến và danh sách
# Game of collecting points

diem = 0
ten = "Player1"
danh_sach_vat_pham = []

# Collect items
vat_pham_moi = ["⭐ Sao", "💎 Diamonds", "🍎 Apple"]

for vp in vat_pham_moi:
    danh_sach_vat_pham.append(vp)
    diem += 10
    print(f"Picked up: {vp} | Points: {diem}")

print(f"\\n🎒 {ten}'s bag:")
for i, vp in enumerate(danh_sach_vat_pham, 1):
    print(f"  {i}. {vp}")
print(f"🏆 Total score: {diem}")`,
        codeLanguage: "python",
        exercise: "Create a list of 5 favorite animals. Print the quantity, add a new animal, delete the first animal, and reprint the list.",
        exerciseEn: "Create a list of 5 favorite animals. Print the count, add 1 new animal, remove the first one, and print the list again.",
        quiz: [
          { question: "How are variables declared in Python?", options: ["var x = 5", "int x = 5", "x = 5", "let x = 5"], answer: 2, explanation: "Python declares variables simply with variable_name = value, without special keywords." },
          { question: "Which command is used to add an element to the end of a list?", options: [".add()", ".append()", ".insert()", ".push()"], answer: 1, explanation: "list.append(x) adds x to the end of the list." },
          { question: "What value does len([1, 2, 3]) return?", options: ["2", "3", "4", "Error"], answer: 1, explanation: "len() counts the number of elements in a list. The list [1, 2, 3] has 3 elements, so it returns 3." },
          { question: "To delete the element at the second position in a list, what command should be used?", options: ["list.remove(2)", "list.pop(1)", "list.delete(2)", "del list(1)"], answer: 1, explanation: "list.pop(1) removes the element at index 1 (the second position, because indexing starts from 0). list.remove() removes by value." },
          { question: "If variable x = 10, what will x be after running x = x + 5?", options: ["10", "5", "15", "Error"], answer: 2, explanation: "x = x + 5 means taking the current value (10), adding 5, and then assigning the result (15) back to x." },
        ],
      },
    ],
  },
  {
    id: "prog-python-basic",
    title: "Basic Python",
    titleEn: "Python Basics",
    icon: "🐍",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Variables, loops, functions, and basic data types",
    descriptionEn: "Variables, loops, functions and basic data types",
    course: "kids",
    lessons: [
      {
        id: "py-basic-1",
        title: "Variables and data types",
        titleEn: "Variables and Data Types",
        theory: "Python có các kiểu dữ liệu chính — hãy nghĩ chúng như **các loại hộp khác nhau** để chứa các thứ khác nhau:\n\n**🔢 int — Số nguyên** (hộp chỉ chứa số đếm được)\nVí dụ: tuổi = 15, số bạn = 42, nhiệt độ = -7\nGiống số trên bảng điểm — không có phần thập phân.\n\n**📐 float — Số thực** (hộp chứa số có dấu phẩy)\nVí dụ: pi = 3.14159, chiều cao = 1.68, giá = -0.5\nGiống cân nặng trên cân điện tử — chính xác đến phần thập phân.\n\n**📝 str — Chuỗi ký tự** (hộp chứa chữ/từ)\nVí dụ: ten = \"Minh\", loi_chao = 'Xin chào!'\nLuôn nằm trong dấu nháy \" \" hoặc ' '. Giống tin nhắn trong điện thoại 📱\n\n**✅ bool — Logic đúng/sai** (hộp chỉ có 2 trạng thái)\nVí dụ: dang_online = True, da_lam_bai = False\nGiống công tắc đèn 💡 — chỉ có BẬT (True) hoặc TẮT (False).\n\n**🏷️ Quy tắc đặt tên biến:**\n- ✅ `my_score`, `_name`, `player1` → Hợp lệ\n- ❌ `2name` (bắt đầu bằng số), `my-var` (có dấu gạch), `class` (từ khóa Python)\n- 💡 Mẹo: dùng snake_case: `diem_trung_binh` thay vì `diemtrungbinh`\n\n**🔄 Chuyển đổi kiểu — Biến hình dữ liệu:**\n```\nstr(42) → \"42\"    (số → chữ, để nối chuỗi)\nint(\"42\") → 42    (chữ → số, để tính toán)\nfloat(\"3.14\") → 3.14\n```",
        theoryEn: "Python has main data types — think of them as **different types of boxes** for different things:\n\n**🔢 int — Integer** (box for countable numbers)\nExamples: age = 15, friends = 42, temperature = -7\nLike scores on a report card — no decimal points.\n\n**📐 float — Float** (box for decimal numbers)\nExamples: pi = 3.14159, height = 1.68, price = -0.5\nLike weight on a digital scale — precise to decimal places.\n\n**📝 str — String** (box for text/words)\nExamples: name = \"Minh\", greeting = 'Hello!'\nAlways in quotes \" \" or ' '. Like text messages on your phone 📱\n\n**✅ bool — Boolean** (box with only 2 states)\nExamples: is_online = True, homework_done = False\nLike a light switch 💡 — only ON (True) or OFF (False).\n\n**🏷️ Variable naming rules:**\n- ✅ `my_score`, `_name`, `player1` → Valid\n- ❌ `2name` (starts with number), `my-var` (has dash), `class` (Python keyword)\n- 💡 Tip: use snake_case: `average_score` instead of `averagescore`\n\n**🔄 Type conversion — Shapeshifting data:**\n```\nstr(42) → \"42\"    (number → text, for concatenation)\nint(\"42\") → 42    (text → number, for math)\nfloat(\"3.14\") → 3.14\n```",
        code: `# Khai báo biến
ten = "Minh"           # str
tuoi = 12              # int
chieu_cao = 1.52       # float
hoc_gioi = True        # bool

# Print information
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Study well: {study_gioi}")

# Check the data type
print(type(ten))       # <class 'str'>
print(type(tuoi))      # <class 'int'>

# Style conversion
tuoi_str = str(tuoi)   # int → str
so = int("42")         # str → int`,
        codeLanguage: "python",
        exercise: "Declare a variable containing: name, age, average score (real number), and variable to check whether a student is good or not. Print out all information using f-string.",
        exerciseEn: "Declare variables for: name, age, average score (float), and whether the student is excellent. Print all info using f-string.",
        quiz: [
          { question: "What is the data type of 3.14?", options: ["int", "str", "float", "bool"], answer: 2, explanation: "3.14 is a real number (with a decimal part), so its type is float." },
          { question: "What does the type('Hello') command return?", options: ["<class 'int'>", "<class 'str'>", "<class 'list'>", "<class 'bool'>"], answer: 1, explanation: "'Hello' is a string of characters, so type() returns <class 'str'>." },
          { question: "Which variable name is valid in Python?", options: ["my-var", "2name", "_score", "class"], answer: 2, explanation: "_score is valid because it starts with an underscore. 'class' is a keyword, '2name' starts with a number, 'my-var' has a hyphen." },
          { question: "What will int('3.14') result in?", options: ["3", "3.14", "ValueError", "'3'"], answer: 2, explanation: "int() cannot directly convert a string with a decimal point. You need to use int(float('3.14')) = 3." },
          { question: "Which syntax is used for f-strings in Python?", options: ["format('...')", "f'...{variable}...' is the syntax for f-strings.", "str.format(variable)", "print(variable)"], answer: 1, explanation: "f-strings use the syntax f'text {variable}' — the quickest and most readable way to embed variables into strings since Python 3.6+." },
        ],
      },
      {
        id: "py-basic-2",
        title: "Functions",
        titleEn: "Functions",
        theory: "**Hàm** là một khối code có tên, thực hiện một nhiệm vụ cụ thể — giống **công thức nấu ăn** 🍳!\n\nTưởng tượng bạn hay pha trà sữa. Mỗi lần bạn phải: lấy trà → đun nước → pha trà → thêm sữa → thêm đường. Thay vì nhớ 5 bước mỗi lần, bạn viết một 'công thức' tên `pha_tra_sua()` — lần sau chỉ cần gọi tên!\n\n**Cấu trúc hàm:**\n```python\ndef ten_ham(nguyen_lieu):    # Tên + Nguyên liệu\n    # Các bước thực hiện      # Công thức\n    return thanh_pham          # Thành phẩm\n```\n\n**Ví dụ minh họa:**\n```\n🧑‍🍳 def lam_banh(bot, trung, duong):\n      tron(bot, trung, duong)     # Bước 1\n      nuong(180, 30_phut)         # Bước 2\n      return banh_ngon            # Xong!\n\n🍰 banh = lam_banh('bot_mi', 2, '100g')  # Gọi hàm\n```\n\n**3 lợi ích lớn:**\n1. 🔁 **Tái sử dụng:** Viết 1 lần, gọi 100 lần. Không copy-paste!\n2. 📖 **Dễ đọc:** `tinh_diem_tb(8, 9, 7)` rõ nghĩa hơn `(8+9+7)/3`\n3. 🐛 **Dễ sửa lỗi:** Bug ở hàm nào → sửa hàm đó, không ảnh hưởng chỗ khác.\n\n**Tham số mặc định — Đặt sẵn 'mặc định':**\n```python\ndef chao(ten, ngon_ngu='vi'):  # Mặc định tiếng Việt\n    ...\nchao('Minh')          # → 'Xin chào, Minh!'\nchao('John', 'en')    # → 'Hello, John!'\n```\nGiống đặt pizza: nếu không nói gì, mặc định size M. Muốn size L thì nói thêm!",
        theoryEn: "A **Function** is a named block of code that performs a specific task — like a **cooking recipe** 🍳!\n\nImagine you often make bubble tea. Each time: get tea → boil water → brew → add milk → add sugar. Instead of remembering 5 steps each time, write a 'recipe' called `make_bubble_tea()` — next time just call its name!\n\n**Function structure:**\n```python\ndef function_name(ingredients):  # Name + Ingredients\n    # Steps to follow              # Recipe\n    return finished_product        # Done!\n```\n\n**Visual example:**\n```\n🧑‍🍳 def bake_cake(flour, eggs, sugar):\n      mix(flour, eggs, sugar)        # Step 1\n      bake(180, 30_minutes)          # Step 2\n      return delicious_cake          # Done!\n\n🍰 cake = bake_cake('flour', 2, '100g')  # Call function\n```\n\n**3 major benefits:**\n1. 🔁 **Reusable:** Write once, call 100 times. No copy-paste!\n2. 📖 **Readable:** `calc_average(8, 9, 7)` is clearer than `(8+9+7)/3`\n3. 🐛 **Debuggable:** Bug in which function → fix that function, no side effects.\n\n**Default parameters — Pre-set 'defaults':**\n```python\ndef greet(name, language='en'):  # Default English\n    ...\ngreet('Minh')           # → 'Hello, Minh!'\ngreet('Minh', 'vi')     # → 'Xin chào, Minh!'\n```\nLike ordering pizza: if you say nothing, default is Medium. Want Large? Just specify!",
        code: `# Hàm tính diện tích hình chữ nhật
def dien_tich_hcn(chieu_dai, chieu_rong):
    return chieu_dai * chieu_rong

# Function to check even/odd numbers
def kiem_tra_chan_le(so):
    if so % 2 == 0:
        return f"{so} is an even number ✅"
    else:
        return f"{so} is an odd number ❌"

# Greeting function with default value
def chao(ten, ngon_ngu="vi"):
    if ngon_ngu == "vi":
        return f"Hello, {ten}! 👋"
    else:
        return f"Hello, {ten}! 👋"

# Use
print(dien_tich_hcn(5, 3))       # 15
print(kiem_tra_chan_le(7))         # 7 là số lẻ
print(chao("Minh"))               # Xin chào, Minh!
print(chao("John", "en"))         # Hello, John!`,
        codeLanguage: "python",
        exercise: "Write 3 functions: (1) calculate the circumference of a circle, (2) check for prime numbers, (3) count the number of negative integers in the string.",
        exerciseEn: "Write 3 functions: (1) calculate circle circumference, (2) check if prime number, (3) count vowels in a string.",
        quiz: [
          { question: "Which keyword is used to declare a function?", options: ["func", "function", "def", "method"], answer: 2, explanation: "Python uses 'def' (short for define) to declare functions." },
          { question: "What is the purpose of the 'return' statement in a function?", options: ["Print to the screen", "Return a value and end the function", "Repeat the function", "Delete the function"], answer: 1, explanation: "return sends a value back to the function caller and immediately terminates the function." },
          { question: "What does a function without a return statement return?", options: ["0", "False", "None", "Error"], answer: 2, explanation: "In Python, a function without a return statement automatically returns None — a special value meaning 'nothing'." },
          { question: "What is the *args parameter in a Python function used for?", options: ["Accept exactly 1 argument", "Accept a variable number of arguments", "Declare a global variable", "Create an empty list"], answer: 1, explanation: "*args allows a function to accept an unlimited number of positional arguments, which are collected into a tuple." },
          { question: "What is a Lambda function?", options: ["A function with a special name", "An anonymous function written on 1 line", "A function used once and then self-deleted", "A function imported from a library"], answer: 1, explanation: "Lambda is an anonymous function (anonymous function) written compactly on one line: lambda x: x * 2. Often used with map(), filter()." },
        ],
      },
      {
        id: "py-basic-3",
        title: "for & while loops",
        titleEn: "For & While Loops",
        theory: "**Vòng lặp** giúp bạn tự động hóa công việc lặp đi lặp lại — giống **robot làm việc thay bạn** 🤖\n\n**for — Lặp qua dãy đã biết trước:**\nGiống bạn phát bài kiểm tra cho 30 học sinh — bạn biết trước có 30 bạn.\n```\nDanh sách: [An, Bình, Chi, Dũng]\nfor mỗi bạn trong danh sách:\n    phát bài kiểm tra cho bạn đó\n```\n\n**while — Lặp khi điều kiện còn đúng:**\nGiống ăn buffet — bạn ăn **cho đến khi** no. Không biết trước ăn bao nhiêu!\n```\nwhile chưa no:\n    lấy thêm đồ ăn\n    ăn\nprint('No rồi! 🫃')\n```\n\n**🎮 Lệnh điều khiển vòng lặp:**\n- 🚪 **break:** Thoát ngay! Giống kéo còi báo động → dừng mọi thứ.\n  ```python\n  for i in range(100):\n      if i == 5: break  # Dừng ở số 5, không chạy tiếp\n  ```\n- ⏭️ **continue:** Bỏ qua lần này, chạy tiếp! Giống gặp bài khó trong đề thi → bỏ qua, làm bài khác.\n  ```python\n  for i in range(10):\n      if i % 2 == 0: continue  # Bỏ qua số chẵn\n      print(i)  # Chỉ in số lẻ: 1, 3, 5, 7, 9\n  ```\n\n**📊 range() — Tạo dãy số tự động:**\n- `range(5)` → 0️⃣1️⃣2️⃣3️⃣4️⃣ (5 số, bắt đầu từ 0)\n- `range(1, 6)` → 1️⃣2️⃣3️⃣4️⃣5️⃣ (từ 1 đến 5)\n- `range(0, 10, 2)` → 0️⃣2️⃣4️⃣6️⃣8️⃣ (đếm cách 2)\n- `range(10, 0, -1)` → đếm ngược! 🔟9️⃣8️⃣...1️⃣",
        theoryEn: "**Loops** automate repetitive tasks — like a **robot doing work for you** 🤖\n\n**for — Loop through a known sequence:**\nLike handing out tests to 30 students — you know there are exactly 30.\n```\nStudent list: [An, Binh, Chi, Dung]\nfor each student in list:\n    hand out test to that student\n```\n\n**while — Loop while condition is true:**\nLike eating at a buffet — you eat **until** full. Don't know how many plates!\n```\nwhile not full:\n    get more food\n    eat\nprint('Full now! 🫃')\n```\n\n**🎮 Loop control statements:**\n- 🚪 **break:** Exit immediately! Like pulling a fire alarm → stop everything.\n  ```python\n  for i in range(100):\n      if i == 5: break  # Stops at 5, doesn't continue\n  ```\n- ⏭️ **continue:** Skip this round, keep going! Like skipping a hard question on an exam → move on.\n  ```python\n  for i in range(10):\n      if i % 2 == 0: continue  # Skip even numbers\n      print(i)  # Only prints odds: 1, 3, 5, 7, 9\n  ```\n\n**📊 range() — Auto-generate number sequences:**\n- `range(5)` → 0️⃣1️⃣2️⃣3️⃣4️⃣ (5 numbers, starting from 0)\n- `range(1, 6)` → 1️⃣2️⃣3️⃣4️⃣5️⃣ (from 1 to 5)\n- `range(0, 10, 2)` → 0️⃣2️⃣4️⃣6️⃣8️⃣ (step by 2)\n- `range(10, 0, -1)` → count down! 🔟9️⃣8️⃣...1️⃣",
        code: `# Vòng lặp for - In bảng cửu chương
so = 7
print(f"📋 Multiplication table {so}:")
for i in range(1, 11):
    print(f"  {so} x {i} = {so * i}")

# While loop - Guess the number
import random
so_bi_mat = random.randint(1, 20)
so_lan = 0

while True:
    du_doan = int(input("Guess the number (1-20):"))
    so_lan += 1
    if du_doan == so_bi_mat:
        print(f"🎉 That's right! You guessed {so_lan} times")
        break
    elif du_doan < so_bi_mat:
        print("📈 Bigger!")
    else:
        print("📉 Smaller!")`,
        codeLanguage: "python",
        exercise: "Write a program to calculate the sum of numbers from 1 to N (entered from the keyboard) using both methods: for and while.",
        exerciseEn: "Write a program to sum numbers from 1 to N (user input) using both for and while loops.",
        quiz: [
          { question: "What sequence of numbers does range(1, 5) create?", options: ["1,2,3,4,5", "0,1,2,3,4", "1,2,3,4", "1,2,3,4,5,6"], answer: 2, explanation: "range(1,5) creates a sequence from 1 to 4 (excluding 5)." },
          { question: "Which command exits a loop immediately?", options: ["exit", "stop", "break", "return"], answer: 2, explanation: "break exits the innermost loop immediately." },
          { question: "When does a while True loop stop?", options: ["After 100 iterations", "When a break statement is encountered", "When the variable = False", "Never stops"], answer: 1, explanation: "while True creates an infinite loop. The only way to exit is using break inside the loop." },
          { question: "What is the effect of the continue statement in a loop?", options: ["Exits the loop", "Skips the rest and proceeds to the next iteration", "Pauses for 1 second", "Returns to the beginning of the program"], answer: 1, explanation: "continue skips the remaining statements in the current iteration and jumps to the next iteration." },
          { question: "What sequence of numbers will for i in range(10, 0, -2) generate?", options: ["10, 8, 6, 4, 2", "10, 8, 6, 4, 2, 0", "0, 2, 4, 6, 8, 10", "10, 9, 8, ..., 1"], answer: 0, explanation: "range(10, 0, -2) counts down from 10, step -2, stopping before 0: 10, 8, 6, 4, 2." },
        ],
      },
    ],
  },
  {
    id: "prog-data-structures",
    title: "Data Structures & Algorithms",
    titleEn: "Data Structures & Algorithms",
    icon: "🏗️",
    color: "from-blue-500/20 to-cyan-500/20",
    description: "Array, List, Dictionary, Sorting and Searching",
    descriptionEn: "Array, List, Dictionary, Sorting and Searching",
    course: "kids",
    lessons: [
      {
        id: "ds-1",
        title: "List, Tuple and Dictionary",
        titleEn: "List, Tuple and Dictionary",
        theory: "Cấu trúc dữ liệu là cách bạn **tổ chức và sắp xếp thông tin** — giống như cách bạn sắp xếp đồ trong phòng! 🏠\n\n**📋 List [] — Danh sách linh hoạt:**\nGiống **danh sách mua sắm** — bạn có thể thêm, xóa, sắp xếp lại bất cứ lúc nào.\n```python\nmua_sam = ['sữa', 'trứng', 'bánh mì']\nmua_sam.append('phô mai')     # Thêm cuối: [..., 'phô mai']\nmua_sam.insert(0, 'nước')     # Thêm đầu: ['nước', ...]\nmua_sam.remove('trứng')       # Xóa: bỏ 'trứng'\nmua_sam.sort()                # Sắp xếp A-Z\n```\n\n**📌 Tuple () — Dữ liệu cố định 'không thể sửa':**\nGiống **tọa độ GPS** — một khi xác định, không ai thay đổi được!\n```python\nha_noi = (21.028511, 105.804817)    # Vĩ độ, Kinh độ\nha_noi[0] = 0  # ❌ LỖI! Tuple không cho sửa!\n```\nDùng khi dữ liệu KHÔNG BAO GIỜ nên thay đổi: ngày sinh, mã quốc gia, hằng số vật lý.\n\n**📖 Dictionary {} — Từ điển tra cứu siêu nhanh:**\nGiống **danh bạ điện thoại** — biết tên → tra ra số ngay lập tức!\n```python\ndanh_ba = {\n    'Minh': '0901234567',     # key: value\n    'An':   '0987654321',\n}\ndanh_ba['Minh']  # → '0901234567' (tra cứu cực nhanh!)\n```\n\n**🤔 Khi nào dùng gì?**\n| Tình huống | Chọn | Lý do |\n|---|---|---|\n| Danh sách học sinh (thêm/bớt) | List | Thay đổi thường xuyên |\n| Tọa độ GPS | Tuple | Không bao giờ đổi |\n| Bảng điểm (tên→điểm) | Dict | Tra cứu nhanh theo tên |",
        theoryEn: "Data structures are how you **organize and arrange information** — like how you arrange things in your room! 🏠\n\n**📋 List [] — Flexible list:**\nLike a **shopping list** — you can add, remove, rearrange anytime.\n```python\nshopping = ['milk', 'eggs', 'bread']\nshopping.append('cheese')      # Add end: [..., 'cheese']\nshopping.insert(0, 'water')    # Add front: ['water', ...]\nshopping.remove('eggs')        # Remove: drop 'eggs'\nshopping.sort()                # Sort A-Z\n```\n\n**📌 Tuple () — Fixed 'read-only' data:**\nLike **GPS coordinates** — once set, nobody can change them!\n```python\nhanoi = (21.028511, 105.804817)    # Latitude, Longitude\nhanoi[0] = 0  # ❌ ERROR! Tuples don't allow changes!\n```\nUse when data should NEVER change: birthday, country code, physics constants.\n\n**📖 Dictionary {} — Ultra-fast lookup book:**\nLike a **phone book** — know the name → get the number instantly!\n```python\ncontacts = {\n    'Minh': '0901234567',     # key: value\n    'An':   '0987654321',\n}\ncontacts['Minh']  # → '0901234567' (blazing fast lookup!)\n```\n\n**🤔 When to use what?**\n| Situation | Choice | Reason |\n|---|---|---|\n| Student roster (add/remove) | List | Changes frequently |\n| GPS coordinates | Tuple | Never changes |\n| Grade book (name→score) | Dict | Fast lookup by name |",
        code: `# LIST - Danh sách học sinh
hoc_sinh = ["An", "Jar", "Chi", "Dung"]
hoc_sinh.append("Em")        # Thêm cuối
hoc_sinh.insert(0, "Anh")    # Thêm đầu
hoc_sinh.sort()               # Sắp xếp A-Z
print(f"The class has {len(student_student)} friends: {student_student}")

# TUPLE - Constant coordinates
vi_tri = (10.762622, 106.660172)  # HCM
print(f"Ho Chi Minh City coordinates: {vi_tri}")

# DICTIONARY - Score
diem = {
    "An": {"Maths": 9, "Literature": 8, "Anh": 7},
    "Jar": {"Maths": 7, "Literature": 9, "Anh": 8},
}
for ten, mon in diem.items():
    tb = sum(mon.values()) / len(mon)
    print(f"{ten}: TB = {tb:.1f}")`,
        codeLanguage: "python",
        exercise: "Create a dictionary containing information about 3 products (name, price, quantity). Write a function to calculate the total warehouse value.",
        exerciseEn: "Create a dictionary with 3 products (name, price, quantity). Write a function to calculate total inventory value.",
        quiz: [
          { question: "Which data type cannot be changed after creation?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2, explanation: "Tuple is an immutable data type - elements cannot be added, deleted, or modified." },
          { question: "What syntax is used to access values in a dict?", options: ["dict(key)", "dict[key]", "dict.key", "dict->key"], answer: 1, explanation: "Python uses dict[key] or dict.get(key) to access values." },
          { question: "How does a Set in Python differ from a List?", options: ["Set has order", "Set does not contain duplicate elements", "Set is faster when appending", "Set uses square brackets"], answer: 1, explanation: "Set {} does not allow duplicate elements and is unordered. List [] allows duplicates and is ordered." },
          { question: "How does dict.get('key', 'default') differ from dict['key']?", options: ["Faster", "Returns a default value if the key does not exist instead of an error", "Only for numbers", "No difference"], answer: 1, explanation: "dict.get() returns a default value if the key does not exist, whereas dict[key] will raise a KeyError." },
          { question: "What does List comprehension [x**2 for x in range(5)] create?", options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 2, 4, 6, 8]", "[0, 1, 2, 3, 4]"], answer: 0, explanation: "List comprehension calculates x² for x from 0 to 4: 0²=0, 1²=1, 2²=4, 3²=9, 4²=16." },
        ],
      },
      {
        id: "ds-2",
        title: "Sorting algorithm",
        titleEn: "Sorting Algorithms",
        theory: "**Thuật toán sắp xếp** là cách sắp xếp dữ liệu theo thứ tự — giống **xếp hàng học sinh theo chiều cao** trong giờ thể dục! 🏫\n\n**🫧 Bubble Sort — Sắp xếp nổi bọt:**\nTưởng tượng bọt nước trong ly soda — bọt lớn nổi lên trên! 🥤\n- So sánh 2 bạn đứng cạnh nhau\n- Ai cao hơn → đổi chỗ ra sau\n- Lặp lại cho đến khi không cần đổi nữa\n```\nVòng 1: [64, 34, 25, 12] → [34, 25, 12, 64] ← 64 'nổi' lên cuối!\nVòng 2: [34, 25, 12, 64] → [25, 12, 34, 64] ← 34 'nổi' lên\nVòng 3: [25, 12, 34, 64] → [12, 25, 34, 64] ← Xong! ✅\n```\n⏱️ Tốc độ: O(n²) — chậm! Với 1000 phần tử cần ~1 triệu phép so sánh.\n\n**🎯 Selection Sort — Sắp xếp chọn:**\nGiống **chọn đội bóng** — mỗi lượt chọn người giỏi nhất còn lại!\n- Tìm số nhỏ nhất → đặt vào vị trí 1\n- Tìm số nhỏ nhất CÒN LẠI → đặt vào vị trí 2\n- Lặp lại...\n```\n[64, 25, 12, 34] → Tìm min=12, đặt đầu → [12, 25, 64, 34]\n[12, 25, 64, 34] → Tìm min=25, đã đúng → [12, 25, 64, 34]\n[12, 25, 64, 34] → Tìm min=34, đổi → [12, 25, 34, 64] ✅\n```\n\n**🃏 Insertion Sort — Sắp xếp chèn:**\nGiống **xếp bài trên tay** khi chơi tiến lên 🎴:\n- Lấy từng lá bài mới\n- Chèn vào đúng vị trí trong các lá đã sắp xếp\n- Nhanh nhất khi bài gần như đã sắp xếp! O(n) trường hợp tốt nhất.\n\n**⚡ So sánh tốc độ:**\n| Thuật toán | Tốt nhất | Trung bình | Tệ nhất |\n|---|---|---|---|\n| Bubble | O(n) | O(n²) | O(n²) |\n| Selection | O(n²) | O(n²) | O(n²) |\n| Insertion | O(n) ⭐ | O(n²) | O(n²) |",
        theoryEn: "**Sorting algorithms** arrange data in order — like **lining students up by height** in gym class! 🏫\n\n**🫧 Bubble Sort:**\nImagine bubbles in a soda glass — big bubbles float to the top! 🥤\n- Compare 2 adjacent items\n- If wrong order → swap\n- Repeat until no more swaps needed\n```\nPass 1: [64, 34, 25, 12] → [34, 25, 12, 64] ← 64 'bubbles' to end!\nPass 2: [34, 25, 12, 64] → [25, 12, 34, 64] ← 34 'bubbles' up\nPass 3: [25, 12, 34, 64] → [12, 25, 34, 64] ← Done! ✅\n```\n⏱️ Speed: O(n²) — slow! 1000 elements needs ~1 million comparisons.\n\n**🎯 Selection Sort:**\nLike **picking teams** — each turn pick the best remaining player!\n- Find smallest → put in position 1\n- Find smallest REMAINING → put in position 2\n- Repeat...\n```\n[64, 25, 12, 34] → Find min=12, place first → [12, 25, 64, 34]\n[12, 25, 64, 34] → Find min=25, already correct → [12, 25, 64, 34]\n[12, 25, 64, 34] → Find min=34, swap → [12, 25, 34, 64] ✅\n```\n\n**🃏 Insertion Sort:**\nLike **sorting cards in your hand** while playing poker 🎴:\n- Pick up each new card\n- Insert it into the right position among sorted cards\n- Fastest when cards are nearly sorted! O(n) best case.\n\n**⚡ Speed comparison:**\n| Algorithm | Best | Average | Worst |\n|---|---|---|---|\n| Bubble | O(n) | O(n²) | O(n²) |\n| Selection | O(n²) | O(n²) | O(n²) |\n| Insertion | O(n) ⭐ | O(n²) | O(n²) |",
        code: `# Bubble Sort - Sắp xếp nổi bọt
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
        print(f"Hit {i+1}: {arr}")
    return arr

diem = [64, 34, 25, 12, 22, 11, 90]
print(f"Initial: {diem}")
print(f"Result: {bubble_sort(diem.copy())}")

# Selection Sort - Sort the selection
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(f"Selection: {selection_sort(diem.copy())}")`,
        codeLanguage: "python",
        exercise: "Write the Insertion Sort function and compare the number of swaps with Bubble Sort on the same array of 10 random elements.",
        exerciseEn: "Write an Insertion Sort function and compare swap counts with Bubble Sort on the same random 10-element array.",
        quiz: [
          { question: "What is the average time complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"], answer: 2, explanation: "Bubble Sort has 2 nested loops, so its complexity is O(n²)." },
          { question: "Which algorithm is best for an almost sorted array?", options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "All are the same"], answer: 2, explanation: "Insertion Sort achieves O(n) in the best case (nearly sorted array)." },
          { question: "Which algorithm is fastest when the array is nearly sorted?", options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "All 3 are the same"], answer: 2, explanation: "Insertion Sort achieves O(n) when the array is nearly sorted — each element only needs to shift 0-1 positions." },
          { question: "What is the average time complexity of Merge Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, explanation: "Merge Sort always achieves O(n log n) by consistently splitting the array (log n times) and merging (n comparisons each time)." },
          { question: "What does 'stable sort' mean?", options: ["Runs fast and stably", "Preserves the relative order of equal elements", "Does not consume additional memory", "Always sorts in ascending order"], answer: 1, explanation: "Stable sort preserves the relative order of elements with equal values in the original array." },
        ],
      },
      {
        id: "ds-3",
        title: "Search algorithm",
        titleEn: "Searching Algorithms",
        theory: "**Thuật toán tìm kiếm** giúp bạn tìm một thứ cụ thể trong đống dữ liệu — giống **tìm cuốn sách trong thư viện** 📚\n\n**🔍 Linear Search — Tìm kiếm tuần tự:**\nGiống tìm bạn trong lớp học — bạn nhìn từng người một, từ đầu đến cuối.\n```\nDanh sách: [🍎, 🍊, 🍋, 🍇, 🍓]\nTìm 🍇:\n  Nhìn 🍎 → Không phải\n  Nhìn 🍊 → Không phải  \n  Nhìn 🍋 → Không phải\n  Nhìn 🍇 → TÌM THẤY! ✅ (mất 4 bước)\n```\n⏱️ Tốc độ: O(n) — Nếu 1000 trái cây, tệ nhất tìm 1000 lần!\n\n**⚡ Binary Search — Tìm kiếm nhị phân (chia đôi):**\nGiống **tìm từ trong từ điển** — bạn không đọc từ trang 1! Bạn mở giữa, xem từ cần tìm ở nửa trước hay nửa sau.\n```\nDãy đã sắp xếp: [1, 3, 5, 7, 9, 11, 13, 15]\nTìm số 11:\n  Bước 1: Giữa = 7 → 11 > 7 → tìm bên phải [9, 11, 13, 15]\n  Bước 2: Giữa = 11 → TÌM THẤY! ✅ (chỉ 2 bước!)\n```\n\n**⚠️ ĐIỀU KIỆN:** Dữ liệu PHẢI được sắp xếp trước! (Bạn không thể dùng chiến thuật từ điển nếu các từ xếp ngẫu nhiên)\n\n**🏆 So sánh kinh ngạc:**\n| Số phần tử | Linear Search | Binary Search |\n|---|---|---|\n| 100 | tối đa 100 bước | tối đa 7 bước |\n| 1,000 | 1,000 bước | ~10 bước |\n| 1,000,000 | 1 TRIỆU bước | ~20 bước! 🤯 |\n| 1 tỷ | 1 TỶ bước | ~30 bước! |\n\nBinary Search nhanh đến mức khó tin! Với 1 tỷ phần tử, chỉ cần 30 lần 'chia đôi' là tìm thấy!",
        theoryEn: "**Searching algorithms** help you find a specific item in a pile of data — like **finding a book in a library** 📚\n\n**🔍 Linear Search — Sequential search:**\nLike finding a friend in class — you look at each person one by one, start to end.\n```\nList: [🍎, 🍊, 🍋, 🍇, 🍓]\nFind 🍇:\n  Look at 🍎 → Nope\n  Look at 🍊 → Nope  \n  Look at 🍋 → Nope\n  Look at 🍇 → FOUND! ✅ (took 4 steps)\n```\n⏱️ Speed: O(n) — 1000 fruits? Worst case: 1000 checks!\n\n**⚡ Binary Search — Halving search:**\nLike **looking up a word in a dictionary** — you don't read from page 1! You open the middle, check if your word is in the first or second half.\n```\nSorted array: [1, 3, 5, 7, 9, 11, 13, 15]\nFind 11:\n  Step 1: Middle = 7 → 11 > 7 → search right [9, 11, 13, 15]\n  Step 2: Middle = 11 → FOUND! ✅ (only 2 steps!)\n```\n\n**⚠️ REQUIREMENT:** Data MUST be sorted first! (You can't use dictionary strategy if words are randomly arranged)\n\n**🏆 Mind-blowing comparison:**\n| Elements | Linear Search | Binary Search |\n|---|---|---|\n| 100 | max 100 steps | max 7 steps |\n| 1,000 | 1,000 steps | ~10 steps |\n| 1,000,000 | 1 MILLION steps | ~20 steps! 🤯 |\n| 1 billion | 1 BILLION steps | ~30 steps! |\n\nBinary Search is unbelievably fast! With 1 billion elements, just 30 'halves' to find it!",
        code: `# Linear Search - Tìm kiếm tuần tự
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Binary Search - Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    steps = 0
    while left <= right:
        steps += 1
        mid = (left + right) // 2
        if arr[mid] == target:
            print(f"✅ Found after {steps} steps!")
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

data = list(range(1, 101))  # [1, 2, ..., 100]
print("Find number 73:")
result = binary_search(data, 73)
print(f"Location: {result}")`,
        codeLanguage: "python",
        exercise: "Write a program to measure the running time of Linear Search vs Binary Search on an array of 100,000 elements.",
        exerciseEn: "Write a program to measure runtime of Linear Search vs Binary Search on a 100,000-element array.",
        quiz: [
          { question: "What does Binary Search require?", options: ["An empty array", "A sorted array", "An array with an even number of elements", "An array of integers"], answer: 1, explanation: "Binary Search only works on a sorted array because it relies on order to eliminate half of the array." },
          { question: "To find a number in an array of 1024 elements, how many maximum steps does Binary Search need?", options: ["1024", "512", "10", "32"], answer: 2, explanation: "log₂(1024) = 10. Binary Search needs a maximum of 10 steps for 1024 elements." },
          { question: "What condition does Binary Search require for the array?", options: ["The array must have at least 100 elements", "The array must be sorted beforehand", "The array only contains integers", "The array has no duplicate elements"], answer: 1, explanation: "Binary Search only works on a sorted array because the divide-and-conquer algorithm relies on element order." },
          { question: "What is the time complexity of Linear Search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, explanation: "Linear Search iterates through each element one by one; in the worst case, it has to iterate through all n elements → O(n)." },
          { question: "What is the average time complexity of Hash Table lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "Hash Table uses a hash function to directly calculate the storage location, so average lookup is only O(1)." },
        ],
      },
    ],
  },
  {
    id: "prog-pygame",
    title: "Actual project: Game & Web",
    titleEn: "Real Projects: Games & Web",
    icon: "🎮",
    color: "from-pink-500/20 to-rose-500/20",
    description: "Build games with Pygame and personal websites with HTML/CSS",
    descriptionEn: "Build games with Pygame and personal websites with HTML/CSS",
    course: "kids",
    lessons: [
      {
        id: "game-1",
        title: "Pygame: Create the first game window",
        titleEn: "Pygame: Your First Game Window",
        theory: "**Pygame** là thư viện Python để tạo game 2D — biến bạn thành **nhà phát triển game thực thụ** 🎮!\n\n**Hãy tưởng tượng** bạn đang quay phim hoạt hình: camera quay liên tục 60 khung hình/giây. Mỗi khung hình, bạn phải:\n1. Xem khán giả bấm nút gì (sự kiện)\n2. Di chuyển nhân vật theo nút bấm (cập nhật)\n3. Vẽ lại toàn bộ cảnh mới (render)\n\n**🏗️ Cấu trúc game — 4 bước luôn cố định:**\n```\n1. 🔧 Khởi tạo: pygame.init() → Bật 'máy quay'\n2. 📺 Tạo cửa sổ: set_mode((600, 400)) → Mở 'rạp chiếu'\n3. 🔄 Vòng lặp game (60 FPS):\n   ├─ 🎮 Xử lý sự kiện: Nhấn ← → ↑ ↓? Click chuột?\n   ├─ 📐 Cập nhật: Nhân vật di chuyển, va chạm, điểm số\n   └─ 🎨 Vẽ: Xóa màn hình cũ → vẽ nền → vẽ nhân vật → hiển thị\n4. 🚪 Thoát: pygame.quit() → Tắt 'máy quay'\n```\n\n**🎨 Hệ tọa độ trong Pygame:**\n```\n(0,0) ────────→ x (chiều ngang)\n  │  ┌──────────┐\n  │  │ Màn hình  │\n  │  │   game    │\n  ↓  └──────────┘\n  y (chiều dọc)\n```\n⚠️ Chú ý: y đi XUỐNG (ngược với toán học)! Nên `y -= 5` = đi LÊN.\n\n**🕹️ Xử lý phím — Tạo điều khiển mượt mà:**\n```python\nkeys = pygame.key.get_pressed()  # Kiểm tra phím đang nhấn\nif keys[K_LEFT]:  x -= speed      # ← Di chuyển trái\nif keys[K_RIGHT]: x += speed      # → Di chuyển phải\nif keys[K_UP]:    y -= speed      # ↑ Di chuyển lên (y giảm!)\nif keys[K_DOWN]:  y += speed      # ↓ Di chuyển xuống\n```",
        theoryEn: "**Pygame** is a Python library for 2D games — turning you into a **real game developer** 🎮!\n\n**Imagine** you're filming an animation: camera runs continuously at 60 frames/second. Each frame, you must:\n1. Check what buttons the audience pressed (events)\n2. Move characters based on input (update)\n3. Redraw the entire scene (render)\n\n**🏗️ Game structure — 4 fixed steps:**\n```\n1. 🔧 Initialize: pygame.init() → Turn on 'camera'\n2. 📺 Create window: set_mode((600, 400)) → Open 'theater'\n3. 🔄 Game loop (60 FPS):\n   ├─ 🎮 Handle events: Pressed ← → ↑ ↓? Mouse click?\n   ├─ 📐 Update: Character moves, collisions, score\n   └─ 🎨 Draw: Clear old screen → draw background → draw character → display\n4. 🚪 Quit: pygame.quit() → Turn off 'camera'\n```\n\n**🎨 Coordinate system in Pygame:**\n```\n(0,0) ────────→ x (horizontal)\n  │  ┌──────────┐\n  │  │  Game     │\n  │  │  Screen   │\n  ↓  └──────────┘\n  y (vertical)\n```\n⚠️ Note: y goes DOWN (opposite to math)! So `y -= 5` = move UP.\n\n**🕹️ Key handling — Smooth controls:**\n```python\nkeys = pygame.key.get_pressed()  # Check pressed keys\nif keys[K_LEFT]:  x -= speed      # ← Move left\nif keys[K_RIGHT]: x += speed      # → Move right\nif keys[K_UP]:    y -= speed      # ↑ Move up (y decreases!)\nif keys[K_DOWN]:  y += speed      # ↓ Move down\n```",
        code: `import pygame
import sys

# Initialization
pygame.init()
WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("🎮 First game!")
clock = pygame.time.Clock()

# Figure
player_x, player_y = 300, 200
player_size = 40
speed = 5

# Game loop
running = True
while running:
    # 1. Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # 2. Move with arrow keys
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player_x -= speed
    if keys[pygame.K_RIGHT]: player_x += speed
    if keys[pygame.K_UP]:    player_y -= speed
    if keys[pygame.K_DOWN]:  player_y += speed
    
    # 3. Drawing
    screen.fill((30, 30, 50))  # Nền tối
    pygame.draw.rect(screen, (0, 200, 255),
        (player_x, player_y, player_size, player_size))
    pygame.display.flip()
    clock.tick(60)  # 60 FPS

pygame.quit()`,
        codeLanguage: "python",
        exercise: "Add an 'enemy' (red circle) that moves randomly. If the player touches an enemy, 'Game Over!' is displayed.",
        exerciseEn: "Add an 'enemy' (red circle) moving randomly. If player touches enemy, display 'Game Over!'.",
        quiz: [
          { question: "How many times per second does the game loop run if clock.tick(60)?", options: ["30", "60", "120", "Unlimited"], answer: 1, explanation: "clock.tick(60) limits the frame rate to 60 FPS (frames per second)." },
          { question: "Which command is used to check if a key is being pressed?", options: ["pygame.event.get()", "pygame.key.get_pressed()", "pygame.mouse.get_pos()", "pygame.key.name()"], answer: 1, explanation: "pygame.key.get_pressed() returns the state of all keyboard keys (whether they are pressed or not)." },
          { question: "What does HTTP status code 404 mean?", options: ["Server error", "Page not found", "Redirect", "Success"], answer: 1, explanation: "404 Not Found means the server could not find the requested resource. 200=OK, 500=Server Error, 301=Redirect." },
          { question: "Which HTTP method is commonly used by RESTful APIs to create new data?", options: ["GET", "POST", "PUT", "DELETE"], answer: 1, explanation: "POST is used to create new resources. GET=read, PUT=update, DELETE=delete." },
          { question: "What does JSON stand for?", options: ["Java Standard Object Notation", "JavaScript Object Notation", "JSON Script Object Network", "Java Serialized Object Name"], answer: 1, explanation: "JSON = JavaScript Object Notation — a lightweight, easy-to-read data interchange format, widely used in APIs." },
        ],
      },
      {
        id: "game-2",
        title: "HTML & CSS: Personal website",
        titleEn: "HTML & CSS: Personal Website",
        theory: "**HTML** và **CSS** là bộ đôi xây dựng mọi trang web bạn nhìn thấy! 🌐\n\n**🦴 HTML — Khung xương của trang web:**\nGiống xây nhà: HTML là **khung bê tông** — quyết định nhà có mấy phòng, cửa ở đâu.\n```html\n<h1>Phòng khách lớn</h1>      <!-- Tiêu đề to nhất -->\n<p>Đây là phòng khách.</p>      <!-- Đoạn văn -->\n<img src='anh.jpg'>             <!-- Hình ảnh = treo tranh -->\n<a href='lien-ket'>Cửa đi</a>  <!-- Liên kết = cửa sang phòng khác -->\n```\n\n**👗 CSS — Trang trí nội thất:**\nHTML cho bạn căn nhà thô. CSS **sơn tường, lát gạch, bày đồ nội thất**.\n```css\nbody { background: #1a1a2e; }   /* Sơn tường tối */\nh1 { color: gold; }             /* Chữ màu vàng */\n.card { border-radius: 12px; }  /* Bo tròn góc */\n```\n\n**📋 Thẻ HTML quan trọng — Bộ dụng cụ xây nhà:**\n| Thẻ | Ý nghĩa | Ví dụ thực tế |\n|---|---|---|\n| `<h1>` đến `<h6>` | Tiêu đề lớn→nhỏ | Tên bài báo, mục lục |\n| `<p>` | Đoạn văn | Nội dung bài viết |\n| `<img>` | Hình ảnh | Ảnh sản phẩm, avatar |\n| `<a>` | Liên kết | Nút 'Xem thêm', menu |\n| `<div>` | Nhóm phần tử | 'Phòng' chứa nhiều đồ |\n| `<ul>/<li>` | Danh sách | Menu nhà hàng, to-do list |\n\n**💡 Mẹo thực tế:**\n- Mọi trang web bạn thấy (Facebook, YouTube, Google) đều dùng HTML + CSS\n- Nhấn F12 trên bất kỳ trang web nào để xem code HTML thật! 🔍\n- CSS Flexbox và Grid giúp bố cục responsive (đẹp trên cả điện thoại lẫn máy tính)",
        theoryEn: "**HTML** and **CSS** are the duo that builds every website you see! 🌐\n\n**🦴 HTML — Website skeleton:**\nLike building a house: HTML is the **concrete frame** — determines how many rooms, where doors go.\n```html\n<h1>Big living room</h1>         <!-- Largest heading -->\n<p>This is the living room.</p>   <!-- Paragraph -->\n<img src='photo.jpg'>             <!-- Image = hanging a painting -->\n<a href='link'>Door out</a>       <!-- Link = door to another room -->\n```\n\n**👗 CSS — Interior decoration:**\nHTML gives you a raw house. CSS **paints walls, tiles floors, arranges furniture**.\n```css\nbody { background: #1a1a2e; }   /* Dark wall paint */\nh1 { color: gold; }             /* Gold text */\n.card { border-radius: 12px; }  /* Rounded corners */\n```\n\n**📋 Essential HTML tags — Builder's toolkit:**\n| Tag | Meaning | Real example |\n|---|---|---|\n| `<h1>` to `<h6>` | Headings big→small | Article title, sections |\n| `<p>` | Paragraph | Article content |\n| `<img>` | Image | Product photo, avatar |\n| `<a>` | Link | 'Read more' button, menu |\n| `<div>` | Group elements | 'Room' containing items |\n| `<ul>/<li>` | List | Restaurant menu, to-do list |\n\n**💡 Pro tips:**\n- Every website you see (Facebook, YouTube, Google) uses HTML + CSS\n- Press F12 on any website to see the real HTML code! 🔍\n- CSS Flexbox and Grid enable responsive layouts (looks great on both phone and desktop)",
        code: `<!-- index.html -->
<!DOCTYPE html>
<html lang="vi">
<head>
    <title>Trang web của Minh</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #1a1a2e;
            color: #eee;
        }
        .header {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 16px;
        }
        .card {
            background: #16213e;
            border-radius: 12px;
            padding: 20px;
            margin: 16px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌟 Xin chào! Tôi là Minh</h1>
        <p>Lập trình viên nhí | Yêu toán & khoa học</p>
    </div>
    <div class="card">
        <h2>📚 Dự án của tôi</h2>
        <ul>
            <li>Game bắt quả bóng (Pygame)</li>
            <li>Máy tính bỏ túi (Python)</li>
        </ul>
    </div>
</body>
</html>`,
        codeLanguage: "html",
        exercise: "Create a personal portfolio page with: profile picture, introduction, list of interests, and contact button.",
        exerciseEn: "Create a personal portfolio page with: profile image, introduction section, hobbies list, and contact button.",
        quiz: [
          { question: "Which tag is used to create links in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, explanation: "The <a href='...'>Text</a> tag creates an anchor link in HTML." },
          { question: "Where in an HTML file can CSS be written?", options: ["Trong <body>", "Within <style> tags or a separate .css file", "Mandatory within <head>", "Trong <script>"], answer: 1, explanation: "CSS can be written within <style> tags or in a separate .css file, linked via <link>." },
          { question: "Which HTML tag is used to create an ordered list?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: 1, explanation: "<ol> (ordered list) creates a numbered list 1, 2, 3... <ul> creates an unordered list (bullet points)." },
          { question: "What is the CSS property 'display: flex' used for?", options: ["Hide elements", "Create a flexible row/column layout", "Make elements transparent", "Create animation"], answer: 1, explanation: "Flexbox (display: flex) allows arranging child elements in rows or columns flexibly." },
          { question: "Which CSS is used in responsive design to adjust to screen sizes?", options: ["@font-face", "@media queries", "@import", "@keyframes"], answer: 1, explanation: "@media queries allow applying different CSS based on viewport size, creating a responsive interface." },
        ],
      },
    ],
  },

  // ============ DATA ENGINEERING & AI ============
  {
    id: "prog-sql",
    title: "SQL & Databases",
    titleEn: "SQL & Databases",
    icon: "🗄️",
    color: "from-violet-500/20 to-purple-500/20",
    description: "Table design, queries, JOINs and indexing with PostgreSQL",
    descriptionEn: "Table design, queries, JOINs and indexing with PostgreSQL",
    course: "data-ai",
    lessons: [
      {
        id: "sql-1",
        title: "Basic SELECT query",
        titleEn: "Basic SELECT Queries",
        theory: "**SQL (Structured Query Language)** là ngôn ngữ để 'nói chuyện' với cơ sở dữ liệu — giống **Google cho database**: bạn hỏi, database trả lời! 🔍\n\n**Tại sao SQL quan trọng?**\nMọi ứng dụng (Facebook, Shopee, ngân hàng) đều lưu dữ liệu trong database. SQL là cách duy nhất để truy xuất và thao tác dữ liệu đó.\n\n**🏗️ Cấu trúc truy vấn — Nghĩ như câu tiếng Việt:**\n```sql\nSELECT cột      -- 'Cho tôi xem'\nFROM bảng        -- 'từ bảng'\nWHERE điều_kiện  -- 'mà thỏa điều kiện'\nORDER BY cột     -- 'sắp xếp theo'\nLIMIT 10;        -- 'chỉ 10 dòng đầu'\n```\n\n**Ví dụ thực tế — Quản lý lớp học:**\n```sql\n-- 'Cho tôi xem tên và điểm Toán của học sinh lớp 10A1, ai cao nhất trước'\nSELECT ho_ten, diem_toan\nFROM hoc_sinh\nWHERE lop = '10A1'\nORDER BY diem_toan DESC;\n```\n\n**📊 Các lệnh quan trọng:**\n| Lệnh | Ý nghĩa | Ví dụ đời thực |\n|---|---|---|\n| SELECT | Chọn cột hiển thị | 'Cho tôi xem tên và SĐT' |\n| WHERE | Lọc theo điều kiện | 'Chỉ những ai trên 18 tuổi' |\n| ORDER BY | Sắp xếp | 'Ai điểm cao nhất lên trước' |\n| GROUP BY | Nhóm dữ liệu | 'Đếm số học sinh mỗi lớp' |\n| HAVING | Lọc sau nhóm | 'Chỉ lớp nào có hơn 30 bạn' |\n| LIMIT | Giới hạn kết quả | 'Top 5 thôi' |",
        theoryEn: "**SQL (Structured Query Language)** is the language to 'talk' to databases — like **Google for databases**: you ask, database answers! 🔍\n\n**Why SQL matters?**\nEvery app (Facebook, Amazon, banks) stores data in databases. SQL is THE way to retrieve and manipulate that data.\n\n**🏗️ Query structure — Think like an English sentence:**\n```sql\nSELECT columns    -- 'Show me'\nFROM table         -- 'from the table'\nWHERE condition    -- 'where condition is met'\nORDER BY column    -- 'sorted by'\nLIMIT 10;          -- 'only first 10 rows'\n```\n\n**Real example — Managing a classroom:**\n```sql\n-- 'Show me names and Math scores of class 10A1, highest first'\nSELECT name, math_score\nFROM students\nWHERE class = '10A1'\nORDER BY math_score DESC;\n```\n\n**📊 Key commands:**\n| Command | Meaning | Real-life example |\n|---|---|---|\n| SELECT | Choose columns | 'Show me name and phone' |\n| WHERE | Filter by condition | 'Only those over 18' |\n| ORDER BY | Sort results | 'Highest score first' |\n| GROUP BY | Group data | 'Count students per class' |\n| HAVING | Filter after grouping | 'Only classes with 30+ students' |\n| LIMIT | Cap results | 'Top 5 only' |",
        code: `-- Create the students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    class VARCHAR(10),
    math_score DECIMAL(4,2),
    literature_score DECIMAL(4,2),
    english_score DECIMAL(4,2)
);

-- Insert data
INSERT INTO students (full_name, class, math_score, literature_score, english_score) VALUES
('Nguyen An', '10A1', 9.0, 8.5, 7.5),
('Tran Binh', '10A1', 7.0, 9.0, 8.0),
('Le Chi', '10A2', 8.5, 7.0, 9.5);

-- Basic query
SELECT full_name, math_score FROM students WHERE math_score >= 8.0;

-- Calculate average score by class
SELECT class,
       AVG(math_score) AS avg_math,
       AVG(literature_score) AS avg_literature
FROM students
GROUP BY class
ORDER BY avg_math DESC;`,
        codeLanguage: "sql",
        exercise: "Write a query: (1) Find 3 students with the highest average score, (2) Count the number of students in each class, (3) Find students with Math scores above the class average.",
        exerciseEn: "Write queries: (1) Find top 3 students by average score, (2) Count students per class, (3) Find students with Math above class average.",
        quiz: [
          { question: "Which command is used to filter data based on a condition?", options: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"], answer: 1, explanation: "WHERE is used to filter rows that satisfy a condition before returning the result." },
          { question: "What does AVG() calculate?", options: ["Sum", "Count", "Average", "Maximum value"], answer: 2, explanation: "AVG() (Average) calculates the average value of a numeric column." },
          { question: "What is the correct order of SQL clause execution?", options: ["SELECT → FROM → WHERE", "FROM → WHERE → SELECT", "WHERE → SELECT → FROM", "SELECT → WHERE → FROM"], answer: 1, explanation: "SQL execution: FROM (table identification) -> WHERE (filter) -> GROUP BY -> HAVING -> SELECT (column selection) -> ORDER BY -> LIMIT." },
          { question: "What is DISTINCT used for in SELECT?", options: ["Sort results", "Remove duplicate rows", "Count rows", "Limit results"], answer: 1, explanation: "SELECT DISTINCT removes rows with identical values, keeping only unique values." },
          { question: "What does NULL mean in SQL?", options: ["The number 0", "An empty string ''", "Undefined value/missing data", "False"], answer: 2, explanation: "NULL represents an unknown or missing value. NULL is different from 0, different from an empty string, and NULL = NULL also returns NULL!" },
        ],
      },
      {
        id: "sql-2",
        title: "JOIN and relationships between tables",
        titleEn: "JOINs and Table Relationships",
        theory: "**JOIN** kết nối dữ liệu từ nhiều bảng — giống **ghép 2 mảnh puzzle** lại với nhau 🧩!\n\n**Tại sao cần JOIN?** Trong thực tế, dữ liệu nằm rải rác ở nhiều bảng:\n- Bảng `khách_hàng`: tên, SĐT, địa chỉ\n- Bảng `đơn_hàng`: sản phẩm, giá, ngày mua\n- JOIN = 'Ghép tên khách hàng vào đơn hàng'\n\n**🎨 Minh họa bằng hình — 4 loại JOIN:**\n```\nBảng A (Khách hàng)    Bảng B (Đơn hàng)\n┌──────────┐            ┌──────────┐\n│ An       │────────────│ Laptop   │  ← An mua Laptop\n│ Bình     │            │ Phone    │  ← Bình mua Phone  \n│ Chi ❌   │            │ Tablet ❌│  ← Tablet chưa ai mua\n└──────────┘            └──────────┘\n  Chi chưa mua gì        Tablet không có người mua\n```\n\n**INNER JOIN** — Chỉ lấy **khớp cả 2 bên** (An+Laptop, Bình+Phone):\n→ Chi bị loại (chưa mua), Tablet bị loại (không ai mua)\n\n**LEFT JOIN** — **Tất cả khách hàng** + đơn hàng (nếu có):\n→ Chi vẫn xuất hiện nhưng đơn hàng = NULL\n→ Dùng khi muốn biết 'Ai CHƯA mua gì?'\n\n**RIGHT JOIN** — Tất cả đơn hàng + khách hàng (nếu có):\n→ Tablet xuất hiện nhưng khách hàng = NULL\n\n**FULL OUTER JOIN** — **Tất cả từ cả 2 bảng**, khớp hoặc không.\n\n**🔑 Foreign Key — Chìa khóa kết nối:**\nGiống **mã học sinh** in trên cả thẻ thư viện và bảng điểm → dùng mã này để ghép 2 bảng!\n```sql\nSELECT kh.ten, dh.san_pham\nFROM khach_hang kh\nINNER JOIN don_hang dh ON kh.id = dh.khach_hang_id;\n--                       ↑ 'Nơi khớp nhau'\n```",
        theoryEn: "**JOIN** connects data from multiple tables — like **fitting 2 puzzle pieces** together 🧩!\n\n**Why JOIN?** In practice, data lives in separate tables:\n- `customers` table: name, phone, address\n- `orders` table: product, price, date\n- JOIN = 'Attach customer name to their order'\n\n**🎨 Visual illustration — 4 JOIN types:**\n```\nTable A (Customers)    Table B (Orders)\n┌──────────┐            ┌──────────┐\n│ An       │────────────│ Laptop   │  ← An bought Laptop\n│ Binh     │            │ Phone    │  ← Binh bought Phone  \n│ Chi ❌   │            │ Tablet ❌│  ← Nobody bought Tablet\n└──────────┘            └──────────┘\n  Chi hasn't bought       Tablet has no buyer\n```\n\n**INNER JOIN** — Only **matching rows** (An+Laptop, Binh+Phone):\n→ Chi excluded (no orders), Tablet excluded (no buyer)\n\n**LEFT JOIN** — **All customers** + orders (if any):\n→ Chi still appears but order = NULL\n→ Use when you want to know 'Who HASN'T bought anything?'\n\n**RIGHT JOIN** — All orders + customers (if any):\n→ Tablet appears but customer = NULL\n\n**FULL OUTER JOIN** — **Everything from both tables**, matched or not.\n\n**🔑 Foreign Key — The linking key:**\nLike a **student ID** printed on both library card and report card → use this ID to join 2 tables!\n```sql\nSELECT c.name, o.product\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;\n--                    ↑ 'Where they match'\n```",
        code: `-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    product VARCHAR(100),
    quantity INT,
    price DECIMAL(10,2),
    order_date DATE DEFAULT CURRENT_DATE
);

-- INNER JOIN: Order with customer name
SELECT c.full_name, o.product, o.price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;

-- LEFT JOIN: All customers (including those who have not yet purchased)
SELECT c.full_name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.full_name;

-- Subquery: Customer who spends the most
SELECT full_name FROM customers
WHERE id = (
    SELECT customer_id FROM orders
    GROUP BY customer_id
    ORDER BY SUM(price * quantity) DESC
    LIMIT 1
);`,
        codeLanguage: "sql",
        exercise: "Create 3 tables (student_student, subject_school, grade_thi) and write a JOIN query to get the full transcript.",
        exerciseEn: "Create 3 tables (students, courses, exam_scores) and write JOIN queries to get a complete grade report.",
        quiz: [
          { question: "What does LEFT JOIN return?", options: ["Only matching rows", "All from left table + matches from right", "All from right table", "No rows"], answer: 1, explanation: "LEFT JOIN returns ALL rows from the left table, and matching rows from the right table (NULL if no match)." },
          { question: "What is a Foreign Key used for?", options: ["Encrypt data", "Link between 2 tables", "Create an index", "Delete data"], answer: 1, explanation: "A Foreign Key creates a relational constraint between two tables, ensuring data integrity." },
          { question: "Which rows does INNER JOIN return?", options: ["All from the left table", "All from both tables", "Only rows that match in both tables", "Only from the right table"], answer: 2, explanation: "INNER JOIN only returns rows where values match in both tables. Unmatched rows are excluded." },
          { question: "What is a Self JOIN?", options: ["Joining a table with itself", "Joining without ON", "Joining 3 or more tables", "Automatic join"], answer: 0, explanation: "A Self JOIN is when a table joins with itself, often using different aliases. Example: finding employees and managers in the same table." },
          { question: "What result does a CROSS JOIN produce?", options: ["Only matching rows", "Cartesian product — each row of table A paired with each row of table B", "Union of two tables", "Intersection of two tables"], answer: 1, explanation: "CROSS JOIN creates a Cartesian product: if table A has m rows and table B has n rows, the result has m×n rows." },
        ],
      },
      {
        id: "sql-3",
        title: "Aggregate functions & GROUP BY",
        titleEn: "Aggregate Functions & GROUP BY",
        theory: "**Hàm tổng hợp (Aggregate Functions):**\n- COUNT(): Đếm số hàng\n- SUM(): Tính tổng\n- AVG(): Trung bình\n- MIN() / MAX(): Giá trị nhỏ/lớn nhất\n\n**GROUP BY:** Nhóm dữ liệu để tính tổng hợp theo nhóm\n**HAVING:** Lọc sau khi GROUP BY (WHERE lọc trước GROUP BY)\n\n**Thứ tự thực thi:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
        theoryEn: "**Aggregate Functions:**\n- COUNT(): Count rows\n- SUM(): Calculate total\n- AVG(): Average\n- MIN() / MAX(): Smallest/largest value\n\n**GROUP BY:** Group data for aggregate calculations\n**HAVING:** Filter after GROUP BY (WHERE filters before GROUP BY)\n\n**Execution order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
        code: `-- Revenue by product category
SELECT
    category,
    COUNT(*) AS order_count,
    SUM(price * quantity) AS total_revenue,
    AVG(price) AS avg_price,
    MAX(price) AS max_price
FROM orders
GROUP BY category
HAVING SUM(price * quantity) > 1000000
ORDER BY total_revenue DESC;

-- Score statistics by class
SELECT
    class,
    COUNT(*) AS class_size,
    ROUND(AVG(math_score), 2) AS avg_math,
    ROUND(AVG(literature_score), 2) AS avg_literature,
    MIN(math_score) AS lowest_score,
    MAX(math_score) AS highest_score
FROM students
GROUP BY class
ORDER BY avg_math DESC;`,
        codeLanguage: "sql",
        exercise: "Write a statistical query: (1) Top 5 best-selling products, (2) Average monthly revenue, (3) Category with more than 10 orders.",
        exerciseEn: "Write statistical queries: (1) Top 5 best-selling products, (2) Average monthly revenue, (3) Categories with more than 10 orders.",
        quiz: [
          { question: "How does HAVING differ from WHERE?", options: ["No difference", "HAVING filters after GROUP BY", "HAVING is faster", "WHERE is not used with SELECT"], answer: 1, explanation: "WHERE filters data BEFORE grouping, HAVING filters AFTER GROUP BY has executed." },
          { question: "What does COUNT(*) count?", options: ["Only non-NULL values", "All rows including NULLs", "Only unique values", "Only column count"], answer: 1, explanation: "COUNT(*) counts ALL rows, including NULLs. COUNT(column) only counts NOT NULL values." },
          { question: "What does SUM(NULL) return?", options: ["0", "NULL", "Error", "False"], answer: 1, explanation: "Aggregate functions ignore NULLs. If all values are NULL, SUM returns NULL, not 0." },
          { question: "Can an alias (AS) be used in WHERE?", options: ["Yes, always", "No, because WHERE executes before SELECT", "Only with numbers", "Only in subqueries"], answer: 1, explanation: "WHERE executes BEFORE SELECT, so the alias is not yet known. You must use HAVING or rewrite the original expression." },
          { question: "What does GROUP BY multiple columns mean?", options: ["Group by the first column", "Create groups based on the combination of values from all columns", "Syntax error", "Only group by the last column"], answer: 1, explanation: "GROUP BY col1, col2 creates groups for each unique combination of (col1, col2), e.g., (class, gender)." },
        ],
      },
      {
        id: "sql-4",
        title: "Subquery & CTE",
        titleEn: "Subqueries & CTEs",
        theory: "**Subquery (Truy vấn con):** Truy vấn lồng bên trong truy vấn khác.\n- Scalar subquery: Trả về 1 giá trị\n- Table subquery: Trả về bảng\n- Correlated subquery: Tham chiếu bảng ngoài\n\n**CTE (Common Table Expression):**\n- Tạo bảng tạm với WITH\n- Code dễ đọc hơn subquery\n- Có thể đệ quy (Recursive CTE)",
        theoryEn: "**Subquery:** A query nested inside another query.\n- Scalar: Returns 1 value\n- Table: Returns a table\n- Correlated: References outer table\n\n**CTE (Common Table Expression):**\n- Create temp table with WITH\n- More readable than subqueries\n- Can be recursive",
        code: `-- Subquery: Students with above-average scores
SELECT full_name, math_score
FROM students
WHERE math_score > (
    SELECT AVG(math_score) FROM students
);

-- CTE: Student ranking
WITH ranking AS (
    SELECT
        full_name,
        math_score,
        RANK() OVER (ORDER BY math_score DESC) AS rank_position
    FROM students
)
SELECT * FROM ranking WHERE rank_position <= 5;

-- Recursive CTE: Generate a date series
WITH RECURSIVE date_series AS (
    SELECT DATE '2024-01-01' AS d
    UNION ALL
    SELECT d + 1 FROM date_series WHERE d < '2024-01-07'
)
SELECT d AS day_of_week FROM date_series;`,
        codeLanguage: "sql",
        exercise: "Use CTE to write queries: (1) Top 3 customers spending the most, (2) Compare revenue this month vs last month.",
        exerciseEn: "Use CTE to write: (1) Top 3 highest-spending customers, (2) Compare this month vs last month revenue.",
        quiz: [
          { question: "Which keyword is used to declare a CTE?", options: ["CREATE TEMP", "WITH", "DECLARE", "DEFINE"], answer: 1, explanation: "CTE uses the WITH keyword to define a temporary table, which is more readable than subqueries." },
          { question: "What is the Window Function RANK() used for?", options: ["Delete duplicate data", "Rank rows", "Create an index", "Join tables"], answer: 1, explanation: "RANK() ranks rows based on ORDER BY, allowing you to find top N without needing GROUP BY." },
          { question: "How does a correlated subquery differ from a regular subquery?", options: ["Faster", "References columns from the outer query", "Only used in INSERT", "Does not require WHERE"], answer: 1, explanation: "A correlated subquery references columns from a table in the outer query, so it is re-executed for each row of the outer query." },
          { question: "What components are needed for a recursive CTE?", options: ["Only UNION is needed", "Base case + UNION ALL + recursive step", "Only SELECT is needed", "JOIN is mandatory"], answer: 1, explanation: "A recursive CTE consists of: a base case (starting point) + UNION ALL + the recursive part referencing the CTE itself." },
          { question: "Does a CTE permanently save its results in the database?", options: ["Yes, like creating a table", "No, it only exists within the scope of that query", "Yes, until restart", "Depends on the database"], answer: 1, explanation: "A CTE is just a temporary table that exists within the scope of the query that contains it, not saved to the database." },
        ],
      },
      {
        id: "sql-5",
        title: "Index & Query Optimization",
        titleEn: "Indexing & Query Optimization",
        theory: "**Index** giống mục lục sách — giúp tìm kiếm nhanh hơn.\n\n**Loại Index:**\n- B-tree: Mặc định, tốt cho =, <, >, BETWEEN\n- Hash: Chỉ tốt cho =\n- GIN: Cho mảng, full-text search\n- GiST: Cho dữ liệu không gian\n\n**Khi nào tạo Index:**\n- Cột WHERE, JOIN, ORDER BY thường xuyên\n- Cột có tính chọn lọc cao (nhiều giá trị khác nhau)\n\n**EXPLAIN ANALYZE:** Phân tích kế hoạch truy vấn",
        theoryEn: "**Index** is like a book index — speeds up lookups.\n\n**Index Types:**\n- B-tree: Default, good for =, <, >, BETWEEN\n- Hash: Only good for =\n- GIN: For arrays, full-text search\n- GiST: For spatial data\n\n**When to create Index:**\n- Frequently used WHERE, JOIN, ORDER BY columns\n- High cardinality columns\n\n**EXPLAIN ANALYZE:** Analyze query plan",
        code: `-- Create an index on frequently searched columns
CREATE INDEX idx_students_class ON students(class);
CREATE INDEX idx_orders_date ON orders(order_date);

-- Composite index (multiple columns)
CREATE INDEX idx_students_class_score ON students(class, math_score);

-- Analyze the query plan
EXPLAIN ANALYZE
SELECT * FROM students WHERE class = '10A1';

-- Comparison: Without index vs with index
-- Seq Scan (sequential scan): O(n) - slow
-- Index Scan: O(log n) - fast

-- Optimization: Avoid SELECT *
-- ❌ Slow
SELECT * FROM orders WHERE order_date > '2024-01-01';
-- ✅ Fast
SELECT id, product, price FROM orders WHERE order_date > '2024-01-01';

-- Optimization: Use EXISTS instead of IN for large subqueries
-- ❌ Slow on large tables
SELECT * FROM students WHERE class IN (SELECT class FROM classes WHERE class_size > 30);
-- ✅ Faster
SELECT * FROM students s WHERE EXISTS (
    SELECT 1 FROM classes c WHERE c.class = s.class AND c.class_size > 30
);`,
        codeLanguage: "sql",
        exercise: "Create a table of 10,000 rows, compare query speed before/after creating index. Use EXPLAIN ANALYZE.",
        exerciseEn: "Create a 10,000-row table, compare query speed before/after indexing. Use EXPLAIN ANALYZE.",
        quiz: [
          { question: "Why should you not create indexes on every column?", options: ["Runs out of space", "Slows down INSERT/UPDATE", "No reason", "Indexes are not good"], answer: 1, explanation: "Indexes speed up reads but SLOW DOWN writes (INSERT/UPDATE/DELETE) because the index must also be updated." },
          { question: "What is EXPLAIN ANALYZE used for?", options: ["Delete data", "Create a new table", "Analyze query performance", "Backup database"], answer: 2, explanation: "EXPLAIN ANALYZE runs the actual query and displays the execution plan + time, helping with optimization." },
          { question: "Does a composite index on (A, B) support a WHERE B = ? query?", options: ["Yes, always", "No, it only supports when column A is present first", "Only if B is a number", "Depends on the database engine"], answer: 1, explanation: "A composite index follows the leftmost prefix rule. An index (A,B) supports WHERE A=? and WHERE A=? AND B=? but does NOT support WHERE B=? alone." },
          { question: "What is a covering index?", options: ["An index containing enough columns to answer the query without reading the base table", "An index on all columns", "An automatically created index", "An index for large tables"], answer: 0, explanation: "A covering index contains all columns necessary for the query; the database only needs to read the index without going back to the table (Index-Only Scan)." },
          { question: "When is a partial index (WHERE in CREATE INDEX) useful?", options: ["Always", "When querying only a small subset of data meeting a condition", "When the table is small", "When using LIKE"], answer: 1, explanation: "A partial index only indexes rows that satisfy a condition, making the index smaller and faster for queries filtering by that condition." },
        ],
      },
      {
        id: "sql-6",
        title: "Transaction & Data Security",
        titleEn: "Transactions & Data Security",
        theory: "**Transaction** đảm bảo tính toàn vẹn dữ liệu (ACID):\n- Atomicity: Tất cả hoặc không gì cả\n- Consistency: Dữ liệu luôn hợp lệ\n- Isolation: Các transaction độc lập\n- Durability: Thay đổi được lưu vĩnh viễn\n\n**Row Level Security (RLS):**\n- Kiểm soát truy cập ở cấp hàng\n- Mỗi user chỉ thấy dữ liệu của mình\n\n**SQL Injection:** Luôn dùng parameterized queries!",
        theoryEn: "**Transaction** ensures data integrity (ACID):\n- Atomicity: All or nothing\n- Consistency: Data always valid\n- Isolation: Transactions independent\n- Durability: Changes persist\n\n**Row Level Security (RLS):**\n- Control access at row level\n- Each user sees only their data\n\n**SQL Injection:** Always use parameterized queries!",
        code: `-- Transaction: Safe money transfer
BEGIN;
UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
UPDATE accounts SET balance = balance + 500000 WHERE id = 2;
-- Check: do not allow a negative balance
DO $$
BEGIN
    IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
        RAISE EXCEPTION 'Insufficient balance!';
    END IF;
END $$;
COMMIT;

-- Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own notes" ON notes
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users create own notes" ON notes
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- ❌ SQL Injection is dangerous
-- query = f"SELECT * FROM users WHERE name = '{input}'"
-- ✅ Safe: Parameterized query
-- query = "SELECT * FROM users WHERE name = $1"`,
        codeLanguage: "sql",
        exercise: "Write a transaction to transfer points between 2 students (subtract point A, add point B). Add RLS policy to the worksheet.",
        exerciseEn: "Write a transaction to transfer points between 2 students. Add RLS policy for assignments table.",
        quiz: [
          { question: "In ACID transactions, what does the letter A stand for?", options: ["Accuracy", "Atomicity", "Authorization", "Availability"], answer: 1, explanation: "Atomicity: a transaction must complete ENTIRELY or ROLLBACK entirely, with no intermediate state." },
          { question: "What is SQL Injection?", options: ["A way to optimize SQL", "A security vulnerability when embedding input directly into SQL", "A special type of index", "An aggregate function"], answer: 1, explanation: "SQL Injection occurs when an attacker inserts malicious SQL code via input. Prevent with parameterized queries." },
          { question: "try...except...finally, when does the finally block execute?", options: ["Only when there's an error", "Only when there's no error", "Always, whether there's an error or not", "Only when using return"], answer: 2, explanation: "finally ALWAYS executes whether an exception occurs or not, often used for resource cleanup (closing files, databases)." },
          { question: "What is the benefit of `with open('file.txt') as f:`?", options: ["Faster reading", "Automatically closes the file when done, even if there are errors", "Encrypts the file", "Creates a new file"], answer: 1, explanation: "The context manager (`with`) ensures the file is automatically closed upon exiting the `with` block, even if an exception occurs." },
          { question: "How does the `@staticmethod` decorator differ from `@classmethod`?", options: ["No difference", "A staticmethod does not receive self or cls, a classmethod receives cls", "A staticmethod is faster", "A classmethod is only used for inheritance"], answer: 1, explanation: "@staticmethod cannot access the instance or the class. @classmethod receives `cls` as its first argument and can access class attributes." },
        ],
      },
    ],
  },
  {
    id: "prog-data-pipeline",
    title: "Data Pipeline (ETL/ELT)",
    titleEn: "Data Pipeline (ETL/ELT)",
    icon: "🔄",
    color: "from-amber-500/20 to-orange-500/20",
    description: "Collect, process and store data automatically",
    descriptionEn: "Automated data collection, processing and storage",
    course: "data-ai",
    lessons: [
      {
        id: "etl-1",
        title: "ETL vs ELT & Basic Pandas",
        titleEn: "ETL vs ELT & Pandas Basics",
        theory: "**ETL (Extract-Transform-Load):**\n1. Extract: Lấy dữ liệu từ nguồn (CSV, API, database)\n2. Transform: Làm sạch, chuyển đổi\n3. Load: Nạp vào kho dữ liệu\n\n**ELT** - Load trước, Transform sau (phù hợp cloud)\n\n**Pandas** - Thư viện Python #1 cho phân tích dữ liệu:\n- DataFrame: bảng dữ liệu 2 chiều\n- Series: cột dữ liệu 1 chiều",
        theoryEn: "**ETL (Extract-Transform-Load):**\n1. Extract: Get data from sources (CSV, API, database)\n2. Transform: Clean, convert\n3. Load: Insert into data warehouse\n\n**ELT** - Load first, Transform later (cloud-friendly)\n\n**Pandas** - Python's #1 data analysis library:\n- DataFrame: 2D data table\n- Series: 1D data column",
        code: `import pandas as pd

# EXTRACT: Read CSV data
df = pd.read_csv("doanh_thu.csv")

# Or create from dictionary
data = {
    "Product": ["Laptop", "Phone", "Tablet", "Tai nghe", "Keyboard"],
    "Quantity": [120, 350, 200, 500, 180],
    "Unit price": [15000000, 8000000, 12000000, 500000, 1200000],
    "Month": ["T1", "T1", "T2", "T2", "T3"]
}
df = pd.DataFrame(data)

# TRANSFORM: Calculate revenue
df["Doanh thu"] = df["Quantity"] * df["Unit price"]

# Filter products with revenue > 1 billion
hot = df[df["Doanh thu"] > 1_000_000_000]
print("🔥 Hot products:\n", hot)

# Statistics by month
monthly = df.groupby("Month")["Doanh thu"].sum()
print("\\n📊 Revenue by month:\n", monthly)

# LOAD: Export results
df.to_csv("ket_qua.csv", index=False)
print("\\n✅ Saved file result_qua.csv")`,
        codeLanguage: "python",
        exercise: "Download the sample CSV file (3 months sales) and perform: (1) Clean null data, (2) Calculate revenue by category, (3) Draw matplotlib chart.",
        exerciseEn: "Load sample CSV (3-month sales) and: (1) Clean null data, (2) Calculate revenue by category, (3) Create matplotlib chart.",
        quiz: [
          { question: "What does ETL stand for?", options: ["Edit-Transfer-Link", "Extract-Transform-Load", "Export-Test-Log", "Enter-Track-List"], answer: 1, explanation: "ETL = Extract - Transform - Load." },
          { question: "What does a Pandas DataFrame most resemble?", options: ["A 1D array", "An Excel spreadsheet", "File JSON", "A binary tree"], answer: 1, explanation: "A DataFrame is a 2D data table with rows and columns, similar to an Excel spreadsheet." },
          { question: "What syntax is used for multiple inheritance in Python?", options: ["class C extends A, B", "class C(A, B):", "class C inherits A, B", "class C = A + B"], answer: 1, explanation: "Python supports multiple inheritance using the syntax `class Child(Parent1, Parent2):` — following the MRO (Method Resolution Order)." },
          { question: "What is the magic method `__str__` used for?", options: ["Converts an object to a number", "Defines how an object is displayed when print() is used", "Deletes an object", "Compares two objects"], answer: 1, explanation: "`__str__` returns a string representation of the object, automatically called when `print()` or `str()` is used." },
          { question: "What is the `@property` decorator used for?", options: ["Creates a static variable", "Accesses a method like an attribute (without parentheses)", "Protects a variable from being deleted", "Creates a constructor"], answer: 1, explanation: "@property allows calling a method as an attribute: `obj.name` instead of `obj.get_name()`, helping to control getters/setters." },
        ],
      },
      {
        id: "etl-2",
        title: "API & Web Scraping",
        titleEn: "API & Web Scraping",
        theory: "**API (Application Programming Interface):** Cổng giao tiếp giữa các hệ thống.\n\n**REST API:** Giao thức phổ biến nhất\n- GET: Lấy dữ liệu\n- POST: Gửi dữ liệu mới\n- PUT: Cập nhật\n- DELETE: Xóa\n\n**Web Scraping:** Thu thập dữ liệu từ website\n- BeautifulSoup: Parse HTML\n- Selenium: Trang web động",
        theoryEn: "**API (Application Programming Interface):** Communication gateway between systems.\n\n**REST API:** Most popular protocol\n- GET: Retrieve data\n- POST: Send new data\n- PUT: Update\n- DELETE: Remove\n\n**Web Scraping:** Collect data from websites\n- BeautifulSoup: Parse HTML\n- Selenium: Dynamic pages",
        code: `import requests
import json

# Call the public API
url = "https://jsonplaceholder.typicode.com/posts"
response = requests.get(url)
posts = response.json()

print(f"Total posts: {len(posts)}")
for post in posts[:3]:
    print(f"  📝 {post['title'][:50]}...")

# Web Scraping with BeautifulSoup
from bs4 import BeautifulSoup

html = "<html><body><h1>Title</h1><p>Content</p></body></html>"
soup = BeautifulSoup(html, 'html.parser')
print(f"\\nTitle: {soup.h1.text}")
print(f"Content: {soup.p.text}")`,
        codeLanguage: "python",
        exercise: "Call weather API (OpenWeatherMap) to get temperature of 5 cities, save to DataFrame and export CSV.",
        exerciseEn: "Call weather API (OpenWeatherMap) for 5 cities' temperatures, save to DataFrame and export CSV.",
        quiz: [
          { question: "What is HTTP GET used for?", options: ["Delete data", "Sending new data", "Retrieving data", "Updating data"], answer: 2, explanation: "A GET request is used to retrieve/read data from the server." },
          { question: "Which library is commonly used for reading/writing CSV files in Python?", options: ["numpy", "pandas", "matplotlib", "flask"], answer: 1, explanation: "pandas provides `pd.read_csv()` and `df.to_csv()` — the most powerful tools for handling CSV files with DataFrames." },
          { question: "What does `DataFrame.head(3)` return?", options: ["The first 3 columns", "The first 3 rows", "The 3 largest values", "The last 3 rows"], answer: 1, explanation: "`head(n)` returns the first `n` rows of the DataFrame. By default, `n=5` if no parameter is passed." },
          { question: "Which syntax is used to filter a DataFrame based on a condition?", options: ["df.filter(col > 5)", "df[df['col'] > 5]", "df.where(col, 5)", "df.select(col > 5)"], answer: 1, explanation: "Boolean indexing `df[df['col'] > 5]` creates a True/False mask and filters rows that satisfy the condition." },
          { question: "What does `df.groupby('city').mean()` do?", options: ["Sorts by city", "Calculates the mean of all numeric columns per city", "Counts the number of cities", "Deletes the city column"], answer: 1, explanation: "`groupby().mean()` groups data by the 'city' column, then calculates the mean value for each numeric column within each group." },
        ],
      },
      {
        id: "etl-3",
        title: "Advanced data processing with Pandas",
        titleEn: "Advanced Data Processing with Pandas",
        theory: "**Kỹ thuật nâng cao:**\n- merge(): Nối 2 DataFrame (giống SQL JOIN)\n- pivot_table(): Bảng tổng hợp\n- apply(): Áp dụng hàm tùy chỉnh\n- fillna() / dropna(): Xử lý missing data\n\n**Method chaining:** Nối nhiều thao tác liên tục cho code gọn gàng.",
        theoryEn: "**Advanced techniques:**\n- merge(): Join 2 DataFrames (like SQL JOIN)\n- pivot_table(): Summary table\n- apply(): Apply custom functions\n- fillna() / dropna(): Handle missing data\n\n**Method chaining:** Chain multiple operations for clean code.",
        code: `import pandas as pd

# Merge DataFrames
orders = pd.DataFrame({
    'order_id': [1, 2, 3],
    'customer': ['An', 'Binh', 'Chi'],
    'amount': [500000, 1200000, 800000]
})
products = pd.DataFrame({
    'order_id': [1, 2, 3],
    'product': ['Laptop', 'Phone', 'Tablet']
})
merged = orders.merge(products, on='order_id')
print(merged)

# Pivot Table
sales = pd.DataFrame({
    'Month': ['T1','T1','T2','T2','T3','T3'],
    'Category': ['A','B','A','B','A','B'],
    'Revenue': [100, 200, 150, 180, 220, 190]
})
pivot = sales.pivot_table(values='Revenue', index='Month', columns='Category', aggfunc='sum')
print(pivot)`,
        codeLanguage: "python",
        exercise: "Download Titanic dataset, clean data, create pivot table according to Pclass and Sex, calculate survival rate.",
        exerciseEn: "Load Titanic dataset, clean data, create pivot table by Pclass and Sex, calculate survival rate.",
        quiz: [
          { question: "Which SQL command is `merge()` in Pandas most similar to?", options: ["SELECT", "WHERE", "JOIN", "GROUP BY"], answer: 2, explanation: "`pd.merge()` connects two DataFrames based on common columns, similar to JOIN in SQL." },
          { question: "What does `df.dropna()` do?", options: ["Deletes columns with NULL values", "Deletes rows containing NaN values", "Replaces NULL with 0", "Counts the number of NULLs"], answer: 1, explanation: "`dropna()` deletes rows that contain at least one NaN value. Use `dropna(axis=1)` to delete columns, `fillna()` to replace." },
          { question: "Which method is commonly used to detect outliers?", options: ["Counting NULLs", "IQR (Interquartile Range) or Z-score", "Alphabetical sorting", "Checking data type"], answer: 1, explanation: "IQR: outliers are outside Q1-1.5*IQR and Q3+1.5*IQR. Z-score: outliers have |z| > 3 (more than 3 standard deviations from the mean)." },
          { question: "What does `df.duplicated()` return?", options: ["The number of duplicates", "A Boolean Series marking duplicate rows", "A non-duplicated DataFrame", "An error if there are duplicates"], answer: 1, explanation: "`duplicated()` returns a True/False Series, with True for duplicate rows. Use `drop_duplicates()` to remove them." },
          { question: "What does `df.fillna(method='ffill')` mean?", options: ["Fills NaN with 0", "Fills values from the previous row (forward fill)", "Fills with the mean", "Deletes NaN"], answer: 1, explanation: "`ffill` (forward fill) fills NaN values with the nearest valid value preceding them — useful for time series data." },
        ],
      },
      {
        id: "etl-4",
        title: "Airflow & Pipeline Automation",
        titleEn: "Airflow & Pipeline Automation",
        theory: "**Apache Airflow:** Nền tảng tự động hóa workflow\n- DAG (Directed Acyclic Graph): Định nghĩa luồng công việc\n- Task: Đơn vị công việc nhỏ nhất\n- Operator: Loại task (Python, Bash, SQL)\n- Schedule: Lập lịch chạy tự động\n\n**Lợi ích:** Theo dõi, retry tự động, alert khi lỗi",
        theoryEn: "**Apache Airflow:** Workflow automation platform\n- DAG (Directed Acyclic Graph): Define workflow\n- Task: Smallest work unit\n- Operator: Task type (Python, Bash, SQL)\n- Schedule: Automatic scheduling\n\n**Benefits:** Monitoring, auto-retry, error alerts",
        code: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

def extract():
    print("📥 Extracting data from API...")
    return {"records": 1000}

def transform(**context):
    data = context['ti'].xcom_pull(task_ids='extract')
    print(f"🔄 Transforming {data['records']} records...")

def load(**context):
    print("📤 Loading to data warehouse...")
    print("✅ Pipeline complete!")

dag = DAG(
    'daily_etl',
    start_date=datetime(2024, 1, 1),
    schedule_interval='@daily',
    catchup=False,
)

t1 = PythonOperator(task_id='extract', python_callable=extract, dag=dag)
t2 = PythonOperator(task_id='transform', python_callable=transform, dag=dag)
t3 = PythonOperator(task_id='load', python_callable=load, dag=dag)

t1 >> t2 >> t3  # Extract → Transform → Load`,
        codeLanguage: "python",
        exercise: "Design a DAG that collects daily stock prices, averages 7 days, and saves to the database.",
        exerciseEn: "Design a DAG to collect daily stock prices, calculate 7-day average, save to database.",
        quiz: [
          { question: "What does DAG stand for?", options: ["Data Analysis Graph", "Directed Acyclic Graph", "Database Access Gateway", "Dynamic API Generator"], answer: 1, explanation: "DAG = Directed Acyclic Graph, describes a workflow." },
          { question: "What does ETL stand for?", options: ["Extract, Transfer, Load", "Extract, Transform, Load", "Execute, Test, Launch", "Export, Transform, Link"], answer: 1, explanation: "ETL = Extract → Transform → Load — a standard process for moving and processing data." },
          { question: "What does Airflow use a DAG to describe?", options: ["Database structure", "Workflow and dependencies between tasks", "User interface", "Python source code"], answer: 1, explanation: "A DAG (Directed Acyclic Graph) in Airflow describes tasks and their execution order." },
          { question: "What does the >> operator in an Airflow DAG mean?", options: ["Right bit shift", "The left task runs BEFORE the right task", "Greater than comparison", "String concatenation"], answer: 1, explanation: "t1 >> t2 means t1 must complete before t2 starts — defining dependencies between tasks." },
          { question: "When does the '@daily' schedule in Airflow run?", options: ["Every hour", "Every day at 00:00 UTC", "Every week", "Every minute"], answer: 1, explanation: "@daily = runs once every day at midnight UTC. Other presets: @hourly, @weekly, @monthly." },
        ],
      },
      {
        id: "etl-5",
        title: "Data Warehouse & Data Lake",
        titleEn: "Data Warehouse & Data Lake",
        theory: "**Data Warehouse:** Kho dữ liệu có cấu trúc, tối ưu cho phân tích\n- Schema-on-write: Cấu trúc trước khi lưu\n- Star Schema / Snowflake Schema\n\n**Data Lake:** Lưu trữ mọi loại dữ liệu (thô)\n- Schema-on-read: Cấu trúc khi đọc\n- Lưu file CSV, JSON, Parquet, hình ảnh...\n\n**Data Lakehouse:** Kết hợp cả hai (Delta Lake, Apache Iceberg)",
        theoryEn: "**Data Warehouse:** Structured data storage, optimized for analytics\n- Schema-on-write: Structure before storing\n- Star Schema / Snowflake Schema\n\n**Data Lake:** Store all data types (raw)\n- Schema-on-read: Structure when reading\n- Store CSV, JSON, Parquet, images...\n\n**Data Lakehouse:** Combines both (Delta Lake, Apache Iceberg)",
        code: `# Star Schema Example
# Fact Table: sales_fact
# Dimension Tables: dim_product, dim_time, dim_store

# Simulating Star Schema with Python
fact_sales = [
    {"date_id": 1, "product_id": 101, "store_id": 1, "quantity": 5, "revenue": 500000},
    {"date_id": 1, "product_id": 102, "store_id": 2, "quantity": 3, "revenue": 900000},
    {"date_id": 2, "product_id": 101, "store_id": 1, "quantity": 8, "revenue": 800000},
]

dim_product = {101: "Laptop", 102: "Phone"}
dim_store = {1: "HCM", 2: "HN"}
dim_time = {1: "2024-01-15", 2: "2024-01-16"}

# Query: Revenue by store
from collections import defaultdict
store_revenue = defaultdict(int)
for sale in fact_sales:
    store = dim_store[sale["store_id"]]
    store_revenue[store] += sale["revenue"]

for store, rev in store_revenue.items():
    print(f"🏪 {store}: {rev:,.0f} VND")`,
        codeLanguage: "python",
        exercise: "Design Star Schema for e-commerce system with 1 Fact table and 4 Dimension tables. Write analytical queries.",
        exerciseEn: "Design a Star Schema for e-commerce with 1 Fact and 4 Dimension tables. Write analytical queries.",
        quiz: [
          { question: "How does a Data Lake differ from a Data Warehouse?", options: ["Only stores SQL", "Stores raw data in all formats", "Only stores images", "Faster"], answer: 1, explanation: "A Data Lake stores raw data in all formats, while a Data Warehouse only stores structured data." },
          { question: "How many main types of tables does a Star Schema have?", options: ["1 type", "2 types: Fact and Dimension", "3 types", "4 types"], answer: 1, explanation: "A Star Schema consists of a central Fact table (containing metrics/measures) surrounded by Dimension tables (describing context)." },
          { question: "How does schema-on-write differ from schema-on-read?", options: ["No difference", "Schema-on-write defines the structure BEFORE writing", "Schema-on-read is faster for writing", "Only used for CSV"], answer: 1, explanation: "Data Warehouses use schema-on-write (structure first). Data Lakes use schema-on-read (store raw, structure at analysis)." },
          { question: "What are the advantages of Parquet format over CSV?", options: ["Easier to read visually", "Columnar storage, good compression, fast queries", "Compatible with all software", "Always smaller"], answer: 1, explanation: "Parquet stores data columnarly, compresses more efficiently than CSV, and allows reading only necessary columns." },
          { question: "What does a Data Lakehouse combine?", options: ["SQL and NoSQL", "Flexibility of Data Lake + governance of Data Warehouse", "Python and Java", "Cloud and On-premise"], answer: 1, explanation: "A Data Lakehouse (Delta Lake, Apache Iceberg) combines the open storage of a Lake with the ACID transactions of a Warehouse." },
        ],
      },
    ],
  },
  {
    id: "prog-ml",
    title: "Basic Machine Learning",
    titleEn: "Basic Machine Learning",
    icon: "🤖",
    color: "from-teal-500/20 to-green-500/20",
    description: "Regression, Classification, Clustering with scikit-learn",
    descriptionEn: "Regression, Classification, Clustering with scikit-learn",
    course: "data-ai",
    lessons: [
      {
        id: "ml-1",
        title: "What is ML & Linear Regression",
        titleEn: "What is ML & Linear Regression",
        theory: "**Machine Learning** = Máy tính \"học\" từ dữ liệu để đưa ra dự đoán.\n\n**3 loại chính:**\n- 🎯 Supervised: Học có giám sát (có đáp án)\n  - Regression: Dự đoán số (giá nhà)\n  - Classification: Phân loại (spam/không spam)\n- 🔍 Unsupervised: Học không giám sát (tự tìm nhóm)\n- 🎮 Reinforcement: Học tăng cường (thử-sai)\n\n**Linear Regression:** Tìm đường thẳng y = ax + b phù hợp nhất với dữ liệu.",
        theoryEn: "**Machine Learning** = Computers \"learn\" from data to make predictions.\n\n**3 main types:**\n- 🎯 Supervised: Has labels/answers\n  - Regression: Predict numbers (house prices)\n  - Classification: Categorize (spam/not spam)\n- 🔍 Unsupervised: No labels (find groups)\n- 🎮 Reinforcement: Trial and error\n\n**Linear Regression:** Find best-fit line y = ax + b.",
        code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Data: Area (m²) → House price (billion VND)
X = np.array([[30], [50], [70], [90], [110], [130]])
y = np.array([1.2, 2.0, 2.8, 3.5, 4.3, 5.1])

# Model training
model = LinearRegression()
model.fit(X, y)

# Coefficient
print(f"Slope coefficient (a): {model.coef_[0]:.4f}")
print(f"Intercept (b): {model.intercept_:.4f}")
print(f"Equation: Price = {model.coef_[0]:.4f} × Area + {model.intercept_:.4f}")

# Forecast
dien_tich_moi = [[80], [150]]
du_doan = model.predict(dien_tich_moi)
for dt, gia in zip(dien_tich_moi, du_doan):
    print(f"\\n🏠 Area {dt[0]}m² → Estimated price: {price:.2f} billion")

# Evaluate the model
r2 = model.score(X, y)
print(f"\\n📊 R² Score: {r2:.4f} ({'Good' if r2 > 0.9 else 'Average'})")`,
        codeLanguage: "python",
        exercise: "Collect car price data (year of manufacture, number of kilometers, selling price). Build a Linear Regression model to predict prices.",
        exerciseEn: "Collect car price data (year, mileage, price). Build a Linear Regression model to predict price.",
        quiz: [
          { question: "Which ML category does Linear Regression belong to?", options: ["Unsupervised", "Reinforcement", "Supervised - Classification", "Supervised - Regression"], answer: 3, explanation: "Linear Regression is a supervised learning algorithm in the regression category, meaning it learns from labeled data to predict continuous values." },
          { question: "What does an R² Score of 0.95 mean?", options: ["The model is 95% wrong", "The model explains 95% of the variance in the data", "There are 95 data samples", "The processing speed is 95%"], answer: 1, explanation: "R² = 0.95 means the model explains 95% of the variation in the dataset, which is generally considered very strong." },
          { question: "What does the slope in y = ax + b represent?", options: ["The y-intercept", "How much y changes when x increases by 1 unit", "The number of data points", "The model accuracy"], answer: 1, explanation: "The slope a tells us how much y changes for every 1-unit increase in x." },
          { question: "What does MSE (Mean Squared Error) measure?", options: ["Training speed", "The average squared error between predictions and actual values", "The number of features", "The dataset size"], answer: 1, explanation: "MSE is the average of (actual value - predicted value)². The lower the MSE, the more accurate the model." },
          { question: "What is regularization used for?", options: ["To speed up processing", "To reduce overfitting by penalizing large coefficients", "To increase the number of features", "To change the loss function completely"], answer: 1, explanation: "Regularization methods such as Ridge and Lasso add a penalty to the loss function, encouraging smaller coefficients and reducing overfitting." },
        ],
      },
      {
        id: "ml-2",
        title: "Classification & Decision Tree",
        titleEn: "Classification & Decision Tree",
        theory: "**Classification** phân loại dữ liệu vào các nhóm có sẵn.\n\n**Decision Tree** (Cây quyết định):\n- Đặt câu hỏi Có/Không tại mỗi nút\n- Chia dữ liệu theo câu trả lời\n- Lá cây = kết quả phân loại\n\n**Ưu điểm:** Dễ hiểu, trực quan, không cần chuẩn hóa dữ liệu\n**Nhược điểm:** Dễ overfitting (quá khớp)",
        theoryEn: "**Classification** categorizes data into predefined groups.\n\n**Decision Tree:**\n- Ask Yes/No questions at each node\n- Split data based on answers\n- Leaves = classification results\n\n**Pros:** Easy to understand, visual, no normalization needed\n**Cons:** Easy to overfit",
        code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

# Data: [class time, sleep time, homework score] → Pass/Fail
X = [
    [6, 8, 85], [2, 5, 40], [8, 7, 90], [1, 4, 30],
    [5, 7, 70], [7, 8, 80], [3, 6, 55], [4, 7, 65],
    [9, 7, 95], [2, 5, 45], [6, 8, 75], [1, 3, 25],
]
y = [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0]  # 1=Đậu, 0=Rớt

# Chia train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# Train
tree = DecisionTreeClassifier(max_depth=3)
tree.fit(X_train, y_train)

# Forecast
sv_moi = [[5, 7, 60]]
ket_qua = tree.predict(sv_moi)
print(f"Student (5 hours studying, 7 hours sleeping, 60 BT points)")
print(f"→ Prediction: {'✅ PASS' if result_pass[0] else '❌ FAIL'}")

# Evaluate
accuracy = tree.score(X_test, y_test)
print(f"\n📊 Accuracy: {accuracy:.1%}")`,
        codeLanguage: "python",
        exercise: "Build a model to classify spam/non-spam emails based on: number of words, whether there is a link, whether there is the word 'free'.",
        exerciseEn: "Build an email spam classifier based on: word count, has link, contains 'free'.",
        quiz: [
          { question: "What is overfitting?", options: ["A model that is too simple", "A model that memorizes the training data and performs poorly on new data", "A model that runs too slowly", "Not enough data"], answer: 1, explanation: "Overfitting happens when a model fits the training data too closely and fails to generalize well to unseen examples." },
          { question: "Why do we use train_test_split?", options: ["To speed up processing", "To evaluate the model on unseen data", "To reduce file size", "To encrypt the dataset"], answer: 1, explanation: "Splitting data into training and test sets lets us evaluate the model on new data it has not seen before, giving a more honest performance estimate." },
          { question: "What is the purpose of pruning a Decision Tree?", options: ["To make the tree deeper", "To reduce overfitting by removing unimportant branches", "To make it 100 times faster", "To add more features"], answer: 1, explanation: "Pruning removes branches that contribute little, making the tree simpler and usually improving generalization." },
          { question: "What does Gini Impurity = 0 mean?", options: ["The data is completely random", "All samples belong to the same class (pure node)", "The model has failed", "More data is needed"], answer: 1, explanation: "A Gini score of 0 means the node is perfectly pure: every sample in that node belongs to the same class." },
          { question: "Which four components make up the confusion matrix?", options: ["Mean, Median, Mode, Range", "TP, FP, TN, FN", "Accuracy, Precision, Recall, F1", "Train, Validation, Test, Predict"], answer: 1, explanation: "A confusion matrix is built from True Positives, False Positives, True Negatives, and False Negatives." },
        ],
      },
      {
        id: "ml-3",
        title: "K-Nearest Neighbors (KNN)",
        titleEn: "K-Nearest Neighbors (KNN)",
        theory: "**KNN** phân loại dựa trên K điểm dữ liệu gần nhất.\n\n**Nguyên lý:** 'Hãy cho tôi biết bạn của bạn, tôi sẽ nói bạn là ai'\n\n**Bước thực hiện:**\n1. Chọn K (số láng giềng)\n2. Tính khoảng cách đến tất cả điểm\n3. Chọn K điểm gần nhất\n4. Bỏ phiếu đa số → kết quả\n\n**Chọn K:** Thường dùng số lẻ, thử nhiều giá trị",
        theoryEn: "**KNN** classifies based on K nearest data points.\n\n**Principle:** 'Tell me your friends, I'll tell you who you are'\n\n**Steps:**\n1. Choose K (number of neighbors)\n2. Calculate distance to all points\n3. Select K nearest points\n4. Majority vote → result\n\n**Choosing K:** Usually odd numbers, try multiple values",
        code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
import numpy as np

# Data: [height cm, weight kg] → Category
X = np.array([
    [170, 70], [165, 55], [180, 85], [160, 50],
    [175, 75], [155, 45], [185, 90], [168, 60],
    [172, 68], [158, 48], [178, 80], [162, 52],
])
y = ['athletic', 'slim', 'athletic', 'slim',
     'athletic', 'slim', 'athletic', 'slim',
     'athletic', 'slim', 'athletic', 'slim']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Forecast
person = [[170, 65]]
result = knn.predict(person)
print(f"Person 170cm/65kg → {result[0]}")
print(f"Accuracy: {knn.score(X_test, y_test):.1%}")`,
        codeLanguage: "python",
        exercise: "Use KNN to classify Iris flowers (sklearn.datasets). Try K=1,3,5,7 and plot the accuracy chart.",
        exerciseEn: "Use KNN to classify Iris flowers (sklearn.datasets). Try K=1,3,5,7 and plot accuracy.",
        quiz: [
          { question: "What type of algorithm is KNN?", options: ["Unsupervised", "Supervised", "Reinforcement", "Semi-supervised"], answer: 1, explanation: "KNN is a supervised learning algorithm because it relies on labeled examples to make predictions." },
          { question: "What problem can a very large K cause in KNN?", options: ["Overfitting", "Underfitting — the decision boundary becomes too smooth", "It always runs faster", "No impact at all"], answer: 1, explanation: "If K is too large, the model considers too many neighbors and the decision boundary becomes overly simple, leading to underfitting." },
          { question: "Why should data be normalized before using KNN?", options: ["To make it run faster", "Because KNN uses distance, and large-scale features can dominate", "To reduce dimensionality", "KNN does not need normalization"], answer: 1, explanation: "KNN depends on distance calculations. If one feature has a much larger scale than another, it can dominate the distance and distort the results." },
          { question: "What is the Euclidean distance between (0,0) and (3,4)?", options: ["7", "5", "12", "3.5"], answer: 1, explanation: "The Euclidean distance is √(3² + 4²) = √25 = 5." },
          { question: "Does KNN require a true training phase?", options: ["Yes, and it is very slow", "No — KNN is a lazy learner and computes at prediction time", "Yes, but it is very fast", "It depends on the dataset"], answer: 1, explanation: "KNN is a lazy learner: it mainly stores the data and performs most of the work when making a prediction." },
        ],
      },
      {
        id: "ml-4",
        title: "Clustering with K-Means",
        titleEn: "Clustering with K-Means",
        theory: "**Clustering** nhóm dữ liệu KHÔNG có nhãn (Unsupervised).\n\n**K-Means:**\n1. Chọn K tâm ngẫu nhiên\n2. Gán mỗi điểm vào tâm gần nhất\n3. Cập nhật tâm = trung bình nhóm\n4. Lặp lại đến khi ổn định\n\n**Ứng dụng:** Phân khúc khách hàng, gom nhóm văn bản, nén ảnh\n\n**Elbow Method:** Chọn K tối ưu bằng đồ thị Inertia",
        theoryEn: "**Clustering** groups UNLABELED data (Unsupervised).\n\n**K-Means:**\n1. Choose K random centroids\n2. Assign each point to nearest centroid\n3. Update centroids = group mean\n4. Repeat until stable\n\n**Applications:** Customer segmentation, text grouping, image compression\n\n**Elbow Method:** Choose optimal K via Inertia plot",
        code: `from sklearn.cluster import KMeans
import numpy as np

# Customer data: [spending/month, number of purchases]
customers = np.array([
    [500, 2], [1500, 8], [300, 1], [2000, 12],
    [800, 4], [100, 1], [1800, 10], [600, 3],
    [2500, 15], [400, 2], [1200, 6], [50, 1],
])

kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(customers)

labels = kmeans.labels_
segments = ["💎 VIP", "⭐ Regularly", "👤 Occasionally"]

for i, (cust, label) in enumerate(zip(customers, labels)):
    print(f"KH {i+1}: Spend {cust[0]:,}k, {cust[1]} times → {segments[label]}")

print(f"\nCluster centers: {kmeans.cluster_centers_}")`,
        codeLanguage: "python",
        exercise: "Clustering student test score data into 3 groups (Excellent, Good, Average). Draw scatter plot.",
        exerciseEn: "Cluster student exam data into 3 groups (Excellent, Good, Average). Draw scatter plot.",
        quiz: [
          { question: "Which ML category does K-Means belong to?", options: ["Supervised", "Unsupervised", "Reinforcement", "Semi-supervised"], answer: 1, explanation: "K-Means is an unsupervised learning algorithm because it works without labeled data." },
          { question: "How does the Elbow Method determine the optimal K?", options: ["Choose the largest K", "Find the point where Inertia starts decreasing much more slowly", "Choose K equal to the number of features", "Pick a random K"], answer: 1, explanation: "You plot Inertia against K and look for the 'elbow' point, where adding more clusters no longer gives much improvement." },
          { question: "What does Inertia measure in K-Means?", options: ["The number of clusters", "The total squared distance from each point to its assigned centroid", "The runtime", "The number of iterations"], answer: 1, explanation: "Inertia is the sum of squared distances from each data point to its cluster centroid. Lower inertia means points are closer to their assigned centers." },
          { question: "How does K-Means++ improve standard K-Means?", options: ["It runs 10x faster", "It initializes centroids more intelligently to avoid poor convergence", "It automatically chooses K", "It is only for text data"], answer: 1, explanation: "K-Means++ spreads out the initial centroids, which often leads to better clustering and more stable convergence." },
          { question: "What range does the Silhouette Score fall in?", options: ["0 to 1", "-1 to 1", "0 to 100", "-∞ to +∞"], answer: 1, explanation: "Silhouette Score ranges from -1 to 1. Values near 1 indicate good clustering, while values near -1 indicate poor clustering." },
        ],
      },
      {
        id: "ml-5",
        title: "Evaluate & Deploy the model",
        titleEn: "Model Evaluation & Deployment",
        theory: "**Metrics đánh giá:**\n- Accuracy: Tỷ lệ đúng tổng thể\n- Precision: Tỷ lệ đúng trong dự đoán dương\n- Recall: Tỷ lệ phát hiện dương thật\n- F1-Score: Trung bình điều hòa Precision & Recall\n- Confusion Matrix: Ma trận nhầm lẫn\n\n**Cross-Validation:** Chia dữ liệu thành K phần, đánh giá K lần\n\n**Triển khai:** Lưu mô hình với joblib/pickle → Flask API",
        theoryEn: "**Evaluation Metrics:**\n- Accuracy: Overall correctness\n- Precision: Correctness of positive predictions\n- Recall: Detection rate of true positives\n- F1-Score: Harmonic mean of Precision & Recall\n- Confusion Matrix\n\n**Cross-Validation:** Split data into K folds, evaluate K times\n\n**Deployment:** Save model with joblib/pickle → Flask API",
        code: `from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
import joblib

# Suppose we have X_train, X_test, y_train, y_test
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.3, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Evaluation report
print(classification_report(y_test, y_pred,
      target_names=data.target_names))

# Cross-Validation
cv_scores = cross_val_score(model, data.data, data.target, cv=5)
print(f"CV Accuracy: {cv_scores.mean():.2%} ± {cv_scores.std():.2%}")

# Save the model
joblib.dump(model, 'iris_model.pkl')
print("✅ Model saved!")`,
        codeLanguage: "python",
        exercise: "Train 3 models (KNN, Decision Tree, Random Forest) on the same dataset, compare metrics.",
        exerciseEn: "Train 3 models (KNN, Decision Tree, Random Forest) on the same dataset, compare metrics.",
        quiz: [
          { question: "When is precision high?", options: ["When there are many True Positives", "When there are few False Positives", "When there are many False Negatives", "When there are few True Negatives"], answer: 1, explanation: "Precision = TP / (TP + FP), so precision is high when false positives are low." },
          { question: "What is F1-Score?", options: ["The arithmetic mean of Precision and Recall", "The harmonic mean of Precision and Recall", "Precision × Recall", "Accuracy on the test set"], answer: 1, explanation: "F1 = 2 × (Precision × Recall) / (Precision + Recall), which balances Precision and Recall using the harmonic mean." },
          { question: "Into how many parts does 5-fold cross-validation split the data?", options: ["2 parts", "5 equal parts", "10 parts", "Any number you want"], answer: 1, explanation: "In 5-fold cross-validation, the dataset is split into 5 parts. Each part serves as the validation set once while the other 4 parts are used for training." },
          { question: "What is joblib.dump(model, 'model.pkl') used for?", options: ["To delete the model", "To save a trained model to a file for later reuse", "To download a model from the internet", "To compress the dataset"], answer: 1, explanation: "joblib.dump() serializes a trained model to a file so it can be loaded later with joblib.load() without retraining." },
          { question: "When is Recall more important than Precision?", options: ["Spam email detection", "Cancer diagnosis — when missing a patient is more dangerous", "Product recommendation", "Cat vs dog classification"], answer: 1, explanation: "In medical diagnosis, a false negative can be very dangerous, so Recall is often prioritized over Precision." },
        ],
      },
    ],
  },

  // ============ AI FOUNDATION ============
  {
    id: "prog-ai-foundation",
    title: "AI Foundation",
    titleEn: "AI Foundation",
    icon: "🧠",
    color: "from-indigo-500/20 to-blue-500/20",
    description: "AI Foundations: History, LLMs, Prompt Engineering, Ethics and Practical Applications",
    descriptionEn: "AI Fundamentals: History, LLMs, Prompt Engineering, Ethics and real-world applications",
    course: "data-ai",
    lessons: [
      {
        id: "ai-f-1",
        title: "What is AI? History & Main Branches",
        titleEn: "What is AI? History & Main Branches",
        theory: "**Trí tuệ nhân tạo (AI)** là lĩnh vực khoa học máy tính nhằm tạo ra hệ thống có khả năng thực hiện các nhiệm vụ đòi hỏi trí thông minh.\n\n**Lịch sử:**\n- 1950: Alan Turing đề xuất 'Turing Test'\n- 1956: Thuật ngữ 'AI' ra đời tại Dartmouth\n- 1997: Deep Blue đánh bại Kasparov (cờ vua)\n- 2012: Deep Learning bùng nổ (ImageNet)\n- 2022: ChatGPT thay đổi cách con người tương tác với AI\n\n**Các nhánh chính:**\n- Machine Learning (Học máy)\n- Deep Learning (Học sâu)\n- NLP (Xử lý ngôn ngữ tự nhiên)\n- Computer Vision (Thị giác máy tính)\n- Robotics (Robot học)",
        theoryEn: "**Artificial Intelligence (AI)** is the field of computer science aiming to create systems capable of performing tasks requiring intelligence.\n\n**History:**\n- 1950: Alan Turing proposed the 'Turing Test'\n- 1956: Term 'AI' coined at Dartmouth\n- 1997: Deep Blue beat Kasparov (chess)\n- 2012: Deep Learning explosion (ImageNet)\n- 2022: ChatGPT changed human-AI interaction\n\n**Main branches:**\n- Machine Learning\n- Deep Learning\n- NLP (Natural Language Processing)\n- Computer Vision\n- Robotics",
        code: `# AI Timeline Visualization
import json

ai_timeline = {
    "1950": {"event": "Turing Test", "type": "theory"},
    "1956": {"event": "AI coined at Dartmouth", "type": "milestone"},
    "1966": {"event": "ELIZA chatbot", "type": "nlp"},
    "1997": {"event": "Deep Blue beats Kasparov", "type": "game"},
    "2011": {"event": "IBM Watson wins Jeopardy", "type": "nlp"},
    "2012": {"event": "AlexNet wins ImageNet", "type": "vision"},
    "2016": {"event": "AlphaGo beats Lee Sedol", "type": "game"},
    "2022": {"event": "ChatGPT released", "type": "nlp"},
    "2024": {"event": "Multimodal AI (GPT-4V, Gemini)", "type": "multimodal"},
}

print("🤖 AI Timeline:")
print("=" * 50)
for year, info in ai_timeline.items():
    emoji = {"theory": "📖", "milestone": "🏆", "nlp": "💬", 
             "game": "🎮", "vision": "👁️", "multimodal": "🌐"}
    icon = emoji.get(info["type"], "⭐")
    print(f"  {year} {icon} {info['event']}")

# AI branches classification
branches = {
    "Machine Learning": ["Supervised", "Unsupervised", "Reinforcement"],
    "Deep Learning": ["CNN", "RNN", "Transformer"],
    "NLP": ["Translation", "Chatbot", "Sentiment Analysis"],
    "Computer Vision": ["Object Detection", "Face Recognition", "OCR"],
}

print("\\n📊 AI Branches:")
for branch, subs in branches.items():
    print(f"  📂 {branch}: {', '.join(subs)}")`,
        codeLanguage: "python",
        exercise: "Create a Python program that classifies everyday AI applications (Google Translate, Siri, Tesla Autopilot...) into the correct AI branch.",
        exerciseEn: "Create a Python program that classifies daily AI applications (Google Translate, Siri, Tesla Autopilot...) into the correct AI branch.",
        quiz: [
          { question: "In what year was AI officially named?", options: ["1943", "1950", "1956", "1997"], answer: 2, explanation: "The term 'Artificial Intelligence' was coined at the Dartmouth Conference in 1956." },
          { question: "Which branch of AI does ChatGPT belong to?", options: ["Computer Vision", "Robotics", "NLP", "Reinforcement Learning"], answer: 2, explanation: "ChatGPT is an NLP (Natural Language Processing) model – processing human language." },
          { question: "What is Deep Blue famous for?", options: ["Translation", "Defeating the world chess champion", "Face recognition", "Self-driving cars"], answer: 1, explanation: "IBM's Deep Blue defeated world chess champion Garry Kasparov in 1997." },
          { question: "How does Deep Learning differ from traditional Machine Learning?", options: ["Does not require data", "Automatically extracts features from raw data through multiple hidden layers", "Always more accurate", "Only used for images"], answer: 1, explanation: "Deep Learning uses multiple hidden layers to automatically learn features, without requiring manual design." },
          { question: "What does NLP stand for?", options: ["Neural Language Processing", "Natural Language Processing", "Network Learning Protocol", "Numeric Logic Programming"], answer: 1, explanation: "NLP = Natural Language Processing — an AI branch that helps machines understand human language." },
        ],
      },
      {
        id: "ai-f-2",
        title: "Basic Neural Networks & Deep Learning",
        titleEn: "Neural Networks & Deep Learning Basics",
        theory: "**Mạng nơ-ron nhân tạo (ANN)** mô phỏng cách bộ não hoạt động.\n\n**Cấu trúc:**\n- Input Layer: Nhận dữ liệu đầu vào\n- Hidden Layers: Xử lý và học đặc trưng\n- Output Layer: Đưa ra kết quả\n\n**Neuron nhân tạo:** Nhận inputs → nhân trọng số → tính tổng → activation function → output\n\n**Deep Learning = Nhiều Hidden Layers:**\n- Có thể học các đặc trưng phức tạp\n- Yêu cầu nhiều dữ liệu và tính toán\n- Kiến trúc phổ biến: CNN (ảnh), RNN (chuỗi), Transformer (ngôn ngữ)",
        theoryEn: "**Artificial Neural Networks (ANN)** mimic how the brain works.\n\n**Structure:**\n- Input Layer: Receives input data\n- Hidden Layers: Process and learn features\n- Output Layer: Produces results\n\n**Artificial Neuron:** Receives inputs → multiply weights → sum → activation function → output\n\n**Deep Learning = Many Hidden Layers:**\n- Can learn complex features\n- Requires lots of data and computation\n- Popular architectures: CNN (images), RNN (sequences), Transformer (language)",
        code: `# Simulating a simple neural network from scratch
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# Training data: XOR problem
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([[0], [1], [1], [0]])

np.random.seed(42)
weights_input = np.random.uniform(size=(2, 4))
weights_output = np.random.uniform(size=(4, 1))
learning_rate = 0.5

print("🧠 Training Neural Network (XOR)...")
for epoch in range(10000):
    # Forward pass
    hidden = sigmoid(np.dot(X, weights_input))
    output = sigmoid(np.dot(hidden, weights_output))
    
    # Backpropagation
    error = y - output
    d_output = error * sigmoid_derivative(output)
    d_hidden = d_output.dot(weights_output.T) * sigmoid_derivative(hidden)
    
    weights_output += hidden.T.dot(d_output) * learning_rate
    weights_input += X.T.dot(d_hidden) * learning_rate
    
    if epoch % 2000 == 0:
        loss = np.mean(np.abs(error))
        print(f"  Epoch {epoch:>5}: Loss = {loss:.4f}")

print("\\n📊 Results:")
for i in range(4):
    print(f"  {X[i]} → {output[i][0]:.3f} (expected: {y[i][0]})")`,
        codeLanguage: "python",
        exercise: "Modify the above neural network to solve AND and OR problems. Compare the number of epochs needed to achieve accuracy > 95%.",
        exerciseEn: "Modify the neural network above to solve AND and OR problems. Compare epochs needed for >95% accuracy.",
        quiz: [
          { question: "What is an activation function used for?", options: ["Accelerate computation", "Add non-linearity to the network", "Reduce data", "Encrypt data"], answer: 1, explanation: "An activation function adds non-linearity, helping the network learn complex relationships." },
          { question: "How does Deep Learning differ from regular ML?", options: ["Does not require data", "More hidden layers", "Only used for images", "Faster"], answer: 1, explanation: "Deep Learning has more hidden layers, allowing it to learn more complex and abstract features." },
          { question: "What does 'Epoch' mean in training a neural network?", options: ["A batch of data", "One complete pass through the entire dataset", "One activated neuron", "Run time of 1 second"], answer: 1, explanation: "1 epoch = the model has viewed the ENTIRE training data once. Multiple epochs are usually needed for convergence." },
          { question: "What is Gradient Descent used for?", options: ["Increase the loss function", "Find optimal weight values by reducing loss", "Generate new data", "Split train/test data"], answer: 1, explanation: "Gradient Descent adjusts weights in the direction of decreasing the loss function, like descending a hill to find the lowest point." },
          { question: "What problem does an excessively large learning rate cause?", options: ["Converges too slowly", "Overshoots the optimum, fails to converge", "Consumes a lot of memory", "No effect"], answer: 1, explanation: "A large learning rate causes step sizes that are too large, making the model oscillate around the optimum without reaching it." },
        ],
      },
      {
        id: "ai-f-3",
        title: "Large Language Models (LLMs)",
        titleEn: "Large Language Models (LLMs)",
        theory: "**LLM** là mô hình AI được huấn luyện trên lượng văn bản khổng lồ để hiểu và tạo ngôn ngữ.\n\n**Kiến trúc Transformer (2017):**\n- Self-Attention: Hiểu mối quan hệ giữa các từ\n- Xử lý song song (nhanh hơn RNN)\n- Nền tảng cho GPT, BERT, LLaMA, Gemini\n\n**Các LLM phổ biến:**\n- GPT-4/5 (OpenAI) - Đa năng\n- Gemini (Google) - Multimodal\n- Claude (Anthropic) - An toàn\n- LLaMA (Meta) - Open source\n\n**Tokenization:** Chia văn bản thành tokens (đơn vị nhỏ nhất)",
        theoryEn: "**LLM** is an AI model trained on massive text data to understand and generate language.\n\n**Transformer Architecture (2017):**\n- Self-Attention: Understand word relationships\n- Parallel processing (faster than RNN)\n- Foundation for GPT, BERT, LLaMA, Gemini\n\n**Popular LLMs:**\n- GPT-4/5 (OpenAI) - General purpose\n- Gemini (Google) - Multimodal\n- Claude (Anthropic) - Safety-focused\n- LLaMA (Meta) - Open source\n\n**Tokenization:** Split text into tokens (smallest units)",
        code: `# Understanding Tokenization
def simple_tokenizer(text):
    """Simple word-level tokenizer"""
    tokens = text.lower().split()
    vocab = {word: idx for idx, word in enumerate(sorted(set(tokens)))}
    token_ids = [vocab[t] for t in tokens]
    return tokens, vocab, token_ids

text = "AI is transforming the world and AI will continue to grow"
tokens, vocab, ids = simple_tokenizer(text)

print("📝 Original:", text)
print(f"\\n🔤 Tokens ({len(tokens)}):", tokens)
print(f"\\n📖 Vocabulary ({len(vocab)} unique):")
for word, idx in sorted(vocab.items(), key=lambda x: x[1]):
    print(f"  {idx}: '{word}'")
print(f"\\n🔢 Token IDs: {ids}")

# Simulating attention mechanism
print("\\n🎯 Self-Attention (simplified):")
import numpy as np
n = len(tokens)
attention = np.random.rand(n, n)
attention = attention / attention.sum(axis=1, keepdims=True)

focus_word = "transforming"
idx = tokens.index(focus_word)
top_attention = sorted(enumerate(attention[idx]), key=lambda x: -x[1])[:3]
print(f"  '{focus_word}' attends most to:")
for i, score in top_attention:
    print(f"    → '{tokens[i]}' (score: {score:.3f})")`,
        codeLanguage: "python",
        exercise: "Create a simple BPE (Byte Pair Encoding) tokenizer. Given a Vietnamese text, count the number of tokens and compare with the word-level tokenizer.",
        exerciseEn: "Create a simple BPE tokenizer. Given a Vietnamese text, count tokens and compare with word-level tokenizer.",
        quiz: [
          { question: "What is the main difference between Transformer and RNN?", options: ["Uses less data", "Processes in parallel instead of sequentially", "Only used for images", "No GPU required"], answer: 1, explanation: "Transformer processes all tokens simultaneously (in parallel) thanks to Self-Attention, whereas RNN processes them sequentially." },
          { question: "What is a token in LLM?", options: ["A sentence", "A paragraph", "The smallest unit of text processed by the model", "A file"], answer: 2, explanation: "A token is the smallest unit (which can be a word, sub-word, or character) that an LLM uses to process text." },
          { question: "What does Self-Attention allow the model to do?", options: ["Only see adjacent words", "Consider relationships between ALL words simultaneously", "Ignore context", "Only see the first word"], answer: 1, explanation: "Self-Attention calculates weights between every pair of words, allowing the model to understand long-range context, which is difficult for RNNs." },
          { question: "What is Positional Encoding used for?", options: ["Security encoding", "Provide positional information because Transformer does not process sequentially", "Reduce input size", "Speed up training"], answer: 1, explanation: "Because Transformers process in parallel, they don't know the order of words. Positional Encoding adds positional information to embeddings." },
          { question: "What is the main difference between BERT and GPT?", options: ["BERT uses an encoder (bidirectional), GPT uses a decoder (left-to-right)", "BERT is faster", "GPT is older", "No difference"], answer: 0, explanation: "BERT uses an encoder, reading in both directions → good for understanding context. GPT uses a decoder, generating text from left to right." },
        ],
      },
      {
        id: "ai-f-4",
        title: "Prompt Engineering - The art of giving commands to AI",
        titleEn: "Prompt Engineering - The Art of AI Instructions",
        theory: "**Prompt Engineering** là kỹ năng thiết kế câu lệnh (prompt) để AI trả lời chính xác và hữu ích nhất.\n\n**Nguyên tắc cốt lõi:**\n- 🎯 Rõ ràng & Cụ thể\n- 📋 Cung cấp ngữ cảnh (Context)\n- 📝 Cho ví dụ (Few-shot learning)\n- 🔄 Chia nhỏ nhiệm vụ phức tạp\n\n**Kỹ thuật nâng cao:**\n- Zero-shot: Không cần ví dụ\n- Few-shot: Cho 2-3 ví dụ mẫu\n- Chain-of-Thought: Yêu cầu AI suy luận từng bước\n- Role-playing: Gán vai trò cho AI\n- System prompts: Thiết lập hành vi mặc định",
        theoryEn: "**Prompt Engineering** is the skill of designing instructions for AI to get accurate and useful responses.\n\n**Core principles:**\n- 🎯 Clear & Specific\n- 📋 Provide Context\n- 📝 Give Examples (Few-shot learning)\n- 🔄 Break down complex tasks\n\n**Advanced techniques:**\n- Zero-shot: No examples needed\n- Few-shot: Give 2-3 example patterns\n- Chain-of-Thought: Ask AI to reason step-by-step\n- Role-playing: Assign a role to AI\n- System prompts: Set default behavior",
        code: `# Prompt Engineering Patterns
prompts = {
    "❌ Bad (vague)": "Tell me about Python",
    "✅ Good (specific)": "Explain 3 key differences between Python lists and tuples, with code examples for each.",
    
    "❌ Bad (no context)": "Write code",
    "✅ Good (with context)": "Write a Python function that takes a CSV file path and returns the top 5 rows sorted by the 'revenue' column in descending order.",
    
    "❌ Bad (no format)": "Analyze this data",
    "✅ Good (structured)": """Analyze the sales data below and provide:
1. Total revenue
2. Best-selling product
3. Month-over-month growth rate
Format the output as a markdown table.""",
}

print("🎯 Prompt Engineering Examples:")
print("=" * 60)
for label, prompt in prompts.items():
    print(f"\\n{label}:")
    print(f"  '{prompt}'")

# Chain-of-Thought example
print("\\n" + "=" * 60)
print("🧠 Chain-of-Thought Prompting:")
cot_prompt = """
Question: A store has 45 apples. They sell 3/5 of them, then receive 20 more. How many apples do they have?

Let's think step by step:
Step 1: Calculate apples sold = 45 × 3/5 = 27
Step 2: Remaining after sale = 45 - 27 = 18
Step 3: After receiving more = 18 + 20 = 38

Answer: 38 apples
"""
print(cot_prompt)

# Few-shot example
print("📝 Few-Shot Learning:")
few_shot = """
Classify the sentiment:
"This product is amazing!" → Positive
"Terrible experience, never again" → Negative
"It's okay, nothing special" → Neutral

Now classify: "Best purchase I've ever made!"
→ Positive ✅
"""
print(few_shot)`,
        codeLanguage: "python",
        exercise: "Write 5 different prompts for the same task (article summary) using 5 techniques: zero-shot, few-shot, CoT, role-playing, and structured output. Evaluate the quality of results.",
        exerciseEn: "Write 5 different prompts for the same task (article summarization) using 5 techniques: zero-shot, few-shot, CoT, role-playing, and structured output. Evaluate result quality.",
        quiz: [
          { question: "What is Chain-of-Thought prompting?", options: ["Write the shortest prompt", "Ask the AI to reason step by step", "Give the AI multiple roles", "Write in multiple languages"], answer: 1, explanation: "Chain-of-Thought asks the AI to show its step-by-step reasoning process, which helps improve accuracy for complex tasks." },
          { question: "What does Few-shot learning require?", options: ["Millions of examples", "2-5 sample examples in the prompt", "No examples needed", "Only used for images"], answer: 1, explanation: "Few-shot learning provides the AI with 2-5 sample examples directly in the prompt for the AI to understand the pattern and apply it to new data." },
          { question: "Which prompt is better?", options: ["'Write code for me'", "'Write a Python function to calculate factorial using recursion, with docstring and 3 test cases'", "'Code something'", "'Help me'"], answer: 1, explanation: "Specific prompts (language, task, detailed requirements) yield more accurate results than vague prompts." },
          { question: "How does a system prompt differ from a user prompt?", options: ["The system prompt is longer", "The system prompt establishes the default behavior/persona for the AI", "The user prompt is more important", "No difference"], answer: 1, explanation: "The system prompt sets the rules for the AI (role, style, limitations). The user prompt is the question from the user." },
          { question: "When the AI hallucinates information, which technique should be used?", options: ["Increase temperature", "Request citation of sources + use RAG", "Write a shorter prompt", "Switch to a smaller model"], answer: 1, explanation: "Asking the AI to cite sources and using RAG (providing real-world documents) significantly reduces hallucination." },
        ],
      },
      {
        id: "ai-f-5",
        title: "API & Build your first AI application",
        titleEn: "APIs & Building Your First AI App",
        theory: "**AI API** cho phép bạn tích hợp AI vào ứng dụng mà không cần huấn luyện mô hình.\n\n**Quy trình sử dụng API:**\n1. Đăng ký và lấy API Key\n2. Gửi request (prompt + parameters)\n3. Nhận response (text, JSON, image...)\n4. Xử lý và hiển thị kết quả\n\n**Parameters quan trọng:**\n- model: Chọn mô hình (gpt-4, gemini, ...)\n- temperature: Độ sáng tạo (0=chính xác, 1=sáng tạo)\n- max_tokens: Giới hạn độ dài output\n- system prompt: Thiết lập persona/hành vi\n\n**Lưu ý bảo mật:** KHÔNG BAO GIỜ để API key trong code frontend!",
        theoryEn: "**AI APIs** let you integrate AI into apps without training models.\n\n**API workflow:**\n1. Register and get API Key\n2. Send request (prompt + parameters)\n3. Receive response (text, JSON, image...)\n4. Process and display results\n\n**Important parameters:**\n- model: Choose model (gpt-4, gemini, ...)\n- temperature: Creativity (0=precise, 1=creative)\n- max_tokens: Limit output length\n- system prompt: Set persona/behavior\n\n**Security note:** NEVER put API keys in frontend code!",
        code: `# Building an AI-powered app (simulation)
import json

class SimpleAIApp:
    def __init__(self):
        self.system_prompt = "You are a helpful Vietnamese tutor."
        self.conversation = []
    
    def chat(self, user_message):
        self.conversation.append({"role": "user", "content": user_message})
        
        # Simulate API call structure
        api_request = {
            "model": "gemini-2.5-flash",
            "messages": [
                {"role": "system", "content": self.system_prompt},
                *self.conversation
            ],
            "temperature": 0.7,
            "max_tokens": 500,
        }
        
        print(f"📡 API Request:")
        print(f"  Model: {api_request['model']}")
        print(f"  Temperature: {api_request['temperature']}")
        print(f"  Messages: {len(api_request['messages'])}")
        
        # Simulated response
        response = f"[AI Response to: '{user_message[:50]}...']"
        self.conversation.append({"role": "assistant", "content": response})
        return response

app = SimpleAIApp()
print("🤖 AI Tutor App")
print("=" * 40)

questions = [
    "Explain the word 'ubiquitous' in Vietnamese",
    "Give 3 examples using this word",
]
for q in questions:
    print(f"\\n👤 User: {q}")
    response = app.chat(q)
    print(f"🤖 AI: {response}")
    print(f"   (Conversation length: {len(app.conversation)} messages)")`,
        codeLanguage: "python",
        exercise: "Build a simple CLI chatbot in Python. Chatbot must: (1) Save conversation history, (2) Support /clear command to clear history, (3) Support /role to change system prompt.",
        exerciseEn: "Build a simple CLI chatbot in Python. The chatbot must: (1) Save conversation history, (2) Support /clear to reset, (3) Support /role to change system prompt.",
        quiz: [
          { question: "What does Temperature = 0 mean in an AI API?", options: ["The AI stops working", "The most accurate and consistent output", "The most creative output", "The fastest speed"], answer: 1, explanation: "Temperature = 0 results in deterministic output (same input always gives same output), suitable for tasks requiring accuracy." },
          { question: "Why shouldn't API keys be put in the frontend?", options: ["Runs slower", "Anyone can see and use your key", "API does not work", "CORS error"], answer: 1, explanation: "Anyone can view frontend code (Inspect). If an API key is present, others will take and use the key, causing financial damage." },
          { question: "What does max_tokens in AI API limit?", options: ["Processing time", "Maximum output length (in tokens)", "Number of API calls", "Uploaded file size"], answer: 1, explanation: "max_tokens limits the number of tokens in the response. 1 token is approximately 4 English characters or 1-2 Vietnamese characters." },
          { question: "What are the benefits of streaming response in AI API?", options: ["More accurate", "Users see partial results immediately", "Cheaper", "More secure"], answer: 1, explanation: "Streaming displays tokens as they are generated, improving UX as the user doesn't have to wait for the entire response." },
          { question: "Why are environment variables used to store API keys?", options: ["Faster than hardcoding", "Not committed to git, more secure", "Automatically refresh key", "Required by OpenAI"], answer: 1, explanation: "Environment variables are not part of the source code and are not pushed to git. The .env file should be added to .gitignore." },
        ],
      },
      {
        id: "ai-f-6",
        title: "RAG - Retrieval Augmented Generation",
        titleEn: "RAG - Retrieval Augmented Generation",
        theory: "**RAG** kết hợp tìm kiếm thông tin + AI tạo câu trả lời.\n\n**Vấn đề của LLM thuần:**\n- Hallucination (bịa thông tin)\n- Kiến thức bị giới hạn đến thời điểm huấn luyện\n- Không biết dữ liệu riêng của bạn\n\n**RAG giải quyết bằng cách:**\n1. Chia tài liệu thành chunks\n2. Tạo vector embeddings cho mỗi chunk\n3. Khi có câu hỏi → tìm chunks liên quan\n4. Ghép chunks vào prompt → AI trả lời dựa trên tài liệu\n\n**Vector Embedding:** Biến văn bản thành vector số, văn bản giống nhau → vector gần nhau",
        theoryEn: "**RAG** combines information retrieval + AI generation.\n\n**Problems with pure LLMs:**\n- Hallucination (making up information)\n- Knowledge limited to training cutoff\n- Doesn't know your private data\n\n**RAG solves this by:**\n1. Split documents into chunks\n2. Create vector embeddings for each chunk\n3. On question → find relevant chunks\n4. Add chunks to prompt → AI answers based on documents\n\n**Vector Embedding:** Convert text to number vectors, similar text → nearby vectors",
        code: `# Simple RAG simulation
import numpy as np

# Step 1: Document chunks (knowledge base)
documents = [
    "Python was created by Guido van Rossum in 1991.",
    "Python uses indentation for code blocks instead of braces.",
    "Python supports multiple paradigms: OOP, functional, procedural.",
    "pip is the package manager for Python.",
    "Virtual environments isolate project dependencies.",
    "Python 3.12 introduced better error messages.",
]

# Step 2: Simple embedding (word frequency vector)
def simple_embed(text):
    words = text.lower().split()
    unique = list(set(w for doc in documents for w in doc.lower().split()))
    return np.array([words.count(w) for w in unique])

doc_vectors = [simple_embed(doc) for doc in documents]

# Step 3: Find relevant documents
def search(query, top_k=2):
    q_vec = simple_embed(query)
    scores = []
    for i, dv in enumerate(doc_vectors):
        # Cosine similarity
        if np.linalg.norm(q_vec) == 0 or np.linalg.norm(dv) == 0:
            scores.append(0)
        else:
            score = np.dot(q_vec, dv) / (np.linalg.norm(q_vec) * np.linalg.norm(dv))
            scores.append(score)
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [(documents[i], scores[i]) for i in top_indices]

# Step 4: RAG pipeline
query = "How does Python handle code blocks?"
print(f"❓ Query: {query}")
print("\\n🔍 Retrieved documents:")
results = search(query)
for doc, score in results:
    print(f"  [{score:.3f}] {doc}")

# Step 5: Generate answer with context
context = " ".join([doc for doc, _ in results])
prompt = f"Based on this context: {context}\\n\\nAnswer: {query}"
print(f"\\n📝 Final prompt for LLM:")
print(f"  {prompt[:200]}...")`,
        codeLanguage: "python",
        exercise: "Build a simple RAG system for Python learning materials. Given 20 pieces of knowledge, implement search using TF-IDF instead of word frequency.",
        exerciseEn: "Build a simple RAG system for Python learning documents. Given 20 knowledge chunks, implement search using TF-IDF instead of word frequency.",
        quiz: [
          { question: "What problem does RAG solve for LLMs?", options: ["Slow speed", "Hallucination and outdated knowledge", "Poor interface", "High cost"], answer: 1, explanation: "RAG provides factual information from documents, helping LLMs avoid hallucination and access the latest data." },
          { question: "What are vector embeddings used for in RAG?", options: ["Security encoding", "Compare semantic similarity", "Compress files", "Generate images"], answer: 1, explanation: "Vector embeddings transform text into numerical vectors, allowing semantic similarity to be calculated between a query and documents." },
          { question: "What is chunking in RAG?", options: ["Compress files", "Dividing documents into small segments for embedding and searching", "Encrypt data", "Delete duplicate data"], answer: 1, explanation: "Chunking divides long documents into smaller segments (chunks) suitable for efficient embedding and retrieval." },
          { question: "What does cosine similarity measure between 2 vectors?", options: ["Euclidean distance", "Angle between 2 vectors — same direction = high similarity", "Sum of 2 vectors", "Length of vectors"], answer: 1, explanation: "Cosine similarity = cos(θ). A value of 1 = same direction (very similar), 0 = orthogonal (unrelated)." },
          { question: "How does a vector database differ from a SQL database?", options: ["Stores more", "Optimized for vector similarity search", "Free", "Uses SQL"], answer: 1, explanation: "Vector DBs are optimized for approximate nearest neighbor search — much faster than SQL for semantic search." },
        ],
      },
      {
        id: "ai-f-7",
        title: "AI Agents & Function Calling",
        titleEn: "AI Agents & Function Calling",
        theory: "**AI Agent** là hệ thống AI có thể tự lập kế hoạch và thực hiện hành động.\n\n**Function Calling:** Cho phép AI gọi các hàm/công cụ bên ngoài\n\n**Quy trình Agent:**\n1. Nhận nhiệm vụ từ người dùng\n2. Phân tích và lập kế hoạch\n3. Chọn tools/functions cần dùng\n4. Thực thi và thu thập kết quả\n5. Tổng hợp và trả lời\n\n**Ví dụ thực tế:**\n- Agent tra thời tiết → gọi Weather API\n- Agent đặt vé → gọi Booking API\n- Agent phân tích code → gọi linter + test runner",
        theoryEn: "**AI Agent** is an AI system that can plan and execute actions autonomously.\n\n**Function Calling:** Allows AI to invoke external functions/tools\n\n**Agent workflow:**\n1. Receive task from user\n2. Analyze and plan\n3. Select needed tools/functions\n4. Execute and collect results\n5. Synthesize and respond\n\n**Real examples:**\n- Weather agent → calls Weather API\n- Booking agent → calls Booking API\n- Code analysis agent → calls linter + test runner",
        code: `# Simple AI Agent with Function Calling
import json
from datetime import datetime

# Define available tools
def get_weather(city):
    data = {"Hanoi": "28°C, Sunny", "HCMC": "32°C, Cloudy", "Da Nang": "30°C, Rain"}
    return data.get(city, "Unknown city")

def calculate(expression):
    try:
        return str(eval(expression))
    except:
        return "Error in calculation"

def get_time():
    return datetime.now().strftime("%H:%M:%S")

TOOLS = {
    "get_weather": {"fn": get_weather, "desc": "Get weather for a city"},
    "calculate": {"fn": calculate, "desc": "Calculate math expression"},
    "get_time": {"fn": get_time, "desc": "Get current time"},
}

class SimpleAgent:
    def __init__(self):
        self.tools = TOOLS
    
    def process(self, user_input):
        print(f"\\n🤖 Agent received: '{user_input}'")
        
        # Step 1: Determine which tool to use
        input_lower = user_input.lower()
        if "weather" in input_lower or "weather" in input_lower:
            tool_name = "get_weather"
            # Extract city name (simplified)
            for city in ["Hanoi", "HCMC", "Da Nang"]:
                if city.lower() in input_lower:
                    args = city
                    break
            else:
                args = "Hanoi"
        elif any(op in input_lower for op in ["+", "-", "*", "/", "count"]):
            tool_name = "calculate"
            args = input_lower.replace("count", "").strip()
        elif "time" in input_lower or "hour" in input_lower:
            tool_name = "get_time"
            args = None
        else:
            return "I don't have a tool for that task."
        
        # Step 2: Execute tool
        tool = self.tools[tool_name]
        print(f"  🔧 Using tool: {tool_name}")
        result = tool["fn"](args) if args else tool["fn"]()
        print(f"  📊 Result: {result}")
        
        return f"Based on {tool_name}: {result}"

agent = SimpleAgent()
queries = [
    "What's the weather in HCMC?",
    "Calculate 15 * 24 + 100",
    "What time is it?",
]

for q in queries:
    response = agent.process(q)
    print(f"  💬 Response: {response}")`,
        codeLanguage: "python",
        exercise: "Expand the above Agent: add 'search_knowledge' tool (search in knowledge list), 'translate' tool (Vietnamese-English translation), and handle multi-step tasks (for example: 'Translate Hanoi weather into English').",
        exerciseEn: "Extend the Agent: add 'search_knowledge' tool, 'translate' tool (Vietnamese-English), and handle multi-step tasks (e.g., 'Translate Hanoi weather to English').",
        quiz: [
          { question: "What does Function Calling allow AI to do?", options: ["Write code", "Call external tools/APIs", "Self-train", "Generate images"], answer: 1, explanation: "Function Calling gives AI the ability to call external functions/APIs (weather, database, search, etc.) to retrieve real-world data." },
          { question: "How do AI Agents differ from traditional chatbots?", options: ["Talk more", "Can autonomously plan and execute actions", "Use voice", "Free"], answer: 1, explanation: "AI Agents can analyze tasks, plan, select appropriate tools, and execute actions – not just respond with text." },
          { question: "What is the ReAct pattern in AI Agent?", options: ["Reactive programming", "Reasoning + Acting — alternate reasoning then acting", "Real-time action", "Recursive action"], answer: 1, explanation: "ReAct = Reason + Act. The agent reasons → decides on an action → observes the result → reasons again, repeating the cycle." },
          { question: "What does a multi-step task mean in an AI Agent?", options: ["Run multiple models", "Complex tasks that need to be broken into multiple steps", "Use multiple API keys", "Train for many epochs"], answer: 1, explanation: "Multi-step task: The agent must plan and execute multiple sequential steps." },
          { question: "What is a tool description used for in an Agent?", options: ["Decorate the interface", "Help AI understand when and how to use each tool", "Secure API", "Logging"], answer: 1, explanation: "The description helps the LLM decide which tool is appropriate for the current request and pass parameters correctly." },
        ],
      },
      {
        id: "ai-f-8",
        title: "Basic Computer Vision",
        titleEn: "Computer Vision Basics",
        theory: "**Computer Vision** cho máy tính khả năng 'nhìn' và hiểu hình ảnh.\n\n**Ứng dụng:**\n- Nhận dạng khuôn mặt (Face ID)\n- Phát hiện vật thể (Tesla Autopilot)\n- OCR (đọc chữ từ ảnh)\n- Phân loại hình ảnh (Google Photos)\n\n**CNN (Convolutional Neural Network):**\n- Convolutional Layer: Phát hiện đặc trưng (cạnh, góc, texture)\n- Pooling Layer: Giảm kích thước, giữ đặc trưng quan trọng\n- Fully Connected: Phân loại cuối cùng\n\n**Transfer Learning:** Dùng mô hình đã huấn luyện (ResNet, VGG) cho bài toán mới",
        theoryEn: "**Computer Vision** gives computers the ability to 'see' and understand images.\n\n**Applications:**\n- Face recognition (Face ID)\n- Object detection (Tesla Autopilot)\n- OCR (reading text from images)\n- Image classification (Google Photos)\n\n**CNN (Convolutional Neural Network):**\n- Convolutional Layer: Detect features (edges, corners, textures)\n- Pooling Layer: Reduce size, keep important features\n- Fully Connected: Final classification\n\n**Transfer Learning:** Use pre-trained models (ResNet, VGG) for new tasks",
        code: `# Computer Vision concepts with numpy
import numpy as np

# Simulating a simple image (8x8 grayscale)
image = np.array([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
])

print("📷 Original Image (8x8):")
for row in image:
    print("  " + " ".join("⬛" if p else "⬜" for p in row))

# Convolution: Edge detection kernel
edge_kernel = np.array([[-1, -1, -1],
                         [-1,  8, -1],
                         [-1, -1, -1]])

def convolve2d(img, kernel):
    h, w = img.shape
    kh, kw = kernel.shape
    output = np.zeros((h - kh + 1, w - kw + 1))
    for i in range(output.shape[0]):
        for j in range(output.shape[1]):
            region = img[i:i+kh, j:j+kw]
            output[i, j] = np.sum(region * kernel)
    return np.clip(output, 0, 1)

edges = convolve2d(image.astype(float), edge_kernel)
print("\\n🔍 After Edge Detection:")
for row in edges:
    print("  " + " ".join("⬛" if p > 0 else "⬜" for p in row))

# Max Pooling (2x2)
def max_pool(img, size=2):
    h, w = img.shape
    output = np.zeros((h // size, w // size))
    for i in range(0, h, size):
        for j in range(0, w, size):
            output[i//size, j//size] = np.max(img[i:i+size, j:j+size])
    return output

pooled = max_pool(image.astype(float))
print(f"\\n📐 After Max Pooling (4x4):")
for row in pooled:
    print("  " + " ".join("⬛" if p > 0 else "⬜" for p in row))`,
        codeLanguage: "python",
        exercise: "Implement other kernels: Blur (medium), Sharpen, Emboss. Apply to 16x16 photo and compare results.",
        exerciseEn: "Implement additional kernels: Blur (average), Sharpen, Emboss. Apply to a 16x16 image and compare results.",
        quiz: [
          { question: "What does a CNN use a Convolution Layer for?", options: ["Enlarge images", "Detect features (edges, corners, etc.)", "Remove image background", "Compress images"], answer: 1, explanation: "A Convolutional Layer uses a kernel/filter to detect visual features such as edges, corners, and textures." },
          { question: "When is Transfer Learning useful?", options: ["When there is a lot of data", "When there is little data for a new problem", "No GPU required", "Only used for text"], answer: 1, explanation: "Transfer Learning is especially useful when you have little data – it leverages knowledge from a large pre-trained model." },
          { question: "What is the purpose of a Pooling layer in a CNN?", options: ["Increase image size", "Reduce feature map size, retain important features", "Add color to the image", "Create a new image"], answer: 1, explanation: "Pooling reduces data dimensionality, leading to a smaller, faster, and translation-invariant model." },
          { question: "What is Data Augmentation in Computer Vision?", options: ["Collect more data", "Generate more images by rotating, flipping, cropping, color shifting", "Increase image resolution", "Delete bad images"], answer: 1, explanation: "Data Augmentation creates additional training data by transforming images — helping to reduce overfitting." },
          { question: "How does Object Detection differ from Image Classification?", options: ["Faster", "Identifies both the object type AND its location (bounding box)", "Used only for video", "Requires a more powerful GPU"], answer: 1, explanation: "Classification: What is this image? Detection: What is in the image AND where is it? Detection returns both the class and bounding box." },
        ],
      },
      {
        id: "ai-f-9",
        title: "AI Ethics & Responsible AI",
        titleEn: "AI Ethics & Responsible AI",
        theory: "**Đạo đức AI** là tập hợp nguyên tắc đảm bảo AI được phát triển và sử dụng có trách nhiệm.\n\n**Các vấn đề chính:**\n- 🔒 Quyền riêng tư: AI thu thập và xử lý dữ liệu cá nhân\n- ⚖️ Bias (Thiên lệch): AI có thể phân biệt đối xử\n- 🤖 Deepfake: AI tạo nội dung giả mạo\n- 💼 Việc làm: AI thay thế lao động\n- 🎯 Minh bạch: Giải thích được quyết định của AI\n\n**Nguyên tắc Responsible AI:**\n- Fairness (Công bằng)\n- Transparency (Minh bạch)\n- Privacy (Quyền riêng tư)\n- Accountability (Trách nhiệm giải trình)\n- Safety (An toàn)\n- Human oversight (Con người giám sát)",
        theoryEn: "**AI Ethics** is a set of principles ensuring AI is developed and used responsibly.\n\n**Key issues:**\n- 🔒 Privacy: AI collects and processes personal data\n- ⚖️ Bias: AI can discriminate\n- 🤖 Deepfake: AI creates fake content\n- 💼 Employment: AI replaces jobs\n- 🎯 Transparency: Explaining AI decisions\n\n**Responsible AI principles:**\n- Fairness\n- Transparency\n- Privacy\n- Accountability\n- Safety\n- Human oversight",
        code: `# Bias Detection in AI
import numpy as np

# Simulated hiring AI - checking for bias
applications = [
    {"name": "Nguyen An", "gender": "M", "university": "top", "gpa": 3.5, "experience": 2},
    {"name": "Tran Binh", "gender": "F", "university": "top", "gpa": 3.8, "experience": 1},
    {"name": "Le Chi", "gender": "M", "university": "regular", "gpa": 3.2, "experience": 3},
    {"name": "Pham Dung", "gender": "F", "university": "regular", "gpa": 3.6, "experience": 2},
    {"name": "Hoang Em", "gender": "M", "university": "top", "gpa": 3.0, "experience": 4},
    {"name": "Vo Fiona", "gender": "F", "university": "top", "gpa": 3.9, "experience": 0},
]

# Biased model (university weight too high)
def biased_score(app):
    uni_bonus = 2.0 if app["university"] == "top" else 0
    return app["gpa"] * 0.3 + app["experience"] * 0.2 + uni_bonus

# Fair model (balanced weights)
def fair_score(app):
    return app["gpa"] * 0.4 + app["experience"] * 0.3 + (0.3 if app["university"] == "top" else 0.15)

print("⚖️ Bias Detection in Hiring AI")
print("=" * 55)
print(f"{'Name':<15} {'Gender':<8} {'Biased':<10} {'Fair':<10}")
print("-" * 55)

for app in applications:
    b_score = biased_score(app)
    f_score = fair_score(app)
    print(f"{app['name']:<15} {app['gender']:<8} {b_score:.2f}      {f_score:.2f}")

# Check demographic parity
print("\\n📊 Bias Analysis:")
for model_name, scorer in [("Biased", biased_score), ("Fair", fair_score)]:
    m_avg = np.mean([scorer(a) for a in applications if a["gender"] == "M"])
    f_avg = np.mean([scorer(a) for a in applications if a["gender"] == "F"])
    gap = abs(m_avg - f_avg)
    print(f"  {model_name}: M avg={m_avg:.2f}, F avg={f_avg:.2f}, Gap={gap:.2f} {'⚠️ BIASED' if gap > 0.5 else '✅ FAIR'}")`,
        codeLanguage: "python",
        exercise: "Design an 'AI Ethics Checklist' in Python. The program receives a description of an AI system and evaluates 6 criteria (Fairness, Transparency, Privacy, Accountability, Safety, Human Oversight) on a scale of 1-5.",
        exerciseEn: "Design an 'AI Ethics Checklist' in Python. The program takes an AI system description and rates 6 criteria (Fairness, Transparency, Privacy, Accountability, Safety, Human Oversight) on a 1-5 scale.",
        quiz: [
          { question: "What problems does Bias in AI cause?", options: ["Consumes more power", "Unfair discrimination", "Runs slowly", "Poor interface"], answer: 1, explanation: "Bias causes AI to make skewed decisions, potentially discriminating based on gender, race, age, etc." },
          { question: "Which principle requires AI to explain its decisions?", options: ["Fairness", "Transparency", "Privacy", "Safety"], answer: 1, explanation: "Transparency requires AI systems to be able to explain how and why they made a decision." },
          { question: "Why is Explainable AI (XAI) important?", options: ["Runs faster", "Helps humans understand WHY AI makes decisions", "Reduces costs", "Increases accuracy"], answer: 1, explanation: "XAI helps explain AI's decisions, especially important in healthcare, finance, and law." },
          { question: "What does GDPR require regarding AI?", options: ["AI must be free", "Right to explanation and right to be forgotten", "AI must be open-source", "Only applies in the US"], answer: 1, explanation: "GDPR (EU) requires: users have the right to know how AI uses their data, and the right to request data deletion." },
          { question: "Where does AI bias typically come from?", options: ["Insufficient GPU power", "Training data is not representative or contains bias", "Algorithm is too complex", "User input error"], answer: 1, explanation: "Bias primarily stems from training data: if data is unrepresentative, AI will learn and amplify that bias." },
        ],
      },
      {
        id: "ai-f-10",
        title: "Project: Building a complete AI Chatbot",
        titleEn: "Project: Build a Complete AI Chatbot",
        theory: "**Dự án tổng hợp:** Xây dựng một chatbot AI có đầy đủ tính năng.\n\n**Yêu cầu:**\n- Hiểu ngữ cảnh (lưu lịch sử hội thoại)\n- System prompt tùy chỉnh\n- Function calling (tra thời tiết, tính toán)\n- Streaming response (hiện từng chữ)\n- Xử lý lỗi và fallback\n\n**Kiến trúc:**\n- Frontend: Giao diện chat (React/HTML)\n- Backend: API server (Python Flask/FastAPI)\n- AI: LLM API (GPT/Gemini)\n- Database: Lưu conversations (SQLite/PostgreSQL)\n\n**Best Practices:**\n- Rate limiting: Giới hạn số request\n- Input validation: Lọc nội dung độc hại\n- Logging: Ghi lại lỗi và metrics\n- Cost management: Tối ưu tokens",
        theoryEn: "**Capstone Project:** Build a full-featured AI chatbot.\n\n**Requirements:**\n- Context awareness (save conversation history)\n- Custom system prompts\n- Function calling (weather, calculations)\n- Streaming response (show text progressively)\n- Error handling and fallback\n\n**Architecture:**\n- Frontend: Chat UI (React/HTML)\n- Backend: API server (Python Flask/FastAPI)\n- AI: LLM API (GPT/Gemini)\n- Database: Store conversations (SQLite/PostgreSQL)\n\n**Best Practices:**\n- Rate limiting\n- Input validation\n- Logging\n- Cost management",
        code: `# Complete Chatbot Architecture
class ProductionChatbot:
    def __init__(self, name, system_prompt):
        self.name = name
        self.system_prompt = system_prompt
        self.conversations = {}
        self.tools = {}
        self.request_count = 0
        self.max_requests_per_minute = 10
    
    def register_tool(self, name, func, description):
        self.tools[name] = {"fn": func, "desc": description}
        print(f"  🔧 Registered tool: {name} - {description}")
    
    def new_session(self, session_id):
        self.conversations[session_id] = []
        return session_id
    
    def chat(self, session_id, message):
        # Rate limiting
        self.request_count += 1
        if self.request_count > self.max_requests_per_minute:
            return "⚠️ Rate limit exceeded. Please wait."
        
        # Input validation
        if len(message) > 2000:
            return "⚠️ Message too long (max 2000 chars)."
        if not message.strip():
            return "⚠️ Empty message."
        
        # Add to history
        self.conversations[session_id].append(
            {"role": "user", "content": message}
        )
        
        # Check for tool calls
        tool_result = None
        for tool_name, tool in self.tools.items():
            if tool_name.lower() in message.lower():
                tool_result = tool["fn"](message)
                break
        
        # Generate response (simulated)
        context_length = len(self.conversations[session_id])
        response = f"[{self.name}] Processed with {context_length} context messages"
        if tool_result:
            response += f" | Tool result: {tool_result}"
        
        self.conversations[session_id].append(
            {"role": "assistant", "content": response}
        )
        
        return response
    
    def get_stats(self):
        total_msgs = sum(len(c) for c in self.conversations.values())
        return {
            "sessions": len(self.conversations),
            "total_messages": total_msgs,
            "requests": self.request_count,
            "tools": list(self.tools.keys()),
        }

# Build the chatbot
print("🤖 Building Production Chatbot")
print("=" * 50)

bot = ProductionChatbot(
    name="HaiEduTech Tutor",
    system_prompt="You are a helpful Vietnamese education tutor."
)

# Register tools
bot.register_tool("calculator", lambda m: str(eval("2+2")), "Math calculations")
bot.register_tool("dictionary", lambda m: "Definition: ...", "Word lookup")

# Simulate session
session = bot.new_session("user_001")
messages = [
    "Hello!",
    "Explain 'for loop' in Python",
    "Give an example of calculator 5 + 3",
]

print("\\n💬 Chat Session:")
for msg in messages:
    print(f"  👤 {msg}")
    response = bot.chat(session, msg)
    print(f"  🤖 {response}")

print(f"\\n📊 Stats: {bot.get_stats()}")`,
        codeLanguage: "python",
        exercise: "Complete the above chatbot: (1) Add SQLite to save conversations, (2) Implement simulated streaming (printing each character), (3) Add 'search_lessons' tool to find lessons in HaiEduTech, (4) Write unit tests.",
        exerciseEn: "Complete the chatbot: (1) Add SQLite to save conversations, (2) Implement simulated streaming (print char by char), (3) Add 'search_lessons' tool, (4) Write unit tests.",
        quiz: [
          { question: "What is rate limiting used for in chatbots?", options: ["Accelerate processing", "Limit the number of requests to prevent abuse", "Improve quality", "Store data"], answer: 1, explanation: "Rate limiting restricts the number of requests/minute to prevent abuse, protect API keys, and manage costs." },
          { question: "Why is it necessary to store conversation history?", options: ["Save memory", "For AI to understand conversation context", "Increase security", "Reduces costs"], answer: 1, explanation: "Conversation history helps AI understand context, refer to previous messages, and respond more coherently." },
          { question: "Why is input validation important in chatbots?", options: ["Accelerate processing", "Prevent prompt injection and malicious content", "Reduce API costs", "Improve interface"], answer: 1, explanation: "Input validation filters dangerous content before sending it to the AI API." },
          { question: "Why is token counting important for cost management?", options: ["Tokens determine quality", "API charges based on the number of tokens used", "Tokens affect security", "Not important"], answer: 1, explanation: "AI APIs charge based on tokens (input + output). Monitoring token usage helps control costs." },
          { question: "What technique is required for streaming responses on the backend?", options: ["WebSocket or Server-Sent Events (SSE)", "Only needs REST API", "GraphQL subscription", "Polling every second"], answer: 0, explanation: "Streaming uses SSE or WebSocket for the server to continuously send parts of the response." },
        ],
      },
    ],
  },
];

// Merge expanded curriculum modules (cast to ProgrammingModule for compatibility)
export const allProgrammingModules: ProgrammingModule[] = [
  ...programmingModules,
  ...(expandedModules as unknown as ProgrammingModule[]),
];


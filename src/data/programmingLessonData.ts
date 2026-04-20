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
  course: "kids" | "data-ai" | "python" | "sql" | "data-eng" | "ml" | "cloud";
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
    title: "Scratch & Tư duy thuật toán",
    titleEn: "Scratch & Algorithmic Thinking",
    icon: "🧩",
    color: "from-orange-500/20 to-yellow-500/20",
    description: "Học lập trình kéo thả và tư duy logic qua trò chơi sáng tạo",
    descriptionEn: "Learn drag-and-drop coding and logical thinking through creative games",
    course: "kids",
    lessons: [
      {
        id: "scratch-1",
        title: "Giới thiệu Scratch & khối lệnh cơ bản",
        titleEn: "Introduction to Scratch & Basic Blocks",
        theory: "Scratch là ngôn ngữ lập trình trực quan do MIT phát triển. Thay vì viết code, bạn kéo thả các khối lệnh (blocks) để tạo chương trình — giống như ghép LEGO vậy! 🧱\n\n**Tại sao học Scratch?**\nHãy tưởng tượng bạn là đạo diễn phim hoạt hình. Scratch cho phép bạn điều khiển nhân vật, tạo hiệu ứng, và xây dựng trò chơi mà không cần nhớ cú pháp phức tạp.\n\n**Các loại khối lệnh chính:**\n- 🟡 **Sự kiện (Events):** Giống nút 'Play' — bắt đầu mọi thứ. Ví dụ: 'Khi bấm cờ xanh' = khi phim bắt đầu chiếu.\n- 🔵 **Chuyển động (Motion):** Điều khiển nhân vật di chuyển. Ví dụ: 'Di chuyển 10 bước' = nhân vật bước 10 pixel. Hãy thử: nếu bạn đi 10 bước rồi xoay 90° và lặp lại 4 lần → bạn vẽ được hình vuông! 🟦\n- 🟣 **Ngoại hình (Looks):** Thay đổi diện mạo nhân vật. 'Nói Hello trong 2 giây' sẽ hiện bong bóng chat 💬 trên đầu nhân vật.\n- 🟢 **Âm thanh (Sound):** Phát nhạc, ghi âm. Ví dụ: mỗi lần nhân vật nhảy, phát tiếng 'boing!'.\n\n**Ví dụ thực tế:** Game 'Bắt bướm' 🦋\n1. Sự kiện: Khi bấm cờ xanh → bắt đầu game\n2. Chuyển động: Con bướm bay ngẫu nhiên trên màn hình\n3. Ngoại hình: Khi bắt được → bướm biến mất ✨\n4. Âm thanh: Phát tiếng 'ding!' khi ghi điểm",
        theoryEn: "Scratch is a visual programming language developed by MIT. Instead of writing code, you drag and drop blocks to create programs — like building with LEGO! 🧱\n\n**Why learn Scratch?**\nImagine you're a movie director. Scratch lets you control characters, create effects, and build games without memorizing complex syntax.\n\n**Main block categories:**\n- 🟡 **Events:** Like a 'Play' button — starts everything. Example: 'When green flag clicked' = when the movie starts playing.\n- 🔵 **Motion:** Control character movement. Example: 'Move 10 steps' = character walks 10 pixels. Try this: move 10 steps, turn 90°, repeat 4 times → you draw a square! 🟦\n- 🟣 **Looks:** Change character appearance. 'Say Hello for 2 seconds' shows a speech bubble 💬 above the character.\n- 🟢 **Sound:** Play music, record sounds. Example: each time the character jumps, play 'boing!'.\n\n**Real example:** Butterfly Catcher Game 🦋\n1. Events: When green flag clicked → start game\n2. Motion: Butterfly flies randomly on screen\n3. Looks: When caught → butterfly disappears ✨\n4. Sound: Play 'ding!' when scoring",
        code: `# Mô phỏng logic Scratch bằng Python
# Khi bấm cờ xanh → Di chuyển 10 bước → Nói "Xin chào!"

sprite_x = 0
sprite_y = 0

# Di chuyển 10 bước sang phải
sprite_x += 10
print(f"Vị trí: ({sprite_x}, {sprite_y})")

# Sprite nói
print("💬 Xin chào! Tôi là Scratch Cat!")

# Lặp lại 4 lần: di chuyển + xoay (vẽ hình vuông)
for i in range(4):
    sprite_x += 50
    print(f"Bước {i+1}: di chuyển đến ({sprite_x}, {sprite_y})")
    print(f"  ↪ Xoay 90 độ")`,
        codeLanguage: "python",
        exercise: "Hãy mở Scratch (scratch.mit.edu) và tạo một chương trình: Khi bấm cờ xanh, nhân vật di chuyển 100 bước, sau đó nói 'Hello World!' trong 2 giây.",
        exerciseEn: "Open Scratch (scratch.mit.edu) and create a program: When the green flag is clicked, the sprite moves 100 steps, then says 'Hello World!' for 2 seconds.",
        quiz: [
          { question: "Scratch được phát triển bởi tổ chức nào?", options: ["Google", "MIT", "Microsoft", "Apple"], answer: 1, explanation: "Scratch được phát triển bởi nhóm Lifelong Kindergarten tại MIT Media Lab." },
          { question: "Khối lệnh 'Khi bấm cờ xanh' thuộc loại nào?", options: ["Motion", "Events", "Looks", "Sound"], answer: 1, explanation: "Khối 'Khi bấm cờ xanh' là một khối Sự kiện (Events) - đánh dấu điểm bắt đầu chương trình." },
          { question: "Để nhân vật nói một câu, ta dùng khối thuộc nhóm nào?", options: ["Motion", "Sound", "Looks", "Events"], answer: 2, explanation: "Khối 'Nói...' và 'Nghĩ...' thuộc nhóm Ngoại hình (Looks)." },
          { question: "Sân khấu (Stage) trong Scratch có kích thước bao nhiêu pixel?", options: ["320×240", "480×360", "640×480", "800×600"], answer: 1, explanation: "Sân khấu Scratch có kích thước cố định 480×360 pixel, tọa độ gốc (0,0) nằm ở chính giữa." },
          { question: "Trong Scratch, muốn nhân vật di chuyển liên tục ta dùng khối nào?", options: ["Lặp lại 1 lần", "Lặp mãi mãi + Di chuyển", "Chỉ dùng khối Motion", "Dùng khối Sound"], answer: 1, explanation: "Để nhân vật di chuyển liên tục, ta cần đặt khối Di chuyển bên trong khối Lặp mãi mãi (forever loop)." },
        ],
      },
      {
        id: "scratch-2",
        title: "Vòng lặp và điều kiện trong Scratch",
        titleEn: "Loops and Conditions in Scratch",
        theory: "**Vòng lặp** giúp thực hiện một hành động nhiều lần mà không cần viết lại code. Hãy tưởng tượng bạn phải viết 'Di chuyển 10 bước, Xoay 90°' tổng cộng 100 lần — mệt lắm phải không? Vòng lặp giải quyết chuyện này! 🔄\n\n**Ví dụ đời thực:**\n- ⏰ Đồng hồ: Kim giây **lặp mãi mãi** (chạy → tick → chạy → tick...)\n- 🏃 Chạy bộ: Lặp lại 10 lần (chạy 1 vòng sân)\n- 🎵 Bài hát: Lặp chorus **cho đến khi** hết nhạc\n\n**Các loại vòng lặp trong Scratch:**\n- 🔄 **Lặp lại N lần:** Giống nói 'Làm việc này 5 lần rồi dừng'. Ví dụ: vẽ ngôi sao 5 cánh = lặp 5 lần (vẽ cạnh + xoay 144°) ⭐\n- 🔄 **Lặp mãi mãi:** Giống quả tim đập — không bao giờ dừng cho đến khi bạn tắt chương trình.\n- 🔄 **Lặp cho đến khi:** Giống chờ xe bus — đứng chờ **cho đến khi** xe đến. 🚌\n\n**Câu điều kiện — Ngã rẽ trong cuộc sống:**\n- 🌧️ **Nếu...thì:** 'Nếu trời mưa → mang ô'. Chỉ có 1 nhánh.\n- ☀️🌧️ **Nếu...thì...nếu không:** 'Nếu trời mưa → mang ô, KHÔNG THÌ → đội nón'. Có 2 nhánh.\n\n**Kết hợp cả hai:**\nLặp mãi mãi:\n  Nếu chạm tường → xoay 180° và bật lại\n→ Đây chính là logic của game Pong! 🏓",
        theoryEn: "**Loops** help repeat actions without rewriting code. Imagine writing 'Move 10 steps, Turn 90°' a total of 100 times — exhausting, right? Loops solve this! 🔄\n\n**Real-life examples:**\n- ⏰ Clock: Second hand **loops forever** (move → tick → move → tick...)\n- 🏃 Running: Repeat 10 times (run 1 lap)\n- 🎵 Song: Repeat chorus **until** music ends\n\n**Loop types in Scratch:**\n- 🔄 **Repeat N times:** Like saying 'Do this 5 times then stop'. Example: draw a 5-pointed star = repeat 5 times (draw edge + turn 144°) ⭐\n- 🔄 **Forever:** Like a heartbeat — never stops until you quit the program.\n- 🔄 **Repeat until:** Like waiting for a bus — wait **until** bus arrives. 🚌\n\n**Conditions — Crossroads in life:**\n- 🌧️ **If...then:** 'If raining → bring umbrella'. Only 1 branch.\n- ☀️🌧️ **If...then...else:** 'If raining → umbrella, ELSE → hat'. Has 2 branches.\n\n**Combining both:**\nForever loop:\n  If touching wall → turn 180° and bounce\n→ This is the logic behind Pong! 🏓",
        code: `# Vòng lặp: Vẽ hình đa giác
import turtle

# Vẽ hình lục giác (6 cạnh)
so_canh = 6
do_dai = 60

for i in range(so_canh):
    turtle.forward(do_dai)  # Đi thẳng
    turtle.right(360 / so_canh)  # Xoay

# Câu điều kiện
diem = 85
if diem >= 90:
    print("🌟 Xuất sắc!")
elif diem >= 70:
    print("👍 Giỏi!")
else:
    print("💪 Cố gắng thêm!")`,
        codeLanguage: "python",
        exercise: "Viết chương trình kiểm tra một số từ 1-100: nếu chia hết cho 3 in 'Fizz', chia hết cho 5 in 'Buzz', chia hết cho cả 3 và 5 in 'FizzBuzz'.",
        exerciseEn: "Write a program to check a number from 1-100: if divisible by 3 print 'Fizz', by 5 print 'Buzz', by both print 'FizzBuzz'.",
        quiz: [
          { question: "Vòng lặp 'Lặp mãi mãi' trong Python tương đương lệnh gì?", options: ["for i in range()", "while True:", "repeat:", "loop:"], answer: 1, explanation: "while True: tạo vòng lặp vô hạn, tương tự 'Lặp mãi mãi' trong Scratch." },
          { question: "Câu lệnh nào kiểm tra điều kiện trong Python?", options: ["for", "while", "if", "def"], answer: 2, explanation: "Lệnh if dùng để kiểm tra điều kiện, tương tự khối 'Nếu...thì' trong Scratch." },
          { question: "Trong Scratch, vòng lặp 'Lặp lại cho đến khi' dừng khi nào?", options: ["Sau 10 lần", "Khi điều kiện bên trong trở thành ĐÚNG", "Khi nhấn phím Space", "Không bao giờ dừng"], answer: 1, explanation: "Vòng lặp 'Lặp lại cho đến khi' (repeat until) sẽ dừng khi điều kiện kiểm tra trở thành True." },
          { question: "Câu lệnh elif trong Python dùng khi nào?", options: ["Thay thế hoàn toàn if", "Kiểm tra thêm điều kiện sau if", "Kết thúc chương trình", "Tạo vòng lặp"], answer: 1, explanation: "elif (else if) dùng để kiểm tra thêm điều kiện khi điều kiện if đầu tiên sai, cho phép nhiều nhánh rẽ." },
          { question: "Đoạn code: for i in range(3): print(i) sẽ in ra gì?", options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], answer: 1, explanation: "range(3) tạo dãy 0, 1, 2 (3 phần tử bắt đầu từ 0). Python luôn đếm từ 0." },
        ],
      },
      {
        id: "scratch-3",
        title: "Biến và danh sách trong Scratch",
        titleEn: "Variables and Lists in Scratch",
        theory: "**Biến (Variable)** là một ô nhớ chứa dữ liệu — hãy tưởng tượng nó như một **chiếc hộp có nhãn dán** 📦. Bạn đặt tên cho hộp (ví dụ: 'điểm_số') và bỏ thứ gì đó vào bên trong (ví dụ: số 0).\n\n**Ví dụ minh họa:**\n```\n📦 điểm_số = 0      → Hộp tên 'điểm_số', bên trong có số 0\n📦 điểm_số = điểm_số + 10  → Mở hộp, lấy 0 ra, cộng 10, bỏ 10 vào lại\n📦 tên = 'Minh'     → Hộp tên 'tên', bên trong có chữ 'Minh'\n```\n\n**Tại sao cần biến?** Giống như bạn chơi game — bạn cần nhớ điểm số, mạng sống, level hiện tại. Biến chính là bộ nhớ của chương trình! 🧠\n\n**Danh sách (List)** là tập hợp nhiều giá trị — giống **dãy tủ locker ở trường** 🗄️. Mỗi tủ có số thứ tự và chứa một vật phẩm.\n```\ntủ_0: ⭐ Sao     (vị trí 0)\ntủ_1: 💎 Kim cương (vị trí 1)\ntủ_2: 🍎 Táo     (vị trí 2)\n```\n\n**Thao tác với danh sách:**\n- 📥 **Thêm** (append): Mở tủ trống tiếp theo, bỏ vật phẩm vào\n- 🗑️ **Xóa** (remove): Lấy vật phẩm ra khỏi tủ\n- 🔍 **Tìm** (index): 'Vật phẩm X ở tủ số mấy?'\n\n**Trò chơi thu thập vật phẩm:**\nBạn đang viết game RPG. Nhân vật có:\n- Biến `mang_song = 3` (3 mạng)\n- Danh sách `tui_do = ['Kiếm', 'Khiên']` (túi đồ)\n- Nhặt đồ mới? → `tui_do.append('Thuốc')` → Túi có 3 vật phẩm!",
        theoryEn: "A **Variable** is a memory cell storing data — think of it as a **labeled box** 📦. You give the box a name (e.g., 'score') and put something inside (e.g., number 0).\n\n**Visual example:**\n```\n📦 score = 0         → Box named 'score', contains 0\n📦 score = score + 10 → Open box, take 0 out, add 10, put 10 back\n📦 name = 'Minh'     → Box named 'name', contains 'Minh'\n```\n\n**Why variables?** Like playing a game — you need to remember score, lives, current level. Variables are your program's memory! 🧠\n\nA **List** is a collection of values — like a **row of school lockers** 🗄️. Each locker has a number and stores an item.\n```\nlocker_0: ⭐ Star      (position 0)\nlocker_1: 💎 Diamond   (position 1)\nlocker_2: 🍎 Apple     (position 2)\n```\n\n**List operations:**\n- 📥 **Add** (append): Open next empty locker, put item in\n- 🗑️ **Remove**: Take item out of locker\n- 🔍 **Find** (index): 'Which locker has item X?'\n\n**Item collection game:**\nYou're writing an RPG. Character has:\n- Variable `lives = 3` (3 lives)\n- List `inventory = ['Sword', 'Shield']`\n- Pick up item? → `inventory.append('Potion')` → Bag now has 3 items!",
        code: `# Biến và danh sách
# Trò chơi thu thập điểm

diem = 0
ten = "Player1"
danh_sach_vat_pham = []

# Thu thập vật phẩm
vat_pham_moi = ["⭐ Sao", "💎 Kim cương", "🍎 Táo"]

for vp in vat_pham_moi:
    danh_sach_vat_pham.append(vp)
    diem += 10
    print(f"Nhặt được: {vp} | Điểm: {diem}")

print(f"\\n🎒 Túi đồ của {ten}:")
for i, vp in enumerate(danh_sach_vat_pham, 1):
    print(f"  {i}. {vp}")
print(f"🏆 Tổng điểm: {diem}")`,
        codeLanguage: "python",
        exercise: "Tạo danh sách 5 con vật yêu thích. In ra số lượng, thêm 1 con vật mới, xóa con vật đầu tiên, và in lại danh sách.",
        exerciseEn: "Create a list of 5 favorite animals. Print the count, add 1 new animal, remove the first one, and print the list again.",
        quiz: [
          { question: "Biến trong Python được khai báo bằng cách nào?", options: ["var x = 5", "int x = 5", "x = 5", "let x = 5"], answer: 2, explanation: "Python khai báo biến đơn giản bằng tên_biến = giá_trị, không cần từ khóa đặc biệt." },
          { question: "Thêm phần tử vào cuối list dùng lệnh gì?", options: [".add()", ".append()", ".insert()", ".push()"], answer: 1, explanation: "list.append(x) thêm x vào cuối danh sách." },
          { question: "Lệnh len([1, 2, 3]) trả về giá trị gì?", options: ["2", "3", "4", "Lỗi"], answer: 1, explanation: "len() đếm số phần tử trong list. List [1, 2, 3] có 3 phần tử nên trả về 3." },
          { question: "Muốn xóa phần tử ở vị trí thứ 2 trong list, dùng lệnh gì?", options: ["list.remove(2)", "list.pop(1)", "list.delete(2)", "del list(1)"], answer: 1, explanation: "list.pop(1) xóa phần tử ở index 1 (vị trí thứ 2, vì index bắt đầu từ 0). list.remove() xóa theo giá trị." },
          { question: "Biến x = 10, sau khi chạy x = x + 5 thì x bằng bao nhiêu?", options: ["10", "5", "15", "Lỗi"], answer: 2, explanation: "x = x + 5 nghĩa là lấy giá trị hiện tại (10) cộng 5, rồi gán lại kết quả (15) vào x." },
        ],
      },
    ],
  },
  {
    id: "prog-python-basic",
    title: "Python cơ bản",
    titleEn: "Python Basics",
    icon: "🐍",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Biến, vòng lặp, hàm và các kiểu dữ liệu cơ bản",
    descriptionEn: "Variables, loops, functions and basic data types",
    course: "kids",
    lessons: [
      {
        id: "py-basic-1",
        title: "Biến và kiểu dữ liệu",
        titleEn: "Variables and Data Types",
        theory: "Python có các kiểu dữ liệu chính — hãy nghĩ chúng như **các loại hộp khác nhau** để chứa các thứ khác nhau:\n\n**🔢 int — Số nguyên** (hộp chỉ chứa số đếm được)\nVí dụ: tuổi = 15, số bạn = 42, nhiệt độ = -7\nGiống số trên bảng điểm — không có phần thập phân.\n\n**📐 float — Số thực** (hộp chứa số có dấu phẩy)\nVí dụ: pi = 3.14159, chiều cao = 1.68, giá = -0.5\nGiống cân nặng trên cân điện tử — chính xác đến phần thập phân.\n\n**📝 str — Chuỗi ký tự** (hộp chứa chữ/từ)\nVí dụ: ten = \"Minh\", loi_chao = 'Xin chào!'\nLuôn nằm trong dấu nháy \" \" hoặc ' '. Giống tin nhắn trong điện thoại 📱\n\n**✅ bool — Logic đúng/sai** (hộp chỉ có 2 trạng thái)\nVí dụ: dang_online = True, da_lam_bai = False\nGiống công tắc đèn 💡 — chỉ có BẬT (True) hoặc TẮT (False).\n\n**🏷️ Quy tắc đặt tên biến:**\n- ✅ `my_score`, `_name`, `player1` → Hợp lệ\n- ❌ `2name` (bắt đầu bằng số), `my-var` (có dấu gạch), `class` (từ khóa Python)\n- 💡 Mẹo: dùng snake_case: `diem_trung_binh` thay vì `diemtrungbinh`\n\n**🔄 Chuyển đổi kiểu — Biến hình dữ liệu:**\n```\nstr(42) → \"42\"    (số → chữ, để nối chuỗi)\nint(\"42\") → 42    (chữ → số, để tính toán)\nfloat(\"3.14\") → 3.14\n```",
        theoryEn: "Python has main data types — think of them as **different types of boxes** for different things:\n\n**🔢 int — Integer** (box for countable numbers)\nExamples: age = 15, friends = 42, temperature = -7\nLike scores on a report card — no decimal points.\n\n**📐 float — Float** (box for decimal numbers)\nExamples: pi = 3.14159, height = 1.68, price = -0.5\nLike weight on a digital scale — precise to decimal places.\n\n**📝 str — String** (box for text/words)\nExamples: name = \"Minh\", greeting = 'Hello!'\nAlways in quotes \" \" or ' '. Like text messages on your phone 📱\n\n**✅ bool — Boolean** (box with only 2 states)\nExamples: is_online = True, homework_done = False\nLike a light switch 💡 — only ON (True) or OFF (False).\n\n**🏷️ Variable naming rules:**\n- ✅ `my_score`, `_name`, `player1` → Valid\n- ❌ `2name` (starts with number), `my-var` (has dash), `class` (Python keyword)\n- 💡 Tip: use snake_case: `average_score` instead of `averagescore`\n\n**🔄 Type conversion — Shapeshifting data:**\n```\nstr(42) → \"42\"    (number → text, for concatenation)\nint(\"42\") → 42    (text → number, for math)\nfloat(\"3.14\") → 3.14\n```",
        code: `# Khai báo biến
ten = "Minh"           # str
tuoi = 12              # int
chieu_cao = 1.52       # float
hoc_gioi = True        # bool

# In thông tin
print(f"Tên: {ten}")
print(f"Tuổi: {tuoi}")
print(f"Chiều cao: {chieu_cao}m")
print(f"Học giỏi: {hoc_gioi}")

# Kiểm tra kiểu dữ liệu
print(type(ten))       # <class 'str'>
print(type(tuoi))      # <class 'int'>

# Chuyển đổi kiểu
tuoi_str = str(tuoi)   # int → str
so = int("42")         # str → int`,
        codeLanguage: "python",
        exercise: "Khai báo biến chứa: tên, tuổi, điểm trung bình (số thực), và biến kiểm tra có phải học sinh giỏi không. In ra tất cả thông tin bằng f-string.",
        exerciseEn: "Declare variables for: name, age, average score (float), and whether the student is excellent. Print all info using f-string.",
        quiz: [
          { question: "Kiểu dữ liệu của 3.14 là gì?", options: ["int", "str", "float", "bool"], answer: 2, explanation: "3.14 là số thực (có phần thập phân) nên kiểu là float." },
          { question: "Lệnh type('Hello') trả về gì?", options: ["<class 'int'>", "<class 'str'>", "<class 'list'>", "<class 'bool'>"], answer: 1, explanation: "'Hello' là chuỗi ký tự nên type() trả về <class 'str'>." },
          { question: "Tên biến nào hợp lệ trong Python?", options: ["my-var", "2name", "_score", "class"], answer: 2, explanation: "_score hợp lệ vì bắt đầu bằng _ . 'class' là từ khóa, '2name' bắt đầu bằng số, 'my-var' có dấu gạch ngang." },
          { question: "int('3.14') sẽ cho kết quả gì?", options: ["3", "3.14", "Lỗi ValueError", "'3'"], answer: 2, explanation: "int() không thể chuyển chuỗi có dấu chấm thập phân trực tiếp. Cần dùng int(float('3.14')) = 3." },
          { question: "f-string trong Python dùng cú pháp nào?", options: ["format('...')", "f'...{biến}...'", "str.format(biến)", "print(biến)"], answer: 1, explanation: "f-string dùng cú pháp f'text {biến}' — cách nhanh và đọc được nhất để chèn biến vào chuỗi từ Python 3.6+." },
        ],
      },
      {
        id: "py-basic-2",
        title: "Hàm (Functions)",
        titleEn: "Functions",
        theory: "**Hàm** là một khối code có tên, thực hiện một nhiệm vụ cụ thể — giống **công thức nấu ăn** 🍳!\n\nTưởng tượng bạn hay pha trà sữa. Mỗi lần bạn phải: lấy trà → đun nước → pha trà → thêm sữa → thêm đường. Thay vì nhớ 5 bước mỗi lần, bạn viết một 'công thức' tên `pha_tra_sua()` — lần sau chỉ cần gọi tên!\n\n**Cấu trúc hàm:**\n```python\ndef ten_ham(nguyen_lieu):    # Tên + Nguyên liệu\n    # Các bước thực hiện      # Công thức\n    return thanh_pham          # Thành phẩm\n```\n\n**Ví dụ minh họa:**\n```\n🧑‍🍳 def lam_banh(bot, trung, duong):\n      tron(bot, trung, duong)     # Bước 1\n      nuong(180, 30_phut)         # Bước 2\n      return banh_ngon            # Xong!\n\n🍰 banh = lam_banh('bot_mi', 2, '100g')  # Gọi hàm\n```\n\n**3 lợi ích lớn:**\n1. 🔁 **Tái sử dụng:** Viết 1 lần, gọi 100 lần. Không copy-paste!\n2. 📖 **Dễ đọc:** `tinh_diem_tb(8, 9, 7)` rõ nghĩa hơn `(8+9+7)/3`\n3. 🐛 **Dễ sửa lỗi:** Bug ở hàm nào → sửa hàm đó, không ảnh hưởng chỗ khác.\n\n**Tham số mặc định — Đặt sẵn 'mặc định':**\n```python\ndef chao(ten, ngon_ngu='vi'):  # Mặc định tiếng Việt\n    ...\nchao('Minh')          # → 'Xin chào, Minh!'\nchao('John', 'en')    # → 'Hello, John!'\n```\nGiống đặt pizza: nếu không nói gì, mặc định size M. Muốn size L thì nói thêm!",
        theoryEn: "A **Function** is a named block of code that performs a specific task — like a **cooking recipe** 🍳!\n\nImagine you often make bubble tea. Each time: get tea → boil water → brew → add milk → add sugar. Instead of remembering 5 steps each time, write a 'recipe' called `make_bubble_tea()` — next time just call its name!\n\n**Function structure:**\n```python\ndef function_name(ingredients):  # Name + Ingredients\n    # Steps to follow              # Recipe\n    return finished_product        # Done!\n```\n\n**Visual example:**\n```\n🧑‍🍳 def bake_cake(flour, eggs, sugar):\n      mix(flour, eggs, sugar)        # Step 1\n      bake(180, 30_minutes)          # Step 2\n      return delicious_cake          # Done!\n\n🍰 cake = bake_cake('flour', 2, '100g')  # Call function\n```\n\n**3 major benefits:**\n1. 🔁 **Reusable:** Write once, call 100 times. No copy-paste!\n2. 📖 **Readable:** `calc_average(8, 9, 7)` is clearer than `(8+9+7)/3`\n3. 🐛 **Debuggable:** Bug in which function → fix that function, no side effects.\n\n**Default parameters — Pre-set 'defaults':**\n```python\ndef greet(name, language='en'):  # Default English\n    ...\ngreet('Minh')           # → 'Hello, Minh!'\ngreet('Minh', 'vi')     # → 'Xin chào, Minh!'\n```\nLike ordering pizza: if you say nothing, default is Medium. Want Large? Just specify!",
        code: `# Hàm tính diện tích hình chữ nhật
def dien_tich_hcn(chieu_dai, chieu_rong):
    return chieu_dai * chieu_rong

# Hàm kiểm tra số chẵn/lẻ
def kiem_tra_chan_le(so):
    if so % 2 == 0:
        return f"{so} là số chẵn ✅"
    else:
        return f"{so} là số lẻ ❌"

# Hàm chào hỏi với giá trị mặc định
def chao(ten, ngon_ngu="vi"):
    if ngon_ngu == "vi":
        return f"Xin chào, {ten}! 👋"
    else:
        return f"Hello, {ten}! 👋"

# Sử dụng
print(dien_tich_hcn(5, 3))       # 15
print(kiem_tra_chan_le(7))         # 7 là số lẻ
print(chao("Minh"))               # Xin chào, Minh!
print(chao("John", "en"))         # Hello, John!`,
        codeLanguage: "python",
        exercise: "Viết 3 hàm: (1) tính chu vi hình tròn, (2) kiểm tra số nguyên tố, (3) đếm số nguyên âm trong chuỗi.",
        exerciseEn: "Write 3 functions: (1) calculate circle circumference, (2) check if prime number, (3) count vowels in a string.",
        quiz: [
          { question: "Từ khóa nào dùng để khai báo hàm?", options: ["func", "function", "def", "method"], answer: 2, explanation: "Python dùng 'def' (viết tắt của define) để khai báo hàm." },
          { question: "Lệnh 'return' trong hàm có tác dụng gì?", options: ["In ra màn hình", "Trả về giá trị và kết thúc hàm", "Lặp lại hàm", "Xóa hàm"], answer: 1, explanation: "return trả về giá trị cho nơi gọi hàm và kết thúc hàm ngay lập tức." },
          { question: "Hàm không có lệnh return sẽ trả về gì?", options: ["0", "False", "None", "Lỗi"], answer: 2, explanation: "Trong Python, hàm không có return sẽ tự động trả về None — giá trị đặc biệt nghĩa là 'không có gì'." },
          { question: "Tham số *args trong hàm Python dùng để làm gì?", options: ["Nhận đúng 1 đối số", "Nhận số lượng đối số tùy ý", "Khai báo biến toàn cục", "Tạo list rỗng"], answer: 1, explanation: "args cho phép hàm nhận số lượng đối số vị trí (positional arguments) không giới hạn, gom vào tuple." },
          { question: "Lambda function là gì?", options: ["Hàm có tên đặc biệt", "Hàm ẩn danh viết trên 1 dòng", "Hàm chỉ dùng 1 lần rồi tự xóa", "Hàm import từ thư viện"], answer: 1, explanation: "Lambda là hàm ẩn danh (anonymous function) viết gọn trên 1 dòng: lambda x: x * 2. Thường dùng với map(), filter()." },
        ],
      },
      {
        id: "py-basic-3",
        title: "Vòng lặp for & while",
        titleEn: "For & While Loops",
        theory: "**Vòng lặp** giúp bạn tự động hóa công việc lặp đi lặp lại — giống **robot làm việc thay bạn** 🤖\n\n**for — Lặp qua dãy đã biết trước:**\nGiống bạn phát bài kiểm tra cho 30 học sinh — bạn biết trước có 30 bạn.\n```\nDanh sách: [An, Bình, Chi, Dũng]\nfor mỗi bạn trong danh sách:\n    phát bài kiểm tra cho bạn đó\n```\n\n**while — Lặp khi điều kiện còn đúng:**\nGiống ăn buffet — bạn ăn **cho đến khi** no. Không biết trước ăn bao nhiêu!\n```\nwhile chưa no:\n    lấy thêm đồ ăn\n    ăn\nprint('No rồi! 🫃')\n```\n\n**🎮 Lệnh điều khiển vòng lặp:**\n- 🚪 **break:** Thoát ngay! Giống kéo còi báo động → dừng mọi thứ.\n  ```python\n  for i in range(100):\n      if i == 5: break  # Dừng ở số 5, không chạy tiếp\n  ```\n- ⏭️ **continue:** Bỏ qua lần này, chạy tiếp! Giống gặp bài khó trong đề thi → bỏ qua, làm bài khác.\n  ```python\n  for i in range(10):\n      if i % 2 == 0: continue  # Bỏ qua số chẵn\n      print(i)  # Chỉ in số lẻ: 1, 3, 5, 7, 9\n  ```\n\n**📊 range() — Tạo dãy số tự động:**\n- `range(5)` → 0️⃣1️⃣2️⃣3️⃣4️⃣ (5 số, bắt đầu từ 0)\n- `range(1, 6)` → 1️⃣2️⃣3️⃣4️⃣5️⃣ (từ 1 đến 5)\n- `range(0, 10, 2)` → 0️⃣2️⃣4️⃣6️⃣8️⃣ (đếm cách 2)\n- `range(10, 0, -1)` → đếm ngược! 🔟9️⃣8️⃣...1️⃣",
        theoryEn: "**Loops** automate repetitive tasks — like a **robot doing work for you** 🤖\n\n**for — Loop through a known sequence:**\nLike handing out tests to 30 students — you know there are exactly 30.\n```\nStudent list: [An, Binh, Chi, Dung]\nfor each student in list:\n    hand out test to that student\n```\n\n**while — Loop while condition is true:**\nLike eating at a buffet — you eat **until** full. Don't know how many plates!\n```\nwhile not full:\n    get more food\n    eat\nprint('Full now! 🫃')\n```\n\n**🎮 Loop control statements:**\n- 🚪 **break:** Exit immediately! Like pulling a fire alarm → stop everything.\n  ```python\n  for i in range(100):\n      if i == 5: break  # Stops at 5, doesn't continue\n  ```\n- ⏭️ **continue:** Skip this round, keep going! Like skipping a hard question on an exam → move on.\n  ```python\n  for i in range(10):\n      if i % 2 == 0: continue  # Skip even numbers\n      print(i)  # Only prints odds: 1, 3, 5, 7, 9\n  ```\n\n**📊 range() — Auto-generate number sequences:**\n- `range(5)` → 0️⃣1️⃣2️⃣3️⃣4️⃣ (5 numbers, starting from 0)\n- `range(1, 6)` → 1️⃣2️⃣3️⃣4️⃣5️⃣ (from 1 to 5)\n- `range(0, 10, 2)` → 0️⃣2️⃣4️⃣6️⃣8️⃣ (step by 2)\n- `range(10, 0, -1)` → count down! 🔟9️⃣8️⃣...1️⃣",
        code: `# Vòng lặp for - In bảng cửu chương
so = 7
print(f"📋 Bảng cửu chương {so}:")
for i in range(1, 11):
    print(f"  {so} x {i} = {so * i}")

# Vòng lặp while - Đoán số
import random
so_bi_mat = random.randint(1, 20)
so_lan = 0

while True:
    du_doan = int(input("Đoán số (1-20): "))
    so_lan += 1
    if du_doan == so_bi_mat:
        print(f"🎉 Đúng rồi! Bạn đoán {so_lan} lần")
        break
    elif du_doan < so_bi_mat:
        print("📈 Lớn hơn!")
    else:
        print("📉 Nhỏ hơn!")`,
        codeLanguage: "python",
        exercise: "Viết chương trình tính tổng các số từ 1 đến N (nhập từ bàn phím) bằng cả 2 cách: for và while.",
        exerciseEn: "Write a program to sum numbers from 1 to N (user input) using both for and while loops.",
        quiz: [
          { question: "range(1, 5) tạo ra dãy số nào?", options: ["1,2,3,4,5", "0,1,2,3,4", "1,2,3,4", "1,2,3,4,5,6"], answer: 2, explanation: "range(1,5) tạo dãy từ 1 đến 4 (không bao gồm 5)." },
          { question: "Lệnh nào thoát khỏi vòng lặp ngay lập tức?", options: ["exit", "stop", "break", "return"], answer: 2, explanation: "break thoát khỏi vòng lặp gần nhất ngay lập tức." },
          { question: "Vòng lặp while True sẽ dừng khi nào?", options: ["Sau 100 lần lặp", "Khi gặp lệnh break", "Khi biến = False", "Không bao giờ dừng"], answer: 1, explanation: "while True tạo vòng lặp vô hạn. Cách duy nhất thoát là dùng break bên trong vòng lặp." },
          { question: "Lệnh continue trong vòng lặp có tác dụng gì?", options: ["Thoát vòng lặp", "Bỏ qua phần còn lại và chạy lần lặp tiếp", "Tạm dừng 1 giây", "Quay lại đầu chương trình"], answer: 1, explanation: "continue bỏ qua các lệnh phía dưới trong lần lặp hiện tại và nhảy sang lần lặp tiếp theo." },
          { question: "for i in range(10, 0, -2) sẽ tạo dãy số nào?", options: ["10, 8, 6, 4, 2", "10, 8, 6, 4, 2, 0", "0, 2, 4, 6, 8, 10", "10, 9, 8, ..., 1"], answer: 0, explanation: "range(10, 0, -2) đếm ngược từ 10, bước -2, dừng trước 0: 10, 8, 6, 4, 2." },
        ],
      },
    ],
  },
  {
    id: "prog-data-structures",
    title: "Cấu trúc dữ liệu & Thuật toán",
    titleEn: "Data Structures & Algorithms",
    icon: "🏗️",
    color: "from-blue-500/20 to-cyan-500/20",
    description: "Array, List, Dictionary, Sorting và Searching",
    descriptionEn: "Array, List, Dictionary, Sorting and Searching",
    course: "kids",
    lessons: [
      {
        id: "ds-1",
        title: "List, Tuple và Dictionary",
        titleEn: "List, Tuple and Dictionary",
        theory: "Cấu trúc dữ liệu là cách bạn **tổ chức và sắp xếp thông tin** — giống như cách bạn sắp xếp đồ trong phòng! 🏠\n\n**📋 List [] — Danh sách linh hoạt:**\nGiống **danh sách mua sắm** — bạn có thể thêm, xóa, sắp xếp lại bất cứ lúc nào.\n```python\nmua_sam = ['sữa', 'trứng', 'bánh mì']\nmua_sam.append('phô mai')     # Thêm cuối: [..., 'phô mai']\nmua_sam.insert(0, 'nước')     # Thêm đầu: ['nước', ...]\nmua_sam.remove('trứng')       # Xóa: bỏ 'trứng'\nmua_sam.sort()                # Sắp xếp A-Z\n```\n\n**📌 Tuple () — Dữ liệu cố định 'không thể sửa':**\nGiống **tọa độ GPS** — một khi xác định, không ai thay đổi được!\n```python\nha_noi = (21.028511, 105.804817)    # Vĩ độ, Kinh độ\nha_noi[0] = 0  # ❌ LỖI! Tuple không cho sửa!\n```\nDùng khi dữ liệu KHÔNG BAO GIỜ nên thay đổi: ngày sinh, mã quốc gia, hằng số vật lý.\n\n**📖 Dictionary {} — Từ điển tra cứu siêu nhanh:**\nGiống **danh bạ điện thoại** — biết tên → tra ra số ngay lập tức!\n```python\ndanh_ba = {\n    'Minh': '0901234567',     # key: value\n    'An':   '0987654321',\n}\ndanh_ba['Minh']  # → '0901234567' (tra cứu cực nhanh!)\n```\n\n**🤔 Khi nào dùng gì?**\n| Tình huống | Chọn | Lý do |\n|---|---|---|\n| Danh sách học sinh (thêm/bớt) | List | Thay đổi thường xuyên |\n| Tọa độ GPS | Tuple | Không bao giờ đổi |\n| Bảng điểm (tên→điểm) | Dict | Tra cứu nhanh theo tên |",
        theoryEn: "Data structures are how you **organize and arrange information** — like how you arrange things in your room! 🏠\n\n**📋 List [] — Flexible list:**\nLike a **shopping list** — you can add, remove, rearrange anytime.\n```python\nshopping = ['milk', 'eggs', 'bread']\nshopping.append('cheese')      # Add end: [..., 'cheese']\nshopping.insert(0, 'water')    # Add front: ['water', ...]\nshopping.remove('eggs')        # Remove: drop 'eggs'\nshopping.sort()                # Sort A-Z\n```\n\n**📌 Tuple () — Fixed 'read-only' data:**\nLike **GPS coordinates** — once set, nobody can change them!\n```python\nhanoi = (21.028511, 105.804817)    # Latitude, Longitude\nhanoi[0] = 0  # ❌ ERROR! Tuples don't allow changes!\n```\nUse when data should NEVER change: birthday, country code, physics constants.\n\n**📖 Dictionary {} — Ultra-fast lookup book:**\nLike a **phone book** — know the name → get the number instantly!\n```python\ncontacts = {\n    'Minh': '0901234567',     # key: value\n    'An':   '0987654321',\n}\ncontacts['Minh']  # → '0901234567' (blazing fast lookup!)\n```\n\n**🤔 When to use what?**\n| Situation | Choice | Reason |\n|---|---|---|\n| Student roster (add/remove) | List | Changes frequently |\n| GPS coordinates | Tuple | Never changes |\n| Grade book (name→score) | Dict | Fast lookup by name |",
        code: `# LIST - Danh sách học sinh
hoc_sinh = ["An", "Bình", "Chi", "Dũng"]
hoc_sinh.append("Em")        # Thêm cuối
hoc_sinh.insert(0, "Anh")    # Thêm đầu
hoc_sinh.sort()               # Sắp xếp A-Z
print(f"Lớp có {len(hoc_sinh)} bạn: {hoc_sinh}")

# TUPLE - Tọa độ không đổi
vi_tri = (10.762622, 106.660172)  # HCM
print(f"Tọa độ TP.HCM: {vi_tri}")

# DICTIONARY - Điểm số
diem = {
    "An": {"Toán": 9, "Văn": 8, "Anh": 7},
    "Bình": {"Toán": 7, "Văn": 9, "Anh": 8},
}
for ten, mon in diem.items():
    tb = sum(mon.values()) / len(mon)
    print(f"{ten}: TB = {tb:.1f}")`,
        codeLanguage: "python",
        exercise: "Tạo dictionary chứa thông tin 3 sản phẩm (tên, giá, số lượng). Viết hàm tính tổng giá trị kho hàng.",
        exerciseEn: "Create a dictionary with 3 products (name, price, quantity). Write a function to calculate total inventory value.",
        quiz: [
          { question: "Kiểu dữ liệu nào không thể thay đổi sau khi tạo?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2, explanation: "Tuple là kiểu dữ liệu bất biến (immutable) - không thể thêm, xóa hay sửa phần tử." },
          { question: "Truy xuất giá trị trong dict dùng cú pháp nào?", options: ["dict(key)", "dict[key]", "dict.key", "dict->key"], answer: 1, explanation: "Python dùng dict[key] hoặc dict.get(key) để truy xuất giá trị." },
          { question: "Set trong Python khác List ở điểm nào?", options: ["Set có thứ tự", "Set không chứa phần tử trùng lặp", "Set nhanh hơn khi append", "Set dùng ngoặc vuông"], answer: 1, explanation: "Set {} không cho phép phần tử trùng lặp và không có thứ tự. List [] cho phép trùng và có thứ tự." },
          { question: "dict.get('key', 'default') khác dict['key'] ở điểm nào?", options: ["Nhanh hơn", "Trả về giá trị mặc định nếu key không tồn tại thay vì lỗi", "Chỉ dùng cho số", "Không khác gì"], answer: 1, explanation: "dict.get() trả về giá trị default nếu key không tồn tại, trong khi dict[key] sẽ raise KeyError." },
          { question: "List comprehension [x**2 for x in range(5)] tạo ra gì?", options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 2, 4, 6, 8]", "[0, 1, 2, 3, 4]"], answer: 0, explanation: "List comprehension tính x² cho x từ 0 đến 4: 0²=0, 1²=1, 2²=4, 3²=9, 4²=16." },
        ],
      },
      {
        id: "ds-2",
        title: "Thuật toán sắp xếp",
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
        print(f"  Lượt {i+1}: {arr}")
    return arr

diem = [64, 34, 25, 12, 22, 11, 90]
print(f"Ban đầu: {diem}")
print(f"Kết quả: {bubble_sort(diem.copy())}")

# Selection Sort - Sắp xếp chọn
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
        exercise: "Viết hàm Insertion Sort và so sánh số lần swap với Bubble Sort trên cùng một mảng 10 phần tử ngẫu nhiên.",
        exerciseEn: "Write an Insertion Sort function and compare swap counts with Bubble Sort on the same random 10-element array.",
        quiz: [
          { question: "Bubble Sort có độ phức tạp thời gian trung bình là?", options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"], answer: 2, explanation: "Bubble Sort có 2 vòng lặp lồng nhau nên độ phức tạp là O(n²)." },
          { question: "Thuật toán nào tốt nhất cho mảng gần như đã sắp xếp?", options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Tất cả như nhau"], answer: 2, explanation: "Insertion Sort đạt O(n) trong trường hợp tốt nhất (mảng đã sắp xếp gần đúng)." },
          { question: "Thuật toán nào nhanh nhất khi mảng gần như đã sắp xếp?", options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Cả 3 như nhau"], answer: 2, explanation: "Insertion Sort đạt O(n) khi mảng gần sắp xếp — mỗi phần tử chỉ cần dịch 0-1 vị trí." },
          { question: "Merge Sort có độ phức tạp thời gian trung bình là bao nhiêu?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, explanation: "Merge Sort luôn đạt O(n log n) nhờ chia đôi mảng (log n lần) và merge (n phép so sánh mỗi lần)." },
          { question: "Stable sort nghĩa là gì?", options: ["Chạy nhanh và ổn định", "Giữ nguyên thứ tự các phần tử bằng nhau", "Không tốn thêm bộ nhớ", "Luôn sắp xếp tăng dần"], answer: 1, explanation: "Stable sort giữ nguyên vị trí tương đối của các phần tử có giá trị bằng nhau trong mảng gốc." },
        ],
      },
      {
        id: "ds-3",
        title: "Thuật toán tìm kiếm",
        titleEn: "Searching Algorithms",
        theory: "**Thuật toán tìm kiếm** giúp bạn tìm một thứ cụ thể trong đống dữ liệu — giống **tìm cuốn sách trong thư viện** 📚\n\n**🔍 Linear Search — Tìm kiếm tuần tự:**\nGiống tìm bạn trong lớp học — bạn nhìn từng người một, từ đầu đến cuối.\n```\nDanh sách: [🍎, 🍊, 🍋, 🍇, 🍓]\nTìm 🍇:\n  Nhìn 🍎 → Không phải\n  Nhìn 🍊 → Không phải  \n  Nhìn 🍋 → Không phải\n  Nhìn 🍇 → TÌM THẤY! ✅ (mất 4 bước)\n```\n⏱️ Tốc độ: O(n) — Nếu 1000 trái cây, tệ nhất tìm 1000 lần!\n\n**⚡ Binary Search — Tìm kiếm nhị phân (chia đôi):**\nGiống **tìm từ trong từ điển** — bạn không đọc từ trang 1! Bạn mở giữa, xem từ cần tìm ở nửa trước hay nửa sau.\n```\nDãy đã sắp xếp: [1, 3, 5, 7, 9, 11, 13, 15]\nTìm số 11:\n  Bước 1: Giữa = 7 → 11 > 7 → tìm bên phải [9, 11, 13, 15]\n  Bước 2: Giữa = 11 → TÌM THẤY! ✅ (chỉ 2 bước!)\n```\n\n**⚠️ ĐIỀU KIỆN:** Dữ liệu PHẢI được sắp xếp trước! (Bạn không thể dùng chiến thuật từ điển nếu các từ xếp ngẫu nhiên)\n\n**🏆 So sánh kinh ngạc:**\n| Số phần tử | Linear Search | Binary Search |\n|---|---|---|\n| 100 | tối đa 100 bước | tối đa 7 bước |\n| 1,000 | 1,000 bước | ~10 bước |\n| 1,000,000 | 1 TRIỆU bước | ~20 bước! 🤯 |\n| 1 tỷ | 1 TỶ bước | ~30 bước! |\n\nBinary Search nhanh đến mức khó tin! Với 1 tỷ phần tử, chỉ cần 30 lần 'chia đôi' là tìm thấy!",
        theoryEn: "**Searching algorithms** help you find a specific item in a pile of data — like **finding a book in a library** 📚\n\n**🔍 Linear Search — Sequential search:**\nLike finding a friend in class — you look at each person one by one, start to end.\n```\nList: [🍎, 🍊, 🍋, 🍇, 🍓]\nFind 🍇:\n  Look at 🍎 → Nope\n  Look at 🍊 → Nope  \n  Look at 🍋 → Nope\n  Look at 🍇 → FOUND! ✅ (took 4 steps)\n```\n⏱️ Speed: O(n) — 1000 fruits? Worst case: 1000 checks!\n\n**⚡ Binary Search — Halving search:**\nLike **looking up a word in a dictionary** — you don't read from page 1! You open the middle, check if your word is in the first or second half.\n```\nSorted array: [1, 3, 5, 7, 9, 11, 13, 15]\nFind 11:\n  Step 1: Middle = 7 → 11 > 7 → search right [9, 11, 13, 15]\n  Step 2: Middle = 11 → FOUND! ✅ (only 2 steps!)\n```\n\n**⚠️ REQUIREMENT:** Data MUST be sorted first! (You can't use dictionary strategy if words are randomly arranged)\n\n**🏆 Mind-blowing comparison:**\n| Elements | Linear Search | Binary Search |\n|---|---|---|\n| 100 | max 100 steps | max 7 steps |\n| 1,000 | 1,000 steps | ~10 steps |\n| 1,000,000 | 1 MILLION steps | ~20 steps! 🤯 |\n| 1 billion | 1 BILLION steps | ~30 steps! |\n\nBinary Search is unbelievably fast! With 1 billion elements, just 30 'halves' to find it!",
        code: `# Linear Search - Tìm kiếm tuần tự
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Binary Search - Tìm kiếm nhị phân
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    steps = 0
    while left <= right:
        steps += 1
        mid = (left + right) // 2
        if arr[mid] == target:
            print(f"  ✅ Tìm thấy sau {steps} bước!")
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

data = list(range(1, 101))  # [1, 2, ..., 100]
print("Tìm số 73:")
result = binary_search(data, 73)
print(f"  Vị trí: {result}")`,
        codeLanguage: "python",
        exercise: "Viết chương trình đo thời gian chạy của Linear Search vs Binary Search trên mảng 100,000 phần tử.",
        exerciseEn: "Write a program to measure runtime of Linear Search vs Binary Search on a 100,000-element array.",
        quiz: [
          { question: "Binary Search yêu cầu gì?", options: ["Mảng rỗng", "Mảng đã sắp xếp", "Mảng có số chẵn phần tử", "Mảng số nguyên"], answer: 1, explanation: "Binary Search chỉ hoạt động trên mảng đã được sắp xếp vì nó dựa vào thứ tự để loại nửa mảng." },
          { question: "Tìm 1 số trong mảng 1024 phần tử, Binary Search cần tối đa bao nhiêu bước?", options: ["1024", "512", "10", "32"], answer: 2, explanation: "log₂(1024) = 10. Binary Search cần tối đa 10 bước cho 1024 phần tử." },
          { question: "Binary Search yêu cầu điều kiện gì cho mảng?", options: ["Mảng phải có ít nhất 100 phần tử", "Mảng phải được sắp xếp trước", "Mảng chỉ chứa số nguyên", "Mảng không có phần tử trùng"], answer: 1, explanation: "Binary Search chỉ hoạt động trên mảng đã sắp xếp vì thuật toán chia đôi dựa vào thứ tự phần tử." },
          { question: "Tìm kiếm tuyến tính có độ phức tạp bao nhiêu?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 2, explanation: "Tìm kiếm tuyến tính duyệt từng phần tử một, trường hợp xấu nhất phải duyệt hết n phần tử → O(n)." },
          { question: "Hash Table tra cứu trung bình có độ phức tạp bao nhiêu?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "Hash Table sử dụng hàm băm để tính trực tiếp vị trí lưu trữ, nên tra cứu trung bình chỉ O(1)." },
        ],
      },
    ],
  },
  {
    id: "prog-pygame",
    title: "Dự án thực tế: Game & Web",
    titleEn: "Real Projects: Games & Web",
    icon: "🎮",
    color: "from-pink-500/20 to-rose-500/20",
    description: "Xây dựng game bằng Pygame và website cá nhân bằng HTML/CSS",
    descriptionEn: "Build games with Pygame and personal websites with HTML/CSS",
    course: "kids",
    lessons: [
      {
        id: "game-1",
        title: "Pygame: Tạo cửa sổ game đầu tiên",
        titleEn: "Pygame: Your First Game Window",
        theory: "**Pygame** là thư viện Python để tạo game 2D — biến bạn thành **nhà phát triển game thực thụ** 🎮!\n\n**Hãy tưởng tượng** bạn đang quay phim hoạt hình: camera quay liên tục 60 khung hình/giây. Mỗi khung hình, bạn phải:\n1. Xem khán giả bấm nút gì (sự kiện)\n2. Di chuyển nhân vật theo nút bấm (cập nhật)\n3. Vẽ lại toàn bộ cảnh mới (render)\n\n**🏗️ Cấu trúc game — 4 bước luôn cố định:**\n```\n1. 🔧 Khởi tạo: pygame.init() → Bật 'máy quay'\n2. 📺 Tạo cửa sổ: set_mode((600, 400)) → Mở 'rạp chiếu'\n3. 🔄 Vòng lặp game (60 FPS):\n   ├─ 🎮 Xử lý sự kiện: Nhấn ← → ↑ ↓? Click chuột?\n   ├─ 📐 Cập nhật: Nhân vật di chuyển, va chạm, điểm số\n   └─ 🎨 Vẽ: Xóa màn hình cũ → vẽ nền → vẽ nhân vật → hiển thị\n4. 🚪 Thoát: pygame.quit() → Tắt 'máy quay'\n```\n\n**🎨 Hệ tọa độ trong Pygame:**\n```\n(0,0) ────────→ x (chiều ngang)\n  │  ┌──────────┐\n  │  │ Màn hình  │\n  │  │   game    │\n  ↓  └──────────┘\n  y (chiều dọc)\n```\n⚠️ Chú ý: y đi XUỐNG (ngược với toán học)! Nên `y -= 5` = đi LÊN.\n\n**🕹️ Xử lý phím — Tạo điều khiển mượt mà:**\n```python\nkeys = pygame.key.get_pressed()  # Kiểm tra phím đang nhấn\nif keys[K_LEFT]:  x -= speed      # ← Di chuyển trái\nif keys[K_RIGHT]: x += speed      # → Di chuyển phải\nif keys[K_UP]:    y -= speed      # ↑ Di chuyển lên (y giảm!)\nif keys[K_DOWN]:  y += speed      # ↓ Di chuyển xuống\n```",
        theoryEn: "**Pygame** is a Python library for 2D games — turning you into a **real game developer** 🎮!\n\n**Imagine** you're filming an animation: camera runs continuously at 60 frames/second. Each frame, you must:\n1. Check what buttons the audience pressed (events)\n2. Move characters based on input (update)\n3. Redraw the entire scene (render)\n\n**🏗️ Game structure — 4 fixed steps:**\n```\n1. 🔧 Initialize: pygame.init() → Turn on 'camera'\n2. 📺 Create window: set_mode((600, 400)) → Open 'theater'\n3. 🔄 Game loop (60 FPS):\n   ├─ 🎮 Handle events: Pressed ← → ↑ ↓? Mouse click?\n   ├─ 📐 Update: Character moves, collisions, score\n   └─ 🎨 Draw: Clear old screen → draw background → draw character → display\n4. 🚪 Quit: pygame.quit() → Turn off 'camera'\n```\n\n**🎨 Coordinate system in Pygame:**\n```\n(0,0) ────────→ x (horizontal)\n  │  ┌──────────┐\n  │  │  Game     │\n  │  │  Screen   │\n  ↓  └──────────┘\n  y (vertical)\n```\n⚠️ Note: y goes DOWN (opposite to math)! So `y -= 5` = move UP.\n\n**🕹️ Key handling — Smooth controls:**\n```python\nkeys = pygame.key.get_pressed()  # Check pressed keys\nif keys[K_LEFT]:  x -= speed      # ← Move left\nif keys[K_RIGHT]: x += speed      # → Move right\nif keys[K_UP]:    y -= speed      # ↑ Move up (y decreases!)\nif keys[K_DOWN]:  y += speed      # ↓ Move down\n```",
        code: `import pygame
import sys

# Khởi tạo
pygame.init()
WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("🎮 Game đầu tiên!")
clock = pygame.time.Clock()

# Nhân vật
player_x, player_y = 300, 200
player_size = 40
speed = 5

# Vòng lặp game
running = True
while running:
    # 1. Xử lý sự kiện
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # 2. Di chuyển bằng phím mũi tên
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player_x -= speed
    if keys[pygame.K_RIGHT]: player_x += speed
    if keys[pygame.K_UP]:    player_y -= speed
    if keys[pygame.K_DOWN]:  player_y += speed
    
    # 3. Vẽ
    screen.fill((30, 30, 50))  # Nền tối
    pygame.draw.rect(screen, (0, 200, 255),
        (player_x, player_y, player_size, player_size))
    pygame.display.flip()
    clock.tick(60)  # 60 FPS

pygame.quit()`,
        codeLanguage: "python",
        exercise: "Thêm một 'enemy' (hình tròn đỏ) di chuyển ngẫu nhiên. Nếu player chạm enemy, hiển thị 'Game Over!'.",
        exerciseEn: "Add an 'enemy' (red circle) moving randomly. If player touches enemy, display 'Game Over!'.",
        quiz: [
          { question: "Vòng lặp game chạy bao nhiêu lần mỗi giây nếu clock.tick(60)?", options: ["30", "60", "120", "Không giới hạn"], answer: 1, explanation: "clock.tick(60) giới hạn tốc độ khung hình ở 60 FPS (frames per second)." },
          { question: "Lệnh nào dùng để kiểm tra phím đang được nhấn?", options: ["pygame.event.get()", "pygame.key.get_pressed()", "pygame.mouse.get_pos()", "pygame.key.name()"], answer: 1, explanation: "pygame.key.get_pressed() trả về trạng thái tất cả phím bàn phím (đang nhấn hay không)." },
          { question: "HTTP status code 404 có nghĩa gì?", options: ["Server lỗi", "Trang không tìm thấy", "Chuyển hướng", "Thành công"], answer: 1, explanation: "404 Not Found nghĩa là server không tìm thấy tài nguyên được yêu cầu. 200=OK, 500=Server Error, 301=Redirect." },
          { question: "API RESTful thường dùng phương thức HTTP nào để tạo dữ liệu mới?", options: ["GET", "POST", "PUT", "DELETE"], answer: 1, explanation: "POST dùng để tạo (Create) tài nguyên mới. GET=đọc, PUT=cập nhật, DELETE=xóa." },
          { question: "JSON viết tắt của gì?", options: ["Java Standard Object Notation", "JavaScript Object Notation", "JSON Script Object Network", "Java Serialized Object Name"], answer: 1, explanation: "JSON = JavaScript Object Notation — định dạng trao đổi dữ liệu nhẹ, dễ đọc, được dùng rộng rãi trong API." },
        ],
      },
      {
        id: "game-2",
        title: "HTML & CSS: Trang web cá nhân",
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
        exercise: "Tạo trang portfolio cá nhân với: ảnh đại diện, phần giới thiệu, danh sách sở thích, và nút liên hệ.",
        exerciseEn: "Create a personal portfolio page with: profile image, introduction section, hobbies list, and contact button.",
        quiz: [
          { question: "Thẻ nào dùng để tạo liên kết trong HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1, explanation: "Thẻ <a href='...'>Text</a> tạo liên kết (anchor) trong HTML." },
          { question: "CSS viết ở đâu trong file HTML?", options: ["Trong <body>", "Trong <style> hoặc file .css riêng", "Trong <head> bắt buộc", "Trong <script>"], answer: 1, explanation: "CSS có thể viết trong thẻ <style> hoặc file .css riêng, liên kết qua <link>." },
          { question: "Thẻ HTML nào dùng để tạo danh sách có thứ tự?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: 1, explanation: "<ol> (ordered list) tạo danh sách đánh số 1, 2, 3... <ul> tạo danh sách không thứ tự (bullet points)." },
          { question: "CSS property 'display: flex' dùng để làm gì?", options: ["Ẩn phần tử", "Tạo layout linh hoạt theo hàng/cột", "Làm phần tử trong suốt", "Tạo animation"], answer: 1, explanation: "Flexbox (display: flex) cho phép sắp xếp các phần tử con theo hàng hoặc cột một cách linh hoạt." },
          { question: "Responsive design dùng CSS gì để điều chỉnh theo kích thước màn hình?", options: ["@font-face", "@media queries", "@import", "@keyframes"], answer: 1, explanation: "@media queries cho phép áp dụng CSS khác nhau tùy kích thước viewport, tạo giao diện responsive." },
        ],
      },
    ],
  },

  // ============ DATA ENGINEERING & AI ============
  {
    id: "prog-sql",
    title: "SQL & Cơ sở dữ liệu",
    titleEn: "SQL & Databases",
    icon: "🗄️",
    color: "from-violet-500/20 to-purple-500/20",
    description: "Thiết kế bảng, truy vấn, JOIN và indexing với PostgreSQL",
    descriptionEn: "Table design, queries, JOINs and indexing with PostgreSQL",
    course: "data-ai",
    lessons: [
      {
        id: "sql-1",
        title: "Truy vấn SELECT cơ bản",
        titleEn: "Basic SELECT Queries",
        theory: "**SQL (Structured Query Language)** là ngôn ngữ để 'nói chuyện' với cơ sở dữ liệu — giống **Google cho database**: bạn hỏi, database trả lời! 🔍\n\n**Tại sao SQL quan trọng?**\nMọi ứng dụng (Facebook, Shopee, ngân hàng) đều lưu dữ liệu trong database. SQL là cách duy nhất để truy xuất và thao tác dữ liệu đó.\n\n**🏗️ Cấu trúc truy vấn — Nghĩ như câu tiếng Việt:**\n```sql\nSELECT cột      -- 'Cho tôi xem'\nFROM bảng        -- 'từ bảng'\nWHERE điều_kiện  -- 'mà thỏa điều kiện'\nORDER BY cột     -- 'sắp xếp theo'\nLIMIT 10;        -- 'chỉ 10 dòng đầu'\n```\n\n**Ví dụ thực tế — Quản lý lớp học:**\n```sql\n-- 'Cho tôi xem tên và điểm Toán của học sinh lớp 10A1, ai cao nhất trước'\nSELECT ho_ten, diem_toan\nFROM hoc_sinh\nWHERE lop = '10A1'\nORDER BY diem_toan DESC;\n```\n\n**📊 Các lệnh quan trọng:**\n| Lệnh | Ý nghĩa | Ví dụ đời thực |\n|---|---|---|\n| SELECT | Chọn cột hiển thị | 'Cho tôi xem tên và SĐT' |\n| WHERE | Lọc theo điều kiện | 'Chỉ những ai trên 18 tuổi' |\n| ORDER BY | Sắp xếp | 'Ai điểm cao nhất lên trước' |\n| GROUP BY | Nhóm dữ liệu | 'Đếm số học sinh mỗi lớp' |\n| HAVING | Lọc sau nhóm | 'Chỉ lớp nào có hơn 30 bạn' |\n| LIMIT | Giới hạn kết quả | 'Top 5 thôi' |",
        theoryEn: "**SQL (Structured Query Language)** is the language to 'talk' to databases — like **Google for databases**: you ask, database answers! 🔍\n\n**Why SQL matters?**\nEvery app (Facebook, Amazon, banks) stores data in databases. SQL is THE way to retrieve and manipulate that data.\n\n**🏗️ Query structure — Think like an English sentence:**\n```sql\nSELECT columns    -- 'Show me'\nFROM table         -- 'from the table'\nWHERE condition    -- 'where condition is met'\nORDER BY column    -- 'sorted by'\nLIMIT 10;          -- 'only first 10 rows'\n```\n\n**Real example — Managing a classroom:**\n```sql\n-- 'Show me names and Math scores of class 10A1, highest first'\nSELECT name, math_score\nFROM students\nWHERE class = '10A1'\nORDER BY math_score DESC;\n```\n\n**📊 Key commands:**\n| Command | Meaning | Real-life example |\n|---|---|---|\n| SELECT | Choose columns | 'Show me name and phone' |\n| WHERE | Filter by condition | 'Only those over 18' |\n| ORDER BY | Sort results | 'Highest score first' |\n| GROUP BY | Group data | 'Count students per class' |\n| HAVING | Filter after grouping | 'Only classes with 30+ students' |\n| LIMIT | Cap results | 'Top 5 only' |",
        code: `-- Tạo bảng học sinh
CREATE TABLE hoc_sinh (
    id SERIAL PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    lop VARCHAR(10),
    diem_toan DECIMAL(4,2),
    diem_van DECIMAL(4,2),
    diem_anh DECIMAL(4,2)
);

-- Chèn dữ liệu
INSERT INTO hoc_sinh (ho_ten, lop, diem_toan, diem_van, diem_anh) VALUES
('Nguyễn An', '10A1', 9.0, 8.5, 7.5),
('Trần Bình', '10A1', 7.0, 9.0, 8.0),
('Lê Chi', '10A2', 8.5, 7.0, 9.5);

-- Truy vấn cơ bản
SELECT ho_ten, diem_toan FROM hoc_sinh WHERE diem_toan >= 8.0;

-- Tính điểm trung bình theo lớp
SELECT lop, 
       AVG(diem_toan) AS tb_toan,
       AVG(diem_van) AS tb_van
FROM hoc_sinh 
GROUP BY lop
ORDER BY tb_toan DESC;`,
        codeLanguage: "sql",
        exercise: "Viết truy vấn: (1) Tìm 3 học sinh có điểm trung bình cao nhất, (2) Đếm số học sinh mỗi lớp, (3) Tìm học sinh có điểm Toán trên trung bình lớp.",
        exerciseEn: "Write queries: (1) Find top 3 students by average score, (2) Count students per class, (3) Find students with Math above class average.",
        quiz: [
          { question: "Lệnh nào dùng để lọc dữ liệu theo điều kiện?", options: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"], answer: 1, explanation: "WHERE dùng để lọc các hàng thỏa mãn điều kiện trước khi trả về kết quả." },
          { question: "AVG() là hàm tính gì?", options: ["Tổng", "Đếm", "Trung bình", "Giá trị lớn nhất"], answer: 2, explanation: "AVG() (Average) tính giá trị trung bình của một cột số." },
          { question: "Thứ tự thực thi các mệnh đề SQL đúng là gì?", options: ["SELECT → FROM → WHERE", "FROM → WHERE → SELECT", "WHERE → SELECT → FROM", "SELECT → WHERE → FROM"], answer: 1, explanation: "SQL thực thi: FROM (xác định bảng) → WHERE (lọc) → GROUP BY → HAVING → SELECT (chọn cột) → ORDER BY → LIMIT." },
          { question: "DISTINCT trong SELECT dùng để làm gì?", options: ["Sắp xếp kết quả", "Loại bỏ các hàng trùng lặp", "Đếm số hàng", "Giới hạn kết quả"], answer: 1, explanation: "SELECT DISTINCT loại bỏ các hàng có giá trị giống nhau, chỉ giữ lại các giá trị duy nhất." },
          { question: "NULL trong SQL có nghĩa gì?", options: ["Số 0", "Chuỗi rỗng ''", "Giá trị không xác định/thiếu dữ liệu", "False"], answer: 2, explanation: "NULL đại diện cho giá trị chưa biết hoặc thiếu. NULL khác 0, khác chuỗi rỗng, và NULL = NULL cũng trả về NULL!" },
        ],
      },
      {
        id: "sql-2",
        title: "JOIN và quan hệ giữa các bảng",
        titleEn: "JOINs and Table Relationships",
        theory: "**JOIN** kết nối dữ liệu từ nhiều bảng — giống **ghép 2 mảnh puzzle** lại với nhau 🧩!\n\n**Tại sao cần JOIN?** Trong thực tế, dữ liệu nằm rải rác ở nhiều bảng:\n- Bảng `khách_hàng`: tên, SĐT, địa chỉ\n- Bảng `đơn_hàng`: sản phẩm, giá, ngày mua\n- JOIN = 'Ghép tên khách hàng vào đơn hàng'\n\n**🎨 Minh họa bằng hình — 4 loại JOIN:**\n```\nBảng A (Khách hàng)    Bảng B (Đơn hàng)\n┌──────────┐            ┌──────────┐\n│ An       │────────────│ Laptop   │  ← An mua Laptop\n│ Bình     │            │ Phone    │  ← Bình mua Phone  \n│ Chi ❌   │            │ Tablet ❌│  ← Tablet chưa ai mua\n└──────────┘            └──────────┘\n  Chi chưa mua gì        Tablet không có người mua\n```\n\n**INNER JOIN** — Chỉ lấy **khớp cả 2 bên** (An+Laptop, Bình+Phone):\n→ Chi bị loại (chưa mua), Tablet bị loại (không ai mua)\n\n**LEFT JOIN** — **Tất cả khách hàng** + đơn hàng (nếu có):\n→ Chi vẫn xuất hiện nhưng đơn hàng = NULL\n→ Dùng khi muốn biết 'Ai CHƯA mua gì?'\n\n**RIGHT JOIN** — Tất cả đơn hàng + khách hàng (nếu có):\n→ Tablet xuất hiện nhưng khách hàng = NULL\n\n**FULL OUTER JOIN** — **Tất cả từ cả 2 bảng**, khớp hoặc không.\n\n**🔑 Foreign Key — Chìa khóa kết nối:**\nGiống **mã học sinh** in trên cả thẻ thư viện và bảng điểm → dùng mã này để ghép 2 bảng!\n```sql\nSELECT kh.ten, dh.san_pham\nFROM khach_hang kh\nINNER JOIN don_hang dh ON kh.id = dh.khach_hang_id;\n--                       ↑ 'Nơi khớp nhau'\n```",
        theoryEn: "**JOIN** connects data from multiple tables — like **fitting 2 puzzle pieces** together 🧩!\n\n**Why JOIN?** In practice, data lives in separate tables:\n- `customers` table: name, phone, address\n- `orders` table: product, price, date\n- JOIN = 'Attach customer name to their order'\n\n**🎨 Visual illustration — 4 JOIN types:**\n```\nTable A (Customers)    Table B (Orders)\n┌──────────┐            ┌──────────┐\n│ An       │────────────│ Laptop   │  ← An bought Laptop\n│ Binh     │            │ Phone    │  ← Binh bought Phone  \n│ Chi ❌   │            │ Tablet ❌│  ← Nobody bought Tablet\n└──────────┘            └──────────┘\n  Chi hasn't bought       Tablet has no buyer\n```\n\n**INNER JOIN** — Only **matching rows** (An+Laptop, Binh+Phone):\n→ Chi excluded (no orders), Tablet excluded (no buyer)\n\n**LEFT JOIN** — **All customers** + orders (if any):\n→ Chi still appears but order = NULL\n→ Use when you want to know 'Who HASN'T bought anything?'\n\n**RIGHT JOIN** — All orders + customers (if any):\n→ Tablet appears but customer = NULL\n\n**FULL OUTER JOIN** — **Everything from both tables**, matched or not.\n\n**🔑 Foreign Key — The linking key:**\nLike a **student ID** printed on both library card and report card → use this ID to join 2 tables!\n```sql\nSELECT c.name, o.product\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id;\n--                    ↑ 'Where they match'\n```",
        code: `-- Bảng đơn hàng
CREATE TABLE don_hang (
    id SERIAL PRIMARY KEY,
    khach_hang_id INT REFERENCES khach_hang(id),
    san_pham VARCHAR(100),
    so_luong INT,
    gia DECIMAL(10,2),
    ngay_dat DATE DEFAULT CURRENT_DATE
);

-- INNER JOIN: Đơn hàng kèm tên khách hàng
SELECT kh.ho_ten, dh.san_pham, dh.gia
FROM don_hang dh
INNER JOIN khach_hang kh ON dh.khach_hang_id = kh.id;

-- LEFT JOIN: Tất cả khách hàng (kể cả chưa mua)
SELECT kh.ho_ten, COUNT(dh.id) AS so_don
FROM khach_hang kh
LEFT JOIN don_hang dh ON kh.id = dh.khach_hang_id
GROUP BY kh.ho_ten;

-- Subquery: Khách hàng chi tiêu nhiều nhất
SELECT ho_ten FROM khach_hang
WHERE id = (
    SELECT khach_hang_id FROM don_hang
    GROUP BY khach_hang_id
    ORDER BY SUM(gia * so_luong) DESC
    LIMIT 1
);`,
        codeLanguage: "sql",
        exercise: "Tạo 3 bảng (sinh_vien, mon_hoc, diem_thi) và viết truy vấn JOIN để lấy bảng điểm đầy đủ.",
        exerciseEn: "Create 3 tables (students, courses, exam_scores) and write JOIN queries to get a complete grade report.",
        quiz: [
          { question: "LEFT JOIN trả về gì?", options: ["Chỉ dòng khớp", "Tất cả từ bảng trái + khớp từ phải", "Tất cả từ bảng phải", "Không dòng nào"], answer: 1, explanation: "LEFT JOIN trả về TẤT CẢ dòng từ bảng bên trái, và dòng khớp từ bảng bên phải (NULL nếu không khớp)." },
          { question: "Foreign Key dùng để làm gì?", options: ["Mã hóa dữ liệu", "Liên kết giữa 2 bảng", "Tạo index", "Xóa dữ liệu"], answer: 1, explanation: "Foreign Key (khóa ngoại) tạo mối quan hệ ràng buộc giữa 2 bảng, đảm bảo tính toàn vẹn dữ liệu." },
          { question: "INNER JOIN trả về những dòng nào?", options: ["Tất cả từ bảng trái", "Tất cả từ cả hai bảng", "Chỉ các dòng khớp ở cả hai bảng", "Chỉ từ bảng phải"], answer: 2, explanation: "INNER JOIN chỉ trả về các dòng có giá trị khớp nhau ở cả hai bảng. Dòng không khớp bị loại bỏ." },
          { question: "Self JOIN là gì?", options: ["JOIN bảng với chính nó", "JOIN không cần ON", "JOIN 3 bảng trở lên", "JOIN tự động"], answer: 0, explanation: "Self JOIN là khi một bảng JOIN với chính nó, thường dùng alias khác nhau. Ví dụ: tìm nhân viên và quản lý cùng bảng." },
          { question: "CROSS JOIN tạo ra kết quả gì?", options: ["Chỉ dòng khớp", "Tích Descartes — mỗi dòng bảng A ghép với mỗi dòng bảng B", "Hợp hai bảng", "Giao hai bảng"], answer: 1, explanation: "CROSS JOIN tạo tích Descartes: nếu bảng A có m dòng, bảng B có n dòng thì kết quả có m×n dòng." },
        ],
      },
      {
        id: "sql-3",
        title: "Hàm tổng hợp & GROUP BY",
        titleEn: "Aggregate Functions & GROUP BY",
        theory: "**Hàm tổng hợp (Aggregate Functions):**\n- COUNT(): Đếm số hàng\n- SUM(): Tính tổng\n- AVG(): Trung bình\n- MIN() / MAX(): Giá trị nhỏ/lớn nhất\n\n**GROUP BY:** Nhóm dữ liệu để tính tổng hợp theo nhóm\n**HAVING:** Lọc sau khi GROUP BY (WHERE lọc trước GROUP BY)\n\n**Thứ tự thực thi:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
        theoryEn: "**Aggregate Functions:**\n- COUNT(): Count rows\n- SUM(): Calculate total\n- AVG(): Average\n- MIN() / MAX(): Smallest/largest value\n\n**GROUP BY:** Group data for aggregate calculations\n**HAVING:** Filter after GROUP BY (WHERE filters before GROUP BY)\n\n**Execution order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
        code: `-- Doanh thu theo danh mục sản phẩm
SELECT 
    danh_muc,
    COUNT(*) AS so_don,
    SUM(gia * so_luong) AS tong_doanh_thu,
    AVG(gia) AS gia_trung_binh,
    MAX(gia) AS gia_cao_nhat
FROM don_hang
GROUP BY danh_muc
HAVING SUM(gia * so_luong) > 1000000
ORDER BY tong_doanh_thu DESC;

-- Thống kê điểm theo lớp
SELECT 
    lop,
    COUNT(*) AS si_so,
    ROUND(AVG(diem_toan), 2) AS tb_toan,
    ROUND(AVG(diem_van), 2) AS tb_van,
    MIN(diem_toan) AS diem_thap_nhat,
    MAX(diem_toan) AS diem_cao_nhat
FROM hoc_sinh
GROUP BY lop
ORDER BY tb_toan DESC;`,
        codeLanguage: "sql",
        exercise: "Viết truy vấn thống kê: (1) Top 5 sản phẩm bán chạy nhất, (2) Doanh thu trung bình theo tháng, (3) Danh mục có hơn 10 đơn hàng.",
        exerciseEn: "Write statistical queries: (1) Top 5 best-selling products, (2) Average monthly revenue, (3) Categories with more than 10 orders.",
        quiz: [
          { question: "HAVING khác WHERE ở điểm nào?", options: ["Không khác nhau", "HAVING lọc sau GROUP BY", "HAVING nhanh hơn", "WHERE không dùng với SELECT"], answer: 1, explanation: "WHERE lọc dữ liệu TRƯỚC khi nhóm, HAVING lọc SAU khi GROUP BY đã thực thi." },
          { question: "COUNT(*) đếm gì?", options: ["Chỉ giá trị khác NULL", "Tất cả các hàng kể cả NULL", "Chỉ giá trị duy nhất", "Chỉ số cột"], answer: 1, explanation: "COUNT(*) đếm TẤT CẢ các hàng bao gồm cả NULL. COUNT(column) chỉ đếm giá trị NOT NULL." },
          { question: "SUM(NULL) trả về gì?", options: ["0", "NULL", "Lỗi", "False"], answer: 1, explanation: "Các hàm tổng hợp bỏ qua NULL. Nếu tất cả giá trị đều NULL, SUM trả về NULL, không phải 0." },
          { question: "Có thể dùng alias (AS) trong WHERE không?", options: ["Có, luôn được", "Không, vì WHERE thực thi trước SELECT", "Chỉ với số", "Chỉ trong subquery"], answer: 1, explanation: "WHERE thực thi TRƯỚC SELECT nên chưa biết alias. Phải dùng HAVING hoặc viết lại biểu thức gốc." },
          { question: "GROUP BY nhiều cột có nghĩa gì?", options: ["Nhóm theo cột đầu tiên", "Tạo nhóm dựa trên tổ hợp giá trị của tất cả các cột", "Lỗi cú pháp", "Chỉ nhóm theo cột cuối"], answer: 1, explanation: "GROUP BY col1, col2 tạo nhóm cho mỗi tổ hợp duy nhất của (col1, col2), ví dụ: (lớp, giới tính)." },
        ],
      },
      {
        id: "sql-4",
        title: "Subquery & CTE",
        titleEn: "Subqueries & CTEs",
        theory: "**Subquery (Truy vấn con):** Truy vấn lồng bên trong truy vấn khác.\n- Scalar subquery: Trả về 1 giá trị\n- Table subquery: Trả về bảng\n- Correlated subquery: Tham chiếu bảng ngoài\n\n**CTE (Common Table Expression):**\n- Tạo bảng tạm với WITH\n- Code dễ đọc hơn subquery\n- Có thể đệ quy (Recursive CTE)",
        theoryEn: "**Subquery:** A query nested inside another query.\n- Scalar: Returns 1 value\n- Table: Returns a table\n- Correlated: References outer table\n\n**CTE (Common Table Expression):**\n- Create temp table with WITH\n- More readable than subqueries\n- Can be recursive",
        code: `-- Subquery: Học sinh có điểm trên trung bình
SELECT ho_ten, diem_toan
FROM hoc_sinh
WHERE diem_toan > (
    SELECT AVG(diem_toan) FROM hoc_sinh
);

-- CTE: Xếp hạng học sinh
WITH xep_hang AS (
    SELECT 
        ho_ten,
        diem_toan,
        RANK() OVER (ORDER BY diem_toan DESC) AS hang
    FROM hoc_sinh
)
SELECT * FROM xep_hang WHERE hang <= 5;

-- Recursive CTE: Tạo chuỗi ngày
WITH RECURSIVE ngay AS (
    SELECT DATE '2024-01-01' AS d
    UNION ALL
    SELECT d + 1 FROM ngay WHERE d < '2024-01-07'
)
SELECT d AS ngay_trong_tuan FROM ngay;`,
        codeLanguage: "sql",
        exercise: "Dùng CTE viết truy vấn: (1) Top 3 khách hàng chi tiêu nhiều nhất, (2) So sánh doanh thu tháng này vs tháng trước.",
        exerciseEn: "Use CTE to write: (1) Top 3 highest-spending customers, (2) Compare this month vs last month revenue.",
        quiz: [
          { question: "CTE được khai báo bằng từ khóa nào?", options: ["CREATE TEMP", "WITH", "DECLARE", "DEFINE"], answer: 1, explanation: "CTE sử dụng từ khóa WITH để định nghĩa bảng tạm, dễ đọc hơn subquery." },
          { question: "Window Function RANK() dùng để làm gì?", options: ["Xóa dữ liệu trùng", "Xếp hạng các hàng", "Tạo index", "Nối bảng"], answer: 1, explanation: "RANK() xếp hạng các hàng dựa trên ORDER BY, cho phép tìm top N mà không cần GROUP BY." },
          { question: "Correlated subquery khác subquery thông thường ở điểm nào?", options: ["Nhanh hơn", "Tham chiếu cột từ truy vấn ngoài", "Chỉ dùng trong INSERT", "Không cần WHERE"], answer: 1, explanation: "Correlated subquery tham chiếu cột từ bảng trong truy vấn ngoài, nên được chạy lại cho mỗi dòng của truy vấn ngoài." },
          { question: "Recursive CTE cần thành phần nào?", options: ["Chỉ cần UNION", "Base case + UNION ALL + recursive step", "Chỉ cần SELECT", "JOIN bắt buộc"], answer: 1, explanation: "Recursive CTE gồm: base case (điểm bắt đầu) + UNION ALL + phần đệ quy tham chiếu chính CTE đó." },
          { question: "CTE có lưu kết quả vĩnh viễn trong database không?", options: ["Có, giống tạo bảng", "Không, chỉ tồn tại trong phạm vi truy vấn đó", "Có, đến khi restart", "Tùy database"], answer: 1, explanation: "CTE chỉ là bảng tạm tồn tại trong phạm vi của câu truy vấn chứa nó, không lưu vào database." },
        ],
      },
      {
        id: "sql-5",
        title: "Index & Tối ưu truy vấn",
        titleEn: "Indexing & Query Optimization",
        theory: "**Index** giống mục lục sách — giúp tìm kiếm nhanh hơn.\n\n**Loại Index:**\n- B-tree: Mặc định, tốt cho =, <, >, BETWEEN\n- Hash: Chỉ tốt cho =\n- GIN: Cho mảng, full-text search\n- GiST: Cho dữ liệu không gian\n\n**Khi nào tạo Index:**\n- Cột WHERE, JOIN, ORDER BY thường xuyên\n- Cột có tính chọn lọc cao (nhiều giá trị khác nhau)\n\n**EXPLAIN ANALYZE:** Phân tích kế hoạch truy vấn",
        theoryEn: "**Index** is like a book index — speeds up lookups.\n\n**Index Types:**\n- B-tree: Default, good for =, <, >, BETWEEN\n- Hash: Only good for =\n- GIN: For arrays, full-text search\n- GiST: For spatial data\n\n**When to create Index:**\n- Frequently used WHERE, JOIN, ORDER BY columns\n- High cardinality columns\n\n**EXPLAIN ANALYZE:** Analyze query plan",
        code: `-- Tạo index trên cột thường xuyên tìm kiếm
CREATE INDEX idx_hoc_sinh_lop ON hoc_sinh(lop);
CREATE INDEX idx_don_hang_ngay ON don_hang(ngay_dat);

-- Index composite (nhiều cột)
CREATE INDEX idx_hs_lop_diem ON hoc_sinh(lop, diem_toan);

-- Phân tích kế hoạch truy vấn
EXPLAIN ANALYZE
SELECT * FROM hoc_sinh WHERE lop = '10A1';

-- So sánh: Không có index vs có index
-- Seq Scan (quét tuần tự): O(n) - chậm
-- Index Scan: O(log n) - nhanh

-- Tối ưu: Tránh SELECT *
-- ❌ Chậm
SELECT * FROM don_hang WHERE ngay_dat > '2024-01-01';
-- ✅ Nhanh  
SELECT id, san_pham, gia FROM don_hang WHERE ngay_dat > '2024-01-01';

-- Tối ưu: Dùng EXISTS thay IN cho subquery lớn
-- ❌ Chậm với bảng lớn
SELECT * FROM hoc_sinh WHERE lop IN (SELECT lop FROM lop_hoc WHERE si_so > 30);
-- ✅ Nhanh hơn
SELECT * FROM hoc_sinh hs WHERE EXISTS (
    SELECT 1 FROM lop_hoc lh WHERE lh.lop = hs.lop AND lh.si_so > 30
);`,
        codeLanguage: "sql",
        exercise: "Tạo bảng 10,000 hàng, so sánh tốc độ truy vấn trước/sau khi tạo index. Dùng EXPLAIN ANALYZE.",
        exerciseEn: "Create a 10,000-row table, compare query speed before/after indexing. Use EXPLAIN ANALYZE.",
        quiz: [
          { question: "Tại sao không nên tạo index trên mọi cột?", options: ["Hết dung lượng", "Làm chậm INSERT/UPDATE", "Không có lý do", "Index không tốt"], answer: 1, explanation: "Index tăng tốc đọc nhưng làm CHẬM ghi (INSERT/UPDATE/DELETE) vì phải cập nhật index." },
          { question: "EXPLAIN ANALYZE dùng để làm gì?", options: ["Xóa dữ liệu", "Tạo bảng mới", "Phân tích hiệu suất truy vấn", "Backup database"], answer: 2, explanation: "EXPLAIN ANALYZE chạy truy vấn thật và hiển thị kế hoạch thực thi + thời gian, giúp tối ưu hóa." },
          { question: "Composite index trên (A, B) có hỗ trợ truy vấn WHERE B = ? không?", options: ["Có, luôn luôn", "Không, chỉ hỗ trợ khi có cột A trước", "Chỉ khi B là số", "Tùy database engine"], answer: 1, explanation: "Composite index theo thứ tự leftmost prefix. Index (A,B) hỗ trợ WHERE A=? và WHERE A=? AND B=? nhưng KHÔNG hỗ trợ riêng WHERE B=?." },
          { question: "Covering index là gì?", options: ["Index chứa đủ cột để trả lời query mà không cần đọc bảng gốc", "Index trên tất cả cột", "Index tự động tạo", "Index cho bảng lớn"], answer: 0, explanation: "Covering index chứa tất cả cột cần thiết cho query, database chỉ cần đọc index mà không cần quay lại bảng (Index-Only Scan)." },
          { question: "Partial index (WHERE trong CREATE INDEX) hữu ích khi nào?", options: ["Luôn luôn", "Khi chỉ query một phần nhỏ dữ liệu thỏa điều kiện", "Khi bảng nhỏ", "Khi dùng LIKE"], answer: 1, explanation: "Partial index chỉ index các hàng thỏa điều kiện, giúp index nhỏ hơn và nhanh hơn cho các query lọc theo điều kiện đó." },
        ],
      },
      {
        id: "sql-6",
        title: "Transaction & Bảo mật dữ liệu",
        titleEn: "Transactions & Data Security",
        theory: "**Transaction** đảm bảo tính toàn vẹn dữ liệu (ACID):\n- Atomicity: Tất cả hoặc không gì cả\n- Consistency: Dữ liệu luôn hợp lệ\n- Isolation: Các transaction độc lập\n- Durability: Thay đổi được lưu vĩnh viễn\n\n**Row Level Security (RLS):**\n- Kiểm soát truy cập ở cấp hàng\n- Mỗi user chỉ thấy dữ liệu của mình\n\n**SQL Injection:** Luôn dùng parameterized queries!",
        theoryEn: "**Transaction** ensures data integrity (ACID):\n- Atomicity: All or nothing\n- Consistency: Data always valid\n- Isolation: Transactions independent\n- Durability: Changes persist\n\n**Row Level Security (RLS):**\n- Control access at row level\n- Each user sees only their data\n\n**SQL Injection:** Always use parameterized queries!",
        code: `-- Transaction: Chuyển tiền an toàn
BEGIN;
UPDATE tai_khoan SET so_du = so_du - 500000 WHERE id = 1;
UPDATE tai_khoan SET so_du = so_du + 500000 WHERE id = 2;
-- Kiểm tra: không cho số dư âm
DO $$
BEGIN
    IF (SELECT so_du FROM tai_khoan WHERE id = 1) < 0 THEN
        RAISE EXCEPTION 'Số dư không đủ!';
    END IF;
END $$;
COMMIT;

-- Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own notes" ON notes
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users create own notes" ON notes
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- ❌ SQL Injection nguy hiểm
-- query = f"SELECT * FROM users WHERE name = '{input}'"
-- ✅ An toàn: Parameterized query
-- query = "SELECT * FROM users WHERE name = $1"`,
        codeLanguage: "sql",
        exercise: "Viết transaction chuyển điểm giữa 2 sinh viên (trừ điểm A, cộng điểm B). Thêm RLS policy cho bảng bài tập.",
        exerciseEn: "Write a transaction to transfer points between 2 students. Add RLS policy for assignments table.",
        quiz: [
          { question: "ACID trong Transaction, chữ A nghĩa là gì?", options: ["Accuracy", "Atomicity", "Authorization", "Availability"], answer: 1, explanation: "Atomicity = tính nguyên tử: transaction phải hoàn thành TOÀN BỘ hoặc ROLLBACK toàn bộ, không có trạng thái giữa chừng." },
          { question: "SQL Injection là gì?", options: ["Cách tối ưu SQL", "Lỗi bảo mật khi nhúng input trực tiếp vào SQL", "Kiểu index đặc biệt", "Hàm tổng hợp"], answer: 1, explanation: "SQL Injection xảy ra khi attacker chèn mã SQL độc hại qua input. Phòng tránh bằng parameterized queries." },
          { question: "try...except...finally, khối finally thực thi khi nào?", options: ["Chỉ khi có lỗi", "Chỉ khi không lỗi", "Luôn luôn, dù có lỗi hay không", "Chỉ khi dùng return"], answer: 2, explanation: "finally LUÔN thực thi dù có exception hay không, thường dùng để dọn dẹp tài nguyên (đóng file, database)." },
          { question: "with open('file.txt') as f: có lợi ích gì?", options: ["Đọc nhanh hơn", "Tự động đóng file khi xong, kể cả khi có lỗi", "Mã hóa file", "Tạo file mới"], answer: 1, explanation: "Context manager (with) đảm bảo file được đóng tự động khi thoát khối with, ngay cả khi xảy ra exception." },
          { question: "Decorator @staticmethod khác @classmethod ở điểm nào?", options: ["Không khác gì", "staticmethod không nhận self hay cls, classmethod nhận cls", "staticmethod nhanh hơn", "classmethod chỉ dùng cho inheritance"], answer: 1, explanation: "@staticmethod không truy cập instance hay class. @classmethod nhận cls làm đối số đầu, có thể truy cập class attributes." },
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
    description: "Thu thập, xử lý và lưu trữ dữ liệu tự động",
    descriptionEn: "Automated data collection, processing and storage",
    course: "data-ai",
    lessons: [
      {
        id: "etl-1",
        title: "ETL vs ELT & Pandas cơ bản",
        titleEn: "ETL vs ELT & Pandas Basics",
        theory: "**ETL (Extract-Transform-Load):**\n1. Extract: Lấy dữ liệu từ nguồn (CSV, API, database)\n2. Transform: Làm sạch, chuyển đổi\n3. Load: Nạp vào kho dữ liệu\n\n**ELT** - Load trước, Transform sau (phù hợp cloud)\n\n**Pandas** - Thư viện Python #1 cho phân tích dữ liệu:\n- DataFrame: bảng dữ liệu 2 chiều\n- Series: cột dữ liệu 1 chiều",
        theoryEn: "**ETL (Extract-Transform-Load):**\n1. Extract: Get data from sources (CSV, API, database)\n2. Transform: Clean, convert\n3. Load: Insert into data warehouse\n\n**ELT** - Load first, Transform later (cloud-friendly)\n\n**Pandas** - Python's #1 data analysis library:\n- DataFrame: 2D data table\n- Series: 1D data column",
        code: `import pandas as pd

# EXTRACT: Đọc dữ liệu CSV
df = pd.read_csv("doanh_thu.csv")

# Hoặc tạo từ dictionary
data = {
    "Sản phẩm": ["Laptop", "Điện thoại", "Tablet", "Tai nghe", "Bàn phím"],
    "Số lượng": [120, 350, 200, 500, 180],
    "Đơn giá": [15000000, 8000000, 12000000, 500000, 1200000],
    "Tháng": ["T1", "T1", "T2", "T2", "T3"]
}
df = pd.DataFrame(data)

# TRANSFORM: Tính doanh thu
df["Doanh thu"] = df["Số lượng"] * df["Đơn giá"]

# Lọc sản phẩm doanh thu > 1 tỷ
hot = df[df["Doanh thu"] > 1_000_000_000]
print("🔥 Sản phẩm hot:\\n", hot)

# Thống kê theo tháng
monthly = df.groupby("Tháng")["Doanh thu"].sum()
print("\\n📊 Doanh thu theo tháng:\\n", monthly)

# LOAD: Xuất kết quả
df.to_csv("ket_qua.csv", index=False)
print("\\n✅ Đã lưu file ket_qua.csv")`,
        codeLanguage: "python",
        exercise: "Tải file CSV mẫu (bán hàng 3 tháng) và thực hiện: (1) Làm sạch dữ liệu null, (2) Tính doanh thu theo danh mục, (3) Vẽ biểu đồ matplotlib.",
        exerciseEn: "Load sample CSV (3-month sales) and: (1) Clean null data, (2) Calculate revenue by category, (3) Create matplotlib chart.",
        quiz: [
          { question: "ETL viết tắt của gì?", options: ["Edit-Transfer-Link", "Extract-Transform-Load", "Export-Test-Log", "Enter-Track-List"], answer: 1, explanation: "ETL = Extract (trích xuất) - Transform (chuyển đổi) - Load (nạp dữ liệu)." },
          { question: "Pandas DataFrame giống gì nhất?", options: ["Mảng 1 chiều", "Bảng tính Excel", "File JSON", "Cây nhị phân"], answer: 1, explanation: "DataFrame là bảng dữ liệu 2 chiều có hàng và cột, giống bảng tính Excel." },
          { question: "Đa kế thừa (multiple inheritance) trong Python dùng cú pháp nào?", options: ["class C extends A, B", "class C(A, B):", "class C inherits A, B", "class C = A + B"], answer: 1, explanation: "Python hỗ trợ đa kế thừa bằng cú pháp class Con(Cha1, Cha2): — theo thứ tự MRO (Method Resolution Order)." },
          { question: "Magic method __str__ dùng để làm gì?", options: ["Chuyển object thành số", "Định nghĩa cách object hiển thị khi print()", "Xóa object", "So sánh 2 object"], answer: 1, explanation: "__str__ trả về chuỗi đại diện cho object, được gọi tự động khi dùng print() hoặc str()." },
          { question: "Property decorator @property dùng để làm gì?", options: ["Tạo biến static", "Truy cập method như attribute (không cần ())", "Bảo vệ biến khỏi bị xóa", "Tạo constructor"], answer: 1, explanation: "@property cho phép gọi method như attribute: obj.name thay vì obj.get_name(), giúp kiểm soát getter/setter." },
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

# Gọi API công khai
url = "https://jsonplaceholder.typicode.com/posts"
response = requests.get(url)
posts = response.json()

print(f"Tổng bài viết: {len(posts)}")
for post in posts[:3]:
    print(f"  📝 {post['title'][:50]}...")

# Web Scraping với BeautifulSoup
from bs4 import BeautifulSoup

html = "<html><body><h1>Tiêu đề</h1><p>Nội dung</p></body></html>"
soup = BeautifulSoup(html, 'html.parser')
print(f"\\nTiêu đề: {soup.h1.text}")
print(f"Nội dung: {soup.p.text}")`,
        codeLanguage: "python",
        exercise: "Gọi API thời tiết (OpenWeatherMap) lấy nhiệt độ 5 thành phố, lưu vào DataFrame và xuất CSV.",
        exerciseEn: "Call weather API (OpenWeatherMap) for 5 cities' temperatures, save to DataFrame and export CSV.",
        quiz: [
          { question: "HTTP GET dùng để làm gì?", options: ["Xóa dữ liệu", "Gửi dữ liệu mới", "Lấy dữ liệu", "Cập nhật dữ liệu"], answer: 2, explanation: "GET request dùng để lấy/đọc dữ liệu từ server." },
          { question: "Thư viện nào thường dùng để đọc/ghi file CSV trong Python?", options: ["numpy", "pandas", "matplotlib", "flask"], answer: 1, explanation: "pandas cung cấp pd.read_csv() và df.to_csv() — công cụ mạnh mẽ nhất để xử lý file CSV với DataFrame." },
          { question: "DataFrame.head(3) trả về gì?", options: ["3 cột đầu", "3 hàng đầu tiên", "3 giá trị lớn nhất", "3 hàng cuối"], answer: 1, explanation: "head(n) trả về n hàng đầu tiên của DataFrame. Mặc định n=5 nếu không truyền tham số." },
          { question: "Muốn lọc DataFrame theo điều kiện, dùng cú pháp nào?", options: ["df.filter(col > 5)", "df[df['col'] > 5]", "df.where(col, 5)", "df.select(col > 5)"], answer: 1, explanation: "Boolean indexing df[df['col'] > 5] tạo mask True/False và lọc các hàng thỏa điều kiện." },
          { question: "df.groupby('city').mean() làm gì?", options: ["Sắp xếp theo city", "Tính trung bình tất cả cột số theo từng city", "Đếm số city", "Xóa cột city"], answer: 1, explanation: "groupby().mean() nhóm dữ liệu theo cột 'city' rồi tính giá trị trung bình cho mỗi cột số trong từng nhóm." },
        ],
      },
      {
        id: "etl-3",
        title: "Xử lý dữ liệu nâng cao với Pandas",
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
        exercise: "Tải dataset Titanic, làm sạch dữ liệu, tạo pivot table theo Pclass và Sex, tính tỷ lệ sống sót.",
        exerciseEn: "Load Titanic dataset, clean data, create pivot table by Pclass and Sex, calculate survival rate.",
        quiz: [
          { question: "merge() trong Pandas giống lệnh SQL nào?", options: ["SELECT", "WHERE", "JOIN", "GROUP BY"], answer: 2, explanation: "pd.merge() kết nối 2 DataFrame dựa trên cột chung, giống JOIN trong SQL." },
          { question: "df.dropna() làm gì?", options: ["Xóa cột có NULL", "Xóa các hàng chứa giá trị NaN", "Thay NULL bằng 0", "Đếm số NULL"], answer: 1, explanation: "dropna() xóa các hàng có ít nhất 1 giá trị NaN. Dùng dropna(axis=1) để xóa cột, fillna() để thay thế." },
          { question: "Outlier (giá trị ngoại lai) thường được phát hiện bằng phương pháp nào?", options: ["Đếm NULL", "IQR (khoảng tứ phân vị) hoặc Z-score", "Sắp xếp alphabet", "Kiểm tra kiểu dữ liệu"], answer: 1, explanation: "IQR: outlier nằm ngoài Q1-1.5*IQR và Q3+1.5*IQR. Z-score: outlier có |z| > 3 (cách trung bình > 3 độ lệch chuẩn)." },
          { question: "df.duplicated() trả về gì?", options: ["Số lượng trùng", "Series Boolean đánh dấu hàng trùng lặp", "DataFrame không trùng", "Lỗi nếu có trùng"], answer: 1, explanation: "duplicated() trả về Series True/False, True cho các hàng trùng lặp. Dùng drop_duplicates() để xóa chúng." },
          { question: "df.fillna(method='ffill') nghĩa là gì?", options: ["Điền 0 vào NaN", "Điền giá trị từ hàng trước (forward fill)", "Điền trung bình", "Xóa NaN"], answer: 1, explanation: "ffill (forward fill) điền giá trị NaN bằng giá trị hợp lệ gần nhất phía trước — hữu ích cho dữ liệu chuỗi thời gian." },
        ],
      },
      {
        id: "etl-4",
        title: "Airflow & Tự động hóa Pipeline",
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
        exercise: "Thiết kế DAG thu thập giá cổ phiếu hàng ngày, tính trung bình 7 ngày, lưu vào database.",
        exerciseEn: "Design a DAG to collect daily stock prices, calculate 7-day average, save to database.",
        quiz: [
          { question: "DAG viết tắt của gì?", options: ["Data Analysis Graph", "Directed Acyclic Graph", "Database Access Gateway", "Dynamic API Generator"], answer: 1, explanation: "DAG = Directed Acyclic Graph - đồ thị có hướng không chu trình, mô tả luồng công việc." },
          { question: "ETL viết tắt của gì?", options: ["Extract, Transfer, Load", "Extract, Transform, Load", "Execute, Test, Launch", "Export, Transform, Link"], answer: 1, explanation: "ETL = Extract (trích xuất) → Transform (biến đổi) → Load (nạp) — quy trình chuẩn để di chuyển và xử lý dữ liệu." },
          { question: "Airflow dùng DAG để mô tả gì?", options: ["Cấu trúc database", "Luồng công việc và phụ thuộc giữa các task", "Giao diện người dùng", "Mã nguồn Python"], answer: 1, explanation: "DAG (Directed Acyclic Graph) trong Airflow mô tả các task và thứ tự thực thi." },
          { question: "Toán tử >> trong Airflow DAG có nghĩa gì?", options: ["Dịch bit phải", "Task bên trái chạy TRƯỚC task bên phải", "So sánh lớn hơn", "Nối chuỗi"], answer: 1, explanation: "t1 >> t2 nghĩa là t1 phải hoàn thành trước khi t2 bắt đầu — định nghĩa dependency giữa các task." },
          { question: "Schedule '@daily' trong Airflow chạy lúc nào?", options: ["Mỗi giờ", "Mỗi ngày lúc 00:00 UTC", "Mỗi tuần", "Mỗi phút"], answer: 1, explanation: "@daily = chạy 1 lần mỗi ngày vào lúc nửa đêm UTC. Các preset khác: @hourly, @weekly, @monthly." },
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

# Mô phỏng Star Schema với Python
fact_sales = [
    {"date_id": 1, "product_id": 101, "store_id": 1, "quantity": 5, "revenue": 500000},
    {"date_id": 1, "product_id": 102, "store_id": 2, "quantity": 3, "revenue": 900000},
    {"date_id": 2, "product_id": 101, "store_id": 1, "quantity": 8, "revenue": 800000},
]

dim_product = {101: "Laptop", 102: "Phone"}
dim_store = {1: "HCM", 2: "HN"}
dim_time = {1: "2024-01-15", 2: "2024-01-16"}

# Truy vấn: Doanh thu theo cửa hàng
from collections import defaultdict
store_revenue = defaultdict(int)
for sale in fact_sales:
    store = dim_store[sale["store_id"]]
    store_revenue[store] += sale["revenue"]

for store, rev in store_revenue.items():
    print(f"🏪 {store}: {rev:,.0f} VNĐ")`,
        codeLanguage: "python",
        exercise: "Thiết kế Star Schema cho hệ thống e-commerce với 1 Fact table và 4 Dimension tables. Viết truy vấn phân tích.",
        exerciseEn: "Design a Star Schema for e-commerce with 1 Fact and 4 Dimension tables. Write analytical queries.",
        quiz: [
          { question: "Data Lake khác Data Warehouse ở điểm nào?", options: ["Chỉ lưu SQL", "Lưu dữ liệu thô mọi định dạng", "Chỉ lưu hình ảnh", "Nhanh hơn"], answer: 1, explanation: "Data Lake lưu trữ dữ liệu thô (raw) ở mọi định dạng, trong khi Data Warehouse chỉ lưu dữ liệu đã cấu trúc." },
          { question: "Star Schema có mấy loại bảng chính?", options: ["1 loại", "2 loại: Fact và Dimension", "3 loại", "4 loại"], answer: 1, explanation: "Star Schema gồm bảng Fact (chứa metric/measure) ở giữa và các bảng Dimension (mô tả context) xung quanh." },
          { question: "Schema-on-write khác schema-on-read ở điểm nào?", options: ["Không khác", "Schema-on-write định nghĩa cấu trúc TRƯỚC khi ghi", "Schema-on-read nhanh hơn khi ghi", "Chỉ dùng cho CSV"], answer: 1, explanation: "Data Warehouse dùng schema-on-write (cấu trúc trước). Data Lake dùng schema-on-read (lưu thô, cấu trúc khi phân tích)." },
          { question: "Parquet format có ưu điểm gì so với CSV?", options: ["Dễ đọc bằng mắt hơn", "Lưu trữ cột (columnar), nén tốt, query nhanh", "Tương thích mọi phần mềm", "Luôn nhỏ hơn"], answer: 1, explanation: "Parquet lưu trữ theo cột (columnar), nén hiệu quả hơn CSV và cho phép đọc chỉ các cột cần thiết." },
          { question: "Data Lakehouse kết hợp gì?", options: ["SQL và NoSQL", "Tính linh hoạt của Data Lake + quản trị của Data Warehouse", "Python và Java", "Cloud và On-premise"], answer: 1, explanation: "Data Lakehouse (Delta Lake, Apache Iceberg) kết hợp lưu trữ mở của Lake với ACID transactions của Warehouse." },
        ],
      },
    ],
  },
  {
    id: "prog-ml",
    title: "Machine Learning cơ bản",
    titleEn: "Basic Machine Learning",
    icon: "🤖",
    color: "from-teal-500/20 to-green-500/20",
    description: "Regression, Classification, Clustering với scikit-learn",
    descriptionEn: "Regression, Classification, Clustering with scikit-learn",
    course: "data-ai",
    lessons: [
      {
        id: "ml-1",
        title: "ML là gì & Linear Regression",
        titleEn: "What is ML & Linear Regression",
        theory: "**Machine Learning** = Máy tính \"học\" từ dữ liệu để đưa ra dự đoán.\n\n**3 loại chính:**\n- 🎯 Supervised: Học có giám sát (có đáp án)\n  - Regression: Dự đoán số (giá nhà)\n  - Classification: Phân loại (spam/không spam)\n- 🔍 Unsupervised: Học không giám sát (tự tìm nhóm)\n- 🎮 Reinforcement: Học tăng cường (thử-sai)\n\n**Linear Regression:** Tìm đường thẳng y = ax + b phù hợp nhất với dữ liệu.",
        theoryEn: "**Machine Learning** = Computers \"learn\" from data to make predictions.\n\n**3 main types:**\n- 🎯 Supervised: Has labels/answers\n  - Regression: Predict numbers (house prices)\n  - Classification: Categorize (spam/not spam)\n- 🔍 Unsupervised: No labels (find groups)\n- 🎮 Reinforcement: Trial and error\n\n**Linear Regression:** Find best-fit line y = ax + b.",
        code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Dữ liệu: Diện tích (m²) → Giá nhà (tỷ VNĐ)
X = np.array([[30], [50], [70], [90], [110], [130]])
y = np.array([1.2, 2.0, 2.8, 3.5, 4.3, 5.1])

# Huấn luyện mô hình
model = LinearRegression()
model.fit(X, y)

# Hệ số
print(f"Hệ số góc (a): {model.coef_[0]:.4f}")
print(f"Hệ số chặn (b): {model.intercept_:.4f}")
print(f"Phương trình: Giá = {model.coef_[0]:.4f} × Diện_tích + {model.intercept_:.4f}")

# Dự đoán
dien_tich_moi = [[80], [150]]
du_doan = model.predict(dien_tich_moi)
for dt, gia in zip(dien_tich_moi, du_doan):
    print(f"\\n🏠 Diện tích {dt[0]}m² → Giá dự đoán: {gia:.2f} tỷ")

# Đánh giá mô hình
r2 = model.score(X, y)
print(f"\\n📊 R² Score: {r2:.4f} ({'Tốt' if r2 > 0.9 else 'Trung bình'})")`,
        codeLanguage: "python",
        exercise: "Thu thập dữ liệu giá xe ô tô (năm sản xuất, số km, giá bán). Xây dựng mô hình Linear Regression để dự đoán giá.",
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

# Dữ liệu: [giờ học, giờ ngủ, điểm bài tập] → Đậu/Rớt
X = [
    [6, 8, 85], [2, 5, 40], [8, 7, 90], [1, 4, 30],
    [5, 7, 70], [7, 8, 80], [3, 6, 55], [4, 7, 65],
    [9, 7, 95], [2, 5, 45], [6, 8, 75], [1, 3, 25],
]
y = [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0]  # 1=Đậu, 0=Rớt

# Chia train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# Huấn luyện
tree = DecisionTreeClassifier(max_depth=3)
tree.fit(X_train, y_train)

# Dự đoán
sv_moi = [[5, 7, 60]]
ket_qua = tree.predict(sv_moi)
print(f"Sinh viên (5h học, 7h ngủ, 60 điểm BT)")
print(f"→ Dự đoán: {'✅ ĐẬU' if ket_qua[0] else '❌ RỚT'}")

# Đánh giá
accuracy = tree.score(X_test, y_test)
print(f"\n📊 Accuracy: {accuracy:.1%}")`,
        codeLanguage: "python",
        exercise: "Xây dựng mô hình phân loại email spam/không spam dựa trên: số từ, có link không, có từ 'miễn phí' không.",
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

# Dữ liệu: [chiều cao cm, cân nặng kg] → Thể loại
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

# Dự đoán
person = [[170, 65]]
result = knn.predict(person)
print(f"Người 170cm/65kg → {result[0]}")
print(f"Accuracy: {knn.score(X_test, y_test):.1%}")`,
        codeLanguage: "python",
        exercise: "Dùng KNN phân loại hoa Iris (sklearn.datasets). Thử K=1,3,5,7 và vẽ biểu đồ accuracy.",
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
        title: "Clustering với K-Means",
        titleEn: "Clustering with K-Means",
        theory: "**Clustering** nhóm dữ liệu KHÔNG có nhãn (Unsupervised).\n\n**K-Means:**\n1. Chọn K tâm ngẫu nhiên\n2. Gán mỗi điểm vào tâm gần nhất\n3. Cập nhật tâm = trung bình nhóm\n4. Lặp lại đến khi ổn định\n\n**Ứng dụng:** Phân khúc khách hàng, gom nhóm văn bản, nén ảnh\n\n**Elbow Method:** Chọn K tối ưu bằng đồ thị Inertia",
        theoryEn: "**Clustering** groups UNLABELED data (Unsupervised).\n\n**K-Means:**\n1. Choose K random centroids\n2. Assign each point to nearest centroid\n3. Update centroids = group mean\n4. Repeat until stable\n\n**Applications:** Customer segmentation, text grouping, image compression\n\n**Elbow Method:** Choose optimal K via Inertia plot",
        code: `from sklearn.cluster import KMeans
import numpy as np

# Dữ liệu khách hàng: [chi tiêu/tháng, số lần mua]
customers = np.array([
    [500, 2], [1500, 8], [300, 1], [2000, 12],
    [800, 4], [100, 1], [1800, 10], [600, 3],
    [2500, 15], [400, 2], [1200, 6], [50, 1],
])

kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(customers)

labels = kmeans.labels_
segments = ["💎 VIP", "⭐ Thường xuyên", "👤 Thỉnh thoảng"]

for i, (cust, label) in enumerate(zip(customers, labels)):
    print(f"KH {i+1}: Chi tiêu {cust[0]:,}k, {cust[1]} lần → {segments[label]}")

print(f"\nTâm cụm: {kmeans.cluster_centers_}")`,
        codeLanguage: "python",
        exercise: "Phân cụm dữ liệu điểm thi sinh viên thành 3 nhóm (Giỏi, Khá, Trung bình). Vẽ scatter plot.",
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
        title: "Đánh giá & Triển khai mô hình",
        titleEn: "Model Evaluation & Deployment",
        theory: "**Metrics đánh giá:**\n- Accuracy: Tỷ lệ đúng tổng thể\n- Precision: Tỷ lệ đúng trong dự đoán dương\n- Recall: Tỷ lệ phát hiện dương thật\n- F1-Score: Trung bình điều hòa Precision & Recall\n- Confusion Matrix: Ma trận nhầm lẫn\n\n**Cross-Validation:** Chia dữ liệu thành K phần, đánh giá K lần\n\n**Triển khai:** Lưu mô hình với joblib/pickle → Flask API",
        theoryEn: "**Evaluation Metrics:**\n- Accuracy: Overall correctness\n- Precision: Correctness of positive predictions\n- Recall: Detection rate of true positives\n- F1-Score: Harmonic mean of Precision & Recall\n- Confusion Matrix\n\n**Cross-Validation:** Split data into K folds, evaluate K times\n\n**Deployment:** Save model with joblib/pickle → Flask API",
        code: `from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
import joblib

# Giả sử đã có X_train, X_test, y_train, y_test
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

data = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.3, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Báo cáo đánh giá
print(classification_report(y_test, y_pred,
      target_names=data.target_names))

# Cross-Validation
cv_scores = cross_val_score(model, data.data, data.target, cv=5)
print(f"CV Accuracy: {cv_scores.mean():.2%} ± {cv_scores.std():.2%}")

# Lưu mô hình
joblib.dump(model, 'iris_model.pkl')
print("✅ Mô hình đã lưu!")`,
        codeLanguage: "python",
        exercise: "Huấn luyện 3 mô hình (KNN, Decision Tree, Random Forest) trên cùng dataset, so sánh metrics.",
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
    description: "Nền tảng AI: Lịch sử, LLMs, Prompt Engineering, Ethics và ứng dụng thực tế",
    descriptionEn: "AI Fundamentals: History, LLMs, Prompt Engineering, Ethics and real-world applications",
    course: "data-ai",
    lessons: [
      {
        id: "ai-f-1",
        title: "AI là gì? Lịch sử & Các nhánh chính",
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
        exercise: "Tạo một chương trình Python phân loại các ứng dụng AI hàng ngày (Google Translate, Siri, Tesla Autopilot...) vào đúng nhánh AI tương ứng.",
        exerciseEn: "Create a Python program that classifies daily AI applications (Google Translate, Siri, Tesla Autopilot...) into the correct AI branch.",
        quiz: [
          { question: "AI được đặt tên chính thức năm nào?", options: ["1943", "1950", "1956", "1997"], answer: 2, explanation: "Thuật ngữ 'Artificial Intelligence' được đặt tên tại hội nghị Dartmouth năm 1956." },
          { question: "ChatGPT thuộc nhánh AI nào?", options: ["Computer Vision", "Robotics", "NLP", "Reinforcement Learning"], answer: 2, explanation: "ChatGPT là mô hình NLP (Natural Language Processing) - xử lý ngôn ngữ tự nhiên." },
          { question: "Deep Blue nổi tiếng vì điều gì?", options: ["Dịch thuật", "Đánh bại nhà vô địch cờ vua", "Nhận dạng khuôn mặt", "Lái xe tự động"], answer: 1, explanation: "Deep Blue của IBM đánh bại nhà vô địch cờ vua Garry Kasparov năm 1997." },
          { question: "Deep Learning khác Machine Learning truyền thống ở điểm nào?", options: ["Không cần dữ liệu", "Tự trích xuất đặc trưng từ dữ liệu thô nhờ nhiều lớp ẩn", "Luôn chính xác hơn", "Chỉ dùng cho ảnh"], answer: 1, explanation: "Deep Learning dùng nhiều hidden layers để tự động học đặc trưng, không cần thiết kế thủ công." },
          { question: "NLP là viết tắt của gì?", options: ["Neural Language Processing", "Natural Language Processing", "Network Learning Protocol", "Numeric Logic Programming"], answer: 1, explanation: "NLP = Natural Language Processing (Xử lý ngôn ngữ tự nhiên) — nhánh AI giúp máy hiểu ngôn ngữ con người." },
        ],
      },
      {
        id: "ai-f-2",
        title: "Neural Networks & Deep Learning cơ bản",
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
        exercise: "Sửa đổi mạng nơ-ron trên để giải bài toán AND và OR. So sánh số epoch cần thiết để đạt accuracy > 95%.",
        exerciseEn: "Modify the neural network above to solve AND and OR problems. Compare epochs needed for >95% accuracy.",
        quiz: [
          { question: "Activation function dùng để làm gì?", options: ["Tăng tốc tính toán", "Thêm tính phi tuyến cho mạng", "Giảm dữ liệu", "Mã hóa dữ liệu"], answer: 1, explanation: "Activation function thêm tính phi tuyến (non-linearity), giúp mạng học được các mối quan hệ phức tạp." },
          { question: "Deep Learning khác ML thông thường ở điểm nào?", options: ["Không cần dữ liệu", "Nhiều hidden layers hơn", "Chỉ dùng cho ảnh", "Nhanh hơn"], answer: 1, explanation: "Deep Learning có nhiều hidden layers hơn, cho phép học đặc trưng phức tạp và trừu tượng hơn." },
          { question: "Epoch trong training neural network nghĩa là gì?", options: ["Một batch dữ liệu", "Một lần duyệt toàn bộ dataset", "Một neuron kích hoạt", "Thời gian chạy 1 giây"], answer: 1, explanation: "1 epoch = mô hình đã xem qua TOÀN BỘ dữ liệu huấn luyện 1 lần. Thường cần nhiều epoch để hội tụ." },
          { question: "Gradient Descent dùng để làm gì?", options: ["Tăng loss function", "Tìm giá trị weights tối ưu bằng cách giảm loss", "Tạo dữ liệu mới", "Chia dữ liệu train/test"], answer: 1, explanation: "Gradient Descent điều chỉnh weights theo hướng giảm loss function, giống đi xuống dốc tìm điểm thấp nhất." },
          { question: "Learning rate quá lớn gây ra vấn đề gì?", options: ["Hội tụ quá chậm", "Nhảy qua điểm tối ưu, không hội tụ được", "Tốn nhiều bộ nhớ", "Không ảnh hưởng"], answer: 1, explanation: "Learning rate lớn khiến bước nhảy quá lớn, mô hình dao động qua lại quanh điểm tối ưu mà không đến được." },
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
        exercise: "Tạo một BPE (Byte Pair Encoding) tokenizer đơn giản. Cho 1 đoạn văn bản tiếng Việt, đếm số tokens và so sánh với word-level tokenizer.",
        exerciseEn: "Create a simple BPE tokenizer. Given a Vietnamese text, count tokens and compare with word-level tokenizer.",
        quiz: [
          { question: "Transformer khác RNN ở điểm chính nào?", options: ["Dùng ít dữ liệu hơn", "Xử lý song song thay vì tuần tự", "Chỉ dùng cho ảnh", "Không cần GPU"], answer: 1, explanation: "Transformer xử lý tất cả tokens cùng lúc (song song) nhờ Self-Attention, trong khi RNN phải xử lý tuần tự." },
          { question: "Token trong LLM là gì?", options: ["Một câu", "Một đoạn văn", "Đơn vị nhỏ nhất của văn bản mà mô hình xử lý", "Một file"], answer: 2, explanation: "Token là đơn vị nhỏ nhất (có thể là từ, sub-word, hoặc ký tự) mà LLM sử dụng để xử lý văn bản." },
          { question: "Self-Attention cho phép mô hình làm gì?", options: ["Chỉ xem từ liền kề", "Xem xét mối quan hệ giữa TẤT CẢ các từ cùng lúc", "Bỏ qua ngữ cảnh", "Chỉ xem từ đầu tiên"], answer: 1, explanation: "Self-Attention tính trọng số giữa mọi cặp từ, cho phép mô hình hiểu ngữ cảnh xa mà RNN khó làm được." },
          { question: "Positional Encoding dùng để làm gì?", options: ["Mã hóa bảo mật", "Cung cấp thông tin vị trí vì Transformer không xử lý tuần tự", "Giảm kích thước input", "Tăng tốc training"], answer: 1, explanation: "Vì Transformer xử lý song song, nó không biết thứ tự từ. Positional Encoding thêm thông tin vị trí vào embedding." },
          { question: "BERT và GPT khác nhau chính ở điều gì?", options: ["BERT dùng encoder (bidirectional), GPT dùng decoder (left-to-right)", "BERT nhanh hơn", "GPT cũ hơn", "Không khác nhau"], answer: 0, explanation: "BERT dùng encoder, đọc cả 2 chiều → tốt cho hiểu ngữ cảnh. GPT dùng decoder, sinh text từ trái sang phải." },
        ],
      },
      {
        id: "ai-f-4",
        title: "Prompt Engineering - Nghệ thuật ra lệnh cho AI",
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
        exercise: "Viết 5 prompt khác nhau cho cùng một nhiệm vụ (tóm tắt bài báo) sử dụng 5 kỹ thuật: zero-shot, few-shot, CoT, role-playing, và structured output. Đánh giá chất lượng kết quả.",
        exerciseEn: "Write 5 different prompts for the same task (article summarization) using 5 techniques: zero-shot, few-shot, CoT, role-playing, and structured output. Evaluate result quality.",
        quiz: [
          { question: "Chain-of-Thought prompting là gì?", options: ["Viết prompt ngắn nhất", "Yêu cầu AI suy luận từng bước", "Cho AI nhiều vai trò", "Viết bằng nhiều ngôn ngữ"], answer: 1, explanation: "Chain-of-Thought yêu cầu AI trình bày quá trình suy luận từng bước, giúp cải thiện độ chính xác cho các bài toán phức tạp." },
          { question: "Few-shot learning cần gì?", options: ["Hàng triệu ví dụ", "2-5 ví dụ mẫu trong prompt", "Không cần ví dụ", "Chỉ dùng cho ảnh"], answer: 1, explanation: "Few-shot learning cho AI 2-5 ví dụ mẫu ngay trong prompt để AI hiểu pattern và áp dụng cho dữ liệu mới." },
          { question: "Prompt nào tốt hơn?", options: ["'Viết code cho tôi'", "'Viết hàm Python tính giai thừa bằng đệ quy, kèm docstring và 3 test cases'", "'Code something'", "'Help me'"], answer: 1, explanation: "Prompt cụ thể (ngôn ngữ, nhiệm vụ, yêu cầu chi tiết) cho kết quả chính xác hơn prompt mơ hồ." },
          { question: "System prompt khác user prompt ở điểm nào?", options: ["System prompt dài hơn", "System prompt thiết lập hành vi/persona mặc định cho AI", "User prompt quan trọng hơn", "Không khác nhau"], answer: 1, explanation: "System prompt đặt luật chơi cho AI (vai trò, phong cách, giới hạn). User prompt là câu hỏi từ người dùng." },
          { question: "Khi AI bịa thông tin (hallucinate), nên dùng kỹ thuật nào?", options: ["Tăng temperature", "Yêu cầu trích dẫn nguồn + dùng RAG", "Viết prompt ngắn hơn", "Đổi mô hình nhỏ hơn"], answer: 1, explanation: "Yêu cầu AI trích dẫn nguồn và sử dụng RAG (cung cấp tài liệu thực) giúp giảm hallucination đáng kể." },
        ],
      },
      {
        id: "ai-f-5",
        title: "API & Xây dựng ứng dụng AI đầu tiên",
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
    "Giải thích từ 'ubiquitous' bằng tiếng Việt",
    "Cho 3 ví dụ sử dụng từ này",
]
for q in questions:
    print(f"\\n👤 User: {q}")
    response = app.chat(q)
    print(f"🤖 AI: {response}")
    print(f"   (Conversation length: {len(app.conversation)} messages)")`,
        codeLanguage: "python",
        exercise: "Xây dựng một chatbot CLI đơn giản bằng Python. Chatbot phải: (1) Lưu lịch sử hội thoại, (2) Hỗ trợ lệnh /clear để xóa lịch sử, (3) Hỗ trợ /role để đổi system prompt.",
        exerciseEn: "Build a simple CLI chatbot in Python. The chatbot must: (1) Save conversation history, (2) Support /clear to reset, (3) Support /role to change system prompt.",
        quiz: [
          { question: "Temperature = 0 trong AI API có nghĩa gì?", options: ["AI ngừng hoạt động", "Output chính xác và nhất quán nhất", "Output sáng tạo nhất", "Tốc độ nhanh nhất"], answer: 1, explanation: "Temperature = 0 cho output deterministic (cùng input luôn cho cùng output), phù hợp cho các tác vụ cần chính xác." },
          { question: "Tại sao không nên để API key trong frontend?", options: ["Chạy chậm hơn", "Ai cũng có thể thấy và dùng key của bạn", "API không hoạt động", "Bị lỗi CORS"], answer: 1, explanation: "Code frontend ai cũng xem được (Inspect). Nếu để API key, người khác sẽ lấy key và dùng, gây thiệt hại tài chính." },
          { question: "max_tokens trong AI API giới hạn gì?", options: ["Thời gian xử lý", "Độ dài tối đa của output (tính bằng tokens)", "Số lần gọi API", "Kích thước file upload"], answer: 1, explanation: "max_tokens giới hạn số tokens trong response. 1 token khoảng 4 ký tự tiếng Anh hoặc 1-2 ký tự tiếng Việt." },
          { question: "Streaming response trong AI API có lợi ích gì?", options: ["Chính xác hơn", "Người dùng thấy kết quả ngay từng phần", "Rẻ hơn", "An toàn hơn"], answer: 1, explanation: "Streaming hiển thị từng token khi được sinh ra, giúp UX tốt hơn vì không phải chờ toàn bộ response." },
          { question: "Environment variable dùng để lưu API key vì sao?", options: ["Nhanh hơn hardcode", "Không bị commit vào git, bảo mật hơn", "Tự động refresh key", "Bắt buộc bởi OpenAI"], answer: 1, explanation: "Environment variables không nằm trong source code, không bị push lên git. File .env nên thêm vào .gitignore." },
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
        exercise: "Xây dựng một RAG system đơn giản cho tài liệu học Python. Cho trước 20 đoạn kiến thức, implement tìm kiếm bằng TF-IDF thay vì word frequency.",
        exerciseEn: "Build a simple RAG system for Python learning documents. Given 20 knowledge chunks, implement search using TF-IDF instead of word frequency.",
        quiz: [
          { question: "RAG giải quyết vấn đề gì của LLM?", options: ["Tốc độ chậm", "Hallucination và kiến thức lỗi thời", "Giao diện xấu", "Chi phí cao"], answer: 1, explanation: "RAG cung cấp thông tin thực tế từ tài liệu, giúp LLM không bịa (hallucinate) và có thể truy cập dữ liệu mới nhất." },
          { question: "Vector embedding dùng để làm gì trong RAG?", options: ["Mã hóa bảo mật", "So sánh độ tương đồng ngữ nghĩa", "Nén file", "Tạo hình ảnh"], answer: 1, explanation: "Vector embeddings biến văn bản thành vectors số, cho phép tính toán độ tương đồng ngữ nghĩa giữa câu hỏi và tài liệu." },
          { question: "Chunking trong RAG là gì?", options: ["Nén file", "Chia tài liệu thành đoạn nhỏ để embedding và tìm kiếm", "Mã hóa dữ liệu", "Xóa dữ liệu trùng"], answer: 1, explanation: "Chunking chia tài liệu dài thành các đoạn nhỏ (chunks) phù hợp để tạo embedding và tra cứu hiệu quả." },
          { question: "Cosine similarity đo gì giữa 2 vectors?", options: ["Khoảng cách Euclidean", "Góc giữa 2 vectors — cùng hướng = similarity cao", "Tổng 2 vectors", "Chiều dài vectors"], answer: 1, explanation: "Cosine similarity = cos(θ). Giá trị 1 = cùng hướng (rất giống), 0 = vuông góc (không liên quan)." },
          { question: "Vector database khác SQL database ở điểm nào?", options: ["Lưu nhiều hơn", "Tối ưu cho tìm kiếm theo độ tương đồng vector", "Miễn phí", "Dùng SQL"], answer: 1, explanation: "Vector DB tối ưu cho approximate nearest neighbor search — nhanh hơn SQL rất nhiều cho semantic search." },
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
        if "weather" in input_lower or "thời tiết" in input_lower:
            tool_name = "get_weather"
            # Extract city name (simplified)
            for city in ["Hanoi", "HCMC", "Da Nang"]:
                if city.lower() in input_lower:
                    args = city
                    break
            else:
                args = "Hanoi"
        elif any(op in input_lower for op in ["+", "-", "*", "/", "tính"]):
            tool_name = "calculate"
            args = input_lower.replace("tính", "").strip()
        elif "time" in input_lower or "giờ" in input_lower:
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
    "Tính 15 * 24 + 100",
    "What time is it?",
]

for q in queries:
    response = agent.process(q)
    print(f"  💬 Response: {response}")`,
        codeLanguage: "python",
        exercise: "Mở rộng Agent trên: thêm tool 'search_knowledge' (tìm trong list kiến thức), tool 'translate' (dịch Việt-Anh), và xử lý multi-step tasks (ví dụ: 'Dịch thời tiết Hà Nội sang tiếng Anh').",
        exerciseEn: "Extend the Agent: add 'search_knowledge' tool, 'translate' tool (Vietnamese-English), and handle multi-step tasks (e.g., 'Translate Hanoi weather to English').",
        quiz: [
          { question: "Function Calling cho phép AI làm gì?", options: ["Viết code", "Gọi các công cụ/API bên ngoài", "Tự huấn luyện", "Tạo hình ảnh"], answer: 1, explanation: "Function Calling cho AI khả năng gọi các hàm/API bên ngoài (thời tiết, database, tìm kiếm...) để lấy dữ liệu thực tế." },
          { question: "AI Agent khác chatbot thông thường ở điểm nào?", options: ["Nói nhiều hơn", "Có thể tự lập kế hoạch và thực hiện hành động", "Dùng giọng nói", "Miễn phí"], answer: 1, explanation: "AI Agent có thể tự phân tích nhiệm vụ, lập kế hoạch, chọn tools phù hợp và thực thi - không chỉ trả lời text." },
          { question: "ReAct pattern trong AI Agent là gì?", options: ["Reactive programming", "Reasoning + Acting — suy luận rồi hành động luân phiên", "Real-time action", "Recursive action"], answer: 1, explanation: "ReAct = Reason + Act. Agent suy luận → quyết định action → quan sát kết quả → suy luận tiếp, lặp lại." },
          { question: "Multi-step task trong AI Agent nghĩa là gì?", options: ["Chạy nhiều mô hình", "Nhiệm vụ phức tạp cần chia thành nhiều bước", "Dùng nhiều API key", "Training nhiều epoch"], answer: 1, explanation: "Multi-step task: Agent phải lập kế hoạch, thực hiện nhiều bước tuần tự." },
          { question: "Tool description trong Agent dùng để làm gì?", options: ["Trang trí giao diện", "Giúp AI hiểu khi nào và cách sử dụng từng tool", "Bảo mật API", "Logging"], answer: 1, explanation: "Description giúp LLM quyết định tool nào phù hợp cho yêu cầu hiện tại và truyền tham số đúng." },
        ],
      },
      {
        id: "ai-f-8",
        title: "Computer Vision cơ bản",
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
        exercise: "Implement thêm các kernel khác: Blur (trung bình), Sharpen, Emboss. Áp dụng lên ảnh 16x16 và so sánh kết quả.",
        exerciseEn: "Implement additional kernels: Blur (average), Sharpen, Emboss. Apply to a 16x16 image and compare results.",
        quiz: [
          { question: "CNN dùng Convolution Layer để làm gì?", options: ["Phóng to ảnh", "Phát hiện đặc trưng (cạnh, góc...)", "Xóa nền ảnh", "Nén ảnh"], answer: 1, explanation: "Convolutional Layer sử dụng kernel/filter để phát hiện các đặc trưng trực quan như cạnh, góc, và textures." },
          { question: "Transfer Learning hữu ích khi nào?", options: ["Có rất nhiều dữ liệu", "Có ít dữ liệu cho bài toán mới", "Không cần GPU", "Chỉ dùng cho text"], answer: 1, explanation: "Transfer Learning đặc biệt hữu ích khi bạn có ít dữ liệu - dùng kiến thức từ mô hình lớn đã huấn luyện sẵn." },
          { question: "Pooling layer trong CNN có tác dụng gì?", options: ["Tăng kích thước ảnh", "Giảm kích thước feature map, giữ đặc trưng quan trọng", "Thêm màu cho ảnh", "Tạo ảnh mới"], answer: 1, explanation: "Pooling giảm chiều dữ liệu, giúp mô hình nhỏ hơn, nhanh hơn, và có tính bất biến vị trí." },
          { question: "Data Augmentation trong Computer Vision là gì?", options: ["Thu thập thêm dữ liệu", "Tạo thêm ảnh bằng xoay, lật, cắt, đổi màu", "Tăng resolution ảnh", "Xóa ảnh xấu"], answer: 1, explanation: "Data Augmentation tạo thêm training data bằng biến đổi ảnh — giúp giảm overfitting." },
          { question: "Object Detection khác Image Classification ở điểm nào?", options: ["Nhanh hơn", "Vừa xác định loại VÀ vị trí (bounding box)", "Chỉ dùng cho video", "Cần GPU mạnh hơn"], answer: 1, explanation: "Classification: ảnh này là gì? Detection: ảnh có gì VÀ ở đâu? Detection trả về cả class và bounding box." },
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
        exercise: "Thiết kế một 'AI Ethics Checklist' bằng Python. Chương trình nhận mô tả về 1 hệ thống AI và đánh giá 6 tiêu chí (Fairness, Transparency, Privacy, Accountability, Safety, Human Oversight) trên thang 1-5.",
        exerciseEn: "Design an 'AI Ethics Checklist' in Python. The program takes an AI system description and rates 6 criteria (Fairness, Transparency, Privacy, Accountability, Safety, Human Oversight) on a 1-5 scale.",
        quiz: [
          { question: "Bias trong AI gây ra vấn đề gì?", options: ["Tốn điện", "Phân biệt đối xử không công bằng", "Chạy chậm", "Giao diện xấu"], answer: 1, explanation: "Bias khiến AI đưa ra quyết định thiên lệch, có thể phân biệt đối xử dựa trên giới tính, chủng tộc, tuổi tác..." },
          { question: "Nguyên tắc nào yêu cầu AI giải thích được quyết định?", options: ["Fairness", "Transparency", "Privacy", "Safety"], answer: 1, explanation: "Transparency (Minh bạch) yêu cầu hệ thống AI có thể giải thích cách và tại sao nó đưa ra quyết định." },
          { question: "Explainable AI (XAI) quan trọng vì sao?", options: ["Chạy nhanh hơn", "Giúp con người hiểu TẠI SAO AI đưa ra quyết định", "Giảm chi phí", "Tăng accuracy"], answer: 1, explanation: "XAI giúp giải thích quyết định của AI, đặc biệt quan trọng trong y tế, tài chính, pháp luật." },
          { question: "GDPR yêu cầu gì liên quan đến AI?", options: ["AI phải miễn phí", "Quyền được giải thích và quyền bị quên", "AI phải open-source", "Chỉ áp dụng ở Mỹ"], answer: 1, explanation: "GDPR (EU) yêu cầu: người dùng có quyền biết AI dùng dữ liệu của họ thế nào, quyền yêu cầu xóa dữ liệu." },
          { question: "AI bias thường đến từ đâu?", options: ["GPU không đủ mạnh", "Dữ liệu huấn luyện không đại diện hoặc có thiên lệch", "Thuật toán quá phức tạp", "Người dùng nhập sai"], answer: 1, explanation: "Bias chủ yếu từ training data: nếu dữ liệu thiếu đại diện, AI sẽ học và khuếch đại bias đó." },
        ],
      },
      {
        id: "ai-f-10",
        title: "Dự án: Xây dựng AI Chatbot hoàn chỉnh",
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
    "Xin chào!",
    "Giải thích 'for loop' trong Python",
    "Cho ví dụ calculator 5 + 3",
]

print("\\n💬 Chat Session:")
for msg in messages:
    print(f"  👤 {msg}")
    response = bot.chat(session, msg)
    print(f"  🤖 {response}")

print(f"\\n📊 Stats: {bot.get_stats()}")`,
        codeLanguage: "python",
        exercise: "Hoàn thiện chatbot trên: (1) Thêm SQLite lưu conversations, (2) Implement streaming giả lập (in từng ký tự), (3) Thêm tool 'search_lessons' tìm bài học trong HaiEduTech, (4) Viết unit tests.",
        exerciseEn: "Complete the chatbot: (1) Add SQLite to save conversations, (2) Implement simulated streaming (print char by char), (3) Add 'search_lessons' tool, (4) Write unit tests.",
        quiz: [
          { question: "Rate limiting trong chatbot dùng để làm gì?", options: ["Tăng tốc xử lý", "Giới hạn số request để tránh lạm dụng", "Cải thiện chất lượng", "Lưu dữ liệu"], answer: 1, explanation: "Rate limiting giới hạn số request/phút để tránh abuse, bảo vệ API key và quản lý chi phí." },
          { question: "Tại sao cần lưu conversation history?", options: ["Tiết kiệm bộ nhớ", "Để AI hiểu ngữ cảnh cuộc trò chuyện", "Tăng bảo mật", "Giảm chi phí"], answer: 1, explanation: "Conversation history giúp AI hiểu ngữ cảnh, tham chiếu các tin nhắn trước và trả lời mạch lạc hơn." },
          { question: "Input validation trong chatbot quan trọng vì sao?", options: ["Tăng tốc xử lý", "Ngăn chặn prompt injection và nội dung độc hại", "Giảm chi phí API", "Cải thiện giao diện"], answer: 1, explanation: "Input validation lọc nội dung nguy hiểm trước khi gửi đến AI API." },
          { question: "Token counting quan trọng cho quản lý chi phí vì sao?", options: ["Tokens quyết định chất lượng", "API tính phí theo số tokens sử dụng", "Tokens ảnh hưởng bảo mật", "Không quan trọng"], answer: 1, explanation: "API AI tính phí dựa trên tokens (input + output). Theo dõi token usage giúp kiểm soát chi phí." },
          { question: "Streaming response cần kỹ thuật gì ở backend?", options: ["WebSocket hoặc Server-Sent Events (SSE)", "Chỉ cần REST API", "GraphQL subscription", "Polling mỗi giây"], answer: 0, explanation: "Streaming dùng SSE hoặc WebSocket để server gửi từng phần response liên tục." },
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


export interface ProgrammingModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  course: "kids" | "data-ai" | "python" | "sql" | "data-eng" | "ml";
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
}

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
        theory: "Scratch là ngôn ngữ lập trình trực quan do MIT phát triển. Thay vì viết code, bạn kéo thả các khối lệnh (blocks) để tạo chương trình.\n\n**Các loại khối lệnh chính:**\n- 🟡 Sự kiện (Events): Bắt đầu chương trình, ví dụ 'Khi bấm cờ xanh'\n- 🔵 Chuyển động (Motion): Di chuyển nhân vật, xoay, nhảy\n- 🟣 Ngoại hình (Looks): Thay đổi hình dạng, nói, nghĩ\n- 🟢 Âm thanh (Sound): Phát âm thanh",
        theoryEn: "Scratch is a visual programming language developed by MIT. Instead of writing code, you drag and drop blocks to create programs.\n\n**Main block categories:**\n- 🟡 Events: Start the program, e.g. 'When green flag clicked'\n- 🔵 Motion: Move sprite, turn, glide\n- 🟣 Looks: Change appearance, say, think\n- 🟢 Sound: Play sounds",
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
        ],
      },
      {
        id: "scratch-2",
        title: "Vòng lặp và điều kiện trong Scratch",
        titleEn: "Loops and Conditions in Scratch",
        theory: "**Vòng lặp** giúp thực hiện một hành động nhiều lần mà không cần viết lại code.\n\n**Các loại vòng lặp trong Scratch:**\n- 🔄 Lặp lại N lần: thực hiện đúng N lần\n- 🔄 Lặp mãi mãi: chạy liên tục cho đến khi dừng\n- 🔄 Lặp cho đến khi: chạy đến khi điều kiện đúng\n\n**Câu điều kiện:**\n- Nếu...thì: kiểm tra 1 điều kiện\n- Nếu...thì...nếu không: 2 nhánh",
        theoryEn: "**Loops** help repeat actions without rewriting code.\n\n**Loop types in Scratch:**\n- 🔄 Repeat N times: runs exactly N times\n- 🔄 Forever: runs continuously until stopped\n- 🔄 Repeat until: runs until condition is true\n\n**Conditions:**\n- If...then: check 1 condition\n- If...then...else: 2 branches",
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
        ],
      },
      {
        id: "scratch-3",
        title: "Biến và danh sách trong Scratch",
        titleEn: "Variables and Lists in Scratch",
        theory: "**Biến (Variable)** là một ô nhớ chứa dữ liệu. Giống hộp chứa đồ - bạn đặt tên hộp và bỏ thứ gì đó vào.\n\n**Ví dụ:**\n- điểm_số = 0 (ban đầu)\n- điểm_số = điểm_số + 10 (cộng thêm 10)\n\n**Danh sách (List)** là tập hợp nhiều giá trị, giống một dãy hộp đánh số thứ tự.\n\n**Thao tác với danh sách:**\n- Thêm phần tử\n- Xóa phần tử\n- Lấy phần tử theo vị trí",
        theoryEn: "A **Variable** is a memory cell storing data. Like a labeled box you put things into.\n\n**Example:**\n- score = 0 (initial)\n- score = score + 10 (add 10)\n\nA **List** is a collection of values, like a numbered row of boxes.\n\n**List operations:**\n- Add item\n- Remove item\n- Get item by position",
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
        theory: "Python có các kiểu dữ liệu chính:\n\n**int** - Số nguyên: 1, 42, -7\n**float** - Số thực: 3.14, -0.5\n**str** - Chuỗi ký tự: \"Hello\", 'Python'\n**bool** - Logic: True, False\n\n**Quy tắc đặt tên biến:**\n- Bắt đầu bằng chữ cái hoặc _\n- Không chứa khoảng trắng\n- Phân biệt HOA / thường",
        theoryEn: "Python has main data types:\n\n**int** - Integer: 1, 42, -7\n**float** - Float: 3.14, -0.5\n**str** - String: \"Hello\", 'Python'\n**bool** - Boolean: True, False\n\n**Variable naming rules:**\n- Start with letter or _\n- No spaces\n- Case-sensitive",
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
        ],
      },
      {
        id: "py-basic-2",
        title: "Hàm (Functions)",
        titleEn: "Functions",
        theory: "**Hàm** là một khối code có tên, thực hiện một nhiệm vụ cụ thể. Giúp code gọn gàng và tái sử dụng.\n\n**Cấu trúc:**\n```\ndef ten_ham(tham_so):\n    # thân hàm\n    return ket_qua\n```\n\n**Lợi ích:**\n- Tránh viết lại code\n- Dễ đọc, dễ sửa lỗi\n- Chia bài toán lớn thành nhiều phần nhỏ",
        theoryEn: "A **Function** is a named block of code that performs a specific task. Makes code clean and reusable.\n\n**Structure:**\n```\ndef function_name(parameter):\n    # body\n    return result\n```\n\n**Benefits:**\n- Avoid code repetition\n- Easy to read and debug\n- Break big problems into small parts",
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
        ],
      },
      {
        id: "py-basic-3",
        title: "Vòng lặp for & while",
        titleEn: "For & While Loops",
        theory: "**for** - Lặp qua một dãy giá trị đã biết trước\n**while** - Lặp khi điều kiện còn đúng\n\n**Lệnh điều khiển:**\n- break: thoát vòng lặp\n- continue: bỏ qua lần lặp hiện tại\n\n**range(start, stop, step):**\n- range(5) → 0,1,2,3,4\n- range(1,6) → 1,2,3,4,5\n- range(0,10,2) → 0,2,4,6,8",
        theoryEn: "**for** - Loop through a known sequence\n**while** - Loop while condition is true\n\n**Control statements:**\n- break: exit loop\n- continue: skip current iteration\n\n**range(start, stop, step):**\n- range(5) → 0,1,2,3,4\n- range(1,6) → 1,2,3,4,5\n- range(0,10,2) → 0,2,4,6,8",
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
        theory: "**List []** - Danh sách có thứ tự, thay đổi được\n**Tuple ()** - Giống list nhưng không thay đổi được\n**Dictionary {}** - Cặp key:value, truy xuất nhanh\n\n**Khi nào dùng gì?**\n- List: dữ liệu thay đổi (danh sách học sinh)\n- Tuple: dữ liệu cố định (tọa độ, ngày tháng)\n- Dict: dữ liệu cần tra cứu nhanh (từ điển, cấu hình)",
        theoryEn: "**List []** - Ordered, mutable sequence\n**Tuple ()** - Like list but immutable\n**Dictionary {}** - Key:value pairs, fast lookup\n\n**When to use what?**\n- List: changing data (student list)\n- Tuple: fixed data (coordinates, dates)\n- Dict: data needing fast lookup (dictionary, config)",
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
        ],
      },
      {
        id: "ds-2",
        title: "Thuật toán sắp xếp",
        titleEn: "Sorting Algorithms",
        theory: "**Bubble Sort** - So sánh từng cặp liền kề, đổi chỗ nếu sai thứ tự. Đơn giản nhưng chậm O(n²).\n\n**Selection Sort** - Tìm phần tử nhỏ nhất, đặt vào đầu. Lặp lại với phần còn lại. O(n²).\n\n**Insertion Sort** - Chèn từng phần tử vào vị trí đúng trong dãy đã sắp xếp. Tốt với dãy gần như đã sắp xếp.",
        theoryEn: "**Bubble Sort** - Compare adjacent pairs, swap if wrong order. Simple but slow O(n²).\n\n**Selection Sort** - Find smallest, place at beginning. Repeat with rest. O(n²).\n\n**Insertion Sort** - Insert each element into correct position in sorted portion. Good for nearly sorted arrays.",
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
        ],
      },
      {
        id: "ds-3",
        title: "Thuật toán tìm kiếm",
        titleEn: "Searching Algorithms",
        theory: "**Linear Search** - Duyệt tuần tự từ đầu đến cuối. O(n). Dùng khi dữ liệu chưa sắp xếp.\n\n**Binary Search** - Chia đôi liên tục, so sánh với phần tử giữa. O(log n). YÊU CẦU: dữ liệu phải được sắp xếp.\n\n**So sánh:**\n- 1000 phần tử: Linear cần tối đa 1000 bước, Binary chỉ cần ~10 bước!\n- 1 triệu phần tử: Linear = 1M bước, Binary = ~20 bước!",
        theoryEn: "**Linear Search** - Sequential scan from start to end. O(n). Use when data is unsorted.\n\n**Binary Search** - Repeatedly halve, compare with middle. O(log n). REQUIRES: sorted data.\n\n**Comparison:**\n- 1000 elements: Linear needs max 1000 steps, Binary only ~10!\n- 1 million elements: Linear = 1M steps, Binary = ~20!",
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
        theory: "**Pygame** là thư viện Python để tạo game 2D. Cấu trúc cơ bản:\n\n1. **Khởi tạo** - pygame.init()\n2. **Tạo cửa sổ** - pygame.display.set_mode()\n3. **Vòng lặp game** - while running:\n   - Xử lý sự kiện (bấm phím, click chuột)\n   - Cập nhật trạng thái\n   - Vẽ lên màn hình\n4. **Thoát** - pygame.quit()",
        theoryEn: "**Pygame** is a Python library for 2D games. Basic structure:\n\n1. **Initialize** - pygame.init()\n2. **Create window** - pygame.display.set_mode()\n3. **Game loop** - while running:\n   - Handle events (key press, mouse click)\n   - Update state\n   - Draw on screen\n4. **Quit** - pygame.quit()",
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
        ],
      },
      {
        id: "game-2",
        title: "HTML & CSS: Trang web cá nhân",
        titleEn: "HTML & CSS: Personal Website",
        theory: "**HTML** - Cấu trúc nội dung (khung xương)\n**CSS** - Trang trí giao diện (quần áo)\n\n**Thẻ HTML quan trọng:**\n- <h1> đến <h6>: Tiêu đề\n- <p>: Đoạn văn\n- <img>: Hình ảnh\n- <a>: Liên kết\n- <div>: Nhóm phần tử\n- <ul>/<li>: Danh sách",
        theoryEn: "**HTML** - Content structure (skeleton)\n**CSS** - Visual styling (clothing)\n\n**Important HTML tags:**\n- <h1> to <h6>: Headings\n- <p>: Paragraph\n- <img>: Image\n- <a>: Link\n- <div>: Group elements\n- <ul>/<li>: Lists",
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
        theory: "**SQL (Structured Query Language)** là ngôn ngữ truy vấn cơ sở dữ liệu quan hệ.\n\n**Cấu trúc truy vấn:**\n```\nSELECT cột FROM bảng WHERE điều_kiện ORDER BY cột;\n```\n\n**Các lệnh quan trọng:**\n- SELECT: Chọn dữ liệu\n- WHERE: Lọc điều kiện\n- ORDER BY: Sắp xếp\n- LIMIT: Giới hạn kết quả\n- GROUP BY: Nhóm dữ liệu\n- HAVING: Lọc sau nhóm",
        theoryEn: "**SQL (Structured Query Language)** is the language for querying relational databases.\n\n**Query structure:**\n```\nSELECT columns FROM table WHERE condition ORDER BY column;\n```\n\n**Key commands:**\n- SELECT: Choose data\n- WHERE: Filter conditions\n- ORDER BY: Sort\n- LIMIT: Limit results\n- GROUP BY: Group data\n- HAVING: Filter after grouping",
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
        ],
      },
      {
        id: "sql-2",
        title: "JOIN và quan hệ giữa các bảng",
        titleEn: "JOINs and Table Relationships",
        theory: "**JOIN** kết nối dữ liệu từ nhiều bảng dựa trên cột chung.\n\n**Các loại JOIN:**\n- INNER JOIN: Chỉ lấy dòng khớp cả 2 bảng\n- LEFT JOIN: Tất cả từ bảng trái + khớp từ phải\n- RIGHT JOIN: Tất cả từ bảng phải + khớp từ trái\n- FULL OUTER JOIN: Tất cả từ cả 2 bảng\n\n**Sơ đồ:** Bảng A ⟷ Bảng B qua khóa ngoại (Foreign Key)",
        theoryEn: "**JOIN** connects data from multiple tables based on a shared column.\n\n**JOIN types:**\n- INNER JOIN: Only matching rows from both tables\n- LEFT JOIN: All from left + matches from right\n- RIGHT JOIN: All from right + matches from left\n- FULL OUTER JOIN: All from both tables\n\n**Diagram:** Table A ⟷ Table B via Foreign Key",
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
          { question: "Linear Regression thuộc loại ML nào?", options: ["Unsupervised", "Reinforcement", "Supervised - Classification", "Supervised - Regression"], answer: 3, explanation: "Linear Regression là Supervised Learning (có nhãn/đáp án) loại Regression (dự đoán giá trị liên tục)." },
          { question: "R² Score = 0.95 có nghĩa gì?", options: ["Mô hình sai 95%", "Mô hình giải thích 95% biến thiên dữ liệu", "Có 95 mẫu dữ liệu", "Tốc độ xử lý 95%"], answer: 1, explanation: "R² = 0.95 nghĩa là mô hình giải thích được 95% sự biến thiên trong dữ liệu - rất tốt!" },
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
print(f"\\n📊 Accuracy: {accuracy:.1%}")`,
        codeLanguage: "python",
        exercise: "Xây dựng mô hình phân loại email spam/không spam dựa trên: số từ, có link không, có từ 'miễn phí' không.",
        exerciseEn: "Build an email spam classifier based on: word count, has link, contains 'free'.",
        quiz: [
          { question: "Overfitting là gì?", options: ["Mô hình quá đơn giản", "Mô hình học thuộc dữ liệu train, dự đoán kém dữ liệu mới", "Mô hình chạy quá chậm", "Thiếu dữ liệu"], answer: 1, explanation: "Overfitting = mô hình quá khớp, 'học thuộc' dữ liệu huấn luyện nhưng không khái quát hóa được cho dữ liệu mới." },
          { question: "train_test_split chia dữ liệu để làm gì?", options: ["Tăng tốc xử lý", "Đánh giá mô hình trên dữ liệu chưa thấy", "Giảm dung lượng", "Mã hóa dữ liệu"], answer: 1, explanation: "Chia train/test giúp đánh giá mô hình trên dữ liệu mới (test) mà nó chưa được học, tránh đánh giá sai lệch." },
        ],
      },
    ],
  },
];

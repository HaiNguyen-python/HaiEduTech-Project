// Detailed lesson bank for the "Cấu trúc dữ liệu & Giải thuật" curriculum.
// Each lesson maps to a section in DsaCurriculum.tsx and includes theory,
// code samples (Python-flavoured pseudo-code), complexity analysis and a quiz.

export type DsaSectionId = "linear" | "nonlinear" | "algos";

export interface DsaQuiz {
  questionVi: string;
  questionEn: string;
  options: string[]; // shared, in English (short)
  answer: number;
  explanationVi: string;
  explanationEn: string;
}

export interface DsaLesson {
  id: string;
  sectionId: DsaSectionId;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  theoryVi: string;
  theoryEn: string;
  code: string;
  codeLanguage: string;
  complexityVi: string;
  complexityEn: string;
  quiz: DsaQuiz;
}

export const dsaLessons: DsaLesson[] = [
  // ====== Linear ======
  {
    id: "arrays",
    sectionId: "linear",
    titleVi: "Bài 1 - Mảng (Arrays)",
    titleEn: "Lesson 1 - Arrays",
    summaryVi: "Truy cập O(1) theo chỉ số, chèn/xóa O(n).",
    summaryEn: "O(1) indexed access, O(n) insert/delete.",
    theoryVi:
      "Hình dung mảng như một dãy tủ khóa được đánh số liên tiếp: muốn lấy đồ ở tủ số 7, bạn đi thẳng đến tủ 7 mà không cần mở các tủ trước - đó chính là truy cập O(1) nhờ phép tính địa chỉ (base + i × kích thước phần tử). Nhược điểm: vì các tủ đứng liền nhau, muốn chèn thêm một tủ ở giữa thì phải đẩy toàn bộ các tủ phía sau lùi một bước (O(n)), xóa cũng tương tự. Mảng động như list trong Python bắt đầu với sức chứa nhỏ, khi đầy sẽ cấp phát mảng mới lớn gấp đôi rồi sao chép - chi phí append trung bình (amortised) chỉ O(1) dù thỉnh thoảng có lần O(n). Bẫy thường gặp: (1) dùng append trong vòng lặp lồng nhau làm phình bộ nhớ, (2) chèn vào đầu list thay vì dùng collections.deque, (3) quên rằng slicing arr[a:b] tạo bản sao O(k).",
    theoryEn:
      "Picture an array as a row of numbered lockers placed side by side: to read locker 7 you walk directly there without opening any others - that is O(1) indexed access, computed as base + i × element-size. The downside: because lockers sit flush against each other, inserting a new one in the middle forces every later locker to shuffle one step back (O(n)); deletion is symmetric. A dynamic array such as Python's list starts small; when full it allocates a new array twice as big and copies - append is amortised O(1) even though occasional resizes cost O(n). Common pitfalls: (1) appending inside nested loops blowing up memory, (2) inserting at the front instead of using collections.deque, (3) forgetting that arr[a:b] copies O(k) elements.",
    code: `# Arrays in Python
nums = [10, 20, 30, 40, 50]

# O(1) access
print(nums[2])      # 30

# O(n) insert in the middle
nums.insert(2, 25)  # [10, 20, 25, 30, 40, 50]

# O(1) amortised append
nums.append(60)

# Two-pointer pattern: reverse in place
i, j = 0, len(nums) - 1
while i < j:
    nums[i], nums[j] = nums[j], nums[i]
    i += 1
    j -= 1`,
    codeLanguage: "python",
    complexityVi: "Truy cập O(1) • Append O(1) trung bình • Insert/Delete giữa O(n).",
    complexityEn: "Access O(1) • Append O(1) amortised • Insert/Delete in middle O(n).",
    quiz: {
      questionVi: "Độ phức tạp của thao tác chèn phần tử vào đầu mảng động?",
      questionEn: "Complexity of inserting an element at the front of a dynamic array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 2,
      explanationVi: "Phải dịch toàn bộ phần tử sang phải nên là O(n).",
      explanationEn: "All later elements must shift right, so O(n).",
    },
  },
  {
    id: "linked-list",
    sectionId: "linear",
    titleVi: "Bài 2 - Danh sách liên kết (Linked List)",
    titleEn: "Lesson 2 - Linked List",
    summaryVi: "Chèn/xóa O(1) nếu có con trỏ, truy cập O(n).",
    summaryEn: "O(1) insert/delete with pointer, O(n) access.",
    theoryVi:
      "Hãy tưởng tượng một trò săn kho báu: mỗi mảnh giấy ghi một con số và một mũi tên chỉ tới chỗ mảnh giấy kế tiếp. Đó chính là linked list - các node nằm rải rác trong bộ nhớ, nối với nhau qua con trỏ next. Vì không cần ô nhớ liên tiếp, việc 'cắm thêm một node' chỉ là viết lại 1-2 mũi tên (O(1)) khi bạn đã đứng ở node liền trước. Cái giá phải trả: muốn lấy node thứ 100 thì phải đi theo mũi tên 100 lần (O(n)) - không có chuyện 'nhảy thẳng' như mảng. Các biến thể quan trọng: singly (một chiều), doubly (có cả prev), circular (đuôi nối lại đầu). Mẫu thuật toán kinh điển là rùa-thỏ (slow/fast pointers) để phát hiện chu trình hoặc tìm node giữa. Bẫy thường gặp: (1) quên cập nhật prev khi xóa node, (2) tạo chu trình ngẫu nhiên khi gán nhầm next, (3) memory leak trong ngôn ngữ không có GC nếu không free đúng cách.",
    theoryEn:
      "Picture a treasure hunt: each slip of paper holds a number plus an arrow pointing to the next slip's location. That is a linked list - nodes scattered across memory, glued together by next pointers. Because no contiguous block is needed, 'plugging in' a new node is just a couple of pointer rewrites (O(1)) once you stand at the previous node. The cost: to reach node 100 you must follow 100 arrows (O(n)) - no random jumping like an array. Important variants: singly (one-way), doubly (with prev too), circular (tail loops to head). The classic trick is the tortoise-and-hare pattern for cycle detection and middle-node finding. Pitfalls: (1) forgetting to update prev on delete, (2) accidentally creating a cycle with a stray next assignment, (3) memory leaks in non-GC languages if nodes are not freed.",
    code: `class Node:
    def __init__(self, val, nxt=None):
        self.val = val
        self.next = nxt

# Build 1 -> 2 -> 3
head = Node(1, Node(2, Node(3)))

# Floyd's cycle detection (tortoise & hare)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    codeLanguage: "python",
    complexityVi: "Truy cập O(n) • Chèn/Xóa O(1) khi đã có con trỏ trước.",
    complexityEn: "Access O(n) • Insert/Delete O(1) given the predecessor pointer.",
    quiz: {
      questionVi: "Kỹ thuật rùa và thỏ dùng để giải bài toán gì?",
      questionEn: "What problem does the tortoise-and-hare technique solve?",
      options: [
        "Sort the list",
        "Detect a cycle",
        "Reverse the list",
        "Merge two lists",
      ],
      answer: 1,
      explanationVi: "Hai con trỏ chạy với tốc độ khác nhau, gặp nhau khi có chu trình.",
      explanationEn: "Two pointers move at different speeds and meet inside any cycle.",
    },
  },
  {
    id: "stack",
    sectionId: "linear",
    titleVi: "Bài 3 - Ngăn xếp (Stack)",
    titleEn: "Lesson 3 - Stack",
    summaryVi: "Nguyên lý LIFO - vào sau, ra trước.",
    summaryEn: "LIFO - last in, first out.",
    theoryVi:
      "Stack giống như chồng đĩa trong nhà bếp: bạn chỉ có thể đặt đĩa mới lên trên cùng (push) và lấy đĩa từ trên cùng xuống (pop) - đĩa đặt sau cùng sẽ được lấy ra trước nhất (LIFO). Cả hai thao tác chỉ chạm vào đỉnh nên đều O(1). Ứng dụng thực tế cực kỳ phong phú: trình duyệt dùng stack cho nút Back, editor dùng stack cho Undo/Redo, compiler dùng stack để kiểm tra ngoặc cân bằng và để tính biểu thức dạng postfix, hệ điều hành dùng call stack để quản lý các lời gọi hàm, DFS lặp dùng stack thay cho đệ quy để tránh tràn stack. Mẫu nâng cao 'monotonic stack' (stack tăng/giảm đơn điệu) giúp giải các bài Next Greater Element, Largest Rectangle in Histogram trong O(n). Bẫy thường gặp: (1) pop khi stack rỗng gây lỗi, luôn kiểm tra trước, (2) nhầm lẫn thứ tự push khi đảo biểu thức.",
    theoryEn:
      "A stack behaves like a pile of plates in a kitchen: you may only place a new plate on top (push) and remove the topmost one (pop) - the last plate added is the first removed (LIFO). Both operations only touch the top, so both are O(1). Real-world uses are everywhere: browsers stack pages for the Back button, editors stack edits for Undo/Redo, compilers use stacks to check balanced brackets and to evaluate postfix expressions, the OS keeps a call stack of function frames, and iterative DFS uses a stack instead of recursion to avoid stack overflow. The advanced 'monotonic stack' pattern (kept strictly increasing or decreasing) solves Next Greater Element and Largest Rectangle in Histogram in O(n). Pitfalls: (1) popping an empty stack - always check first, (2) wrong push order when reversing an expression.",
    code: `# Valid parentheses with a stack
def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

print(is_valid("([]{})"))  # True`,
    codeLanguage: "python",
    complexityVi: "Push/Pop/Peek O(1).",
    complexityEn: "Push/Pop/Peek O(1).",
    quiz: {
      questionVi: "Cấu trúc dữ liệu nào phù hợp để hiện thực undo/redo?",
      questionEn: "Which structure best implements undo/redo?",
      options: ["Queue", "Stack", "Heap", "Hash Map"],
      answer: 1,
      explanationVi: "Hành động gần nhất cần phục hồi đầu tiên - đúng nguyên lý LIFO.",
      explanationEn: "The most recent action must be restored first - perfect LIFO.",
    },
  },
  {
    id: "queue",
    sectionId: "linear",
    titleVi: "Bài 4 - Hàng đợi (Queue)",
    titleEn: "Lesson 4 - Queue",
    summaryVi: "FIFO - vào trước, ra trước. Nền tảng cho BFS.",
    summaryEn: "FIFO - first in, first out. Core of BFS.",
    theoryVi:
      "Queue đúng như cảnh xếp hàng mua trà sữa: ai đến trước được phục vụ trước (FIFO). Enqueue là vào cuối hàng, dequeue là rời khỏi đầu hàng. Nếu dùng list của Python rồi pop(0), bạn sẽ tốn O(n) mỗi lần dịch chuyển - vì vậy luôn chọn collections.deque, vốn được hiện thực bằng doubly linked list các block nên cả hai đầu đều O(1). Queue là nền tảng cho: BFS (duyệt theo tầng để tìm đường ngắn nhất theo số cạnh), hệ điều hành xếp lịch tiến trình, hàng đợi tin nhắn (Kafka, RabbitMQ), bộ đệm in ấn, và mô phỏng. Biến thể quan trọng: deque hai đầu, priority queue (lấy phần tử ưu tiên cao nhất), circular queue tiết kiệm bộ nhớ. Bẫy thường gặp: (1) dùng list.pop(0) khiến BFS chạy O(n²), (2) thêm node trùng vào queue mà quên đánh dấu visited, gây vòng lặp vô hạn.",
    theoryEn:
      "A queue is exactly a coffee-shop line: whoever arrives first is served first (FIFO). Enqueue joins the tail, dequeue leaves from the head. If you use Python's list with pop(0) you pay O(n) for each shift - always reach for collections.deque, implemented as a doubly linked list of blocks so both ends are O(1). Queues underpin BFS (level-by-level traversal that yields shortest paths by edge count), OS process scheduling, message queues (Kafka, RabbitMQ), print spoolers and simulations. Important variants: double-ended deque, priority queue (highest-priority element pops first), and circular queue for fixed-size buffers. Pitfalls: (1) using list.pop(0) turns BFS into O(n²), (2) pushing duplicates without marking visited causes infinite loops.",
    code: `from collections import deque

q = deque()
q.append("A")     # enqueue
q.append("B")
first = q.popleft()  # dequeue -> "A"

# BFS skeleton on a graph
def bfs(graph, start):
    visited = {start}
    q = deque([start])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb)
                q.append(nb)
    return order`,
    codeLanguage: "python",
    complexityVi: "Enqueue/Dequeue O(1) với deque.",
    complexityEn: "Enqueue/Dequeue O(1) with deque.",
    quiz: {
      questionVi: "Thuật toán nào dựa trên Queue?",
      questionEn: "Which algorithm relies on a Queue?",
      options: ["DFS", "Quick Sort", "BFS", "Binary Search"],
      answer: 2,
      explanationVi: "BFS duyệt theo tầng nhờ hàng đợi FIFO.",
      explanationEn: "BFS visits layer by layer using a FIFO queue.",
    },
  },

  // ====== Non-linear ======
  {
    id: "bst",
    sectionId: "nonlinear",
    titleVi: "Bài 5 - Cây tìm kiếm nhị phân (BST)",
    titleEn: "Lesson 5 - Binary Search Tree",
    summaryVi: "Trái nhỏ hơn, phải lớn hơn. Tìm kiếm O(log n) khi cân bằng.",
    summaryEn: "Left < node < right. O(log n) search when balanced.",
    theoryVi:
      "Hình dung BST như cách tìm tên trong cuốn danh bạ: mở giữa, nếu tên cần tìm đứng trước thì lật về nửa trái, ngược lại nửa phải - mỗi bước loại bỏ một nửa số trang. Tương tự, mọi node trong BST có con trái nhỏ hơn và con phải lớn hơn, nên tìm kiếm chỉ đi xuống một nhánh: O(log n) trung bình. Duyệt in-order (trái → gốc → phải) ma thuật ở chỗ luôn trả về dãy tăng dần - đây là cách 'sort miễn phí' nếu dữ liệu đã ở trong BST. Nhược điểm: nếu chèn dữ liệu đã sắp xếp (1, 2, 3, 4...), cây trở thành đường thẳng và thoái hóa về O(n) - đây là lý do AVL Tree, Red-Black Tree (dùng trong std::map, TreeMap) thực hiện xoay (rotate) để giữ độ cao ~log n. Ứng dụng: tự điển đa cấp, chỉ mục cơ sở dữ liệu, autocomplete với prefix. Bẫy: (1) hàm xóa node có 2 con phức tạp - cần thay bằng successor in-order, (2) duplicates cần quy ước rõ (đặt bên trái hay phải).",
    theoryEn:
      "Picture a BST like searching a phone book: open the middle, if the target name comes before, flip to the left half, otherwise the right - each step discards half the pages. Similarly, every BST node keeps smaller values on the left and larger on the right, so search descends a single branch in O(log n) on average. In-order traversal (left → root → right) is magical: it always returns ascending order, effectively giving 'free sorting' once data lives in the tree. The catch: inserting already-sorted data (1, 2, 3, 4…) turns the tree into a straight line and degrades to O(n) - that is why AVL and Red-Black trees (powering std::map, TreeMap) perform rotations to maintain height ≈ log n. Applications: multi-level dictionaries, database indexes, prefix-based autocomplete. Pitfalls: (1) deleting a node with two children is tricky - replace with the in-order successor, (2) duplicates need a clear policy (always left, or always right).",
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def inorder(root, out):
    if not root: return
    inorder(root.left, out)
    out.append(root.val)
    inorder(root.right, out)`,
    codeLanguage: "python",
    complexityVi: "Search/Insert/Delete trung bình O(log n), xấu nhất O(n).",
    complexityEn: "Search/Insert/Delete average O(log n), worst O(n).",
    quiz: {
      questionVi: "Duyệt in-order trên BST cho ra điều gì?",
      questionEn: "What does in-order traversal of a BST produce?",
      options: ["Random order", "Sorted ascending", "Sorted descending", "Level order"],
      answer: 1,
      explanationVi: "In-order: trái → gốc → phải, tạo thành dãy tăng dần.",
      explanationEn: "In-order visits left → root → right, producing ascending order.",
    },
  },
  {
    id: "graphs",
    sectionId: "nonlinear",
    titleVi: "Bài 6 - Đồ thị & BFS/DFS",
    titleEn: "Lesson 6 - Graphs with BFS/DFS",
    summaryVi: "Biểu diễn bằng danh sách kề; BFS tìm đường ngắn nhất theo số cạnh.",
    summaryEn: "Adjacency list representation; BFS finds shortest edge path.",
    theoryVi:
      "Đồ thị mô tả mọi mạng lưới quanh ta: bạn bè trên Facebook (đỉnh = người, cạnh = mối quan hệ), bản đồ Google Maps (đỉnh = giao lộ, cạnh = đoạn đường có khoảng cách), web (đỉnh = trang, cạnh = hyperlink). Phân loại theo hai trục: có hướng / vô hướng, có trọng số / không. Hai cách biểu diễn chính: ma trận kề (V×V, tốn bộ nhớ nhưng kiểm tra cạnh O(1)) và danh sách kề (dict<node, list>, tiết kiệm bộ nhớ - chọn mặc định). BFS (dùng queue) duyệt theo tầng, tìm đường ngắn nhất theo số cạnh trên đồ thị không trọng số - chính là thuật toán phía sau '6 độ phân cách' và bài toán tìm bạn chung. DFS (đệ quy/stack) đi sâu nhất có thể trước khi quay lui, thích hợp cho: phát hiện chu trình, sắp xếp topo, tìm thành phần liên thông, sinh tổ hợp/hoán vị. Bẫy thường gặp: (1) quên đánh dấu visited gây vòng lặp vô hạn, (2) đồ thị vô hướng phải thêm cạnh cả 2 chiều, (3) DFS sâu hơn 1000 node có thể tràn stack trong Python - chuyển sang phiên bản lặp.",
    theoryEn:
      "Graphs describe almost every network around us: Facebook friendships (nodes = people, edges = relationships), Google Maps (nodes = intersections, edges = roads with distance), the web (nodes = pages, edges = hyperlinks). They split along two axes: directed/undirected and weighted/unweighted. Two representations dominate: adjacency matrix (V×V, costly memory but O(1) edge lookup) and adjacency list (dict of node → list, memory-friendly - the default choice). BFS (queue-based) expands layer by layer and yields shortest paths by edge count on unweighted graphs - the engine behind '6 degrees of separation' and mutual-friend suggestions. DFS (recursive or stack-based) dives as deep as possible before backtracking, perfect for cycle detection, topological sort, connected components and generating permutations/combinations. Pitfalls: (1) forgetting to mark visited causes infinite loops, (2) undirected graphs need edges added both ways, (3) DFS deeper than ~1000 nodes can blow Python's stack - switch to iterative.",
    code: `graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}

def dfs(node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited:
            dfs(nb, visited)
    return visited`,
    codeLanguage: "python",
    complexityVi: "BFS/DFS O(V + E) với V đỉnh, E cạnh.",
    complexityEn: "BFS/DFS O(V + E) where V is vertices, E is edges.",
    quiz: {
      questionVi: "Để tìm đường đi ngắn nhất theo số cạnh trên đồ thị không trọng số, nên dùng?",
      questionEn: "Best algorithm for shortest edge path on an unweighted graph?",
      options: ["DFS", "BFS", "Binary Search", "Quick Sort"],
      answer: 1,
      explanationVi: "BFS duyệt theo tầng nên tầng đầu tiên gặp đích là đường ngắn nhất.",
      explanationEn: "BFS expands layer by layer; the first time it reaches the target is the shortest.",
    },
  },

  // ====== Algorithms ======
  {
    id: "binary-search",
    sectionId: "algos",
    titleVi: "Bài 7 - Tìm kiếm Nhị phân (Binary Search)",
    titleEn: "Lesson 7 - Binary Search",
    summaryVi: "Chia đôi không gian tìm kiếm - O(log n).",
    summaryEn: "Halve the search space - O(log n).",
    theoryVi:
      "Bạn đoán số từ 1 đến 100: đoán 50, đối phương nói 'cao hơn' → loại bỏ ngay nửa nhỏ, chỉ còn 51-100; đoán 75 → lại loại nửa, còn 51-74... Sau tối đa ~7 lần (log₂100) là ra đáp án. Đó chính là Binary Search. Điều kiện tiên quyết: dữ liệu phải sắp xếp (hoặc có tính đơn điệu). Công thức an toàn cho mid là left + (right - left) // 2 thay vì (left + right) // 2 để tránh tràn số trong các ngôn ngữ kiểu C++/Java. Hai mẫu phổ biến: (a) tìm chính xác giá trị - dừng khi arr[mid] == target, (b) tìm biên trái/phải (lower_bound, upper_bound) - không return sớm mà thu hẹp dần. Kỹ thuật nâng cao 'binary search on answer' áp dụng khi đáp án có tính đơn điệu: tìm tốc độ ăn chuối tối thiểu (Koko), chia bánh đều cho K học sinh, tìm phòng ăn trong khoảng thời gian... Bẫy: (1) sai điều kiện dừng (<= vs <), (2) cập nhật biên nhầm (mid vs mid±1) gây vòng lặp vô hạn, (3) áp dụng cho mảng chưa sort.",
    theoryEn:
      "You guess a number from 1 to 100: guess 50, told 'higher' → instantly discard the lower half, leaving 51-100; guess 75 → halve again, leaving 51-74… After at most ~7 guesses (log₂100) you have the answer. That is Binary Search. Precondition: the data must be sorted (or monotonic). The safe formula for mid is left + (right - left) // 2 rather than (left + right) // 2 to avoid overflow in C++/Java-style languages. Two common patterns: (a) exact match - stop when arr[mid] == target; (b) lower/upper bound - never return early, just shrink. The advanced 'binary search on the answer' applies whenever the answer space is monotonic: Koko eating bananas, dividing chocolate fairly among K students, scheduling resources… Pitfalls: (1) wrong stop condition (<= vs <), (2) wrong boundary update (mid vs mid±1) causing infinite loops, (3) running it on an unsorted array.",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 7))  # 3`,
    codeLanguage: "python",
    complexityVi: "Thời gian O(log n) • Bộ nhớ O(1).",
    complexityEn: "Time O(log n) • Space O(1).",
    quiz: {
      questionVi: "Điều kiện bắt buộc để áp dụng Binary Search?",
      questionEn: "Required precondition for Binary Search?",
      options: ["Array is empty", "Array is sorted", "Array has duplicates", "Array is small"],
      answer: 1,
      explanationVi: "Phải sắp xếp để có thể loại bỏ một nửa mỗi bước.",
      explanationEn: "Must be sorted so that half can be discarded each step.",
    },
  },
  {
    id: "sorting",
    sectionId: "algos",
    titleVi: "Bài 8 - Sắp xếp: Merge Sort & Quick Sort",
    titleEn: "Lesson 8 - Sorting: Merge Sort & Quick Sort",
    summaryVi: "Chia để trị - O(n log n) trung bình.",
    summaryEn: "Divide and conquer - O(n log n) average.",
    theoryVi:
      "Merge Sort vận hành theo triết lý 'chia để trị': cứ chia đôi mảng cho đến khi mỗi phần chỉ còn 1 phần tử (đã sắp xếp một cách tầm thường), rồi trộn (merge) hai mảng đã sắp xếp lại thành một mảng lớn hơn - bước trộn chạy O(n) và có log n tầng nên tổng cộng O(n log n) trong mọi trường hợp. Ưu điểm: ổn định (giữ thứ tự tương đối của các phần tử bằng nhau, quan trọng khi sort nhiều khóa), hiệu năng dự đoán được, dễ song song hóa. Nhược điểm: tốn O(n) bộ nhớ phụ. Quick Sort khác hẳn: chọn một pivot, đẩy các phần tử nhỏ hơn pivot sang trái, lớn hơn sang phải (partition), rồi đệ quy hai nửa. Trung bình O(n log n) và thường nhanh hơn Merge Sort trong thực tế nhờ cache-friendly và sort tại chỗ, nhưng nếu pivot luôn là min/max (ví dụ mảng đã sắp xếp + chọn pivot là phần tử đầu) thì thoái hóa O(n²). Mẹo: chọn pivot ngẫu nhiên hoặc median-of-three. Bubble/Insertion/Selection O(n²) chỉ dùng để dạy hoặc trên mảng rất nhỏ (Insertion nhanh trên mảng gần sắp xếp). Python dùng Timsort (lai Merge + Insertion) cho hàm sorted/.sort.",
    theoryEn:
      "Merge Sort embraces divide-and-conquer: split the array in half repeatedly until each piece holds a single element (trivially sorted), then merge two sorted arrays into a bigger sorted one - the merge step is O(n) across log n levels, giving O(n log n) in every case. Pros: stable (preserves relative order of equal keys, vital for multi-key sorts), predictable performance, easy to parallelise. Con: O(n) auxiliary memory. Quick Sort is different: pick a pivot, partition so smaller elements move left and larger move right, then recurse. Average O(n log n) and often faster than Merge Sort in practice thanks to cache locality and in-place sorting, but if the pivot is always min/max (e.g. already-sorted input with first-element pivot) it collapses to O(n²). Tip: pick a random or median-of-three pivot. Bubble/Insertion/Selection are O(n²) and mostly pedagogical (Insertion is fast on nearly-sorted data). Python's sorted/.sort uses Timsort, a Merge + Insertion hybrid.",
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out`,
    codeLanguage: "python",
    complexityVi: "Merge Sort O(n log n) ổn định • Quick Sort trung bình O(n log n), xấu nhất O(n²).",
    complexityEn: "Merge Sort O(n log n) stable • Quick Sort average O(n log n), worst O(n²).",
    quiz: {
      questionVi: "Trường hợp xấu nhất của Quick Sort?",
      questionEn: "Worst-case complexity of Quick Sort?",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
      answer: 3,
      explanationVi: "Khi pivot luôn là phần tử nhỏ nhất/lớn nhất, chia mất cân bằng.",
      explanationEn: "When the pivot is always min/max, partitions are extremely unbalanced.",
    },
  },
  {
    id: "recursion-bigo",
    sectionId: "algos",
    titleVi: "Bài 9 - Đệ quy & Big O",
    titleEn: "Lesson 9 - Recursion & Big O",
    summaryVi: "Tư duy chia nhỏ bài toán và ước lượng độ phức tạp.",
    summaryEn: "Break problems down and estimate complexity.",
    theoryVi:
      "Đệ quy là khi một hàm tự gọi chính nó với đầu vào nhỏ hơn - giống như câu chuyện Nga búp bê matryoshka: mở con búp bê lớn thấy con nhỏ, mở tiếp lại thấy con nhỏ hơn... cho đến khi gặp con bé nhất không mở được nữa. Hai thành phần bắt buộc: (1) base case - điều kiện dừng (con búp bê nhỏ nhất), nếu thiếu sẽ tràn stack vô hạn; (2) recursive step - quy bài toán về phiên bản nhỏ hơn. Đệ quy giúp code ngắn gọn, tự nhiên với cấu trúc đệ quy (cây, đồ thị, backtracking, chia để trị), nhưng tốn bộ nhớ stack O(độ sâu đệ quy) và có thể chậm nếu lặp lại subproblem (Fibonacci ngây thơ O(2^n) - dùng memoisation hạ về O(n)). Big O mô tả tốc độ tăng của thời gian/bộ nhớ theo kích thước đầu vào n khi n → ∞ - chú ý nó bỏ qua hằng số và số hạng bậc thấp. Thứ tự tăng: O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!). Quy tắc thực hành: lặp đơn = O(n), lặp lồng nhau = O(n²), chia đôi mỗi bước = O(log n), backtracking sinh mọi tổ hợp ≈ O(2^n) hoặc O(n!). Bẫy: (1) quên base case, (2) đệ quy không tiến gần base case, (3) tính nhầm Big O của list operations (in trên list là O(n)).",
    theoryEn:
      "Recursion is when a function calls itself with a smaller input - like Russian matryoshka dolls: open the big one to find a smaller one, open again, smaller still… until you hit the tiniest doll that cannot be opened. Two parts are mandatory: (1) base case - the stopping condition (smallest doll); without it the stack overflows; (2) recursive step - reduce the problem to a smaller instance. Recursion shines on recursive structures (trees, graphs, backtracking, divide-and-conquer) and produces concise code, but it uses O(recursion-depth) stack memory and can be slow if subproblems repeat (naive Fibonacci is O(2^n) - memoisation drops it to O(n)). Big O describes how time/space grow with input size n as n → ∞ - it ignores constants and lower-order terms. Ordering: O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!). Rules of thumb: single loop = O(n), nested loops = O(n²), halving each step = O(log n), backtracking that enumerates all combinations ≈ O(2^n) or O(n!). Pitfalls: (1) missing base case, (2) recursion that does not approach the base case, (3) mis-estimating list operations (in on a list is O(n)).",
    code: `# Factorial with recursion -> O(n) time, O(n) stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Fibonacci with memoisation -> O(n) instead of O(2^n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,
    codeLanguage: "python",
    complexityVi: "Fibonacci ngây thơ O(2^n) • Có memoisation O(n).",
    complexityEn: "Naive Fibonacci O(2^n) • Memoised O(n).",
    quiz: {
      questionVi: "Sắp xếp các bậc Big O từ nhanh đến chậm:",
      questionEn: "Order Big O tiers from fastest to slowest:",
      options: [
        "O(n) < O(log n) < O(1)",
        "O(1) < O(log n) < O(n) < O(n log n) < O(n²)",
        "O(n²) < O(n) < O(log n)",
        "O(2^n) < O(n) < O(1)",
      ],
      answer: 1,
      explanationVi: "Hằng số nhanh nhất, mũ chậm nhất khi n lớn.",
      explanationEn: "Constant is fastest, exponential is slowest as n grows.",
    },
  },

  // ====== Extended lessons ======
  {
    id: "hashmap",
    sectionId: "linear",
    titleVi: "Bài 10 - Bảng băm (Hash Map)",
    titleEn: "Lesson 10 - Hash Map",
    summaryVi: "Tra cứu khóa-giá trị trung bình O(1).",
    summaryEn: "Average O(1) key-value lookup.",
    theoryVi:
      "Hash Map giống tủ gửi đồ tự động: bạn đưa biên lai (key), máy tính ra ngay ô tủ chứa đồ (value) trong tích tắc. 'Máy tính ô tủ' chính là hàm băm (hash function) biến key thành chỉ số mảng. Nhờ vậy get/set/delete trung bình chỉ O(1) - nhanh đến mức Hash Map gần như có mặt trong mọi hệ thống thực tế: cache, database index, từ điển, đếm tần suất, group by, deduplication, JOIN trong SQL. Khi hai key khác nhau cùng băm về một ô - gọi là va chạm (collision) - có hai cách giải: chaining (lưu thành linked list trong ô) hoặc open addressing (đi tìm ô trống kế tiếp). Trong Python, dict và set dùng open addressing với probe ngẫu nhiên hóa. Bẫy thường gặp: (1) dùng key có thể thay đổi (mutable) như list - Python sẽ ném TypeError vì cần hashable, (2) hàm băm xấu hoặc input độc hại (hash flooding) đẩy chi phí lên O(n), (3) duyệt dict trong khi thêm/xóa key gây RuntimeError, (4) nhớ rằng dict trong Python ≥3.7 giữ thứ tự chèn nhưng set thì không. Mẹo: Counter, defaultdict(list/int) tăng tốc code rõ rệt cho các bài đếm và nhóm.",
    theoryEn:
      "A hash map is like an automated luggage locker: you hand over a ticket (key) and the machine instantly tells you which compartment (value) holds your bag. That 'compartment calculator' is the hash function, mapping a key to an array index. As a result get/set/delete are O(1) on average - so fast that hash maps appear everywhere in real systems: caches, database indexes, dictionaries, frequency counts, group-by, deduplication, SQL JOINs. When two distinct keys hash to the same slot - a collision - two strategies handle it: chaining (store a linked list in that slot) or open addressing (probe for the next free slot). Python's dict and set use open addressing with randomised probing. Pitfalls: (1) using a mutable object like a list as a key - Python raises TypeError because keys must be hashable, (2) bad hash functions or adversarial input (hash flooding) collapse to O(n), (3) mutating a dict while iterating raises RuntimeError, (4) since Python 3.7 dict preserves insertion order, but set does not. Tip: Counter and defaultdict(list/int) make counting and grouping code dramatically cleaner.",
    code: `# Count word frequency
from collections import Counter
words = "to be or not to be".split()
print(Counter(words))   # {'to': 2, 'be': 2, 'or': 1, 'not': 1}

# Two Sum in O(n) using a hash map
def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
    codeLanguage: "python",
    complexityVi: "Get/Set/Delete trung bình O(1) • Xấu nhất O(n).",
    complexityEn: "Get/Set/Delete average O(1) • Worst case O(n).",
    quiz: {
      questionVi: "Two Sum trên mảng chưa sắp xếp đạt O(n) nhờ cấu trúc nào?",
      questionEn: "Two Sum on an unsorted array reaches O(n) using which structure?",
      options: ["Stack", "Queue", "Hash Map", "Linked List"],
      answer: 2,
      explanationVi: "Hash Map cho phép tra cứu phần bù trong O(1) trung bình.",
      explanationEn: "A hash map looks up the complement in O(1) on average.",
    },
  },
  {
    id: "heap",
    sectionId: "nonlinear",
    titleVi: "Bài 11 - Heap & Hàng đợi ưu tiên",
    titleEn: "Lesson 11 - Heap & Priority Queue",
    summaryVi: "Lấy phần tử nhỏ nhất/lớn nhất trong O(log n).",
    summaryEn: "Pop min/max in O(log n).",
    theoryVi:
      "Heap giống một phòng cấp cứu được tổ chức theo độ ưu tiên: bệnh nhân nặng nhất luôn ở trên cùng, ai cũng vào (push) hoặc lấy ra (pop) đều phải qua sắp xếp lại nhưng rất nhanh - O(log n). Min-heap: cha luôn ≤ con, gốc là phần tử nhỏ nhất. Max-heap thì ngược lại. Heap thường được lưu trong mảng (vì là cây nhị phân gần hoàn chỉnh): cha tại i, con trái 2i+1, con phải 2i+2 - không cần con trỏ. Sau khi push, ta 'sift up' đẩy phần tử mới lên cho đến đúng vị trí; sau khi pop, ta đặt phần tử cuối lên gốc rồi 'sift down'. heapify cả mảng trong O(n) bằng cách sift down từ giữa về đầu. Ứng dụng thực tế: Dijkstra (đường đi ngắn nhất), Prim (cây khung nhỏ nhất), scheduling theo ưu tiên (OS, K8s), Huffman coding, top-K (giữ min-heap kích thước K, đẩy ra phần tử nhỏ nhất khi có phần tử lớn hơn), tìm trung vị streaming (kết hợp một min-heap + một max-heap). Python: heapq là min-heap; muốn max-heap thì lưu giá trị âm. Bẫy: (1) heap không cho phép tìm/cập nhật phần tử bất kỳ trong O(log n) - phải dùng indexed-heap hoặc lazy deletion, (2) duyệt heap không cho thứ tự tăng, phải pop liên tục.",
    theoryEn:
      "A heap is like a triage room organised by urgency: the most critical patient is always at the front, and every push/pop reshuffles the priority order - but quickly, in O(log n). Min-heap: parent ≤ children, root is the smallest. Max-heap is the mirror. Heaps are usually stored as arrays (they are nearly complete binary trees): parent at i, left child 2i+1, right child 2i+2 - no pointers needed. After a push we 'sift up' the new element to its correct spot; after a pop we place the last element at the root and 'sift down'. Heapify builds the heap in O(n) by sifting down from the middle to the front. Real-world uses: Dijkstra (shortest path), Prim (minimum spanning tree), priority scheduling (OS, Kubernetes), Huffman coding, top-K (keep a size-K min-heap and evict the smallest when something larger arrives), streaming median (combine one min-heap and one max-heap). Python: heapq is a min-heap; for a max-heap, push negative values. Pitfalls: (1) heaps cannot find or update an arbitrary element in O(log n) - use an indexed heap or lazy deletion, (2) iterating a heap does NOT yield sorted order - you must pop repeatedly.",
    code: `import heapq

nums = [5, 1, 4, 2, 3]
heapq.heapify(nums)        # O(n)
print(heapq.heappop(nums)) # 1 (smallest)

# Top K largest
def top_k(arr, k):
    return heapq.nlargest(k, arr)

print(top_k([10, 4, 7, 9, 2, 6], 3))  # [10, 9, 7]`,
    codeLanguage: "python",
    complexityVi: "Push/Pop O(log n) • Heapify O(n).",
    complexityEn: "Push/Pop O(log n) • Heapify O(n).",
    quiz: {
      questionVi: "Để duy trì K phần tử lớn nhất trong luồng số, nên dùng heap loại nào?",
      questionEn: "To keep K largest values from a stream, which heap fits best?",
      options: ["Min-heap size K", "Max-heap size N", "Stack", "Queue"],
      answer: 0,
      explanationVi: "Min-heap kích thước K cho phép loại bỏ phần tử nhỏ nhất khi có số lớn hơn.",
      explanationEn: "A size-K min-heap evicts the smallest whenever a larger value arrives.",
    },
  },
  {
    id: "two-pointers",
    sectionId: "algos",
    titleVi: "Bài 12 - Kỹ thuật Hai con trỏ",
    titleEn: "Lesson 12 - Two Pointers Technique",
    summaryVi: "Giảm O(n²) xuống O(n) trên dãy đã sắp xếp.",
    summaryEn: "Reduce O(n²) to O(n) on sorted sequences.",
    theoryVi:
      "Hai con trỏ là một mẹo tiết kiệm vòng lặp: thay vì hai vòng for lồng nhau O(n²) để xét mọi cặp, ta dùng hai chỉ số i, j di chuyển thông minh, giảm tổng số bước về O(n). Có ba biến thể chính: (1) ngược chiều - i từ đầu, j từ cuối, tiến lại gần nhau, hay dùng trên mảng đã sắp xếp để tìm cặp tổng = target, kiểm tra palindrome, container with most water; (2) cùng chiều - i, j cùng đi từ đầu nhưng tốc độ khác nhau, dùng để loại trùng tại chỗ (remove duplicates), tách số chẵn lẻ, partition; (3) nhanh-chậm trên linked list - phát hiện chu trình, tìm node giữa. Lợi thế của hai con trỏ là bộ nhớ O(1) (không cần dữ liệu phụ) và rất cache-friendly. Điều kiện áp dụng quan trọng: dữ liệu phải có tính đơn điệu hoặc đã sắp xếp để bạn biết nên di chuyển con trỏ nào. Bẫy: (1) quên kiểm tra i < j khi cập nhật, gây vượt biên, (2) cố áp dụng trên mảng chưa sort - nên sort trước hoặc đổi sang hash map, (3) di chuyển sai con trỏ làm bỏ sót đáp án.",
    theoryEn:
      "Two pointers is a loop-saving trick: instead of nested O(n²) loops to inspect every pair, you walk two indices i, j cleverly and bring the total work down to O(n). Three flavours: (1) opposite-direction - i from the start, j from the end, closing in, classic for sorted-array pair sum, palindrome checks, container-with-most-water; (2) same-direction - both start at the front but move at different speeds, great for in-place dedupe, splitting odds/evens, partitions; (3) fast-slow on linked lists - cycle detection, middle-node finding. The pattern uses O(1) memory (no auxiliary structure) and is highly cache-friendly. Key precondition: the data must be sorted or otherwise monotonic so you know which pointer to advance. Pitfalls: (1) forgetting i < j when updating leads to out-of-bounds, (2) trying the pattern on unsorted data - sort first or switch to a hash map, (3) moving the wrong pointer and skipping valid answers.",
    code: `# Pair sum on sorted array
def pair_sum(arr, target):
    i, j = 0, len(arr) - 1
    while i < j:
        s = arr[i] + arr[j]
        if s == target:
            return (i, j)
        if s < target:
            i += 1
        else:
            j -= 1
    return None

print(pair_sum([1, 2, 4, 7, 11, 15], 15))  # (3, 4)`,
    codeLanguage: "python",
    complexityVi: "Thời gian O(n) • Bộ nhớ O(1).",
    complexityEn: "Time O(n) • Space O(1).",
    quiz: {
      questionVi: "Điều kiện thường gặp để áp dụng hiệu quả kỹ thuật hai con trỏ ngược chiều?",
      questionEn: "Common precondition for opposite-direction two pointers?",
      options: ["Unsorted array", "Sorted array", "Empty array", "Cyclic linked list"],
      answer: 1,
      explanationVi: "Sắp xếp giúp quyết định di chuyển trái/phải nhờ so sánh với target.",
      explanationEn: "Sorting lets you decide which pointer to move by comparing against the target.",
    },
  },
  {
    id: "sliding-window",
    sectionId: "algos",
    titleVi: "Bài 13 - Cửa sổ trượt (Sliding Window)",
    titleEn: "Lesson 13 - Sliding Window",
    summaryVi: "Tối ưu các bài toán dãy con liên tiếp.",
    summaryEn: "Optimise contiguous subarray problems.",
    theoryVi:
      "Sliding window là phiên bản đặc biệt của hai con trỏ dành riêng cho các bài về dãy con liên tiếp (subarray/substring). Hãy hình dung một khung kính trượt trên dòng số: thay vì mỗi lần tính lại tổng/đếm/đặc trưng của khung từ đầu (O(K) mỗi bước → O(n·K)), bạn chỉ cộng phần tử vừa vào bên phải và trừ phần tử vừa rời bên trái (O(1) mỗi bước → tổng O(n)). Hai biến thể chính: (a) cửa sổ kích thước cố định K - phù hợp với 'tổng/giá trị max của K phần tử liên tiếp', 'trung bình trượt'; (b) cửa sổ co giãn - mở rộng right cho đến khi điều kiện bị vi phạm, rồi co left lại, dùng cho 'dãy con dài nhất không trùng ký tự', 'dãy con ngắn nhất có tổng ≥ S', 'permutation trong chuỗi'. Cấu trúc dữ liệu hỗ trợ trong cửa sổ thường là Counter/dict (đếm tần suất), deque (max/min trong cửa sổ), set. Bẫy: (1) cập nhật trạng thái không đối xứng khi mở rộng/thu hẹp gây sai kết quả, (2) quên cập nhật answer sau mỗi bước mở rộng, (3) cố ép sliding window vào bài không liên tiếp - nên dùng DP hoặc hai con trỏ ngược chiều thay thế.",
    theoryEn:
      "Sliding window is a specialised two-pointer pattern for contiguous subarray/substring problems. Picture a glass frame sliding along a number line: instead of recomputing the frame's sum/count/feature from scratch each step (O(K) per step → O(n·K)), you simply add the element entering on the right and subtract the one leaving on the left (O(1) per step → O(n) total). Two flavours: (a) fixed-size K - ideal for 'max sum of K contiguous elements' or 'moving average'; (b) variable-size - expand right until the condition breaks, then shrink left, used for 'longest substring without repeats', 'shortest subarray with sum ≥ S', 'permutation in string'. Helper structures inside the window are typically Counter/dict (frequency), deque (window max/min), or set. Pitfalls: (1) asymmetric state updates when expanding vs shrinking yield wrong results, (2) forgetting to update the answer after each expansion, (3) forcing sliding window onto a non-contiguous problem - use DP or opposite-direction two pointers instead.",
    code: `# Longest substring without repeating characters
def length_of_longest(s):
    seen = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        best = max(best, right - left + 1)
    return best

print(length_of_longest("abcabcbb"))  # 3`,
    codeLanguage: "python",
    complexityVi: "Thời gian O(n) • Bộ nhớ O(min(n, charset)).",
    complexityEn: "Time O(n) • Space O(min(n, charset)).",
    quiz: {
      questionVi: "Cửa sổ trượt thường phù hợp với bài toán nào?",
      questionEn: "Sliding window suits which problem type?",
      options: [
        "Find any node in a tree",
        "Contiguous subarray satisfying a condition",
        "Sort a linked list",
        "Detect a graph cycle",
      ],
      answer: 1,
      explanationVi: "Khai thác tính liên tiếp để cập nhật cửa sổ từng bước.",
      explanationEn: "It exploits contiguity to update the window incrementally.",
    },
  },
  {
    id: "dp",
    sectionId: "algos",
    titleVi: "Bài 14 - Quy hoạch động (Dynamic Programming)",
    titleEn: "Lesson 14 - Dynamic Programming",
    summaryVi: "Chia nhỏ + ghi nhớ kết quả để tránh tính lại.",
    summaryEn: "Decompose + memoise to avoid recomputation.",
    theoryVi:
      "Quy hoạch động (Dynamic Programming) thực ra chỉ là 'đệ quy + nhớ kết quả'. Khi cùng một bài toán con bị giải đi giải lại nhiều lần (overlapping subproblems) và lời giải tối ưu của bài lớn dựng từ lời giải tối ưu của bài nhỏ (optimal substructure), thì việc cache lại kết quả sẽ biến độ phức tạp từ mũ về đa thức. Ví dụ Fibonacci ngây thơ gọi fib(5) sẽ tính fib(2) tới 3 lần và fib(3) 2 lần - bộ nhớ hóa sẽ chỉ tính mỗi giá trị đúng một lần, từ O(2^n) về O(n). Có hai phong cách hiện thực: (1) top-down - viết hàm đệ quy tự nhiên rồi thêm @lru_cache hoặc dict memo; (2) bottom-up - định nghĩa bảng dp, điền từ trường hợp nhỏ nhất tới lớn nhất bằng vòng lặp, thường dễ tối ưu bộ nhớ về O(1) khi mỗi trạng thái chỉ phụ thuộc vài trạng thái gần nó (như leo cầu thang chỉ cần 2 biến thay vì cả mảng). Quy trình 5 bước thiết kế DP: xác định trạng thái → công thức truy hồi → trường hợp cơ sở → thứ tự duyệt → tối ưu bộ nhớ. Bài kinh điển: leo cầu thang, đổi tiền (coin change), ba lô 0/1, dãy con tăng dài nhất (LIS), chỉnh sửa chuỗi (edit distance), khoảng cách Levenshtein, DP trên cây/đồ thị, DP bitmask. Bẫy: (1) xác định sai trạng thái khiến không thể truy hồi, (2) bỏ sót base case, (3) lo lắng về thứ tự duyệt khi bảng nhiều chiều.",
    theoryEn:
      "Dynamic Programming is really just 'recursion plus memory'. Whenever the same subproblem is solved many times (overlapping subproblems) and the optimal answer is built from the optimal answers of smaller pieces (optimal substructure), caching results turns exponential time into polynomial time. Naive fib(5), for instance, recomputes fib(2) three times and fib(3) twice - memoisation collapses O(2^n) down to O(n). Two implementation styles: (1) top-down - keep the natural recursion and decorate it with @lru_cache or a dict memo; (2) bottom-up - define a dp table and fill it iteratively from the base case upward; this is often easy to optimise to O(1) memory when each state depends on only a few neighbours (climbing stairs needs two scalars, not a full array). A 5-step DP design recipe: define the state → write the recurrence → set base cases → choose iteration order → optimise memory. Classic problems: climbing stairs, coin change, 0/1 knapsack, longest increasing subsequence (LIS), edit distance, tree/graph DP, bitmask DP. Pitfalls: (1) picking the wrong state so no recurrence exists, (2) missing base cases, (3) wrong iteration order on multi-dimensional tables.",
    code: `# Climbing stairs: dp[i] = dp[i-1] + dp[i-2]
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

print(climb_stairs(5))  # 8`,
    codeLanguage: "python",
    complexityVi: "Climbing stairs: O(n) thời gian, O(1) bộ nhớ.",
    complexityEn: "Climbing stairs: O(n) time, O(1) space.",
    quiz: {
      questionVi: "Đặc điểm bắt buộc để áp dụng DP là gì?",
      questionEn: "Required property to apply DP?",
      options: [
        "Sorted array",
        "Optimal substructure + overlapping subproblems",
        "Very large input",
        "Random input",
      ],
      answer: 1,
      explanationVi: "Hai tính chất này cho phép tái sử dụng kết quả con.",
      explanationEn: "Both properties let you reuse subproblem results.",
    },
  },
  {
    id: "greedy",
    sectionId: "algos",
    titleVi: "Bài 15 - Tham lam (Greedy)",
    titleEn: "Lesson 15 - Greedy Algorithms",
    summaryVi: "Chọn lựa tối ưu cục bộ hướng đến tối ưu toàn cục.",
    summaryEn: "Locally optimal choices aiming for a global optimum.",
    theoryVi:
      "Tham lam (Greedy) là chiến lược 'ngắn hạn nhưng đúng đắn': tại mỗi bước, chọn ngay lựa chọn trông tốt nhất hiện tại với hy vọng tổng thể cũng tối ưu. Nó nhanh, dễ cài, ít bộ nhớ, nhưng KHÔNG phải bài nào cũng dùng được - bạn phải chứng minh 'tính chất lựa chọn tham lam' (greedy choice property): lựa chọn tối ưu địa phương dẫn tới tối ưu toàn cục. Ví dụ kinh điển hoạt động đúng: (1) activity selection - sắp xếp các cuộc họp theo thời gian kết thúc, luôn chọn cuộc kết thúc sớm nhất còn lại; (2) đổi tiền với hệ mệnh giá 'canonical' (như Việt Nam 1, 2, 5, 10, 20, 50, 100...) - luôn lấy mệnh giá lớn nhất ≤ số còn lại; (3) Huffman coding - gộp hai tần suất nhỏ nhất; (4) Kruskal, Prim - xây cây khung nhỏ nhất bằng cách thêm cạnh nhẹ nhất; (5) Dijkstra với trọng số không âm. Ví dụ KHÔNG đúng nếu tham lam: đổi tiền với mệnh giá {1, 3, 4} cho số 6 (tham lam ra 4+1+1=3 đồng, tối ưu là 3+3=2 đồng) - phải dùng DP. Quy trình kiểm tra: thử bằng ví dụ phản ví dụ; nếu không tìm ra, cố chứng minh bằng exchange argument hoặc induction. Bẫy lớn nhất: ngộ nhận tham lam đúng mà không kiểm tra - luôn thử ít nhất 3 input đa dạng trước khi tin.",
    theoryEn:
      "Greedy algorithms follow a 'short-sighted but correct' strategy: at every step pick the choice that looks best right now and hope the overall result is optimal. Greedy is fast, easy to implement and memory-light, but it does NOT work on every problem - you must verify the 'greedy choice property': a locally optimal choice leads to a globally optimal solution. Classic problems where greedy is correct: (1) activity selection - sort meetings by end time and always pick the earliest-ending compatible one; (2) coin change with a canonical denomination set (1, 2, 5, 10, 20, 50, 100…) - always take the largest coin ≤ remaining amount; (3) Huffman coding - merge the two smallest frequencies; (4) Kruskal and Prim - minimum spanning tree by repeatedly taking the lightest edge; (5) Dijkstra with non-negative weights. Where greedy FAILS: coin change with {1, 3, 4} for amount 6 (greedy gives 4+1+1 = 3 coins, the optimum is 3+3 = 2) - you need DP. Validation routine: hunt for counter-examples; if none surface, try to prove correctness via an exchange argument or induction. The biggest pitfall: assuming greedy works without verifying - always sanity-check with at least three diverse inputs before trusting it.",
    code: `# Activity selection: pick the most non-overlapping meetings
def activity_selection(intervals):
    intervals.sort(key=lambda x: x[1])  # by end time
    chosen, last_end = [], -float('inf')
    for start, end in intervals:
        if start >= last_end:
            chosen.append((start, end))
            last_end = end
    return chosen

print(activity_selection([(1, 4), (3, 5), (0, 6), (5, 7), (8, 9)]))`,
    codeLanguage: "python",
    complexityVi: "Sắp xếp O(n log n) + duyệt O(n).",
    complexityEn: "Sort O(n log n) + scan O(n).",
    quiz: {
      questionVi: "Tham lam luôn cho đáp án tối ưu, đúng hay sai?",
      questionEn: "Greedy always returns the optimum - true or false?",
      options: ["True", "False"],
      answer: 1,
      explanationVi: "Chỉ đúng khi bài toán có tính chất tham lam; cần chứng minh.",
      explanationEn: "Only when the problem has the greedy-choice property; must be proven.",
    },
  },
];

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
    titleVi: "Bài 1 — Mảng (Arrays)",
    titleEn: "Lesson 1 — Arrays",
    summaryVi: "Truy cập O(1) theo chỉ số, chèn/xóa O(n).",
    summaryEn: "O(1) indexed access, O(n) insert/delete.",
    theoryVi:
      "Mảng là vùng nhớ liên tiếp lưu các phần tử cùng kiểu. Truy cập theo chỉ số rất nhanh (O(1)) nhờ phép tính địa chỉ. Tuy nhiên, chèn hoặc xóa giữa mảng cần dịch chuyển các phần tử phía sau nên có chi phí O(n). Mảng động (dynamic array) như list trong Python tự nhân đôi sức chứa khi đầy, cho chi phí append O(1) trung bình.",
    theoryEn:
      "An array is a contiguous block of memory storing same-typed elements. Indexed access is O(1) thanks to address arithmetic. Inserting or deleting in the middle requires shifting later elements, costing O(n). A dynamic array (e.g. Python list) doubles its capacity when full, giving amortised O(1) append.",
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
    titleVi: "Bài 2 — Danh sách liên kết (Linked List)",
    titleEn: "Lesson 2 — Linked List",
    summaryVi: "Chèn/xóa O(1) nếu có con trỏ, truy cập O(n).",
    summaryEn: "O(1) insert/delete with pointer, O(n) access.",
    theoryVi:
      "Mỗi node lưu giá trị và con trỏ tới node kế tiếp. Không cần bộ nhớ liên tiếp, dễ chèn/xóa nếu đã có con trỏ tới node trước. Nhược điểm là không truy cập ngẫu nhiên — phải duyệt từ đầu. Biến thể: doubly linked list (hai chiều), circular list, và pattern hai con trỏ (chậm/nhanh) để phát hiện chu trình.",
    theoryEn:
      "Each node holds a value plus a pointer to the next node. No contiguous memory required, so insert/delete is O(1) when you already hold a pointer to the predecessor. Trade-off: no random access — you must traverse from the head. Variants include doubly and circular linked lists, plus the slow/fast pointer pattern for cycle detection.",
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
    titleVi: "Bài 3 — Ngăn xếp (Stack)",
    titleEn: "Lesson 3 — Stack",
    summaryVi: "Nguyên lý LIFO — vào sau, ra trước.",
    summaryEn: "LIFO — last in, first out.",
    theoryVi:
      "Stack hoạt động theo nguyên lý vào-sau-ra-trước. Hai thao tác chính là push và pop, đều có chi phí O(1). Stack được dùng cho duyệt biểu thức (kiểm tra ngoặc), undo/redo, lưu trạng thái đệ quy, và duyệt DFS lặp.",
    theoryEn:
      "A stack follows the last-in-first-out principle. Push and pop are both O(1). Stacks power parenthesis checking, undo/redo, recursion call frames, and iterative DFS.",
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
      explanationVi: "Hành động gần nhất cần phục hồi đầu tiên — đúng nguyên lý LIFO.",
      explanationEn: "The most recent action must be restored first — perfect LIFO.",
    },
  },
  {
    id: "queue",
    sectionId: "linear",
    titleVi: "Bài 4 — Hàng đợi (Queue)",
    titleEn: "Lesson 4 — Queue",
    summaryVi: "FIFO — vào trước, ra trước. Nền tảng cho BFS.",
    summaryEn: "FIFO — first in, first out. Core of BFS.",
    theoryVi:
      "Queue tuân theo nguyên lý vào-trước-ra-trước. Trong Python, dùng collections.deque để có enqueue/dequeue O(1) ở cả hai đầu. Queue là xương sống của BFS, mô phỏng tiến trình, và scheduling.",
    theoryEn:
      "A queue follows first-in-first-out. In Python, collections.deque gives O(1) push/pop at both ends. Queues power BFS traversal, process simulation, and scheduling.",
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
    titleVi: "Bài 5 — Cây tìm kiếm nhị phân (BST)",
    titleEn: "Lesson 5 — Binary Search Tree",
    summaryVi: "Trái nhỏ hơn, phải lớn hơn. Tìm kiếm O(log n) khi cân bằng.",
    summaryEn: "Left < node < right. O(log n) search when balanced.",
    theoryVi:
      "BST là cây nhị phân mà mọi node có con trái nhỏ hơn và con phải lớn hơn. Duyệt in-order cho dãy tăng dần. Tìm kiếm, chèn, xóa có chi phí trung bình O(log n) nhưng O(n) trong trường hợp xấu (cây suy biến). Các biến thể cân bằng như AVL hay Red-Black đảm bảo O(log n) ổn định.",
    theoryEn:
      "In a BST each node has all left descendants smaller and all right descendants greater. In-order traversal yields sorted values. Search/insert/delete average O(log n) but degrade to O(n) for skewed trees. Self-balancing variants (AVL, Red-Black) guarantee O(log n).",
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
    titleVi: "Bài 6 — Đồ thị & BFS/DFS",
    titleEn: "Lesson 6 — Graphs with BFS/DFS",
    summaryVi: "Biểu diễn bằng danh sách kề; BFS tìm đường ngắn nhất theo số cạnh.",
    summaryEn: "Adjacency list representation; BFS finds shortest edge path.",
    theoryVi:
      "Đồ thị gồm đỉnh và cạnh, có thể có hướng hoặc vô hướng, có trọng số hoặc không. Cách biểu diễn phổ biến là danh sách kề (dict<node, list>). BFS dùng queue, thích hợp tìm đường ngắn nhất theo số cạnh. DFS dùng stack hoặc đệ quy, thích hợp duyệt sâu và phát hiện chu trình.",
    theoryEn:
      "A graph is a set of vertices and edges, directed or undirected, weighted or not. The common representation is an adjacency list (dict of node -> list). BFS uses a queue and finds shortest paths in terms of edges. DFS uses a stack/recursion and is great for deep traversal and cycle detection.",
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
    titleVi: "Bài 7 — Tìm kiếm Nhị phân (Binary Search)",
    titleEn: "Lesson 7 — Binary Search",
    summaryVi: "Chia đôi không gian tìm kiếm — O(log n).",
    summaryEn: "Halve the search space — O(log n).",
    theoryVi:
      "Binary Search yêu cầu dữ liệu đã sắp xếp. Mỗi bước so sánh với phần tử giữa và loại bỏ một nửa không gian. Cẩn thận với tràn số khi tính mid và điều kiện dừng (left <= right). Mẫu mở rộng: tìm biên trái, biên phải, hoặc nhị phân trên đáp án (binary search on answer).",
    theoryEn:
      "Binary Search requires sorted data. Each step compares the middle element and discards half the space. Watch for overflow when computing mid, and pick the termination condition carefully (left <= right). Extensions include lower-bound, upper-bound and binary search on the answer.",
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
    titleVi: "Bài 8 — Sắp xếp: Merge Sort & Quick Sort",
    titleEn: "Lesson 8 — Sorting: Merge Sort & Quick Sort",
    summaryVi: "Chia để trị — O(n log n) trung bình.",
    summaryEn: "Divide and conquer — O(n log n) average.",
    theoryVi:
      "Merge Sort chia mảng đến khi còn 1 phần tử rồi trộn lại theo thứ tự — ổn định, O(n log n) trong mọi trường hợp, cần O(n) bộ nhớ phụ. Quick Sort chọn pivot và phân hoạch quanh nó — rất nhanh trong thực tế, O(n log n) trung bình nhưng O(n²) khi pivot xấu. Bubble/Selection Sort dễ hiểu nhưng O(n²), chỉ dùng để học.",
    theoryEn:
      "Merge Sort recursively splits then merges in order — stable, O(n log n) in all cases, needs O(n) extra space. Quick Sort partitions around a pivot — very fast in practice, O(n log n) average but O(n²) worst case. Bubble/Selection Sort are O(n²) and mostly pedagogical.",
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
    titleVi: "Bài 9 — Đệ quy & Big O",
    titleEn: "Lesson 9 — Recursion & Big O",
    summaryVi: "Tư duy chia nhỏ bài toán và ước lượng độ phức tạp.",
    summaryEn: "Break problems down and estimate complexity.",
    theoryVi:
      "Đệ quy giải bài toán bằng cách quy về phiên bản nhỏ hơn của chính nó. Hai thành phần bắt buộc: trường hợp cơ sở (base case) và bước đệ quy. Big O mô tả mức tăng của thời gian/bộ nhớ theo kích thước đầu vào n. Các bậc thường gặp: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n).",
    theoryEn:
      "Recursion solves a problem by reducing it to smaller instances of itself. You need a base case plus a recursive step. Big O describes how time/space grow with input size n. Common tiers: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n).",
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
];

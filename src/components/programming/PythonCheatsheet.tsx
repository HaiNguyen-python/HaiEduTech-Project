import { BookOpen, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const groups = [
  { title: "Input & types", vi: "Nhập & kiểu dữ liệu", entries: [
    ["print(value)", "Display output", "In kết quả", 'print("Hello")'],
    ["input()", "Read a string", "Đọc chuỗi nhập vào", 'name = input()'],
    ["int(x)", "Convert to integer", "Đổi sang số nguyên", 'age = int(input())'],
    ["float(x)", "Convert to decimal", "Đổi sang số thực", 'float("3.5")  # 3.5'],
    ["str(x)", "Convert to string", "Đổi sang chuỗi", 'str(42)  # "42"'],
    ["type(x)", "Inspect a type", "Xem kiểu dữ liệu", 'type(42)  # int'],
  ] },
  { title: "Numbers & loops", vi: "Số & vòng lặp", entries: [
    ["len(x)", "Count items", "Đếm phần tử", 'len("Python")  # 6'],
    ["range(start, stop, step)", "Stop is excluded", "Không gồm giá trị stop", 'list(range(1, 6, 2))  # [1, 3, 5]'],
    ["abs(x)", "Absolute value", "Giá trị tuyệt đối", 'abs(-7)  # 7'],
    ["round(x, n)", "Round to n places", "Làm tròn n chữ số", 'round(3.14159, 2)  # 3.14'],
    ["min(x) / max(x)", "Smallest / largest", "Nhỏ nhất / lớn nhất", 'max([2, 8, 3])  # 8'],
    ["sum(x)", "Add numeric items", "Cộng các phần tử số", 'sum([1, 2, 3])  # 6'],
    ["enumerate(x)", "Index and value", "Chỉ số và giá trị", 'for i, value in enumerate(["a", "b"]):\n    print(i, value)'],
    ["zip(a, b)", "Pair items; stops at shortest", "Ghép cặp; dừng ở dãy ngắn nhất", 'list(zip([1, 2], ["a", "b"]))'],
  ] },
  { title: "Strings", vi: "Chuỗi", entries: [
    ["s.strip()", "Trim outer whitespace", "Bỏ khoảng trắng hai đầu", '" hi ".strip()  # "hi"'],
    ["s.lower() / s.upper()", "Change letter case", "Đổi chữ thường / hoa", '"Hi".lower()  # "hi"'],
    ["s.split(sep)", "Split into a list", "Tách thành danh sách", '"a,b".split(",")  # ["a", "b"]'],
    ["sep.join(items)", "Join strings", "Nối các chuỗi", '"-".join(["a", "b"])  # "a-b"'],
    ["s.replace(old, new)", "Replace text", "Thay thế văn bản", '"cat".replace("c", "b")  # "bat"'],
    ["s.find(text)", "Index, or -1 if absent", "Vị trí, hoặc -1 nếu không có", '"hello".find("e")  # 1'],
    ["s.isdigit()", "Check digit characters", "Kiểm tra các ký tự chữ số", '"123".isdigit()  # True'],
  ] },
  { title: "Lists & dictionaries", vi: "Danh sách & từ điển", entries: [
    ["items.append(x)", "Add one item in place", "Thêm một phần tử tại chỗ", 'items = [1, 2]\nitems.append(3)'],
    ["items.extend(xs)", "Add multiple items in place", "Thêm nhiều phần tử tại chỗ", 'items = [1]\nitems.extend([2, 3])'],
    ["items.pop(i)", "Remove and return item", "Xóa và trả về phần tử", 'items = [1, 2]\nlast = items.pop()  # 2'],
    ["sorted(x)", "Return a new sorted list", "Trả về danh sách mới đã sắp xếp", 'sorted([3, 1, 2])  # [1, 2, 3]'],
    ["items.sort()", "Sort in place; returns None", "Sắp xếp tại chỗ; trả về None", 'items = [3, 1, 2]\nitems.sort()'],
    ["d.get(key, default)", "Read with a fallback", "Đọc với giá trị dự phòng", '{}.get("score", 0)  # 0'],
    ["d.items()", "Key-value pairs", "Các cặp khóa-giá trị", 'for key, value in {"a": 1}.items():\n    print(key, value)'],
    ["set(x)", "Unique values; unordered", "Giá trị duy nhất; không có thứ tự", 'set([1, 1, 2])  # {1, 2}'],
  ] },
  { title: "Useful modules", vi: "Thư viện hữu ích", entries: [
    ["math.sqrt(x)", "Square root", "Căn bậc hai", 'import math\nmath.sqrt(16)  # 4.0'],
    ["random.randint(a, b)", "Both endpoints included", "Gồm cả hai đầu mút", 'import random\nrandom.randint(1, 6)'],
    ["random.choice(items)", "Pick from a non-empty sequence", "Chọn từ dãy không rỗng", 'import random\nrandom.choice(["a", "b"])'],
    ["open(path, mode)", "Use with to close safely", "Dùng with để đóng tệp an toàn", 'with open("notes.txt", "r", encoding="utf-8") as f:\n    text = f.read()'],
  ] },
];

export default function PythonCheatsheet() {
  const { t } = useLanguage();
  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card shadow-sm" aria-label="Python cheatsheet">
      <h2 className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-bold text-foreground">
        <BookOpen className="h-4 w-4 text-primary" /> Python cheatsheet
      </h2>
      <div className="max-h-[60vh] overflow-y-auto">
        {groups.map((group, index) => (
          <details key={group.title} open={index === 0} className="group border-b border-border last:border-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {t(group.vi, group.title)}<ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <dl className="divide-y divide-border px-4">
              {group.entries.map(([signature, en, vi, example]) => (
                <div key={signature} className="py-3">
                  <dt className="break-words font-mono text-xs font-semibold text-primary">{signature}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(vi, en)}
                    <code className="mt-2 block overflow-x-auto rounded bg-muted px-2 py-2 font-mono text-xs leading-relaxed text-foreground whitespace-pre">{example}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </aside>
  );
}

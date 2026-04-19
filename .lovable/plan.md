
## Mục tiêu
1. Đổi icon 🐍 → 💻 (Code/Laptop) trong toàn bộ Python Pathway.
2. Đổi tên hiển thị "Python Pathway" → "Introduction to Programming" (giữ nguyên route `/programming/python/...` và `pillar=python-pathway` để không vỡ link).
3. Bổ sung thêm ~10 bài học mới, nâng tổng từ ~37 → ~47 bài.
4. Cải thiện format bài học (PythonLessonView): bố cục thoáng, callout màu, badge bước, giọng văn vui có analogy đời thường VN.

## Thay đổi

### A. Đổi icon + tên (find/replace nhẹ)

**`src/data/curriculum/pythonPathway.ts`**
- Module emoji: thay `🐍` ở module M1 → `💻`. Các module khác giữ emoji riêng (📦 control, 🗂️ data, 🧩 functions, 🏛️ OOP, 🚀 mastery) hoặc đổi cho hài hòa.
- Lesson emoji `🐍` → `▶️` / `📘` / `⚙️` tùy ngữ cảnh.

**`src/components/python/PythonPathwayHub.tsx`**
- Header: `🐍 Python Pathway: Beginner → Mastery` → `💻 Introduction to Programming: Beginner → Mastery`
- Mô tả VI/EN cập nhật: "Lộ trình lập trình từ cơ bản đến nâng cao bằng Python..."
- Loading text trong PyodideRunner: `🐍 Khởi động Python...` → `⚙️ Khởi động môi trường...`

**`src/components/Navbar.tsx`** (dòng đã thêm trước)
- `🐍 Python Pathway` → `💻 Introduction to Programming`

**`src/pages/Programming.tsx`**
- Tab pillar `python-pathway`: title `🐍 Python Pathway` → `💻 Introduction to Programming`, icon Lucide `Code2` thay emoji 🐍 trong card pillar.

### B. Bổ sung 10 bài học mới (`pythonPathway.ts`)

| Module | Lessons mới |
|---|---|
| M1 Basics | `m1-l6-comments` (Comments & docstrings), `m1-l7-typecast` (Type Conversion: int/str/float) |
| M2 Flow | `m2-l7-while-advanced` (While + sentinel), `m2-l8-match` (match/case Python 3.10+) |
| M3 Data | `m3-l7-slicing` (List/String slicing sâu), `m3-l8-sortfilter` (sorted/filter/map) |
| M4 Functions | `m4-l7-scope` (Local/Global/nonlocal), `m4-l8-typing` (Type hints cơ bản) |
| M5 OOP | `m5-l7-dataclass` (`@dataclass` modern OOP) |
| M6 Mastery | `m6-l9-virtualenv` (venv & pip — chỉ giải thích + copy, không chạy Pyodide) |

Mỗi bài giữ schema có sẵn: `concept` (VI+EN), `codeExample`, `pitfalls` (VI+EN), `practiceTask`, `quiz` 3 câu (mix MCQ + fill-code), giọng văn vui có analogy VN (ví dụ: "type hints như mác ghi nguyên liệu trên bao bì — không bắt buộc nhưng ai mở ra cũng biết bên trong là gì").

### C. Refresh format `src/pages/PythonLessonView.tsx`

- **Hero header**: gradient mềm, breadcrumb rõ, badge module, badge difficulty (Beginner/Intermediate/Advanced/Mastery) màu khác nhau.
- **Concept**: bọc trong card `bg-gradient-to-br from-blue-500/5` với icon 📘, font lớn (text-base lg:text-lg), `leading-relaxed`.
- **Pitfalls**: callout đỏ `bg-red-500/5 border-l-4 border-red-500` với icon ⚠️.
- **Practice Task**: callout xanh `bg-emerald-500/5 border-l-4 border-emerald-500` với icon 🛠️.
- **Step badges** (Bước 1/2/3/4) trên từng section để dễ theo dõi.
- **Mini Project** (nếu có): card vàng nổi bật với icon 🎯.
- **Mobile**: stack dọc, code playground full width khi <lg.
- **Sticky right column** trên desktop để playground luôn nhìn thấy khi scroll concept dài.

### D. Cập nhật memory
- `mem://features/courses/python-pathway` → đổi tên hiển thị thành "Introduction to Programming", icon 💻, 47 lessons.
- `mem://index.md` → cập nhật dòng reference.

## Files thay đổi
- `src/data/curriculum/pythonPathway.ts` — đổi emoji + thêm 10 bài
- `src/components/python/PythonPathwayHub.tsx` — đổi tên/icon header
- `src/components/python/PyodideRunner.tsx` — đổi text loading
- `src/components/Navbar.tsx` — đổi label dropdown
- `src/pages/Programming.tsx` — đổi pillar title/icon
- `src/pages/PythonLessonView.tsx` — refresh layout (callout, step badge, sticky)
- `mem://features/courses/python-pathway` + `mem://index.md`

## Không đụng
- Route paths (`/programming/python/:lessonId`, `?pillar=python-pathway`) — giữ nguyên để không vỡ link cũ.
- Schema lesson, Pyodide runner core, edge function `explain-code`, LessonQuiz, ModuleProgressBar.
- Curriculum 4 pillar còn lại (SQL/ML/Cloud/Python challenges).

## Kết quả mong đợi
- Navbar "Học Lập Trình" hiện "💻 Introduction to Programming".
- Tab `/programming` thứ 6 là "💻 Introduction to Programming" với 47 bài.
- Lesson view mới: bố cục thoáng, callout màu, badge bước, sticky playground desktop.
- `tsc --noEmit` pass.

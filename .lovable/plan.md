
## Mục tiêu
1. **Tăng cường nội dung**: Thêm ~12 lessons mới vào Python Pathway, nâng từ 25 → ~37 lessons.
2. **Hiển thị trên Navbar**: Thêm link "🐍 Python Pathway" vào dropdown "Học Lập Trình" để học sinh dễ truy cập.

## Thay đổi

### A. Mở rộng `src/data/curriculum/pythonPathway.ts` (+12 lessons)

| Module | Lessons mới | IDs |
|---|---|---|
| M1 Basics | +1: String Formatting (f-strings) | `m1-l5-fstring` |
| M2 Flow | +2: `break`/`continue`, Nested loops | `m2-l5-break`, `m2-l6-nested` |
| M3 Data | +1: String Methods | `m3-l6-strings` |
| M4 Functions | +2: `*args`/`**kwargs`, Recursion | `m4-l5-args`, `m4-l6-recursion` |
| M5 OOP | +2: `@property`/Class Methods, Magic Methods (`__str__`, `__len__`) | `m5-l5-property`, `m5-l6-magic` |
| M6 Mastery | +4: Try/Except, Decorators, Generators, Regex | `m6-l5-errors`, `m6-l6-decorator`, `m6-l7-generator`, `m6-l8-regex` |

Mỗi lesson tuân thủ schema có sẵn: `concept` (VI+EN), `codeExample`, `pitfalls` (VI+EN), `practiceTask`, 3 quiz (mix MCQ + fill-code), giọng văn vui có analogy đời thường VN.

### B. Edit `src/components/Navbar.tsx`
Chèn 1 dòng vào `programmingSubs` ngay sau dòng 152 (sau "150 Thử thách Python"):
```ts
{ to: "/programming?pillar=python-pathway", label: t("🐍 Python Pathway", "🐍 Python Pathway") },
```

### C. Edit `src/pages/Programming.tsx` (nhỏ)
Thêm `useEffect` đọc `?pillar=` từ URL khi load để tự động chuyển sang tab tương ứng (cho phép link trực tiếp từ Navbar mở đúng tab Python Pathway).

## Files thay đổi
- `src/data/curriculum/pythonPathway.ts` (mở rộng)
- `src/components/Navbar.tsx` (1 dòng)
- `src/pages/Programming.tsx` (URL param sync)

## Không đụng
- Schema, components Pyodide/Quiz/Hub, edge function `explain-code`, route `/programming/python/:lessonId`.
- 25 lessons hiện có.

## Kết quả mong đợi
- Click "Học Lập Trình" ở Navbar → thấy "🐍 Python Pathway" trong dropdown → click → tab Python Pathway tự active.
- Hub hiển thị 37 lessons (M1:5, M2:6, M3:6, M4:6, M5:6, M6:8).
- Build pass `tsc --noEmit`.

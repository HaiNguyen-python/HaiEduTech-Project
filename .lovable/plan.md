
## Mục tiêu
Thêm tab **"Python Pathway"** vào `/programming` — lộ trình Python từ Beginner → Mastery với 6 module, Pyodide runtime, quiz, badges, AI explain.

## Kiến trúc

### A. Data layer (mới)
`src/data/curriculum/pythonPathway.ts` — 6 module × 4-5 lessons = **~25 lessons**, mỗi lesson có:
```ts
{
  id, moduleId, order, title (vi+en),
  concept (vi+en),         // Giải thích
  codeExample,             // Code starter cho playground
  pitfalls (vi+en),        // ⚠️ Common pitfalls
  practiceTask,            // 🛠️ Practice
  quiz: [3 câu MCQ/fill-code],
  miniProject?: { ... }    // Cuối mỗi module
}
```

### B. Components mới
1. `src/components/python/PyodideRunner.tsx` — load Pyodide lazy, expose `runCode(src)` → stdout/stderr.
2. `src/components/python/CodePlayground.tsx` — split view: Monaco-like editor (dùng `<textarea>` + JetBrains Mono + Dracula tokens) | output panel + Run/Reset/Copy/Explain AI buttons.
3. `src/components/python/LessonQuiz.tsx` — 3 câu, chấm điểm, lưu localStorage.
4. `src/components/python/ModuleProgressBar.tsx` — % bài đã xong + badge "Python Certified".
5. `src/components/python/PythonPathwayHub.tsx` — grid 6 module cards, lock visual (chỉ visual, không thật — tuân Core rule "no locked content"), CTA vào lesson.
6. `src/pages/PythonLessonView.tsx` — route `/programming/python/:lessonId` — split view explanation/playground.

### C. Tích hợp `/programming`
Thêm tab thứ 5 **"🐍 Python Pathway"** vào `Programming.tsx` (bên cạnh Python/SQL/ML/Cloud hiện có), render `<PythonPathwayHub />`.

### D. Edge function mới
`supabase/functions/explain-code/index.ts` — nhận `{ code, language: 'python', lessonContext }` → Lovable AI Gateway (`google/gemini-3-flash-preview`) → trả Markdown giải thích bilingual EN+VI. CORS, validation, rate-limit hint.

### E. Progress tracking
- Mỗi lesson hoàn thành (quiz ≥ 2/3) → lưu `python_pathway_progress` ở localStorage + insert vào `student_activity_log` (đã có).
- Module hoàn thành (100% lessons) → toast 🎉 + badge "Python Certified: Module X" + dispatch event để Mountain Climber chibi tăng cao thêm 1 nấc (tận dụng existing `useMasteredMotivation`).

### F. Styling
- JetBrains Mono qua `<link>` Google Fonts trong `index.html`.
- Dracula color tokens thêm vào `index.css` (`--code-bg`, `--code-fg`, `--code-keyword`...).
- Icons: 🐍 module, 📦 lesson, 🛠️ practice, ✅ quiz, 🎉 mini project.

## Files thay đổi

**Tạo mới (10):**
- `src/data/curriculum/pythonPathway.ts`
- `src/components/python/PyodideRunner.tsx`
- `src/components/python/CodePlayground.tsx`
- `src/components/python/LessonQuiz.tsx`
- `src/components/python/ModuleProgressBar.tsx`
- `src/components/python/PythonPathwayHub.tsx`
- `src/pages/PythonLessonView.tsx`
- `supabase/functions/explain-code/index.ts`
- `mem://features/courses/python-pathway` (memory)

**Edit (4):**
- `src/pages/Programming.tsx` — thêm tab
- `src/App.tsx` — route `/programming/python/:lessonId`
- `src/index.css` — code theme tokens + JetBrains Mono utility
- `index.html` — preload JetBrains Mono
- `.lovable/memory/index.md` — thêm reference

## Pyodide chiến lược
- CDN: `https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js`.
- Lazy load **chỉ khi mở 1 lesson** (không tải ở Hub).
- Loading spinner "🐍 Khởi động Python..." với progress.
- Cache toàn cục `window.__pyodide` để chỉ tải 1 lần/session.
- Pre-load `numpy`, `pandas` chỉ khi vào Module 6.

## Quiz format
```ts
{ type: 'mcq', q, options: [...], answer: 1 } |
{ type: 'fill', q, codeBefore, codeAfter, answer: 'len(x)' }
```

## Không đụng tới
- Curriculum cũ (Python/SQL/ML/Cloud lessons đã rewrite) — vẫn nguyên ở 4 tab cũ.
- Schema DB — chỉ dùng `student_activity_log` đã có.
- Components/style tokens hiện tại.

## Kết quả mong đợi
- Tab mới `/programming` "🐍 Python Pathway" với 6 module hub.
- Mỗi lesson có giải thích bilingual + Pyodide playground chạy thật + 3 câu quiz + nút "Explain with AI".
- Module hoàn thành → badge + chibi leo cao.
- Mobile-responsive, JetBrains Mono + Dracula theme.

## Kiểm thử cuối
- `npx tsc --noEmit` pass.
- Mở `/programming` → tab Python Pathway → click 1 lesson → Pyodide load → chạy `print("hello")` → thấy stdout.
- Quiz 2/3 → lesson done. 3 lessons done trong module 1 → badge.

# Rà soát Learn Programming — Kế hoạch sửa & nâng cấp

## A. Lỗi cần sửa (ưu tiên cao)

1. **XSS risk — AIAcademy** (`src/pages/AIAcademy.tsx:137,147`)
   - `dangerouslySetInnerHTML` chưa qua DOMPurify → bọc `DOMPurify.sanitize()` theo chuẩn dự án.

2. **Mobile layout — PythonLessonView** (`src/pages/PythonLessonView.tsx:199`)
   - `grid lg:grid-cols-2` khiến playground bị đẩy xa dưới trên mobile.
   - Thêm Tabs ("Bài học / Code") cho < lg, giữ 2-cột cho desktop.

3. **Redirect loop tiềm ẩn — Programming.tsx** (`~line 95-97`)
   - Khi `?pillar=nlp` còn lại trong URL sau Back → loop.
   - Sửa: dùng `navigate(..., { replace: true })` + clear searchParams trước khi điều hướng.

4. **Route ordering — App.tsx:262-263**
   - Đặt `/programming/python/:lessonId` lên trước `/programming/:moduleId` để tránh bẫy bảo trì.

5. **Dead-link "Start" — PythonPathwayHub.tsx:90**
   - Nếu module rỗng, hiển thị state "Sắp ra mắt" + disable button thay vì href `"#"`.

6. **Cleanup**: xoá `console.error` còn sót trong `ProgrammingLesson.tsx` (lines ~222/262/382).

## B. UX cải tiến (medium)

7. **Nút "Bài tiếp theo →" rõ ràng** sau khi pass quiz trong `ProgrammingLesson` (hiện học sinh tưởng đã hết bài).

8. **Việt hoá pillar descriptions** trong `Programming.tsx` + tên badge trong `AIAcademy.tsx` (hiện toàn tiếng Anh) khi `lang === "vi"`.

9. **Scroll indicator cho pillar tabs trên mobile** (mũi tên → mờ ở mép phải).

10. **PillarHub overview**: thay vì redirect thẳng vào lesson đầu, hiển thị 1 card overview ngắn (mô tả pillar + số bài + nút "Bắt đầu").

11. **Accessibility quiz**: thêm `role="radio"`, `aria-checked`, `aria-label` cho quiz buttons và Pyodide textarea.

## C. Nâng cấp gamification để tăng hứng thú (chọn top 5 khả thi)

12. **Unified XP cho toàn Programming** — tách `useAIAcademyXP` → `useProgrammingXP` dùng chung cho `ProgrammingLesson`, `PythonLessonView`, `PythonChallengeList`. Hiện chỉ AIAcademy có XP → các pillar khác bị thiệt. Hiển thị mini XP bar trong Navbar khi ở `/programming/*`.

13. **Daily Code Challenge + Streak** — random 1 challenge mỗi ngày (seed = date) từ `pythonChallenges`. Pass = +100 XP bonus, streak counter (localStorage). Toast cảm xúc khi đạt mốc 3/7/30 ngày.

14. **AI Code Reviewer** — Sau khi chạy code trong Pyodide, nút "💬 AI Review" gọi Lovable AI (`google/gemini-2.5-flash`) trả về 3 gợi ý ngắn: tối ưu / best practice / lỗi tiềm ẩn. Tái dùng pattern edge function hiện có.

15. **Programming Progress Dashboard** trong `/programming` — circle progress mỗi pillar, tổng XP, badge, streak. Dữ liệu đã có trong localStorage (`haiedu_prog_*`, `haiedu_challenge_*`).

16. **Achievement Badges riêng Programming** — *First Run*, *Bug Slayer* (chạy lại sau lỗi), *Speed Coder* (< 2 phút), *Polyglot* (3 pillars), *SQL Ninja*, *ML Pioneer*. Hiển thị ở Dashboard và profile.

> Các ý tưởng bổ sung (deferred): Leaderboard lớp/trường (cần Supabase), Pair-programming chibi "Botchi" gợi ý khi idle, Portfolio builder, Certificate PNG cho mỗi pillar.

## D. Phạm vi & thứ tự thực hiện đề xuất

- **Đợt 1 (sửa lỗi)**: mục 1–6 — ~1 turn.
- **Đợt 2 (UX)**: mục 7–11 — ~1 turn.
- **Đợt 3 (gamification)**: mục 12–16 — 1–2 turn, làm theo thứ tự 12 → 13 → 15 → 14 → 16 (XP system là nền cho daily challenge, dashboard, badges).

## Câu hỏi cho bạn

1. Bạn muốn mình làm **cả 3 đợt** (A + B + C) hay chọn 1 đợt trước?
2. Với gamification, đồng ý top 5 (mục 12–16) hay muốn thêm bớt ý nào (Leaderboard / Botchi / Portfolio / Certificate)?

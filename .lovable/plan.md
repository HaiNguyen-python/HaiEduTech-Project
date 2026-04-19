

## Vấn đề
Đã rà soát toàn bộ `src/data/curriculum/`:
- **7 file**, ~**19,432 dòng**, ~**80 lessons** thuộc 7 lộ trình: SQL, AI Foundation, Data Engineering, ML, Cloud, Cloud Expansion, Programming Expansion (Python OOP/Decorators/Generators/FileIO + Spark).
- Bài đang đứng (`sql-select-1`) là ví dụ điển hình của vấn đề chung:
  1. Theory **100% tiếng Anh** dù học viên Việt — không có tiếng Việt làm "neo" để hiểu khái niệm.
  2. Mở đầu kiểu marketing ("paint on the walls", "$700 mistake") trước khi học viên biết cú pháp.
  3. **Bảng so sánh dialect** (Postgres/MySQL/SQL Server/Oracle/Snowflake) ngay bài 1 → nhiễu.
  4. Thuật ngữ chưa định nghĩa: *keyset pagination, deterministic, dbt, partitioned table, BigQuery* xuất hiện không kèm giải thích.
  5. Code không có comment tiếng Việt; ví dụ rời rạc, không có ngữ cảnh "trước–sau".
- 2 lessons SQL (`sql-sub-1`, `sql-cte-1`) đã được rewrite đúng chuẩn ở vòng trước → dùng làm **template chuẩn vàng** cho toàn bộ.

## Chiến lược: Nhiều vòng, ưu tiên bài học viên chạm sớm nhất
Không thể viết lại 80 lessons trong 1 vòng (sẽ vượt token, dễ phát sinh lỗi). Chia thành **3 đợt theo độ ưu tiên dựa trên đường đi của học viên mới**.

### Chuẩn rewrite áp dụng cho mọi bài (rút từ template `sql-sub-1`)
1. ✅ **Tiếng Việt là chính**, thuật ngữ Anh giữ nguyên + giải nghĩa ngắn trong ngoặc lần đầu xuất hiện. Ví dụ: *aggregate function (hàm tổng hợp — gom nhiều dòng thành 1 giá trị)*.
2. ✅ **Mở đầu = câu hỏi đời thường** ("Lớp học có 30 học viên, làm sao đếm số học viên trên 18 tuổi?") trước khi đưa cú pháp.
3. ✅ **3 bước cho mỗi khái niệm khó**: (1) vấn đề thực tế → (2) code 3–5 dòng → (3) giải thích từng dòng.
4. ✅ Cắt **case study tài chính/kỹ thuật cao cấp** ở đầu bài; nếu giữ thì dời xuống "Ghi chú nâng cao" cuối.
5. ✅ **Bảng so sánh dialect chỉ khi cần thiết** và đã có ngữ cảnh; bài 1–3 không nên có.
6. ✅ Giữ **≥6 H2 sections** (yêu cầu của `TheorySections.tsx`).
7. ✅ `code` có **comment tiếng Việt từng block** khớp với explanation.
8. ✅ `theoryEn` (short form) viết tiếng Anh ngắn gọn cùng cấu trúc.
9. ✅ Quiz: `answer` 0–3, có `explanation` rõ.
10. ✅ Không đổi `id` lesson/module → không phá link/route.

### Đợt 1 — Vòng này (ưu tiên cao nhất, 8 lessons)
**SQL còn lại trong file `sqlLessons.ts`** — đường đi tự nhiên của học viên SQL beginner:

| Lesson ID | Tên | Lý do ưu tiên |
|---|---|---|
| `sql-select-1` | SELECT & FROM | **Bài đầu tiên** học viên chạm — hiện đang ở route này |
| `sql-select-2` | AS & Alias | Bài 2 cùng module |
| `sql-where-1` | WHERE & Lọc dữ liệu | Bài 3 — module WHERE |
| `sql-agg-1` | Aggregate / GROUP BY | Bài 4 — bước nhảy tư duy lớn nhất với người mới |
| `sql-join-1` | JOINs | Bài 5 — khái niệm khó nhất ở SQL beginner |
| `sql-win-1` | Window Functions | Bài 7 — thường gây hoang mang nhất |
| `sql-idx-1` | Indexing | Bài 8 — khái niệm vô hình, cần nhiều ví dụ đời thường |
| `sql-design-1` | Database Design | Bài 9 — chuẩn hoá (normalization) thường viết khô khan |

→ Sau đợt 1, **toàn bộ module SQL** (10 lessons) sẽ đồng nhất chuẩn dễ hiểu.

### Đợt 2 — Vòng tiếp (sẽ chờ user duyệt riêng)
**Python & Programming Expansion** (~6 lessons): OOP, Decorators, Generators, File I/O — học viên Python intermediate chạm sớm.

### Đợt 3 — Vòng sau cùng
**AI Foundation, ML, Data Engineering, Cloud** (~50 lessons) — học viên đến sau khi có nền tảng, chia thành các sub-batch 6–8 lessons/lần để tránh lỗi.

## Phạm vi cam kết VÒNG NÀY
- ✏️ Rewrite **8 SQL lessons** trong `src/data/curriculum/sqlLessons.ts`: `sql-select-1`, `sql-select-2`, `sql-where-1`, `sql-agg-1`, `sql-join-1`, `sql-win-1`, `sql-idx-1`, `sql-design-1`.
- Mỗi lesson: viết lại `theory` (VI), `theoryEn` (EN ngắn), `code` (thêm comment VI), `exercise`/`exerciseEn`, `quiz` (5 câu, giữ schema).
- Cuối phản hồi sẽ liệt kê rõ **đợt 2 & 3 còn lại bao nhiêu bài** để user chủ động duyệt vòng tiếp.

## Ví dụ minh hoạ (trích đoạn `sql-select-1` sau khi viết lại)
> ## 1. Vấn đề đời thường  
> Bạn có một bảng `students` chứa 1000 học viên. Sếp bảo: "Cho tôi xem 10 học viên có điểm cao nhất". Làm sao? → Đó là việc của `SELECT`.  
>  
> ## 2. Cú pháp tối thiểu  
> ```sql  
> SELECT name, score        -- Lấy cột nào?  
> FROM   students            -- Từ bảng nào?  
> ORDER BY score DESC        -- Sắp xếp giảm dần theo điểm  
> LIMIT 10;                  -- Chỉ lấy 10 dòng đầu  
> ```  
> Mỗi dòng là 1 câu hỏi: "Lấy gì? Từ đâu? Sắp xếp ra sao? Bao nhiêu dòng?"  

## Files thay đổi
- ✏️ `src/data/curriculum/sqlLessons.ts` — rewrite 8 lessons (giữ nguyên structure, id, schema).

## Không đụng tới
- `TheorySections.tsx`, `CodeBlock.tsx`, `ProgrammingLesson.tsx`, schema DB, types Supabase.
- `aiFoundationLessons.ts`, `mlLessons.ts`, `cloudLessons.ts`, `dataEngLessons.ts`, `programmingExpansion.ts`, `cloudExpansion.ts` (để dành cho đợt 2 & 3).
- 2 lessons SQL đã rewrite (`sql-sub-1`, `sql-cte-1`) và 2 lessons SQL nâng cao ít người chạm (`sql-proc-1`, `sql-opt-1`, `sql-adv-1`).



## Vấn đề
Bài "Lists" (m3-l1) trong ảnh chụp cho thấy nội dung quá ngắn — kiểu ghi chú 1-2 dòng thay vì bài học hoàn chỉnh:
- **Concept**: chỉ 1 dòng "List = ordered, mutable array..."
- **Pitfalls**: 2 gạch đầu dòng cụt
- **Practice task**: 1 câu duy nhất

47 bài còn lại trong `src/data/curriculum/pythonPathway.ts` đa số cũng cùng tình trạng này.

## Câu hỏi cần làm rõ trước khi code

Vì viết lại 47 bài × 6 fields (concept VI/EN, pitfalls VI/EN, practiceTask VI/EN) là khối lượng rất lớn, cần xác định scope:

**Q1 — Phạm vi:**
- (A) Toàn bộ 47 bài (file sẽ ~6000+ dòng, chia 3-4 lượt edit)
- (B) Chỉ Module 1-3 (17 bài cơ bản — nơi học sinh mới hay đọc nhất)
- (C) Chỉ bài đang xem (m3-l1 Lists) làm mẫu → duyệt phong cách → nhân rộng

**Q2 — Độ dài mỗi bài:**
- (A) Vừa phải (~150 từ concept + analogy đời sống VN + 2-3 ví dụ code inline)
- (B) Chi tiết (~300 từ + 4-5 ví dụ + so sánh sai/đúng + bullet ghi nhớ)
- (C) Rất chi tiết kiểu sách giáo khoa (~500 từ, nhiều subsection)

**Q3 — Ngôn ngữ:**
- (A) Cả VI + EN đầy đủ
- (B) Ưu tiên VI chi tiết, EN giữ tóm tắt

## Đề xuất mặc định (nếu bạn muốn bắt đầu ngay)

**Phương án khuyến nghị: B + B + B** (Module 1-3, ~300 từ, ưu tiên VI)

### Cấu trúc viết lại mỗi bài
Mỗi `concept` sẽ theo template:
1. **Mở đầu hấp dẫn** (1 câu hook) — "Hãy tưởng tượng bạn có một cái kệ sách..."
2. **Định nghĩa rõ ràng** (2-3 câu) — Khái niệm là gì, dùng để làm gì
3. **Analogy đời sống VN** — vd List như "danh sách đi chợ", Dict như "danh bạ điện thoại"
4. **3-4 ví dụ code inline** với Markdown ` ``` ` blocks, mỗi ví dụ 1 mục đích khác nhau
5. **Mẹo nhớ** — bullet 2-3 ý ngắn

`pitfalls` mở rộng từ 2 dòng → 4-6 cạm bẫy với giải thích "vì sao sai" + "cách sửa".

`practiceTask` mở rộng thành 3 cấp: 🟢 Cơ bản · 🟡 Vừa · 🔴 Thử thách (mỗi cấp 1 yêu cầu cụ thể).

### Ví dụ minh họa (bài Lists - m3-l1)

**Trước (1 dòng):**
> List = ordered, mutable array. append, insert, remove, indexing, slicing, len().

**Sau (~300 từ với code blocks và analogy):**
> 📋 **Hãy tưởng tượng** bạn có một cuốn sổ tay ghi danh sách đi chợ: cà chua, hành lá, thịt bò... Bạn có thể thêm món mới vào cuối, chèn vào giữa, xóa món đã mua, hoặc đếm xem còn bao nhiêu món. Trong Python, **List** chính là cuốn sổ tay đó.
> 
> **List** là một dãy các phần tử **có thứ tự** (ordered) và **có thể thay đổi** (mutable). Phần tử có thể là số, chuỗi, thậm chí list khác — như một cái túi đựng đủ thứ.
> 
> ```python
> cho = ["cà chua", "hành lá", "thịt bò"]
> cho.append("trứng")        # thêm cuối: [..., "trứng"]
> cho.insert(0, "rau muống")  # chèn đầu
> cho.remove("hành lá")       # xóa theo giá trị
> print(cho[0])               # truy cập phần tử đầu (index 0)
> print(cho[-1])              # phần tử cuối
> print(cho[1:3])             # cắt lát (slicing)
> print(len(cho))             # đếm số phần tử
> ```
> 
> 💡 **Mẹo nhớ:** index bắt đầu từ **0** (không phải 1). `[-1]` là phần tử cuối. Slicing `[a:b]` lấy từ a đến **trước** b.

## Files thay đổi
- `src/data/curriculum/pythonPathway.ts` — viết lại 17 bài Module 1-3 (nếu chọn B)

## Không đụng
- Schema lesson, Pyodide runner, LessonView UI, route paths.
- Module 4-6 (giữ nguyên đến đợt sau).

## Kết quả mong đợi
- Mỗi bài có nội dung đủ "đầy" để đọc 3-5 phút, có analogy gần gũi, có code minh họa nhiều cấp.
- Format Markdown render đẹp trong card xanh "Concept" với `prose` styling đã có sẵn.
- Build pass `tsc --noEmit`.

**👉 Hãy chọn A/B/C cho mỗi câu hỏi (hoặc xác nhận phương án mặc định B+B+B) để mình bắt tay vào viết.**

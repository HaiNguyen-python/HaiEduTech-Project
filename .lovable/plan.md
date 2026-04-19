
Mục tiêu: làm toàn bộ phần Theory trong Learn Programming dễ đọc, rõ cấp bậc, không còn cảm giác “tiêu đề quá to / nội dung quá nhỏ / bố cục dính chùm”.

## Chẩn đoán nhanh
Hiện có 3 nguyên nhân chính:
1. `src/pages/ProgrammingLesson.tsx` đang dùng `prose` với hierarchy chưa cân bằng: heading vẫn nổi quá mạnh so với paragraph/list.
2. Nhiều lesson data dùng markdown chưa chuẩn cho bài học dài:
   - có `# Title` ngay trong theory dù trang đã có tiêu đề lesson riêng
   - lạm dụng `##` cho các ý chỉ 1–2 dòng
   - spacing giữa đoạn, list, table chưa thống nhất
3. `src/index.css` đang có global heading scale khá lớn (`h1/h2/h3`), làm markdown dễ bị “chữ to chữ nhỏ” nếu prose override chưa đủ mạnh.

## Kế hoạch sửa

### 1. Chuẩn hóa renderer Theory trong `src/pages/ProgrammingLesson.tsx`
- Tạo một style riêng cho Theory thay vì nhồi quá nhiều class inline rời rạc.
- Tăng readability thực tế:
  - body text lên mức dễ đọc hơn
  - line-height thoáng hơn
  - giảm chênh lệch giữa heading và body
  - tăng khoảng cách giữa section / list / table / blockquote
- Giới hạn chiều rộng nội dung hợp lý trong card (`max width` dạng long-form) để tránh dòng quá dài trên màn hình lớn.
- Tùy biến `ReactMarkdown` để:
  - hạ cấp `h1` trong theory thành heading nhỏ hơn hoặc bỏ dùng như section title nội bộ
  - giữ code block, table, list hiển thị sạch và tách bạch
- Mục tiêu hierarchy:
  - Lesson title ngoài cùng: lớn nhất
  - Theory section title: vừa phải
  - Markdown headings bên trong: nhỏ hơn rõ rệt, không lấn át nội dung

### 2. Tinh chỉnh typography toàn cục trong `src/index.css`
- Giảm ảnh hưởng của global heading scale lên nội dung học thuật dài.
- Giữ font body dễ đọc, màu tương phản cao, letter-spacing/line-height tối ưu cho long-form reading.
- Bổ sung một nhóm class tiện ích riêng cho bài học lập trình, để giao diện theory ổn định hơn thay vì phụ thuộc hoàn toàn vào `prose` mặc định.

### 3. Rà soát và chuẩn hóa markdown data trong toàn bộ Learn Programming
Tôi sẽ rà soát các file curriculum chính và sửa format theo cùng một quy ước:
- `src/data/curriculum/cloudLessons.ts`
- `src/data/curriculum/cloudExpansion.ts`
- `src/data/curriculum/sqlLessons.ts`
- `src/data/curriculum/programmingExpansion.ts`
- `src/data/curriculum/mlLessons.ts`
- `src/data/curriculum/dataEngLessons.ts`
- `src/data/curriculum/aiFoundationLessons.ts` (nếu có section nào bị quá dày hoặc heading lạm dụng)

Quy ước mới:
- Không dùng `#` mở đầu lesson trong theory nữa vì đã có title của trang.
- `##` chỉ dùng cho phần lớn.
- `###` chỉ cho subsection thật sự.
- Ý ngắn 1 dòng chuyển thành:
  - `**Label:** nội dung`
  - hoặc bullet list
- Mỗi section phải có spacing rõ ràng:
  - heading
  - paragraph
  - list
  - table
  - code example
- Bảng dài sẽ vẫn giữ horizontal scroll nhưng padding/cell spacing gọn và dễ quét mắt.

### 4. Tách bạch “giải thích” và “mã thực hành”
- Đảm bảo Theory đọc như tài liệu học.
- Code example vẫn giữ dark block riêng, không làm lẫn vào phần giải thích.
- Nếu cần, thêm nhịp nghỉ thị giác giữa Theory và Code Example để bài học bớt “dính cụm”.

## Kết quả mong đợi
Sau khi triển khai:
- tiêu đề không còn phóng quá lớn
- nội dung body đủ to để đọc thoải mái
- các section có nhịp thở rõ ràng
- bài học dài vẫn gọn, sạch, dễ quét
- format đồng nhất trên toàn bộ Learn Programming, không chỉ riêng Cloud Engineer

## Files dự kiến chỉnh
- `src/pages/ProgrammingLesson.tsx`
- `src/index.css`
- `src/data/curriculum/cloudLessons.ts`
- `src/data/curriculum/cloudExpansion.ts`
- `src/data/curriculum/sqlLessons.ts`
- `src/data/curriculum/programmingExpansion.ts`
- `src/data/curriculum/mlLessons.ts`
- có thể thêm `src/data/curriculum/dataEngLessons.ts`, `src/data/curriculum/aiFoundationLessons.ts` nếu phát hiện format chưa đồng đều

Không thay đổi schema, không đụng backend; chỉ tập trung vào readability, markdown structure, và typography của phần Learn Programming.

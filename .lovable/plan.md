# Fix: scramble exercise mất từ trùng (vd. 2 chữ "the")

## Nguyên nhân
`src/components/exercises/SentenceReorderExercise.tsx` lưu các từ đã chọn dưới dạng `string[]` và lọc từ còn lại bằng `Array.includes(word)`. Khi `scrambled` có từ trùng (rất phổ biến: "the", "to", "a"…), chọn 1 token sẽ:
- Toggle nhầm (click lại sẽ xóa hết các bản trùng trong selected).
- `remaining = scrambled.filter(w => !selected.includes(w))` ẩn cả 2 token sau khi chọn 1 → không đặt đủ được câu.

Data IELTS lectures đã kiểm tra (script multiset trên tất cả file `englishIelts*.ts`): không có sentence nào thiếu/dư từ. Vấn đề thuần component.

## Cách sửa
Theo dõi **index** thay vì giá trị chuỗi:

- State: `Record<number, number[]>` — mảng các index gốc trong `scrambled` đã chọn.
- `remaining` = `scrambled.map((w,i)=>i).filter(i => !selected.includes(i))`.
- Render token pool và selected dựa trên index → từ trùng được phân biệt.
- `isCorrect`: ghép `selected.map(i => scrambled[i]).join(" ")` so với `correctEn || correct` (giữ logic toLowerCase hiện tại).
- Reset/handleReset đổi sang `[]` mặc định.
- Key React đổi sang `idx-${i}` (i là index gốc) để tránh trùng key khi có 2 "the".

## Phạm vi
- 1 file: `src/components/exercises/SentenceReorderExercise.tsx`.
- Không thay đổi data, không đổi prop shape (`scrambled: string[]`, `correct: string`), nên mọi nơi dùng (IELTS lectures, Cambridge, Grammar, SAT…) đều hưởng fix.

## Kiểm thử
- Mở lại bài "Reorder the words to form correct sentences" trong IELTS Reading & Listening lecture chứa "Check the grammar of the completed sentence" → đặt được 2 chữ "the", chấm đúng.
- Thử thêm câu "Complete the diagram below using the passage" (cũng 2 "the") để xác nhận.

# Writing Skill Chart hiện ở mọi tab và tích điểm từ mọi bài luyện tập

Hiện biểu đồ chỉ nằm trong tab "Essay Writing" và chỉ đọc dữ liệu từ các bài luận đã chấm (`writing_attempts`). Các tab Idea / Phrase / Grammar / Translation / Cohesion đều có điểm 0-10 nhưng không đóng góp gì vào biểu đồ.

## Sẽ làm gì

1. Biểu đồ chuyển ra cuối trang, ngoài các tab: luôn hiện dù học sinh đang ở tab nào.
2. Mỗi tab luyện tập được gắn với 1 tiêu chí IELTS:
   - Idea Practice + Smart Grading/Essay -> Task Response
   - Cohesion Lab -> Coherence & Cohesion
   - Phrase Practice -> Lexical Resource
   - Grammar Practice + Translation Practice -> Grammatical Range & Accuracy
3. Mỗi lần luyện xong một câu/bài, điểm 0-10 được lưu lại và quy đổi sang band, rồi trộn vào điểm của tiêu chí tương ứng trên biểu đồ với tỉ lệ nhỏ (bài luận vẫn là nguồn chính).
4. Khi chưa có bài luận nào, biểu đồ vẫn có số từ các bài luyện tập thay vì trống.
5. Thẻ biểu đồ ghi rõ điểm nào đến từ bài luận, điểm nào từ luyện tập, để học sinh không hiểu sai.
6. Biểu đồ tự cập nhật ngay sau mỗi lần luyện, không cần tải lại trang.

## Chi tiết kỹ thuật

- File mới `src/lib/writingPracticeSignals.ts`:
  - `type CritKey = "TR" | "CC" | "LR" | "GR"`.
  - Lưu ở localStorage key `ielts-writing-practice-signals-v1`: `{ [crit]: { taskType: 1|2|null, score10: number, at: string }[] }`, giữ tối đa 40 bản ghi/tiêu chí.
  - `recordPracticeSignal({ crit, score10, taskType })` - clamp 0-10, bỏ giá trị không hợp lệ, ghi rồi `window.dispatchEvent(new Event(WRITING_ATTEMPT_EVENT))`.
  - `practiceBands(taskType)` - lấy tối đa 5 bản ghi gần nhất mỗi tiêu chí (lọc theo taskType, `null` tính cho cả hai), quy đổi `band = clamp(4, 9, 4 + score10 * 0.5)` rồi snap 0.5, trả `{ crit -> { band, count } }`.
  - Cloud: mỗi signal cũng gọi `logStudentActivity({ activityType: "ielts_writing_practice", score: score10, maxScore: 10, metadata: { criterion, taskType } })` để dữ liệu không mất khi đổi máy (không tạo bảng mới, không đổi schema).
- `src/components/WritingSkillChart.tsx`:
  - Đọc thêm `practiceBands(taskType)`; công thức trộn cho mỗi tiêu chí:
    `final = essayBand != null ? essayBand * 0.8 + practiceBand * 0.2 : practiceBand`, snap 0.5.
  - `hasData` = có attempt HOẶC có practice signal; empty state chỉ hiện khi cả hai đều rỗng.
  - Chú thích dưới radar: "Essay-based" vs "+ practice" kèm số lần luyện mỗi tiêu chí.
  - Đã có listener `WRITING_ATTEMPT_EVENT` nên tự refresh sẵn.
- `src/pages/IeltsWritingPractice.tsx`:
  - Chuyển `<WritingSkillChart ... />` ra khỏi `TabsContent value="essay"`, đặt sau `</Tabs>` (cuối `<main>`), truyền `taskType`, `liveResult` (chỉ khi tab essay đang chọn thì mới cần, nhưng để nguyên prop là an toàn) và `refreshKey`.
  - Chuyển `Tabs` sang controlled (`value`/`onValueChange` với state `activeTab`, mặc định `"essay"`) để chart biết tab hiện tại; giữ nguyên tên tab để deep-link từ card gợi ý vẫn hoạt động.
- Gọi `recordPracticeSignal` tại các component (chỉ thêm 1 dòng sau khi có kết quả, không đổi logic chấm hiện tại):
  - `src/components/GrammarPractice.tsx` -> `GR`
  - `src/components/TranslationPractice.tsx` -> `GR` (cạnh `logStudentActivity` hiện có)
  - `src/components/PhrasePractice.tsx` -> `LR`
  - `src/components/CohesionLab.tsx` -> `CC` (dùng kết quả AI cohesion / bài sắp xếp đoạn; nếu chỗ nào chưa có điểm số thì quy đổi từ tỉ lệ đúng)
  - `src/components/IdeaPractice.tsx` -> `TR` (từ điểm/đánh giá ý tưởng; nếu không có điểm thì bỏ qua, không bịa số)
- Không đổi route, ID, RLS, schema, dữ liệu `writing_attempts` đã lưu.
- Kiểm tra: `npx tsgo --noEmit`; luyện thử 1 câu ở tab Ngữ pháp và 1 ở tab Cụm từ rồi xem biểu đồ nhích lên ngay; kiểm tra ở desktop và điện thoại.

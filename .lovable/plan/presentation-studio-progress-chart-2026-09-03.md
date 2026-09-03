# Presentation Studio: progress chart

Add a progress-tracking chart so học sinh thấy được sự tiến bộ qua các buổi luyện thuyết trình.

## What gets added

A new "Tiến bộ luyện tập / Practice progress" card in the Presentation Studio, placed right above the existing Session history card.

- KPI row: số buổi tập, điểm cao nhất, điểm trung bình, và mức thay đổi so với buổi đầu (+/-).
- Line chart theo thời gian: điểm tổng (0-100) trên trục trái và WPM trên trục phải, có vạch tham chiếu vùng 120-150 WPM và mốc điểm 80.
- Bar/line phụ: số từ đệm (fillers) và eye-contact % theo từng buổi, để thấy cả delivery cải thiện không chỉ điểm.
- Bộ lọc nhanh: 5 buổi gần nhất / 10 / tất cả.
- Empty state song ngữ khi chưa có buổi tập nào.
- Giữ nguyên nút xuất CSV và danh sách lịch sử hiện có.

Lịch sử lưu lên 30 buổi (hiện tại 10) để biểu đồ có đủ dữ liệu; vẫn chỉ lưu cục bộ trên máy, không upload.

## Technical notes

- `src/pages/PresentationStudio.tsx`: raise the history cap from 10 to 30, render the new component with `history`.
- New `src/components/presentation/PresentationProgressChart.tsx`: Recharts `ComposedChart`/`LineChart` + `ReferenceLine`, semantic tokens (`hsl(var(--primary))`, emerald) as in `ReadingProgressChart.tsx`, bilingual labels via `useLanguage`.
- Data comes from the existing `SessionHistoryItem` fields (at, scenario, overall, wpm, durationSec, fillers, eyeContact, confidence) - no new fields, no database changes.
- Update the presentation-studio memory file with the new card.

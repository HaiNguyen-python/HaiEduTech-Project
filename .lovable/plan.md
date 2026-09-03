# Gộp lại Speaking Coach: một trang chủ có biểu đồ, hai nhóm hoạt động

Hiện có 7 nút ngang hàng (Sentences, Shadowing, Sound drill, Free Talk, Weak words, My roadmap, Pronunciation stats) - học viên phải tự đoán nên bắt đầu ở đâu, và biểu đồ thống kê bị chôn sau một nút.

## Cấu trúc mới

Chỉ còn **2 tab**:

```text
[ Tổng quan / Overview ]   [ Luyện tập / Practice ]
```

### Tab 1 - Tổng quan (mặc định khi vào Speaking Coach)
Đây là mặt tiền, mở ra là thấy dữ liệu của mình ngay:
1. 4 thẻ tóm tắt (tổng từ khó · đang ôn · đã khắc phục · độ chính xác).
2. Biểu đồ: Top 10 từ sai nhiều nhất + đường xu hướng 14 ngày, đặt cạnh nhau trên máy tính, xếp dọc trên mobile.
3. Thẻ "Bước tiếp theo" từ lộ trình cá nhân hóa (mục tiêu hôm nay, xu hướng 7 ngày, nút "Luyện ngay" nhảy thẳng sang hoạt động phù hợp).
4. Phần mở rộng được: bảng chi tiết từ hay sai (tìm kiếm, sắp xếp, TTS, CSV, xóa nhật ký), biểu đồ nguồn lỗi, và các bước còn lại của lộ trình - mặc định thu gọn để không gây rối.
5. Khi chưa có dữ liệu: một thẻ chào mừng gọn với 5 hoạt động và gợi ý "bắt đầu với Câu mẫu".

### Tab 2 - Luyện tập
Một lưới thẻ hoạt động (không phải hàng nút dài) gồm 5 hoạt động: Câu mẫu, Nói theo, Luyện âm, Nói tự do, Ôn từ yếu - mỗi thẻ có icon, một dòng mô tả "luyện cái gì", nhãn thời lượng, và badge số từ đang cần ôn ở thẻ Ôn từ yếu. Chọn một thẻ thì mở hoạt động đó cùng nút "Đổi hoạt động" để quay lại lưới; thanh chip nhỏ vẫn cho đổi nhanh giữa 5 hoạt động khi đang luyện.

Kết quả: đa dạng hoạt động vẫn giữ nguyên (không bỏ mục nào), nhưng chỉ còn 2 lối vào, và biểu đồ là thứ đầu tiên học viên thấy.

## Chi tiết kỹ thuật

- `src/pages/SpeakingCoachPage.tsx`: đổi state thành `view: "overview" | "practice"` + `activity: null | "sentences" | "shadow" | "drill" | "freetalk" | "review"`. `AISpeakingCoach` vẫn được mount ẩn để giữ state quiz. `goToPlanMode` chuyển sang đặt cả `view` và `activity`.
- File mới `src/components/speaking/SpeakingOverview.tsx`: bố cục tab Tổng quan, dùng lại `PronunciationStatsPanel` và `PronunciationPlanPanel` ở chế độ compact.
- `PronunciationStatsPanel.tsx`: thêm prop `variant?: "full" | "compact"` - compact chỉ hiện thẻ tóm tắt + 2 biểu đồ chính, phần bảng/pie nằm trong `Collapsible`.
- `PronunciationPlanPanel.tsx`: thêm prop `variant?: "full" | "hero"` - hero chỉ hiện bước tiếp theo + mục tiêu hôm nay, các bước khác trong `Collapsible`.
- File mới `src/components/speaking/ActivityPicker.tsx`: lưới thẻ hoạt động + chip đổi nhanh, mô tả song ngữ Việt - Anh.
- Không thay đổi dữ liệu, backend hay logic ghi nhận lỗi phát âm.
- Kiểm tra: typecheck và chạy trình duyệt trên `/speaking-coach/english` (có dữ liệu mẫu) và một ngôn ngữ khác để xác nhận trạng thái rỗng.

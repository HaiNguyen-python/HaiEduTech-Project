# Thống kê từ hay phát âm sai (Speaking Coach)

Thêm một mục **Pronunciation Stats / Thống kê phát âm** trong Speaking Coach, hiển thị bảng + biểu đồ những từ học viên hay phát âm sai nhất, cho từng ngôn ngữ (Anh, Trung, Việt, Phần Lan, Thụy Điển, Nhật).

## Hiện trạng

- Mỗi lần luyện (Sentences, Shadowing, Sound drill, Free Talk), từ đọc sai được ghi vào hàng đợi cục bộ theo ngôn ngữ (`speaking-weak-words-<lang>`) với số lần sai, ngày gặp gần nhất và nguồn phát sinh.
- Hạn chế: khi một từ được đọc đúng 3 lần liên tiếp, nó **bị xóa khỏi hàng đợi**, nên lịch sử lỗi biến mất và không thể thống kê dài hạn.

## Sẽ làm

### 1. Nhật ký lỗi phát âm (mới)
- Thêm một kho lưu cục bộ riêng, tách khỏi hàng đợi ôn tập, ghi tích lũy theo từng ngôn ngữ:
  - tổng số lần sai, tổng số lần thử, ngày đầu tiên/gần nhất mắc lỗi,
  - nguồn lỗi (câu mẫu / shadowing / luyện âm / nói tự do),
  - trạng thái: đang cần ôn hay đã khắc phục.
- Nhật ký **không bị xóa** khi từ đã thành thạo, chỉ đánh dấu "đã khắc phục" - nhờ đó biểu đồ phản ánh cả quá trình tiến bộ.
- Ghi thêm số lượt sai theo ngày (14 ngày gần nhất) để vẽ đường xu hướng.

### 2. Bảng thống kê
Cột: Từ · Phiên âm (IPA/Pinyin nếu có) · Số lần sai · Tỉ lệ sai (%) · Nguồn · Lần gặp gần nhất · Trạng thái.
- Sắp xếp mặc định theo số lần sai giảm dần, cho phép đổi sang tỉ lệ sai hoặc mới nhất.
- Ô tìm kiếm, nút phát âm mẫu (TTS) cho từng từ, nút "Luyện ngay" chuyển thẳng sang chế độ Weak words.
- Song ngữ Việt - Anh, cuộn ngang trên mobile.

### 3. Biểu đồ
- **Top 10 từ sai nhiều nhất**: biểu đồ cột ngang, tô màu theo mức độ (đỏ / cam / vàng).
- **Xu hướng 14 ngày**: biểu đồ đường số lỗi mỗi ngày, để thấy tiến bộ.
- **Nguồn lỗi**: biểu đồ tròn nhỏ chia theo 4 chế độ luyện.
- Bốn thẻ tóm tắt: tổng từ khó, đang cần ôn, đã khắc phục, tỉ lệ chính xác trung bình.

### 4. Trạng thái rỗng và tiện ích
- Khi chưa có dữ liệu: hướng dẫn ngắn "hãy luyện vài câu để hệ thống bắt đầu thống kê".
- Nút xuất CSV danh sách từ hay sai và nút xóa nhật ký.

## Chi tiết kỹ thuật

- File mới `src/lib/speaking/pronunciationStats.ts`: kiểu dữ liệu, đọc/ghi qua `safeStorage`, khóa `speaking-pron-stats-<language>`, hàm `recordAttempt`, `recordMiss`, `topMissedWords`, `dailyTrend`, `sourceBreakdown`, `resetStats`.
- Móc ghi nhận: gọi thêm trong `addWeakWords` và `reviewWeakWord` (`src/lib/speakingWeakWords.ts`) để mọi chế độ hiện có tự động cấp dữ liệu, không phải sửa từng component.
- File mới `src/components/speaking/PronunciationStatsPanel.tsx`: bảng + biểu đồ (Recharts, đã có sẵn trong dự án), dùng token màu của design system.
- `src/pages/SpeakingCoachPage.tsx`: thêm tab thứ sáu "Stats / Thống kê" vào bộ chuyển chế độ, kèm badge số từ đang cần ôn.
- Toàn bộ dữ liệu lưu cục bộ trên máy học viên, không cần thay đổi cơ sở dữ liệu hay backend.
- Kiểm tra: typecheck, và chạy thử trình duyệt trên cả 6 ngôn ngữ (nạp dữ liệu mẫu để xác nhận bảng và biểu đồ hiển thị đúng).

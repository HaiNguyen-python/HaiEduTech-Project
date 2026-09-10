# Word Quest: học từ trước, luyện tập sau

## Vấn đề

Hiện nay bấm vào một chặng là vào bài tập ngay. Từ mới chỉ được "gặp" xen kẽ giữa các bài tập, và từ đã thuộc thì bị bỏ hẳn bước gặp từ - nên học sinh phải làm bài với từ mình chưa kịp học.

## Thay đổi

Mỗi chặng có 2 giai đoạn rõ ràng:

**1. Giai đoạn học từ (mới)**
- Vào chặng là hiện màn hình học từ: lần lượt đủ 8 từ của chặng, mỗi từ một thẻ đầy đủ thông tin - emoji minh hoạ, từ, phiên âm/pinyin/romaji, từ loại, nghĩa Việt, nghĩa Anh, câu ví dụ (kèm dịch nếu có), nút Nghe và Nghe chậm (tự đọc khi mở thẻ).
- Có nút "Từ trước / Từ tiếp", dãy chấm tiến độ 1-8, và nhãn "Học từ · 3/8" để biết đang ở đâu.
- Ở từ cuối, nút chuyển thành "Bắt đầu luyện tập". Có thêm nút "Bỏ qua phần học" cho học sinh đã thuộc, và nút "Xem lại từ" trong lúc luyện tập để quay lại phần học bất cứ lúc nào (không mất tiến trình bài tập).
- Áp dụng cho mọi từ, kể cả từ đã đánh dấu thuộc.

**2. Giai đoạn luyện tập (giữ như hiện tại)**
- Xen kẽ 3 từ một vòng, đủ các dạng: chọn nghĩa, nghe chọn, gõ lại, ghép chữ, điền câu, nói lại, nhớ chủ động, chọn câu dùng đúng, ôn ngược.
- Vì tất cả từ đã được học ở giai đoạn 1, bước "Gặp từ mới" được bỏ khỏi hàng đợi bài tập, nên không còn trùng lặp; mỗi từ nhận 3 bài tập (từ chưa thuộc nhận dạng dễ hơn, từ đã thuộc nhận dạng khó hơn - như hiện nay).

## Ghi nhớ tiến trình

- Lưu thêm việc "chặng này đã học xong phần từ" theo từng chặng, để lần sau quay lại chặng đang dở thì vào thẳng bài tập chứ không phải xem lại 8 từ.
- Vẫn dùng đúng khoá lưu cũ của từng môn, không đổi cấu trúc dữ liệu cũ, không thay đổi cơ sở dữ liệu.

## Ghi chú kỹ thuật

- `src/components/vocab/WordQuest.tsx`: thêm state `phase: "study" | "drill"` và `studyIdx`; `openStage` khởi tạo phase theo dữ liệu đã lưu; tách thẻ hiện thông tin từ (dùng lại phần UI của step `meet`) thành khối dùng chung cho cả study và drill; `buildRound` bỏ `meet` khỏi danh sách kinds và luôn cấp 3 bài tập/từ; mở rộng `Progress` với `studied?: Record<number, boolean>` (tương thích ngược khi thiếu).
- Không đổi API của component nên 6 trang (IELTS, tiếng Việt, HSK, Nhật, Phần Lan, Thụy Điển) không cần sửa.
- Kiểm tra: typecheck, rồi chạy thử trên desktop + mobile ở IELTS / HSK / tiếng Việt: vào chặng thấy phần học 8 từ, chuyển sang bài tập, tải lại trang vào thẳng bài tập.

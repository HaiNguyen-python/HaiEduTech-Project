# Khóa Python, Finnish, Japanese + tăng động lực nâng cấp Premium

## Phần A - Khóa 3 môn (cùng quy tắc: 3 bài đầu miễn phí)

**Lập trình (Programming)**
- Trang bài học lập trình (mỗi module như Python, SQL, ML, Spark...): 3 bài đầu của mỗi module miễn phí, từ bài 4 hiện màn hình Premium.
- Lộ trình "Introduction to Programming" (47 bài): 3 bài đầu miễn phí.
- Python Challenges: 3 thử thách đầu miễn phí.
- Trong danh sách bên cạnh, bài bị khóa có ổ khóa vàng + nhãn "Premium".
- Không khóa: Arcade, trang tổng quan, Interview Questions (dùng để kéo người học vào).

**Tiếng Phần Lan (Finnish)**
- Finnish Beginner, YKI A2, YKI B1: 3 bài/chủ đề đầu miễn phí mỗi khu vực.
- Đề thi thử YKI: đề đầu miễn phí (cùng kiểu đề thi hiện có).
- Không khóa: kho từ vựng xem nhanh, Arcade, Life in Finland (tổng quan).

**Tiếng Nhật (Japanese)**
- Mỗi tab có danh sách bài (bài học, Reading Lab, Verb Trainer, Keigo Lab...): 3 mục đầu miễn phí.
- Không khóa: bảng chữ Hiragana/Katakana (điểm vào để thấy giá trị).

Giáo viên/admin/trợ giảng luôn mở hết. Khi bấm vào bài bị khóa, mở luôn cửa sổ nâng cấp.

## Phần B - Thúc đẩy đăng ký Premium

1. **Xem trước bài khóa**: bài bị khóa vẫn hiện tiêu đề và 2-3 dòng đầu mờ dần, kèm nút "Mở khóa bài này - 19 EUR/năm" (thay vì chặn trắng).
2. **Thẻ chúc mừng cuối bài 3**: học xong bài miễn phí cuối cùng -> hiện "Bạn đã hoàn thành phần học thử! Còn X bài nữa trong khóa này" + nút nâng cấp.
3. **Thanh tiến độ mở khóa** trên đầu mỗi khóa: "Đã mở 3/47 bài - Mở khóa 44 bài còn lại".
4. **Nhắc lượt chấm AI**: hiện "Còn 2/3 lượt chấm AI miễn phí" ngay cạnh nút chấm (không chỉ sau khi chấm).
5. **Ưu đãi có thời hạn trong cửa sổ nâng cấp**: dòng "Chỉ 19 EUR/năm - rẻ hơn 1 buổi học gia sư" + số học viên đang dùng (lấy số thật từ hệ thống, không bịa).
6. **Trang so sánh Miễn phí vs Premium** nhỏ ngay trong cửa sổ nâng cấp (bảng 2 cột, 6 dòng).
7. **Nhắc gia hạn**: khi Premium còn 14 ngày, hiện dải nhắc nhẹ trên đầu trang.

## Các bước

1. Xem cấu trúc danh sách bài của từng môn (Programming, Finnish Beginner/YKI, các tab Japanese) để gắn khóa đúng chỗ.
2. Gắn khóa Phần A.
3. Làm các mục Phần B (1-7).
4. Kiểm tra bằng tài khoản thường và tài khoản Premium: bài 4 bị khóa, sau khi nhập mã thì mở hết ngay.

## Chi tiết kỹ thuật

- Tái dùng `FREE_LESSONS`, `usePremium`, `openUpgradeModal`, `PremiumLockPanel` (thêm prop preview), `PremiumGate`.
- `ProgrammingLesson.tsx`: index trong `mod.lessons` >= 3 -> gate; `PythonLessonView` dùng index trong danh sách lesson; `PythonChallengeList/Page` theo thứ tự danh sách.
- Finnish/Japanese: gắn helper `isPremiumLocked(index)` vào các list component sau khi xác nhận cấu trúc (chưa kiểm tra chi tiết).
- AI quota badge: component `AiQuotaBadge` đọc `getAiGradesRemaining`, lắng nghe `AI_QUOTA_EVENT`.
- Số học viên: `get_public_student_count()` đã có.
- Dải nhắc gia hạn: trong Navbar khi `daysLeft <= 14`.

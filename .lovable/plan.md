# Nâng cấp Lớp học 3D trong Admin Dashboard

Mục tiêu: giáo viên mở tab Overview là nắm ngay tình hình cả lớp; học sinh trong phòng nhìn rõ nét, đẹp, có tên trên đầu; chỗ ngồi phản ánh đúng thứ hạng học tập; toàn bộ chạy mượt.

## 1. Thứ tự ngồi theo thành tích
- Xếp hạng theo **điểm học tập trung bình** (`avgScore`) từ cao xuống thấp; khi bằng điểm thì so số hoạt động, rồi tên.
- Hàng đầu (gần bảng) là hạng 1..N, đi dần về sau. Mỗi bàn có số hạng nhỏ (#1, #2...) hiển thị cạnh tên.
- Học sinh chưa có hoạt động xếp cuối phòng, mờ nhẹ.
- Có nút chuyển nhanh giữa 2 cách xếp: **Theo thứ hạng** (mặc định mới) và **Ưu tiên cần chú ý** (cách cũ, đưa nhóm đỏ lên hàng đầu).

## 2. Tên học sinh trên đầu
- Nhãn tên luôn hiện cho tất cả học sinh, đặt phía trên đầu avatar, luôn xoay về phía camera.
- Nhãn dạng viên thuốc: viền màu theo tier, nội dung `#hạng · Tên · điểm/10`.
- Lớp đông: tự rút gọn tên (Tên + chữ cái đầu của họ) và giảm cỡ chữ để không rối; nhãn của học sinh bị lọc/mờ sẽ nhạt đi.
- Học sinh đang hover hoặc được chọn: nhãn nổi lên, đậm hơn, kèm mini-stat (hoạt động, lần học cuối, xu hướng).

## 3. Học sinh nhìn rõ nét và đẹp hơn
- Avatar dựng lại nhiều khối: đầu tròn, thân áo bo góc, hai tay, chân, ghế ngồi và bàn có mặt bàn + chân bàn.
- Vẻ mặt tối giản (2 mắt) hướng về bảng; mũ/đuôi tóc để phân biệt nhẹ giữa các em (theo hash id, không phán đoán giới tính).
- Vật liệu sáng hơn, ánh sáng 3 điểm + ambient dịu, nền phòng gradient sáng, tường sau và bảng trắng có khung.
- Hiệu ứng trạng thái rõ hơn: vòng sáng dưới chân theo điểm TB, nhấp nháy nhẹ cho nhóm cần chú ý, hạt sáng nhỏ cho nhóm tiến bộ, vương miện vàng cho top 3.

## 4. Giúp nắm tình hình cả lớp
- Bảng trắng đầu phòng: điểm TB lớp, số em cần chú ý, số em hoạt động tuần này, top 3 tên đầu bảng.
- Dải chỉ số ngay dưới tiêu đề card: tổng học sinh, tỉ lệ hoạt động 7 ngày, số em điểm dưới 5, số em đang tiến bộ - bấm vào là lọc.
- Bảng chú giải hiện tại giữ nguyên, thêm nút **Đi tới học sinh cần chú ý đầu tiên** (camera bay tới avatar đó và chọn em ấy).
- Panel chi tiết khi bấm avatar: điểm TB, số hoạt động, xu hướng, lần học cuối, hạng trong lớp, kèm nút mở tab Students như hiện tại.
- Chế độ phẳng (mobile/reduced-motion) hiển thị cùng thông tin: hạng, tên, điểm, lần học cuối, sắp theo cùng thứ tự.

## 5. Tối ưu hiệu năng
- Tạm dừng vòng render khi card đóng, khi ở tab khác, hoặc khi thẻ ra khỏi khung nhìn.
- Dùng chung geometry/material cho bàn, ghế, thân, đầu (tái sử dụng thay vì tạo mới cho mỗi học sinh); animation chạy trong một vòng lặp duy nhất ở cấp phòng thay vì mỗi avatar một `useFrame`.
- Nhãn tên dùng sprite/thẻ nhẹ, giới hạn số nhãn chi tiết (chỉ hover/chọn mới đầy đủ), tự hạ mức chi tiết khi >40 học sinh.
- Giới hạn `dpr`, tắt bóng đổ nặng, `frameloop="demand"` khi không có animation cần chạy, bỏ antialias trên máy yếu.
- Không thêm truy vấn dữ liệu mới; mọi thứ vẫn tính từ props đang có.

## Chi tiết kỹ thuật
- `src/lib/classroom3d.ts`: thêm `rankStudents(students)` (sắp theo avgScore → totalActivities → tên) và tham số `mode: "rank" | "attention"` cho `buildClassroomLayout`; seat có thêm `rank`.
- `src/components/admin/Classroom3D.tsx`: tách `StudentAvatar` (hình khối chi tiết + nhãn tên), `NameTag`, `Room`, `StatsStrip`; dùng `useMemo` cho geometry chia sẻ, một `useFrame` ở `Room` điều khiển bob/pulse qua ref array.
- Không dùng drei `<Text>` (font troika bị CSP chặn) - nhãn dùng `<Html>`/sprite như hiện tại.
- Màu vẫn lấy từ `TIER_META`; không hardcode màu mới trong component.
- Không thay đổi dữ liệu, bảng hay Edge Function nào.

# Bản đồ "Học viên HaiEduTech khắp thế giới": làm cho số liệu chuẩn

## Những gì đã kiểm tra được (số thật)

- Bảng lượt truy cập theo quốc gia đang ghi: US 6.611, Việt Nam 3.477, UK 574, Phần Lan 55, Canada 2 (tổng 10.719).
- Nhật ký xem trang của chính website, tính từ 21/04/2026 đến nay: 17.445 lượt xem trang, 290 phiên truy cập, 71 người dùng đã đăng nhập. Không lưu quốc gia cho từng lượt xem.
- Thống kê 30 ngày gần nhất của website: 89 khách, 384 lượt xem trang, các nước xuất hiện gồm Phần Lan, Thái Lan, Ukraine, Mỹ, Việt Nam - trong đó Thái Lan và Ukraine chưa từng lên bản đồ.
- Ô "Total students" hiện 0 nhưng thực tế có 95 học viên đã đăng ký; nguyên nhân là khách chưa đăng nhập không được phép đọc dữ liệu học viên.

Vì sao con số quốc gia bị phồng: mỗi tab mới đều được tính là một lượt, và khi không nhận diện được quốc gia thì hệ thống đoán theo ngôn ngữ của máy - máy đặt tiếng Anh (Mỹ) ở bất cứ đâu cũng bị cộng vào Mỹ. Đó là lý do Mỹ cao bất thường.

## Sẽ làm gì

### 1. Đếm lại cho đúng, tính từ nay
- Mỗi khách chỉ được tính một lượt mỗi ngày cho mỗi quốc gia (dấu vết được băm, không lưu địa chỉ IP thật).
- Bỏ hẳn cách đoán quốc gia theo ngôn ngữ máy; chỉ ghi khi xác định được quốc gia thật.
- Không ghi lượt khi trang đang mở ở chế độ xem thử hoặc trên máy phát triển, và siết thêm bộ lọc bot.

### 2. Đưa dữ liệu từ trước đến nay lên bản đồ
- Giữ lại toàn bộ lịch sử nhưng đưa về đúng thang khách thật: tổng lượt của các quốc gia được chuẩn hoá theo số phiên truy cập thật tính từ ngày đầu, giữ nguyên thứ tự và tỉ lệ giữa các nước.
- Bổ sung các quốc gia đã ghi nhận trong thống kê website nhưng còn thiếu trên bản đồ (Thái Lan, Ukraine ...).
- Thêm một ô số liệu "Lượt xem trang từ đầu" lấy đúng con số thật của website, để bản đồ vừa thể hiện chiều dài lịch sử vừa không phóng đại số khách.

### 3. Sửa ô học viên và tên nước
- "Total students" hiển thị đúng 95 (và tự cập nhật) thông qua một hàm chỉ trả về duy nhất con số tổng, không lộ thông tin cá nhân.
- Chuẩn hoá tên nước hiển thị: "Viet Nam" thành "Vietnam", tên tiếng Việt cho các nước chính.
- Bổ sung vị trí điểm đánh dấu và phân loại châu lục cho các nước còn thiếu, để "Continents reached" và biểu đồ cột luôn khớp với danh sách top.

## Chi tiết kỹ thuật

- Migration: bảng `country_visit_hits` (hash khách + mã nước + ngày, unique) để chống trùng; hàm `record_country_visit(_code, _name, _visitor_hash)` security definer cập nhật `country_visits` chỉ khi hit là mới; hàm `get_public_student_count()` security definer trả về `count(*)` của `profiles`; GRANT EXECUTE cho `anon`, `authenticated`, `service_role`; một migration chuẩn hoá số cũ trong `country_visits` theo tỉ lệ phiên thật và sửa `country_name`.
- `supabase/functions/track-country-visit/index.ts`: tính `visitor_hash` từ IP + user agent + ngày (SHA-256, không lưu IP), gọi `record_country_visit`, bỏ đường ghi trực tiếp không dedupe.
- `src/components/home/WorldVisitorMap.tsx`: bỏ nhánh dự phòng `increment_country_visit` theo `navigator.language`, chặn ghi khi hostname là localhost/preview, lấy học viên qua `get_public_student_count`, lấy lượt xem trang từ đầu qua một hàm tổng hợp, mở rộng `COUNTRY_NAMES` / `COUNTRY_CENTERS` / `CONTINENT_BY_CODE`.
- Không bỏ `increment_country_visit` khỏi database ngay (giữ tương thích), chỉ ngừng gọi từ client.
- Kiểm tra: truy vấn lại `country_visits` sau migration, gọi thử edge function hai lần liên tiếp để chắc chắn chỉ cộng 1, `bunx tsgo --noEmit -p tsconfig.app.json`, và xem trang chủ ở 1280px và 390px.

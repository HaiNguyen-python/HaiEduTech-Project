---
name: Global Scholarship
description: 60+ scholarship hub with region-grouped filters (N.America/Europe/Asia/Oceania), country/level/featured filters, results grouped by country, ScholarshipCard component
type: feature
---
Trang `/global-scholarship` (KnowledgeHubPage) hiển thị 47+ học bổng quốc tế. Bộ lọc được tổ chức gọn trong một Card toolbar gồm 4 tầng: (1) Search bar, (2) Khu vực/Region (Bắc Mỹ/Châu Âu/Châu Á/Châu Đại Dương) với mapping `REGIONS` cho phép tự động thu hẹp danh sách quốc gia hiển thị, (3) Quốc gia (chip nhỏ, max-h-24 scrollable), (4) Bậc học (Bachelor/Master/PhD) + Featured-only toggle. Có nút "Xóa bộ lọc (n)" hiện khi có filter active.

Kết quả được nhóm theo quốc gia (groupedByCountry), mỗi section có header với cờ + tên + badge số lượng. Card scholarship được tách thành component riêng `src/components/scholarship/ScholarshipCard.tsx` để page sạch hơn — quản lý state expand riêng từng card.

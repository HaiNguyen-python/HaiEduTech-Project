

## Plan: Thay Knowledge Hub thành Global Scholarship

### Tổng quan
Thay thế toàn bộ mục Knowledge Hub (trang chủ preview + trang riêng) thành **Global Scholarship** — liệt kê các học bổng Cử nhân, Thạc sỹ, Tiến sỹ tại nhiều quốc gia. Dữ liệu học bổng sẽ được hardcode trong file data (không cần API) với thông tin chi tiết về từng chương trình.

### Thay đổi

#### 1. Tạo `src/data/globalScholarshipData.ts`
File data chứa ~30-40 học bổng nổi tiếng, mỗi học bổng gồm:
- Tên học bổng, quốc gia, cấp bậc (Bachelor/Master/PhD)
- Mô tả ngắn (Vi + En), quyền lợi, điều kiện, deadline
- Link apply, logo/flag quốc gia

Các học bổng bao gồm:
- **Mỹ**: Fulbright, Hubert Humphrey, STEM OPT scholarships
- **Anh**: Chevening, Commonwealth, Gates Cambridge, Rhodes
- **Úc**: Australia Awards, Endeavour, Destination Australia
- **Đức**: DAAD, Deutschlandstipendium, Heinrich Böll
- **Nhật**: MEXT, JASSO, ADB-JSP
- **Hàn Quốc**: KGSP (GKS), Korean Government Scholarship
- **Phần Lan**: Finnish Government Scholarship, EDUFI
- **Canada**: Vanier, Trudeau, Banting
- **EU/Châu Âu**: Erasmus Mundus, Eiffel (Pháp), Swiss Government
- **Singapore**: ASEAN Scholarship, Nanyang, NUS
- **Trung Quốc**: CSC (Chinese Government Scholarship)
- **New Zealand**: NZ Scholarship, Manaaki

#### 2. Cập nhật `src/components/KnowledgeHub.tsx` → Component hiển thị Global Scholarship trên trang chủ
- Đổi tên section thành "Học Bổng Toàn Cầu / Global Scholarship"
- Hiển thị 6 học bổng nổi bật dạng card (flag + tên + cấp bậc + deadline)
- Nút "Xem tất cả" dẫn tới trang `/global-scholarship`

#### 3. Cập nhật `src/pages/KnowledgeHubPage.tsx` → Trang Global Scholarship đầy đủ
- Lọc theo quốc gia, cấp bậc (Bachelor/Master/PhD)
- Search theo tên học bổng
- Card hiển thị chi tiết: quyền lợi, điều kiện, link apply
- Giữ layout đẹp tương tự KnowledgeHub cũ

#### 4. Cập nhật routing & navigation
- `src/App.tsx`: Đổi route `/knowledge-hub` → `/global-scholarship`
- `src/components/Navbar.tsx`: Đổi label "Knowledge Hub" → "Học Bổng / Scholarship" và link tương ứng

### Files thay đổi
- `src/data/globalScholarshipData.ts` — **mới** (data ~30-40 học bổng)
- `src/components/KnowledgeHub.tsx` — viết lại thành Global Scholarship preview
- `src/pages/KnowledgeHubPage.tsx` — viết lại thành trang scholarship đầy đủ
- `src/App.tsx` — đổi route
- `src/components/Navbar.tsx` — đổi label + link


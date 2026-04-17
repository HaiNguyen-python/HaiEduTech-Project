## Trả lời: Hiện tại các job **KHÔNG** được cập nhật tự động

### Tình trạng hiện tại

Trang Job Opportunities đang dùng **static curated database** (`src/data/jobOpportunities.ts`) — danh sách ~80 công ty cố định, viết tay. Mỗi card có 2 nút:

- **Career Page** → link đến trang tuyển dụng chính thức của công ty (luôn mới vì là link trực tiếp)
- **Live Jobs** → link LinkedIn search đã pre-filter theo công ty + Phần Lan (LinkedIn tự cập nhật realtime)

→ Bản thân app không fetch jobs mới, nhưng **2 nút trên dẫn ra nguồn live** nên user vẫn thấy job mới khi click.

### Có 3 cách để cập nhật job liên tục theo ngày

**Option A — Live scraping qua Firecrawl (đề xuất, mạnh nhất)**

- Connect Firecrawl connector (đã có sẵn trong Lovable)
- Tạo edge function `fetch-live-jobs` scrape Duunitori.fi + LinkedIn jobs theo keyword (Data Engineer, AI Engineer, Language Technology) + location Finland
- Cron job pg_cron chạy mỗi 24h, lưu vào bảng `live_jobs` (Supabase)
- Trang hiển thị thêm tab "🔥 Live Jobs (updated daily)" bên cạnh tab công ty
- Mỗi job có: title, company, location, posted date, link apply
- **Tốn**: Firecrawl credits (~50-100 credits/ngày)

**Option B — RSS/JSON feeds miễn phí**

- Một số job board có RSS feed công khai (ví dụ: Duunitori, We Work Remotely)
- Edge function parse RSS daily, lưu vào DB
- **Miễn phí** nhưng coverage hạn chế (LinkedIn không có RSS công khai)

**Option C — Manual refresh button (đơn giản nhất)**

- Thêm nút "🔄 Refresh jobs from LinkedIn" trên mỗi card
- Click → mở LinkedIn live search trong tab mới (đã có sẵn nút "Live Jobs")
- Không cần backend, không tốn credit
- **Đây là cách hiện tại đang dùng**

### Đề xuất

Nếu bạn muốn **thực sự cập nhật tự động hàng ngày** → chọn **Option A (Firecrawl)**. Mình sẽ:

1. Connect Firecrawl connector
2. Tạo bảng `live_jobs` trong Supabase
3. Tạo edge function `fetch-live-jobs` (scrape Duunitori + LinkedIn search results)
4. Setup pg_cron chạy mỗi ngày 6:00 AM Helsinki time
5. Thêm tab "🔥 Live Daily Jobs" trên trang Job Opportunities với filter theo role/location/posted date
6. Badge "NEW" cho job đăng trong 24h, "🔥 Hot" cho job <3 ngày

**Cần bạn xác nhận**: Có muốn dùng Option A (Firecrawl, scrape thật, tốn credits) không? Hay giữ nguyên hiện tại + chỉ giải thích rõ trên UI rằng "Click Live Jobs để xem việc làm mới nhất từ LinkedIn"?

tôi chọn option C 


## Plan: Job Opportunities Hub cho Data/AI/Language Technology (Phần Lan)

### Mục tiêu
Thêm trang **Job Opportunities** trong mục Learn Programming, hiển thị danh sách công ty và cơ hội việc làm cho 3 chuyên ngành: **Data Engineer**, **AI Engineer**, **Language Technology** — ưu tiên thị trường **Phần Lan** (Helsinki, Espoo, Tampere, Oulu) + Nordic + Remote EU.

### Cách tiếp cận dữ liệu (đề xuất)

**Static curated database** — nhanh, ổn định, không tốn API credits:
- File `src/data/jobOpportunities.ts` chứa ~80 công ty đã được nghiên cứu kỹ
- Mỗi công ty: tên, logo emoji, location (city, country), ngành, mô tả ngắn, tech stack, link **Career Page** chính thức + link **Live Jobs** (LinkedIn search đã pre-filter theo role + location)
- Phân loại Finland-first:
  - 🇫🇮 **Finland AI/ML**: Silo AI, Speechly, Lingsoft, Basemark, Curious AI, Mosi, Aiven, Smartly.io, Wolt (ML), Supercell (Data), Rovio, Reaktor, Futurice, Tietoevry, Nokia Bell Labs, F-Secure, Elisa, Kone (Industrial AI)
  - 🏛️ **Research/Academic**: Aalto University, University of Helsinki (HIIT), VTT, FCAI (Finnish Center for AI), CSC – IT Center for Science
  - 🗣️ **Language Technology**: Lingsoft, Lingoes, Speechly, Inscripta, AAC Global, Sanoma, YLE (data/NLP)
  - 🇪🇺 **Nordic + EU Remote**: Spotify, Klarna, King, Northvolt, DeepL, Hugging Face, Mistral AI
  - 🌍 **Big Tech with Finland office**: Microsoft Finland, Google (remote EU), Amazon Helsinki

### UI/UX

- **Route**: `/programming/job-opportunities`
- **Hero**: Tiêu đề "Find Your Next Role in Tech 🇫🇮", quick stats (số công ty, số role, % Finland-based)
- **Tabs role**: All / Data Engineer / AI Engineer / Language Technology
- **Filter chips**: Country (🇫🇮 Finland / 🇸🇪🇳🇴🇩🇰 Nordic / 🇪🇺 EU Remote / 🌍 Global), Company size (Startup / Mid / Enterprise / Research), Work mode (Onsite / Hybrid / Remote)
- **Search box**: theo tên công ty, tech stack, city
- **Bookmark**: ⭐ save công ty yêu thích vào localStorage, filter "Saved only"
- **Company cards**: logo emoji + tên + location badge + role tags + 2-3 dòng mô tả + tech stack badges + 2 buttons:
  - 🔗 **Career Page** (official site)
  - 🔍 **Live Jobs** (LinkedIn URL pre-filtered theo role + Finland)
- **Top Resources panel** (sticky sidebar hoặc top section):
  - Duunitori.fi (job board #1 Phần Lan)
  - TE-palvelut (cổng việc làm chính phủ)
  - Work in Finland (official)
  - LinkedIn Finland Tech Jobs (pre-filtered link)
  - AI Finland community, Helsinki AI Society, FCAI
  - Relocate.me, Honeypot.io
- **Tips section** (collapsible accordion): Visa/residence permit, có cần tiếng Phần Lan không (đa số role tech: English OK), mẹo CV cho thị trường Bắc Âu (concise, 1-2 trang, no photo), salary range tham khảo

### Ngôn ngữ
Toàn bộ UI bằng tiếng Anh (theo memory rule cho mục Programming/English). Nội dung công ty bằng tiếng Anh.

### Files

| File | Thay đổi |
|------|----------|
| `src/data/jobOpportunities.ts` (NEW) | ~80 công ty + ~10 resources với types `JobCompany`, `JobResource` |
| `src/pages/JobOpportunities.tsx` (NEW) | Trang đầy đủ: hero, tabs, filters, search, bookmark, cards, resources, tips |
| `src/App.tsx` | + route `/programming/job-opportunities` (lazy-loaded) |
| `src/pages/Programming.tsx` | + card nổi bật "🎯 Job Opportunities — Find tech jobs in Finland 🇫🇮" trong pillar AI và Data Engineering |
| `src/components/Navbar.tsx` | + link "🎯 Job Opportunities" trong dropdown Programming |

### Lưu ý
- Tất cả links sẽ open trong tab mới (`target="_blank" rel="noopener"`)
- Bookmark dùng localStorage key `job-bookmarks-v1` (không cần backend)
- Có thể mở rộng sau bằng Firecrawl để scrape jobs realtime nếu bạn muốn — đây là phase 2


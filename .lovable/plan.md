## Plan: Thêm mục Thơ vào Navbar + Video minh họa lịch sử

### 1. Thêm "Thơ Việt Nam" và "Nghe chép chính tả" vào dropdown Navbar

**File:** `src/components/Navbar.tsx`

Hiện tại `vietnameseSubs` thiếu 3 mục quan trọng. Thêm:

- `{ to: "/learn-vietnamese/poetry", label: "📜 Thơ Việt Nam / Vietnamese Poetry" }`
- `{ to: "/learn-vietnamese/dictation", label: "✍️ Nghe chép chính tả / Dictation" }`
- `{ to: "/speaking-coach/vietnamese", label: "🎙️ AI Speaking Coach" }`

### 2. Thêm video minh họa ngắn cho các câu chuyện lịch sử

**File:** `src/data/vietnamese/historyData.ts` — Thêm trường `videoUrl` vào interface `HistoryLesson` (trong `types.ts`) và gán video YouTube embed cho các bài học lịch sử chính. Sử dụng các video ngắn miễn phí từ YouTube về lịch sử Việt Nam (embed format).

**File:** `src/data/vietnamese/types.ts` — Thêm `videoUrl?: string` vào `HistoryLesson` interface.

**File:** `src/pages/VietnameseHistoryLesson.tsx` — Hiển thị video embed (iframe YouTube) ở đầu bài học, trước phần Story, với responsive aspect ratio 16:9, rounded corners, và label "📹 Video minh họa".

### Danh sách video minh họa (YouTube embed, nội dung giáo dục):

Mỗi bài lịch sử sẽ có 1 video ngắn liên quan (2-5 phút) từ các kênh giáo dục uy tín về lịch sử Việt Nam. Ví dụ:

- Hùng Vương: video về truyền thuyết Lạc Long Quân - Âu Cơ
- Hai Bà Trưng: video về cuộc khởi nghĩa
- Trận Bạch Đằng: video về chiến thuật cọc nhọn
- Thăng Long: video về kinh đô Hà Nội

Đảm bảo link các video vẫn hoạt động bình thường 

### Files thay đổi


| File                                    | Action                             |
| --------------------------------------- | ---------------------------------- |
| `src/components/Navbar.tsx`             | Thêm 3 links vào vietnameseSubs    |
| `src/data/vietnamese/types.ts`          | Thêm `videoUrl?` vào HistoryLesson |
| `src/data/vietnamese/historyData.ts`    | Gán videoUrl cho các bài học       |
| `src/pages/VietnameseHistoryLesson.tsx` | Hiển thị video embed section       |

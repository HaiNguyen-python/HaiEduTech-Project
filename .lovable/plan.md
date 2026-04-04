

## Plan: Đổi nút "Phát lời" thành "Bắt đầu" và đồng bộ YouTube + lời bài hát

### Hiện trạng
- Nút "Phát lời" chỉ chạy timer highlight lời bài hát, không điều khiển video YouTube
- Video YouTube là iframe thông thường, không có API control
- Timer chạy lời ngay lập tức khi nhấn nút

### Thay đổi (file: `src/pages/NationalAnthem.tsx`)

**1. Chuyển iframe sang YouTube IFrame API**
- Load YouTube IFrame API script (`https://www.youtube.com/iframe_api`)
- Tạo player instance qua `new YT.Player()` với `enablejsapi=1`
- Cho phép điều khiển play/pause video từ code

**2. Đổi nút "Phát lời" → "Bắt đầu"**
- Label: "▶ Bắt đầu" (khi chưa phát) / "⏸ Tạm dừng" (đang phát)
- Bỏ toggle "Có lời / Nhạc nền" (không cần nữa vì chỉ dùng 1 video)

**3. Logic khi nhấn "Bắt đầu":**
1. Gọi `player.playVideo()` → video YouTube bắt đầu phát
2. Đợi 3 giây (`setTimeout 3000ms`)
3. Sau 3s, bắt đầu chạy timer highlight lời bài hát từng dòng (giữ nguyên logic `setInterval` hiện tại)

**4. Đồng bộ khi tạm dừng / lại từ đầu:**
- "Tạm dừng": pause video + dừng timer lời
- "Lại từ đầu": seek video về 0, reset timer lời, dừng phát

### Chi tiết kỹ thuật
- Thêm state `isStarted` để phân biệt trạng thái đã nhấn bắt đầu hay chưa
- Thêm `delayTimerRef` để track setTimeout 3s (để có thể cancel khi cần)
- YouTube IFrame API: dùng `useEffect` load script, `onYouTubeIframeAPIReady` callback
- Giữ nguyên toàn bộ UI lời bài hát và phần vocabulary


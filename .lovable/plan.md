

## Plan: Thêm audio và mở rộng ca dao tục ngữ

### Hiện trạng
- `FolkloreCardGrid.tsx` hiển thị 24 ca dao/tục ngữ (lọc bỏ truyện cổ) từ `folkloreItems` trong `gameData.ts` (30 items, 5 là truyện cổ = 25 còn lại)
- Chưa có nút nghe audio cho từng câu
- Dữ liệu hiện có 30 items, cần thêm nhiều hơn

### Thay đổi

**1. Thêm nút audio vào mỗi card (file: `src/components/FolkloreCardGrid.tsx`)**
- Thêm nút `Volume2` (lucide icon) ở góc trên phải mỗi card
- Sử dụng Web Speech API (`SpeechSynthesisUtterance` với `lang: "vi-VN"`, rate 0.6) giống pattern đã dùng trong `FolkloreLibrary.tsx`
- Thêm state `isSpeaking` + `speakingId` để highlight card đang phát
- Thêm nút "Nghe tất cả" ở header để phát tuần tự tất cả các câu

**2. Thêm 10 ca dao tục ngữ mới (file: `src/data/vietnamese/gameData.ts`)**
- Thêm các câu ca dao tục ngữ phổ biến chưa có:
  - "Có đức mặc sức mà ăn" (tục ngữ)
  - "Tay làm hàm nhai, tay quai miệng trễ" (tục ngữ)
  - "Kiến tha lâu cũng đầy tổ" (tục ngữ)
  - "Ai ơi bưng bát cơm đầy" (ca dao)
  - "Nhiễu điều phủ lấy giá gương" (ca dao)
  - "Con người có tổ có tông" (tục ngữ)
  - "Cái nết đánh chết cái đẹp" (tục ngữ)
  - "Đất lành chim đậu" (tục ngữ)
  - "Trăm hay không bằng tay quen" (tục ngữ)
  - "Bầu ơi thương lấy bí cùng" (ca dao)

**3. Cập nhật imageMap** — các item mới sẽ không có ảnh minh họa, card vẫn hiển thị bình thường chỉ với text (đã có logic `{imageMap[item.id] && ...}`)

### Chi tiết kỹ thuật
- Pattern audio: copy từ `FolkloreLibrary.tsx` — `useCallback`, `speechSynthesis.cancel()`, state tracking
- Nút audio nhỏ gọn (icon button) không chiếm nhiều không gian
- ID mới: `folk-31` đến `folk-40`
- Không cần thay đổi `FolkloreItem` type — dữ liệu mới sử dụng cùng cấu trúc


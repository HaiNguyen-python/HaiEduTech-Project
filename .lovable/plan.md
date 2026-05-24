## Mục tiêu
Làm cho phần 📖 Câu chuyện (story) của 16 bài học trong /programming/ai-academy hiện ra dần — chỉ 1 ô đầu tiên hiện sẵn, các ô sau xuất hiện tinh tế khi người học click "Tiếp theo".

## Phạm vi
Chỉ chỉnh UI trong `src/pages/AIAcademy.tsx` quanh khối render `activeTrack.story.map(...)` (dòng ~1378–1387). Không động vào data, không động vào phần Vietnam case / Golden tip / Glossary phía dưới.

## Thay đổi cụ thể

1. **State theo bài học**: thêm `const [revealedCount, setRevealedCount] = useState(1)` và `useEffect` reset về `1` mỗi khi `activeTrack.id` đổi (để chuyển bài luôn bắt đầu lại từ ô đầu).

2. **Render có điều kiện**: thay `activeTrack.story.map(...)` bằng `activeTrack.story.slice(0, revealedCount).map(...)`, mỗi ô bọc trong `motion.div` (đã import framer-motion trong project) với `initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.35, ease:"easeOut"}}` cho hiệu ứng fade-slide nhẹ nhàng.

3. **Nút "Tiếp theo" tinh tế**: ngay dưới ô cuối cùng vừa lộ, nếu `revealedCount < activeTrack.story.length`, hiện một button ghost nhỏ căn giữa:
   - Text: `Tiếp tục đọc · {revealedCount}/{total}` + icon `ChevronDown` nhẹ nhàng bounce.
   - Style: `text-purple-600 hover:bg-purple-500/10 rounded-full px-4 py-1.5 text-sm font-medium border border-purple-500/30 transition-all`.
   - Bên cạnh có link nhỏ `Xem tất cả` (text-xs muted) để bỏ qua, set `revealedCount = total`.
   - Khi đã lộ hết (`revealedCount === total`): ẩn button, có thể hiện 1 dòng micro-hint `✓ Hết phần câu chuyện` mờ.

4. **Auto-scroll nhẹ**: sau khi click "Tiếp theo", scroll ô mới vào view bằng `ref` + `scrollIntoView({behavior:"smooth", block:"nearest"})` để không bị giật.

## Lý do thiết kế
- Giữ trang ngắn gọn ngay từ đầu, người học không bị ngợp chữ.
- Hành vi click tạo nhịp đọc chủ động (active reading), tăng ghi nhớ.
- Không phá layout split-view (concept | sandbox) hiện có; phần extras (Vietnam case, golden tip, glossary) vẫn nằm dưới như cũ — chỉ story mới progressive.

## Không thay đổi
- Data `aiAcademyContent.ts`.
- Logic sandbox, quiz, certificate.
- Các phần extended content phía dưới (vẫn hiện ngay).